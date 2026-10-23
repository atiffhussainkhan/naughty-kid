---
cursor:
  subagentId: "bc-c19b3ef1-392f-5cc1-8162-bd601b6dfc42"
---

# Slice 08 — UI, controls, menus, mailbox, tasks, tutorials, settings

Player-facing requirements for the live Super Citycon city builder (Ben Willes Games / Sunapie) on iOS, Android, and the same app on PC through Google Play Games. Touch is the sourced interaction. A separate upcoming Steam product, Super Citycon Unlimited (app 3474890), is not this game. Its page and the 19 Feb 2025 post that promises desktop keyboard and mouse are kept out of these requirements.

String-table quotes are the English (United States) cell. The key name is cited so the cell can be found. Placeholders such as `{[VAL]}` are filled by the game; the number is UNKNOWN unless a source states it. The string table file path is dated March 2024 and the copy used here is the Internet Archive capture of 19 Jan 2025. Later store text and videos can disagree with it. Both are kept.

## 1. Scope of this slice

What the player does with a named control, and what the game shows next: map gestures, inventory, bulldozer, construction-slot indicator, camera and view changes, minimap and science view, government area and its entries (collectibles, high scores, income, city upgrades, service overview), mailbox (tasks, messages, tutorials), shop entry, popups, and the settings screen.

Simulation rules, prices, building stats, and region logistics are in this document only when a control’s own label states them. Deeper rules are handed off.

## 2. Sources used

- Official basics tutorial, transcript: https://www.youtube.com/watch?v=jYAD0SkDmY0 — timestamps were not recoverable from the transcript capture.
- Official healthcare tutorial, transcript: https://www.youtube.com/watch?v=4SlxOgZ67MU — published 6 Feb 2025, length 2:18. Timestamps were not recoverable.
- FAQ, archive of 18 Jun 2026 (same control answers as the 28 Feb 2024 capture): https://web.archive.org/web/20260618144655/https://supercitycon.net/faq/ — live https://supercitycon.net/faq/ returned 404 on 23 Oct 2026.
- Support page, archive of 8 Oct 2023: https://web.archive.org/web/20231008230511/https://supercitycon.net/support/
- Street view post, Ben, 28 Jun 2023: https://web.archive.org/web/20240227232910/https://supercitycon.net/street-view-walk-your-cities/
- “Exciting Updates Coming Soon,” Ben, 20 May 2024: https://web.archive.org/web/20240617064743/https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/
- “Balance updates in 2.0 (for iOS Players),” Ben, 2 Nov 2024: https://web.archive.org/web/20241213090031/https://supercitycon.net/balance-updates-in-2-0-for-ios-players/
- “New Bonuses for Residence Growth,” Ben, 4 Nov 2024: https://web.archive.org/web/20241213091112/https://supercitycon.net/new-bonuses-for-residence-growth/
- Localization workbook `I2Loc-Super-Citycon-Localization.xlsx`: https://web.archive.org/web/20250119073812/https://supercitycon.net/wp-content/uploads/2024/03/I2Loc-Super-Citycon-Localization.xlsx
- App Store listing and version history: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- Google Play listing: https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
- Same package on Google Play Games for PC: https://play.google.com/pc-store/games/details?hl=en_GB&id=com.benwilles.citybuilder
- Common Sense Media review of version 1.4.13, last updated 20 Sep 2022: https://www.commonsensemedia.org/app-reviews/super-citycon
- Mobile Gaming Hub, 16 Jun 2022: https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/
- Developer and player threads on r/supercitycon, cited on the requirement that uses them.
- Current site home, 23 Oct 2026, https://supercitycon.net/ — under construction, no control documentation.
- Steam announcement, excluded from live requirements: https://web.archive.org/web/20250327140145/https://supercitycon.net/super-citycon-unlimited-is-coming-to-steam/

The official site’s tutorial index, as archived 13 Dec 2024, lists only the residence-bonus post. A dedicated camera video mentioned in the basics tutorial was not found.

## 3. Requirements

### Map gestures

**REQ-08-001.** One finger swiped across the map pans the view.
Source: string table, Tutorials `Tuto1-1` — “Lesson 1: Basic controls. swipe on the screen with one Finger and move it to navigate on the map.”

**REQ-08-002.** A two-finger zoom gesture zooms in, and a two-finger pinch zooms out.
Source: string table, Tutorials `Tuto1-2` and `Tuto1-3` — “Zoom with two fingers to zoom in” and “Now Pinch with two fingers to zoom out.”

**REQ-08-003.** Two fingers rotate the map.
Source: string table, Tutorials `Tuto1-4` — “rotate with two fingers to rotate the map.”

**REQ-08-004.** Rotating the phone switches between portrait and landscape. The developer states that landscape is the better layout for street view.
Source: Ben Willes, 15 Feb 2025, https://www.reddit.com/r/supercitycon/comments/1iptlan/how_can_i_put_the_game_horizontally_on_my_phone/ — “usually it should happen automatically when you rotate the device.” Ben Willes Games, Google Play reply, 2 Nov 2024 — “the game already supports landscape mode, which i recommend using for street view—it looks and feels much better compared to portrait mode.”

### Inventory

**REQ-08-005.** An arrow button, also called the inventory button, opens the inventory. The basics tutorial places that inventory on the right side of the screen.
Source: string table, Tutorials `Tuto5-1` and `Tuto10-1` — “Tap the 'arrow button' to open your inventory.” `Tuto13-1b` — “Tap the inventory button.” Basics video — “if you open the inventory on the right side.” Common Sense Media — buildings and booster-type cards “can be accessed by clicking on the arrow button.”

**REQ-08-006.** The player drags a building from the inventory onto the map. The basics tutorial shows the building snapping to streets. The player then pushes confirm to place it.
Source: Basics video — “building is very straightforward you drag it there it automatically snaps to the streets.” String table, Tutorials `Tuto5-3b` and `Tuto5-4` — “Drag the building onto the marked area” and “Now push confirm to build it.”

**REQ-08-007.** Bonus cards in the inventory are used by dragging them onto the map.
Source: string table, Tutorials `Tuto5-2` — “Bonus Cards are triggerd by dragging them onto the map.” Common Sense Media — “They'll also need to drag cards they receive as rewards, offering things like speedier construction for a certain time period.”

**REQ-08-008.** Tapping a building card in the inventory opens detailed info. That panel shows, in its bottom-left, the minimum street level the building requires and the maximum allowed distance to a street. Tapping anywhere closes it.
Source: string table, Tutorials `Tuto8-6`, `Tuto8-7a`, `Tuto8-7b`, `Tuto8-7c`.

**REQ-08-009.** The inventory contains a recycler. Dragging an owned building onto it returns 50% of the value. When the player owns more than one of that building, tapping increases how many are recycled, and OK confirms.
Source: string table, Tutorials `Tuto10-2a` through `Tuto10-4` — “you can put them into the recycler,” “You will get back 50% of the value,” “If you own multiple of the same building you can also mass-recycle them,” “Tap to increase,” “Now confirm by pushing ok.”

**REQ-08-010.** From a building card in the inventory, a storage button sends that building to storage. Storage capacity is described as unlimited. Stored buildings are retrieved from the shop, where the control that would buy the building instead returns it to the inventory.
Source: string table, Tutorials `Tutorial/Storage1` through `Tutorial/Storage5` — “Tap the storage button to put the building into storage” and “Buildings in storage are available from the shop.” Ben Willes, 29 Jan 2025, https://www.reddit.com/r/supercitycon/comments/1icd7cb/how_can_i_access_the_storage_in_the_game/ — “Check out in the shop, you’ll find an option to put the building back into the inventory instead of a buy button for buildings that you got stored.”

**REQ-08-011.** The same inventory flow can sell buildings, and the storage tutorial says that sell option starts at level 12. A separate dialog says selling stays disabled until the player has 500K residents. Both statements are sourced; which gate the live game uses is unresolved in section 5.
Source: string table, `Tutorial/Storage6` — “Starting from Level 12, you will also be able to sell buildings in the same way.” UI `Dialogs/SellingDisabled` — “You need 500K residents to enable the option to sell buildings.” UI `Dialogs/SellFor` — “Sell for.”

**REQ-08-012.** If the player is short of coins, a dialog titled with the coin sprite and “Not enough” tells them to check the inventory for coin cards.
Source: string table, UI `Dialogs/CoinsInventoryHeader` and `Dialogs/CoinsInventoryBody` — “Check out your inventory! You might find some coin cards!”

**REQ-08-013.** After a purchase, the game tells the player that purchases and purchased buildings are in the inventory.
Source: string table, Willy `Special/PurchaseInventory` — “You will find your purchases in your inventory.” `Special/Purchase_Building` — “{[VAL]} added to inventory.”

