---
cursor:
  subagentId: "bc-6b7b4d11-108c-5672-a2b8-1d7664d74778"
---

# Teacher ↔ movement bindings

Authority: `docs/classroom-game/design/04-teacher-states.md`, `docs/classroom-game/design/05-movement-failure.md`.

## DESIGN-DECISION 1 — three wake moments

| Host | Teacher state | Movement follow-up |
| --- | --- | --- |
| `hostStir` | Starting to wake | none (feather window) |
| `hostWake` | Wakes up | `freezeAll` |
| `hostEyes` | Eyes open | `catchMovers` |

Never stacked. Stir is not a freeze. Wake is not a statue. Eyes is not a full-room freeze.

## DESIGN-DECISION 2 — laugh window

During `Laughing for 5 seconds`:

- `laughOpen === true` via `laughWindow` open
- `hostWake` and `hostEyes` keep the laugh state and emit nothing
- `kidStep` is allowed even if the kid was frozen/statue (movement skips holds while the window is open)
- A kid laugh during the window is **not** three-step send-back

## Only send-back

`movement.kidLaugh(id)` when that kid is a statue, not in a wake pose, and not inside the laugh window → three footfalls toward spot 0.

## Phase B

`hostStand` → `standUp`. Pose, statue, and three steps stop. Phase B activities do not emit freeze or catch.
