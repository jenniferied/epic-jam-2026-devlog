---
title: builds.log
slug: builds
order: 9
date: 2026-11-14
day: builds
phase: jam
status: live
cover: assets/img/builds-cover-branches.jpg
cover_alt: The branch-history timeline in the game's end credits
cover_caption: Builds — the branch history in the game's end credits. *
summary: Every build of the jam so far, with the branches, features and fixes that went into it.
---
```recap
**What this is:** a generated page, not a diary entry. A script reads the game repository (tags, merges, branches) and the build notes and redraws this after every integration. Last run Sun 15.11. 22:58, latest build 0.12.0. The short texts are AI summaries of the build notes.
```

Each agent works on its own branch. Only the orchestrator merges, and a build is what came out of one integration. Every branch of the jam has one row, grouped by area: the bar runs from the fork to the last merge, the label after it names the build it shipped in, dashed bars were never merged. Vertical lines are builds. Each day entry shows the same chart cut to that day.

```embed
builds.html | All branches of the jam by area, with the builds they shipped in. Scroll the chart sideways; hover or tap a row or build. | 2600
```

## Build 0.14.2 (in progress)
```specs
when: Sun 15.11. 22:49
commit: in progress / c25e948
branches: 164
```

**Branches:** `b09-headwear`, `b1-scars`, `b1-loadinglive`, `b1-credits2`, `b1-dress2`, `b1-fix4`, `b1-ms2`, `b1-perf1`, `b1-rain`, `b1-talknpc`, `b1-headwear`, `b1-fix5`, `b1-opening`, `b1-lineup`, `b1-cell2`, `b1-gp6`, `b1-music3`, `b1-uipages`, `b1-story2`, `b1-cloth2`, `b1-sel3d`, `b1-uipages2`, `b1-credits3`, `b1-startmusic`, `b1-castle`, `b1-rooms`, `b1-worldlevel`, `b1-fix6`, `b1-hairhq`, `b1-credits4`, `b1-ui7`, `b1-island3`, `b1-ace2`, `b1-eyeshape`, `b1-midmusic`, `b1-headwear2s`, `b1-boundprops`, `b1-fetch4`, `b1-shirt3`, `b1-shirt3-hosetrim`, `b1-castheadwear`, `b1-dcut`, `b1-onemap`, `b1-shirtmat`, `b1-ui8`, `b1-import5`, `b1-hatfit`, `b1-dcut2`, `rain`, `b1-dcut3`, `b1-fix7`, `b1-outfits`, `b1-castmask`, `b1-muzzleclosed`, `b1-outfits2`, `b1-shirtmat-assets`, `b1-dcut4`, `b1-load2`, `b1-cell3`, `b1-greet1`, `b1-ui9`, `b1-rocks2`, `b1-cell4`, `b1-dress1`, `b1-grass3`, `b1-mix2`, `b1-cell5`, `b1-rocks3`, `b1-ui10`, `b1-grass4`, `toll`, `bf14b292`, `b1-cell6`, `b1-dress3`, `b1-cell7`, `b1-grass5`, `b1-grass6`, `b1-dress4`, `b1-ui11`, `b1-fix8`, `b1-ui12`, `b1-temp1`, `b1-cell8`, `b1-dress5`, `b1-grass7`, `b1-ui13`, `b1-cell9`, `b1-pkgfix`, `b1-ui14`, `b1-cell10`, `b1-cell11`, `b1-rob1`, `b1-cell12`, `b1-dress6`, `b1-grass8`, `b1-cell13`, `b1-creator5`, `b1-load3`, `b1-mix3`, `b1-ui15`, `b1-dress7`, `b1-fix9`, `b1-grass9`, `b1-ui16`, `b1-voice2`, `b1-ace3`, `b1-mix4`, `b1-ui17`, `b1-dress8`, `b1-fix10`, `b1-cell14`, `b1-fix11`, `b1-ui18`, `b1-cell15`, `b1-ui19`, `b1-names1`, `b1-ui20`, `b1-ui21`, `b1-ui22`, `b1-dress9`, `b1-grass10`, `b1-ui23`, `b1-ui24`, `b1-load4`, `b1-dress10`, `b1-mix5`, `b1-ui25`, `b1-coif2`, `b1-fix12`, `b1-ui26`, `b1-input2`, `b1-consolidate`, `b1-input3`, `b1-load5`, `b1-coif3`, `b1-input4`, `b1-ui27`, `b1-fix13`, `b1-cell16`, `b1-fix14`, `b1-cell17`, `b1-ui28`, `b1-fix15`, `b1-ui29`, `b1-dress11`, `b1-fix16`, `b1-names2`, `b1-ui30`, `b1-dress12`, `b1-names3`, `b1-fix17`, `b1-mix6`, `b1-ui31`, `b1-fix18`, `b1-grass11`, `b1-input5`, `b1-ui32`, `b1-grass12`, `b1-dress13`, `b1-lic1`, `b1-ui33`, `b1-dress14`, `b1-grass13`, `b1-dress15`

**Features**

