
const MM = { W: 800, H: 480, EVERY: 10, QTIME: 20, LIVES: 3, BEST: "meteorMayhemBest" };
const mmCanvas = $("mm-canvas");
const mmCtx = mmCanvas.getContext("2d");
const mmKeys = {};
let mm = null, mmRaf = 0, mmLast = 0, mmPointer = null;
const mmBg = Array.from({ length: 80 }, () => ({ x: Math.random() * MM.W, y: Math.random() * MM.H, s: 1 + Math.random() * 2, z: .3 + Math.random() }));
const mmSky = (() => { const g = mmCtx.createLinearGradient(0, 0, 0, MM.H); g.addColorStop(0, "#070b1a"); g.addColorStop(1, "#2a1f4d"); return g; })();
const mmRand = (a, b) => a + Math.random() * (b - a);
function mmBest() { try { return Number(localStorage.getItem(MM.BEST)) || 0; } catch { return 0; } }

function mmNewRun() {
  return { state: "ready", t: 0, nextQ: MM.EVERY, level: 1, score: 0, lives: MM.LIVES, stars: 0,
    px: MM.W / 2, py: MM.H - 70, size: 1, shield: 0, inv: 0, shake: 0, stormT: 0, spawnT: 1, starT: 1.5,
    meteors: [], pickups: [], parts: [], texts: [], used: new Set(), missed: [],
    qCorrect: 0, qTotal: 0, streak: 0, q: null, qLeft: 0, qDone: false, banner: null };
}

/* ---------------- Open / close ---------------- */
function mmOpen() {
  showScreen("meteor-screen");
  mm = mmNewRun();
  mmShowStart();
  $("mm-best").textContent = `BEST ${mmBest()}`;
  cancelAnimationFrame(mmRaf);
  mmLast = performance.now();
  mmRaf = requestAnimationFrame(mmLoop);
}
function meteorStop() {
  cancelAnimationFrame(mmRaf);
  mmRaf = 0;
  Object.keys(mmKeys).forEach(k => delete mmKeys[k]);
  mmPointer = null;
}
function mmLoop(now) {
  mmRaf = requestAnimationFrame(mmLoop);
  const dt = Math.min(0.05, (now - mmLast) / 1000 || 0);
  mmLast = now;
  mmUpdate(dt);
  mmDraw();
  mmHud();
}

/* ---------------- Overlays ---------------- */
function mmOverlay(build) {
  const ov = $("mm-overlay");
  ov.innerHTML = "";
  const box = el("div", "mm-box panel");
  build(box);
  ov.appendChild(box);
  ov.classList.remove("hidden");
}
function mmButton(label, cls, fn) {
  const b = el("button", "btn " + cls, label);
  b.type = "button";
  b.addEventListener("click", fn);
  return b;
}
function mmShowStart() {
  mmOverlay(box => {
    box.append(
      el("p", "eyebrow", "GAME MODE 2"),
      el("h2", null, "METEOR MAYHEM ☄"),
      el("p", null, "Dodge falling meteors and collect stars. Every 10 seconds, a knowledge challenge appears. Correct answers activate a protective shield."),
      el("p", "microcopy", "MOVE: ARROWS / WASD, OR DRAG · EVERY LEVEL = MORE & FASTER METEORS · WRONG ANSWER = METEOR SHOWER + BIGGER ROCKET"),
      mmButton("▶ LAUNCH (ENTER)", "btn-primary", mmBegin)
    );
  });
}
function mmBegin() {
  if (!mm || mm.state === "play" || mm.state === "quiz") return;
  if (mm.state === "over") mm = mmNewRun();
  mm.meteors = [];
  mm.state = "play";
  $("mm-overlay").classList.add("hidden");
  sfx.click();
}