### Bulldozer and streets

**REQ-08-014.** The bulldozer tool is opened from the inventory and from street mode. Inside the inventory, the basics tutorial and the bulldozer lesson place it on the upper right of that panel. A player describes the same control as a bulldozer icon reached from the up arrow, then a road icon.
Source: string table, Willy `Tutorial/Bulldozer1` — “The Bulldozer can be accessed from Street mode and from inventory.” Tutorials `Tuto13-2` — “click the 'bulldozer tool' in upper right side.” Basics video — “if you open the inventory on the right side uh you will find the bulldozer button.” Player, 16 May 2025, https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/ — “When you click on the up arrow to place something from your inventory, there is a bulldozer icon. Click that, then the road icon and delete away.”

**REQ-08-015.** Bulldozer mode has three categories: Streets, Buildings, and Trees. Only the categories the player turns on are destroyed. Tapping a matching object destroys it immediately.
Source: string table, Tutorials `Tuto13-3a` and `Tuto13-3b` — “You can select which things to destroy with bulldozer” and “Select all 3 categories. Streets, Buildings and Trees.” Willy `Tutorial/Bulldozer3` through `Tutorial/Bulldozer6` — “It only destroys things of the activated types.” Basics video — “you can choose three categories which essentially uh tells which things get bulldozed when you tap them,” and the demonstrator turns off trees and streets before tapping.

**REQ-08-016.** An undo control reverses recent bulldozer hits. Tapping the bulldozer button again closes bulldozer mode.
Source: string table, Tutorials `Tuto13-5a` — “There is also a 'undo button'.” Willy `Tutorial/Bulldozer7` and `Tutorial/Bulldozer8` — “you can undo it by using the undo button” and “Tap the bulldozer button again to close bulldozer mode.”

**REQ-08-017.** The street button opens the street menu. The player picks muddy road or normal roads there, then taps map tiles one after another to place them. Tapping an existing muddy road switches it to a normal road. A three-road junction creates an intersection. Undo in this menu reverses the last street placements only until the player leaves the street menu. The street lesson tells the player to tap undo three times to remove a three-tile junction.
Source: string table, Tutorials `Tuto3-1` through `Tuto3-8`. Common Sense Media — “they can change muddy roads to paved ones by tapping on portions of them” and “intersections, for instance, are created when you make a three-road junction.” String table, Others `Street_0` “Asphalt streets” and `Street_1` “Muddy roads.”

**REQ-08-018.** If a bulldoze or edit breaks the street network, the game alerts that all streets must be connected and offers to go to the closest street. The street lesson says income is reduced until the gap is fixed. The player can undo the destruction or build a new tile.
Source: string table, UI `Dialogs/StreetBuilderHelp` — “All streets must be connected. Go to closest street?” Tutorials `Tuto3-12` through `Tuto3-12c`. Willy `Alert/StreetNetLow_Body` — “All streets must be connected!”

**REQ-08-019.** A separate bulldozer, on a map inside the maps window at the top left, resets that map. The October 2023 support page adds a confirm step. The FAQ text captured through June 2026 stops after the bulldozer tap. The in-game copy still asks twice: buildings go to storage, and the operation cannot be undone.
Source: Support archive — “1. To reset a map open the maps window in the top left corner 2. Click the bulldozer button on the map you want to reset 3. Confirm the reset.” FAQ archive — steps 1 and 2 only, plus “Keep in mind there is no undo for this operation!” String table, UI `Dialogs/MapReset` — “Reset {[VAL]}? The buildings will be put into your storage.” `Dialogs/MapReset2` — “Are you really sure you want to reset {[VAL]} ? This operation can't be undone.” Willy `DidUKnow/ResetMaps` — “You can reset maps using the bulldozer button in the map window.”

**REQ-08-020.** Resetting one map clears that map and puts its buildings into storage. It does not wipe the account.
Source: FAQ and support — “Reset a single map. This option cleans one map and puts all the buildings you had on it into your storage.”

### Construction slots

**REQ-08-021.** A construction-slots indicator is shown at the bottom left. A new game starts with one slot.
Source: Basics video — “in the bottom left you see your construction slots um in the beginning you will have only one.”

**REQ-08-022.** Each Citycon building adds one permanent construction slot, described in the shop as one additional construction team. After a map reset, those extra slots are absent until the Citycon buildings are placed again.
Source: Basics video — “for each cityon building that you buil … you will get another permanent construction slot.” String table, Store `Citycon_desc` — “Each citycon building provides you with one additional construction team.” Willy `Special/Citycon` — “Each Citycon has an additional construction slot.” Ben Willes, 2 May 2026, https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/ — “It's actually those buildings that give you the additional slots.”

**REQ-08-023.** Some buildings need two or more slots. When the player does not have enough, the game shows “Construction teams busy!” with the number of slots needed and asks “Outsource construction?” The singular line is used when one slot is needed.
Source: Basics video — “some bigger buildings uh require two or more construction slots.” String table, UI `Scene/TooManyConstructions`. Player report on the same thread — “A warning pops up saying 2 slots needed.”

**REQ-08-024.** Extra slots are also offered from the shop, and the basics tutorial says they can be collected over time as well. Shop labels include “+ 1 construction slot,” packs of +1, +2, and +3 slots, and a variable “+ {[VAL]} construction slots.”
Source: Basics video — “you can get those from shop you can also collect them over time or a combination of both.” String table, Store `ConstructionSlot_1`, `Citycon_get`, `ReleasePack_3_Constructions`, `ReleasePack_7_Constructions`, `ReleasePack_10_Constructions`.

**REQ-08-025.** The player can stop an in-progress construction or building upgrade. Each action asks for confirmation.
Source: string table, UI `Dialogs/CancelConstruction` — “Are you sure you want to stop this construction?” `Dialogs/CancelUpgrade` — “Are you sure you want to stop this building's upgrade?”

**REQ-08-026.** Slot count and construction duration are shown to the player with the lines “{[VAL]} Slots” / “{[VAL]} Slot” and “{[VAL]} Days” / “{[VAL]} Day.”
Source: string table, UI `Scene/UpgradeSlotInfo` and `Scene/UpgradeTimeInfo`.

### Camera, street view, satellite, skyview

**REQ-08-027.** A control at the top left switches the camera between a perspective camera with tilt-shift and an orthographic camera. Orthographic view is described as a larger field of view and, in the May 2024 announcement, as the classic city-builder look.
Source: Basics video — “in the top left uh you can switch the camera mode you can switch between the perspective camera with til shift and the autographic camera uh autographic gives you a bigger field of view.” May 2024 post — “New Orthographic Camera Mode … with a larger field of view.” App Store 2.0.18 notes, 3 Dec 2024 — “Camera Mode” among the 2.0 features.

**REQ-08-028.** Settings includes a Camera section, a “Snap in camera” option, and “Video mode.” A tip tells the player to change the camera setting to fly mode to fly above the city. How those three labels relate to the top-left perspective/orthographic toggle is UNKNOWN.
Source: string table, UI `Scene/OptionsWin_Camera` “Camera,” `Scene/OptionsWin_CamSnapper` “Snap in camera,” `Scene/OptionsWin_Flymode` “Video mode.” Willy `DidUKnow/FlyCamera` — “You can change the camera setting to fly mode to take a flight above your city.”

**REQ-08-029.** Street view, also called walk mode, is entered by zooming all the way in and then zooming in once more. The game introduces it as a first-person view.
Source: FAQ — “Zoom in fully and then at the lowest point, zoom in again to enter street view.” Street-view post — “Zoom in to the lowest point, and then zoom in again to enter street view.” String table, Willy `Special/Streetview1` and `Special/Streetview2` — “first-person perspective with street view.”

**REQ-08-030.** In street view the player walks the streets, jumps onto cars and rides them, and climbs buildings with high jumps. The official post says physics is intentionally loose.
Source: Street-view post — “Physics hasn’t been taken too seriously, allowing you to jump on cars and take a ride through your city and scale buildings with high jumps.” Willy `Special/Streetview3` — “we didn't take physics too serious.”

**REQ-08-031.** Settings includes “Hide Joysticks” and “Street view 60 FPS.”
Source: string table, UI `Scene/JoystickVisable` “Hide Joysticks” and `Scene/Streetview60FPS` “Street view 60 FPS.”

**REQ-08-032.** Satellite view is entered by zooming out until the city is seen from above, then zooming out once more. Zooming back in leaves satellite view and returns to regular 3D.
Source: FAQ — “Zoom out fully so you see your city from a birds perspective, then zoom out again to enter Sat-view. To exit Sat-view, simply zoom in and you will get back into the regular 3D mode.”

