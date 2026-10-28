# Library selection — 28 October 2026

Used the existing Image/Minimax library and Gamekit doctor before integration. Refreshed an offline cache from existing catalogues: 34 packs, 1,994 3D records and 114,852 2D records; no bulk archive scans or downloads. This is indexed coverage, not a claim that all release bytes were visually inspected.

Targeted child, classroom, school and desk searches returned no indexed matches. Character and furniture searches identified the existing Quaternius/Kenney/KayKit families. Existing teacher.glb, kid-a.glb and kid-b.glb are self-contained animated models with 17 clips, including Idle, Walk, Victory, SitDown and StandUp. Existing room and desk GLBs are reusable, coherent with the current game, and already staged. No superior verified replacement was found, so no duplicate art was imported.

Quaternius licence evidence names the correct character pack and states CC0. The Kenney licence sidecar currently names Castle Kit while the furniture assets are described as Furniture Kit: exact furniture provenance needs reconciliation, even though both are described as CC0 in the library. Do not present the mismatch as resolved.

The models used for pupils have adult proportions. Uniform scale does not turn them into child models. Several beat props are labelled stand-ins; a torch is not a flashlight. Retain these honest gaps until matching, import-approved assets are located. The primary library README explains that most binaries are separate GitHub Release attachments, not part of its ordinary Git checkout.

## Additional verified prop

Integrated exact CC0Tree SM_Flashlight FBX from `cc0tree.zip::cc0tree/All Models/Electronics/SM_Flashlight.fbx`, Gamekit ID `model-770fa174415b8efd`. Existing preview inspected; SHA256 `29fda62cbb272e83afa8cdf34aae0756b32f4e2dee67e84922bfe2d268e9dee8`. Asset and CC0 licence are shipped; local Three FBXLoader added. This replaces the former torch stand-in as primary choice, with the old model retained as load fallback. Browser import is checked separately. Mailbox candidate was indexed but its registered file was missing; no unverified replacement shipped.

Classroom dressing reuses existing self-contained props/desk.glb, props/chair-desk.glb, props/books.glb, props/lamp-table.glb and room/bookcase-open.glb. No new downloads or generated images. Three study desks occupy the left edge; game paths remain clear. Existing provenance limitations above still apply.
