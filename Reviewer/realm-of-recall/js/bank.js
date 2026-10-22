// ============================================================
// bank.js: the editable question bank (categories + questions + settings)
//
// First run: categories come from js/categories.js and questions are copied
// from the question files (js/questions/*.js). From then on everything is
// saved in this browser (localStorage) and edited in-game.
// Use EXPORT BACKUP in the editor to keep a copy of your edits.
// ============================================================

const BANK_KEY = "realmOfRecallBank";
const QUESTION_TYPES = ["multiple", "truefalse", "identification", "matching"];
const TYPE_NAMES = {
  multiple: "MULTIPLE CHOICE",
  truefalse: "TRUE OR FALSE",
  identification: "IDENTIFICATION",
  matching: "MATCHING"
};
const DEFAULT_SETTINGS = {
  timePerQuestion: 120,   // seconds for every question
  bossUnlockLevel: 5,     // player level needed to open the Final Boss
  bossSize: 15,           // questions in the Final Boss battle
  passMark: 70,           // % needed to clear a stage
  sound: true
};

let bank = loadBank();

function newUid() {
  return "q" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function freshBank() {
  return {
    version: 2,
    settings: { ...DEFAULT_SETTINGS },
    categories: clone(DEFAULT_CATEGORIES).map((c, i) => ({ ...c, order: i + 1 })),
    questions: [],
    seeded: []
  };
}

function loadBank() {
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem(BANK_KEY)); } catch { stored = null; }
  const valid = stored && typeof stored === "object" && Array.isArray(stored.categories) && Array.isArray(stored.questions);
  const b = valid ? stored : freshBank();
  b.settings = { ...DEFAULT_SETTINGS, ...(b.settings || {}) };
  if (!Array.isArray(b.seeded)) b.seeded = [];
  b.categories.forEach(c => { if (!Array.isArray(c.review)) c.review = []; });
  seedFromFiles(b);
  writeBank(b, true);
  return b;
}

// Copies questions from the question files that have not been imported yet.
function seedFromFiles(b) {
  const seeded = new Set(b.seeded);
  const haveUid = new Set(b.questions.map(q => q.uid));
  let added = 0;
  STAGES.forEach(stage => {
    if (seeded.has(stage.id)) return;
    seeded.add(stage.id);
    const cat = b.categories.find(c => c.id === stage.category);
    if (!cat) {
      if (!stage.category) console.warn(`[Realm of Recall] Question file "${stage.id}" has no category. Add category: "math" (or another id).`);
      return;
    }
    (stage.review || []).forEach(note => {
      const duplicate = cat.review.some(r => r.text === note.text) || (note.tag === "STUDY TIP" && cat.review.some(r => r.tag === "STUDY TIP"));
      if (!duplicate) cat.review.push({ ...note });
    });
    (stage.questions || []).forEach((q, i) => {
      const uid = `${stage.id}:${i}`;
      if (haveUid.has(uid)) return;
      b.questions.push({ ...clone(q), uid, cat: cat.id, source: stage.id });
      haveUid.add(uid);
      added++;
    });
  });
  b.seeded = [...seeded];
  return added;
}

function writeBank(b, quiet) {
  try {
    localStorage.setItem(BANK_KEY, JSON.stringify(b));
    return true;
  } catch {
    if (!quiet) toast("Could not save. Browser storage is full or blocked. Use EXPORT BACKUP.");
    return false;
  }
}
function saveBank() { return writeBank(bank); }

/* ---------------- Lookups ---------------- */
function getCategory(id) { return bank.categories.find(c => c.id === id); }
function questionsOf(catId) { return bank.questions.filter(q => q.cat === catId); }
function sortedCategories() { return bank.categories.slice().sort((a, b) => (a.order || 999) - (b.order || 999)); }

/* ---------------- Validation ---------------- */
function validateQuestion(q) {
  const problems = [];
  if (!q.question || !String(q.question).trim()) problems.push("Write the question text.");
  if (!QUESTION_TYPES.includes(q.type)) { problems.push(`Unknown question type "${q.type}".`); return problems; }
  if (q.type === "multiple") {
    const options = q.options || [];
    if (options.length < 2) problems.push("Add at least 2 answer options.");
    if (options.some(o => !String(o).trim())) problems.push("Fill in every answer option (or remove the empty ones).");
    if (new Set(options.map(o => String(o).trim().toLowerCase())).size !== options.length) problems.push("Answer options must all be different.");
    if (!options.includes(q.answer)) problems.push("Mark which option is the correct answer.");
  }
  if (q.type === "truefalse" && !["True", "False"].includes(q.answer)) problems.push("Choose True or False.");
  if (q.type === "identification" && (!q.answer || !String(q.answer).trim())) problems.push("Type the correct answer.");
  if (q.type === "matching") {
    const pairs = q.pairs || [];
    if (pairs.length < 2) problems.push("Matching needs at least 2 pairs.");
    if (pairs.some(p => !p.item || !p.answer)) problems.push("Every matching pair needs both sides.");
    if (new Set(pairs.map(p => String(p.answer).trim().toLowerCase())).size !== pairs.length) problems.push("Each pair needs a different match.");
  }
  return problems;
}

