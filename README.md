# epic-jam-2026-devlog

Terminal-style devlog for the Epic AI MegaJam 2026, served with GitHub Pages: https://jenniferied.github.io/epic-jam-2026-devlog/

Static site, no build step for the page itself. Entries are markdown in `entries/`.

- New or edited entry: edit `entries/<slug>.md` (front matter: title, slug, order, date, day, phase, status, summary), then `python3 scripts/build.py` to refresh `entries/index.json`, `feed.xml` and `sitemap.xml`.
- Extra markdown: `«…»` and `>> …` mark dictated, verbatim text. Fenced blocks `specs`, `timeline`, `log`, `gallery`, `chat`, `recap`, `todo` (see `js/md.js`).
- Images: JPG/WebP in `assets/img/`, no Git LFS (Pages would serve the pointer file). Gallery lines are `src | caption | alt | w x h`; `placeholder` as src draws a labelled empty frame.
- UI strings: `i18n/en.json`, `i18n/de.json`.
- Local preview: `python3 -m http.server 8000`.
- Funke is a port of `tools/jam-dragon/dragon.py` from the jam repo; cursors and favicon come from `scripts/make_cursors.py`.

Unofficial participant devlog, not affiliated with Epic Games. Fonts VT323 and Jersey 15 under the SIL Open Font License.
