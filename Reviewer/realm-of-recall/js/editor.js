// ============================================================
// editor.js: EDIT THE REALM
// Add, change, copy and delete questions; edit categories; game settings;
// bulk paste; backup and restore. Everything is saved in this browser.
// ============================================================

let editorCat = null;
let editorSearch = "";
const NOTE_COLORS = ["html-tag", "css-tag", "js-tag", "study-tag"];

/* ---------------- Modal ---------------- */
function openModal(title, body, buttons) {
  $("modal-title").textContent = title;
  const holder = $("modal-body");
  holder.innerHTML = "";
  holder.appendChild(body);
  setModalError([]);
  const actions = $("modal-actions");
  actions.innerHTML = "";
  buttons.forEach(b => {
    const btn = el("button", "btn " + (b.primary ? "btn-primary" : "btn-secondary"), b.label);
    btn.type = "button";
    btn.addEventListener("click", () => {
      const keepOpen = b.onClick ? b.onClick() === false : false;
      if (!keepOpen) closeModal();
    });
    actions.appendChild(btn);
  });
  $("modal").classList.remove("hidden");
  $("modal-box").scrollTop = 0;
}
function closeModal() { $("modal").classList.add("hidden"); }
function setModalError(problems) {
  const box = $("modal-error");
  box.innerHTML = "";
  box.classList.toggle("hidden", problems.length === 0);
  problems.forEach(p => box.appendChild(el("p", null, "• " + p)));
  if (problems.length) $("modal-box").scrollTop = $("modal-box").scrollHeight;
}
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("modal").classList.contains("hidden")) closeModal(); });

/* ---------------- Form helpers ---------------- */
function field(label, input, note) {
  const wrap = el("label", "form-field");
  wrap.appendChild(el("span", "form-label", label));
  wrap.appendChild(input);
  if (note) wrap.appendChild(el("small", "form-note", note));
  return wrap;
}
function textInput(value, placeholder) {
  const i = el("input", "answer-input");
  i.type = "text";
  i.value = value || "";
  if (placeholder) i.placeholder = placeholder;
  return i;
}
function textArea(value, rows, placeholder) {
  const t = el("textarea", "answer-input");
  t.rows = rows || 3;
  t.value = value || "";
  if (placeholder) t.placeholder = placeholder;
  return t;
}
function numberInput(value, min, max) {
  const i = el("input", "answer-input");
  i.type = "number";
  i.min = min; i.max = max;
  i.value = value;
  return i;
}
function selectInput(options, value) {
  const s = el("select", "answer-input");
  options.forEach(([val, text]) => {
    const o = el("option", null, text);
    o.value = val;
    s.appendChild(o);
  });
  s.value = value;
  return s;
}

