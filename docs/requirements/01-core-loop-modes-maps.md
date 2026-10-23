---
cursor:
  subagentId: "bc-9f82ac7b-363e-5673-bb11-2bc4729520ad"
---

# Slice 01 — Core loop, modes, maps, regions, goals

Player-facing requirements for the live Super Citycon city builder from Ben Willes Games (iOS, Android, and the PC/Mac availability claimed for that same game). This is not an engineering design.

Live store text and the developer’s own tutorial do not describe the same construction loop. Both are recorded. Nothing below is filled in where a source is missing.

## 1. Scope of this slice

In scope:

- What the player does in a session, including how a new city starts and how progress carries between sessions.
- The ongoing city versus Sandbox Mode, and any other sourced mode. A feature literally named “sandbox v2” was searched for and not found.
- Multiple maps, region view, and how the player moves between maps.
- Resetting one map versus resetting the whole account, and what happens to buildings when a map is cleaned.
- Win, lose, or the lack of either, plus the goals a session is aimed at.
- Mayoral Match-Up only as the existence of a ranking goal. Category and scoring detail is slice 09.
- Ads and speed boost only where they change the pace of a session.

Out of scope, except as a handoff or an exclusion:

- Road types, services, coverage, economy formulas, the building catalog, add-ons, and shop prices.
- Street-view physics, science-view influence types, and camera options beyond the zoom that enters a view.
- Steam app 3474890 (Sunapie Games, listed Q4 2026, SCC Studio, Workshop, map creator, tycoon puzzle mode). That is a different, unreleased product. It is named here only so it is not copied into live requirements. An official February 2025 post called the Steam project “Super Citycon Unlimited” and said it would carry “the same gameplay” as mobile; the current Steam page instead lists extra modes and “no in-app purchases.” Neither description is a live requirement.

The public site `https://supercitycon.net/` returned an under-construction page on 23 October 2026 (“Shape the land, lay the first road…”). That page does not describe modes, maps, or goals, and it is not used as a gameplay source. Older pages were read from the Wayback Machine because the live FAQ, support, and article URLs returned 404.

## 2. Sources used

Official and store:

- App Store, Ben Willes Games SL, app id 1607860732, US listing read 23 October 2026: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- Same app, Congo listing, used for the in-app purchase name “Sandbox Mode”: https://apps.apple.com/cg/app/super-citycon-build-a-city/id1607860732
- Google Play, `com.benwilles.citybuilder`, updated 20 December 2025: https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
- Sunapie homepage, “The New Home of Super Citycon. Play now on iOS, Android, PC and Mac.”: https://sunapie.com/
- Developer post, 20 May 2024, Region View and Skyview (Wayback): https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/
- Developer post, 2 November 2024, map switching overhaul (Wayback): https://supercitycon.net/balance-updates-in-2-0-for-ios-players/
- Developer post, 2 November 2024, Android release, “empty grid” (Wayback): https://supercitycon.net/super-citycon-now-available-on-android/
- Developer post, 4 November 2024, per-map bonuses and daily loyalty (Wayback): https://supercitycon.net/new-bonuses-for-residence-growth/
- Developer post, 28 June 2023, street view (Wayback): https://supercitycon.net/street-view-walk-your-cities/
- Developer post, 19 February 2025, Steam announcement only (Wayback): https://supercitycon.net/super-citycon-unlimited-is-coming-to-steam/
- FAQ (Wayback; live URL 404): https://supercitycon.net/faq/
- Support (Wayback; live URL 404). Same reset text as the FAQ, plus a confirmation step: https://supercitycon.net/support/
- Pocket Gamer, 4 March 2025, sandbox, region, street, mayor: https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/
- Archived 2024 homepage, mobile city builder, not the 2026 under-construction page: https://supercitycon.net/

Developer tutorial and developer replies:

