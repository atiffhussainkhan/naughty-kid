---
cursor:
  subagentId: "bc-1e34c1fb-f718-5124-ad37-744d07f9a9ab"
---

# Slice 06 — City services and simulation

Player-facing requirements for the live Super Citycon city builder (Ben Willes Games / Sunapie) on iOS, Android, and the same app where Sunapie and Google Play Games say it also runs on PC. This is not an engineering design. No production formula, coverage radius, price, or timer is filled in unless a source prints it. A placeholder such as `{[PERC]}` or `{[VAL]}` means the game inserts a number. That number is UNKNOWN.

Steam app 3474890 (Sunapie Games, listed Q4 2026, SCC Studio, Workshop) is a different product. It is named only so it stays out of these requirements.

## 1. Scope of this slice

What the player builds, what the overview and science view show, and what the city does for:

- Electricity (the spoken overview says “electricity”; the March 2024 table says “Energy”)
- Water
- Food, including farms, fields, animals, and processed food
- Waste
- Healthcare
- Police (the spoken overview says “police”; the table says “Security”)
- Fire
- Education
- Local influences and pollution
- Citizen happiness, leisure needs, and the published residence-growth bonuses that sit next to the happiness measure

Out of scope except as a handoff: where a button sits, mailbox chrome, construction-slot math, road drawing, tax rates, the building catalog beyond names this slice needs, zoo habitats, and the mayor-score formula.

The public site `https://supercitycon.net/` was an under-construction page on 23 October 2026 and is not a gameplay source. Older official pages are cited from the Internet Archive.

## 2. Sources used

Official copy:

- Localization workbook, file dated March 2024, archive capture 19 Jan 2025: https://web.archive.org/web/20250119073812/https://supercitycon.net/wp-content/uploads/2024/03/I2Loc-Super-Citycon-Localization.xlsx — English (United States) cell. Sheet and key are cited so the cell can be found.
- FAQ, archive: https://web.archive.org/web/2025/https://supercitycon.net/faq/ — live URL returned 404 on 23 Oct 2026.
- “Exciting Updates Coming Soon,” Ben, 20 May 2024: https://web.archive.org/web/20240617064743/https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/
- “Balance updates in 2.0 (for iOS Players),” Ben, 2 Nov 2024: https://web.archive.org/web/20241213090031/https://supercitycon.net/balance-updates-in-2-0-for-ios-players/
- “New Bonuses for Residence Growth,” Ben, 4 Nov 2024: https://web.archive.org/web/20241213091112/https://supercitycon.net/new-bonuses-for-residence-growth/
- Basics tutorial, transcript as indexed. Timed captions were not recoverable: https://www.youtube.com/watch?v=jYAD0SkDmY0
- Healthcare tutorial, published 6 Feb 2025, length 2:18. Timed captions were not recoverable: https://www.youtube.com/watch?v=4SlxOgZ67MU
- App Store listing: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- Google Play listing: https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
- Sunapie: https://sunapie.com/ — “Play now on iOS, Android, PC and Mac.”
- Kotaku store blurb: https://kotaku.com/games/super-citycon-city-builder
- Common Sense Media, version 1.4.13, updated 20 Sep 2022: https://www.commonsensemedia.org/app-reviews/super-citycon

Developer and player reports, used only for a fact the writer states:

- Ben Willes, 20 Jul 2026, waste buildings and workspace demand: https://www.reddit.com/r/supercitycon/comments/1v1w2ve/never_ending_residential_needs/
- Player, 20 Jul 2026, same thread: upgraded power, water, and sewage.
- Player, 13 Sep 2022, asks what “energy seawire” and “water pump” do; no answer in the thread: https://www.reddit.com/r/supercitycon/comments/xd6dd7/hi_what_is_the_point_of_the_energy_seawire_and/
- Player, 2 May 2026, “2 slots needed” on power plants and the hospital: https://www.reddit.com/r/supercitycon/comments/1t1ff78/more_constructions_slots_when_i_bought_sandbox/
- ChapterCheats player answer, Gaia, 22 Aug 2022: https://www.chaptercheats.com/qna/iphone-ipod/556358/super-citycon-build-a-city-3d-answers/245121
- App Store review, Wyeth88, 24 May 2022, on the same app id: renewable energy versus coal, offshore wind, energy pollution, farm animals.

Official service tutorials exist and their spoken rules are not in this document, because captions could not be retrieved: Energy Supply https://www.youtube.com/watch?v=y5g7xPHzj0A , Water Supply https://www.youtube.com/watch?v=yuLUP_ELk4I , Food Supply https://www.youtube.com/watch?v=6wWZxnm_YLk , Waste Management https://www.youtube.com/watch?v=HDjaWySDKOM , Fire Department https://www.youtube.com/watch?v=0wFTp0aDpQg , Police Department https://www.youtube.com/watch?v=tFmR_0w1OuQ , Education System https://www.youtube.com/watch?v=PifQ_7vj7Ao , Science View https://www.youtube.com/watch?v=c3L7Qo8fdIM , Happiness and Mayor Score https://www.youtube.com/watch?v=_QpxzZFTBtw . Titles were confirmed from the channel or from the video page. Anything those videos say beyond the titles is UNKNOWN.

Rejected as a requirement source: the 20 Aug 2025 article “Common mistakes when building your city” on supercitycon.net (bylined orbidi1). It claims clinics, crime, fire risk, maintenance bills, land value, and citizen pop-ups. Those claims are not in the string table, the healthcare tutorial, or the store text. They are listed under contradictions and are not requirements. The Jun 2022 Mobile Gaming Hub guide is treated the same way where it is not repeated by an official source.

## 3. Requirements

### Overview, demand, and supply

**REQ-06-001.** The government area is where the player manages the city. Its overview includes electricity, water, food, waste management, healthcare, police, fire, and education.

Source: Basics video — “government area is for everything related to manage the game” and “overview for electricity for water for food Waste Management healthc care police uh fire and education.”

**REQ-06-002.** The March 2024 government labels for those same areas are Energy, Water, Food, Waste Management, Healthcare, Education, Fire, and Security. Alert sentences say “Police,” not “Security.”

Source: string table, Gov `EnergyHeader` “Energy,” `Water` “Water,” `Food` “Food,” `Trash` “Waste Management,” `Healthcare`, `Education`, `Fire`, `Security`. Willy `Alert/SecurityCritical_Body` — “we need more Police!”

**REQ-06-003.** Some of these management features are locked at the start of a new game.

Source: Basics video — “some of the features um they do not they are not unlocked at the game start.”

