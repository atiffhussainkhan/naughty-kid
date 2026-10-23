# game-v2

Playable classroom root. Sibling agents own session, phases, room, characters, host UI, and props.

## Teacher & movement (agent 06)

| File | Role |
| --- | --- |
| `../game-slices/04-teacher/module.js` | Ten teacher states |
| `../game-slices/05-movement/module.js` | Spots, freeze, statue, three-step send-back |
| `js/teacher.js` | `CLASSROOM.teacher` |
| `js/movement.js` | Functional `CLASSROOM.movement.reduce` |
| `js/teacher-move-bind.js` | `CLASSROOM.teacherMove.fold` — event wiring |

Bindings: stir = feather window; wake → `freezeAll`; eyes open → `catchMovers`; 5s laugh → kids may move; caught laugh → three steps only.

```bash
node ../game-slices/04-teacher/module.js
node ../game-slices/05-movement/module.js
node js/teacher-move-bind.js
```

Notes: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/dev/06-teacher-move/`
