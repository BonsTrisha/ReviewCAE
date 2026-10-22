// ============================================================
// main.js: the game engine (map, study sheet, battles, scoreboard)
// Questions and categories live in bank.js and are edited in editor.js.
// ============================================================

const screens = ["home-screen", "how-screen", "map-screen", "lesson-screen", "study-screen", "quiz-screen", "results-screen", "scoreboard-screen", "editor-screen", "mode-screen", "meteor-screen"];
const SAVE_KEY = "realmOfRecallSave";
const XP_PER_LEVEL = 500;
const MAX_HEARTS = 5;
const BOSS_ID = "final-boss";

let save = loadSave();
let stages = [];
let selectedStage = null;
let battle = [];
let currentOptions = [];
let matchOrder = [];
let questionIndex = 0;
let hearts = MAX_HEARTS;
let runXP = 0;
let runCoins = 0;
let correctCount = 0;
let answeredCount = 0;
let streak = 0;
let runBestStreak = 0;
let mistakes = [];
let selectedAnswer = null;
let submitted = false;
let hintUsed = false;
let timerId = null;
let timeLeft = 120;
let timeLimit = 120;
let deadline = 0;
let defeated = false;

/* ---------------- Save data ---------------- */
function freshSave() {
  return {
    coins: 0, xp: 0, level: 1,
    completedStages: [], bestAccuracy: {}, bestScore: {},
    battles: 0, answered: 0, correct: 0, bestStreak: 0, bossWins: 0,
    qstats: {}, history: []
  };
}
function levelFor(xp) { return Math.floor(xp / XP_PER_LEVEL) + 1; }
function loadSave() {
  try {
    const stored = JSON.parse(localStorage.getItem(SAVE_KEY));
    const merged = stored && typeof stored === "object" ? { ...freshSave(), ...stored } : freshSave();
    if (!Array.isArray(merged.completedStages)) merged.completedStages = [];
    ["bestAccuracy", "bestScore", "qstats"].forEach(k => { if (!merged[k] || typeof merged[k] !== "object") merged[k] = {}; });
    if (!Array.isArray(merged.history)) merged.history = [];
    merged.level = levelFor(merged.xp);
    return merged;
  } catch {
    return freshSave();
  }
}
function persistSave() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch { /* storage blocked: keep playing */ }
  updateHeader();
}
function updateHeader() {
  $("header-coins").textContent = save.coins;
  $("header-level").textContent = save.level;
  $("header-score").textContent = save.xp;
  const into = save.xp % XP_PER_LEVEL;
  $("xp-fill").style.width = `${(into / XP_PER_LEVEL) * 100}%`;
  $("xp-strip").title = `${into} / ${XP_PER_LEVEL} XP to level ${save.level + 1}`;
  $("sound-button").textContent = bank.settings.sound ? "🔊" : "🔇";
}

