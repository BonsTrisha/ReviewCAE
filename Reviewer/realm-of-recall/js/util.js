// ============================================================
// util.js: small helpers shared by every other script
// ============================================================
const $ = (id) => document.getElementById(id);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function clone(value) { return JSON.parse(JSON.stringify(value)); }

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

let toastTimer = null;
function toast(message) {
  const node = $("toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 3000);
}

/* ---------- Tiny sound effects (Web Audio, no files needed) ---------- */
let audioCtx = null;
function beep(freq, dur, type = "square", vol = 0.05, delay = 0) {
  if (typeof bank !== "undefined" && bank.settings && bank.settings.sound === false) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const t = audioCtx.currentTime + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  } catch { /* audio blocked: stay silent */ }
}
const sfx = {
  click()   { beep(520, 0.05); },
  correct() { beep(660, 0.1); beep(880, 0.16, "square", 0.05, 0.09); },
  combo()   { beep(660, 0.08); beep(880, 0.08, "square", 0.05, 0.07); beep(1175, 0.18, "square", 0.05, 0.14); },
  wrong()   { beep(180, 0.28, "sawtooth", 0.06); },
  tick()    { beep(900, 0.04, "square", 0.03); },
  levelUp() { [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.16, "square", 0.05, i * 0.11)); },
  win()     { [392, 523, 659, 784, 1047].forEach((f, i) => beep(f, 0.18, "triangle", 0.07, i * 0.12)); },
  lose()    { [330, 262, 196].forEach((f, i) => beep(f, 0.25, "sawtooth", 0.05, i * 0.18)); }
};
