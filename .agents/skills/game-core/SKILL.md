---
name: graze-spells-game-core
description: Use when implementing Graze Spells Melchior platform-independent TypeScript simulation, world updates, game state, spells, collision, grazing, scoring, and input abstractions.
---

# Game Core Skill

## Suggested modules

Inside `packages/game-core/src/`, prefer small modules:

```txt
index.ts
types.ts

math/
  vector.ts

world/
  createWorld.ts
  updateWorld.ts

player/
  player.ts
  movement.ts

bullets/
  bullet.ts
  patterns.ts

spells/
  spell.ts
  melchior.ts

collision/
  hitTest.ts
  grazeTest.ts

scoring/
  score.ts

input/
  inputState.ts
```

Avoid a single huge `Game.ts`.

## Minimal public API

Export a small public API from `packages/game-core/src/index.ts`.

Example direction:

```ts
export type { WorldState, InputState } from "./types";
export { createWorld } from "./world/createWorld";
export { updateWorld } from "./world/updateWorld";
```

The web app should import from the workspace package `@graze-spells/game-core`.

## State shape

A useful first world state:

```ts
type WorldState = {
  time: number;
  player: PlayerState;
  bullets: BulletState[];
  score: ScoreState;
  spell: SpellState;
  status: "playing" | "gameOver";
};
```

## Determinism

Spell behavior should be deterministic by default. Avoid unseeded randomness in core spell logic.

## Code style

Use TypeScript. Prefer named exports, explicit public types, small pure functions, deterministic update paths, simple data structures, readable module names, and comments for gameplay constants.
