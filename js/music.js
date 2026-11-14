// Compact, persistent soundtrack player for the devlog sidebar.
window.JamMusic = (() => {
  "use strict";
  // Albums group the playlist menu; playback runs straight through all of them.
  // Source file, tool, model and licence per track: tools/devlog/soundtrack_albums.py in the jam repo.
  const albums = [
    { id: "title", title: "Title Theme Variations", cover: "album-title-variations.webp", tracks: [
      { title: "The Long Night Breaks (Title DnB)", file: "assets/audio/mus-title-dnb.mp3", cover: "cover-the-long-night-breaks.webp" },
      { title: "Orbit of Ash (Title Orchestral II)", file: "assets/audio/mus-title-base-b.mp3", cover: "cover-orbit-of-ash.webp" },
      { title: "Choir Beyond the Eclipse (Title Angelcore)", file: "assets/audio/mus-title-angelcore.mp3", cover: "cover-choir-beyond-eclipse.webp" },
      { title: "The Last Astronomer (Title Orchestral I)", file: "assets/audio/mus-title-base-a.mp3", cover: "cover-the-last-astronomer.webp" },
      { title: "Before the Black Sun (Title Orchestral III)", file: "assets/audio/mus-title-base-c.mp3", cover: "cover-before-black-sun.webp" },
      { title: "Glass Comet (Title Nightcore)", file: "assets/audio/mus-title-nightcore.mp3", cover: "cover-glass-comet.webp" },
      { title: "Silver Overture (Title Nightcore Orchestral)", file: "assets/audio/mus-title-orch-silver.mp3", cover: "cover-silver-overture.webp" },
      { title: "Halftime Requiem (Title Classical DnB)", file: "assets/audio/mus-title-halftime-requiem.mp3", cover: "cover-halftime-requiem.webp" },
      { title: "The Longest Night (Own Score, Title A)", file: "assets/audio/mus-title-longest-night.mp3", cover: "cover-longest-night.webp" },
      { title: "Vigil (Own Score, Title B)", file: "assets/audio/mus-title-vigil.mp3", cover: "cover-vigil.webp" },
    ] },
    { id: "score", title: "In-Game Score: Day, Night, Combat", cover: "album-ingame-score.webp", tracks: [
      { title: "Sun Through Ruins (Day Ambient)", file: "assets/audio/mus-daylight-ambient.mp3", cover: "cover-sun-through-ruins.webp" },
      { title: "Morning on the Ramparts (Day Ambient II)", file: "assets/audio/mus-day-ramparts.mp3", cover: "cover-morning-ramparts.webp" },
      { title: "Herb Garden Hours (Day Ambient III)", file: "assets/audio/mus-day-herb-garden.mp3", cover: "cover-herb-garden.webp" },
      { title: "Dust in the Observatory (Day Piano)", file: "assets/audio/mus-day-piano.mp3", cover: "cover-dust-observatory.webp" },
      { title: "Nocturne Below (Night Ambient)", file: "assets/audio/mus-night-ambient.mp3", cover: "cover-nocturne-below.webp" },
      { title: "Lantern Watch (Night Ambient II)", file: "assets/audio/mus-night-lantern-watch.mp3", cover: "cover-lantern-watch.webp" },
      { title: "Tide Under Cold Stars (Night Ambient III)", file: "assets/audio/mus-night-cold-tide.mp3", cover: "cover-cold-tide.webp" },
      { title: "Cold Constellations (Night Piano)", file: "assets/audio/mus-night-piano.mp3", cover: "cover-cold-constellations.webp" },
      { title: "War Drums at the Gate (Combat I)", file: "assets/audio/mus-combat-war-drums.mp3", cover: "cover-war-drums.webp" },
      { title: "Broken Formation (Combat II)", file: "assets/audio/mus-combat-broken-formation.mp3", cover: "cover-broken-formation.webp" },
      { title: "Shadow Skirmish (Combat Phonk)", file: "assets/audio/mus-combat-shadow-skirmish.mp3", cover: "cover-shadow-skirmish.webp" },
      { title: "Drawn Steel (Own Score, Combat)", file: "assets/audio/mus-combat-drawn-steel.mp3", cover: "cover-drawn-steel.webp" },
    ] },
    { id: "sacred", title: "Sacred Places & Angel Flavours", cover: "album-sacred-flavours.webp", tracks: [
      { title: "Salt Shrine Chant (Sacred III)", file: "assets/audio/mus-sacred-salt-shrine.mp3", cover: "cover-salt-shrine.webp" },
      { title: "Candles in the Crypt (Sacred I)", file: "assets/audio/mus-sacred-crypt-candles.mp3", cover: "cover-crypt-candles.webp" },
      { title: "Halo at Noon (Day Angel, soft)", file: "assets/audio/mus-day-halo-noon.mp3", cover: "cover-halo-noon.webp" },
      { title: "Vespers for the Watch (Night Angel III)", file: "assets/audio/mus-night-vespers.mp3", cover: "cover-vespers-watch.webp" },
      { title: "Wings over the Keep (Night Angel I)", file: "assets/audio/mus-night-wings-keep.mp3", cover: "cover-wings-keep.webp" },
      { title: "Requiem of Glass (Night Angelcore)", file: "assets/audio/mus-night-requiem-glass.mp3", cover: "cover-requiem-glass.webp" },
      { title: "Grave Meridian (Night Phonk)", file: "assets/audio/mus-night-phonk.mp3", cover: "cover-grave-meridian.webp" },
      { title: "Bells in the Cave (Night Phonk, Classical)", file: "assets/audio/mus-night-cave-bells.mp3", cover: "cover-cave-bells.webp" },
    ] },
    { id: "dnbsym", title: "Night Experiments: DnB × Symphonic", cover: "album-dnb-symphonic.webp", tracks: [
      { title: "Iron Pulse (Combat DnB)", file: "assets/audio/mus-combat-dnb.mp3", cover: "cover-iron-pulse.webp" },
      { title: "Timpani Breakbeat (Classical DnB I)", file: "assets/audio/mus-dnb-timpani-breakbeat.mp3", cover: "cover-timpani-breakbeat.webp" },
      { title: "Col Legno Run (Classical DnB II)", file: "assets/audio/mus-dnb-col-legno.mp3", cover: "cover-col-legno.webp" },
      { title: "Last Stand Overture (Classical DnB III)", file: "assets/audio/mus-dnb-last-stand.mp3", cover: "cover-last-stand.webp" },
      { title: "Boss at the Bell Tower (Classical DnB IV)", file: "assets/audio/mus-dnb-bell-tower.mp3", cover: "cover-bell-tower.webp" },
      { title: "Tavern Pulse (Soft Day DnB)", file: "assets/audio/mus-dnb-tavern-pulse.mp3", cover: "cover-tavern-pulse.webp" },
      { title: "Sternwacht (Own Score, DnB × Orchestra)", file: "assets/audio/mus-dnb-sternwacht.mp3", cover: "cover-sternwacht.webp" },
      { title: "Sternwacht: Science Mix (Own Score)", file: "assets/audio/mus-dnb-sternwacht-science.mp3", cover: "cover-sternwacht-science.webp" },
      { title: "Gezeiten Journey (Own Score, Cutscene Arc)", file: "assets/audio/mus-dnb-gezeiten.mp3", cover: "cover-gezeiten.webp" },
    ] },
  ];
  const tracks = albums.flatMap((album, a) => album.tracks.map((track, n) => ({ ...track, album: a, no: n + 1 })));
  const FALLBACK = { "music.title": "jam soundtrack", "music.show": "Show playlist", "music.count": "{n} tracks · {a} albums", "music.albumCount": "{n} tracks" };
  const fill = (s, vars) => Object.entries(vars || {}).reduce((acc, [k, v]) => acc.replace("{" + k + "}", v), s);
  let t = (key, vars) => fill(FALLBACK[key] || "", vars);
  let relabel = () => {};
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const fmt = (s) => Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
  // v3 stores the file; v2 stored the index into the old flat list of twelve.
  const OLD_ORDER = ["title-dnb", "title-base-b", "title-angelcore", "title-base-a", "title-base-c", "title-nightcore", "combat-dnb", "night-phonk", "night-piano", "day-piano", "night-ambient", "daylight-ambient"];
  const rememberedTrack = () => {
    try {
      const old = OLD_ORDER[+(localStorage.getItem("devlog.music.track.v2") || 0)];
      const file = localStorage.getItem("devlog.music.track.v3") || (old ? `assets/audio/mus-${old}.mp3` : "");
      return Math.max(0, tracks.findIndex((track) => track.file === file));
    } catch (_) { return 0; }
  };
  const rememberTrack = (index) => { try { localStorage.setItem("devlog.music.track.v3", tracks[index].file); } catch (_) { /* storage is optional */ } };

  function mount(root, options) {
    if (!root) return;
    if (typeof options?.t === "function") {
      const lookup = options.t;  // the site's i18n: returns the key itself when a string is missing
      t = (key, vars) => { const s = lookup(key, vars); return s && s !== key ? s : fill(FALLBACK[key] || "", vars); };
    }
    const audio = root.querySelector("audio"), now = root.querySelector("#music-now"), cover = root.querySelector("#music-cover"), wave = root.querySelector("#music-wave"), play = root.querySelector("#music-play");
    const prev = root.querySelector("#music-prev"), next = root.querySelector("#music-next"), time = root.querySelector("#music-time");
    const progress = root.querySelector("#music-progress"), toggle = root.querySelector("#music-list"), menu = root.querySelector("#music-menu");
    const heading = root.querySelector(".music-head > span");
    const playerId = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const playerChannel = "BroadcastChannel" in window ? new BroadcastChannel("epic-jam-soundtrack") : null;
    let index = Math.max(0, Math.min(tracks.length - 1, rememberedTrack()));
    let bands = { highs: [], mids: [], bass: [] }, waveToken = 0;
    const markCurrent = () => menu.querySelectorAll("button[data-track]").forEach((b) => b.classList.toggle("on", +b.dataset.track === index));
    const renderMenu = () => {
      menu.innerHTML = albums.map((album, a) => {
        const first = tracks.findIndex((track) => track.album === a);
        const note = t(`music.album.${album.id}`);
        const rows = tracks.map((track, i) => track.album !== a ? "" : `<button type="button" data-track="${i}"><span>${String(track.no).padStart(2, "0")}</span><img src="assets/img/music/${track.cover}" alt="" loading="lazy">${esc(track.title)}</button>`).join("");
        return `<div class="music-album" role="group" aria-label="${esc(album.title)}">`
          + `<button type="button" class="music-album-head" data-album-start="${first}"><img src="assets/img/music/${album.cover}" alt="" loading="lazy">`
          + `<span><b>${esc(album.title)}</b><small>${note ? `${esc(note)} · ` : ""}${esc(t("music.albumCount", { n: album.tracks.length }))}</small></span></button>${rows}</div>`;
      }).join("");
      markCurrent();
    };
    relabel = () => {
      if (heading) heading.textContent = t("music.title");
      toggle.textContent = t("music.count", { n: tracks.length, a: albums.length });
      toggle.setAttribute("aria-label", t("music.show"));
      renderMenu();
    };
    const showTitle = (title) => {
      const first = document.createElement("span"), repeat = document.createElement("span");
      first.textContent = title; repeat.textContent = title; repeat.setAttribute("aria-hidden", "true");
      now.replaceChildren(first, repeat);
    };
    const drawWave = () => {
      const ctx = wave.getContext("2d"), css = getComputedStyle(document.documentElement), w = wave.width, h = wave.height;
      ctx.clearRect(0, 0, w, h);
      if (!bands.bass.length) return;
      const center = Math.floor(h / 2);
      const colors = {
        bass: css.getPropertyValue("--violet").trim(),
        mids: css.getPropertyValue("--blue").trim(),
        highs: css.getPropertyValue("--pink").trim()
      };
      bands.bass.forEach((_, i) => {
        const x = i * 2;
        const sizes = {
          bass: Math.round(bands.bass[i] * 5),
          mids: Math.round(bands.mids[i] * 7),
          highs: Math.round(bands.highs[i] * 6)
        };
        let edge = 0;
        ["bass", "mids", "highs"].forEach((band) => {
          const size = sizes[band];
          if (!size) return;
          ctx.fillStyle = colors[band];
          ctx.globalAlpha = 1;
          ctx.fillRect(x, center - edge - size, 1, size);
          ctx.fillRect(x, center + edge, 1, size);
          edge += size;
        });
        ctx.globalAlpha = 1;
        if (!edge) { ctx.fillStyle = colors.mids; ctx.fillRect(x, center, 1, 1); }
      });
    };
    const loadWave = async (file) => {
      const token = ++waveToken; bands = { highs: [], mids: [], bass: [] }; drawWave();
      try {
        const encoded = await (await fetch(file)).arrayBuffer();
        const decoder = new OfflineAudioContext(1, 1, 44100);
        const decoded = await decoder.decodeAudioData(encoded);
        const samples = decoded.getChannelData(0), count = 140, block = Math.floor(samples.length / count);
        const next = { highs: [], mids: [], bass: [] }, loudest = { highs: 0, mids: 0, bass: 0 };
        const bassAlpha = 1 - Math.exp(-2 * Math.PI * 250 / decoded.sampleRate);
        const midsAlpha = 1 - Math.exp(-2 * Math.PI * 4000 / decoded.sampleRate);
        for (let i = 0; i < count; i++) {
          const windowSize = Math.min(block, 3072), start = i * block + Math.max(0, Math.floor((block - windowSize) / 2));
          let lowBass = samples[start] || 0, lowMids = lowBass, bassEnergy = 0, midEnergy = 0, highEnergy = 0;
          for (let j = start; j < Math.min(samples.length, start + windowSize); j++) {
            const sample = samples[j];
            lowBass += bassAlpha * (sample - lowBass);
            lowMids += midsAlpha * (sample - lowMids);
            const mid = lowMids - lowBass, high = sample - lowMids;
            bassEnergy += lowBass * lowBass; midEnergy += mid * mid; highEnergy += high * high;
          }
          const values = {
            bass: Math.sqrt(bassEnergy / windowSize),
            mids: Math.sqrt(midEnergy / windowSize),
            highs: Math.sqrt(highEnergy / windowSize)
          };
          Object.keys(values).forEach((band) => {
            next[band].push(values[band]); loudest[band] = Math.max(loudest[band], values[band]);
          });
        }
        if (token !== waveToken) return;
        bands = Object.fromEntries(Object.entries(next).map(([band, values]) => [band, values.map((value) => loudest[band] ? Math.pow(value / loudest[band], 1.08) : 0)]));
        drawWave();
      } catch (_) { if (token === waveToken) drawWave(); }
    };
    const sync = () => {
      const track = tracks[index];
      if (now.firstElementChild?.textContent !== track.title) showTitle(track.title);
      cover.src = `assets/img/music/${track.cover}`;
      root.classList.toggle("playing", !audio.paused);
      play.textContent = audio.paused ? "▶" : "Ⅱ";
      play.setAttribute("aria-pressed", String(!audio.paused));
      play.setAttribute("aria-label", `${audio.paused ? "Play" : "Pause"} ${track.title}`);
      markCurrent();
    };
    const load = (i, start) => {
      index = (i + tracks.length) % tracks.length;
      rememberTrack(index);
      audio.pause();
      audio.currentTime = 0;
      audio.src = tracks[index].file;
      audio.load(); loadWave(tracks[index].file); sync();
      if (start) audio.play().catch(() => sync());
    };
    const step = (delta) => load(index + delta, !audio.paused || audio.currentTime > 0);
    play.addEventListener("click", () => audio.paused ? audio.play().catch(() => {}) : audio.pause());
    prev.addEventListener("click", () => step(-1)); next.addEventListener("click", () => step(1));
    audio.addEventListener("play", () => { playerChannel?.postMessage({ type: "playing", playerId }); sync(); });
    audio.addEventListener("pause", sync);
    audio.addEventListener("ended", () => load(index + 1, true));
    playerChannel?.addEventListener("message", (event) => {
      if (event.data?.type === "playing" && event.data.playerId !== playerId) audio.pause();
    });
    window.addEventListener("pagehide", () => { audio.pause(); playerChannel?.close(); }, { once: true });
    audio.addEventListener("timeupdate", () => {
      time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      progress.value = audio.duration ? Math.round(audio.currentTime / audio.duration * 1000) : 0;
      drawWave();
    });
    progress.addEventListener("input", () => { if (audio.duration) audio.currentTime = audio.duration * progress.value / 1000; });
    toggle.addEventListener("click", () => {
      menu.hidden = !menu.hidden; toggle.setAttribute("aria-expanded", String(!menu.hidden));
      if (!menu.hidden) menu.querySelector("button.on")?.scrollIntoView({ block: "nearest" });
    });
    menu.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-track], button[data-album-start]");
      if (!button) return;
      load(+(button.dataset.track ?? button.dataset.albumStart), true);
      menu.hidden = true; toggle.setAttribute("aria-expanded", "false");
    });
    relabel();
    load(index, false);
  }
  return { mount, relabel: () => relabel(), albums };
})();
