---
cursor:
  subagentId: "bc-eb289bf4-0534-550d-98ae-b5b80284494c"
---

# Slice 04 — Place, edit, move, rotate, demolish, rebuild, inventory

Player-facing requirements for the live Super Citycon city builder by Ben Willes Games / Sunapie (iOS, Android, and the Windows build listed on the same Google Play page). Not an engineering design.

Research date: 2026-10-23. Direct requests to `https://supercitycon.net/faq/` and `https://supercitycon.net/support/` returned 404. The live homepage said the site was under construction. FAQ and support quotes below are from Wayback copies. Store listings were fetched live.

## 1. Scope of this slice

This slice covers dragging a building out, street snap, road connection (including muddy roads), long-press orbit and the edit controls, rotate, move, confirm, bulldozer categories, what a wipe or a sale does with the building, storage versus inventory, placing again from storage, construction slots, and whether construction waits.

The claim that every building you see can be rebuilt is only partly supported. Official reset text keeps the buildings that were on that one map. It does not say trees, streets, or every visible object come back. Selling a building from inventory removes it forever. A full account reset deletes buildings and purchases. What a single bulldozer tap returns is not stated anywhere in the sources below.

The Steam page (app 3474890, Sunapie Games, listed Q4 2026, SCC Studio, Workshop) is a separate upcoming product. None of its modes are requirements for the live game. The Playkot game “SuperCity” and the subreddit r/SCBuildIt are different games and are not used here.

Google Play lists this app as available on Android and on Windows (“Powered by Intel”). The iOS app is the App Store listing below. A Mac build of this live game was not found. “Coming to Steam” videos on the official channel are the other product.

## 2. Sources used

Official and store:

- Basics tutorial, Super Citycon channel, “Super Citycon: The Basics – City Building Game How-To Tutorial,” https://www.youtube.com/watch?v=jYAD0SkDmY0 — auto-transcript. Narration calls the version-two Sandbox offer new, so this is the v2-era tutorial, not the 2022 game. No reliable upload timestamp was retrieved.
- Storage tutorial, same channel, “Super Citycon: Storage Feature – City Building Game How-To Tutorial,” https://www.youtube.com/watch?v=cSRDwHvowWI — auto-transcript. Channel listing, fetched 2026-10-23, showed it as about one year old (2:49).
- FAQ, Wayback 2026-06-18: https://web.archive.org/web/20260618144655/https://supercitycon.net/faq/
- Support, Wayback 2026-02-12: https://web.archive.org/web/20260212150806/https://supercitycon.net/support/
- Homepage, fetched 2026-10-23: https://supercitycon.net/
- Google Play, updated Dec 20, 2025: https://play.google.com/store/apps/details?id=com.benwilles.citybuilder&hl=en_US
- App Store, version 2.4.0 dated 12/21/2025, plus version history: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- Pocket Gamer, 4 Mar 2025: https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/

Developer and players on r/supercitycon (BenWilles is the developer account):

- Map wipe, 21 Jul 2025: https://www.reddit.com/r/supercitycon/comments/1m5kx9c/starting_over/
- Stored buildings back to inventory, 29 Jan 2025: https://www.reddit.com/r/supercitycon/comments/1icd7cb/how_can_i_access_the_storage_in_the_game/
- Remove a road, 10–16 May 2025: https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/
- Sandbox purchase, slots, power plants and the hospital, 2 May 2026: https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/

Older secondary descriptions (version 1.x, 2022). They disagree with the current store copy on wait time:

- Common Sense Media review of version 1.4.13, release 20 Aug 2022, review last updated 20 Sep 2022: https://www.commonsensemedia.org/app-reviews/super-citycon
- Mobile Gaming Hub, 16 Jun 2022: https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/

## 3. Requirements

### Inventory and drag-to-place

**REQ-04-001.** The player opens the inventory on the right side of the screen to build or to reach the bulldozer.

> “if you open the inventory on the right side uh you will find the bulldozer button”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-002.** Placing from inventory is also described as an up-arrow control, and in 2022 as an arrow button that opens bought buildings and cards.

> “When you click on the up arrow to place something from your inventory, there is a bulldozer icon.”
>
> https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/ (16 May 2025)

> “Commercial and residential buildings they buy are stored with booster-type cards and can be accessed by clicking on the arrow button.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon (version 1.4.13, 2022)

