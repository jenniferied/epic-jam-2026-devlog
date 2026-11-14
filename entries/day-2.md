---
title: day-2.log
slug: day-2
order: 5
date: 2026-11-13
day: day 2
phase: jam
status: live
summary: Nine builds in 28 hours. The Mac gets dropped, Build 0 is called final, the masked guard learns to be suspicious, and the castle gets a silhouette. Also foam everywhere, flat LUTs, four editors open at once and far too many boards.
---
```recap
**Before this entry:** Builds 0.0 to 0.6 and a packaged 0.7 integration from day 1: an island built from scripts, a grey-box castle, GASP movement, a MetaHuman player, time, weather and rain, a first title screen, Red Robin and NOX OBSCVRISSIMA as brand directions, an original score that was too heroic, and a separate ACE lab project with a talking NPC.
**What this entry covers:** Friday 13 November from midnight to Saturday 03:56, my own cut of "day 2". Builds 0.7 to 0.9.4, the end of the Mac build, the first character systems, the castle redesigns, and the moment the boards became one board. Highlighted text is my own messages, mostly typed in German; the English after them is a translation. Everything else is AI summary.
```

Day 2 had no clean start or end. I slept twice, at about 08:30 and again in the afternoon, and the agents didn't. In 28 hours the game went through nine tagged builds and grew from 2.8 GB to 4.8 GB. Most of the change was invisible to me until I played it, and when I played it, things broke in ways the tests had not seen.

## 00:00–04:00 · First playable combination

Build 0.7 was tagged at 00:24 as the *first playable combination*: UI, time HUD, stats, NPC MetaHumans, loading screen and weather in one package. The Mac version passed its suite too, at 2.1 GB and about 50 fps on an M1 Max.

The type was settled at 00:47: **IM Fell English SC** for titles, **IM Fell Great Primer** for text, **Barlow** for the UI. It took six rounds of type cards. The Red Robin studio ident (a bird flies in, pecks, GAMES types out, a wax stamp comes down) got one word from me: «AMAZING».

Then I looked at the water.

```gallery
assets/img/day2/11-13-011330-agent-turn-end.jpg | 01:13 · Island road winding up to a distant grey-box tower | Dirt road winding between grassy hills toward a small tower | 1600 x 900
assets/img/day2/11-13-011936-watch.jpg | 01:19 · Mannequin facing the dark castle wall at dusk, time HUD top right | Mannequin in front of a dark castle wall at dusk | 1600 x 900
assets/img/day2/11-13-024939-watch.jpg | 02:49 · Grey-box castle gate at the end of the approach road | Grey-box gatehouse with conical towers at the end of a dirt road | 1402 x 907
assets/img/day2/11-13-033238-milestone.jpg | 03:32 · Castle site plan on the island contour map: ring wall, keep and approach road | Top-down castle plan on contour lines | 1600 x 864
assets/img/day2/11-13-032732-shot.jpg | 03:27 · Concept portrait: prisoner in an iron face cage | Portrait of a man wearing a riveted iron face cage | 1600 x 864
assets/img/day2/11-13-031941-watch.jpg | 03:19 · Cape renders on the base mesh: blue, gold and brown cloaks | Turnaround renders of hooded capes on a grey body | 1600 x 864
```

## Setback: foam everywhere

The sea had been flickering since day 1. On Windows the foam covered the ocean in white, and on the Mac the whole sea flipped between blue and white from one frame to the next. I wrote on the water board:

> «all of this is awful. what exactly happened. we can keep testin oboth but why is it actualy all so awful and broken? i dont see this in the editor and i did make some of my own changes.»

and on one of the cards just «warum ist überall Schaum» (why is there foam everywhere). The diagnosis was measurable. With Easy Waterscape's FFT foam on, the picture changed 19.4 units from frame to frame, against 0.4 with foam off, and the simulation stepped at 30 Hz. Build 0 got the foam off and the simulation on game time. A second water system, Waterline PRO, went to Build 1 for a proper comparison.

The same night I decided something larger:

> «was wenn ich mac einfach droppe? ich will es ja eh windows only machen.»

(What if I just drop the Mac? I want it Windows-only anyway.) At first the Mac kept building in parallel without blocking. At 13:04 Mac development stopped completely: «stop mac develooment». The last Mac build is 0.7.1.

