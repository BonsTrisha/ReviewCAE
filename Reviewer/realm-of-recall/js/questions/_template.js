// ============================================================
// TEMPLATE: copy this file, rename it (example: biology-ch1.js),
// edit it, then add ONE line to index.html:
//   <script src="js/questions/biology-ch1.js"></script>
// (put it with the other question scripts, BEFORE js/main.js)
//
// This file (_template.js) is NOT loaded by the game.
// ============================================================

registerStage({
  id: "my-new-stage",          // unique, no spaces. Progress is saved under this id.
  order: 5,                    // position on the world map (1 = first)
  icon: "📚",
  name: "LIBRARY",             // short name shown on the map
  fullName: "The Great Library",
  subtitle: "Stage 5 · Biology",
  description: "One sentence about this stage.",
  intro: "Short line shown on the study-notes screen.",
  enemy: "DUST GOLEM",
  enemyColor: "#b08a4f",       // any CSS color
  timePerQuestion: 30,         // seconds per question
  battleSize: 10,              // questions per battle (picked randomly from the list below)
  victoryMessage: "You defeated the Dust Golem!",
  reviewTitle: "Quick Review: Biology",

  // Study notes shown BEFORE the battle.
  // color can be: "html-tag" (orange), "css-tag" (blue), "js-tag" (yellow), "study-tag" (green)
  review: [
    { tag: "CELLS", color: "html-tag", text: "The cell is the basic unit of life." },
    { tag: "STUDY TIP", color: "study-tag", text: "Read each question carefully." }
  ],

  questions: [
    // ---------- Short helpers (defined in js/stages.js) ----------

    // mc(question, options, answer, explanation, hint, xp)
    mc("Which organelle makes most of the cell's energy?",
      ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"], "Mitochondria",
      "Mitochondria produce most of the cell's ATP.",
      "Often called the powerhouse of the cell.", 100),

    // tf(question, "True" or "False", explanation, hint, xp)
    tf("Plant cells have a cell wall.", "True",
      "Plant cells have a rigid cell wall outside the membrane.",
      "Think about why plants stand upright.", 100),

    // ident(question, answer, [other accepted spellings], explanation, hint, xp)
    ident("What molecule carries genetic information?", "DNA", ["deoxyribonucleic acid"],
      "DNA stores genetic instructions.",
      "Three letters.", 125),

    // match(question, [[item, its match], ...], explanation, hint, xp)
    match("Match each organelle with its job.",
      [["Nucleus", "Stores DNA"], ["Ribosome", "Builds proteins"], ["Mitochondria", "Makes energy"]],
      "The nucleus holds DNA, ribosomes build proteins, and mitochondria make energy.",
      "Powerhouse, library, factory.", 150),

    // ---------- The same thing as a plain object (no helper) ----------
    {
      type: "multiple",                 // "multiple" | "truefalse" | "identification" | "matching"
      label: "MULTIPLE CHOICE",
      question: "Which gas do plants take in for photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"],
      answer: "Carbon dioxide",         // must match one option EXACTLY
      explanation: "Plants take in carbon dioxide and release oxygen.",
      hint: "Animals breathe it out.",
      xp: 100
    }
  ]
});
