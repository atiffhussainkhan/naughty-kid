# Options coverage

Classic script: `game-slices/07-options/module.js`. It registers `CLASSROOM.modules.options` and owns `picks` and `picksLocked`. `node module.js` runs the checks.

Authority is `docs/classroom-game/mega-requirements.md`, `design/game-design.md`, and `design/07-setup-and-options.md`. The module adds no sixth pick and no art.

## Choice list

`lockPicks` stores one string from each list. Any other pick key is `unknown-pick`. A missing key or a value outside the list is `incomplete`, and nothing locks.

| Pick | One of | Requirement |
| --- | --- | --- |
| `prize` | a golden trophy; a toy; a bucket of treats | REQ-MEGA-005 |
| `noisemaker` | a squeaky dog toy; bubble wrap | REQ-MEGA-048 |
| `victory` | pop a safe party popper; throw a handful of paper confetti over the teacher's head | REQ-MEGA-054, REQ-MEGA-055, REQ-MEGA-019 |
| `activity` | standing facing a whiteboard; typing on a computer; reading a big book | REQ-MEGA-057 |
| `stringTarget` | the teacher's desk; the teacher's shoes | REQ-MEGA-069 |

`standing facing the whiteboard` is the same activity as `standing facing a whiteboard`. The stored activity is the whiteboard wording from REQ-MEGA-057.

A toy may carry `toyName`. That name is the one toy, not a sixth pick. The plush, the sunglasses, and a whoopee cushion are rejected. Any other name is the host's object. The module has no toy catalog and no treat count.

## Actions

| Action | Runs |
| --- | --- |
| `lockPicks(set)` | Locks all five, or rejects. A second call returns `locked` and leaves the five as they were. |
| `replaceSample(kind, text, beat)` | `statue` before beat 3, `note` before beat 4, `phrase` before beat 9. One naming. The source text stays the sample. Another string is the replacement. |
| `doodleWindow()` | Whiteboard activity: turn away and then turn back. Typing or reading: turn to face the whiteboard. DESIGN-DECISION. |
| `victoryUse()` | Confetti aim is over the teacher's head. The popper aim is `UNKNOWN`. |
| `replay()` | Returns the gap. Picks, the lock, and samples stay. |

Samples before a naming:

- Statue: Balancing on one foot with a finger on the nose. REQ-MEGA-013. Eyes-open statue.
- Note: a drawing of a mustache, and a drawing of a goofy face. REQ-MEGA-017. Both stay available until the host names one. They are samples, not a closed pick.
- Phrase: The broccoli has landed! REQ-MEGA-032.

Hat or giant ears is REQ-MEGA-066, inside the doodle. It is not in `lists` and not a sample kind.

## What the lock means

The five stay locked through both finales. The module does not clear them on the three steps back, and it does not clear them when Phase B starts. One option is in force for each pick. Whether the unchosen object is also sitting in the room stays open.

The teacher's desk in `stringTarget` is the desk already in the room. The teacher's shoes are the spray target. The noisemaker is the object under the feet.

## Gaps left open

- Replay of a beat, a phase, the session, or a pick. `gaps.replay` is `UNKNOWN`. `replay()` does not unlock.
- Whether the party popper travels over the teacher's head.
- Which objects count as a toy, beyond the three props that are already someone else's.
- How many noisemakers, and whether the noisemaker stays under the feet after beat 1.
- Whether a kid who was not caught moving, and who laughs, takes three steps back.
- What "safe", "soft", and "gentle" require beyond those words.
- Who chooses hat or giant ears, and whether one drawing may show both.
- The words on the secret note, and the steps of the victory dance.
- How many kids play.

## Not this module

Movement, the three steps, the walk back to the Phase B start, teacher states, and art. `game/` is unchanged.