**REQ-08-033.** Version 2.0 adds a skyview used to move between maps, replacing what the developer called the old menu-based map switch. The May 2024 post calls the combined-maps view Region View, explored from skyview. The FAQ still documents the top-left maps window after that date. Whether satellite view, skyview, and Region View are one mode or three is UNKNOWN.
Source: Balance post, 2 Nov 2024 — “Gone is the old, clunky menu-based navigation! Instead, you’ll now be able to zoom out to a skyview, making it effortless to switch between different sections of your city.” May 2024 post — “all your maps are combined into one massive region that you can explore from Skyview.” FAQ archive of 18 Jun 2026 still gives the maps-window steps.

### Minimap and science view

**REQ-08-034.** Tapping the minimap opens science view (also written Sciview). Tapping the minimap again closes it. The healthcare tutorial places the minimap at the top right.
Source: FAQ — “Tap the minimap to enter science view. … Tap the minimap again to exit science view.” Healthcare video — “you open science view by clicking the mini map in the top right.” String table, Willy `Tutorial/Sciview2` and Tutorials `Tuto11-13`.

**REQ-08-035.** A bar on the right of science view lists the local influences that exist on the current map. The player switches among them there. A question-mark control explains the selected influence. The minimap itself draws the influenced areas.
Source: FAQ — “The right bar lets your choose between all on this map exisiting local influences to visualize them.” String table, Willy `Tutorial/Sciview3`, `Tutorial/Sciview4`, `Tutorial/Sciview5`. Tutorials `Tuto11-2a` — “You can switch between different influences using the right bar.”

**REQ-08-036.** Influencer buildings are shown in orange. A short tap on one highlights its area. The player can keep building and editing while science view is open and see the coverage change.
Source: string table, Willy `Tutorial/Sciview6` and `Tutorial/Sciview7` — “The orange buildings are the influencers. Short-tap one to highlight it's area.” Tutorials `Tuto11-12c` — “You can tap the influencing building to highlight its bonus area.”

**REQ-08-037.** For healthcare, science view paints covered ground green and uncovered ground white.
Source: Healthcare video — “choose Healthcare and the green area is the area that is covered with healthare while the white area is not covered.”

**REQ-08-038.** The science-view lesson names these selectable influences when they exist: Farm Area, the pooh icon for pollution, Food Bonus, residential income bonus, and separate bonuses for commercial and industrial buildings. The string table also has player-facing explanations for education coverage (elementary, secondary, university), fire protection, healthcare, security, and street-connection influence.
Source: Tutorials `Tuto11-2b`, `Tuto11-6c`, `Tuto11-10d`, `Tuto11-11b`, `Tuto11-12b`. Willy `Influence/FarmArea`, `Influence/Pollution`, `Influence/FoodBonus`, `Influence/ResIncBonus`, `Influence/ComIncBonus`, `Influence/InduIncBonus`, `Influence/EduEle`, `Influence/EduSec`, `Influence/EduUni`, `Influence/EduBonus`, `Influence/Fire`, `Influence/Health`, `Influence/Security`, `Influence/StreetConInflu`. The full sentences are in section 4.

**REQ-08-039.** Hovering icons on the map flag problems: a street icon when a building is not connected, a pooh icon for polluted housing or fields, a barn icon when a field is outside the barn area, and an icon when a building blocks an airstrip. Settings can hide hover icons.
Source: string table, Willy `HoverIcon/NoStreet`, `HoverIcon/PollutedRes`, `HoverIcon/PollutedFood`, `HoverIcon/FarmArea`, `HoverIcon/AirportBlocked`. Tutorials `Tuto8-1a` and `Tuto11-1c`. UI `Scene/OptionsWin_HoverIcons` — “Hover icons.” Common Sense Media — “A poo icon is used in the game.”

**REQ-08-040.** Tapping a building reports whether healthcare covers it. The healthcare tutorial says a building that is not greyed out is covered.
Source: Healthcare video — “tap a building to see if it's covered … if it's not Creed out that means yes this building is covered by healthare.”

### Editing a building

**REQ-08-041.** A long tap on a building enters orbit and reveals an edit button. The basics tutorial places that edit button on the right. The edit controls are move by drag, rotate, and confirm.
Source: Basics video — “to edit a building you long tap a building and you will get into orbit mode here you can top the edit button on the right side … options to rotate … you can also move it.” String table, Tutorials `Tuto6-1` through `Tuto6-5` and Willy `Tutorial/BuildOptions0`, `Tutorial/BuildOptions2`, `Tutorial/BuildOptions3`.

**REQ-08-042.** In edit mode the building turns orange while it is too far from a street, and returns to its normal appearance when it is close enough. A hint reading “Move the building closer to the street” or “to the muddy road,” with “tap here to move,” is also sourced.
Source: string table, Tutorials `Tuto8-3a` through `Tuto8-3d`. Willy `Hint/StreetDistance` and `Hint/StreetDistanceMuddy`.

**REQ-08-043.** From edit mode, a destroy control labeled in the lesson as the arrow-down button removes the building from the map and returns it to the inventory.
Source: string table, Tutorials `Tuto12-3a` — “The 'arrow down' button destroys the building and puts it back into your inventory.” Willy `Tutorial/DestroyBuilding2` — “Tap the destroy button to remove the building from the map back to your inventory.”

**REQ-08-044.** An upgrade button on the building shows the improvements and the price. Tapping upgrade again buys it. Tapping the map leaves building orbit.
Source: string table, Tutorials `Tuto7-2`, `Tuto7-3`, `Tuto7-3b`. Willy `Tutorial/UpgradeBuilding1` through `Tutorial/UpgradeBuilding3` — “Tap onto the map to exit building orbit.”

**REQ-08-045.** Common Sense Media, on version 1.4.13, describes a tap-and-brief-hold on a building as revealing extra information, including whether it is too far from something. Later official lessons use that long-press to enter edit/orbit. Both descriptions are kept.
Source: https://www.commonsensemedia.org/app-reviews/super-citycon — “Tapping and briefly holding your finger on a building will reveal additional information about it, including whether it's too far away from something.” Contrast: REQ-08-041.

**REQ-08-046.** While placing or moving, the game can offer “Move building to suggested location?” It also blocks the action with “This place is occupied,” “You can't build outside the map bounds,” “You can't build this building on this terrain,” and “No spot available for this building.” Cancelling an edit can fail with “Can't undo. Old position occupied.”
Source: string table, UI `Dialogs/BuildLocationHelp`, `Dialogs/Location4BuildingNotFound`, `Dialogs/CancelEditNotPossible`. Willy `Hint/OverlapsBuilding`, `Hint/OutOfMap`, `Hint/WrongTerrain`.

### Demand bars and government area

**REQ-08-047.** Two blocks of bars sit at the top of the screen. They are turned on as the city progresses. Tapping a block opens a larger view. Tapping anywhere closes it.
Source: string table, Tutorials `Tuto9-1a` and `Tuto9-1c` — “At the top of screen are two blocks of bars.” Willy `Special/DemandSupply1` and `Special/DemandSupply2` — “The demand and supply bars are enabled! They are in the top menu. Click them to find out what your city needs.” `Tuto9-4h` — “Tap anywhere to close 'detail view'.”

**REQ-08-048.** The left block is building demand, split into Residential, Commercial, and Industrial. A taller bar means higher demand.
Source: string table, Tutorials `Tuto9-1b` and `Tuto9-2a` through `Tuto9-2e`.

**REQ-08-049.** The right block is supply use, split into Energy, Water, Food, and Waste management. A taller bar means more of that supply is in use.
Source: string table, Tutorials `Tuto9-3` and `Tuto9-4a` through `Tuto9-4f`.

**REQ-08-050.** The government area is the management entry. In the basics tutorial it contains collectibles, high scores, income, city upgrades, and the service overview.
Source: Basics video — “government area is for everything related to manage the game this part is for Collectibles … high scores … income … City upgrades … overview for electricity for water for food Waste Management healthc care police uh fire and education.”

**REQ-08-051.** Government labels in the March 2024 string table include Overview, Services, Energy, Water, Food, Waste Management, Healthcare, Education, Fire, Security, Protection, collectibles, Highscore, Income, monthly income, City Upgrades, Daily Rewards, Balance, Rank, and mayor rank. The spoken basics tour says “electricity” and “police,” while the table says “Energy” and “Security.” Alert copy says “we need more Police.”
Source: string table, Gov sheet keys `Overview`, `Services`, `EnergyHeader`, `Water`, `Food`, `Trash`, `Healthcare`, `Education`, `Fire`, `Security`, `Protection`, `Collectables`, `Highscore`, `Income`, `MonthlyIncome`, `Upgrades`, `DailyRewards`, `Balance`, `Rank`, `MajorScore`. Willy `Alert/SecurityCritical_Body` — “we need more Police!” Basics video quote in REQ-08-050.

