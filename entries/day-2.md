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
summary: Five more packaged builds turned the prototype into a dense playable system. Day 2 also became a test of how to make decisions when agents, branches and review boards move faster than one person can absorb them.
---

```recap
**Before this entry:** Day 1 ended with a playable Windows Build 0.7 integration, an island full of systems and one stubborn red orb-course test. The rebuilt cross-platform result had not happened yet.
**What this live entry covers:** 13 November, 00:00 CET through the human decision phase at 03:56 on 14 November. Jennifer's sleep-shifted Day 2 is still in progress; this is not an end-of-day retrospective.
```

Day 2 started with the least glamorous version of progress: rebuild the thing, run the tests again, and find out which of yesterday's claims still survived contact with another machine.

The three panels above show the day pulling in three directions at once. The left is the still-obviously-prototype world. The centre is a measured film-print comparison rather than a mystery LUT. The right is the castle approach expanding into roads, terraces and walls. The game was getting broader. So was the job of understanding it.

## 00:12 · Stabilise before adding more

The first Day 2 run was a trial merge of the C1 character branch onto the 0.7 integration line. Three conflicts were resolved by keeping the useful parts from both sides, and a duplicate Stats HUD helper had to be renamed because Unreal's Unity build placed previously separate source files together.

That trial packaged on Windows. Character and stats tests passed both with and without the character module, alongside weather, NPC, time, loading and UI. This was **not yet a normal main-branch integration**. It was a successful rehearsal on `c1-trial`.

```clips
assets/video/day-2-c1-trial.mp4 | **00:12 CET · 18h12 after jam start.** The first Day 2 run of Build 0.7 with the C1 character branch trial-merged into the integration build. | assets/img/day-2-world.webp
```

At 00:24 the Windows Build 0.7 package passed its full suite, including the new weather test. The orb teleport itself worked, but the automated jump-course traversal still failed. At 00:50 the same 0.7 revision packaged natively on Mac in 290 seconds at 2.1 GB. Smoke, frontend, world, weather, time, stats, loading and UI passed there too. Input, movement, NPC, appearance and the orb course were not run on that Mac pass, so they are not silently counted as green.

```gallery contain
assets/img/day-2-world.webp | The playable valley and approach road at the start of Day 2, with the castle still represented by deliberately crude blockout volumes. | Third-person prototype view down a grassy valley towards a grey castle blockout | 1600 x 900
assets/img/day-2-npcs.webp | The current character running through the population test. These figures exercise schedules, navigation and load; they are not final inhabitants. | Third-person character running among test NPCs in a grassy Unreal world | 1600 x 900
assets/img/day-2-courtyard.webp | Inside the castle courtyard while time, HUD and NPC systems run together in one world. | Third-person character and test NPCs inside a bright castle blockout | 1600 x 900
```

## 00:57 · A passing build can still look wrong

The rebuilt package did not settle the visual question. Jennifer's playtest exposed obvious water artefacts and a wider problem with the tone on both platforms, worse on Mac. Passing automation meant that the systems ran; it did not mean the result was pleasant to look at.

```clips
assets/video/day-2-water-playtest.mp4 | **00:57 CET · 18h57 after jam start.** The rebuilt 0.7 playtest that made the next problem impossible to ignore: broken-looking water and a world whose overall visual tone still felt wrong. | assets/img/day-2-water-editor.webp
```

The response was modular instead of destructive. A water branch exposed Simple, Easy Waterscape and Waterline as switchable implementations with a fallback. Its own package passed a six-part water test, smoke and world tests. Simple was fastest, corrected Easy was slower but clean, and Waterline sat between them. Waterline still lacked proper shore treatment and was not cooked into the later 0.7.1 merge. The screenshot below is an editor experiment, not a claim that the replacement shipped.

```gallery contain
assets/img/day-2-water-editor.webp | An alternative ocean actor under inspection in Unreal after the package playtest rejected the original water. This remained an isolated editor experiment. | Unreal Editor showing an alternative ocean surface and water actors | 1600 x 900
assets/img/day-2-look-split.webp | A Round 5 in-engine split: untreated blockout on the left and a Kodak 2383 print study on the right. The point was to compare one controlled transform at a time. | Split image of a grey castle gate before and after a film-print colour treatment | 1400 x 875
```

The look track followed the same rule. Research covered the UE 5.8 colour pipeline and common causes of the generic “Unreal look.” A neutral base preset and film-print candidates were captured in engine, but the `b1-look` work remained isolated: no game-target package, no Mac result and no merge. It is evidence for a direction, not a final grade.

