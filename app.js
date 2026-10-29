/* ==========================================================
   LOGIC: timeline 2 làn tỉ lệ năm, icon theo loại, thẻ 4 phần
   ========================================================== */
(() => {
  'use strict';
  const { ERAS, TYPES } = window.VN_DATA;
  const EVENTS = window.VN_DATA.EVENTS.slice().sort((a, b) => a.y - b.y);
  const $ = (s) => document.querySelector(s);
  const app = $('#app');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const eraById = Object.fromEntries(ERAS.map((e) => [e.id, e]));
  const N = EVENTS.length;
  const svgIcon = (type) => `<svg viewBox="0 0 24 24" aria-hidden="true">${TYPES[type].icon}</svg>`;

  /* ---------- Thang thời gian ----------
     Từ 700 TCN trở đi: tuyến tính 3,2 px / năm → khoảng cách các mốc đúng tỉ lệ số năm.
     Trước 700 TCN (hàng trăm nghìn năm): rút gọn theo log (đường nét đứt). */
  const PPY = 3.2, LIN0 = -700, LOG_K = 150, OFFSET = 880, END_YEAR = 2000;
  const rawX = (y) => (y >= LIN0 ? (y - LIN0) * PPY : -LOG_K * Math.log10(1 + (LIN0 - y)));
  const X = (y) => Math.round(OFFSET + rawX(y));
  const TOTAL = X(END_YEAR) + 140;
  const fmtYear = (y) => (y < 0 ? `${-y} TCN` : `${y}`);

  /* ---------- Xếp mốc vào làn / hàng để không đè nhau ---------- */
  const MIN_GAP = 40;
  const rowEnds = [[], []];
  EVENTS.forEach((ev) => {
    ev.x = X(ev.y);
    ev.lane = TYPES[ev.type].lane;
    const ends = rowEnds[ev.lane];
    let r = ends.findIndex((e) => ev.x - e >= MIN_GAP);
    if (r < 0) { r = ends.length; ends.push(-1e9); }
    ends[r] = ev.x;
    ev.row = r;
  });
  const laneRows = rowEnds.map((a) => a.length);

  /* ---------- Dựng timeline ---------- */
  const timeline = $('#timeline'), view = $('#tlView'), track = $('#tlTrack'), inner = $('#tlInner'), tip = $('#tip');
  track.style.setProperty('--w', TOTAL);

  // chú thích icon
  $('#legend').innerHTML = Object.keys(TYPES).map((k) => `<span>${svgIcon(k)}<em>${TYPES[k].label}</em></span>`).join('');

  const lane = document.createElement('div');
  lane.className = 'tl-lane';
  inner.appendChild(lane);

  const laneBg = [0, 1].map((i) => {
    const d = document.createElement('div');
    d.className = 'lane-bg';
    d.innerHTML = `<span>${i === 0 ? 'Nhà nước · Chính biến · Cột mốc' : 'Chiến sự · Khởi nghĩa'}</span>`;
    lane.appendChild(d);
    return d;
  });

  const breakX = X(LIN0) - 52;
  const rulerPre = document.createElement('div'); rulerPre.className = 'ruler pre'; rulerPre.style.width = breakX + 'px';
  const rulerMain = document.createElement('div'); rulerMain.className = 'ruler'; rulerMain.style.left = breakX + 16 + 'px'; rulerMain.style.width = TOTAL - breakX - 16 + 'px';
  const breakEl = document.createElement('div'); breakEl.className = 'tl-break'; breakEl.style.left = breakX + 8 + 'px'; breakEl.innerHTML = '//<small>thang rút gọn</small>';
  const cursor = document.createElement('div'); cursor.className = 'cursor';
  lane.append(rulerPre, rulerMain, breakEl, cursor);

  const ticks = [];
  for (let y = LIN0; y <= END_YEAR; y += 100) {
    const major = y % 500 === 0;
    const t = document.createElement('i'); t.className = 'tick' + (major ? ' major' : ''); t.style.left = X(y) + 'px';
    lane.appendChild(t);
    let l = null;
    if (major) { l = document.createElement('span'); l.className = 'tick-label'; l.style.left = X(y) + 'px'; l.textContent = y === 0 ? '0' : fmtYear(y); lane.appendChild(l); }
    ticks.push([t, l, major]);
  }

  ERAS.forEach((e, i) => {
    const x0 = i === 0 ? 0 : X(e.from);
    const x1 = i === ERAS.length - 1 ? TOTAL : X(ERAS[i + 1].from);
    inner.insertAdjacentHTML('beforeend', `<div class="era-band" style="--c:${e.color};left:${x0}px;width:${x1 - x0}px"><span>${x1 - x0 < 300 ? e.short : e.name}</span></div>`);
  });

  const nodes = EVENTS.map((ev, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'node';
    b.style.left = ev.x + 'px';
    b.style.setProperty('--c', eraById[ev.era].color);
    b.setAttribute('aria-label', `${ev.tl}: ${ev.title} (${TYPES[ev.type].label})`);
    b.innerHTML = `${svgIcon(ev.type)}<span class="nlabel">${ev.tl}</span>`;
    b.addEventListener('click', () => { if (!dragMoved) select(i); });
    b.addEventListener('mouseenter', () => showTip(i));
    b.addEventListener('focus', () => showTip(i));
    b.addEventListener('mouseleave', hideTip);
    b.addEventListener('blur', hideTip);
    lane.appendChild(b);
    return b;
  });

  /* Bố cục dọc: [chú thích] [làn 0] [làn 1] [thước năm] [dải thời kỳ] — co giãn theo chiều cao */
  function layout() {
    const H = timeline.clientHeight;
    const top = 26, bottom = 44;
    const rows = laneRows[0] + laneRows[1];
    const pitch = Math.max(30, Math.min(46, (H - top - bottom - 6) / rows));
    const n = Math.max(16, Math.min(26, pitch - 13));
    const lane0 = top, lane1 = top + laneRows[0] * pitch + 6;
    const tops = [lane0, lane1];
    laneBg.forEach((d, i) => { d.style.top = tops[i] + 'px'; d.style.height = laneRows[i] * pitch + 'px'; });
    nodes.forEach((nd, i) => {
      const ev = EVENTS[i];
      nd.style.setProperty('--n', n + 'px');
      nd.style.top = tops[ev.lane] + ev.row * pitch + 4 + n / 2 + 'px';
    });
    const rulerY = lane1 + laneRows[1] * pitch + 8;
    [rulerPre, rulerMain].forEach((r) => { r.style.top = rulerY + 'px'; });
    breakEl.style.top = rulerY + 'px';
    ticks.forEach(([t, l, major]) => {
      t.style.top = rulerY - (major ? 5 : 3) + 'px';
      if (l) l.style.top = rulerY + 8 + 'px';
    });
    cursor.style.top = lane0 + 'px';
    cursor.style.height = rulerY - lane0 + 'px';
  }

  function showTip(i) {
    const ev = EVENTS[i], r = nodes[i].getBoundingClientRect();
    tip.innerHTML = `<b>${ev.ys} ${ev.sfx} · ${TYPES[ev.type].label}</b>${ev.title}`;
    tip.style.left = Math.min(Math.max(r.left + r.width / 2, 140), innerWidth - 140) + 'px';
    tip.classList.add('show');
  }
  function hideTip() { tip.classList.remove('show'); }

  /* ---------- Kéo / cuộn ngang timeline ---------- */
  let dragMoved = false, dragging = false, startX = 0, startLeft = 0;
  view.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; dragMoved = false; startX = e.clientX; startLeft = view.scrollLeft;
  });
  addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (!dragMoved && Math.abs(dx) > 5) { dragMoved = true; view.classList.add('dragging'); hideTip(); }
    if (dragMoved) view.scrollLeft = startLeft - dx;
  });
  addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false; view.classList.remove('dragging');
    setTimeout(() => { dragMoved = false; }, 0);
  });
  view.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { view.scrollLeft += e.deltaY * 1.3; e.preventDefault(); }
  }, { passive: false });

  /* ---------- Phần tử nội dung ---------- */
  const card = $('#card'), elYear = $('#year'), elSfx = $('#sfx'), elTitle = $('#title'),
        elSummary = $('#summary'), elGrid = $('#grid'), elWhy = $('#whyBox'),
        elEra = $('#eraName'), elEraRange = $('#eraRange'), elBadge = $('#typeBadge'), elPlace = $('#place'),
        elCounter = $('#counter'), btnPrev = $('#prev'), btnNext = $('#next'), autobar = $('#autobar'),
        flash = $('#flash');
  const SECTIONS = [['ctx', 'Bối cảnh'], ['course', 'Diễn biến'], ['end', 'Kết thúc'], ['sig', 'Ý nghĩa']];

  /* ---------- Nền ảnh (chuyển cảnh chéo) ---------- */
  const bgs = [$('#bgA'), $('#bgB')];
  let bgIdx = 0;
  const sceneCache = new Map();
  function bgFor(ev, i) {
    if (ev.img) return `url("${ev.img}")`;
    if (!sceneCache.has(i)) sceneCache.set(i, `url("${window.Scenes.render(ev.scene, ev.tone, i + 1)}")`);
    return sceneCache.get(i);
  }
  function setBackground(ev, i) {
    const next = bgs[bgIdx ^ 1], prev = bgs[bgIdx];
    next.style.backgroundImage = bgFor(ev, i);
    next.classList.remove('show'); void next.offsetWidth;
    next.classList.add('show');
    prev.classList.remove('show');
    bgIdx ^= 1;
  }

  /* ---------- Hiệu ứng "giải mã" chữ số của năm ---------- */
  let decodeRaf = 0;
  function decode(text) {
    cancelAnimationFrame(decodeRaf);
    if (reduceMotion) { elYear.textContent = text; return; }
    const t0 = performance.now(), dur = 750, chars = [...text];
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), done = Math.floor(p * chars.length * 1.15);
      elYear.textContent = chars.map((c, k) => (/\d/.test(c) && k >= done ? Math.floor(Math.random() * 10) : c)).join('');
      if (p < 1) decodeRaf = requestAnimationFrame(step); else elYear.textContent = text;
    };
    decodeRaf = requestAnimationFrame(step);
  }

  /* ---------- Chọn sự kiện ---------- */
  let cur = -1;
  function select(i, opts = {}) {
    if (i < 0 || i >= N) return;
    const ev = EVENTS[i], era = eraById[ev.era];
    const first = cur === -1;
    cur = i;

    app.style.setProperty('--accent', era.color);
    particleTarget = hexToRgb(era.color);

    card.classList.remove('enter'); void card.offsetWidth; card.classList.add('enter');
    elEra.textContent = era.name; elEraRange.textContent = era.range;
    elBadge.innerHTML = `${svgIcon(ev.type)}${TYPES[ev.type].label}`;
    elPlace.textContent = ev.place || '';
    elSfx.textContent = ev.sfx;
    elTitle.textContent = ev.title;
    elSummary.textContent = ev.lead;
    if (ev.shift) {
      $('#shiftFrom').textContent = ev.shift[0]; $('#shiftTo').textContent = ev.shift[1]; $('#whyText').textContent = ev.why;
      elWhy.hidden = false;
    } else elWhy.hidden = true;
    elGrid.innerHTML = SECTIONS.map(([k, label], n) => `<section class="sec"><h3><b>${n + 1}</b>${label}</h3><p>${ev[k]}</p></section>`).join('');
    elCounter.textContent = `${String(i + 1).padStart(2, '0')} / ${N}`;
    decode(ev.ys);
    btnPrev.disabled = i === 0;
    btnNext.disabled = i === N - 1;
    card.scrollTop = 0;

    setBackground(ev, i);
    if (!first && !reduceMotion) { flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }

    nodes.forEach((n, k) => {
      n.classList.toggle('active', k === i);
      n.classList.toggle('past', k < i);
      n.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
    cursor.style.left = ev.x + 'px';
    view.scrollTo({ left: ev.x, behavior: first || opts.instant || reduceMotion ? 'auto' : 'smooth' });

    try { history.replaceState(null, '', '#' + ev.id); } catch (_) { /* file:// */ }
    if (playing) scheduleAuto();
  }
  const go = (d) => select(Math.min(N - 1, Math.max(0, cur + d)));
  btnPrev.addEventListener('click', () => go(-1));
  btnNext.addEventListener('click', () => go(1));

  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
    else if (e.key === 'Home') select(0);
    else if (e.key === 'End') select(N - 1);
    else if (e.key === ' ' && e.target === document.body) { e.preventDefault(); toggleAuto(); }
  });

  /* ---------- Tự động phát ---------- */
  const btnAuto = $('#btnAuto'), autoIco = $('#autoIco'), autoLbl = $('#autoLbl');
  const AUTO_MS = 20000;
  let playing = false, autoTimer = 0;
  function scheduleAuto() {
    clearTimeout(autoTimer);
    autobar.classList.remove('run'); void autobar.offsetWidth;
    autobar.style.setProperty('--dur', AUTO_MS + 'ms');
    autobar.classList.add('run');
    autoTimer = setTimeout(() => { if (cur < N - 1) go(1); else toggleAuto(); }, AUTO_MS);
  }
  function toggleAuto() {
    playing = !playing;
    btnAuto.setAttribute('aria-pressed', playing);
    autoIco.textContent = playing ? '❚❚' : '▶';
    autoLbl.textContent = playing ? 'Tạm dừng' : 'Tự động';
    if (playing) { if (cur === N - 1) select(0); else scheduleAuto(); }
    else { clearTimeout(autoTimer); autobar.classList.remove('run'); }
  }
  btnAuto.addEventListener('click', toggleAuto);

  /* ---------- Parallax chuột ---------- */
  const bgsEl = $('#bgs');
  if (!reduceMotion) {
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      bgsEl.style.setProperty('--px', (e.clientX / innerWidth - .5).toFixed(3));
      bgsEl.style.setProperty('--py', (e.clientY / innerHeight - .5).toFixed(3));
    });
  }

  /* ---------- Hạt sáng ---------- */
  const cv = $('#fx'), ctx = cv.getContext('2d');
  let cw = 0, ch = 0, dpr = 1, parts = [];
  let particleRGB = [212, 166, 74], particleTarget = particleRGB;
  const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  function resizeFx() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    cw = innerWidth; ch = innerHeight;
    cv.width = cw * dpr; cv.height = ch * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: Math.round(Math.min(110, Math.max(36, cw / 16))) }, () => spawn(true));
  }
  function spawn(anywhere) {
    return {
      x: Math.random() * cw, y: anywhere ? Math.random() * ch : ch + 10,
      r: .6 + Math.random() * 2.2, vy: -(.12 + Math.random() * .5), vx: (Math.random() - .5) * .25,
      ph: Math.random() * 6.28, sp: .5 + Math.random() * 1.5, a: .25 + Math.random() * .6
    };
  }
  function frame(t) {
    ctx.clearRect(0, 0, cw, ch);
    for (let k = 0; k < 3; k++) particleRGB[k] += (particleTarget[k] - particleRGB[k]) * .03;
    const [r, g, b] = particleRGB.map(Math.round);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      p.y += p.vy; p.x += p.vx + Math.sin(t / 1000 * p.sp + p.ph) * .25;
      if (p.y < -10 || p.x < -10 || p.x > cw + 10) Object.assign(p, spawn(false));
      const tw = .5 + .5 * Math.sin(t / 600 * p.sp + p.ph);
      const al = p.a * (.35 + .65 * tw) * Math.min(1, (ch - p.y) / 120);
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
      grd.addColorStop(0, `rgba(${r},${g},${b},${al})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, 6.2832); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  if (!reduceMotion) { resizeFx(); addEventListener('resize', resizeFx); requestAnimationFrame(frame); }

  /* ---------- Khởi động ---------- */
  layout();
  addEventListener('resize', () => { layout(); if (cur >= 0) view.scrollTo({ left: EVENTS[cur].x, behavior: 'auto' }); });
  const fromHash = EVENTS.findIndex((e) => e.id === location.hash.slice(1));
  select(fromHash >= 0 ? fromHash : 0, { instant: true });
  requestAnimationFrame(() => app.classList.add('ready'));
})();
