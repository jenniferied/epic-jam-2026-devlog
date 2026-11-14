"""Regenerates entries/index.json, feed.xml and sitemap.xml from the front matter of entries/*.md.

Run after adding or editing an entry:  python3 scripts/build.py
"""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://jenniferied.github.io/epic-jam-2026-devlog/"
FIELDS = ("slug", "title", "date", "day", "phase", "status")
OPTIONAL = ("summary", "cover", "cover_alt", "kind")  # kind: page = undated page, listed but not in the feed


def front_matter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    meta = {}
    for line in (m.group(1).split("\n") if m else []):
        key, _, val = line.partition(":")
        if val:
            meta[key.strip()] = val.strip().strip('"')
    return meta


entries = []
for path in sorted((ROOT / "entries").glob("*.md")):
    if path.name == "readme.md":
        continue
    meta = front_matter(path.read_text(encoding="utf-8"))
    missing = [f for f in FIELDS if f not in meta]
    if missing:
        raise SystemExit(f"{path.name}: missing front matter {missing}")
    entries.append({**{f: meta[f] for f in FIELDS}, **{f: meta[f] for f in OPTIONAL if meta.get(f)}, "file": path.name, "order": int(meta.get("order", 99))})
entries.sort(key=lambda e: (e["order"], e["date"]))
for e in entries:
    del e["order"]

(ROOT / "entries" / "index.json").write_text(json.dumps({"entries": entries}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
live = [e for e in entries if e["status"] == "live" and e.get("kind") != "page"]
items = "".join(
    f"""  <entry>
    <title>{escape(e['title'])}</title>
    <link href="{BASE}#/{e['slug']}"/>
    <id>{BASE}#/{e['slug']}</id>
    <updated>{e['date']}T12:00:00+01:00</updated>
    <summary>{escape(e.get('summary', ''))}</summary>
  </entry>
""" for e in reversed(live))
(ROOT / "feed.xml").write_text(f"""<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>epic-jam-2026 / devlog</title>
  <subtitle>A participant's devlog for the Epic AI MegaJam 2026</subtitle>
  <link href="{BASE}"/>
  <link rel="self" href="{BASE}feed.xml"/>
  <id>{BASE}</id>
  <updated>{now}</updated>
  <author><name>Jennifer</name></author>
{items}</feed>
""", encoding="utf-8")

(ROOT / "sitemap.xml").write_text(f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>{BASE}</loc><lastmod>{now[:10]}</lastmod></url>
</urlset>
""", encoding="utf-8")
print(f"{len(entries)} entries, {len(live)} live")
