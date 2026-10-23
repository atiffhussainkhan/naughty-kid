# Phase B in game-v2 (beats 6–10)

Owned by Development Agent 05. Logic lives in `game-slices/03-phase-b/module.js` and is wired here.

## Files

| Path | Role |
| --- | --- |
| `../game-slices/03-phase-b/module.js` | `CLASSROOM.modules.phaseB` — `reduce` / `viewModel` |
| `js/phase-b.js` | `CLASSROOM.phaseB` fold adapter (unwraps packed reduce results) |
| `js/phase-b-ui.js` | Host action list for beats 6–10 |

## Script order for the integrator

```html
<script src="../game-slices/03-phase-b/module.js"></script>
<script src="js/phase-b.js"></script>
<script src="js/phase-b-ui.js"></script>
```

Fold with `CLASSROOM.phaseB.reduce(state, action)`. Side panel: `CLASSROOM.phaseBUi.actionsFor(state)`.

## Rules (not invented)

- Exactly **3** hidden whoopee cushions. Wrong step = loud noise, **not** a send-back.
- Beat 7: feet-only sunglasses pass; drop returns to last feet.
- Beat 8: whiteboard turn (DESIGN-DECISION 3); hat or giant ears; quiet pause if the turn never comes (game-design).
- Beat 9: sample yell “The broccoli has landed!”; others may crawl; zero crawls still ends the beat.
- Beat 10: note in mailbox starts the finale; gentle spray on the named target **while** dancing wins **Phase B only** (DESIGN-DECISION 4). Session win still needs Phase A’s confetti finale.

## Verify

```bash
node ../game-slices/03-phase-b/module.js
node js/phase-b.js
```