**REQ-06-004.** Two blocks of bars sit at the top of the screen and turn on as the city progresses. Tapping a block opens a larger view. Tapping anywhere closes that view.

Source: string table, Tutorials `Tuto9-1a` — “At the top of screen are two blocks of bars that show realtime info about demanded building types and your current supply usage.” `Tuto9-1c` — “Click the block to get a bigger view.” `Tuto9-4h` — “Tap anywhere to close 'detail view'.” Willy `Special/DemandSupply2` — “They are in the top menu. Click them to find out what your city needs.”

**REQ-06-005.** The left block is building demand, split into Residential, Commercial, and Industrial. A taller bar means higher demand for that kind of building. The lesson tells the player to build according to that demand for the best growth.

Source: string table, Tutorials `Tuto9-1b` through `Tuto9-2f` — “The higher the bar is, the higher is the demand for buildings of this category.”

**REQ-06-006.** The right block is supply use, split into Energy, Water, Food, and Waste management. A taller bar means more of that supply is being used. The lesson tells the player not to run out of any supply.

Source: string table, Tutorials `Tuto9-3` through `Tuto9-4g` — “The higher the bar is, the more of that supply is being used” and “try to not run out of any supply.”

**REQ-06-007.** Advice lines can tell the player the city needs more energy production, more water, more food production, or more waste-management buildings, and also more residential, commercial, or industrial buildings.

Source: string table, UI `Advices/EnergyAdvice` “We need to increase energy production,” `Advices/WaterAdvice` “We need more water,” `Advices/FoodAdvice` “We need to increase food production,” `Advices/TrashAdvice` “We need more waste management buildings.”

**REQ-06-008.** A low-supply alert and a critical alert are separate messages for energy, water, food, and trash. A new map can separately say that energy, food, waste, or water is still needed. A “Go to” button is part of this alert UI.

Source: string table, Willy `Alert/EnergyLow_Body`, `Alert/EnergyCritical_Body`, `Alert/WaterLow_Body`, `Alert/WaterCritical_Body`, `Alert/FoodLow_Body`, `Alert/FoodCritical_Body`, `Alert/TrashLow_Body`, `Alert/TrashCritical_Body`, `Alert/EnergyNewMap` “Energy supply needed,” `Alert/FoodNewMap` “Food supply needed,” `Alert/TrashNewMap` “Waste management needed,” `Alert/WaterNewMap` “Water supply needed.” UI `Button/GoTo` “Go to,” as cited from the same workbook in the UI slice.

**REQ-06-009.** The government screens also show these labels: Production, Consumption, Removal, Capacity, Local Coverage, Quality, Green Energy, Animal source, Plant source, processed food, Elementary, Secondary, University, Protection, residents, AVG lifespan, IQ, and the water unit kgal. What AVG lifespan and IQ calculate, beyond the IQ gate in REQ-06-071, is UNKNOWN.

Source: string table, Gov keys `Production`, `Consumption`, `Removal`, `Capacity`, `LocalCoverage` “Local Coverage,” `Quality`, `Renewable` “Green Energy,” `AnimalFood` “Animal source,” `PlantFood` “Plant source,” `IndustrialFood` “processed food,” `Elementary`, `Secondary`, `University`, `Protection`, `Residents` “residents,” `AvgLifespan` “AVG lifespan,” `IQ` “IQ,” `WaterUnit` “kgal.”

**REQ-06-010.** On version 1.4.13, the player can see supply and demand, including a case where more waste-management resources are needed. The game notifies the player and does not harshly penalize an error such as placing something too far from a road.

Source: https://www.commonsensemedia.org/app-reviews/super-citycon — “view current building supply and demand levels -- and see, for instance, more waste management resources are needed” and “The game notifies you -- but doesn't harshly penalize you -- for errors.”

### City upgrades that change services

**REQ-06-011.** City upgrades are bought mostly with coins. After those are owned, the basics tutorial says some upgrades cost supercash. Their prices are UNKNOWN.

Source: Basics video — “mainly City upgrades can be purchased with coins once you got everything at some point you will find uh some with uh super cash” and the examples “water consumption Water Production energy uh trash.”

**REQ-06-012.** The March 2024 upgrade list includes, for services: non-renewable energy production, green energy production, energy saving for all use and separately for commercial, industrial, residential, and services, smoke detector, diet program, farm-animal production, industrial food, farm-plant production, all food production, healthcare capacity, healthcare quality, security, trash production for all use and separately for commercial, industrial, residential, and services, trash removal, and water consumption for all use and separately for commercial, farm, industrial, residential, and services, plus water production.

Source: string table, Upgrades sheet, the Head cells from `EnergyProduction_NonRenewable_Head` through `Water_Production_Head`.

**REQ-06-013.** Each of those upgrades states a percentage change. Every `{[PERC]}` and `{[NEWPERC]}` in that sheet is UNKNOWN. No source prints the percentage the player actually receives.

Source: string table, Upgrades descriptions, for example `EnergyProduction_Renewable_Desc` — “Increase Green Energy Production by {[PERC]}.”

**REQ-06-014.** Services, farms, commercial buildings, industrial buildings, and residential buildings are each named as consumers of energy and water and as producers of trash. The amount each one uses or produces is UNKNOWN.

Source: string table, Upgrades `Energy_Services_Desc` “reduce the services energy consumption,” `Water_Farm_Desc` “Reduce farm water consumption,” `Trash_Residential_Desc` “Reduce residential trash production,” and the matching commercial, industrial, and services lines. BPBi `BPEneConServ` “Energy Consumption Services,” `BPWatConFarm` “Water Consumption Farm,” `BPTrashProCom` “Trash Production Commercial,” and the parallel keys.

### Electricity

**REQ-06-015.** When energy is low, the alert says energy levels are low and tells the player to build more power plants. When energy is gone, the alert says the city ran out of energy and tells the player to build more power plants.

Source: string table, Willy `Alert/EnergyLow_Body` — “energy levels are low! Build more power plants!” `Alert/EnergyCritical_Body` — “we ran out of Energy! Build more power plants!”

**REQ-06-016.** The March 2024 building names for energy are Wind Power Land, Wind Power Offshore, Coal Power plant, Nuclear Powerplant (two keys), Solar Power, and Energy Seawire. The shop category is Energy.

Source: string table, Buildings `Names/125` through `Names/130`, `Names/161` “Energy Seawire,” `Categories/Energy` “Energy.”

**REQ-06-017.** The player can raise non-renewable energy production and, separately, green energy production. The government label for the renewable side is “Green Energy.”

