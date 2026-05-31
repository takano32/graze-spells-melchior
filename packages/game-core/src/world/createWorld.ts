import type { WorldState } from "../types";
import { MELCHIOR_FIRST_CHOIR } from "../spells/melchior";

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
    spell: { ...MELCHIOR_FIRST_CHOIR },
    status: "playing",
    nextBulletId: 0,
  };
}