function readImageFile(file, done) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 800 / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      done(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => toast("Could not read that picture.");
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ---------------- Editor screen ---------------- */
function openEditor() {
  renderEditor();
  showScreen("editor-screen");
}

function renderEditor() {
  if (!getCategory(editorCat)) editorCat = sortedCategories()[0] ? sortedCategories()[0].id : null;
  renderEditorCats();
  renderEditorQuestions();
}

function renderEditorCats() {
  const list = $("editor-cat-list");
  list.innerHTML = "";
  const cats = sortedCategories();
  cats.forEach((cat, i) => {
    const row = el("div", "cat-item" + (cat.id === editorCat ? " active" : ""));
    const pick = el("button", "cat-pick");
    pick.type = "button";
    pick.append(el("span", "cat-icon", cat.icon || "📚"), el("span", "cat-name", cat.fullName || cat.name), el("span", "cat-count", String(questionsOf(cat.id).length)));
    pick.addEventListener("click", () => { editorCat = cat.id; editorSearch = ""; $("editor-search").value = ""; renderEditor(); });
    const up = el("button", "cat-move", "▲");
    const down = el("button", "cat-move", "▼");
    up.type = down.type = "button";
    up.title = "Move up"; down.title = "Move down";
    up.disabled = i === 0; down.disabled = i === cats.length - 1;
    up.addEventListener("click", () => { moveCategory(cat.id, -1); renderEditor(); });
    down.addEventListener("click", () => { moveCategory(cat.id, 1); renderEditor(); });
    row.append(pick, up, down);
    list.appendChild(row);
  });
  if (!cats.length) list.appendChild(el("p", "form-note", "No categories yet. Create one below."));
}

function renderEditorQuestions() {
  const cat = getCategory(editorCat);
  const list = $("editor-q-list");
  list.innerHTML = "";
  $("editor-actions").classList.toggle("hidden", !cat);
  if (!cat) {
    $("editor-title").textContent = "No category selected";
    $("editor-count").textContent = "";
    list.appendChild(el("p", null, "Create a category to begin."));
    return;
  }
  const all = questionsOf(cat.id);
  const term = editorSearch.trim().toLowerCase();
  const shown = all.filter(q => !term || (q.question + " " + formatCorrectAnswer(q) + " " + (q.explanation || "")).toLowerCase().includes(term));
  $("editor-title").textContent = `${cat.icon || ""} ${cat.fullName || cat.name}`;
  $("editor-count").textContent = term ? `${shown.length} of ${all.length} questions` : `${all.length} questions`;
  if (!shown.length) list.appendChild(el("p", null, all.length ? "No questions match your search." : "No questions yet. Press + ADD QUESTION."));
  shown.forEach(q => {
    const row = el("div", "q-row");
    const body = el("div", "q-body");
    const tags = el("div", "study-top");
    tags.append(el("span", "review-tag", labelFor(q)), el("span", "review-tag study-tag", `${q.xp || 100} XP`));
    if (q.image) tags.appendChild(el("span", "review-tag css-tag", "🖼 PICTURE"));
    body.append(tags, el("p", "q-text", q.question), el("p", "q-answer", "Answer: " + formatCorrectAnswer(q)));
    const buttons = el("div", "q-buttons");
    const edit = el("button", "btn btn-small btn-secondary", "✎ EDIT");
    const copy = el("button", "btn btn-small btn-secondary", "⧉");
    const del = el("button", "btn btn-small btn-danger", "🗑");
    copy.title = "Duplicate this question";
    del.title = "Delete this question";
    [edit, copy, del].forEach(b => { b.type = "button"; });
    edit.addEventListener("click", () => openQuestionForm(q));
    copy.addEventListener("click", () => {
      saveQuestion({ ...clone(q), uid: newUid(), source: undefined, question: q.question + " (copy)" });
      renderEditor();
      toast("Question duplicated.");
    });
    del.addEventListener("click", () => {
      if (confirm("Delete this question?")) { removeQuestion(q.uid); renderEditor(); toast("Question deleted."); }
    });
    buttons.append(edit, copy, del);
    row.append(body, buttons);
    list.appendChild(row);
  });
}

$("editor-search").addEventListener("input", e => { editorSearch = e.target.value; renderEditorQuestions(); });
$("add-question").addEventListener("click", () => openQuestionForm(null));
$("bulk-add").addEventListener("click", openBulkForm);
$("edit-category").addEventListener("click", () => openCategoryForm(getCategory(editorCat)));
$("add-category").addEventListener("click", () => openCategoryForm(null));
$("delete-category").addEventListener("click", () => {
  const cat = getCategory(editorCat);
  if (!cat) return;
  const n = questionsOf(cat.id).length;
  if (confirm(`Delete the category "${cat.fullName || cat.name}" and its ${n} question${n === 1 ? "" : "s"}? This cannot be undone (export a backup first if unsure).`)) {
    removeCategory(cat.id);
    editorCat = null;
    renderEditor();
    toast("Category deleted.");
  }
});
$("open-settings").addEventListener("click", openSettingsForm);
$("export-bank").addEventListener("click", () => { exportBank(); toast("Backup downloaded."); });
$("import-bank").addEventListener("click", () => $("import-file").click());
$("import-file").addEventListener("change", e => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    let data;
    try { data = JSON.parse(reader.result); } catch { toast("That file is not valid JSON."); return; }
    if (!data || !Array.isArray(data.categories) || !Array.isArray(data.questions)) { toast("That file is not a Realm of Recall backup."); return; }
    const body = el("div");
    body.appendChild(el("p", null, `This backup has ${data.categories.length} categories and ${data.questions.length} questions.`));
    body.appendChild(el("p", null, "MERGE adds only what you do not have yet. REPLACE swaps everything for the backup."));
    openModal("Load backup", body, [
      { label: "MERGE", primary: true, onClick: () => finishImport(data, "merge") },
      { label: "REPLACE EVERYTHING", onClick: () => finishImport(data, "replace") },
      { label: "CANCEL" }
    ]);
  };
  reader.readAsText(file);
});
function finishImport(data, mode) {
  try {
    toast(importBankData(data, mode));
    editorCat = null;
    renderEditor();
  } catch (err) { toast(err.message); }
}
$("restore-builtin").addEventListener("click", () => {
  if (confirm("Bring back built-in categories and any built-in questions you deleted? Your edits and your own questions stay.")) {
    const n = restoreBuiltIns();
    renderEditor();
    toast(n ? `Restored ${n} built-in question${n === 1 ? "" : "s"}.` : "Nothing to restore. All built-in questions are present.");
  }
});
$("factory-reset").addEventListener("click", () => {
  if (confirm("Erase ALL your edits and go back to the original questions? Export a backup first if you want to keep them.")) {
    factoryReset();
    editorCat = null;
    renderEditor();
    toast("Back to the original questions.");
  }
});
$("editor-back").addEventListener("click", () => showScreen("home-screen"));
$("editor-play").addEventListener("click", goMap);