/* ---------------- Helpers ---------------- */
function showScreen(id) {
  stopTimer();
  if (typeof meteorStop === "function") meteorStop();
  screens.forEach(screen => $(screen).classList.toggle("hidden", screen !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function normalize(value) {
  return String(value || "").trim().toLowerCase()
    .replace(/[\u2212\u2013\u2014]/g, "-")   // unicode minus/dashes -> hyphen
    .replace(/[,$\s]/g, "");                  // ignore commas, dollar signs, spaces
}
function currentQ() { return battle[questionIndex]; }
function labelFor(q) { return q.label || TYPE_NAMES[q.type] || "QUESTION"; }
function fmtTime(s) { return s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : String(s); }
function bossUnlocked() { return save.level >= bank.settings.bossUnlockLevel; }

// Options that must stay at the bottom ("None of the above", "No error", ...).
const PINNED = /^(none|all|both|neither)\b.*\b(above|these|them)\b|^no error$|^no solution$|^there is no such|^it cannot be determined|^cannot be determined/i;
function shuffleOptions(q) {
  if (q.fixedOrder || q.image) return [...q.options];
  const free = q.options.filter(o => !PINNED.test(String(o).trim()));
  const pinned = q.options.filter(o => PINNED.test(String(o).trim()));
  return [...shuffle(free), ...pinned];
}

/* ---------------- Stages (categories + final boss) ---------------- */
function bossPool() {
  return bank.categories.flatMap(c => questionsOf(c.id));
}
function makeBoss() {
  const pool = bossPool();
  return {
    id: BOSS_ID, isBoss: true, icon: "👑", name: "FINAL BOSS", fullName: "The Fog King",
    subtitle: "Every category mixed", questions: pool,
    description: "The Fog King throws questions from every category at you. Lose all your hearts and he wins.",
    intro: "This is the final test. Questions from every category are mixed together.",
    enemy: "THE FOG KING", enemyColor: "#b3374a",
    victoryMessage: "The Fog King shatters! The Forgotten Fog is gone and the Realm is saved!",
    reviewTitle: "Boss Briefing",
    review: [
      { tag: "MIX", color: "html-tag", text: `The Fog King asks ${bank.settings.bossSize} questions picked evenly from all categories.` },
      { tag: "HEARTS", color: "css-tag", text: "You have 5 hearts. Each wrong answer or timeout costs one. At zero, the battle is lost." },
      { tag: "TIME", color: "js-tag", text: `You get ${fmtTime(bank.settings.timePerQuestion)} per question. Fast answers earn bonus XP and streaks add even more.` },
      { tag: "CLEAR", color: "study-tag", text: `Score ${bank.settings.passMark}% or more to defeat him.` }
    ]
  };
}
function refreshStages() {
  const previousId = selectedStage && selectedStage.id;
  stages = sortedCategories().map(c => ({ ...c, questions: questionsOf(c.id) }));
  const all = [...stages, makeBoss()];
  selectedStage = all.find(s => s.id === previousId) || all[0];
  return all;
}

/* ---------------- World map ---------------- */
function renderMap() {
  const all = refreshStages();
  const map = $("world-map");
  map.querySelectorAll(".world-node").forEach(node => node.remove());
  map.classList.toggle("multi-row", all.length > 4);
  all.forEach(stage => {
    const done = save.completedStages.includes(stage.id);
    const best = save.bestAccuracy[stage.id];
    const locked = stage.isBoss && !bossUnlocked();
    const empty = stage.questions.length === 0;
    const node = el("button", "world-node" + (stage === selectedStage ? " current" : "") + (done ? " done" : "") + (locked ? " locked" : "") + (stage.isBoss ? " boss-node" : ""));
    node.type = "button";
    let status = done ? `✓ CLEARED${best !== undefined ? " · " + best + "%" : ""}` : (best !== undefined ? `BEST ${best}%` : "AVAILABLE");
    if (locked) status = `🔒 REACH LV ${bank.settings.bossUnlockLevel}`;
    else if (empty) status = "EMPTY";
    node.append(
      el("span", "node-icon", locked ? "🔒" : (stage.icon || "⚔️")),
      el("b", null, stage.name),
      el("small", null, `${stage.questions.length} questions`),
      el("span", "node-status", status)
    );
    if (!stage.isBoss && stage.questions.length) {
      const bar = el("span", "node-bar");
      bar.title = "Questions you have answered correctly at least once";
      const fill = el("i");
      fill.style.width = `${masteryOf(stage.questions)}%`;
      bar.appendChild(fill);
      node.appendChild(bar);
    }
    node.addEventListener("click", () => { sfx.click(); selectedStage = stage; renderMap(); });
    map.appendChild(node);
  });
  const stage = selectedStage;
  const locked = stage.isBoss && !bossUnlocked();
  const empty = stage.questions.length === 0;
  const index = all.indexOf(stage) + 1;
  const best = save.bestAccuracy[stage.id];
  $("stage-eyebrow").textContent = stage.isBoss ? "FINAL BOSS" : `STAGE ${String(index).padStart(2, "0")}`;
  $("stage-title").textContent = stage.fullName || stage.name;
  if (locked) {
    const need = bank.settings.bossUnlockLevel * XP_PER_LEVEL - XP_PER_LEVEL - save.xp;
    $("stage-desc").textContent = `Locked. Reach level ${bank.settings.bossUnlockLevel} to challenge the Fog King. You are level ${save.level}; earn ${Math.max(0, need)} more XP by winning battles.`;
    $("stage-stats").textContent = "🔒 LOCKED";
  } else if (empty) {
    $("stage-desc").textContent = (stage.description || "") + " This category has no questions yet. Add some in EDIT QUESTIONS.";
    $("stage-stats").textContent = "0 QUESTIONS";
  } else {
    $("stage-desc").textContent = stage.description || "";
    $("stage-stats").textContent = (stage.isBoss ? `${Math.min(bank.settings.bossSize, stage.questions.length)} QUESTIONS PER BATTLE` : `${stage.questions.length} QUESTIONS`) + (best !== undefined ? ` · BEST ${best}%` : "");
  }
  $("enter-stage").disabled = locked || empty;
  $("study-stage").disabled = locked || empty;
}

function masteryOf(questions) {
  if (!questions.length) return 0;
  const known = questions.filter(q => (save.qstats[q.uid] || {}).right > 0).length;
  return Math.round((known / questions.length) * 100);
}

/* ---------------- Lesson + study sheet ---------------- */
function renderLesson() {
  const stage = selectedStage;
  $("lesson-eyebrow").textContent = `${stage.name} · PREPARATION`;
  $("lesson-intro").textContent = stage.intro || "Read the notes, then face the guardian.";
  const box = $("lesson-content");
  box.innerHTML = "";
  box.appendChild(el("h3", null, stage.reviewTitle || "Quick Review"));
  const notes = stage.review || [];
  if (!notes.length) box.appendChild(el("p", null, "No study notes yet. Add some under EDIT QUESTIONS > EDIT CATEGORY."));
  notes.forEach(item => {
    const row = el("div", "review-row");
    row.append(el("span", "review-tag " + (item.color || "study-tag"), item.tag), el("p", null, item.text));
    box.appendChild(row);
  });
}

function formatOptions(q) {
  if (q.image) return "";
  if (q.type === "multiple") return q.options.join("  ·  ");
  if (q.type === "matching") return "Choices: " + q.choices.join("  ·  ");
  return "";
}
function formatCorrectAnswer(q) {
  if (q.type === "matching") return q.pairs.map(p => `${p.item} = ${p.answer}`).join("; ");
  return q.answer;
}

function renderStudy() {
  const stage = selectedStage;
  $("study-eyebrow").textContent = `${stage.name} · STUDY SHEET`;
  $("study-search").value = "";
  const list = $("study-list");
  list.innerHTML = "";
  stage.questions.forEach((q, i) => {
    const item = el("div", "study-item");
    const top = el("div", "study-top");
    top.append(el("span", "review-tag", `#${i + 1}`), el("span", "review-tag", labelFor(q)));
    if (stage.isBoss) { const c = getCategory(q.cat); if (c) top.appendChild(el("span", "review-tag study-tag", c.name)); }
    item.append(top, el("p", "study-q", q.question));
    if (q.image) { const img = el("img", "study-image"); img.src = q.image; img.alt = "Question picture"; item.appendChild(img); }
    const options = formatOptions(q);
    if (options) item.appendChild(el("p", "study-options", options));
    item.appendChild(el("p", "study-answer", "Answer: " + formatCorrectAnswer(q)));
    if (q.explanation) item.appendChild(el("p", "study-explain", q.explanation));
    item.dataset.search = (q.question + " " + formatCorrectAnswer(q) + " " + (q.explanation || "")).toLowerCase();
    list.appendChild(item);
  });
  $("study-count").textContent = `${stage.questions.length} questions`;
}
function filterStudy() {
  const term = $("study-search").value.trim().toLowerCase();
  let shown = 0;
  $("study-list").querySelectorAll(".study-item").forEach(item => {
    const match = !term || item.dataset.search.includes(term);
    item.classList.toggle("hidden", !match);
    if (match) shown++;
  });
  $("study-count").textContent = `${shown} question${shown === 1 ? "" : "s"}`;
}

/* ---------------- Scoreboard ---------------- */
function renderScoreboard() {
  refreshStages();
  const accuracy = save.answered ? Math.round((save.correct / save.answered) * 100) : 0;
  const into = save.xp % XP_PER_LEVEL;
  $("sb-score").textContent = save.xp;
  $("sb-level").textContent = save.level;
  $("sb-xpnote").textContent = `${into}/${XP_PER_LEVEL} XP to level ${save.level + 1}`;
  $("sb-coins").textContent = save.coins;
  $("sb-battles").textContent = save.battles;
  $("sb-accuracy").textContent = save.answered ? `${accuracy}%` : "-";
  $("sb-streak").textContent = save.bestStreak;
  $("sb-boss").textContent = bossUnlocked() ? (save.bossWins ? `${save.bossWins} WON` : "UNLOCKED") : `🔒 LV ${bank.settings.bossUnlockLevel}`;

  const table = $("sb-table");
  table.innerHTML = "";
  const head = el("div", "sb-row sb-head");
  ["CATEGORY", "QUESTIONS", "MASTERED", "BEST ACC.", "BEST SCORE", "STATUS"].forEach(t => head.appendChild(el("span", null, t)));
  table.appendChild(head);
  [...stages, makeBoss()].forEach(stage => {
    const row = el("div", "sb-row");
    const done = save.completedStages.includes(stage.id);
    const best = save.bestAccuracy[stage.id];
    const status = stage.isBoss && !bossUnlocked() ? "🔒 LOCKED" : (done ? "✓ CLEARED" : "TO DO");
    row.append(
      el("span", "sb-name", `${stage.icon || ""} ${stage.name}`),
      el("span", null, String(stage.questions.length)),
      el("span", null, stage.isBoss ? "-" : `${masteryOf(stage.questions)}%`),
      el("span", null, best !== undefined ? `${best}%` : "-"),
      el("span", null, save.bestScore[stage.id] !== undefined ? String(save.bestScore[stage.id]) : "-"),
      el("span", done ? "sb-done" : null, status)
    );
    table.appendChild(row);
  });

  const recent = $("sb-recent");
  recent.innerHTML = "";
  if (!save.history.length) recent.appendChild(el("p", null, "No battles yet. Start a quest!"));
  save.history.forEach(h => {
    const row = el("div", "sb-row sb-recent-row");
    row.append(
      el("span", "sb-name", h.name),
      el("span", null, `${h.score} XP`),
      el("span", null, `${h.accuracy}%`),
      el("span", h.passed ? "sb-done" : "sb-fail", h.passed ? "✓ WON" : "✗ LOST"),
      el("span", "sb-date", new Date(h.when).toLocaleDateString())
    );
    recent.appendChild(row);
  });
}

/* ---------------- Navigation ---------------- */
function goMap() { renderMap(); showScreen("map-screen"); }
$("play-button").addEventListener("click", () => { sfx.click(); showScreen("mode-screen"); });
$("how-button").addEventListener("click", () => { sfx.click(); showScreen("how-screen"); });
$("score-button").addEventListener("click", () => { sfx.click(); renderScoreboard(); showScreen("scoreboard-screen"); });
$("edit-button").addEventListener("click", () => { sfx.click(); openEditor(); });
$("header-stats").addEventListener("click", () => { renderScoreboard(); showScreen("scoreboard-screen"); });
$("sound-button").addEventListener("click", () => {
  bank.settings.sound = !bank.settings.sound;
  saveBank();
  updateHeader();
  if (bank.settings.sound) sfx.click();
});
document.querySelectorAll(".back-home").forEach(btn => btn.addEventListener("click", () => showScreen("home-screen")));
$("enter-stage").addEventListener("click", () => { renderLesson(); showScreen("lesson-screen"); });
$("study-stage").addEventListener("click", () => { renderStudy(); showScreen("study-screen"); });
$("study-from-lesson").addEventListener("click", () => { renderStudy(); showScreen("study-screen"); });
$("results-study").addEventListener("click", () => { renderStudy(); showScreen("study-screen"); });
$("study-search").addEventListener("input", filterStudy);
$("study-battle").addEventListener("click", startQuiz);
$("study-back").addEventListener("click", goMap);
$("map-from-lesson").addEventListener("click", goMap);
$("begin-quiz").addEventListener("click", startQuiz);
$("quit-quiz").addEventListener("click", () => {
  if (confirm("Leave this battle? Your current attempt will not be saved.")) goMap();
});
$("submit-answer").addEventListener("click", submitCurrentAnswer);
$("next-question").addEventListener("click", nextQuestion);
$("hint-button").addEventListener("click", useHint);
$("retry-button").addEventListener("click", startQuiz);
$("results-map").addEventListener("click", goMap);
$("results-score").addEventListener("click", () => { renderScoreboard(); showScreen("scoreboard-screen"); });
$("sb-back").addEventListener("click", goMap);
$("sb-reset").addEventListener("click", () => {
  if (confirm("Reset ALL progress (score, level, coins, cleared stages)? Your questions are not touched.")) {
    save = freshSave();
    persistSave();
    renderScoreboard();
    toast("Progress reset.");
  }
});

// Keyboard: 1-5 pick an answer, Enter submits / continues
document.addEventListener("keydown", e => {
  if ($("quiz-screen").classList.contains("hidden") || $("modal").classList.contains("hidden") === false) return;
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;
  if (/^[1-9]$/.test(e.key) && !submitted) {
    const buttons = $("answer-area").querySelectorAll(".answer-option");
    const button = buttons[Number(e.key) - 1];
    if (button) button.click();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (submitted) nextQuestion(); else submitCurrentAnswer();
  }
});

/* ---------------- Battle ---------------- */
function priority(q) {
  const s = save.qstats[q.uid];
  let p = Math.random();
  if (!s || !s.seen) p += 0.6;                 // never seen: ask sooner
  else if ((s.wrong || 0) > (s.right || 0)) p += 0.5;  // missed more than hit: ask sooner
  return p;
}
function pickQuestions(pool, size) {
  return shuffle(pool.slice().sort((a, b) => priority(b) - priority(a)).slice(0, size));
}
function pickBoss(size) {
  const groups = bank.categories.map(c => questionsOf(c.id).sort((a, b) => priority(b) - priority(a))).filter(g => g.length);
  const picked = [];
  for (let round = 0; picked.length < size; round++) {
    let any = false;
    for (const group of shuffle(groups)) {
      if (picked.length >= size) break;
      if (group[round]) { picked.push(group[round]); any = true; }
    }
    if (!any) break;
  }
  return shuffle(picked);
}

function startQuiz() {
  stopTimer();
  const stage = selectedStage;
  if (stage.isBoss && !bossUnlocked()) { toast(`The Fog King is locked until level ${bank.settings.bossUnlockLevel}.`); return; }
  if (!stage.questions.length) { toast("This category has no questions yet. Add some in EDIT QUESTIONS."); return; }
  const size = stage.isBoss ? Math.min(bank.settings.bossSize, stage.questions.length) : Math.min(stage.battleSize || 10, stage.questions.length);
  battle = stage.isBoss ? pickBoss(size) : pickQuestions(stage.questions, size);
  questionIndex = 0;
  hearts = MAX_HEARTS;
  runXP = 0;
  runCoins = 0;
  correctCount = 0;
  answeredCount = 0;
  streak = 0;
  runBestStreak = 0;
  mistakes = [];
  defeated = false;
  $("quiz-title").textContent = `${stage.enemy || "GUARDIAN"} BATTLE`;
  $("enemy-name-text").textContent = stage.enemy || "GUARDIAN";
  $("enemy-sprite").style.setProperty("--enemy", stage.enemyColor || "#4c9a65");
  $("enemy-sprite").classList.toggle("boss", !!stage.isBoss);
  $("battle-arena").classList.toggle("boss-arena", !!stage.isBoss);
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  selectedAnswer = null;
  submitted = false;
  hintUsed = false;
  timeLimit = bank.settings.timePerQuestion;
  timeLeft = timeLimit;
  $("feedback").className = "feedback hidden";
  $("submit-answer").classList.remove("hidden");
  $("next-question").classList.add("hidden");
  $("submit-answer").disabled = false;
  $("hint-button").disabled = false;
  $("hint-button").textContent = "✨ USE HINT · 25 COINS";
  $("enemy-mood").textContent = "● READY";
  $("enemy-sprite").classList.remove("hit");

  const q = currentQ();
  const cat = getCategory(q.cat);
  $("question-count").textContent = `QUESTION ${questionIndex + 1}/${battle.length}`;
  $("type-label").textContent = selectedStage.isBoss && cat ? `${cat.name} · ${labelFor(q)}` : labelFor(q);
  $("question-points").textContent = `+${q.xp || 100} XP`;
  $("question-text").textContent = q.question;
  $("question-text").classList.toggle("long", q.question.length > 90);
  const wrap = $("question-image-wrap");
  wrap.innerHTML = "";
  if (q.image) {
    const img = el("img", "question-image");
    img.src = q.image;
    img.alt = "Question picture";
    wrap.appendChild(img);
  }
  wrap.classList.toggle("hidden", !q.image);
  updateHud();
  renderAnswerArea(q);
  startTimer();
}

function updateHud() {
  $("battle-xp").textContent = runXP;
  $("battle-coins").textContent = save.coins + runCoins;
  $("combo").textContent = streak >= 2 ? `🔥 x${streak}` : "x0";
  $("combo-box").classList.toggle("on-fire", streak >= 3);
  updateHearts();
}

function renderAnswerArea(q) {
  const area = $("answer-area");
  area.innerHTML = "";
  area.classList.toggle("letters", !!q.image);
  if (q.type === "multiple" || q.type === "truefalse") {
    currentOptions = q.type === "multiple" ? shuffleOptions(q) : shuffle(q.options);
    currentOptions.forEach((option, i) => {
      const button = document.createElement("button");
      button.className = "answer-option";
      button.type = "button";
      button.dataset.value = option;
      button.append(el("span", "key", String(i + 1)), el("span", "label", option));
      button.addEventListener("click", () => {
        if (submitted) return;
        sfx.click();
        selectedAnswer = option;
        area.querySelectorAll(".answer-option").forEach(b => b.classList.toggle("selected", b === button));
      });
      area.appendChild(button);
    });
  } else if (q.type === "identification") {
    const input = document.createElement("input");
    input.className = "answer-input";
    input.id = "identification-answer";
    input.type = "text";
    input.placeholder = "Type your answer here...";
    input.autocomplete = "off";
    input.addEventListener("input", () => selectedAnswer = input.value);
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !submitted) submitCurrentAnswer(); });
    area.appendChild(input);
    input.focus();
  } else if (q.type === "matching") {
    const choices = shuffle(q.choices);
    matchOrder = shuffle(q.pairs.map((_, i) => i));   // rows appear in a new order every time
    matchOrder.forEach(index => {
      const pair = q.pairs[index];
      const row = document.createElement("div");
      row.className = "matching-row";
      const label = document.createElement("label");
      label.textContent = pair.item;
      label.htmlFor = `match-${index}`;
      const select = document.createElement("select");
      select.className = "answer-input";
      select.id = `match-${index}`;
      select.innerHTML = '<option value="">Choose match...</option>';
      choices.forEach(choice => {
        const option = document.createElement("option");
        option.value = choice;
        option.textContent = choice;
        select.appendChild(option);
      });
      select.addEventListener("change", collectMatching);
      row.append(label, select);
      area.appendChild(row);
    });
  }
}

