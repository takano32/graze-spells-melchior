# Roadmap

## Phase 0: Project scaffold

- create pnpm workspace
- create `apps/web`
- create `packages/game-core`
- add root scripts
- add README and docs
- add agent guidance

## Phase 1: Minimal simulation

- define `WorldState`
- define `PlayerState`
- define `BulletState`
- define `InputState`
- implement `createWorld`
- implement `updateWorld`

## Phase 2: Web playfield

- add playfield
- capture keyboard input
- render player
- render bullets
- run animation loop
- show score

## Phase 3: Graze and collision

- implement hit radius
- implement graze radius
- implement collision detection
- implement graze detection
- track grazed bullet IDs
- show hitbox/graze debug overlay