**REQ-08-052.** The healthcare page inside government shows two measures: capacity against the current residence count, and local coverage. The tutorial’s own city read 60% capacity; that figure is an example, not a fixed rule.
Source: Healthcare video — “you can get an overview in the government area and the healthcare tab … it's capacity … in my case it's not covered it's only 60% … and there is the local coverage.” Gov `Capacity` “Capacity,” `LocalCoverage` “Local Coverage.”

**REQ-08-053.** Collectibles are cards gained from chests or over time. The player can tap an unfinished collectible to finish it early, and the basics tutorial calls that a premium action. Completing one places the building in the inventory. Tapping an unfinished collectible also reveals a buy button for pieces, paid with the premium currency.
Source: Basics video — “Collectibles that's card card you get from from chests or over time you can also tap them to complete them earlier that's a premium option.” String table, Willy `Tutorial/collectibles1` through `Tutorial/collectibles5` — “Open the governement menu” and “tap on an uncompleted collectable and a buy button will appear.” Gov `Collectables` — “collectibles.”

**REQ-08-054.** High scores show the player’s current ranking. The string table locks that entry until level 8, and tells the player to enable Game Center to see rankings. The App Store build 2.1.0 says mayors compete across four categories. The names of those four categories are UNKNOWN. The listing also says the game uses Game Center leaderboards and achievements.
Source: Basics video — “high scores gives you an overview of your current ranking.” Gov `Highscore` “Highscore,” `LockedHighscore` “Get level 8 to participate in highscores,” `NoGameCenter` “Enable game center to see the rankings.” App Store version history, 2.1.0, 29 Dec 2024 — “HIGHSCORES: Compete with other Mayors across four categories.” Same listing, Supports — “This game also features leaderboards and achievements.”

**REQ-08-055.** The income entry shows income. The string table names “Income,” “monthly income,” and coins collected. A tip says the balance is shared across maps and income from all maps is added together. Tapping the coin balance changes its number format.
Source: Basics video — “income gives you yeah it's obvious about your income.” Gov `Income`, `MonthlyIncome`, `Coins collected`. Willy `DidUKnow/BalanceShared` and `DidUKnow/CoinFormat` — “You can tap your coins balance to change the format.”

**REQ-08-056.** City upgrades are bought mostly with coins. After those are owned, the basics tutorial says some upgrades cost supercash. A top-of-screen notice says “City upgrade unlocked.” The named upgrades in the March 2024 table are listed in section 4. Their numeric costs and levels are UNKNOWN.
Source: Basics video — “mainly City upgrades can be purchased with coins once you got everything at some point you will find uh some with uh super cash” and the examples “water consumption Water Production energy uh trash uh the value of coins the appearance of coins.” String table, Gov `Upgrades` “City Upgrades.” Notifications `TopNotification/NewBoost` “City upgrade unlocked.” Upgrades sheet, section 4.

**REQ-08-057.** Version 2.0 tells the player six residence bonuses by name: Culture, Diversity, Entertainment, Loyalty, Recreation, and Wealth. Single-count bonus buildings show a culture icon with an orange checkmark. Multi-count bonus buildings show a culture icon with a blue plus. Wealth on a building is shown as one, two, or three dollar signs. The screen that holds the six bonus totals is not named.
Source: https://web.archive.org/web/20241213091112/https://supercitycon.net/new-bonuses-for-residence-growth/ — “These bonuses are Culture, Diversity, Entertainment, Loyalty, Recreation, and Wealth” is the companion balance post’s list; the tutorial post says “indicated by the culture icon with an orange checkmark symbol,” “a blue plus symbol,” and “one, two, or three dollar signs.”

**REQ-08-058.** Version 2.0 also presents a Mayor Score, a happiness measure, and the job count of each commercial or industrial building. The March 2024 government table already has the label “mayor rank.” Where happiness and job counts are drawn is not named beyond “displayed” and “you’ll see.”
Source: May 2024 post — “Mayor Score,” “Happiness Measure,” “Transparent Workspaces System.” Balance post — “population bonuses will be displayed upfront” and “you’ll see exactly how many jobs each commercial or industrial building provides.” Gov `MajorScore` “mayor rank.”

**REQ-08-059.** When supply is low or exhausted, or another city problem is detected, the game shows an alert addressed to the player. Sourced alert texts cover energy, water, food, trash, fire stations, police, elementary schools, high schools, universities, animals, plants, pollution, a blocked ship route, a broken monorail loop, and a new map that still needs energy, food, waste, or water. A “Go to” button is part of this alert UI.
Source: string table, Willy keys `Alert/EnergyCritical_Body`, `Alert/EnergyLow_Body`, `Alert/WaterCritical_Body`, `Alert/WaterLow_Body`, `Alert/FoodCritical_Body`, `Alert/FoodLow_Body`, `Alert/TrashCritical_Body`, `Alert/TrashLow_Body`, `Alert/FireCritical_Body`, `Alert/FireLow_Body`, `Alert/SecurityCritical_Body`, `Alert/SecurityLow_Body`, `Alert/EduEleFull`, `Alert/EduSecFull`, `Alert/EduUniFull`, `Alert/AnimalsCritical_Body`, `Alert/AnimalsLow_Body`, `Alert/PlantsCritical_Body`, `Alert/PlantsLow_Body`, `Alert/PollutedResidential`, `Alert/ShipAlert`, `Alert/MonorailBroken`, `Alert/EnergyNewMap`, `Alert/FoodNewMap`, `Alert/TrashNewMap`, `Alert/WaterNewMap`, and `Button/GoTo` “Go to.”

**REQ-08-060.** Advice lines can tell the player the city needs more commercial buildings, more energy, more food, more industry, more residential buildings, more waste management, or more water.
Source: string table, UI `Advices/CommercialAdvice`, `Advices/EnergyAdvice`, `Advices/FoodAdvice`, `Advices/IndustryAdvice`, `Advices/ResidentsAdvice`, `Advices/TrashAdvice`, `Advices/WaterAdvice`.

### Mailbox, tasks, tutorials

**REQ-08-061.** A mail button opens the mailbox. The mailbox holds messages and tasks.
Source: string table, Tutorials `Tuto2-1` and `Tuto2-2` — “Tap the mail button to open the mailbox.” “This is your Mailbox. Here you get messages and tasks.” Basics video — “the mailbox uh that's mainly where you receive your tasks um but also from time to time you will get a message.”

**REQ-08-062.** The player deletes a mail by swiping it from right to left. The mailbox labels include “Swipe left,” “Completed!,” and “Time out!” A task can be deleted only after it is fulfilled. The player collects the reward from the task.
Source: string table, Tutorials `Tuto2-4`, `Tuto2-4b`, `Tuto2-5`, `Tuto2-5b`. Tasks sheet `SwipeLeft` “Swipe left,” `Completed` “Completed!,” `Expired` “Time out!”

**REQ-08-063.** A task shows a header and a body. One sourced task is itself “Delete this mail” / “Delete mail.” Five tasks point at these lessons: “Learn to destroy buildings,” “Learn to edit buildings,” “Learn bulldozing,” “Learn card storage,” and “Learn science view.” Their header cells in the string table are placeholder dashes or empty, so the title the player sees for those five is UNKNOWN.
Source: string table, Tasks `Task55Header`/`Task55Body`, `Task83Body` through `Task87Body` and their Header cells.

**REQ-08-064.** The top of the screen can announce “New task,” “Task completed,” and “New message.”
Source: string table, Notifications `TopNotification/NewTask`, `TopNotification/TaskCompleted`, `TopNotification/NewMessage`.

**REQ-08-065.** After the first house, the welcome guide tells the player to open the mailbox and take the reward, following marked steps. A help button on a mailbox task asks that guide for assistance.
Source: string table, Willy `WelcomeV2/TaskHint` and `WelcomeV2/End` — “Push the help button at the task in mailbox if you need my assistance, and I'll guide you.”

**REQ-08-066.** On version 1.4.13, Common Sense Media says a task message tells the player what to do, such as building a barn, and pays a reward such as coins, and that nothing in the message jumps the player to that part of the game. The later help-button line in REQ-08-065 says the guide will assist. Both are kept.
Source: Common Sense Media — “they can't click on anything in the message and be automatically taken to that part of the game. They'll need to manually exit that section.” App Store review, 8 Oct 2022 — “Will let you know what it needs to complete each tasks.”

**REQ-08-067.** The welcome sequence introduces a guide named Willy on “genesis island,” marks steps, and can be skipped. Skip shows “Skip tutorial” and then “Sure, i see you are a pro! Just follow the tasks in your mailbox in case you struggle.” The App Store notes for 1.6.16, 23 Oct 2023, add “Option to skip the tutorial for new players.”
Source: string table, Willy `WelcomeV2/Hello`, `WelcomeV2/GetStarted`, `Tutorial/SkipTutorialButton`, `Tutorial/SkipTutorial`. App Store version history, 1.6.16.

