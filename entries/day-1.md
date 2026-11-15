---
title: day-1.log: build the smallest world
slug: day-1
order: 4
date: 2026-11-12
day: day 1
phase: jam
status: live
cover: assets/img/day-1-cover-split-final.jpg
cover_alt: Split image with the early UE third-person template movement test on the left and the first populated jam island iteration on the right
summary: At 06:00 there was no game. Eighteen hours later there was a tested UE 5.8 build ladder, an island, NPCs, time and weather, and an honest list of what was still broken.
---

```recap
**Before this entry:** a prepared toolchain and a few written directions. No concept, project, code or asset.
**What this entry covers:** 12 November, from the first brief to the last Windows integration attempt before midnight. The rebuilt Build 0.7 belongs to day 2.
```

The picture above is one day in two halves. Left: the first grey movement test. Right: the island build at the end of the day.

At 06:00 there was no game. Half an hour later there was a name, a world and a limit: **Darkest Night**, by **Red Robin**, the smallest playable slice of the game I actually want to make.

The pitch: «the game I have always dreamed of making», an «Open World Medieval Dark High Science Fantasy RPG». The anchor was in from the start: «It should play in their equivalent of the time of Copernicus. Scientific discovery in dark times.»

The first image was an island with a castle. The player arrives as a prisoner, an Elder Scrolls homage. The jam target was narrow on purpose: one cinematic place, RPG movement, a day/night cycle, a few inhabitants, minimal UI, Windows and Mac builds, and a way towards local AI characters later.

```gallery contain
assets/img/day-1-concept-sheet.webp | One of the first concept sheets: masked figures, castles, eclipse imagery. | Dark fantasy concept sheet with masked characters, castles and eclipse imagery | 1600 x 900
assets/img/day-1-gasp-first-person.webp | The third-person template. Classic. The left half of the title image. | Unreal third-person template movement test in a purple obstacle course | 1600 x 900
assets/img/day-1-title-raw.webp | The first raw title screen. Proof that the frontend flow could start. | Black early title screen reading DarkestNight | 1600 x 900
```

## A build ladder

Claude Code ran the main Windows work in separate Git worktrees. Codex took Mac-side work. Specialist agents worked on systems, world, characters, audio and look in parallel. The terminal was less a chatbot, more a small noisy control room.

```gallery contain
assets/img/prep-3-terminal-layout.webp | The multi-pane terminal: agent sessions, logs and hand-offs side by side. | Dark terminal workspace divided into several panes with agent sessions and logs | 1600 x 900
```

The Unreal project lives in its own local Git repository, because binary assets need one writer. The jam repository holds plans, logs and tools. That was decided at 07:00, before parallel work got hard to untangle.

```timeline
06:33 | kickoff | Darkest Night, Red Robin, island, castle, prisoner, UE 5.8
07:00 | structure | separate Unreal repo; Windows writes assets, Mac builds from Git
07:22 | build 0.3 | Skyrim-like manual saves plus Quick and six rotating autosaves
08:46 | build 0.4 | GASP movement, custom C++ camera, equipment data and frontend feature-complete
08:59 | package | Build 0.4 packaged and its automated smoke suite passed
14:38 | build 0.6 | packaged time-and-weather test passed twice
16:57 | playtest | inverted-feeling mouse, missing control help and HUD needs reported
22:55 | build 0.7 | the b07-integrate package passed its suite except the orb traversal course
23:59 | close | creative reviews still running; rebuilt Windows and Mac 0.7 moved to day 2
```

Every ambitious system stayed replaceable. If a higher rung failed, the lower one still worked.

### 0.1 · Input

C++ Enhanced Input for keyboard, mouse, controller and device switching. **Verified:** 66 automated checks. **Limit:** no physical controller tested yet.

### 0.2 · Graphics

DLSS Super Resolution, DLAA and a TSR fallback. **Verified:** 9/9 image-mode A/B checks on Windows. Mac used TSR. **Limit:** Frame Generation initialised, but was not yet a proven gameplay feature.

### 0.3 · Persistence

Unlimited named saves, Quick Save, six rotating autosaves, Continue and a save blocker. **Verified:** packaged save/load on Windows and Mac.

