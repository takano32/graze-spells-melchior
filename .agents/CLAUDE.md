# CLAUDE.md

Claude Code entrypoint for **Graze Spells: Melchior**.

All reusable instructions live in this `.agents` directory.

@AGENTS.md
@SKILL.md

## Claude Code notes

- Treat `AGENTS.md` as the shared cross-agent policy.
- Treat `SKILL.md` as the split implementation skill index.
- Treat `skills/*/SKILL.md` as detailed implementation playbooks.
- Use `pnpm` by default.
- Assume commands are run from the repository root.
- Do not introduce Yarn, npm workspaces, Bun, or Corepack-specific setup unless explicitly requested.
- Do not add Expo until explicitly requested.
- Keep `packages/game-core` platform-independent.
- Do not delete user-created files unless explicitly asked.
- Do not copy Touhou official names, assets, locations, character names, or spell names into code or documentation.
