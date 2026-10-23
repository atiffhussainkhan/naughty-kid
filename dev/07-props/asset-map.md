# Prop asset map (Dev 07)

All meshes under `game-v2/assets/props/`. Sources are STORED packs from `atiffhussainkhan/Image`. Animation repo has no prop GLB for these tokens.

| # | Prop | Art | Source | Notes |
| --- | --- | --- | --- | --- |
| 1 | Teacher's desk | `table_medium.gltf` (+ `.bin`, texture) | KayKit furniture | Room shell usually owns the mesh; props skip duplicate when anchor has children. |
| 2 | Target prize | `trophy.glb` / `bear.glb` / `bucket.glb` | Kenney Furniture Kit | Kind from host pick. Fallback `chest_gold.glb` (KayKit dungeon) if trophy missing. |
| 3 | Squeaky dog toy | **label** `Squeaky toy` | — | No squeaky mesh in packs. |
| 4 | Bubble wrap | **label** `Bubble wrap` | — | No wrap mesh. |
| 5 | Soft plush | `bear.glb` | Kenney | Soft throw. Not a feather. |
| 6 | Shield mat | `rug_rectangle_A.gltf` | KayKit furniture | Off both paths, shield side. |
| 7 | Checkpoint line | **label** `Checkpoint line` | — | Tape across open path only. |
| 8 | Sticky note | **label** `Sticky note` | — | Drawing on it is mustache/goofy labels, not extra props. |
| 9 | Party popper | **label** `Party popper` | — | Locked blast only. |
| 10 | Paper confetti | **label** `Paper confetti` | — | Locked blast only. |
| 11 | Whiteboard | `pictureframe_large_A.gltf` | KayKit furniture | Board stand-in (DD-3). Room usually owns it. No whiteboard mesh in packs. |
| 12 | Computer | `laptop_01.glb` (alt `laptop.glb`) | Mastjie / Kenney | On the desk for the whole session. |
| 13 | Big book | `book_set.gltf` (+ open `book_single.gltf`) | KayKit furniture | Shut on desk; open mesh when reading is locked. |
| 14 | Secret note | **label** `Secret note` | — | Face down in holding cluster through Phase A. |
| 15 | Target mailbox | **label** `Mailbox` | — | **Not** a cardboard box. No mailbox mesh in packs. |
| 16 | Cushions | `pillow_A.gltf` / `pillow.glb` | KayKit / Kenney | One file, count > 3 (default 6). |
| 17 | Whoopee cushions | **label** `Whoopee` + hidden `pillow_B.gltf` stand-in | KayKit | Exactly **3**, unmarked, hidden until a wrong step. Stand-in is not a whoopee mesh. |
| 18 | Clown sunglasses | `aid-sunglasses.glb` | Kenney | Oversized novelty glasses. |
| 19 | Teacher's shadow | **label** `Teacher's shadow` | — | Ordinary room light; no cast-mesh in packs. |
| 20 | Flashlight | `torch_lit.gltf.glb` | KayKit dungeon | Closest handheld light — not a flashlight. |
| 21 | Silly string | **label** `Silly string` | — | No string-can mesh. |
| 22 | Teacher's shoes | **label** `Teacher's shoes` | — | Boots exist only on character meshes, not as a loose shoe. |

## Not used as those props

- `cardboardBoxClosed.glb` — cardboard box, **not** a mailbox
- `screen-panel-wide` / `whiteboard-panel.glb` — TV/screen panel, **not** a whiteboard (board = picture frame)
- Pencil / pencil-case from animation — not sticky note, not secret note
- Feather — not a prop (beat title only)

## Licences

Copies under `licenses/`: KayKit furniture, KayKit dungeon remastered, Mastjie household goods (CC0), Kenney Furniture / mini-arena / mini-characters (CC0 via shorepine-kenney).

Kenney GLBs that reference `Textures/colormap.png` need that file beside the props folder: `game-v2/assets/props/Textures/colormap.png` (from `shorepine-kenney/3d/mini-arena/Textures/`).
