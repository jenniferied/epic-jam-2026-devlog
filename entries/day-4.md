---
title: day-4.log
slug: day-4
order: 7
date: 2026-11-15
day: day 4
phase: jam
status: live
summary: One compile line, clothes on everyone, Shipping builds, a live playtest with 120 notes, and the submission.
---

```recap
**Before this entry:** Build 0.12.0 was packaged, the castle stood on the island, and the night had just shown that compiling every branch on its own had cost us around 46 machine-hours. From now on there was one integration line and one place to compile.
```

Day 4 is the last day before the deadline (Monday 02:59). It runs from the night after the build-method lesson to the submission.

## 00:30–11:40 · The night shift: one line, one map, clothes on everyone

After the build-time lesson the night went on in a new shape. Game code is merged continuously onto one integration branch and compiled only there, incrementally. At 01:40 I pushed the idea one step further:

«WARUM TESTEN WIR NICHT IM EDITOR EINFACH, WARUM IMMER BUILD … 20 MINUTEN SIND ZU VIEL … MAN KANN DOCH EXTREMST VIEL ERSTMAL IM EDITOR TESTEN» (Why don't we just test in the editor, why always a build … 20 minutes is too much … you can test an awful lot in the editor first.)

So the integrated state is now played uncooked from the editor through a desktop shortcut, and packages are made only on my word. A few hours later the GPU rules from the driver hangs went too: «Nur wenn ein krasser Prozess startet, checkt er die GPU-Werte. Sonst einfach machen.» (Only when a heavy process starts, check the GPU values. Otherwise just do it.)

**Two orchestrators instead of a crowd.** Work is organised around owners: a game orchestrator for code, fixes, UI, story and integration, and a content factory on the second PC for Blender, props, the castle kit and maps. Every card on the one board carries an owner badge and goes to that role's inbox. Board sends are worked "rapid fire", so they are done by the time I finish the board. The rule that matters most to me: the orchestrator does the work itself and hands off only what is truly independent, because every hand-off loses my words.

**3D work gets a quality loop.** «du musst halt auch beurteilen können, ob die gut sind und dann so eine Schleife machen … Du brauchst mehr Polygone, du musst mehr Aktionen ausführen … Bevels, Details, richtige Thicknesses» (You have to be able to judge whether they are good and then loop … You need more polygons, more operations … bevels, details, real thicknesses.) Since then every mesh goes through references, review renders, a scored checklist and at least two improvement rounds before I see it. And after a shirt was modelled by the wrong model: «Warum macht gerade Sonnet ein T-Shirt? Das geht gar nicht. Fable muss ein Shirt modellieren.» (Why is Sonnet making a T-shirt right now? That won't do. Fable has to model a shirt.)

**Clothes on everyone.** The basic shirt went through three simulated rounds (looser at the seat, band and gathered collars, ties, a belt variant) until «die Shirts sind gut» (the shirts are good). Shirt v3b now runs in Unreal as a two-size parametric outfit on all 19 bodies, with hose, loafers, helmets and hats. I fitted the hood over the closed muzzle cage myself in a live Blender session. The cuffs and rope for the escort were split left and right so I could fit them in the editor: «omg amazing model».

**One map.** The kit castle now stands on the story island L_Island as an always-loaded sublevel, with grass outside the bailey and none inside. Grass got a third round (bigger, bushier, a quarter less, no cards near the camera). The island got Megascans rock sets.

**The rest of the night**, in short: eyes with glow and five pupil shapes as their own choice, Mira with a very pale skin tone, a time HUD with a transparent sundial face, a tutorial checklist whose rows disappear once done, the start music timed so the drop lands about ten seconds after the logo, credits with a section on everything made with AI (generated versus used, counted by a script) and the whole branch history as a scrolling chart, and a gameplay video cut taking shape. The editor crashed many times. Most crash reports were closed and work went on.

```gallery
assets/img/day3/11-15-043654-shot.jpg | 04:36 · Game window during the clothing follow-up and the NPC line-up | Game window of DarkestNight on the integration build | 1600 x 900
assets/img/day3/11-15-050653-shot.jpg | 05:06 · Game window after the start music was retimed at the logo | Game window of DarkestNight | 1600 x 903
assets/img/day3/11-15-083706-shot.jpg | 08:37 · Game window with the new time HUD and tutorial checklist | Game window of DarkestNight | 1600 x 931
assets/img/day3/11-15-110655-shot.jpg | 11:06 · Game window after the accepted outfits round | Game window of DarkestNight | 1600 x 931
assets/img/day3/11-15-113702-shot.jpg | 11:37 · Game window after grass round 3 and the Megascans rocks on the island | Game window of DarkestNight | 1600 x 931
```

## 11:40–23:00 · Shipping builds, a live playtest, and the submission

```gallery
assets/img/day3/sleep_screen.jpg | The sleep screen from the Shipping playtest: choose the hours, the dial shows when you wake. | Sleep picker with "Dormire" and wake time | 1600 x 900
assets/img/day3/keyart_lightning.jpg | Key art built from the real opening lightning, layered for the jam page. | Logo with armillary sphere over a lightning sky | 1600 x 900
assets/img/day3/keyart_village.jpg | The same layers over the generated concept art. | Logo with armillary sphere over a village and castle | 1600 x 900
```

The afternoon turned the integration line into real packages. The night package b0131 passed its story, credits and walk-out tests on both PCs: 78 fps average on the RTX 5090 and 56 on the RTX 3090 at 1080p. From 17:00 every package is a Shipping build, the version the jury will see. 0.14.0 and then 0.14.1 became the build I play.

Then I played, and wrote notes while playing. More than 120 of them, from the start menu to the credits. The agents fixed them as they came in, on small branches merged into the next build, while the rule said no Unreal run while I play. Two of my notes, as typed:

«Also die Tesselierung ist sehr heftig. Also ich würde gerne auf Mittel auch ein bisschen was rausholen … bei niedriger Safe» (The tessellation is very heavy. I'd like to get something out of Medium too … safe on Low.) Tessellation is now its own graphics setting, on from Medium.

«I SEE DEBUG ON; HAVE MORE CONTROL OVER THIS MAYBE TURN OFF BY DEFAULT unless u wanted it» Debug is now off by default in the package.

The opening lightning turned out to be random: angle and bolt seed changed every run, so it never struck behind the castle. It is fixed now and strikes the same way every time. That made a real key-art frame possible.

The evening went into the submission. The itch page got a title splash, a story, an honest "at a glance" (this is scaffolding for a deep RPG, and gameplay is the thinnest part), features with screenshots, a UI section, a technical "under the hood" checked against the code, credits and an AI disclosure. The first upload was refused because the itch account email was not verified yet. The second run pushed 11.7 GB of b0141 with butler, so the final build can follow as a small patch.


## 23:00–00:55 · Chaos at the end

```gallery
assets/img/day4/her-grass-streaks-gate.jpg | 00:17 · Package 0.14.3 at the castle gate: the grass smears upward into giant streaks. My screenshot. | Grass stretched into tall orange streaks along the drawbridge | 1600 x 901
assets/img/day4/her-round-hall-overexposed.jpg | 18:49 · The round hall, washed out. My screenshot. | Overexposed round hall with the prisoner | 1600 x 908
assets/img/day4/her-round-hall-floating-props.jpg | 18:50 · Props that do not sit where they belong. My screenshot. | Chair and table at odd angles in the hall | 1182 x 938
assets/img/day4/her-round-hall-pixel-pillar.jpg | 18:50 · A pillar with a pixelated texture. My screenshot. | Pillar with blocky texture | 1190 x 920
assets/img/day4/her-round-hall-hovering-rocks.jpg | 18:50 · Rocks hanging in the air above the prisoner. My screenshot. | Rocks floating above the player | 1212 x 957
assets/img/day4/her-round-hall-white-stairs.jpg | 18:50 · Untextured white stairs in front of a door. My screenshot. | Plain white stairs | 788 x 817
```

The last hours did not go the way they should. The fixes from the playtest kept coming, new packages followed each other, and every new build also brought something new that broke. In 0.14.3 the water at the shore was gone, and the grass at the castle gate smeared upward into huge streaks. 0.14.3 had already been pushed to itch while I was still playing it, to keep things moving. The next package, 0.14.4, was cancelled because of the grass. At the time of writing it is not clear whether there will be a good playable version at the end, or whether we have to ship an older, weaker one.

Then the line moved once more. At 00:55 the grass spikes had a cause: the landscape displacement used the wrong units. It was fixed, and landscape tessellation was switched off. At 01:25 Shipping 0.14.4 was built and at 01:28 pushed to itch: clean ground without spikes, the voice-controlled start menu working again, the gamepad's A button confirming in every menu, the title music playing out, and the credits naming every NVIDIA technology in full (NVIDIA DLSS 4.5, NVIDIA Reflex, NVIDIA ACE ASR, NVIDIA ACE TTS). No human had played it yet when it went up, and the grass blades may still be missing.

This is my last entry for day 4. In my own words:

«das große Chaos … dass nicht klar ist, ob es überhaupt etwas Spielbares gibt zum Ende oder dann eine sehr schlechte Version verwendet werden [muss] und dass ich einfach alles bereue. Dass ich einfach Fehler gemacht habe in der Orchestrierung, meine Wörter nicht klar genug gewählt habe und immer zwischen vorsichtig und schrittweise und vorwärts arbeiten oszilliert habe und immer wieder frustriert war. Aber ich hoffe, dass es gut wird.» (The big chaos … that it is not clear whether there is anything playable at the end at all, or whether a very bad version has to be used, and that I simply regret everything. That I made mistakes in the orchestration, did not choose my words clearly enough, kept oscillating between careful, step-by-step work and pushing forward, and was frustrated again and again. But I hope it turns out well.)

«Ich habe es natürlich hochladen lassen, während ich es gespielt habe, weil ich gucken wollte, dass wir schnell vorankommen.» (Of course I had it uploaded while I was playing it, because I wanted to make sure we moved fast.)

«Ich hoffe, wir sehen uns dann wirklich im Postmortem, oder eben nicht. Das war einfach eine große Dynamic Experience.» (I hope we really see each other in the post-mortem, or not. It was simply one big dynamic experience.)

## More captures

<!-- devlog-picks:start -->

```gallery
assets/img/day4/11-15-003705-shot.jpg | 15.11. 00:37: Game window during worldlevel r5 (meadow weight from slope, Nanite rock masters) on the way to 0.13.0. | Game window during worldlevel r5 (meadow weight from slope, Nanite rock masters) on the way to… | 1600 x 900
assets/img/day4/11-15-010655-shot.jpg | 15.11. 01:06: Game window during the key-place screenshot run (17 fixed camera places) on int-0.13.0 with the start music at the logo. | Game window during the key-place screenshot run (17 fixed camera places) on int-0.13.0 with the… | 1600 x 900
assets/img/day4/11-15-010657-clip.jpg | 15.11. 01:06 (still from a clip): 15 s of int-0.13.0 during the key-place screenshot run (title theme at the logo, larger cell, world rocks). | 15 s of int-0.13.0 during the key-place screenshot run (title theme at the logo, larger cell,… | 1600 x 900
assets/img/day4/11-15-013653-shot.jpg | 15.11. 01:36: Game window while fix6 lands: story score cues behind DN.Story.ScoreCues and a daily cap on ACE free talk (12 replies per character per day, then a tired line). | Game window while fix6 lands: story score cues behind DN.Story.ScoreCues and a daily cap on ACE… | 1600 x 900
assets/img/day4/11-15-043656-clip.jpg | 15.11. 04:36 (still from a clip): 15 s of int-0.13.0 with the clothing follow-up and the NPC line-up. | 15 s of int-0.13.0 with the clothing follow-up and the NPC line-up. | 1600 x 900
assets/img/day4/11-15-080319-milestone.jpg | 15.11. 08:03: Shirt v3 round 3 is in Unreal as a two-size parametric outfit on all 19 bodies (branch b1-shirt3); the whole cast seen in the line-up editor with hose, shoes,… | Shirt v3 round 3 is in Unreal as a two-size parametric outfit on all 19 bodies (branch b1-shirt3);… | 1600 x 900
assets/img/day4/11-15-083708-clip.jpg | 15.11. 08:37 (still from a clip): 15 s of the game with the time HUD and tutorial checklist changes. | 15 s of the game with the time HUD and tutorial checklist changes. | 1600 x 900
assets/img/day4/11-15-090737-milestone.jpg | 15.11. 09:07: Credits: Director's Cut section (knife slices the title), branch history and three-accounts middle cutscene run in the editor build; 148 winalt meshes… | Credits: Director's Cut section (knife slices the title), branch history and three-accounts middle… | 1600 x 900
assets/img/day4/11-15-110657-clip.jpg | 15.11. 11:06 (still from a clip): 15 s of int-0.13.0 with the accepted outfits and loading changes. | 15 s of int-0.13.0 with the accepted outfits and loading changes. | 1600 x 900
assets/img/day4/11-15-130653-shot.jpg | 15.11. 13:06: Game window on int-0.13.0 after cell round 5/6 (bevelled floor plates, gallery arcade), photo mode key hint and the guard hall dressed with fewer lights. | Game window on int-0.13.0 after cell round 5/6 (bevelled floor plates, gallery arcade), photo mode… | 1600 x 900
assets/img/day4/11-15-130655-clip.jpg | 15.11. 13:06 (still from a clip): 15 s of int-0.13.0 with the reworked cell and the grass round 3 merge. | 15 s of int-0.13.0 with the reworked cell and the grass round 3 merge. | 1600 x 900
assets/img/day4/11-15-140657-clip.jpg | 15.11. 14:06 (still from a clip): 15 s of int-0.13.0 with the temperature layer; package tests fixed after a self-test on the 0.13.0 package. | 15 s of int-0.13.0 with the temperature layer; package tests fixed after a self-test on the 0.13.0… | 1600 x 900
assets/img/day4/11-15-143653-clip.jpg | 15.11. 14:36 (still from a clip): 15 s of the packaged 0.13.0 test run before the night package. | 15 s of the packaged 0.13.0 test run before the night package. | 1600 x 900
assets/img/day4/11-15-165111-commit.jpg | 15.11. 16:51: Sed didn't match; editing directly. | Sed didn't match; editing directly. | 1600 x 900
assets/img/day4/11-15-180654-clip.jpg | 15.11. 18:06 (still from a clip): 15 s of Jennifer's playtest of Shipping 0.14.0. | 15 s of Jennifer's playtest of Shipping 0.14.0. | 1600 x 900
assets/img/day4/11-15-190653-clip.jpg | 15.11. 19:06 (still from a clip): 15 s of Jennifer's Shipping 0.14.0 playtest, now at note 81 (tutorial cards, introductions in the first talk); fixes written live on b1-ui20/21. | 15 s of Jennifer's Shipping 0.14.0 playtest, now at note 81 (tutorial cards, introductions in the… | 1600 x 900
assets/img/day4/11-15-200654-clip.jpg | 15.11. 20:06 (still from a clip): 15 s of Jennifer's playtest at note 107. | 15 s of Jennifer's playtest at note 107. | 1600 x 900
assets/img/day4/11-15-230654-shot.jpg | 15.11. 23:06: Shipping game window around b0142: integration review clean, post-142 fixes (quick menu, credits timing, door creak, shields, moat) merged. | Shipping game window around b0142: integration review clean, post-142 fixes (quick menu, credits… | 1600 x 900
assets/img/day4/11-15-230655-clip.jpg | 15.11. 23:06 (still from a clip): 15 s of the Shipping game around b0142, the candidate for the jam submission. | 15 s of the Shipping game around b0142, the candidate for the jam submission. | 1600 x 900
assets/img/day4/11-15-233658-shot.jpg | 15.11. 23:36: Newest Shipping build with the window titled NOX OBSCVRISSIMA: creator focus guard and escort formation fixes (MAC-20, MAC-22). | Newest Shipping build with the window titled NOX OBSCVRISSIMA: creator focus guard and escort… | 1600 x 900
assets/img/day4/11-16-003147-shot.jpg | 16.11. 00:31: Jennifer's playtest of the integrated editor state (-game) around 0.14.4: title music, water fix, creator8/ui37 merged | Jennifer's playtest of the integrated editor state (-game) around 0.14.4: title music, water fix,… | 1600 x 900
assets/img/day4/11-16-003150-clip.jpg | 16.11. 00:31 (still from a clip): Playtest clip of the integrated state (0.14.4 line) in -game | Playtest clip of the integrated state (0.14.4 line) in -game | 1600 x 900
assets/img/day4/11-16-013146-shot.jpg | 16.11. 01:31: Integrated editor state in -game after 0.14.4 (ground displacement fixed, landscape tessellation off) | Integrated editor state in -game after 0.14.4 (ground displacement fixed, landscape tessellation… | 1600 x 900
assets/img/day4/11-16-013149-clip.jpg | 16.11. 01:31 (still from a clip): Play-in of the 0.14.4 line: ground without spikes | Play-in of the 0.14.4 line: ground without spikes | 1600 x 900
```

```timeline
00:33 | Jennifer, 15.11.2026, on the board and on working with many agents: «dieses Board ist komplett durcheinander … du musst es komplett neu bauen, also das, was noch offen ist … Das…
00:36 | Jennifer on the build-time audit: «Ah, verdammt, okay. Dann ist das jetzt so, das ist ein Big Learning. Es ist jetzt einfach so, es ist so passiert.» She asked to research…
01:06 | Jennifer's unified board 'Dein Board': one review page, comments as messages, versions tracked automatically.
04:31 | Modelling is done by Fable, never by Sonnet (the shirt); board sends are worked rapid fire in the session itself so they are done when she has finished the board.
04:32 | Rule: Blender and 3D work (also through the Blender MCP) is always done by Fable; Opus only as a fallback when Fable is not available or its credit is used up; never Sonnet.
04:53 | Bound hands in the escort (F5-01): the pose was bad; hands side by side and down, together in front of the body, looser and only suggested; cuffs not tight, perhaps roughly…
10:15 | Player outfits (BX-07): peasant grey done; royal darker purple, matt, stronger and lower chevron band with border detail, a band across the chest, stitches beside the seams;…
10:43 | BX-08: royal pattern cream and subdued, prisoner start barefoot without hose (trial), peasant red-brown hose; KB-23: muzzle cage closed at the back on the MetaHuman player head,…
10:46 | BX-09: the three player outfits accepted; NPCs should sometimes react to the outfit in their greeting (passed to the game orchestrator).
13:39 | Temperature: Jennifer asked for simple cold/warm opportunities (night wind, beach breeze, fog, cellar cold; sun, fires, sprint warm; drying when wet; solar/lunar use gives an…
14:06 | Three Unreal crash reporters at 14:05-14:06 (cause not checked).
17:00 | Builds: every package is Shipping from now on (jury version, no engine messages, our own debug menu); debug mode unlocks for players after the end credits; debug spheres only…
17:06 | Shipping package b0140 (0.14.0) is the new play_latest; new rule 17: shipping builds only, Jennifer tests, no Unreal runs while she plays. Debug is now always reachable from the…
19:01 | UI context rules: one central system decides per mode (loading, cutscene, story window, credits, creator, menu, photo, talk, death, gameplay) which UI layers may show and whether…
```

<!-- devlog-picks:end -->

<!-- branches-embed -->
```embed
builds.html?day=4 | Branches of day 4: every branch active that day, by area, with the build it shipped in. Hover or tap a row. | 1000
```