**REQ-08-068.** The March 2024 new-player lines say tutorials live in the government section. The later basics video says tutorials are inside the mailbox. The tutorial list itself is titled “Tutorials” and is grouped into Newbie (“Learn the basics”), Beginner (“Discover more features”), and Expert (“Master the game”).
Source: Notifications `NewLevel/0-3` through `NewLevel/0-5` — “You'll find the tutorials in the government section” and “follow the tasks in your mailbox.” Basics video — “you can also uh find some uh tutorials inside of here” while the mailbox is open. Tutorials `TutorialList`, `TutoBlock1Title` through `TutoBlock3Desc`. Lesson titles are in section 4.

**REQ-08-069.** Tutorial chrome includes Continue, Next, Exit, and Restart. Exit asks “Do you want to exit the tutorial?” Some lessons refuse to start and say why: no building on the map, no building in the inventory, no upgradable building, or not enough influencers.
Source: string table, Tutorials `Continue`, `Next`, `Exit`, `Restart`, `ExitText`, `Tutorial/BuildOptionsNotAval`, `Tutorial/DestroyBuildingNotAval`, `Tutorial/UpgradeBuildingNotAval`, `Tutorial/StorageNotAval`, `Tutorial/SciviewNotAval`. Willy `Hint/TutReqBuildingInventory`, `Hint/TutReqBuildingMap`, `Hint/TutReqBuildingUpgrade`, `Hint/TutReqSciView`.

**REQ-08-070.** A daily task exists. A phone notification titled “Daily task reminder” says “You still have 2 hours to complete your daily task!” Settings includes a “Daily task” entry.
Source: string table, iOSNotif `NotiDailyTaskHeader` and `NotiDailyTaskBody`. UI `Scene/OptionsWin_DailyTask` “Daily task.”

**REQ-08-071.** Daily rewards use the line “Come back daily to receive a free reward,” a “Daily Reward - Day {[VAL]}” event, and a phone notification “Get your daily reward!” / “Hurry up! Your daily reward expires soon!” A tutorial points at a gift in “the welcome event” and offers a notification opt-in. It states the full set of gifts has “an value of over 30 bucks.”
Source: Gov `DailyRewards` and `DailyRewardsInfo`. Events `Ev29Header` and `Ev29Body`. iOSNotif `NotiDailyRewardHeader` and `NotiDailyRewardBody`. Willy `Tutorial/DailyReward1` through `Tutorial/DailyReward4`. UI `Scene/OptionsWin_DailyReward` “Daily reward.” Notifications `TopNotification/DailyReward` “New daily reward.”

### Shop

**REQ-08-072.** A shop button opens the shop. The basics tutorial calls this screen the purchases overview and starts it on add-ons. The shop lesson shows a category bar the player swipes sideways; the lesson’s example category is Skyscrapers.
Source: string table, Tutorials `Tuto4-1` and `Tuto4-2` — “Tap the shop button to open the shop.” “This is the Category Bar. Here you switch between the different building categories. Swipe left to Skyscrapers.” Basics video — “the shop yeah let's go to the shop that's this one um that's the purchases overview … we got some add-ons uh add-on means you unlock it once you” (transcript capture ends there).

**REQ-08-073.** Tapping a building in the shop selects it. Tapping “?” opens detailed info. Tapping anywhere closes that window. The player can then buy. From the 1.6.16 notes, higher-level buildings stay visible early, and the unlock level is shown in the details.
Source: string table, Tutorials `Tuto4-3` through `Tuto4-6`. Store `AvailableFromLevel` — “Available from Level {[VAL]}.” App Store 1.6.16 — “Higher level buildings are now visible in the shop even in the early game. Also, the unlock level is no longer hidden in the details.”

**REQ-08-074.** The shop describes three currencies. Supercoins buy buildings and upgrades. Supercash buys add-ons, maps, special buildings, and other premium options. Supercredits skip a rewarded ad and still grant the reward.
Source: string table, Store `Supercoins_Desc_Body`, `SuperCash_Desc_Body`, `SuperCredit_Desc_Body`.

**REQ-08-075.** The shop sells add-ons, shows “Add-ons you own,” and can mark an item “new,” “Limited Offer,” “One time offer,” or “Only Today.” Named add-ons in this string table are Curacao, La Plaza, Marble lane, Monorail, Oriental center, Skyscraper Set 1, Trailerpark, and Retro 1990.
Source: Store keys `Addon_Curacao_Name`, `Addon_LaPlaza_Name`, `Addon_MarbleLane_Name`, `Addon_Monorail_Name`, `Addon_OrientalCenter_Name`, `Addon_Skyscraper01_Name`, `Addon_Trailerpark_Name`, `Addon_Retro1990_Name`, `Owned`, `New`, `LimitedOffer`, `OneTimeOffer`, `OnlyToday`.

**REQ-08-076.** The shop includes the Piggy Bank. It collects supercash during play. The player can empty it at any time, which restarts the collection. The bank says “I'm full, empty me!” and “Empty now.” A popup says “Your piggy bank is full, go to the store and empty it before it bursts!”
Source: Store `PiggyBankDesc`, `PiggyBankFull`, `PiggyBankEmpty`. Willy `Special/PiggyBankFull` and `Special/PiggyBankPurchase`. App Store 1.6.18, 7 Nov 2023 — “Play and earn with the brand new Piggy Bank!”

**REQ-08-077.** The shop offers Sandbox with the lines “Zero construction time,” “Constructions finish instant,” “Sandbox active for,” and durations “8 Hours,” “1 Month,” “6 Month,” and “Lifetime,” plus “Unleash Super Citycon!”
Source: Store `SandboxDesc`, `SandboxZeroTime`, `SandboxFinishInstant`, `SandboxTimeLeft`, `Sandbox8Hours`, `Sandbox1Month`, `Sandbox6Month`, `SandboxLifetime`, `SandboxUnleash`.

**REQ-08-078.** The shop offers a Speedup Pack whose text promises permanent speedup without ads, doubled offline income without ads, constructions that finish in the background while offline, and free supercash from cars.
Source: Store `SpeedupPack` and `SpeedupPack_desc`.

**REQ-08-079.** The shop offers “No ads” for “1 Month,” “6 Month,” and “12 Month.” While a no-ads period is active, settings shows “No ads till:”.
Source: Store `NoAds`, `NoAds_1_Month`, `NoAds_6_Month`, `NoAds_1_Year`. UI `Scene/OptionsWin_NoAdsTill`.

**REQ-08-080.** The shop can unlock a named map, sell “+ 3 Maps Tokes,” and grant a “Map Token” / “Free map!” card.
Source: Store `UnlockMap` “Unlock "{[VAL]}" map” and `3MapToken`. Cards `MapToken` “Map Token” and `MapToken2` “Free map!”

**REQ-08-081.** A locked building explains the lock: reach a level, finish a named task, buy a named extension, visit the store, raise average IQ to a shown value, meet a variable requirement, own a count of another building at a level, wait for a later level, or stop because the maximum count is already built. The outer islands can refuse placement with “You are not allowed to build in the outer islands yet.”
Source: string table, UI `Dialogs/LockLevelNeed`, `Dialogs/LockTaskMissing`, `Dialogs/LockExtensionNeed`, `Dialogs/LockByCode`, `Dialogs/LockIQNeed`, `Dialogs/LockVarReq`, `Dialogs/LockBuildReq`, `Dialogs/LockMaxPerLvl`, `Dialogs/LockMaxAmount`, `Dialogs/LockBuildingLocked`, `Dialogs/LevelLockedLocation`. Willy `Tutorial/BuildingNotPurchaseable` — “This building is still locked. Try again later.”

### Popups

**REQ-08-082.** A speedup button plays an ad and then runs the game at double speed for 10 minutes. The remaining speedup time is shown on that button. The basics tutorial shows a popup that asks the player to support the game by watching, with the same 10-minute double-speed result.
Source: string table, UI `Dialogs/FirstAd` — “The speedup button plays an Ad and rewards you afterwards with double gamespeed for 10 Minutes.” Willy `Tutorial/Speed1` and `Tutorial/Speed2`. Basics video — “this popup will ask you to support us um watching that so the game will run on double speed uh for 10 minutes.”

**REQ-08-083.** During that speedup, cars also spawn free supercash, and constructions keep going for whatever speedup time is left when the player leaves. A separate reminder offers “free SuperCash from cars, double the car coin reward, and speedup the game x2.”
Source: Willy `Tutorial/Speed3`, `Tutorial/Speed4`, `Special/AdRemind`.