## Labs become modules, not promises

Several impressive-looking results stayed deliberately outside the game.

The ACE lab's local roleplay package scored 79/79, 78/79 and 79/79 in three model tiers, while combined voice and menu tests also passed. Audio2Face started driving ARKit curves on a proxy face 70–77 ms after TTS chunks. The cost was about 1.5 GB of package size and 1.1 GB of VRAM. That is useful engineering evidence, but it is still a separate laboratory with a proxy face — not a talking MetaHuman NPC inside *Darkest Night*.

Music moved closer to game code. Day/night beds, quiet optional flavours, an independent-clock combat pool and a frontend title route passed 36 automated checks across the new system and fallbacks. The package passed the music and input tests. Nobody had listened to that exact integrated build yet, so the result was technically verified and creatively unapproved.

The final type set — IM Fell English SC, IM Fell Great Primer and Barlow — became real Unreal font assets. A fresh-process import check passed. At that moment the fonts had still not been seen inside a player widget.

```gallery contain
assets/img/day-2-iron-mask.webp | One of the image-to-3D experiments. The silhouette survived conversion, but the roughly 500k-triangle result still needed retopology before it could be treated as game art. | Dark iron mask rendered on a neutral background | 1024 x 1024
assets/img/day-2-armillary.webp | The armillary linked observatory prop, eclipse mark and loading-screen ideas. It was a generated mesh prototype, not an imported final asset. | Brass armillary sphere on a carved wooden stand | 1024 x 1024
assets/img/day-2-armor-set.webp | The first assembled clothing-and-armour set proved that tunic, mail and helmet pieces could be authored as layers. MetaHuman fitting and deformation were still the hard part. | Simple mannequin wearing a red tunic, mail and helmet | 1024 x 1024
```

```clips
assets/video/day-2-armor-turntable.mp4 | **01:10 CET · 19h10 after jam start.** A short layer-check turntable used to catch intersections and proportion problems before any Unreal import. | assets/img/day-2-armor-set.webp
assets/video/day-2-loading-study.mp4 | **Around midday · concept track.** A loading-screen study where the armillary stays visually central while its rings communicate progress. This is motion design, not an integrated loading widget. | assets/img/day-2-ui-round9.webp
```

## 04:23 · Integration creates its own debt

The music and water parents were individually healthy enough to merge, but bringing them together exposed a classic parallel-development problem. Unreal's Unity build groups source files differently as the codebase changes. Two anonymous helper functions that had never met before suddenly shared one compilation unit and collided.

The first rename let the package build and tests pass, but a clean editor build still found ambiguity. A second fix placed the helpers in qualified namespaces. Only then did both editor and package builds complete again. The music package was 3,063 MB and its packaged music and input tests passed.

At 04:23 the water and music lines met on main as `build-0.7.1`. The first version of this devlog said there was no fresh package test of that exact merge. Later-synchronised Windows records corrected that: commit `5e4b4d3` received a full package run, and everything passed except the already-known orb traversal course. The native Mac package passed its systems too; World and Water produced zero screenshots because the sandbox path was wrong, not because the runtime test failed.

```timeline
02:49 | music | runtime system, fallbacks and 36 automated checks
03:15 | water | three replaceable implementations tested on its branch
03:26 | fonts | selected type assets merged into the game line
03:52 | collision | the first combined package exposes Unity helper-name clashes
04:11 | repair | qualified helper names pass clean editor and package builds
04:23 | tag | music and water meet on main as build-0.7.1; later records confirm the merged package
```

## Waking up into the agent factory

By noon the problem had changed. There was no shortage of output. There were character, story, sundial, look, music, PCG, clothing, headwear, UI and architecture threads moving at once. Jennifer was deliberately using the remaining weekly model allowance, but the speed made the whole system harder to hold in one head.

Earlier she had already described it as «a bit muddy in my brain» and added, «I know I will have a lot to clean up, but for prototyping it is great.» At 14:40 the sharper version was: «It is getting a bit confusing, and I am maximising my weekly usage and hopefully not destroying everything for the future.»

Different chats were being asked to delete obsolete material, move files into clearer places, improve efficiency and challenge the structure: «Is the architecture good? Can we make it better and faster to compile?» Her own summary was blunt and funny: «It is all very nooby and vibe-cody, but what can I do?»

Those are not claims that every deletion was audited or that the architecture is now solved. They describe the human control problem created by parallel generation. The work moved faster than one person could continuously re-read it, so safety had to become an explicit feature of the workflow.

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

