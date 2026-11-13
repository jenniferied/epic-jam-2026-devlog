---
title: day-1.log: build the smallest world
slug: day-1
order: 4
date: 2026-11-12
day: day 1
phase: jam
status: live
cover: assets/img/day-1-cover-split-a.jpg
cover_alt: Split image with an early grey Unreal movement test on the left and the later green island build on the right
summary: At 06:00 there was no game. Eighteen hours later there was a tested UE 5.8 build ladder, an island, NPCs, time and weather, five parallel creative tracks, and a very honest list of what was still broken.
---

```recap
**Before this entry:** the toolchain was prepared and possible directions were written down, but there was no concept, game project, code or game asset.
**What this entry covers:** 12 November, from the first post-start brief to the final Windows integration attempt before midnight. The rebuilt Windows and Mac Build 0.7 results belong to day 2.
```

The picture above is one day in two halves. On the left: the first grey movement test. On the right: the later island build. They are not a polished before-and-after marketing shot; the line between them is the actual distance travelled on day one.

At 06:00 there was no game. Half an hour later there was a name, a world and a constraint: **Darkest Night**, made by **Red Robin**, would be the smallest playable slice of the game I actually want to make.

>> the game I have always dreamed of making

>> Open World Medieval Dark High Science Fantasy RPG

>> It should play in their equivalent of the time of Copernicus. Scientific discovery in dark times.

The first image was an island with a castle. The player arrives as a prisoner, an Elder Scrolls homage rather than a complete story. The larger ambition stayed visible, but the jam target became deliberately narrower: one cinematic place, movement that feels like an RPG, a day/night cycle, a few inhabitants, minimal UI, Windows and Mac builds, and a route towards local AI characters later.

```gallery contain
assets/img/day-1-concept-sheet.webp | One of the first visual direction sheets: masked figures, castle silhouettes, eclipse imagery and a world much larger than the jam build could contain. It is concept work, not implemented game art. | Dark fantasy concept sheet with masked characters, castles and eclipse imagery | 1600 x 900
assets/img/day-1-gasp-first-person.webp | The early movement sandbox from first person. Grey boxes and a mannequin were enough to answer camera and control questions before spending time on a world. | First-person Unreal movement test in a grey obstacle course | 1600 x 900
```

## A build ladder, not one giant promise

Claude Code orchestrated the main Windows work in separate Git worktrees. Codex handled Mac-side work where useful. Specialist agents worked on systems, world, characters, audio and visual directions in parallel. The terminal was less like a chatbot and more like a small, noisy control room.

```gallery contain
assets/img/prep-3-terminal-layout.webp | The multi-pane terminal layout in use: several agents, logs and hand-offs visible together. Parallelism created speed, but also an increasing amount of state to understand and reconcile. | Dark terminal workspace divided into several panes with agent sessions and logs | 1600 x 900
```

The Unreal project lives in a separate local Git repository because binary assets need one clear writer. The jam repository holds plans, logs, tools and reproducible source material. That split was decided at 07:00, before parallel work became difficult to untangle.

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

The ladder kept every ambitious system replaceable. The lower rung stayed usable if a higher one failed.

```specs
# 0.1 · input
implemented: C++ Enhanced Input, keyboard and mouse mappings, controller mappings, device switching logic
verified: 66 automated mapping and state checks
limit: no physical controller had been tested yet
# 0.2 · graphics
implemented: DLSS Super Resolution, DLAA and an explicit TSR fallback
verified: 9/9 image-mode A/B checks on Windows; Mac used TSR without NVIDIA plugins
limit: Frame Generation initialised, but was not yet a proven gameplay feature
# 0.3 · persistence
implemented: unlimited named manual saves, Quick Save, six rotating autosaves, Continue, save blocker
verified: packaged save/load and restore checks on Windows and Mac
# 0.4 · player shell
implemented: GASP locomotion, custom C++ camera, first/third person, zoom, shoulder swap, frontend
implemented: data-only left/right hand equipment slots so later items have somewhere to connect
# 0.5 · inhabited island
implemented: small island, procedural scatter, navigation, lightweight NPC schedule and appearance data
verified: 0/10/30/50 NPC scaling runs; 29 NPCs organised into six groups in the playable setup
# 0.6 · time and weather
implemented: accelerated clock, moon phases, sunrise/sunset states, weighted basic weather
verified: time jump, pause, save/load and sky synchronisation in the packaged build
# 0.7 · readable prototype
implemented: UI, debug views, stats, loading flow, NPC MetaHuman test and teleport orbs
result: every packaged suite passed except the automated orb traversal course
```

