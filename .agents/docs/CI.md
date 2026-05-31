# CI

## Direction

Use modern pnpm-based GitHub Actions.

Current baseline:

```txt
Node.js: 24
pnpm: 11
Runner: ubuntu-24.04
Actions: checkout@v6, setup-node@v6, pnpm/action-setup@v6
```

## Workflows

```txt
.github/workflows/agents.yml
.github/workflows/ci.yml
```

## `agents.yml`

Runs immediately, even before a JavaScript project exists.

It checks:

- root bridge files
- `.agents` entrypoints
- split skill files
- `.agents/docs` files
- bridge import lines
- pnpm policy wording

## `ci.yml`

Runs Node/pnpm checks after `package.json` exists.

Until then, it skips Node/pnpm steps without failing.

Once the project scaffold exists, it runs:

```bash
pnpm install
pnpm typecheck
pnpm build:web
```

If `pnpm-lock.yaml` exists, CI uses:

```bash
pnpm install --frozen-lockfile
```

If the lockfile has not been created yet, it uses:

```bash
pnpm install --no-frozen-lockfile
```

## Package manager policy

Use pnpm.

Do not switch to Yarn, npm workspaces, Bun, or Corepack-specific setup unless explicitly requested.
