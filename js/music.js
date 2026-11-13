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
    const audio = root.querySelector("audio"), now = root.querySelector("#music-now"), cover = root.querySelector("#music-cover"), play = root.querySelector("#music-play");
    const prev = root.querySelector("#music-prev"), next = root.querySelector("#music-next"), time = root.querySelector("#music-time");
    const progress = root.querySelector("#music-progress"), toggle = root.querySelector("#music-list"), menu = root.querySelector("#music-menu");
    let index = Math.max(0, Math.min(tracks.length - 1, rememberedTrack()));
    menu.innerHTML = tracks.map((track, i) => `<button type="button" data-track="${i}"><span>${String(i + 1).padStart(2, "0")}</span><img src="assets/img/music/${track.cover}" alt="">${track.title}</button>`).join("");
    const sync = () => {
      const track = tracks[index];
      now.textContent = track.title;
      cover.src = `assets/img/music/${track.cover}`;
      play.textContent = audio.paused ? "▶" : "Ⅱ";
      play.setAttribute("aria-pressed", String(!audio.paused));
      play.setAttribute("aria-label", `${audio.paused ? "Play" : "Pause"} ${track.title}`);
      menu.querySelectorAll("button").forEach((b, i) => b.classList.toggle("on", i === index));
    };
    const load = (i, start) => {
      index = (i + tracks.length) % tracks.length;
      rememberTrack(index);
      audio.src = tracks[index].file;
      audio.load(); sync();
      if (start) audio.play().catch(() => sync());
    };
    const step = (delta) => load(index + delta, !audio.paused || audio.currentTime > 0);
    play.addEventListener("click", () => audio.paused ? audio.play().catch(() => {}) : audio.pause());
    prev.addEventListener("click", () => step(-1)); next.addEventListener("click", () => step(1));
    audio.addEventListener("play", sync); audio.addEventListener("pause", sync); audio.addEventListener("ended", () => load(index + 1, true));
    audio.addEventListener("timeupdate", () => {
      time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
      progress.value = audio.duration ? Math.round(audio.currentTime / audio.duration * 1000) : 0;
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
