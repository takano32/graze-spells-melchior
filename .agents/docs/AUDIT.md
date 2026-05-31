# Audit

## Result

PASS.

## Scope

This package is `.agents`-only.

There are no root-level `AGENTS.md`, `CLAUDE.md`, `README.md`, or `docs/` entries in the ZIP.

## Import strategy

- `.agents/AGENTS.md` imports skill and documentation files.
- `.agents/CLAUDE.md` imports `.agents/AGENTS.md` and `.agents/SKILL.md`.
- `.agents/SKILL.md` imports each split skill directory.

## Notes

If a runtime needs automatic discovery from repository root, add a root bridge separately.
