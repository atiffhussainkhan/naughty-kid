---
cursor:
  subagentId: "bc-80d034ba-a1ea-57fb-8d31-f48007b6806b"
---

# Slice 05 — Economy, currencies, income, shop, ads, purchases

Player-facing requirements for the live Super Citycon city builder (Ben Willes Games / Sunapie) on iOS, Android, and the same app where a store says it also runs on Windows. This is a requirements record for a later replica. It is not an engineering design.

Steam app 3474890 (Sunapie Games, listed Q4 2026, SCC Studio, Workshop) is a separate upcoming product. It is named here only so it stays out of live requirements.

A price, pack amount, duration, or percentage is a requirement only when a source writes it. Placeholders such as `{[VAL]}`, `{[PERC]}`, `{[MONEYX1]}`, and `{[MISSING_COINS]}` are filled by the game. The number is UNKNOWN unless another source states it. A string cell can hold more than one form: text before `[i2p_One]` is the plural, the text after it is the singular, and `[i2p_Zero]` is the zero case. Those markers are not shown to the player.

The public site `https://supercitycon.net/` was under construction on 23 October 2026, and older article URLs returned 404. Quotes from those articles are from search-indexed or Wayback copies of the original URL. The localization workbook was downloaded from the Internet Archive capture of 19 January 2025. Its file path is dated March 2024 (`/wp-content/uploads/2024/03/`). Later videos and store notes can disagree with that workbook. Both are kept.

## 1. Scope of this slice

In scope:

- Coins, SuperCash, and any other currency a source names.
- How income is produced, and what the income screen shows.
- Building and upgrade costs when a source gives them. No cost is filled in from a building’s theme.
- Upkeep only where a source states it.
- The shop: add-ons unlocked by purchase, construction slots, and every other shop item a source lists.
- In-app purchases, including what a purchase permanently changes and what it changes only for a time.
- Ads, including the double-speed support popup, rewarded ads, and ad-removal or speedup purchases.

Out of scope except as a handoff: road drawing, service coverage maps, collectible-card rules beyond the premium spend, ranking categories, the building catalog, and the unreleased Steam product.

## 2. Sources used

| Source | What it contributes | Retrieved |
| --- | --- | --- |
| Localization workbook, English (United States) column. Archive: https://web.archive.org/web/20250119073812/https://supercitycon.net/wp-content/uploads/2024/03/I2Loc-Super-Citycon-Localization.xlsx | Currencies, shop items, pack contents, upgrade names, income and ad copy | 19 Jan 2025 capture of the March 2024 file |
| https://www.youtube.com/watch?v=jYAD0SkDmY0 — “Super Citycon: The Basics” | Coins, supercash, income entry, city upgrades, construction slots, support popup, shop add-ons | Indexed auto-caption. Timed captions could not be retrieved, so quotes have no timestamps. The caption cuts off at “add-on means you unlock it once you”. |
| https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 | Free app, ads, partial US purchase list, version notes | Live listing |
| https://apps.apple.com/be/app/super-citycon-build-a-city/id1607860732 | Partial Belgian prices | Search excerpt of the live listing |
| https://apps.apple.com/gb/app/super-citycon-build-a-city/id1607860732 | Partial UK prices | Search excerpt |
| https://apps.apple.com/ca/app/super-citycon-build-a-city/id1607860732 | Partial Canadian prices | Search excerpt |
| https://apps.apple.com/mr/app/super-citycon-build-a-city/id1607860732 | Partial Mauritania USD prices | Search excerpt |
| https://apps.apple.com/mz/app/super-citycon-build-a-city/id1607860732 | Partial Mozambique USD prices; the 59.99 line was truncated in the excerpt | Search excerpt |
| https://play.google.com/store/apps/details?id=com.benwilles.citybuilder&hl=en_US | Free, ads, in-app purchases, “no wait timers,” “balance your city budget,” Android and Windows | Live listing, updated 20 Dec 2025 |
| https://supercitycon.net/new-bonuses-for-residence-growth/ | Version 2.0 residence bonuses, by Ben, 4 Nov 2024 | Search index; live URL 404 |
| https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ | Economy rebalance announcement, by Ben, 20 May 2024 | Search index; live URL 404 |
| https://supercitycon.net/faq/ | Full reset deletes purchases | Search index; live URL 404 |
| https://supercitycon.net/super-citycon-amsterdam-add-on/ | Amsterdam pack contents | Search index; live URL 404 |
| https://supercitycon.net/category/add-ons/ | Zoo, Trailer Park, Monorail, Curaçao blurbs | Search index; live category URL 404 |
| Ben Willes, 7 Nov 2025, https://www.reddit.com/r/supercitycon/comments/1oqcbtx/how_to_earn_money/ | “Build more to earn more. Sometimes you have to wait or collect coins” | Search excerpt |
| Player on that thread, 9 Nov 2025 | Coins over cars | Search excerpt |
| Ben Willes, 9 Mar 2025, https://www.reddit.com/r/supercitycon/comments/1j7dt82/is_there_an_iap_for_disabling_the_ads/ | Lifetime speedup is always x2 and stops ad reminders | Search excerpt |
| Player on that thread | Sandbox mode and speedup lifetime are in the in-game store | Search excerpt |
| Ben Willes, 2 May 2026, https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ | Extra slots come from Citycon buildings | Search excerpt |
| Player on that thread | Sandbox purchase, “2 slots needed,” and a +1 slot at 1400 supercash | Search excerpt |
| BenWillesGames, 22 Jun 2023, https://www.reddit.com/r/supercitycon/comments/13md14k/did_u_guys_know_any_bonus_code/ | Bonus codes are posted on Discord and social media | Search excerpt |
| US App Store review by コーギーガール, 13 Sep 2023, and the developer reply | Coins and supercash; ads optional; age rating is the ads | Live listing |
| US App Store review by Hahdjhdjd, 17 Apr 2024, and the developer reply | Player report of vehicle supercash, Tapjoy, offline earnings, and ad rewards. The reply notes the feedback and does not confirm the amounts | Live listing |
| Developer reply, 27 May 2022, Belgian listing | Offline play was only being considered as a no-ads purchase | Search excerpt |
| https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/ | June 2022 third-party claim about a one-hour money powerup and a six-hour idle | Live page |
| https://supercitycon.net/common-mistakes-when-building-your-city-and-how-to-avoid-them/ | Site post that talks about maintenance, taxes, and several income sources. No rates | Search index; live URL 404 |

