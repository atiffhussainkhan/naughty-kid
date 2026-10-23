---
cursor:
  subagentId: "bc-a95f5882-156b-5081-967d-b23a55f669dd"
---

# Dev 07 — Props report

## Done

- Placed all **22** named props per `design/06-space-and-props.md`.
- Exactly **3** whoopee cushions hidden under the cushion line (default indexes 0, mid, last; host-overridable).
- Phase A props stay for Phase B (`staysForPhaseB`, `openPhaseB` does not remove in-room items).
- Missing art uses labeled placeholders (mailbox, squeaky, bubble wrap, sticky, popper, confetti, secret note, checkpoint, shadow, silly string, shoes).
- Did **not** map cardboard box → mailbox or screen panel → whiteboard.

## Outputs

| Path | Role |
| --- | --- |
| `dev/07-props/space.js` | State module |
| `dev/07-props/props.js` | Three.js placer |
| `dev/07-props/asset-map.md` | Honest mesh/label map |
| `dev/07-props/README.md` | Agent README |
| `dev/07-props/self-test.js` | Node gate (passing) |
| `dev/07-props/props-preview.html` | Local preview |
| `game-v2/js/space.js` | Integrated |
| `game-v2/js/props.js` | Integrated |
| `game-v2/props-preview.html` | Integrated preview |
| `game-v2/index.html` | Loads `space.js` + `props.js` |

## Art used (high-end GLB from Image packs)

Kenney furniture: desk, bear/plush, rug, books, laptop, pillows, sunglasses, trophy, bucket.  
KayKit alts: table_medium, picture frame board, torch flashlight stand-in, pillow whoopee stand-in.  
Mastjie: laptop_01 alt.

## Conflict with art-director manifest

`docs/classroom-game/asset-selection-3d.md` (Dev art) lists cardboard boxes as mailbox and screen-panel as whiteboard. Dev 07 keeps those as **labels** / room picture-frame board per “do not invent art.” Cross-link: `dev/07-props/asset-map.md`.

## Verify

```text
node dev/07-props/self-test.js  → OK
props-preview.html status → Props ready — 22 named, 3 whoopees hidden at [0, 2, 5]
Screenshot → media/game-v2/07-props-preview.png
```

Kenney external textures: `assets/props/Textures/colormap.png` staged so trophy / sunglasses / bucket load.
