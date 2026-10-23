---
cursor:
  subagentId: "bc-fee2fe81-4281-55fb-ba48-04b29885601a"
---

# Slice 02 — Stages, city upgrades, unlocks, complexity

Player-facing requirements for the live Super Citycon city builder (Ben Willes Games / Sunapie) on iOS, Android, and the PC/Mac build of that same game. This is a requirements record for a later replica. It is not an engineering design.

The live game has no formal named stage ladder. “Village,” “town,” “farm,” “metropolis,” and “skyline” in store and homepage copy are size descriptions. They are not stages with their own build sets. This document records the gates sources actually describe, and for each gate it says what the player can build, what they can rebuild or edit, and which options appear. Where a source is silent, the cell is UNKNOWN. Nothing below invents a stage, a building, a cost, or an unlock level.

Steam app 3474890 (Sunapie Games, listed Q4 2026, SCC Studio, Workshop) is a different, unreleased product. It is named only so it stays out of these requirements.

Slice 01 already records the session, Sandbox Mode as a purchase, and the existence of city upgrades, and it hands the upgrade list here. Slice 04 records the place, rotate, move, bulldoze, and slot controls, and it hands the stage rule for what may be built or rebuilt here. This file is that rule. Gesture steps are not repeated.

## 1. Scope of this slice

In scope:

- Whether the game has named stages, and the progression gates sources do describe.
- For each such gate: what the player can build, what they can rebuild or edit, and which options appear only after that gate.
- Player level, building unlock levels, and building levels, kept as separate systems.
- Construction slots: starting count, slots from placed Citycon buildings, buildings that need more than one slot, shop slots versus slots collected over time.
- City upgrades: every category a source names, what a source says that upgrade changes, and any order a source gives.
- Complexity that changes what the player can grow into: the residence-based level, the 90% and 100% growth brakes, and the version 2 residence bonuses that raise residence amount.

Out of scope except as a handoff: the building catalog, road tools, service coverage math, add-on contents, chest and ranking rules, sandbox price, and the unreleased Steam product.

The live site https://supercitycon.net/ was an under-construction stub on 23 October 2026. The FAQ URL and the bonuses article URL returned 404 on that date. The bonuses article and the 2.0 balance post were read from the Internet Archive. Tutorial quotes are from indexed auto-captions. Those caption files had no usable timestamps.

## 2. Sources used

Official and store:

- UK App Store, same app id 1607860732, developer reply 15 June 2022: levels are resident count only, and version 1.4 would list residents per level. https://apps.apple.com/gb/app/super-citycon-build-a-city/id1607860732
- US App Store version history, including 1.6.17 (7 November 2023), 1.7.0 (31 December 2023), 1.7.1 (2 January 2024), and 2.0.18 (3 December 2024). https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- Google Play about text, updated 20 December 2025, “from a small village to a massive metropolis” and “Grow from farm to metropolis.” https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
- Current homepage stub, “From a seaside neighborhood to a downtown skyline.” https://supercitycon.net/
- Ben, 4 November 2024, six residence bonuses (Wayback; live URL 404 on 23 October 2026). https://supercitycon.net/new-bonuses-for-residence-growth/
- Ben, 2 November 2024, 2.0 balance post (Wayback 13 December 2024). https://supercitycon.net/balance-updates-in-2-0-for-ios-players/

Developer tutorials (channel “Super Citycon - City Building Game”; captions have no timestamps):

- The Basics. https://www.youtube.com/watch?v=jYAD0SkDmY0
- Economy Overview. https://www.youtube.com/watch?v=LmY_TpU1B5Y
- Income Bonuses. https://www.youtube.com/watch?v=OUYirEhc9c8
- Resident Bonuses. https://www.youtube.com/watch?v=CIb2IWyNPJw
- Energy Supply. https://www.youtube.com/watch?v=y5g7xPHzj0A
- Healthcare System. https://www.youtube.com/watch?v=4SlxOgZ67MU
- Waste Management. https://www.youtube.com/watch?v=HDjaWySDKOM
- Education System. https://www.youtube.com/watch?v=PifQ_7vj7Ao
- Food Supply System. https://www.youtube.com/watch?v=6wWZxnm_YLk
- Water Supply System. https://www.youtube.com/watch?v=yuLUP_ELk4I

Developer posts and replies:

- BenWillesGames, 2 June 2022, decoration buildings at level 16. https://www.reddit.com/r/supercitycon/comments/v35451/new_update_on_super_citycon_we_have_a_new/
- BenWillesGames, 23 April 2023 thread, acknowledged the city-regulations solution. https://www.reddit.com/r/supercitycon/comments/12wt6iq/purchase_city_upgrades/
- Ben Willes, 2 May 2026, Citycon buildings restore slots after a map reset. https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/