```gallery
assets/img/day2/11-13-032312-milestone.jpg | 03:23 · Water diagnosis board: FFT foam flicker across the sea vs fixed variants, with my comment at the top | Review board for ocean variants with an angry comment in the text box | 1600 x 864
assets/img/day2/11-13-041616-commit.jpg | 04:16 · Castle on the cliff at night under the new night look | Dark castle silhouette on a cliff above a moonlit sea | 1402 x 907
assets/img/day2/11-13-041958-milestone.jpg | 04:19 · Rainstorm on the island road, the player walking through fog | Mannequin walking on a wet road through rain and fog | 1600 x 1000
```

## 04:00–08:00 · "Final Build 0", running on 1%

Around 05:00 the usage limit came close again:

> «i just wanna build asap in the least commands possibe so i cnp play everythign we only have 1% usage lft we were rly close no»

Build 0.8 went out at 06:17 as **Final Build 0**. It had Creator MetaHumans, gameplay sounds, the brand look and the UI kit. The start screen became the black screen with the ring on the right and the menu on the left, and no title (the titles are already in the ident). The loading screen shows the armillary sphere, with its rings turning instead of the whole object spinning.

The look took longer. An agent had researched the "Unreal look" from 14 video transcripts and the engine source, and proposed to neutralise it and then add LUTs. Its first LUTs were technically correct and visually nothing:

> «there is not enough variety i the luts i want contrast wheres the cinematic looks gone they are all flat an nondescript dont bother showing me those anyway»

The next round was too far the other way: «THEY LL INCREDIBLY WEIRD ... TOO ITNENSE». The one that worked, at 12:13, was asking for what film people actually use: «Ich brauche klassiche Cinematic LUTS wie sie in der Filmbranche üblich und typisch sind.» (I need classic cinematic LUTs as they're common and typical in the film industry). After that came print emulation (Kodak 2383, Fuji 3513) through an inverted tonemapper and a log curve, and in the evening a set recreated from a commercial LUT pack's public before-and-after pairs, without the pack itself.

```gallery
assets/img/day2/11-13-042508-imported-05-pause-dof.jpg | 04:25 · Pause menu over the island with depth-of-field blur | Pause menu text floating over a blurred island scene | 1400 x 875
assets/img/day2/11-13-062000-watch.jpg | 06:20 · Start screen: eclipse ring with NEW GAME / LOAD / SETTINGS / QUIT | Black start screen with a brass ring and moon crescent beside a small menu | 1600 x 1000
assets/img/day2/11-13-054012-milestone.jpg | 05:40 · MetaHuman player running along the island road | Bald MetaHuman running on a sandy road | 1282 x 752
assets/img/day2/11-13-054959-watch.jpg | 05:49 · MetaHuman with stamina and health orbs on the test map | MetaHuman walking between a green and a red debug orb | 1282 x 752
assets/img/day2/11-13-071901-agent-turn-end.jpg | 07:19 · Player running toward the grey-box castle walls and towers | MetaHuman running across grass toward grey-box towers | 1600 x 1000
assets/img/day2/11-13-074137-imported-pie-road.jpg | 07:41 · Castle v2.2 grey-box: road up to walls with pink placeholder roofs | Grey-box castle with pink conical roofs above a path | 1600 x 900
```

## Setback: the tests that tested everything

At 07:13 I asked for one thing and got a full test run again:

> «start again und lass diese ganzen tests wir haben die schon 100x gemach, nur das testen was neu ist.»

(Start again and drop all these tests, we've done them a hundred times, test only what's new.) An hour later, in capitals, because it kept happening: «und teste eben nciht !== MAL ALLE S SONDERN NUR LGOISCH DAS WAS NEUE IST WIEDER». Every agent was packaging and re-running a full suite for a one-line change, and the packaging queue was the slowest part of the whole jam.

At 08:02 a new orchestrator session took over with a handover prompt, and I tried to make sure nothing I'd already decided got lost:

> «stelle sicher dass früher getane entscheidungen anderer chats besetehen bleiben»

(Make sure that decisions made earlier in other chats stay in place.) That became a register, `DECISIONS.md`, which every agent has to check before changing anything. Then I went to sleep.

## 08:00–12:00 · Suspicious guards

While I slept, Build 0.8.2 got the start sequence I'd asked for. The Red Robin ident comes with bird sounds and no music, then the game logo, then the title music fades in slowly. The settings page was rebuilt with explanations, the controls are Skyrim-like without key conflicts, rain darkens the picture and wets every character, and NPC arms got a relaxed pose. One rule from the night: «REGEN AMBIENTE GEHÖRT NICHT IN LOGO OR TITEL USW» (rain ambience doesn't belong in the logo or title).

The character system started too. Gate guards wear masks and grow suspicious with every question and with time. They refuse probing questions, end the talk and block the gate. A steward warms up to the right topics. The talk panel shows the NPC's body, mind and belongings as *Corpus, Animus, Res*.

