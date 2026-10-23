# Classroom game design brief

Core document, binding:
/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/docs/classroom-game/mega-requirements.md

Review that explains the open blockers:
/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/docs/classroom-game/mega-review.md

Read the core document before you design. Do not contradict a requirement. Do not edit the core document or the slice files. If you find a duplicate or a broken requirement, write it under "Requirement fixes" in your own design file. One later pass will apply those fixes.

This pass is game design only. No code, no images, no asset lists from GitHub, no new jokes, no new beats.

## Design decisions already made

These resolve the four DESIGN-BLOCKERs. Use them. Label each use DESIGN-DECISION so it is not mistaken for a source requirement.

1. Three wake moments. "Starts to wake" is only the feather-trigger window. "Wakes up" freezes every kid in a ridiculous pose. "Opens their eyes" is the copycat statue for anyone still moving.
2. During the 5-second laugh, kids may move. That window is the exception. Outside it, a wake freezes them.
3. "The board" means the whiteboard. If the teacher is already facing it, the doodle window opens when they turn away and then turn back. If they are typing or reading, the doodle window is when they turn to face the whiteboard.
4. Beat 10 wins Phase B. The session is won only after both finales. "Win the game" in beat 10 does not skip Phase A.

Anything still UNKNOWN in the core document stays a labeled design recommendation, not a fake requirement. Recommend the smallest rule that makes one group able to play.

## Document shape

1. What this slice designs
2. The design, concrete enough that a host could run it
3. DESIGN-DECISION lines used
4. Recommendations for UNKNOWN facts
5. Requirement fixes, if any
6. Open questions you refused to guess