No source recovered a per-building coin price, an official supercash price for one construction slot, an upkeep rate, or the real-money price of a named in-game pack.

## 3. Requirements

### Currencies

**REQ-05-001.** The store sheet names Supercoins as the standard currency and says they are used to purchase buildings and upgrades.

Source: Store `Supercoins_Name` — “Supercoins.” `Supercoins_Desc_Body` — “Supercoins are the standard currency of Super Citycon. It can be used to purchase Buildings and upgrades.”

**REQ-05-002.** The same workbook also shows that currency as a coin sprite. An older label in the Cards sheet is the word “Coins.”

Source: Cards `Coins` — a coin sprite. `CoinsOLD` — “Coins.” `CoinLevelOLD` — “Coins.”

**REQ-05-003.** The developer and the basics tutorial call this currency coins. The developer tells the player to build more to earn more, and that the player sometimes has to wait or collect coins.

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — “mainly City upgrades can be purchased with coins.” Ben Willes, 7 Nov 2025 — “Build more to earn more. Sometimes you have to wait or collect coins.” https://www.reddit.com/r/supercitycon/comments/1oqcbtx/how_to_earn_money/

**REQ-05-004.** The premium currency is labeled SuperCash. The store description says it buys add-ons, maps, special buildings, and other premium options.

Source: Store `SuperCash_Name` — “Supercash.” `Bills` — “SuperCash.” `SuperCash_Desc_Body` — “Supercash is the premium currency of Super Citycon. It can be used to purchase Add-ons, maps, special buildings and for various other premium options.” Cards `Bills` — “SuperCash.” Basics video — “some with uh super cash.”

**REQ-05-005.** The localization key and the in-game icon sprite for that premium currency are still named Bills / bill. A 13 Sep 2023 review says supercash was renamed from bills. The developer reply on that review does not discuss the name.

Source: Cards key `Bills` and Store key `Bills` display “SuperCash.” Willy `Tutorial/Speed3` and `Tutorial/collectibles5` use `<sprite name="bill">`. US App Store review, 13 Sep 2023 — “You use coins and (renamed from bills) supercash to upgrade your city.”

**REQ-05-006.** Supercredits are a further currency. The store says they skip a rewarded ad and still grant that ad’s reward. The singular label is Supercredit.

Source: Store `SuperCredit_Name` — “Supercredits.” `SuperCreditSingular_Name` — “Supercredit.” `SuperCredit_Desc_Body` — “Supercredits can be used to skip rewarded ads, to get the reward without watching an ad.”

**REQ-05-007.** A purchase can add SuperCash, Supercoins, or Supercredits to the balance, and a separate purchase line adds a Supercredit amount every day the player logs in. The amounts are `{[VAL]}`.

Source: Willy `Special/Purchase_Supercash`, `Special/Purchase_Supercoin`, `Special/Purchase_Supercredit` — “{[VAL]} added to balance.” `Special/Purchase_SupercreditDaily` — “+{[VAL]} every day you log in.” Store `SuperCash_get`, `SuperCoins_get`, `SuperCredit_get`, `SuperCreditDaily_get`.

**REQ-05-008.** Map tokens are a shop currency-like item. One store line is “+ 3 Maps Tokes,” including that spelling. Another line unlocks a named map. Cards also has “Map Token” and “Free map!”

Source: Store `3MapToken` — “+ 3 Maps Tokes.” `UnlockMap` — “Unlock "{[VAL]}" map.” Cards `MapToken` — “Map Token.” `MapToken2` — “Free map!”

**REQ-05-009.** When the player is short of coins, the game says how many are missing, tells them to check the inventory for coin cards, and can offer “Pay with SuperCash instead?” The exchange rate is not in the string.

Source: UI `Scene/NotEnoughCoins_Header`, `Scene/NotEnoughCoins_CoinsMissing`, `Scene/NotEnoughCoins_PayWithBill`. `Dialogs/CoinsInventoryHeader` and `Dialogs/CoinsInventoryBody` — “Check out your inventory! You might find some coin cards!”

**REQ-05-010.** When the player is short of SuperCash, the game says how many are missing, including the lines “You have no SuperCash” and “1 SuperCash missing,” and asks “Would you like to buy some SuperCash now?”

Source: UI `Scene/NotEnoughBills_Header` — “Not enough SuperCash.” `Scene/NotEnoughBills_BillsMissing`. `Scene/NotEnoughBills_PurchaseBills`.

**REQ-05-011.** If the player has run out of money, one message sends them to inventory rewards and another sends them to mailbox rewards.

Source: Willy `Special/BankruptButInventory` — “Seems you ran out of money. Check your Inventory for money rewards you can reddem.” `Special/BankruptButReward` — “Check your Mailbox for money rewards to collect.”

### How income is produced

**REQ-05-012.** Coins appear over cars. A player tells others to zoom in and tap those cars. City upgrades exist for the car-coin bonus and for how many days pass before car coins respawn. The bonus percent and the day counts are placeholders.

Source: Player, 9 Nov 2025, same earn-money thread — “Zoom in and Tap cars. They have coins over them.” Upgrades `CarCoin_Reward_Head` — “Income from Car” plus the coin sprite. `CarCoin_Reward_Desc` — “Increase the car coin bonus from {[TOTALPERC]} to {[NEWPERC]}.” `CarCoin_Spawntime_Head` — “Faster Car coin Spawning.” `CarCoin_Spawntime_Desc` — “Reduces the coin respawn time from {[SPAWNTIME]} to {[SPAWNTIMENEW]} days.”

**REQ-05-013.** While a speedup is running, cars also spawn free SuperCash. The ad reminder offers free SuperCash from cars and a doubled car-coin reward together with x2 speed.

Source: Willy `Tutorial/Speed3` — “During that speed up time, cars will also spawn free” bill sprite. `Special/AdRemind` — “Get free SuperCash from cars, double the car coin reward, and speedup the game x2!”

**REQ-05-014.** Income is split in the upgrade list into residential income, commercial taxes, and industrial taxes. Each upgrade increases that income by `{[PERC]}`. The percents are not published in the table.

Source: Upgrades `Income_Residential_Head` — “Residential Income.” `Income_Commercial_Head` — “Commercial taxes.” `Income_Industrial_Head` — “Industrial taxes.” Each description begins “Increase … income by {[PERC]}.”

**REQ-05-015.** Idle income is its own upgrade, “Increase offline income by `{[PERC]}`.” A building named Bank of City “Increases offline income timespan.” The timespan is not given.

