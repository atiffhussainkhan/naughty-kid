# Verification

Run from the repository root with Node.js 18 or newer. The verifier uses Node's built-in modules and needs no package installation:

```sh
node tools/verify-game.cjs
```

The command exits nonzero if any section fails. A successful run ends with `RESULT: PASS`. Failures identify the section and assertion; session-flow failures also print the exact five host picks that produced them.

## What the verifier checks

- All 18 documented Node self-tests: ten game slices, six shipped session/edge/phase/movement adapters, the props checks and the host-UI checks. Each runs in a separate Node process so mutable module state cannot leak between tests.
- The playable entry page's local script and stylesheet paths, JavaScript syntax, the vendored loader and utility import closure, and referenced CSS resources. Runtime entry dependencies must be local.
- Every staged glTF/GLB model under `game-v2/assets`: valid version/header/chunk lengths, declared buffer sizes, and external buffer/image files. This proves dependency availability and basic container integrity, not pixel quality or skeletal animation correctness.
- The **actual `game-v2/index.html` dispatcher**, loaded with the shipped classic scripts in HTML order. This does not maintain a second implementation of the fold.
- All 72 combinations of the five closed host-pick lists, alternating two- and three-kid casts, through all ten beats and both finales. It checks early-finale refusal, the five-second laugh state, Phase A not winning the session, the return-to-rear handoff, three whoopee cushions without a send-back, dropped sunglasses, drawing/quiet-pause branches, optional crawl, mailbox not winning, required dancing, the locked spray target, the win overlay, and replay with a different prize.
- Replay clears terminal flags, beat, phase, the mailed note, kid positions and freeze/statue flags, and hides the win overlay.

The embedded session/edge adapter self-test uses `edgeLinePass` for its one-kid edge probe. Production `beat7Pass` routing remains owned by Phase B.

## Browser verification

Serve the **repository root**, because the main entry uses sibling `game-slices/` modules. Serving only `game-v2/` breaks those URLs. Use the repository's launcher or:

```sh
python3 tools/serve.py
```

Then open the local address printed by the server and select `game-v2/index.html` if it does not open automatically. Use HTTP rather than opening the HTML with `file://`, so model fetches and loader modules use normal browser rules.

A browser pass must still confirm the room, teacher, kids and props render; models/textures load without console errors or failed requests; resizing works; host controls remain usable; all ten beats can be operated; moving/frozen/statue poses match state; both finale overlays and replay work; and a second round can use different picks. Node's DOM and graphics stubs cannot establish any of those visual outcomes or detect WebGL/driver failures.

## Scope of the current demo

This is a host-operated classroom demonstration. The host locks the picks, reports outcomes and teacher cues, and advances the authored beats through the control panel. A passing reducer suite does not establish autonomous teacher AI, real-time physical skill detection, multiplayer/network input, audio, performance on mobile hardware, or production deployment availability.

The verifier does not contact GitHub or deploy the game. Local dependency closure is distinct from verifying the published URL, browser caching, HTTP status codes and hosting configuration. Browser and deployment evidence should be recorded separately with the tested URL, viewport and any console/network failures.

## Recorded result — 28 October 2026

- `node tools/verify-game.cjs`: PASS, 10,768 assertions, 18 self-tests, 72 complete setup/dispatch/replay combinations, 53 local resources, 26 JavaScript files and 71 model containers/dependencies.
- `node game-v2/tests/host-session-flow.cjs`: PASS, clean replay, locked picks, round count, finite player count, Phase B handoff and completed-round controls.
- `git diff --check`: PASS.
- In-app browser at `http://127.0.0.1:4187/game-v2/`: classroom, teacher, two pupils and props render; five radio choices lock, Start Phase A works and Walk advances to Beat 2. No captured console errors. Responsive stacked controls remain accessible.
- Complete ten-beat paths and replay were verified in the dispatcher tests, not a full manual browser playthrough. Remaining console warnings concern legacy Three.js distribution and multiple Three.js instances in the FBX loader.
- Character IDs now match session IDs; movement uses interpolated targets. Teacher and pupils have different scales, and the elevated camera exposes both room ends. Asset quality limitations remain as documented in ASSET-AUDIT.md.