## What the player could actually do

This was more than a list of subsystems. The player could switch first and third person, zoom, swap the camera shoulder and move through the GASP locomotion set. The frontend could start or continue a game. The save menu supported arbitrary manual slots, a Quick slot and six rotating autosaves. Saving could be blocked during unsafe transitions instead of corrupting a state.

The input layer was intentionally owned by the project rather than hidden in a Blueprint. That made its behaviour testable and gave keyboard, mouse and controller a common route. It did not mean controller support was finished: the mappings and switching logic passed 66 checks, but no physical controller had yet been held in a human hand.

```clips
assets/video/day-1-gasp-early.mp4 | Early GASP movement in the functional test map. The clip records the behaviour before there was an island. | assets/img/day-1-gasp-first-person.webp
assets/video/day-1-island-play.mp4 | Later the same day: movement, camera and the first world running together in the island package. | assets/img/day-1-npcs-day.webp
```

The Mac mattered throughout. It had no NVIDIA plugin and therefore exercised the TSR fallback instead of pretending all target machines were the Windows workstation. Integrated Mac packages existed for Builds 0.3 and 0.4 before midnight. Later systems had Windows packages or separate branches, but the rebuilt cross-platform 0.7 result did not exist yet. That distinction is important: a branch package, a merged Windows package and a native Mac package are three different kinds of evidence.

There were early failures. The first Mac package needed an EngineSettings dependency. A later development build crashed intermittently before writing a log; the working theory was a Low Level Memory Tracker race, and runs with `-LLM` passed 15 out of 15. That is a useful test workaround, not proof that the engine issue disappeared.

## The island becomes a systems test

The first island footprint was too large for four days, but useful enough to preserve as a possible post-jam direction. A smaller version became the real test ground: landscape, vegetation, castle blockout, opening cameras, NPC locations, time, weather and a minimal astronomical HUD.

```clips
assets/video/day-1-castle-blockout.mp4 | The castle and island blockout as a moving spatial sketch. It answers scale and route questions, not final-art questions. | assets/img/day-1-npcs-night.webp
assets/video/day-1-npc-test.mp4 | Lightweight NPCs moving through the test world. Their job was to test schedules, navigation and load, not to pass as final characters. | assets/img/day-1-npcs-night.webp
```

At 14:38 the packaged Build 0.6 time-and-weather test passed twice. It checked clock rate, pause states, synchronisation after time jumps, eight moon phases, the sundial-style HUD, sunrise and sunset states, weighted weather, and persistence through save/load. A later world test counted 1,258 PCG instances and ten successful camera shots in the Windows package.

```gallery contain
assets/img/day-1-npcs-day.webp | The playable island in daylight with inhabitants distributed through the space. At this stage the world is a readable systems scaffold. | Unreal third-person island scene in daylight with multiple NPCs | 1600 x 900
assets/img/day-1-npcs-night.webp | The same systems had to survive darkness: navigation, home schedules and the astronomical HUD were tested at night rather than inferred from daytime. | Unreal island scene at night with NPCs and HUD | 1600 x 900
assets/img/day-1-time-hud-options.webp | Time and astronomy HUD studies. Several readings were explored before choosing what deserved space on screen. | Review sheet with several time and moon HUD variations | 1600 x 900
```

The NPC slice was deliberately cheap before it was pretty. Lightweight and GASP-based characters were compared at 0, 10, 30 and 50 NPCs. All 50 could walk on the navigation mesh, go home at night and restore their positions from a save. The playable setup used 29 characters in six groups. Those numbers describe a controlled prototype test, not a finished crowd system.

## Stats, loading and debug visibility

Build 0.7 gave the prototype a readable shell. Stats were not just decorative bars: health, stamina and mana had explicit rules; low health produced a screen treatment; menus and debug screens exposed state instead of burying it. Loading transitions got a fade, input gating and a save blocker. Teleport orbs connected the landing point and castle so the flow could be tested without pretending the entire path was authored.

