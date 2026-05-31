import type { PlayerState, BulletState, ScoreState } from "../types";
import { distance } from "../math/vector";

const GRAZE_SCORE = 10;

export function checkGraze(
  player: PlayerState,
  bullets: BulletState[],
  score: ScoreState
): { player: PlayerState; score: ScoreState } {
  let newScore = score.score;
  let newGrazeCount = score.grazeCount;
  const newGrazedIds = new Set(player.grazedBulletIds);
  let isGrazing = false;

  for (const bullet of bullets) {
    const dist = distance(player.position, bullet.position);
    const inGrazeRange = dist <= player.grazeRadius + bullet.radius;
    const notColliding = dist > player.hitRadius + bullet.radius;

    if (inGrazeRange && notColliding) {
      isGrazing = true;
      if (!newGrazedIds.has(bullet.id)) {
        newGrazedIds.add(bullet.id);
        newScore += GRAZE_SCORE;
        newGrazeCount += 1;
      }
    }
  }

  return {
    player: { ...player, grazedBulletIds: newGrazedIds, isGrazing },
    score: { score: newScore, grazeCount: newGrazeCount },
  };
}