/* ---------------- Update ---------------- */
function mmUpdate(dt) {
  const g = mm;
  g.shake = Math.max(0, g.shake - dt);
  mmBg.forEach(s => { s.y += s.z * 40 * dt * (1 + g.level * .1); if (s.y > MM.H) { s.y = 0; s.x = Math.random() * MM.W; } });
  g.parts = g.parts.filter(p => (p.life -= dt) > 0);
  g.parts.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; });
  g.texts = g.texts.filter(t => (t.life -= dt) > 0);
  g.texts.forEach(t => { t.y -= 30 * dt; });
  if (g.banner && (g.banner.t -= dt) <= 0) g.banner = null;
  if (g.state === "quiz") { mmTickQuiz(dt); return; }

  const live = g.state === "play";
  const L = live ? g.level : 1;
  if (live) {
    g.t += dt;
    g.score += dt * 10;
    g.inv = Math.max(0, g.inv - dt);
    g.shield = Math.max(0, g.shield - dt);
    g.stormT -= dt;
    mmMovePlayer(dt);
  } else {
    g.py = MM.H - 70 + Math.sin(performance.now() / 400) * 4;   // idle bobbing
  }

  // spawn meteors (storm = 2.6x faster)
  g.spawnT -= dt * (g.stormT > 0 ? 2.6 : 1);
  if (g.spawnT <= 0) {
    g.spawnT = Math.max(.16, .85 * Math.pow(.88, L - 1)) * mmRand(.7, 1.3) * (live ? 1 : 2.2);
    mmSpawnMeteor(L);
    if (live && L >= 5 && Math.random() < .25) mmSpawnMeteor(L);
  }
  // spawn stars
  if (live) {
    g.starT -= dt;
    if (g.starT <= 0) { g.starT = mmRand(1.6, 3); g.pickups.push({ x: mmRand(30, MM.W - 30), y: -12, vy: 80 + L * 5, r: 11, rot: 0 }); }
  }

  for (let i = g.meteors.length - 1; i >= 0; i--) {
    const m = g.meteors[i];
    m.x += m.vx * dt; m.y += m.vy * dt; m.rot += m.vr * dt;
    if (m.y > MM.H + 70 || m.x < -90 || m.x > MM.W + 90) { g.meteors.splice(i, 1); if (live) g.score += 2; continue; }
    if (!live) continue;
    const reach = m.r * .85 + (g.shield > 0 ? 30 : 13) * g.size;
    if (Math.hypot(m.x - g.px, m.y - g.py) < reach) {
      if (g.shield > 0) {                      // shield smashes it
        g.score += 10; mmBurst(m.x, m.y, "#8bd3ff", 12, 150); mmText(m.x, m.y, "+10", "#8bd3ff"); beep(500, .06, "triangle", .05);
        g.meteors.splice(i, 1);
      } else if (g.inv <= 0) {                 // ouch
        g.lives--; g.inv = 1.8; g.shake = .45;
        mmBurst(g.px, g.py, "#ff7373", 24, 220); sfx.wrong();
        g.meteors.splice(i, 1);
        if (g.lives <= 0) { mmGameOver(); return; }
      }
    }
  }
  for (let i = g.pickups.length - 1; i >= 0; i--) {
    const s = g.pickups[i];
    s.y += s.vy * dt; s.rot += dt * 3;
    const d = Math.hypot(s.x - g.px, s.y - g.py);
    if (live && d < 90) { s.x += (g.px - s.x) * dt * 4; s.y += (g.py - s.y) * dt * 4; }   // magnet
    if (s.y > MM.H + 20) { g.pickups.splice(i, 1); continue; }
    if (live && d < s.r + 18 * g.size) {
      g.stars++; g.score += 25;
      mmBurst(s.x, s.y, "#ffd166", 10, 130); mmText(s.x, s.y, "+25", "#ffd166");
      beep(900, .07, "square", .04); beep(1300, .09, "square", .04, .06);
      g.pickups.splice(i, 1);
    }
  }
  if (live && g.t >= g.nextQ) mmStartChallenge();
}
function mmMovePlayer(dt) {
  const g = mm, k = mmKeys;
  const dx = (k.arrowright || k.d ? 1 : 0) - (k.arrowleft || k.a ? 1 : 0);
  const dy = (k.arrowdown || k.s ? 1 : 0) - (k.arrowup || k.w ? 1 : 0);
  if (dx || dy) {
    const n = Math.hypot(dx, dy);
    g.px += dx / n * 340 * dt; g.py += dy / n * 340 * dt;
    mmPointer = null;
  } else if (mmPointer) {
    const f = Math.min(1, dt * 9);
    g.px += (mmPointer.x - g.px) * f; g.py += (mmPointer.y - g.py) * f;
  }
  g.px = Math.max(20, Math.min(MM.W - 20, g.px));
  g.py = Math.max(50, Math.min(MM.H - 22, g.py));
}
function mmSpawnMeteor(L) {
  const g = mm;
  const r = mmRand(12, 26) + (L >= 4 && Math.random() < .2 ? 16 : 0);
  const fast = L >= 3 && Math.random() < .25;
  const speed = Math.min(430, 120 + L * 20 + Math.random() * 90) * (fast ? 1.5 : 1);
  const x = mmRand(0, MM.W);
  let vx = (Math.random() - .5) * (L >= 2 ? 60 + L * 14 : 20);
  if (g.state === "play" && L >= 4 && Math.random() < .3) vx = (g.px - x) / ((MM.H - g.py) / speed + .5) * .8;   // aimed at you
  const pts = Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2, rr = r * mmRand(.75, 1.1); return [Math.cos(a) * rr, Math.sin(a) * rr]; });
  g.meteors.push({ x, y: -r * 2, r, vx, vy: speed, rot: 0, vr: mmRand(-2, 2), fast, pts });
}
function mmBurst(x, y, color, n, speed) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = Math.random() * speed;
    mm.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: mmRand(.3, .7), max: .7, c: color, s: 2 + Math.random() * 3 });
  }
}
function mmText(x, y, str, color) { mm.texts.push({ x, y, str, color, life: .9 }); }
function mmLevelUp() {
  const g = mm;
  g.level++;
  g.nextQ = g.t + MM.EVERY;
  g.banner = { text: `LEVEL ${g.level}`, sub: "MORE METEORS!", t: 2 };
  sfx.levelUp();
}

