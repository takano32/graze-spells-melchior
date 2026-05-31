# Game Design Notes

## Design pillar

Graze Spells: Melchior is a dodge-first bullet-hell game.

The main pleasure should be passing close to danger without being hit.

## Graze

Graze is separate from collision.

Suggested rule:

```txt
collision: distance <= player.hitRadius + bullet.radius
graze:     distance <= player.grazeRadius + bullet.radius
```

A bullet should not award graze if it collides.

A bullet should usually award graze only once.

Track grazed bullet IDs explicitly.
