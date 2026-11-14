---
title: builds.log
slug: builds
order: 9
date: 2026-11-14
day: builds
phase: jam
status: live
summary: Every build of the jam so far, with the branches, features and fixes that went into it.
---
```recap
**What this is:** a generated page, not a diary entry. A script reads the game repository (tags, merges, branches) and the build notes and redraws this after every integration. Last run Sat 14.11. 23:07, latest build 0.12.0. The short texts are AI summaries of the build notes.
```

Each agent works on its own branch. Only the orchestrator merges, and a build is what came out of one integration. Every branch of the jam has one row, grouped by area: the bar runs from the fork to the last merge, the label after it names the build it shipped in, dashed bars were never merged. Vertical lines are builds. Each day entry shows the same chart cut to that day.

```embed
builds.html | All branches of the jam by area, with the builds they shipped in. Scroll the chart sideways; hover or tap a row or build. | 2600
```

## Build 0.12.0
Build 1 package: the story in the real cell, levelling and routines, looks to validate, fix rounds 2 and 3, her board answers

```specs
when: Sat 14.11. 23:07
commit: build-0.12.0 / cc2e126
branches: 18
```

**Branches:** `b1-look`, `c4-brain`, `c4-corpus`, `unit-pilot`, `c5-named`, `c7-exercitatio`, `char-batch`, `b1-npcanims`, `c6-routines`, `b1-cell`, `b1-corpus`, `b1-hairhq`, `b1-cellstory`, `b1-credits2`, `b1-look2`, `b1-talknpc`, `b1-fix2`, `b1-fix3`

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
