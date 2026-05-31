# Contributing

## Project direction

Graze Spells: Melchior is a dodge-first bullet-hell game.

Contributions should support readable bullet patterns, clear hitboxes, satisfying graze feedback, deterministic simulation, React web prototype first, and future Expo portability.

## Package manager

Use pnpm.

```bash
pnpm install
pnpm typecheck
pnpm build:web
```

## Code boundaries

Keep `packages/game-core` platform-independent.

Do not import React, DOM, Canvas, Expo, or React Native APIs into `game-core`.

## Naming

Use original names.

Avoid direct use of official Touhou names, characters, places, spell cards, or assets.