Whether the right-side inventory and the up arrow are the same control is not spelled out.

**REQ-04-003.** The player places a building by dragging it from the inventory onto the map.

> “building is very straightforward you drag it there”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-004.** A dragged building snaps to the streets by itself.

> “it automatically snaps to the streets”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

### Road connection

**REQ-04-005.** A muddy road does not give a building a road connection. The basics host places on a muddy road and calls that a bad spot for that reason.

> “the muddy roads won't give Road connection uh to this building”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-006.** In version 1.4.13, the player turns muddy road portions into paved road by tapping those portions.

> “they can change muddy roads to paved ones by tapping on portions of them.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon (version 1.4.13, 2022)

**REQ-04-007.** In that same 2022 review, some structures have to be connected to a street, and some may sit a few tiles from the nearest road.

> “Some structures need to be connected to a street, and some can have a few tiles' distance from the nearest road.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-04-008.** In that review, placing something too far from a road hurts performance, and the player can move the item to fix it.

> “If you place something too far away from a road, for instance, it can affect your performance, but you can just move the item to correct the issue.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-04-009.** A June 2022 guide says houses, commercial buildings, and facilities do not function unless they are connected to roads.

> “you also need to ensure that all the houses, commercial buildings, and facilities are well connected with the roads.”
>
> https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/ (16 Jun 2022)

**REQ-04-010.** In version 1.4.13, a three-road junction creates an intersection by itself.

> “intersections, for instance, are created when you make a three-road junction.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

How the player draws a new road, and which road types exist besides muddy and paved, are not in these sources. See Handoff.

### Long-press, orbit, rotate, move, confirm

**REQ-04-011.** A long tap on a building enters orbit mode.

> “to edit a building you long tap a building and you will get into orbit mode”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-012.** Orbit mode is not itself the edit menu. An edit button on the right side is what offers rotate, confirm, and move.

> “here you can top the edit button on the right side um this one will give you the options to rotate uh to confirm what you did … but you can also move it and put it somewhere else”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

The auto-transcript has an unclear word, “transel,” between confirm and move. That word is not treated as a control name.

**REQ-04-013.** From that edit control, the player can rotate the building.

> “the options to rotate”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-014.** From that edit control, the player can move the building and put it down somewhere else.

> “you can also move it and put it somewhere else like here and it will be put somewhere will be put here”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-015.** From that edit control, the player can confirm the edit.

> “to confirm what you did”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-016.** In version 1.4.13, tapping and briefly holding a building shows more information about it, including whether it is too far from something. That review does not call the gesture orbit mode or an edit menu.

> “Tapping and briefly holding your finger on a building will reveal additional information about it, including whether it's too far away from something.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

### Bulldozer categories

**REQ-04-017.** The inventory bulldozer has three categories. The categories that are on decide what a tap removes.

> “you can choose three categories which essentially uh tells which things get bulldozed when you tap them”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-018.** Trees are one of those categories. The host turns trees off so taps do not remove them.

> “so I will disable trees and streets”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-019.** Streets are one of those categories. The host turns streets off so taps do not remove them.

> “so I will disable trees and streets”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-020.** With trees and streets turned off, a tap demolishes the remaining objects. The host uses that to clear space and calls the result demolished. He does not say the third category’s on-screen name. No source names a fourth category.

> “I will disable trees and streets and I can go here and boom everything get it's demolished uh that's one way of destroying things”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-021.** A player removes a road by opening the inventory arrow, choosing the bulldozer, choosing the road icon, and deleting. That is the same inventory bulldozer, with the street/road category left on. The player says “road icon”; the tutorial says “streets.”

> “When you click on the up arrow to place something from your inventory, there is a bulldozer icon. Click that, then the road icon and delete away”
>
> https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/ (16 May 2025)

**REQ-04-022.** A June 2022 guide says the player clears trees with a removing button and then taps the trees. It does not describe three categories.

> “you will have to keep clicking on the removing button and tap all the trees again and again.”
>
> https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/

### Map reset, a different bulldozer

**REQ-04-023.** Resetting one map uses a bulldozer in the maps window, not the inventory category bulldozer. The player opens the maps window at the top left and uses the bulldozer on that map.