The Build 1 and 0.9 work above is an **integration line in progress**, not a new packaged release. It shows how much was moving after waking up; it does not turn every branch into a finished feature.

## Noon produced more world than the morning could absorb

The castle approach moved from a road on a hill towards an authored traversal network: a main path, field routes, retaining walls, terraces and alternate climbs. The v2 plan treated the castle as stacked access layers rather than a single corridor. The rendered approach and route diagram are proposals and test assets; neither image proves a finished level.

```gallery contain
assets/img/day-2-approach-overview.webp | The second approach pass adds switchbacks, retaining walls and terraced fields below the castle. It is a spatial prototype assembled for review, not final environment art. | Aerial Unreal view of a castle approach with a winding road and terraces | 1600 x 900
assets/img/day-2-approach-layout.webp | The same approach reduced to paths, elevations and placement logic. This is the kind of unglamorous diagram that keeps procedural generation from becoming random scatter. | Top-down technical layout of paths and terraces on a mountainous island | 1600 x 900
assets/img/day-2-castle-routes.webp | Castle v2 planned as stairs, climbs, drops, shafts, social gates and water routes. This is an agent proposal and route map, not a claim that every route exists in Unreal. | Dense route diagram connecting stacked castle areas and alternate paths | 1600 x 1200
```

Headwear became its own small module. Sixteen items were registered across hats, helmets, masks and a collar, with a generated fit table for several body targets. Its automated review test reported `HEADWEAR_TEST_PASS 88/88`. These sheets show the in-game review setup, not a final cast or final fitting quality.

```gallery contain
assets/img/day-2-headwear-third.webp | Third-person headwear review in the GASP test space. The floating and worn items make coverage and scale errors easy to spot without pretending this is a cinematic scene. | Third-person mannequin surrounded by hats, helmets and coloured test markers | 1600 x 900
assets/img/day-2-headwear-first.webp | The same module from first person, checking what equipment and debug markers remain readable from the player camera. | First-person view across headwear and coloured test markers in a purple test map | 1600 x 900
assets/img/day-2-ui-round9.webp | Round 9 brought start screen, loading object and time HUD into one brass-and-eclipse visual system. It is a review strip; the UI is not fully integrated. | Wide review strip of eclipse logo, armillary loading screen and circular time HUD | 2560 x 394
```

## Making the factory safer

The most important feature added after noon may be a set of limits rather than a player mechanic:

- no more than three sessions compiling at once;
- reuse existing worktrees instead of multiplying them without need;
- prefer small editor tests and dedicated test maps before packaging gigabytes;
- write helper names that stay unique when Unity merges translation units;
- start Unreal with the expensive SDK setup skipped when it is not needed;
- keep experimental systems behind switches so the fallback still runs;
- record which line is 0.9, which is 0.9.1 and which is held for Build 1.

There was cleanup outside the code too. The 314 GB NvRTX source build moved to `D:` behind a verified junction, freeing roughly 432 GB on `C:`. ACE setup and staging scripts that had lived as operational knowledge were pulled into tracked source. Old Unreal projects and lab build output started moving or being pruned. None of this makes a good trailer shot, but it is what lets the next compile happen.

The website became another live system. Day 1 was expanded into a much more visual article, and its sidebar player grew from four tracks to twelve reviewed directions with local covers, scrolling titles and separate high, mid and bass waveforms. Then a hidden browser tab kept playing after the visible tabs were closed. The fix made track changes stop the previous source, paused on page exit and used cross-tab coordination so only one devlog tab can play. A later change made a deliberately started playlist advance forever, wrapping from track twelve to track one.

## Current state at 14:40

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

That was the state at 14:40, not the end of the day. The next twelve hours turned several branches into five packaged builds and turned the review problem into the main design problem.

## 14:51–19:32 · Four hours, three packages

Build 0.9 arrived at 14:51, 32 hours and 51 minutes after the jam began. The 3,974 MB Windows package joined the 0.8.2 base to story work, the C1–C3 character, inventory and social systems, the armillary, look switching, PCG and level work, a sundial sleep-and-light puzzle and an initial character creator. Package smoke, sleep and character-creation tests passed; the quest suite reported 14/14 in the editor. It was Windows-only, and several things were obviously provisional: a cell still blocked the orb course, the bed and sundial stone were cubes, and the character creator was backlit and hard to read.

