---
cursor:
  subagentId: "bc-d7166206-29c9-5a2a-84c5-5ab9f5178a93"
---

# Slice 07 — Roads, transport, terrain, camera, views

Player-facing requirements for the live Super Citycon city builder from Ben Willes Games (iOS, Android, and the PC/Mac availability claimed for that same game). This is not an engineering design.

Slice 01 already records the zoom that opens street view, satellite view, and skyview, the fact that a dragged building snaps to a street, and that a muddy road does not connect. This slice keeps those facts and adds the road catalog, monorail, canals, camera modes, and what the player can do after a view opens. Where a sentence is the same fact, the slice 01 id is named.

Nothing below is filled in where a source is missing.

## 1. Scope of this slice

In scope:

- Placing and removing streets, the street choices the tutorial shows, muddy roads, paving, intersections, and how a building gets a road connection.
- The Amsterdam cobblestone path and canals, and the monorail.
- Whether a road or the monorail is said to cross from one map to another.
- Perspective versus orthographic camera, orbit mode as a camera state, the minimap, science view, street view / walk mode, and region navigation from skyview.
- Day and night or weather only if a live-game source describes them. None does, so they stay in unknowns.

Out of scope, except as a handoff or an exclusion:

- Construction slots, sandbox, map reset, account reset, and what a wiped map does to buildings. Slice 01.
- Which local influences exist, and what electricity, water, and the other government overviews do.
- Prices, the Amsterdam building list, and the plaza as a placeable object.
- Steam app 3474890 (Sunapie Games, listed Q4 2026, SCC Studio, Workshop). That page’s bridges, tunnels, railways, “raise the land,” day and night, weather, and first- and third-person modes are a different product. They are named here only so they are not copied into live requirements.

The public site `https://supercitycon.net/` on 23 October 2026 was an under-construction page (“Shape the land, lay the first road…”, “Day becomes night and the windows light up,” and a file named `bridge.webp`). Slice 01 does not use that page as gameplay. This slice does not either. Older articles were read from the Wayback Machine because the live FAQ and article URLs returned 404.

## 2. Sources used

Official and store:

- App Store, Ben Willes Games SL, app id 1607860732, US listing read 23 October 2026, including version history: https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
- Google Play, `com.benwilles.citybuilder`, including the 2 November 2024 developer reply on landscape and street view: https://play.google.com/store/apps/details?id=com.benwilles.citybuilder
- Developer post, 28 June 2023, street view (Wayback): https://supercitycon.net/street-view-walk-your-cities/
- Developer post, 28 June 2023, Monorail add-on (Wayback): https://supercitycon.net/monorail-addon/
- Developer post, 20 May 2024, orthographic camera and Region View (Wayback): https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/
- Developer post, 2 November 2024, skyview map switching (Wayback): https://supercitycon.net/balance-updates-in-2-0-for-ios-players/
- Developer post, 24 February 2025, Amsterdam canals and cobblestone path (Wayback): https://supercitycon.net/super-citycon-amsterdam-add-on/
- FAQ, street view, Sat-view, science view (Wayback; live URL 404): https://supercitycon.net/faq/
- Pocket Gamer, 4 March 2025, region view and street view: https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/
- Gamezebo, 5 March 2025, walk mode and monorails: https://www.gamezebo.com/news/super-citycon-is-a-voxel-city-builder-that-encourages-total-creative-freedom/
- Steam app 3474890, exclusion only: https://store.steampowered.com/app/3474890/SuperCitycon/

Developer tutorial and developer posts:

- “Super Citycon: The Basics,” Ben Willes Games. Transcript as indexed; timed captions could not be retrieved, so quotes have no timestamps: https://www.youtube.com/watch?v=jYAD0SkDmY0
- BenWillesGames on r/MagicaVoxel, monorail gives a street connection, 22 June 2023: https://www.reddit.com/r/MagicaVoxel/comments/14fxfk6/our_voxelgame_super_citycon_monorail_its_not_only/

Player and review reports used only where they state a player-facing fact:

