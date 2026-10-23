---
cursor:
  subagentId: "bc-a574e1f4-cb50-5bed-8742-442b3e7cd327"
---

# Phase A — integration notes

## Ownership

Agent 04 owns Phase A beat logic only. Room shell, characters, teacher-state machine, movement footfalls, Phase B, and `game-v2/index.html` stay with their agents.

Mirror of Phase B layout: `js/phase-a.js` unwraps packed reduce results (same fold shape as `phase-b.js`); `js/phase-a-ui.js` feeds the host panel.

## State fields this slice reads / writes

| Field | Role |
| --- | --- |
| `phase`, `beat`, `finals` | Gate beats 1–5; claim sets `finals.a` / `finals.confetti` |
| `picks.noisemaker` / `picks.noise`, `picks.victory` / `picks.blast` | Locked host picks |
| `throwWindow`, `plushOnMat`, `laughing`, `laughSeconds`, `mayMove` | Beat 2 |
| `eyesOpened`, `caught`, `statue`, `statuePose`, `sendBack` | Beat 3 |
| `noteOnBack`, `linePassed`, `zone` | Beat 4 → 5 |
| `prizeClaimed`, `blast`, `phaseAEnded`, `sessionWon` | Beat 5 (sessionWon always false here) |
| `frozen` | Wake pose; cleared on `hostSleep` |
| `kids[]` | Optional per-kid walk / catch / zone |

## Action contract (matches audit scenarios)

`beat1Step`, `beat2Throw`, `beat2LaughEnd`, `beat3Eyes`, `beat4Note`, `beat5Prize`, plus `hostStir` / `hostWake` / `hostSleep` / `hostLaughEnd` handled here when the teacher module has not already closed the window.

## Conflicts

If another agent also writes Phase A reduce logic, keep `game-slices/02-phase-a/module.js` — it follows design/02-phase-a.md and the DESIGN-DECISION lines. Recommendation-only exits are commented in that file.

## Not done by this agent

- Headed Chrome session screenshots in `media/game-v2/` (integrator / verify pass).
- `docs/classroom-game/asset-selection-3d.md` (3D models agent).
- Wiring `game-v2/index.html` Three.js fold.
