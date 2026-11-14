"""Pixel-art covers for the soundtrack albums and their new tracks (assets/img/music/).

Pure Pillow, no model and no third-party art: each cover is drawn on a 128 px grid with a
small palette and ordered dithering, then scaled up 4x with nearest neighbour to 512 px
WebP like the first twelve covers. Scenes are built from a few motifs (sky, celestial body,
ground silhouette, accents) and a fixed seed per file, so a rerun gives the same images.

    python scripts/make_music_covers.py          # writes only missing covers
    python scripts/make_music_covers.py --force  # redraw all of them
"""
from __future__ import annotations

import argparse
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "assets" / "img" / "music"
N = 128
BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]

PAL = {
    "night":  ["#05060d", "#0d1230", "#1f2a5c", "#c9a24a", "#f4e3a1", "#0a0b14"],
    "ash":    ["#0a0a0c", "#1c1a1f", "#3a3540", "#b08a4a", "#e8d6a8", "#050506"],
    "dawn":   ["#140d1c", "#3b2140", "#a2554a", "#f0b25a", "#fff1c4", "#0c0810"],
    "day":    ["#1b2a33", "#3f6a73", "#9cc0b3", "#f2d27a", "#fffbe6", "#13191d"],
    "blood":  ["#070304", "#200a0d", "#5a1219", "#d2392e", "#ffb08a", "#030102"],
    "sacred": ["#06070f", "#1a1d3a", "#4d5590", "#d9c27e", "#fbf6e2", "#04040a"],
    "teal":   ["#020a0c", "#0a2a2e", "#1d5a5c", "#9fd8c8", "#e8fff6", "#010506"],
    "violet": ["#07040f", "#1d1038", "#4b2a86", "#d68cff", "#ffe0ff", "#030208"],
    "cave":   ["#040605", "#101a16", "#27403a", "#8fbf9f", "#e0f0d0", "#020302"],
    "ember":  ["#0b0603", "#2a1408", "#6b3410", "#ff9a3c", "#ffe2a8", "#050301"],
}

# file -> (palette, seed, celestial, ground, accents)
COVERS = {
    # albums
    "album-title-variations":   ("night",  1101, "eclipse", "castle",  ["frame", "orbits", "rays"]),
    "album-ingame-score":       ("dawn",   1102, "sunmoon", "hills",   ["frame", "tower", "lantern"]),
    "album-sacred-flavours":    ("sacred", 1103, "halo",    "shrine",  ["frame", "veils", "candles"]),
    "album-dnb-symphonic":      ("violet", 1104, "rings",   "none",    ["frame", "eq", "strikes"]),
    # Title Theme Variations
    "cover-silver-overture":    ("teal",   2101, "comet",   "sea",     ["sparkle"]),
    "cover-halftime-requiem":   ("night",  2102, "eclipse", "none",    ["eq", "orbits"]),
    "cover-longest-night":      ("ash",    2103, "moon",    "castle",  ["tower", "lantern"]),
    "cover-vigil":              ("sacred", 2104, "moon",    "hills",   ["candles"]),
    # In-Game Score
    "cover-morning-ramparts":   ("day",    2201, "sun",     "castle",  ["birds"]),
    "cover-herb-garden":        ("day",    2202, "sun",     "hills",   ["sprouts"]),
    "cover-lantern-watch":      ("night",  2203, "moon",    "castle",  ["lantern"]),
    "cover-cold-tide":          ("teal",   2204, "moon",    "sea",     []),
    "cover-war-drums":          ("blood",  2205, "eclipse", "hills",   ["strikes", "drum"]),
    "cover-broken-formation":   ("ember",  2206, "sun",     "ruins",   ["strikes"]),
    "cover-shadow-skirmish":    ("violet", 2207, "moon",    "ruins",   ["strikes"]),
    "cover-drawn-steel":        ("ash",    2208, "sun",     "hills",   ["sword"]),
    # Sacred Places & Angel Flavours
    "cover-salt-shrine":        ("teal",   2301, "halo",    "shrine",  ["veils"]),
    "cover-crypt-candles":      ("ember",  2302, "none",    "shrine",  ["candles"]),
    "cover-halo-noon":          ("day",    2303, "halo",    "hills",   ["veils"]),
    "cover-vespers-watch":      ("sacred", 2304, "moon",    "shrine",  ["candles"]),
    "cover-wings-keep":         ("night",  2305, "halo",    "castle",  ["wings"]),
    "cover-requiem-glass":      ("violet", 2306, "eclipse", "shrine",  ["veils", "sparkle"]),
    "cover-cave-bells":         ("cave",   2307, "none",    "cave",    ["bells"]),
    # Night Experiments: DnB x Symphonic
    "cover-timpani-breakbeat":  ("blood",  2401, "rings",   "none",    ["eq", "drum"]),
    "cover-col-legno":          ("ember",  2402, "eclipse", "none",    ["eq", "strikes"]),
    "cover-last-stand":         ("blood",  2403, "sun",     "castle",  ["strikes"]),
    "cover-bell-tower":         ("violet", 2404, "moon",    "castle",  ["tower", "bells"]),
    "cover-tavern-pulse":       ("ember",  2405, "none",    "hills",   ["lantern", "eq"]),
    "cover-sternwacht":         ("night",  2406, "rings",   "hills",   ["tower", "orbits"]),
    "cover-sternwacht-science": ("teal",   2407, "rings",   "none",    ["eq", "orbits", "sparkle"]),
    "cover-gezeiten":           ("sacred", 2408, "moon",    "sea",     ["orbits"]),
}


