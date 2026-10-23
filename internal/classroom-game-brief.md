# Combined classroom game — requirements brief

Requirement level only. No code, no architecture, no new jokes. The source of truth is the two games below, plus the merge rule. Do not edit `/workspace`.

## Merge rule

One play session with two phases. Do not drop any of the ten beats.

- Phase A is Game 1, beats 1–5, in the order written. It ends when a kid claims the prize with the confetti victory blast.
- Phase B starts immediately in the same room. The teacher stands up and becomes the strict teacher. Beats 6–10 run in the order written. It ends with the silly string finale.
- The session is won only when both finales have happened. A failed beat sends the kids back as that beat’s own rule says. If a beat has no failure rule, write UNKNOWN. Do not invent one.
- Props and the room carry from Phase A into Phase B.
- Anything not stated in the two games is UNKNOWN, or a MERGE-CHOICE if the two phases cannot coexist without a tiny joining rule. A MERGE-CHOICE must be labeled and must be the smallest rule that lets both texts stay intact.

“Stages” means these phases and the beats inside them. “Build” means what gets set up at that stage. “Rebuild” means what can be reset and tried again. This is not a city builder.

## Game 1: Don't Wake the Sleeping Teacher

The teacher is sleeping at their desk at the front of the room, guarding the target (a golden trophy, a toy, or a bucket of treats). The kids must sneak up from the back of the room to grab it. If the teacher wakes up, the kids must immediately freeze in a ridiculous, funny pose.

1. The Squeaky Toy Shoes: Kids must walk across the room while holding a squeaky dog toy or bubble wrap under their feet. Sneaking silently is impossible and sounds hilarious.
2. The Feather Tickle Trigger: If the teacher starts to wake up, a kid can throw a soft plush toy onto a designated shield mat to instantly force the teacher to start laughing uncontrollably for 5 seconds, giving everyone time to move.
3. The Copycat Pose: When the teacher suddenly opens their eyes, anyone caught moving must instantly freeze and imitate a goofy statue (like balancing on one foot with a finger on their nose). If they laugh, they have to take three steps back.
4. The Sticky Note Sabotage: To pass a mid-way checkpoint line, a kid must successfully sneak up and stick a funny sticky note (like a drawing of a mustache or a goofy face) onto the teacher’s back without the teacher noticing.
5. The Confetti Victory Blast: When a kid successfully reaches the desk without getting caught, they get to pop a safe party popper or throw a handful of paper confetti over the teacher's head as they claim the target prize.

## Game 2: Prank the Strict Teacher

The teacher is standing facing a whiteboard, typing on a computer, or reading a big book, pretending to be very strict. The kids are at the back of the classroom and need to deliver a funny secret note to a target mailbox on the other side of the room.

6. The Whoopee Cushion Pathway: The floor is lined with cushions, but three of them have hidden whoopee cushions underneath. The kids have to guess which ones are safe to step on, resulting in loud, funny noises if they pick wrong.
7. The Reverse Homework Trick: Instead of doing work, kids must pass a giant, oversized pair of clown sunglasses down the line using only their feet, without dropping them.
8. The Doodle Attack: When the teacher turns around to face the board, kids must quickly race to draw a funny hat or giant ears on the teacher's shadow on the wall using a flashlight.
9. The Monster Talk Distraction: To move forward, one kid must yell out a silly phrase in a deep, goofy monster voice (like "The broccoli has landed!"). While the teacher turns around confused to investigate the sound, the other kids can crawl forward.
10. The Silly String Finale: Once the secret note reaches the target mailbox, the kids win the game and get to gently spray the teacher's desk (or the teacher's shoes) with silly string while doing a victory dance.

## Document shape

1. Scope
2. Requirements, ids `REQ-<SLICE>-NNN`, one testable player-facing statement each. Cite “Game 1 beat N” or “Game 2 beat N” or “Merge rule”.
3. Stages: what can be set up, what can be reset, which options exist. Only if this slice has them.
4. Unknowns
5. Handoff lines for other slices. Do not expand them.