/* ---------------- Knowledge challenge ---------------- */
function mmPickQuestion() {
  const ok = q => ["multiple", "truefalse", "identification"].includes(q.type) && !q.image;
  const pool = bank.questions.filter(ok);
  let fresh = pool.filter(q => !mm.used.has(q.uid));
  if (!fresh.length) { mm.used.clear(); fresh = pool; }
  if (!fresh.length) return null;
  fresh.sort((a, b) => priority(b) - priority(a));
  const q = fresh[Math.floor(Math.random() * Math.min(8, fresh.length))];
  mm.used.add(q.uid);
  return q;
}
function mmStartChallenge() {
  const g = mm, q = mmPickQuestion();
  if (!q) { mmLevelUp(); return; }
  g.state = "quiz"; g.q = q; g.qLeft = MM.QTIME; g.qDone = false;
  sfx.combo();
  const cat = getCategory(q.cat);
  mmOverlay(box => {
    const meta = el("div", "question-meta");
    meta.append(el("span", "review-tag", `☄ CHALLENGE · ${cat ? cat.name : "MIX"}`), el("span", null, `+${150 + 25 * g.level} PTS · 🛡 SHIELD`));
    const bar = el("div", "timer-bar"), fill = el("i"); fill.id = "mm-qfill"; bar.appendChild(fill);
    const text = el("h2", "mm-qtext" + (q.question.length > 90 ? " long" : ""), q.question);
    const area = el("div", "answer-area"); area.id = "mm-answers";
    if (q.type === "identification") {
      const input = document.createElement("input");
      input.className = "answer-input"; input.id = "mm-ident"; input.type = "text"; input.autocomplete = "off"; input.placeholder = "Type your answer...";
      input.addEventListener("keydown", e => { if (e.key === "Enter") mmAnswer(); });
      area.append(input, mmButton("SUBMIT →", "btn-primary", () => mmAnswer()));
      setTimeout(() => input.focus(), 50);
    } else {
      const options = q.type === "multiple" ? shuffleOptions(q) : shuffle(q.options);
      options.forEach((option, i) => {
        const b = el("button", "answer-option");
        b.type = "button"; b.dataset.value = option;
        b.append(el("span", "key", String(i + 1)), el("span", "label", option));
        b.addEventListener("click", () => mmAnswer(option));
        area.appendChild(b);
      });
    }
    const fb = el("div", "feedback hidden"); fb.id = "mm-feedback";
    const next = mmButton("CONTINUE → (ENTER)", "btn-primary hidden", mmContinue); next.id = "mm-continue";
    box.append(meta, bar, text, area, fb, el("div", "quiz-actions", "")); 
    box.lastChild.appendChild(next);
  });
}
function mmTickQuiz(dt) {
  const g = mm;
  if (g.qDone) return;
  g.qLeft -= dt;
  const fill = $("mm-qfill");
  if (fill) { fill.style.width = `${Math.max(0, g.qLeft / MM.QTIME) * 100}%`; fill.classList.toggle("low", g.qLeft < 6); }
  if (g.qLeft <= 0) mmAnswer(null);
}
function mmAnswer(ans) {
  const g = mm, q = g.q;
  if (g.state !== "quiz" || g.qDone) return;
  let value = ans;
  if (q.type === "identification" && ans === undefined) value = $("mm-ident").value;
  if (value !== null && String(value).trim() === "") { toast("Type an answer first!"); return; }
  g.qDone = true; g.qTotal++;
  const ok = value !== null && isCorrect(q, value);
  recordStat(q, ok);
  $("mm-answers").querySelectorAll(".answer-option").forEach(b => {
    b.disabled = true;
    if (b.dataset.value === q.answer) b.classList.add("correct");
    else if (value === b.dataset.value) b.classList.add("incorrect");
  });
  const input = $("mm-ident"); if (input) input.disabled = true;
  const fb = $("mm-feedback");
  if (ok) {
    g.streak++; g.qCorrect++;
    const secs = 10 + 2 * Math.min(g.streak - 1, 4), pts = 150 + 25 * g.level;
    g.shield = Math.max(g.shield, secs); g.score += pts;
    fb.className = "feedback good";
    fb.textContent = `✓ Correct! 🛡 Shield online for ${secs}s. +${pts} pts. ${q.explanation || ""}`;
    sfx.correct();
  } else {
    g.streak = 0; g.stormT = 6; g.size = Math.min(2.5, g.size + .35);
    g.missed.push({ question: q.question, answer: formatCorrectAnswer(q) });
    fb.className = "feedback bad";
    fb.textContent = `✗ ${value === null ? "Time's up!" : "Not quite."} Answer: ${formatCorrectAnswer(q)}. ${q.explanation || ""} ☄ METEOR SHOWER incoming and 🚀 your rocket grew bigger!`;
    sfx.wrong();
  }
  $("mm-continue").classList.remove("hidden");
}
function mmContinue() {
  const g = mm;
  if (!g || g.state !== "quiz" || !g.qDone) return;
  $("mm-overlay").classList.add("hidden");
  g.state = "play"; g.q = null;
  g.inv = Math.max(g.inv, 1.5);
  mmLevelUp();
  if (g.stormT > 0) g.banner.sub = "☄ METEOR SHOWER!";
}

