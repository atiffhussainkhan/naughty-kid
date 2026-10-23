---
cursor:
  subagentId: "bc-a72e1d72-e291-5c55-95f8-34af522916ef"
---

# Slice 10 — Version boundary, source log, and completeness gaps

Read on 23 Oct 2026. Player-facing only. Requirement ids in this file are version-boundary statements. Systems that belong to other slices are named under Handoff and are not specified here.

## 1. Scope of this slice

Two products share the Super Citycon name.

The live game is playable now: iOS, Android, and the Windows build of that same app through Google Play Games. Publisher on the stores is Ben Willes Games / Ben Willes Games SL. Package `com.benwilles.citybuilder`. App Store id `1607860732`. Latest opened store update is 2.4.0 (Google Play 20 Dec 2025, App Store 21 Dec 2025).

The other product is Steam app `3474890`, titled SuperCitycon, developer and publisher Sunapie Games. Its store page says it is not yet available, release Q4 2026, entering Early Access.

This slice draws the line between them, logs the public sources, and lists live-game systems that those sources name without enough detail to replicate. It does not restate full requirements for buildings, economy, services, or cameras.

The live site `https://supercitycon.net/` returned an under-construction stub on 23 Oct 2026 (“Shape the land, lay the first road…”). That sentence is not treated as a terraforming spec. Usable official posts were read from the Internet Archive. Many of those URLs now 404 on the live host.

No public wiki or full building catalog was found.

## 2. Source log

Reliability labels: **official** (developer post or in-game tutorial by the developer), **store**, **dev comment** (developer reply on a player thread), **player**, **press**, **guide** (third party), **seo** (unofficial article on the official domain). “Opened” means the page or a substantial extract was read for this slice. Reddit full-page fetches timed out; those rows use the comment text returned with the search result.

