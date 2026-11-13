---
title: day-1.log: build the smallest world
slug: day-1
order: 4
date: 2026-11-12
day: day 1
phase: jam
status: live
cover: assets/img/day-1-island-playable.webp
cover_alt: An Unreal Engine third-person mannequin stands on a grassy island path under a bright sky
summary: At 06:00 there was no game. By midnight there was a playable UE 5.8 island, a portable build ladder, weather, NPCs, GASP movement, reviews, and a very honest list of things still broken.
---

```recap
**Before this entry:** the tools were prepared and the possible directions were written down, but there was no concept, game project, code or game asset.
**What this entry covers:** 12 November, from the first post-start brief to the final Windows integration attempt before midnight. The Mac Build 0.7 pass happened after midnight and belongs to day 2.
```

At 06:00 there was no game. Half an hour later there was a name, a world and a constraint: **Darkest Night**, made by **Red Robin**, would be the smallest playable slice of the game I actually want to make.

>> the game I have always dreamed of making

>> Open World Medieval Dark High Science Fantasy RPG

>> It should play in their equivalent of the time of Copernicus. Scientific discovery in dark times.

The image was an island with a castle. The player arrives as a prisoner, an Elder Scrolls homage rather than a complete story. The larger ambition stayed visible, but the jam target was deliberately narrower: one cinematic place, movement that feels like an RPG, a day and night cycle, a few inhabitants, minimal UI, Windows and Mac builds, and room to experiment with local AI characters later.

## A build ladder instead of a wish list

Claude Code orchestrated the main Windows work in separate Git worktrees. Codex handled Mac-side checks and builds where useful. Specialist agents worked on systems, world, characters, audio and visual directions in parallel, while the release branch only received changes that had their own test marker.

The project itself lives in a separate local Git repository because Unreal's binary assets have one writer. The jam repository holds the plans, logs, tools and reproducible source material. That split was decided at 07:00, before the parallel work became difficult to untangle.

```timeline
06:33 | kickoff | Darkest Night, Red Robin, island, castle, prisoner, UE 5.8
07:00 | structure | separate Unreal repo; Windows writes assets, Mac builds from Git
07:22 | systems | Skyrim-like manual saves plus six rotating autosaves
08:26 | build 0.4 | GASP movement, custom C++ camera, equipment and frontend running
14:38 | build 0.6 | packaged time and weather test passes
16:57 | playtest | inverted-feeling mouse, missing control help and HUD needs reported
22:55 | build 0.7 | Windows integration passes the suite except the traversal course
23:59 | close | concept and production reviews still running; Mac 0.7 waits for day 2
```

The ladder mattered. Builds 0.1 to 0.4 established save data, input, graphics fallback, frontend flow, GASP locomotion, first/third-person camera and equipment. Every stage was packaged on Windows; the early stages were also built natively on the M1 Max. The Mac did not contain NVIDIA's plugins, so TSR was the explicit fallback rather than an accidental degraded mode.

```gallery contain
assets/img/day-1-gasp.webp | The first GASP-based player running in the movement test map. Functional geometry first, island later. | Unreal mannequin running through a purple movement test level with ramps and obstacles | 1600 x 900
assets/img/day-1-title-raw.webp | The raw first title screen. It proves the frontend flow existed; it is not the later visual design. | Black title screen reading DarkestNight with Press any key below | 1600 x 900
```

There were failures from the start. The first Mac package needed an EngineSettings dependency. A later Mac development build crashed intermittently before writing a log; the working theory was a Low Level Memory Tracker race, and test runs with `-LLM` passed 15 out of 15. That is a test workaround, not proof that the underlying engine issue disappeared.

## The island becomes a system test

The first island was too large for the jam but useful enough to preserve as a possible post-jam footprint. A smaller version became the test ground: procedural landscape and vegetation, castle blockout, opening cameras, NPC locations, time, weather and a minimal astronomical HUD.

At 14:38 the packaged Build 0.6 time-and-weather test passed twice. It checked the clock rate, pause states, sky synchronisation after time jumps, eight moon phases, the sundial-style HUD, sunrise and sunset states, weighted weather, and save/load. The world test later counted 1,258 PCG instances and ten successful camera shots in the Windows package.