```gallery contain
assets/img/day-1-low-health.png | The low-health screen treatment in the packaged prototype. A small effect, but one that connects system state to something the player can perceive. | Red low-health vignette over a third-person Unreal scene | 1600 x 900
assets/img/day-1-pause-debug.webp | Pause and debug views made hidden prototype state visible during integration and testing. | Dark pause and debug menu over the game | 1600 x 900
assets/img/day-1-ui-system-dark.webp | A darker UI system proposal exploring hierarchy, type and panels. This is a review artefact, not proof that every screen was implemented. | Dark fantasy user interface system board | 1600 x 900
```

The first orb package travelled incorrectly and failed several checks. The next run fixed the crash at the end of the fade. The orbs then worked between landing and castle, including fade and save blocking. The automated obstacle course still reached the hurdle, jumped, and never entered traversal; it stopped after moving 207 units. It failed twice at the same point. The honest result was therefore **PASS except orb course**.

## Five creative tracks ran beside the game

Not everything visible on day one was integrated. Several parallel tracks produced material to review. Keeping them separate made the status clearer:

- **Game build:** code, packaged tests and the island described above.
- **MetaHumans:** source characters, body/face combinations, retargeting and performance experiments.
- **Audio:** SFX boards and music directions, not a finished mix in the game.
- **Visual identity and UI:** logo, eclipse ring, title screen and interface proposals.
- **Story and level direction:** concepts and blockouts that could influence later builds.
- **ACE lab:** ASR, TTS and local LLM experiments in a separate laboratory project, not an NPC conversation feature inside Darkest Night.

The ACE lab proved that the intended local pieces could run and measured a roughly 1.7–2.4 second workaround path. Candidate distributions were about 4.6, 6.0 and 8.7 GB zipped, with estimated combined VRAM footprints around 6.9, 8.5 and 10.7 GB. Those figures are planning evidence. They are not evidence that a talking NPC existed in the game.

```gallery contain
assets/img/day-1-metahuman-source-editor.png | A MetaHuman source character in the editor. Source preparation and retargeting were real work; the character was not automatically a final cast member. | MetaHuman character open in Unreal Engine editor | 1600 x 900
assets/img/day-1-metahuman-motion-review.webp | Motion and retarget review exposed body-shape mismatches, stale meshes and naming collisions before a rebuilt review map passed. | Review board showing MetaHuman movement and retargeting tests | 1600 x 900
assets/img/day-1-metahuman-cast-review.webp | Nineteen character candidates were presented for review. A board full of faces is a choice space, not a silently approved cast. | Review board with many MetaHuman character candidates | 1600 x 900
```

Clothing is still one of the riskiest unknowns. A beautiful fantasy asset pack was bought to give the characters a better chance, but fitting clothing to MetaHumans can become its own production. I have made simple clothing in Marvelous Designer before; even the simple version was painful. For a cinematic-only result, that work still has to justify its cost.

```gallery contain
assets/img/day-1-armor-concepts.webp | Clothing and armour directions for the cast. These are visual targets; the difficult MetaHuman fitting and deformation work still lies between the sheet and the screen. | Fantasy clothing and armour concept sheet | 1600 x 900
```

## The player became the director

By evening the bottleneck was no longer a lack of output. It was deciding what should survive. Agents produced replaceable proposals for the logo, typography, UI, character bodies, concepts, SFX and music. I reviewed them in local boards with three states: **take it**, **with changes**, and **not now**. “Not now” keeps the item and its comment; it does not erase the work.

```gallery contain
assets/img/day-1-brand-review.webp | The brand review put studio and game marks side by side so the decision was made in context. | Browser review board with Red Robin and Darkest Night identity studies | 1600 x 900
assets/img/day-1-ring-study.webp | Eclipse-ring variations moving from ornate fantasy emblem towards a quieter mark. | Grid of minimal eclipse ring logo studies | 1600 x 900
assets/img/day-1-title-ring-mock.webp | A title-screen mock using the restrained ring direction. Still a proposal, but much closer to the chosen tone. | Dark title screen mock with a thin eclipse ring | 1600 x 900
assets/img/day-1-ui-title-mock.webp | An earlier title/menu proposal kept for comparison rather than rewritten as if it never happened. | Dark fantasy title menu concept | 1600 x 900
```