| # | URL | Good for | Reliability | How read |
| --- | --- | --- | --- | --- |
| 1 | https://play.google.com/store/apps/details?id=com.benwilles.citybuilder&hl=en_US | Live identity, “no wait timers / no pay-to-skip / 300+ buildings”, region view, street view, Mayoral Match-Up, ads and IAP, Ancient China what’s-new, 20 Dec 2025 | store | opened |
| 2 | https://play.google.com/pc-store/games/details?id=com.benwilles.citybuilder&hl=en_GB | Same live app on Windows via Google Play Games; PC minimum spec (Windows 10 v2004, SSD 10 GB, 8 GB RAM, 4 cores) | store | search extract |
| 3 | https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 | Live iOS identity, sandbox-mode wording, 300+ structures, version history through 2.4.0, US IAP names and prices, player reviews | store | opened |
| 4 | https://apps.apple.com/gb/app/super-citycon-build-a-city/id1607860732 | UK IAP list including Sandbox Mode £17.99; developer reply that levels equal resident count and that 1.4 would list residents per level | store | opened |
| 5 | https://store.steampowered.com/app/3474890/SuperCitycon/ | Current Steam product: Q4 2026 Early Access, Sunapie Games, SCC Studio, Workshop, terraforming, railways, first/third person, weather, economy not in Early Access | store | opened 23 Oct 2026 |
| 6 | https://www.devuego.es/en/presskit/super-citycon | Older public description of the Steam product: “Super Citycon Unlimited”, no IAP/ads/paywalls, map creator, tycoon puzzle mode, custom terrain system | press | opened |
| 7 | https://web.archive.org/web/20250327140145/https://supercitycon.net/super-citycon-unlimited-is-coming-to-steam/ | 19 Feb 2025 official post: Steam version keeps mobile gameplay, PC/Mac, keyboard and mouse; further differences not announced | official (archive) | opened |
| 8 | https://www.youtube.com/watch?v=jYAD0SkDmY0 | Developer basics tutorial (channel “Super Citycon - City Building Game”): slots, bulldozer, construction minutes, sandbox purchase, upgrades, services overview, level = residents, 300+ shop counter. Upload date not captured | official video | transcript opened |
| 9 | https://web.archive.org/web/2025/https://supercitycon.net/faq/ | Map reset, account reset, street view, satellite view, science view, iCloud save. Live URL 404 on 23 Oct 2026 | official (archive) | opened |
| 10 | https://web.archive.org/web/20240227221145/https://supercitycon.net/about/ | Soft release May 2022; Ben and Juan; development from 2017 | official (archive) | opened |
| 11 | https://web.archive.org/web/20240227232910/https://supercitycon.net/street-view-walk-your-cities/ | Street view, 28 Jun 2023: zoom in twice; walk, jump on cars, scale buildings | official (archive) | opened |
| 12 | https://web.archive.org/web/2025/https://supercitycon.net/new-bonuses-for-residence-growth/ | 4 Nov 2024, framed as upcoming for 2.0: six residence bonuses, partial formulas, per map | official (archive) | opened |
| 13 | https://web.archive.org/web/20241213090031/https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ | 2 Nov 2024: silo food bonus 25% to 10%, visible workspaces, skyview map switch, population bonuses shown | official (archive) | opened |
| 14 | https://web.archive.org/web/20240617064743/https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ | 20 May 2024 preview: orthographic camera, region view, mayor score, happiness, capped farm bonuses, 22 languages | official (archive) | opened |
| 15 | https://web.archive.org/web/20250327140107/https://supercitycon.net/super-citycon-amsterdam-add-on/ | 24 Feb 2025: 14 buildings, two canal sizes, plaza, cobblestone path | official (archive) | opened |
| 16 | https://web.archive.org/web/20250327122954/https://supercitycon.net/super-citycon-zoo-add-on/ | 6 Jan 2025: 12 habitats, decorative buildings, custom paths. Decorative count not given | official (archive) | opened |
| 17 | https://web.archive.org/web/20240227234223/https://supercitycon.net/monorail-addon/ | 28 Jun 2023: monorail add-on, one loop per map, more lines planned | official (archive) | opened |
| 18 | https://web.archive.org/web/20240228003621/https://supercitycon.net/curacao-add-on/ | 24 May 2023: 6 villas, permanent unlock | official (archive) | opened |
| 19 | https://web.archive.org/web/20240227235717/https://supercitycon.net/trailerpark-addon/ | 28 Jun 2023: 12 buildings. Individual names mostly not listed (caravan, camper, tiny houses mentioned) | official (archive) | opened |
| 20 | https://supercitycon.net/ | 23 Oct 2026 stub. Under construction. No system specs | official, thin | opened |
| 21 | https://web.archive.org/web/2026/https://supercitycon.net/ | Older homepage: mobile voxel city builder, roads, residential/commercial/industrial. No numbers | official (archive) | opened |
| 22 | https://web.archive.org/web/20250907103403/https://supercitycon.net/common-mistakes-when-building-your-city-and-how-to-avoid-them/ | 20 Aug 2025, author orbidi1. Claims traffic, one-way streets, roundabouts, taxes, maintenance, land value, pollution. Not corroborated by the developer tutorial | seo | opened |
| 23 | https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/ | 15–16 Jun 2022 guide: mail tasks, road connection, pollution, building upgrades, ad fast-forward, idle earnings. Early and partly generic | guide | opened |
| 24 | https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ | 2 May 2026: paid sandbox still shows “2 slots needed” for power plants and hospital; player cites 1,400 SuperCash for “+1 construction slot”. Ben Willes: slots come from placed Citycon buildings after a map reset | player + dev comment | search extract |
| 25 | https://www.reddit.com/r/supercitycon/comments/1j7dt82/is_there_an_iap_for_disabling_the_ads/ | 9 Mar 2025, Ben Willes: speedup lifetime package keeps the game at X2 and stops ad reminders | dev comment | search extract |
| 26 | https://www.reddit.com/r/supercitycon/comments/1v1w2ve/never_ending_residential_needs/ | 20 Jul 2026, Ben Willes: residential demand stays high when homes are low-capacity and offices are high-capacity; workspace demand can already be covered | dev comment | search extract |
| 27 | https://www.reddit.com/r/supercitycon/comments/11k9aj8/ship_route/ | 22 Jun 2023, Ben Willes Games: ship route is dynamic; the ship needs a path to its target | dev comment | search extract |
| 28 | https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/ | 16 May 2025 player: inventory arrow, bulldozer icon, road icon, then delete | player | search extract |
| 29 | https://www.reddit.com/r/supercitycon/comments/1m5kx9c/starting_over/ | 21 Jul 2025, Ben Willes: map-menu bulldozer wipes the map and puts buildings in inventory | dev comment | search extract |
| 30 | https://www.reddit.com/r/supercitycon/comments/12wt6iq/purchase_city_upgrades/ | 23 Apr 2023 player: a “upgrade all houses” mission cleared only after upgrading city regulations | player | search extract |

