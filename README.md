# NautiKid — Classroom Mischief

A host-operated 3D classroom party game: two pupils, one teacher, two phases and ten cooperative mischief challenges. The current build uses animated Quaternius characters and Kenney/KayKit room assets from the existing Image library.

## Play locally

On macOS, double-click **Start-NautiKid.command**. Keep the Terminal window open. Python 3 is required; the launcher serves the repository root and opens `/game-v2/` on an available local port.

Or run from this repository:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open **http://127.0.0.1:8080/game-v2/**. Do not serve `game-v2` alone: shared gameplay modules live in `game-slices`.

## Controls

Choose five round options, lock them and start Phase A with at least two players. The host panel presents the current challenge and available actions. Complete the five Phase A beats, return to the back and begin Phase B. Complete the final five beats to win, then play another round. Movement, teacher state and freeze/send-back rules drive the animated 3D cast. This is a host-operated party game, not a first-person action game.

## Verify

```sh
node tools/verify-game.cjs
```

See `docs/VERIFICATION.md` for the latest evidence and limits. The Three.js 0.160.0 runtime and loader are bundled under `game-v2/vendor/three` with their MIT licence, so gameplay does not need a CDN.

## Assets and remaining art limitations

The runtime artwork is included. `docs/ASSET-AUDIT.md` records the library selection and gaps. The present pupil models are adult-proportioned stylised characters used as stand-ins; authentic child meshes were not verified in the indexed library. Several special props remain labelled stand-ins. No new AI artwork was generated. Refer to package licences and provenance before commercial release.

## Project layout

- `game-v2/`: current 3D game.
- `game-slices/`: shared rules and their self-tests.
- `tools/`: launcher server and verification.
- `docs/classroom-game/`: game design and requirements.
- `game/`, `game-3d/`, `dev/`: earlier prototypes and focused harnesses.

Repository: https://github.com/atiffhussainkhan/naughty-kid
