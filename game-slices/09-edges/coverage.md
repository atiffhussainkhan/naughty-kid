---
cursor:
  subagentId: "bc-50b3ea7f-8184-5f41-bbf6-20cc0bbcf854"
---

# Edges coverage

`node module.js` in this folder exits 0 and prints `ok`.

Classic script. The module is `CLASSROOM.modules.edges`. It owns edge flags under `state.edges` and records gaps. It does not invent a solo line pass or a solo “other kids” crawl.

## Actions

| Action | What it does |
| --- | --- |
| `neverStir` / `edgeNeverStir` | Beat 2 quiet pause with no stir → beat 3. No throw, no 5 seconds, no send-back. |
| `openThrowWindow` / `hostStir` | Opens the beat 2 throw window only. |
| `plushOnMat` / `beat2Throw` | Plush on mat while the window is open → 5-second laugh open. |
| `laughEnd` / `beat2LaughEnd` | Closes the laugh. Kids are not frozen by the count ending. |
| `laughDuringFive` | Kid laugh inside the five → no three steps. |
| `noteNoticed` | Beat 4 noticed note → note off, stay on beat 4, no send-back, not a wake. |
| `neverTurn` | Beat 8 quiet pause with no turn → beat 9, no drawing, note not mailed. |
| `sunglassesDrop` | Beat 7 drop → return to last feet, no send-back. |
| `beat7Pass` / `edgeLinePass` | Feet pass when ≥2 kids. With &lt;2 kids, records `one-kid-line-pass` and does not finish. |
| `beat9Crawl` / `edgeOtherCrawl` | Other-kids crawl when ≥2 kids. With &lt;2 kids, records `one-kid-other-crawl`. No solo form. |
| `firstTouch` | Names the kid who got the singular prop. Other kid stays. |

## Checks

| Check | Rule |
| --- | --- |
| never stir ends beat 2 | Quiet pause, no throw, beat 3 |
| open window is not never-stirs | Stirred window refuses the never-stirs edge |
| laugh in five is not three steps | `sendBack` stays false |
| noticed note stays on beat 4 | No send-back, note off |
| never turn skips doodle | Beat 9, drawing null |
| drop returns to last feet | Beat 7 stays open |
| one-kid line gap | `one-kid-line-pass` recorded; beat stays 7 |
| two kids may finish the line | Beat advances to 8 |
| one-kid crawl gap | `one-kid-other-crawl` recorded; no repair |

Authority: `design/09-pacing-and-edges.md`, `design/game-design.md` (refuses solo forms), REQ-MEGA-036 / DESIGN-DECISION 1–4 via the session frame.