Source: Upgrades `Income_Offline_Head` — “Idle Income.” BuildDesc key `146.0` — “Increases offline income timespan,” and Buildings `Names/146` — “Bank of City.”

**REQ-05-016.** The Tax Office “Raises taxes.” No tax rate is written. The TV Station “Increases commercial and industrial income.” No percent is written on that building.

Source: Buildings `Names/82` — “Tax Office.” BuildDesc `82.0` — “Raises taxes.” Buildings `Names/157` — “TV Station.” BuildDesc `157.0` — “Increases commercial and industrial income.”

**REQ-05-017.** A broken street network reduces income until the gap is fixed. The tutorial does not say by how much.

Source: Tutorials `Tuto3-12b` — “If the road network is broken you will get an alert and your income will be reduced till you fixed it.”

**REQ-05-018.** Elementary, secondary, and university coverage each give residential buildings in the area an income bonus. A separate education-facility influence “has no effect on other buildings.”

Source: Willy `Influence/EduEle`, `Influence/EduSec`, `Influence/EduUni`, `Influence/EduBonus`.

**REQ-05-019.** Fire protection, healthcare, and security each give an income bonus to residential, commercial, and industrial buildings in the covered area.

Source: Willy `Influence/Fire`, `Influence/Health`, `Influence/Security`.

**REQ-05-020.** Separate marked areas give an income bonus to residential buildings, to commercial buildings, or to industrial buildings.

Source: Willy `Influence/ResIncBonus`, `Influence/ComIncBonus`, `Influence/InduIncBonus`. Tutorials `Tuto11-11b` and `Tuto11-12b` name the residential income bonus and bonuses for commercial and industrial buildings.

**REQ-05-021.** The balance is shared across maps, and income from all maps is added together. Tapping the coin balance changes its number format.

Source: Willy `DidUKnow/BalanceShared` — “Your balance is shared between all your maps. Your income from all maps accumulates.” `DidUKnow/CoinFormat` — “You can tap your coins balance to change the format.”

**REQ-05-022.** Coming back from being offline shows a welcome, how long the player was away, the offline income, and a take button for `{[MONEYX1]}`. One version of that panel also asks “Double up?” A second version states the earnings and does not ask.

Source: UI `Scene/OfflineEarning_Header` — “Welcome back!” `Scene/OfflineEarning_L1` — “You've been offline for.” `Scene/Info_OfflineEarning_L2` — “Your offline income is.” `Scene/OfflineEarning_Take` — “Take {[MONEYX1]}.” Willy `Special/OfflineEarnings` includes “Double up?” `Special/OfflineEarningsNoAds` states the earnings and has no double-up question.

**REQ-05-023.** An official site post says aggressive expansion can leave insufficient funds for maintenance and services, and that relying only on residential taxes or industrial production is fragile. It names shops, tourism buildings, zoos, and stadiums as further income sources. It gives no rates and no currency names.

Source: https://supercitycon.net/common-mistakes-when-building-your-city-and-how-to-avoid-them/ — “Insufficient funds for maintenance and services” and “Focusing only on residential taxes or industrial production.”

### Where income is shown

**REQ-05-024.** The government area includes an Income entry. The basics tutorial says that entry is about the player’s income and does not list the fields on it.

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — “income gives you yeah it's obvious about your income.”

**REQ-05-025.** The March 2024 government labels include Income, monthly income, coins collected, and Balance.

Source: Gov `Income` — “Income.” `MonthlyIncome` — “monthly income.” `Coins collected` — coin sprite plus “collected.” `Balance` — “Balance.”

**REQ-05-026.** The same government list includes City Upgrades. A top notice can say “City upgrade unlocked.” The basics tutorial says city upgrades are bought mainly with coins, and that after those are owned some upgrades cost supercash.

Source: Gov `Upgrades` — “City Upgrades.” Notifications `TopNotification/NewBoost` — “City upgrade unlocked.” Basics video — “mainly City upgrades can be purchased with coins once you got everything at some point you will find uh some with uh super cash.”

**REQ-05-027.** The upgrade list the player can buy, each with a `{[PERC]}` or other placeholder and no published number, is: Ad Reward Time; Income from car coins; Faster car-coin spawning; Faster constructions; Improve Elementary Education; Improve Secondary Education; Improve University; Non Renewable Energy Production; Green Energy Production; energy saving measures for all, commercial, industrial, residential, and services; smoke detector; Diet program; Farm Animals Upgrade; Industrial food upgrade; Farm Plants Upgrade; Food production; Healthcare capacity; Healthcare quality; Commercial taxes; Industrial taxes; Idle Income; Residential Income; Security; trash production for all, commercial, industrial, residential, and services; Trash removal; water consumption for all, commercial, farm, industrial, residential, and services; Water Production.

Source: Upgrades sheet, the `*_Head` strings for those keys. The basics video names the same areas in speech: “water consumption Water Production energy uh trash uh the value of coins the appearance of coins.” “Value of coins” and “appearance of coins” are the narrator’s words. The table’s matching rows are the car-coin bonus and the car-coin respawn time. No other “appearance” upgrade is in the table.

**REQ-05-028.** Opening a building’s upgrade shows the improvements and the upgrade price, and a second tap buys it. No upgrade price number is in the string table or the tutorial transcript.

Source: Tutorials `Tuto7-3` — “Here you can see the improvements and the upgrade price.” Willy `Tutorial/UpgradeBuilding2` — “Tap the upgrade button again to purchase the upgrade.”

**REQ-05-029.** A task can require the player to purchase a number of city upgrades, or to collect a number of coins. The numbers are `{[VAL]}`.

Source: Tasks `Task42Body` — “Purchase {[VAL]} city upgrades.” `Task22Body` and `Task40Body` — “Collect {[VAL]}” coin sprite.

### Residence-growth economy in version 2.0

**REQ-05-030.** Version 2.0 replaces a hidden residence scaling of up to x10 with six bonuses that the post says can together scale residence amount up to x15. The post does not say these six bonuses multiply coin income.

Source: https://supercitycon.net/new-bonuses-for-residence-growth/ — “a hidden scaling mechanic that could boost your residence amount by up to x10” and “six new bonuses that together can scale up to x15.” App Store 2.0.18, 3 Dec 2024 — “a new Bonus Economy.”