Player reports, used only for what the player saw on screen:

- Turbulent-Low-1458, 23 April 2023, the house-upgrade mission finished only after city regulations. Same thread as above.
- lipsrednails, 2 May 2026, Android, “2 slots needed,” power plants and the hospital, and a +1 slot at 1400 supercash. Same thread as above. The player later wrote that placing the Citycon buildings solved it.

Not used as requirements: the 20 August 2025 “Common mistakes” article on supercitycon.net (bylined orbidi1; zoning, land value, and style-based premium unlocks that the developer tutorials do not describe), and the June 2022 Mobile Gaming Hub guide’s claim that leveling unlocks “apartments, parks, etc.” The developer never names those buildings as the level reward. Shelve.ly’s “Unlock over 150 Buildings” and an older App Store blurb’s “over 180” are catalog counts from earlier copy, not stages. Current store text says over 300. The count belongs to the building catalog.

## 3. Requirements

### No named stages

**REQ-02-001.** The live game has no sourced stage names that change the build set. “Village,” “town,” “farm,” “metropolis,” and “skyline” describe how large a city can look. They are not a ladder.

> “Design your town from a small village to a massive metropolis”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
>
> “GROW FROM FARM TO METROPOLIS”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
>
> “From a seaside neighborhood to a downtown skyline.”
>
> https://supercitycon.net/

No tutorial, store note, or developer reply names a stage called Village, Town, City, or Metropolis, or lists what that stage can build.

### Player level

**REQ-02-002.** Player level is only the number of residents. The game does not use XP.

> “The levels are pretty straightforward, they are only about your amount of residents.”
>
> https://apps.apple.com/gb/app/super-citycon-build-a-city/id1607860732 (developer reply, 15 June 2022, to the review by myatheshiba dated 14 June 2022)
>
> “we don't have um XP points your level straight forward depends on your residence amount”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-003.** The player levels up by gaining residents. A higher level unlocks more buildings. The tutorial does not name those buildings.

> “to level up um you simply need more residence … once you reach more residents you will reach a higher level higher levels unlock more buildings and so on and so on”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-004.** From version 1.6.17, a building the player has not reached yet is still visible in the shop in the early game, and the shop shows the level that unlocks it. Before that note, the unlock level was hidden in the details.

> “Higher level buildings are now visible in the shop even in the early game. Also, the unlock level is no longer hidden in the details.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 1.6.17, 7 November 2023; the same sentences are on 1.6.16, 23 October 2023)

**REQ-02-005.** Version 1.4 was announced to add an in-game list of each level and how many residents that level requires. No public source copies that list. The resident count for any level is UNKNOWN.

> “The soon coming 1.4 version will include a list of the levels with the number of residents you need to get there.”
>
> https://apps.apple.com/gb/app/super-citycon-build-a-city/id1607860732 (developer reply, 15 June 2022)

**REQ-02-006.** Version 1.6.17 retuned level balance. Players who had already passed the new thresholds saw level popups on the first start of that version, and those popups included rewards. What the rewards were is not stated. The note does not say that every later level-up pays the same reward.

> “New level balancing for smoother progress”
>
> “Advanced players will see a lot of new level popups after the first start of this version - enjoy the rewards!”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 1.6.17)

**REQ-02-007.** A 2 June 2022 update added decoration buildings at level 16. The post does not name them. No later source says whether those buildings are still gated at level 16.

> “some new decoration buildings at Level 16”
>
> https://www.reddit.com/r/supercitycon/comments/v35451/new_update_on_super_citycon_we_have_a_new/ (BenWillesGames, 2 June 2022)

**REQ-02-008.** Reaching a level does not, in any source, change rotate, move, confirm, or the bulldozer. Those controls are not a level reward. Slice 04 specifies the controls. Whether they exist on the first minute of a new city is UNKNOWN, because the basics host shows them on a city that already has locked features open.

> “some of the features um they do not they are not unlocked at the game start”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

### City-size unlocks that are not levels

**REQ-02-009.** Nuclear power is locked until the city is big enough to unlock it. No source gives the resident count or the level. The same shop view shows onshore wind, offshore wind, coal, waste incineration, and solar without giving each one an unlock line. A missing line is not proof that those five are available at level 1.

> “nuclear power once you unlocked it when your city is big enough”
>
> https://www.youtube.com/watch?v=y5g7xPHzj0A

**REQ-02-010.** The hospital can be upgraded and has more than one level. What each hospital level changes is not stated.

> “the hospital is upgradeable uh has multiple levels”
>
> https://www.youtube.com/watch?v=4SlxOgZ67MU

**REQ-02-011.** The medical center is cheaper than the hospital and has a smaller area of effect. The developer says he thinks it unlocks earlier. That is not a confirmed unlock order.