- Headwear module: 16 helmets, masks and hats fitted per body (b09-headwear)
- scar layer, on by default (b1-scars)
- live loading object instead of video loops (b1-loadinglive)
- end credits v2: CB-01 … CB-10, FQ-30 (b1-credits2)
- dress2: DR-01 round: chapel roof raised above the vault, belongings room = factory weapon hall as a stone building with slate roof (painting inside), chest lid closed, … (b1-dress2)
- b1-fix4: English glosses of the Latin labels on hover and key/pad focus (talk values, humour state, role, Body page systems), framing hint, DefaultGlosses.ini (b1-fix4)
- int-0.13.0: FPS visualiser in the debug view (serif readout with cap and worst frame, frame-time graph (b1-ms2)
- Version 0.14.0 for the next package (b0131 still showed 0.13.0 (b1-perf1)
- Credits: branch history section (git graph of the game repo that draws itself while scrolling, days as milestones, closing line (b1-rain)
- DefaultStory.ini C_Unbind lines: same text on both sides, fix4 durations kept (b1-talknpc)
- PlayerHeadwear=mask_ironplates (b1-headwear)
- fix round 5: bound hands pose + cuffs, pad glyphs, waiting tutorial, mask off at chest, chest face focus, deny tones, UI fades, credits v2 music, guards in helmets, texts (b1-fix5)
- opening camera flight over the sea, DN.Opening.Flight (b1-opening)
- outfit levels DN.Appearance.Outfits 0|1|2, basic shirt on all bodies (b1-lineup)
- story cell scaled at load x1.5 planar, wall decals, second silent rat (b1-cell2)
- steal while sneaking and unseen, hand orbs, still start ring, looks as options with preview, armillary drift (b1-gp6)
- round-3 music in the game: weights, sunset/nightfall cues, menu piece, loading music per entry (b1-music3)
- Corpus and Res pause pages (b1-uipages)
- middle cutscene per route and outro as story sequences, NPC exchanges in free roam (b1-story2)
- Cloth follow-up (written, NOT compiled): cloth wetness path (CF-15), continuous shoe Darkness (CF-12), shirt-masked body field, sock tint (b1-cloth2)
- real 3D selectors rendered in a small offscreen scene (b1-sel3d)
- turning figure on the Corpus page: atlas frames, Q/R and right stick, auto-turn, DN.UI.FigureTurn (b1-uipages2)
- credits: Made with AI and The code, counted (b1-credits3)
- The Long Night Breaks at the game logo, logo waits for input, DN.Frontend.StartMusic (b1-startmusic)
- M_DN_IntakePBR: both sides set the instanced + Nanite usage flags (b1-castle)
- 106 imported props under /Game/DarkestNight/WorldAssets, content only (b1-rooms)
- island stage 2 on L_Island: ways, trees, PBR ground, terrain r5, navigation (b1-worldlevel)
- fix6: simple lip sync tier (L9, DN.LipSync 0|1|2, default 1): jaw and upper lip from TTS loudness or a syllable curve (b1-fix6)
- High-quality strand hair for the main characters, cards as the fallback (b1-hairhq)
- credits: scroll control, end page, playlist, HUD off, skip prompt, objects alternating, embers, tools (b1-credits4)
- Corpus point orbs, perks and numbers (b1-ui7)
- escort road dressing: 22 props in ten groups beside the road (b1-island3)
- ACE topic judge, speak prompt, player line (b1-ace2)
- pupil shape as its own choice, EG-02 (b1-eyeshape)
- middle cutscene on a 72 s clock with combat_dnb_classical_3, ducked under the narrator (b1-midmusic)
- headwear material two-sided, MK-01/KB-15 (b1-headwear2s)
- props rebuilt for the bent-arm pose, F5-03 (b1-boundprops)
- winalt: L_World_Castle 04:07 with materials, place maps, island ground pass, ground textures, reveal kit r2 unplaced (b1-fetch4)
- shirt v3 on all 19 bodies, headwear group lists, shortened brimmed helm (b1-shirt3)
- hose cut off under the shirt on all bodies, SU-01 (b1-shirt3-hosetrim)
- per-character headwear (b1-castheadwear)
- Director's Cut slice, no bars, ember bursts, armillary part transforms, branch history (b1-dcut)
- castle on L_Island as always-loaded sublevel L_CastleStory, ground splice, story markers, road, navigation, no grass inside the walls, Nanite tessellation (b1-onemap)
- shirt material chosen at runtime per group and player (b1-shirtmat)
- tutorial checklist, hand light on demand, transparent dial face (b1-ui8)
- 148 meshes from winalt: props round 2, castle kit round 4, trials (b1-import5)
- felt hood and chaperon a little larger, KB-14/KB-16 (b1-hatfit)
- branch history: thicker, bigger, what changed, red notes, quotes, blood (b1-dcut2)
- rain particle bounds follow the view (rain)
- credits: asset ledger sourced vs made, branch history round 3 (b1-dcut3)
- story guards dressed, grass LOD distance scale, stone and timber for stair house and guard room, slower clock after the gate cut (b1-fix7)
- player shirts carry hose and shoe colours: Start, Peasant grey, Royal purple (b1-outfits)
- moon and sun cast masks, twin looks (b1-castmask)
- closed muzzle cage with leather coif and straps, player default mask (b1-muzzleclosed)
- barefoot start outfit, peasant red-brown hose (b1-outfits2)
- royal shirt round 3 (b1-shirtmat-assets)
- credits: speed control, skip confirm, soundtrack section, full branch graph with day/night and sleep gaps (b1-dcut4)
- live loading screen at story cuts with real preloading (b1-load2)
- cell 2.25 plan and tidied, sleep bed fixed, riddle lines rewritten, inscription light, riddle skip after 4 min, brighter stone light (b1-cell3)
- outfit-aware greetings, regard line in the creator, player look in the ACE prompt (b1-greet1)
- item floats, orb hints, Da Vinci ghost on Corpus, darker pause, pause Debug page with story jumps (b1-ui9)
- solid Megascans rocks replace the PCG rocks on L_Island, bases buried, 55 more (b1-rocks2)
- cell: one table lantern, four wall torches, Megascans granite/cobble floor (b1-cell4)
- castle dressing: painting to the belongings room, real props for boxes, chapel walkable, barracks yard, gate pillars, oak chest with lid, blockout out of L_Island, … (b1-dress1)
- grass: bushier Quixel sets, LOD1 near, no cards near, 25 % less, faster streaming (b1-grass3)
- voice duck on every spoken line, story voice +4 dB, NPC voice volume 1.6, DN.Mix.Record (b1-mix2)
- cell floor: inner ring back as before, granite band behind the pillars (b1-cell5)
- one mossy rock family, lighter tints, 85 rocks in rows below the castle, close-up rocks moved left (b1-rocks3)
- debug keys page, photo mode on F2 with bars and look titles (b1-ui10)
- grass4: grass variation from the landscape material, a little more grass, Nanite grass and darker foliage by script (card GR-02) (b1-grass4)
- 15 roof instances and the lantern bracket out of L_CastleStory (toll)
- dress2: DR-01 round: chapel roof raised above the vault, belongings room = factory weapon hall as a stone building with slate roof (painting inside), chest lid closed, … (bf14b292)
- b1-cell6: bevelled floor plates, gallery arcade, upper shell and railings (Blender on winalt, work/agents/cell3/cell6/cell6_bevel.py in the jam repo) swapped into … (b1-cell6)
- guard hall lights 21 -> 6 (b1-dress3)
- cell uniform 2.25, slimmer pillars with wall-stone band, varied floor plates, stair collision ramp (b1-cell7)
- no grass in the gatehouse side room, landing beach fade lower, willow out of the shrubs (b1-grass5)
- grass6: Nanite off, Quixel grass with real LODs (no card), greener foliage tint, fuller shrubs in forest and edge without overlap (card GR-04) (b1-grass6)
- ground beside the castle approach raised, hall lights, hall prop spots (b1-dress4)
- photo mode key hint, noble guard escaped-patients lines (b1-ui11)
- b1-fix8: retarget IK pass for NPCs at every detail level (bNPCRetargetIKAllDetail), so far NPCs no longer walk with spread arms (b1-fix8)
- tutorial zoom row, landing hint as checklist, 180 s cap, real axis tries (b1-ui12)
- temperature on top of Calor: fog, cellar, beach, night wind, sun, fire lights, sprint, drying, solar/lunar jolt, NPC and player comments (b1-temp1)
- cell exit walkable: door void without collision, CellExit over the landing (b1-cell8)
- grey wedge = one-column landscape ridge at the moat edge, lowered (b1-dress5)
- old approach mask faded at the raised castle approach, path colour a bit darker (b1-grass7)
- debug jump rows first, photo mode hides prompts/compass/stats, tutorial card hidden in cuts, foley bank guard, credits direction switch (b1-ui13)
- cell: fixed exposure EV 0.5, granite floor family, pillars wall stone, softer torches (b1-cell9)
- kit and assembly components saved by the cook: castle and trees in packages (b1-pkgfix)
- debug always in the pause menu (b1-ui14)
- riddle descent: floor opens, spiral stair, guided walk (b1-cell10)
- detailed slab floor, 8 hinged petals open the descent live (b1-cell11)
- step rescue, riddle skip tap split, window keys, focus pause, cut teardown, fall recovery, cold floor 25 %, death/water/fall damage (b1-rob1)
- spiral stair 3 turns to an oak door, grind sound, exposure fixed down the shaft (b1-cell12)
- guard hall cut point HallIn (b1-dress6)
- crest road smoothing heightmap, bush draw distances, grass cull, free-roam marker (b1-grass8)
- sliding plates under the lip, pillar UVs, arch stone, gallery ring restored (b1-cell13)
- creator 3-point light, no rain grade in the creator, eye glow boost, ember layers (b1-creator5)
- loading: synchronized cut, live 3D only, prewarm in menu, longer minimums, NPC setup budget, weather preload (b1-load3)
- standard mix levels, cutscene music cut, middle score on the music channel (b1-mix3)
- playtest: start menu input/mouse/side wheel, mic notices, title fade, creator rows/zoom/rotate/colours, shared selector (b1-ui15)
- landing props, right-side trees, path lanterns, harbour + bobbing boats (b1-dress7)
- bound pose weight 1.0 for the rope, sword draw while visible, townsfolk walk along the road (b1-fix9)
- grass prewarm in the creator, wet grass, crossing terrain noise, per-quality grass, HighDetail LODs without cards, clumpier sets, more shrubs at the start (b1-grass9)
- tutorial: zoom to first person and back, diamond marks fill and fade (b1-ui16)
- recorded NPC takes by gender with ACE TTS fallback (b1-voice2)
- mic indicator, menu voice commands, sentence case, townsfolk reply fallback, TTS for every unrecorded line, model preload on talk, speak hint, SpeakMic tutorial, free … (b1-ace3)
- footsteps +5.8 dB, surface gain (b1-mix4)
- energy arcs thicker, closer zoom, talk panel menu navigation, start/pause star gap, Res symbols clearer (b1-ui17)
- entrance/sunset path heightmap d8, flat stone and floors, ashlar to wall stone, gate lanterns, stables door, closed doorways, market back, hall exterior, leading lights (b1-dress8)
- patient escort: lead guard waits, returns, fetches (b1-fix10)
- cell: no fill lights, EV 2.0, moon shaft, calm wall stone (b1-cell14)
- cellmate idle rounds, Mira sits on the bench (b1-fix11)
- Favor/Suspicio bars with glow, +/- floats, friend line (b1-ui18)
- wall-base ring closes the gap, cell fall reload, chains/floating props, moon by phase, sun slit + stone moved to fit the shafts (b1-cell15)
- hand lights: energy gate, dimmer, on/off hint, unlock at Clothes (b1-ui19)
- names + titles, name learning, crowd identities, voice by body, first-talk tutorial (b1-names1)
- UI context modes / hand light hold (b1-ui20)
- UI context modes / hand light hold (b1-ui21)
- tutorial serif + higher, tutorial bound to save/step, compact debug view top right, LUT link + arrows, easter egg on Debug page, dimmer spheres, free-roam card (b1-ui22)
- baked dry-stone walls for vaulting/climbing as d7 stage (b1-dress9)
- whole-island step smoothing heightmap g10, landscape Nanite + tessellation displacement scripts (b1-grass10)
- traversal tutorial card in free roam (b1-ui23)
- Corpus · Res menu: Q/E tabs, tab icons, smaller art, pause entry icon, cell menu row (b1-ui24)
- uniform loading frame: bars, grain, vignette, fade, steer hint, mouse drag (b1-load4)
- moat: level water planes with Easy Waterscape material, chamfered baked moat walls (b1-dress10)
- cutscene pieces, music cutscene hold, one-live-track guard, ambience/warmth settle after load, context cold lines (b1-mix5)
- session reset incl (b1-ui25)
- coif refit per player body, variant meshes with old-fit fallback (b1-coif2)
- beat clocks on one story day, cut straight into the cell shots, loading hold until the cell is dressed (b1-fix12)
- save screenshots + place/time in load list and loading inset, device notices bottom right (b1-ui26)
- controller parity: menu keys, LUT panel on pad, photo A, debug chords, shoulder swap, LT/RT values (b1-input2)
- idle lets go of cellmates on the descent (b1-consolidate)
- glyph audit: readable key names, bound keys in prompts/hints, glyph rows on controls page, story windows, end card, tutorial rows (b1-input3)
- framed zoom on loading objects (b1-load5)
- COIF-03: closed muzzle cage variants without straps (assets re-exported (b1-coif3)
- character-menu keys only in Gameplay, grace after modals (b1-input4)
- ui27: playtest 0.14.0 item 105 (no autosave after a load (b1-ui27)
- escort via gate straight to the stair door, lead stays 2-4.5 m ahead, guards match player speed (b1-fix13)
- flatter 4-turn stair with 2.25 cm chamfers (b1-cell16)
- b1-fix14: the cell riddle in one sleep to midnight (moon only), the player reads the carving, every bed and a lit rest place sleep there (b1-fix14)
- bed script (b1-cell17)
- ui28: playtest 0.14.0 item 109 (no visible falling copy of the player on a load) (b1-ui28)
- b1-fix15: midnight marked on the dial with one hint line, lean riddle hints, free floor for cuts and debug jumps, dark hint not in lit rooms, outro stills (b1-fix15)
- ui29: playtest 0.14.0 item 117 (credits: no bars, Director's Cut opens and scrolls up into the rest, jam note merged, skip hold slows and asks) (b1-ui29)
- guard hall: flat banners out, painting + shields, grindstone out, one table, flames on torches, fewer lights (b1-dress11)
- first-person head re-hide, free roam always in the guard hall (b1-fix16)
- P2: guard look group with helmets/livery, two named guards in the yard, twins at the inner gate (b1-names2)
- credits texts per her item 118, STOP speed, back everywhere, music follows speed, learnings (b1-ui30)
- lookout flagstone path, market back from the street, escort corridor clear (b1-dress12)
- entry guards and twins talkable without TalkToEveryone (b1-names3)
- P2 story flesh-outs: step back at the opening floor, carving glow, Not so fast, guards notice clothes, wake card, guard speed reset (b1-fix17)
- story foley, music story arc, narration lightning (b1-mix6)
- breath fog, warmth vignette, band pulse, glyph help rows, her learnings in the credits (b1-ui31)
- modal stack, riddle flags survive load, quit-fade lock, exit-crash guards, pause-menu riddle skip (b1-fix18)
- displacement wire via C++ helper (b1-grass11)
- quick menu + Wait screens (b1-input5)
- credits as one scroll strip, DN.Credits.OneScroll (b1-ui32)
- tessellation per quality level (b1-grass12)
- traverse walls by the hall door, sunset viewpoint at the lookout (b1-dress13)
- third-party licence and notice files (b1-lic1)
- NVIDIA DLSS / ACE notice first in the start menu, held 2x (b1-ui33)
- traverse walls: wider search, current heightmap, fallback (b1-dress14)
- Surface detail setting Auto/Off/On (b1-grass13)
- untextured W4 harbour rocks swapped for textured ones (b1-dress15)

**Fixes**

- Opening lightning: fixed bolt seed, struck behind the castle from the opening camera (her cover wish
- grass12 fix: r.Nanite.DicingRate is not a scalability cvar (ensure in every editor start)
- ui32 compile fix: strip block was spliced into the stars line
- mix6 fixes: shadowed name, cell music low on CellShots (watcher N9)
- d7_island: same globals view fix
- int-0.13.0: compile fixes after 43 merges (include order, death letterbox calls, creator settings name clash, shadowed locals, PlaySound macro from …
- b1-fix12: fixed story-beat clocks on one day (BeatClocks) and the cut into the cell fades straight into the cell shots
- b1-cell14: cell lit only by its torches and lantern plus a moon shaft, darker fixed exposure, one calm stone for walls/pillars/arches (playtest item …
- dress8 (playtest 36-43 + her screenshots 18:35-18:42
- b1-cell9 round 8: fixed cell exposure (PP_Exposure histogram min = max = EV 0.5, bias 0
- ui13: night QA fixes (debug jump rows first, photo mode hides prompt/compass, credits Up = faster, tutorial card hidden in cuts, silent foley bank …
- int-0.13.0: b1-load2 compile fixes (class closing brace, missing include)

**Tests:** not packaged yet

**Decisions (board codes):** AD-02, BX-05, BX-06, BX-07, BX-08, BX-09, CB-01, CB-10, EG-01, EG-02, FQ-03, FQ-05, FQ-10, FQ-12, FQ-28, FQ-29, FQ-30, FQ-32, HB-08, HM-03, KB-01, KB-05, KB-08, KB-10, KB-11, KB-14, KB-15, KB-16, KB-20, KB-23, KB-24, KB-26, KL-01, LV-01, LV-06, MK-01, OP-01, OP-02, ST-01, ST-05, ST-06, ST-08, SU-01, SU-06, SU-08, SU-11, SU-12, WA-B01, WA-B02, WA-B03, WA-B04, WA-B05, WA-B06

## Build 0.12.0
Build 1 package: the story in the real cell, levelling and routines, looks to validate, fix rounds 2 and 3, her board answers

```specs
when: Sat 14.11. 23:07
commit: build-0.12.0 / cc2e126
package: 10924 MB, Win64 Development
result: PASS (all editor and package tests of the new areas, each alone on the GPU)
branches: 16
```

**Branches:** `b1-look`, `c4-brain`, `c4-corpus`, `unit-pilot`, `c5-named`, `c7-exercitatio`, `char-batch`, `b1-npcanims`, `c6-routines`, `b1-cell`, `b1-corpus`, `b1-hairhq`, `b1-cellstory`, `b1-look2`, `b1-fix2`, `b1-fix3`

**Features**

- The cell scene plays in the dressed dungeon under the castle: furniture, lanterns, the real door; Mira and Anselm are already there when you arrive; the island stand-in cell stays as a switch
- Body systems and levelling by use: a quiet level-up notice under the dial and a Body page in the pause menu, with the Latin names
- People in the castle follow daily routines and activities
- Guard room: first look at your identity at the table, then take your clothes at the chest; the closing waits for both
- Opening narration shorter (about 32 s) and the cellmates' answers in mixed lengths, some told in two parts
- Looks to validate live in the F2 panel and Settings > Debug (own looks, LUTs, OCIO profiles, night values); the default picture is unchanged
- Her picks: the new loading-finished cue and the new bound rustle; talk captions and system names in Latin; the "..." list folds back after each answer

**Fixes**

- Quit and keep-settings dialogs on a dark plate with a soft edge; the settings hardware text on a soft plate
- The Q key no longer reads as 0; the dial shows its gap line also under a bright moon
- Loading tip readable over bright loops (the 0.11.0 backing never rendered)
- Credits: open facts hidden outside debug mode; the licence list is filled; the film LUTs with an unclear licence are not shipped
- Intro without the wind bed when it is not raining; rain on a roof sounds muffled indoors
- Chest view: a crouched player is stood up so the framing stays as intended
- The rat in the cell is silent until better sounds are found

**Known issues**

- The deny tone is still the old one until a new one is picked
- The player's mask is still a placeholder shape; some castle people are still placeholders
- Credits: one long licence line wraps over the next one
- Eyes of Mira and Anselm in the package not yet looked at closely by a person
- The intro end line is still open

**Tests:** Editor (each run alone on the GPU, test-input guard on): unit 263/263, guard proof, story 21/21 in the real cell with routines (twice), Corpus, loading, ACE 73/73, look smoke, UI 44/44, chest framing and the crouch proof, character creation, Body page, castle court frame time, credits licences. Package 10.9 GB: start, menu, direct start, loading, story 21/21 in the real cell, ACE 71/71, talk 85/85, belongings 32/32, hair; film LUTs proven absent.

**Decisions (board codes):** FQ-01, FQ-02, FQ-05, FQ-07, FQ-08, FQ-14, FQ-27, ST-04

## Build 0.11.0
Build 1 package: credits after the closing lines, loading loops round 4, world maps, fix round 1

```specs
when: Sat 14.11. 19:52
commit: build-0.11.0 / d4c23ca
package: 10545 MB, Win64 Development
result: PASS (package tests of the new areas, rerun alone after a GPU driver hang)
branches: 9
```

**Branches:** `castle-kit`, `level`, `pcg`, `b1-credits`, `b1-hairhq`, `world-v1`, `b1-loading`, `b1-ace`, `b1-fix1`

**Features**

- End credits after the Custos closing lines: bars close, the credits run (hold any key to skip, 8 s the first time), then the system windows and the free island
- Loading loops round 4 rendered in Unreal: sapling on its table with the knife, warming pan zooming out, lantern; the armillary keeps its moving rings
- Castle and island world maps (round 2) included as separate maps; the story still plays on the island
- High-quality strand hair for the two cellmates and the unmasked player bodies (Mira braid, Anselm bun), cards farther away and on low detail
- Talk panel: three topics, then "…" to see the rest; English captions in one capitalisation; a quill at "Say something"
- NVIDIA ACE free talk and speech on by default when the GPU and the models allow it; the hardware notice says so
- Belongings: the chest opens the character view in a chest mode (body locked, outfit row); default name "Prisoner"
- Game logo sun or moon by the PC clock, the other one on each return to the menu; the start ring leans slightly towards the mouse
- Text shadow back under HUD text and subtitles; menus stay without

**Fixes**

- Only our own music ships; the heavy combat loop B left the normal combat pools
- The intro ends on its own line; the closing pair stays in the outro; the line about received patients is gone
- Talk panel: answers to a cellmate's question start on the first answer
- Settings page without the black box; loading tip with a soft backing; the debug box no longer covers the screen

**Known issues**

- The castle and island world maps are not yet where the story plays; the dressed dungeon cell is not in this build
- The rejected deny and bound-rustle sounds are still the defaults until new ones are picked
- The player's mask is still a placeholder shape
- The credits still show seven [TODO] placeholders (participants, some cast and asset lines, licence list, thanks)
- First package with the ACE models: about 5 GB larger than 0.10.0
- Credits music and the picture in real time not yet checked by a person

**Tests:** Editor: unit 184/184, talk 85/85, story 20/20 with the credits chain, character creation, loading, ACE 71/71, hair. Package (each test alone on the GPU after a driver hang): start, menu and direct start, loading, story 20/20 with credits before the system windows, ACE 73/73, talk 85/85, belongings 32/32, hair.

**Decisions (board codes):** CR-06, FQ-04, FQ-10, FQ-16, UI-R9-7

## Build 0.10.1
Build 1 ACE: free talk and speech with the cellmates (experimental, off by default, editor only)

```specs
when: Sat 14.11. 08:35
commit: untagged / e89e83c
package: ? MB, Win64 Editor (editor only, not packaged)
result: PASS (editor -game, new areas only)
branches: 1
```

**Branches:** `b1-ace`

**Features**

- Free talk with Anselm and Mira: a typed line ("Say something") answered in character by a local language model on the GPU, guided by the authored topics, the time of day and the place
- Push-to-talk speech: hold B, Mouse 4 or D-pad Right in a talk; speech recognition and spoken replies at the speaker (one male, one female voice)
- First entry into the game waits for the dialogue models (at most 30 s); later loads never wait
- Everything behind switches, off by default; without the switches no model is loaded

**Fixes**

- A voice warm-up error no longer cascades into the replies
- An aborted model load frees the backend again; a hung load keeps free talk unavailable instead of answering busy

**Known issues**

- The small model still invents small details
- No lip sync (the cellmates use the mannequin body)
- Real microphone, gamepad push-to-talk and listening by a person not tested yet
- Not packaged; the models add about 2.7 GB to a zipped package (lab estimate)

**Tests:** Editor only, not packaged: unit 138/138; talk test with ACE off 48/48; ACE free-talk test 71/71; with speech 99/99 (median reply under 1 s, 7.3 GB VRAM); a plain start without the switches loads no model.

## Build 0.10.0
Build 1 integration 1: story flow, talking cellmates, belongings, footsteps and indoor mix

```specs
when: Sat 14.11. 08:33
commit: build-0.10.0 / 74112e2
package: 4890 MB, Win64 Development
result: PASS (all package tests of the new areas)
branches: 3
```

**Branches:** `b1-flow`, `b1-talk`, `b096-audio`

**Features**

- Story flow from New Game to free roam in 8 steps: escort, gate, cell, talk with the cellmates, riddle, release, belongings, closing
- Cellmates Anselm and Mira with stable character ids and a talk panel (topics, volunteered lines, questions, suspicion and disposition); their talk record survives save and load
- Riddle learned through the talk (Anselm volunteers it), reading replays after a load in the middle of it, sleeps and hints restored
- New step 7: guard room beside the cell with table, chest and notice; documents panel to write the name and choose a backstory, clothes from the chest; fallback without the panel
- One voice look-up for story narration and talk lines; lore tokens resolved from the lore file
- Footsteps: original GASP foley by default, quieter; NPC steps layered by distance with a voice cap; indoor mix muffles outside beds under a roof
- Talk seam for a later free-talk provider (availability per character, current time/weather/place, thinking line)

**Fixes**

- Input smoke test covers the new sprint scheme and the classic one; UI test closes the easter-egg card and expects the new pad label
- Front end no longer logs an ability marker every frame

**Known issues**

- Guard room is a plain blockout on the island grass
- Custos lines after the chest and the papers are not played
- Moves hint card can overlap the talk panel's name block
- Thinking line has little contrast on bright walls
- No voice recordings exist yet; nobody listened to the new footsteps
- Scripted talk and documents tests react to a real mouse cursor over the window
- Hair StableRodsSystem warning and PSO precache ensure (as in 0.9.5)

**Tests:** Package: smoke, loading test, both fast starts, quest test 20/20 with the real talk, quest test with the flow off (15/15) and with the belongings panel off (20/20), talk test 48/48 and save/load in the cell (7/7) and during the riddle (3/3) on the island, documents test 32/32, UI test 44/44, input smoke 121, SFX test: all PASS. Unit 121/121 in the editor.

## Build 0.9.5
Board answers: sounds, sprint scheme, escort cuts, loading smoothness

```specs
when: Sat 14.11. 03:59
commit: build-0.9.5 / f6fc973
package: 4874 MB, Win64 Development
result: PARTIAL: smoke, loading, FastStart pass; input smoke and UI test fail as written (tests stale)
branches: 3
```

**Branches:** `loading-props`, `b095-fixes`, `tools-savefix`

**Features**

- UI sounds wired per Jennifer's board answers: menu choice ConfirmHeavy_K, load confirm N before the load starts, value change B/A at random, Apply and save as page turns, ring glide with runtime reverb, deny H, short loading-finished cue
- Bound player: shackle rustle on denied sprint/crouch/jump (BoundRustle A/D/E)
- Gamepad sprint scheme: A hold = sprint, A tap = interact or jump, L3 sprint lock, sneak on LB; keyboard Alt hold / twice
- Escort: earlier cut at the Crest, landing half way to the gate
- Settings: frame-rate limit 24 to unlimited, warmth bar without numbers, freezing/burning stacks, speaker names in Barlow capitals, ray crosshair setting, glyph hints per device, gliding 3D lozenge in sub menus
- Debug easter egg every time with jam statistics (DNJamStats.json), time-of-day backdrop
- Loading: smooth-frame gate, animation clock step limit, frame statistics markers; loading-prop loops round 3 (sapling, warming pan, lantern) with posters
- Tools: save fixes (tools-savefix)

**Fixes**

- In-game settings: Q/E and arrows went to the game because the pause menu focused the panel before it was laid out
- Loading test confirms character creation, so load, travel fade and quit-to-menu run again

**Known issues**

- Deny and rustle sounds and the loading-finished sound are provisional
- PlayStation pads not detected
- No real controller tested
- Nobody listened to the new sounds
- Hitches while the world is revealed after loading (package: warm/reveal frames up to 1.2 s, 3-4 frames over 100 ms per load)
- Input smoke test and UI test not adapted to the new sprint scheme and the easter egg (fail in the package as written)

**Tests:** Package: smoke, loading test PASS (new_game, load, travel_fade, quit_to_menu), FastStart starts with debug off. Input smoke 94 passes with DN.Input.SprintScheme 0 but fails as written (test expects the old scheme); UI test fails 8 checks as written (4 with the easter egg off). Editor on the branch: unit 76/76, loading test, scripted runs.

## Build 0.9.4
Fixes from the 0.9.3 playtest: input, story, front end, loading

```specs
when: Sat 14.11. 02:22
commit: build-0.9.4 / 8788027
package: 4849 MB, Win64 Development
result: PASS except the loading test (test flow, not adapted)
branches: 2
```

**Branches:** `b094-fixes`, `b1-paramcloth`

**Features**

- Modal input guard: character creation, sleep dial and talk panel keep keyboard and pad input across device switches and focus loss; controller notice and sound
- Front end: star sprites with slow sky rotation, 3D-look selectors, ring mesh with moon chamfer and glide sounds, delayed menu choice with select sound, hold any key 2 s to skip the logos, hardware notice at every return to the menu
- Settings and character creation: shine only behind the selected row, key hints in the footer, value-change sound, marks for missing options, pale skin fixed
- Story: slow walk until the cell, escort resumes after a load, saving allowed in the cell, hint card and objective as one element
- Loading: minimum 8 s, world sound muted under the loading view; a package starts with debug mode off
- 27 UI sounds, UI stars and selector textures; timed console script -DNExec for scripted checks

**Fixes**

- Character creation no longer dies after a controller is plugged in or the window regains focus
- Pale skin no longer turns red (Basecolor Global Saturation Post-Bake)
- Sea and shelter levels of the weather beds (quieter sea with height, stronger ducks under a roof)

**Known issues**

- Menu confirm sound is a placeholder (ConfirmHeavy_D)
- The ring cannot stand still yet (one mesh; only star and moon should move)
- Loading-screen stutter not investigated
- PlayStation glyphs missing (DualSense not seen by the XInput path)
- No real controller tested
- Package loading test fails at its save step because the new character-creation save blocker is active (test not adapted; loading itself ran, min 8 s seen)

**Tests:** Package: smoke (Build0.9.4 marker), input 94, -DNFastStart start with debug mode off; loading test FAIL (test flow, see known issues). Editor on the branch: unit 71/71, UI 43, quest 14/14, character creation, scripted input and save/load runs.

## Build 0.9.3
, package (local path)

```specs
when: Sat 14.11. 00:00
commit: build-0.9.3 / 5edcc0a
package: 4847 MB, Win64 Development
result: PASS (changed areas; package smoke, input, loading, hair)
branches: 6
```

**Branches:** `b09-hair`, `loading-props`, `b093-cc`, `b093-flow`, `b093-front`, `b093-hud`

**Features**

- Hair module (b09-hair)
- round 3 = 1440p loops 20.3/40.7/22.7 MB, much stronger fog, sapling r3 closer, slower detailed embers, MRQ spatial sampling), base main bf53b7f, worktree … (loading-props)
- b093-cc: M_DN_CC_Ember re-created by the embers script (same graph) (b093-cc)
- b093-flow: ability control (walk only in the escort, deny tone), tutorial hints, 72-min day, auto fps cap, foot-bone interval by speed (off) (b093-flow)
- b093-front: loading minimum, finished cue, music bed, title, preload, settings confirm, quit-to-menu save, save feedback, fast start (b093-front)
- b093-hud: mockup HUD bars with warmth gradient, input glyphs, no text shadow, subtitle size, Barlow tech menus (b093-hud)

**Known issues**

- armillary loading shot black in packages (also 0.9.2), hair PSO ensure + missing StableRodsSystem warning + stippled fringe, travel_fade streaming timeout, face LODs with chunking not checked visually, new UI not exercised in the package

**Tests:** PASS (changed areas; package smoke, input, loading, hair)

## Build 0.9.2
UI round, weather transitions, warmth

```specs
when: Fri 13.11. 19:32
commit: build-0.9.2 / 80d867a
package: 4048 MB, Win64 Development
result: PASS (changed areas, editor + package smoke/input)
branches: 7
```

**Branches:** `b09-story2`, `c-warmth`, `b09-steps`, `c35-robust`, `b09-weather2`, `b1-music`, `b09-ui2`

**Features**

- UI round: hardware panel (SE-02), dark character creation room with embers (UI-01), brand fonts everywhere (UI-03), lining digits (UI-04), HUD (UI-05)
- Unified interaction prompt (UI-02): reticle, device key glyph, action word
- Sequenced weather transitions (WE-03)
- NPC animation LOD by effects quality (NP-03)
- Scripted character creation, no saving in cutscenes, narrator only in the opening (SY-01, SY-02)
- Warmth/cold system "Calor" with HUD bar
- GASP foot events as footstep source
- Music debug spheres

**Fixes**

- Compass hidden in character creation
- Autosave before cuts instead of saving inside cutscenes

**Known issues**

- Not visually reviewed by a person yet; new features not exercised in the package
- The cell sits inside the orb course
- Bed and stone are grey cubes
- New warmth bar on the HUD is still to be confirmed
- Packaging took 35 minutes, cause not checked

**Tests:** Changed areas. Unit tests 40/40. Editor: quest 14/14, character creation, sleep, interact, social, record, music spheres, weather 7/7, footstep sync, input 94, brand, warmth 14/14. Package: smoke, input 94.

**Decisions (board codes):** NP-03, SE-02, SY-01, SY-02, UI-01, UI-02, UI-03, UI-04, UI-05, WE-03

## Build 0.9.1
Polish round: UI, animation, music set dn4, robustness

```specs
when: Fri 13.11. 16:11
commit: build-0.9.1 / bf53b7f
package: 4055 MB, Win64 Development
result: PASS (changed areas)
branches: 8
```

**Branches:** `b09-anim`, `b09-ui`, `b1-music`, `b09-brand`, `b09-polish`, `b09-testmaps`, `b09-fixes2`, `c35-robust`

**Features**

- Music set dn4 behind a switch (layer stems, intensity from state and health, DJ transitions); dn3 stays the default
- Character system: shared interaction and record v3
- Weekday planet signs on the HUD dial
- Debug mode off in player builds
- Sun/moon logo video
- The player blocks NPCs
- Small test maps (cell, room)

**Fixes**

- Character creation fill light (was backlit)
- Panel state per instance, orbs hidden in fades
- Thumb-in-thigh crouch pose (arm spread)
- Footstep floors per bone
- Cinematics lock input; modal restore; narrator end lines at the title
- One owner for the weather volume
- Rain grade eases in
- Input test: a villager stood in the way at the start

**Known issues**

- One GPU crash on the very first launch of the first package, not reproduced in 9+ later starts
- The cell sits inside the orb course
- Bed and stone are grey cubes

**Tests:** Changed areas, once each. Editor: brand, sleep, character creation, quest, interact, record, social, input 94. Package: smoke, input 94, music dn3 and dn4, time 60/60, weather 7/7, retarget 10/10, footstep sync p90 34 ms.

## Build 0.9
Build-1 groundwork: story, character system, creation, sundial

```specs
when: Fri 13.11. 14:51
commit: build-0.9 / 0c13e94
package: 3974 MB, Win64 Development
result: PASS (new tests only)
branches: 13
```

**Branches:** `c1-character`, `b1-armillary`, `b1-story`, `b1-sundial`, `b1-look`, `c1-trial`, `c3-social`, `pcg`, `c2-inventory`, `c23-trial`, `b09-brand`, `b083-fixes`, `b1-charcreate`

**Features**

- Story MVP: opening narration after the loading reveal, cell start, objectives, subtitles
- Character system C1 to C3: records, inventory and coin, scripted topic dialogue, gate guards, steward, trial line with toll and talk camera
- Character creation MVP, opens at the landing
- Sleeping at the sundial; light puzzle by sun (15 to 16 h) and moon (23:30 to 00:30)
- Armillary sphere on the loading screen
- Live grading switcher (off by default), castle approach maps
- HUD dial holds its brown face around the horizon

**Fixes**

- Footstep height at slow gait
- Opening narration clock starts at the loading reveal
- Quest test confirms the auto-opened creation menu like a player

**Known issues**

- The cell sits inside the orb course on the island
- Bed and stone are grey cubes
- Character creation is backlit (fixed in 0.9.1)

**Tests:** New tests only: package smoke, sleep and character creation; editor quest 14/14, sleep, footstep sync; character, inventory and social tests in the editor. Windows only.

## Build 0.8.2
Start sequence, menus, controls, rain look

```specs
when: Fri 13.11. 09:57
commit: build-0.8.2 / e5dd5e2
package: 3904 MB, Win64 Development
result: PASS except orb course check and one retarget row (both known)
branches: 8
```

**Branches:** `b082-menus`, `b082-controls`, `b082-footsteps`, `b082-npc`, `b082-trees`, `b082-weather`, `b09-brand`, `b082-start`

**Features**

- Start sequence: studio ident RR-MO-16 with birds, game logo, slow soundtrack fade-in, no weather sounds in the front end
- Menu logic: focus is not select, greyed-out options with reason, settings grid with slide animation, info texts, DLSS options
- Skyrim-like controls, Xbox controller
- Rain grade (vignette, darkening by severity) and wet characters
- NPC arm correction and distant animation LOD
- Footsteps timed to foot contact
- Thicker forest areas
- Brand visual round: soft glow, HUD layout, loading loop (UI-R9-7)

**Fixes**

- Tree LOD popping
- LB/RB keymap conflicts
- Blue focus rectangle removed
- SFX test counts bone-timed footsteps

**Known issues**

- Orb course check and one retarget row still fail
- Not run: water, stats, systems, a real controller

**Tests:** Tests selected by impact, one run each on the package; all pass except the two known ones. Input 94 checks, UI 38/38, world 10/10 shots.

**Decisions (board codes):** RR-MO-16, UI-R9-1, UI-R9-7

## Build 0.8.1
Front-end audio on the brand start screen

```specs
when: Fri 13.11. 07:41
commit: build-0.8.1 / f9e9733
package: 3855 MB, Win64 Development
result: PASS (reduced test set)
branches: 1
```

**Branches:** `b08-frontaudio`

**Features**

- Layered bird ident over the muted studio video
- Title stage: the soundtrack starts with the title (8 s crossfade)
- Menu swell and duck, UI hover/confirm/back sounds, pause open/close sounds
- Console switch turns the module off

**Fixes**

- A thunder one-shot rang on after leaving the front end

**Known issues**

- Weather bed and thunder still play in the front end (removed in 0.8.2)

**Tests:** Reduced set, only what is new: smoke, front-end test, front-audio test (19 checks) pass.

## Build 0.8
Final Build 0: Creator MetaHumans, gameplay SFX, brand look, UI kit

```specs
when: Fri 13.11. 06:17
commit: build-0.8 / 24f391a
package: 3869 MB, Win64 Development
result: PASS except orb course check and one retarget row
branches: 4
```

**Branches:** `b07-uikit`, `b08-sfx`, `b08-mhretarget`, `b09-brand`

**Features**

- 19 Creator MetaHumans as player default and NPC mix, retargeted per body
- Gameplay SFX: weather beds, footsteps, heartbeat
- Brand look: token style, studio ident video, ring start screen, star-selector menus, hardware notice, pause with real depth of field, brass HUD dial
- UI kit assets

**Fixes**

- Game-target compile fix for the brand code
- UI test made aware of the brand start screen

**Known issues**

- Orb course check still fails
- One of 130 retarget rows fails: thumb inside the thigh in one crouch pose

**Held back**

- `b08-vfx`: cook crash on the fireflies Niagara system
- `b08-frontaudio`: test timeout against the new start stage; shipped in 0.8.1

**Tests:** Win64 suite passes except the orb course check and one retarget row. No Mac build.

**Decisions (board codes):** UI-R7-9, UI-R9-1, UI-R9-4

## Build 0.7.1
Fonts, music, water fix

```specs
when: Fri 13.11. 04:57
commit: build-0.7.1 / 5e4b4d3
package: 3033 MB, Win64 Development
result: PASS except orb course check
branches: 3
```

**Branches:** `b07-brand`, `b08-music`, `b08-water`

**Features**

- Own music system: stems, ambient set dn3, flavour layers, combat loops, track display in the debug view
- Type system: IM Fell English SC, IM Fell Great Primer, Barlow (TY-SET-10)
- Stats HUD
- Ocean backend switch; Easy Waterscape with fixes is the default on all platforms

**Fixes**

- White foam on the open sea at noon; water simulation now runs on game time
- Unity-build name clash between stats HUD and time HUD

**Known issues**

- Orb course check still fails
- Mac: music stems missing (silent), test screenshots not written
- A first 0.7.1 candidate was stopped because main had moved on

**Tests:** Win64 full suite passes except the orb course check. Mac: smoke passes, world and water tests fail only on screenshots.

**Decisions (board codes):** TY-SET-10

## Build 0.7
First playable combination

```specs
when: Fri 13.11. 00:24
commit: build-0.7 / 4ecb188
package: 2848 MB, Win64 Development
result: PASS except orb course check
branches: 7
```

**Branches:** `b07-npcmh`, `b07-stats`, `b07-time`, `b07-ui`, `b07-world`, `b07-loading`, `b07-weather`

**Features**

- Controls page, debug mode and view, auto graphics, quit to desktop
- Time HUD with sundial/compass, Latin weekdays and weather symbol
- Health, stamina, light and dark with bars and debug orbs
- NPCs ready for MetaHumans with LOD tiers
- Loading screen with travel fade
- Jump course, teleport orbs, visible castle, finer terrain
- Weather: wind, visible rain, wetness, storm with lightning and thunder

**Fixes**

- Bypass travel never opened the level (first package failed smoke, input and UI tests)
- Crash at the end of the orb travel fade
- Unity-build name clashes exposed by the weather merge

**Known issues**

- Orb course check fails: the pawn does not start a traversal at the hurdle
- Package moved to a second drive because the system drive ran full

**Tests:** Win64 full suite passes except the orb course check. Mac package passes its subset (smoke, front end, world, weather, time, stats, loading, UI).

## Build 0.6
NPCs, MetaHuman player, smaller island, time and weather

```specs
when: Thu 12.11. 15:03
commit: untagged / df1751b
package: 1941 MB, Win64 Development
result: PASS
branches: 4
```

**Branches:** `b0-npc`, `b0-character`, `b0-world2`, `b0-wind`

**Features**

- NPC scaffold: spawners, groups across the island, night schedule
- MetaHuman appearance on the player character
- Jam island at half size (0.75 km), large variant kept
- Time and weather: clock holds and speed setting, time HUD, weather director
- Volumetric light and fog, opening cameras

**Fixes**

- Opening cutscene smear (dummy anchored to the player)
- Wind smear on maples (wind-animated trees render without Nanite)
- Moon fix in the sky system
- Unity-build name clashes after merging world, systems and tests

**Tests:** Win64 package, all pass: smoke, input, movement, front end, world (10/10 shots), time, NPC, appearance, save/load/slots.

## Build 0.5
Island world

```specs
when: Thu 12.11. 13:16
commit: untagged / 048479f
branches: 1
```

**Branches:** `b0-world`

**Features**

- Island map, first large version (about 1.5 km)
- Sky and weather bridge (Ultra Dynamic Sky), ocean, PCG scatter
- Automated world test with camera shots

**Known issues**

- Not packaged on its own; it shipped inside Build 0.6

**Tests:** No own package; the world test ran with Build 0.6.

## Build 0.4
GASP character and front end

```specs
when: Thu 12.11. 08:46
commit: untagged / 173ac9b
package: 1405 MB, Win64 Development
result: PASS
branches: 2
```

**Branches:** `b0-movement`, `b0-frontend`

**Features**

- GASP character on the C++ character with dynamic camera, first person and equipment slots
- Front-end flow (studio, title, menu), pause menu, letterbox opening sequence

**Tests:** Win64 and Mac packages: smoke, input (66 checks), movement test (19 flags incl. traversal), front-end test, save/load/slots pass.

## Build 0.3
Foundations: input, graphics, save systems

```specs
when: Thu 12.11. 07:42
commit: untagged / 5fc3099
package: 1314 MB, Win64 Development
result: PASS
branches: 2
```

**Branches:** `b0-graphics`, `b0-systems`

**Features**

- Enhanced Input layer in code with an automated input smoke test
- Graphics settings with DLSS and a TSR fallback, presets, debug overlay
- Save/load with numbered slots and autosave ring, game clock, settings persistence

**Fixes**

- Mac link error (missing engine module dependency)
- Input smoke test is re-runnable: real loads are blocked during the test

**Known issues**

- Mac: start crash in 1 of 5 launches (exit 139, no log)

**Tests:** Win64 and Mac packages: start marker, input smoke (66 checks), save/load/slots and DLSS/TSR status pass.


`*` Title image added to this devlog after the jam, on 16 November 2026, using existing project material. This marks the website addition, not the source image creation or capture date.
