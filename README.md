# Graze Spells: Melchior

**Graze Spells: Melchior** is a React-first bullet-hell dodge game concept focused on grazing, survival, readable spell patterns, and clean hitboxes.

This package contains the human-facing project documentation, agent instructions, split skills, and GitHub Actions workflows used to bootstrap development with Codex, Claude Code, or other coding agents.

```txt
Series: Graze Spells
Entry: Melchior
Full title: Graze Spells: Melchior
Repository: graze-spells-melchior
Package manager: pnpm 11
```

## Concept

Most bullet-hell games are described by what they throw at the player.

Graze Spells: Melchior is described by what the player does:

> dodge closer, graze cleaner, survive longer.

The game should prioritize elegant movement, readable bullet patterns, visible hitboxes, and satisfying near-miss scoring.

## First playable goal

The first milestone is a minimal playable web prototype.

It should include:

- player movement
- bullet spawning
- visible or debuggable player hitbox
- visible or debuggable graze radius
- graze scoring
- collision reset or game over
- one named Melchior spell pattern

Suggested first spell:

```txt
Melchior Opening: First Choir
```

## Technical direction

The project should start as a web game and later support Expo mobile.

Initial stack:

- TypeScript
- React
- Vite
- pnpm 11
- Node.js 24

Future target:

- Expo mobile app
- shared platform-independent game core

The main architecture rule is:

> Keep `packages/game-core` independent from React, DOM, Canvas, Expo, and React Native.

## Preferred repository shape

```txt
apps/
  web/
  mobile/

packages/
  game-core/
  game-renderer/
  game-ui/
  assets/
```

Start small:

```txt
apps/web/
packages/game-core/
```

## Root files

The root agent files are intentionally thin wrappers:

```txt
AGENTS.md      # imports .agents/AGENTS.md
CLAUDE.md      # imports .agents/CLAUDE.md
```

The root README is the human-facing project document.

```txt
README.md      # human-facing overview
```

## Agent instructions

Canonical agent instructions live under:

```txt
.agents/
  README.md
  AGENTS.md
  CLAUDE.md
  SKILL.md
  docs/
  skills/
```

Implementation guidance is split by topic under:

```txt
.agents/skills/
  project/SKILL.md
  workspace/SKILL.md
  architecture/SKILL.md
  game-core/SKILL.md
  gameplay/SKILL.md
  web/SKILL.md
  expo/SKILL.md
  theme/SKILL.md
  verification/SKILL.md
```

## Human documentation

Supporting documentation lives under:

```txt
.agents/docs/
```

Useful starting points:

- `.agents/docs/PROJECT_BRIEF.md`
- `.agents/docs/SETUP.md`
- `.agents/docs/DEVELOPMENT.md`
- `.agents/docs/ARCHITECTURE.md`
- `.agents/docs/GAME_DESIGN.md`
- `.agents/docs/ROADMAP.md`
- `.agents/docs/CI.md`

## GitHub Actions

This package includes modern pnpm-oriented GitHub Actions workflows:

```txt
.github/workflows/agents.yml
.github/workflows/ci.yml
```

`agents.yml` verifies the documentation and agent instruction structure immediately.

`ci.yml` is prepared for the future React/Vite workspace. It uses Node.js 24 and pnpm 11, and skips Node checks until `package.json` exists.

## Package manager

Use pnpm 11.

```bash
pnpm install
pnpm dev:web
pnpm build:web
pnpm typecheck
```

Corepack is not required.

## Design boundaries

Use original names and concepts.

The project may be inspired by spell-card battles and dodge-first bullet patterns, but should not copy official Touhou names, assets, locations, characters, or spell names.

## Current status

Documentation, agent-instruction, split-skill, and CI bootstrap package.