Checked and not used as specs: `https://supercitycon.net/faq/` (404 on 23 Oct 2026), `https://sunapie.com/` (JavaScript placeholder, no game text), and web search for a Fandom or other wiki (no catalog found). An older “Unlimited / no IAP / tycoon puzzle” blurb is still indexed against `https://store.steampowered.com/app/3474890/Super_Citycon/`; the direct fetch of the current store page returned the Early Access / SCC Studio text instead. DeVuego (row 6) is the opened copy of that older blurb.

## 3. Requirements — version boundary only

Each statement is something a reader can check against the cited source. Live-game feature requirements are not written here.

**REQ-10-001.** The playable Super Citycon is the Ben Willes Games app on iOS (App Store id 1607860732), Android (`com.benwilles.citybuilder`), and Windows through Google Play Games for that package. The stores list it as free, with advertising and in-app purchases. The newest opened update note is 2.4.0, Ancient China, dated 20 Dec 2025 on Google Play and 21 Dec 2025 on the App Store.

Sources: rows 1, 2, 3, 4.

**REQ-10-002.** Steam app 3474890 is a separate, unreleased product. The page read on 23 Oct 2026 names it SuperCitycon, developer and publisher Sunapie Games, release Q4 2026, “Coming Soon To Early Access”, and “This game is not yet available on Steam”.

Source: row 5. Quote: “This game is not yet available on Steam” and “Release Date: Q4 2026”.

**REQ-10-003.** SCC Studio, a built-in voxel editor for customizing or creating terrain sets, buildings, vehicles, citizens, props, and a character, and for placing those creations in the city, is described only on the current Steam page.

Source: row 5. Quote: “SCC Studio is SuperCitycon's built-in voxel editor.”

**REQ-10-004.** Publishing maps, models, and characters to the Steam Workshop is described only on the current Steam page.

Source: row 5. Quote: “share them through the Steam Workshop.”

**REQ-10-005.** Terrain editing that raises hills, carves valleys, shapes water, and creates terrain sets is described only on the current Steam page. Opened live sources describe placing roads, buildings, Amsterdam canal pieces, and a ship path.

Sources: row 5 (“Raise hills, carve valleys and shape the water”); rows 8, 15, 27 for the live placement tools.

**REQ-10-006.** Railways, bridges, tunnels, and trains are named as base construction only on the current Steam page. Opened live transport is ordinary roads, a monorail add-on limited to one loop per map, Amsterdam canals in two sizes plus a cobblestone path, and a dynamic ship route.

Sources: row 5; rows 8, 15, 17, 27. Monorail post: “Currently, you can only have one loop in a map.”

**REQ-10-007.** A third-person mode and a player-created character are described only on the current Steam page, which lists them with first-person play. Live street view, in the tutorial and the 28 Jun 2023 post, is first person: zoom to the lowest point, zoom in again, with a first-person sensitivity setting in Settings.

Sources: row 5 (“First- & Third-Person Modes: Create your character”); rows 8 and 11.

**REQ-10-008.** A control that sets time of day and weather is described only on the current Steam page. The live tutorial shows a calendar that starts at day zero; the demo city on screen is 229 years old. No opened live source describes a weather selector.

Sources: row 5 (“Choose the time of day and weather”); row 8.

**REQ-10-009.** The current Steam Early Access answers say the Early Access version is a construction sandbox and that economy and progression are not in it yet. The live game’s opened sources include coins, SuperCash, services, city upgrades, mailbox tasks, and levels driven by resident count.

Sources: row 5. Quote: “Economy and progression systems are not yet included.” Live side: rows 1, 3, 8, 12, 13.

**REQ-10-010.** An older public description of Steam app 3474890, opened on the DeVuego press kit and still indexed for that app id, calls the unreleased game Super Citycon Unlimited: premium, no in-app purchases, ads, or paywalls, with a map creator and a tycoon puzzle mode. The 23 Oct 2026 store fetch does not contain that text. The 19 Feb 2025 official post says the Steam release keeps the mobile gameplay and does not describe SCC Studio, Workshop, or a removed economy.

Sources: rows 5, 6, 7. Press quote: “Unlike its mobile predecessor, this PC version is a premium experience with no in-app purchases, ads, or paywalls.”