> “1. To reset a map open the maps window in the top left corner
> 2. Click the bulldozer button on the map you want to reset”
>
> https://web.archive.org/web/20260618144655/https://supercitycon.net/faq/

**REQ-04-024.** The 12 Feb 2026 support page adds a third step, “Confirm the reset.” The 18 Jun 2026 FAQ archive does not list that step.

> “2. Click the bulldozer button on the map you want to reset
> 3. Confirm the reset.”
>
> https://web.archive.org/web/20260212150806/https://supercitycon.net/support/

**REQ-04-025.** A map reset cannot be undone.

> “Keep in mind there is no undo for this operation!”
>
> https://web.archive.org/web/20260618144655/https://supercitycon.net/faq/

**REQ-04-026.** Official FAQ and support text say a single-map reset cleans that map and puts all the buildings that were on it into storage.

> “This option cleans one map and puts all the buildings you had on it into your storage.”
>
> https://web.archive.org/web/20260618144655/https://supercitycon.net/faq/ and the same sentence on https://web.archive.org/web/20260212150806/https://supercitycon.net/support/

**REQ-04-027.** On 21 Jul 2025 the developer answered a player who wanted a clean map while keeping the buildings in inventory. He said the map-menu bulldozer wipes the map and the buildings are in inventory. He did not say storage.

> “Yes, you can use the bulldozer button in the map menu and your map is wiped out and your buildings are in your inventory.”
>
> https://www.reddit.com/r/supercitycon/comments/1m5kx9c/starting_over/ (BenWilles, 21 Jul 2025)

The player had asked not to “individually get rid of every single building.” The answer covers only the map bulldozer. It does not say what one inventory-bulldozer tap returns.

### Storage, sell, and placing again

**REQ-04-028.** Storage is for buildings and cards the player still owns after they leave the inventory. The storage tutorial presents it as what you do when inventory is full.

> “you got the option to store cards buildings uh cards and buildings um in your storage which means they are out of your inventory but you still own them for latest use”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-029.** The player taps a building in the inventory. A blue button appears and opens a menu.

> “you tap a building in the inventory and you can see this blue button here uh appearing uh once you tap that button you get this menu”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-030.** If the player owns more than one of that building, the menu lets them choose how many to act on.

> “with that menu you can choose the amount of the building if you own multiple”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-031.** One menu action puts the chosen buildings in the Warehouse. The same tutorial calls that place storage.

> “you can put them to Warehouse”
>
> “now they are gone from the inventory”
>
> “buildings that you have in storage”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-032.** The other menu action sells them. A sold building is gone forever. The player receives some coins. No coin amount is stated.

> “or you can sell them if you sell them they are gone forever and you will get some coins”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-033.** In the shop, a building that is in storage shows a blue button instead of a price and a buy option.

> “you go to store and what you will find in store is that buildings that you have in storage now have this blue button instead of the price and the purchase option”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-034.** Tapping that shop button puts the stored building back into inventory. The developer said the same on 29 Jan 2025: the shop shows an option to put the building back into inventory instead of a buy button.

> “to bring them back from um from the storage into your inventory you go to the shop and you simply tap those blue button”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

> “Check out in the shop, you’ll find an option to put the building back into the inventory instead of a buy button for buildings that you got stored.”
>
> https://www.reddit.com/r/supercitycon/comments/1icd7cb/how_can_i_access_the_storage_in_the_game/ (BenWilles, 29 Jan 2025)

**REQ-04-035.** On a building card, the number at the top right is how many of that building are in inventory.

> “the one here in the in the top right of your of the card is um actually the amount of this building uh that you got in inventory”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-036.** On a building card, the tiny number at the top left is how many of that building are already built on the current map.

> “this super tiny number here in the top left corner is the amount of that building that is built already on your map”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

**REQ-04-037.** Placing a stored building again is two sourced steps: return it from the shop into inventory, then drag it from inventory onto the map. Neither video shows a drag straight out of storage.

> “to bring them back from um from the storage into your inventory you go to the shop and you simply tap those blue button”
>
> https://www.youtube.com/watch?v=cSRDwHvowWI

> “building is very straightforward you drag it there”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-038.** A full game and account reset is not a keep-and-rebuild. It deletes progress and purchases and cannot be undone. The player starts as a new player.

