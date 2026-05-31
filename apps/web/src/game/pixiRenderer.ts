/**
 * PixiJS renderer — sprite-pool architecture.
 *
 * Hot paths (bullets, trails, sparks) never allocate per frame:
 *  - Textures are pre-baked once at startup via generateTexture().
 *  - Sprites are recycled through per-category pools.
 *  - Only player + rings use Graphics.clear() (one player, 0-3 rings at a time).
 *
 * Why this is fast: PixiJS WebGL batches all sprites that share a texture
 * into a single draw call regardless of count.
 */

import {
  Application,
  Container,
  Graphics,
  Sprite,
  Texture,
  Text,
  TextStyle,
  Rectangle,
} from "pixi.js";
import type { WorldState, InputState } from "@graze-spells/game-core";

// ── palette ──────────────────────────────────────────────────────────────────
const C_BG    = 0x04000e;
const C_BGLOW = 0xff0066;
const C_BCORE = 0xff3399;
const C_GRAZE = 0x44ddff;
const C_STAR  = 0xbbaaff;

// ── texture reference geometry ────────────────────────────────────────────────
// All textures are square, centered.  Reference radius BUL_R etc. defines the
// "core" in texture-space; sprites are scaled so core == bullet.radius.
const BUL_SIZE = 96,  BUL_R = 14;   // bullet glow texture
const TRL_SIZE = 48,  TRL_R = 10;   // trail dot texture
const SPK_SIZE = 32,  SPK_R =  6;   // spark texture
const STR_SIZE = 16,  STR_R =  4;   // star texture

// ── sprite pool ───────────────────────────────────────────────────────────────
class Pool {
  private free: Sprite[] = [];
  constructor(
    private tex: Texture,
    private parent: Container,
    prewarm: number,
  ) {
    for (let i = 0; i < prewarm; i++) {
      const s = this.alloc();
      s.visible = false;
      this.free.push(s);
    }
  }
  private alloc(): Sprite {
    const s = new Sprite(this.tex);
    s.anchor.set(0.5);
    this.parent.addChild(s);
    return s;
  }
  get(): Sprite {
    const s = this.free.pop() ?? this.alloc();
    s.visible = true;
    return s;
  }
  put(s: Sprite) { s.visible = false; this.free.push(s); }
  putAll(used: Sprite[]) { for (const s of used) this.put(s); used.length = 0; }
}

// ── texture factory ───────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRenderer = { generateTexture(opts: any): Texture };

function bake(
  r: AnyRenderer,
  size: number,
  draw: (g: Graphics) => void,
): Texture {
  const g = new Graphics();
  draw(g);
  const tex = r.generateTexture({
    target: g,
    frame: new Rectangle(0, 0, size, size),
    resolution: 2,
  });
  g.destroy();
  return tex;
}

// ── public API ────────────────────────────────────────────────────────────────
export type PixiRenderer = {
  update(world: WorldState, input: InputState, dt: number): void;
};

