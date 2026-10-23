---
cursor:
  subagentId: "bc-efd79623-8b50-539b-bae6-2d5447d3b51c"
---

# Classroom game — 3D asset selection (v2)

Art direction for `game-v2`. Stills and EPS clipart from the 2D game are out of scope. Binaries live under `game-v2/assets/`. Sources are only [atiffhussainkhan/Image](https://github.com/atiffhussainkhan/Image) and [atiffhussainkhan/animation](https://github.com/atiffhussainkhan/animation), via `AI_ASSET_INDEX.md`, `catalog/MASTER_ASSET_INDEX.json`, and GitHub Releases. Packs were downloaded from those releases into `/tmp/asset-repos/curated` (and clones under `/tmp/asset-repos`).

## Look

One coherent classroom: **Quaternius** clothed humanoids (rigged, 17 clips each) plus **Kenney Furniture Kit** interior GLBs (self-contained). KayKit dungeon/furniture pieces stay as optional alts under `room/kaykit-dungeon-alt/` and `props/kaykit-furniture-alt/` for builders who already wired them — they are not the primary shell.

## Characters

| Role | File | Pack / release | Source mesh | Why |
|---|---|---|---|---|
| Teacher | `assets/characters/teacher.glb` | `quaternius-ultimate-animated-character.zip` · catalog-completion-2026-10-06 | `Suit_Female` | Adult suit; Idle / Walk / SitDown / StandUp / Victory / PickUp |
| Kid A | `assets/characters/kid-a.glb` | same | `Casual_Male` | Casual clothes, same rig and clip set |
| Kid B | `assets/characters/kid-b.glb` | same | `Casual2_Female` | Second casual costume, same scale |

Licence: CC0 — `assets/licenses/quaternius-ultimate-animated-character-LICENSE.txt` (also under `game-v2/licenses/`).

There is no child-proportioned mesh in the stored packs. Casual vs suit is a costume split, not an age split.

Useful clips for the session loop: `Idle`, `Walk`, `SitDown`, `StandUp`, `Victory`, `PickUp`, `Jump`, `Run`. Combat clips exist on the same files and should stay unused.

## Room shell (primary — Kenney)

Pack: `shorepine-kenney.zip` · mega-assets-expansion-v1 · `3d/furniture/` · CC0.

| File | Source mesh | Role |
|---|---|---|
| `assets/room/floor-full.glb` | `floorFull.glb` | Floor tile |
| `assets/room/floor-half.glb` | `floorHalf.glb` | Floor filler |
| `assets/room/wall.glb` | `wall.glb` | Wall module |
| `assets/room/wall-half.glb` | `wallHalf.glb` | Short wall |
| `assets/room/wall-corner.glb` | `wallCorner.glb` | Corner |
| `assets/room/wall-window.glb` | `wallWindow.glb` | Window wall |
| `assets/room/wall-doorway.glb` | `wallDoorway.glb` | Door opening in wall |
| `assets/room/doorway.glb` | `doorway.glb` | Door frame |
| `assets/room/doorway-open.glb` | `doorwayOpen.glb` | Open doorway |
| `assets/room/bookcase-open.glb` | `bookcaseOpen.glb` | Back-wall bookcase |

Licence: `assets/licenses/shorepine-kenney-LICENSE.txt`.

## Props (primary)

| Game need | File | Pack · source | Notes |
|---|---|---|---|
| Teacher’s desk | `props/desk.glb` | Kenney furniture · `desk.glb` | Front desk |
| Chair | `props/chair-desk.glb` | Kenney · `chairDesk.glb` | Teacher seat |
| Big book | `props/books.glb` | Kenney · `books.glb` | Desk book / reading activity |
| Computer (typing) | `props/computer-screen.glb`, `computer-keyboard.glb`, `computer-mouse.glb` | Kenney | Desktop set on the desk |
| Laptop (alt computer) | `props/laptop.glb` | Kenney · `laptop.glb` | Optional single laptop prop |
| Shield mat | `props/rug-rectangle.glb` | Kenney · `rugRectangle.glb` | Floor mat beside desk |
| Soft plush | `props/plush-bear.glb` | Kenney · `bear.glb` | Beat 2 throw — teddy, not a feather |
| Cushion line | `props/pillow.glb`, `pillow-blue.glb`, `pillow-long.glb` | Kenney pillows | Beat 6 tops; not whoopee meshes |
| Target prize (trophy) | `props/trophy.glb` | Kenney mini-arena · `trophy.glb` | Locked prize option |
| Prize treats | `props/treat-lollypop.glb` + `props/bucket.glb` | Kenney food + survival | Pair for bucket-of-treats pick |
| Clown sunglasses | `props/sunglasses.glb` | Kenney mini-characters · `aid-sunglasses.glb` | Beat 7 |
| Flashlight stand-in | `props/lamp-table.glb` | Kenney · `lampSquareTable.glb` | Closest handheld light in furniture kit |
| Whiteboard stand-in | `props/whiteboard-panel.glb` | Kenney factory · `screen-panel-wide.glb` | Flat panel — not a dry-erase board |
| Mailbox stand-in | `props/mailbox-box-closed.glb`, `mailbox-box-open.glb` | Kenney · cardboard boxes | No mailbox mesh in indexes; boxes are the drop target |
| Sticky / secret note | `props/pencil.glb`, `pencil-case.glb` | KayKit character animations 1.2 · `Pencil` / `Case` | Closest small desk props |
| Open/closed reading book (alt) | `props/spellbook_open.gltf` (+ `.bin`, `mage_texture.png`), `spellbook_closed.gltf` | KayKit adventurers | Keep texture beside glTF |
| Extra rug | `props/rug-rounded.glb` | Kenney | Optional floor accent |

## Optional alts (staged, not primary)

| Path | Pack | Use only if |
|---|---|---|
| `room/kaykit-dungeon-alt/*` | kaykit-dungeon-remastered + kaykit-furniture | Builder already on stone dungeon shell |
| `props/kaykit-furniture-alt/*` | kaykit-furniture + dungeon `chest_gold`, `torch_lit` | Chibi KayKit prop set / gold chest prize / torch light |
| `props/mastjie-alt/computer_01.glb`, `laptop_01.glb` | mastjie-household-goods · catalog-completion | Extra low-poly computer/laptop |

## Animation repo

`atiffhussainkhan/animation` catalog has one pack: `opengameart-knight-princess-dragon` (2D WebP knight / princess / dragon). No GLB/glTF. **Nothing copied** from animation for v2.

## Rejected for the v2 look

| Source | Why rejected |
|---|---|
| EPS / cleaned clipart (`game-art-search-v2`, workplace EPS) | 2D clipart — not the 3D cast |
| `oga-3d-character-pack.zip` | Nested face/body blends and figure sculpts; not clothed classroom kids |
| KayKit Mage / Rogue / Knight / Barbarian | Fantasy armor / robes; superseded by Quaternius suit + casual |
| KayKit skeletons, Halloween, medieval hex, city-builder exteriors | Wrong theme for one classroom |
| Holokat farm / armor GLBs | Farm buildings and armor pieces, not classroom |
| `fps-buildings-env-kit.zip` (~320 MB) | Not downloaded; Kenney furniture already supplies an interior kit |
| Barnabe wild rigged character | Blend-only, no web GLB |
| Animation knight/princess/dragon | 2D armored fantasy |

## Gaps (no honest mesh — use labels / logic, do not invent art)

Whoopee cushion, bubble wrap, squeaky dog toy, silly string, paper confetti, party popper, real mailbox, real whiteboard, loose teacher shoes, statue / crawl-specific poses. Cushions, torch/lamp, cardboard mailbox boxes, and the factory panel are documented stand-ins only.

## Prop → beat map (primary files)

| # | Prop (design) | Primary file(s) |
|---|---|---|
| 1 | Teacher’s desk | `desk.glb` |
| 2 | Target prize | `trophy.glb` (or alt `kaykit-furniture-alt/chest_gold.glb`) |
| 3–4 | Under-foot (squeaky / bubble wrap) | Gap — label |
| 5 | Soft plush | `plush-bear.glb` |
| 6 | Shield mat | `rug-rectangle.glb` |
| 7 | Checkpoint line | Tape / material — no mesh |
| 8 | Sticky note | `pencil.glb` / `pencil-case.glb` stand-in |
| 9–10 | Popper / confetti | Gap — label |
| 11 | Whiteboard | `whiteboard-panel.glb` stand-in |
| 12 | Computer | `computer-screen.glb` + keyboard + mouse |
| 13 | Big book | `books.glb` (alt spellbook open/closed) |
| 14 | Secret note | pencil/case stand-in |
| 15 | Mailbox | `mailbox-box-open.glb` / closed stand-in |
| 16 | Cushion line | `pillow*.glb` |
| 17 | Whoopee (hidden) | Gap under pillows |
| 18 | Sunglasses | `sunglasses.glb` |
| 19 | Flashlight | `lamp-table.glb` stand-in |
| 20 | Silly string | Gap — label |
| 21 | Shoes | On character mesh only |
| 22 | Treats / bucket / doll options | `treat-lollypop.glb` + `bucket.glb`; doll gap |

## Integrator notes

- Prefer `assets/characters/*.glb`, `assets/room/*.glb` (not `kaykit-dungeon-alt`), and top-level `assets/props/*.glb`.
- Kenney furniture GLBs are self-contained. KayKit glTF alts need sibling `.bin` and shared PNGs in the same folder.
- Scale Quaternius adults to the Kenney furniture kit in the scene (costume roles, not child mesh).
- Do not invent replacement art for gaps; keep dashed labels as in the 2D game.