**REQ-10-011.** No opened source shows a playable native Mac download of the live Ben Willes app. The Apple page lists iPhone, iPad, iPod touch, and Apple Vision. macOS is on the Steam requirements (minimum macOS 12 Monterey, Apple M1, 8 GB RAM, 4 GB storage). The playable PC listing for the live app is Windows via Google Play Games.

Sources: rows 2, 3, 5.

### Kept on the live side on purpose

These show up in Steam marketing and also in live sources. They are not Steam-only: voxel look, large maps, roads, a construction sandbox as a live mode or purchase, region/sky view, first-person street view, a moving calendar, canals as placed Amsterdam objects, a ship route, and a monorail add-on. The Feb 2025 post’s “same gameplay as mobile” does not, by itself, add REQ-10-003 through REQ-10-008 to the live game, and it does not remove the live economy.

## 4. Stages, options, and complexity this slice supports

This slice does not define in-game stages, costs, or formulas. The sourced product timeline is:

- Soft release on mobile in May 2022 (row 10). About three years of mobile development are what the 19 Feb 2025 post means by “two years of shaping skylines on mobile” only as marketing; the about page is the dated origin.
- 15 Jun 2022 developer reply: levels are resident count only, and version 1.4 would add an in-game list of residents per level (row 4). That list was not found outside the client.
- 22 Oct 2023 / 1.6.17 notes: constructions progress in the background even with no speedup time left; unlock level is shown on buildings; free gift every 3 hours (row 3).
- 30 Sep 2024 Android open test announced; 2 Nov 2024 Android release announced; 2.0 described as already on Android with iOS within 14 days (rows 13 and the news index around it). App Store history places the 2.0 feature drop (Bonus Economy, Region View, Sandbox Mode, Zoo add-on, camera mode, more languages) on the December 2024 2.0 builds (row 3). The scraped note/version pairing is easy to misread by one build; the feature names are on the page either way.
- 19 Feb 2025: Steam announced as the same gameplay on PC and Mac (row 7).
- Store page read 23 Oct 2026: Steam still unreleased, Early Access planned Q4 2026, and the feature list has moved to SCC Studio and a sandbox without economy (row 5).
- Live app continues: Paris, Amsterdam, weekly rare buildings, four high-score categories, three new maps and five add-ons, Ancient China, through 2.4.0 in Dec 2025 (rows 1, 3, 4). The five add-ons and three maps in the 2.2.0-era note are not named there.

Steam’s own Early Access answers say a later full release is planned to add economic systems, progression, and challenges, at a higher base price, with no date for leaving Early Access (row 5). Those plans are future statements about the unreleased product.

## 5. Contradictions

Recorded on both sides. Not resolved.

### Instant build, no timers, no pay-to-skip

Google Play’s current description: “Build your city instantly — no waiting, no timers” and “No construction timers, no pay-to-skip” (row 1).

Apple’s current description puts the same idea under a mode heading: “SANDBOX CONSTRUCTION MODE: Build instantly without delays. Resources are key, but there’s no waiting for construction!” (rows 3, 4).

The developer tutorial (row 8) says the opposite about the game without that purchase. Construction times are “measured in minutes, not in hours or days”, they advance while the player is away, and they advance faster while speedup time remains or if the speedup package is owned. The Sandbox Constructions purchase is “zero construction time” and lets the player “instantly confirm buildings when you move them”. The narrator calls that “how I play the game all the time” and distinguishes it from “almost the sandbox” that a player can approach by buying or collecting Citycon buildings. A support popup offers double speed for 10 minutes. The lifetime speedup package removes the speedup button and keeps speedup permanently.

App Store 1.6.17 notes, 22 Oct 2023: “Constructions now progress in the background, even without speedup time left” (row 3). That sentence assumes a construction clock and a separate speedup clock.

Ben Willes on 9 Mar 2025: the speedup lifetime package “makes the game always run at X2 speed and the add reminders will never come back again” (row 25).

UK App Store lists an IAP named “Sandbox Mode” at £17.99 (row 4). US IAP names opened here are Special Offer at $2.99, $3.99, $6.99, $7.99, and $9.99, 300 SuperCash $2.99, 600 SuperCash $4.99, 1,500 SuperCash $9.99, Supercash S $5.99, Supercash M $9.99, Supercash L $19.99 (row 3). The US list’s “Learn More” hides further items, so a US Sandbox price is UNKNOWN.

