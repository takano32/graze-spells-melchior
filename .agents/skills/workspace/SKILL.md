---
name: graze-spells-workspace
description: Use when working with the Graze Spells Melchior pnpm workspace, package layout, dependency commands, and repository structure.
---

# Workspace Skill

## Package manager

Use **pnpm 11**.

Do not introduce Yarn, npm workspaces, Bun, or Corepack-specific setup unless explicitly requested.

Corepack is not required.

## Command assumptions

Assume commands are run from the repository root.

Do not repeatedly include:

```bash
cd graze-spells-melchior
```

Preferred commands:

```bash
pnpm install
pnpm dev:web
pnpm build:web
pnpm typecheck
```

## Workspace layout

Prefer this repository layout:

```txt
apps/
  web/
    src/

  mobile/
    app/
    src/

packages/
  game-core/
    src/

  game-renderer/
    src/

  game-ui/
    src/

  assets/
```

Start with the smallest useful version:

```txt
apps/web/
packages/game-core/
```

## Dependency commands

Add web-only dependencies:

```bash
pnpm --filter @graze-spells/web add <package>
```

Add core dependencies:

```bash
pnpm --filter @graze-spells/game-core add <package>
```

Link workspace packages:

```bash
pnpm --filter @graze-spells/web add @graze-spells/game-core@workspace:*
```
