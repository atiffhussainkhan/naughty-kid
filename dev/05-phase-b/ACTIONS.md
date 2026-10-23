# Phase B action contract

| type | payload (main) | Result |
| --- | --- | --- |
| `beat6Step` | `wrong: true` \| `kid`+`cushion` \| `allOffMailboxSide: true` | Noise / step / end → beat 7 |
| `beat7Pass` | `feet: true, dropped: false` \| `dropped: true` \| `how:"foot", from, to` | Pass / return / end → beat 8 |
| `beat8Draw` | `picture:"hat"\|"ears"` \| `quiet: true` \| `openWindow: true` | Drawing / quiet pause → beat 9 |
| `beat9Yell` | `voice:"monster", phrase`, optional `crawl` | Investigate; end → beat 10 |
| `beat10Mailbox` | `{}` | Note in mailbox; finale starts; not a win |
| `beat10Spray` | `target`, `gentle: true`, `dance: true` | Phase B win only when all three hold |

Reduce returns `{ state, events, gaps }`. `CLASSROOM.phaseB.reduce` unwraps to state for the fold.