Source: string table, Upgrades `EnergyProduction_NonRenewable_Head` “Non Renewable Energy Production” and `EnergyProduction_Renewable_Head` “Green Energy Production.” Gov `Renewable` “Green Energy.” BPBi `BPEneProNon` “Energy” and `BPEneProRen` “Green Energy.”

**REQ-06-018.** A May 2022 review says the game offers renewable energy versus coal, including offshore wind, and that energy pollution is something the player deals with. Which of the named plants pollute, and how far, is UNKNOWN. The science-view lesson names the sawmill and the landfill as the pollution sources in that lesson, not a power plant.

Source: App Store review, Wyeth88, 24 May 2022 — “renewable energy vs coal (offshore wind!!)” and “energy pollution.” Contrast: Tutorials `Tuto11-7b` — “It's from the sawmill and the landfill.”

**REQ-06-019.** The older store text says the player provides electricity and can build eco-friendly wind turbines. The Kotaku blurb says the player handles energy.

Source: https://apps.apple.com/us/app/super-citycon-city-builder/id1607860732 — “access to essential utilities, like water and electricity” and “eco-friendly wind turbines.” https://kotaku.com/games/super-citycon-city-builder — “care about water, food, energy, and waste management.”

**REQ-06-020.** Placing a power plant can show a warning that 2 construction slots are needed. What the plant produces per slot is UNKNOWN.

Source: Player, 2 May 2026 — “some buildings will not let me place them without spending supercash. (i.e. the power plants and the hospital.) A warning pops up saying 2 slots needed.”

**REQ-06-021.** What happens to buildings, other than the alerts in REQ-06-015, when energy is low or gone is UNKNOWN. The alerts only tell the player to build more power plants.

Source: string table, Willy `Alert/EnergyLow_Body` and `Alert/EnergyCritical_Body`, quoted in REQ-06-015. Those bodies do not describe lights, abandonment, or a dark radius.

### Water

**REQ-06-022.** When water is low, the alert says water levels are low and tells the player to build more water supply. When water is gone, the alert says the city ran out of water and tells the player to build more water supply.

Source: string table, Willy `Alert/WaterLow_Body` — “water levels are low! Build more water supply!” `Alert/WaterCritical_Body` — “we ran out of Water! Build more water supply!”

**REQ-06-023.** The March 2024 building names for water are Waterpump (two keys), Watertower, and Water Pipeline. The shop category is Water.

Source: string table, Buildings `Names/132` and `Names/237` “Waterpump,” `Names/142` “Watertower,” `Names/162` “Water Pipeline,” `Categories/Water` “Water.”

**REQ-06-024.** Water on the government screen is measured in kgal. Production and consumption are separate labels. The numbers are UNKNOWN.

Source: string table, Gov `WaterUnit` “kgal,” `Production`, `Consumption`. Upgrades `Water_Production_Head` “Water Production” and `Water_All_Head` “Water consumption.”

**REQ-06-025.** A player in July 2026 says they upgraded power, water, and sewage. The March 2024 overview and upgrade sheets do not contain the word sewage. Whether sewage is its own service, a water building, or a waste building is UNKNOWN.

Source: https://www.reddit.com/r/supercitycon/comments/1v1w2ve/never_ending_residential_needs/ — “I’ve upgraded power/water/sewage multiple times.”

**REQ-06-026.** What happens to buildings, other than the alerts in REQ-06-022, when water is low or gone is UNKNOWN. The alerts only tell the player to build more water supply.

Source: string table, Willy `Alert/WaterLow_Body` and `Alert/WaterCritical_Body`, quoted in REQ-06-022.

### Food

**REQ-06-027.** When food is low, the alert says the food supply is low and tells the player to increase production. When food is gone, the alert says the city ran out of food and tells the player to increase production.

Source: string table, Willy `Alert/FoodLow_Body` — “food supply is low! Increase the production!” `Alert/FoodCritical_Body` — “we ran out of Food! Increase the production!”

**REQ-06-028.** Food is tracked as plant food, animal food, and industrial food. Animals and industry are shown as consumers of plants. Industry is also shown as a consumer of meat. The quantities are UNKNOWN.

Source: string table, BPBi `BPFoodProPlant` “Plant food,” `BPFoodProMeat` “Animal food,” `BPFoodProIndu` “Industrial Food,” `BPFoodConPlantAnimal` “Plant Consumption by Animals,” `BPFoodConPlantIndu` “Plant Consumption by Industry,” `BPFoodConMeat` “Meat Consumption.” Gov `PlantFood` “Plant source,” `AnimalFood` “Animal source,” `IndustrialFood` “processed food.”

**REQ-06-029.** Unlocking the chicken coop tells the player that farm animals produce animal-source food and consume plant food. The named animal buildings in the March 2024 table are Chicken Coop, Cowshed, and Pigsty.

Source: string table, Willy `Unlock/AnimalFood1` “You unlocked Chicken coop!” and `Unlock/AnimalFood2` — “they produce animal-source food. To do so, they consume plant food.” Buildings `Names/58` “Chicken Coop,” `Names/56` “Cowshed,” `Names/55` “Pigsty.”

**REQ-06-030.** When animals are low or gone, the alert tells the player to build more enclosures. The shop category for those buildings is “enclosures.”

Source: string table, Willy `Alert/AnimalsLow_Body` — “Food Industry will need more animals soon! Build more enclosures!” `Alert/AnimalsCritical_Body` — “Food Industry needs more animals! Build more enclosures!” Buildings `Categories/Barnyards` “enclosures.”

**REQ-06-031.** When plants are low or gone, the alert tells the player to build more fields. Named fields are Carrots Field, Salad Field, Corn Field, and Wheat Field.

Source: string table, Willy `Alert/PlantsLow_Body` — “Food Production will need more plants soon! Build more fields!” `Alert/PlantsCritical_Body` — “Food Production needs more plants! Build more fields!” Buildings `Names/61` “Carrots Field,” `Names/63` “Salad Field,” `Names/64` “Corn Field,” `Names/66` “Wheat Field,” `Categories/Fields` “Fields.”

**REQ-06-032.** Unlocking the Food Factory tells the player it produces industrial food and consumes both plant-source and animal-source food.

Source: string table, Willy `Unlock/IndustrialFood1` “You unlocked the Food Factory!” and `Unlock/IndustrialFood2` — “The food factory produces industrial food. To do so, it consumes plant and animal source food.”

