import type { PlayerState, BulletState } from "../types";
import { distance } from "../math/vector";

export function isColliding(player: PlayerState, bullet: BulletState): boolean {
  return distance(player.position, bullet.position) <= player.hitRadius + bullet.radius;
}

export function anyCollision(player: PlayerState, bullets: BulletState[]): boolean {
  return bullets.some((b) => isColliding(player, b));
}
