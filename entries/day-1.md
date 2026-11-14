---
title: day-1.log
slug: day-1
order: 4
date: 2026-11-12
day: day 1
phase: jam
status: live
summary: From an empty folder at 06:00 to a packaged island with a castle, night, rain, NPCs, a title screen, a studio logo and a pile of review boards. Builds 0.0 to 0.6, and the first time it all got too much.
---
```recap
**Before this entry:** a toolchain (prep 1), an empty jam folder after the reset (prep 2), and no concept, only a pile of directions (prep 3). The theme is **Director's Cut**.
**What this entry covers:** Thursday 12 November, 06:00 to midnight. The decision for a game, Builds 0.0 to 0.6 and the integration of 0.7, the first island, the first brand and music rounds, and the first setbacks. Everything below is AI summary except the highlighted quotes, which are my own messages to the agents. Most of them were typed in German at odd hours; the English after each one is a translation.
```

The night before, I had a castle, a masked prisoner and an island in my head, and no plan. At 06:33 I typed «The jam has officially started, yay. :)» and asked the agents for an Unreal 5.8 project for Mac and Windows. I said to call it *Build 0*.

By the end of the day there was a packaged game with an island, a grey-box castle, a day-night cycle, rain, NPCs walking around and a title screen. There were also more review sheets than I could keep track of. This entry is that day in pictures, roughly in order.

## 06:00–10:00 · Picking a game before breakfast

The first decision was the game. It's an open-world, medieval, dark, high-science-fantasy RPG *slice*, on an island with a castle, and the player arrives as a prisoner. Working title **DarkestNight**, studio name RedRobin. The obvious objection is that it's far too big for four days, and I knew that. I had an anecdote in my head that I wasn't even sure was true:

> «Interesting anecdote I heard was, Skyrim had a world first approach while other design team have a systems first approach.»

So Build 0 became a skeleton for both. There's a C++ project from the third-person template, Epic's Game Animation Sample (GASP) for movement, a Skyrim-style key layout, saving like Skyrim (manual saves any time plus rotating autosaves), DLSS 4.5 with a TSR fallback, menus, and a letterboxed dummy opening with three cameras. Every sub-build gets packaged for Windows and natively for the Mac.

The skeleton compiled at 06:52, 52 minutes into the jam. The first Windows package took 53 seconds and the Mac one 148 seconds over SSH. One Mac start in five crashed before writing a single log line. Codex on the Mac traced it to a known memory-tracker race in development builds, so Mac runs now use `-LLM`.