- Common Sense Media review of iOS version 1.4.13, last updated 20 September 2022, muddy-to-paved, intersections, and road distance: https://www.commonsensemedia.org/app-reviews/super-citycon
- r/supercitycon, how to delete a road, reply by teddwestside, 16 May 2025: https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/
- Google Play review by Kurt, 1 November 2024, asking for a street-view field-of-view fix and city lights. The developer reply is a source. The request itself is not a feature.

Rejected as a requirement source: the 20 August 2025 article “Common mistakes when building your city” on supercitycon.net. It tells the player to use main roads, local streets, roundabouts, and one-way streets. Slice 01 already rejected it. The tutorial, FAQ, and store text do not describe those tools.

A June 2022 Mobile Gaming Hub guide says houses and facilities need a road connection, which the tutorial and Common Sense Media also say, and that an ad can “fast forward the day.” The day claim is not corroborated and is not a requirement. https://mobilegaminghub.com/super-citycon-tips-and-tricks-to-build-a-beautiful-city/

Droid Gamers, 6 March 2025, repeats a bird’s-eye view and a civilian walk, then points the unlimited version at Steam. It is not used for a live tool the other sources do not already name. https://www.droidgamers.com/news/create-endlessly-in-super-citycon-a-game-that-mixes-townscaper-with-minecraft/

## 3. Requirements

### Placing and removing streets

**REQ-07-001.** Street building shows at least two choices. The tutorial never says their names.

> “you select one this or that one”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-002.** The player places a street by selecting one of those choices, tapping the map, and then tapping a direction the game is offering.

> “you select one this or that one you tap on the map and you will uh you will get a visual indicator of of every build that every direction that's possible and you tap there Bop and your streets will appear”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-003.** That indicator shows every direction in which a street can be built from the tapped spot. The tutorial does not call this a grid snap. The word “snaps” is used for buildings, in REQ-07-010.

> “a visual indicator of of every build that every direction that's possible”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-004.** The player removes a street from the inventory bulldozer, then taps the street. The tutorial calls the category “streets.” A player reply calls the control the road icon. Both describe the same path: bulldozer, then the road control, then tap.

> “to De demolish them as set enter the inventory um select streets and and you can simply tap them to remove them”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> “When you click on the up arrow to place something from your inventory, there is a bulldozer icon. Click that, then the road icon and delete away”
>
> https://www.reddit.com/r/supercitycon/comments/1kjcwip/how_do_i_remove_a_road_if_i_dont_like_where_it_is/ (teddwestside, 16 May 2025)

This is the object bulldozer in REQ-01-012, not the control that wipes a map.

**REQ-07-005.** The bulldozer has three categories that decide what a tap removes. Streets are one. The player can turn streets off so a tap does not remove them. Trees are another. The tutorial does not name the third.

> “you can choose three categories which essentially uh tells which things get bulldozed when you tap them so I will disable trees and streets”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

### Muddy roads, paving, intersections

**REQ-07-006.** The map can contain muddy roads. That is a name the developer uses while placing a building.

> “the muddy roads won't give Road connection uh to this building”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-007.** A building placed on a muddy road does not get a road connection. This is the same fact as REQ-01-010.

> “the muddy roads won't give Road connection uh to this building”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-008.** In the iOS build reviewed as version 1.4.13 (review last updated 20 September 2022), the player turns muddy roads into paved roads by tapping portions of them. The basics tutorial, which is later, still shows muddy roads and does not show this tap.

> “they can change muddy roads to paved ones by tapping on portions of them.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon (version 1.4.13, last updated 20 September 2022)

**REQ-07-009.** When the player joins three roads, the game creates the intersection. The review does not describe a separate intersection tool.

> “intersections, for instance, are created when you make a three-road junction.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

### How a building meets a road

**REQ-07-010.** Dragging a building snaps it to the streets.

> “you drag it there it automatically snaps to the streets”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-011.** Some structures have to be connected to a street. The review also states the general rule that road connection is a building requirement.

> “Some structures need to be connected to a street”
>
> “Certain building requirements apply, such as roads being connected.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-07-012.** Some structures may stand a few tiles away from the nearest road and still count. The review does not say how many tiles, or which buildings use this rule instead of REQ-07-011.

> “some can have a few tiles' distance from the nearest road.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-07-013.** Placing something too far from a road can hurt performance. Moving that object is how the player fixes it. The review does not say the object is deleted or that the city fails.

