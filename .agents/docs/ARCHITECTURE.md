# Architecture

## Overview

Graze Spells: Melchior should be built as a small TypeScript monorepo.

The key architectural goal is to separate simulation from platform concerns.

```txt
apps/
  web/
  mobile/

packages/
  game-core/
  game-renderer/
  game-ui/
  assets/
```

## Rule zero

`packages/game-core` must not depend on React, DOM, Canvas, Expo, or React Native.

Game logic should be reusable across platforms.

## Core update shape

Aim for a simple update API:

```ts
const nextWorld = updateWorld(world, input, deltaSeconds);
```
