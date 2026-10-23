# Phase A in game-v2 (beats 1–5)

Owned by Development Agent 04. Logic lives in `game-slices/02-phase-a/module.js` and is wired here.

## Files

| Path | Role |
| --- | --- |
| `../game-slices/02-phase-a/module.js` | `CLASSROOM.modules.phaseA` — `reduce` / `viewModel` |
| `js/phase-a.js` | `CLASSROOM.phaseA` fold adapter (unwraps packed reduce results) + `syncBeats` |
| `js/phase-a-ui.js` | Host action list for beats 1–5 |
| `js/phase-a-boot.js` | Optional Node boot |

## Script order for the integrator

```html
<script src="../game-slices/02-phase-a/module.js"></script>
<script src="js/phase-a.js"></script>
<script src="js/phase-a-ui.js"></script>
```

Fold with `CLASSROOM.phaseA.reduce(state, action)`. Side panel: `CLASSROOM.phaseAUi.actionsFor(state)`.

## Rules (not invented)

- Beat 1: walk with squeaky dog toy or bubble wrap; silent sneak impossible; not the prize claim. End (recommendation): back side of checkpoint line.
- Beat 2: throw only while **starting to wake**; plush on mat → 5s laugh; kids may move those 5s (DESIGN-DECISION). No invented wake to force the throw.
- Beat 3: **eyes open** ≠ wake ≠ stir; movers become the statue; caught laugh → three steps back only.
- Beat 4: unnoticed sticky note on teacher’s back passes the mid-way line.
- Beat 5: claim + one blast (popper or confetti) ends **Phase A**. Session stays open for the silly-string finale.

## Verify

```bash
node ../game-slices/02-phase-a/module.js
node js/phase-a.js
```
