# Dev 05 — Phase B (beats 6–10)

## Delivered

| Path | What |
| --- | --- |
| `game-slices/03-phase-b/module.js` | Canonical `CLASSROOM.modules.phaseB` (`reduce` / `viewModel`) |
| `game-v2/js/phase-b.js` | Fold adapter → `CLASSROOM.phaseB` |
| `game-v2/js/phase-b-ui.js` | Host actions for beats 6–10 |
| `game-v2/README-phase-b.md` | Integrator wiring notes |
| `game-3d/js/phase-b.js` | Unwraps packed slice results (compat) |

`/workspace` was not touched.

## Beats

1. **6 Whoopee** — exactly 3 hidden; wrong step = loud noise, not a send-back; ends when all kids are off the path on the mailbox side.
2. **7 Sunglasses** — feet-only pass down the line; drop returns to last feet; no solo form (gap recorded).
3. **8 Doodle** — whiteboard turn (DESIGN-DECISION 3); hat or giant ears with flashlight; quiet pause if the turn never comes.
4. **9 Monster** — “The broccoli has landed!” (or host sample); teacher investigates; others may crawl; zero crawls still ends.
5. **10 Silly string** — note in mailbox starts finale; gentle spray on named target **and** victory dance wins Phase B only (DESIGN-DECISION 4).

## Verify

```bash
node game-slices/03-phase-b/module.js   # ok
node game-v2/js/phase-b.js              # game-v2 phase-b ok
node game-3d/js/phase-b.js              # phase-b checks passed
```

Full headed Chrome through both finales waits on the integrator’s `game-v2/index.html`.