```gallery
assets/img/day2/11-13-083203-imported-social-04-guard-hostile.jpg | 08:32 · Talk panel: a masked guard turns hostile at the grey-box castle gate | Dialogue panel with topics on the left and Latin stat icons on the right | 1600 x 900
assets/img/day2/11-13-125751-imported-social-07-steward.jpg | 12:57 · Talk panel with the steward Aldric in front of the castle | Dialogue with a steward NPC and a topic list | 1600 x 900
assets/img/day2/11-13-150022-imported-social-11-toll-paid.jpg | 15:00 · Night talk with the masked guard after paying the toll | Night scene with a guard dialogue: Five coins. I didn't see you | 1600 x 900
assets/img/day2/11-13-084649-imported-15-hud-r8-layout.jpg | 08:46 · Brass sundial HUD with the Latin day name over the treetops | Brass compass dial with DIES LUNAE and weather icons | 1120 x 500
assets/img/day2/11-13-084649-imported-16-loading-loop.jpg | 08:46 · Loading screen: golden armillary sphere in the dark with a lore line | Golden armillary sphere on a dark background with italic text | 1400 x 875
assets/img/day2/11-13-084444-agent-turn-end.jpg | 08:44 · Chaos Cloth capes in motion: blue and brown cloaks walking side by side | Six panels of walking figures in simulated capes | 1600 x 1000
```

## 12:00–16:00 · Rules, a sundial and a body that gets cold

I came back at noon with a list. The world keeps running while you talk, Skyrim-style: «Die Welt läuft weiter während man redet.» No quest markers in normal play, only in debug. The narrator speaks in cutscenes, never during play. And the castle:

> «für die burg wir brauchen eine stärkere silhouette und mehr sense, emrh sinn müsse n dinge ergeben.»

(For the castle we need a stronger silhouette and more sense, things have to make more sense.) That started a castle kit and a house generator, built from modules.

Then I asked a question I'd been putting off. I don't write code, and I wanted to know whether the project was being built properly:

> «are we using division betweenfront and back/ ui and stuff, are we using clean code/programming principles etc. test driven development?»

> «ich schriebe ja selber keien code und kenne mich nur ein bisschen aus erklär mal wie das projekt gerade ist undso»

