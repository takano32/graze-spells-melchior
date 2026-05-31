import type { BulletState, SpellState, Vec2 } from "../types";
import { fromAngle, scale, normalize, add, vec2 } from "../math/vector";

export const MELCHIOR_SPELL: SpellState = {
  name: "Melchior: Infinite Choir",
  nextBurstTime: 0.5,
  burstIndex: 0,
  startTime: 0,
};

export function spawnGrowingBurst(
  spell: SpellState,
  nextId: number,
  fieldWidth: number,
  playerPos: Vec2,
  currentTime: number
): { bullets: BulletState[]; spell: SpellState; nextId: number } {
  const elapsed = currentTime - spell.startTime;
  const bullets: BulletState[] = [];
  let currentId = nextId;

  // 1. Core Rotating Pattern (The "Root")
  // Gradually increases in rotation speed and bullet count
  const rotationSpeed = Math.PI / 15 + (elapsed * 0.01); // Slower rotation
  const ringCount = Math.floor(6 + Math.min(elapsed * 0.25, 8)); // Starts at 6, grows to 14
  const ringSpeed = 95 + (elapsed * 1.2); // Slower base and growth
  
  const emitterX = fieldWidth / 2;
  const emitterY = 64;
  const baseAngle = spell.burstIndex * rotationSpeed;

  for (let i = 0; i < ringCount; i++) {
    const angle = baseAngle + (i / ringCount) * Math.PI * 2;
    bullets.push({
      id: `b${currentId++}`,
      position: { x: emitterX, y: emitterY },
      velocity: scale(fromAngle(angle), ringSpeed),
      radius: 7,
    });
  }

  // 2. Secondary Aimed Pattern (The "Growth")
  // Appears after 15 seconds, and its frequency/count increases very slowly
  if (elapsed > 15) {
    const sideMargin = 80;
    const sideY = 120;
    const emitters = [vec2(sideMargin, sideY), vec2(fieldWidth - sideMargin, sideY)];
    
    // Aimed bullets count grows from 1 to 2
    const aimedCount = Math.floor(1 + Math.min((elapsed - 15) * 0.1, 1));
    const aimedSpeed = 120 + (elapsed * 1.0);

    for (const emitter of emitters) {
      const toPlayer = normalize(add(playerPos, scale(emitter, -1)));
      const baseAngle = Math.atan2(toPlayer.y, toPlayer.x);

      for (let i = 0; i < aimedCount; i++) {
        const spread = aimedCount > 1 ? (i - (aimedCount - 1) / 2) * 0.25 : 0;
        bullets.push({
          id: `b${currentId++}`,
          position: { ...emitter },
          velocity: scale(fromAngle(baseAngle + spread), aimedSpeed),
          radius: 8,
        });
      }
    }
  }

  // Next burst interval decreases more slowly (relaxed tempo)
  const nextInterval = Math.max(0.9 - (elapsed * 0.01), 0.55);

  return {
    bullets,
    spell: {
      ...spell,
      nextBurstTime: currentTime + nextInterval,
      burstIndex: spell.burstIndex + 1,
    },
    nextId: currentId,
  };
}