def rgb(h: str) -> tuple[int, int, int]:
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def cover(name: str, pal_name: str, seed: int, celestial: str, ground: str, accents: list[str]) -> Image.Image:
    rnd = random.Random(seed)
    pal = [rgb(c) for c in PAL[pal_name]]
    deep, mid, hi, glow, white, black = pal
    im = Image.new("RGB", (N, N), deep)
    px = im.load()
    # sky: three-step ordered-dither gradient, darkest at the top
    for y in range(N):
        t = y / (N - 1)
        for x in range(N):
            th = (BAYER[y % 4][x % 4] + .5) / 16
            band = t * 2.2
            px[x, y] = deep if band < 1 and (band < th) else (mid if band < 1 or (band - 1) * 0.8 < th else hi)
    d = ImageDraw.Draw(im)
    # stars
    for _ in range(rnd.randint(40, 70)):
        x, y = rnd.randrange(N), rnd.randrange(int(N * .62))
        px[x, y] = white if rnd.random() < .25 else glow if rnd.random() < .3 else hi
    cx, cy = rnd.randint(46, 82), rnd.randint(34, 50)
    if celestial in ("moon", "sunmoon"):
        r = rnd.randint(16, 22)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=white)
        for _ in range(6):
            a, b, s = rnd.randint(-r // 2, r // 2), rnd.randint(-r // 2, r // 2), rnd.randint(2, 5)
            d.ellipse([cx + a - s, cy + b - s, cx + a + s, cy + b + s], fill=tuple((w * 3 + g) // 4 for w, g in zip(white, glow)))
        if celestial == "sunmoon":
            d.ellipse([cx - r + 7, cy - r - 3, cx + r + 7, cy + r - 3], fill=mid)
            d.ellipse([18, 70, 34, 86], fill=glow)
    elif celestial == "sun":
        r = rnd.randint(14, 20)
        for k in range(16):
            a = k * math.pi / 8
            d.line([cx + math.cos(a) * (r + 3), cy + math.sin(a) * (r + 3), cx + math.cos(a) * (r + 9), cy + math.sin(a) * (r + 9)], fill=glow)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=glow)
        d.ellipse([cx - r + 4, cy - r + 4, cx + r - 4, cy + r - 4], fill=white)
    elif celestial == "eclipse":
        r = rnd.randint(17, 23)
        d.ellipse([cx - r - 3, cy - r - 3, cx + r + 3, cy + r + 3], fill=glow)
        d.ellipse([cx - r - 1, cy - r - 1, cx + r + 1, cy + r + 1], fill=white)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=black)
    elif celestial == "halo":
        r = rnd.randint(18, 24)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=glow, width=2)
        d.ellipse([cx - r + 5, cy - r + 5, cx + r - 5, cy + r - 5], outline=white, width=1)
        d.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=white)
    elif celestial == "comet":
        d.line([cx - 40, cy - 22, cx, cy], fill=hi, width=5)
        d.line([cx - 36, cy - 20, cx, cy], fill=glow, width=3)
        d.line([cx - 30, cy - 17, cx, cy], fill=white, width=1)
        d.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=white)
    elif celestial == "rings":
        for k, (rx, ry) in enumerate([(30, 10), (24, 24), (10, 30)]):
            d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], outline=glow if k != 1 else hi, width=1)
        d.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=glow)
        d.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=white)
    if "orbits" in accents:
        for k in range(3):
            rx, ry = 50 + k * 9, 12 + k * 5
            d.arc([N // 2 - rx, cy - ry, N // 2 + rx, cy + ry], 190, 350, fill=glow if k == 0 else hi)
    if "rays" in accents:
        for k in range(7):
            a = math.pi * (0.15 + 0.7 * k / 6)
            d.line([cx, cy, cx + math.cos(a) * 90, cy + math.sin(a) * 90], fill=mid)
    if "veils" in accents:
        for k in range(5):
            x = 22 + k * 21 + rnd.randint(-3, 3)
            for y in range(10, 98):
                if (x + y) % 3 == 0:
                    px[x, y] = hi if y < 70 else glow
    # ground silhouettes
    hz = rnd.randint(88, 96)
    if ground == "sea":
        d.rectangle([0, hz, N, N], fill=deep)
        for y in range(hz + 2, N, 4):
            off = rnd.randint(0, 9)
            for x in range(off, N, 10):
                d.line([x, y, x + rnd.randint(2, 5), y], fill=mid if y > hz + 12 else hi)
        d.line([cx - 4, hz + 2, cx + 4, hz + 2], fill=white)
        d.line([cx - 2, hz + 7, cx + 2, hz + 7], fill=glow)
    elif ground in ("hills", "castle", "ruins", "shrine"):
        pts = [(0, N)]
        for x in range(0, N + 8, 8):
            pts.append((x, hz + int(5 * math.sin(x / 17 + seed)) + rnd.randint(-2, 2)))
        pts.append((N, N))
        d.polygon(pts, fill=black)
    if ground == "castle":
        bx = rnd.randint(20, 60)
        d.rectangle([bx, hz - 18, bx + 48, hz + 4], fill=black)
        for k in range(0, 48, 6):
            d.rectangle([bx + k, hz - 22, bx + k + 3, hz - 18], fill=black)
        d.rectangle([bx + 34, hz - 40, bx + 46, hz], fill=black)
        for k in range(0, 12, 4):
            d.rectangle([bx + 34 + k, hz - 44, bx + 36 + k, hz - 40], fill=black)
        d.rectangle([bx + 39, hz - 33, bx + 40, hz - 30], fill=glow)
        d.rectangle([bx + 10, hz - 10, bx + 11, hz - 8], fill=glow)
    elif ground == "ruins":
        for k in range(4):
            x, h = 14 + k * 28 + rnd.randint(-4, 4), rnd.randint(10, 30)
            d.rectangle([x, hz - h, x + 7, hz], fill=black)
            d.polygon([(x, hz - h), (x + 7, hz - h - rnd.randint(0, 6)), (x + 7, hz - h)], fill=black)
    elif ground == "shrine":
        x0 = N // 2 - 30
        d.rectangle([x0, hz - 30, x0 + 60, hz], fill=black)
        d.polygon([(x0 - 4, hz - 30), (x0 + 30, hz - 46), (x0 + 64, hz - 30)], fill=black)
        for k in range(3):
            ax = x0 + 8 + k * 17
            d.rectangle([ax, hz - 22, ax + 10, hz], fill=mid)
            d.ellipse([ax, hz - 27, ax + 10, hz - 17], fill=mid)
            d.rectangle([ax + 4, hz - 12, ax + 6, hz - 8], fill=glow)
    elif ground == "cave":
        d.rectangle([0, 0, N, N], outline=None)
        mask = Image.new("L", (N, N), 255)
        md = ImageDraw.Draw(mask)
        md.ellipse([18, 22, 110, 150], fill=0)
        im.paste(Image.new("RGB", (N, N), black), (0, 0), mask)
        for k in range(9):
            x = 20 + k * 11 + rnd.randint(-2, 2)
            d.polygon([(x - 3, 22 + abs(4 - k) * 3), (x + 3, 22 + abs(4 - k) * 3), (x, 36 + rnd.randint(0, 12))], fill=black)
        d.rectangle([0, 112, N, N], fill=black)
    # accents
    if "tower" in accents:
        tx = rnd.choice([12, 100])
        d.rectangle([tx, hz - 52, tx + 12, N], fill=black)
        d.polygon([(tx - 2, hz - 52), (tx + 6, hz - 64), (tx + 14, hz - 52)], fill=black)
        d.line([tx + 6, hz - 60, tx + 16, hz - 70], fill=glow)
    if "lantern" in accents:
        lx, ly = rnd.randint(88, 108), hz - 4
        d.rectangle([lx - 2, ly - 4, lx + 2, ly + 2], fill=glow)
        d.point([lx, ly - 1], fill=white)
        for gx in range(lx - 9, lx + 10):
            for gy in range(ly - 8, ly + 6):
                dist = math.hypot(gx - lx, (gy - ly) * 1.3)
                if 3 < dist < 9 and (gx + gy) % 2 == 0 and 0 <= gx < N and 0 <= gy < N and dist < 4 + 5 * (BAYER[gy % 4][gx % 4] / 16):
                    px[gx, gy] = glow
    if "candles" in accents:
        for k in range(5):
            x = 30 + k * 16 + rnd.randint(-2, 2)
            y = N - 10 - rnd.randint(0, 6)
            d.rectangle([x, y, x + 2, N], fill=white)
            d.point([x + 1, y - 2], fill=glow)
            d.point([x + 1, y - 3], fill=white)
    if "bells" in accents:
        for k, bx in enumerate([40, 64, 88]):
            by = 40 + (k % 2) * 12
            d.line([bx, 0, bx, by], fill=mid)
            d.polygon([(bx - 6, by + 10), (bx, by), (bx + 6, by + 10)], fill=glow)
            d.rectangle([bx - 7, by + 10, bx + 7, by + 11], fill=glow)
            d.point([bx, by + 13], fill=white)
    if "strikes" in accents:
        for k in range(rnd.randint(3, 5)):
            x = rnd.randint(-20, 80)
            d.line([x, 120, x + 60, 10], fill=glow if k % 2 else white)
    if "eq" in accents:
        for k in range(16):
            h = int(6 + 22 * abs(math.sin(k * 0.9 + seed)) * rnd.uniform(.5, 1))
            x = 8 + k * 7
            for y in range(N - 6, N - 6 - h, -2):
                d.line([x, y, x + 4, y], fill=glow if y > N - 6 - h * .6 else white)
    if "drum" in accents:
        d.ellipse([44, 98, 84, 110], fill=hi, outline=glow)
        d.rectangle([44, 104, 84, 122], fill=mid)
        for k in range(46, 84, 6):
            d.line([k, 106, k + 3, 122], fill=glow)
    if "sword" in accents:
        d.line([N // 2, 30, N // 2, 100], fill=white, width=3)
        d.line([N // 2 - 10, 92, N // 2 + 10, 92], fill=glow, width=3)
        d.rectangle([N // 2 - 1, 94, N // 2 + 1, 110], fill=hi)
    if "birds" in accents:
        for _ in range(5):
            x, y = rnd.randint(10, 110), rnd.randint(15, 60)
            d.line([x - 3, y - 2, x, y, x + 3, y - 2], fill=black)
    if "sprouts" in accents:
        for k in range(12):
            x = 6 + k * 10 + rnd.randint(-2, 2)
            d.line([x, N, x, N - 8 - rnd.randint(0, 6)], fill=hi)
            d.point([x - 1, N - 10], fill=glow)
    if "wings" in accents:
        for s in (-1, 1):
            for k in range(6):
                x0 = cx + s * (6 + k * 4)
                d.line([x0, cy - 6 + k, x0 + s * 8, cy + 10 + k * 2], fill=white if k % 2 else glow)
    if "sparkle" in accents:
        for _ in range(8):
            x, y = rnd.randint(8, 120), rnd.randint(8, 80)
            d.line([x - 2, y, x + 2, y], fill=white)
            d.line([x, y - 2, x, y + 2], fill=white)
    if "frame" in accents:
        d.rectangle([2, 2, N - 3, N - 3], outline=glow)
        d.rectangle([4, 4, N - 5, N - 5], outline=mid)
        for x, y in ((2, 2), (N - 6, 2), (2, N - 6), (N - 6, N - 6)):
            d.rectangle([x, y, x + 3, y + 3], fill=white)
    return im.resize((N * 4, N * 4), Image.NEAREST)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    for name, spec in COVERS.items():
        path = OUT / f"{name}.webp"
        if path.exists() and not a.force:
            continue
        cover(name, *spec).save(path, "WEBP", lossless=True, method=6)
        print(f"wrote {path.name} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