### 0.4 · Player shell

GASP locomotion, a custom C++ camera, first and third person, zoom, shoulder swap and the frontend. Data-only hand slots for later equipment.

### 0.5 · Inhabited island

Procedural scatter, navigation, NPC schedules and appearance data. **Verified:** 0/10/30/50 NPC scaling runs. The playable setup had 29 NPCs in six groups.

### 0.6 · Time and weather

An accelerated clock, moon phases, sunrise and sunset states and weighted weather. **Verified:** time jump, pause, save/load and sky sync in the packaged build.

### 0.7 · Readable prototype

UI, debug views, stats, loading flow, the NPC MetaHuman test and teleport orbs. **Result:** every packaged suite passed except the automated orb course.

## What the player could do

The player could switch between first and third person, zoom, swap the camera shoulder and move with GASP. The frontend started or continued a game. Saving was blocked during unsafe transitions.

The input layer lives in C++, not in a Blueprint, so it can be tested. Keyboard, mouse and controller share one route. Controller support was not finished: 66 checks passed, but nobody had held a real controller yet.

The Mac mattered all day. It had no NVIDIA plugin, so it ran the TSR fallback. Integrated Mac packages existed for 0.3 and 0.4. Later systems had Windows packages or branch packages only. A branch package, a merged Windows package and a native Mac package are three different kinds of evidence.

There were early failures. The first Mac package needed an EngineSettings dependency. A later development build crashed before writing a log. The working theory was a Low Level Memory Tracker race, and runs with `-LLM` passed 15 of 15. That is a test workaround, not a fix.

## The island becomes a systems test

The first island was too big for four days, but worth keeping for later. A smaller one became the test ground: landscape, vegetation, castle blockout, opening cameras, NPC spots, time, weather and a small astronomical HUD.

```clips
assets/video/day-1-npc-test.mp4 | **13:26 CEST · 7h26 after jam start.** Lightweight NPCs testing schedules, navigation and load. | assets/img/day-1-npcs-night.webp
assets/video/day-1-castle-blockout.mp4 | **14:11 CEST · 8h11 after jam start.** The castle and island blockout as a moving sketch. | assets/img/day-1-island-opening.webp
assets/video/day-1-island-play.mp4 | **16:39 CEST · 10h39 after jam start.** The packaged Build 0.6 island after world, time and character tracks came together. | assets/img/day-1-npcs-day.webp
```

At 14:38 the packaged 0.6 time-and-weather test passed twice. It covered clock rate, pause, sync after time jumps, eight moon phases, the sundial HUD, sunrise and sunset, weighted weather and save/load. A later world test counted 1,258 PCG instances and took ten camera shots in the Windows package.

```gallery contain
assets/img/day-1-npcs-to-metahumans.jpg | Population pipeline: coloured test NPCs on the island, and a MetaHuman source prepared to replace them. | Split image of lightweight island NPCs and a MetaHuman source in the editor | 1600 x 900
assets/img/day-1-npcs-night.webp | The same systems at night: navigation, home schedules and the astronomical HUD. | Unreal island scene at night with NPCs and HUD | 1600 x 900
assets/img/day-1-time-hud-options.webp | Early time and moon HUD variations. | Review sheet with several time and moon HUD variations | 1600 x 900
assets/img/day-1-island-opening.webp | An early opening camera on the smaller island. The foreground trees still smear. | Early cinematic opening view across the island | 1600 x 900
assets/img/day-1-wind-fix.webp | Foliage wind, before and after. Switching off Nanite on the Norway maples removed the worst smear. | Four-frame comparison of foliage before and after the wind rendering fix | 1600 x 900
```

The NPC slice was cheap before it was pretty. Lightweight and GASP-based characters were compared at 0, 10, 30 and 50 NPCs. All 50 walked the navmesh, went home at night and came back from a save. These are numbers from a controlled test, not a finished crowd system.

## Stats, loading and debug

Build 0.7 gave the prototype a readable shell. Health, stamina and mana had explicit rules. Low health got a screen effect. Menus and debug screens showed state. Loading got a fade, input gating and a save blocker. Teleport orbs linked the landing point and the castle, so the flow could be tested without an authored path.

