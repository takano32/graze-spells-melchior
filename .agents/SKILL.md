# SKILL.md

Split skill index for **Graze Spells: Melchior**.

This file is intentionally small. Detailed implementation guidance lives under:

```txt
skills/
```

## Loading order

@skills/project/SKILL.md
@skills/workspace/SKILL.md
@skills/architecture/SKILL.md
@skills/game-core/SKILL.md
@skills/gameplay/SKILL.md
@skills/web/SKILL.md
@skills/expo/SKILL.md
@skills/theme/SKILL.md
@skills/verification/SKILL.md

## Non-importing agents

If an agent does not support `@path` imports, read the files listed above manually in order.

## Quick rules

- Use pnpm.
- Keep `packages/game-core` platform-independent.
- Start web-first with React/Vite.
- Do not add Expo until explicitly requested.
- Build toward the first playable prototype.
- Keep the design dodge-first: graze, survive, read patterns, avoid cleanly.