**REQ-05-031.** Culture, entertainment, and recreation each use points. One point satisfies 1,000 residents. Fully meeting a category gives that category’s maximum bonus of 250%.

Source: same post — “Each point satisfies the need of 1,000 residents” and “the maximum bonus of 250% for each category.”

**REQ-05-032.** A single-count bonus building contributes only once per map, even if several copies are built. Its mark is the culture icon with an orange checkmark. A multi-count bonus building contributes every time it is built. Its mark is the culture icon with a blue plus.

Source: same post, the single-count and multi-count paragraphs.

**REQ-05-033.** Buildings that have wealth show one, two, or three dollar signs. Only those buildings count. The average wealth level of them on the current map is the map’s wealth level. Wealth level 3 is the maximum 250% bonus. The post does not state the bonus for level 1 or level 2.

Source: same post, “Wealth Bonus.”

**REQ-05-034.** Each unique building on the map gives one diversity point, and one point is a 1% bonus, up to 250%. Building more than eight of any single skyscraper-type building reduces the diversity bonus. The size of that penalty is not stated.

Source: same post, “Diversity Bonus.”

**REQ-05-035.** Each day the player logs in adds one Loyalty Point. Missing two consecutive days deducts Loyalty Points. The amount deducted is not stated. The cap is 250 points, and one point is a 1% bonus, so 250 points is a 250% bonus.

Source: same post, “Loyalty Bonus.”

**REQ-05-036.** All six bonuses are calculated separately on each map and do not change other maps.

Source: same post — “all these bonuses are calculated independently for each map.”

**REQ-05-037.** The May 2024 announcement says farm-building bonuses are capped. It does not state the cap. It also says the workspaces system becomes visible. Workspace rules are not in this slice.

Source: https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ — “Capped Farm Building Bonuses” and “Transparent Workspaces System.”

### Shop

**REQ-05-038.** A shop button opens the shop. Lesson 04 is titled “Shop” and is described as learning how to purchase buildings.

Source: Tutorials `Tuto4-1` — “Tap the shop button to open the shop.” `Tuto4_Title` — “Lesson 04: Shop.” `Tuto4-Description` — “Learn how to purchase buildings.”

**REQ-05-039.** The basics tutorial calls the shop the purchases overview and says it contains add-ons, and that an add-on means the player unlocks it once. The indexed caption ends in the middle of that sentence, at “you unlock it once you.”

Source: https://www.youtube.com/watch?v=jYAD0SkDmY0 — “that's the purchases overview … we got some add-ons uh add-on means you unlock it once you.”

**REQ-05-040.** In the March 2024 store strings, buying an add-on is labeled “Unlock” plus the pack name. Owned packs are grouped as “Add-ons you own.” After purchase the game says “{[VAL]} addon unlocked!” A building that still needs a pack says “You need to purchase the {[VAL]} extension to unlock this building,” or “Building locked, visit store.”

Source: Store keys beginning `Addon_` and `Owned` — “Add-ons you own.” Willy `Special/Purchase_Addon`. UI `Dialogs/LockExtensionNeed` and `Dialogs/LockByCode`.

**REQ-05-041.** The add-ons named in that store sheet, with the unlock line the player sees, are: Curaçao (“Unlock Curacao”), La Plaza (“Unlock La Plaza”), Marble Lane (“Unlock Marble Lane”), Monorail (“Unlock monorails”), Oriental Center (“Unlock Oriental Center”), Skyscraper Set 1 (“Unlock Skyscraper Set 1”), Trailerpark (“Unlock Trailerpark”), and Retro 1990 (“Unlock Retro 1990”).

Source: Store `Addon_Curacao`, `Addon_LaPlaza`, `Addon_MarbleLane`, `Addon_Monorail`, `Addon_OrientalCenter`, `Addon_Skyscraper01`, `Addon_Trailerpark`, `Addon_Retro1990`, and the matching `_Name` and `_Desc` cells. Curaçao’s description is “Dutch architecture meets colors.” La Plaza is “a spanish flavor” decoration set. Marble Lane is a “French inspired park decoration set.” Monorail “expand your transportation options” and “can be built on the same tiles as some decoration buildings” to connect residential buildings without streets. Oriental Center is “business and decoration buildings.” Skyscraper Set 1 is “the first super citycon skyscarper extension,” including that spelling. Trailerpark is “trailer park areas.” Retro 1990 is a “'90s-inspired cityscape.”

**REQ-05-042.** Add-ons named by later official posts or version notes, and not present in the March 2024 store sheet, are Amsterdam (24 Feb 2025 post: 14 canal-side buildings, two canal sizes, a plaza, and a cobblestone path), Zoo (6 Jan 2025 blurb: 12 animal habitats and decorations; also named in App Store 2.0.18), Paris (App Store 2.1.9, 10 Apr 2025: modular buildings, parks, and the Eiffel Tower), and Ancient China (App Store 2.4.0, 21 Dec 2025, and the Play “What’s new” of 20 Dec 2025). Their real-money prices are not in those sources. What each unlocks beyond the words just quoted is left to the add-on slice where that slice already has a fuller post.

Source: https://supercitycon.net/super-citycon-amsterdam-add-on/ — “14 Unique Amsterdam-Inspired Buildings,” “two different canal sizes,” “A Picturesque Plaza,” “Authentic Cobblestone Path,” and “Grab the Amsterdam Add-On now.” https://supercitycon.net/category/add-ons/ Zoo blurb. US App Store version history for Paris, Zoo, and Ancient China. https://play.google.com/store/apps/details?id=com.benwilles.citybuilder — “Build and grow your city with the Ancient China add-on.”

**REQ-05-043.** The store also shows the labels “Limited Offer,” “One time offer,” “Only Today,” “new,” “Available from Level `{[VAL]}`,” and bonus lines “20% Bonus,” “50% Bonus,” “80% Bonus,” and “100% Bonus.” What those percentages are added to is not written in the cell.

Source: Store `LimitedOffer`, `OneTimeOffer`, `OnlyToday`, `New`, `AvailableFromLevel`, `Bonus20`, `Bonus50`, `Bonus80`, `Bonus100`.

**REQ-05-044.** A new game shows one construction slot. Each Citycon building adds one permanent construction slot, which the shop describes as one additional construction team. The building named CityCon “Gives you an additional construction slot.” After a map reset, those extra slots are absent until the Citycon buildings are placed again.