/* ---------------- Question form ---------------- */
function openQuestionForm(existing) {
  const base = existing ? clone(existing) : { type: "multiple", cat: editorCat, question: "", explanation: "", hint: "", xp: 100 };
  const st = {
    type: base.type,
    image: base.image || "",
    options: base.type === "multiple" && base.options ? [...base.options] : ["", "", "", ""],
    correct: base.type === "multiple" && base.options ? base.options.indexOf(base.answer) : -1,
    tf: base.type === "truefalse" ? base.answer : "True",
    ident: base.type === "identification" ? (base.answer || "") : "",
    accepted: base.type === "identification" ? (base.accepted || []).join(", ") : "",
    pairs: base.type === "matching" && base.pairs ? base.pairs.map(p => `${p.item} = ${p.answer}`).join("\n") : ""
  };

  const body = el("div", "form");
  const catSelect = selectInput(sortedCategories().map(c => [c.id, `${c.icon || ""} ${c.fullName || c.name}`]), base.cat);
  const typeSelect = selectInput(QUESTION_TYPES.map(t => [t, TYPE_NAMES[t]]), st.type);
  const row = el("div", "form-row");
  row.append(field("Category", catSelect), field("Question type", typeSelect));
  const qInput = textArea(base.question, 3, "Type the question here...");
  const typeBox = el("div", "type-box");
  const imageBox = el("div", "image-box");
  const expInput = textArea(base.explanation, 3, "Why is this the answer? Shown after each question and in the study sheet.");
  const hintInput = textInput(base.hint, "A small nudge (costs 25 coins to reveal)");
  const xpInput = numberInput(base.xp || 100, 10, 1000);
  const row2 = el("div", "form-row");
  row2.append(field("Hint", hintInput), field("XP reward", xpInput));
  body.append(row, field("Question", qInput), imageBox, typeBox, field("Explanation", expInput), row2);

  function renderImage() {
    imageBox.innerHTML = "";
    imageBox.appendChild(el("span", "form-label", "Picture (optional)"));
    if (st.image) {
      const img = el("img", "form-preview");
      img.src = st.image;
      img.alt = "Question picture";
      imageBox.appendChild(img);
    }
    const controls = el("div", "form-inline");
    const file = el("input");
    file.type = "file";
    file.accept = "image/*";
    file.addEventListener("change", () => {
      if (file.files[0]) readImageFile(file.files[0], data => { st.image = data; renderImage(); });
    });
    controls.appendChild(file);
    if (st.image) {
      const remove = el("button", "btn btn-small btn-secondary", "REMOVE PICTURE");
      remove.type = "button";
      remove.addEventListener("click", () => { st.image = ""; renderImage(); });
      controls.appendChild(remove);
    }
    imageBox.appendChild(controls);
  }

  function renderTypeBox() {
    typeBox.innerHTML = "";
    if (st.type === "multiple") {
      typeBox.appendChild(el("span", "form-label", "Answer options (tick the correct one)"));
      st.options.forEach((opt, i) => {
        const line = el("div", "option-line");
        const radio = el("input");
        radio.type = "radio";
        radio.name = "correct";
        radio.checked = st.correct === i;
        radio.title = "Correct answer";
        radio.addEventListener("change", () => { st.correct = i; });
        const text = textInput(opt, `Option ${i + 1}`);
        text.addEventListener("input", () => { st.options[i] = text.value; });
        const remove = el("button", "btn btn-small btn-secondary", "×");
        remove.type = "button";
        remove.title = "Remove this option";
        remove.addEventListener("click", () => {
          st.options.splice(i, 1);
          if (st.correct === i) st.correct = -1; else if (st.correct > i) st.correct--;
          renderTypeBox();
        });
        line.append(radio, text, remove);
        typeBox.appendChild(line);
      });
      if (st.options.length < 8) {
        const add = el("button", "btn btn-small btn-secondary", "+ ADD OPTION");
        add.type = "button";
        add.addEventListener("click", () => { st.options.push(""); renderTypeBox(); });
        typeBox.appendChild(add);
      }
      typeBox.appendChild(el("small", "form-note", base.fixedOrder || st.image
        ? "Options of picture questions stay in this order (A, B, C...) so they match the letters in the picture. Other questions shuffle every game."
        : "The order is shuffled every game. Options like 'None of the above' always stay last."));
    } else if (st.type === "truefalse") {
      typeBox.appendChild(el("span", "form-label", "Correct answer"));
      const line = el("div", "form-inline");
      ["True", "False"].forEach(v => {
        const lab = el("label", "radio-pill");
        const radio = el("input");
        radio.type = "radio";
        radio.name = "tf";
        radio.checked = st.tf === v;
        radio.addEventListener("change", () => { st.tf = v; });
        lab.append(radio, document.createTextNode(" " + v));
        line.appendChild(lab);
      });
      typeBox.appendChild(line);
    } else if (st.type === "identification") {
      const ans = textInput(st.ident, "The correct answer");
      ans.addEventListener("input", () => { st.ident = ans.value; });
      const acc = textInput(st.accepted, "other accepted spellings, separated by commas");
      acc.addEventListener("input", () => { st.accepted = acc.value; });
      typeBox.append(field("Correct answer", ans), field("Also accept (optional)", acc, "Capital letters, commas, spaces and $ are ignored when checking."));
    } else if (st.type === "matching") {
      const pairs = textArea(st.pairs, 5, "Slope = m\nIntercept = b");
      pairs.addEventListener("input", () => { st.pairs = pairs.value; });
      typeBox.appendChild(field("Pairs, one per line: item = its match", pairs, "Players see the items in a random order with a shuffled list of matches. Every match must be different."));
    }
  }

  typeSelect.addEventListener("change", () => { st.type = typeSelect.value; renderTypeBox(); });
  renderImage();
  renderTypeBox();

  openModal(existing ? "Edit question" : "Add question", body, [
    {
      label: "SAVE QUESTION", primary: true,
      onClick: () => {
        const out = { ...(existing || {}), uid: existing ? existing.uid : newUid(), cat: catSelect.value, type: st.type, question: qInput.value, explanation: expInput.value, hint: hintInput.value, xp: xpInput.value, image: st.image };
        ["options", "answer", "accepted", "pairs", "choices"].forEach(k => delete out[k]);
        const formProblems = [];
        if (st.type === "multiple") {
          out.options = st.options.map(o => o.trim());
          out.answer = st.correct >= 0 ? out.options[st.correct] : "";
        } else if (st.type === "truefalse") {
          out.answer = st.tf;
        } else if (st.type === "identification") {
          out.answer = st.ident.trim();
          out.accepted = st.accepted.split(",").map(s => s.trim()).filter(Boolean);
        } else if (st.type === "matching") {
          out.pairs = [];
          st.pairs.split("\n").map(l => l.trim()).filter(Boolean).forEach((line, i) => {
            const at = line.indexOf("=");
            if (at < 1 || at === line.length - 1) formProblems.push(`Pair line ${i + 1} needs the form: item = match`);
            else out.pairs.push({ item: line.slice(0, at).trim(), answer: line.slice(at + 1).trim() });
          });
        }
        const problems = [...formProblems, ...validateQuestion(out)];
        if (problems.length) { setModalError(problems); return false; }
        if (!saveQuestion(out)) return false;
        editorCat = out.cat;
        renderEditor();
        toast("Question saved.");
      }
    },
    { label: "CANCEL" }
  ]);
}

