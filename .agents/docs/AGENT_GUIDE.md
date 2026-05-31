# Agent Guide

This repository keeps all agent instructions under `.agents/`.

## Entrypoints

```txt
.agents/AGENTS.md
.agents/CLAUDE.md
.agents/SKILL.md
```

## Import structure

```txt
.agents/AGENTS.md
  -> skills/*/SKILL.md
  -> docs/*.md

.agents/CLAUDE.md
  -> AGENTS.md
  -> SKILL.md

.agents/SKILL.md
  -> skills/project/SKILL.md
  -> skills/workspace/SKILL.md
  -> skills/architecture/SKILL.md
  -> skills/game-core/SKILL.md
  -> skills/gameplay/SKILL.md
  -> skills/web/SKILL.md
  -> skills/expo/SKILL.md
  -> skills/theme/SKILL.md
  -> skills/verification/SKILL.md
```

## Note on root bridge files

This package intentionally contains only `.agents/`.

If a tool requires root-level discovery, add a thin root bridge outside this package.

Example for Codex:

```md
# AGENTS.md

@.agents/AGENTS.md
```

Example for Claude Code:

```md
# CLAUDE.md

@.agents/CLAUDE.md
```


## GitHub Actions

CI workflows are included at:

```txt
.github/workflows/agents.yml
.github/workflows/ci.yml
```

`agents.yml` can run immediately.

`ci.yml` uses pnpm 11 and Node.js 24, but skips Node checks until `package.json` exists.