At 07:11 I went to bed: «Arbeite bitte erstmal guten Gewissens weiter ich bin zu müde.» (Please just keep working with a clear conscience, I'm too tired.) The last thing I asked was how to stop Windows asking for firewall permission while I slept.

```gallery
assets/img/day1/11-12-064901-watcher-start.jpg | 06:49 · Watcher session starts: agent terminals in herdr, the devlog capture loop begins. Funke bottom left | Terminal multiplexer with agent panes, a pixel dragon and a jam credits panel | 1600 x 900
assets/img/day1/11-12-074640-imported-gasp-cmc-movetest-win64-run.jpg | 07:46 · First packaged Win64 run: GASP mannequin sprinting across the test level | Grey mannequin running across a purple test grid | 1280 x 720
assets/img/day1/11-12-081149-clip.jpg | 08:11 · Build 0.3 in motion: GASP movement on the template test map (still from a clip) | Mannequin standing on a green test platform | 1600 x 900
assets/img/day1/11-12-082649-game-launched.jpg | 08:26 · First title screen: plain DarkestNight placeholder with Press any key | Dark window with the word DarkestNight and Press any key | 1282 x 752
```

## 10:00–14:00 · An island grows while I sleep

While I slept, a world agent built `L_Island` entirely from scripts. A NumPy heightmap becomes the landscape, with Ultra Dynamic Sky and its weather, an Easy Waterscape ocean, a castle blockout, and a PCG scatter of 5,405 Megascans maples and rocks. The first version had the castle upside down and the trees leaning, because in Unreal's Python `Rotator(a, b, c)` means roll, pitch, yaw and not what you'd guess. It went into the skill so no agent makes that mistake twice.

A separate NPC slice put 50 GASP characters on a navmesh. Motion matching costs about 7.7 ms of game thread at 50 characters, against 1.9 ms for a lighter character, and night sends them all home. Then GASP's MetaHuman *Kellan* was retargeted onto the player without Epic's generic retarget blueprint, which would have pulled in 2.3 GB of other characters.

At 13:17 I was back: «Kannst du mir fragen hier stellen? Berichte was bis jetzt geschah.» (Can you ask me questions here? Report what has happened so far.)

```gallery
assets/img/day1/11-12-132708-agent-turn-end.jpg | 13:27 · NPC load test: dozens of GASP NPCs walking on the test grid | Many small characters walking on a purple grid around the GASP logo | 1600 x 900
assets/img/day1/11-12-133513-smoke-test.jpg | 13:35 · NPC smoke test passes: GASP character with vest on the test level | Character in an orange vest running on the test level | 1600 x 931
assets/img/day1/11-12-141050-commit.jpg | 14:10 · Mannequin on the first island hillside under a blue sky | Mannequin crouching on a sunny grassy slope with trees | 1600 x 900
assets/img/day1/11-12-141148-clip.jpg | 14:11 · Island flythrough: grey-box castle on the cliff, ending on a dusk view over the sea (still from a clip) | Grey-box castle with conical towers on a meadow | 1600 x 900
```

## 14:00–18:00 · First night, first smear, first play

The first island was 1.5 km across, which is too big to fill. I kept it as a possible footprint for after the jam, and the jam island became the same coastline at half scale, with the road cut from 1.1 km to 530 m. Time and weather went into Build 0.6: a clock that runs, pauses and has a speed setting, a small sundial HUD, and a weighted weather director on top of Ultra Dynamic Sky. Along the way an agent found that UDS counts moon phase 0 as *full* moon, so our clock had been showing a full moon at new moon.

Then the trees started smearing whenever the camera moved. I had a hunch before anyone measured it:

> «Ich glaube der Schmierbug hat was mit wind zu tun.»

(I think the smear bug has something to do with the wind.) It did. Nanite-rendered maples moved several times more per frame through wind animation than the non-Nanite path, and DLSS and TSR ghosted the branches, worse in gusts. The fix renders the tree instances without Nanite (`DN.Trees.Nanite 0`).

Meanwhile a separate **ACE lab** project started, outside the game, to find out what NVIDIA's on-device speech can actually do on UE 5.8. By 16:11 it had a full spoken loop running in a package: speech recognition, a local Qwen model in llama.cpp, speech synthesis and a 3D voice at a gate guard, with no cloud.

My first real play session at 16:53 produced a long list. The mouse felt inverted. I wanted a controls page with an icon pack, auto quality that says what hardware it found, a debug view, debug orbs and a teleport to the castle. I also asked for stamina, health, and light and dark energy that charge in sunlight and moonlight. The "inverted mouse" turned out to be our own automated tests writing *invert Y* into my personal settings. Tests now save to their own folder.

At 17:57 I described the levelling system I actually want: body systems with Latin names, levelled by use, with Fallout-like body parts. It got staged as *MVP now, mid later, final much later*.

```gallery
assets/img/day1/11-12-144150-shot.jpg | 14:41 · First night on the island: NPCs on the meadow in the dark | Small figures on a dark meadow below grey castle walls | 1600 x 900
assets/img/day1/11-12-163904-watch.jpg | 16:39 · Rock outcrop and pines on the island, mannequin looking up | Mannequin looking up at a rock outcrop and tall pines | 1600 x 900
assets/img/day1/11-12-163921-clip.jpg | 16:39 · Build 0.6 in motion: walking the dirt road across the island meadow (still from a clip) | Mannequin seen from above on a dirt road | 1282 x 752
assets/img/day1/11-12-173449-agent-turn-end.jpg | 17:34 · Several NPCs walking the island road around the player | Mannequins in different colours on a dirt road between hills | 1282 x 752
assets/img/day1/11-12-173908-watch.jpg | 17:39 · First pause menu with graphics settings (DLSS, look invert, debug view) | Pause menu listing graphics quality, upscaler and invert look options | 1282 x 752
```

## 18:00–22:00 · A name, a typeface, a robin

In the evening the work turned visual. I asked for logos for Red Robin and DarkestNight, maybe with a Latin name, plus a serif, a sans and a debug font. The agents made logos in code (Python, font outlines, Blender extrusions), type sheets, UI kit directions and mockups.

Some of my answers from that evening, which stuck:

- Studio is **Red Robin**, with a space, not "Red Rob". The round robin is the mark.
- The game logo is the **moonlight eclipse ring**: «less is more», no castle.
- No AI-generated images behind menus or titles. The start screen is black, with subtle particles and one detailed 3D object.
- Weekdays in the time HUD use planetary signs with the Latin day names (*dies Lunae*, *dies Martis*, ...).
- The Latin title **NOX OBSCVRISSIMA** stays, with DARKEST NIGHT as the subtitle.

I also wondered aloud whether "Director" even fits a medieval world: «idk ob director in ne mittelalterwelt passt was war damals das euqivalent» (I don't know if a director fits a medieval world, what was the equivalent back then). The narrator figure later became *Custos*, the keeper.

Music started the same evening. As a first test, the adaptive music system ran on two licensed packs I own (Caravan by day, Starry Skies by night). In parallel an agent wrote an original score by hand: MIDI, FluidSynth and a sampled orchestra, sample-aligned stems, no AI audio model. I listened at 21:43. Day was too upbeat, night too romantic and combat too heroic, so they became a cutscene library. In-game music should be sparse, Skyrim-like exploration beds.

```gallery
assets/img/day1/11-12-180759-imported-system-dark.jpg | 18:07 · Type system proposal: Cormorant and EB Garamond on black | Type specimen sheet with DARKEST NIGHT in a classical serif | 1474 x 1600
assets/img/day1/11-12-180800-imported-mock-title-menu.jpg | 18:08 · Title menu mockup: DARKEST NIGHT over a stormy castle on the sea. Rejected later: no AI images behind menus | Title mockup with a castle on a rock in a storm | 1600 x 900
assets/img/day1/11-12-204114-imported-r2-sets.jpg | 20:41 · Type round 2: DARKEST NIGHT title set in many OFL families | Grid of title cards in different typefaces | 1600 x 1433
assets/img/day1/11-12-210718-imported-TY-C01.jpg | 21:07 · Type round 3: NOX OBSCVRISSIMA menu card with Latin title and lore text | Menu card with the Latin title and a short lore paragraph | 1600 x 900
assets/img/day1/11-12-205700-commit.jpg | 20:57 · Title screen motion mockup: eclipse ring beside a minimal DARKEST NIGHT menu | Golden ring with a moon beside a small menu | 1600 x 764
assets/img/day1/11-12-211950-agent-turn-end.jpg | 21:19 · Eclipse ring rendered in Blender: one pose per menu entry | Five renders of a brass ring, one per menu entry | 1600 x 764
```

```gallery
assets/img/day1/11-12-205611-milestone.jpg | 20:56 · Brand board round 5: Red Robin logos and eclipse-ring wordmarks side by side | Review board with ring logos and wordmarks | 1600 x 764
assets/img/day1/11-12-210005-milestone.jpg | 21:00 · Red Robin studio logo variants on the brand board | Review board with red robin bird logos | 1600 x 764
assets/img/day1/11-12-232732-setback.jpg | 23:27 · Title lockup NOX OBSCVRISSIMA, the eclipse ring as the O | Latin title with a brass ring as the letter O | 746 x 600
assets/img/day1/11-12-222859-milestone.jpg | 22:28 · Menu selection marker variants: CONTINUE / NEW GAME / LOAD | Three menu variants with different brass markers | 1600 x 764
```

## The day it got too much

By 20:40 a lot of agents were working on Build 0, Build 1 and "future stuff" at the same time. I asked whether any of it was being orchestrated:

> «es arbeiten ganz viele agenten an build 0 oder build 1 oder zukunfttsstuff, wird alles ncoh rodentlich orchestriert und commited in logische branches? ich möchte bald auch mal alles kombinierte spiel…»

(Lots of agents are working on Build 0 or Build 1 or future stuff. Is all of it still being orchestrated properly and committed in logical branches? I'd like to play everything combined soon.) Ten minutes later:

> «uggh zu viele sheets habe den überblick verloren»

(Ugh, too many sheets, I've lost track.) That sentence led to a rule that has shaped every day since. At 21:13 it became a standing instruction: everything generated is shown as **one review board** per batch. Each item gets accept, accept with changes, or "not now", plus a free comment field, and the export includes everything, also what I didn't pick. "Not now" doesn't mean rejected. The review-board skill was written that night.

Disk C: also ran full twice, down to 0 MB, because several agents packaged at once. The Unreal project archive (197 GB) moved to the other drive behind a junction. Packaging queued for over an hour behind another agent's stuck copy loop. At 23:27 the editor crashed outright.

```gallery
assets/img/day1/11-12-145950-imported-before-after-wind.jpg | 14:59 · Tree wind smear before/after: Nanite WPO trees ghosting under DLSS vs sharp non-Nanite trees | Six crops of trees comparing smeared and sharp branches | 1600 x 800
assets/img/day1/11-12-202749-shot.jpg | 20:27 · Concept-art contact sheets under review: castle, harbour and tower moods. Too many windows at once | A stack of open image windows over concept art | 1282 x 752
assets/img/day1/11-12-220445-milestone.jpg | 22:04 · Gameplay SFX round 2 review board: 260 generated weather, footstep and combat sounds | Audio review board with players and comment fields | 1600 x 764
assets/img/day1/11-12-225733-shot.jpg | 22:57 · Frontend audio round 2 board with spectrograms of studio idents and weather loops | Audio board with coloured spectrograms | 1600 x 764
```

## 22:00–00:00 · Guards, shackles, capes and a beach with three pillars

The last two hours were review rounds. There were 260 gameplay sounds (weather beds, footsteps, breathing, combat) made through an API for about 3.26 USD. I accepted most weather beds and the heartbeat, but the generated footsteps felt weird, so we went back to GASP's own foley as the base. Concept art covered guards, helmets, shackles and five creature races, made both locally and through an API and compiled into a PDF. The prison became a medieval-equivalent **mental asylum**.

Clothing was the other thread. I bought medieval clothing and cape packs on Fab, and an agent fitted one garment to a MetaHuman body by script and resized it onto another. The MetaHuman retarget board, with 19 bald bodies in three heights, got my favourite verdict of the day: «lief super» (went great).

```gallery
assets/img/day1/11-12-234515-commit.jpg | 23:45 · Concept art: four castle guards in plate armour with red-cross tabards | Four armoured guards with spears | 1600 x 764
assets/img/day1/11-12-234931-watch.jpg | 23:49 · Concept board of prisoner shackles and helmets | Board with iron masks, shackles and helmets | 1600 x 764
assets/img/day1/11-12-195452-commit.jpg | 19:54 · Shopping Fab for MetaHuman medieval clothing | Fab store page filtered to MetaHuman clothing | 1600 x 764
assets/img/day1/11-12-215506-milestone.jpg | 21:55 · Fab library of purchased medieval clothing, capes and robes | Library grid of clothing and cape packs | 1006 x 521
assets/img/day1/11-12-235932-watch.jpg | 23:59 · ACE lab test beach: three placeholder NPC pillars for voice dialog | Three grey pillars with sphere heads on a beach | 1282 x 752
```

## Timeline

```timeline
06:33 | Jam starts. Open-world medieval science-fantasy RPG slice, island, castle, prisoner
06:52 | Build 0.0: C++ project compiles, Win64 package in 53 s, Mac package over SSH
07:11 | I go to sleep. Agents keep building
08:46 | Build 0.4: GASP motion-matching character with our own C++ input and camera
08:56 | Island generated from scripts. The castle is upside down at first
13:16 | Build 0.5: the island world, 5,405 PCG instances, 146–179 fps at 1080p DLSS Quality
13:54 | MetaHuman Kellan runs on the GASP character in a package
14:15 | "I think the smear bug has to do with the wind." It does
15:03 | Build 0.6: NPCs, MetaHuman player, smaller island, time and weather
16:11 | ACE lab: spoken question to local LLM to NPC voice, all on-device
16:53 | First real playtest, first long feedback list
18:23 | Original adaptive score, 72 sample-aligned stems, no AI audio model
20:26 | C: full while several agents package
20:51 | "Too many sheets, I've lost track"
21:13 | Rule: everything generated goes on one review board
22:55 | Build 0.7 integration packaged: 12-test suite passes, one orb test fails
23:27 | Editor crash
```

## Builds of the day

```specs
# Build 0.0 · 06:52
What: empty C++ project from the third-person template
Package: Win64 53 s, 996 MB; Mac native 148 s, 901 MB
# Build 0.3 · 07:42
What: input layer, graphics (DLSS 4.5 / TSR), save system
Package: Win64 1,314 MB, Mac 902 MB
# Build 0.4 · 08:46
What: GASP character, C++ camera (third and first person), equipment slots, menus, letterboxed opening
Package: Win64 1,405 MB; Mac about 52 fps on M1 Max
# Build 0.5 · 13:16
What: the island world (UDS sky, Easy Waterscape, PCG vegetation, castle blockout)
Package: Win64 1,909 MB
# Build 0.6 · 15:03
What: NPCs on the island, MetaHuman player, smaller jam island, time and weather, wind smear fix
Package: Win64 1,941 MB, full test suite passed
# Build 0.7 (integration) · 22:55
What: UI and controls page, time HUD, stats bars, NPC MetaHumans, loading screen, weather
Package: passed the 12-test suite, tagged after midnight (day 2)
```

"Passed" here means the automated tests passed in a packaged build. Nobody had *listened* to most of the sounds yet, and I hadn't played most of it. That distinction mattered more every day.

<!-- branches-embed -->
```embed
builds.html?day=1 | Branches of day 1: every branch active that day, by area, with the build it shipped in. Hover or tap a row. | 1000
```
