# Gameplay Skill

## Design pillar

This is a dodge-first game.

The main pleasure should be:

```txt
passing close to danger without being hit
```

## Graze detection

Treat graze as separate from collision.

Suggested model:

- player has a small `hitRadius`
- player has a larger `grazeRadius`
- bullet has a `radius`
- collision occurs when distance <= `hitRadius + bullet.radius`
- graze occurs when distance <= `grazeRadius + bullet.radius`
- graze should not count if collision already happened
- each bullet should usually grant graze once

Track grazed bullet IDs explicitly.

## Bullet patterns

Prefer deterministic patterns first.

A good early pattern:

- emitter at top center
- fan or radial bursts
- slow enough to read
- slight rotation over time
- unique bullet IDs
- readable gaps

## Scoring

Early scoring can be simple:

```txt
+1 graze count per newly grazed bullet
+score per graze
```

## Debug visuals

Useful early debug options:

- show player hitbox
- show graze radius
- show bullet radius
- pause / step frame
- reset run
- display FPS / delta
- display graze count and score