(I don't write code myself and only know a little, explain what the project looks like right now.) The answer was an architecture review and a pilot: pure rule logic pulled out into world-free C++ and tested headless in seconds. The first system built that way was warmth. I described it as «wie eine healthbar nur dass man quasi in der mitte sein will» (like a health bar, except you want to stay in the middle). It goes freezing, cold, cool, normal, warm, hot, burning. Sun warms faster than shade, wet plus cold is especially bad, water steals heat. Ten unit tests passed in 15.5 seconds.

Build 0.9 at 14:51 was the groundwork for Build 1. It added story, talk, inventory, character creation, and sleep on a brass sundial with a light puzzle that works once by sun and once by moon.

```gallery
assets/img/day2/11-13-151854-imported-5-hearth-night.jpg | 15:18 · Warmth system Calor: the player at a glowing hearth at night | Figure lit orange by a hearth in a dark forest, warmth bar at the bottom | 1600 x 900
assets/img/day2/11-13-154452-milestone.jpg | 15:44 · Sleep dial in game: brass clock face over the cell, "5 hours of sleep" | Brass sleep dial with Roman numerals over a dark cell | 1600 x 864
assets/img/day2/11-13-144628-commit.jpg | 14:46 · MetaHuman close-up: character creation face in the test map | Close-up of a MetaHuman woman's face | 1600 x 931
assets/img/day2/11-13-134221-milestone.jpg | 13:42 · Cloak simulation comparison: four cape set-ups against the sky | Four figures in different simulated cloaks | 1600 x 1000
assets/img/day2/11-13-122310-agent-turn-end.jpg | 12:23 · Headwear board: script-modelled helmets and iron masks on MetaHuman heads | Review board of iron masks and helmets on heads | 1600 x 864
assets/img/day2/11-13-133148-commit.jpg | 13:31 · PCG castle approach round 2: organic terraces and dry-stone walls, with GASP traversal tests | Board with screenshots of a mannequin climbing stone terrace walls | 1600 x 864
```

## Setback: four editors and builds that looked old

At 12:59: «die ganze ezit sehe ich budls die voll veraltet wirken???» (all the time I'm seeing builds that look completely outdated???). At 13:25: «es ist gerade 4x der editor offen muss das sei.» (The editor is open four times right now, does that have to be?) Shortly after, Task Manager itself stopped responding.

The causes were mundane. Every new worktree recompiled about 85 NVIDIA plugin units and copied 2.3 GB, editor starts waited behind other agents' compiles (one hung for 14 minutes), and feature tests ran on the full island. The fixes were too: prebuilt NVIDIA plugins in the engine, small test maps, and at most three Unreal compiles at once.

The loading-screen props from that round didn't survive either. I rejected the specimen jar, the phial case and the instrument roll: «they don't really make sense». The next round was real historical objects tied to the story: a dark lantern, a brass warming pan and a grafted sapling in a pot.

```gallery
assets/img/day2/11-13-133721-shot.jpg | 13:37 · Editor hangs: Task Manager reports Not Responding | Task Manager window titled Not Responding with an empty process list | 960 x 600
assets/img/day2/11-13-152349-clip.jpg | 15:23 · Loading props round 1 on the board: brass instrument box, rendered lid open on velvet. Rejected (still from a clip) | Board cards with a brass and oak case and a leather instrument roll | 1600 x 795
```

## 16:00–20:00 · Weather routes, timber frames and a round cell

Weather now changes along believable routes: clear, overcast, rain, storm, then storm, rain, fog and clear again. The house kit grew from 72 to 96 scripted pieces, with bowed timber frames, real shingles and openable shutters. I picked the prison cell from reference images: a round ward with a shaft of light in the middle, beds around the edge, and a balcony above for the guards.

At 19:19 I asked for something this website now has: «lass uns auch ein feature log per buidlk machen und an einer timeline in meinem log visualisiern.» (let's also make a feature log per build and show it on a timeline in my log). That is the branch chart at the bottom of this page.

At 19:36, before testing Build 0.9.2 myself: «why not im happy. let me test hte functionality by myslef now».

```gallery
assets/img/day2/11-13-180057-agent-turn-end.jpg | 18:00 · Weather routes: rain clearing on the island road, debug readout on top | Rainy road with a debug line reading Weather rain to clear | 1282 x 752
assets/img/day2/11-13-181548-agent-turn-end.jpg | 18:15 · House kit: timber-frame interior with plank floor and stair hatch, my comment below | Timber-framed attic room with a floor hatch | 1600 x 864
assets/img/day2/11-13-182622-milestone.jpg | 18:26 · Concept for the prisoner cell: round ward around a shaft of light | Top-down render of a circular stone ward with a light shaft | 1600 x 864
assets/img/day2/11-13-205155-commit.jpg | 20:51 · Dry-stone wall rendered for the PCG island dressing | Close render of a dry-stone wall | 1600 x 764
```

## 20:00–00:00 · Who are you?

Character creation opened for the first time in a dark room with embers: «Who are you?» You pick a body, a skin tone and a gender (*Mulieris, Media, Virilis*). Race is greyed out with "Not in this cut". The ACE lab NPCs answered with subtitles, and I said what I thought of the conversations: «die konverstaotnen sind ziemlcih stumpf.» (the conversations are pretty dull). Hair arrived on the NPCs, the music system got real stems with a mixer, and a rat got rigged.

```gallery
assets/img/day2/11-13-201237-milestone.jpg | 20:12 · Character creation "Who are you?" in a dark room with a MetaHuman body | Character creation menu beside a MetaHuman in underwear in a dark room | 1600 x 900
assets/img/day2/11-13-201812-milestone.jpg | 20:18 · Hair round 2: MetaHuman NPCs with hair on the island road at dusk | MetaHuman NPCs with hair walking on a dusk road | 1600 x 900
assets/img/day2/11-13-204532-commit.jpg | 20:45 · ACE talking NPC answers with subtitles on the beach test map | MetaHuman in a yellow vest speaking with subtitles on a beach | 1600 x 931
assets/img/day2/11-13-212616-agent-turn-end.jpg | 21:26 · Music stems page: layer mixer sliders for the dn4 set | Web page with stem sliders for a music piece | 1600 x 764
assets/img/day2/11-13-224650-imported-poster-scurry-f3.jpg | 22:46 · Rigged rat rendered in Cycles, mid-scurry | Realistic grey rat mid-step | 1600 x 900
```

## Setback: too many boards

The review boards from day 1 worked too well. By evening there were 68 of them, open across tab groups in my browser, and some couldn't even save. I was exporting feedback files into Downloads and losing track of which was which:

> «all the feedbacks are getting missed way to amny baords opened... i am trying to manually closxe them»

At 22:43 they became one: every old board closed, every answer read out of the browser's storage and archived, and the open questions of all sessions put on a single decision board. At 23:44 I asked for the same again, «Merge die alle und halte die offenen Fragen fest.» (merge them all and record the open questions). By 00:48 there was one board with 79 decisions ordered by urgency. At 23:50 the narrator got his name: **Custos**.

## 00:00–03:56 · Sounds I couldn't hear

Build 0.9.3 was packaged at midnight and 0.9.4 at 02:22, with fixes from my walkthrough of 0.9.3. Most of the night went into five rounds of menu sounds. On the second round I wrote «ich höre nichts!» (I can't hear anything!). 92–99 % of the energy in the generated tones sat below 120 Hz, inaudible on my speakers. On the fifth round I said the "single drum hit" for confirm was several hits. An onset counter then found 5–12 onsets per take: the local model had made drum rolls, and I heard it before the agent measured it. The board closed with one deep muffled drum hit, a stone settling for loading a save, and a page turn for saving.

At 03:51 I asked how to save disk space, «radikal» (radically). A few minutes earlier, when an agent asked if there was anything else: «nein danke exzellente abreit :)))) !» (no thanks, excellent work).