> “this little Medical Center um yeah which is cheaper and I think it unlocks earlier but it also has a smaller area of effect”
>
> https://www.youtube.com/watch?v=4SlxOgZ67MU

### Construction slots

**REQ-02-012.** The construction-slot count is shown at the bottom left. At the beginning the player has one slot.

> “in the bottom left you see your construction slots um in the beginning you will have only one”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-013.** Each Citycon building the player places adds one permanent construction slot. The basics host points at that building in the city and again at a smaller Citycon building in the shop, and both times says it grants a slot. “Citycon building” and “the city building” are the same object in that tutorial. The developer’s later spelling is “Citycon buildings.”

> “for each cityon building that you buil … that's the city building for each one of those uh you will get another permanent construction slot”
>
> “the cityon building is a smaller one here … it gives you another construction slot”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-014.** Those added slots let the player have more than one construction at the same time, and they let the player place bigger buildings.

> “this will increase your constructions capabilities so you can have uh multiple constructions um at once and build bigger buildings”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-015.** Some bigger buildings require two or more construction slots. A building that needs more slots than the player has does not place.

> “some bigger buildings uh require two or more construction slots”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-016.** On 2 May 2026, on Android, power plants and the hospital would not place. The warning said 2 slots were needed. The warning also offered to spend more supercash. Which power plant, and whether every hospital always costs 2 slots, is not stated beyond that report.

> “some buildings will not let me place them without spending supercash. (i.e. the power plants and the hospital.) A warning pops up saying 2 slots needed.”
>
> “the warning popping up at costing even more supercash.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (lipsrednails, 2 May 2026)

**REQ-02-017.** After a map reset, the extra slots from Citycon buildings are absent until those buildings are placed again. Placing them cleared the 2-slot warning for that player. “Permanent” in the tutorial does not mean the slot remains while the Citycon building is unplaced.

> “you possibly didn't place the Citycon buildings after you had reset the map. It's actually those buildings that give you the additional slots.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (Ben Willes, 2 May 2026)
>
> “Yes! That solved it thank you!”
>
> same thread (lipsrednails)

**REQ-02-018.** Slots can also be bought in the shop, collected over time, or both. The developer calls a large slot count “almost the sandbox,” and he separates that from the paid version-2 sandbox offer. He does not say the collected object is a slot token rather than a Citycon building. How “over time” works is UNKNOWN.

> “you can get those from shop you can also collect them over time or a combination of both then you are close to to almost the sandbox … we also have a new Sandbox offer with version two”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-019.** A separate shop row for “+1 construction slot” exists in player reports. On 2 May 2026 one player was charged 1400 supercash for that row, had bought it several times already, and still saw “2 slots needed” until the Citycon buildings were placed. The developer did not confirm 1400. That price is one report, not a price table. Buying the +1 row did not stand in for unplaced Citycon buildings in that case.

> “I've spent the supercash on +1 construction slot several times and I've just tried again to purchase another +1 constructions slot for 1400 supercash”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/

**REQ-02-020.** The paid sandbox purchase does not remove the slot gate. What that purchase does to construction time is slice 01 (REQ-01-023 through REQ-01-025) and slice 04. This slice only requires that slots still block a building after the purchase.

> “It's actually those buildings that give you the additional slots.”
>
> https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ (Ben Willes, 2 May 2026, replying to a player who had already bought Sandbox Constructions and still saw “2 slots needed”)

### City upgrades

**REQ-02-021.** City upgrades are in the government area. At the start of a game the player already finds many of them. They are bought mainly with coins.

> “when you start you will find a lot of uh City upgrades uh mainly City upgrades can be purchased with coins”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-022.** After the player has obtained those coin upgrades (“once you got everything”), further city upgrades appear and cost supercash. No source lists the coin upgrades in order, or says which supercash upgrade appears first.

> “once you got everything at some point you will find uh some with uh super cash”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-023.** The developer names these upgrade subjects, and says there are more he does not list: water consumption, water production, energy, trash, the value of coins, and the appearance of coins. He does not give the numeric change for any of them. The government overview for electricity, water, food, waste, healthcare, police, fire, and education is a different screen. It is not this purchase list.

> “it's about uh don't know water consumption Water Production energy uh trash uh the value of coins the appearance of coins Etc”
>
> “overview for electricity for water for food Waste Management healthc care police uh fire and education”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-02-024.** City upgrades apply to the whole current region, not to one map only. Global income bonuses are mainly from city upgrades. The income tab splits bonuses into global (all maps in the region), map (all buildings on the current map), and local (an area around a building). Map bonuses and local bonuses are not the city-upgrade purchases. The developer names the airport as one map-bonus building and says he cannot list the rest.

