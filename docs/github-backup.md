# GitHub backup — naughty-kid

- **URL:** [https://github.com/atiffhussainkhan/naughty-kid](https://github.com/atiffhussainkhan/naughty-kid)
- **Visibility:** public
- **Default branch:** `main`
- **HEAD commit:** `8358ef55c2b8b4259ddd5836a395b843c4dae614`
- **Initial bulk commit:** `0981b03a9211ef1c0c907eb3523cfc9d7807a113`
- **Uploaded (UTC):** 2026-10-23T20:20:00Z
- **Account:** atiffhussainkhan
- **Source:** Project store `/cursor/stores/bc-dea1f0da-9654-4bc5-8a18-7a43e826a919/`

## Top-level tree (uploaded)

- `README.md`, `.gitignore`
- `notes.md`, `archived.md`
- `docs/` — design + requirements (+ this backup log)
- `game-v2/` — current playable 3D build (~142 files)
- `game-3d/` — 3D prototype (~44 files)
- `game/` — earlier web prototype (~31 files)
- `game-slices/` — slice harnesses (~15 files)
- `dev/` — phase / character / UI harnesses (~124 files)
- `media/` — screenshots (~40 files)
- `internal/` — working notes / audits (~11 files)
- `artifacts/` — agent artifact copies (~7 files)

## Skipped

- `/tmp/asset-repos/` (~8.6G KayKit/Quaternius clones) — assets already copied into `game-v2/assets` (and related harness folders). Not project-owned source of truth.
- `preferences.md` — not present in the store.
- `/workspace` paper project — unrelated; not uploaded.
- Secrets (`.env`, `hosts.yml`, credential/token files) — none found in the store; excluded via `.gitignore`.
- Git LFS — not required (largest file ~3.6MB).

## Other VM git remotes scanned

- `/workspace` → Origin `paper` (not this project).
- `/tmp/asset-repos/Image` and `/tmp/asset-repos/animation` — upstream asset packs only; covered by in-repo asset copies.

## How to play

Open `game-v2/index.html` (see root `README.md`).