This changed the work. The studio name became **Red Robin** with a space. The game title became **Darkest Night**, while the Latin subtitle stayed open. The wax seal disappeared from the robin because simpler was better. The game mark moved towards a restrained eclipse ring. The UI moved away from generated background art and towards black screens, one detailed 3D object, sparse particles and a modern layer over the fantasy world.

```clips
assets/video/day-1-eclipse-ring.mp4 | A short moving eclipse-ring study. Motion revealed which versions felt like an interface and which felt like a generic fantasy logo. | assets/img/day-1-ring-study.webp
```

The same review process redirected audio. The first music was too much like a story score: too upbeat by day, too romantic by night and too heroic in combat. The next brief asked for sparse exploration beds, darker combat, a strong title piece and optional small doses of classical DnB, angelcore, nightcore and phonk. Generated footsteps sounded wrong, so GASP's existing animation step sounds remained the base. Human listening overruled quantity.

```gallery contain
assets/img/day-1-sfx-review.webp | The sound-effects review board: a large batch made inspectable instead of becoming an invisible folder of generated files. | Browser review board with many sound effect cards and controls | 1600 x 900
assets/img/day-1-ui-review.webp | UI proposals reviewed together, with status and comments attached to each card. | Browser review board of interface concepts | 1600 x 900
assets/img/day-1-menu-review.webp | Menu directions compared as a set. The board records choices; it does not make them. | Browser review board showing title and menu variations | 1600 x 900
```

The review provenance rule itself began at 21:13. Later cards record backend, model, licence and agent. Earlier material is not retroactively described as if that metadata had always existed.

## The human state behind the agent factory

At around six in the morning, chronological “day one” had stopped matching a normal human day. My sleep rhythm was broken, the agents had multiplied, and the orchestration was becoming a little muddy in my head. I had taken time off, my father was on a night shift, and my mother had the day off. At 29, I was building this from my parents' home and being supplied with food while the terminals kept moving.

The Outlook account also stopped letting me in. That matters because some services, subscriptions and API-key workflows depend on it. It was a real setback, but not the emotional centre of the night.

>> Ich bin aber entspannt, weil ich ja schon sehr viel hingekriegt habe.

The website itself still did not feel right. I wanted it more visual, with the interesting images and clips visible instead of buried in capture folders. I also wanted an editor eventually: not necessarily a complex WYSIWYG system, but a way to see all media, add or replace it, move it, save, and immediately see the result. The review board is the first smaller step towards that control.

There is an important difference between saying “AI made this” and pretending I was absent from it. A huge amount of production was delegated, but direction, rejection, scope and taste were active work.

>> Ich habe ja kreative Entscheidungen getroffen.

>> Ich weiß, dass ich da viel aufräumen werden muss, aber fürs Prototyping ist es super.

## What broke in the glass box

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

The b07-integrate package at 22:55 was 2.8 GB and passed build, input, movement, frontend, world, time, NPC, appearance, UI, stats, loading and save tests. Weather work continued on another branch and exposed more unity-build name collisions. A fix was prepared, but the build was stopped under memory pressure before midnight. There was no later all-green main-branch package that night.

## End of day 1

The day did not produce the cinematic game in my head. It produced something more useful: a portable spine for it.

- A real UE 5.8 C++ project packaged through the early ladder on Windows and Mac.
- GASP movement with a project-owned camera and input layer.
- A smaller procedural island with an opening flow, NPCs, time and weather.
- Saves, settings, stats, debug views, loading transitions and packaged tests.
- Separate, visible creative tracks for characters, audio, identity, UI, level and story.
- A modular fallback-first plan for the larger dialogue, clothing, loading and levelling ideas.
- A review process where I, not the generation pipeline, decide what enters the game.

At midnight the island still looked like a prototype. Water was wrong. The obstacle course was red. Many beautiful boards were only proposals. The local ACE lab was still separate. The later Build 0.7 cross-platform rebuild had not happened. And my sense of time had become strange enough that “overnight” meant “while I finally sleep after sunrise.”

But the project could be built, run, inspected and criticised. For the first eighteen hours, that was enough.