- “Super Citycon: The Basics,” Ben Willes Games. Transcript as indexed; timed captions could not be retrieved, so quotes have no timestamps: https://www.youtube.com/watch?v=jYAD0SkDmY0
- Ben Willes on r/supercitycon, map wipe and inventory, 21 July 2025: https://www.reddit.com/r/supercitycon/comments/1m5kx9c/starting_over/
- Ben Willes on r/supercitycon, shop recovery of stored buildings, 29 January 2025: https://www.reddit.com/r/supercitycon/comments/1icd7cb/how_can_i_access_the_storage_in_the_game/
- Ben Willes on r/supercitycon, sandbox purchase still needs Citycon buildings for slots, 2 May 2026: https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/
- Ben Willes on r/supercitycon, lifetime speedup, 9 March 2025: https://www.reddit.com/r/supercitycon/comments/1j7dt82/is_there_an_iap_for_disabling_the_ads/
- Ben Willes on r/supercitycon, no neighborhood labels; more maps and regions are the focus, 9 August 2025: https://www.reddit.com/r/supercitycon/comments/1mlso43/is_there_a_neighborhood_labelling_feature/
- BenWillesGames on r/supercitycon, one map at the time, multi-map planned, 30 May 2022: https://www.reddit.com/r/supercitycon/comments/v18y65/new_territories/

Player reports used only where they state a player-facing fact:

- Tutorial skip at first open, 18 May 2022: https://www.reddit.com/r/iosgaming/comments/unhbjp/super_citycon_build_a_city_new_release/
- Filled first city, other areas exist, 8 October 2022, App Store review by crazyladygame, on the US App Store page above.
- Progress kept after a crash, 13 November 2024, Google Play review by Medz Saliddin.
- Offline earnings and mailbox tasks, 17 April 2024, App Store review by Hahdjhdjd.
- One filled map at level 16, 22 June 2022, comment on the iOS gaming thread above.

Rejected as a requirement source: the 20 August 2025 article “Common mistakes when building your city” on supercitycon.net, bylined orbidi1. It describes zoning, roundabouts, one-way streets, land value, and citizen pop-up complaints. None of that appears in the developer tutorial, FAQ, or store text. It is listed under contradictions and is not turned into requirements.

A June 2022 Mobile Gaming Hub guide (https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/) is used only where the developer tutorial says the same thing (tasks arrive in the mail). Its claims about fast-forwarding the day and six-hour idle earnings are not corroborated and are not requirements.

## 3. Requirements

### Session and saving

**REQ-01-001.** The player keeps one continuing city. Closing the app does not end that city or start a new one.

> “good it saves where you last stopped”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder (review by Medz Saliddin, 13 November 2024)

**REQ-01-002.** On iOS, deleting the app and installing it again does not remove the city.

> “Don’t worry, you will not loose your game progress.”
>
> https://supercitycon.net/faq/ (Wayback; the sentence is in the “app opens then closes” steps)

**REQ-01-003.** On iOS, the player can turn on iCloud for Super Citycon so the save is kept and appears on the player’s other iOS devices.

> “SUPER CITYCON uses your iCloud to secure your save file and syncs it across all your iOS devices.”
>
> https://supercitycon.net/faq/

**REQ-01-004.** While the app is closed, some earnings can still accrue. The amount, the cap, and which currency are not stated.

> “Offline earnings haven’t really done much for me.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (review by Hahdjhdjd, 17 April 2024)

### How a city starts

**REQ-01-005.** A new city starts on an empty grid. The player fills it by placing roads, homes, and other structures until it is a town or a city.

> “Start from an empty grid and turn it into a bustling metropolis or a peaceful town.”
>
> https://supercitycon.net/super-citycon-now-available-on-android/

**REQ-01-006.** At first open, the player can skip the tutorial. The tutorial can still be found after it is skipped.

> “Option to skip the tutorial for new players”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 1.6.16, 23 October 2023, and 1.6.17, 7 November 2023)
>
> “When it opens, you have the option to skip the tutorial, but tutorial is mellow and easy to find if you skip.”
>
> https://www.reddit.com/r/iosgaming/comments/unhbjp/super_citycon_build_a_city_new_release/ (18 May 2022)

The two dates do not agree. See contradictions.

**REQ-01-007.** Some features are absent at the first start and appear only after the city has progressed. Which features, and at what point, are not listed.

> “some of the features um they do not they are not unlocked at the game start”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-008.** The player begins with one construction slot.

> “in the beginning you will have only one”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-009.** Buildings the player has not unlocked yet are still visible in the shop in the early game, and the level that unlocks them is shown.

