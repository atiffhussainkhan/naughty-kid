---
cursor:
  subagentId: "bc-8ba604c9-bef4-51c7-8d62-7310b8ad4528"
---

# Slice 09 — Collectibles, cards, chests, ranking, add-on packs, live content

Player-facing requirements for the live Super Citycon city builder (Ben Willes Games / Sunapie) on iOS, Android, and the PC/Mac build of that same game. This is a requirements record for a later replica. It is not an engineering design.

Steam app 3474890 (Sunapie Games, listed Q4 2026, SCC Studio, Workshop) is a separate upcoming product. It is named here only so it stays out of live requirements. A March 2025 Droid Gamers article says Super Citycon is “out now on Steam” and tells readers to get “the unlimited version without in-game paid content” on Steam. The Steam page says the game is not yet available and is planned for Q4 2026, and that this PC version is “unlike its mobile predecessor.” Those Steam claims are not live-game requirements.

The public site at https://supercitycon.net/ was redesigned. Several older posts return 404 on the live host. Quotes below are from pages that still resolve, from App Store and Google Play listings fetched for this pass, or from Wayback snapshots of the original URLs. The original URL is the citation; the archive date is noted when the live page no longer serves the post.

## 1. Scope of this slice

In scope:

- Collectible cards, including cards gained from chests or over time, and tap-to-finish as a premium action.
- Other player-facing cards that sources describe (booster and task-reward cards), kept distinct where sources do not say they are the same system.
- Chests that a source actually names or describes.
- High scores and Mayoral Match-Up: what is ranked, how a player enters, and what the player sees.
- Monthly building updates and weekly rare buildings, as live content.
- Every named add-on or pack a source names, what that source says it unlocks, and whether the source says the unlock is one-time.

Out of scope except as a handoff or a boundary note: construction slots, bulldozer, sandbox rules, roads, services, city-upgrade formulas, map lists, ads, the bonus-code system beyond the golden-chest path, and the unreleased Steam product.

A pack entry below exists only because a source names it. Where a source gives no contents, the contents are UNKNOWN. No building, animal, price, timer, or card name is filled in from the pack’s theme.

## 2. Sources used