```gallery contain
assets/img/day-1-low-health.png | Low-health screen treatment in the packaged prototype. | Red low-health vignette over a third-person Unreal scene | 1600 x 900
assets/img/day-1-pause-debug.webp | The first pause and debug menu. | Dark first pause and debug menu over the game | 1600 x 900
assets/img/day-1-ui-system-dark.webp | A darker UI system proposal: hierarchy, type, panels. A review sheet, not an implemented screen. | Dark fantasy user interface system board | 1600 x 900
```

The first orb package travelled wrong and failed several checks. The next run fixed a crash at the end of the fade. The orbs then worked, with fade and save blocking. The automated obstacle course still reached the hurdle, jumped and never entered traversal. It stopped after moving 207 units, twice at the same point. The honest result: **PASS except orb course**.

## Six tracks beside the game

Not everything visible on day one was integrated. I kept the tracks apart so their status stayed clear:

- **Game build:** code, packaged tests, the island.
- **MetaHumans:** source characters, retargeting, motion tests.
- **Audio:** SFX boards and music directions. No finished mix yet.
- **Visual identity and UI:** logo, eclipse ring, title screen, interface.
- **Story and level:** concepts and blockouts for later builds.
- **ACE lab:** ASR, TTS and a local LLM, in a separate lab project. No NPC conversation in the game yet.

The ACE lab showed the local pieces can run, with a workaround path of roughly 1.7 to 2.4 seconds. Candidate packages were about 4.6, 6.0 and 8.7 GB zipped, with a combined VRAM use of about 6.9, 8.5 and 10.7 GB. These are planning numbers. No talking NPC existed in the game.

```gallery contain
assets/img/day-1-metahuman-source-editor.png | Codex drove the MetaHuman editor on its own after the Claude Code route would not. One agent's limit did not stop the track. | MetaHuman character open in Unreal Engine editor under Codex desktop control | 1600 x 900
assets/img/day-1-metahuman-motion-review.webp | Retarget review: body-shape mismatches, stale meshes and naming collisions, caught before a rebuilt review map passed. | Review board showing MetaHuman movement and retargeting tests | 1600 x 900
assets/img/day-1-metahuman-cast-review.webp | 19 assembled MetaHuman appearances through idle, walk, run, sprint, crouch and jump. A technical test, not a final cast. | Contact sheet of multiple MetaHuman body types moving through the Unreal retarget test | 1600 x 900
```

Clothing is the riskiest unknown. I bought a fantasy asset pack to give the characters a chance. Fitting clothes to MetaHumans can become its own production. I have made simple clothes in Marvelous Designer before, and even that was painful.

```gallery contain
assets/img/day-1-armor-concepts.webp | Clothing and armour directions for the cast. Targets only. The fitting work still lay ahead. | Fantasy clothing and armour concept sheet | 1600 x 900
```

## The player becomes the director

By evening the problem was not output. It was choosing what survives. Agents made logos, type, UI, bodies, concepts, SFX and music. I reviewed them on local boards with three states: **take it**, **with changes**, **not now**. "Not now" keeps the item and the comment.

```gallery contain
assets/img/day-1-brand-review.webp | One of the first brand reviews: studio and game marks side by side. | Browser review board with early Red Robin and Darkest Night identity studies | 1600 x 900
assets/img/day-1-ring-study.webp | Eclipse ring variations, from ornate emblem to a quieter mark. | Grid of minimal eclipse ring logo studies | 1600 x 900
assets/img/day-1-title-ring-mock.webp | A title mock with the restrained ring. | Dark title screen mock with a thin eclipse ring | 1600 x 900
assets/img/day-1-ui-title-mock.webp | An earlier title and menu proposal, kept for comparison. | Dark fantasy title menu concept | 1600 x 900
```

The decisions that came out of it: the studio is **Red Robin**, with a space. The game is **Darkest Night**, and the Latin subtitle stays open. The wax seal left the robin. The game mark moved to a restrained eclipse ring. The UI moved away from generated background art towards black screens, one detailed 3D object, sparse particles and a modern layer over the fantasy world.

