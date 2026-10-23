# Naughty Kid — Classroom Party Game

Classroom party game: requirements, design docs, and a playable 3D build.

## Play the game

Open the playable build locally (no build step):

```bash
# from this repo root — use any static file server, or open the file directly
open game-v2/index.html
# or:  python3 -m http.server -d game-v2 8080
```

Then visit `http://localhost:8080` if you used a server. The main entry is **`game-v2/index.html`**.

Earlier prototypes live under `game/` and `game-3d/`. Slice harnesses are in `game-slices/` and `dev/`.

## Design & requirements

| Path | What it is |
|------|------------|
| [`docs/classroom-game/`](docs/classroom-game/) | Game design, phases, teacher behavior, props, coverage |
| [`docs/requirements/`](docs/requirements/) | Broader product / systems requirements notes |
| [`notes.md`](notes.md) | Project status notes |
| [`archived.md`](archived.md) | Archived decisions / history |

Start with `docs/classroom-game/mega-requirements.md` and the numbered design docs in that folder.

## Repo layout

```
notes.md, archived.md
docs/           design + requirements
game-v2/        current playable 3D build (open index.html)
game-3d/        3D prototype
game/           earlier web prototype
game-slices/    incremental slice harnesses
dev/            phase / character / UI harnesses
media/          screenshots and recordings
internal/       working notes / audits
artifacts/      agent artifacts
```

## License / assets

3D character and prop assets under `game-v2/assets`, `game-3d/assets`, and related harness folders include license notes under each package’s `licenses/` where present. Treat third-party assets according to those licenses.
