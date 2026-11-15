---
title: day-3.log
slug: day-3
order: 6
date: 2026-11-14
day: day 3
phase: jam
status: draft
summary: Build 1 starts: an escort, a cell with two cellmates who talk back through NVIDIA ACE, a kit-built castle and end credits. Then two GPU driver hangs, a hard reboot, and a new way of working. Status so far, still running.
---
```recap
**Before this entry:** Builds 0.7 to 0.9.4 from day 2. A playable island with a grey-box castle, weather routes, warmth, a sundial sleep with a light puzzle, character creation, suspicious masked guards, the final type set, one decision board instead of 68, and an ACE lab where NPCs talk back, in a separate project. The Mac build is gone.
**What this entry covers:** Saturday 14 November from 03:56, my own cut of "day 3". It's still running, so this is the status so far, not a finished day. Highlighted text is my own messages, mostly typed in German, with the English after them. The rest is AI summary.
```

Day 3 is the day Build 0 stopped and Build 1 began. Build 1 is a short story you can play from start to end. By the evening there was a story skeleton from the boat to the cell to free roam, two cellmates you can talk to by voice, a castle built from a kit, and end credits. There was also a GPU that hung twice and a machine that had to be switched off by hand.

## 03:56–08:00 · A ladder of 19 steps

At 03:57 an agent turned my board answers into the **Build 1 plan**: a ladder of 19 steps where the game ships after each one. The skeleton comes first. You're escorted, and if you run, the scene restarts as *Take two*. Then come cuts, the cell with two inmates, talk, a riddle, release, finding your documents, and free roam. ACE talk and polish come after that.

Build 0.9.5 was tagged at 03:59 with my sound picks, a new sprint scheme, earlier escort cuts and smoother loading. Its input and UI tests failed "as written": the tests were stale, not the game.

The next hour turned into a parallel session for the world, content and credits. Eight agents ran without compiling anything: credits, licences, live loading props, the dungeon, NPC activities, music sorting, ambience and world concepts. On paper, the castle got battlemented, walkable tower tops with newel stairs, checked by script (max step 23 cm, head room at least 2.35 m). The dungeon from the round-cell concept went into Unreal as 51 meshes and 1,405 actors.

```gallery
assets/img/day3/11-14-043213-commit.jpg | 04:32 · Concept art: observatory courtyard with a great armillary at dusk, on the decision board | Night courtyard with a large armillary sphere and a robed figure | 1600 x 764
assets/img/day3/11-14-051939-imported-castle-v25-tower-classes.jpg | 05:19 · Castle plan v2.5: tower classes, ring wall and inner buildings | Annotated castle plan with coloured tower classes | 1600 x 1451
assets/img/day3/11-14-052504-imported-housekit-compare.jpg | 05:25 · House kit comparison: Blender kit vs Unreal generator with real wall metrics | Side-by-side of two timber-frame houses with measurement strips | 1600 x 1105
assets/img/day3/11-14-060935-imported-v4-plan-masks.jpg | 06:09 · Island round 4 plan: terrain masks for fields, terraces and castle hill | Two island maps with coloured terrain masks | 1600 x 836
assets/img/day3/11-14-051831-imported-compare-grate-E-tele.jpg | 05:18 · Dungeon round 5: forged grate windows letting in daylight | Two arched windows with iron grates, before and after | 1600 x 469
assets/img/day3/11-14-061316-imported-ue-own-eyelevel.jpg | 06:13 · Dungeon in Unreal: round asylum hall with a shaft of light on the floor | Round stone hall with a gallery and a bright light shaft | 1600 x 900
```

## The end credits, and why they're long

I wanted long, funny end credits, with the music I'd picked, that tell what the work in progress actually was:

> «mit viel humor dokumentieren was der wip war mit bildern, um directiors cut»