**REQ-08-084.** A city upgrade named “Ad Reward Time” lengthens the ad reward from one shown number of minutes to another. The two numbers are placeholders in the string table.
Source: Upgrades `Ad_RewardTime_Head` and `Ad_RewardTime_Desc`.

**REQ-08-085.** “double up?” asks “Do you want to double your reward?” The 1.6.16 notes call the then-new presentation a “non interrupting double up design.” What that layout looks like is not described. Offline return can use the same question: “Welcome Back! You earned {[VAL]} while being away. Double up?” A no-ads variant omits the double-up question.
Source: UI `Dialogs/DoubleUpHead` and `Dialogs/DoubleUpBody`. App Store 1.6.16. Willy `Special/OfflineEarnings` and `Special/OfflineEarningsNoAds`. UI `Scene/OfflineEarning_Header` “Welcome back!,” `Scene/OfflineEarning_L1` “You've been offline for,” `Scene/OfflineEarning_Take` “Take {[MONEYX1]},” `Scene/Offlinne_Get` “Get {[MONEYX2]},” `Scene/Info_OfflineEarning_L2` “Your offline income is.”

**REQ-08-086.** Speedup x2 cards raise game speed for a time. The card label is “Speed” / “Speed x{[VAL]}.” The duration of a given card is not in the official sources used here. A June 2022 article says a task powerup can double money for the next hour or speed construction, and that an ad can fast-forward the day. Those durations disagree with the 10-minute official speedup and are recorded in section 5.
Source: Willy `Tutorial/Speed0`. Cards `Speed` and `SpeedVal`. https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/

**REQ-08-087.** If no ad can play, the game says “No ads available at the moment. Try later!,” “There has been an issue with the Ad provider, please try again later,” or “you have reached the maximum amount of ads for today! Try again tomorrow!”
Source: UI `Dialogs/AdsNotAvailable` and `Dialogs/ErrorAdShow`. Willy `Special/MaxAds`.

**REQ-08-088.** A free gift popup awards coins or supercash and says “Come back in 3 hours!” The 1.6.16 notes say “Get a free gift every 3 hours.”
Source: UI `Dialogs/GiftRewardsCoins` and `Dialogs/GiftRewardsCash`. App Store 1.6.16.

**REQ-08-089.** Watching an ad can also pay a coin or supercash popup: “Here are {[VAL]} coins” or “Here are {[VAL]} supercash,” and “You got + {[VAL]} days of No-ads!”
Source: UI `Dialogs/AdRewardsCoins`, `Dialogs/AdRewardsCash`, `Dialogs/GotNoAds`.

**REQ-08-090.** Zooming in and tapping a car collects the coin shown on it. An App Store review describes supercash on vehicles as well, which matches the speedup-period supercash in REQ-08-083.
Source: SkyeMreddit, 9 Nov 2025, https://www.reddit.com/r/supercitycon/comments/1oqcbtx/how_to_earn_money/ — “Zoom in and Tap cars. They have coins over them.” App Store review by Hahdjhdjd, 17 Apr 2024 — “Increase the amount of supercash per vehicle when tapping.”

**REQ-08-091.** After inactivity of more than a shown number of minutes, the game shows “Game paused” and a Play button.
Source: UI `Scene/IdlePlayer_Header` “Game paused,” `Scene/IdlePlayer_Body`, `Scene/IdlePlayer_Button` “Play.” The minute count is `{[VAL]}`.

**REQ-08-092.** Construction can surface a treasure popup: “Your construction workers have found a treasure!” / “Congratulations!” and “Would you like to dig it up?” A redeemed bonus code shows “Success!” / “Your bonus code has been successfully redeemed!”
Source: UI `Dialogs/RewardChestHead`, `Dialogs/RewardChestBody`, `Dialogs/RewardCouponHead`, `Dialogs/RewardCouponBody`. Willy `Special/TreasureFound`.