| Source | What it contributes | Retrieved |
| --- | --- | --- |
| https://www.youtube.com/watch?v=jYAD0SkDmY0 — “Super Citycon: The Basics” | Government-area Collectibles, chests, tap-to-finish, High Scores, shop add-ons | Indexed auto-caption. The caption file itself returned empty from a public caption API, so there is no reliable timestamp. The indexed caption cuts off at “add-on means you unlock it once you”. The transcript mentions “a new Sandbox offer with version two”, so this description is from a video made once version 2 existed. |
| https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 | Current feature text, Mayoral Match-Up, monthly add-ons, version history, Game Center line, IAP names | Live listing |
| https://apps.apple.com/sg/app/super-citycon-build-a-city/id1607860732 and other storefronts of the same app id | Same notes with day/month date order; Ancient China wording “Build and expand” | Search excerpts of the live listings |
| https://apps.apple.com/us/app/super-citycon-city-builder/id1607860732 | Older feature text for the same app id, including an earlier Mayoral Match-Up paragraph | Live alternate listing |
| https://play.google.com/store/apps/details?hl=en_US&id=com.benwilles.citybuilder | Play description, Mayoral Match-Up, monthly updates, Ancient China “What’s new”, update date | Live listing, updated on Dec 20, 2025 |
| https://play.google.com/pc-store/games/details?id=com.benwilles.citybuilder | Same Android game offered on Windows through Google Play Games | Search excerpt |
| https://supercitycon.net/super-citycon-amsterdam-add-on/ | Amsterdam contents | Wayback 2025-03-27; live URL 404 in this pass |
| https://supercitycon.net/super-citycon-zoo-add-on/ | Zoo contents | Wayback 2025-03-27 |
| https://supercitycon.net/curacao-add-on/ | Curaçao contents and permanent unlock | Wayback 2024-02-28 |
| https://supercitycon.net/monorail-addon/ | Monorail behavior and one-loop limit | Wayback 2024-02-27 |
| https://supercitycon.net/trailerpark-addon/ | Trailer Park contents | Wayback 2024-02-27 |
| https://supercitycon.net/category/add-ons/ | Which add-on posts the blog published | Search index; live category URL 404. Wayback author page 2 (2024-10-11) shows the three 2023 posts only |
| https://supercitycon.net/beach-event-2023/ | Beach Life 30-day event | Wayback 2024-02-27 |
| https://supercitycon.net/retro-event-2023/ | Retro 2023 event | Wayback 2024-02-27 |
| https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ | Mayor Score and named city indicators, May 20, 2024, by Ben | Wayback 2024-06-17 |
| https://supercitycon.net/new-bonuses-for-residence-growth/ | Same indicators as residence bonuses; formulas handed off | Wayback 2024-12-13 |
| https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ | Ben’s reply that monthly content updates were planned after 2.0 | Wayback 2024-12-13 |
| https://supercitycon.net/faq/ | Full reset deletes purchases | Wayback 2024-02-28; live FAQ 404 |
| https://supercitycon.net/ | Current homepage does not list packs, cards, or ranking | Live fetch: site “getting an update” |
| https://sunapie.com/ | “Play now on iOS, Android, PC and Mac.” No pack or ranking detail | Live fetch |
| https://www.reddit.com/r/supercitycon/comments/vd5be2/i_made_it_to_the_top_1/ | A June 2022 ranking presentation of “top 1%” | Search excerpt |
| https://www.reddit.com/r/FREE/comments/14txvg8/giving_app_store_super_citycon_golden_chest/ | Golden Chest via a Discovery Card bonus code | Search excerpt |
| https://www.commonsensemedia.org/app-reviews/super-citycon | Booster cards in version 1.4.13, reviewed against a Sept 20, 2022 build | Live page |
| https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/ | Task power-up cards, June 16, 2022 | Live page |
| https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/ | Monthly buildings; leaderboard described as becoming mayor | Mar 4, 2025 |
| https://www.droidgamers.com/news/create-endlessly-in-super-citycon-a-game-that-mixes-townscaper-with-minecraft/ | Names Monorails, Trailer Parks, Zoo, Retro 1990s. Also the Steam claim excluded above | Mar 6, 2025 |
| https://supercitycon.net/common-mistakes-when-building-your-city-and-how-to-avoid-them/ and https://supercitycon.net/urban-design-and-video-games-what-super-citycon-teaches-about-city-planning/ | Aug 20, 2025 posts by “orbidi1”, not by Ben. They name Amsterdam, Zoo, and Beach Life and add effects the developer posts do not. Treated as disputed claims, not as pack contents | Wayback 2025-09-07 |
| https://store.steampowered.com/app/3474890/SuperCitycon/ | Boundary only | Search excerpt |
| App Store review by コーギーガール, Sept 13, 2023, on the US listing | Add-ons are optional purchases | Live listing |

No wiki, patch-note archive, or video recovered a card catalog, a chest timer, the four high-score category names, weekly-building names, pack prices, or the five add-ons in version 2.3.0.

## 3. Requirements

### Collectible cards

**REQ-09-001.** The government area is where the player manages the game, and it contains Collectibles.

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — “government area is for everything related to manage the game this part is for Collectibles”.

**REQ-09-002.** Collectibles are cards.

Source: same video — “this part is for Collectibles that's card card you get from from chests or over time”.

**REQ-09-003.** The player gets collectible cards from chests, or over time.

Source: same video, same sentence.

**REQ-09-004.** The player can tap a collectible card to complete it earlier than waiting.

Source: same video — “you can also tap them to complete them earlier”.

**REQ-09-005.** Tapping a collectible card to finish it early is a premium action.

Source: same video — “that's a premium option of course”.

**REQ-09-006.** Version 1.7.2 (US listing date 01/15/2024) adds “New collectables”. The previous note, version 1.7.1 (01/02/2024), lists new buildings, new building levels, the Retro 1990 add-on, and new music, and does not mention collectables.

Source: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 version history.

**REQ-09-007.** Card names, how many cards a collectible needs, what “complete” awards, which premium currency the tap spends, and whether Collectibles are locked at the start of a new game are UNKNOWN. The video says some features are not unlocked at game start, and does not say Collectibles are one of them.

### Booster and task cards

These notes are from 2022, before REQ-09-006. No source says they are the collectible cards in REQ-09-002.

**REQ-09-008.** In the build reviewed as version 1.4.13, commercial and residential buildings the player buys are stored together with booster-type cards, and the player opens that storage with the arrow button.

Source: https://www.commonsensemedia.org/app-reviews/super-citycon — “Commercial and residential buildings they buy are stored with booster-type cards and can be accessed by clicking on the arrow button.” Review details: version 1.4.13, last updated September 20, 2022.

**REQ-09-009.** In that same build, the player drags reward cards into use, and a card can make construction faster for a period of time.

Source: same review — “drag cards they receive as rewards, offering things like speedier construction for a certain time period.”

