---
cursor:
  subagentId: "bc-04a3a2bc-5165-5fb1-9fa1-8180583dbf3d"
---

# Integrator conflicts (docs win)

## Kept

| Topic | Kept | Dropped / subordinated |
| --- | --- | --- |
| Phase A beat logic | `game-slices/02-phase-a/module.js` via `game-v2/js/phase-a.js` | Earlier `game-3d/js/phase-a.js` not loaded by game-v2 |
| Phase B beat logic | `game-slices/03-phase-b/module.js` via `game-v2/js/phase-b.js` | — |
| Teacher states | `game-slices/04-teacher/module.js` | — |
| Movement / send-back | `game-slices/05-movement` + `game-v2/js/movement.js` (preserves `sendBack`) | Edges handlers that set `sendBack: false` on beat actions |
| Space prop *state* | `game-v2/js/space.js` (Dev 07, 3D art refs) | `game-slices/06-space` 2D image paths not loaded in index |
| Host UI | `game-v2/js/host-ui.js` | Session-edges-only `index.html` moved to `session-edges-harness.html` |
| Characters | Quaternius cast per `docs/classroom-game/asset-selection-3d.md` | KayKit Mage/Rogue from `game-3d` not used as cast |
| Room shell assets | KayKit dungeon/furniture files restored at `game-v2/assets/*` for `room.js` | Alternate Kenney modules under `assets/room/` left unused by `room.js` |

## Routing fix (edges vs Phase A/B)

Dev 09 `session-edges` originally routed `hostStir`, `beat2Throw`, `beat2LaughEnd`, and `beat7Pass` into `modules.edges`. Edges advanced `beat` on laugh end before Phase A cleared `laughing`, so Beat 3+ refused. Integrator narrowed `owned()` edge types to named edge probes only (`neverStir`, `neverTurn`, `edgeLinePass`, `beat9Crawl`, …). Phase A/B keep beat actions. Docs: design/02, design/03, design/09.

## Index.html ownership

Multiple agents wrote playable roots (session-edges harness, scene preview, host harness). Canonical playable page is `game-v2/index.html` (Three.js + host UI + full fold). Harnesses remain for slice smoke.

## Integrator patches (no new rules)

1. Flatten host-ui `payload` onto actions for session `beginPhaseB` / picks.
2. Join control after Phase A blast: `Kids at back → Phase B` (design join, not a beat).
3. Restore kid cast when movement normalize turns numeric `kids` into `[]`.
4. Win overlay honors `state.sessionWon` / both finales (Phase B leaves `phase: "B"` while setting session won).
5. `movement.copyKid` keeps `caught` / `sendBack` / zone fields from Phase A.
