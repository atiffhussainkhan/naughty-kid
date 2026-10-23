---
cursor:
  subagentId: "bc-6b7b4d11-108c-5672-a2b8-1d7664d74778"
---

# Status — Dev 06 Teacher & Movement

**Result:** complete

**Verify:** `teacher: 64`, `movement: 40`, `teacher-move-bind: 19` — all exit 0 via `verify.sh`

**Created**

- `game-slices/04-teacher/module.js`
- `game-slices/04-teacher/coverage.md`
- `game-v2/js/teacher.js`
- `game-v2/js/movement.js`
- `game-v2/js/teacher-move-bind.js`
- `dev/06-teacher-move/README.md`
- `dev/06-teacher-move/bindings.md`
- `dev/06-teacher-move/verify.sh`
- `dev/06-teacher-move/status.md`

**Updated**

- `game-v2/index.html` — loads 04/05 slices, `teacher.js`, movement followUps
- `game-v2/README.md` — agent 06 section
- `game-3d/js/teacher.js` — design state names + aliases (slice auto-load)
- `game-3d/js/movement.js` — `laughWindow` / `standUp` / `asleep` / `eyesShut`
- `game-3d/index.html` — same followUps

**Unchanged (kept correct):** `game-slices/05-movement/module.js`

**Not invented:** no extra penalties; only three-step on caught laugh.
