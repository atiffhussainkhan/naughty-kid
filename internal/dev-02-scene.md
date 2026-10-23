---
cursor:
  subagentId: "bc-4f6db54e-317f-5d7c-8042-9c493f44887b"
---

# Dev 02 — Classroom scene

## Done

- Built Three.js classroom shell into `game-v2/` and mirrored under `dev/02-scene/`.
- Follows `design/06-space-and-props.md` seats: back / front / shield (−X) / cushion (+X) / desk zone / whiteboard / checkpoint / holding / open path / cushion line.
- Uses Agent 01’s Kenney primary pack (`asset-selection-3d.md`), not invented art. Shell scaled ×1.75 for Quaternius height.
- Lighting: ordinary room light with key shadows for beat-8 teacher shadow seat.
- No rules or beats invented. `/workspace` untouched.

## Files

| Path | Notes |
| --- | --- |
| `game-v2/js/scene.js` | Mount + lighting |
| `game-v2/js/room.js` | Kenney floor/walls/desk/chair/board + anchors |
| `game-v2/scene-preview.html` | Standalone preview |
| `game-v2/SCENE.md` | Integrator note |
| `dev/02-scene/*` | Agent work copy + README |
| `media/game-v2/02-scene-classroom.png` | Overview from back |
| `media/game-v2/02-scene-desk-board.png` | Desk + whiteboard close |

## Verify

Headed/headless Chrome on `http://127.0.0.1:8765/scene-preview.html` — status “Classroom shell ready”; screenshots above.
