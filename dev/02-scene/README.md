# Dev 02 — Classroom scene

Three.js classroom shell for `game-v2`. Layout follows `docs/classroom-game/design/06-space-and-props.md`. Art follows `docs/classroom-game/asset-selection-3d.md` (Kenney primary). No beats or prop rules invented.

## Modules (also in `game-v2/js/`)

| File | Attach point | Role |
| --- | --- | --- |
| `js/scene.js` | `CLASSROOM.scene` / `CLASSROOM.modules.scene` | Renderer mount, camera at back looking front, ordinary room lighting (hemi + fill + key with shadows + rim + desk fill) |
| `js/room.js` | `CLASSROOM.room` / `CLASSROOM.modules.room` | Floor, walls, desk zone, back, whiteboard, path/holding anchors |

## Layout seats (design/06)

- **Back** (+Z): kids start; doorway on the back wall; holding cluster off open path on the shield side (−X); bookcase on back wall (shell only)
- **Front** (−Z): desk against the wall; order shield → desk → whiteboard → mailbox (+X corner)
- **Open path**: center, back → desk front edge; checkpoint halfway (tape gate Phase A only)
- **Cushion line**: +X side, back → mailbox
- **Whiteboard**: front wall beside desk (`userData.isBoard`); Kenney `whiteboard-panel.glb` (factory screen panel stand-in)
- Shell scaled ×1.75 so Quaternius humanoids clear the ~1.29 Kenney wall height
- Positions fit the modules and the camera; not a measured room

## Assets used (primary Kenney)

Under `game-v2/assets/`:

- `room/floor-full.glb`, `wall.glb`, `wall-window.glb`, `wall-doorway.glb`, `wall-corner.glb`, `bookcase-open.glb`
- `props/desk.glb`, `props/chair-desk.glb`, `props/whiteboard-panel.glb`

KayKit dungeon pieces remain under `room/kaykit-dungeon-alt/` as optional alts (not loaded by this module).

## Preview

Serve `game-v2/` and open `scene-preview.html` (mirror: this folder’s `index.html`).

Screenshots: `media/game-v2/02-scene-classroom.png`, `media/game-v2/02-scene-desk-board.png`.