```gallery contain
assets/img/day-2-build09-character.webp | Build 0.9's first character-creation screen was real and usable, but still looked like a debug panel placed over the beach. The point of the package was to prove the flow before polishing it. | Early character-creation panel beside a mannequin on a bright beach | 1920 x 1080
assets/img/day-2-build09-sundial.webp | The first packaged sleep dial connected time selection to the light puzzle. Its clean circular layout already pointed towards the later eclipse UI language. | Circular sleep and wake-time dial over a simple test interior | 1920 x 1080
assets/img/day-2-build091-music-test.webp | Build 0.9.1's music overlay running inside the purple systems map. Debug text is doing the useful work here: it exposes which state, layer and cue the runtime believes it is playing. | Unreal test map with a large music-system debug overlay | 1920 x 1080
```

The work immediately became more test-first. A character batch reached 41/41 checks plus thirteen editor tests on its branch, but that evidence did not magically make it part of the packaged main line. Build 0.9.1 followed at 16:11. Its 4,055 MB package added dedicated test maps, UI, crouch and foot-placement fixes, the `dn4` switch, environmental signs, shared interaction, cinema and modal repairs, weather fixes, rain controls and safer NPC collision. The changed areas passed editor and package tests. One first launch ended in a DXGI device-hung error; more than nine later starts did not reproduce it, so the incident stayed recorded rather than being promoted into either a solved bug or a permanent failure.

Build 0.9.2 landed at 19:32 at 4,048 MB. It added music debug spheres, a unified interaction prompt, quest-driven character-creation and save rules, weather sequences, NPC animation LOD, GASP footsteps, the Calor warmth system and ember-room UI. Forty unit tests passed and the broad editor suite was green. In the package, only smoke and the 94-step input test were run. The 35-minute package time remained unexplained, and nobody had visually reviewed that build yet.

That changed during Jennifer's playtest around 20:40. She chose a longer title and loading flow, actual title music with an ambient loading bed, save and settings sounds, the HUD and glyph direction, a 72-minute day, a walk-only opening and the current weather and LOD approach. This is where a pile of implemented options began turning into her game rather than an agent default.

## The overload becomes the workflow

The problem was no longer a lack of material. It was the opposite. «I was overwhelmed during the day,» Jennifer says now. Questions lived across build notes, specialist chats and several review boards; answers were easy to give twice and hard to trace once.

At 19:42 the build history gained a proper changelog route. Between 21:19 and 21:29 all unanswered choices began moving into one `OPEN-QUESTIONS` funnel. At 21:34 Jennifer chose quality over raw speed, then at 21:35 asked for a fast start path anyway: fewer minutes between a change and a useful playtest, without pretending the verification step was optional. By 22:42 the boards themselves were being consolidated.

The strongest correction came during the next real playtest: «I want to retire the agents that have been doing stuff. I need fresh context for everybody.» This was not a rejection of agent work. It was an ownership decision. Old sessions had accumulated assumptions; the next orchestrator should gather their state, let one integration session own 0.9.4, then start fresh specialists from a known checkpoint. «I want to optimise my time» became a rule for the factory rather than a request to make every agent type faster.

```clips
assets/video/day-2-decision-board.mp4 | **01:53 CET · 43h53 after jam start.** The consolidated board in motion: one place for HUD, prompt, character, settings and audio choices instead of answers scattered across chats. The browser view is evidence of the decision process, not an in-game menu. | assets/img/day-2-consolidated-board.webp
```

```gallery contain
assets/img/day-2-consolidated-board.webp | A central board gathered island, kit, equipment, loading-prop and dungeon questions. Consolidation did not reduce the work to one click, but it made the remaining decisions countable and attributable. | Dark review board with several medieval building candidates and decision fields | 1388 x 710
assets/img/day-2-build093-settings.webp | The settings screen detected the RTX 5090, selected DLSS Quality and exposed the active result instead of hiding the chosen preset behind a label. This is the actual packaged interface. | Dark starry graphics-settings screen with detected-hardware summary | 1600 x 900
```

## 00:00–02:38 · The playtest writes 0.9.4

Build 0.9.3 was tagged at midnight, 42 hours after jam start. At 4,847 MB it carried the frontend, loading and preloading flow, saves, NVIDIA settings, HUD and glyphs, character creation, a walk-only escort and tutorial, the 72-minute day, FPS limits, MetaHuman hair handling, loading props and experimental chunking. Seventy unit tests passed, along with broad editor coverage and packaged smoke, input, loading and hair tests.

The status still had sharp edges. One armillary package shot was black. Hair emitted warnings and showed fringe risk. The travel-fade test timed out. Face LOD had not been visually checked, and the new UI paths were not all exercised in the package. It was still a Windows-only build.