A player on 2 May 2026 wrote that they paid for “Sandbox Constructions DLC” “supposed to have zero construction time and constructions finished instantly”, then still could not place power plants and the hospital without a “2 slots needed” warning (row 24).

A 2022 App Store review says the game is “Low timed to build things so you don’t have a long time to wait” (row 3). The developer reply does not deny a timer.

A Nov 2024 Google Play review asked for “a sandbox mode where you have unlimited money”. The developer reply on 2 Nov 2024 does not describe that mode (row 1). Version 2.0’s Sandbox Mode ships in the December 2024 notes (row 3). Nothing opened equates that purchase with unlimited money. The May 2026 player still spent SuperCash after buying it.

### Construction slots

Store marketing does not mention slots. The tutorial does (row 8): the player starts with one construction slot; each Citycon building placed adds one permanent slot; some larger buildings need two or more slots; slots also allow more than one construction at once; Citycon buildings come from the shop, from collecting them over time, or both.

Ben Willes on 2 May 2026: after a map reset, the extra slots come from placing the Citycon buildings again (row 24). The player in that thread reports a “+1 construction slot” purchase at 1,400 SuperCash that still left the two-slot warning, and that the warning asked for still more SuperCash. The developer does not confirm 1,400, and does not say the shop slot purchase replaces Citycon buildings.

What a slot occupies after the building finishes, the full list of slot costs, and the real price of a Citycon building are UNKNOWN.

### Bulldoze

Marketing pages do not describe demolition. The tutorial does (row 8): inventory bulldozer, three categories; turning off trees and streets leaves the remaining category to be demolished on tap. The third category’s on-screen name is not spoken. Roads are removed by enabling the streets category and tapping them. A player describes the same control as the inventory arrow, bulldozer icon, then the road icon (row 28).

A second bulldozer resets a whole map. Archive FAQ (row 9): maps window, top left, bulldozer on that map, no undo, buildings go to storage. Two steps, no confirm line. Ben Willes on 21 Jul 2025: map-menu bulldozer wipes the map and buildings go to inventory (row 29). Storage versus inventory is not defined in these two sources. A confirm step appears in some indexed copies of the support page and is absent from the archive FAQ that was opened.

### Upgrades

Marketing does not describe an upgrade tree. The tutorial (row 8) says city upgrades are mostly bought with coins, and that after those are bought, further upgrades cost SuperCash. Named examples, not a list: water consumption, water production, energy, trash, the value of coins, the appearance of coins. A separate overview covers electricity, water, food, waste management, healthcare, police, fire, and education, with no magnitudes.

App Store notes for the 1.7 era say “New Building Levels” (row 3). A player in Apr 2023 could finish an “upgrade all houses” mission only by upgrading city regulations (row 30). That is one player’s resolution, not a developer rule.

The 2.0 posts add residence bonuses and a silo change (rows 12, 13). Those are partial numbers, listed under gaps, not a full upgrade spec.

### “300+ buildings”

Google Play: “over 300 unique buildings” (row 1). Apple: “over 300 unique structures” (rows 3, 4). The tutorial agrees the shop header showed “over 300” and “continuously growing” (row 8). No opened page lists them. Named add-on counts that do exist: Amsterdam 14 buildings plus canals, plaza, and a path (row 15); Zoo 12 habitats plus an uncounted set of decorations (row 16); Trailer Park 12 buildings (row 19); Curaçao 6 villas (row 18). Paris is “modular buildings, elegant parks, and the iconic Eiffel Tower” with no count (rows 3, 4). Ancient China, Marble Lane, Parkwalk, and Retro 1990 are names only. Weekly rare buildings exist for one week and may return later (row 8; version note on rows 3, 4). The 300+ figure is a shop counter at the time of the video, not a stable public catalog.

### Steam product described three ways

1. 19 Feb 2025 official post: same mobile gameplay, bigger screen, keyboard and mouse, surprises unannounced (row 7).
2. DeVuego and the still-indexed older store blurb: premium Unlimited, no IAP or ads, map creator, tycoon puzzle mode, custom terrain system (row 6).
3. Store page on 23 Oct 2026: Early Access sandbox, SCC Studio, Workshop, terraforming, railways, first and third person, weather control, and no economy or progression yet (row 5). The Early Access answer also says economy and progression are planned later.

All three are public. They do not describe one feature set.

### Uncorroborated “city builder” articles

