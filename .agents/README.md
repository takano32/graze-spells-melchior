# Graze Spells: Melchior Agents

This directory contains all agent-facing instructions and documentation for **Graze Spells: Melchior**.

The package is intentionally `.agents`-only.

## Entrypoints

```txt
AGENTS.md
CLAUDE.md
SKILL.md
```

## Layout

```txt
.agents/
  README.md
  AGENTS.md
  CLAUDE.md
  SKILL.md
  docs/
  skills/
```

## Optional root bridges

If a tool requires root-level discovery, add a tiny bridge outside `.agents`.

Codex-style bridge:

```md
# AGENTS.md

@.agents/AGENTS.md
```

Claude Code bridge:

```md
# CLAUDE.md

@.agents/CLAUDE.md
```