function validateBank() {
  const problems = [];
  const catIds = new Set(bank.categories.map(c => c.id));
  bank.questions.forEach((q, i) => {
    const where = `question ${i + 1} (${String(q.question || "").slice(0, 40)})`;
    if (!catIds.has(q.cat)) problems.push(`${where}: its category no longer exists.`);
    validateQuestion(q).forEach(p => problems.push(`${where}: ${p}`));
  });
  problems.forEach(p => console.error("[Realm of Recall] " + p));
  return problems;
}

// Cleans a question so the game engine always gets consistent data.
function finalizeQuestion(q) {
  const out = { ...q };
  out.question = String(out.question || "").trim();
  out.explanation = String(out.explanation || "").trim();
  out.hint = String(out.hint || "").trim();
  out.xp = Math.max(10, Math.min(1000, parseInt(out.xp, 10) || 100));
  out.label = TYPE_NAMES[out.type];
  if (out.type === "truefalse") out.options = ["True", "False"];
  if (out.type === "matching") out.choices = (out.pairs || []).map(p => p.answer);
  if (out.type === "identification") out.accepted = (out.accepted || []).map(a => String(a).trim()).filter(Boolean);
  if (!out.image) delete out.image;
  return out;
}

/* ---------------- Create / update / delete ---------------- */
function saveQuestion(q) {
  const clean = finalizeQuestion(q);
  const i = bank.questions.findIndex(x => x.uid === clean.uid);
  if (i >= 0) bank.questions[i] = clean; else bank.questions.push(clean);
  return saveBank();
}
function removeQuestion(uid) {
  bank.questions = bank.questions.filter(q => q.uid !== uid);
  return saveBank();
}
function saveCategory(cat) {
  const i = bank.categories.findIndex(c => c.id === cat.id);
  if (i >= 0) bank.categories[i] = cat;
  else { cat.order = bank.categories.length + 1; bank.categories.push(cat); }
  return saveBank();
}
function removeCategory(id) {
  bank.categories = bank.categories.filter(c => c.id !== id);
  bank.questions = bank.questions.filter(q => q.cat !== id);
  return saveBank();
}
function moveCategory(id, direction) {
  const list = sortedCategories();
  const i = list.findIndex(c => c.id === id);
  const j = i + direction;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  list.forEach((c, n) => { c.order = n + 1; });
  saveBank();
}
function makeCategoryId(name) {
  const base = String(name || "category").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "category";
  let id = base, n = 2;
  while (getCategory(id)) id = `${base}-${n++}`;
  return id;
}

/* ---------------- Backup, restore, reset ---------------- */
function exportBank() {
  const blob = new Blob([JSON.stringify(bank, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `realm-of-recall-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

// mode: "replace" or "merge". Returns a short summary string, or throws Error.
function importBankData(data, mode) {
  if (!data || !Array.isArray(data.categories) || !Array.isArray(data.questions)) {
    throw new Error("That file is not a Realm of Recall backup.");
  }
  if (mode === "replace") {
    bank = {
      version: 2,
      settings: { ...DEFAULT_SETTINGS, ...(data.settings || {}) },
      categories: data.categories.map((c, i) => ({ review: [], order: i + 1, ...c })),
      questions: data.questions.map(q => ({ ...q, uid: q.uid || newUid() })),
      seeded: Array.isArray(data.seeded) ? data.seeded : STAGES.map(s => s.id)
    };
    saveBank();
    return `Loaded ${bank.categories.length} categories and ${bank.questions.length} questions.`;
  }
  let addedCats = 0, addedQs = 0;
  data.categories.forEach(c => {
    if (!getCategory(c.id)) { bank.categories.push({ review: [], ...c, order: bank.categories.length + 1 }); addedCats++; }
  });
  const have = new Set(bank.questions.map(q => q.uid));
  data.questions.forEach(q => {
    const uid = q.uid && !have.has(q.uid) ? q.uid : newUid();
    if (q.uid && have.has(q.uid)) return;       // already here
    if (!getCategory(q.cat)) return;             // category missing
    bank.questions.push({ ...q, uid });
    have.add(uid);
    addedQs++;
  });
  saveBank();
  return `Added ${addedCats} categories and ${addedQs} new questions.`;
}

// Brings back built-in categories and any built-in questions that were deleted.
function restoreBuiltIns() {
  DEFAULT_CATEGORIES.forEach(dc => {
    if (!getCategory(dc.id)) bank.categories.push({ ...clone(dc), order: bank.categories.length + 1 });
  });
  bank.seeded = [];
  const added = seedFromFiles(bank);
  saveBank();
  return added;
}

function factoryReset() {
  bank = freshBank();
  seedFromFiles(bank);
  saveBank();
}