**REQ-09-010.** As of a June 16, 2022 guide, completing a task can award a power-up card that doubles money earned for the next hour.

Source: https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/ — “powerups cards that you get a reward from completing the task like you can get double the money you earn for the next one hour”.

**REQ-09-011.** As of that same guide, a task power-up card can speed up construction.

Source: same article — “or speed up the construction process.”

**REQ-09-012.** Whether the 2022 booster cards, the 2022 task power-up cards, and the collectible cards in the government area are one system or three is UNKNOWN.

### Chests

**REQ-09-013.** Chests are one source of collectible cards.

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — cards “you get from from chests or over time”.

**REQ-09-014.** A Discovery Card can grant a Golden Chest.

Source: https://www.reddit.com/r/FREE/comments/14txvg8/giving_app_store_super_citycon_golden_chest/ — “With this Discovery Card you get a golden chest in Super Citycon to boost your cities.” Posted July 8, 2023.

**REQ-09-015.** The Golden Chest is described as something that boosts the player’s cities. The post does not list the boost.

Source: same post.

**REQ-09-016.** The player redeems that code from the settings menu, in “bonus code”, by entering the code and choosing redeem.

Source: same post — “Open the settings menu. Scroll to ‘bonus code’. Enter your code. Click on redeem.”

**REQ-09-017.** A new player cannot open the code-redeem area until the intro tutorial is finished.

Source: same post — “New users need to fulfill the intro tutorial to access the code redeem area”.

**REQ-09-018.** Chest types other than the Golden Chest, chest timers, chest prices, and whether the Golden Chest is the chest that supplies collectible cards are UNKNOWN. No recovered source states a 4-hour or 24-hour chest.

### High scores and Mayoral Match-Up

**REQ-09-019.** High Scores, in the government area, shows the player an overview of their current ranking.

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — “high scores gives you an overview of your current ranking”.

**REQ-09-020.** From version 2.1.2, the player competes with other mayors across four categories. The US listing dates that version 01/04/2025. Singapore and other day-first storefronts date the same version 04/01/2025. Those are the same calendar day written in two orders.

Source: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 — “HIGHSCORES: Compete with other Mayors across four categories.”

**REQ-09-021.** The names of the four categories are UNKNOWN. No source lists them.

**REQ-09-022.** Mayoral Match-Up is a global competition. The player competes to build the grandest city and climbs ranks.

Source: same US listing — “MAYORAL MATCH-UP: Compete globally to build the grandest city and climb the ranks.”

**REQ-09-023.** On Google Play, Mayoral Match-Up is a global ranking in which mayors compete to construct the best city and grow their empire.

Source: https://play.google.com/store/apps/details?hl=en_US&id=com.benwilles.citybuilder — “Compete in the Mayoral Match-Up — a global ranking where mayors compete to construct the best city and grow their empire”.

**REQ-09-024.** An earlier description of the same iOS app says the player compares skills with city leaders worldwide and sees where their high scores place them, and competes to build the grandest megalopolis.

Source: https://apps.apple.com/us/app/super-citycon-city-builder/id1607860732 — “Compare your skills with city leaders worldwide and see where your high scores place you” and “compete to build the grandest megalopolis of them all”.

**REQ-09-025.** The current US listing says the app supports Game Center and that the game features leaderboards and achievements. It does not say those leaderboards are Mayoral Match-Up, and it does not name any achievement.

Source: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 — “Game Center” / “This game also features leaderboards and achievements.”

**REQ-09-026.** The earlier description of the same app says the player can challenge friends and check leaderboards and achievements.

Source: https://apps.apple.com/us/app/super-citycon-city-builder/id1607860732 — “Challenge friends and check leaderboards and achievements.”

**REQ-09-027.** By June 15, 2022, a ranking presentation could show the player in the top 1%. The developer replied “Congrats!!!”. The post does not say which score produced that percentile. This date is before version 2.1.2’s four categories and before the May 2024 Mayor Score announcement.

Source: https://www.reddit.com/r/supercitycon/comments/vd5be2/i_made_it_to_the_top_1/

**REQ-09-028.** How a player enters Mayoral Match-Up is UNKNOWN. No source says whether entry is automatic, opt-in, tied to Game Center, or tied to finishing the tutorial. What the ranking screen lists besides “your current ranking” — other mayors’ names, cities, or scores — is UNKNOWN.

**REQ-09-029.** A May 20, 2024 developer post announces a Mayor Score: “Track your leadership skills with a new comprehensive score.”

Source: https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ (Wayback 2024-06-17).