> “All your rewards and purchases will be deleted and cannot be recovered after a full game reset.”
>
> “this operation can not be undone! You will lose all your progress including all purchases you possibly did.”
>
> https://web.archive.org/web/20260618144655/https://supercitycon.net/faq/

### Construction slots, waits, and sandbox

These are not one rule. Slots are a capacity limit. Timers are a duration. Sources from 2022, the v2 tutorial, the current store text, and a May 2026 player-plus-developer thread do not say the same thing. Each statement below is only what that source says.

**REQ-04-039.** Construction slots are shown at the bottom left.

> “in the bottom left you see your construction slots”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-040.** The player starts with one construction slot.

> “in the beginning you will have only one”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-041.** Each Citycon building the player builds adds one more construction slot. The tutorial calls that slot permanent. The spoken form is “citycon building” / “the city building.” The developer’s later spelling is “Citycon buildings.”

> “for each cityon building that you buil … that's the city building for each one of those uh you will get another permanent construction slot”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-042.** More slots let the player have more than one construction at the same time.

> “so you can have uh multiple constructions um at once”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-043.** Some bigger buildings require two or more construction slots.

> “some bigger buildings uh require two or more construction slots”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-044.** On 2 May 2026, on Android, power plants and the hospital would not place. The warning said 2 slots were needed.

> “some buildings will not let me place them without spending supercash. (i.e. the power plants and the hospital.) A warning pops up saying 2 slots needed.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (lipsrednails, 2 May 2026)

**REQ-04-045.** The tutorial says extra slots also come from the shop, from collecting them over time, or from both. It does not say how long “over time” is.

> “you can get those from shop you can also collect them over time or a combination of both”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-046.** In that 2 May 2026 report, a +1 construction slot cost 1400 supercash. The player had already bought +1 slot several times. Another 1400 purchase still left the “2 slots needed” warning and a further supercash cost. This is one player’s report, not a store price list.

> “I've spent the supercash on +1 construction slot several times and I've just tried again to purchase another +1 constructions slot for 1400 supercash and it still will not let me place these buildings without the warning popping up at costing even more supercash.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/

**REQ-04-047.** After a map reset, the extra slots from Citycon buildings are not there until those buildings are placed again. The developer said that on 2 May 2026, answering the player who had already bought the sandbox product and extra slots. “Permanent” in the tutorial does not survive a reset while those buildings are unplaced.

> “It sounds like you possibly didn't place the Citycon buildings after you had reset the map. It's actually those buildings that give you the additional slots.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (BenWilles, 2 May 2026)

**REQ-04-048.** The Google Play listing updated 20 Dec 2025 says the free game builds instantly, with no construction timers and no pay-to-skip, and it names Sandbox Construction as that instant build.

> “Super Citycon is a free city building tycoon game where you build instantly. No construction timers, no pay-to-skip”
>
> “SANDBOX CONSTRUCTION: Build your city instantly — no waiting, no timers.”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder&hl=en_US

**REQ-04-049.** The App Store feature list says Sandbox Construction Mode builds instantly without delays, that resources are still required, and that there is no waiting for construction.

> “SANDBOX CONSTRUCTION MODE: Build instantly without delays. Resources are key, but there’s no waiting for construction!”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732

**REQ-04-050.** App Store version 2.0.18, dated 3 Dec 2024, lists Sandbox Mode as a feature of that update, along with a bonus economy, region view, a zoo add-on, and a camera mode. Those notes do not say it is a separate purchase, and they do not mention slots.

> “Super Citycon 2.0 is here with exciting new features: a new Bonus Economy, Region View, Sandbox Mode, Zoo Addon, Camera Mode, new languages, and much more!”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version history, 2.0.18, 12/03/2024)

**REQ-04-051.** The basics tutorial treats a full set of slots as “close to almost the sandbox,” and it treats Sandbox as a further version-two offer. It does not say the offer removes slots.

> “then you are close to to almost the sandbox I say almost the sandbox of course we also have a new Sandbox offer with version two”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-052.** On 2 May 2026 a player described a paid “Sandbox Constructions” product as zero construction time, with construction finished instantly. The developer’s reply did not argue with that description. He explained the slot warning.

> “I did spend the real money on that Sandbox Constructions DLC that is supposed to have zero construction time and constructions finished instantly.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (lipsrednails, 2 May 2026)

