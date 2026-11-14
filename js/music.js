// Compact, persistent soundtrack player for the devlog sidebar.
window.JamMusic = (() => {
  "use strict";
  const tracks = [
    { title: "The Long Night Breaks (Title DnB)", file: "assets/audio/mus-title-dnb.mp3", cover: "cover-the-long-night-breaks.webp" },
    { title: "Orbit of Ash (Title Orchestral II)", file: "assets/audio/mus-title-base-b.mp3", cover: "cover-orbit-of-ash.webp" },
    { title: "Choir Beyond the Eclipse (Title Angelcore)", file: "assets/audio/mus-title-angelcore.mp3", cover: "cover-choir-beyond-eclipse.webp" },
    { title: "The Last Astronomer (Title Orchestral I)", file: "assets/audio/mus-title-base-a.mp3", cover: "cover-the-last-astronomer.webp" },
    { title: "Before the Black Sun (Title Orchestral III)", file: "assets/audio/mus-title-base-c.mp3", cover: "cover-before-black-sun.webp" },
    { title: "Glass Comet (Title Nightcore)", file: "assets/audio/mus-title-nightcore.mp3", cover: "cover-glass-comet.webp" },
    { title: "Iron Pulse (Combat DnB)", file: "assets/audio/mus-combat-dnb.mp3", cover: "cover-iron-pulse.webp" },
    { title: "Grave Meridian (Night Phonk)", file: "assets/audio/mus-night-phonk.mp3", cover: "cover-grave-meridian.webp" },
    { title: "Cold Constellations (Night Piano)", file: "assets/audio/mus-night-piano.mp3", cover: "cover-cold-constellations.webp" },
    { title: "Dust in the Observatory (Day Piano)", file: "assets/audio/mus-day-piano.mp3", cover: "cover-dust-observatory.webp" },
    { title: "Nocturne Below (Night Ambient)", file: "assets/audio/mus-night-ambient.mp3", cover: "cover-nocturne-below.webp" },
    { title: "Sun Through Ruins (Day Ambient)", file: "assets/audio/mus-daylight-ambient.mp3", cover: "cover-sun-through-ruins.webp" },
  ];
  const fmt = (s) => Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
  const rememberedTrack = () => { try { return +(localStorage.getItem("devlog.music.track.v2") || 0); } catch (_) { return 0; } };
  const rememberTrack = (index) => { try { localStorage.setItem("devlog.music.track.v2", String(index)); } catch (_) { /* storage is optional */ } };

  function mount(root) {
    if (!root) return;
    const audio = root.querySelector("audio"), now = root.querySelector("#music-now"), cover = root.querySelector("#music-cover"), wave = root.querySelector("#music-wave"), play = root.querySelector("#music-play");
    const prev = root.querySelector("#music-prev"), next = root.querySelector("#music-next"), time = root.querySelector("#music-time");
    const progress = root.querySelector("#music-progress"), toggle = root.querySelector("#music-list"), menu = root.querySelector("#music-menu");
    const playerId = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const playerChannel = "BroadcastChannel" in window ? new BroadcastChannel("epic-jam-soundtrack") : null;
    let index = Math.max(0, Math.min(tracks.length - 1, rememberedTrack()));
    let bands = { highs: [], mids: [], bass: [] }, waveToken = 0;
    menu.innerHTML = tracks.map((track, i) => `<button type="button" data-track="${i}"><span>${String(i + 1).padStart(2, "0")}</span><img src="assets/img/music/${track.cover}" alt="">${track.title}</button>`).join("");
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
      menu.querySelectorAll("button").forEach((b, i) => b.classList.toggle("on", i === index));
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
    toggle.addEventListener("click", () => { menu.hidden = !menu.hidden; toggle.setAttribute("aria-expanded", String(!menu.hidden)); });
    menu.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-track]");
      if (button) { load(+button.dataset.track, true); menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); }
    });
    load(index, false);
  }
  return { mount };
})();