> “Higher level buildings are now visible in the shop even in the early game. Also, the unlock level is no longer hidden in the details.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 1.6.16 / 1.6.17)

### What the player does in a session

**REQ-01-010.** A session is spent laying out the city: place a building by dragging it, and it snaps to a street. A building on a road that does not connect is not connected. The only road called out as non-connecting is a muddy road. The rest of the road catalog is a handoff.

> “you drag it there it automatically snaps to the streets”
>
> “the muddy roads won't give Road connection uh to this building”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-011.** The player can long-press a building, enter an edit state, rotate it, move it, and confirm.

> “to edit a building you long tap a building and you will get into orbit mode here you can top the edit button on the right side um this one will give you the options to rotate uh to confirm”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-012.** The build inventory has its own bulldozer. The player chooses categories, then taps objects to remove them. This is not the control that wipes a whole map.

> “if you open the inventory on the right side uh you will find the bulldozer button uh if you check the bulldozzer uh you can choose three categories which essentially uh tells which things get bulldozed when you tap them so I will disable trees and streets”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

Whether objects removed this way go into storage is not stated. See unknowns.

**REQ-01-013.** Tasks arrive in the mailbox. The mailbox can also hold messages and tutorials, and it is part of a normal session to check it.

> “the mailbox uh that's mainly where you receive your tasks um but also from time to time you will get a message you can also uh find some uh tutorials inside of here”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-014.** The game tells the player what a task still needs. Meeting tasks is a session goal alongside free building. The task list, rewards, and point names are not in this slice.

> “Will let you know what it needs to complete each tasks. You build the city the way you what.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (review by crazyladygame, 8 October 2022)
>
> “entertaining with mini challenges from tasks”
>
> same page, review by Hahdjhdjd, 17 April 2024

**REQ-01-015.** The player can open city upgrades from early in the game. Most of them are bought with coins. After those are bought, some cost supercash. They improve the city. The upgrade list is a handoff.

> “when you start you will find a lot of uh City upgrades uh mainly City upgrades can be purchased with coins once you got everything at some point you will find uh some with uh super cash”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-016.** Logging in on a day grants one loyalty point. Missing two days in a row removes loyalty points. The bonus percent those points become is a handoff.

> “Every day you log into the game, you’ll earn one Loyalty Point. If you miss two consecutive days, Loyalty Points will be deducted.”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/

**REQ-01-017.** The player can open a government area for city management, including overviews for electricity, water, food, waste, healthcare, police, fire, and education. What those overviews do is a handoff.

> “government area is for everything related to manage the game”
>
> “overview for electricity for water for food Waste Management healthc care police uh fire and education”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

### Construction loop versus Sandbox Mode

These are two ways the same city is built. No source describes a mode-select screen, a campaign, or a second save slot.

**REQ-01-018.** Without Sandbox Mode, construction takes time. Work continues in the background even when the player has no speedup time left.

> “Constructions now progress in the background, even without speedup time left”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 1.6.16 / 1.6.17)

Store pages that say the whole game has no timers are recorded under contradictions. They are not this requirement.

**REQ-01-019.** Some buildings need two or more construction slots at once. The player cannot place such a building on slots they do not have.

> “some bigger buildings uh require two or more construction slots”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> “A warning pops up saying 2 slots needed.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (2 May 2026)

**REQ-01-020.** Each Citycon building the player places adds one permanent construction slot.

> “for each cityon building that you buil … you will get another permanent construction slot”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> “It's actually those buildings that give you the additional slots.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (Ben Willes, 2 May 2026)

**REQ-01-021.** More construction slots can also be bought in the shop or collected over time. Prices are a handoff.

> “you can get those from shop you can also collect them over time or a combination of both”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-022.** Gaining many construction slots is the free path toward building several things at once. The developer distinguishes that path from the paid sandbox offer.

> “then you are close to to almost the sandbox I say almost the sandbox of course we also have a new Sandbox offer with version two”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-023.** Sandbox Mode is a paid offer added in version 2.0. It is sold under the in-app purchase name “Sandbox Mode.” It is not the state of a brand-new free city.