**REQ-04-053.** Pocket Gamer, 4 Mar 2025, describes Sandbox Construction Mode as instant building with no waiting, inside the free-to-play game with in-app purchases. It does not mention slots.

> “there's also the Sandbox Construction Mode where you can build your dream cities instantly - no waiting around required.”
>
> https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/

**REQ-04-054.** In the 20 Sep 2022 review of version 1.4.13, construction was not instant and was not a long wait. The wait was often a few seconds.

> “There's also no lengthy downtime while construction is being completed, as there is in some games -- the wait is often just a few seconds.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-04-055.** That 2022 review says the player drags reward cards that make construction faster for a period of time.

> “drag cards they receive as rewards, offering things like speedier construction for a certain time period.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-04-056.** A 16 Jun 2022 guide also says task reward cards can speed up construction. It does not give the duration.

> “you can get double the money you earn for the next one hour or speed up the construction process.”
>
> https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/

**REQ-04-057.** During the build section of the basics tutorial, an ad offer sets the whole game to double speed for 10 minutes. The host does not say this skips a construction timer.

> “watching that so the game will run on double speed uh for 10 minutes”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-04-058.** Some features are not available when the game starts. The basics host demonstrates building and editing on a city that already has those features. He does not name which edit tools are locked. He does say the slot count at the beginning is one.

> “some of the features um they do not they are not unlocked at the game start”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

## 4. Stages, options, and complexity this slice actually supports

Only what the sources above say.

- Start of a game, per the basics tutorial: one construction slot. Some unnamed features are still locked. Drag, snap, category bulldoze, and long-press edit are demonstrated, but not proven to be available on the first minute of a new city.
- Building Citycon buildings raises the slot count, one slot per such building, while they are placed. After a map reset the developer says those slots come back only when the Citycon buildings are placed again (2 May 2026).
- Bigger buildings need two or more slots. The only buildings named against a “2 slots needed” warning are power plants and the hospital (player, Android, 2 May 2026).
- Slots can also be bought or collected over time, per the tutorial. One reported shop price is 1400 supercash for +1 slot (2 May 2026). That purchase did not, by itself, let that player place the 2-slot buildings.
- Version 1.4.13 (2022): short construction waits, often a few seconds, plus cards that speed construction for a while; muddy roads paved by tapping; some buildings must touch a street and some may be a few tiles off; a short hold shows whether a building is too far from something.
- Version 2.0.18 (3 Dec 2024): Sandbox Mode is listed as a shipped feature. The tutorial calls a version-two Sandbox an offer and says slots only get the player “almost” there.
- Store text current with the Dec 2025 listings (Play update 20 Dec 2025, App Store 2.4.0 on 21 Dec 2025): instant build, no construction wait, and on the App Store resources still matter. Play also says no pay-to-skip.
- 2 May 2026, after those store listings: a paying player still hit a slot gate on power plants and the hospital, and the developer answered with Citycon buildings, not with “sandbox ignores slots.”

No source gives a stage list of which buildings may be rotated, moved, or rebuilt. No source says a building under construction has a scaffold, a bar, or a cancel. “Multiple constructions at once” is the only description of construction being in progress, and it is tied to slots.

## 5. Contradictions

1. Where a map reset puts buildings. FAQ and support: “into your storage.” Developer, 21 Jul 2025: “in your inventory.” Storage and inventory are different in the storage tutorial: warehouse/storage is outside inventory, and the shop button moves a building from storage back into inventory.

2. Whether the map bulldozer asks for a confirm. Support, 12 Feb 2026: yes, step 3, “Confirm the reset.” FAQ, 18 Jun 2026: the written steps stop at clicking the bulldozer. Both say there is no undo.

3. Street label. Tutorial: category “streets.” Player, May 2025: “road icon.”

4. How close a building must be to a road. Basics tutorial: drag-place snaps to the streets, and a muddy road gives no road connection. Common Sense, 2022: some structures must be on a street, some may be a few tiles away, and too far only hurts performance until you move it. Mobile Gaming Hub, 2022: houses, commercial buildings, and facilities do not function without a road connection.

5. What a long press does. Basics tutorial: long tap enters orbit mode, then a separate edit button for rotate, confirm, and move. Common Sense, 2022: a brief hold shows information, including “too far,” and does not mention orbit or rotate.