export function createPixiRenderer(app: Application): PixiRenderer {
  const W = app.screen.width, H = app.screen.height;
  const rend = app.renderer as unknown as AnyRenderer;

  // ── bake textures ────────────────────────────────────────────────────────
  const bulletTex = bake(rend, BUL_SIZE, (g) => {
    const c = BUL_SIZE / 2, r = BUL_R;
    g.circle(c, c, r * 3.0).fill({ color: C_BGLOW, alpha: 0.07 });
    g.circle(c, c, r * 2.2).fill({ color: C_BGLOW, alpha: 0.14 });
    g.circle(c, c, r * 1.6).fill({ color: C_BGLOW, alpha: 0.25 });
    g.circle(c, c, r * 1.2).fill({ color: C_BGLOW, alpha: 0.40 });
    g.circle(c, c, r).fill({ color: C_BCORE });
    g.circle(c, c, r).stroke({ color: 0xffccee, width: 1.5, alpha: 0.85 });
    g.circle(c - r * 0.28, c - r * 0.30, r * 0.30).fill({ color: 0xffffff, alpha: 0.55 });
  });

  const trailTex = bake(rend, TRL_SIZE, (g) => {
    const c = TRL_SIZE / 2, r = TRL_R;
    g.circle(c, c, r * 1.5).fill({ color: C_BGLOW, alpha: 0.10 });
    g.circle(c, c, r).fill({ color: C_BCORE, alpha: 0.70 });
  });

  const sparkTex = bake(rend, SPK_SIZE, (g) => {
    const c = SPK_SIZE / 2, r = SPK_R;
    g.circle(c, c, r * 1.5).fill({ color: C_GRAZE, alpha: 0.12 });
    g.circle(c, c, r).fill({ color: C_GRAZE, alpha: 0.90 });
  });

  const starTex = bake(rend, STR_SIZE, (g) => {
    const c = STR_SIZE / 2, r = STR_R;
    g.circle(c, c, r * 1.6).fill({ color: C_STAR, alpha: 0.12 });
    g.circle(c, c, r).fill({ color: C_STAR, alpha: 0.80 });
  });

  // ── static background (drawn once, never cleared) ────────────────────────
  const bgGfx = new Graphics();
  bgGfx.rect(0, 0, W, H).fill({ color: C_BG });
  for (let x = 0; x <= W; x += 40) bgGfx.moveTo(x, 0).lineTo(x, H);
  for (let y = 0; y <= H; y += 40) bgGfx.moveTo(0, y).lineTo(W, y);
  bgGfx.stroke({ color: 0x5522aa, alpha: 0.10, width: 1 });

  // ── containers ───────────────────────────────────────────────────────────
  const starCt   = new Container();
  const trailCt  = new Container();
  const sparkCt  = new Container();
  const bulCt    = new Container();
  const ringGfx  = new Graphics();
  const playerGfx = new Graphics();
  const uiLayer  = new Container();

  app.stage.addChild(bgGfx, starCt, trailCt, sparkCt, bulCt, ringGfx, playerGfx, uiLayer);

  // Additive blend on trail/spark containers gives the neon-energy look
  // without needing per-sprite blend mode changes.
  trailCt.blendMode = "add";
  sparkCt.blendMode = "add";

  // ── star sprites (position/scale fixed; only .alpha updated per frame) ────
  const starData = Array.from({ length: 90 }, () => {
    const sz = 0.4 + Math.random() * 1.1;
    const sp = new Sprite(starTex);
    sp.anchor.set(0.5);
    sp.x = Math.random() * W;
    sp.y = Math.random() * H;
    sp.scale.set(sz / STR_R);
    starCt.addChild(sp);
    return { sp, base: 0.15 + Math.random() * 0.45, phase: Math.random() * Math.PI * 2, freq: 0.4 + Math.random() * 1.3 };
  });

  // ── sprite pools ─────────────────────────────────────────────────────────
  const bulletPool = new Pool(bulletTex, bulCt,   80);
  const trailPool  = new Pool(trailTex,  trailCt, 220);
  const sparkPool  = new Pool(sparkTex,  sparkCt, 200);

  // ── active lists ──────────────────────────────────────────────────────────
  const activeBullets: Sprite[] = [];
  const activeTrails:  Sprite[] = [];

  type Spark = { sp: Sprite; vx: number; vy: number; life: number; dur: number };
  type Ring  = { x: number; y: number; r: number; life: number };
  type Popup = { node: Text; life: number; vy: number };

  const activeSparks: Spark[] = [];
  const rings:  Ring[]  = [];
  const popups: Popup[] = [];

  const trails = new Map<string, Array<{ x: number; y: number }>>();
  let prevGrazedIds = new Set<string>();
  let prevWorldTime = 0;
  let time = 0;

  // ── helpers ───────────────────────────────────────────────────────────────
  function clearVisualState() {
    for (const s of activeSparks) sparkPool.put(s.sp);
    activeSparks.length = 0;
    rings.length = 0;
    for (const p of popups) { uiLayer.removeChild(p.node); p.node.destroy(); }
    popups.length = 0;
    trails.clear();
    prevGrazedIds.clear();
  }

  function spawnGraze(bx: number, by: number) {
    // sparks
    for (let i = 0; i < 10; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 80 + Math.random() * 200;
      const sz  = 1.5 + Math.random() * 2.5;
      const sp  = sparkPool.get();
      sp.x = bx; sp.y = by;
      sp.scale.set(sz / SPK_R);
      activeSparks.push({ sp, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 1, dur: 0.3 + Math.random() * 0.25 });
    }
    // expanding ring
    rings.push({ x: bx, y: by, r: 6, life: 1 });
    // popup text
    const node = new Text({
      text: "+10",
      style: new TextStyle({
        fill: "#44ddff",
        fontSize: 15,
        fontFamily: "'Courier New', monospace",
        fontWeight: "bold",
      }),
    });
    node.anchor.set(0.5);
    node.x = bx; node.y = by - 14;
    uiLayer.addChild(node);
    popups.push({ node, life: 1, vy: -55 });
  }

  // ── main update ───────────────────────────────────────────────────────────
  function update(world: WorldState, input: InputState, dt: number) {
    if (world.time < prevWorldTime - 0.1) clearVisualState();
    prevWorldTime = world.time;
    time += dt;

    // detect new grazes
    const grazed = world.player.grazedBulletIds as Set<string>;
    for (const id of grazed) {
      if (!prevGrazedIds.has(id)) {
        const b = world.bullets.find((b) => b.id === id);
        if (b) spawnGraze(b.position.x, b.position.y);
      }
    }
    prevGrazedIds = new Set(grazed);

    // ── stars: only update alpha (no geometry changes) ───────────────────
    for (const s of starData) {
      s.sp.alpha = s.base * (0.65 + 0.35 * Math.sin(time * s.freq + s.phase));
    }

    // ── trails: release-all then re-acquire from pool ─────────────────────
    trailPool.putAll(activeTrails);
    const aliveIds = new Set(world.bullets.map((b) => b.id));
    for (const id of trails.keys()) { if (!aliveIds.has(id)) trails.delete(id); }
    for (const b of world.bullets) {
      let t = trails.get(b.id);
      if (!t) { t = []; trails.set(b.id, t); }
      t.unshift({ x: b.position.x, y: b.position.y });
      if (t.length > 8) t.length = 8;
    }
    for (const [id, pts] of trails) {
      const b = world.bullets.find((b) => b.id === id);
      if (!b || pts.length < 2) continue;
      for (let i = 1; i < pts.length; i++) {
        const frac = i / pts.length;
        const sp = trailPool.get();
        sp.x = pts[i].x; sp.y = pts[i].y;
        sp.scale.set((b.radius / TRL_R) * (1 - frac) * 0.65);
        sp.alpha = (1 - frac) * 0.55;
        activeTrails.push(sp);
      }
    }

    // ── sparks: update position/alpha, release when dead ─────────────────
    for (let i = activeSparks.length - 1; i >= 0; i--) {
      const s = activeSparks[i];
      s.life -= dt / s.dur;
      if (s.life <= 0) { sparkPool.put(s.sp); activeSparks.splice(i, 1); continue; }
      s.sp.x += s.vx * dt;
      s.sp.y += s.vy * dt;
      s.vy += 130 * dt;
      s.sp.alpha = s.life * 0.9;
      s.sp.scale.set(s.sp.scale.x * (1 - dt * 0.5)); // gradual shrink
    }

    // ── bullets: release-all then re-acquire ─────────────────────────────
    bulletPool.putAll(activeBullets);
    for (const b of world.bullets) {
      const sp = bulletPool.get();
      sp.x = b.position.x; sp.y = b.position.y;
      sp.scale.set(b.radius / BUL_R);
      activeBullets.push(sp);
    }

    // ── graze rings (Graphics — 0-3 objects max) ──────────────────────────
    ringGfx.clear();
    for (let i = rings.length - 1; i >= 0; i--) {
      const rg = rings[i];
      rg.life -= dt / 0.5;
      if (rg.life <= 0) { rings.splice(i, 1); continue; }
      rg.r += 150 * dt;
      ringGfx.circle(rg.x, rg.y, rg.r).stroke({ color: C_GRAZE, width: 1.8, alpha: rg.life * 0.75 });
    }

    // ── player (Graphics — always one) ────────────────────────────────────
    const { player } = world;
    const px = player.position.x, py = player.position.y;
    playerGfx.clear();

    if (player.isGrazing) {
      const pulse = 0.55 + 0.45 * Math.sin(time * 18);
      playerGfx.circle(px, py, player.grazeRadius + 6).fill({ color: 0x0088cc, alpha: 0.07 * pulse });
      playerGfx.circle(px, py, player.grazeRadius).stroke({ color: C_GRAZE, width: 2, alpha: 0.9 });
    } else {
      playerGfx.circle(px, py, player.grazeRadius).stroke({ color: C_GRAZE, width: 0.9, alpha: 0.22 });
    }
    playerGfx.circle(px, py, 11).fill({ color: 0x9999ff, alpha: 0.08 });

    if (input.slow) {
      const gap = player.hitRadius + 4, len = 14;
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]] as [number,number][]) {
        playerGfx
          .moveTo(px + dx * gap, py + dy * gap)
          .lineTo(px + dx * len, py + dy * len)
          .stroke({ color: 0xaaaaff, width: 1.1, alpha: 0.7 });
      }
    }

    playerGfx.circle(px, py, player.hitRadius + 2.5).fill({ color: 0xffffff, alpha: 0.13 });
    playerGfx.circle(px, py, player.hitRadius).fill({ color: 0xffffff });

    // ── popup texts ───────────────────────────────────────────────────────
    for (let i = popups.length - 1; i >= 0; i--) {
      const p = popups[i];
      p.life -= dt / 0.8;
      if (p.life <= 0) {
        uiLayer.removeChild(p.node); p.node.destroy(); popups.splice(i, 1); continue;
      }
      p.node.y += p.vy * dt;
      p.node.alpha = Math.min(p.life * 2, 1);
    }
  }

  return { update };
}
