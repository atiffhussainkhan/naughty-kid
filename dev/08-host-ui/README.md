# Dev 08 — Host UI

Side panel for the host, docked beside the 3D stage in `game-v2`.

## Authority

- `docs/classroom-game/design/07-setup-and-options.md` — five closed picks; lock before Phase A
- `docs/classroom-game/design/08-host-script.md` — 21 cue speeches
- `game-slices/07-options/module.js` — `lockPicks`, lists, samples
- `game-slices/08-cues/module.js` — `viewModel` Say lines

No sixth setup pick. Hat / giant ears stay beat 8 controls. Cue text is not rewritten here.

## Files

| Path | Role |
| --- | --- |
| `js/host-ui.js` | `CLASSROOM.ui.mount` / `CLASSROOM.modules.hostUi` |
| `js/host-ui.css` | Panel + `.classroom-shell` stage layout |
| `harness.html` | Headed check: picks → lock → cues → Start Phase A |
| `coverage.md` | What is wired and what stays for the integrator |

Copies for the playable root:

- `game-v2/js/host-ui.js`
- `game-v2/js/host-ui.css`

## Mount

```html
<link rel="stylesheet" href="js/host-ui.css">
<div class="classroom-shell">
  <div class="classroom-stage" id="stage"><!-- canvas --></div>
</div>
<script src="../game-slices/07-options/module.js"></script>
<script src="../game-slices/08-cues/module.js"></script>
<script src="js/host-ui.js"></script>
<script>
  CLASSROOM.ui.mount(
    document.querySelector(".classroom-shell"),
    function () { return state; },
    function (action) { /* fold reducers; see coverage.md */ }
  );
</script>
```

## Lock before Phase A

1. Host chooses one option on each of the five lists (no preselected favorite).
2. **Lock the five picks** calls `CLASSROOM.modules.options.lockPicks` when that module is present, then dispatches `{ type: "lockPicks", payload: picks }`.
3. Phase A does **not** start on lock. The panel shows locked picks, setup cues C01–C04, and **Start Phase A**.
4. `{ type: "startPhaseA" }` is the integrator’s cue to set `phase: "A"` and `beat: 1`.

## Controls dispatched

When `CLASSROOM.phaseAUi.actionsFor` or `CLASSROOM.phaseBUi.actionsFor` is loaded, those lists fill the beat buttons. Otherwise the panel falls back to the same action types (`beat1Step` … `beat10Spray`, `hostStir`, `hostWake`, `hostEyes`, `hostSleep`). Movement: `kidStep`, `kidStill`, `kidLaugh`. Setup cue browse: `hostSetup` with `payload.setup` in `session|places|choices|calls`.

Do not replace the existing `game-v2/index.html` session harness from this slice; mount this panel into the 3D shell when the playable page wires the stage.
