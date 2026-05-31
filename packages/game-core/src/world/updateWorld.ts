import type { WorldState, InputState } from "../types";
import { movePlayer } from "../player/movement";
import { anyCollision } from "../collision/hitTest";
import { checkGraze } from "../collision/grazeTest";
import { spawnGrowingBurst } from "../spells/melchior";

const OFFSCREEN_MARGIN = 40;

function isOffScreen(x: number, y: number, w: number, h: number): boolean {
  return x < -OFFSCREEN_MARGIN || x > w + OFFSCREEN_MARGIN ||
         y < -OFFSCREEN_MARGIN || y > h + OFFSCREEN_MARGIN;
}

export function updateWorld(world: WorldState, input: InputState, dt: number): WorldState {
  if (world.status === "gameOver") return world;

  const newTime = world.time + dt;
  const player = movePlayer(world.player, input, dt, world.fieldWidth, world.fieldHeight);

  let bullets = world.bullets.map((b) => ({
    ...b,
    position: {
      x: b.position.x + b.velocity.x * dt,
      y: b.position.y + b.velocity.y * dt,
    },
  }));

  let spell = world.spell;
  let nextBulletId = world.nextBulletId;

  // Handle burst spawning with growing complexity
  if (newTime >= spell.nextBurstTime) {
    const result = spawnGrowingBurst(spell, nextBulletId, world.fieldWidth, player.position, newTime);
    bullets = [...bullets, ...result.bullets];
    spell = result.spell;
    nextBulletId = result.nextId;
  }

  if (anyCollision(player, bullets)) {
    return { ...world, time: newTime, player, bullets, spell, nextBulletId, status: "gameOver" };
  }

  const { player: grazedPlayer, score } = checkGraze(player, bullets, world.score);

  const activeBullets = bullets.filter(
    (b) => !isOffScreen(b.position.x, b.position.y, world.fieldWidth, world.fieldHeight)
  );

  return {
    ...world,
    time: newTime,
    player: grazedPlayer,
    bullets: activeBullets,
    score,
    spell,
    nextBulletId,
    status: "playing",
  };
}
