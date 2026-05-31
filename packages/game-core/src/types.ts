export type Vec2 = { x: number; y: number };

export type PlayerState = {
  position: Vec2;
  hitRadius: number;
  grazeRadius: number;
  grazedBulletIds: ReadonlySet<string>;
  isGrazing: boolean;
};

export type BulletState = {
  id: string;
  position: Vec2;
  velocity: Vec2;
  radius: number;
};

export type ScoreState = {
  score: number;
  grazeCount: number;
};

export type SpellState = {
  name: string;
  nextBurstTime: number;
  burstIndex: number;
  startTime: number;
};

export type WorldState = {
  time: number;
  fieldWidth: number;
  fieldHeight: number;
  player: PlayerState;
  bullets: BulletState[];
  score: ScoreState;
  spell: SpellState;
  status: "playing" | "gameOver";
  nextBulletId: number;
};

// Platform-independent input abstraction — web maps keyboard, mobile maps touch
export type InputState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  slow: boolean;
};