The 20 Aug 2025 article on the official domain (row 22, author orbidi1) says the live game has traffic delays, one-way streets, roundabouts, residential taxes, maintenance, land value, and citizen complaints about pollution. The developer tutorial does not describe those systems. It describes demand bars for residential, commercial, and industrial, and usage bars for food, energy, water, and waste: a full bar means the city needs more of that thing; the demo city is shown at 82% food and 56% energy (row 8). Those two percentages are one city at one moment.

The Jun 2022 Mobile Gaming Hub guide (row 23) adds a wood-clearing step, double money for one hour, and idle earnings after six hours. Trees can be bulldozed (row 8). A wood resource, the one-hour card, and the six-hour idle rule are not in the opened official sources. Treat row 22 and the unique claims in row 23 as unverified.

### Smaller wording clashes

- FAQ archive says reset buildings go to storage (row 9). The developer’s 2025 comment says inventory (row 29).
- Science view is “local influences” on the map, chosen from a right-hand bar (rows 8, 9). The influence list is not published.
- Kurt’s Nov 2024 review asked for landscape mode. The developer replied the same week that landscape already exists and is better for street view (row 1).

## 6. Completeness gaps

Public sources name these live systems and do not specify them far enough to replicate. UNKNOWN means no opened source gives the value.

| Gap | What is public | What is missing |
| --- | --- | --- |
| Building catalog | “300+” shop counter; a handful of add-on counts and a few proper names (Eiffel Tower, silo, Citycon building, power plants, hospital, casino mentioned by a 2023 reviewer) | Full names, category, coin or SuperCash price, resident or job output, wealth marks, culture/entertainment/recreation points, slot cost, footprint, unlock level. Weekly rare rotation schedule |
| Level and feature gates | Level equals resident count, not XP (rows 4, 8). Higher levels unlock buildings. Unlock level is shown in the building details after 1.6.17. Some tutorial features are locked at the start. 1.4 was supposed to show residents required per level inside the game | The resident threshold for each level. Which buildings and which UI blocks open at which level. No public copy of the promised 1.4 list |
| Services and demand | Categories: electricity, water, food, waste, healthcare, police, fire, education. Demand bars for residential, commercial, industrial. Usage bars; full means “need more”. Silo food-production bonus cut from 25% to 10%. Workspaces on commercial and industrial buildings become visible in 2.0. Developer comment: low-capacity homes versus high-capacity offices leaves residential demand high | Production and consumption formulas, coverage radius or road reach, service building outputs, how 82% usage is computed, how residential demand is scored, what “capacity” numbers are, any formula besides the silo percentage |
| Construction clock and slots | Times are “minutes”; offline progress; speedup and X2; sandbox purchase sets time to zero and confirms moves instantly. Start at 1 slot; +1 permanent slot per placed Citycon building; some buildings need 2 or more (player: power plants and hospital show “2 slots needed”). Player reports 1,400 SuperCash for a +1 slot purchase that did not clear that warning | Per-building durations. Whether a finished building frees its slots. Whether simultaneous builds and multi-slot buildings spend the same pool. Official price of a Citycon building. Whether 1,400 SuperCash is that price. Which buildings need 3 or more slots. What sandbox does and does not remove (time versus money versus slots) |
| City upgrades and the six residence bonuses | Coin upgrades, then SuperCash upgrades; loose examples (water, energy, trash, coin value, coin appearance). Culture, entertainment, and recreation: 1 point covers 1,000 residents, full coverage is a 250% bonus each; single-count (orange check) versus multi-count (blue plus). Wealth: $, $$, $$$; average of buildings that have wealth; level 3 is 250%. Diversity: 1 unique building is 1% , cap 250%; more than eight of one skyscraper-type building causes a penalty. Loyalty: +1 point per login day, cap 250 points = 250%; missing two days in a row deducts points. All six are per map. Old hidden residence scale was up to x10; the six bonuses are described as up to x15 together. Post is dated before 2.0 shipped and says “when they go live” | The upgrade list, each cost, and each effect size. Points granted by each building. The diversity penalty amount. Wealth bonus at levels 1 and 2, and rounding of the average. How many loyalty points two missed days remove. Whether the Nov 2024 post shipped unchanged. Which buildings are “skyscraper-type”. Farm-bonus cap announced May 2024, cap value not given |
| Tasks, mailbox, and rewards | Mailbox holds tasks and occasional messages, plus in-mailbox tutorials. Free gift every 3 hours. A free-player block every 8 hours released by four ads. Chests every 4 hours or every 24 hours give collectible parts and bonus cards. Collectible cards complete over time, or sooner as a premium action. Piggy bank fills with SuperCash from activity and is bought at a reduced price when full | Task texts, rewards, and order. Gift contents. Chest drop tables. Card set list. Piggy-bank fill rate and price. What the four ads unlock |
| Mayoral Match-Up and high scores | Global ranking. Version note: compete across four categories. May 2024 preview adds “Mayor Score” and a happiness measure | The four category names, the score formula, and how happiness is calculated |
| Maps and region | Multiple maps in one region, entered in the tutorial by zooming out twice. 2.0 replaces a menu with skyview. A later note adds 3 maps. Tutorial refers to “the first region” | Map count, map dimensions, how a new map or region unlocks, whether resources cross maps. Bonus post says bonuses do not cross maps |
| Roads and connection | Drag-build with direction markers. Buildings snap to streets. Muddy roads do not give a road connection. Bulldozer can target streets | Road type list, costs, and which types connect buildings. Whether “muddy” is a name or a description |
| Currencies | Coins and SuperCash. A 2023 review says SuperCash was renamed from bills; the developer did not correct that in the reply. IAP pack prices differ by storefront (rows 3, 4). Existing SuperCash was multiplied by 3 on first launch of the piggy-bank update | Coin prices in the build menu. SuperCash prices except the player’s unverified 1,400. Exchange rate. What each “Special Offer” contains |
| Add-ons beyond the four posts | Paris, Ancient China, Marble Lane, Parkwalk, Retro 1990, plus “5 beautiful add-ons” in one update note. Tutorial: an add-on unlocks permanently and can be built as often as the player wants | Contents, prices, and stat lines for every pack not in rows 15–19 |
| Calendar speed | Day zero start; demo city shown at 229 years | How long a game-day lasts, and whether the double-speed ad changes the calendar. The 2022 guide’s “fast forward the day” ad is unverified |
| Ship route and monorail | Ship needs any path to its target. Monorail is one loop per map, with more lines “planned” in 2023 | What blocks a ship path. Whether passengers, income, or coverage change. Whether multiple monorail lines shipped later |

