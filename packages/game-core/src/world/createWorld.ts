import type { WorldState } from "../types";
import { MELCHIOR_SPELL } from "../spells/melchior";

export function createWorld(fieldWidth: number, fieldHeight: number): WorldState {
  return {
    time: 0,
    fieldWidth,
    fieldHeight,
    player: {
      position: { x: fieldWidth / 2, y: fieldHeight - 80 },
      hitRadius: 4,
      grazeRadius: 16,
      grazedBulletIds: new Set(),
      isGrazing: false,
    },
    bullets: [],
    score: { score: 0, grazeCount: 0 },
    spell: { ...MELCHIOR_SPELL },
    status: "playing",
    nextBulletId: 0,
  };
}
