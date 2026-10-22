// ============================================================
// stages.js  (load this BEFORE any file in js/questions/)
//
// Every question file calls registerStage({...}) once.
// Each file declares which CATEGORY its questions belong to:
//   category: "english" | "math" | "science" | "abstract" | "general"
// (or any category id you create in js/categories.js).
// On first run the game copies these questions into its editable question
// bank (saved in your browser). After that you can edit everything in-game.
// ============================================================

const STAGES = [];
function registerStage(stage) {
  STAGES.push(stage);
}

const TYPE_LABELS = {
  multiple: "MULTIPLE CHOICE",
  truefalse: "TRUE OR FALSE",
  identification: "IDENTIFICATION",
  matching: "MATCHING"
};

// ---------- Short helpers for writing questions quickly ----------
// You can ALSO write plain objects (see js/questions/_template.js).

// Multiple choice: answer must match one option EXACTLY (same characters).
function mc(question, options, answer, explanation, hint, xp = 100) {
  return { type: "multiple", label: TYPE_LABELS.multiple, question, options, answer, explanation, hint, xp };
}

// True/False: answer is "True" or "False".
function tf(question, answer, explanation, hint, xp = 100) {
  return { type: "truefalse", label: TYPE_LABELS.truefalse, question, options: ["True", "False"], answer, explanation, hint, xp };
}

// Identification (typed answer): "accepted" is a list of other spellings that also count.
function ident(question, answer, accepted, explanation, hint, xp = 125) {
  return { type: "identification", label: TYPE_LABELS.identification, question, answer, accepted: accepted || [], explanation, hint, xp };
}

// Matching: pairs is [["item", "its match"], ...]. Every match must be different.
function match(question, pairs, explanation, hint, xp = 150) {
  return {
    type: "matching",
    label: TYPE_LABELS.matching,
    question,
    pairs: pairs.map(([item, answer]) => ({ item, answer })),
    choices: pairs.map(p => p[1]),
    explanation,
    hint,
    xp
  };
}

// Picture question (multiple choice where the picture holds the puzzle).
// image: path to a picture. Options keep their order (A, B, C...) because the
// letters are printed inside the picture.
function imgq(question, image, options, answer, explanation, hint, xp = 125) {
  return { type: "multiple", label: TYPE_LABELS.multiple, question, image, options, answer, explanation, hint, xp, fixedOrder: true };
}
