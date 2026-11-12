// epic-jam-2026 / devlog: terminal shell around markdown entries.
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const root = document.documentElement;
  const el = {
    list: $("#list"), reader: $("#reader"), filter: $("#filter"), count: $("#count"),
    cmd: $("#cmd"), cmdOut: $("#cmd-out"), prompt: $("#prompt"), cwd: $("#cwd"),
    mode: $("#mode"), sbFile: $("#sb-file"), sbPos: $("#sb-pos"), sbClock: $("#sb-clock"),
    divider: $("#divider"), side: $("#side"), help: $("#help"), lb: $("#lightbox"),
  };
  const THEMES = ["forest", "amber", "paper"];
  const LANGS = ["en", "de"];

  // ------------------------------------------------------------ prefs (browser storage is optional)
  const prefs = (() => { try { return JSON.parse(localStorage.getItem("devlog.prefs") || "{}"); } catch (e) { return {}; } })();
  const save = () => { try { localStorage.setItem("devlog.prefs", JSON.stringify(prefs)); } catch (e) { /* private mode */ } };

  // ------------------------------------------------------------ i18n
  let dict = {};
  const t = (key, vars) => {
    let s = dict[key] != null ? dict[key] : key;
    if (vars && typeof s === "string") for (const [k, v] of Object.entries(vars)) s = s.replace("{" + k + "}", v);
    return s;
  };
  async function loadLang(lang) {
    if (!LANGS.includes(lang)) lang = "en";
    try { dict = await (await fetch(`i18n/${lang}.json`)).json(); } catch (e) { dict = {}; }
    prefs.lang = lang; save();
    root.lang = lang;
    $("#btn-lang").textContent = lang.toUpperCase();
    document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-label]").forEach((n) => { n.setAttribute("aria-label", t(n.dataset.i18nLabel)); });
    $("#help-rows").innerHTML = (dict["help.rows"] || []).map(([k, v]) => `<dt>${Md.esc(k)}</dt><dd>${Md.esc(v)}</dd>`).join("");
    hintsShown = null;
    $("#btn-prev").setAttribute("aria-label", t("entry.prev")); $("#btn-next").setAttribute("aria-label", t("entry.next"));
    $("#lb-prev").setAttribute("aria-label", t("lightbox.prev"));
    $("#lb-next").setAttribute("aria-label", t("lightbox.next"));
    $("#lb-close").setAttribute("aria-label", t("lightbox.close"));
  }

  function setTheme(name) {
    if (!THEMES.includes(name)) name = THEMES[(THEMES.indexOf(root.dataset.theme) + 1) % THEMES.length];
    root.dataset.theme = name; prefs.theme = name; save();
    if (typeof renderCharts === "function" && vegaReady) renderCharts();
    $('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue("--term").trim();
    return name;
  }
  function setScale(v) {
    v = Math.min(1.4, Math.max(0.8, Math.round(v * 100) / 100));
    root.style.setProperty("--scale", v); prefs.scale = v; save();
  }
  function setSide(px) {
    px = Math.round(Math.min(Math.max(220, px), Math.min(620, innerWidth * 0.6)));
    root.style.setProperty("--side", px + "px"); prefs.side = px; save();
    el.divider.setAttribute("aria-valuenow", px);
  }

  // ------------------------------------------------------------ data
  let entries = [], shown = [], sel = 0, current = null, zone = "reader";
  const bodies = new Map();
  let galleries = [];

  async function loadEntries() {
    const data = await (await fetch("entries/index.json")).json();
    const home = { slug: "readme", file: "readme.md", title: "README.md", day: "start", phase: "home", status: "live", date: data.entries[0].date, summary: "", home: true };
    entries = [home, ...data.entries].map((e, i) => ({ ...e, n: i }));
  }
  async function body(file) {
    if (!bodies.has(file)) bodies.set(file, fetch("entries/" + file).then((r) => r.text()).then((x) => Md.frontMatter(x).body));
    return bodies.get(file);
  }
  // undated pages (kind: page in the front matter) sit in the sequence but are not log entries
  const isPage = (e) => e.kind === "page";
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(root.lang === "de" ? "de-DE" : "en-GB", { weekday: "short", day: "numeric", month: "short" });

  // ------------------------------------------------------------ list
  function renderList() {
    const q = el.filter.value.trim().toLowerCase();
    shown = entries.filter((e) => !q || e.home || [e.title, e.summary, e.slug, e.phase, e.day].join(" ").toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    el.count.textContent = (shown.length - (shown[0] && shown[0].home ? 1 : 0)) + "/" + (entries.length - 1);
    el.list.innerHTML = shown.length ? shown.map((e, i) => `
      <li role="option" id="opt-${e.slug}" aria-selected="${i === sel}" class="${i === sel ? "sel" : ""} ${current && current.slug === e.slug ? "open" : ""} ${e.status === "draft" ? "draft" : ""}">
        <a href="#/${e.slug}" tabindex="-1" data-i="${i}">
          <span class="n">${e.n}</span><span class="ph ph-${e.phase}">${Md.esc(t("phase." + e.phase))}</span><span class="t">${Md.esc(e.title)}</span>
          <span class="meta">${e.home ? Md.esc(t("list.homeMeta")) : isPage(e) ? Md.esc(t("list.pageMeta." + e.slug)) : Md.esc(e.day) + " · " + fmtDate(e.date)}</span>
        </a></li>`).join("") : `<li class="empty">${Md.esc(t("list.empty"))}</li>`;
    if (shown[sel]) el.list.setAttribute("aria-activedescendant", "opt-" + shown[sel].slug);
  }
  function move(d, abs) {
    if (!shown.length) return;
    sel = abs != null ? abs : Math.min(shown.length - 1, Math.max(0, sel + d));
    renderList();
    const li = el.list.children[sel];
    if (li) li.scrollIntoView({ block: "nearest" });
  }
  const open = (e) => { if (e) location.hash = "#/" + e.slug; };

  // ------------------------------------------------------------ views
  async function route() {
    const slug = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const e = entries.find((x) => x.slug === slug) || entries[0];
    current = e;
    document.body.classList.toggle("reading", !!slug && slug === e.slug);
    const i = shown.findIndex((x) => x.slug === e.slug);
    if (i >= 0) sel = i;
    if (e.home) await renderHome(); else await renderEntry(e);
    renderList();
    navState();
    status();
  }

  async function renderHome() {
    const ctx = { galleries: [] };
    const md = Md.render(await body("readme.md"), ctx);
    galleries = md.galleries;
    const logs = entries.filter((e) => !e.home && !isPage(e));
    const cards = logs.filter((e) => e.status !== "draft").map((e) => `<a href="#/${e.slug}" class="card">${e.cover ? `<img src="${Md.esc(e.cover)}" alt="" loading="lazy" width="1344" height="768">` : ""}<span class="d">${Md.esc(e.day)} · ${fmtDate(e.date)}</span><span class="t">${Md.esc(e.title)}</span>${e.summary ? `<span class="s">${Md.esc(e.summary)}</span>` : ""}</a>`).join("");
    const upcoming = logs.filter((e) => e.status === "draft").map((e) => `<a href="#/${e.slug}"><b>${Md.esc(e.day)}</b>${fmtDate(e.date)}</a>`).join("");
    el.reader.innerHTML = `<article class="article">
      <div class="crumbs"><span class="ps1">~/devlog $</span> cat README.md</div>
      <div class="banner-row"><p class="banner" role="heading" aria-level="1">EPIC JAM 2026<span class="banner-sub">devlog</span></p><button type="button" class="info" aria-describedby="tagline-tip" aria-label="${Md.esc(t("info.label"))}">i<span class="tip" role="tooltip" id="tagline-tip">${Md.esc(t("site.tagline"))}</span></button></div>
      <div class="prose">${md.html}</div>
      <div class="home-grid">${cards}</div>
      ${upcoming ? `<div class="upcoming"><span class="up-head">${Md.esc(t("home.upcoming"))}</span>${upcoming}</div>` : ""}
      ${legend()}
      ${pager()}
    </article>`;
    el.reader.scrollTop = 0;
    document.title = t("site.title");
    el.cwd.textContent = "~/devlog";
    if (zone === "reader" && document.body.classList.contains("reading")) el.reader.focus({ preventScroll: true });
  }

  async function renderEntry(e) {
    const ctx = { galleries: [] };
    const src = await body(e.file);
    const md = Md.render(src, ctx);
    galleries = md.galleries;
    const draft = e.status === "draft", page = isPage(e);
    if (e.cover) galleries.push([{ src: e.cover, alt: e.cover_alt || "", caption: t("cover.credit"), w: 1344, h: 768 }]);
    const cover = e.cover ? `<figure class="cover"><button class="thumb" type="button" data-gallery="${galleries.length - 1}" data-index="0" aria-label="${Md.esc(e.cover_alt || "")}"><img src="${Md.esc(e.cover)}" alt="${Md.esc(e.cover_alt || "")}" width="1344" height="768" decoding="async" fetchpriority="high"></button></figure>` : "";
    const minutes = Math.max(1, Math.round(src.split(/\s+/).length / 200));
    el.reader.innerHTML = `<article class="article">
      <div class="crumbs"><span class="ps1">~/devlog $</span> less entries/${Md.esc(e.file)} <button type="button" class="only-mobile" data-back>${Md.esc(t("entry.back"))}</button></div>
      ${cover}
      <header class="entry-head">
        <h1>${Md.esc(e.title)}</h1>
        <p class="sub"><span class="badge ${e.status === "draft" ? "draft" : ""}">${Md.esc(e.day)}</span>${page ? "" : `<span>${fmtDate(e.date)}</span>`}${draft || page ? "" : `<span>${minutes} ${Md.esc(t("entry.minutes"))}</span>`}</p>
        ${e.summary ? `<p class="lead">${Md.inline(e.summary)}</p>` : ""}
      </header>
      ${md.toc.length >= 3 ? `<nav class="toc" aria-label="${Md.esc(t("toc.label"))}"><span class="toc-head">${Md.esc(t("toc.label"))}</span>${md.toc.map((x, i) => `<a href="#/${e.slug}" data-jump="${x.id}"><span>${String(i + 1).padStart(2, "0")}</span>${Md.inline(x.text)}</a>`).join("")}</nav>` : ""}
      ${draft ? `<p class="empty-entry"><span class="blink" aria-hidden="true">█</span></p>` : `<div class="prose">${md.html}</div>${page ? "" : legend()}`}
      ${pager()}
    </article>`;
    el.reader.scrollTop = 0;
    enhance(); trackUi(); renderCharts();
    document.title = e.title + " · " + t("site.title");
    el.cwd.textContent = "~/devlog/" + e.slug;
    if (zone === "reader") el.reader.focus({ preventScroll: true });
  }

  function pager() {
    const i = entries.indexOf(current), prev = entries[i - 1], next = entries[i + 1];
    const link = (e, cls, label) => e
      ? `<a class="${cls}" href="#/${e.slug}"><small>${label}</small>${Md.esc(e.title)}</a>`
      : `<span class="${cls} off" aria-disabled="true"><small>${label}</small>–</span>`;
    return `<nav class="pager">${link(prev, "prev", "← " + Md.esc(t("entry.prev")))}${link(next, "next", Md.esc(t("entry.next")) + " →")}</nav>`;
  }
  function navState() {
    const i = entries.indexOf(current);
    $("#btn-prev").disabled = i <= 0;
    $("#btn-next").disabled = i >= entries.length - 1;
  }
  const step = (d) => { const e = entries[entries.indexOf(current) + d]; if (e) { zone = "reader"; open(e); } };
  $("#btn-prev").onclick = () => step(-1);
  $("#btn-next").onclick = () => step(1);

  const legend = () => `<footer class="legend" aria-label="${Md.esc(t("legend.title"))}">
      <span><i class="sw sw-voice"></i>${Md.esc(t("legend.voice"))}</span>
      <span><i class="sw sw-ai"></i>${Md.esc(t("legend.ai"))}</span>
      <span><i class="sw sw-log"></i>${Md.esc(t("legend.log"))}</span></footer>`;

  const BANNER = "█▀▀ █▀▄ ▀█▀ ▄▀▀      █ ▄▀▄ █▄ ▄█    ▀▀▄ ▄▀▄ ▀▀▄ ▄▀▀\n█▀  █▀   █  █      ▄ █ █▀█ █ ▀ █    ▄▀  █ █ ▄▀  █▀▄\n▀▀▀ ▀   ▀▀▀  ▀▀     ▀  ▀ ▀ ▀   ▀    ▀▀▀  ▀  ▀▀▀  ▀";

  // ------------------------------------------------------------ status bar
  let hintsShown = null;
  function hints() {
    const which = document.activeElement === el.filter ? "hints.filter" : "hints.reader";
    if (which === hintsShown) return;
    hintsShown = which;
    $("#hints").innerHTML = (dict[which] || []).map(([k, v]) => `<span><kbd>${Md.esc(k)}</kbd>${Md.esc(v)}</span>`).join("");
  }
  function status(mode) {
    hints();
    if (mode) { el.mode.textContent = mode; el.mode.classList.toggle("insert", mode !== "NORMAL"); }
    el.sbFile.textContent = current && !current.home ? "entries/" + current.file : "README.md";
    const r = el.reader, max = r.scrollHeight - r.clientHeight;
    el.sbPos.textContent = (current ? current.n + "/" + (entries.length - 1) + "  " : "") + (max > 4 ? Math.round((r.scrollTop / max) * 100) + "%" : "all");
  }
  function clock() {
    el.sbClock.textContent = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit" }).format(new Date()) + " CET";
  }

  // ------------------------------------------------------------ lightbox
  let lb = null;
  function lbOpen(g, i) {
    lb = { g: +g, i: +i, back: document.activeElement };
    el.lb.hidden = false;
    lbShow();
    $("#lb-close").focus();
  }
  function lbShow() {
    const items = galleries[lb.g]; if (!items) return;
    lb.i = (lb.i + items.length) % items.length;
    const it = items[lb.i], img = $("#lb-img"), ph = $("#lb-ph");
    const isPh = it.src === "placeholder";
    img.hidden = isPh; ph.hidden = !isPh;
    if (isPh) ph.innerHTML = `<span class="ph-label">[ photo pending ]</span><span class="ph-cap">${Md.esc(it.alt)}</span>`;
    else { img.src = it.src; img.alt = it.alt; }
    $("#lb-cap").innerHTML = Md.inline(it.caption || "");
    $("#lb-count").textContent = t("lightbox.count", { i: lb.i + 1, n: items.length });
    const multi = items.length > 1;
    $("#lb-prev").hidden = !multi; $("#lb-next").hidden = !multi;
  }
  function lbClose() { el.lb.hidden = true; $("#lb-img").removeAttribute("src"); if (lb && lb.back) lb.back.focus(); lb = null; }
  $("#lb-prev").onclick = () => { lb.i--; lbShow(); };
  $("#lb-next").onclick = () => { lb.i++; lbShow(); };
  $("#lb-close").onclick = lbClose;
  el.lb.addEventListener("click", (ev) => { if (ev.target === el.lb) lbClose(); });
  let touchX = null;
  el.lb.addEventListener("touchstart", (ev) => { touchX = ev.touches[0].clientX; }, { passive: true });
  el.lb.addEventListener("touchend", (ev) => {
    if (touchX == null) return;
    const dx = ev.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 50) { lb.i += dx < 0 ? 1 : -1; lbShow(); }
  });

  // ------------------------------------------------------------ 3d models: load the viewer only when an entry has one
  let mvLoaded = false;
  function enhance() {
    if (!mvLoaded && el.reader.querySelector("model-viewer")) {
      mvLoaded = true;
      const sc = document.createElement("script");
      sc.type = "module";
      sc.src = "https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
      document.head.appendChild(sc);
    }
  }

  // ------------------------------------------------------------ charts: Vega-Lite (same versions as the thesis site), themed from the CSS tokens
  const VEGA = ["vega@6.2.0/build/vega.min.js", "vega-lite@6.4.0/build/vega-lite.min.js", "vega-embed@7.0.2/build/vega-embed.min.js"];
  let vegaReady = null;
  const loadScript = (src) => new Promise((ok, fail) => { const sc = document.createElement("script"); sc.src = src; sc.onload = ok; sc.onerror = fail; document.head.appendChild(sc); });
  function chartTheme() {
    const css = getComputedStyle(root), v = (n) => css.getPropertyValue(n).trim();
    const font = "VT323, ui-monospace, monospace";
    return {
      background: null, font,
      view: { stroke: null },
      axis: { domainColor: v("--line-2"), gridColor: v("--line"), gridDash: [2, 3], tickColor: v("--line-2"), labelColor: v("--dim"), titleColor: v("--dim"), labelFont: font, titleFont: font, labelFontSize: 15, titleFontSize: 15, titleFontWeight: "normal" },
      axisY: { grid: true, domain: false, ticks: false, labelPadding: 8 },
      legend: { labelColor: v("--fg"), titleColor: v("--dim"), labelFont: font, titleFont: font, labelFontSize: 15, titleFontSize: 15, titleFontWeight: "normal", orient: "bottom", direction: "horizontal", symbolType: "square" },
      range: { category: [v("--voice"), v("--accent"), v("--red"), v("--blue"), v("--violet"), v("--pink")] },
      title: { color: v("--fg"), font },
    };
  }
  async function renderCharts() {
    const figs = [...el.reader.querySelectorAll(".chart")];
    if (!figs.length) return;
    vegaReady = vegaReady || VEGA.reduce((p, f) => p.then(() => loadScript("https://cdn.jsdelivr.net/npm/" + f)), Promise.resolve());
    try { await vegaReady; } catch (e) { figs.forEach((f) => { f.querySelector(".vl").textContent = "[ chart could not load ]"; }); return; }
    for (const f of figs) {
      const spec = await (await fetch(f.dataset.spec)).json();
      await window.vegaEmbed(f.querySelector(".vl"), spec, { actions: false, renderer: "svg", config: chartTheme(), tooltip: { theme: "custom" } });
    }
  }

  // ------------------------------------------------------------ soundtrack: one shared audio element
  const audio = new Audio();
  audio.preload = "none";
  let playing = null;
  function trackUi() {
    document.querySelectorAll(".track[data-src]").forEach((b) => {
      const on = playing && b.dataset.src === playing && !audio.paused;
      b.classList.toggle("on", on);
      b.querySelector(".state").textContent = on ? "||" : "▶";
    });
  }
  function toggleTrack(btn) {
    const src = btn.dataset.src;
    if (playing === src && !audio.paused) audio.pause();
    else { if (playing !== src) { audio.src = src; playing = src; } audio.play().catch(() => {}); }
    trackUi();
  }
  audio.addEventListener("timeupdate", () => {
    const li = playing && [...document.querySelectorAll(".track[data-src]")].find((b) => b.dataset.src === playing);
    if (li && audio.duration) li.parentElement.querySelector(".bar i").style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });
  audio.addEventListener("ended", () => {
    const all = [...document.querySelectorAll(".track[data-src]")];
    const i = all.findIndex((b) => b.dataset.src === playing);
    if (all[i + 1]) toggleTrack(all[i + 1]); else trackUi();
  });
  audio.addEventListener("pause", trackUi);

  // ------------------------------------------------------------ help
  const helpOpen = () => { el.help.hidden = false; el.help.querySelector(".help-box").focus?.(); };
  const helpClose = () => { el.help.hidden = true; };
  el.help.addEventListener("click", (ev) => { if (ev.target === el.help) helpClose(); });

  // ------------------------------------------------------------ command line
  const history = []; let hpos = 0;
  function run(line) {
    const [cmd, ...args] = line.trim().split(/\s+/);
    const arg = args.join(" ");
    const find = (a) => (/^\d+$/.test(a) ? entries[+a] : null) || entries.find((e) => e.slug === a || e.slug.startsWith(a));
    let out = "";
    switch ((cmd || "").toLowerCase()) {
      case "": break;
      case "help": case "?": out = t("cmd.help"); break;
      case "ls": case "ll": out = entries.filter((e) => !e.home).map((e) => `${String(e.n).padStart(2)}  ${e.phase.padEnd(5)}  ${e.date}  ${e.status === "draft" ? "-" : "+"}  ${e.slug}`).join("\n"); break;
      case "open": case "cat": case "less": case "cd": {
        if (cmd === "cd" && (!arg || arg === ".." || arg === "~" || arg === "/")) { location.hash = "#/readme"; break; }
        const e = find(arg.replace(/^entries\//, "").replace(/\.md$/, ""));
        if (e) { zone = "reader"; open(e); } else out = t("cmd.notFound", { arg });
        break;
      }
      case "theme": out = t("cmd.theme", { theme: setTheme(arg) }); break;
      case "lang": loadLang(arg || (prefs.lang === "de" ? "en" : "de")).then(() => { renderList(); route(); el.cmdOut.textContent = t("cmd.lang", { lang: prefs.lang }); }); break;
      case "funke": case "dragon": funke && funke.talk(); break;
      case "rss": case "feed": location.href = "feed.xml"; break;
      case "clear": out = ""; break;
      case "sudo": out = "Funke says no. Scope stays small."; break;
      default: out = t("cmd.unknown", { cmd });
    }
    el.cmdOut.textContent = out;
  }
  el.prompt.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const line = el.cmd.value;
    if (line.trim()) { history.push(line); hpos = history.length; }
    el.cmd.value = "";
    run(line);
  });
  el.cmd.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowUp" && history.length) { hpos = Math.max(0, hpos - 1); el.cmd.value = history[hpos]; ev.preventDefault(); }
    else if (ev.key === "ArrowDown" && history.length) { hpos = Math.min(history.length, hpos + 1); el.cmd.value = history[hpos] || ""; ev.preventDefault(); }
    else if (ev.key === "Tab") {
      const [c, a = ""] = el.cmd.value.split(/\s+/);
      if (a !== undefined && ["open", "cat", "less", "cd"].includes(c)) {
        const m = entries.find((e) => e.slug.startsWith(a));
        if (m) { el.cmd.value = c + " " + m.slug; ev.preventDefault(); }
      }
    } else if (ev.key === "Escape") { el.cmd.blur(); el.cmdOut.textContent = ""; }
  });
  el.cmd.addEventListener("focus", () => status("COMMAND"));
  el.cmd.addEventListener("blur", () => status("NORMAL"));

  // ------------------------------------------------------------ filter
  el.filter.addEventListener("input", () => { sel = 0; renderList(); });
  el.filter.addEventListener("focus", () => { hintsShown = null; status("FILTER"); });
  el.filter.addEventListener("blur", () => { hintsShown = null; status("NORMAL"); });
  el.filter.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") { ev.preventDefault(); const e = shown[sel]; el.filter.value = ""; zone = "reader"; renderList(); open(e); el.filter.blur(); }
    else if (ev.key === "ArrowDown") { ev.preventDefault(); move(1); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); move(-1); }
    else if (ev.key === "Escape") { el.filter.value = ""; renderList(); el.filter.blur(); zone = "reader"; el.reader.focus({ preventScroll: true }); }
  });

  // ------------------------------------------------------------ mouse on list / reader
  el.list.addEventListener("click", (ev) => {
    const a = ev.target.closest("a[data-i]"); if (!a) return;
    sel = +a.dataset.i; zone = "reader";
  });
  el.list.addEventListener("focus", () => { zone = "list"; status(); });
  el.reader.addEventListener("click", (ev) => {
    const th = ev.target.closest(".thumb"); if (th) { lbOpen(th.dataset.gallery, th.dataset.index); return; }
    const tr = ev.target.closest(".track[data-src]"); if (tr) { toggleTrack(tr); return; }
    const jump = ev.target.closest("[data-jump]");
    if (jump) { ev.preventDefault(); const h = document.getElementById(jump.dataset.jump); if (h) h.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (ev.target.closest("[data-back]")) { zone = "list"; location.hash = "#/"; }
  });
  el.reader.addEventListener("focusin", () => { zone = "reader"; status(); });
  el.reader.addEventListener("scroll", () => status(), { passive: true });

  // ------------------------------------------------------------ resizable divider
  el.divider.setAttribute("aria-valuemin", 220); el.divider.setAttribute("aria-valuemax", 620);
  el.divider.setAttribute("aria-valuenow", el.side.getBoundingClientRect().width | 0);
  el.divider.addEventListener("pointerdown", (ev) => {
    ev.preventDefault(); el.divider.setPointerCapture(ev.pointerId); el.divider.classList.add("drag");
    const x0 = ev.clientX, w0 = el.side.getBoundingClientRect().width;
    const mv = (e) => setSide(w0 + e.clientX - x0);
    const up = () => { el.divider.classList.remove("drag"); el.divider.removeEventListener("pointermove", mv); el.divider.removeEventListener("pointerup", up); };
    el.divider.addEventListener("pointermove", mv); el.divider.addEventListener("pointerup", up);
  });
  el.divider.addEventListener("dblclick", () => setSide(300));
  el.divider.addEventListener("keydown", (ev) => {
    const w = el.side.getBoundingClientRect().width;
    if (ev.key === "ArrowLeft") { setSide(w - 24); ev.preventDefault(); ev.stopPropagation(); }
    if (ev.key === "ArrowRight") { setSide(w + 24); ev.preventDefault(); ev.stopPropagation(); }
  });

  // ------------------------------------------------------------ titlebar buttons
  $("#btn-theme").onclick = () => setTheme();
  $("#btn-lang").onclick = () => run("lang");
  $("#btn-help").onclick = helpOpen;

  // ------------------------------------------------------------ global keys
  const typing = (n) => n && (n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.isContentEditable);
  document.addEventListener("keydown", (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const k = ev.key;
    if (!el.lb.hidden) {
      if (k === "Escape") lbClose();
      else if (k === "ArrowRight" || k === "l") { lb.i++; lbShow(); }
      else if (k === "ArrowLeft" || k === "h") { lb.i--; lbShow(); }
      else return;
      ev.preventDefault(); return;
    }
    if (!el.help.hidden) { if (k === "Escape" || k === "?" || k === "q") { helpClose(); ev.preventDefault(); } return; }
    if (typing(ev.target)) return;
    if (ev.target.closest && ev.target.closest(".thumb, .track, model-viewer") && (k === "Enter" || k === " " || k.startsWith("Arrow"))) return;

    const reading = document.activeElement !== el.list;
    const scroll = (dy) => el.reader.scrollBy({ top: dy, behavior: "smooth" });
    let handled = true;
    switch (k) {
      case "j": case "ArrowDown": if (reading) scroll(80); else move(1); break;
      case "k": case "ArrowUp": if (reading) scroll(-80); else move(-1); break;
      case " ": if (reading) scroll(ev.shiftKey ? -el.reader.clientHeight * 0.85 : el.reader.clientHeight * 0.85); else { zone = "reader"; open(shown[sel]); } break;
      case "Enter": case "l":
        if (reading) { handled = false; break; }
        zone = "reader"; open(shown[sel]); break;
      case "ArrowRight": case "n": step(1); break;
      case "ArrowLeft": case "p": step(-1); break;
      case "Escape": case "h": case "Backspace":
        if (matchMedia("(max-width: 760px)").matches) location.hash = "#/";
        el.filter.focus();
        break;
      case "g": if (reading) el.reader.scrollTo({ top: 0 }); else move(0, 0); break;
      case "G": if (reading) el.reader.scrollTo({ top: el.reader.scrollHeight }); else move(0, shown.length - 1); break;
      case "/": el.filter.focus(); el.filter.select(); break;
      case ":": el.cmd.focus(); break;
      case "?": helpOpen(); break;
      case "[": setSide(el.side.getBoundingClientRect().width - 30); break;
      case "]": setSide(el.side.getBoundingClientRect().width + 30); break;
      case "+": case "=": setScale((+prefs.scale || 1) + 0.05); break;
      case "-": setScale((+prefs.scale || 1) - 0.05); break;
      case "t": setTheme(); break;
      case "f": funke && funke.talk(); break;
      default:
        if (/^[0-9]$/.test(k) && entries[+k]) { zone = "reader"; open(entries[+k]); }
        else handled = false;
    }
    if (handled) ev.preventDefault();
  });

  // ------------------------------------------------------------ boot
  let funke = null;
  (async function boot() {
    await loadLang(prefs.lang || "en");
    $('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue("--term").trim();
    try { await loadEntries(); } catch (e) { el.reader.innerHTML = `<p>${Md.esc(t("noscript"))}</p>`; return; }
    renderList();
    await route();
    window.addEventListener("hashchange", route);
    funke = Funke.mount($("#funke"), { linesUrl: "assets/funke-lines.json", t });
    if (!prefs.greeted) { funke.say(t("funke.hello"), "dragon"); prefs.greeted = 1; save(); }
    clock(); setInterval(clock, 30000);
    el.reader.focus({ preventScroll: true });
  })();
})();