/* ---------------- Game over ---------------- */
function mmGameOver() {
  const g = mm;
  g.state = "over"; sfx.lose();
  const score = Math.floor(g.score), prevBest = mmBest(), isBest = score > prevBest;
  if (isBest) { try { localStorage.setItem(MM.BEST, String(score)); } catch { /* storage blocked */ } }
  const xp = g.qCorrect * 75, coins = g.stars;
  save.xp += xp; save.coins += coins; save.level = levelFor(save.xp);
  persistSave();
  $("mm-best").textContent = `BEST ${Math.max(score, prevBest)}`;
  mmOverlay(box => {
    const stats = el("div", "result-stats");
    [["SCORE", score], ["LEVEL", g.level], ["STARS", g.stars], ["CHALLENGES", `${g.qCorrect}/${g.qTotal}`]].forEach(([k, v]) => {
      const c = el("div", "result-card"); c.append(el("span", null, k), el("b", null, String(v))); stats.appendChild(c);
    });
    box.append(el("h2", null, isBest ? "💥 NEW BEST!" : "💥 CRASHED!"), stats,
      el("p", null, `Earned +${xp} XP and +${coins} coins for your main adventure.`));
    if (g.missed.length) {
      box.appendChild(el("h3", null, "📖 Review these"));
      g.missed.slice(0, 5).forEach(m => box.appendChild(el("p", "mistake-item", `${m.question} → ${m.answer}`)));
    }
    const row = el("div", "button-row centered");
    row.append(mmButton("↻ PLAY AGAIN", "btn-primary", mmBegin), mmButton("MODE SELECT", "btn-secondary", () => showScreen("mode-screen")));
    box.appendChild(row);
  });
}

