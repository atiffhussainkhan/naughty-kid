# Full development phase — classroom party game

## Goal
One playable browser game that follows the requirements and the design exactly. Characters and room art come from the user’s Image and animation GitHub libraries. Prefer high-end 3D (GLB/glTF, KayKit, OGA 3D packs, furniture, interiors) from the indexed releases. Do not invent mechanics. Do not invent art outside those two repos. Do not edit the paper repo under `/workspace`.

## Authority
1. `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/docs/classroom-game/mega-requirements.md`
2. `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/docs/classroom-game/design/game-design.md`
3. Slice designs under `docs/classroom-game/design/`
4. Logic slices under `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/game-slices/` (use them; fix conflicts with the docs, docs win)

DESIGN-DECISION lines are binding. RECOMMENDATION lines only where the design needs them so a beat can finish. UNKNOWN stays a gap, not new behavior.

## Art sources (both)
- Image: https://github.com/atiffhussainkhan/Image — start at `AI_ASSET_INDEX.md`, `catalog/MASTER_ASSET_INDEX.json`, release packs (mega-assets-v1, expansion-v1, expansion-v2, catalog-completion, game-art-search-v2). Prefer stored 3D: KayKit furniture, city/interior, adventurers, OGA 3D character pack, FPS buildings/env, dungeon remastered, Holokat where they fit a classroom. Skip nude sketches, armored fantasy for kids unless no better humanoid exists, and low-quality scrap.
- Animation: https://github.com/atiffhussainkhan/animation — packs and catalog. `gh` is logged in on the shared machine as atiffhussainkhan. Clones may already exist under `/tmp/asset-repos`. Do not print tokens.

## Shared output
- Playable game root: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/game-v2/`
- Per-agent work: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/dev/<NN-name>/`
- Asset manifest: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/docs/classroom-game/asset-selection-3d.md`
- Final media: `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/media/game-v2/`

## Integration contract
Classic JS modules attach at `CLASSROOM.modules.<name>` with `reduce` / `viewModel` where they own logic. The integrator wires `game-v2/index.html` with Three.js (or the lightest stack that can show the selected GLB/glTF). Conflict rule: requirements and design win; if two agents write the same file, the integrator keeps the design-correct version and notes the drop.

## Verify
Headed Chrome on `DISPLAY=:1`. Full session through both finales, plus one three-step send-back. Screenshots in `media/game-v2/`.
