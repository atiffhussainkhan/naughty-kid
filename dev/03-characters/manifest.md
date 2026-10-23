# Dev 03 — Characters

Teacher, Kid A, and Kid B are **Quaternius Ultimate Animated Character** humanoids (CC0), not clipart and not KayKit fantasy armor.

## Roles

| Role | Staged file | Source mesh | Why |
|---|---|---|---|
| Teacher | `game-v2/assets/characters/teacher.glb` | `Suit_Female.gltf` | Adult professional person; reads as a classroom adult |
| Kid A | `game-v2/assets/characters/kid-a.glb` | `Casual_Male.gltf` | Casual clothed person; distinct outfit from Kid B |
| Kid B | `game-v2/assets/characters/kid-b.glb` | `Casual2_Female.gltf` | Second casual person; different mesh from Kid A |

Pack: `quaternius-ultimate-animated-character.zip` · Image release `catalog-completion-2026-10-06` · licence `quaternius-ultimate-animated-character-LICENSE.txt` (CC0).

## Clips (idle / walk / dance)

Each GLB carries the same 17 clips. The loader uses:

| Pose API | Clip name in GLB | Notes |
|---|---|---|
| `idle` | `Idle` | Default standing |
| `walk` | `Walk` | Beat 1 / path movement |
| `dance` | `Victory` | Closest celebration clip in this pack (no clip named Dance) |
| `freeze` | `Idle` paused | Design statue / wake freeze — not a separate mesh |

Also present but unused by this module: `SitDown`, `StandUp`, `Run`, `Jump`, `PickUp`, etc.

## Loader

- Work copy: `dev/03-characters/characters.js`
- Live path: `game-v2/js/characters.js`
- Preview: `game-v2/characters-harness.html`
- API: `CLASSROOM.characters` / `CLASSROOM.modules.characters`
  - `load(scene, state)`
  - `setTeacherPose(pose)` / `setKidPose(id, pose)`
  - `sync(state)` — maps `moving`/`walking` → walk, `dancing` → dance, `frozen`/`statue` → freeze
  - `viewModel(state)`

**Integrator note.** Attach `THREE.GLTFLoader` before `load`, or ship an import map that maps `"three"` to the same module build used for the scene (see `characters-harness.html`). Bare `import()` of the JSM loader fails without that map when only `three.min.js` is on the page.

## Verified

Headed Chromium on `DISPLAY=:1` via `characters-harness.html`: idle / walk / dance (Victory) / freeze. Screenshots in `media/game-v2/03-characters-*.png`.

## Rejected for this slot

| Pack / mesh | Why not |
|---|---|
| KayKit Mage / Rogue / Rogue_Hooded | Fantasy adventurers; used in `game-3d` staging; brief prefers people over armored fantasy when better humanoids exist |
| KayKit `KayKit_AnimatedCharacter_v1.2` | Has a clip named `Dance`, but mesh is Prototype Pete mannequin, not teacher/kids |
| OGA 3D character pack (Bravos nested zips) | Nested archives; not unpacked for classroom people when Quaternius casual/suit already fits |
| Barnabe Wild rigged character | Blend-only in the stored zip; no ready GLB/glTF people |
| EPS / education clipart bookworms | 2D clipart; brief prefers 3D people |

## Animation repo

`atiffhussainkhan/animation` has no GLB/glTF people packs for this slot (2D knight/princess/dragon only). Clips come from the Image Quaternius pack above.