```clips
assets/video/day-1-eclipse-ring.mp4 | **21:55 CEST · 15h55 after jam start.** Round six of the eclipse ring, an eight-second seamless moon loop. Motion showed which versions felt like an interface and which like a generic fantasy logo. | assets/img/day-1-ring-study.webp
```

The same process redirected audio. The first music sounded like a story score: too upbeat by day, too romantic by night, too heroic in combat. The next brief asked for sparse exploration beds, darker combat, a strong title piece and small doses of classical DnB, angelcore, nightcore and phonk. Generated footsteps sounded wrong, so GASP's own step sounds stayed. Listening beat quantity.

```gallery contain
assets/img/day-1-sfx-review.webp | The SFX board. A big batch made inspectable. | Browser review board with many sound effect cards and controls | 1600 x 900
assets/img/day-1-ui-review.webp | UI proposals with status and comments on each card. | Browser review board of interface concepts | 1600 x 900
assets/img/day-1-menu-review.webp | Menu directions compared as a set. | Browser review board showing title and menu variations | 1600 x 900
```

The provenance rule began at 21:13. Later cards record backend, model, licence and agent. Earlier material is not described as if it had that data.

## The human state behind the agent factory

Around six in the morning, "day one" stopped matching a normal day. My sleep was broken, the agents had multiplied and the orchestration was getting muddy in my head. I had taken time off. My father was on a night shift and my mother had the day off. At 29, I was building this from my parents' home and being fed while the terminals kept moving.

My Outlook account locked me out. Some services and API keys depend on it. It was a real setback, but not the centre of the night: «But I am relaxed, because I have already managed to get so much done.»

The website did not feel right yet. I wanted more images and clips on show, and eventually an editor: a way to see all media, replace it, move it, save, and see the result. The review board is a first step.

There is a difference between "AI made this" and "I was absent". A lot of production was delegated. Direction, rejection, scope and taste were work: «I did make creative decisions.» I also knew the speed would leave debt: «I know I will have a lot to clean up, but for prototyping it is great.»

## What broke

```log
FAIL | Mac package 0.3 initially did not link: missing EngineSettings dependency
FAIL | one Mac development build crashed before writing a log; -LLM became the test workaround
FAIL | vegetation wind smeared badly; the Norway maples lost Nanite for the jam build
FAIL | C: filled during builds; caches and package output moved to D: behind junctions
FAIL | the first Build 0.7 package bypassed travel incorrectly and failed several tests
FAIL | the first orb run crashed at the end of the fade; that crash was fixed
OPEN | the orb course reaches the hurdle and jumps, but traversal never starts (moved=207)
OPEN | water and the overall look still need a serious pass
OPEN | clothing the MetaHumans may exceed what the cinematic return justifies
OPEN | Outlook account access is broken and may block service/API administration
```

The b07-integrate package at 22:55 was 2.8 GB. It passed build, input, movement, frontend, world, time, NPC, appearance, UI, stats, loading and save tests. Weather work on another branch hit more unity-build name collisions. A fix was ready, but the build was stopped under memory pressure before midnight. There was no all-green main package that night.

## End of day 1

The day did not produce the cinematic game in my head. It produced a spine for it.

- A UE 5.8 C++ project packaged through the early ladder on Windows and Mac.
- GASP movement with an own camera and input layer.
- A smaller procedural island with an opening flow, NPCs, time and weather.
- Saves, settings, stats, debug views, loading and packaged tests.
- Visible tracks for characters, audio, identity, UI, level and story.
- A fallback-first plan for dialogue, clothing, loading and levelling.
- A review process where I, not the pipeline, decide what enters the game.

At midnight the island still looked like a prototype. The water was wrong. The obstacle course was red. Many boards were still proposals. The ACE lab was still separate. The cross-platform 0.7 rebuild had not happened. My sense of time was odd enough that "overnight" meant "while I finally sleep after sunrise".

But the project could be built, run, inspected and criticised. For the first eighteen hours, that was enough.

<!-- branches-embed -->
```embed
builds.html?day=1 | Branches of day 1: every branch active that day, by area, with the build it shipped in. Hover or tap a row. | 1000
```
