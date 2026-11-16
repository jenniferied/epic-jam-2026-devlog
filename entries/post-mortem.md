---
title: post-mortem.log
slug: post-mortem
order: 8
date: 2026-11-16
day: post
phase: post
status: draft
summary: What four days of solo jamming with a crowd of AI agents produced, what was cut, and what I would change.
---

```recap
**Before this entry:** four jam days, from the first brief on 12 November to the final Shipping packages on 15 November. One island, one castle, one cell, two cellmates who talk back.
**What this entry covers:** the volume of what was made, the concept art I kept, what did not make it, the features as they stand, and the lessons. My own verdict is still to come.
```

## Editorial note — additions after the jam, 16 November 2026

After submission, Jennifer requested three missing website title images: Day 3 (the modular castle), Day 4 (a four-image collage of Jennifer's playtest screenshots: grass spikes, floating props, unfinished stairs and a warmly lit interior) and Builds (the branch-history credits). These use existing project material. Each caption ends with `*`; the accompanying note says that the image was added to the website after the jam. This does not change or backdate the source image's creation or capture date.

The descriptive sidebar titles for Day 3 and Day 4, the homepage play instructions and itch.io link, and the preparation disclosure were also added after the jam. These are editorial additions to the documentation, not extra game development presented as in-jam work. Marking them is transparency, not a statement that the organizers approved post-deadline edits.

The website shell, Funke, prep entries, prep illustrations and development tooling existed before the game-development window, as detailed on the homepage and in the preparation entries. Playing the game, watching its opening and reading its end credits provides another view of the work alongside this written record: [Darkest Night on itch.io](https://jenniferied.itch.io/darkest-night).

The homepage and itch.io instructions were subsequently clarified at Jennifer's request: **the in-game end credits are the main Glass Box making-of presentation; the website is supplementary material.** The instructions give the shortcut **Esc → Debug → Story point: Closing → Jump there**, followed by the closing sequence and credits, and explain scrolling versus holding to skip. The shortcut wording was checked against the integrated source and story configuration; it was not newly playtested.

## What was made

```specs
# The jam in numbers
Builds: 19 tagged builds from 0.3 to 0.12.0, then the 0.13 and 0.14 packages
Branches: 112 on the branch timeline
Commits: 1,157 in the game repository, 1,044 in the jam repository
Soundtrack: 39 tracks in 4 albums on this site
Concept and reference images: 1,292 generated, 64 ended up in the game project
3D models: 1,042 generated or scripted, 455 in the game project
Textures and materials: 468 made, 233 in the game project
Sound effects: 612 made, 188 in the game project
Music: 101 pieces made, 52 in the game project
Voices: 24 test voices
Feedback tracker: 232 items, 103 built, 3 dropped
```

The AI numbers come from the credits script (`tools/credits/ai_stats.py`, run on 15 November). "Made" counts every generative model and every script an agent wrote. Third-party and Epic content is not counted. Most of it never reached the game.

```specs
# Where the time went (measured until 23:45 on day 3)
Game-code builds: 444 in 52 worktrees
Compiling: 8.7 h
Waiting in the build queue: at least 14.4 h, summed over all agents
Test runs: 970, 24.9 h
Packaging: 5.4 h, of which cooking 1.5 h
Estimated waste: 42 to 50 machine hours, about 13 hours of delay to playable builds
```

## Best concept art

Every picture here was generated, then picked on a review board. Most of what I generated never got that far. These stayed.

```gallery contain
assets/img/postmortem/concept-inner-ward-observatory.jpg | Inner ward with observatory instruments at night. The first batch favourite, and the look of the whole game. | Robed figure at an armillary in a castle courtyard under the Milky Way | 1600 x 893
assets/img/postmortem/concept-valley-from-wall.jpg | The valley seen from the castle wall, with the observatory dome behind. «Richtig gute Richtung» (a really good direction). | Misty valley with a winding road, seen from a battlement with a brazier | 1600 x 893
assets/img/postmortem/concept-observatory-terrace.jpg | Instrument terrace at dusk. The dome roof was «extremst cool». | Night terrace with an armillary, a desk with a lantern and a domed tower | 1600 x 893
assets/img/postmortem/concept-sunning-racks.jpg | Sunning racks on the roof. «SEHR SEHR GEILES KONZEPT» (a very, very great concept). Solar energy, in the Middle Ages. | Wooden drying racks with mirrors on a castle roof, a figure bending over a tray | 1600 x 893
assets/img/postmortem/concept-large-instruments.jpg | The instrument sheet: armillary, sundial, globe, quadrant, with human scale. It fed the props and the loading screens. | Sheet of brass and stone astronomical instruments beside two human silhouettes | 1600 x 893
assets/img/postmortem/concept-asylum-light-shaft.jpg | The asylum cell hall with one shaft of light. It became the round dungeon. | Vaulted stone hall with prisoners on benches and a light shaft on the floor | 1600 x 914
assets/img/postmortem/concept-hero-iron-mask.jpg | The hero prisoner mask. Heavy, animal-like, held by leather. | Hammered iron wolf mask on a mannequin head | 1024 x 1280
assets/img/postmortem/concept-full-coverage-masks.jpg | Full-coverage prisoner masks. Round 3 asked for «immediately build». | Three riveted iron helmets with leather neck guards | 1600 x 914
assets/img/postmortem/concept-guard-helmets.jpg | Guard helmets in different types, accepted in round 2. | Row of five steel helmets on stands | 1600 x 914
```

## What didn't make it

Four days are not enough for an open-world RPG. The pitch was «the game I have always dreamed of making». What shipped is the scaffolding for it.

```gallery contain
assets/img/day-1-concept-sheet.webp | The original ambition: masked figures, castles, eclipse imagery. Far more world than the jam could hold. | Dark fantasy concept sheet with masked characters, castles and eclipse imagery | 1600 x 900
assets/img/day-2-water-editor.webp | Water. Rejected in the first playtest, replaced by three switchable options, and still not right. | Unreal Editor showing an alternative ocean surface | 1600 x 900
assets/img/day-2-parametric-clothing.webp | Clothing on MetaHumans. A fitting study across body types. Only a minimum shipped. | Front, side and back clothing fit comparison on a broad guard body | 1400 x 1712
```

- **The larger island.** The first footprint was too big. It stays as a post-jam direction.
- **Mac builds.** Native Mac packages passed up to 0.7.1. Mac development stopped on 13 November around 13:30. Build 0 stayed Mac-compatible, nothing was debugged there any more.
- **Licensed music.** The two bought test packs, Caravan and Starry Skies, left the game. «ich will ja alles als meine musik haben» (I want all of it to be my music).
- **Rooms and houses.** Most stay closed. The observatory rooms were «not in the time». Doors carry the name and «nicht in diesem Cut» (not in this cut).
- **Appearance and outfit choice.** Only one standard outfit. The other outfits and the beard option are marked "not in this cut".
- **Weapons.** Paused after concept round 2, later "not needed".
- **Waterline water.** Tested on its branch, never cooked into the 0.7.1 merge.
- **Steampunk, the wax seal, the meridian needle, a vellum quest log.** All dropped early.
- **Clothing for everyone.** Parked on day 3 with «save this aprt for later», then rescued in a minimal form: hose, shoes and one shirt for all 19 bodies.
- **The content factory.** Its API credit ran out on 15 November around 05:57. The game orchestrator took over its work.

## Features

What is built, as of the 0.13 and 0.14 builds. Status words follow the docs: only what was seen running counts.

```gallery contain
assets/img/day3/11-14-072031-imported-after-cell-bench.jpg | The cell. Bench, plank bed, table and candle lanterns. | Dark prison cell with a bench, a bed and lanterns | 1600 x 900
assets/img/day3/11-14-183700-shot.jpg | The talk panel with Mira, topics on the left. | Talk panel beside two figures in a grey room | 1600 x 931
assets/img/day3/11-14-073138-imported-pie-overview.jpg | The castle built from a kit: walls, towers, timber houses. | Aerial view of a walled castle | 1600 x 900
assets/img/day-2-build093-settings.webp | The settings screen detects the RTX 5090 and picks DLSS Quality. | Dark graphics settings screen with a hardware summary | 1600 x 900
```

- **Story flow.** You arrive as a prisoner and are escorted at a slow walk. If you run, the scene restarts as *Take two*. Then come the cell, a riddle, the release, your belongings and free roam.
- **Talking.** A topic-based talk panel with authored lines. With ACE on, the cellmates Anselm and Mira answer free typed lines through a local 2B language model, speak back with ACE TTS and listen by push-to-talk (ACE ASR). Everything runs on the player's GPU. There is a daily cap of 12 free replies per character.
- **Character creator.** Bodies, hair (HQ strand hair for the main characters, cards for the rest), masks fitted per head, scars, eyes with glow and five pupil shapes, and a clothing minimum.
- **Body page.** The Corpus: body systems with Latin names, levelled by use.
- **Time, weather and temperature.** A 72-minute day with moon phases, weighted weather, and a warmth system. The time HUD is a sundial.
- **The castle and the island.** A kit-built castle on the story island with grass, rocks and routes. People follow daily routines.
- **Sound.** Four albums of own and generated music, layered score cues, a mix for indoors and outdoors.
- **Credits.** Long and funny, as a module that can be switched off. They show the numbers, a section on everything made with AI, the branch history as a scrolling chart, the soundtrack, and a QR code to this devlog.
- **Debug and photo mode.** A pause and debug menu, an F2 panel with looks, and a photo mode key.
- **Graphics.** DLSS Super Resolution and DLAA with a TSR fallback, saves with Quick and six autosaves, settings that persist.

Every system has a switch and a fallback. That was a rule from day 1, and it saved several builds.

## What went right

- **A kept-alive spine.** Input, saves, settings, time and weather were tested from the first day, so later features had somewhere to land.
- **Boards for decisions.** Every generated image, sound and mock went onto a review board with three states: take it, with changes, not now. I decided, the agents did not. By day 3 there was one board for everything.
- **One owner per area.** Two orchestrators, one for the game and one for content, plus separate sessions for characters and music.
- **Showing the work.** This devlog and the credits tell the same story, with numbers.

## What went wrong

- **The build method.** Every package had its own branch and its own worktree, and every worktree compiled for itself in one machine-wide queue. A round took three to five hours. «Oh mein Gott, das hättest du von Anfang an catchen müssen.» (Oh my God, you should have caught that from the start.) Details are in day 3.
- **The GPU.** Two driver hangs on day 3, the second one ending in a hard reboot. Several Unreal processes at once on one card was too much.
- **Too many boards.** Answers lived in chats, build notes and boards, and I gave some twice. It took until day 2 evening to funnel them into one.
- **Output faster than review.** Automated checks grew faster than I could look and listen. Green tests did not mean a good picture.

## What I would do differently

- Compile in one place from the first hour.
- One GPU lane, and test in the editor before packaging.
- Fewer and bigger work packages, each with one owner.
- Decisions in one place from day 1.
- Put my own words into the rule files, not only into chats.

```todo
[ ] Jennifer's dictated verdict: what the game became, what it was meant to be
[ ] Final build: version, size, what is in it, what is switched off
[ ] Gameplay video still and 3-5 screenshots from the final build
[ ] Partner tools used (Unreal, NVIDIA DLSS/ACE, Hyper3D Rodin, fal, PBRgen), with what worked
```

## Learning: more agents, not proportionally faster

Research after the build-time audit (official Anthropic docs, 15 November): on a subscription, all sessions, subagents, cloud sessions and chat draw on one shared quota. That is a 5-hour window plus a weekly limit. Ten parallel agents use it about ten times as fast. No per-request slowdown is documented. Claude Code runs at most 20 subagents per session by default. Through the API the limits are per organisation and generous. The brake there is money and the monthly spend cap.

More quota buys speed only for work that can run in parallel. Ours had serial parts: one Unreal build queue, one GPU, merging, and my own time to look and decide. Anthropic itself recommends 3 to 5 teammates and says more agents do not speed work up proportionally. Next jam: a few agents with large bundles, one compile location, and quota spent where work really runs side by side.

## What the agents did

Roles: a game orchestrator (code, fixes, UI, story, integration), a content factory on the second PC (Blender, props, the castle kit, maps), a figures session (characters and clothing), a music session, and a watcher that wrote the devlog. The orchestrator did most of the work itself. Subagents took only long, independent jobs. They were good at volume: sound batches, meshes, image rounds, searches. They were weaker at judging their own results and at remembering what I had said an hour earlier.

## All branches of the jam

<!-- branches-embed -->
```embed
builds.html | All branches of the jam: fork, merges and the build each one shipped in, by area. Hover or tap a row. | 2700
```