> “Super Citycon 2.0 is here with exciting new features: a new Bonus Economy, Region View, Sandbox Mode, Zoo Addon, Camera Mode”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 2.0.19, 14 December 2024)
>
> In-app purchase row: “Sandbox Mode USD 19.99”
>
> https://apps.apple.com/cg/app/super-citycon-build-a-city/id1607860732 (price is this storefront at fetch time, not a universal price)

**REQ-01-024.** With Sandbox Mode, construction finishes immediately. The player still spends resources. There is no wait and no pay-to-skip of a timer, because the timer is gone.

> “SANDBOX CONSTRUCTION MODE: Build instantly without delays. Resources are key, but there’s no waiting for construction!”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
>
> “Sandbox Constructions DLC that is supposed to have zero construction time and constructions finished instantly.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/

**REQ-01-025.** Sandbox Mode does not remove construction-slot limits. After a map reset, the extra slots from Citycon buildings come back only when those buildings are placed again.

> “you possibly didn't place the Citycon buildings after you had reset the map. It's actually those buildings that give you the additional slots.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (Ben Willes, 2 May 2026, answering a player who had already bought the sandbox purchase)

**REQ-01-026.** No source names a mode “sandbox v2,” “Sandbox V2,” or “sandbox mode v2.” The version-2 sandbox is the Sandbox Mode in REQ-01-023 through REQ-01-025.

Search of the store listings, the developer posts, the tutorial, and r/supercitycon did not return that name. The closest wording is “a new Sandbox offer with version two” in the tutorial cited under REQ-01-022.

### Speed boost, only where it changes the session

**REQ-01-027.** During play, a prompt can offer an ad. If the player watches it, the game runs at double speed for 10 minutes. The player can dismiss the prompt and keep playing at normal speed.

> “this popup will ask you to support us um watching that so the game will run on double speed uh for 10 minutes um yeah for now we don't do that”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-01-028.** A lifetime speedup purchase makes every session run at X2, and the ad reminders for that boost stop appearing.

> “the speedup lifetime package is exactly for this. It makes the game always run at X2 speed and the add reminders will never come back again.”
>
> https://www.reddit.com/r/supercitycon/comments/1j7dt82/is_there_an_iap_for_disabling_the_ads/ (Ben Willes, 9 March 2025)

The price the player quoted is not treated as the catalog price. See contradictions.

### Maps, region, and views

**REQ-01-029.** The player has more than one map. The maps are separate buildable places, not one continuous plot the size of a single map.

> “Nice to know there are others Super CityCon areas to conquer when my first one is completely filled up!”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (review by crazyladygame, 8 October 2022)
>
> “all these bonuses are calculated independently for each map … and won’t impact other maps.”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/

**REQ-01-030.** Version 2.3.0 added three maps. Their names are not published in that note. Five add-ons arrived in the same update; add-ons are not maps.

> “This major update brings 3 new maps and 5 beautiful add-ons”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 2.3.0, 23 October 2025)

**REQ-01-031.** All of the player’s maps are shown together as one region from Skyview, so the player can see the whole set at once.

> “Now, all your maps are combined into one massive region that you can explore from Skyview. This feature enhances your strategic planning and allows you to see your entire empire in one glance.”
>
> https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/

**REQ-01-032.** From version 2.0, the player changes which map section they are working on by zooming out to skyview. That replaced switching only through a menu.

> “Gone is the old, clunky menu-based navigation! Instead, you’ll now be able to zoom out to a skyview, making it effortless to switch between different sections of your city.”
>
> https://supercitycon.net/balance-updates-in-2-0-for-ios-players/

The maps window still exists for reset. See REQ-01-038 and contradictions.

**REQ-01-033.** Store text says the player integrates the maps into one region and builds interconnected towns and landscapes. No source says a road, a person, or a service crosses the border between maps.

> “REGION VIEW: Seamlessly integrate multiple maps into one cohesive region. Design interconnected cities and landscapes.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
>
> “REGION VIEW: Connect multiple city maps into one region.”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder

**REQ-01-034.** Residence-growth bonuses are scored on the map the player is building. A bonus on one map does not change another map.

> “Your progress and bonus levels are specific to each map and won’t impact other maps.”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/