Source: Basics video — “in the beginning you will have only one but for each cityon building that you buil … you will get another permanent construction slot.” Store `Citycon_desc` — “Each citycon building provides you with one additional construction team.” Buildings `Names/202` — “CityCon.” BuildDesc `202.0`. Willy `Special/Citycon` — “Each Citycon has an additional construction slot.” Ben Willes, 2 May 2026 — “It's actually those buildings that give you the additional slots.” https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/

**REQ-05-045.** Some buildings need two or more slots. If the player does not have enough, the game says “Construction teams busy!” with the slot count and asks “Outsource construction?” The singular line is used when one slot is needed. Power plants and the hospital are examples a player hit with “2 slots needed” in May 2026. The official slot prices are not in the string table.

Source: Basics video — “some bigger buildings uh require two or more construction slots.” UI `Scene/TooManyConstructions`. Player, 2 May 2026, same thread — “A warning pops up saying 2 slots needed” for “the power plants and the hospital.”

**REQ-05-046.** Extra slots are also sold in the shop and, in the basics tutorial, can be collected over time or gained both ways. Shop lines include “+ 1 construction slot,” a variable “+ `{[VAL]}` construction slots,” and “+ 1 free citycon.” Named packs add +1, +2, or +3 slots, as listed in REQ-05-055.

Source: Basics video — “you can get those from shop you can also collect them over time or a combination of both.” Store `ConstructionSlot_1`, `Citycon_get`, `FreeCitycon_1`.

**REQ-05-047.** On 2 May 2026 a player reported buying another +1 construction slot for 1400 supercash, and that the warning then still asked for more supercash. The developer’s reply does not confirm 1400. That figure is one player’s report, not a published price.

Source: same thread — “purchase another +1 constructions slot for 1400 supercash.”

**REQ-05-048.** The shop’s Sandbox text promises building and modifying “without the constraints of construction time,” with the lines “Zero construction time” and “Constructions finish instant.” Duration labels on that product are 8 Hours, 1 Month, 6 Month, and Lifetime. A line “Sandbox active for” means a purchased sandbox can still be on a timer. The purchase confirmation string is “Purchase Sandbox.”

Source: Store `SandboxDesc`, `SandboxZeroTime`, `SandboxFinishInstant`, `SandboxUnleash` — “Unleash Super Citycon!”, `Sandbox8Hours`, `Sandbox1Month`, `Sandbox6Month`, `SandboxLifetime`, `SandboxTimeLeft`. Willy `Special/Purchase_Sandbox` — “Purchase Sandbox.”

**REQ-05-049.** The Speedup Pack is described as: always speed up without watching ads; always double offline income without watching ads; constructions always finish in the background while offline; always get free supercash from cars. Shorter labels are “Offline constructions,” “Always Speedup,” and “collect free supercash.” After purchase: “Lifttime Speedup is now active,” including that spelling.

Source: Store `SpeedupPack`, `SpeedupPack_desc`, `Speedup_BackCon`, `Speedup_Life_Speedup`, `Sppedup_Life_FreeCarBills`. Willy `Special/PurchseSpeedup`.

**REQ-05-050.** No-ads is a shop duration, not only a forever switch. Labeled spans include 1 Month, 6 Month, and 12 Month. After a grant the game says “You got + `{[VAL]}` days of No-ads!” Settings can show “No ads till:”.

Source: Store `NoAds` — “No ads.” `NoAds_1_Month`, `NoAds_6_Month`, `NoAds_1_Year`. UI `Dialogs/GotNoAds` and `Scene/OptionsNoAdsTill`.

**REQ-05-051.** The Piggy Bank collects supercash while the player plays. The player can empty it at any time, which collects the contents and lets it grow again. When it is full it says “I'm full, empty me!” and a notice tells the player to go to the store and empty it before it bursts. Emptying thanks the player and says it can fill again. The English text does not say that emptying costs money, and it does not state a capacity.

Source: Store `PiggyBankDesc`, `PiggyBankFull`, `PiggyBankEmpty` — “Empty now.” Willy `Special/PiggyBankFull` and `Special/PiggyBankPurchase`. App Store 1.6.19, 16 Nov 2023 — “Play and earn with the brand new Piggy Bank!”

**REQ-05-052.** A free gift can be coins or supercash, and either dialog says to come back in 3 hours. The amount is `{[VAL]}`. The 23 Oct 2023 version notes call this a free gift every 3 hours.

Source: UI `Dialogs/GiftRewardsCoins` — “Here are {[VAL]} coins. Come back in 3 hours!” `Dialogs/GiftRewardsCash` — “Here are {[VAL]} supercash. Come back in 3 hours!” App Store 1.6.17 / 1.6.16 notes — “Get a free gift every 3 hours.”

**REQ-05-053.** Daily rewards tell the player to come back daily. The daily-reward tutorial says collecting them all yields gifts “with an value of over 30 bucks for free.” The workbook does not define “bucks,” so that unit is not converted here.

Source: Gov `DailyRewardsInfo` — “Come back daily to receive a free reward.” Willy `Tutorial/DailyReward3`. UI `Scene/OptionsWin_DailyReward` — “Daily reward.”

**REQ-05-054.** Settings includes a bonus-code field. A successful code says “Your bonus code has been successfully redeemed!” The developer account said on 22 Jun 2023 that bonus codes are posted on Discord and on social media. No official code table, and no official coin or supercash amount for a code, was found.

Source: UI `Scene/OptionsWin_BonusCode` — “Bonus code.” `Dialogs/RewardCouponBody`. BenWillesGames, 22 Jun 2023 — “You will find Bonuscodes on our Discord and there will be posted new ones soon on our social medias.” https://www.reddit.com/r/supercitycon/comments/13md14k/did_u_guys_know_any_bonus_code/

**REQ-05-055.** Three named shop packs state their contents in the March 2024 sheet. Real-money prices for these pack names were not found.

- Little Constructor Pack: +100 SuperCash, +10 million coins, +1 construction slot, +3 Month no ads.
- Baumeister Pack: +300 SuperCash, +50 million coins, +2 construction slots, +6 Month no ads.
- Super Citycon Pack: +600 SuperCash, +100 million coins, +3 construction slots, +1 Year no ads.

A fourth title, “Super Extension Pack,” is in the sheet without a contents cell next to it.

Source: Store `ReleasePack_3_*`, `ReleasePack_7_*`, `ReleasePack_10_*`, and `ExpansionPack_10_Title` — “Super Extension Pack.”

**REQ-05-056.** Bought buildings are added to the inventory. The game tells the player “You will find your purchases in your inventory.”

