---
cursor:
  subagentId: "bc-35836513-71e1-5668-8d0d-cb55634db71f"
---

# Movement coverage

`node module.js` in this folder exits 0. The run prints `movement: 40 checks passed`.

Classic script. The module is `CLASSROOM.modules.movement`. It owns `kids[]` and only these fields on each kid: `id`, `spot` (0 is the back), `moving`, `frozen`, `statue`.

## Actions

| Action | What it does |
| --- | --- |
| `kidStep(id)` | One footfall away from the back (`spot + 1`) and sets `moving`. Refused, spot unchanged, while `frozen` or `statue`, unless the laugh window is open. |
| `kidStill(id)` | Sets `moving` false. Spot unchanged. |
| `freezeAll()` | Wake. Every kid `frozen`, `moving` false. Does not set `statue`. Does not change `spot`. Skipped during the laugh window and after stand-up. |
| `catchMovers()` | Eyes open. A kid with `moving` true becomes a `statue` and stops. A kid already still is left alone. Spot unchanged. Skipped during the laugh window and after stand-up. |
| `kidLaugh(id)` | The only send-back. If that kid is a statue, not in a wake pose, and not inside the laugh window, three footfalls toward the back. Spot never goes below 0. Everyone else stays. |

`laughWindow`, `asleep`, `eyesShut`, `standUp`, `addKid`, `placeKid`, and `reset` are host controls. `placeKid` sets a spot for setup or the walk back to the start of Phase B. It is not a failure result.

## Checks

| Check | Rule | Authority |
| --- | --- | --- |
| `owns-five-fields`, `back-is-zero`, `starts-still` | Kid record is id, spot, moving, frozen, statue. New kids stand at the back, still. | This slice |
| `step-leaves-back`, `step-does-not-catch`, `other-kid-stays` | A forward footfall is not a catch and does not move anyone else. | REQ-MEGA-047 |
| `still-clears-moving`, `already-still-not-caught`, `still-kid-not-in-catch` | A kid who is already still is not caught. | REQ-MEGA-012, game design beat 3 |
| `catch-only-mover`, `catch-stops-moving`, `catch-does-not-move` | Eyes open statues only the kid who is moving, and does not move them. | REQ-MEGA-012, REQ-MEGA-050 |
| `laugh-without-catch-stays`, `wake-laugh-is-not-send-back`, `laugh-during-window-stays` | A laugh sends nobody back unless that kid was caught moving. A wake pose and the 5-second window are not that laugh. | REQ-MEGA-014, REQ-MEGA-049 |
| `three-footfalls`, `three-from-five`, `back-wall-steps-in-place` | The send-back is three footfalls toward spot 0. Against the back, the remaining footfalls stay in place. | REQ-MEGA-014, REQ-MEGA-040 |
| `laugh-leaves-the-other`, `neighbor-unmoved` | The other kid stays on their spot. | REQ-MEGA-014 |
| `second-laugh-does-not-move` | One catch produces one send-back. | REQ-MEGA-040 |
| `wake-freezes-all`, `wake-stops-moving`, `wake-is-not-a-statue`, `wake-does-not-move`, `wake-then-eyes-catches-nobody` | “Wakes up” freezes every kid in a pose. It is not the statue and not a send-back. | REQ-MEGA-007 |
| `frozen-step-stays`, `asleep-clears-freeze`, `step-after-asleep` | The pose holds until Asleep. Then the same spot can step again. | Game design, wake row |
| `laugh-window-may-move`, `wake-skipped-during-laugh`, `eyes-skipped-during-laugh`, `send-back-after-window` | During the 5-second laugh, kids may move. That window is the exception to the wake. | REQ-MEGA-049 |
| `eyes-shut-clears-statue` | Eyes shut ends the statue and leaves the spot. | Game design beat 3 |
| `stand-clears-holds`, `phase-b-has-no-pose`, `phase-b-has-no-statue`, `phase-b-has-no-send-back` | After the teacher stands, the pose, the statue, and the three steps stop. | Game design, Phase B join |
| `place-is-not-three-steps`, `place-can-set-the-back-again` | Host placement is not the send-back. | REQ-MEGA-023 |

## No other penalty

These mistakes have no written send-back. This module has no action that walks a kid backward for them. A forward `kidStep` still adds one spot. A refused step while frozen or a statue leaves the spot as it is.

- A missed plush, a noticed sticky note, or reaching the desk while caught (REQ-MEGA-010, REQ-MEGA-053, REQ-MEGA-018).
- A whoopee noise (REQ-MEGA-060).
- A dropped pair of sunglasses, or a pass that is not made with feet (REQ-MEGA-062, REQ-MEGA-063).
- A race before the whiteboard turn (REQ-MEGA-030).
- Crawling or not crawling on the monster yell (REQ-MEGA-067). The yell itself is not this module.
- A laugh from a kid who was not caught.

REQ-MEGA-038 and REQ-MEGA-071 stay in force: a silent beat does not grow a failure rule here.
