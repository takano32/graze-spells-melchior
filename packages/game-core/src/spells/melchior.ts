import type { BulletState, SpellState } from "../types";
import { fromAngle, scale } from "../math/vector";

// Melchior Opening: First Choir
// Rotating ring bursts from the top — 12 bullets per burst, slow rotation each wave
const BURST_INTERVAL = 0.7;
const BULLET_COUNT = 12;
const BULLET_SPEED = 125;
const ROTATION_PER_BURST = Math.PI / 12; // 15° per burst

export const MELCHIOR_FIRST_CHOIR: SpellState = {
  name: "Melchior Opening: First Choir",
  nextBurstTime: 0.6,
  burstIndex: 0,
};

export function spawnFirstChoirBurst(
  spell: SpellState,
  nextId: number,
  fieldWidth: number
): { bullets: BulletState[]; spell: SpellState; nextId: number } {
  const emitterX = fieldWidth / 2;
  const emitterY = 64;
  const baseAngle = spell.burstIndex * ROTATION_PER_BURST;

  const bullets: BulletState[] = Array.from({ length: BULLET_COUNT }, (_, i) => {
    const angle = baseAngle + (i / BULLET_COUNT) * Math.PI * 2;
    const velocity = scale(fromAngle(angle), BULLET_SPEED);
    return {
      id: `b${nextId + i}`,
      position: { x: emitterX, y: emitterY },
      velocity,
      radius: 7,
    };
  });

  return {
    bullets,
    spell: {
      ...spell,
      nextBurstTime: spell.nextBurstTime + BURST_INTERVAL,
      burstIndex: spell.burstIndex + 1,
    },
    nextId: nextId + BULLET_COUNT,
  };
}
