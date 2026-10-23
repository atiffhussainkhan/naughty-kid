---
cursor:
  subagentId: "bc-6b7b4d11-108c-5672-a2b8-1d7664d74778"
---

# Teacher coverage

`node module.js` in this folder exits 0. The run prints `teacher: N checks passed`.

Classic script. The module is `CLASSROOM.modules.teacher`. It owns the teacher body state and emits movement follow-ups. It does not change kid spots.

## Ten states

| State | Role |
| --- | --- |
| Asleep | Phase A default at the desk |
| Starting to wake | Feather-trigger window only (beat 2). No freeze. |
| Laughing for 5 seconds | 5000 ms. Kids may move. No freezeAll. No catchMovers. |
| Wakes up | Emits `freezeAll`. Every kid pose. Not a statue. Not send-back. |
| Eyes open | Emits `catchMovers`. Movers become statues. |
| Standing into Phase B | Emits `standUp`. Pose/statue/steps stop. |
| Facing the whiteboard | Strict activity |
| Typing | Strict activity |
| Reading | Strict activity |
| Turned away investigating | Beat 9 look. No freeze. No steps. |

## Binding events

| Host action | Teacher state | Events |
| --- | --- | --- |
| `hostStir` | Starting to wake | none |
| `hostLaughStart` | Laughing for 5 seconds | `laughWindow` open |
| `hostLaughEnd` | Asleep | `laughWindow` closed |
| `hostWake` | Wakes up | `freezeAll` (skipped during laugh) |
| `hostEyes` | Eyes open | `catchMovers` (skipped during laugh) |
| `hostSleep` from wake | Asleep | `asleep` |
| `hostSleep` from eyes | Asleep | `eyesShut` |
| `hostStand` | Standing into Phase B | `standUp` |

## No invented penalties

Missed plush, noticed sticky note, whoopee noise, dropped sunglasses, early race, and crawl/no-crawl have no teacher reaction and no send-back here. The only send-back stays in `CLASSROOM.modules.movement.kidLaugh`.