```gallery contain
assets/img/day-1-island-opening.webp | An early letterboxed opening camera on the smaller jam island. The tree motion still smeared at this point. | Cinematic view across a grassy island slope with sparse trees and a blurred foreground character | 1600 x 900
assets/img/day-1-wind-fix.webp | The foliage investigation as an actual before/after plate. Disabling Nanite on the Norway maples removed the worst WPO smear; this was measured in the packaged scene, not only in a mockup. | Four comparison frames of trees before and after a wind rendering fix | 1600 x 900
assets/img/day-1-island-playable.webp | Build 0.6 in the packaged game: simple terrain, a working player and the first time HUD. It is playable scaffolding, not a finished look. | Third-person mannequin on a dirt path through a bright grassy island | 1600 x 900
```

The NPC slice was deliberately cheap before it was pretty. Light characters and GASP characters were tested at 0, 10, 30 and 50 NPCs; all 50 walked on the navigation mesh, went home at night and restored their positions from a save. MetaHuman bases were assembled later in the day, but they were not silently promoted to final game characters. Retargeting exposed body-shape problems, stale meshes and unity-build name clashes before the rebuilt review map passed.

## The player became the director

By evening the bottleneck was no longer a lack of output. It was deciding what should survive.

Agents produced replaceable proposals for the logo, typography, UI, character bodies, concepts, SFX and music. I reviewed them in local boards with three states: **take it**, **with changes**, and **not now**. “Not now” is not a rejection; it keeps the item and its comment in the export. Every card records how it was made, with tool or model, licence and agent.

```gallery contain
assets/img/day-1-review-board.webp | A real review session for the game and studio marks. The green and amber card borders are decisions and requested changes, not an agent ranking its own work. | Dark browser-based review board showing Darkest Night and Red Robin logo variations with selection controls | 1600 x 900
```

This changed the work. The studio name became **Red Robin** with a space. The game title became **Darkest Night**, with the Latin subtitle still open. The wax seal was removed from the robin because simpler was better. The game mark moved towards a restrained eclipse ring. The UI moved away from generated background art and towards black screens, one detailed 3D object, sparse particles and a modern layer over the fantasy world.

The same process redirected audio. The first music was too much like a story score: too upbeat by day, too romantic by night and too heroic in combat. The next brief asked for sparse exploration beds, darker combat, a strong title piece and optional small doses of classical DnB, angelcore, nightcore and phonk. Generated footsteps sounded wrong, so the plan returned to GASP's existing animation step sounds as the base. Human listening overruled quantity.

## What broke in the glass box

The point of this log is not to turn a frantic day into a clean success story.

```log
FAIL | Mac package 0.3 initially did not link: missing EngineSettings dependency
FAIL | one Mac development build crashed before writing a log; -LLM became the test workaround
FAIL | vegetation wind smeared badly; the Norway maples lost Nanite for the jam build
FAIL | C: filled during builds; caches and package output were moved to D: behind junctions
FAIL | the first Build 0.7 package bypassed travel incorrectly and failed several tests
FAIL | the first orb run crashed at the end of the fade; the crash was fixed
OPEN | the orb course reaches the hurdle and jumps, but traversal never starts (moved=207)
OPEN | water and the overall look still need a serious pass
```

The Windows Build 0.7 integration at the end of the day packaged 2.8 GB and passed build, input, movement, frontend, world, time, NPC, appearance, UI, stats, loading and save tests. The teleport orbs worked between landing and castle, including the loading fade and save blocker. The automated obstacle course did not: it failed twice at exactly the same point, so the result is **PASS except orb course**, not pass.

Weather was merged afterwards, then exposed more unity-build name collisions. A fix was prepared, but the build was stopped under memory pressure before midnight. The fully rebuilt Windows and Mac 0.7 results belong to the next entry.

## End of day 1

The day did not produce the cinematic game in my head. It produced something more useful: a portable spine for it.

- A real UE 5.8 C++ project packaged on Windows and Mac.
- GASP movement with our own camera and input layer.
- A smaller procedural island with an opening flow, NPCs, time and weather.
- Save data, settings, debug views and automated packaged tests.
- A modular fallback-first plan for bigger character, dialogue, loading and levelling ideas.
- A review process where I, not the generation pipeline, decide what goes into the game.

At midnight the island still looked like a prototype, water was wrong, the obstacle course was red, many beautiful boards were only proposals, and the local ACE lab was still separate from the game. But the project could be built, run, inspected and criticised on both target machines. For the first eighteen hours, that was enough.
