import type { BulletState, SpellState, Vec2 } from "../types";
import { fromAngle, scale, normalize, add, vec2 } from "../math/vector";

export const MELCHIOR_SPELL: SpellState = {
  name: "Melchior: Infinite Choir",
  nextBurstTime: 0.5,
  burstIndex: 0,
  startTime: 0,
  intensity: 0,
};

export function spawnGrowingBurst(
  spell: SpellState,
  nextId: number,
  fieldWidth: number,
  playerPos: Vec2,
  currentTime: number
): { bullets: BulletState[]; spell: SpellState; nextId: number } {
  const intensity = spell.intensity;
  const bullets: BulletState[] = [];
  let currentId = nextId;

  // 1. Core Rotating Pattern (The "Root")
  // Gradually increases in rotation speed and bullet count
  const rotationSpeed = Math.PI / 15 + (intensity * 0.02); // Faster rotation growth
  // Complexity scaling: Increase number of bullets per ring more aggressively
  const ringCount = Math.floor(6 + Math.min(intensity * 0.6, 24)); 
  const ringSpeed = 95 + (intensity * 2.5); 
  
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

  // Next burst interval decreases faster based on intensity
  const nextInterval = Math.max(0.9 - (intensity * 0.03), 0.35); // Even faster tempo growth and lower cap (0.4 -> 0.35)

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