**REQ-01-035.** Satellite view is another zoom step past a bird’s-eye view of the current city. Zooming back in leaves it. Whether this is the same view as Skyview is not stated.

> “Zoom out fully so you see your city from a birds perspective, then zoom out again to enter Sat-view. To exit Sat-view, simply zoom in and you will get back into the regular 3D mode.”
>
> https://supercitycon.net/faq/

**REQ-01-036.** Street view is a walk through the current city, entered by zooming all the way in and then zooming in once more. It is a way of looking at the map, not a separate game mode.

> “Zoom in to the lowest point, and then zoom in again to enter street view.”
>
> https://supercitycon.net/street-view-walk-your-cities/
>
> Same steps: https://supercitycon.net/faq/

**REQ-01-037.** Science view is a view of the current map. The player opens and closes it by tapping the minimap. A bar on the right chooses which local influences on that map to show. The influence list is a handoff.

> “Tap the minimap to enter science view. The right bar lets your choose between all on this map exisiting local influences to visualize them. Tap the minimap again to exit science view.”
>
> https://supercitycon.net/faq/

**REQ-01-038.** A maps window in the top left lists maps. That window is how the player starts a one-map reset. The control on a map is a bulldozer.

> “To reset a map open the maps window in the top left corner”
>
> https://supercitycon.net/support/

**REQ-01-039.** The player cannot paint a neighborhood label on a map.

> “At this point it doesn’t have such a feature”
>
> https://www.reddit.com/r/supercitycon/comments/1mlso43/is_there_a_neighborhood_labelling_feature/ (Ben Willes, 9 August 2025)

### Reset one map versus full reset

**REQ-01-040.** The player can clean one map without cleaning the others and without starting a new account.

> “Reset a single map. This option cleans one map and puts all the buildings you had on it into your storage.”
>
> https://supercitycon.net/faq/ and https://supercitycon.net/support/

**REQ-01-041.** One-map reset has no undo.

> “Keep in mind there is no undo for this operation!”
>
> https://supercitycon.net/support/

**REQ-01-042.** To clean one map, the player opens the maps window, uses the bulldozer on that map, and confirms. Support includes the confirmation. The archived FAQ list stops at the bulldozer.

> “1. To reset a map open the maps window in the top left corner 2. Click the bulldozer button on the map you want to reset 3. Confirm the reset.”
>
> https://supercitycon.net/support/

**REQ-01-043.** Buildings that were on the cleaned map are kept. They are not deleted. Official help calls the place they go “storage.” The developer, for the same bulldozer, says they are “in your inventory.”

> “puts all the buildings you had on it into your storage.”
>
> https://supercitycon.net/faq/
>
> “you can use the bulldozer button in the map menu and your map is wiped out and your buildings are in your inventory.”
>
> https://www.reddit.com/r/supercitycon/comments/1m5kx9c/starting_over/ (Ben Willes, 21 July 2025)

**REQ-01-044.** The player gets a stored building back from the shop. For a building that is stored, the buy button is replaced by a control that returns it to inventory. No separate storage screen is described.

> “Check out in the shop, you’ll find an option to put the building back into the inventory instead of a buy button for buildings that you got stored.”
>
> https://www.reddit.com/r/supercitycon/comments/1icd7cb/how_can_i_access_the_storage_in_the_game/ (Ben Willes, 29 January 2025)

**REQ-01-045.** A one-map reset does not, by itself, delete purchases or rewards. A full account reset does.

> Full reset: “All your rewards and purchases will be deleted and cannot be recovered after a full game reset.”
>
> https://supercitycon.net/faq/
>
> The one-map paragraph on that page only sends that map’s buildings to storage. It does not say purchases are removed.

**REQ-01-046.** Full reset is a different control. The player opens settings, uses “reset account” at the very bottom, and passes a security confirmation. The account is then a new player. Progress and purchases are gone. It cannot be undone.

> “To fully reset Super Citycon, enter the settings menu and tap the “reset account” button and the very bottom. After the security confirmation, all your account data will be deleted and you can restart the game as new player.”
>
> https://supercitycon.net/support/
>
> “You will lose all your progress including all purchases you possibly did.”
>
> same page