(Document what the WIP was, with a lot of humour and pictures, around Director's Cut.) I also gave the agents a sentence for the credits, which I'll quote exactly as I typed it at 04:39:

> «of course jsut building a scaffoldinglike this ffrom scratch is a massive undertaking and wa too big a scope, but artifical intelligence made it psoisvle eprhaps we ar eon or eay to make more of ours dreams come true then oms critical sentence»

The rest of that message wasn't quite a sentence, but the idea was to say how many days it took before listing everything: «sayiung before you are underwehlemd».

By 06:34 the credits existed as a module that can be switched off. Black bars close, the logo comes, then cards, a scroll with 27 stills, a page called **The Evidence** with the numbers, a thank-you with a drawn heart, a QR code to this devlog and Funke. Hold any key for 8 seconds to skip. The first version squeezed every picture into a square, because a freshly imported texture reports a placeholder size while the editor is still compiling it.

```gallery
assets/img/day3/11-14-061915-imported-10-numbers.jpg | 06:19 · End credits "The Evidence": lines of C++, commits, agent roles and one human | Credits page listing jam statistics ending in 1 human and 1 dragon | 1600 x 900
assets/img/day3/11-14-062508-imported-32-qr.jpg | 06:25 · Credits finale: QR code to the devlog beside the pixel mascot | QR code next to a pixel dragon on black | 1600 x 900
assets/img/day3/11-14-062901-imported-label-raking-after.jpg | 06:29 · Raking light on the lead label of the loading prop: PUROS INSITA LUX | Close-up of a dark lead label with engraved Latin | 1600 x 900
assets/img/day3/11-14-062902-imported-arrangement-after.jpg | 06:29 · Loading prop: sapling in a chipped clay pot with a lead label | Grafted sapling in a terracotta pot with a knife | 1600 x 900
```

## Music like a rough cut

Around 05:30 I sent a YouTube link to a drum-and-bass set played with a full orchestra and wrote «da sis tso krank geil» (that's so insanely good). I asked for more in that direction, without vocals, maybe only chant, built so it fits the layered music system instead of being finished tracks:

> «ich will halt sonen bisschen science medieval vibe reinbringen und coinema und das geht aj auch über audio.»

(I want to bring in a bit of a science-medieval vibe and cinema, and that works through audio too.) A local experiment made three sample-locked eight-stem sets on one exact grid for 0 USD: our own score with sampled orchestra, a programmed kit, NumPy bass. I listened and asked the question I keep asking about everything AI makes:

> «es ist ja wie ein rohschnitt was würde hans zimemr jetzt damit tun»

(It's like a rough cut. What would Hans Zimmer do with it now?) And then «und der omponist von skyrim musik?» (and the composer of the Skyrim music?). The direction became Zimmer-like weight for cutscenes and Jeremy Soule-like stillness for exploration, blending into each other.

The licensed music also left the game. The day-1 test packs (Caravan and Starry Skies) are mine, bought, but:

> «ich habe es als inspo gentutz caravan und star sky dingsi kommen raus ich besitze sie allerdings aber is t oklay ich will ja alles als meine musik haben.»

(I used them as inspiration. The Caravan and Starry Sky things come out. I do own them, but it's okay, I want all of it to be my music.)

```gallery
assets/img/day3/11-14-061534-watch.jpg | 06:15 · Music experiment page: DnB meets symphonic, stem mixer | Web page with eight stem sliders for a music experiment | 1600 x 764
assets/img/day3/11-14-195953-commit.jpg | 19:59 · Music stem mixer with waveforms for the DnB x symphonic experiment | Mixer with coloured waveforms per stem | 1600 x 764
```

## A second PC, and a 15 m cable

At 06:04 the second PC became the creation machine (*winalt*, an RTX 3090). Blender, image-to-3D, material generation and AnyScene jobs now go there over SSH, so the main machine can run Unreal. Setting it up surfaced something embarrassing. The main machine had been on Wi-Fi the whole jam, with less than one bar:

> «meinst du ich habe mcih die häälfte des jams subtil ausgebremst?»

(Do you think I've been subtly slowing myself down for half the jam?) At 07:01: «dsas kabel steckt» (the cable is in). The agents measured before and after.

## 07:00–08:00 · Build 1 on main

At 07:14 the first Build 1 integration ran end to end in the editor. The quest test walks from New Game to free roam with the real talk panel, the riddle, the release, the belongings room and the closing. At 07:40 I skipped the rest of Build 0: «cih kann dan einfach dirket 1 testen oder anstatt 0.9.5 oder 6» (I can just test 1 directly instead of 0.9.5 or 6), so there's no 0.9.6. From then on everything goes onto the Build 1 line as 0.10.x. Build 0.10.0 was packaged and tagged at 08:33.

At 07:16 the cellmates spoke for the first time through **NVIDIA ACE**. Anselm and Mira answer free typed lines with a local 2B language model, guided by the game's topics and authored lines. By 07:43 they also spoke the answers (ACE TTS) and listened by push-to-talk (ACE ASR). The first audio comes about 0.85 s after the request. All of it runs on the player's GPU, with no server. Then I pushed to merge it right away instead of running another test round:

> «hm its a bit broken bt yknow can we jhsut integrate stuff and i will test it actually i feel a llot of the tests and continuos builds are taking up a lot of time»

So ACE went onto main as 0.10.1, off by default, editor-only, for me to try.

```gallery
assets/img/day3/11-14-050500-watch.jpg | 05:05 · Cell table with belongings: lore cards for each prisoner backstory | Six parchment cards with backstories and stat modifiers | 1600 x 931
assets/img/day3/11-14-072031-imported-after-cell-bench.jpg | 07:20 · Dressed prison cell: bench, plank bed, table and candle lanterns | Dark cell with a bench, bed, lanterns and a skeleton | 1600 x 900
assets/img/day3/11-14-093140-imported-mood-dark-cell-belongings.jpg | 09:31 · Dark cell mood: iron-bound chest and table in candlelight | Iron-bound chest and wooden table in candlelight | 1200 x 675
assets/img/day3/11-14-183700-shot.jpg | 18:37 · Grey-box cell: talking with fellow prisoner Mira, topics on the left | Talk panel with Mira and topics beside two figures in a grey room | 1600 x 931
```

## 07:00–10:00 · A castle from a kit

The castle kit from day 2 (a C++ house generator, modular walls, towers and gatehouses with traversal proxies for GASP) went onto the island. For the first time the view from the start shows a castle that looks like one: curtain walls, round towers, timber-frame houses with tiled roofs, terraces running down the slope. A scripted hand-play walk got stuck for 40 s in a market stall and found a 75 cm ledge in a lane. The last run made it through 107 of 107 waypoints in 96 s.

```gallery
assets/img/day3/11-14-075316-imported-g3-first-view.jpg | 07:53 · First view in L_World_Island: the player faces the castle on the hill | MetaHuman standing on a hill looking at a castle across the bay | 1600 x 900
assets/img/day3/11-14-073138-imported-pie-overview.jpg | 07:31 · Kit-built castle from above: curtain walls, towers and timber houses | Aerial view of a walled castle with towers and houses | 1600 x 900
assets/img/day3/11-14-073213-imported-pie-houses-roofs.jpg | 07:32 · Timber-frame houses with tiled roofs inside the castle walls | Close view of timber-framed houses with grey tile roofs | 1600 x 900
assets/img/day3/11-14-074712-imported-pie-island-overview.jpg | 07:47 · The kit castle on the PCG island, terraces running down the slope | Island overview with the castle on a hill and terraces below | 1600 x 900
assets/img/day3/11-14-093232-imported-r2-cliff-below.jpg | 09:32 · Castle rock rising from the sea, seen from the shore | Castle on a rocky outcrop above shallow water | 1600 x 900
assets/img/day3/11-14-093232-imported-r2-lane.jpg | 09:32 · Player in a lane between timber-frame houses inside the castle | Player walking down a cobbled lane between houses | 1600 x 900
assets/img/day3/11-14-093232-imported-r2-road.jpg | 09:32 · The graded road up to the barbican, castle on the rock | Player running up a dirt road toward a stone barbican | 1600 x 900
assets/img/day3/11-14-090655-clip.jpg | 09:06 · Brass armillary sphere glowing on a wooden table, loading-screen loop (still from a clip) | Brass armillary sphere on a dark wooden table in warm light | 1600 x 931
```

I liked a lot of it, and said so on the board in the evening: «Das ist jetzt alles sehr interessant, also super.» (This is all very interesting now, so great.) I didn't like all of it. The rocks were still open at the bottom: «Ich habe schon mehrfach gesagt, dass diese Steine dieses Problem haben … Das geht gar nicht.» (I've said several times that these stones have this problem … that's not acceptable.) The bailey ground texture was «schrecklich» (terrible). And for the whole island: «Es muss next level werden jetzt.» (It has to go next level now.) The props didn't get away either: «momentan ist alles sehr generisch» (right now everything is very generic).

## Faces, hair, masks and clothes

The characters ran in their own session all day. HQ strand hair goes only to the main characters: Mira gets a braid, Anselm a messy bun, and the player a ponytail or slick ponytail when the mask comes off, with a scraggly beard visible under the mask on the male player. Everyone else gets card hair. Masks were fitted per head, PBRgen made fabric and stone materials on the second machine, and a cast line-up level started that always shows every character.

Clothing is the hard part, and earlier in the day I had parked it with a typed sigh:

> «sehr brken da mache ich später prio sit es, kleidung zu erstellen die passt … das cape funktioneirt noch am besten teilweise … save this aprt for later»

(Very broken. I'll prioritise it later, making clothes that fit … the cape works best, partly … save this part for later.) By the evening the plan was minimum first: every NPC in the world at least wears shoes and hose, and one simple medieval shirt gets authored on Epic's example bodies and then resized.

```gallery
assets/img/day3/11-14-081046-commit.jpg | 08:10 · Fab garments fitted on walking MetaHumans | Board with MetaHumans in fitted shirts and trousers, walking | 1600 x 764
assets/img/day3/11-14-083834-commit.jpg | 08:38 · Masks and hoods fitted on many MetaHuman heads | Grid of helmets and masks on different heads | 1600 x 864
assets/img/day3/11-14-083647-watch.jpg | 08:36 · PBRgen stone wall materials generated on the second machine | Two stone wall textures side by side | 1600 x 864
assets/img/day3/11-14-171722-watch.jpg | 17:17 · Hair HQ round: strand hair and ponytail on MetaHuman heads | Close-ups of MetaHuman women with strand hair | 1600 x 864
assets/img/day3/11-14-185450-milestone.jpg | 18:54 · Hair HQ round 3: strand hair on a crowd of MetaHuman NPCs in the editor | Editor view of many MetaHumans with hair | 858 x 890
assets/img/day3/11-14-205516-commit.jpg | 20:55 · Masked player faces: leather mask with a speaking slot on different heads | Board with a leather mask and the same face unmasked | 1600 x 764
```

## 15:30–17:30 · Seeing, not orchestrating

When I came back in the afternoon, the thing that bothered me most wasn't a bug. It was how we worked:

> «Die Regel, packe nicht so oft, wenig Branches, Bundle fixes, teste im Brwoser und nicht zu viel Tests immer nur spezifische, wird die verwendet und sparen wir Zeit? Es kommt mir immennoch etwas lang…»

(The rule: package less often, few branches, bundle fixes, test in the browser, not too many tests, only specific ones. Is it being used, and are we saving time? It still feels a bit long to me.) It led to a longer conversation, and some of what I said there is now the header of our rules file:

>> «ich will Sachen sehen, validieren und nicht mehr so viel orchestrieren selber»
>> «es soll alles heute angestoßen werden … ich brauche schnell Ergebnisse und große Sprünge»
>> «die Tests müssen schlanker, wenn ich diese Python-Tests sehe, es wird 100 mal getestet alles, ich habe das schon so oft gesagt»
>> «ich will mich nicht wiederholen aber ich will auch nicht, dass alte Entscheidungen doch wieder überschrieben werden»

(I want to see things and validate them, not orchestrate so much myself. Everything should get started today, I need fast results and big leaps. The tests have to get leaner. When I see these Python tests, everything is tested a hundred times, and I've said that so often. I don't want to repeat myself, but I also don't want old decisions to get overwritten after all.) And, in the same conversation: «Der Jam bedeutet mir viel.» (The jam means a lot to me.)

So the setup changed. There is one orchestrator for main, tags, world, fixes and ACE, and separate sessions only for characters and music. There are few work packages, each with one higher-level agent doing 1 to 20 tasks. Fixes go onto one shared fix branch per round. One test pass per package, only for what changed, in the editor. `AGENTS.md` was cut down to that, and a handover skill now lets a new orchestrator pick up running work.

Two smaller decisions from the same hour that I like. Narration lines should vary: «mal länger mal kürzer ist doch realistischer» (sometimes longer, sometimes shorter is more realistic). And the loading screens become live scenes that the player can nudge with the keys, not videos: «Es soll ja kein Render mehr sein.» (It's not meant to be a render anymore.)

## Setback: the GPU gives up, twice

Editor crashes had been a running cost since morning: a world-memory-leak assertion at 07:35, then a D3D12 uniform-buffer assertion in the clothing worktree at 16:49 that came back at 17:53, plus crash reporters at 17:03, 18:24, 18:36, 20:02, 20:05, 21:05 and 22:32.

At 19:23 the GPU driver itself hung (nvlddmkm error 153, a timeout detection and recovery). At that moment a hair test game, the clothing editor and a package smoke test on the full island were all running on the GPU. The sessions saved their state and the Mac session killed the processes over SSH. My reaction at 19:51 was mostly impatience:

> «Okay, lass das gleich machen. Mir ist jetzt wichtig, dass wir weitermachen.»

(Okay, let's do that in a moment. What matters to me now is that we keep going.) The rule after the first hang was that package and smoke tests run alone on the GPU. At 21:23 it hung again, with my editor plus one story test on the island. At 21:42 the main machine had to be switched off by hand, and every agent session stalled from about 21:24. The rule now is strict: at most one Unreal process on the GPU of the main machine at a time, and my own editor counts.

The other limit hit around the same time: the Git LFS budget for the repo was used up, so agents now commit no LFS-tracked files until that's sorted out. And a small one, from 23:00, when an agent kept stopping at confirmation prompts for file deletions while I wanted to sleep: «Diese Remove Operations geht, wenn ich jetzt schlafen gehe, dann ist das schwierig.» (These remove operations, if I go to sleep now, that's difficult.) Agents now don't delete, and never wait on a prompt while I'm away.

```gallery
assets/img/day3/11-14-210652-setback.jpg | 21:06 · Fitting test in the editor: a crowd of MetaHumans in purchased garments and capes. Captured at 21:06; the second GPU hang came at 21:23 | Unreal editor with dozens of MetaHumans in robes and capes | 1600 x 900
assets/img/day3/11-14-200657-clip.jpg | 20:06 · Props concept board: fireplace, weapon rack, shelves and a chapel window (still from a clip) | Board with concept images of a fireplace, weapon racks and stained glass | 1600 x 764
```

## The evening so far

Build 0.11.0 was packaged and tagged at 19:56, the first package under the one-GPU rule. It has credits after Custos's closing lines, loading loops round 4, world maps, fix round 1, HQ hair, and ACE on by default when the GPU supports it. It's 10.5 GB, because it stages the first NVIDIA ACE models. All its package tests passed. Build 0.12.0 started integrating at 22:29.

The board also kept moving. I freed my Tripo credits on the second machine for the agents («Kann damit machen, was es will.», it can do whatever it wants with them). I allowed fal for concept art («Nutze doch fal, warum nicht?», just use fal, why not?) with moderate caps per round. I asked for less famous classical pieces as the basis for the music experiment. And I sketched the body page I want for the bio-levelling: a translucent figure of your own MetaHuman in a Vitruvian pose, with the light and dark orbs and the stats, unlocked in the cell.

## Timeline so far

```timeline
03:57 | Build 1 plan: 19 steps, the game ships after each one
03:59 | Build 0.9.5 tagged. Last Build 0 package
04:58 | World, content and credits session starts with eight agents
06:04 | The second PC becomes the creation machine
06:34 | End credits module: The Evidence, QR code, Funke
07:01 | Ethernet cable plugged in, after half a jam on Wi-Fi
07:14 | Build 1 integration 1 runs New Game to free roam in the editor
07:16 | Cellmates answer through NVIDIA ACE with a local LLM
07:40 | No Build 0.9.6. Everything goes onto the Build 1 line
08:33 | Build 0.10.0 packaged and tagged
08:35 | Build 0.10.1: ACE free talk and push-to-talk, off by default
15:35 | "Is the rule being used, and are we saving time?"
17:10 | Fewer agents, more bundling. AGENTS.md rewritten, handover skill
19:23 | First GPU driver hang
19:56 | Build 0.11.0 packaged alone on the GPU: 10.5 GB with ACE models
21:23 | Second GPU driver hang. Hard reboot at 21:42
21:58 | Git LFS budget used up
22:29 | Build 0.12.0 integration starts
23:45 | The build method: compile in one place, test once, cook iteratively
```

## Builds so far

```specs
# 0.9.5 · 03:59
Theme: board answers. Sounds, sprint scheme, escort cuts, loading smoothness
Package: 4,874 MB, partial (two tests stale)
# 0.10.0 · 08:33
Theme: Build 1 integration 1. Story flow, talking cellmates, belongings, footsteps, indoor mix
Package: 4,890 MB
# 0.10.1 · 08:35
Theme: NVIDIA ACE free talk and speech with the cellmates, off by default
Package: editor only
# 0.11.0 · 19:56
Theme: credits after the closing lines, loading loops round 4, world maps, fix round 1, HQ hair
Package: 10,545 MB with the first NVIDIA ACE models
# 0.12.0 · from 22:29
Theme: levelling, character brain, routines, look switcher, dressed cell
Package: in progress
```

## Soundtrack, now in four albums

The sidebar player grew from 12 to 39 tracks, grouped into four albums. Everything on it is either an own score (written as Python, rendered locally with Sonatina Symphonic Orchestra samples) or generated through fal with a commercial licence (Stable Audio 3, Lyria 3.5, ElevenLabs Music, ACE-Step); the licensed packs I used as inspiration are not on it. Long ambient beds are cut to three minutes with a fade. A few of the new ones:

```tracks
assets/audio/mus-title-orch-silver.mp3 | Silver Overture (Title Nightcore Orchestral) | 3:00
assets/audio/mus-title-longest-night.mp3 | The Longest Night (Own Score, Title A) | 1:36
assets/audio/mus-combat-war-drums.mp3 | War Drums at the Gate (Combat I) | 2:53
assets/audio/mus-sacred-salt-shrine.mp3 | Salt Shrine Chant (Sacred III) | 2:44
assets/audio/mus-night-cave-bells.mp3 | Bells in the Cave (Night Phonk, Classical) | 3:00
assets/audio/mus-dnb-timpani-breakbeat.mp3 | Timpani Breakbeat (Classical DnB I) | 2:00
assets/audio/mus-dnb-gezeiten.mp3 | Gezeiten Journey (Own Score, Cutscene Arc) | 2:59
```

## 23:45 · The build method that cost us hours

Late in the evening I asked for Build 0.13.0 with everything in it, and I asked for it fast:

> «Und mach es so schnell wie möglich. Also ohne zwölf Millionen Tests, lass es mich doch zuerst testen.»

(And make it as fast as possible. So without twelve million tests, let me test it first.) Then the orchestrator explained why a round took three to five hours. Every work package had its own branch in its own worktree, and every worktree compiled the C++ game code for itself. Each worktree has its own intermediate files, so every fresh worktree or branch switch meant a rebuild. And all of those builds stood in one machine-wide queue, because Unreal's build tool runs only once at a time. On top of that came test rounds per package and a package cooked from zero each time. At 00:03 I asked about cooking (the dictation wrote «guckt», "looks", where I said «kocht», "cooks"):

> «Wenn man guckt, wird alles neu geguckt oder nur das, was neu ist? … Also wenn ich jetzt ein 200 GB Spiel habe und 30 Leute dran arbeiten jedes Mal, wenn ein Change ist, cooken die das?»

(When you cook, is everything cooked again or only what's new? … If I had a 200 GB game and 30 people working on it, would they cook it every time there's a change?) No, they don't. Big teams work uncooked in the editor and cook incrementally on build machines. And the same goes for code: branches and merging are one thing, compiling is another. You compile in one place, and there an incremental build of our code takes about 38 seconds.

> «Ach du meine Güte. Ja, oh mein Gott. … Oh mein Gott, das hättest du von Anfang an catchen müssen.»

(Oh my goodness. Yes, oh my God. … Oh my God, you should have caught that from the start.) The orchestrator's answer, in short: the rules said one branch and one worktree per package, and each package was to be delivered compiled. That was set up for safety, not speed. My "faster" had only been written down as "fewer tests", never as "compile in one place". Every new orchestrator session reads the rule files, not what I said in a conversation, so it repeated the mistake, and it should have caught it at the start. Since 00:05 the rule is in `AGENTS.md`: game code is compiled only in the integration worktree, packages hand in code unbuilt, tests run once at the end, and the cook is iterative (`-iterate`).

I'm very, very frustrated about this. Here is how I said it to the devlog session, dictated (the dictation heard «Bildlänge», "image length", for build length, and «Szenen», "scenes", probably for «Skandal», scandal):

> «Ich geh auf jeden Fall rein, dass ich sehr, sehr frustriert bin über die Bildlänge»

> «Das ist ein Szenen, ich habe so viele Stunden sparen können.»

(I'm definitely putting in that I'm very, very frustrated about the build length. That's a scandal, I could have saved so many hours.) At 00:07 I asked for the number:

> «Jetzt eine geskriptete Kalkulation, wie viel Zeit wir verschwendet haben mit der Methode und wie viel wir jetzt voraussichtlich dann sparen.»

(Now a scripted calculation of how much time we wasted with the method, and how much we'll probably save now.) The script reads every build, test and package log that's on disk from 12 November 06:00 to the change at 23:45.

**Measured:** 444 builds of the game code in 52 worktrees, 62 of them first builds in a fresh worktree. Only 8.7 hours of it was actual compiling. The waiting in the build queue was at least 14.4 hours, summed over all agents (the longest single wait was 2.5 hours). The tests were the biggest item: 970 test runs, 24.9 hours. Packaging took 5.4 hours, of which cooking was only 1.5. So cooking from zero cost us little. The waiting and the endless tests cost us a lot.

**Estimated:** 42 to 50 hours of machine time were spent on work the new method doesn't need. Because agents worked in parallel, the delay to the builds I could play is smaller: 8 to 20 hours, most likely about 13. The new method should save 30 to 80 minutes per build round, most likely about 55. A typical round of 3.3 hours becomes 2 to 3 hours. That's 1.2 to 1.5 times faster, not the 2 to 3 times the orchestrator guessed that night, because most of a round is the agents' actual work. Iterative cooking isn't measured yet.

```gallery
assets/img/day3/build-time-audit.png | Per build round: the time as it ran (left bar) and the same round with one integration build, tests once and an iterative cook (right bar). Right: cumulative hours lost until the change at 23:45, likely line and low-high band. Script: tools/devlog/build_time_audit.py in the jam repo | Stacked bar chart of 14 build rounds with a cumulative line rising to about 13 hours | 1600 x 1000
```

## More captures

Automatic picks from the devlog board. This block is rewritten by a script, and its captions are condensed agent notes, not my words.

<!-- devlog-picks:start -->

```gallery
assets/img/day3/11-14-232935-commit.jpg | 14.11. 23:29: Okay, es ist wieder alles zu langsam. Einfach machen, einfach machen. Nicht sich blockieren lassen, so sehr klar. Und nicht diese 1000 Tests machen, verstehst… | Okay, es ist wieder alles zu langsam. Einfach machen, einfach machen. Nicht sich blockieren… | 1600 x 900
assets/img/day3/11-14-233155-commit.jpg | 14.11. 23:31: Beide Bilder sind in deinem Standard-Bildbetrachter geöffnet: die Körper-Seite (`corpus_page.png`) und die Inventar-Seite (`res_page.png`). | Beide Bilder sind in deinem Standard-Bildbetrachter geöffnet: die Körper-Seite (`corpus_page.png`)… | 1600 x 900
assets/img/day3/11-15-003705-shot.jpg | 15.11. 00:37: Game window during worldlevel r5 (meadow weight from slope, Nanite rock masters) on the way to 0.13.0. | Game window during worldlevel r5 (meadow weight from slope, Nanite rock masters) on the way to… | 1600 x 900
assets/img/day3/11-15-010655-shot.jpg | 15.11. 01:06: Game window during the key-place screenshot run (17 fixed camera places) on int-0.13.0 with the start music at the logo. | Game window during the key-place screenshot run (17 fixed camera places) on int-0.13.0 with the… | 1600 x 900
assets/img/day3/11-15-010657-clip.jpg | 15.11. 01:06 (still from a clip): 15 s of int-0.13.0 during the key-place screenshot run (title theme at the logo, larger cell, world rocks). | 15 s of int-0.13.0 during the key-place screenshot run (title theme at the logo, larger cell,… | 1600 x 900
assets/img/day3/11-15-013653-shot.jpg | 15.11. 01:36: Game window while fix6 lands: story score cues behind DN.Story.ScoreCues and a daily cap on ACE free talk (12 replies per character per day, then a tired line). | Game window while fix6 lands: story score cues behind DN.Story.ScoreCues and a daily cap on ACE… | 1600 x 900
assets/img/day3/11-15-043654-shot.jpg | 15.11. 04:36: Game window (line-up / key places): closer group shots of guards and farmers; clothing follow-up (hose feet, wool twill, Mira's own clothing body) merged into… | Game window (line-up / key places): closer group shots of guards and farmers; clothing follow-up… | 1600 x 900
assets/img/day3/11-15-043656-clip.jpg | 15.11. 04:36 (still from a clip): 15 s of int-0.13.0 with the clothing follow-up and the NPC line-up. | 15 s of int-0.13.0 with the clothing follow-up and the NPC line-up. | 1600 x 900
assets/img/day3/11-15-050653-shot.jpg | 15.11. 05:06: Game window on int-0.13.0: start music at the logo now begins 12 s in so the drop lands about 10 s after the logo. | Game window on int-0.13.0: start music at the logo now begins 12 s in so the drop lands about 10 s… | 1600 x 900
assets/img/day3/11-15-080319-milestone.jpg | 15.11. 08:03: Shirt v3 round 3 is in Unreal as a two-size parametric outfit on all 19 bodies (branch b1-shirt3); the whole cast seen in the line-up editor with hose, shoes,… | Shirt v3 round 3 is in Unreal as a two-size parametric outfit on all 19 bodies (branch b1-shirt3);… | 1600 x 900
assets/img/day3/11-15-083706-shot.jpg | 15.11. 08:37: Game window with the new UI fixes: transparent sundial face on the time HUD (UIN-04) and a tutorial checklist whose rows vanish when done (UIN-05). | Game window with the new UI fixes: transparent sundial face on the time HUD (UIN-04) and a… | 1600 x 900
assets/img/day3/11-15-083708-clip.jpg | 15.11. 08:37 (still from a clip): 15 s of the game with the time HUD and tutorial checklist changes. | 15 s of the game with the time HUD and tutorial checklist changes. | 1600 x 900
assets/img/day3/11-15-090737-milestone.jpg | 15.11. 09:07: Credits: Director's Cut section (knife slices the title), branch history and three-accounts middle cutscene run in the editor build; 148 winalt meshes… | Credits: Director's Cut section (knife slices the title), branch history and three-accounts middle… | 1600 x 900
```

```timeline
03:58 | Agent decisions (b095, to confirm): new sprint scheme puts sneak on LB and lets A tap prefer interaction over jumping; deny/rustle/value-change levels set by measurement, not by…
08:09 | Agent decisions, to confirm (hair-hq): placeholder looks prisoner_w (body player_f_standard_165, Dutch braid) and prisoner_m (body npc_04, chin-length hair); strands default…
08:09 | Jennifer asked to merge all review boards into one again and close the old ones in Firefox. Agent board-merge2 read every stored board state in Firefox (no new answers since the…
08:10 | Jennifer: props are too generic. First concept round with up to 5 USD of fal credit, breadth instead of variations: weapon display racks (swords, axes), stained glass windows as…
16:10 | The male prisoner should also get one of the downloaded HQ hair styles, not only standard Creator hair; the other HD styles are to be implemented too. Plan first, then work.
16:19 | Jennifer: one orchestrator for main, tags, world, fixes and ACE (ACE lab closes; figures and music stay separate). Goal: a solid Build 1 she can play through and one board with…
18:36 | Two more Unreal crash reporters opened at 18:24 and 18:36; the paramcloth worktree crash (D3D12 UniformBufferRHI assertion) recurred at 17:53. Editor stability is a running cost…
19:56 | Build 0.11.0 packaged and tagged (build-0.11.0 = d4c23ca, 10.5 GB with the first staged NVIDIA ACE models): credits after the Custos closing lines, loading loops round 4, world…
19:57 | Package 0.11.0 built, all package tests pass, tagged build-0.11.0 on d4c23ca (int-0.11.0: hair HQ round 3, text shadows, ACE on by default when supported); first package run…
23:36 | Unreal crash reporter at 23:30 while the worldlevel round fits world4's rocks into the story map (cause not checked).
00:02 | Board send 14.11.2026 23:59 (27 items): story answers ST-05 to ST-08 accepted (Take 2/3/4 only; bound hands in 0.13.0 «das ist wichtig»; name Custos), castle kit CK3 needs a…
00:10 | Biggest process lesson of the jam (Jennifer, 14.11.2026 ~24:00): «man kann ja einzelne Branches haben … aber das hat ja nichts mit der Kompilierung zu tun» / «Das muss ein…
01:06 | Jennifer's unified board 'Dein Board': one review page, comments as messages, versions tracked automatically.
04:14 | GPU rule lifted: nobody waits for GPU slots any more; only before a heavy process the GPU values are checked; otherwise just start. Changed in AGENTS.md rule 11 and 5,…
```

<!-- devlog-picks:end -->

<!-- branches-embed -->
```embed
builds.html?day=3 | Branches of day 3: every branch active that day, by area, with the build it shipped in. Hover or tap a row. | 1100
```