Source: Willy `Special/Purchase_Building` — “{[VAL]} added to inventory.” `Special/PurchaseInventory`. `Special/PurchaseThanks` — “Thank you for your support!” UI `Dialogs/PurchaseConfirm` — “Purchase?” and `Dialogs/PurchaseFailed` — “Purchase failed. Please try again.”

**REQ-05-057.** Higher-level buildings are visible in the shop in the early game, and the unlock level is shown in the details, as of the 23 Oct 2023 notes. The store string for that gate is “Available from Level `{[VAL]}`.”

Source: App Store 1.6.17 notes — “Higher level buildings are now visible in the shop even in the early game. Also, the unlock level is no longer hidden in the details.” Store `AvailableFromLevel`.

**REQ-05-058.** App Store 2.1.0, 29 Dec 2024, adds “Weekly rare buildings to make your city special.” The note does not say they are shop purchases, and it does not name them or price them.

Source: US App Store version history, 2.1.0.

### Ads and double speed

**REQ-05-059.** The game contains advertising. Google Play labels it “Contains ads” and “In-app purchases.” The US App Store says “Contains Advertising” and “In-App Purchases,” and the game is free.

Source: https://play.google.com/store/apps/details?id=com.benwilles.citybuilder&hl=en_US. https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732.

**REQ-05-060.** A support popup offers an ad that runs the game at double speed for 10 minutes. The first-ad dialog says the same thing about the speedup button: it plays an ad and then grants double game speed for 10 minutes. The speed tutorial repeats the 10-minute ad and says the remaining time is shown on the speedup button.

Source: Basics video — “this popup will ask you to support us um watching that so the game will run on double speed uh for 10 minutes.” UI `Dialogs/FirstAd`. Willy `Tutorial/Speed1` and `Tutorial/Speed2`.

**REQ-05-061.** Speedup x2 cards also raise game speed, for a time the card text calls “a specific time.” That card duration is not a number in the string. A task can require the player to use a speedup card, or to watch a number of ads.

Source: Willy `Tutorial/Speed0` — “Speedup x2 cards increase the game speed for a specific time.” Cards `Speed` — “Speed.” `SpeedVal` — “Speed x{[VAL]}.” Tasks `Task80Body` — “Use a Speedup Card.” `Task25Body` and `Task32Body` — “Watch {[VAL]} Ads.”

**REQ-05-062.** The speed tutorial says that while speedup time remains, constructions continue for that leftover time after the player leaves. A did-you-know line says constructions finish offline quickly if the player has the speedup upgrade or speedup time left. The 23 Oct 2023 notes say constructions progress in the background even without speedup time left, and announce a “non interrupting double up design.”

Source: Willy `Tutorial/Speed4` and `DidUKnow/ConstructionsFinish`. App Store 1.6.17 notes — “Constructions now progress in the background, even without speedup time left” and “New non interrupting double up design.”

**REQ-05-063.** A double-up dialog asks “Do you want to double your reward?” Rewarded ads can pay coins or supercash. Both result lines use `{[VAL]}`. If no ad is available, or the ad provider fails, the game says to try later. A separate line says the player has reached the maximum number of ads for today and should try tomorrow. That maximum is not stated.

Source: UI `Dialogs/DoubleUpHead` — “double up?” `Dialogs/DoubleUpBody`. `Dialogs/AdRewardsCoins`. `Dialogs/AdRewardsCash`. `Dialogs/AdsNotAvailable`. `Dialogs/ErrorAdShow`. Willy `Special/MaxAds`.

**REQ-05-064.** An upgrade named Ad Reward Time increases the ad reward time from `{[REWARDTIME]}` minutes to `{[REWARDTIMENEW]}` minutes. Those minute counts are not in the table.

Source: Upgrades `Ad_RewardTime_Head` and `Ad_RewardTime_Desc`.

**REQ-05-065.** The developer, on 9 Mar 2025, says the speedup lifetime package makes the game always run at x2 and that the ad reminders never come back. A player that day had already seen both “Sandbox mode” and “speedup life time” in the in-game store, and described them as about 25 and 10 USD after converting a regional price. Those two dollar figures are the player’s conversion, not a store listing. The developer answered that the pricing surprised them and asked which country.

Source: https://www.reddit.com/r/supercitycon/comments/1j7dt82/is_there_an_iap_for_disabling_the_ads/ — Ben Willes: “the speedup lifetime package is exactly for this. It makes the game always run at X2 speed and the add reminders will never come back again.”

**REQ-05-066.** Players who already owned no-ads when rewarded ads were expanded are told that their purchased benefits stay, and that they receive 3 free supercredits every day they play until that no-ads timespan ends.

Source: Willy `NoAdsOldInfo/2` through `NoAdsOldInfo/4` — “3 free supercredits every day you play super citycon till your no ads timespan ends” and “all your purchased benefits stay unchanged.”

**REQ-05-067.** The speedup tutorial says the permanent form of the ad benefits, without watching ads, is the Speedup package in the shop. That is the same product as REQ-05-049.

Source: Willy `Tutorial/Speed5` — “Get all of those benefits permanently without watching ads, by purchasing the Speedup package from the Shop.”

**REQ-05-068.** A 13 Sep 2023 review says ads are optional and that the game does not require purchases. The developer reply says the age rating is because of the content of the ads, not because of the game. A 17 Apr 2024 review says watching ads is a way to earn cash, that some ads felt like a 30-second video plus a 15-second end card, and that a reward sometimes did not arrive on the first try. The developer reply thanks the reviewer and does not confirm those timings or amounts.

Source: US App Store reviews of 13 Sep 2023 and 17 Apr 2024, and the developer responses on those reviews.

**REQ-05-069.** Tapjoy can grant a reward of `{[VAL]}`. The string does not say what `{[VAL]}` counts. The April 2024 review calls Tapjoy slow to deliver. The developer reply does not describe Tapjoy.

Source: UI `Dialogs/OfferwallReward` — “Congratulations! You earned {[VAL]} from Tapjoy!”

### Store prices and what a purchase changes

**REQ-05-070.** Apple’s public in-app lists are partial. Each listing below stops at “Learn More” or, for the UK excerpt, at a cut-off line, so none of them is a full catalog. Prices differ by storefront. Nothing here merges them into one price.