/* ---------------- Bulk paste ---------------- */
function parsePastedQuestions(text) {
  const out = [];
  const errors = [];
  text.replace(/\r/g, "").split(/\n\s*\n/).forEach((block, bi) => {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    const question = [];
    const options = [];
    let answer = "", explanation = "", hint = "", m;
    lines.forEach(line => {
      if ((m = line.match(/^answer\s*[:=-]\s*(.+)$/i))) answer = m[1].trim();
      else if ((m = line.match(/^(?:explanation|why)\s*[:=-]\s*(.+)$/i))) explanation = m[1].trim();
      else if ((m = line.match(/^hint\s*[:=-]\s*(.+)$/i))) hint = m[1].trim();
      else if (question.length && (m = line.match(/^\(?([A-Ea-e])[).:]\s*(.+)$/))) options.push({ letter: m[1].toUpperCase(), text: m[2].trim() });
      else if (!options.length) question.push(line.replace(/^(?:q(?:uestion)?\s*)?\d*\s*[:.)]\s*/i, "").trim() || line);
      else options[options.length - 1].text += " " + line;
    });
    const label = `Question ${bi + 1}`;
    if (!question.length) { errors.push(`${label}: no question text.`); return; }
    if (!answer) { errors.push(`${label}: add a line starting with "Answer:".`); return; }
    const q = { uid: newUid(), question: question.join(" "), explanation, hint, xp: 100 };
    if (options.length >= 2) {
      q.type = "multiple";
      q.options = options.map(o => o.text);
      let idx = /^[A-Ea-e]$/.test(answer) ? options.findIndex(o => o.letter === answer.toUpperCase()) : options.findIndex(o => o.text.toLowerCase() === answer.toLowerCase());
      if (idx < 0) { errors.push(`${label}: could not match the answer "${answer}" to an option.`); return; }
      q.answer = q.options[idx];
    } else if (/^(true|false)$/i.test(answer)) {
      q.type = "truefalse";
      q.answer = answer[0].toUpperCase() + answer.slice(1).toLowerCase();
    } else {
      q.type = "identification";
      q.answer = answer;
      q.accepted = [];
    }
    const problems = validateQuestion(q);
    if (problems.length) errors.push(`${label}: ${problems[0]}`); else out.push(q);
  });
  return { out, errors };
}