```gallery
assets/img/day2/11-14-005300-commit.jpg | 00:53 · Fog over the island road with the tower on the hill, opening narration on screen | Foggy road with a castle tower on a hill and narration text | 1600 x 900
assets/img/day2/11-14-013040-commit.jpg | 01:30 · Decision board: all open questions with castle and character images | Decision board grid with castle, HUD and character cards | 1600 x 764
assets/img/day2/11-14-030446-watch.jpg | 03:04 · Lore card: "The Lens-Grinder and the Moon-Child" story draft, with my comment on the cellmates | Story card for two cellmates with a long comment below | 1600 x 864
```

## Timeline

```timeline
00:24 | Build 0.7 tagged: first playable combination. Mac passes too
00:47 | Final type set: IM Fell English SC, IM Fell Great Primer, Barlow
03:23 | Water diagnosed: FFT foam flicker, 19.4 vs 0.4 frame change
05:02 | "What if I just drop the Mac?"
06:17 | Build 0.8: Final Build 0
07:13 | "Drop all these tests, test only what's new"
08:02 | New orchestrator session takes over; DECISIONS.md becomes binding
09:58 | Build 0.8.2: start sequence, settings, Skyrim controls, rain look
13:04 | Mac development stopped
14:51 | Build 0.9: story, talk, inventory, character creation, sundial
15:20 | Warmth system built test-first, 10 unit tests in 15.5 s
16:11 | Build 0.9.1: polish, music set dn4, robustness
19:32 | Build 0.9.2: UI round, weather routes, warmth
22:43 | 68 boards become one decision board
23:50 | The narrator is called Custos
00:00 | Build 0.9.3 packaged (Sat)
02:22 | Build 0.9.4: fixes from my walkthrough (Sat)
02:42 | Menu sounds settled after five rounds (Sat)
```

## Builds of the day

```specs
# 0.7 · 00:24
Theme: first playable combination
Package: 2,848 MB, Mac 2.1 GB
# 0.7.1 · 04:57
Theme: fonts, music, water fix. Last Mac build
Package: 3,033 MB
# 0.8 · 06:17
Theme: Final Build 0. Creator MetaHumans, gameplay SFX, brand look, UI kit
Package: 3,869 MB
# 0.8.1 · 07:41
Theme: front-end audio on the brand start screen
Package: 3,855 MB
# 0.8.2 · 09:57
Theme: start sequence, menus, controls, rain look
Package: 3,904 MB
# 0.9 · 14:51
Theme: Build-1 groundwork. Story, character system, creation, sundial
Package: 3,974 MB
# 0.9.1 · 16:11
Theme: polish. UI, animation, music set dn4, robustness
Package: 4,055 MB
# 0.9.2 · 19:32
Theme: UI round, weather transitions, warmth
Package: 4,048 MB
# 0.9.3 · 00:00 Sat
Theme: front end, HUD, character creation, flow, hair, loading props
Package: 4,847 MB
# 0.9.4 · 02:22 Sat
Theme: fixes from the 0.9.3 playtest
Package: 4,849 MB
```

A script counted the jam so far at 03:07 on Saturday, right at the end of this "day": 95,339 lines of C++, 584 commits, 47 agent sessions (Claude and Codex) with 286 subagent runs, 80 review boards with 689 rated cards and 219 logged decisions, 262 3D models, 236 API images and 266 AI sound effects. There is one human. Most of the generated material is not in the game. That's what a cut is.

<!-- branches-embed -->
```embed
builds.html?day=2 | Branches of day 2: every branch active that day, by area, with the build it shipped in. Hover or tap a row. | 1750
```