> “If you place something too far away from a road, for instance, it can affect your performance, but you can just move the item to correct the issue.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

**REQ-07-014.** Pressing and holding a building shows more information about it, including whether it is too far from something. The review does not name the something. Road distance is the only “too far” case that review describes.

> “Tapping and briefly holding your finger on a building will reveal additional information about it, including whether it's too far away from something.”
>
> https://www.commonsensemedia.org/app-reviews/super-citycon

### Cobblestone path and canals

**REQ-07-015.** The Amsterdam add-on includes a cobblestone path the player uses for streets and alleys. The post does not say whether that path gives the road connection in REQ-07-007 and REQ-07-011.

> “Enhance your city with charming streets and alleys using the cobblestone path included in this pack.”
>
> https://supercitycon.net/super-citycon-amsterdam-add-on/ (Ben, 24 February 2025)

**REQ-07-016.** The same add-on includes canals the player places freely, rather than a single fixed canal on the map.

> “this add-on also includes freely placeable canals, one of the most requested features from our community!”
>
> https://supercitycon.net/super-citycon-amsterdam-add-on/

**REQ-07-017.** Those canals come in two sizes, described as narrow passages and grand waterways. Widths are not given.

> “You can create your own canal system with two different canal sizes, allowing you to design everything from narrow water passages to grand waterways.”
>
> https://supercitycon.net/super-citycon-amsterdam-add-on/

The App Store history also names canals in the Amsterdam add-on note on the 2.1.7 line, 8 April 2025: “Build with beautiful Amsterdam-style buildings and canals, a brand-new feature in the game!” https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732

### Monorail

**REQ-07-018.** The monorail runs above the streets. It is an add-on, announced 28 June 2023.

> “The monorail system glides gracefully above the city streets”
>
> https://supercitycon.net/monorail-addon/

**REQ-07-019.** Building the monorail gives the surrounding buildings a street connection. The developer says it is not only decoration.

> “Building your Monorail allows you to build your city even more unique and gives street connection to your surrounding buildings”
>
> “it's not only for decoration!”
>
> https://www.reddit.com/r/MagicaVoxel/comments/14fxfk6/our_voxelgame_super_citycon_monorail_its_not_only/ (BenWillesGames, 22 June 2023)

**REQ-07-020.** The add-on post says the monorail replaces traditional street transportation and traditional street connections, and that the player integrates it from residential neighborhoods through commercial districts to industrial zones.

> “replacing the traditional street transportation.”
>
> “Replace the traditional street connections”
>
> “Seamlessly integrate the monorail system with existing transportation networks, from residential neighborhoods to commercial districts and industrial zones.”
>
> https://supercitycon.net/monorail-addon/

**REQ-07-021.** At the 28 June 2023 announcement, a map can have only one monorail loop. The same post says multiple lines were planned. No later source says that limit was lifted or that a second loop shipped.

> “Currently, you can only have one loop in a map, so build it wisely. We are planning on further extension with multiple lines.”
>
> https://supercitycon.net/monorail-addon/

**REQ-07-022.** The monorail is described as carrying passengers to destinations. Stops, fares, travel time, and a vehicle the player drives are not described.

> “allowing passengers to reach their destinations swiftly and comfortably.”
>
> https://supercitycon.net/monorail-addon/

Gamezebo, 5 March 2025, still tells the player to “Build monorails that stretch from one side of the city to the other.” It does not mention loops or stops. https://www.gamezebo.com/news/super-citycon-is-a-voxel-city-builder-that-encourages-total-creative-freedom/

### What this slice does not take from Steam

**REQ-07-023.** Bridges, tunnels, railways, and terrain shaping on Steam app 3474890 are not live-game requirements. No live FAQ, store feature list, or the basics tutorial describes a bridge tool, a tunnel tool, a conventional railway, or a control that raises land or shapes water.

> “SuperCitycon's flexible road system connects the city with different road types, bridges, tunnels and railways.”
>
> “Raise the land, shape the water”
>
> https://store.steampowered.com/app/3474890/SuperCitycon/

Those sentences stay on that page. The live road set that is actually sourced is REQ-07-001 through REQ-07-022.