6. Construction duration. 2022 review: often a few seconds, plus speed-up cards. Dec 2025 store listings: no timers, build instantly, no pay-to-skip. May 2026 player: a paid Sandbox Constructions product is supposed to finish instantly. The basics tutorial never states a duration. It talks about slots and calls sandbox something beyond “almost the sandbox.”

7. What sandbox is. Play and Pocket Gamer present instant sandbox construction as part of the free game. The App Store feature blurb does too, and 2.0.18 lists Sandbox Mode without calling it a purchase. The tutorial calls it a “Sandbox offer.” The May 2026 player calls it a DLC they paid for. The developer’s reply does not say which of those is right.

8. Pay-to-skip versus paying for slots. Play says “no pay-to-skip.” The same May 2026 thread shows supercash prices to add slots, and a warning that still asked for more supercash when slots were short. Those can be a capacity purchase rather than a timer skip. The sources do not say which UI that warning is. They do show that “no wait” copy does not remove the slot gate.

9. “Permanent” slots. The tutorial says each Citycon building grants a permanent slot. The developer, 2 May 2026, says after a map reset you must place the Citycon buildings again to get those slots.

## 6. Unknowns

- What one inventory-bulldozer tap does with a building: inventory, storage, coins, or gone. Not stated. The map-reset rule must not be copied onto that tap.
- Whether bulldozed trees or streets return anything, or can be placed again from inventory.
- The on-screen name of the third bulldozer category. Any category added after the basics tutorial.
- Whether roads, trees, decorations, canals, or landmarks use orbit, rotate, and move. The edit demo is “a building.”
- Which edit tools are locked at the start. REQ-04-058 only says some features are locked.
- Whether every building type can be moved and rotated, or only some. No exception list exists, and no “all buildings” sentence exists either.
- Whether a rebuilt or replaced building keeps its level, upgrades, or residents. Building levels are named in older release notes and belong to another slice.
- Coin amount for a sale. Shop price of a slot besides the one 1400 supercash report. How “collect slots over time” works.
- Whether slots still exist in the build that matches the Dec 2025 “no timers” store text for a player who has not bought sandbox. The May 2026 thread is after that store text and still has slots, but it is one Android player who had bought the sandbox product.
- What an in-progress construction looks like, whether it can be moved or cancelled, and whether instant build still occupies a slot for any visible time.
- Whether 2022 speed-up construction cards still exist once the store text says there is no wait.
- The road tool: how a road is drawn, cost, snap, and types other than muddy versus paved. Amsterdam canals are named as a feature in App Store 2.1.4 (23 Feb 2025) and are not sourced as road connections.
- Whether the FAQ’s missing confirm step is an outdated page or a real UI difference from the support page.
- The second comment on the 21 Jul 2025 “Starting over” thread was not in the retrieved excerpt.
- A Mac build of the live game, as opposed to the separate Steam product.

## 7. Handoff

- Roads, terrain, and camera: drawing roads, road types, canals, street view, and camera modes. This slice only has snap, muddy versus paved, the 2022 distance and junction notes, and bulldozing streets. Orbit mode is the edit entry here, not the camera-mode feature.
- Stages and unlocks: which named features are locked at the start, and any stage rule for what may be built or rebuilt. This slice only has “some features are locked,” one starting slot, and Citycon buildings granting slots while placed.
- Building catalog: what a Citycon building is, and the power plant and hospital entries that needed 2 slots.
- Economy and shop: coin and supercash prices, the unstated sale refund, resource costs that still gate instant build (“Resources are key”), and the 1400 supercash slot report as a price rather than a place rule.
- Services and simulation: what a missing road connection does to power, water, and the other services beyond “no road connection” and the 2022 “will not function / hurts performance” lines.
- Collectibles and add-ons: cards stored next to buildings, 2022 construction speed cards, and add-on buildings. No source gives them a different edit rule.
- UI and tasks: mailbox tasks that ask the player to build, and the exact inventory panel, if the right-side inventory and the up arrow are not the same control.
- Gaps and version boundary: Steam app 3474890 stays out of the live requirements. The Dec 2025 store text and the 2 May 2026 slot thread are both live-game evidence and disagree. Do not fold the Steam sandbox into this one.
