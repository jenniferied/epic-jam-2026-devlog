---
title: day-2.log: builds, overload and one decision board
slug: day-2
order: 5
date: 2026-11-13
day: day 2
phase: jam
status: live
cover: assets/img/day-2-cover.webp
cover_alt: Three-part view of the Day 2 prototype world, a film-print look comparison and the expanding castle approach
summary: Five more packaged builds turned the prototype into a dense playable system. Day 2 also became a test of how to decide when agents, branches and boards move faster than one person can read.
---

```recap
**Before this entry:** Day 1 ended with a playable Windows Build 0.7, an island full of systems and one stubborn red orb-course test. The cross-platform rebuild had not happened yet.
**What this entry covers:** 13 November, 00:00 CET to the decision phase at 03:56 on 14 November.
```

Day 2 started with the least glamorous kind of progress: rebuild, run the tests again, and see which of yesterday's claims survive another machine.

The three panels above show the day pulling three ways. Left: the world, still a prototype. Centre: a measured film-print comparison instead of a mystery LUT. Right: the castle approach growing into roads, terraces and walls.

## 00:12 · Stabilise first

The first run was a trial merge of the C1 character branch onto the 0.7 line. Three conflicts were resolved by keeping the useful parts of both sides. A duplicate Stats HUD helper had to be renamed, because Unreal's unity build put previously separate files together.

The trial packaged on Windows. Character and stats tests passed with and without the character module, next to weather, NPC, time, loading and UI. It was a rehearsal on `c1-trial`, not a normal main integration.

```clips
assets/video/day-2-c1-trial.mp4 | **00:12 CET · 18h12 after jam start.** Build 0.7 with the C1 character branch trial-merged. | assets/img/day-2-world.webp
```

At 00:24 the Windows 0.7 package passed its full suite, including the new weather test. The orb teleport worked. The automated jump course still failed. At 00:50 the same revision packaged natively on Mac in 290 seconds at 2.1 GB. Smoke, frontend, world, weather, time, stats, loading and UI passed. Input, movement, NPC, appearance and the orb course were not run on Mac, so they do not count as green.

```gallery contain
assets/img/day-2-world.webp | The valley and approach road at the start of Day 2. The castle is still crude blockout volumes. | Third-person prototype view down a grassy valley towards a grey castle blockout | 1600 x 900
assets/img/day-2-npcs.webp | The character running through the population test. Test figures for schedules, navigation and load. | Third-person character running among test NPCs in a grassy Unreal world | 1600 x 900
assets/img/day-2-courtyard.webp | The castle courtyard with time, HUD and NPC systems running together. | Third-person character and test NPCs inside a bright castle blockout | 1600 x 900
```

## 00:57 · A passing build can still look wrong

The rebuilt package did not settle the look. My playtest showed obvious water artefacts and a wrong overall tone on both platforms, worse on Mac. Green tests meant the systems ran. They did not mean it looked good.

```clips
assets/video/day-2-water-playtest.mp4 | **00:57 CET · 18h57 after jam start.** The 0.7 playtest that made the problem impossible to ignore: broken water and a wrong overall tone. | assets/img/day-2-water-editor.webp
```

The answer was modular. A water branch made Simple, Easy Waterscape and Waterline switchable, with a fallback. Its package passed a six-part water test, smoke and world tests. Simple was fastest. Corrected Easy was slower but clean. Waterline sat between them, lacked a proper shore and was not cooked into the later 0.7.1 merge. The screenshot below is an editor experiment. The replacement did not ship.

```gallery contain
assets/img/day-2-water-editor.webp | An alternative ocean actor in the editor, after the playtest rejected the original water. | Unreal Editor showing an alternative ocean surface and water actors | 1600 x 900
assets/img/day-2-look-split.webp | Round 5 in engine: untreated blockout left, Kodak 2383 print study right. One controlled change at a time. | Split image of a grey castle gate before and after a film-print colour treatment | 1400 x 875
```

The look track followed the same rule. It covered the UE 5.8 colour pipeline and the usual causes of the generic "Unreal look". A neutral base preset and film-print candidates were captured in engine. The `b1-look` branch stayed isolated: no game package, no Mac result, no merge. It points in a direction. It is not a final grade.

## Labs stay modules

Several impressive results stayed outside the game.

The ACE lab's local roleplay package scored 79/79, 78/79 and 79/79 in three model tiers. Combined voice and menu tests passed. Audio2Face drove ARKit curves on a proxy face 70 to 77 ms after TTS chunks, at about 1.5 GB package size and 1.1 GB VRAM. Good engineering evidence, but still a lab with a proxy face. No talking MetaHuman NPC in *Darkest Night*.