- United States, listing read for this pass: Special Offer $6.99, $9.99, $2.99, $7.99, and $3.99; Supercash M $9.99; Supercash L $19.99; Supercash S $5.99; 600 SuperCash $4.99; 300 SuperCash $2.99.
- Belgium: Supercash M 9,99 €; S 5,99 €; L 22,99 €; XL 34,99 €; XXL 59,99 €; 300 SuperCash 2,99 €; Sandbox Mode 19,99 €; Special Offer 7,99 €, 9,99 €, and 3,99 €.
- United Kingdom: Special Offer £6.99, £3.99, £2.99, £9.99, and £7.99; Supercash M £9.99; S £5.99; L £19.99; Sandbox Mode £17.99; 300 SuperCash £2.99.
- Canada: Supercash M $12.99; S $7.99; L $24.99; Sandbox Mode $24.99; 300 SuperCash $3.99; Special Offer $9.99, $3.99, $4.99, $12.99, and $9.99.
- Mauritania storefront, USD: Sandbox Mode $17.99; Supercash L $19.99; M $9.99; XL $34.99; S $5.99; XXL $59.99; Special Offer $1.99, $5.99, $8.99, and $3.99.
- Mozambique storefront, USD, excerpt truncated: Special Offer 3.99, 9.99, and 1.99; Sandbox Mode 17.99; Supercash L 19.99; M 9.99; XL 34.99; S 5.99; and a Supercash line whose name was cut off at 59.99.

Source: the App Store URLs in section 2. The US list is from the fetched listing. The other lists are from the search excerpts of those listings. Google Play’s fetched page says in-app purchases exist and does not list these prices.

**REQ-05-071.** The App Store product names “Sandbox Mode,” “300 SuperCash,” “600 SuperCash,” and “Supercash” S, M, L, XL, and XXL overlap words in the game, but the listings do not say which in-game pack a “Special Offer” or a lettered Supercash pack grants. Supercash S, M, L, XL, and XXL amounts are UNKNOWN. 300 and 600 are amounts the store itself prints on those two product names. They also appear inside Baumeister Pack and Super Citycon Pack. That is not enough to treat the store SKU and the in-game pack as the same product.

Source: REQ-05-070 listings and Store `ReleasePack_7_Bills` “+ 300 SuperCash,” `ReleasePack_10_Bills` “+ 600 SuperCash.”

**REQ-05-072.** A full account reset permanently deletes progress and purchases, and the game says they cannot be restored. The FAQ says the same, including rewards.

Source: UI `Dialogs/Reset1Body` — “All your progress and purchases will be permanently deleted and cannot be restored.” https://supercitycon.net/faq/ — “All your rewards and purchases will be deleted and cannot be recovered after a full game reset.”

**REQ-05-073.** What a purchase changes, from the strings that say so:

- An add-on stays unlocked and moves to “Add-ons you own.”
- A map unlock stays unlocked.
- SuperCash, Supercoins, and Supercredits are added to the balance. A daily Supercredit grant continues on later logins for the amount purchased. The amount is `{[VAL]}`.
- Lifetime Speedup stays on, with the effects in REQ-05-049. The developer adds that ad reminders do not return.
- Sandbox removes construction time for the span that was bought, which can be 8 hours, 1 month, 6 months, or lifetime.
- No-ads lasts for the granted days, which the sheet offers as 1, 3, 6, or 12 months depending on the product, not automatically forever.
- Bought buildings go into the inventory.
- None of these purchases, in the sources above, removes the need for construction slots.

Source: the purchase strings cited on REQ-05-007, REQ-05-040, REQ-05-044, REQ-05-048, REQ-05-049, REQ-05-050, REQ-05-055, and REQ-05-065. The May 2026 player still needed slots after buying sandbox, and the developer pointed them at Citycon buildings rather than at the purchase.

**REQ-05-074.** On the first launch of the supercash rebalance, existing players are told their supercash credit was multiplied by 3. The App Store notes for 1.6.19 and 1.6.18, 7–16 Nov 2023, say the same. That message is a one-time balance change for players who already had a balance. It is not a starter grant written for a new player.

Source: Willy `Special/SupercashRebalance` — “Your credit has been multiplied by 3.” US App Store version history, 1.6.19.

## 4. Stages, options, and complexity this slice actually supports

The March 2024 workbook is one shop. Later notes add to it. In order:

- By the workbook: coins (also named Supercoins), SuperCash (key still Bills), Supercredits, and map tokens. Income splits into residential, commercial taxes, industrial taxes, idle income, and car coins. Service coverage and area bonuses add further income bonuses. The shop sells the eight add-ons in REQ-05-041, construction slots, a free Citycon, timed and lifetime sandbox, a speedup pack, timed no-ads, three contents-listed packs, a piggy bank, and bonus-percent labels.
- 27 May 2022 developer reply: offline play was not a feature. It was only being considered as something a no-ads purchase might someday include. That reply is not a shipped purchase.
- 16 Jun 2022, Mobile Gaming Hub, not the developer: task cards that double money for one hour or speed construction, an ad that fast-forwards the day, and idle earnings if the game is left for at least six hours. See section 5.
- 22 Jun 2023: bonus codes exist and are distributed off-store.
- 13 Sep 2023 review: supercash had been called bills. The workbook still uses that key.
- 23 Oct 2023, versions 1.6.16 / 1.6.17: background construction even with no speedup time left, a non-interrupting double-up, shop shows locked higher-level buildings and their unlock level, new rewards for free players, a free gift every 3 hours.
- 7–16 Nov 2023, versions 1.6.18 / 1.6.19: Piggy Bank, and existing supercash multiplied by 3 once.
- 20 May 2024 announcement and 4 Nov 2024 post, shipped as the Bonus Economy in 2.0.18 (3 Dec 2024): the six residence bonuses, a farm-bonus cap with no published number, and Sandbox Mode named in the version notes.
- 29 Dec 2024, 2.1.0: weekly rare buildings, unnamed and unpriced.
- 2025 add-ons named after the workbook: Amsterdam, Zoo was also in the 2.0 notes, Paris, then Ancient China in December 2025.
- 9 Mar 2025: the developer treats lifetime speedup as the way to stop ad reminders and stay at x2.
- 2 May 2026: buying sandbox still leaves construction slots in place. One player paid 1400 supercash for a slot that day.

Google Play, updated 20 Dec 2025, also offers the same Android package on Windows. No separate Windows price list was found.

## 5. Contradictions

