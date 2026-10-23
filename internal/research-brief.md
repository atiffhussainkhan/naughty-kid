# Super Citycon requirements research brief

Target: the live Super Citycon city builder by Ben Willes Games / Sunapie (iOS, Android, and the PC/Mac build of that same game). Player-facing requirements only, for a later exact replica. Not an engineering design.

Do not treat the Steam page (app 3474890, Sunapie Games, listed Q4 2026, SCC Studio, Workshop) as the live game. That is a separate upcoming product. Mention it only to keep it out of live requirements.

## Seed sources (search past these)

- https://supercitycon.net/
- https://supercitycon.net/faq/
- https://sunapie.com/
- https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
- https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- https://www.reddit.com/r/supercitycon/
- https://www.youtube.com/watch?v=jYAD0SkDmY0 (basics tutorial; transcript is evidence)
- Search also: wiki, patch notes, add-on pages, official social posts, other tutorials (roads, services, city upgrades, bulldozer, construction slots, region, street view, sandbox v2).

## Rules

- Requirement level only. No architecture, no code, no suggested implementation.
- Number every requirement `REQ-<SLICE>-NNN`. One testable player-facing statement each.
- Cite a URL (and a short quote or timestamp if from a video) on every requirement.
- Sources disagree: record both. Do not silently pick one.
- Not in a source: `UNKNOWN`. Never invent names, costs, timers, stats, stages, or buildings.
- Stay inside your slice. If you find something that belongs to another slice, add one line under "Handoff" and do not expand it.
- Do not edit `/workspace`.

## Document shape

1. Scope of this slice
2. Sources used
3. Requirements
4. Stages, options, and complexity that this slice actually supports (only if sourced)
5. Contradictions
6. Unknowns
7. Handoff lines for other slices