**REQ-09-030.** That same post names these indicators next to Mayor Score: Happiness; Culture, Entertainment and Recreation; Wealth; Diversity; and Loyalty (“your own loyalty as mayor”). No source says these indicators are the four high-score categories in REQ-09-020.

Source: same post. The Nov 4, 2024 bonus article repeats Culture, Entertainment, Recreation, Wealth, Diversity, and Loyalty as residence-growth bonuses. The formulas belong to the economy slice; see Handoff.

**REQ-09-031.** A March 4, 2025 Pocket Gamer article says the player can climb a global leaderboard and “become Mayor”, and that the player can “win a mayoral election or two in the global leaderboards”. No developer source describes an election. The election wording is not a confirmed mode.

Source: https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/

### Live content: monthly updates, weekly rare buildings, events

**REQ-09-032.** The iOS feature list promises monthly add-ons: ongoing development and new buildings every month.

Source: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 — “MONTHLY ADD-ONS: Enjoy ongoing development and new buildings every month”.

**REQ-09-033.** Google Play promises monthly updates: new buildings and content every month.

Source: https://play.google.com/store/apps/details?hl=en_US&id=com.benwilles.citybuilder — “MONTHLY UPDATES: New buildings and content every month”.

**REQ-09-034.** Pocket Gamer, March 4, 2025, says new buildings arrive every month.

Source: https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/ — “new buildings you can tinker around with every month”.

**REQ-09-035.** On Nov 4, 2024, Ben replied on the site that after version 2.0 was stable on iOS and Android, the team planned “to roll out monthly content updates”.

Source: https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ (Wayback 2024-12-13), comment by Ben.

**REQ-09-036.** Version 2.1.2 adds weekly rare buildings “to make your city special.” Names, price, how long each stays available, and whether a missed building returns are UNKNOWN.

Source: US App Store version history, version 2.1.2.

**REQ-09-037.** Beach Life, announced July 25, 2023, is a limited-time event of 30 days.

Source: https://supercitycon.net/beach-event-2023/ (Wayback 2024-02-27) — “The Beach Life event is a limited-time experience, lasting for 30 days only.”

**REQ-09-038.** During Beach Life, each day the player logs in, a new reward is waiting.

Source: same post — “Every day you log into Super Citycon, a new reward will be waiting for you.”

**REQ-09-039.** The Beach Life post says those rewards include exclusive decorative items, beachfront promenades, and beach buildings. It names no individual building.

Source: same post — “From exclusive decorative items and beachfront promenades to delightful beach buildings”.

**REQ-09-040.** The Retro Event, announced Sept 1, 2023, adds retro building and decoration elements. The post names nostalgic phone booths and a classic arcade hall. It does not give a full set list or a duration.

Source: https://supercitycon.net/retro-event-2023/ (Wayback 2024-02-27).

**REQ-09-041.** Version 1.6.15 (US listing 10/22/2023) tells the player to join a retro city-building event: “Get ready to go retro in Super Citycon!”

Source: US App Store version history.

**REQ-09-042.** Versions 1.7.1 (01/02/2024) and 1.7.2 (01/15/2024) add a “Retro 1990 Add-on”. Version 2.1.7 later adds requested models to “the Retro Add-on”. The store notes do not list the models.

Source: US App Store version history.

### Add-ons: shared rules

**REQ-09-043.** The shop’s purchases overview includes add-ons.

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — “that's the purchases overview let me quickly show you what we got we got some add-ons”.

**REQ-09-044.** In that shop explanation, an add-on means the player unlocks it once. The indexed caption ends at “add-on means you unlock it once you”. The rest of the sentence was not recovered, so any claim about what the player may build afterward is UNKNOWN from this video.

Source: same video.

**REQ-09-045.** A Sept 13, 2023 App Store review says the game does not require the player to buy add-ons, and that add-ons are purchases the player can choose. The developer reply does not dispute that.

Source: US App Store review by コーギーガール — “The game is free and is not nagging you to buy for any of the add-ons however they are super cool and I would buy them”.

**REQ-09-046.** A full game reset deletes all rewards and purchases, and they cannot be recovered. A one-time add-on unlock does not survive that reset. The FAQ does not say a single-map reset removes purchases.

Source: https://supercitycon.net/faq/ (Wayback 2024-02-28) — “All your rewards and purchases will be deleted and cannot be recovered after a full game reset.”

**REQ-09-047.** The public iOS in-app purchase list names Special Offer prices and SuperCash bundles. It does not name any add-on pack. The price of every named pack is UNKNOWN, and which store product unlocks which pack is UNKNOWN.

