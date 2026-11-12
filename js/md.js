// Minimal markdown renderer for devlog entries, no dependencies.
// Extras on top of plain markdown:
//   «text»            inline verbatim quote from the author's dictation (rendered as <q class="voice">)
//   >> text           block of verbatim dictation
//   ```specs          "# Section" lines and "key: value" lines -> spec sheet
//   ```timeline       "when | text" lines -> vertical timeline
//   ```log            "HH:MM | tag | text" lines -> terminal log
//   ```gallery        "src | caption | alt | w x h" lines; src "placeholder" -> labelled empty frame
//   ```chat           "you: ..." / "ai: ..." lines -> chat transcript
//   ```recap          disclosure box shown at the top of an entry
//   ```todo           "[ ] item" / "[x] item" lines -> checklist (used by draft entries)
//   ```model          "src.glb | caption | alt | poster.jpg" -> interactive 3D viewer, loaded on demand
//   ```chart          "spec.vl.json | caption" -> numbered figure rendered with Vega-Lite, loaded on demand
//   ```tracks         "src.mp3 | title | m:ss" lines -> soundtrack player; src "placeholder" -> pending track
(function (global) {
  "use strict";

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function inline(s) {
    const codes = [];
    s = esc(s).replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
    s = s
      .replace(/«([^»]+)»/g, '<q class="voice">$1</q>')
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy" decoding="async">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, h) => {
        const ext = /^https?:/.test(h);
        return `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}>${t}${ext ? '<span class="ext" aria-hidden="true">↗</span>' : ""}</a>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, "$1<em>$2</em>")
      .replace(/~~([^~]+)~~/g, "<del>$1</del>")
      .replace(/ -- /g, " – ");
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
  }

  const split = (line) => line.split("|").map((p) => p.trim());

  const blocks = {
    specs(lines) {
      let html = '<div class="specs" role="table">';
      for (const l of lines) {
        if (!l.trim()) continue;
        if (l.startsWith("#")) { html += `<div class="specs-head" role="row"><span role="columnheader">${inline(l.replace(/^#+\s*/, ""))}</span></div>`; continue; }
        const i = l.indexOf(":");
        const k = l.slice(0, i).trim(), v = l.slice(i + 1).trim();
        html += `<div class="specs-row" role="row"><span class="k" role="rowheader">${inline(k)}</span><span class="dots" aria-hidden="true"></span><span class="v" role="cell">${inline(v)}</span></div>`;
      }
      return html + "</div>";
    },
    timeline(lines) {
      return '<ol class="timeline">' + lines.filter((l) => l.trim()).map((l) => {
        const [when, ...rest] = split(l);
        return `<li><span class="when">${inline(when)}</span><span class="what">${inline(rest.join(" | "))}</span></li>`;
      }).join("") + "</ol>";
    },
    log(lines) {
      return '<div class="log" role="list">' + lines.filter((l) => l.trim()).map((l) => {
        const [t, tag, ...rest] = split(l);
        const cls = (tag || "").toLowerCase().replace(/[^a-z]/g, "");
        return `<div class="log-line" role="listitem"><time>${esc(t)}</time><span class="tag tag-${cls}">${esc(tag || "")}</span><span class="msg">${inline(rest.join(" | "))}</span></div>`;
      }).join("") + "</div>";
    },
    gallery(lines, ctx) {
      const items = lines.filter((l) => l.trim()).map((l) => {
        const [src, caption = "", alt = "", size = ""] = split(l);
        const [w, h] = size.split(/\s*x\s*/).map(Number);
        return { src, caption, alt: alt || caption, w: w || 1600, h: h || 900 };
      });
      const id = ctx.galleries.length;
      ctx.galleries.push(items);
      return `<div class="gallery g${items.length === 4 ? 2 : Math.min(items.length, 3)}">` + items.map((it, i) => {
        const fig = it.src === "placeholder"
          ? `<span class="ph" style="aspect-ratio:${it.w}/${it.h}"><span class="ph-label">[ photo pending ]</span><span class="ph-cap">${esc(it.alt)}</span></span>`
          : `<img src="${esc(it.src)}" alt="${esc(it.alt)}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">`;
        return `<figure><button class="thumb" type="button" data-gallery="${id}" data-index="${i}" aria-label="${esc(it.alt)}">${fig}</button>${it.caption ? `<figcaption>${inline(it.caption)}</figcaption>` : ""}</figure>`;
      }).join("") + "</div>";
    },
    chat(lines) {
      return '<div class="chat">' + lines.filter((l) => l.trim()).map((l) => {
        const m = l.match(/^(\w+):\s*(.*)$/);
        const who = m ? m[1].toLowerCase() : "ai";
        return `<div class="msg-${who === "you" ? "you" : "ai"}"><span class="who">${esc(who === "you" ? "me" : who)}</span><p>${inline(m ? m[2] : l)}</p></div>`;
      }).join("") + "</div>";
    },
    recap(lines) {
      return `<aside class="recap"><div class="recap-head">recap.txt</div>${render(lines.join("\n")).html}</aside>`;
    },
    model(lines) {
      return lines.filter((l) => l.trim()).map((l) => {
        const [src, caption = "", alt = "", poster = ""] = split(l);
        const body = src === "placeholder"
          ? `<span class="ph" style="aspect-ratio:16/10"><span class="ph-label">[ 3d model pending ]</span><span class="ph-cap">${esc(alt || caption)}</span></span>`
          : `<model-viewer src="${esc(src)}" alt="${esc(alt || caption)}"${poster ? ` poster="${esc(poster)}"` : ""} camera-controls touch-action="pan-y" auto-rotate rotation-per-second="12deg" interaction-prompt="none" shadow-intensity="0.6" exposure="1" loading="lazy" reveal="auto"></model-viewer>`;
        return `<figure class="model">${body}${caption ? `<figcaption>${inline(caption)}</figcaption>` : ""}</figure>`;
      }).join("");
    },
    chart(lines, ctx) {
      return lines.filter((l) => l.trim()).map((l) => {
        const [src, caption = ""] = split(l);
        ctx.figures = (ctx.figures || 0) + 1;
        return `<figure class="chart" data-spec="${esc(src)}"><div class="vl" role="img" aria-label="${esc(caption)}"></div><figcaption><span class="fig">Figure ${ctx.figures}.</span> ${inline(caption)}</figcaption></figure>`;
      }).join("");
    },
    tracks(lines) {
      return '<ol class="tracks">' + lines.filter((l) => l.trim()).map((l, i) => {
        const [src, title = "", len = ""] = split(l);
        const pending = src === "placeholder";
        return `<li class="${pending ? "pending" : ""}"><button type="button" class="track" ${pending ? "disabled" : `data-src="${esc(src)}"`} aria-label="${esc(title)}"><span class="no">${String(i + 1).padStart(2, "0")}</span><span class="state" aria-hidden="true">${pending ? "··" : "▶"}</span><span class="tt">${inline(title)}</span><span class="len">${pending ? "pending" : esc(len)}</span></button><span class="bar" aria-hidden="true"><i></i></span></li>`;
      }).join("") + "</ol>";
    },
    todo(lines) {
      return '<ul class="todo">' + lines.filter((l) => l.trim()).map((l) => {
        const done = /^\[x\]/i.test(l);
        return `<li class="${done ? "done" : ""}"><span aria-hidden="true">${done ? "[x]" : "[ ]"}</span> ${inline(l.replace(/^\[.\]\s*/, ""))}</li>`;
      }).join("") + "</ul>";
    },
  };

  function render(src, ctx) {
    ctx = ctx || { galleries: [] };
    const lines = src.replace(/\r/g, "").split("\n");
    let html = "", i = 0;
    const until = (test) => { const out = []; while (i < lines.length && !test(lines[i])) out.push(lines[i++]); return out; };

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      const fence = line.match(/^```(\w*)/);
      if (fence) {
        i++;
        const body = until((l) => /^```\s*$/.test(l));
        i++;
        const kind = fence[1];
        html += blocks[kind] ? blocks[kind](body, ctx) : `<pre><code>${esc(body.join("\n"))}</code></pre>`;
        continue;
      }
      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        const level = Math.min(h[1].length + 1, 5);
        const id = h[2].toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
        html += `<h${level} id="${id}"><span class="hash" aria-hidden="true">${"#".repeat(h[1].length)}</span> ${inline(h[2])}</h${level}>`;
        i++; continue;
      }
      if (/^(-{3,}|\*{3,})\s*$/.test(line)) { html += '<hr>'; i++; continue; }
      if (line.startsWith(">>")) {
        const body = until((l) => !l.startsWith(">>")).map((l) => l.replace(/^>>\s?/, ""));
        html += `<blockquote class="voice-block"><p>${body.map(inline).join("<br>")}</p></blockquote>`;
        continue;
      }
      if (line.startsWith(">")) {
        const body = until((l) => !l.startsWith(">")).map((l) => l.replace(/^>\s?/, ""));
        html += `<blockquote>${render(body.join("\n"), ctx).html}</blockquote>`;
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
        const ordered = /^\s*\d+\./.test(line);
        const items = until((l) => !/^\s*([-*]|\d+\.)\s+/.test(l) && !/^\s{2,}\S/.test(l));
        const lis = [];
        for (const it of items) {
          if (/^\s*([-*]|\d+\.)\s+/.test(it)) lis.push(it.replace(/^\s*([-*]|\d+\.)\s+/, ""));
          else lis[lis.length - 1] += " " + it.trim();
        }
        const tag = ordered ? "ol" : "ul";
        html += `<${tag}>${lis.map((l) => `<li>${inline(l)}</li>`).join("")}</${tag}>`;
        continue;
      }
      const para = until((l) => !l.trim() || /^(```|#{1,4}\s|>|\s*([-*]|\d+\.)\s+)/.test(l));
      html += `<p>${inline(para.join(" "))}</p>`;
    }
    return { html, galleries: ctx.galleries };
  }

  function frontMatter(text) {
    const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!m) return { meta: {}, body: text };
    const meta = {};
    for (const l of m[1].split("\n")) {
      const i = l.indexOf(":");
      if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
    }
    return { meta, body: text.slice(m[0].length) };
  }

  global.Md = { render, frontMatter, esc, inline };
})(window);