**REQ-06-033.** Fields and animal farms are farmed only inside the marked farm area. A field outside that area is not farmed. The lesson fixes this by moving the barn, not the field. The status line says the building needs to be in the area of a barn. Named barn buildings include Pole Barn and Farm House.

Source: string table, Willy `Influence/FarmArea` — “Fields and animal farms get only farmed, if they are within the marked area.” Tutorials `Tuto11-2c` through `Tuto11-6a` — “One of your fields is outside that area and is not being farmed” and “now all your fields are being farmed.” Buildings `Others/Status_NeedsPolebarn` — “This building needs to be in the area of a barn.” `Names/68` “Pole Barn,” `Names/150` “Farm House.”

**REQ-06-034.** A hovering barn icon marks a field outside the barn area. The player can hide hover icons in settings.

Source: string table, Willy `HoverIcon/FarmArea` — “A field is outside the area of the barn! The hovering barn icon appears if that is the case.” UI `Scene/OptionsWin_HoverIcons` “Hover icons.”

**REQ-06-035.** A windmill gives a food-production bonus to fields inside its area. Parks and other decorations give bonuses to surrounding buildings. Which park gives which bonus, and the size of either bonus, is UNKNOWN except for the silo change in REQ-06-036.

Source: string table, Tutorials `Tuto11-11a` — “Some Buildings like the Windmill give a production bonus to fields within the affected area.” `Tuto11-12a` — “Parks and other decorations give bonuses to surrounding buildings.” Buildings `Names/72` “Windmill.” Willy `Influence/FoodBonus` — “Food production from fields and farm animals gets an Bonus within the marked area.”

**REQ-06-036.** Version 2.0 reduces the Silo building’s food-production bonus from 25% to 10%. The post tells the player to revisit the food supply chain. The Silo is a named building.

Source: https://web.archive.org/web/20241213090031/https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ — “we’ve reduced the silo’s food production bonus from 25% to 10%.” Buildings `Names/70` “Silo.”

**REQ-06-037.** The May 2024 post says farm-building bonuses are capped. The cap is UNKNOWN.

Source: https://web.archive.org/web/20240617064743/https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ — “bonuses on farm buildings will now be limited.”

**REQ-06-038.** A player on 20 Aug 2022 still saw a farming warning after the map was covered, and was told to open the overview at the bottom, switch to the food tab, and make more of the food type shown there. That answer also says animal sources use plants and food-processing plants use both plants and animals. The unlock texts in REQ-06-029 and REQ-06-032 say the same production chain.

Source: https://www.chaptercheats.com/qna/iphone-ipod/556358/super-citycon-build-a-city-3d-answers/245121 — “click the overview button on the bottom and switch to the food tab and see which type you need. Animal sources use plants and food processing plants use both plants and animals.”

**REQ-06-039.** Pollution makes field and animal-farm food production less efficient. A hovering pooh icon marks a polluted field. The status line says food production is reduced. The reduction is UNKNOWN.

Source: string table, Willy `Influence/Pollution` — “Food production in fields and is less efficient in fields and animal farms.” `HoverIcon/PollutedFood` — “A field is affected by pollution!” Buildings `Others/StatusPolutedFarm` — “Food production reduced by pollution.”

### Waste

**REQ-06-040.** When trash is low, the alert tells the player to build a new landfill. When trash is critical, the alert says the city will sink in trash.

Source: string table, Willy `Alert/TrashLow_Body` — “build a new landfill!” `Alert/TrashCritical_Body` — “we will sink in trash!”

**REQ-06-041.** The March 2024 waste names are Landfill, Waste Incineration, and Recycling Station. The shop category is Waste Management. A mailbox task can be “Build a landfill.”

Source: string table, Buildings `Names/81` “Landfill,” `Names/131` “Waste Incineration,” `Names/83` “Recycling Station,” `Categories/Waste Disposal` “Waste Management.” Tasks `Task70Header` “Landfill” and `Task70Body` “Build a landfill.”

**REQ-06-042.** Trash removal is a separate stat from trash production. Raising removal and lowering production are separate upgrades. The amounts are UNKNOWN.

Source: string table, BPBi `BPTrashRem` “Trash Removal” and `BPTrashProIndu` “Trash Production Industrial,” plus the other production keys. Upgrades `Trash_Removal_Head` “Trash removal” and `Trash_All_Head` “Trash Production.”

**REQ-06-043.** In the science-view lesson, the landfill is a pollution source. The player is told to move it. Residents do not want to live in the polluted area.

Source: string table, Tutorials `Tuto11-7b` — “It's from the sawmill and the landfill.” `Tuto11-9` — “now let's move the landfill!” `Tuto11-7c` — “People do not want to live in polluted areas.”

**REQ-06-044.** The developer, looking at a city with many waste-management buildings, says that waste management covers workspace demand. How many jobs one waste building provides is UNKNOWN. Version 2.0 shows the job count of each commercial or industrial building. Whether a waste building is counted in that job display is UNKNOWN.

Source: Ben Willes, 20 Jul 2026 — “Also a lot of waste management. That essentially means your workspace demand is covered.” https://web.archive.org/web/20241213090031/https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ — “you’ll see exactly how many jobs each commercial or industrial building provides.”

**REQ-06-045.** Common Sense Media, on version 1.4.13, says the game uses a poo icon. The March 2024 table uses a “pooh icon” for pollution, not as the name of the waste supply bar.

Source: https://www.commonsensemedia.org/app-reviews/super-citycon — “A poo icon is used in the game.” Tutorials `Tuto11-6c` — “Choose the 'Pooh Icon' to see the pollution.”

### Healthcare

**REQ-06-046.** Healthcare has two building types in the February 2025 tutorial: a hospital, which is upgradeable and has multiple levels, and a smaller medical center. The narrator says the medical center is cheaper, thinks it unlocks earlier, and says it has a smaller area of effect. The prices, the level count, the unlock order, and both radii are UNKNOWN. The March 2024 names also include Pharmacy. The shop category is Healthcare.

Source: Healthcare video — “one is the hospital that you can see the hospital is upgradeable uh has multiple levels and the other one we got is this little Medical Center … which is cheaper and I think it unlocks earlier but it also has a smaller area of effect.” Buildings `Names/73` “Hospital,” `Names/168` “Medical Center,” `Names/74` “Pharmacy,” `Categories/Healthcare` “Healthcare.”

**REQ-06-047.** After those buildings exist, vehicles appear in the city. The narrator does not settle on a name and says “emergency wagon or something.” The vehicle’s name and what it changes are UNKNOWN. No ambulance name is in the March 2024 building list that was searched.

Source: Healthcare video — “you will sometimes find those uh what are they actually called emergency wagon or something.”

