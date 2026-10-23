---
cursor:
  subagentId: "bc-a574e1f4-cb50-5bed-8742-442b3e7cd327"
---

# Development Agent 04 — Phase A

## Delivered

| Path | Role |
| --- | --- |
| `game-slices/02-phase-a/module.js` | Canonical Phase A reduce + viewModel (`CLASSROOM.modules.phaseA`) |
| `game-v2/js/phase-a.js` | game-v2 adapter: `CLASSROOM.phaseA` + `syncBeats` |
| `game-v2/js/phase-a-ui.js` | Host action list for beats 1–5 |
| `game-v2/js/phase-a-boot.js` | Optional Node boot |
| `game-v2/README-phase-a.md` | Integrator-facing Phase A readme |
| `dev/04-phase-a/coverage.md` | Requirement → action map |
| `dev/04-phase-a/notes.md` | Integration notes for the playable-page agent |

## Beats implemented

1. Squeaky shoes — walk with squeaky dog toy or bubble wrap; end on back side of line.
2. Plush + 5s laugh — throw only while starting to wake; hit forces 5s move window.
3. Statue — eyes open catches movers; caught laugh owes three steps back.
4. Sticky note — unnoticed note on teacher’s back passes the checkpoint line.
5. Prize + blast — claim with popper or confetti ends Phase A; session stays open.

## Verify

```bash
node game-slices/02-phase-a/module.js
```

Expect `ok`.

## Integrator script order

```html
<script src="../game-slices/02-phase-a/module.js"></script>
<script src="js/phase-a.js"></script>
<!-- then teacher, movement, session, index fold -->
```

Fold `CLASSROOM.phaseA.reduce` with the other reducers. Call `CLASSROOM.phaseA.syncBeats(state)` after dispatch if props/characters expose `applyPhaseA`.
