---
title: validate.sh: the night before, and a Director's Cut
slug: prep-2-validate
order: 2
date: 2026-11-11
day: prep 2
phase: prep
status: live
cover: assets/img/cover-prep-2.jpg
cover_alt: Pixel art: a desk at night with a PC tower and a laptop joined by a cable, a film clapperboard, and a small green dragon asleep on the tower
summary: One long day of testing everything twice, an agent that went one step too far, deleting it all, the kickoff stream and the theme.
---
```recap
**Before this entry:** the toolchain from prep 1, plus two test projects (UE 5.8 and 5.9) that existed only to try things.
**What this entry covers:** validating that toolchain on both machines, then deleting every test project at 22:18 so the jam starts from an empty folder. What survives are skills (instructions and generic scripts), agent config and this website, all declared as pre-made. Quotes in the agent logs are translated from German.
```

## Validate everything, twice

The plan for the last prep day was simple. Make sure the Mac and the PC can hand work back and forth without me typing commands, pick an engine version, and find out whether the NVIDIA tech I'm tempted by even runs. I have a 5090, so DLSS was hard to ignore.

```log
00:18 | me | UE 5.9 is the target. Blender 5.3 only. One repo, synced both ways. Claude and Codex must be interchangeable
00:48 | milestone | Two-way git sync works: a Windows commit lands on the Mac, a Mac commit lands on Windows
01:58 | milestone | Epic's Lore version control: round trip Windows → Mac → Windows
02:03 | me | "From now on I don't want to run any commands by hand." Agents reach the Mac over SSH themselves
02:25 | milestone | Lore with a real Unreal asset on 5.9: changed on the Mac, synced on Windows
03:15 | milestone | UE 5.9 C++ test project compiles, packages and passes its smoke test
03:21 | research | The official DLSS plugin only covers UE 5.5–5.8
04:06 | milestone | DLSS runs on 5.9 anyway: Super Resolution and Frame Generation, after two small patches
04:19 | setback | The Mac build crashes at start-up in 3 of 10 launches
04:29 | me | Prep code never goes into the entry. What we learn becomes skills, and the game is rebuilt from scratch
04:58 | milestone | NVIDIA ACE speech recognition: 3/3 test phrases recognised in a packaged build
05:00 | milestone | Graphics menu: DLSS toggle, sharpness 0.2, and "DLSS not available" with a TSR fallback on the Mac
05:10 | setback | Claude usage limit. Sleep
17:49 | milestone | Devlog capture hooks live. DLSS and ACE written up as skills
```

```chart
assets/charts/prep-night.vl.json | Every logged event of the night of 11 November, 00:18–05:10, by who did it. Decisions are mine, the rest is agents. Source: git history and agent transcripts, reconstructed in `Prep/log/prep-timeline.md`.
```

Audio got the same treatment. Stable Audio runs locally through ComfyUI, the sound gets processed, imported into Unreal headless and plays in a packaged build. Nobody had actually *listened* to the result yet. That's an honest gap, and it's still open.

## Where does testing end?

Here's the part I'm least sure about.

I asked for the learnings to become a skill, because I didn't want to lose what we'd figured out. The agent took that literally and also *tested* the skill. It opened an empty project and rebuilt everything from the instructions alone: packaging, input, DLSS, audio, a Blender mesh. It took 25 minutes and five packaged builds, and every smoke test passed.

```log
19:45 | me | "Main thing is it becomes a skill, and this is a separate tech test"
19:58 | me | "Stop testing on my Mac right now, or at least stop it popping up"
20:00 | setup | Kickoff stream starts
20:14 | milestone | Skill rebuild test done: empty folder to passing smoke tests in about 25 minutes
```

>> I don't know where the line blurs between already building something and just testing technical things, because AI just does it so quickly. I then ask it to do a skill, and then it automatically, since I told it, like, hey, I don't want to lose what we've learned, that I already started testing if it would rebuild everything based on the skill, which it did. And then I was first shocked at the tokens still probably wasted, and also annoyed that that made it even worse. I really don't want to break the rules of doing too much first.

None of that test code is in the jam entry. At 22:15 I wrote a declaration of everything prepared in advance. At 22:18 every test project, build and test asset was deleted, and the last state is tagged `prep-final-2026-11-11` for anyone who wants to check.

## The kickoff stream

```gallery
assets/img/kickoff-night.jpg | Kickoff night, 20:00. My own illustration, made with an image model (Gemini 2.5 Flash Image via fal). | Pixel art of a woman at a desk watching a stream with a film clapperboard on screen, a small dragon on the monitor and a cat asleep on the desk | 1344 x 768
```

I watched the stream. A lot of it went over the jam page I had already read, or rather the page my AI had read. Then it explained how to install the MCP, which «I did let my AI install, like months before already».

>> It was valuable to hear it actually being read out, whilst other people in some stream were complaining that they already knew this, and I was like, yeah, but I did somewhat thoroughly read it, but having it read to me front to back was good, actually, since I do rely on AI to read long texts and understand things.

I also noticed the document got more complex as more partners added to it.

## Director's Cut

The theme is **Director's Cut**. I work at a film university now, and I'm not a film person, never was. It was always games, always role-playing games. But working on visual production research I picked up more about film than I expected. I was already into photography and drawing, so it stuck.

>> I did learn things again, and that's why I like the theme Director's Cut, and what speaks to me, that I have always wanted to make a game.

It also reminded me of my first jam. Back in Dundee, as a student at Duncan of Jordanstone, there were over twenty VR headsets at a jam. I joined a group and we started iterating.

```gallery
assets/img/memory-dundee-jam.jpg | Dundee, my first jam. My own illustration, made with an image model (Gemini 2.5 Flash Image via fal). | Pixel art of a young woman holding up a VR headset in joy, tables of boxed headsets and students with laptops around her | 1344 x 768
```

>> I received a free headset for no reason whatsoever, but I was thankful for that. That's what made me use VR in my final presentations, even though I didn't even start to begin to make a game. I was too overwhelmed. But I did participate. Even just getting this free headset changed the course of my life, because I was the first one to do a VR presentation in my interior design-focused class. I was making a game level instead of an interior design project.
