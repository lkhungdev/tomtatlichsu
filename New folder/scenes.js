/* ==========================================================
   ẢNH NỀN SVG TỰ SINH (không cần tải ảnh ngoài)
   Scenes.render(kind, tone, seed) → data URI dùng cho background-image
   ========================================================== */
(function () {
  'use strict';
  const W = 1600, H = 900;
  const f = (n) => Math.round(n * 10) / 10;
  const rng = (seed) => {
    let s = (Math.imul(seed + 7, 2654435761) >>> 0) || 1;
    return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  };
  let uid = 0;

  const PAL = {
    night: { sky: ['#04060f', '#0d1a33', '#27406a'], sun: '#e8eefc', m: ['#22385c', '#15263f', '#0a1322'] },
    dusk:  { sky: ['#2a1236', '#a4423a', '#f0a35c'], sun: '#ffd58a', m: ['#74324a', '#47203b', '#1f1124'] },
    dawn:  { sky: ['#1b3b5c', '#e8957a', '#ffd9a0'], sun: '#fff0c2', m: ['#56768f', '#385670', '#1b2f40'] },
    blood: { sky: ['#1a0405', '#7a1a14', '#e2602b'], sun: '#ffcf7a', m: ['#5e1c17', '#3a110f', '#190706'] },
    gold:  { sky: ['#3a1f06', '#c47a1c', '#ffd77a'], sun: '#fff1b8', m: ['#8f5d1d', '#5a3811', '#2c1a08'] },
    storm: { sky: ['#10161c', '#33414c', '#7a8a92'], sun: '#d9e4ea', m: ['#34424c', '#222d34', '#0f1519'] },
    jade:  { sky: ['#06201d', '#14625a', '#8fd1b0'], sun: '#e5ffd8', m: ['#18564f', '#0e3d38', '#06211f'] },
    red:   { sky: ['#2a0305', '#a8141a', '#f2552c'], sun: '#ffe27a', m: ['#5a1210', '#38090a', '#1b0405'] }
  };

  const wrap = (inner, p) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset=".55" stop-color="${p.sky[1]}"/><stop offset="1" stop-color="${p.sky[2]}"/></linearGradient>` +
    `<radialGradient id="glow"><stop offset="0" stop-color="${p.sun}" stop-opacity=".9"/><stop offset=".35" stop-color="${p.sun}" stop-opacity=".3"/><stop offset="1" stop-color="${p.sun}" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>${inner}</svg>`;

  /* ---------- các mảnh dựng sẵn ---------- */
  const stars = (r, n, maxY) => {
    let s = '';
    for (let i = 0; i < n; i++) s += `<circle cx="${f(r() * W)}" cy="${f(r() * maxY)}" r="${f(0.6 + r() * 1.5)}" fill="#fff" opacity="${f(0.3 + r() * 0.6)}"/>`;
    return s;
  };
  const sunAt = (p, cx, cy, R) =>
    `<circle cx="${cx}" cy="${cy}" r="${R * 4.5}" fill="url(#glow)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="${p.sun}"/>`;

  const mist = (y, h, color, op) => {
    const id = 'mz' + (uid++);
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0"/><stop offset="1" stop-color="${color}" stop-opacity="${op}"/></linearGradient></defs>` +
      `<rect x="0" y="${y}" width="${W}" height="${h}" fill="url(#${id})"/>`;
  };

  const ridge = (r, base, amp, step, color, sharp) => {
    const pts = [];
    for (let x = -step; x <= W + step * 1.01; x += step) {
      const k = sharp ? (r() < 0.5 ? r() : r() * 0.25) : r();
      pts.push([x, base - k * amp]);
    }
    const last = pts[pts.length - 1];
    let d = `M${pts[0][0]},${H}L${pts[0][0]},${f(pts[0][1])}`;
    if (sharp) {
      for (let i = 1; i < pts.length; i++) d += `L${f(pts[i][0])},${f(pts[i][1])}`;
    } else {
      for (let i = 1; i < pts.length - 1; i++) {
        d += `Q${f(pts[i][0])},${f(pts[i][1])} ${f((pts[i][0] + pts[i + 1][0]) / 2)},${f((pts[i][1] + pts[i + 1][1]) / 2)}`;
      }
      d += `L${f(last[0])},${f(last[1])}`;
    }
    return `<path d="${d}L${f(last[0])},${H}Z" fill="${color}"/>`;
  };

  const range = (r, p, base, sharp) =>
    ridge(r, base - 130, 210, 120, p.m[0], sharp) + mist(base - 240, 320, p.sky[2], 0.4) +
    ridge(r, base, 170, 95, p.m[1], sharp) + mist(base - 100, 280, p.sky[2], 0.28) +
    ridge(r, base + 120, 110, 75, p.m[2], false);

  const starPts = (cx, cy, R) => Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? R * 0.382 : R;
    return `${f(cx + rad * Math.cos(a))},${f(cy + rad * Math.sin(a))}`;
  }).join(' ');

  const roof = (cx, y, w, h, c) =>
    `<path d="M${cx - w - 28},${y - 12}Q${cx - w + 6},${y + 6} ${cx - w + 46},${y}L${cx + w - 46},${y}Q${cx + w - 6},${y + 6} ${cx + w + 28},${y - 12}Q${cx + w + 4},${y - 10} ${cx + w - 34},${y - h}L${cx - w + 34},${y - h}Q${cx - w - 4},${y - 10} ${cx - w - 28},${y - 12}Z" fill="${c}"/>`;

  const pagoda = (cx, by, w, n, c) => {
    let s = '', y = by, cw = w;
    for (let i = 0; i < n; i++) {
      const bh = 46 - i * 3;
      s += `<rect x="${f(cx - cw + 30)}" y="${y - bh}" width="${f((cw - 30) * 2)}" height="${bh}" fill="${c}"/>`;
      y -= bh;
      s += roof(cx, y, f(cw), 34, c);
      y -= 34;
      cw *= 0.8;
    }
    return s + `<rect x="${cx - 3}" y="${y - 70}" width="6" height="72" fill="${c}"/><circle cx="${cx}" cy="${y - 76}" r="7" fill="${c}"/>`;
  };

  const flagPole = (x, y, h, col) =>
    `<rect x="${x}" y="${y - h}" width="3" height="${h}" fill="#150a06"/>` +
    `<path d="M${x + 3},${y - h}Q${x + 33},${y - h + 12} ${x + 66},${y - h + 4}L${x + 66},${y - h + 36}Q${x + 33},${y - h + 42} ${x + 3},${y - h + 30}Z" fill="${col}"/>`;

  const ship = (x, y, s, col) =>
    `<g transform="translate(${x},${y}) scale(${s})" fill="${col}"><path d="M0,0H250L222,46H30Z"/>` +
    `<rect x="58" y="-180" width="5" height="180"/><rect x="128" y="-215" width="5" height="215"/><rect x="190" y="-170" width="5" height="170"/>` +
    `<path d="M63,-170V-60L116,-70V-160Z" opacity=".92"/><path d="M133,-205V-80L182,-90V-195Z" opacity=".92"/><path d="M195,-160V-60L238,-70V-150Z" opacity=".92"/>` +
    `<rect x="94" y="-34" width="26" height="34"/></g>`;

  const smoke = (cx, cy, n, col) => {
    let s = '';
    for (let k = 0; k < n; k++) s += `<circle cx="${cx + k * 42}" cy="${cy - k * 15}" r="${20 + k * 9}" fill="${col}" opacity="${f(0.42 - k * 0.05)}"/>`;
    return s;
  };

  const waves = (r, y0, y1, n, op) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = r() * W, y = y0 + r() * (y1 - y0), l = 30 + r() * 90;
      s += `<rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="2" rx="1" fill="#fff" opacity="${f(op * (0.4 + r()))}"/>`;
    }
    return s;
  };

  /* ---------- các cảnh ---------- */
  const S = {
    cave(r, p) {
      return stars(r, 90, 380) + sunAt(p, 1230, 170, 44) + range(r, p, 650, true) +
        `<path d="M0,900V560Q180,470 380,540L470,500Q600,380 800,372Q1000,380 1130,500L1220,540Q1420,470 1600,560V900Z" fill="#0a0604"/>` +
        `<defs><radialGradient id="fire" cx=".5" cy=".85" r=".75"><stop offset="0" stop-color="#ffd27a"/><stop offset=".4" stop-color="#e8741d"/><stop offset="1" stop-color="#3a1305"/></radialGradient></defs>` +
        `<path d="M580,900V700Q580,525 800,525Q1020,525 1020,700V900Z" fill="url(#fire)"/>` +
        `<path d="M770,900Q735,830 790,775Q792,830 818,800Q855,850 832,900Z" fill="#fff0b0" opacity=".9"/>` +
        `<g fill="#120704"><circle cx="680" cy="800" r="14"/><path d="M658,900V832Q680,810 702,832V900Z"/><circle cx="935" cy="790" r="14"/><path d="M912,900V822Q935,800 958,822V900Z"/></g>`;
    },
    drum(r, p) {
      let s = sunAt(p, 420, 250, 60) + range(r, p, 600, false);
      for (let i = 0; i < 6; i++) {
        const y = 690 + i * 36;
        s += `<path d="M0,${y}Q400,${y - 24} 800,${y}T1600,${y}V900H0Z" fill="${i % 2 ? '#2f4a22' : '#476b2c'}" opacity="${f(0.35 + i * 0.12)}"/>`;
      }
      const rings = [[330, 3, '1 0'], [300, 10, '2 12'], [262, 4, '1 0'], [228, 16, '3 9'], [196, 3, '1 0'], [150, 3, '1 0'], [118, 10, '2 10'], [86, 3, '1 0']];
      s += `<g transform="translate(1100,400)" fill="none" stroke="${p.sun}" stroke-linecap="round" opacity=".5">`;
      rings.forEach(([rad, sw, da]) => { s += `<circle r="${rad}" stroke-width="${sw}" stroke-dasharray="${da}"/>`; });
      for (let k = 0; k < 14; k++) {
        const a = k * 2 * Math.PI / 14;
        s += `<ellipse cx="${f(Math.cos(a) * 172)}" cy="${f(Math.sin(a) * 172)}" rx="20" ry="6" transform="rotate(${f(a * 180 / Math.PI)} ${f(Math.cos(a) * 172)} ${f(Math.sin(a) * 172)})" stroke-width="2.5"/>`;
      }
      let rays = '';
      for (let k = 0; k < 14; k++) {
        const a1 = k * 2 * Math.PI / 14, a2 = a1 + Math.PI / 14;
        rays += `${f(Math.cos(a1) * 82)},${f(Math.sin(a1) * 82)} ${f(Math.cos(a2) * 44)},${f(Math.sin(a2) * 44)} `;
      }
      s += `<polygon points="${rays}" fill="${p.sun}" stroke-width="2" opacity=".9"/></g>`;
      return s;
    },
    spiral(r, p) {
      let s = stars(r, 80, 420) + sunAt(p, 330, 190, 40) + range(r, p, 640, false);
      s += `<ellipse cx="800" cy="930" rx="980" ry="300" fill="${p.m[2]}"/>`;
      for (let k = 0; k < 5; k++) {
        s += `<ellipse cx="800" cy="${760 + k * 6}" rx="${560 - k * 100}" ry="${112 - k * 18}" fill="none" stroke="${p.sun}" stroke-width="${4 - k * 0.5}" opacity="${f(0.55 - k * 0.07)}"/>`;
      }
      s += `<rect x="780" y="650" width="40" height="46" fill="#08101c"/>` + roof(800, 654, 46, 22, '#08101c');
      for (let k = 0; k < 16; k++) {
        const x0 = 100 + r() * 700, y0 = 640 + r() * 120, len = 300 + r() * 500;
        s += `<path d="M${f(x0)},${f(y0)}Q${f(x0 + len / 2)},${f(y0 - 260 - r() * 160)} ${f(x0 + len)},${f(y0 - 120 - r() * 60)}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".45"/>`;
      }
      return s;
    },
    war(r, p) {
      let s = sunAt(p, 1120, 520, 90) + range(r, p, 650, true);
      s += `<path d="M0,900V790Q300,740 600,780T1200,770T1600,790V900Z" fill="#100604"/>`;
      for (let i = 0; i < 12; i++) {
        const x = 70 + i * 132 + r() * 40, h = 120 + r() * 150;
        s += flagPole(f(x), f(800 + r() * 20), f(h), i % 3 ? '#c7261f' : '#e8a625');
        s += `<path d="M${f(x - 2)},${f(780 - h)}l4,-26 4,26Z" fill="#150a06"/>`;
      }
      return s + smoke(100, 760, 5, '#2a1410') + smoke(1000, 780, 6, '#2a1410');
    },
    river(r, p) {
      let s = stars(r, 50, 300) + sunAt(p, 420, 190, 40) + range(r, p, 560, false);
      s += `<defs><linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[2]}" stop-opacity=".85"/><stop offset="1" stop-color="${p.m[2]}"/></linearGradient></defs>` +
        `<rect y="590" width="${W}" height="310" fill="url(#wt)"/>` +
        `<ellipse cx="420" cy="660" rx="60" ry="8" fill="${p.sun}" opacity=".4"/>` + waves(r, 600, 890, 60, 0.18);
      for (let i = 0; i < 34; i++) {
        const x = 80 + r() * 1440, y = 670 + r() * 200, h = 50 + r() * 50;
        s += `<path d="M${f(x)},${f(y)}L${f(x + 3)},${f(y - h)}L${f(x + 6)},${f(y)}Z" fill="#0a0806"/>`;
      }
      const boat = (x, y, c) => `<g transform="translate(${x},${y})" fill="${c}"><path d="M0,0Q70,32 170,0L146,-8H22Z"/><rect x="80" y="-96" width="4" height="90"/><path d="M84,-94V-22Q130,-34 150,-30Q140,-62 84,-94Z" opacity=".9"/></g>`;
      return s + boat(260, 740, '#0a0806') + boat(980, 700, '#0a0806') + boat(1280, 780, '#0a0806');
    },
    pagoda(r, p) {
      let s = sunAt(p, 800, 440, 110) + range(r, p, 680, false);
      const c = p.m[2];
      s += pagoda(380, 735, 90, 3, c) + pagoda(1230, 735, 100, 3, c) + pagoda(800, 740, 150, 5, c);
      s += `<defs><linearGradient id="pd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[2]}" stop-opacity=".5"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect y="735" width="${W}" height="165" fill="url(#pd)"/>` + waves(r, 745, 890, 40, 0.2);
      for (let k = 0; k < 11; k++) {
        const x = 90 + r() * 1420, y = 790 + r() * 90;
        s += `<g transform="translate(${f(x)},${f(y)})"><ellipse rx="42" ry="10" fill="#10261a" opacity=".8"/>`;
        [-60, -30, 0, 30, 60].forEach((a) => { s += `<ellipse cy="-20" rx="11" ry="26" transform="rotate(${a} 0 0)" fill="#f6c1b2" opacity=".78"/>`; });
        s += '</g>';
      }
      return s;
    },
    citadel(r, p) {
      let s = stars(r, 30, 260) + sunAt(p, 1230, 250, 70) + range(r, p, 620, false);
      const c = p.m[2];
      s += `<rect x="0" y="720" width="${W}" height="180" fill="${c}"/>`;
      for (let x = 0; x < W; x += 46) s += `<rect x="${x}" y="696" width="30" height="26" fill="${c}"/>`;
      s += `<rect x="540" y="520" width="520" height="210" fill="${c}"/>` + roof(800, 520, 300, 54, c) +
        `<rect x="640" y="430" width="320" height="92" fill="${c}"/>` + roof(800, 430, 215, 46, c) +
        `<path d="M730,900V790Q730,722 800,722Q870,722 870,790V900Z" fill="#000" opacity=".85"/>` +
        `<rect x="300" y="610" width="110" height="112" fill="${c}"/>` + roof(355, 610, 80, 34, c) +
        `<rect x="1190" y="610" width="110" height="112" fill="${c}"/>` + roof(1245, 610, 80, 34, c);
      s += flagPole(780, 340, 90, '#d4a017') + flagPole(120, 696, 140, '#c7261f') + flagPole(1450, 696, 140, '#c7261f');
      return s + waves(r, 800, 890, 20, 0.12);
    },
    sea(r, p) {
      let s = '';
      for (let i = 0; i < 9; i++) s += `<ellipse cx="${f(r() * W)}" cy="${f(60 + r() * 300)}" rx="${f(160 + r() * 260)}" ry="${f(26 + r() * 40)}" fill="${p.sky[1]}" opacity="${f(0.3 + r() * 0.3)}"/>`;
      s += sunAt(p, 1180, 420, 50);
      s += `<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[2]}"/><stop offset="1" stop-color="${p.m[2]}"/></linearGradient></defs>` +
        `<rect y="540" width="${W}" height="360" fill="url(#sea)"/>` + waves(r, 550, 890, 70, 0.22) +
        ship(180, 700, 1.5, '#06090c') + ship(940, 640, 0.95, '#06090c');
      s += smoke(280, 640, 6, '#1a2127') + smoke(1010, 590, 5, '#1a2127');
      s += `<circle cx="470" cy="690" r="26" fill="#ffb347" opacity=".75"/><circle cx="470" cy="690" r="10" fill="#fff4c4"/>`;
      return s;
    },
    harbor(r, p) {
      let s = sunAt(p, 900, 560, 80) +
        `<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[2]}"/><stop offset="1" stop-color="${p.m[1]}"/></linearGradient></defs>` +
        `<rect y="560" width="${W}" height="340" fill="url(#sea)"/><ellipse cx="900" cy="640" rx="90" ry="10" fill="${p.sun}" opacity=".5"/><ellipse cx="900" cy="700" rx="140" ry="8" fill="${p.sun}" opacity=".3"/>` +
        waves(r, 570, 890, 60, 0.2) + ship(1050, 590, 0.55, '#0b1620') + smoke(1130, 545, 4, '#1b2a36');
      s += `<path d="M0,900V740H620Q700,740 780,900Z" fill="#070d12"/>`;
      [90, 300, 510].forEach((x) => { s += `<rect x="${x}" y="610" width="5" height="130" fill="#070d12"/><circle cx="${x + 2}" cy="606" r="10" fill="#ffd27a"/><circle cx="${x + 2}" cy="606" r="34" fill="url(#glow)"/>`; });
      return s;
    },
    flag(r, p) {
      const cx = 1060, cy = 330;
      let s = '';
      for (let k = 0; k < 24; k++) {
        const a = k * Math.PI / 12, b = a + 0.07;
        s += `<path d="M${cx},${cy}L${f(cx + Math.cos(a) * 1800)},${f(cy + Math.sin(a) * 1800)}L${f(cx + Math.cos(b) * 1800)},${f(cy + Math.sin(b) * 1800)}Z" fill="${p.sun}" opacity=".07"/>`;
      }
      s += `<circle cx="${cx}" cy="${cy}" r="480" fill="url(#glow)"/><polygon points="${starPts(cx, cy, 200)}" fill="#ffd93a"/>`;
      s += `<path d="M0,900V680Q400,620 800,670T1600,650V900Z" fill="${p.m[2]}"/>`;
      for (let i = 0; i < 110; i++) {
        const x = r() * W, y = 770 + r() * 130, sc = 0.7 + (y - 770) / 130;
        s += `<g transform="translate(${f(x)},${f(y)}) scale(${f(sc)})" fill="#080204"><circle cy="-34" r="11"/><path d="M-15,18V-20Q0,-28 15,-20V18Z"/></g>`;
      }
      for (let i = 0; i < 9; i++) {
        const x = 60 + i * 180 + r() * 60, y = 800;
        s += flagPole(f(x), y, f(160 + r() * 120), '#d81e1e');
      }
      return s;
    },
    victory(r, p) {
      let s = '';
      for (let k = 0; k < 20; k++) {
        const a = -Math.PI + k * Math.PI / 19, b = a + 0.05;
        s += `<path d="M800,230L${f(800 + Math.cos(a) * 1800)},${f(230 + Math.sin(a) * 1800)}L${f(800 + Math.cos(b) * 1800)},${f(230 + Math.sin(b) * 1800)}Z" fill="${p.sun}" opacity=".08"/>`;
      }
      s += `<circle cx="800" cy="230" r="360" fill="url(#glow)"/><polygon points="${starPts(800, 230, 100)}" fill="#ffd93a"/>`;
      s += range(r, p, 650, false);
      s += `<path d="M0,900V740Q220,690 420,760T820,820V900Z" fill="${p.m[2]}"/>` +
        `<path d="M1600,900V720Q1380,690 1180,770T860,830V900Z" fill="${p.m[2]}"/>` +
        flagPole(380, 760, 190, '#d81e1e');
      s += `<polygon points="${starPts(417, 612, 12)}" fill="#ffd93a"/>`;
      return s + mist(560, 340, p.sky[2], 0.35);
    },
    city(r, p) {
      let s = sunAt(p, 800, 520, 120);
      for (let k = 0; k < 18; k++) {
        const a = Math.PI + k * Math.PI / 17, b = a + 0.04;
        s += `<path d="M800,520L${f(800 + Math.cos(a) * 1700)},${f(520 + Math.sin(a) * 1700)}L${f(800 + Math.cos(b) * 1700)},${f(520 + Math.sin(b) * 1700)}Z" fill="${p.sun}" opacity=".08"/>`;
      }
      const layer = (base, minH, maxH, col, win) => {
        let t = '';
        for (let x = -20; x < W; ) {
          const w = 50 + r() * 70, h = minH + r() * (maxH - minH);
          t += `<rect x="${f(x)}" y="${f(base - h)}" width="${f(w)}" height="${f(h + 200)}" fill="${col}"/>`;
          if (win) for (let yy = base - h + 14; yy < base - 8; yy += 22) for (let xx = x + 8; xx < x + w - 10; xx += 16) if (r() < 0.38) t += `<rect x="${f(xx)}" y="${f(yy)}" width="6" height="9" fill="#ffd98a" opacity="${f(0.5 + r() * 0.4)}"/>`;
          x += w + 4 + r() * 10;
        }
        return t;
      };
      s += layer(700, 80, 230, p.m[0], false) + mist(500, 220, p.sky[2], 0.4) + layer(760, 90, 330, p.m[1], true);
      s += `<rect x="1080" y="260" width="34" height="520" fill="${p.m[2]}"/><rect x="1094" y="190" width="5" height="75" fill="${p.m[2]}"/>`;
      s += `<defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[2]}" stop-opacity=".75"/><stop offset="1" stop-color="${p.m[2]}"/></linearGradient></defs>` +
        `<rect y="770" width="${W}" height="130" fill="url(#rv)"/>` + waves(r, 780, 890, 40, 0.22) +
        `<path d="M0,790Q800,640 1600,790" fill="none" stroke="${p.m[2]}" stroke-width="10"/>`;
      return s;
    }
  };

  window.Scenes = {
    render(kind, tone, seed) {
      uid = 0;
      const p = PAL[tone] || PAL.dusk;
      const svg = wrap((S[kind] || S.drum)(rng(seed), p), p);
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    },
    palettes: PAL
  };
})();
