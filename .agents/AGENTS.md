# AGENTS.md

Main agent entrypoint for **Graze Spells: Melchior**.

All agent-facing project instructions are intentionally kept inside `.agents/`.

## Project identity

```txt
Series: Graze Spells
Entry: Melchior
Full title: Graze Spells: Melchior
Repository: graze-spells-melchior
Package manager: pnpm
```

## Load shared instructions

Read these files before making changes.

@SKILL.md
@skills/project/SKILL.md
@skills/workspace/SKILL.md
@skills/architecture/SKILL.md
@skills/game-core/SKILL.md
@skills/gameplay/SKILL.md
@skills/web/SKILL.md
@skills/expo/SKILL.md
@skills/theme/SKILL.md
@skills/verification/SKILL.md

## Load documentation

@docs/PROJECT_BRIEF.md
@docs/SETUP.md
@docs/DEVELOPMENT.md
@docs/ARCHITECTURE.md
@docs/GAME_DESIGN.md
@docs/ROADMAP.md
@docs/CONTRIBUTING.md
@docs/AGENT_GUIDE.md
@docs/VERIFICATION.md
@docs/AUDIT.md
@docs/CI.md

## Essential rules

- Use `pnpm` / pnpm 11 for new setup.
- Assume commands are run from the repository root.
- Keep `packages/game-core` platform-independent.
- Do not add Expo until explicitly requested.
- Do not introduce Yarn, npm workspaces, Bun, or Corepack-specific setup unless explicitly requested.
- Do not copy Touhou official names, assets, locations, character names, or spell names.
- Preserve the dodge-first design: graze, survival, readable bullets, clean hitboxes.
- Make small useful changes and verify with available commands.
- Prefer `pnpm typecheck` and `pnpm build:web` after code changes.
- If a command does not exist or cannot run, say so plainly.

## Optional root bridges

This package intentionally contains only `.agents/`.

If a tool needs root-level discovery, create a tiny root bridge separately.