**REQ-08-093.** Running out of money shows “OOOPS. Seems you ran out of money.” The follow-up is either a loan (“I'll lend you some money to recover”), a pointer to coin cards in the inventory, or a pointer to rewards in the mailbox.
Source: Willy `Special/Bankrupt`, `Special/BankruptButInventory`, `Special/BankruptButReward`.

**REQ-08-094.** Not enough coins offers “Pay with SuperCash instead?” Not enough supercash offers “Would you like to buy some SuperCash now?” A purchase asks “Purchase?” Failure says “Purchase failed. Please try again.”
Source: UI `Scene/NotEnoughCoins_Header`, `Scene/NotEnoughCoins_PayWithBill`, `Scene/NotEnoughBills_Header`, `Scene/NotEnoughBills_PurchaseBills`, `Dialogs/PurchaseConfirm`, `Dialogs/PurchaseFailed`.

**REQ-08-095.** Account reset is a button at the very bottom of the settings menu, labeled “reset account.” The dialog title is “Reset Account.” The body says progress and purchases are permanently deleted. A second dialog, “Please confirm,” requires the player to type `reset`. The button is “reset now.” Success says “Reset succesful. Please restart the game.”
Source: FAQ — “enter the setting menu and tap the “reset account” button and the very bottom. After the security confirmation…” Support archive uses “settings menu” and the same button. UI `Dialogs/Reset1Header`, `Dialogs/Reset1Body`, `Dialogs/Reset2Header`, `Dialogs/Reset2Body`, `Dialogs/ResetNowButton`, `Dialogs/ResetSuccesful`.

**REQ-08-096.** Other sourced popups and banners, each shown when its condition happens, are: new level (“New Level!” plus a level message), “Building unlocked,” “Level {[VAL]} unlocked,” “Street set unlocked,” “Building Upgrade unlocked,” “Your Reward!,” a name prompt (“What's your name?” / “Enter your name”), privacy consent (“Push agree to accept our privacy policy and terms of use”), ad-tracking consent, a review prompt (“do you enjoy Super Citycon?” with “Yeah, a lot!,” “Could be better.,” “Rate now,” “Review now,” “Join our Discord,” “Send Mail”), an update prompt with Update and Later, a forced-update block, iCloud and connection failures with retry or “Open settings,” “Another device is using this account,” a full-iCloud warning, “Send to warehouse?,” “Recycle this building?,” a monorail-loop destroy warning, a flash offer “Hi mayor, how about {[VAL]}?,” “Hello, Super Citycon has a new feature for you!,” and feature introductions for street view and the piggy bank.
Source: string table, UI `Scene/NewLevel_Header`, `Dialogs/Whats_your_name`, `Dialogs/DefaultUsername`, `Dialogs/PrivacyBody`, `Dialogs/AllowTrackingHead`, `Dialogs/UpdateHeader`, `Dialogs/UpdateGotoStore`, `Dialogs/UpdateLater`, `Dialogs/UpdateForcedBody`, `Dialogs/OpenSettings`, `Dialogs/StorageWinHead`, `Dialogs/StorageWinBody`, `Dialogs/RecicleDialog`, `Dialogs/MonorailDestroyWarning`, and the iCloud/connection keys under `Dialogs/CKit/*`, `Dialogs/Icloud*`, `Scene/Issue_*`. Notifications `NewLevel/*` and `TopNotification/BuildingUnlocked`, `TopNotification/UpgradeUnlocked`. Willy `Review/*`, `Special/Flashoffer`, `Special/NewFeature`, `Special/Streetview1`. Level flavor lines `Level/01-1` through `Level/100-1` exist; they are congratulation copy, not extra controls.

**REQ-08-097.** The loading screen rotates flavor lines: “Dressing the residents,” “Planting the trees,” “Filling the oceans,” “Cleaning up the forests,” “Training the monkeys,” and “Reloading the chicken eggs.” If the first start sticks with no error message, the FAQ tells the player to reboot, then reinstall, then email support. If the app opens and closes immediately, the same steps apply, and the FAQ says a reinstall does not lose progress.
Source: UI `Scene/LoadRandom1` through `Scene/LoadRandom6`. FAQ sections “stuck in loading screen at the FIRST START” and “opens when I tap the icon, but I directly closes.”

**REQ-08-098.** Phone notifications, separate from in-game popups, include “Your residents are missing you,” “Banks are full!” for offline earnings, and “Finished!” when offline constructions complete. The game asks “Would you like to enable notification for super citycon?” and says the choices are in the options menu.
Source: iOSNotif `ComeBack1`, `NotiOfflineEarningHeader`, `NotiOfflineConstructionsHead`. Willy `Special/Notifications`. UI `Scene/OptionsWin_Notifications` “Notifications.”

**REQ-08-099.** Event popups in the string table include “New century,” “New Decade,” “New Millenium,” “{[VAL]} Years!,” “Level {[VAL]} Rewards,” “Wow {[VAL]} Buildings!,” “{[VAL]} Residents!,” “Nice Infrastructre!,” “Secret Reward,” “You are Awesome!,” “Beta reward!,” “Beach life,” and “Retro Days,” plus “Event starts in.”
Source: Events sheet keys `Ev1Header` through `Ev11Header`, `Ev82Header`, `Ev83Header`, `BeachEvent01_Header`, `RetroEvent01_Header`, `EventStartsIn`.

**REQ-08-100.** Bonus cards the player can hold include a coin bonus, a coin burst, coin collect, an income card, a level coin card, wooden / golden / epic chests (“Wonders inside”), a map token, and a speed card. Chest and card piece counts use “{[VAL]} parts.”
Source: Cards sheet. Willy `Tutorial/collectibles2` distinguishes regular collectible buildings from rare ones that only come from pieces.

### Settings and options

**REQ-08-101.** The settings screen is titled “Settings.” Sourced section labels are Audio, Gameplay, Camera, Performance, Language, Profile, Contact, and Legal.
Source: UI `Scene/OptionsWin_Settinngs` “Settings,” plus `OptionsWin_Audio`, `OptionsWin_GamePlay`, `OptionsWin_Camera`, `OptionsWin_Performance`, `OptionsWin_Language`, `OptionsWin_Profile`, `OptionsWin_Contact`, `OptionsWin_Legal`.

**REQ-08-102.** Audio settings are Master, Music, and SFX.
Source: UI `Scene/OptionsWin_Master`, `OptionsWin_Music`, `OptionsWin_SFX`.

**REQ-08-103.** Gameplay settings include Game mode, Video mode, Hover icons, Upgradable buildings, Silence alerts, Haptic feedback, Vibrations, and Sunset. What “Game mode” changes is UNKNOWN. The string-table key for that row is `OptionsWin_Dragmode`.
Source: UI `Scene/OptionsWin_Dragmode` through `OptionsWin_Sunset` as named in section 4.

**REQ-08-104.** Performance settings include a profile choice of Low, Medium, and High; Resolution; Shadow Rotation; FPS Accelerator; Street view 60 FPS; and Hide Joysticks. FPS Accelerator’s own text says it raises framerate while the player is interacting, and “Not recommended for iphone 8 and lower.”
Source: UI `Scene/OptionsWin_ProfileLow`, `OptionsWin_ProfileMed`, `OptionsWin_ProfileHigh`, `OptionsWin_Resolution`, `OptionsWin_ShadowRotation`, `OptionsWin_FPSAccel`, `OptionsWin_FPSAccelInfo`, `Scene/Streetview60FPS`, `Scene/JoystickVisable`.

**REQ-08-105.** Language rows whose English labels are coherent in the March 2024 table are Dutch, English, Finnish, French, German, Indonesian, Polish, Russian, and Spanish. The App Store listing current on 23 Oct 2026 says the app also ships Danish, Italian, Japanese, Korean, Norwegian Bokmål, Portuguese, Simplified Chinese, Swedish, Traditional Chinese, Turkish, Ukrainian, and Vietnamese. The May 2024 post announced that wider set as coming with 2.0. Button labels for the languages missing from the March 2024 table were not in that file.
Source: UI `Lang/Dutch`, `Lang/English`, `Lang/Finnish`, `Lang/French`, `Lang/German`, `Lang/Indonesian`, `Lang/Polish`, `Lang/Russian`, `Lang/Spanish`. App Store Information, Languages. May 2024 post, “Expanded Language Support.”

**REQ-08-106.** Profile settings show the username and a Change control. The name cannot be empty, must meet a minimum length, and must stay under a maximum length. Those two lengths are placeholders, not printed numbers.
Source: UI `Scene/OptionsWin_Username`, `OptionsWin_Change`, `Dialogs/Error_UserNameEmpty`, `Dialogs/Error_UserNameShort`, `Dialogs/Error_UserNameLong`.

**REQ-08-107.** Contact settings let the player send a report. Subject is optional. The body placeholder is “Describe the problem.” The send control is “Send Report.” Empty, too-short, and too-long subject and body are rejected. Character limits are placeholders. Success says “Successfully sent. Thanks for you message.” A support code is shown as “Support Code:”.
Source: UI `Scene/OptionsWin_Contact`, `OptionsWin_Subject`, `OptionsWin_ContactBodyPlaceHolder`, `OptionsWin_Send`, `OptionsWin_MessageSent`, `OptionsWin_SupportCode`, and `Dialogs/Error_Report*`.

**REQ-08-108.** Legal settings link Privacy Policy and Terms and conditions. Credits is also a settings row. Bonus code entry is “Enter code” and “Redeem.” A bad code says “Bonus expired or not valid” or “Too many attempts. Try again later.”
Source: UI `Scene/PrivacyLink`, `Scene/TermsConditLink`, `Scene/OptionsWin_Credits`, `OptionsWin_BonusCode`, `OptionsWin_EnterCode`, `OptionsWin_Redeem`, `Scene/BonusNotValid`, `Scene/BonusTooManyAttempts`.

**REQ-08-109.** iCloud setup for the iOS save is done in the device Settings app, not inside the game’s settings screen: Apple ID, iCloud, iCloud Drive on, then SUPER CITYCON enabled, then restart the game. In-game dialogs explain a disabled or full iCloud and can offer “Open settings.” The FAQ states the container is app-specific and that the game cannot read photos or other apps’ iCloud data.
Source: FAQ, “How to enable iCloud access for Super Citycon,” “Why does Super Citycon want to access my iCloud?,” and the photos question. UI `Dialogs/CKCode9Body`, `Dialogs/CKICloudFull`, `Dialogs/OpenSettings`.

**REQ-08-110.** On a reported crash, the Google Play reply asks the player to email support@benwilles.com. The support page also lists hello@benwilles.com for general contact and a Discord server. The current Play listing’s public support email is hello@benwilles.com, and the store descriptions also print support@supercitycon.net.
Source: FAQ and support archive. Google Play review reply, 13 Nov 2024, on https://play.google.com/store/apps/details?id=com.benwilles.citybuilder. App Store and Play “About” text.

**REQ-08-111.** No source for the live iOS, Android, or Google Play Games build gives a keyboard shortcut or a mouse-button mapping. Play Games’ own page says “Level up with improved controls” without listing any. The Feb 2025 keyboard-and-mouse sentence belongs to Super Citycon Unlimited on Steam and is out of scope.
Source: https://play.google.com/pc-store/games/details?hl=en_GB&id=com.benwilles.citybuilder — “Play this game on your Windows PC with Google Play Games” and “Level up with improved controls.” Excluded: https://web.archive.org/web/20250327140145/https://supercitycon.net/super-citycon-unlimited-is-coming-to-steam/ — “on a bigger screen with keyboard and mouse support.”

## 4. Stages, options, and complexity this slice supports

### Tutorial lessons in the string table

| Lesson | Title | What it teaches |
| --- | --- | --- |
| 01 | Controls | Pan, zoom, rotate |
| 02 | Mailbox | Open mail, swipe to delete, collect a finished task |
| 03 | Building Streets | Muddy and normal roads, tap to upgrade a muddy road, junctions, undo, bulldozer |
| 04 | Shop | Category bar, building details, buy |
| 05 | Inventory | Arrow button, drag a card, drag a building, confirm |
| 06 | Editing buildings | Long tap, edit, drag, rotate, confirm |
| 07 | Upgrade Buildings | Upgrade button, price, confirm upgrade |
| 08 | Road connection | Hovering street icon, orange edit state, detail panel |
| 09 | Demand and supply bars | Top bars and the bigger view |
| 10 | Recycler | Drag to recycler, 50% return, mass recycle |
| 11 | Local Influences | Minimap, right bar, long-tap edit inside science view |
| 12 | Destroy Buildings | Long tap, edit, arrow down back to inventory |
| 13 | Bulldozer | Inventory, three categories, tap to destroy, undo |

Named follow-on tutorials, not numbered in that list: build options, bulldozer, daily reward, destroy building, science view, speed, storage, upgrade building, collectibles, and the Welcome V2 steps (buy the first building, connect a muddy road, water tower, pole barn, science view, reward card, mailbox).

### City upgrade names in the March 2024 table

Ad Reward Time. Income from car coins. Faster car-coin spawning. Faster constructions. Improve Elementary Education. Improve Secondary Education. Improve University. Non Renewable Energy Production. Green Energy Production. Energy saving measures, plus commercial, industrial, residential, and service energy saving. Smoke detector. Diet program. Farm Animals Upgrade. Industrial food upgrade. Farm Plants Upgrade. Food production. Healthcare capacity. Healthcare quality. Commercial taxes. Industrial taxes. Idle Income. Residential Income. Security. Trash production, plus commercial, industrial, residential, and services trash production. Trash removal. Water consumption, plus commercial, farm, industrial, residential, and services water consumption. Water Production.

A player on 23 Apr 2023 finished a “upgrade all houses” mission by upgrading “the city regulations.” That name is not in the upgrade table above. Source: https://www.reddit.com/r/supercitycon/comments/12wt6iq/purchase_city_upgrades/

### Science-view explanations the question mark can show

- Farm area: fields and animal farms are farmed only inside the marked area.
- Pollution: residents will not live there, and field and animal-farm food production is less efficient.
- Food bonus: food production from fields and farm animals is bonused inside the area.
- Residential, commercial, and industrial income bonuses apply inside their marked areas.
- Elementary, secondary, and university coverage bonus residential income. A separate education-facility influence “has no effect on other buildings.”
- Fire protection and healthcare bonus residential, commercial, and industrial income inside the area.
- Security coverage bonuses those same three.
- Street-connection influence gives residential buildings inside the area a street connection.
- Healthcare’s map colors, from the 2025 video, are green for covered and white for uncovered.

### Settings rows with a sourced label

Settings. Audio: Master, Music, SFX. Gameplay: Game mode, Video mode, Hover icons, Upgradable buildings, Silence alerts, Haptic feedback, Vibrations, Sunset. Camera: Camera, Snap in camera. Performance: Low, Medium, High, Resolution, Shadow Rotation, FPS Accelerator, Street view 60 FPS, Hide Joysticks. Language: the nine coherent labels in REQ-08-105. Profile: Username, Change. Contact: Subject (optional), Describe the problem, Send Report, Support Code. Legal, Credits, Privacy Policy, Terms and conditions. Bonus code, Enter code, Redeem. Daily reward, Daily task, Notifications, No ads till, Full bank, Constructions finished. Reset account at the bottom, from the FAQ rather than from a settings-row key.

### Cards and chests

Wooden chest, Golden chest, Epic chest. Coin bonus, coin burst, coin collect, income, speed, map token, “Free map!”

### Startup and account controls that are menus

First-run name entry, privacy agreement, optional ad-tracking agreement, tutorial or skip, mailbox tasks. Device Settings path for iCloud. Full account reset by typing `reset`.

Version notes that change UI behavior, with the build that stated them: skip tutorial and a free gift on a 3-hour timer (1.6.16, 23 Oct 2023); constructions continue in the background even with no speedup time left, and a non-interrupting double-up (same notes); piggy bank (1.6.18, 7 Nov 2023); orthographic camera, region/skyview, mayor score, happiness (announced 20 May 2024, App Store 2.0.18 on 3 Dec 2024); four high-score categories (2.1.0, 29 Dec 2024).

## 5. Contradictions

1. **Where tutorials live.** March 2024 new-player copy: “You'll find the tutorials in the government section.” Basics video, mailbox open: tutorials are inside the mailbox. REQ-08-068 keeps both.
2. **Task messages and navigation.** Common Sense Media on 1.4.13: a task message does not take the player to the work. Welcome copy: a help button on the mailbox task asks the guide to assist. REQ-08-065 and REQ-08-066.
3. **Long-press.** Version 1.4.13 review: a brief hold shows information, including distance problems. Official lessons and the basics video: a long tap enters orbit/edit. REQ-08-041 and REQ-08-045.
4. **Selling buildings.** Storage tutorial: selling starts at level 12. Dialog: selling requires 500K residents. REQ-08-011.
5. **Map-reset steps.** Support page of 8 Oct 2023 writes a third step, “Confirm the reset.” FAQ text through the 18 Jun 2026 capture omits that step. The dialog strings still ask twice and say the reset cannot be undone. REQ-08-019.
6. **Map changing.** November 2024 post: the old map menu is gone, and the player zooms out to a skyview. FAQ through June 2026 still says to open the maps window at the top left. REQ-08-033.
7. **Service names.** Basics narration: electricity and police. String table: Energy and Security, with police used in alert sentences. REQ-08-051.
8. **Offline construction.** Speed tutorial: constructions continue only for speedup time still left. Did-you-know line: they finish offline quickly with the speedup upgrade or leftover speedup time. Speedup Pack: they always finish in the background while offline. App Store 1.6.16: “Constructions now progress in the background, even without speedup time left.” These are four sourced descriptions.
9. **Double speed.** Official popup and first-ad line: double game speed for 10 minutes, and an upgrade that changes that minute count. Mobile Gaming Hub, 16 Jun 2022: a task powerup doubles money for one hour or speeds construction, and an ad fast-forwards the day. The article is earlier and unofficial.
10. **Bulldozer path.** Lessons: inventory button, bulldozer at the upper right, three category toggles. A player: up arrow, bulldozer icon, then the road icon. The road icon matches the Streets category, not a different tool. REQ-08-014.
11. **Construction slots after Sandbox.** A player who bought the sandbox construction offer still saw “2 slots needed” and reported a +1 slot purchase at 1400 supercash. The developer’s reply: extra slots come from placing Citycon buildings, which a map reset removes until they are built again. 1400 is a player-reported price, not an official one. REQ-08-022 and REQ-08-023.
12. **Car taps.** A player says cars carry coins. A review and the speedup tutorial say cars can carry supercash. REQ-08-083 and REQ-08-090.
13. **Language labels inside the string table.** The English cell for key `Lang/Italian` is “German,” and the English cell for `Lang/Portuguese` is “Spanish.” Whether a build showed those wrong labels is UNKNOWN. They are not written as requirements.
14. **Settings menu wording.** The June 2026 FAQ says “setting menu.” The October 2023 support page says “settings menu.” The dialog title is “Reset Account.”

## 6. Unknowns

- On-screen position of the mail button, shop button, government entry, and construction-slot icon art. Sourced positions are inventory on the right, bulldozer on the inventory’s upper right, camera toggle at the top left, minimap at the top right, construction-slot count at the bottom left, and demand bars at the top.
- Whether satellite view, skyview, and Region View are the same zoom gesture.
- How the player leaves street view. Entering it is sourced. Leaving satellite view is sourced. Leaving street view is not.
- What Settings rows “Game mode,” “Snap in camera,” “Video mode,” and fly mode each change, and which of them is the top-left perspective/orthographic switch.
- Mouse buttons and keyboard shortcuts for the live game on Google Play Games for PC.
- The four high-score category names, and any achievement list beyond “Game Center leaderboards and achievements.”
- Official supercash price of an extra construction slot. 1400 is one player’s report.
- Numeric gaps left as placeholders: name length, report length, idle minutes before pause, upgraded ad-reward minutes, speedup-card duration, treasure contents, gift amounts.
- Which tutorial home is current after the basics video: government, mailbox, or both.
- Which sell gate is current: level 12, 500K residents, or both.
- Whether the FAQ’s dropped “confirm” step means the confirm dialog was removed. The dialog strings were still in the March 2024 table.
- Complete language-button labels after 2.0. The App Store language list is sourced; many of those labels are not in the March 2024 table.
- The rest of the basics-video shop tour. The public transcript capture ends at “add-on means you unlock it once you.”
- The dedicated camera video the basics tutorial points to. It was not found.
- Screen names for Mayor Score, happiness, the six residence bonuses, and per-building job counts.
- Whether “city regulations” is a real upgrade name or a player’s paraphrase.
- Current behavior of background construction after 1.6.16, given the four conflicting lines in section 5.
- A full list of shop building categories. Only the lesson’s swipe target, Skyscrapers, is named.
- Exact art and order of every government tab beyond the labels in REQ-08-051.

## 7. Handoff

- Building stats, road-distance numbers, pollution spread, and service coverage math: buildings and services slices. This slice only has the inspect gestures and the labels.
- The six residence bonuses, wealth, diversity, and loyalty scoring: economy slice. This slice has the icon the player sees.
- Coin, supercash, and supercredit amounts, the 50% recycler return, and the 500K sell gate: economy slice.
- Individual mailbox objectives such as “Build a barn,” other than the mailbox chrome and the five “learn …” tasks: tasks and progression slice.
- City-upgrade percentages and prices: upgrades slice. Names are listed here.
- High-score formula and the four category names, once sourced: rankings slice. The entry and the level-8 lock are here.
- Region linking through harbors, sea wires, and water pipelines, and what skyview shows of other maps: region slice. The zoom and the maps-window bulldozer are here.
- Sandbox rules beyond the shop lines “zero construction time” and “constructions finish instant”: modes slice.
- Add-on building catalogs after Retro 1990, including later store updates such as Paris, Amsterdam, and Ancient China: content slice. The shop entry is here.
- iCloud sync conflicts and the “another device” lock: account and save slice. The dialogs are here.
- Steam app 3474890 keyboard, mouse, and “enhanced UI”: not the live game. Do not import them into this slice.