Music moved closer to game code. Day and night beds, optional flavours, an independent combat pool and a title route passed 36 automated checks. The package passed the music and input tests. Nobody had listened to that build yet: technically verified, creatively unapproved.

The final type set (IM Fell English SC, IM Fell Great Primer, Barlow) became Unreal font assets. A fresh-process import check passed. No one had seen the fonts in a widget yet.

```gallery contain
assets/img/day-2-iron-mask.webp | An image-to-3D experiment. The silhouette survived. The 500k-triangle mesh still needs retopology. | Dark iron mask rendered on a neutral background | 1024 x 1024
assets/img/day-2-armillary.webp | The armillary: observatory prop, eclipse mark and loading-screen idea in one. A generated prototype. | Brass armillary sphere on a carved wooden stand | 1024 x 1024
assets/img/day-2-armor-set.webp | First assembled armour set: tunic, mail and helmet as layers. MetaHuman fitting was the hard part still ahead. | Simple mannequin wearing a red tunic, mail and helmet | 1024 x 1024
```

```clips
assets/video/day-2-armor-turntable.mp4 | **01:10 CET · 19h10 after jam start.** Layer-check turntable to catch intersections before any Unreal import. | assets/img/day-2-armor-set.webp
assets/video/day-2-loading-study.mp4 | **Around midday · concept track.** A loading-screen study: the armillary stays central and its rings show progress. Motion design, not yet a widget. | assets/img/day-2-ui-round9.webp
```

## 04:23 · Integration creates debt

The music and water parents were each fine to merge. Together they hit a classic parallel-development problem. Unreal's unity build groups files differently as the code changes. Two anonymous helper functions that had never met now shared one compilation unit and collided.

The first rename let the package build and the tests pass, but a clean editor build still found an ambiguity. A second fix put the helpers into qualified namespaces. Then editor and package builds both completed. The music package was 3,063 MB and its music and input tests passed.

At 04:23 water and music met on main as `build-0.7.1`. The first version of this devlog said there was no package test of that exact merge. Later records corrected it. Commit `5e4b4d3` got a full package run and everything passed except the known orb course. The native Mac package passed its systems. World and Water produced no screenshots there because the sandbox path was wrong, not because the runtime test failed.

```timeline
02:49 | music | runtime system, fallbacks and 36 automated checks
03:15 | water | three replaceable implementations tested on its branch
03:26 | fonts | selected type assets merged into the game line
03:52 | collision | the first combined package exposes Unity helper-name clashes
04:11 | repair | qualified helper names pass clean editor and package builds
04:23 | tag | music and water meet on main as build-0.7.1; later records confirm the merged package
```

## Waking up into the agent factory

By noon the problem had changed. There was no shortage of output. Character, story, sundial, look, music, PCG, clothing, headwear, UI and architecture threads all moved at once. I was using up my weekly model allowance on purpose, but the speed made it hard to hold in one head.

Earlier I had said it was «a bit muddy in my brain» and «I know I will have a lot to clean up, but for prototyping it is great.» At 14:40 it got sharper: «It is getting a bit confusing, and I am maximising my weekly usage and hopefully not destroying everything for the future.»

I asked different chats to delete obsolete material, move files into clearer places and challenge the structure: «Is the architecture good? Can we make it better and faster to compile?» And, bluntly: «It is all very nooby and vibe-cody, but what can I do?»

This does not mean every deletion was audited or that the architecture is solved. It describes a control problem. The work moved faster than one person could re-read it, so safety had to become part of the workflow.

```timeline
12:06 | integration | story, social, inventory, armillary, look and PCG branches meet on a Build 1 integration line
12:37 | character | a character-creation MVP and the sundial branch are prepared
12:59 | rule | use editor tests first; package only when the evidence actually needs a package
13:03 | focus | stop parallel Mac development and Mac builds for now
13:24 | tempo | at most three compiling sessions; reuse worktrees and use Unity-safe helper names
14:17 | plan | split the next line into 0.9, 0.9.1 and held Build 1 work
14:22 | speed | document test maps and faster editor-start levers
14:36 | tests | add a first unit-test pilot and headless runner
```

The Build 1 and 0.9 work above was an integration line in progress, not a package.

## The castle approach grows

The approach moved from a road on a hill towards a traversal network: a main path, field routes, retaining walls, terraces and alternate climbs. The v2 plan treated the castle as stacked access layers, not one corridor. The renders and route diagram are proposals, not a finished level.