function collectMatching() {
  selectedAnswer = currentQ().pairs.map((_, i) => $(`match-${i}`).value);
}

function isCorrect(q, answer) {
  if (q.type === "identification") {
    const typed = normalize(answer);
    return [q.answer, ...(q.accepted || [])].some(a => typed === normalize(a));
  }
  if (q.type === "matching") {
    return Array.isArray(answer) && answer.length === q.pairs.length &&
      q.pairs.every((pair, i) => answer[i] === pair.answer) &&
      new Set(answer).size === answer.length;
  }
  return answer === q.answer;
}

function recordStat(q, ok) {
  const s = save.qstats[q.uid] || { seen: 0, right: 0, wrong: 0 };
  s.seen++;
  if (ok) s.right++; else s.wrong++;
  save.qstats[q.uid] = s;
}

function loseHeart() {
  hearts = Math.max(0, hearts - 1);
  streak = 0;
  if (selectedStage.isBoss && hearts === 0) defeated = true;
}

function showNextButton() {
  $("submit-answer").classList.add("hidden");
  $("next-question").classList.remove("hidden");
  $("next-question").textContent = defeated ? "CONTINUE →" : (questionIndex === battle.length - 1 ? "VIEW RESULTS →" : "NEXT QUESTION →");
  $("hint-button").disabled = true;
}

