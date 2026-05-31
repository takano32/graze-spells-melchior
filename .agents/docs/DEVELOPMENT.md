# Development Guide

## Package manager

Use pnpm 11.

```bash
pnpm install
pnpm dev:web
pnpm build:web
pnpm typecheck
```

## Adding dependencies

Add web-only dependencies to the web app:

```bash
pnpm --filter @graze-spells/web add <package>
```

Add core-only dependencies to game core:

```bash
pnpm --filter @graze-spells/game-core add <package>
```

Link workspace packages:

```bash
pnpm --filter @graze-spells/web add @graze-spells/game-core@workspace:*
```

## Development principles

Make the smallest useful change.

Prefer small modules, named exports, explicit public types, pure functions in `game-core`, deterministic update logic, debug-friendly constants, and simple shapes before assets.
