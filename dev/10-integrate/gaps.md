---
cursor:
  subagentId: "bc-04a3a2bc-5165-5fb1-9fa1-8180583dbf3d"
---

# Gaps after integrate (not invented)

## Playable

`game-v2/index.html` runs: five picks → Phase A 1–5 → join → Phase B 6–10 → both finales → session won. Headed Chrome QA + screenshots in `media/game-v2/01-setup.png` … `13-session-won.png`. Three-step send-back recorded on caught kids at Beat 3 (`sendBack: { steps: 3, direction: "back" }`); at the back wall, steps stay in place per design.

## Still open / thin

| Gap | Note |
| --- | --- |
| Named props without mesh | Silly string, sticky note, squeaky toy, bubble wrap, confetti, party popper, shoes — labels or stand-ins only (asset-selection / Dev 07). |
| Cast visibility | Often one Quaternius figure fills the frame; second kid / teacher pose sync is thin (camera + placement). |
| `phase === "won"` | Phase B sets `sessionWon` while leaving `phase: "B"`; integrator show() promotes to `won` for the overlay. |
| Sample replacements | Host UI has no fields for statue / sticky / monster phrase samples (options module supports them). |
| Toy name when prize is “a toy” | No free-text control (host-ui coverage). |
| WebGL on this VM | Needs SwiftShader/ANGLE flags; plain Chrome Mesa failed WebGL. Sibling scene shots also under `media/game-v2/`. |
| Dev 01 folder | No `dev/01-*`; art selection lives in `docs/classroom-game/asset-selection-3d.md`. |
| Animation repo | No GLB/glTF clips used for cast (Quaternius packs carry Idle/Walk/Victory). |

## Verify commands

```bash
node game-slices/02-phase-a/module.js
node game-slices/03-phase-b/module.js
node game-v2/js/teacher-move-bind.js
# headed: open game-v2/index.html (serve store root)
```