function openBulkForm() {
  const cat = getCategory(editorCat);
  if (!cat) return;
  const body = el("div", "form");
  body.appendChild(el("p", null, `Paste many questions into "${cat.fullName || cat.name}" at once. Separate questions with a blank line.`));
  const example = el("pre", "form-example", "1. What is 6 x 7?\nA. 36\nB. 42\nC. 48\nD. 54\nAnswer: B\nExplanation: 6 x 7 = 42.\nHint: Think 6 x 6, plus 6.\n\nThe sun is a star.\nAnswer: True\n\nWhat gas do plants take in?\nAnswer: carbon dioxide");
  const area = textArea("", 12, "Paste here...");
  body.append(example, area);
  openModal("Paste many questions", body, [
    {
      label: "ADD THEM", primary: true,
      onClick: () => {
        const { out, errors } = parsePastedQuestions(area.value);
        if (!out.length && !errors.length) { setModalError(["Paste at least one question."]); return false; }
        if (errors.length) { setModalError([`${out.length} ready, ${errors.length} with problems. Fix these and try again:`, ...errors]); return false; }
        out.forEach(q => saveQuestion({ ...q, cat: cat.id }));
        renderEditor();
        toast(`Added ${out.length} question${out.length === 1 ? "" : "s"}.`);
      }
    },
    { label: "CANCEL" }
  ]);
}

