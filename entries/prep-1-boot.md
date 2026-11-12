---
title: boot.log: a kidnapped workstation
slug: prep-1-boot
order: 1
date: 2026-10-27
day: prep 1
phase: prep
status: live
cover: assets/img/cover-prep-1.jpg
cover_alt: Pixel art: a woman with a walking boot carries a glowing PC tower out of an office at night, a small green dragon flying beside her
summary: How a work PC got kidnapped twice before reaching the office, why I'm doing this at all, and the toolchain I set up in the two weeks before the jam.
---
```recap
**Before this entry:** nothing. It starts on 27 October 2026 at 15:53, fifteen days before kickoff.
**What this entry covers:** hardware, accounts, agents, MCP, a repo and two throwaway test projects. No game. The test projects were deleted before the jam (see prep 2).
```

## The kidnapping

The new workstation was meant for the office. It still hasn't arrived there.

On delivery day I waited for the freight company in the office, from the morning until late in the afternoon, hoping it would show up. It didn't, so I drove to the depot and picked it up myself. By then I was dead, so the PC came home with me instead of staying at work.

>> I was waiting for the spedition for hours in the office before driving to the spedition, after waiting from morning to late afternoon hoping for it to arrive. I then took it home as I was dead.

Then it got kidnapped a second time. I had just broken my foot: «after six weeks of sickness, I was at work for two days, no more physio now, back to the gym». I needed an X-ray back in my home town anyway, so the workstation came along to my parents' place. A fridge that magically refills itself, my cat, and a 5090 under the desk is a pretty good jam environment. After that it finally moves to where it belongs, the office.

```gallery
placeholder | The kidnapped workstation. Photo follows. | Photo of the workstation | 1600 x 1200
```

```specs
# workstation · "the kidnapped one"
GPU: NVIDIA GeForce RTX 5090, 32 GB
CPU: AMD Ryzen 9 9950X3D2, 16 cores / 32 threads
RAM: 128 GB DDR5
Board: ASRock X870 Taichi Creator
Storage: Samsung 990 PRO 2 TB (dev) + 860 QVO 1 TB (everything else)
OS: Windows 11 Pro
# companion · the laptop
Machine: MacBook Pro, Apple M1 Max
RAM: 64 GB
Role: native Mac builds, a second pair of hands over SSH
# software
Engine: Unreal Engine 5.9 (5.8 kept for comparison)
3D: Blender 5.3 with the official Blender Lab MCP
Agents: Claude Code, OpenAI Codex (desktop app)
Glue: Tailscale, SSH, git + LFS, herdr
```

## Why I'm here

>> I do like my job, but doing research, I do feel that I've always wanted to make games. Like remembering tearing up on 2011-11-11, and then, like, stopping myself and be like, okay, like, but that's cringe. Like, we all love making games.

Fifteen years later, to the day, the kickoff of this jam was on 11.11.2026. I didn't plan that.

I always liked drawing and computers, like a lot of us. I wanted to do concept art. I had some talent, but I realised I wasn't consistent enough with drawing to get there. And «I did my first Pokémon website back then by stealing the HTML and CSS and all that stuff». I bet a lot of people in this jam have a story like that.

>> I can imagine that many very, very young people will participate in this, and this might be their origin story. We all have our story.

I'm one of the people who wanted to make concept art, so I know how artists feel about this. I don't think that feeling is wrong.

>> We all know that AI is scary, and there is a sentiment between artists, especially, for example, concept artists or graphic designers. AI represents something scary, but it also represents a possibility.

```timeline
early days | Drawing, PCs, and a Pokémon fan site made of borrowed HTML and CSS
11.11.2011 | A game release. Tears, quickly suppressed
Dundee | Interior design at Duncan of Jordanstone College of Art and Design (University of Dundee). One game jam, one free VR headset
since then | Research at a film university. Visual production, AI, lots of literature reviews
27.10.2026 | "I'm doing the MegaJam."
```

## Setup: two machines, two agents

«I started using AI pretty early on, and I'm doing stuff like literature reviews, 3D generation and all sorts of stuff.» So "setting up" mostly meant connecting things I already had. The **Codex desktop app** runs on the Windows workstation and **Claude Code** on the Mac. They talk to each other over SSH through Tailscale, and both work on the same git checkout.

The rules allow preparing tools, agents, MCP settings, prompts and scripts in advance. Game content has to wait for 12 November, 06:00. So everything here is plumbing.

```log
15:53 | decision | Join the jam. Keep the dev drive clean, wipe the second drive for everything else
16:23 | decision | Private repo `epic-jam-2026`. Delete an old engine source build: 354 GB back
16:28 | milestone | Repo up with the rules, Berlin-time dates and a prep checklist
16:31 | milestone | First test project (UE 5.8 template). Epic's Unreal MCP connected and answering
16:34 | milestone | First four shared skills: audio generation, audio processing, Unreal audio, Unreal docs
16:48 | milestone | First packaged Windows build runs
16:59 | milestone | Unreal MCP with `AllToolsets`: 67 toolsets live in the editor
17:48 | setback | Codex usage limit. Both subagents die on the spot
```

The next morning:

```log
10:18 | research | Official rules read in full and stored. Tools, prompts and scripts may be prepared. Game assets may not
10:20 | milestone | Packaged input test with simulated keyboard and gamepad: 6/6 checks pass
10:22 | setback | The real Xbox controller never reaches Windows. Hardware test stays open
10:25 | setback | Mac probe build needs Metal SM5 instead of SM6
10:28 | research | Local AI audio: ComfyUI as the shared layer, Stable Audio for SFX, ACE-Step for music
10:28 | setback | Usage limit again
```

Then nothing for almost two weeks. Life, a foot, and usage limits. The rest of the prep happened in one long night, in the next entry.

## The cockpit

Before the jam I built myself a place to work in. There's a desktop wallpaper with the jam schedule on it, and a terminal multiplexer with panes for the agents, a countdown, credit balances and Funke. Funke is a small block-graphics dragon. It changes its sky with the time of day, sleeps at night and tells me to keep the scope small. It's the same one sitting in the sidebar of this page.

```gallery
assets/img/wallpaper-timeline.jpg | Jam wallpaper, timeline version. Background made with an image generator, calendar drawn in code. Not game content | Night forest wallpaper with a fox, a small leafy creature and a lantern, with the jam schedule overlaid | 1600 x 900
assets/img/wallpaper-calendar.jpg | Calendar version of the same wallpaper | Night forest wallpaper with a calendar of the jam days | 1600 x 900
placeholder | My desktop on the workstation: herdr panes, agents, Funke. Screenshot follows | Desktop screenshot | 1600 x 900
```