Source: US listing, In-App Purchases: Special Offer at $6.99, $9.99, $2.99, $7.99, and $3.99; Supercash M $9.99; 600 SuperCash $4.99; Supercash L $19.99; 300 SuperCash $2.99; Supercash S $5.99.

**REQ-09-048.** The developer add-on blog, as indexed, has posts only for Amsterdam, Zoo, Trailer Park, Monorail, and Curaçao. A pack can still be real without a blog post. Paris, Ancient China, and Retro 1990 are named in store notes and are included below for that reason.

Source: https://supercitycon.net/category/add-ons/

### Amsterdam

**REQ-09-049.** The Amsterdam Add-On is also called the Amsterdam Pack. Ben posted it on Feb 24, 2025.

Source: https://supercitycon.net/super-citycon-amsterdam-add-on/

**REQ-09-050.** The pack includes 14 buildings inspired by Amsterdam canal-side townhouses. The post says they can be placed side by side. It does not name the 14 buildings.

Source: same post — “This add-on includes 14 beautifully designed buildings inspired by Amsterdam’s iconic canal-side townhouses” and “can be placed seamlessly side by side”.

**REQ-09-051.** The pack includes freely placeable canals in two sizes.

Source: same post — “freely placeable canals” and “two different canal sizes”.

**REQ-09-052.** The pack includes one plaza. The post describes it as cobblestone. It does not give a second plaza or a plaza name.

Source: same post — “The pack also features a cozy little plaza” / “With its cobblestone design”.

**REQ-09-053.** The pack includes a cobblestone path for streets and alleys.

Source: same post — “the cobblestone path included in this pack”.

**REQ-09-054.** Version 2.1.7 (US date 04/08/2025; day-first storefronts 08/04/2025) tells the player to build with Amsterdam-style buildings and canals, and calls canals a brand-new feature.

Source: US App Store version history — “Amsterdam Add-on: Build with beautiful Amsterdam-style buildings and canals, a brand-new feature in the game!”

**REQ-09-055.** The Amsterdam post does not say the pack is a one-time purchase, does not give a price, and does not say the buildings change tourism, land value, or income. An Aug 20, 2025 article on the same site says to “Integrate the Amsterdam Pack to boost tourism”. That effect is not in the developer post. See Contradictions.

### Zoo

**REQ-09-056.** The Zoo Add-On exists. Ben posted it on Jan 6, 2025. Version 2.0.19 (US date 12/14/2024) already lists “Zoo Addon” among the 2.0 features.

Sources: https://supercitycon.net/super-citycon-zoo-add-on/ and the US App Store note for 2.0.19.

**REQ-09-057.** The add-on includes 12 animal habitats. The post does not name the 12 habitats. The only animals it mentions are lions and monkeys, as examples (“From majestic lions to playful monkeys”), not as a roster.

Source: Zoo post — “12 beautifully designed animal habitats”.

**REQ-09-058.** The add-on includes decorative buildings. The post does not say how many, and does not name them.

Source: same post — “a variety of decorative buildings”.

**REQ-09-059.** The player can connect the habitats with custom paths and choose the layout.

Source: same post — “The animal habitats can be connected using beautiful custom paths, giving you complete freedom to design your zoo exactly how you want it.”

**REQ-09-060.** The Zoo post says “Get the Zoo Add-On now” and does not state a price or say the word “permanent”. The Aug 20, 2025 article’s claims about zoo traffic, noise, and green access are not in the developer post. See Contradictions.

### Curaçao

**REQ-09-061.** The Curaçao add-on (blog title “Curacao Addon”, body spelling “Curaçao”) exists. Ben posted it on May 24, 2023. The post says to find it and other add-ons in the shop.

Source: https://supercitycon.net/curacao-add-on/

**REQ-09-062.** It includes 6 colorful grand villas that mix Dutch colonial and Caribbean design. The post does not name the six villas.

Source: same post — “Included in this addon are 6 colorful, grand villas”.

**REQ-09-063.** Purchasing this add-on permanently unlocks those six residential structures.

Source: same post — “Purchase the addon to permanently unlock six charming and vibrant residential structures”.

### Monorail

**REQ-09-064.** The Monorail add-on exists. Ben posted it on Jun 28, 2023.

Source: https://supercitycon.net/monorail-addon/

**REQ-09-065.** It adds a monorail that runs above the streets. The post says the player replaces traditional street connections with it, and that it can be integrated from residential neighborhoods to commercial districts and industrial zones. Station names, track pieces, and fares are UNKNOWN.