/* ---------------- Category form ---------------- */
function openCategoryForm(existing) {
  const base = existing ? clone(existing) : {
    name: "", fullName: "", icon: "📚", subtitle: "", description: "", intro: "Review the notes, then face the guardian.",
    enemy: "DUST GOLEM", enemyColor: "#b08a4f", battleSize: 10, victoryMessage: "The guardian has been defeated!", reviewTitle: "", review: []
  };
  const body = el("div", "form");
  const name = textInput(base.name, "Short name on the map, e.g. SCIENCE");
  const fullName = textInput(base.fullName, "Full name, e.g. Science");
  const icon = textInput(base.icon, "An emoji");
  icon.maxLength = 4;
  const subtitle = textInput(base.subtitle, "Short line under the name");
  const description = textArea(base.description, 2, "One or two sentences about this category");
  const intro = textInput(base.intro, "Line shown on the study notes screen");
  const enemy = textInput(base.enemy, "Enemy name, e.g. DUST GOLEM");
  const color = el("input", "color-input");
  color.type = "color";
  color.value = /^#[0-9a-f]{6}$/i.test(base.enemyColor) ? base.enemyColor : "#4c9a65";
  const size = numberInput(base.battleSize || 10, 3, 50);
  const victory = textInput(base.victoryMessage, "Shown when the player wins");
  const notes = textArea((base.review || []).map(n => `${n.tag} | ${n.text}`).join("\n"), 7, "TAG | one study note per line");
  const r1 = el("div", "form-row"); r1.append(field("Short name", name), field("Icon", icon));
  const r2 = el("div", "form-row"); r2.append(field("Enemy name", enemy), field("Enemy color", color));
  const r3 = el("div", "form-row"); r3.append(field("Questions per battle", size), field("Victory message", victory));
  body.append(r1, field("Full name", fullName), field("Subtitle", subtitle), field("Description", description), field("Intro line", intro), r2, r3,
    field("Study notes (shown before the battle)", notes, "One per line, written as TAG | note. Example: CELLS | The cell is the basic unit of life."));

  openModal(existing ? "Edit category" : "New category", body, [
    {
      label: "SAVE CATEGORY", primary: true,
      onClick: () => {
        const problems = [];
        if (!name.value.trim()) problems.push("Give the category a short name.");
        const review = [];
        notes.value.split("\n").map(l => l.trim()).filter(Boolean).forEach((line, i) => {
          const at = line.indexOf("|");
          if (at < 1 || at === line.length - 1) { problems.push(`Study note line ${i + 1} needs the form: TAG | note`); return; }
          const tag = line.slice(0, at).trim().toUpperCase();
          const old = (base.review || []).find(n => n.tag === tag);
          review.push({ tag, color: tag === "STUDY TIP" ? "study-tag" : (old ? old.color : NOTE_COLORS[i % 3]), text: line.slice(at + 1).trim() });
        });
        if (problems.length) { setModalError(problems); return false; }
        const cat = {
          ...base,
          id: existing ? existing.id : makeCategoryId(name.value),
          name: name.value.trim().toUpperCase(),
          fullName: fullName.value.trim() || name.value.trim(),
          icon: icon.value.trim() || "📚",
          subtitle: subtitle.value.trim(),
          description: description.value.trim(),
          intro: intro.value.trim(),
          enemy: enemy.value.trim().toUpperCase() || "GUARDIAN",
          enemyColor: color.value,
          battleSize: Math.max(3, Math.min(50, parseInt(size.value, 10) || 10)),
          victoryMessage: victory.value.trim(),
          reviewTitle: `Quick Review: ${fullName.value.trim() || name.value.trim()}`,
          review
        };
        if (!saveCategory(cat)) return false;
        editorCat = cat.id;
        renderEditor();
        toast("Category saved.");
      }
    },
    { label: "CANCEL" }
  ]);
}

/* ---------------- Game settings ---------------- */
function openSettingsForm() {
  const s = bank.settings;
  const body = el("div", "form");
  const time = numberInput(s.timePerQuestion, 10, 600);
  const level = numberInput(s.bossUnlockLevel, 1, 50);
  const boss = numberInput(s.bossSize, 5, 100);
  const pass = numberInput(s.passMark, 10, 100);
  const sound = el("input");
  sound.type = "checkbox";
  sound.checked = s.sound;
  const soundLabel = el("label", "radio-pill");
  soundLabel.append(sound, document.createTextNode(" Sound effects on"));
  const r1 = el("div", "form-row"); r1.append(field("Seconds per question", time, "Default 120"), field("Pass mark (%)", pass, "Needed to clear a stage"));
  const r2 = el("div", "form-row"); r2.append(field("Final Boss unlocks at level", level, "Each level takes 500 XP"), field("Final Boss questions", boss));
  body.append(r1, r2, soundLabel);
  openModal("Game settings", body, [
    {
      label: "SAVE SETTINGS", primary: true,
      onClick: () => {
        bank.settings = {
          ...s,
          timePerQuestion: Math.max(10, Math.min(600, parseInt(time.value, 10) || 120)),
          passMark: Math.max(10, Math.min(100, parseInt(pass.value, 10) || 70)),
          bossUnlockLevel: Math.max(1, Math.min(50, parseInt(level.value, 10) || 5)),
          bossSize: Math.max(5, Math.min(100, parseInt(boss.value, 10) || 15)),
          sound: sound.checked
        };
        saveBank();
        updateHeader();
        toast("Settings saved.");
      }
    },
    { label: "CANCEL" }
  ]);
}