The FAQ uses “setting menu” for the same button. Same control.

### Goals, and the absence of a sourced ending

**REQ-01-047.** The session goal is to keep growing the same city, from a small start toward a metropolis, while keeping citizens happy and balancing services, leisure, and the city budget. No store page, FAQ, tutorial, or developer post describes a screen or a condition that says the city is won or lost.

> “Design your town from a small village to a massive metropolis”
>
> “Manage utilities, leisure, and city services to keep your citizens happy Plan your urban layout and balance your city budget”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
>
> “From farm to flourishing mega metropolis”
>
> older wording still on a store variant of the same app id: https://apps.apple.com/us/app/super-citycon-city-builder/id1607860732

Absence of a win or lose is an absence in the sources, not a sentence that says “there is no game over.” See unknowns.

**REQ-01-048.** Mayoral Match-Up is a global ranking the player can climb by building the city. The high-scores control shows the player’s current ranking. How rank is calculated, and the four categories named in version 2.1.2, belong to slice 09.

> “MAYORAL MATCH-UP: Compete globally to build the grandest city and climb the ranks.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
>
> “high scores gives you an overview of your current ranking”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> “HIGHSCORES: Compete with other Mayors across four categories.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 2.1.2, 4 January 2025)

**REQ-01-049.** On iOS the game also exposes Game Center leaderboards and achievements. Achievement names are not in this slice.

> “This game also features leaderboards and achievements.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732

### Where the live game is played

**REQ-01-050.** The requirements in this document are for one live game on iPhone, iPad, and Android. Google Play also lists that same app on Windows. Sunapie says the game can be played now on iOS, Android, PC, and Mac. No source describes a different ruleset for the PC or Mac build of this game.

> App Store compatibility: iPhone, iPad, iPod touch, Apple Vision. https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
>
> “Available on Android, Windows”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
>
> “Play now on iOS, Android, PC and Mac.”
>
> https://sunapie.com/

**REQ-01-051.** The live game does not include a map creator, a Steam Workshop, or a separate tycoon-puzzle mode. Those are described for Steam app 3474890, which that page calls a different PC product from the mobile game.

> “Super Citycon Unlimited: Unlike its mobile predecessor, this PC version is a premium experience with no in-app purchases, ads, or paywalls”
>
> “a sandbox mode for unrestricted creativity, a map creator for designing custom maps, and a tycoon puzzle mode”
>
> https://store.steampowered.com/app/3474890/Super_Citycon/

## 4. Stages, options, and complexity this slice actually supports

Only changes that alter the loop, the mode, or the map structure are listed. Building packs that do not change those are omitted.

| When | What the sources support |
| --- | --- |
| May 2022 | One buildable territory. A player at level 16 had filled it. The developer said a multi-map update was planned for week 25. A player already reported a skippable tutorial at first open. Construction was described as timed. A player described a one-month ad removal around $0.99. |
| 8 October 2022 | A player who had not finished the first city was told, in their own review, that other Super Citycon areas exist once the first is full. |
| 23 October 2023 and 7 November 2023 (1.6.16 / 1.6.17) | Patch notes add “option to skip the tutorial for new players,” background construction without speedup time, and visible locked buildings with their unlock level. |
| 20 May 2024 announcement, shipped as 2.0.19 on 14 December 2024 | Region View from Skyview, Sandbox Mode, skyview map switching instead of menu-only switching, bonus economy, orthographic camera, more languages. Android open release is announced 2 November 2024. |
| 4 January 2025 (2.1.2) | High scores across four categories. Detail is slice 09. |
| 8 April 2025 (2.1.7) | The note names Marble Lane and Parkwalk next to the Retro Add-on. It does not say whether those two names are maps. |
| 9 March 2025 | Developer: lifetime speedup is permanent X2 and removes the ad reminders. |
| 23 October 2025 (2.3.0) | Three new maps and five add-ons. Map names are not in the note. |
| 21 December 2025 (2.4.0) | Ancient China add-on and fixes. No change to the loop, modes, or map rules is stated. |
| 2 May 2026 | A player who owns the sandbox purchase still has construction slots, including a two-slot warning, after resetting a map. |

Options the current game supports, as sourced:

- Free timed construction, or paid Sandbox Mode with instant construction and the same slot rules.
- Normal speed, a 10-minute double-speed ad, or permanent X2.
- Play the tutorial or skip it.
- Build across several maps, look at all of them from Skyview, clean one map, or erase the account.
- Look at a map in the ordinary 3D view, satellite view, street view, or science view.

No source gives a stage list, a chapter list, a population required to unlock the next map, or a count of maps in the live build. “Level” is used by players and by the shop’s unlock level. The level table is not published in these sources.

## 5. Contradictions

1. **Timers versus no timers.** Version 1.6.16 still has construction time and speedup time. The December 2024 tutorial still shows slots, a timed double-speed offer, and a separate sandbox offer. On 2 May 2026 the developer still explains slots to a player who bought sandbox. Google Play’s current about text says “No construction timers, no pay-to-skip” and “Build your city instantly.” Those cannot all be the default free loop. The sourced split is REQ-01-018 versus REQ-01-024.

2. **Sandbox as the whole game versus a purchase.** The feature bullets present “Sandbox Construction Mode” as what the game is. The Congo App Store also sells an in-app purchase named “Sandbox Mode” (USD 19.99 on that storefront when fetched). The tutorial calls it “a new Sandbox offer with version two,” separate from “almost the sandbox” via slots.

3. **Pay-to-skip.** Google Play says there is no pay-to-skip. The May 2026 player says a two-slot warning asks for supercash (they cite 1400 supercash for a slot). The developer’s reply does not mention supercash. He says the slots come from Citycon buildings. Whether supercash can bypass a missing slot is not settled.

4. **Menu navigation removed versus maps window still present.** The 2 November 2024 post says menu-based map navigation is gone and switching is done by zooming to skyview. The FAQ and support pages still tell the player to open “the maps window in the top left corner” to reset a map. Switching and resetting may be different controls. The sources do not say the window was removed.

5. **Skyview, Region View, and Sat-view.** The May 2024 post: Region View is explored from Skyview. The FAQ: zoom out twice to enter Sat-view. No sentence says these are one view or three views.

6. **“Interconnected” maps versus per-map scores.** Store copy says maps are integrated and interconnected. The bonus post says each map’s residence bonuses do not affect other maps. Nothing describes a shared road or a shared service.

7. **Storage versus inventory.** FAQ: buildings go “into your storage.” Developer: the map is wiped and buildings “are in your inventory,” and the shop puts a stored building “back into the inventory.” Same outcome (buildings are kept), two names, and the only recovery path described is the shop.

8. **Confirmation step.** Support’s map reset has three steps, ending in “Confirm the reset.” The archived FAQ shows two steps and stops at the bulldozer. Both say there is no undo.

9. **When the tutorial skip arrived.** A player described it on 18 May 2022. Patch notes present it as new on 23 October 2023.

10. **Speedup price and older ad removal.** In March 2025 a player said sandbox and lifetime speedup were about 25 and 10 USD after conversion. The developer answered the speedup’s effect and said he was surprised by the price. He did not state a USD price. In May 2022 a different player described a one-month ad removal around $0.99. That is not the lifetime X2 package.

11. **Account deletion.** The in-game full reset deletes account data, rewards, and purchases. Google Play’s data-safety form says “Data can’t be deleted.” Those are different speakers (the game’s own reset versus the Play data-safety label).

12. **SEO article versus the tutorial.** The 20 August 2025 “Common mistakes” article on the official site tells the player to use zones, roundabouts, one-way streets, land value, and citizen complaint pop-ups. The developer tutorial, FAQ, and store text do not describe those tools. That article is not a requirement.

13. **Steam “same gameplay” versus Steam’s own mode list.** The 19 February 2025 official post says Unlimited on Steam is the mobile gameplay on PC and Mac. The Steam page lists a map creator, a tycoon puzzle mode, and no purchases or ads, and it calls itself unlike the mobile game. Excluded from live requirements either way.

14. **Building-count slogans.** One store variant says “over 180” structures. Current Google Play and App Store text say “over 300.” That count is a buildings-slice fact, not a loop rule. It shows the store text moves.

## 6. Unknowns

