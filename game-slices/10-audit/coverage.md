# Coverage — game-design requirements

Source: `docs/classroom-game/design/game-design.md`, every paragraph tagged **Requirement**. Scenarios live in `module.js` as `CLASSROOM.modules.audit.scenarios`.

`expect.finals` is `{ confetti, sillyString, sessionWon }`. `expect.phase` is `A` or `B`. `expect.teacher` uses the design’s state names. A clause is a **gap** when no allowed action performs it, or when `expect` cannot show it.

| Requirement in the game design | Scenario | Result |
| --- | --- | --- |
| A kid who was caught moving and then laughs takes three steps back. The send-back belongs to Eyes open. | `send-back` | Covered. Eyes are open, the mover is caught, three back steps follow, beat stays 3. |
| That send-back is the only one in the session. | `send-back` | Covered. It is the only scenario whose actions are back steps. Beat exits do not send the group to an earlier beat. |
| A laugh during the 5-second window is not this send-back. | — | **Gap.** No action is a kid’s laugh. `laugh` only shows that a `kidStep` during Laughing stays on beat 2. |
| A laugh from a kid who was not caught is not this send-back. | — | **Gap.** No action is a kid’s laugh. |
| A laugh during a wake pose is not this send-back. | — | **Gap.** `beat-01-wake` freezes the group and does not step them back, but it cannot play a laugh during the pose. |
| Beat 1: the kids walk from the back with the under-foot object. Finishing the walk does not claim the prize. | `beat-01` | Covered. After the walk, beat 2 has started, the teacher is Asleep, and `confetti` is false. |
| Silent sneaking is impossible. The sound is the object. | — | **Gap.** `expect` has no sound field. |
| If the teacher wakes up, every kid freezes until the teacher is asleep again, and the walk then continues. | `beat-01-wake` | Covered. `hostWake`, `freezeAll`, `hostSleep`, then the walk. Expect is beat 2, Asleep, prize unclaimed. |
| If the teacher starts to wake, a kid can throw the plush. A plush on the mat forces the 5-second laugh, and the kids may move. | `laugh` | Covered. Stir, a hit, Laughing, a step during the laugh. Beat stays 2. The prize stays unclaimed. |
| The session does not add a wake to force the throw. | — | **Gap.** No action ends beat 2 when the teacher never starts to wake. `beat-02` is the hit path only. |
| The teacher opens their eyes. Anyone caught moving freezes and imitates a statue. | `beat-03` | Covered. One kid is still, one kid is moving, eyes open, movers are caught, then the teacher sleeps and beat 4 starts. |
| Passing the line takes a sneak, a note on the teacher’s back, and no notice. The pass counts when that is true. | `beat-04` | Covered. An unnoticed note advances to beat 5. The teacher stays Asleep. |
| A kid who reaches the desk without getting caught claims the prize and does the one blast. The confetti throw is the blast that goes over the teacher’s head. The popper is the other blast. | `beat-05`, `final-a` | Covered. `beat-05` pops the popper. `final-a` throws the confetti over the head. Each claim is one blast. |
| Phase A ends on that claim. Reaching the desk is beat 5. The session is still open. | `beat-05`, `final-a` | Covered. Beat stays 5, `confetti` is true, `sessionWon` is false. |
| Phase B starts in the same room. The teacher stands into the picked activity. The kids are at the back before beat 6. | `phase-b-open` | Covered. Phase B, beat 6, teacher Facing the whiteboard. The blast is already done and the session is not won. |
| Props from Phase A stay in the room. | — | **Gap.** `expect` has no prop field. |
| The kids guess the cushions. A wrong step makes a loud noise. That noise is not a send-back. | `beat-06-noise` | Covered. A revealed whoopee step leaves the session on beat 6 with the same teacher. `beat-06` is the later exit off the path, which the design marks as a recommendation, not a requirement. |
| The kids pass the sunglasses down the line using only their feet, without dropping them. The pass is what they do instead of work. | `beat-07` | Covered. One feet-only pass with no drop. Beat 8 starts. The scenario has no work action. |
| The kids race to the teacher’s shadow and draw with the flashlight. The drawing is a hat, or giant ears. No other signal replaces the turn. | `beat-08` | Covered. The drawing is a hat, on the board activity. Beat 9 starts. The action list has no second signal. Giant ears are the other listed option and are not required in the same drawing. |
| One kid yells a phrase in a deep monster voice. On that yell the teacher turns to investigate. | `beat-09` | Covered. The yell uses the written sample. The teacher is then returned to Facing the whiteboard, and beat 10 starts with the mailbox still empty. |
| While the teacher is turned, the other kids can crawl forward. | — | **Gap.** No crawl action. `beat-09` ends with no crawl, so the permission is not played. |
| The finale starts once the secret note reaches the mailbox. | `beat-10-mailbox` | Covered. The note is in. `sillyString` is false and `sessionWon` is false, so the mailbox moment has not finished the finale. |
| The kids gently spray the locked target and do a victory dance while they spray. The desk is the Phase A desk. | `beat-10` | Covered. The locked target is the desk. The spray is gentle and the dance happens during it. |
| Phase B ends with that finale: note in the mailbox, spray on the target, dance while they spray. | `final-b` | Covered. |
| The confetti victory blast ends Phase A and does not win the session. | `final-a` | Covered. |
| The silly string finale ends Phase B. | `final-b` | Covered. |
| The session is won only after both finales. | `session-won` | Covered. `final-a` has the blast and `sessionWon: false`. `session-won` has both finales and `sessionWon: true`. |

## Checks the module always runs

`node module.js` requires one scenario whose `beat` is 1, 2, 3, 4, 5, 6, 7, 8, 9, and 10, plus `laugh`, `send-back`, `final-a`, `final-b`, and `session-won`.

| Beat | Scenario that ends the beat |
| --- | --- |
| 1 | `beat-01` |
| 2 | `beat-02` |
| 3 | `beat-03` |
| 4 | `beat-04` |
| 5 | `beat-05` |
| 6 | `beat-06` |
| 7 | `beat-07` |
| 8 | `beat-08` |
| 9 | `beat-09` |
| 10 | `beat-10` |
