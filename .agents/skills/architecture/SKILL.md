# Architecture Skill

## Core rule

Keep game simulation independent from UI and rendering.

`packages/game-core` must stay platform-independent.

## Allowed in `game-core`

- TypeScript types
- pure functions
- deterministic update functions
- game state
- player state
- bullet state
- spell definitions
- graze detection
- collision detection
- scoring
- input state abstractions

## Avoid in `game-core`

- React
- DOM APIs
- Canvas APIs
- browser globals
- Expo APIs
- React Native APIs
- audio playback
- platform-specific asset loading

## Package responsibilities

`apps/web`: Vite + React web app, input capture, playfield mounting, animation loop, HUD, and debug UI.

`apps/mobile`: future Expo app. Do not add until explicitly requested.

`packages/game-core`: pure TypeScript simulation, deterministic state updates, collision/graze rules, and spell pattern logic.

`packages/game-renderer`: rendering helpers when needed.

`packages/game-ui`: shared UI components when actually reusable.

`packages/assets`: shared sprites, audio, fonts, and metadata when needed.

## API direction

Prefer an update API shaped like this:

```ts
const nextWorld = updateWorld(world, input, deltaSeconds);
```