function submitCurrentAnswer() {
  if (submitted) return;
  const q = currentQ();
  if (q.type === "identification") selectedAnswer = $("identification-answer").value;
  if (q.type === "matching") collectMatching();
  const hasAnswer = Array.isArray(selectedAnswer)
    ? selectedAnswer.length === q.pairs.length && selectedAnswer.every(Boolean)
    : selectedAnswer !== null && String(selectedAnswer).trim() !== "";
  if (!hasAnswer) { toast("Choose or enter an answer first!"); return; }
  submitted = true;
  stopTimer();
  answeredCount++;
  const correct = isCorrect(q, selectedAnswer);
  recordStat(q, correct);
  if (q.type === "multiple" || q.type === "truefalse") {
    $("answer-area").querySelectorAll(".answer-option").forEach(button => {
      if (button.dataset.value === q.answer) button.classList.add("correct");
      else if (button.classList.contains("selected") && !correct) button.classList.add("incorrect");
    });
  }
  const feedback = $("feedback");
  if (correct) {
    streak++;
    runBestStreak = Math.max(runBestStreak, streak);
    correctCount++;
    const base = q.xp || 100;
    const fraction = timeLeft / timeLimit;
    const speed = fraction >= 0.75 ? 20 : (fraction >= 0.5 ? 10 : 0);
    const combo = Math.min(streak - 1, 5) * 10;
    const gained = base + speed + combo;
    runXP += gained;
    runCoins += 10;
    const extras = [speed ? `+${speed} speed` : "", combo ? `+${combo} combo` : ""].filter(Boolean).join(", ");
    $("enemy-mood").textContent = "● HIT!";
    $("enemy-sprite").classList.add("hit");
    feedback.className = "feedback good";
    feedback.textContent = `✓ Correct! +${gained} XP${extras ? " (" + extras + ")" : ""} and +10 coins. ${q.explanation || ""}`;
    (streak >= 3 ? sfx.combo : sfx.correct)();
  } else {
    loseHeart();
    $("enemy-mood").textContent = "● BLOCKED";
    feedback.className = "feedback bad";
    feedback.textContent = `✗ Not quite. Correct answer: ${formatCorrectAnswer(q)}. ${q.explanation || ""}${defeated ? " You have no hearts left!" : ""}`;
    mistakes.push({ question: q.question, answer: formatCorrectAnswer(q), explanation: q.explanation || "" });
    sfx.wrong();
  }
  feedback.classList.remove("hidden");
  showNextButton();
  updateHud();
}