**REQ-06-048.** Tapping a building shows whether healthcare covers it. The tutorial says a building that is not greyed out is covered and gives a bonus. The caption reads “not Creed out,” which is the auto-caption for “not greyed out.”

Source: Healthcare video — “tap a building to see if it's covered … if it's not Creed out that means yes this building is covered by healthare and you will get a bonus.”

**REQ-06-049.** The healthcare page in the government area shows two measures: capacity against the current residence count, and local coverage. In the tutorial city, capacity reads 60%, and the narrator calls that not enough. 60% is that city’s reading, not a rule that 60% is the failure line. The pass threshold is UNKNOWN.

Source: Healthcare video — “Healthcare has two measures it's capacity so you need enough capacity uh for your current residence amount um in my case it's not covered it's only 60% … and there is the local coverage which means the local availability.” Gov `Capacity` “Capacity,” `LocalCoverage` “Local Coverage.”

**REQ-06-050.** In science view, choosing Healthcare paints covered ground green and uncovered ground white. Covering the map is what the tutorial calls the full bonus.

Source: Healthcare video — “choose Healthcare and the green area is the area that is covered with healthare while the white area is not covered” and “distribute your your hospitals or your medical centers … so that your map is fully covered because then you will receive the full bonus.”

**REQ-06-051.** The February 2025 tutorial says that full healthcare coverage gives the full effect on residents’ happiness and the biggest effect on the mayor score. The size of either effect is UNKNOWN.

Source: Healthcare video — “the full bonus which gives you the full effect on your resident's happiness and with that the biggest effect also on your major score.”

**REQ-06-052.** The March 2024 influence text says buildings inside the healthcare area are covered, and that this gives an income bonus to residential, commercial, and industrial buildings. It does not mention happiness. Both the income-bonus sentence and the 2025 happiness sentence are sourced. How they combine is UNKNOWN.

Source: string table, Willy `Influence/Health` — “Buildings in this area are covered by Healthcare. It takes effect on residential, commercial and industrial buildings and gives them an income bonus.”

**REQ-06-053.** City upgrades can raise healthcare capacity and healthcare quality, each by an unknown percentage. The government screen has a Quality label. What quality changes, besides that upgrade name, is UNKNOWN.

Source: string table, Upgrades `Health_Capacity_Head` “Healthcare capacity” and `Health_Quality_Head` “Healthcare quality.” Gov `Quality` “Quality.”

**REQ-06-054.** Placing the hospital can show a warning that 2 construction slots are needed.

Source: Player, 2 May 2026 — “the power plants and the hospital” and “A warning pops up saying 2 slots needed.”

**REQ-06-055.** The Kotaku blurb says medical centers and hospitals keep residents healthy. No source describes sickness, death, or a hospital patient count.

Source: https://kotaku.com/games/super-citycon-city-builder — “be sure they stay healthy with medical center’s and hospitals.”

### Police

**REQ-06-056.** When security is low or critical, both alerts tell the player the city needs more police. The two bodies do not describe different failures. What “low” changes compared with “critical” is UNKNOWN.

Source: string table, Willy `Alert/SecurityLow_Body` and `Alert/SecurityCritical_Body` — “we need more Police!”

**REQ-06-057.** The March 2024 police names are Police Station, Police Office, and Special Police. The shop category is Police. A Public Services category also exists. What “Special Police” does differently is UNKNOWN.

Source: string table, Buildings `Names/113` “Police Station,” `Names/166` “Police Office,” `Names/114` “Special Police,” `Categories/Police` “Police,” `Categories/Public Services` “Public Services.”

**REQ-06-058.** Buildings inside the security area are covered. Coverage gives an income bonus to residential, commercial, and industrial buildings. A city upgrade raises Security by an unknown percentage. The map stat is labeled “Map Security.”

Source: string table, Willy `Influence/Security` — “Buildings in this area are covered by Security. It takes effect on residential, commercial and industrial buildings and gives them an income bonus.” Upgrades `Security_Head` “Security.” BPBi `BPSecurity` “Map Security.”

**REQ-06-059.** The older store text says police stations help keep citizens smiling and attract residents. No source describes a crime rate, a patrol, or an arrest.

Source: https://apps.apple.com/us/app/super-citycon-city-builder/id1607860732 — “police stations, firehouses, parks, sports venues, entertainment hotspots, and more to keep your citizens smiling and to attract new residents.”

### Fire

**REQ-06-060.** When fire coverage is low or critical, both alerts tell the player to build more fire stations. The two bodies use the same instruction. What “low” changes compared with “critical” is UNKNOWN.

Source: string table, Willy `Alert/FireLow_Body` and `Alert/FireCritical_Body` — “Build more Firestations!”

**REQ-06-061.** The March 2024 fire names are Fire Station and Fire Dept. The shop category is Firefighters.

Source: string table, Buildings `Names/112` “Fire Station,” `Names/167` “Fire Dept.,” `Categories/Firefighters` “Firefighters.”

**REQ-06-062.** Buildings inside the fire-protection area are covered. Coverage gives an income bonus to residential, commercial, and industrial buildings. The map stat is labeled “Map Fire Danger.” The smoke-detector upgrade reduces fire danger by an unknown percentage.

Source: string table, Willy `Influence/Fire` — “Buildings in this area are covered by Fire Protection. It takes effect on residential, commercial and industrial buildings and gives them an income bonus.” BPBi `BPFire` “Map Fire Danger.” Upgrades `Fire_Head` “smoke detector” and `Fire_Desc` — “Reduce the Fire danger by {[PERC]}.”

**REQ-06-063.** No source describes a building catching fire, a fire truck travel time, or a burned-down state. The older store text names firehouses as something that keeps citizens smiling.

Source: same App Store sentence as REQ-06-059, “firehouses.”

### Education

**REQ-06-064.** Education is split into elementary, secondary, and university. The named buildings are Elementary School, Secondary School, and University. The shop category is Education.

Source: string table, Gov `Elementary`, `Secondary`, `University`. Buildings `Names/53` “Elementary School,” `Names/51` “Secondary School,” `Names/54` “University,” `Categories/Education` “Education.”

**REQ-06-065.** Each level has its own coverage area and its own capacity stat. Coverage gives a residential income bonus only. It does not say it bonuses commercial or industrial income.

