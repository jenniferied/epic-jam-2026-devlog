# epic-jam-2026-devlog

Terminal-style devlog for the Epic AI MegaJam 2026, served with GitHub Pages: https://jenniferied.github.io/epic-jam-2026-devlog/

Static site, no build step for the page itself. Entries are markdown in `entries/`.

- New or edited entry: edit `entries/<slug>.md` (front matter: title, slug, order, date, day, phase, status, summary), then `python3 scripts/build.py` to refresh `entries/index.json`, `feed.xml` and `sitemap.xml`.
- Undated pages: add `kind: page` to the front matter (see `entries/profile.md`, `order: 0`, `phase: about`). A page sits in the list and in prev/next, but gets no date, no reading time, no legend, no home card and no feed item. Its list subtitle is the i18n key `list.pageMeta.<slug>`.
- Extra markdown: `«…»` and `>> …` mark dictated, verbatim text. Fenced blocks `specs`, `timeline`, `log`, `gallery`, `chat`, `recap`, `todo`, `model`, `chart`, `tracks`, `pubs` (see `js/md.js`).
- Publication list: `pubs` lines are `year | title | authors | venue | status | url`. The url is optional and links the title; the first word of the status picks the chip colour (`published`, `accepted`, `thesis`).
- Images: JPG/WebP in `assets/img/`, no Git LFS (Pages would serve the pointer file). Gallery lines are `src | caption | alt | w x h`; `placeholder` as src draws a labelled empty frame.
- UI strings: `i18n/en.json`, `i18n/de.json`.
- Local preview: `python3 -m http.server 8000`.
- Funke is a port of `tools/jam-dragon/dragon.py` from the jam repo; cursors and favicon come from `scripts/make_cursors.py`.

Unofficial participant devlog, not affiliated with Epic Games. Fonts VT323 and Jersey 15 under the SIL Open Font License.
