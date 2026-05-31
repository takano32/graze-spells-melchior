# Verification

## Result

Expected structure:

```txt
.agents/
  AGENTS.md
  CLAUDE.md
  SKILL.md
  README.md
  docs/
  skills/
```

## Compatibility

- `.agents/AGENTS.md` is the main agent entrypoint.
- `.agents/CLAUDE.md` is the Claude-specific entrypoint.
- `.agents/SKILL.md` imports all split skills.
- All reusable documents live inside `.agents`.
- The ZIP intentionally contains no files outside `.agents`.