- Whether any fail state exists: bankruptcy, an abandoned city, a game-over screen, or a population collapse that ends play. No source describes one. No source says, in those words, that the city cannot fail.
- The exact name “sandbox v2.” Not found. If it means something other than version 2.0 Sandbox Mode, it is unknown.
- Whether the free loop in the current build still has construction timers, or whether a later unannounced change made every player instant. Store marketing and the May 2026 developer reply disagree.
- Whether missing construction slots can be bypassed with supercash, and at what price.
- Catalog price of Sandbox Mode and of lifetime speedup outside the one Congo row (Sandbox Mode USD 19.99) and the player’s converted guesses.
- What the 10-minute and permanent X2 speeds actually accelerate: construction only, the day cycle, income, or the whole simulation.
- Map count in the live game. Only “more than one,” plus “3 new maps” in 2.3.0, is sourced. Names of those three maps are unknown.
- Whether Marble Lane and Parkwalk are maps, districts, or building sets. The 2.1.7 note lists them beside an add-on and does not define them.
- How a later map is unlocked: level, population, a purchase, a full previous map, or free from the start. Unknown.
- Whether roads, pedestrians, vehicles, services, power, water, jobs, or money cross from one map to another.
- Whether street view or satellite view can travel from one map into the next, or whether each view is trapped on the current map.
- Whether Sat-view, Skyview, and Region View are the same control.
- What a one-map reset does to roads, trees, terrain, coins, player level, city upgrades, mailbox tasks, and loyalty. Sources only say the map is cleaned and its buildings are kept.
- Whether the inventory bulldozer (remove one object) sends that object to storage or destroys it.
- Whether a dedicated storage screen exists in addition to the shop control.
- Whether roads and trees from a wiped map are stored. The FAQ says “all the buildings.”
- Whether the player can have two cities at once. Sources describe one account, many maps, and a full reset that makes a new player. A second city slot is not described.
- Tutorial contents, step by step, and which features are locked at the start.
- Achievement names, and any goal that is not “grow the city,” “do mailbox tasks,” “keep citizens happy,” or “climb Mayoral Match-Up.”
- Whether the Sunapie “PC and Mac” build is the Google Play Windows app, a native desktop build of the mobile rules, or a link toward the Steam product. Sunapie does not describe its loop.
- Day and night as a gameplay cycle. The 2026 under-construction homepage mentions sunset and lit windows. No source says the clock changes goals, services, or income.

## 7. Handoff

- **Slice 09 — ranking.** Mayoral Match-Up scoring, the four high-score categories from version 2.1.2, Game Center leaderboard rules, and any mayor-score formula. This slice only requires that the ranking exists and that the player can open their current rank.
- **Roads.** Road types beyond the one fact that a building snaps to a street and a muddy road does not connect it. Bulldozer category “streets.”
- **Services and coverage.** Electricity, water, food, waste, healthcare, police, fire, education, happiness, and the science-view influence list.
- **Economy.** Coins, supercash, offline-earnings amounts, city-upgrade effects, loyalty percent, culture, entertainment, recreation, wealth, diversity, workspaces, and the residence bonus math. This slice only keeps the daily login point and the fact that those bonuses are per map.
- **Construction shop.** Slot prices, including the player-stated 1400 supercash, and which buildings need how many slots. This slice only keeps that slots exist, start at one, come from Citycon buildings, and still apply under Sandbox Mode.
- **Buildings and add-ons.** The catalog, monthly add-ons, Zoo, Amsterdam, Paris, Ancient China, and whether Marble Lane and Parkwalk are content packs.
- **Mailbox tasks.** Task text, rewards, and the “mini challenges” rules.
- **Ads, other than speed.** Ad creative, a one-month ad removal, and any boost that is not the 10-minute or lifetime X2 session pace.
- **Street view.** Walking controls and the “jump on cars / scale buildings” behavior from the June 2023 post.
- **Camera.** Perspective versus orthographic, except the zoom that enters skyview, satellite view, or street view.
- **Achievements.** Names and unlock rules. Existence only is REQ-01-049.
- **Account and cloud, beyond the save.** iCloud setup steps, and the Play data-safety “data can’t be deleted” label versus the in-game reset.
