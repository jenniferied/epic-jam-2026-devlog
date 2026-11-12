// Funke, the block-graphics dragon from tools/jam-dragon/dragon.py, ported to a canvas.
// Same figure, colour keys, blink and wing-beat timing; the sky follows Berlin time of day.
(function (global) {
  "use strict";

  const FPS = 4;
  const CW = 6, CH = 12; // one terminal cell in canvas pixels; a cell is 2x2 "quad" pixels

  const k = (r, c) => r + "," + c;
  const range = (a, b) => Array.from({ length: b - a }, (_, i) => a + i);

  const HEAD = {
    rows: ["   █     █   ", "  ▄█▄▄▄▄▄█▄  ", " ▟█████████▙ ", " ▐█████████▌ ", " ▐█████████▌ ", " ▐█████████▌ ", " ▝▀▀▀▀▀▀▀▀▀▘ "],
    keys: { [k(0, 3)]: "H", [k(0, 9)]: "H", [k(1, 3)]: "H", [k(1, 9)]: "H", [k(1, 6)]: "S", [k(2, 6)]: "S" },
    eyes: [[3, 3], [3, 4], [3, 8], [3, 9]], snout: range(4, 9).map((c) => [5, c]),
    nostrils: [[4, 5], [4, 7]], noseBack: "F", mouth: [5, 6],
    wings: [[3, 0, ["▄", "█", "▀"]], [3, 12, ["▄", "█", "▀"]]], flame: [5, 13], zz: [0, 14],
  };
  const bodyKeys = {};
  for (const r of [0, 1]) for (const c of [6, 14]) bodyKeys[k(r, c)] = "H";
  Object.assign(bodyKeys, { [k(1, 10)]: "S", [k(2, 10)]: "S", [k(6, 4)]: "W", [k(6, 16)]: "W" });
  for (const r of [7, 8, 9]) for (const c of range(8, 13)) bodyKeys[k(r, c)] = "A";
  for (const c of [9, 10, 11]) bodyKeys[k(10, c)] = "A";
  for (const c of range(0, 21)) bodyKeys[k(11, c)] = "H";
  const BODY = {
    rows: [
      "      █       █      ",
      "     ▄█▄▄▄█▄▄▄█▄     ",
      "    ▟███████████▙    ",
      "    ▐███████████▌    ",
      "    ▐███████████▌    ",
      "    ▝███████████▘    ",
      "    ▄▟█████████▙▄    ",
      "     ▐█████████▌     ",
      "     ▐█████████▌     ",
      "     ▐█████████▌▄▄▄▄█",
      "    ▐███▌▀▀▀▐███▌    ",
      "    ▀ ▀ ▀   ▀ ▀ ▀    ",
    ],
    keys: bodyKeys,
    eyes: [[3, 7], [3, 8], [3, 12], [3, 13]], snout: [4, 5].flatMap((r) => range(8, 13).map((c) => [r, c])),
    nostrils: [[4, 9], [4, 11]], noseBack: "A", mouth: [5, 10],
    wings: [[5, 0, [" ▄▄ ", "▟██▙", "▝███", " ▝▀▘"]], [5, 17, [" ▄▄ ", "▟██▙", "███▘", "▝▀▘ "]]],
    tailTip: [8, 20], flame: [4, 17], zz: [3, 18],
  };
  const COLOR = {
    F: [86, 196, 150], f: [52, 150, 120], H: [255, 236, 190], S: [255, 184, 108],
    A: [250, 232, 170], T: [30, 32, 50], W: [255, 121, 150], O: [255, 150, 60], Y: [255, 230, 120],
  };
  const MOODS = {
    dawn: ["Dawn", [70, 70, 140], [255, 170, 120], [70, 110, 80], [1, 0.93, 0.9]],
    day: ["Day", [70, 150, 235], [170, 215, 250], [90, 180, 90], [1, 1, 1]],
    golden: ["Golden hour", [120, 90, 160], [255, 170, 90], [110, 120, 60], [1, 0.9, 0.8]],
    evening: ["Evening", [40, 30, 80], [150, 80, 150], [50, 70, 70], [0.85, 0.78, 0.95]],
    night: ["Night", [8, 10, 30], [30, 35, 80], [25, 45, 50], [0.62, 0.66, 0.85]],
    late: ["Late night", [4, 5, 18], [18, 20, 50], [18, 32, 40], [0.55, 0.58, 0.8]],
  };
  const SUNRISE = 7.5, SUNSET = 16.5;
  // quadrant masks: UL, UR, LL, LR
  const QUADS = {
    "█": [1, 1, 1, 1], "▀": [1, 1, 0, 0], "▄": [0, 0, 1, 1], "▌": [1, 0, 1, 0], "▐": [0, 1, 0, 1],
    "▘": [1, 0, 0, 0], "▝": [0, 1, 0, 0], "▖": [0, 0, 1, 0], "▗": [0, 0, 0, 1],
    "▟": [0, 1, 1, 1], "▙": [1, 0, 1, 1], "▛": [1, 1, 1, 0], "▜": [1, 1, 0, 1], " ": [0, 0, 0, 0],
  };

  function berlinNow() {
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const get = (t) => +p.find((x) => x.type === t).value;
    return { hour: get("hour"), minute: get("minute"), date: new Date() };
  }
  function moodOf(now) {
    const h = now.hour + now.minute / 60;
    for (const [limit, mood] of [[1, "night"], [5, "late"], [6.5, "night"], [9, "dawn"], [15.5, "day"], [17.5, "golden"], [22, "evening"]]) if (h < limit) return mood;
    return "night";
  }
  function moonPhase(date) {
    const ref = Date.UTC(2000, 0, 6, 18, 14);
    return (((date - ref) / 86400000 / 29.530588853) % 1 + 1) % 1;
  }
  const mix = (a, b, t) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
  const rnd = (...key) => { const x = Math.sin(key.reduce((s, v, i) => s + v * (i + 1) * 12.9898, 78.233)) * 43758.5453; return x - Math.floor(x); };

  function figureCells(fig, tick, sleepy, flame) {
    const cells = new Map();
    const up = !sleepy && tick % (FPS * 3) < 2 ? 1 : 0;
    for (const [r0, c0, shape] of fig.wings) shape.forEach((line, r) => [...line].forEach((ch, c) => { if (ch !== " ") cells.set(k(r0 - up + r, c0 + c), [ch, "W", null]); }));
    fig.rows.forEach((line, r) => [...line].forEach((ch, c) => { if (ch !== " ") cells.set(k(r, c), [ch, fig.keys[k(r, c)] || "F", null]); }));
    for (const [r, c] of fig.snout) cells.set(k(r, c), ["█", "A", null]);
    for (const [r, c] of fig.nostrils) cells.set(k(r, c), ["▄", "f", fig.noseBack]);
    cells.set(k(...fig.mouth), ["▄", "T", "A"]);
    const blink = tick % 19 === 0 || tick % 47 === 1;
    for (const [r, c] of fig.eyes) cells.set(k(r, c), [sleepy || blink ? "▄" : "█", "T", "F"]);
    if (fig.tailTip) cells.set(k(...fig.tailTip), [tick % (FPS * 5) < 2 ? "█" : "▄", "S", null]);
    if (flame) {
      const [r, c] = fig.flame;
      [["▄", "O"], ["█", "Y"], ["▀", "O"]].slice(0, flame).forEach(([ch, key], i) => cells.set(k(r, c + i), [ch, key, null]));
    }
    return cells;
  }

  function scene(width, rows, now, tick) {
    const mood = moodOf(now);
    const [, top, bottom, ground, tint] = MOODS[mood];
    const hour = now.hour + now.minute / 60;
    const sky = rows - 1;
    const grid = [];
    for (let y = 0; y < rows; y++) {
      if (y >= sky) { grid.push(Array.from({ length: width }, () => [" ", ground, ground])); continue; }
      const a = mix(top, bottom, (2 * y) / Math.max(1, 2 * sky - 1)), b = mix(top, bottom, (2 * y + 1) / Math.max(1, 2 * sky - 1));
      grid.push(Array.from({ length: width }, () => ["▀", a, b]));
    }
    const put = (y, x, ch, colour, back) => { if (y >= 0 && y < rows && x >= 0 && x < width) grid[y][x] = [ch, colour, back || grid[y][x][2]]; };
    const pix = (x, py, colour, alpha = 1) => {
      x = Math.floor(x); py = Math.floor(py);
      if (x < 0 || x >= width || py < 0 || py >= 2 * sky) return;
      const cell = grid[py >> 1][x];
      if (cell[0] !== "▀") return;
      grid[py >> 1][x] = py % 2 === 0 ? ["▀", mix(cell[1], colour, alpha), cell[2]] : ["▀", cell[1], mix(cell[2], colour, alpha)];
    };
    const disc = (cx, cy, size, colourAt) => {
      const r = size / 2;
      for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
        const dx = i + 0.5 - r, dy = j + 0.5 - r;
        if (dx * dx + dy * dy <= r * r) pix(cx + i, cy + j, ...colourAt(dx, Math.sqrt(Math.max(0, r * r - dy * dy))));
      }
    };
    const arc = (frac, size) => { frac = Math.min(1, Math.max(0, frac)); return [frac * Math.max(0, width - size), (2 * sky - size) * (1 - 0.85 * Math.sin(Math.PI * frac))]; };

    if (["evening", "night", "late"].includes(mood)) {
      const drift = Math.floor(tick / (FPS * 40));
      const n = Math.floor((width * sky) / (mood === "evening" ? 16 : 6));
      for (let i = 0; i < n; i++) {
        const tw = i % 3 === 0 ? 0.35 + 0.65 * Math.abs(Math.sin(tick / (FPS * 2) + i * 1.7)) : 0.8;
        pix((rnd(i, 1) * width + drift) % width, rnd(i, 2) * 2 * sky, [235, 238, 255], tw * (0.5 + 0.5 * rnd(i, 3)));
      }
      const t = tick % (FPS * 75);
      if (t < 5 && width >= 16) {
        const sx = 4 + rnd(Math.floor(tick / (FPS * 75))) * (width - 14);
        for (let q = 0; q < 3; q++) pix(sx + 2 * (t - q), 1 + t - q, [255, 255, 235], 1 - 0.35 * q);
      }
      const phase = moonPhase(now.date), edge = Math.cos(2 * Math.PI * phase);
      const [mx, my] = arc((((hour - 17) % 24) + 24) % 24 / 14.5, 6);
      disc(mx, my, 6, (dx, half) => {
        const lit = phase < 0.5 ? dx > half * edge : dx < -half * edge;
        return lit ? [[244, 240, 214], 1] : [[150, 160, 200], 0.16];
      });
    } else {
      const sun = mood === "day" ? [255, 232, 130] : [255, 214, 140];
      const [sx, sy] = arc((hour - SUNRISE) / (SUNSET - SUNRISE), 4);
      disc(sx, sy, 4, () => [sun, 1]);
      const cloud = mood === "day" ? [245, 248, 255] : [255, 205, 185];
      [[1, 9, "▄██▄"], [3, 14, "▄███▄▄"]].slice(0, sky >= 6 ? 2 : 1).forEach(([row, speed, shape], q) => {
        const cx = ((Math.floor(tick / speed) + q * Math.floor(width / 2)) % (width + 10)) - 8;
        [...shape].forEach((ch, i) => { if (cx + i >= 0 && cx + i < width && row < sky) put(row, cx + i, ch, cloud, grid[row][cx + i][1]); });
      });
    }

    const sleepy = mood === "night" || mood === "late";
    const fig = rows >= BODY.rows.length + 1 && width >= BODY.rows[0].length ? BODY : HEAD;
    const t = tick % (FPS * 21);
    const cells = figureCells(fig, tick, sleepy, sleepy || t >= FPS ? 0 : Math.min(3, 1 + t));
    const shade = (key) => (key === "O" || key === "Y" ? COLOR[key] : COLOR[key].map((v, i) => Math.round(v * tint[i])));
    const fh = fig.rows.length, fw = [...fig.rows[0]].length;
    const y0 = sky - fh + (fig === BODY ? 1 : 0);
    const x0 = Math.max(0, Math.floor((width - fw) / 2));
    for (const [key, [ch, ck, back]] of cells) {
      const [r, c] = key.split(",").map(Number);
      put(y0 + r, x0 + c, ch, shade(ck), back ? shade(back) : null);
    }
    if (mood === "night") {
      const [zr, zc] = fig.zz;
      [..."zZ"].forEach((ch, i) => { if (Math.floor(tick / FPS) % 4 > i) put(y0 + zr - i, x0 + zc + i, ch, [200, 205, 240]); });
    }
    return { grid, mood };
  }

  const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;

  function draw(ctx, grid) {
    grid.forEach((row, y) => row.forEach(([ch, fg, bg], x) => {
      const px = x * CW, py = y * CH;
      ctx.fillStyle = rgb(bg);
      ctx.fillRect(px, py, CW, CH);
      const q = QUADS[ch];
      if (q) {
        ctx.fillStyle = rgb(fg);
        const hw = CW / 2, hh = CH / 2;
        if (q[0]) ctx.fillRect(px, py, hw, hh);
        if (q[1]) ctx.fillRect(px + hw, py, hw, hh);
        if (q[2]) ctx.fillRect(px, py + hh, hw, hh);
        if (q[3]) ctx.fillRect(px + hw, py + hh, hw, hh);
      } else {
        ctx.fillStyle = rgb(fg);
        ctx.font = `${CH}px VT323, monospace`;
        ctx.textBaseline = "top";
        ctx.fillText(ch, px, py);
      }
    }));
  }

  // ------------------------------------------------------------ lines
  const CAT_COLOR = { motivation: "#ff79c6", dragon: "#50fa7b", design: "#8be9fd", jam: "#ffb86c", unreal: "#bd93f9", break: "#f1fa8c" };

  function jamPhase(date) {
    const start = Date.parse("2026-11-12T06:00:00+01:00"), end = Date.parse("2026-11-16T02:59:00+01:00");
    const t = date.getTime();
    if (t < start) return ["pre", start - t];
    if (t >= end) return ["done", 0];
    return [end - t <= 12 * 3600e3 ? "final" : "jam", end - t];
  }
  function dur(ms) {
    const m = Math.max(0, Math.round(ms / 60000)), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60);
    return d ? `${d}d ${h}h` : h ? `${h}h ${m % 60}m` : `${m % 60}m`;
  }

  function mount(root, opts) {
    const canvas = root.querySelector("canvas");
    const bubble = root.querySelector(".funke-bubble");
    const status = root.querySelector(".funke-status");
    const ctx = canvas.getContext("2d");
    const reduce = global.matchMedia("(prefers-reduced-motion: reduce)");
    let items = [], recent = [], tick = 0, nextLine = 0, timer = null;

    fetch(opts.linesUrl).then((r) => r.json()).then((data) => {
      for (const [cat, list] of Object.entries(data)) for (const e of list) items.push({ ...(typeof e === "string" ? { t: e } : e), cat });
      say();
    }).catch(() => { items = [{ t: "Core loop first.", cat: "design" }]; say(); });

    function pick() {
      const now = berlinNow(), mood = moodOf(now), [phase] = jamPhase(now.date);
      const ok = (e, key, v) => !(key in e) || e[key].includes(v);
      const pool = items.filter((e) => ok(e, "mood", mood) && ok(e, "phase", phase));
      const fresh = pool.filter((e) => !recent.includes(e.t));
      const list = fresh.length ? fresh : pool.length ? pool : items;
      const weights = list.map((e) => ("mood" in e || "phase" in e ? 4 : 1) * (mood === "late" && e.mood && e.mood[0] === "late" ? 3 : 1));
      let r = Math.random() * weights.reduce((a, b) => a + b, 0);
      const e = list.find((_, i) => (r -= weights[i]) < 0) || list[0];
      recent.push(e.t); if (recent.length > items.length / 2) recent.shift();
      return e;
    }
    function say(text, cat) {
      if (!items.length && !text) return;
      const e = text ? { t: text, cat: cat || "dragon" } : pick();
      const [, left] = jamPhase(new Date());
      bubble.textContent = e.t.replace("{left}", dur(left));
      bubble.style.setProperty("--cat", CAT_COLOR[e.cat] || "#ccc");
      nextLine = Date.now() + 45000 + Math.random() * 45000;
    }
    function frame() {
      const cols = Math.max(14, Math.floor(root.clientWidth / CW));
      const rows = cols >= 22 ? 13 : 8;
      if (canvas.width !== cols * CW || canvas.height !== rows * CH) { canvas.width = cols * CW; canvas.height = rows * CH; }
      const now = berlinNow();
      const { grid, mood } = scene(cols, rows, now, tick);
      draw(ctx, grid);
      const [phase, left] = jamPhase(now.date);
      const when = opts.t("funke.phase." + phase).replace("{left}", dur(left));
      status.innerHTML = `<b>Funke</b><span>${opts.t("funke.mood." + mood)} ${String(now.hour).padStart(2, "0")}:${String(now.minute).padStart(2, "0")}</span><span class="when when-${phase}">${when}</span>`;
      if (Date.now() >= nextLine && items.length) say();
      tick++;
    }
    function loop() { frame(); timer = setTimeout(loop, reduce.matches ? 15000 : 1000 / FPS); }
    canvas.addEventListener("click", () => say());
    loop();
    return { say, talk: () => say(), stop: () => clearTimeout(timer) };
  }

  global.Funke = { mount, HEAD, COLOR, QUADS };
})(window);
