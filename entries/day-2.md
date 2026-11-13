---
title: day-2.log: the agent factory needs rules
slug: day-2
order: 5
date: 2026-11-13
day: day 2
phase: jam
status: live
cover: assets/img/day-2-cover.webp
cover_alt: Three-part view of the Day 2 prototype world, a film-print look comparison and the expanding castle approach
summary: The prototype kept growing, but so did the number of branches, agents and compile collisions. Day 2 became a test of whether the factory could be made safer without stopping it.
---

```recap
**Before this entry:** Day 1 ended with a playable Windows Build 0.7 integration, an island full of systems and one stubborn red orb-course test. The rebuilt cross-platform result had not happened yet.
**What this draft covers:** 13 November, 00:00–14:40 CET. It is a live first half of Day 2, not an end-of-day retrospective.
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

At 04:23 the water and music lines met on main as `build-0.7.1`. There is no documented fresh package test of that exact post-merge tag. Its two parents had package evidence; the merged tag itself did not. That gap belongs in the log because “both sides passed” and “the merge passed” are not the same statement.

```timeline
02:49 | music | runtime system, fallbacks and 36 automated checks
03:15 | water | three replaceable implementations tested on its branch
03:26 | fonts | selected type assets merged into the game line
03:52 | collision | the first combined package exposes Unity helper-name clashes
04:11 | repair | qualified helper names pass clean editor and package builds
04:23 | tag | music and water meet on main as build-0.7.1; no fresh post-merge package recorded
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

The website became another live system. Day 1 was expanded into a much more visual article, and its sidebar player grew from four tracks to twelve reviewed directions with local covers, scrolling titles and separate high, mid and bass waveforms. Then a hidden browser tab kept playing after the visible tabs were closed. The fix made track changes stop the previous source, stopped playback after one track, paused on page exit and used cross-tab coordination so only one devlog tab can play.

## Current state at 14:40

```log
PASS | Windows Build 0.7 package suite, except the existing orb traversal course
PASS | native Mac Build 0.7 package and the subset of tests actually run there
PASS | isolated music package, water package and C1 trial tests
PASS | headwear review module reports 88/88 automated checks
FIXED | two-stage Unity-build helper collision during music integration
OPEN | no fresh package test is documented for the exact build-0.7.1 merge tag
OPEN | Build 0.9 / Build 1 work is an active integration line, not a packaged release
OPEN | water, final look, MetaHuman clothing and the orb traversal course
OPEN | many generated assets still need selection, cleanup, retopology or real integration
RISK | agent throughput is exceeding the rate at which one person can continuously audit every branch
```

Day 2 is not finished, and neither is this entry. The useful shift is that confusion is no longer being treated as a personal failure to “keep up.” It is an engineering signal. If several agents can produce systems faster than one director can review them, then branch ownership, test scope, compile budgets, reversible modules and honest status labels are part of the game project too.

The vibe-coding answer is therefore not to stop asking ambitious questions. It is to keep the smallest known-good build alive while asking them.
