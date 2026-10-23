---
cursor:
  subagentId: "bc-50b3ea7f-8184-5f41-bbf6-20cc0bbcf854"
---

# Dev 09 — Session & edges

## Outcome

Session frame and pacing edges are implemented and wired into `game-v2/`. Design sheets `docs/classroom-game/design/01-session-architecture.md` and `09-pacing-and-edges.md` were already present from the design phase and match the binding decisions; they were left in place (other agents’ frontmatter).

## Delivered

| Path | Role |
| --- | --- |
| `game-slices/01-session/module.js` | Kept correct — one session, min 2 kids, rear handoff, both finales |
| `game-slices/09-edges/module.js` | Finished — five edges + one-kid gaps for beats 7 and 9 |
| `game-slices/09-edges/coverage.md` | Action / check table |
| `game-v2/js/session.js` | Session copy |
| `game-v2/js/edges.js` | Edges copy |
| `game-v2/js/session-edges.js` | Fold helper + Node self-test |
| `game-v2/README-session-edges.md` | Integrator script order |
| `game-v2/session-edges-harness.html` | Headed seam check |
| `game-v2/index.html` | Loads session + edges first, then sibling slices |

## Contract

- `CLASSROOM.modules.session` — `startSession`, `markFinalA`, `beginPhaseB` (requires `kidsAtRear: true`), `markFinalB`
- `CLASSROOM.modules.edges` — never stir / never turn / drop / noticed note / laugh-during-five; records `one-kid-line-pass` and `one-kid-other-crawl` without inventing repairs
- Session won only when `finals.a` and `finals.b` are both true

## Verify

```bash
node game-slices/01-session/module.js
node game-slices/09-edges/module.js
node game-v2/js/session-edges.js
```

All three print `ok`.
