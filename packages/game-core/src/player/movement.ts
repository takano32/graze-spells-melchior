import type { PlayerState, InputState } from "../types";
import { normalize, scale, length } from "../math/vector";

const SPEED_NORMAL = 220;
const SPEED_SLOW = 90;

export function movePlayer(
  player: PlayerState,
  input: InputState,
  dt: number,
  fieldWidth: number,
  fieldHeight: number
): PlayerState {
  const dx = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const dy = (input.down ? 1 : 0) - (input.up ? 1 : 0);
  const raw = { x: dx, y: dy };
  const dir = length(raw) > 0 ? normalize(raw) : raw;
  const speed = input.slow ? SPEED_SLOW : SPEED_NORMAL;
  const move = scale(dir, speed * dt);

  const r = player.hitRadius;
  return {
    ...player,
    position: {
      x: Math.max(r, Math.min(fieldWidth - r, player.position.x + move.x)),
      y: Math.max(r, Math.min(fieldHeight - r, player.position.y + move.y)),
    },
  };
}