function handleTimeout() {
  if (submitted) return;
  const q = currentQ();
  submitted = true;
  answeredCount++;
  recordStat(q, false);
  loseHeart();
  mistakes.push({ question: q.question, answer: formatCorrectAnswer(q), explanation: q.explanation || "" });
  if (q.type === "multiple" || q.type === "truefalse") {
    $("answer-area").querySelectorAll(".answer-option").forEach(b => { if (b.dataset.value === q.answer) b.classList.add("correct"); });
  }
  $("enemy-mood").textContent = "● TIME UP";
  $("feedback").className = "feedback bad";
  $("feedback").textContent = `⌛ Time's up! Correct answer: ${formatCorrectAnswer(q)}. ${q.explanation || ""}${defeated ? " You have no hearts left!" : ""}`;
  $("feedback").classList.remove("hidden");
  sfx.wrong();
  showNextButton();
  updateHud();
}

function nextQuestion() {
  if (defeated) { finishQuiz(); return; }
  if (questionIndex < battle.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function updateHearts() {
  $("hearts").textContent = "♥ ".repeat(hearts).trim() + (hearts < MAX_HEARTS ? " ♡ ".repeat(MAX_HEARTS - hearts).trim() : "");
}

function useHint() {
  if (submitted || hintUsed) return;
  if (save.coins + runCoins < 25) { toast("You need 25 coins to use a hint."); return; }
  const fromRun = Math.min(runCoins, 25);   // spend this run's coins first
  runCoins -= fromRun;
  save.coins -= (25 - fromRun);
  hintUsed = true;
  $("hint-button").disabled = true;
  $("hint-button").textContent = "HINT USED";
  const q = currentQ();
  const feedback = $("feedback");
  feedback.className = "feedback";
  feedback.textContent = `✨ Hint: ${q.hint || "No hint for this one."}`;
  feedback.classList.remove("hidden");
  persistSave();
  updateHud();
}

/* ---------------- Timer (120 seconds per question by default) ---------------- */
function renderTimer() {
  $("timer").textContent = fmtTime(Math.max(0, timeLeft));
  $("timer-fill").style.width = `${Math.max(0, (timeLeft / timeLimit) * 100)}%`;
  const low = timeLeft <= Math.max(10, timeLimit * 0.15);
  $("timer-box").classList.toggle("time-low", low);
  $("timer-fill").classList.toggle("low", low);
}
function startTimer() {
  deadline = Date.now() + timeLimit * 1000;
  renderTimer();
  timerId = setInterval(() => {
    const next = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (next === timeLeft) return;
    timeLeft = next;
    renderTimer();
    if (timeLeft <= 5 && timeLeft > 0) sfx.tick();
    if (timeLeft <= 0) { stopTimer(); handleTimeout(); }
  }, 250);
}
function stopTimer() {
  if (timerId) { clearInterval(timerId); timerId = null; }
  const timerBox = $("timer-box");
  if (timerBox) timerBox.classList.remove("time-low");
}

/* ---------------- Results ---------------- */
function finishQuiz() {
  stopTimer();
  const stage = selectedStage;
  const total = battle.length;
  const accuracy = Math.round((correctCount / total) * 100);
  const passed = !defeated && accuracy >= bank.settings.passMark;
  const previousLevel = save.level;

  save.xp += runXP;
  save.coins += runCoins;
  save.level = levelFor(save.xp);
  save.battles++;
  save.answered += answeredCount;
  save.correct += correctCount;
  save.bestStreak = Math.max(save.bestStreak, runBestStreak);
  save.bestAccuracy[stage.id] = Math.max(save.bestAccuracy[stage.id] || 0, accuracy);
  save.bestScore[stage.id] = Math.max(save.bestScore[stage.id] || 0, runXP);
  if (passed && !save.completedStages.includes(stage.id)) save.completedStages.push(stage.id);
  if (passed && stage.isBoss) save.bossWins++;
  save.history.unshift({ when: Date.now(), name: stage.name, score: runXP, accuracy, passed });
  save.history = save.history.slice(0, 10);
  persistSave();

  $("result-title").textContent = defeated ? "DEFEATED!" : (passed ? (stage.isBoss ? "THE FOG KING FALLS!" : "STAGE COMPLETE!") : "KEEP TRAINING!");
  $("result-message").textContent = defeated
    ? "You ran out of hearts. Review the mistakes below and challenge the Fog King again!"
    : (passed
      ? (stage.victoryMessage || "The guardian has been defeated. The realm grows brighter!")
      : "The guardian still stands, but every mistake is a chance to learn. Review and try again!");
  $("trophy").textContent = defeated ? "💀" : (passed ? (stage.isBoss ? "👑" : "🏆") : "📖");
  $("result-accuracy").textContent = `${accuracy}%`;
  $("result-xp").textContent = runXP;
  $("result-coins").textContent = runCoins;
  $("result-total").textContent = save.xp;
  $("result-level").textContent = save.level;
  $("result-streak").textContent = runBestStreak;
  $("result-xpbar").style.width = `${((save.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100}%`;
  $("result-xpnote").textContent = `${save.xp % XP_PER_LEVEL}/${XP_PER_LEVEL} XP to level ${save.level + 1}`;

  const banner = $("levelup");
  const unlockedNow = previousLevel < bank.settings.bossUnlockLevel && save.level >= bank.settings.bossUnlockLevel;
  if (save.level > previousLevel) {
    banner.textContent = unlockedNow ? `⭐ LEVEL UP! LV ${save.level}. 👑 THE FINAL BOSS IS UNLOCKED!` : `⭐ LEVEL UP! You are now level ${save.level}!`;
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }

  const list = $("mistakes-list");
  list.innerHTML = "";
  if (mistakes.length === 0) {
    list.appendChild(el("p", null, "Perfect run! You have no missed questions to review."));
  } else {
    mistakes.forEach((mistake, i) => {
      const item = el("div", "mistake-item");
      item.append(
        el("b", null, `${i + 1}. ${mistake.question}`),
        el("p", null, `Answer: ${mistake.answer}`),
        el("p", null, mistake.explanation)
      );
      list.appendChild(item);
    });
  }
  showScreen("results-screen");
  if (save.level > previousLevel) sfx.levelUp(); else if (passed) sfx.win(); else sfx.lose();
}

/* ---------------- Start up ---------------- */
function init() {
  const problems = validateBank();
  refreshStages();
  updateHeader();
  if (problems.length) toast(`${problems.length} question problem(s) found. Open EDIT QUESTIONS or press F12 for the Console.`);
}
init();