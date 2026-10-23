# Session & edges in game-v2 (Dev 09)

Logic lives in the slices. Copies under `js/` keep the playable root self-contained.

## Files

| Path | Role |
| --- | --- |
| `../game-slices/01-session/module.js` | `CLASSROOM.modules.session` — one session, handoff, both finales |
| `../game-slices/09-edges/module.js` | `CLASSROOM.modules.edges` — five edges + one-kid gaps |
| `js/session.js` | Copy of the session slice for `game-v2/` |
| `js/edges.js` | Copy of the edges slice for `game-v2/` |
| `js/session-edges.js` | Fold helper: `CLASSROOM.sessionEdges.reduce` / `viewModel` |
| `session-edges-harness.html` | Headed check without Three.js |
| `index.html` | Loads session + edges first, then sibling slices |

## Script order

```html
<script src="js/session.js"></script>
<script src="js/edges.js"></script>
<script src="js/session-edges.js"></script>
```

Or from the slices:

```html
<script src="../game-slices/01-session/module.js"></script>
<script src="../game-slices/09-edges/module.js"></script>
<script src="js/session-edges.js"></script>
```

## Rules (not invented)

- **One session.** `startSession` refuses a second open session.
- **Min 2 kids.** Fewer than two kids does not start.
- **Phase handoff.** `beginPhaseB` requires `kidsAtRear: true` after finale A. Beat 6 waits.
- **Both finales.** Confetti blast ends Phase A only. Silly string ends Phase B. `sessionWon` only when both happened (DESIGN-DECISION 4 / REQ-MEGA-036).
- **One-kid gaps.** Beat 7 line pass and beat 9 other-kids crawl record `one-kid-line-pass` / `one-kid-other-crawl`. No solo form is added.
- **Five edges.** Never stirs, never turns, sunglasses drop, noticed note, laugh during the five — kids stay put; only beat 3’s three steps send anyone back.

## Verify

```bash
node ../game-slices/01-session/module.js
node ../game-slices/09-edges/module.js
node js/session-edges.js
```

Open `session-edges-harness.html` for the seam buttons. Full stage: `index.html`.