/* ---------------- Draw ---------------- */
function mmStarPath(c, x, y, r, rot) {
  c.beginPath();
  for (let i = 0; i < 10; i++) { const a = rot + i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * .45 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  c.closePath();
}
function mmDraw() {
  const g = mm, c = mmCtx, now = performance.now();
  c.save();
  if (g.shake > 0) c.translate(mmRand(-6, 6) * g.shake * 2, mmRand(-6, 6) * g.shake * 2);
  c.fillStyle = mmSky; c.fillRect(-10, -10, MM.W + 20, MM.H + 20);
  mmBg.forEach(s => { c.globalAlpha = .35 + s.z * .5; c.fillStyle = "#e7f5e8"; c.fillRect(s.x, s.y, s.s, s.s); });
  c.globalAlpha = 1;

  g.pickups.forEach(s => {
    c.shadowColor = "#ffd166"; c.shadowBlur = 14; c.fillStyle = "#ffd166";
    mmStarPath(c, s.x, s.y, s.r, s.rot); c.fill(); c.shadowBlur = 0;
  });
  g.meteors.forEach(m => {
    const sp = Math.hypot(m.vx, m.vy), len = 40 + m.r * 1.6;
    const tx = -m.vx / sp * len, ty = -m.vy / sp * len;
    const grad = c.createLinearGradient(m.x, m.y, m.x + tx, m.y + ty);
    grad.addColorStop(0, m.fast ? "rgba(255,90,90,.85)" : "rgba(255,170,60,.8)"); grad.addColorStop(1, "rgba(255,170,60,0)");
    c.strokeStyle = grad; c.lineWidth = m.r * 1.4; c.lineCap = "round";
    c.beginPath(); c.moveTo(m.x, m.y); c.lineTo(m.x + tx, m.y + ty); c.stroke();
    c.save(); c.translate(m.x, m.y); c.rotate(m.rot);
    c.fillStyle = m.fast ? "#b5524a" : "#8a6a52"; c.strokeStyle = "#2f211c"; c.lineWidth = 3;
    c.beginPath(); m.pts.forEach(([x, y]) => c.lineTo(x, y)); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = "rgba(0,0,0,.25)"; c.beginPath(); c.arc(-m.r * .25, -m.r * .15, m.r * .22, 0, 7); c.arc(m.r * .3, m.r * .25, m.r * .15, 0, 7); c.fill();
    c.restore();
  });
  g.parts.forEach(p => { c.globalAlpha = Math.max(0, p.life / p.max); c.fillStyle = p.c; c.fillRect(p.x, p.y, p.s, p.s); });
  c.globalAlpha = 1;

  // player ship (blinks while invulnerable)
  if (!(g.inv > 0 && g.shield <= 0 && Math.floor(now / 80) % 2)) {
    c.save(); c.translate(g.px, g.py); c.scale(g.size, g.size);
    c.fillStyle = "#ffb347"; c.beginPath(); c.moveTo(-6, 12); c.lineTo(0, 14 + mmRand(6, 16)); c.lineTo(6, 12); c.fill();
    c.fillStyle = "#8bd3ff"; c.strokeStyle = "#26384f"; c.lineWidth = 3;
    c.beginPath(); c.moveTo(0, -18); c.lineTo(14, 14); c.lineTo(0, 8); c.lineTo(-14, 14); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = "#ffd166"; c.fillRect(-3, -6, 6, 8);
    c.restore();
  }
  if (g.shield > 0 && !(g.shield < 2.5 && Math.floor(now / 100) % 2)) {
    const r = (30 + Math.sin(now / 120) * 2) * g.size;
    c.fillStyle = "rgba(139,211,255,.18)"; c.strokeStyle = "rgba(139,211,255,.9)"; c.lineWidth = 3;
    c.beginPath(); c.arc(g.px, g.py, r, 0, 7); c.fill(); c.stroke();
  }
  c.font = "14px 'Press Start 2P', monospace"; c.textAlign = "center";
  g.texts.forEach(t => { c.globalAlpha = Math.min(1, t.life * 2); c.fillStyle = t.color; c.fillText(t.str, t.x, t.y); });
  c.globalAlpha = 1;
  if (g.state === "play" && g.stormT > 0) {
    c.fillStyle = `rgba(255,60,60,${.08 + .06 * Math.sin(now / 90)})`; c.fillRect(0, 0, MM.W, MM.H);
    c.fillStyle = "#ff7373"; c.fillText("☄ METEOR SHOWER! ☄", MM.W / 2, 90);
  }
  if (g.banner) {
    c.globalAlpha = Math.min(1, g.banner.t); c.fillStyle = "#ffd166"; c.font = "30px 'Press Start 2P', monospace";
    c.fillText(g.banner.text, MM.W / 2, MM.H / 2 - 10);
    c.font = "14px 'Press Start 2P', monospace"; c.fillStyle = "#f8f0d8"; c.fillText(g.banner.sub, MM.W / 2, MM.H / 2 + 26);
    c.globalAlpha = 1;
  }
  c.restore();
}
function mmHud() {
  const g = mm, set = (id, v) => { const n = $(id); if (n.textContent !== v) n.textContent = v; };
  set("mm-hearts", "♥ ".repeat(g.lives) + "♡ ".repeat(MM.LIVES - g.lives));
  set("mm-score", String(Math.floor(g.score)));
  set("mm-level", String(g.level));
  set("mm-stars", String(g.stars));
  set("mm-shield", g.shield > 0 ? `🛡 ${Math.ceil(g.shield)}s` : "OFF");
  const left = Math.max(0, g.nextQ - g.t);
  set("mm-next", g.state === "quiz" ? "NOW!" : `${Math.ceil(left)}s`);
  $("mm-next-fill").style.width = `${Math.min(100, (1 - left / MM.EVERY) * 100)}%`;
}

function mmPos(e) {
  const r = mmCanvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) * MM.W / r.width, y: (e.clientY - r.top) * MM.H / r.height - (e.pointerType === "touch" ? 50 : 0) };
}
mmCanvas.addEventListener("pointermove", e => { if (mm && mm.state === "play") mmPointer = mmPos(e); });
mmCanvas.addEventListener("pointerdown", e => { if (mm && mm.state === "play") mmPointer = mmPos(e); });
document.addEventListener("keydown", e => {
  if (!$("mode-screen").classList.contains("hidden") && $("modal").classList.contains("hidden")) {
    if (e.key === "1") $("mode-realm").click();
    if (e.key === "2") $("mode-meteor").click();
    return;
  }
  if ($("meteor-screen").classList.contains("hidden") || !mm) return;
  if ((e.target.tagName || "").toLowerCase() === "input") return;
  const k = e.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
  mmKeys[k] = true;
  if ((mm.state === "ready" || mm.state === "over") && (k === "enter" || k === " ")) mmBegin();
  else if (mm.state === "quiz" && !mm.qDone && /^[1-9]$/.test(k)) { const b = $("mm-answers").querySelectorAll(".answer-option")[Number(k) - 1]; if (b) b.click(); }
  else if (mm.state === "quiz" && mm.qDone && (k === "enter" || k === " ")) mmContinue();
});
document.addEventListener("keyup", e => { mmKeys[e.key.toLowerCase()] = false; });
$("mode-realm").addEventListener("click", () => { sfx.click(); goMap(); });
$("mode-meteor").addEventListener("click", () => { sfx.click(); mmOpen(); });
$("mode-back").addEventListener("click", () => showScreen("home-screen"));
$("mm-exit").addEventListener("click", () => {
  if (mm && (mm.state === "play" || mm.state === "quiz") && !confirm("Leave this run? Your score and rewards for it will be lost.")) return;
  showScreen("mode-screen");
});