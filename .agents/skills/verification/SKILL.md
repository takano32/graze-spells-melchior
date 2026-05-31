# Verification Skill

## Before finishing code changes

Run the most relevant available checks.

Preferred order:

```bash
pnpm typecheck
pnpm build:web
```

If tests exist:

```bash
pnpm test
```

If a command does not exist, say so. Do not pretend verification passed.

## Good task breakdown

For implementation work, prefer small steps:

1. set up workspace
2. add `game-core`
3. add world/player/bullet types
4. add movement update
5. add one bullet pattern
6. add collision detection
7. add graze detection
8. render simple playfield
9. add HUD score
10. add reset loop

Each step should leave the repository closer to a playable prototype.

## What not to do

Do not convert the project to another package manager, introduce a full game engine without request, add Expo early, add backend services, add auth, add payments, copy official Touhou names or assets, delete user-created files without explicit instruction, or bury important logic in generated boilerplate.