```gallery contain
assets/img/day-2-approach-overview.webp | Second approach pass: switchbacks, retaining walls and terraced fields below the castle. | Aerial Unreal view of a castle approach with a winding road and terraces | 1600 x 900
assets/img/day-2-approach-layout.webp | The same approach as paths, elevations and placement logic. The diagram that keeps procedural generation from becoming random scatter. | Top-down technical layout of paths and terraces on a mountainous island | 1600 x 900
assets/img/day-2-castle-routes.webp | Castle v2 as stairs, climbs, drops, shafts, social gates and water routes. An agent proposal, not every route exists in Unreal. | Dense route diagram connecting stacked castle areas and alternate paths | 1600 x 1200
```

Headwear became a small module of its own: sixteen items across hats, helmets, masks and a collar, with a generated fit table for several bodies. Its review test reported `HEADWEAR_TEST_PASS 88/88`. The sheets show the review setup, not final fit.

```gallery contain
assets/img/day-2-headwear-third.webp | Third-person headwear review. Floating items make coverage and scale errors easy to see. | Third-person mannequin surrounded by hats, helmets and coloured test markers | 1600 x 900
assets/img/day-2-headwear-first.webp | The same module from first person. | First-person view across headwear and coloured test markers in a purple test map | 1600 x 900
assets/img/day-2-ui-round9.webp | Round 9: start screen, loading object and time HUD in one brass-and-eclipse system. A review strip, not fully integrated. | Wide review strip of eclipse logo, armillary loading screen and circular time HUD | 2560 x 394
```

## Making the factory safer

The most important feature after noon may have been a set of limits:

- At most three sessions compiling at once.
- Reuse worktrees.
- Small editor tests and test maps before packaging gigabytes.
- Helper names that stay unique when Unity merges files.
- Start Unreal with the SDK setup skipped when it is not needed.
- Experimental systems behind switches, so the fallback runs.
- A written record of which line is 0.9, 0.9.1, or held for Build 1.

Cleanup happened outside the code too. The 314 GB NvRTX source build moved to `D:` behind a verified junction, which freed about 432 GB on `C:`. ACE setup scripts that lived as habit went into tracked source. Old projects and lab output started moving or being pruned. None of it makes a trailer shot. It lets the next compile happen.

The website became a live system too. Day 1 became a much more visual article. The sidebar player grew from four tracks to twelve, with covers, scrolling titles and separate high, mid and bass waveforms. A hidden tab kept playing after I closed the visible ones. The fix stops the previous source on every track change, pauses on page exit and lets only one devlog tab play. A started playlist now loops from track twelve to track one.

## Checkpoint at 14:40

```log
PASS | Windows Build 0.7 package suite, except the existing orb traversal course
PASS | native Mac Build 0.7 package and the subset of tests actually run there
PASS | isolated music package, water package and C1 trial tests
PASS | headwear review module reports 88/88 automated checks
FIXED | two-stage Unity-build helper collision during music integration
PASS | the exact build-0.7.1 merge was later confirmed on Windows and Mac, with documented test limits
OPEN | Build 0.9 / Build 1 work is an active integration line at this 14:40 checkpoint
OPEN | water, final look, MetaHuman clothing and the orb traversal course
OPEN | many generated assets still need selection, cleanup, retopology or real integration
RISK | agent throughput is exceeding the rate at which one person can continuously audit every branch
```

The next twelve hours turned several branches into five packaged builds and made review the main design problem.

## 14:51 to 19:32 · Four hours, three packages

Build 0.9 arrived at 14:51, 32 hours 51 minutes after the jam began. The 3,974 MB Windows package joined the 0.8.2 base to story work, the C1 to C3 characters, inventory and social systems, the armillary, look switching, PCG and level work, a sundial sleep-and-light puzzle and a first character creator. Smoke, sleep and character-creation tests passed. The quest suite reported 14/14 in the editor. It was Windows-only and visibly provisional: a cell still blocked the orb course, the bed and sundial stone were cubes, and the creator was backlit and hard to read.

```gallery contain
assets/img/day-2-build09-character.webp | Build 0.9: the first character creator. Usable, but it looks like a debug panel on a beach. The package proved the flow, not the look. | Early character-creation panel beside a mannequin on a bright beach | 1920 x 1080
assets/img/day-2-build09-sundial.webp | The first packaged sleep dial, linking time selection to the light puzzle. Its circle already points to the later eclipse UI. | Circular sleep and wake-time dial over a simple test interior | 1920 x 1080
assets/img/day-2-build091-music-test.webp | Build 0.9.1: the music overlay in the purple systems map. Debug text shows the state, layer and cue the runtime thinks it plays. | Unreal test map with a large music-system debug overlay | 1920 x 1080
```