Source: string table, Willy `Influence/EduEle` — “covered by elementary education. It only takes effect on residential buildings and gives them an income bonus.” `Influence/EduSec` and `Influence/EduUni` use the same pattern for secondary and university. BPBi `BPEduCapEle` “Elementary Capacity,” `BPEduCapSec` “Secondary Capacity,” `BPEduCapUni` “University Capacity,” `LAEduHasEle` “Elementary Area,” `LAEduHasSec` “Secondary Area,” `LAEduHasUni` “University Area.”

**REQ-06-066.** A separate education-facility influence improves education facilities inside the marked area and has no effect on other buildings.

Source: string table, Willy `Influence/EduBonus` — “Education Facilities improve within the marked area. It has no effect on other buildings.”

**REQ-06-067.** Unlocking bus stops tells the player that bus stops extend school catchment areas, and that they do this only while the needed school capacities are covered. Otherwise the bus stops become inactive.

Source: string table, Willy `Unlock/Busstop1` “You unlocked Bus stops!” and `Unlock/Busstop2` — “Bus stops extend the catchment areas of your schools. They only do so when the needed schools capacities are covered, and otherwise they get inactive.” Buildings `Names/164` “Busstop.”

**REQ-06-068.** When elementary schools are full, the alert says bus stops are disabled. When secondary schools are full, it says bus stops are disabled for secondary. When universities are full, it says bus stops are disabled. The secondary alert spells the building “highscools.”

Source: string table, Willy `Alert/EduEleFull` — “Your elementary schools are full! Bus stops disabled.” `Alert/EduSecFull` — “Your highscools are full! Bus stops disabled for secondary.” `Alert/EduUniFull` — “Your universities are full! Bus stops disabled.”

**REQ-06-069.** City upgrades improve elementary schools, secondary schools, and universities, each by an unknown percentage.

Source: string table, Upgrades `EduLvl_Elementary_Head1` “Improve Elementary Education,” `EduLvl_Secondary_Head1` “Improve Secondary Education,” `EduLvl_University_Head1` “Improve University.”

**REQ-06-070.** A player on 20 Aug 2022 still saw “Elementary” or “Secondary” warning icons after the map was covered by school zones, and was told to upgrade schools or build more schools because capacity was short. The same answer says locations are not a factor if bus stops cover the residential areas. The unlock text in REQ-06-067 says schools have catchment areas that bus stops extend. Both are kept.

Source: https://www.chaptercheats.com/qna/iphone-ipod/556358/super-citycon-build-a-city-3d-answers/245121 — “you don't have enough capacity for the population levels. You will need to upgrade the schools to increase the capacity or build more schools. The locations aren't a factor as long as you have bus stops to cover the residential areas.”

**REQ-06-071.** A building can require a minimum resident IQ average to unlock, and a placed building can say residents need a higher IQ to run it. The required average is `{[VAL]}` and is UNKNOWN. No source says schools raise IQ.

Source: string table, UI `Dialogs/LockIQNeed` — “Your residents must have an IQ average of {[VAL]} to unlock this building.” Buildings `Others/Status_IQ` — “Your residents need a higher IQ to run this building.” BPBi `BPEduLvlMinIQ` “Minimal IQ required.”

### Local influences and pollution

**REQ-06-072.** Tapping the minimap opens science view, also written Sciview. Tapping it again closes it. The healthcare tutorial places the minimap at the top right. Science view shows local influences that exist on the current map.

Source: FAQ — “Tap the minimap to enter science view. The right bar lets your choose between all on this map exisiting local influences to visualize them. Tap the minimap again to exit science view.” Healthcare video — “you open science view by clicking the mini map in the top right.” Willy `Tutorial/Sciview1` — “In Sciview you can check various local influences on your cities.”

**REQ-06-073.** The right-hand bar switches among the influences that exist in the current city. A question mark explains the selected influence. The minimap draws the influenced areas.

Source: string table, Willy `Tutorial/Sciview3` — “Use the bar on the right side to switch between all influences that exist in your current city.” `Tutorial/Sciview4` — “Tapping the questionmark will give you details of the currently selected influence.” `Tutorial/Sciview5` — “The minimap also shows the influenced areas.”

**REQ-06-074.** Influencer buildings are shown in orange. A short tap highlights that building’s area. The player can keep building and editing in science view and see the coverage change.

Source: string table, Willy `Tutorial/Sciview6` — “The orange buildings are the influencers. Short-tap one to highlight it's area.” `Tutorial/Sciview7` — “You can also build and edit buildings while being in Sciview to get a real-time preview!”

**REQ-06-075.** The lesson’s selectable influences, when they exist, include Farm Area, the pooh icon for pollution, Food Bonus, a residential income bonus, and separate commercial and industrial income bonuses. The influence sheet also explains elementary, secondary, and university coverage, the education-facility bonus, fire protection, healthcare, security, and street-connection influence.

Source: string table, Tutorials `Tuto11-2b`, `Tuto11-6c`, `Tuto11-10d`, `Tuto11-11b`, `Tuto11-12b`. Willy `Influence/FarmArea`, `Influence/Pollution`, `Influence/FoodBonus`, `Influence/ResIncBonus`, `Influence/ComIncBonus`, `Influence/InduIncBonus`, `Influence/EduEle`, `Influence/EduSec`, `Influence/EduUni`, `Influence/EduBonus`, `Influence/Fire`, `Influence/Health`, `Influence/Security`, `Influence/StreetConInflu`.

**REQ-06-076.** Residential, commercial, and industrial income bonuses apply only to buildings of that type inside the marked area.

Source: string table, Willy `Influence/ResIncBonus` — “Residential Buildings within the marked area get an income Bonus.” `Influence/ComIncBonus` and `Influence/InduIncBonus` say the same for commercial and industrial buildings.

**REQ-06-077.** Street-connection influence gives residential buildings inside the marked area a street connection. A building that is too far from a street shows that status. While being moved, it turns orange until it is close enough, and a hint says to move it closer to the street or to the muddy road.

Source: string table, Willy `Influence/StreetConInflu` — “Residential Buildings within the marked area get street connection.” Buildings `Others/StatusStreet` — “Building is too far away from street.” Tutorials `Tuto8-3a` through `Tuto8-3d`, as recorded in the UI slice. Willy `Hint/StreetDistance` — “Move the building closer to the street.”

**REQ-06-078.** A polluted area is one residents do not want to live in. A hovering pooh icon marks polluted housing. The alert says affected residential buildings get no residents, and tells the player to keep distance from factories that cause pollution. The lesson’s factories are the sawmill and the landfill.

