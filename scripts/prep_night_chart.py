"""Builds assets/charts/prep-night.vl.json from the jam repo's Prep/log/prep-timeline.md:
every logged event of the night 10/11 Nov 2026 (00:00-05:10) by actor and type. Run from the website folder."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "Prep" / "log" / "prep-timeline.md"
day, rows = None, []
for line in SRC.read_text(encoding="utf-8").splitlines():
    h = re.match(r"## \w+, (\d{4}-\d{2}-\d{2})", line)
    if h:
        day = h.group(1)
        continue
    m = re.match(r"- ~?(\d{2}:\d{2})(?:[–-]~?\d{2}:\d{2})? — \[(\w+)\] by (\w+)(?: \((\w+)[:,]?.*?\))? — (.*)", line)
    if not (m and day == "2026-11-11"):
        continue
    hhmm, kind, actor, parent, text = m.groups()
    if hhmm > "05:10":
        continue
    who = {"user": "me", "codex": "Codex", "claude": "Claude"}.get(actor, f"subagent ({parent})" if parent else "subagent")
    text = re.sub(r"[*`]", "", text).split(". ")[0][:90]
    rows.append({"t": f"{day}T{hhmm}:00", "who": who, "type": kind, "what": text})

spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "data": {"values": rows},
    "width": "container", "height": 190,
    "mark": {"type": "tick", "thickness": 3, "size": 22},
    "encoding": {
        "x": {"field": "t", "type": "temporal", "timeUnit": "hoursminutes", "title": "11 Nov 2026, Europe/Berlin",
              "axis": {"format": "%H:%M", "tickCount": 6}},
        "y": {"field": "who", "type": "nominal", "title": None,
              "sort": ["me", "Codex", "subagent (codex)", "Claude", "subagent (claude)"]},
        "color": {"field": "type", "type": "nominal", "title": "event",
                  "scale": {"domain": ["decision", "milestone", "setback", "research", "setup"]}},
        "tooltip": [{"field": "t", "type": "temporal", "timeUnit": "hoursminutes", "title": "time", "format": "%H:%M"},
                    {"field": "who"}, {"field": "type"}, {"field": "what"}],
    },
}
out = ROOT / "assets" / "charts" / "prep-night.vl.json"
out.write_text(json.dumps(spec, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(len(rows), "events ->", out.relative_to(ROOT))
