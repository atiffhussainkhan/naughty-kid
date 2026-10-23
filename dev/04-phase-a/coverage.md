---
cursor:
  subagentId: "bc-a574e1f4-cb50-5bed-8742-442b3e7cd327"
---

# Phase A coverage — Development Agent 04

Authority order: mega-requirements → design/game-design.md → design/02-phase-a.md.  
Logic: `game-slices/02-phase-a/module.js`. Adapter: `game-v2/js/phase-a.js`.

| Beat | Name | Actions | Requirement / decision |
| --- | --- | --- | --- |
| 1 | The Squeaky Toy Shoes | `beat1Step` | REQ-MEGA-008, 048, 009, 041. Walk with under-foot object; not silent; not the prize claim. End (recommendation): back side of checkpoint line → beat 2. |
| 2 | The Feather Tickle Trigger | `hostStir`, `beat2Throw`, `beat2LaughEnd` / `hostLaughEnd` | REQ-MEGA-010, 011, 042, 049. DB: starts-to-wake = throw window only; 5s laugh = move window. Miss = no laugh (recommendation). No stir → quiet end, no invented wake. |
| 3 | The Copycat Pose | `beat3Eyes`, `hostSleep` | REQ-MEGA-012, 050, 013, 014, 040. DB: eyes open ≠ wake ≠ stir. Caught mover → statue; caught laugh → three steps back only. End (recommendation): asleep again → beat 4. |
| 4 | The Sticky Note Sabotage | `beat4Note` | REQ-MEGA-016, 051, 052, 017, 053, 072. Unnoticed note on back passes line. Noticed (recommendation): no pass, beat stays open, no steps. |
| 5 | The Confetti Victory Blast | `beat5Prize` | REQ-MEGA-018, 054, 055, 019, 056, 073. Claim + one blast ends Phase A. Session not won. Caught (recommendation): prize stays, beat open, no steps. |

## Shared Phase A rules wired here

| Rule | Where |
| --- | --- |
| Wake freezes every kid (outside laugh) | `hostWake` → `frozen` + `freezeAll` event |
| Sleep clears freeze; current beat continues | `hostSleep` |
| Laugh blocks wake / eyes | refused during `laughing` |
| Phase A claim does not start Phase B | `beat5Prize` leaves `phase: "A"` |
| Session win not set by Phase A | `finals.sessionWon: false` |

## Gaps left open (not invented)

- How many kids; who is “a kid” for throw / note / claim (host asks one — recommendation only when action omits id).
- Step length in units (movement slice owns footfalls).
- Whether other statues / note drawings count (sample used when host names none).
- Return path to the back for Phase B (out of this slice).