Source: string table, Willy `Influence/Pollution` — “This area is polluted. Residents do not want to live in polluted areas.” `HoverIcon/PollutedRes` — “A residential building is affected by pollution!” `Alert/PollutedResidential` — “Some of your residential buildings are affected by pollution and get no residents. Make sure to keep distance to factories that cause pollution!” Buildings `Others/StatusPolluted` — “Residents don't want to live in polluted areas.” Tutorials `Tuto11-7b`. Buildings `Names/78` and `Names/205` “Sawmill.”

**REQ-06-079.** The map has a pollution stat labeled “Map Pollution” and a “Pollution Area.” How the area is measured is UNKNOWN.

Source: string table, BPBi `BPPollution` “Map Pollution” and `LAPollution` “Pollution Area.”

**REQ-06-080.** If the map does not have enough influencer buildings, the science-view tutorial is unavailable and tells the player to try later.

Source: string table, Willy `Tutorial/SciviewNotAval` — “you don't have enough influence buildings or they are disabled, try later!” `Hint/TutReqSciView` — “Not enough influencers in your map now. Try again later.”

**REQ-06-081.** Colors for influences other than healthcare are UNKNOWN. Healthcare’s green and white are in REQ-06-050. Orange for the influencer building is in REQ-06-074. The influence sentences do not name a color.

Source: Healthcare video, quoted in REQ-06-050. Willy `Tutorial/Sciview6`, quoted in REQ-06-074. Willy `Influence/FarmArea` through `Influence/StreetConInflu` name the areas and do not name a paint color.

### Happiness, leisure, and the residence bonuses

**REQ-06-082.** The current store text says the player keeps citizens happy by balancing services and leisure, and by managing utilities, leisure, city services, and the city budget. No store page prints a happiness formula.

Source: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 — “Maintain the perfect balance of services and leisure to keep your citizens smiling.” https://play.google.com/store/apps/details?id=com.benwilles.citybuilder — “Manage utilities, leisure, and city services to keep your citizens happy” and “balance your city budget.”

**REQ-06-083.** Version 2.0 adds a Happiness Measure, described as a satisfaction metric, and a Mayor Score. The screen that draws either one, and the formula for either one, is UNKNOWN. The February 2025 healthcare tutorial is the only source that ties one service to both, and only as “the full effect” and “the biggest effect.”

Source: https://web.archive.org/web/20240617064743/https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ — “Happiness Measure: Keep your residents happy with our new satisfaction metric” and “Mayor Score: Track your leadership skills with a new comprehensive score.” Healthcare video, quoted in REQ-06-051.

**REQ-06-084.** Version 2.0 replaces a hidden residence scaling of up to x10 with six bonuses that the post says can scale up to x15 together. The six names are Culture, Entertainment, Recreation, Wealth, Diversity, and Loyalty. They are calculated separately on each map. The post is dated before iOS 2.0 shipped and says “when they go live.” Whether the shipped numbers match the post is UNKNOWN.

Source: https://web.archive.org/web/20241213091112/https://supercitycon.net/new-bonuses-for-residence-growth/ — “a hidden scaling mechanic that could boost your residence amount by up to x10” and “six new bonuses that together can scale up to x15” and “all these bonuses are calculated independently for each map.” The 2 Nov 2024 balance post names the same six.

**REQ-06-085.** Culture, entertainment, and recreation use the same rule. Some buildings give points in those categories. One point satisfies 1,000 residents. Full coverage is one point per 1,000 residents in that category and pays a 250% residence-growth bonus for that category. Which building gives which point is UNKNOWN.

Source: same post — “Each point satisfies the need of 1,000 residents” and “one point per 1,000 residents in each category” and “the maximum bonus of 250% for each category.”

**REQ-06-086.** A single-count bonus building pays its culture, entertainment, or recreation bonus once per map, even if the player builds more than one. It shows a culture icon with an orange checkmark. A multi-count building pays again for every copy and shows a culture icon with a blue plus.

Source: same post — “contribute their bonus only once per map” and “the culture icon with an orange checkmark symbol” and “the culture icon with a blue plus symbol.”

**REQ-06-087.** Buildings that have wealth show one, two, or three dollar signs. Only those buildings count. The map’s wealth level is the average of those buildings. Wealth level 3 is a 250% residence-growth bonus. The bonus at wealth level 1 and level 2, and how the average is rounded, is UNKNOWN.

Source: same post — “one, two, or three dollar signs” and “The average wealth level of all such buildings” and “A wealth level of 3 equates to the maximum 250% bonus.”

**REQ-06-088.** Each unique building on the map is one diversity point and a 1% residence-growth bonus, up to 250%. More than eight of any single skyscraper-type building applies a penalty that reduces the diversity bonus. The penalty amount, and which buildings are skyscraper-type, is UNKNOWN.

Source: same post — “Each unique building on your map provides one diversity point, which translates to a 1% bonus” and “if you build more than eight of any single skyscraper-type building, you’ll face a penalty.”

**REQ-06-089.** Each day the player logs in adds one Loyalty Point, worth 1%, up to 250 points and a 250% bonus. Missing two consecutive days deducts loyalty points. How many points are deducted is UNKNOWN.

Source: same post — “Every day you log into the game, you’ll earn one Loyalty Point. If you miss two consecutive days, Loyalty Points will be deducted. You can collect up to 250 Loyalty Points, which will translate to a 250% bonus.”

**REQ-06-090.** The older store text names parks, sports venues, and entertainment hotspots as leisure the player builds to keep citizens smiling and to attract residents. Shop categories include Parks & Decoration, Sports, and Entertainment. Named examples in the March 2024 table include Citypark, Trevi fountain, Worldcup Stadium, and Sportsland. Their culture, entertainment, or recreation points are UNKNOWN.

Source: App Store sentence in REQ-06-059. Buildings `Categories/Parks & Decoration`, `Categories/Sports`, `Categories/Entertainment`, `Names/141` “Citypark,” `Names/277` “Trevi fountain,” `Names/185` “Worldcup Stadium,” `Names/309` “Sportsland.”

**REQ-06-091.** The happiness measure is a separate named metric from the six residence bonuses. No opened source gives a number for how a missing power plant, a full school, or a polluted house changes that metric. The healthcare tutorial is the one service sentence that names happiness.

Source: May 2024 post — “Happiness Measure” is its own bullet, and “Culture, Entertainment & Recreation” and “Wealth, Diversity, and Loyalty” are separate bullets. Healthcare video, quoted in REQ-06-051.

### Service links between maps

**REQ-06-092.** Sea wires connect energy supply across maps. The player is told to build one on each map to connect.

Source: string table, Willy `Unlock/SeaWire1` “You unlocked Sea wires!” and `Unlock/SeaWire2` — “Sea wires can connect your energy supply of multiple maps. Build one on each map you want to connect.”

