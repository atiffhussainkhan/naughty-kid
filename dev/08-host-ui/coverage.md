# Host UI coverage

## Setup (five picks)

| Pick | Source list | Lock |
| --- | --- | --- |
| Prize type | a golden trophy; a toy; a bucket of treats | `options.lockPicks` |
| Shoe noisemaker | a squeaky dog toy; bubble wrap | same |
| Victory effect | pop a safe party popper; throw a handful of paper confetti over the teacher's head | same |
| Strict-teacher activity | standing facing a whiteboard; typing on a computer; reading a big book | same |
| Silly-string target | the teacher's desk; the teacher's shoes | same |

Not on the setup form: hat / giant ears (beat 8), statue / sticky-note / monster phrase samples (replaceable examples, not closed picks).

## After lock

- Beat sidebar 1–10 with titles from host-script cue titles
- Current cue from `CLASSROOM.modules.cues.viewModel` (Say lines + tags only)
- Controls for the current beat and Phase A teacher calls
- Setup cue buttons (C01–C04) while `beat < 1`
- Start Phase A only after lock

## Integrator must wire

| Action | Expected effect |
| --- | --- |
| `lockPicks` | Store picks; do **not** set beat ≥ 1 yet |
| `startPhaseA` | `phase = "A"`, `beat = 1`, teacher asleep |
| `hostSetup` | Optional: mirror `payload.setup` into state |
| Beat / host / kid types | Existing phase-a, phase-b, teacher, movement reducers |

## Gaps left open

- Toy name field when prize is “a toy” (options accepts `toyName`; UI does not add a free-text sixth control)
- Sample replacement fields (statue, note, phrase)
- How many kids play

## Verify

`node dev/08-host-ui/self-check.js` — lock does not start Phase A; cue fill uses options lists; speeches stay in `08-cues`.

Harness screenshots (headed Chrome / headless):

- `media/game-v2/host-ui-setup.png` — five picks, lock disabled until chosen
- `media/game-v2/host-ui-locked.png` — locked picks, beat 0, C01, Start Phase A
- `media/game-v2/host-ui-phase-a.png` — beat 1 sidebar, C05 with bubble wrap fill