> “Global bonuses are mainly from City upgrades so City upgrades are always uh region wide”
>
> “map bonuses are given from multiple buildings uh like like airport”
>
> https://www.youtube.com/watch?v=OUYirEhc9c8

**REQ-02-025.** No source says buying a city upgrade unlocks a building, changes rotate or move, or changes the bulldozer. The sourced effects are the subjects in REQ-02-023 and the region-wide income bonuses in REQ-02-024.

> The basics tutorial limits city upgrades to improving the city, with the subjects in REQ-02-023: “yeah it's generally to improve your city.” The income tutorial limits them to region-wide global bonuses: “Global bonuses are mainly from City upgrades.” Neither sentence adds a building or an edit tool.
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> https://www.youtube.com/watch?v=OUYirEhc9c8

### City regulations

**REQ-02-026.** One mission that the player could not finish by upgrading houses was finished by upgrading city regulations. The developer account replied that the player had figured it out. The mission image is not transcribed. What a city regulation changes, what it costs, and whether it is the same screen as city upgrades are UNKNOWN. Upgrading houses was not the action that cleared that mission.

> “I tried to upgrade all houses as much as I can but cannot finish this mission.”
>
> “Solved it in on my own! Had to upgrade the city regulations”
>
> https://www.reddit.com/r/supercitycon/comments/12wt6iq/purchase_city_upgrades/ (Turbulent-Low-1458, 23 April 2023)
>
> “I am glad you figured it out :) Sara”
>
> same thread (BenWillesGames)

### A building’s own level

**REQ-02-027.** The recycling station can be upgraded. The developer calls it a good choice once the city is a little more advanced. That sentence does not give an unlock level, and it does not say the station is hidden until then.

> “the recycling station … it's a little more expensive and it's upgradeable … a good choice once your city is a little bit more advanced”
>
> https://www.youtube.com/watch?v=HDjaWySDKOM

**REQ-02-028.** A school has its own level, separate from the player’s level. In the education tutorial, an elementary school already at level 5 serves 1,000,000 residents and connects residences in a 23 by 23 area. Other school levels are not described.

> “that's already level five you can see that here … at that level it's good for 1 million residents and uh it connects um residential buildings to the school system within an area of 23 by 23”
>
> https://www.youtube.com/watch?v=PifQ_7vj7Ao

**REQ-02-029.** Education is three tiers: elementary (“the first level of school system for the basic needs”), secondary, and university. Secondary and university use the same coverage idea, with a larger radius and more capacity, and the university radius is larger still. No source gives a player level or a resident count that unlocks the next tier. “First level” here is the tier’s job, not a proven sequence of unlocks.

> “the Elementary School uh the first uh level of school system for the basic needs”
>
> “the secondary schools and the university … they have a little bit bigger radius so you don't need that much of them and they have more capacity … the universities even further”
>
> https://www.youtube.com/watch?v=PifQ_7vj7Ao

**REQ-02-030.** As of the education tutorial, recorded while version 2.1.2 was live, a residence covered by education receives an income bonus, and education has no further effect. The developer said that might change later. Coverage rules are a services handoff. This requirement only stops education being treated as a later city stage.

> “I'm recording this when version 2.1.2 is live … when your buildings your residential buildings are covered by education you will receive an income bonus um but at this point education has no further effect uh that may change in the future”
>
> https://www.youtube.com/watch?v=PifQ_7vj7Ao

**REQ-02-031.** Versions 1.7.0 and 1.7.1 announce new building levels. They do not list the buildings or the levels.

> “New Buildings, New Building Levels”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (1.7.0, 31 December 2023, and 1.7.1, 2 January 2024)

**REQ-02-032.** The 2.0 balance post says the new population bonuses are shown on screen and reflect amenities, building upgrades, and layout. It names the six bonuses and does not define a building-upgrade ladder.

