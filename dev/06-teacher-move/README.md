---
cursor:
  subagentId: "bc-6b7b4d11-108c-5672-a2b8-1d7664d74778"
---

# Dev 06 — Teacher & Movement

## Done

1. **`game-slices/04-teacher/module.js`** — ten teacher states, `reduce` / `viewModel` / `poseFor`.
2. **`game-slices/05-movement/module.js`** — left correct (40 checks). Only send-back is three footfalls on caught laugh.
3. **`game-v2/js/`** — `teacher.js`, `movement.js`, `teacher-move-bind.js` wire freeze / statue / laugh window / three-step into the playable root.

## Binding (design-exact)

| Call | Effect |
| --- | --- |
| Stir (`hostStir`) | Feather window. Nobody freezes. |
| Wake (`hostWake`) | `freezeAll` — every kid pose. Skipped during the 5s laugh. |
| Eyes open (`hostEyes`) | `catchMovers` — statues for movers. Skipped during the 5s laugh. |
| Laugh (`hostLaughStart`) | `laughWindow` open — kids may move for 5 seconds. |
| Caught laugh (`kidLaugh`) | Three steps back. Only send-back. |

No other penalties invented.

## Verify

```bash
node game-slices/04-teacher/module.js
node game-slices/05-movement/module.js
node game-v2/js/teacher-move-bind.js
```

## Paths

- Slice: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/game-slices/04-teacher/`
- Movement (unchanged rules): `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/game-slices/05-movement/`
- game-v2 wire: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/game-v2/js/`
