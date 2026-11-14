---
title: post-mortem.log
slug: post-mortem
order: 8
date: 2026-11-16
day: post
phase: post
status: draft
summary: What four days of solo jamming with a crowd of AI agents taught me.
---

```recap
**Before this entry:** to be filled in after the submission. Four jam days, builds 0.0 to 0.13+, one island, one castle, one cell.
```

```todo
[ ] Jennifer's dictated verdict: what the game became, what it was meant to be
[ ] Final build: version, size, what is in it, what is switched off
[ ] Gameplay video still and 3-5 screenshots from the final build
[ ] Numbers: builds, branches, agents, images, music cues, commits, hours of compile time
[ ] Partner tools used (Unreal, NVIDIA DLSS/ACE, Hyper3D Rodin, fal, PBRgen, ...), with what worked
```

## What went right

_To be written: the moments that worked (agents in parallel, boards for decisions, the devlog itself)._

## What went wrong

_To be written: the build method (compiling per branch, ~14 h of compile time measured), GPU driver hangs from parallel runs, too many boards, licensed music that had to go. Jennifer's own words in «…»._

## What I would do differently

_To be written: one compile location from the start, one GPU lane, fewer and bigger work packages, decisions in one place._

## Learning: more agents, not proportionally faster

Research after the build-time audit (official Anthropic docs, 15.11.): on a subscription all sessions, subagents, cloud sessions and chat draw on one shared quota (5-hour window plus a weekly limit), so ten parallel agents use it about ten times as fast; no per-request slowdown is documented. Claude Code runs at most 20 subagents per session by default. Through the API the limits are per organisation and generous (e.g. Opus 5.5 on the Build tier: 10,000 requests and 5M input tokens per minute); the real brake there is money and the monthly spend cap. Cloud sessions run on their own VMs but count against the same quota.

So spending the quota faster does buy speed, but only for the part of the work that can run in parallel. Ours had serial parts: one Unreal build queue, one GPU (after two driver hangs: one Unreal process at a time), merging branches, and Jennifer's own time to look and decide. Anthropic itself recommends 3 to 5 teammates and notes that beyond that more agents do not speed work up proportionally. The lesson for the next jam: a few agents with large bundles of work, one compile location, and more quota spent where the work truly runs side by side.

## What the agents did

_To be written: roles (orchestrator, figures, music, world, watcher), how many sessions and subagents, what they were good and bad at._

## All branches of the jam

<!-- branches-embed -->
```embed
builds.html | All branches of the jam: fork, merges and the build each one shipped in, by area. Hover or tap a row. | 2700
```
