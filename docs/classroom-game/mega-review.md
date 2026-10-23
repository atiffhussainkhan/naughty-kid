---
cursor:
  subagentId: "bc-93b99d53-e369-53ce-95a8-f5cfc1262272"
---

# Mega requirements review

Design-readiness pass on `docs/classroom-game/mega-requirements.md`. Source order used: the brief, then slices 01–10. The slice files were not edited.

The fixed document has **76** requirements, `REQ-MEGA-001` through `REQ-MEGA-077`, with `REQ-MEGA-037` retired. **3** duplicate behaviors were removed. **4** DESIGN-BLOCKERs stay open.

## Duplicates removed

Same behavior had two homes. One home remains. Every slice id that still supports that behavior stays on the survivor.

1. **Phase B starts immediately in the same room.** It was in `REQ-MEGA-001` and `REQ-MEGA-020`. It stays on `REQ-MEGA-020`. `REQ-MEGA-001` keeps only the session shape: one session, Phase A (Game 1) then Phase B (Game 2). `REQ-06-001` and `REQ-10-005` moved onto `020`. `REQ-02-001` stays on both, because that slice line states both facts.
2. **The session is won only when both finales have happened.** It was in `REQ-MEGA-036` and `REQ-MEGA-037`. It stays on `REQ-MEGA-036`. `REQ-MEGA-037` is retired. Its extra label, a separate Phase B win, is not adopted. See DB-4.
3. **The popper and the paper-confetti throw.** Both were inside `REQ-MEGA-018` and again inside `REQ-MEGA-019`. The reach-and-claim stays on `018`. The two actions are `054` and `055`. The merge-rule name “confetti victory blast” stays on `019`.

The whoopee noise was also inside both the old guess requirement (`028`) and the old send-back requirement (`040`). The noise now has one home, `REQ-MEGA-060`. “Not a send-back” is not restated there. The only written send-back remains `REQ-MEGA-040`.

## Splits

The old id keeps the first clause. New ids are only the clauses that needed their own test. No surviving statement was renumbered.

| Old | Statement that stayed | New |
| --- | --- | --- |
| REQ-MEGA-004 | Teacher sleeping at the front desk | REQ-MEGA-046 guarding the target prize |
| REQ-MEGA-006 | Kids start at the back | REQ-MEGA-047 sneak from the back to grab the target prize |
| REQ-MEGA-008 | Walk across the room | REQ-MEGA-048 squeaky dog toy or bubble wrap under the feet |
| REQ-MEGA-011 | Plush on the mat forces a 5-second laugh | REQ-MEGA-049 those 5 seconds give everyone time to move |
| REQ-MEGA-012 | Eyes open: anyone caught moving freezes | REQ-MEGA-050 that kid imitates a statue |
| REQ-MEGA-016 | A mid-way checkpoint line exists | REQ-MEGA-051 sneak up; REQ-MEGA-052 sticky note on the back; REQ-MEGA-053 teacher does not notice |
| REQ-MEGA-018 | Reach the desk without getting caught and claim the target prize | REQ-MEGA-054 pop a safe party popper; REQ-MEGA-055 throw paper confetti over the teacher’s head |
| REQ-MEGA-019 | Either blast action is the confetti victory blast | REQ-MEGA-056 Phase A ends on the claim with that blast |
| REQ-MEGA-022 | The strict teacher pretends to be very strict | REQ-MEGA-057 whiteboard, computer, or big book |
| REQ-MEGA-026 | Deliver the secret note to the target mailbox | REQ-MEGA-058 mailbox on the other side of the room |
| REQ-MEGA-027 | Floor lined with cushions | REQ-MEGA-059 three hidden whoopee cushions |
| REQ-MEGA-028 | Guess which cushions are safe | REQ-MEGA-060 a wrong pick makes a loud noise |
| REQ-MEGA-029 | The pass is instead of work | REQ-MEGA-061 sunglasses down the line; REQ-MEGA-062 feet only; REQ-MEGA-063 without dropping |
| REQ-MEGA-030 | Drawing when the teacher turns to face the board | REQ-MEGA-064 race to the shadow; REQ-MEGA-065 flashlight; REQ-MEGA-066 hat or giant ears |
| REQ-MEGA-033 | Teacher turns to investigate the yell | REQ-MEGA-067 the other kids can crawl forward |
| REQ-MEGA-034 | Finale starts when the note reaches the mailbox | REQ-MEGA-068 gentle silly string; REQ-MEGA-069 desk or shoes; REQ-MEGA-070 victory dance |
| REQ-MEGA-039 | A silent beat’s failure result is UNKNOWN | REQ-MEGA-071 do not add a failure rule |
| REQ-MEGA-041 | The beat 1 walk is not the claim | REQ-MEGA-072 checkpoint stays on beat 4; REQ-MEGA-073 the desk stays on beat 5 |
| REQ-MEGA-044 | A stage is a phase or a beat | REQ-MEGA-074 build; REQ-MEGA-075 rebuild |

Retired, not renumbered:

| Old | Where the surviving clause went |
| --- | --- |
| REQ-MEGA-037 | Session-win clause → REQ-MEGA-036. The “Phase B win” clause has no new id. |

Added so a slice rule that was already in force has an id. These are not splits of an old mega id:

| New | Why |
| --- | --- |
| REQ-MEGA-076 | REQ-10-014. Unstated material stays UNKNOWN unless one tiny join is required. |
| REQ-MEGA-077 | REQ-10-015. That join is labeled MERGE-CHOICE and is the smallest rule that keeps both texts. |

`REQ-MEGA-001` was narrowed, not split. The removed clause already had an id (`020`).

## Contradictions resolved from the brief

The brief already decided these. Section 10 of the mega document records the slice reading that lost.

- One teacher stands up and becomes the strict teacher in the same room. Not two teachers and not two rooms.
- Phase B opens with the kids at the back, including just after the desk claim. Smallest join (`REQ-MEGA-023`). The path is still UNKNOWN.
- Beat 10 sprays the teacher’s desk carried from Phase A (`REQ-MEGA-025`). No second desk was added.
- The beat 1 walk does not replace the checkpoint or the desk (`041`, `072`, `073`).
- The plush throw stays “can” and “if.” No wake is added so beat 2 can fire (`010`, `042`).
- Beat 8 still waits on the turn to the board. No replacement signal (`030`, `043`).
- The popper counts as the confetti victory blast. A claim does not also have to throw confetti (`019`). “Over the teacher’s head” stays on the paper-confetti throw (`055`).
- Hat or giant ears is a real choice. The brief uses “or,” not “like” (`066`).
- “They” in the three steps follows “anyone caught moving” (`014`).
- The 5 seconds give “everyone” time to move (`049`). The slice’s “every kid” is not adopted.
- The checkpoint is a mid-way checkpoint line (`016`). “Across the room” is not adopted.
- The target prize is the guarded target. The secret note is a note.
- No player count is stated.
- The session is won only when both finales have happened (`036`). That decision does not define the word “game.”

## DESIGN-BLOCKERs left open

Four. The brief does not decide them. The mega document states both sides and the wrong assumption. It does not add a rule.

**DB-1.** “Wakes up,” “starts to wake up,” and “suddenly opens their eyes” are three phrases. A designer would wrongly assume one combined moment, or three scheduled teacher events.

**DB-2.** The 5-second laugh gives everyone time to move, and a wake-up tells the kids to freeze. A designer would wrongly assume the laugh cancels the freeze, or the freeze cancels the time to move.

**DB-3.** The strict teacher may face a whiteboard. Beat 8 starts when the teacher turns to face the board. A designer would wrongly assume those are the same object, or that the room has a second board. No board prop was added.

**DB-4.** Beat 10 says the kids win the game. The merge rule says the session is won only when both finales have happened. The session rule is applied. A designer would wrongly assume the mailbox line wins the session without the confetti blast, or that the kids get two wins. Unknown 53 records the open word. It was closed before by the retired `REQ-MEGA-037`.

## Wording made testable

- “Hilarious,” “funny,” and “goofy” are source tone on the walk, the pose, the note, the noise, the hat, the statue, and the monster voice. They are not pass/fail tests. “Ridiculous,” “silly,” and “confused” are treated the same way. “Silly string” stays the prop name.
- The one-foot statue, the mustache, the goofy face, and “The broccoli has landed!” are examples introduced by “like.” They are not required forms. Whether any other statue, picture, or phrase counts stays UNKNOWN. Slice 08’s “any other instance still passes” is not adopted.
- Each real “or” says any one option meets it: target prize, under-foot object, blast, strict-teacher activity, hat or giant ears, desk or shoes. None of those lists requires every option. Whether one moment may use more than one option stays UNKNOWN where it was already unknown.
- One name each for the target prize, the room, the teacher’s desk, the mid-way checkpoint line, and the designated shield mat. “Wakes up,” “starts to wake up,” and “opens their eyes” are not swapped. “Whiteboard” and “the board” are not swapped. “Session” is the combined play. “The game” appears only as beat 10’s quoted words.
- The opening no longer says Phase B begins “at once,” which could be read as playing both phases together. Phase B starts when Phase A ends.
- “Immediately,” “instantly,” and “quickly” are not given durations. The only stated duration is the 5-second laugh.

## Refused to invent

- A kid count, including the slice’s “at least two.”
- A second prize, a feather prop, a second desk, a second board, a second room, or a second teacher.
- A timer other than 5 seconds. A step length. A room size. A position for the mat, the line, the mailbox, the shadow, or the cushions.
- A failure result for a beat that does not write one. Beat 6’s noise was not turned into a send-back. A dropped pair of sunglasses was not given a return spot.
- A safe-cushion minimum, or a test that a step succeeds when the cushion has no whoopee (`REQ-06-014`, `REQ-06-016`).
- A rule that the plush must hit the mat (`REQ-05-018`), or that the crawl is required (`REQ-06-034`).
- A ban on the yelling kid crawling. The sentence gives the crawl to the other kids. Whether the yelling kid may crawl stays UNKNOWN.
- A Phase B win or a Game 2 win beside the session win (`REQ-01-039`, `REQ-02-044`, `REQ-06-037`, beyond the clauses that were kept).
- What “hilarious,” “funny,” “goofy,” “safe,” “soft,” or “gentle” requires beyond the words.
- How the kids get from the desk to the back. What the secret note says. What the victory dance looks like. What “a toy” is, beyond the prize list.
- Any equation of “the board” with the whiteboard.
