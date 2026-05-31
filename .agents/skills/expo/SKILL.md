# Expo Skill

## Expo status

Do not add Expo until explicitly requested.

The project is designed to later support Expo mobile, but the first milestone is web-first.

## Future mobile app

When requested, place Expo under:

```txt
apps/mobile
```

Expo Router files should live under:

```txt
apps/mobile/app
```

## Sharing rules

When Expo is added:

- keep Expo platform code out of `game-core`
- keep React Native APIs out of `game-core`
- share only platform-independent logic through packages
- define touch input as an abstraction before wiring it to mobile UI
- check for duplicate React / React Native / Expo versions if build errors occur

## Mobile preparation before Expo

Before adding Expo, audit `game-core` for platform dependencies, isolate renderer assumptions, define input abstractions, and keep game state serializable and testable.