> “population bonuses will be displayed upfront, giving you better insight into how amenities, building upgrades, and strategic layouts influence growth. The new bonuses are Culture, Diversity, Entertainment, Loyalty, Recreation, and Wealth.”
>
> https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ (Ben, 2 November 2024; Wayback snapshot https://web.archive.org/web/20241213090031/https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ )

### Growth brakes

**REQ-02-033.** Usage at 90% or above slows the city’s growth. At 100% usage the city does not grow. The host applies that rule to the usage bars. He names residential demand, commercial workspaces, industrial workspaces, energy, water, food, and waste as the bars in that explanation. This gate does not add or remove a building from the shop. It stops growth until usage falls.

> “below 90% you are fine starting from 90% uh usage uh it will reduce the growth of your city uh once something is uh 100% usage your city will not grow anymore”
>
> https://www.youtube.com/watch?v=LmY_TpU1B5Y

**REQ-02-034.** Fields are the start of the food chain because animals consume plant food, and processed food consumes both plant and animal food. The food tutorial says “you need to start with building Fields.” That is a supply order on the current map. It is not a player-level stage, and it does not say fields are locked or unlocked by level.

> “you need to start with building Fields um because your animals will consume plant sourced food”
>
> https://www.youtube.com/watch?v=6wWZxnm_YLk

### Version 2 residence bonuses

These bonuses are how a map’s residence amount scales after version 2. Because player level is residence amount (REQ-02-002), they change how fast later building unlocks arrive. They are not a stage ladder. The 4 November 2024 post was written before the bonuses went live (“when they go live”). The resident-bonus tutorial describes them as already in version 2.

**REQ-02-035.** Version 2 replaces a hidden residence scaling of up to x10 with six bonuses that together can scale up to x15: culture, entertainment, recreation, wealth, diversity, and loyalty.

> “a hidden scaling mechanic that could boost your residence amount by up to x10 … six new bonuses that together can scale up to x15”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/ (Ben, 4 November 2024; live URL 404 on 23 October 2026; read from the Wayback snapshot of that URL)

**REQ-02-036.** Each of the six bonuses is calculated on the current map only. A bonus on one map does not change another map.

> “all these bonuses are calculated independently for each map … won’t impact other maps.”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/

**REQ-02-037.** Culture, entertainment, and recreation each pay their full 250% bonus when the map has at least one point in that category per 1,000 residents.

> “Each point satisfies the need of 1,000 residents … one point per 1,000 residents in each category. Meeting these needs fully results in receiving the maximum bonus of 250% for each category.”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/

**REQ-02-038.** A building marked with the orange check counts once per map, even if the player builds more than one. A building marked with the blue plus counts every time it is built. In the tutorial, the cinema carries the orange mark and has both culture and entertainment, so extra cinemas do not add those points again.

> “Single-Count Bonus Buildings … orange checkmark … Multi-Count Bonus Buildings … blue plus”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/
>
> “on the cinema you will find the orange symbol this one has culture and entertainment … the cinema will have effect only once on the map”
>
> https://www.youtube.com/watch?v=CIb2IWyNPJw

**REQ-02-039.** Wealth is shown as one, two, or three dollar signs. Only buildings that have a wealth value count. Their average is the map’s wealth level. Wealth level 3 is the 250% bonus. Buildings with no wealth value are ignored. In the tutorial’s demo, wealth 1.65 was a 129% bonus, and beach buildings on that map were wealth level 3. The formula that turns 1.65 into 129% is not stated.

> “one, two, or three dollar signs … The average wealth level of all such buildings on the map … A wealth level of 3 equates to the maximum 250% bonus.”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/
>
> “my current wealth level is 1.65 uh which translates to bonus in this case of 129% … if the wealth level would be three uh I would get the full uh 250% bonus”
>
> “the beach ones they have wells level three”
>
> https://www.youtube.com/watch?v=CIb2IWyNPJw

**REQ-02-040.** Diversity gives one point, worth a 1% bonus, for each unique building on the map, up to 250%. More than eight of one skyscraper type deducts diversity points. How many points are deducted is not stated.

> “Each unique building on your map provides one diversity point, which translates to a 1% bonus. This bonus can reach up to 250%”
>
> “if you build more than eight of any single skyscraper-type building, you’ll face a penalty”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/
>
> “once you have more than eight of a skyscraper of a type uh you will get uh … A diversity penalty … diversity point points will be deducted”
>
> https://www.youtube.com/watch?v=CIb2IWyNPJw

**REQ-02-041.** The 4 November 2024 post, still describing the bonuses as upcoming, says one login day gives one loyalty point, two missed days in a row deduct points, and 250 points equal a 250% bonus (one point is 1%). It does not say how many points two missed days remove.

> “Every day you log into the game, you’ll earn one Loyalty Point. If you miss two consecutive days, Loyalty Points will be deducted. You can collect up to 250 Loyalty Points, which will translate to a 250% bonus (one Loyalty Point equals 1% bonus).”
>
> https://supercitycon.net/new-bonuses-for-residence-growth/

**REQ-02-042.** The version 2 tutorial, describing the bonuses as already shipped, says the player can check the city twice a day, once in the morning and once in the evening, for one loyalty point each time. Each full 24 hours away removes one loyalty point. The same video says the six bonuses sum, and that the sum raises residence capacity and commercial and industrial workspaces by the same amount. This does not match REQ-02-041. Both statements stay. See contradictions.

> “twice a day once in the morning once in the evening … each time you do that you will get one loyalty Point … if you stay away from your city longer as 24 hours … you will lose one point uh per complete day”
>
> “all those bonuses sum up to your residence bonus”
>
> “your residential capacity will be increased … but also your Works spaces … commercial and Industrial … they scale at the same level”
>
> https://www.youtube.com/watch?v=CIb2IWyNPJw

**REQ-02-043.** The six bonuses do not, in either source, unlock a building by name, and they do not change rotate, move, or the bulldozer. Their sourced effect is the residence bonus, and in the tutorial also the matching workspace bonus.

> The post stops at residence amount: “maximize your residence amount.” The tutorial stops at capacity: “your residential capacity will be increased … but also your Works spaces.” Neither sentence adds a build menu or an edit tool.
>
> https://supercitycon.net/new-bonuses-for-residence-growth/
>
> https://www.youtube.com/watch?v=CIb2IWyNPJw

### Features locked at the start

**REQ-02-044.** Some features are not available when a new game starts. The basics tutorial uses an already built city for that reason. It does not name the locked features. Their build list, their edit list, and the options they add are UNKNOWN. The one starting slot in REQ-02-012 is the only start-of-game number that tutorial gives.

> “I will show you this on already existing City because some of the features um they do not they are not unlocked at the game start”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

## 4. Stages, options, and complexity this slice actually supports

There is no stage ladder. The gates below are the ones a source describes. “Build” means what that gate adds to what the player may place. “Rebuild or edit” means what that gate changes about rotate, move, confirm, upgrade-in-place, bulldoze, or placing a wiped building again. “Options” means controls or purchases that appear because of that gate. Slice 04 owns the gesture for rotate, move, and bulldoze; those gestures are not restated here. If a cell says UNKNOWN, no source fills it.

### Gate A — New game, before any level-up

- **Build:** UNKNOWN as a list. The player has one construction slot (REQ-02-012), so a building that needs two or more slots cannot be placed (REQ-02-015). The food tutorial’s “start with fields” is a supply order, not a level lock (REQ-02-034). No source names the starter building set.
- **Rebuild or edit:** UNKNOWN. Rotate, move, confirm, and the bulldozer are shown on a city that already has some features unlocked. REQ-02-008 and REQ-02-044 forbid treating that demo as the first minute of a new city.
- **Options:** Many city upgrades are already there and are bought with coins (REQ-02-021). Which other government buttons are locked is UNKNOWN (REQ-02-044).

### Gate B — Player level rises with residents

- **Build:** More buildings unlock (REQ-02-003). From 1.6.17 the shop shows the unlock level on buildings the player cannot place yet (REQ-02-004). The only level a source attaches to named content is level 16, and only as “decoration buildings,” unnamed, in a 2 June 2022 update (REQ-02-007). The resident count for each level was promised as an in-game list in version 1.4 and was never published (REQ-02-005).
- **Rebuild or edit:** No source changes rotate, move, confirm, or bulldoze at a level (REQ-02-008).
- **Options:** The 1.6.17 rebalance showed level popups with rewards to players who had already passed the new lines (REQ-02-006). Reward contents are UNKNOWN. A standing per-level reward after that patch is not stated.

### Gate C — City “big enough” for nuclear power

- **Build:** Nuclear power becomes available (REQ-02-009). Nothing else is tied to that sentence.
- **Rebuild or edit:** UNKNOWN. Not mentioned.
- **Options:** UNKNOWN. Not mentioned.

### Gate D — Hospital and medical center

- **Build:** Both exist. The developer thinks the medical center unlocks earlier (REQ-02-011). That order is not confirmed. The hospital can be upgraded through more than one level (REQ-02-010). What a hospital level changes is UNKNOWN.
- **Rebuild or edit:** Upgrading the hospital is the only edit this gate adds. Rotate and move are not mentioned.
- **Options:** UNKNOWN beyond the upgrade itself.

### Gate E — One slot, then more slots

- **Build:** With only the starting slot, buildings that need two or more slots do not place (REQ-02-015). Power plants and the hospital are the only buildings a player has tied to a “2 slots needed” warning (REQ-02-016). Placing a Citycon building adds one slot (REQ-02-013) and is how the player both runs more than one construction and places those bigger buildings (REQ-02-014). Whether the Citycon building itself spends a slot, and whether it has an unlock level, are UNKNOWN.
- **Rebuild or edit:** A map reset removes the Citycon slots until those buildings are placed again (REQ-02-017). Placing them again is the rebuild that restores the slots. The paid sandbox purchase does not skip this (REQ-02-020). No source says a rotate or a move spends a slot.
- **Options:** A shop +1 slot row, reported at 1400 supercash in one May 2026 account (REQ-02-019). Slots collected over time, mechanism UNKNOWN (REQ-02-018). When the player is short, the place warning can offer a further supercash spend (REQ-02-016). A large slot count is “almost the sandbox,” not the paid sandbox offer (REQ-02-018).

### Gate F — Coin city upgrades, then supercash city upgrades

- **Build:** No building unlock is sourced (REQ-02-025).
- **Rebuild or edit:** No edit-tool change is sourced (REQ-02-025).
- **Options:** At the start, many coin upgrades (REQ-02-021). After those are all obtained, supercash upgrades appear (REQ-02-022). Subjects a source names: water consumption, water production, energy, trash, coin value, coin appearance, plus unnamed others (REQ-02-023). They are region-wide and are the main source of global income bonuses (REQ-02-024). Order inside the coin set, every name, every cost, and every magnitude are UNKNOWN.

### Gate G — City regulations

- **Build:** UNKNOWN.
- **Rebuild or edit:** Upgrading houses did not clear one mission. Upgrading city regulations did (REQ-02-026). What the regulation upgrade changes is UNKNOWN.
- **Options:** A city-regulations upgrade exists, because that is what cleared the mission. Where it sits in the UI is UNKNOWN. It is not safe to treat it as the city-upgrade shop in Gate F.

### Gate H — A placed building’s own level

- **Build:** Does not unlock a new player level. The recycling station can be upgraded; calling it a choice for a “more advanced” city is advice, not a lock (REQ-02-027). Schools have levels; the only published point is elementary level 5, 1,000,000 residents, 23 by 23 (REQ-02-028).
- **Rebuild or edit:** The upgrade on that building is the edit. Versions 1.7.0 and 1.7.1 added “new building levels” without a list (REQ-02-031).
- **Options:** The upgrade control on those buildings. A full ladder is UNKNOWN.

### Gate I — Education tiers

- **Build:** Elementary, secondary, and university all exist in the tutorial (REQ-02-029). No source proves the player must unlock them in that order.
- **Rebuild or edit:** Schools can be leveled (Gate H). No tier changes rotate or bulldoze.
- **Options:** As of version 2.1.2, coverage pays an income bonus and education does nothing further (REQ-02-030). Bus stations, libraries, and the art museum are service tools, handed off. They are not a stage.

### Gate J — Usage at 90% and at 100%

- **Build:** The shop does not change (REQ-02-033).
- **Rebuild or edit:** No edit-tool change.
- **Options:** None named. Growth slows at 90% and stops at 100% until usage falls.

### Gate K — Version 2 residence bonuses

- **Build:** No named building unlock (REQ-02-043). Culture, entertainment, recreation, wealth, and diversity come from buildings the player places, with the orange-check and blue-plus marks (REQ-02-038) and wealth marks of one to three (REQ-02-039). Which building grants which points is UNKNOWN except the tutorial’s cinema and beach examples.
- **Rebuild or edit:** No edit-tool change (REQ-02-043).
- **Options:** Six per-map bonuses (REQ-02-035, REQ-02-036). Full culture, entertainment, or recreation coverage is 250% at one point per 1,000 residents (REQ-02-037). Diversity caps at 250% and penalizes more than eight of one skyscraper type (REQ-02-040). Loyalty’s earn and decay rule is disputed between the pre-release post and the shipped tutorial (REQ-02-041, REQ-02-042). The tutorial also scales commercial and industrial workspaces with the same bonus (REQ-02-042). Because level follows residents, a higher bonus reaches later building unlocks with fewer residential buildings. It does not add a stage.

### Gate L — Unnamed features that open after the start

- **Build:** UNKNOWN (REQ-02-044).
- **Rebuild or edit:** UNKNOWN (REQ-02-044).
- **Options:** UNKNOWN (REQ-02-044).

## 5. Contradictions

1. **Loyalty, two developer accounts of the shipped rule.** The 4 November 2024 post, written before release, says one point per login day, a deduction if the player misses two consecutive days, and a cap of 250 points equal to 250% (REQ-02-041). The version 2 tutorial says two check-ins a day, morning and evening, and a loss of one point per full 24 hours away (REQ-02-042). The tutorial is the later description of the live bonuses. The post is still a developer source. This file does not drop either one.

2. **How six bonuses become x15.** The post says the six together scale up to x15, and that each of culture, entertainment, recreation, and the other full bonuses reaches 250% (REQ-02-035, REQ-02-037, REQ-02-039, REQ-02-040). The tutorial says the six “sum up” (REQ-02-042). Six bonuses of 250% do not, by themselves, explain a cap of x15. No source shows the combination formula. Wealth 1.65 displaying as 129% (REQ-02-039) is also not explained.

3. **“Permanent” slots and a map reset.** The tutorial says each placed Citycon building grants a permanent slot (REQ-02-013). The developer, on 2 May 2026, says those slots are gone after a reset until the buildings are placed again (REQ-02-017). Both are kept: the slot lasts while the building stays placed, and it does not survive a reset in inventory.

4. **Shop +1 slot versus Citycon buildings.** The tutorial offers shop slots and slots collected over time (REQ-02-018). The May 2026 player bought +1 slots for supercash and still lacked the slots the Citycon buildings provide (REQ-02-019). The developer treated the Citycon buildings as the missing slots. The sources do not say the +1 purchase is temporary, capped, or wiped by a reset. They do say it did not replace unplaced Citycon buildings in that account.

5. **Instant build versus a slot gate.** Store text that says the whole game has no timers is already contradicted in slices 01 and 04. For this slice the point is narrower: even the player who had paid for instant construction still could not place a 2-slot building (REQ-02-020). A “no wait” sentence is not a “no slots” sentence.

6. **Third-party unlock lists.** Mobile Gaming Hub (June 2022) says leveling unlocks apartments and parks. No developer source says that. It is not a requirement. The orbidi1 “Common mistakes” page describes zoning and land value. Developer tutorials place buildings; they do not paint zones. That page is not a requirement.

7. **Catalog size is not a stage.** Shelve.ly says “over 150” buildings. An older App Store text says “over 180.” Current App Store and Google Play text say over 300. Those are marketing counts at different dates. They do not define stages.

## 6. Unknowns

- The resident count for every player level. Version 1.4 promised the list. No copy of it was found.
- Every building’s unlock level, other than “shown in the shop” after 1.6.17, the June 2022 level-16 decorations (names unknown), and nuclear power “when the city is big enough.”
- Whether the medical center really unlocks before the hospital.
- The starter build set. What the player can place on minute one, besides “one slot” and “many coin city upgrades.”
- Which features are locked at the start, and whether rotate, move, confirm, and the bulldozer are among them.
- Whether any level, slot count, or city upgrade changes rotate, move, or bulldoze. No source says one does.
- City-upgrade names, the order inside the coin set, which supercash upgrade appears first, every coin cost, every supercash cost, and the size of each change for water consumption, water production, energy, trash, coin value, and coin appearance.
- What “appearance of coins” changes on screen.
- What city regulations are, what they cost, and whether they share a screen with city upgrades.
- Hospital levels beyond “more than one,” and every school level besides the one elementary level-5 example.
- Whether elementary, secondary, and university unlock in that order.
- Which buildings need 2 slots, which need more than 2, and whether the May 2026 power plants and hospital still cost 2.
- Whether placing a Citycon building spends a slot, and whether that building has an unlock level.
- Whether a move or a rotate spends a slot.
- The official price of a +1 slot. 1400 supercash is one player report. Whether that price steps up. What “collect them over time” gives, and on what timer.
- Whether a finished building frees its slots. Slice 04 already flags this. It is still unknown here.
- How the six residence bonuses combine into the stated x15 cap. The diversity penalty’s size. Wealth bonus at levels other than the demo’s 1.65 = 129% and the stated level 3 = 250%. How many loyalty points “two missed days” remove in the pre-release post.
- Which buildings grant culture, entertainment, recreation, or wealth, beyond the cinema and the beach examples.
- The reward inside a 1.6.17 level popup.
- A water-building unlock order. The water tutorial shows a water tower, a small pump, a big pump, and a pipeline, and does not gate them.

## 7. Handoff

- Slice 01 (`docs/requirements/01-core-loop-modes-maps.md`): Sandbox Mode as a purchase, construction time, speedup, map switching, and one-map reset. This slice only keeps the slot gate that survives that purchase (REQ-02-020) and the slot loss on reset (REQ-02-017).
- Slice 04 (`docs/requirements/04-place-edit-rebuild-demolish.md`): drag-place, orbit, rotate, move, confirm, bulldozer categories, storage versus inventory, and the control-level restatement of slots. This slice owns what a level or a slot count allows the player to place.
- Slice 09 (`docs/requirements/09-collectibles-ranking-addons.md`): add-on packs, the building of the week, collectible cards, and Mayoral Match-Up. An owned add-on is a purchase unlock, not a level stage.
- Slice 10 (`docs/requirements/10-gaps-versions-source-log.md`): Steam app 3474890 stays out. The version boundary for “no timers” store text versus the May 2026 slot thread is already logged there.
- Buildings: the catalog behind each unlock level, the Citycon building’s footprint and price, and which power plant costs 2 slots.
- Services: healthcare, education, police, and fire coverage, including bus stations and the 23 by 23 example as a coverage rule rather than a stage.
- Economy: income-bonus math beyond “city upgrades are the main global bonus,” food-chain amounts, the silo change from 25% to 10% in the 2.0 balance post, workspace counts, and a confirmed slot price if one is ever published. REQ-02-019 keeps the 1400 report because it is the only sourced shop-slot price and it failed to replace Citycon buildings.
- Roads: muddy roads, pipelines, seawires, and harbors. None of them is a stage in the sources read here.
- Tasks: mailbox missions other than the one city-regulations mission in REQ-02-026.