```clips
assets/video/day-2-build093-character.mp4 | **00:53 CET · 42h53 after jam start.** Build 0.9.3's character creator running in the packaged frontend. The clip proves the screen moves and responds; it does not prove controller recovery or saving, which the later playtest found broken. | assets/img/day-2-build093-character.webp
```

```gallery contain
assets/img/day-2-build093-character.webp | The later character creator moved from the beach-debug look into the ember-and-eclipse frontend. It was much closer visually, while its input and save rules still needed the human playtest. | Character-creation screen with ember particles and a female base body | 1600 x 900
assets/img/day-2-sound-iteration.webp | The loading-finished cue went through many tiny variations. Several local rustles were rejected as scratchy; Jennifer wanted a dark, distant, heavy door or object rather than a bright UI tick. | Audio review board showing short cloth and loading-finished sound candidates | 1600 x 800
```

The 01:30 playtest supplied the useful failures. Switching between controller and keyboard could strand character creation. Q and E did not change tabs. Sprint returned after the cut. Autosave guards and player restoration were wrong; save-and-quit was wrong too. Stars, selector shapes and UI shadows needed another pass. Wind and rain were too loud indoors. The route was difficult to read, rocks floated and quest hints did not communicate enough. Guard state was not fully restored.

Jennifer made two immediate decisions: debug should be off by default but switchable from pause, and the loading object should remain visible for at least eight seconds while world sound is muted. The star and selector work then became unusually specific: combine the A and C star directions, chamfer the moon by seven millimetres, use genuinely three-dimensional star and lozenge forms and make ring-glide C deeper. The sound pass also exposed a real bug: what seemed merely “too busy” was five to twelve hits firing before the onset counter made the overlap measurable.

Build 0.9.4 was tagged at 02:22 and documented at 02:38, 44 hours and 38 minutes after jam start. The 4,849 MB package fixed modal input, escort and story state, saves, stars and 3D selectors, settings, character creation, the eight-second muted loading presentation, debug defaults and 27 UI sounds and textures. Package smoke, input and fast-start tests passed. The loading test failed because it still expected saving immediately after the skip, while the new character-creation gate intentionally blocked that save. The run did observe 8.28 seconds and muted world audio. Load, travel and quit scenarios were not run; nobody had listened to or visually approved every new asset, no real controller had been used, and Mac remained untested.

## 02:38–03:56 · Decision phase, not victory lap

By 02:30 the remaining choices were being pulled into one final board: 79 decisions rather than 79 half-remembered chat fragments. The confirmed direction included an eight-second load, preload plus one central object, separate title and music flows, restrained subtitle and hint policies, no giant scenic backdrops, no numerical warmth display, hand-drawn glyphs, a debug easter egg, the walk-only escort and explicit FPS caps. Some details, especially the final sprint scheme, remained agent proposals awaiting confirmation.

The clothing question finally received a controlled test instead of another beautiful concept sheet. At 03:36 an Epic Chaos Outfit creator build was compared with a tighter Blender weight-transfer version across body targets. Trousers behaved cleanly in both. The shirt still showed neck and shoulder penetration from the source fit. Parametric deformation could move the helmet by up to three centimetres, which is enough to ruin a rigid silhouette; the current recommendation is therefore fitted per-head helmets rather than pretending one elastic solution works for everything. This is a fitting study, not clothing running on a MetaHuman in the game.

```gallery contain
assets/img/day-2-parametric-clothing.webp | Guard 01 compares the parametric Chaos route above with a tighter Blender transfer and rigid helmet below. The boring grey sheet answers the important question: which parts may deform, and which must stay fitted. | Front side and back clothing-fit comparison for a broad guard body | 1400 x 1712
```

ACE was explicitly moved to Build 1. Its lively-NPC lab could continue, but it would not destabilise the Build 0 finish. At 03:52 only one integration session was authorised to touch the combined line. At 03:56 Jennifer rejected the latest local rustles as too scratchy and described the wanted loading-finished cue as a dark, distant, heavy door or object.

Anything after that needs a different label. The 03:57 Build 1 ladder is an agent synthesis, not a player-approved implementation. A later package of roughly 5,182 lines of story and dialogue is an agent draft: it is not built, tested or inside the game.

## Live checkpoint at 03:56

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

Day 2 is still going. The useful shift is that overload is no longer being treated as a personal failure to “keep up.” It is an engineering signal. If several agents can produce systems faster than one director can review them, then branch ownership, test scope, compile budgets, reversible modules, one decision funnel and honest status labels are part of the game project too.

The vibe-coding answer is not to stop asking ambitious questions. It is to keep the smallest known-good build alive, keep one person in charge of its meaning, and make the next decision visible.
