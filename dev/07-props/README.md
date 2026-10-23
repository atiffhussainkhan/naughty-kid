# Dev 07 — Props

Places all **22 named props** in the classroom for `game-v2`. Phase A props stay for Phase B. Exactly **3** whoopee cushions are hidden under the cushion line. Missing art is a labeled placeholder — no invented meshes (cardboard box is not a mailbox).

## Authority

- `docs/classroom-game/design/06-space-and-props.md`
- `docs/classroom-game/07-props-and-space.md`
- Art only from Image / animation libraries (KayKit, Mastjie, Kenney CC0 extracts already in curated packs)

## Deliverables

| Path | Role |
| --- | --- |
| `space.js` | `CLASSROOM.modules.space` — state for 22 props, whoopees, Phase B open |
| `props.js` | `CLASSROOM.props` / `CLASSROOM.modules.props` — Three.js placement |
| `asset-map.md` | Prop → file / label map |
| `assets/` | Copied GLB/glTF used by props |
| `self-test.js` | Node checks (22 props, 3 whoopees, Phase A stays) |
| `props-preview.html` | Headed load against room anchors |

Integrated copies:

- `game-v2/js/space.js`
- `game-v2/js/props.js`
- `game-v2/assets/props/*`
- Scripts wired in `game-v2/index.html`

## API

```js
CLASSROOM.modules.space.actions.placeRoom(state, picks, { cushionCount, whoopeeIndexes })
CLASSROOM.modules.space.actions.revealWhoopee(state, index)
CLASSROOM.modules.space.actions.openPhaseB(state)
CLASSROOM.modules.space.viewModel(state)

CLASSROOM.props.load(scene, anchors)   // anchors from CLASSROOM.room.load
CLASSROOM.props.revealWhoopee(index)
CLASSROOM.props.applyPhaseA(flags, state)
CLASSROOM.props.applyPhaseB(flags, state)
CLASSROOM.props.viewModel()
```

## Verify

```bash
node self-test.js
# then open game-v2/index.html or props-preview.html on DISPLAY=:1
```

Kenney GLBs need `assets/props/Textures/colormap.png` (staged).