**REQ-07-024.** No live source describes a road, a monorail, or a canal that leaves one map and enters another. Store text says the maps form one region of interconnected towns. Slice 01 REQ-01-033 already records that no source shows a road, a person, or a service crossing the border. This slice adds the monorail and the canal to that gap.

> “REGION VIEW: Seamlessly integrate multiple maps into one cohesive region. Design interconnected cities and landscapes.”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732
>
> “REGION VIEW: Connect multiple city maps into one region.”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder

### Camera

**REQ-07-025.** A control in the top left switches the camera mode.

> “in the top left uh you can switch the camera mode”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-026.** One mode is the perspective camera with tilt shift.

> “you can switch between the perspective camera with til shift and the autographic camera”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-027.** The other mode is the orthographic camera.

> “the autographic camera”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

The 20 May 2024 announcement uses the spelled name: “our new orthographic camera mode.” https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/

**REQ-07-028.** The orthographic camera shows a larger field of view than the perspective camera. The announcement also calls that view the classic city-builder look. It does not give an angle or a zoom multiplier.

> “autographic gives you a bigger field of view”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> “Enjoy the classic look and feel of old-school city-building games with a larger field of view.”
>
> https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/ (Ben, 20 May 2024)

**REQ-07-029.** Camera Mode shipped with version 2.0. The App Store history puts that sentence on 2.0.19, 14 December 2024, the same reading as slice 01. The May 2024 post announced it before that release.

> “Super Citycon 2.0 is here with exciting new features: a new Bonus Economy, Region View, Sandbox Mode, Zoo Addon, Camera Mode, new languages, and much more!”
>
> https://apps.apple.com/us/app/super-citycon-build-a-city/id1607860732 (version 2.0.19, 14 December 2024)

**REQ-07-030.** A long tap on a building enters orbit mode, a camera turned around that building. Rotate, move, and confirm are the edit actions in REQ-01-011. This slice only requires the orbit camera.

> “to edit a building you long tap a building and you will get into orbit mode”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

### Minimap and science view

**REQ-07-031.** Tapping the minimap enters science view. The tutorial says the same control “opens the science view.” Slice 01 REQ-01-037 states the open and close. The quotes are repeated here because this slice owns the view.

> “Tap the minimap to enter science view.”
>
> https://supercitycon.net/faq/
>
> “mini map opens the science view”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-032.** Inside science view, a bar on the right lists the local influences that exist on the current map, and the player chooses which of those to show. The FAQ does not name the influences. The tutorial’s government list (electricity, water, food, waste, healthcare, police, fire, education) is a different screen, REQ-01-017, and is not stated to be this bar.

> “The right bar lets your choose between all on this map exisiting local influences to visualize them.”
>
> https://supercitycon.net/faq/
>
> “that gives you access to to various details uh about uh local influences in your city”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-033.** Tapping the minimap again leaves science view.

> “Tap the minimap again to exit science view.”
>
> https://supercitycon.net/faq/

What the minimap draws before that tap — roads, the camera, or only a button — is not described.

### Street view and walk mode

**REQ-07-034.** The player enters street view, also called walk mode, by zooming in fully and then zooming in once more at the lowest point. Slice 01 REQ-01-036 treats this as a way of looking at the map, not a separate game mode.

> “Zoom in fully and then at the lowest point, zoom in again to enter street view.”
>
> https://supercitycon.net/faq/
>
> “Zoom in to the lowest point, and then zoom in again to enter street view.”
>
> https://supercitycon.net/street-view-walk-your-cities/ (Ben, 28 June 2023)
>
> “zoom in fully zoom in again enter the walk mode”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-035.** In that view the player walks and runs through the city, on the streets, from a person’s point of view. Store text also names parks and daily life as things the player sees up close.

> “you can run around your city”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0
>
> “Walk and become a part of your city as you navigate through its streets.”
>
> https://supercitycon.net/street-view-walk-your-cities/
>
> “STREET VIEW: Walk through your city in 3D. Explore parks, busy streets, and watch daily city life up close”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder

**REQ-07-036.** Walk mode has an exit button that returns the player to the city view.

> “push the exit button to get back”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-037.** Settings include a control for how sensitive first-person mode is. The developer says the useful setting can differ by device.

