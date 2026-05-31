---
name: graze-spells-web
description: Use when building or changing the Graze Spells Melchior Vite React web app, game loop, input capture, canvas rendering, HUD, and debug UI.
---

# Web Skill

## Web app

The web app belongs under:

```txt
apps/web
```

Use Vite + React + TypeScript unless the repository already uses another setup.

## Responsibilities

The web app should mount the game view, capture keyboard input, run `requestAnimationFrame`, call the core update function, render the playfield, show HUD/debug info, and expose reset/pause controls when needed.

## React guidance

Keep React responsible for page structure, input capture, and mounting the game view.

Do not bury core simulation directly inside large React components.

Avoid putting every bullet in React state if performance becomes poor.

Canvas is acceptable for the playfield.

React state is fine for HUD, menus, debug toggles, and settings UI.

## Game loop placement

For the first web prototype:

- `requestAnimationFrame` can live in `apps/web`
- simulation update logic should live in `game-core`
- rendering can initially be simple React or Canvas in `apps/web`
- time delta should be passed into core update functions