Work became more test-first. A character batch reached 41/41 checks plus thirteen editor tests on its branch. That did not make it part of the packaged line. Build 0.9.1 followed at 16:11. Its 4,055 MB package added test maps, UI, crouch and foot-placement fixes, the `dn4` switch, environmental signs, shared interaction, cinema and modal repairs, weather fixes, rain controls and safer NPC collision. Changed areas passed editor and package tests. One first launch ended in a DXGI device-hung error. More than nine later starts did not reproduce it. It stays recorded, neither solved nor permanent.

Build 0.9.2 landed at 19:32 at 4,048 MB. It added music debug spheres, a unified interaction prompt, quest-driven character-creation and save rules, weather sequences, NPC animation LOD, GASP footsteps, the Calor warmth system and ember-room UI. Forty unit tests passed and the broad editor suite was green. In the package only smoke and the 94-step input test ran. The 35-minute package time stayed unexplained. Nobody had looked at that build yet.

That changed in my playtest around 20:40. I picked a longer title and loading flow, real title music with an ambient loading bed, save and settings sounds, the HUD and glyph direction, a 72-minute day, a walk-only opening and the current weather and LOD approach. This is where a pile of options started to become my game and not an agent default.

## The overload becomes the workflow

The problem was no longer too little material. «I was overwhelmed during the day,» I say now. Questions lived in build notes, specialist chats and several review boards. Answers were easy to give twice and hard to trace.

At 19:42 the build history got a changelog route. Between 21:19 and 21:29 every unanswered choice moved into one `OPEN-QUESTIONS` funnel. At 21:34 I chose quality over raw speed. At 21:35 I asked for a fast start path anyway: fewer minutes between a change and a useful playtest, with verification still required. By 22:42 the boards themselves were being merged.

The strongest correction came in the next playtest: «I want to retire the agents that have been doing stuff. I need fresh context for everybody.» It was no rejection of agent work. It was an ownership decision. Old sessions had piled up assumptions. The next orchestrator would collect their state, let one integration session own 0.9.4, and start fresh specialists from a known checkpoint. «I want to optimise my time» became a rule for the factory.

```clips
assets/video/day-2-decision-board.mp4 | **01:53 CET · 43h53 after jam start.** The consolidated board in motion: HUD, prompt, character, settings and audio choices in one place. The browser view documents the process, not an in-game menu. | assets/img/day-2-consolidated-board.webp
```

```gallery contain
assets/img/day-2-consolidated-board.webp | The central board: island, kit, equipment, loading-prop and dungeon questions. Decisions became countable and attributable. | Dark review board with several medieval building candidates and decision fields | 1388 x 710
assets/img/day-2-build093-settings.webp | The packaged settings screen detects the RTX 5090, picks DLSS Quality and shows the active preset. | Dark starry graphics-settings screen with detected-hardware summary | 1600 x 900
```

## 00:00 to 02:38 · The playtest writes 0.9.4

Build 0.9.3 was tagged at midnight, 42 hours after jam start. At 4,847 MB it carried the frontend, loading and preloading, saves, NVIDIA settings, HUD and glyphs, character creation, a walk-only escort and tutorial, the 72-minute day, FPS limits, MetaHuman hair, loading props and experimental chunking. Seventy unit tests passed, with broad editor coverage and packaged smoke, input, loading and hair tests.

Rough edges remained. One armillary package shot was black. Hair threw warnings and risked fringe. The travel-fade test timed out. Face LOD was unchecked. Not every new UI path ran in the package. Windows only.

```clips
assets/video/day-2-build093-character.mp4 | **00:53 CET · 42h53 after jam start.** The 0.9.3 character creator in the packaged frontend. It moves and responds. It did not yet recover from a controller switch or save correctly. The playtest found that later. | assets/img/day-2-build093-character.webp
```

```gallery contain
assets/img/day-2-build093-character.webp | The creator moves from the beach debug look to the ember-and-eclipse frontend. Closer in look. Input and save rules still wrong. | Character-creation screen with ember particles and a female base body | 1600 x 900
assets/img/day-2-sound-iteration.webp | The loading-finished cue, many tiny variations. Several rustles were rejected as scratchy. I wanted a dark, distant, heavy door, not a bright UI tick. | Audio review board showing short cloth and loading-finished sound candidates | 1600 x 800
```