> “open the settings and you will find options to modify how sensitive um the first person mode is depending on your device that may differ a little bit”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-038.** In street view the player can jump onto cars and ride them, and can scale buildings with high jumps. The same post says the physics are loose on purpose. Cars are therefore present on the streets in that view. Traffic rules, lanes, and destinations are not described.

> “Physics hasn’t been taken too seriously, allowing you to jump on cars and take a ride through your city and scale buildings with high jumps to get an even better view.”
>
> https://supercitycon.net/street-view-walk-your-cities/

**REQ-07-039.** Walk mode is not supposed to begin inside a building. In the tutorial it did, and the developer called that abnormal.

> “now we started inside the building um that should normally not happen”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-040.** The phone build supports landscape orientation. The developer recommends landscape for street view. A player had asked for a street-view field-of-view fix. The reply does not describe a field-of-view slider. The sensitivity control in REQ-07-037 is the only first-person setting the tutorial names.

> “the game already supports landscape mode, which i recommend using for street view—it looks and feels much better compared to portrait mode.”
>
> https://play.google.com/store/apps/details?id=com.benwilles.citybuilder (Ben Willes Games, 2 November 2024, replying to Kurt, 1 November 2024)

### Satellite view, region view, and skyview

**REQ-07-041.** The FAQ says the player enters Sat-view by zooming out until the city is seen from above, then zooming out once more. Zooming in leaves Sat-view and returns to regular 3D mode. This is REQ-01-035.

> “Zoom out fully so you see your city from a birds perspective, then zoom out again to enter Sat-view. To exit Sat-view, simply zoom in and you will get back into the regular 3D mode.”
>
> https://supercitycon.net/faq/

**REQ-07-042.** The basics tutorial uses that same zoom-out-twice gesture and calls the result region view. There the player switches maps or looks across the maps already built in the first region. After a short wait, lines on that view fade so the picture is clear. The tutorial does not say what the lines are.

> “zoom out fully and zoom out again to enter the region view uh that's a place where you can switch Maps or get an overview um across all of your currently built settings for the first region in game wait a second to make the lines fade off so you got a nice and clear picture of everything”
>
> https://www.youtube.com/watch?v=jYAD0SkDmY0

**REQ-07-043.** From version 2.0, the player changes which map section they are working on by zooming out to skyview. The 2 November 2024 post says the old menu used only for that switch is gone. The maps window in the top left still exists for a one-map reset (REQ-01-038). Switching and resetting are not stated to be the same control.

> “Gone is the old, clunky menu-based navigation! Instead, you’ll now be able to zoom out to a skyview, making it effortless to switch between different sections of your city.”
>
> https://supercitycon.net/balance-updates-in-2-0-for-ios-players/ (Ben, 2 November 2024)

**REQ-07-044.** Region View shows all of the player’s maps together as one region, and the player explores that region from Skyview. The May 2024 post announced it. The 2.0.19 note in REQ-07-029 lists Region View as shipped. Store pages still describe it as connecting the maps into one region. Pocket Gamer, 4 March 2025, says the player uses it to integrate multiple maps, and street view to walk one creation.

> “Now, all your maps are combined into one massive region that you can explore from Skyview.”
>
> https://supercitycon.net/exciting-updates-coming-soon-to-super-citycon/
>
> “The former will have you integrating multiple maps with interconnected cityscapes, while the latter lets you stroll through your own creation and experience it first-hand.”
>
> https://www.pocketgamer.com/super-citycon/out-now-on-ios-and-android/ (4 March 2025)

No sentence says Sat-view, Skyview, and Region View are one view or three. See contradictions.

## 4. Stages, options, and complexity this slice actually supports

Only changes that alter roads, transport, or the camera are listed.