Source: same post — “glides gracefully above the city streets” and “Replace the traditional street connections”.

**REQ-09-066.** On one map the player can have only one monorail loop.

Source: same post — “Currently, you can only have one loop in a map, so build it wisely.”

**REQ-09-067.** Multiple monorail lines are not a current feature in that post. The post says further extension with multiple lines is planned.

Source: same post — “We are planning on further extension with multiple lines.”

**REQ-09-068.** The Monorail post does not say “purchase” or “permanent”. Whether it follows REQ-09-044 is UNKNOWN beyond the general shop line.

### Trailer Park

**REQ-09-069.** The Trailer Park add-on exists. Ben posted it on Jun 28, 2023. It contains 12 distinct buildings. The post does not list all 12.

Source: https://supercitycon.net/trailerpark-addon/ — “12 distinct buildings”.

**REQ-09-070.** The buildings the post names are a vintage-inspired Caravan, a modern Camper, and Tiny Houses. Those names are not a claim that the pack contains only three buildings.

Source: same post — “From the vintage-inspired Caravan to the sleek and modern Camper and the quaint charm of the Tiny Houses”.

**REQ-09-071.** The Trailer Park post does not say “purchase” or “permanent”. Price and one-time status are UNKNOWN except for the general rules in REQ-09-044 and REQ-09-046.

### Retro 1990

**REQ-09-072.** “Retro 1990” is a named add-on in versions 1.7.1 and 1.7.2, and “the Retro Add-on” receives more models in version 2.1.7. Droid Gamers (Mar 6, 2025) lists “Retro 1990s” among add-on packs. No source lists the buildings in the add-on. The phone booths and arcade hall in REQ-09-040 belong to the 2023 event post, and no source says they are the add-on’s contents.

Sources: US App Store version history; https://www.droidgamers.com/news/create-endlessly-in-super-citycon-a-game-that-mixes-townscaper-with-minecraft/

### Paris

**REQ-09-073.** A Paris add-on exists. The store note says it has modular buildings, elegant parks, and the Eiffel Tower. Counts, other landmark names, price, and whether the unlock is one-time are UNKNOWN.

Source: US App Store version history for 2.2.0 and 2.1.9 — “Discover the charm of Paris with modular buildings, elegant parks, and the iconic Eiffel Tower in this stylish new add-on!”

**REQ-09-074.** That same Paris sentence is the entire note for both version 2.1.9 (US date 04/10/2025) and version 2.2.0 (US date 09/19/2025). The notes do not say whether Paris shipped twice.

Source: same version history.

### Ancient China

**REQ-09-075.** An Ancient China add-on exists. The current US App Store note, placed above version 2.4.0, says “Build and grow your city with the Ancient China add-on.” Singapore and other storefronts say “Build and expand your city with the Ancient China add-on.” Google Play’s What’s new uses the “Build and grow” sentence. No source names a building, garden, or landmark in the pack. Price and one-time status are UNKNOWN.

Sources: US and SG App Store version histories; Google Play What’s new, listing updated Dec 20, 2025.

**REQ-09-076.** The US history does not attach a version number to the Ancient China note. The numbered note under it, version 2.4.0, is dated 12/21/2025 in the US listing and 21/12/2025 on day-first storefronts, and says only “Maintenance update with minor improvements and bug fixes.” Google Play’s update date for the Ancient China text is Dec 20, 2025. Which version number shipped Ancient China is UNKNOWN.

### Version 2.3.0’s five add-ons

**REQ-09-077.** Version 2.3.0 (US date 10/23/2025; day-first storefronts 23/10/2025) “brings 3 new maps and 5 beautiful add-ons”. The note does not name the five add-ons or the three maps. Naming them would be an invention. The maps themselves are out of this slice.

Source: US App Store version history.

### Marble Lane and Parkwalk

**REQ-09-078.** Version 2.1.7 adds requested models to Marble Lane, Parkwalk, and the Retro Add-on. The note does not say Marble Lane or Parkwalk are add-ons, and it does not name the models. Their contents, prices, and whether they are packs are UNKNOWN.

Source: US App Store version history — “We’ve added requested models to Marble Lane, Parkwalk, and the Retro Add-on”.

### Beach Life as a pack

**REQ-09-079.** The July 25, 2023 developer post presents Beach Life as a 30-day event, not as a shop add-on. An Aug 20, 2025 article on the site lists “Beach Life” beside Amsterdam as an add-on used for themed districts. No developer post gives Beach Life a permanent unlock or a contents list beyond REQ-09-039. Whether Beach Life remains as a pack after the 30 days is UNKNOWN.

