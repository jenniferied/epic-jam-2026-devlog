"""Writes the pixel cursors and favicon as crisp SVGs from ASCII art (B = black, W = white, colour keys below)."""
from pathlib import Path

ARROW = """
B
BB
BWB
BWWB
BWWWB
BWWWWB
BWWWWWB
BWWWWWWB
BWWWWWWWB
BWWWWWWWWB
BWWWWWBBBBB
BWWBWWB
BWB BWWB
BB  BWWB
B    BWWB
     BWWB
      BB
"""
HAND = """
    BB
   BWWB
   BWWB
   BWWB
   BWWBBB
   BWWBWWBBB
BB BWWBWWBWWBB
BWBBWWWWWWWWBWB
BWWBWWWWWWWWWWB
 BWWWWWWWWWWWWB
  BWWWWWWWWWWWB
  BWWWWWWWWWWB
   BWWWWWWWWWB
   BWWWWWWWWB
    BWWWWWWB
    BBBBBBBB
"""
# Funke's head for the favicon (F scales, H horns, A snout, T eyes, W wings)
FAV = """
...H.....H...
..HHFFFFFHH..
.FFFFFFFFFFF.
WFTTFFFFTTFFW
WFFFFFFFFFFFW
.FFFAAAAAFFF.
.FFFAATAAFFF.
..FFFFFFFFF..
"""
COL = {"B": "#000", "W": "#fff"}
FCOL = {"F": "#56c496", "H": "#ffecbe", "A": "#fae8aa", "T": "#1e2032", "W": "#ff7996"}


def svg(art, colours, scale):
    rows = [r for r in art.strip("\n").split("\n")]
    w, h = max(map(len, rows)), len(rows)
    rects = "".join(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{colours[c]}"/>'
                    for y, r in enumerate(rows) for x, c in enumerate(r) if c in colours)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w * scale}" height="{h * scale}" '
            f'viewBox="0 0 {w} {h}" shape-rendering="crispEdges">{rects}</svg>\n')


out = Path(__file__).resolve().parent.parent / "assets"
(out / "cursor.svg").write_text(svg(ARROW, COL, 2))
(out / "cursor-hand.svg").write_text(svg(HAND, COL, 2))
(out / "favicon.svg").write_text(svg(FAV, FCOL, 4))