1. **Name of the standard currency.** The store sheet says Supercoins. The Cards sheet’s older label, the basics tutorial, the developer’s 2025 reply, and the gift dialog say coins. REQ-05-001 and REQ-05-003 both stand.
2. **Name of the premium currency.** Player-facing text says SuperCash. The key and the sprite are still bill. A 2023 review says it was renamed from bills. REQ-05-004 and REQ-05-005.
3. **Instant building for everyone, or only after a purchase.** Google Play’s current description: “No construction timers, no pay-to-skip” and “Build your city instantly — no waiting, no timers.” The US App Store feature text: “Build instantly without delays. Resources are key, but there’s no waiting for construction!” The March 2024 shop instead sells Sandbox as the mode that removes construction time, and sells speedup and slot outsourcing separately. The May 2026 player bought sandbox specifically to finish construction instantly and still faced slot warnings. REQ-05-048, REQ-05-045, and the Play description are all sourced.
4. **How long construction continues offline.** The speed tutorial limits it to leftover speedup time. The did-you-know line requires the speedup upgrade or leftover time. The Speedup Pack says constructions always finish in the background while offline. The Oct 2023 notes say they progress even with no speedup time left. REQ-05-049 and REQ-05-062.
5. **What “double” means.** The official popup, the first-ad dialog, and the speed tutorial: double game speed for 10 minutes, with an upgrade that changes those minutes. The ad reminder also doubles the car-coin reward. The June 2022 Mobile Gaming Hub article says a task reward doubles money for one hour, and that an ad fast-forwards the day, with idle earnings after six hours. That article is earlier and is not the developer. REQ-05-060 against https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/
6. **What cars drop.** A player in Nov 2025: coins over cars. The speed tutorial and the ad reminder: free SuperCash from cars during speedup, and a doubled coin reward. An April 2024 review also says tapping vehicles yields supercash and wishes they still carried the normal currency. REQ-05-012 and REQ-05-013.
7. **Whether lifetime speedup removes ads or only reminders.** The developer says the game stays at x2 and “the add reminders will never come back.” The Speedup Pack text says the player no longer watches ads for speedup, offline double income, or car supercash. The no-ads products are separate timed items. REQ-05-049, REQ-05-050, and REQ-05-065.
8. **Sandbox length.** Store labels include 8 hours, 1 month, 6 months, and lifetime, plus “Sandbox active for.” Store marketing speaks as if instant building is simply how the game works. REQ-05-048 and contradiction 3.
9. **Residence bonus math.** Each of six bonuses can reach 250%, and the same post says they together scale residence up to x15, replacing an old hidden x10. The post never says whether the six 250% figures add, multiply, or combine some other way. REQ-05-030 through REQ-05-035. The formula is UNKNOWN.
10. **Taxes and maintenance.** The upgrade list and the Tax Office use the word taxes, with no rate. The site’s common-mistakes post talks about maintenance costs and residential taxes or industrial production as income sources, also with no rate. The string table has no upkeep line. REQ-05-014, REQ-05-016, and REQ-05-023.
11. **“Value of coins” and “appearance of coins.”** The basics narrator lists those as city upgrades. The table’s car-coin rows are the closest match. No row is titled appearance. REQ-05-027.
12. **1400 supercash.** One player reported that price for +1 slot. The developer did not confirm it. The string table has the slot product and no price. REQ-05-047.

## 6. Unknowns

- Every `{[VAL]}`, `{[PERC]}`, `{[MONEYX1]}`, day count, and minute count left as a placeholder. That includes building prices, upgrade prices, gift amounts, ad payouts, Tapjoy’s unit, car-coin percents, income percents, and the ad-reward minute counts.
- The official supercash price of a construction slot, and whether 1400 was only that player’s price on 2 May 2026.
- Real-money prices and granted amounts for Supercash S, M, L, XL, and XXL, and the contents of every “Special Offer.”
- Whether Little Constructor Pack, Baumeister Pack, Super Citycon Pack, or Super Extension Pack are still sold, and what the extension pack contains.
- What the 20%, 50%, 80%, and 100% store bonuses apply to.
- Piggy Bank capacity, what “empty” costs if it costs anything, and the rate at which it fills.
- How the six 250% residence bonuses combine into “up to x15,” the wealth bonus below level 3, the diversity penalty for a ninth copy of one skyscraper, how many Loyalty Points two missed days remove, and the farm-bonus cap.
- Whether culture, entertainment, recreation, wealth, diversity, or loyalty change coin income, or only the residence count the 4 Nov 2024 post describes.
- The fields on the income screen beyond the labels Income, monthly income, coins collected, and Balance. The basics narrator does not list them.
- An upkeep or maintenance rate. The common-mistakes post asserts the pressure and does not quantify it.
- How many coins or how much supercash a bonus code pays. A player on the 2023 thread claimed a code “for 50 million of coin.” That is not an official amount and is not a requirement.
- What “30 bucks” in the daily-reward tutorial counts.
- The weekly rare buildings: names, prices, and whether they are shop items.
- Per-building coin or supercash costs. None were in the workbook.
- Whether emptying the piggy bank, buying sandbox, or buying speedup is the App Store row called Special Offer.
- A Windows or Mac price list for the live game. Play says the Android package is available on Windows. It does not list purchases there.
- The rest of the basics-video shop sentence after “unlock it once you.”

## 7. Handoff

- Slice 01 (modes and maps): sandbox as a mode versus a purchase, map unlock, and per-map bonus scope. The purchase effects are here.
- Slice 04 / slice 08 (place, edit, UI): shop button placement, the construction-slot indicator at the bottom left, the outsource dialog as a control, and selling or recycling buildings. Recycler return of 50% is an inventory string, not restated here.
- Slice 08: government layout, demand bars, mailbox tasks, and the lesson list. Income labels and upgrade names that change the economy are here.
- Slice 09 (collectibles, ranking, add-on catalogs): card rules, chests, and the fuller contents of Amsterdam, Zoo, Paris, Ancient China, and the 2023 add-on posts. This slice keeps the unlock-once shop behavior, the March 2024 unlock lines, and the fact that collectible pieces can be bought with the bill sprite.
- Services slice: coverage maps, capacities, and the workspace display. This slice keeps only the income-bonus sentences those services show.
- Tasks slice: “purchase city upgrades,” “watch ads,” and “collect coins” as task types. The economy effect is here.
- Account and cloud: iCloud save sync is in the FAQ and is not an economy rule, except that a full reset deletes purchases (REQ-05-072).
- Steam app 3474890 stays out of these requirements.