Sources: https://supercitycon.net/beach-event-2023/ and https://supercitycon.net/urban-design-and-video-games-what-super-citycon-teaches-about-city-planning/

### One-time unlock, stated only where a source says it

**REQ-09-080.** The only pack whose own post says the unlock is permanent is Curaçao (REQ-09-063). The only general statement is the cut-off shop line in REQ-09-044. No source says an add-on expires, is rented, or must be bought again, except that a full account reset deletes purchases (REQ-09-046). For Amsterdam, Zoo, Monorail, Trailer Park, Retro 1990, Paris, Ancient China, and the five unnamed 2.3.0 add-ons, “one-time” is not stated on that pack’s own source.

## 4. Stages, options, and complexity this slice actually supports

Sourced only:

- Collectible cards are unfinished until they complete. The player can wait, or tap to finish early as a premium action. Stages of a card, and the premium price, are UNKNOWN (REQ-09-004, REQ-09-005, REQ-09-007).
- Beach Life is a 30-day login track: one new reward each day the player logs in. The day-by-day list is UNKNOWN (REQ-09-037, REQ-09-038).
- High scores, from version 2.1.2, are four categories. The categories are UNKNOWN (REQ-09-020, REQ-09-021).
- A June 2022 ranking could be shown as a top percentile (top 1%). Later copy also shows the player’s own ranking and, in the older store text, where high scores place them (REQ-09-019, REQ-09-024, REQ-09-027).
- Mayor Score is announced as one comprehensive score, with the indicators in REQ-09-030 announced beside it. No source gives score tiers, ranks, or seasons.
- Monorail placement on a map is one loop. Multiple lines are a stated plan, not a current option (REQ-09-066, REQ-09-067).
- Curaçao’s unlock is permanent until a full account reset deletes purchases (REQ-09-063, REQ-09-046).

No source gives card levels, chest ladders, league names, or a season calendar for Mayoral Match-Up.

## 5. Contradictions

1. **Four categories vs Mayor Score vs top 1% vs “election”.** Version 2.1.2 says four high-score categories and does not name them. The May 2024 post announces one Mayor Score plus Happiness, Culture, Entertainment and Recreation, Wealth, Diversity, and Loyalty. A 2022 post shows “top 1%” with no metric. Pocket Gamer adds “mayoral election”, which no developer source describes. These are not merged.

2. **Monthly promise vs the notes that exist.** Store copy and Ben’s Nov 2024 reply say new buildings or content every month. The public notes do not list a building drop for every month. Known named drops are uneven: Retro event in Oct 2023, Retro 1990 in Jan 2024, Zoo with 2.0 in Dec 2024, weekly rare buildings in the Jan 4, 2025 note, Amsterdam in the Apr 8, 2025 note, Paris text on both Apr 10 and Sep 19, 2025, five unnamed add-ons on Oct 23, 2025, Ancient China on the current note. Missing months are UNKNOWN, not empty.

3. **Paris note repeated.** Version 2.1.9 and version 2.2.0 carry the same Paris sentence, about five months apart. The notes do not say if this is one release copied forward or two releases.

4. **Beach Life: event vs add-on.** Ben’s July 25, 2023 post: 30 days only. The Aug 20, 2025 “orbidi1” article calls Beach Life an add-on for themed districts, in the same breath as Amsterdam.

5. **Retro: event, then add-on.** Sept 2023 event and version 1.6.15 describe a retro event. Jan 2024 notes name a Retro 1990 add-on. No source says the event pieces became the add-on.

6. **Zoo date.** Version 2.0.19 (Dec 14, 2024) lists Zoo Addon as part of 2.0. The Zoo post is dated Jan 6, 2025 and says “Get the Zoo Add-On now”. Both can be true. Neither states a price.

7. **Ancient China dating.** The US note sits above 2.4.0 and has no version number. Version 2.4.0 is a maintenance note dated Dec 21, 2025 on the US listing. Google Play shows the Ancient China sentence on a listing updated Dec 20, 2025. US wording is “Build and grow”; some other App Store countries say “Build and expand”.

8. **No pay-to-skip vs a premium finish.** Google Play says “No construction timers, no pay-to-skip”. The basics video says finishing a collectible card early is a premium option. The 2022 reviews describe cards that speed construction. The sources do not say these are the same action. Construction timing itself is handed off.

9. **Permanent unlock vs full reset.** Curaçao is a permanent unlock. The FAQ says a full reset deletes purchases and they cannot be recovered. Permanence stops at that reset.