| When | What the sources support |
| --- | --- |
| 20 September 2022 review of version 1.4.13 | Muddy roads can be tapped into paved roads. A three-road junction becomes an intersection. Some buildings must touch a street. Some may sit a few tiles away. Being too far from a road hurts performance and can be fixed by moving the object. |
| 22 and 28 June 2023 | Monorail add-on: elevated, one loop per map, gives surrounding buildings a street connection, described as replacing street connections. Multiple lines are a plan, not a shipped feature in that post. Street view ships the same day: zoom in twice, walk the streets, jump on cars, climb with high jumps. |
| 20 May 2024 announcement | Orthographic camera with a larger field of view. Region View explored from Skyview. Not yet the release. |
| 2 November 2024 | Version 2.0 map switch is zoom-out to skyview. Menu-only switching of map sections is described as gone. Android already has 2.0. iOS is said to follow within 14 days. |
| 14 December 2024, version 2.0.19 | App Store note lists Region View and Camera Mode among the 2.0 features. The basics tutorial shows both the orthographic switch and the zoom-out region view, and still shows muddy roads. |
| 24 February 2025 post, and the 2.1.7 store note of 8 April 2025 | Amsterdam add-on: cobblestone path, freely placed canals in two sizes. |
| 16 May 2025 | A player still removes a road with the inventory bulldozer and the road icon. |

Options the sourced game supports at once:

- At least two unnamed street choices, placed by tapping a shown direction, and removed with the street or road bulldozer category.
- A muddy road that does not connect a building. In the 2022 review, tapping a portion paves it. Whether that tap still works after 2022 is not re-shown.
- An automatic intersection at a three-road junction.
- A cobblestone path and two canal sizes, if the player has the Amsterdam add-on.
- One monorail loop on a map, if the player has the monorail add-on, as of the 2023 post.
- Perspective with tilt shift, or orthographic with a wider view.
- Regular 3D, science view from the minimap, street view by zooming in twice, and a zoom-out-twice view that the FAQ calls Sat-view and the tutorial calls region view.
- From 2.0, skyview as the way to change map section.

No source gives a road price, a width, a speed, a lane count, a pave cost, or a monorail price.

## 5. Contradictions

1. **Sat-view, region view, and Skyview.** The FAQ: zoom out twice to enter Sat-view, and zoom in to return to regular 3D. The tutorial: that gesture enters region view, where the player switches maps, and lines fade. The May 2024 post: Region View is explored from Skyview. The November 2024 post: zoom out to skyview to switch map sections. No sentence says these are one view or three. Slice 01 contradiction 5 is the same gap. REQ-07-041 through REQ-07-044 keep each wording.

2. **Monorail replaces streets, or adds a street connection.** The add-on post says the monorail replaces traditional street transportation and traditional street connections. Six days earlier the developer said building it gives surrounding buildings a street connection. Both can mean “the monorail counts as the connection a street would give.” Neither says the monorail deletes roads that are already down. REQ-07-019 and REQ-07-020 both stand.

3. **Must touch the street, or may sit a few tiles away.** Common Sense Media says both, for different structures, and does not say which buildings are which. The tutorial only shows the failure case: a muddy road does not connect. The 2022 guide says houses, commercial buildings, and facilities need a road connection. That guide is not used as a stricter rule than the review.

4. **“Affect performance” versus “cannot function.”** The 2022 review says being too far from a road affects performance and is fixed by moving the object. The Mobile Gaming Hub guide says houses and facilities cannot function without a road connection. The tutorial only says a muddy road does not give a road connection. The review is the requirement (REQ-07-013). The guide is not.

5. **Tap-to-pave versus a later tutorial that never paves.** The September 2022 review says the player taps muddy portions to pave them. The basics tutorial, after version 2.0, still points at muddy roads as non-connecting and does not demonstrate the tap. Both are recorded. REQ-07-008 is dated to that review.

6. **Roundabouts and one-way streets.** The August 2025 “Common mistakes” article on the official site recommends them, plus main roads and local streets. The tutorial’s street control is “this or that one,” with no names. That article is not a requirement. Slice 01 contradiction 12 is the same rejection.

7. **Two rails in a monorail clip.** A comment on 22 June 2023 says the clip shows two rails. The developer did not answer. The feature name in the post and the title remains Monorail. The comment is not a second transport type.

8. **Street-view field of view.** Kurt asked, on 1 November 2024, to fix the street-view field of view and suggested city lights. The developer answered landscape versus portrait and did not describe a field-of-view control or city lights. REQ-07-040 is the reply, not the request.