The 01:30 playtest delivered useful failures. Switching between controller and keyboard could strand character creation. Q and E did not change tabs. Sprint came back after the cut. Autosave guards, player restoration and save-and-quit were wrong. Stars, selector shapes and UI shadows needed another pass. Wind and rain were too loud indoors. The route was hard to read, rocks floated and quest hints said too little. Guard state was not fully restored.

I made two decisions on the spot. Debug is off by default but switchable from the pause menu. The loading object stays visible for at least eight seconds while world sound is muted. Then the star and selector work got specific: merge the A and C star directions, chamfer the moon by seven millimetres, make star and lozenge forms truly three-dimensional, make ring-glide C deeper. The sound pass found a real bug: what sounded "too busy" was five to twelve hits firing before the onset counter made the overlap measurable.

Build 0.9.4 was tagged at 02:22 and documented at 02:38, 44 hours 38 minutes after jam start. The 4,849 MB package fixed modal input, escort and story state, saves, stars and 3D selectors, settings, character creation, the eight-second muted loading, debug defaults and 27 UI sounds and textures. Package smoke, input and fast-start tests passed. The loading test failed because it expected a save right after the skip, which the new character-creation gate blocks on purpose. The run did observe 8.28 seconds and muted world audio. Load, travel and quit scenarios were not run. Nobody had heard or seen every new asset. No real controller was used. Mac stayed untested.

## 02:38 to 03:56 · Decision phase, not victory lap

By 02:30 the remaining choices were pulled into one final board: 79 decisions instead of 79 half-remembered chat fragments. The confirmed direction: an eight-second load, preload plus one central object, separate title and music flows, restrained subtitle and hint policies, no giant scenic backdrops, no numeric warmth display, hand-drawn glyphs, a debug easter egg, the walk-only escort and explicit FPS caps. Some details, like the final sprint scheme, stayed agent proposals awaiting my answer.

Clothing finally got a controlled test instead of another concept sheet. At 03:36 an Epic Chaos Outfit creator build was compared with a tighter Blender weight-transfer version across body targets. Trousers behaved in both. The shirt still pushed through at neck and shoulder. Parametric deformation could move the helmet by up to three centimetres, enough to ruin a rigid silhouette. The recommendation: fitted per-head helmets. This is a fitting study, not clothing running on a MetaHuman in the game.

```gallery contain
assets/img/day-2-parametric-clothing.webp | Guard 01: the parametric Chaos route on top, a tighter Blender transfer and a rigid helmet below. The grey sheet answers one question: which parts may deform and which stay fitted. | Front side and back clothing-fit comparison for a broad guard body | 1400 x 1712
```

ACE moved to Build 1. Its lab could go on without disturbing the Build 0 finish. At 03:52 only one integration session was allowed to touch the combined line. At 03:56 I rejected the latest local rustles as too scratchy and described the wanted cue again: a dark, distant, heavy door or object.

Anything after that needs another label. The 03:57 Build 1 ladder is an agent synthesis, not something I approved. A later package of roughly 5,182 lines of story and dialogue is an agent draft: not built, not tested, not in the game.

## Checkpoint at 03:56

```log
PASS | Windows packages 0.9, 0.9.1, 0.9.2, 0.9.3 and 0.9.4 exist with explicitly different test scopes
PASS | 0.9.4 smoke, 94-step input and fast-start paths; loading duration and world mute observed
DECIDED | central decision funnel, fresh agent context, one integration owner and Build 1 separation
DECIDED | eight-second loading object, debug default off, walk-only opening and current UI direction
OPEN | real-controller pass, Mac package, full load/travel/quit coverage and creative review of 0.9.4 assets
OPEN | MetaHuman clothing remains a fitting problem; the parametric study is not an in-game result
OPEN | final loading-finished sound after the scratchy local rustles were rejected
RISK | automated green checks are growing faster than human visual, audio and architectural review
```

Overload is no longer a personal failure to "keep up". It is an engineering signal. If several agents can build faster than one director can review, then branch ownership, test scope, compile budgets, reversible modules, one decision funnel and honest status labels are part of the game project too.

The answer to vibe coding is not to stop asking big questions. Keep the smallest known-good build alive, keep one person in charge of what it means, and make the next decision visible.

<!-- branches-embed -->
```embed
builds.html?day=2 | Branches of day 2: every branch active that day, by area, with the build it shipped in. Hover or tap a row. | 1750
```