10. **Third-party effects that developer pack posts do not state.** The Aug 20, 2025 articles say the Amsterdam Pack boosts tourism, that a zoo makes the player handle traffic, noise, and green access, and that a visually appealing city “unlocks premium expansions faster”. The Amsterdam and Zoo posts by Ben do not say those things. They are not requirements.

11. **Steam “out now” vs Steam “Q4 2026”.** Droid Gamers (Mar 6, 2025) says the game is on Steam now, without paid content. The Steam page says not yet available, Q4 2026, and unlike the mobile game. Excluded from live requirements. Sunapie’s homepage says “Play now on iOS, Android, PC and Mac.” The only live PC path found is Google Play Games on Windows for the Android app. A separate live Mac build, other than iOS on a Mac, was not found.

## 6. Unknowns

- Collectible card names, set size, completion reward, and the premium price and currency for tap-to-finish.
- Whether collectible cards, 2022 booster cards, and 2022 task power-up cards are the same objects.
- Chest names other than Golden Chest; chest timers; chest contents; whether the Golden Chest drops collectible cards.
- The four high-score category names.
- Whether the player opts into Mayoral Match-Up, and whether it is a Game Center leaderboard.
- The ranking screen’s rows: other players, city names, scores, friends, seasons, rewards.
- Whether Mayor Score is one of the four categories, or a separate number.
- Achievement names, if the Game Center line means in-game achievements exist.
- Weekly rare building names, cost, duration, and whether they return.
- A month-by-month list of building updates. The store promises one. The notes do not supply it.
- Beach Life’s 30 daily rewards, item by item, and whether any of them stayed after day 30.
- Whether phone booths and the arcade hall are part of the Retro 1990 add-on.
- The 14 Amsterdam building names. Only the count, the townhouse description, two canal sizes, one cobblestone plaza, and a cobblestone path are sourced.
- The 12 zoo habitats and the decorative buildings. Lions and monkeys are examples in the post, not a roster.
- The six Curaçao villa names.
- Monorail pieces, stations, and whether the “passengers” line is simulation or ad copy. Multiple lines are only a plan.
- The other Trailer Park buildings beyond Caravan, Camper, and Tiny Houses.
- Paris contents beyond “modular buildings, elegant parks, and the iconic Eiffel Tower”, and whether 2.1.9 and 2.2.0 are one drop or two.
- Every Ancient China asset. The pack is named and nothing inside it is.
- The five add-ons and three maps in version 2.3.0. None are named.
- Whether Marble Lane and Parkwalk are add-ons, base sets, or maps, and which models version 2.1.7 added.
- The price of every pack, and which App Store or Play product sells it.
- For every pack except Curaçao, an explicit “one-time” or “permanent” sentence. The shop video’s sentence is cut off.
- Whether an unlock applies to every map or only the current one. Monorail’s one-loop rule is per map. The purchase scope is not.
- Whether add-ons, cards, chests, and Mayoral Match-Up differ on the PC/Mac build. Sunapie says that build exists. No source describes its collectibles or packs.
- Whether a single-map reset keeps add-on unlocks. The FAQ only says the full reset deletes purchases.

## 7. Handoff

- Economy / city upgrades: Mayor Score bonus math from https://supercitycon.net/new-bonuses-for-residence-growth/ (per-map Culture, Entertainment, Recreation, Wealth, Diversity, Loyalty; 1,000 residents per point; 250% caps; single-count vs multi-count buildings; eight-skyscraper diversity penalty; loyalty points per login day). Income and the city-upgrade shop are also in the basics video and are not specified here.
- Tasks / mailbox: task messages that award the 2022 power-up cards. The cards are in this slice; the task list is not.
- Ads: the basics video’s ad popup for double speed for 10 minutes, and the June 2022 guide’s ad that fast-forwards the day. Not specified here.
- Construction: Google Play’s “no construction timers, no pay-to-skip” versus cards that speed construction, and version 1.6.17’s note that constructions progress in the background. Not specified here.
- Maps: the 3 unnamed maps in version 2.3.0. Region view is not specified here.
- Account: bonus codes in general, and the full-reset flow. Only the Golden Chest path and the “purchases are deleted” result are in this slice.
- Rewards: version 1.6.17’s “free gift every 3 hours” is not called a chest or a card in the note.
- Platforms: Sunapie’s “PC and Mac” line, Google Play Games on Windows, and the excluded Steam app 3474890.
- Buildings: version 2.1.7’s unnamed extra models for Marble Lane, Parkwalk, and Retro, once a building catalog exists. This slice only records that the note says models were added.