**REQ-06-093.** Water pipelines connect water supply across maps, with the same one-per-map instruction.

Source: string table, Willy `Unlock/WaterPipeline1` “You unlocked water pipelines!” and `Unlock/WaterPipeline2` — “Water pipelines can connect your water supply of multiple maps.”

**REQ-06-094.** Harbors connect food supply and waste management across maps, with the same one-per-map instruction. A blocked ship route is a separate alert and is handed off.

Source: string table, Willy `Unlock/Harbor2` — “Harbors can connect your food supply and waste management of multiple maps. Build one on each map you want to connect.”

**REQ-06-095.** A September 2022 player asked what the energy seawire and the water pump do, and the thread has no answer. The later unlock text answers the seawire. What one Waterpump produces, alone, is still UNKNOWN.

Source: https://www.reddit.com/r/supercitycon/comments/xd6dd7/hi_what_is_the_point_of_the_energy_seawire_and/ — the question is the whole post; the only comment is another player asking if anyone found out.

## 4. Stages, options, and complexity this slice actually supports

Sourced stages and options, with no extra stages added:

- Supply bars start locked and turn on as the city progresses. The level that enables them is UNKNOWN.
- Energy plants named in March 2024: wind on land, wind offshore, coal, nuclear, solar, plus a sea wire that links maps. Green and non-renewable production are separate upgrades.
- Water buildings named: waterpump, watertower, water pipeline. Sewage is a player’s word and is not a table entry.
- Food chain: fields, then animals that eat plants, then a food factory that eats both. Farm area is a barn’s marked area. Silo bonus is 25% before 2.0 and 10% in the 2.0 post.
- Waste buildings named: landfill, waste incineration, recycling station. Low trash asks for another landfill. Critical trash has no extra instruction.
- Healthcare: medical center and upgradeable hospital, plus a pharmacy name. Capacity and local coverage are both shown. Quality is an upgrade and a label.
- Police names: police station, police office, special police. Fire names: fire station, fire dept. Each has one coverage influence and one upgrade.
- Education: elementary, secondary, university, each with capacity, an area, and an income bonus for homes only. Bus stops extend catchment and switch off when capacity is not covered.
- Pollution removes residents from affected homes and reduces farm output. The lesson’s sources are the sawmill and the landfill.
- Leisure bonuses: culture, entertainment, and recreation, each up to 250% at one point per 1,000 residents, with single-count and multi-count icons. Wealth, diversity, and loyalty use the published caps in REQ-06-087 through REQ-06-089.
- Cross-map links exist for energy, water, and for food plus waste. They do not say healthcare, police, fire, or education cross a map border.

## 5. Contradictions

1. **Service names.** The basics narration says electricity and police. The March 2024 table says Energy and Security, and the police alerts say “Police.” REQ-06-001 and REQ-06-002.
2. **Healthcare reward.** The March 2024 influence text says an income bonus. The February 2025 tutorial says happiness and mayor score. REQ-06-051 and REQ-06-052.
3. **School placement.** The 2022 player answer says school location does not matter if bus stops cover homes. The unlock text says schools have catchment areas and bus stops extend them. REQ-06-067 and REQ-06-070.
4. **Supply-bar meaning.** The lesson text says a taller supply bar means more of that supply is in use, and tells the player not to run out. A gaps note attributed “a full bar means the city needs more” and the readings 82% food and 56% energy to the basics video. Those sentences are not in the indexed transcript of that video. They are not requirements.
5. **“Clinic,” crime, and maintenance.** The Aug 2025 article on the official domain says a missing clinic, school, or park makes citizens unhappy, raises crime and fire risk, and lowers population, and that fast expansion leaves too little money for maintenance. The string table’s fire and police failures are “build more,” and its healthcare buildings are hospital, medical center, and pharmacy. That article is not used as a requirement.
6. **Sewage.** A 2026 player says they upgraded sewage. The March 2024 sheets do not name it. REQ-06-025.
7. **Poo icon.** Common Sense, 2022, says a poo icon exists. The 2024 lesson uses a pooh icon for pollution. Whether they are the same control is UNKNOWN. REQ-06-045.
8. **Bonus numbers at ship.** The residence-bonus post says the rules apply “when they go live.” iOS 2.0 had not shipped on the post’s date. REQ-06-084.
9. **Building counts in store blurbs.** Kotaku says over 150 buildings. An older App Store text says over 180. The current listing says over 300. Those counts are not a service catalog. The names in this slice are the March 2024 strings, not a claim that the list is complete.

## 6. Unknowns

- Every `{[PERC]}`, `{[VAL]}`, radius, price, job count, and consumption rate on a service building.
- The happiness formula, the mayor-score formula, and where either number is drawn.
- Whether full healthcare coverage requires both 100% capacity and a fully green map, or only the coverage the tutorial points at.
- The healthcare vehicle’s name and effect.
- What a low or empty energy, water, food, or trash supply does besides the alert and the advice line.
- Whether any power plant pollutes, and the pollution distance of a sawmill or landfill.
- What sewage is, if it is still in the game.
- What Waterpump, Watertower, Waste Incineration, Recycling Station, Pharmacy, and Special Police each change.
- Fire-danger and security numbers, and whether a fire or a crime is ever shown.
- Whether schools change IQ or lifespan. Both labels exist. Only the IQ unlock gate is described.
- Wealth bonus at levels 1 and 2, the diversity penalty, the loyalty deduction, and which buildings pay culture, entertainment, or recreation points.
- The farm-bonus cap announced in May 2024.
- Spoken rules in the nine service tutorials whose captions were not retrieved.
- Whether the Aug 2025 “common mistakes” article matches any current screen. It was not used.

## 7. Handoff

- Button positions, the hover-icon setting, and mailbox chrome: UI slice. This slice uses the service labels and the alert sentences.
- Construction slots, including the “2 slots needed” warning on power plants and the hospital: construction slice.
- Coin and supercash prices, tax upgrades, and income math beyond the service influence text: economy slice.
- Which building unlocks at which resident count, including the IQ gate’s number: progression slice.
- Road types and the street-connection distance: roads slice. The “too far from a street” status is recorded here only as a service failure.
- Ship routes, monorail loops, and traffic: transport slice. The harbor’s food and waste link stays here.
- Zoo enclosures: add-ons slice. Farm animals that produce food stay here.
- The four high-score categories and the mayor-score formula: rankings slice.
- A complete building list past the March 2024 names used above: buildings slice.
