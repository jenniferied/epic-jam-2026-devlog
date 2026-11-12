---
title: validate.sh: the night before, and a Director's Cut
slug: prep-2-validate
order: 2
date: 2026-11-11
day: prep 2
phase: prep
status: live
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

I asked for the learnings to become a skill, because I didn't want to lose what we'd figured out. I said something like «hey, I don't want to lose what we've learned». The agent took that literally and also *tested* the skill. It opened an empty project and rebuilt everything from the instructions alone: packaging, input, DLSS, audio, a Blender mesh. It took 25 minutes and five packaged builds, and every smoke test passed.

```log
19:45 | me | "Main thing is it becomes a skill, and this is a separate tech test"
19:58 | me | "Stop testing on my Mac right now, or at least stop it popping up"
20:00 | setup | Kickoff stream starts
20:14 | milestone | Skill rebuild test done: empty folder to passing smoke tests in about 25 minutes
```

>> I was first shocked at the tokens still probably wasted, and also annoyed that that made it even worse. I really don't want to break the rules of doing too much first.

>> I don't know where the line blurs between already building something and just testing technical things, because AI just does it so quickly.

None of that test code is in the jam entry. At 22:15 I wrote a declaration of everything prepared in advance. At 22:18 every test project, build and test asset was deleted, and the last state is tagged `prep-final-2026-11-11` for anyone who wants to check.

## The kickoff stream

I watched the stream. A lot of it went over the jam page I had already read, or rather the page my AI had read. Then it explained how to install the MCP, which my AI had installed for me months ago.

>> It was valuable to hear it actually being read out, whilst other people in some stream were complaining that they already knew this.

Fair enough, but I rely on AI to read long texts for me. Hearing the whole thing read front to back was actually good. I also noticed the document got more complex as more partners added to it.

## Director's Cut

The theme is **Director's Cut**. I work at a film university now, and I'm not a film person, never was. It was always games, always role-playing games. But working on visual production research I picked up more about film than I expected. I was already into photography and drawing, so it stuck. That's why I like this theme.

It also reminded me of my first jam. Back in Dundee, as a student at Duncan of Jordanstone, there were over twenty VR headsets at a jam. I joined a group and we iterated, and I got a free headset for no reason whatsoever. I was too overwhelmed to really start making a game. But I took part.

>> Even just getting this free headset changed the course of my life.

I became the first person in my interior design class to do a VR presentation. My final project was a game level wearing an interior design project's clothes.