The five gaps that block an exact replica of the live game are the building catalog, the level gates, the service and demand formulas, the construction clock and slot rules, and the city-upgrade plus residence-bonus tables. Store copy that says the game is an instant sandbox with 300+ buildings does not fill any of the five.

## 7. Unknowns

- Upload date of the basics tutorial. The transcript discusses the version 2 sandbox offer, so it is after that offer existed. The day is UNKNOWN.
- US price of Sandbox Mode, if the US store sells it under that name.
- Official SuperCash or coin price of a Citycon building.
- Confirmation that 1,400 SuperCash is any current in-game price.
- Per-building construction times.
- Resident count required for each level.
- Service formulas and coverage.
- Full building list and full upgrade list.
- The four high-score category names and the mayor-score formula.
- Whether the 4 Nov 2024 bonus post matches the shipped 2.0 numbers.
- Size of the diversity penalty and the loyalty deduction.
- Whether the Aug 2025 SEO article describes any real system. Left unverified.
- Whether the current supercitycon.net stub will document the live game or the Steam game. On 23 Oct 2026 it documented neither in any testable way.
- Native Mac build of the live game. Not found.

## 8. Handoff

One line each. Not expanded here.

- Construction, slots, bulldozer categories, move/rotate, road snap, muddy roads, sandbox purchase versus speedup: construction slice.
- Coins, SuperCash, IAP names and storefront prices, piggy bank, ads, X2 lifetime: economy and monetization slice.
- Service categories, silo 25% to 10%, demand and usage bars, visible workspaces: services slice.
- Six residence bonuses and the old hidden x10 scale: progression slice, using row 12 as a pre-release spec that may have changed at ship.
- Level = residents, unlock levels, mailbox tasks, tutorial skip: progression slice.
- Add-on contents and the 300+ counter: buildings slice.
- Street view, region/sky view, satellite view, science view, perspective versus orthographic camera: camera slice.
- Mayoral Match-Up and four unnamed high-score categories: competition slice.
- Roads, one-loop monorail, Amsterdam canals, dynamic ship route: transport slice. Railways, bridges, tunnels, trains, terraforming, SCC Studio, and Workshop stay on the Steam side of this file.