9. **Homepage bridge and sunset versus the live tutorial.** The 23 October 2026 homepage is under construction and shows `bridge.webp`, “Shape the land,” and “Day becomes night.” The live tutorial, FAQ, and store feature list do not describe a bridge tool, a terrain brush, or a day-night cycle. The homepage is not a requirement. Steam’s bridges and weather are excluded by REQ-07-023.

## 6. Unknowns

- The names, widths, speeds, lane counts, and prices of the two street choices in REQ-07-001. Also unknown: whether either choice is the muddy road, the paved road, or the cobblestone path.
- Whether roads may be drawn freehand, on a diagonal, as a curve, or only along the directions in REQ-07-003. The word “snaps” is not used for the road tool.
- Whether a new street is placed already muddy, and whether the 2022 tap-to-pave still exists. The later tutorial does not show it.
- What “paved” changes besides the look: speed, connection, or services. The only connection rule stated for a road type is that a muddy road does not connect.
- Intersection rules other than a three-road junction: four-way, roundabout, one-way, traffic lights, or stop signs. Not sourced. The “Common mistakes” article is not evidence.
- How many tiles “a few” is in REQ-07-012, and which buildings must touch the street.
- Whether the cobblestone path or a canal gives a road connection, blocks a road, or needs a bridge. No bridge tool is sourced for the live game.
- Canal width in tiles, whether canals hold boats, and whether they cost coins.
- Whether the one-loop monorail limit is still in force, and whether multiple lines shipped after June 2023. Stations, a timetable, a fare, and a monorail price are not sourced.
- Whether the clip’s two rails are a second track type. The developer did not say.
- A player tool for bridges, tunnels, conventional rail, or terrain editing (raise, lower, paint water, or a terrain set) in the live game. Steam names them. The live sources used here do not.
- What a one-map reset does to roads, canals, and the monorail. Slice 01 already notes that sources only keep the buildings.
- Whether the orthographic camera changes how streets are placed, or only how much of the map is visible.
- What “tilt shift” changes besides the name of the perspective camera. A dedicated camera video is mentioned in the tutorial and was not found.
- What the minimap shows before it is tapped.
- The names of the local influences on the science-view bar.
- Whether Sat-view, Skyview, and Region View are the same zoom. Whether street view or that zoomed-out view can move from one map into the next.
- What the lines are that fade in the tutorial’s region view, and how the player picks the next map once skyview is open (tap a map, a button, or something else).
- Walk-mode controls other than running, the exit button, jumping onto cars, high jumps, and the sensitivity setting. No virtual stick is described.
- A field-of-view slider. The November 2024 reply does not add one.
- A third-person mode in the live game. Steam names first- and third-person. The live names are street view, walk mode, and first-person sensitivity.
- Day, night, weather, and city lights as a visible cycle in the live game. A 2022 guide’s “fast forward the day” ad is not corroborated. A 2024 player asked for city lights and was not told they exist. The under-construction homepage and the Steam page mention night and weather. None of those is a live control in this slice.
- Traffic simulation: routes, congestion, deliveries, or whether the cars in street view follow roads outside that view. A 2024 review mentions tapping vehicles for supercash. That earning rule is an economy handoff, not a road rule.
- Any road or camera rule that differs on the PC or Mac build of this game. Slice 01 REQ-01-050 already says no source describes a different ruleset.

## 7. Handoff

- **Slice 01 — loop, modes, maps.** Map reset, storage versus inventory, whether wiped roads are kept, construction slots, and sandbox. This slice only uses the skyview switch and the maps window as the place reset still lives.
- **Services and coverage.** The science-view influence names, and the government overviews for electricity, water, food, waste, healthcare, police, fire, and education. This slice only requires the minimap entry and the right-hand bar.
- **Buildings and add-ons.** Amsterdam’s 14 buildings and the cobblestone plaza, monorail and Amsterdam prices, and which buildings must touch a street versus which may sit a few tiles away.
- **Economy.** Supercash from tapping vehicles, and any ad that is claimed to fast-forward the day.
- **Bulldozer, beyond streets.** The unnamed third category, and whether a bulldozed street is destroyed or stored.
- **Tasks.** Any mailbox task that asks for a road, a canal, or a monorail. None is quoted here.
