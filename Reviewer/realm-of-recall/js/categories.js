// ============================================================
// categories.js  (loads AFTER stages.js, BEFORE the question files)
//
// These are the STARTING categories. After the first run they live in the
// in-game editor (EDIT THE REALM), where you can rename them, change icons,
// colours, enemies, study notes, add new ones or delete them.
//
// review "color" can be: "html-tag" (orange), "css-tag" (blue),
// "js-tag" (yellow), "study-tag" (green)
// ============================================================

const DEFAULT_CATEGORIES = [
  {
    id: "english",
    name: "ENGLISH",
    fullName: "English / Language",
    icon: "📜",
    subtitle: "Grammar, vocabulary, reading",
    description: "Figures of speech, synonyms and antonyms, analogies, grammar, pronouns, tenses and reading skills.",
    intro: "Words are weapons here. Review the notes, then face the guardian.",
    enemy: "INK WRAITH",
    enemyColor: "#d9663f",
    battleSize: 10,
    victoryMessage: "The Ink Wraith dissolves into a puddle of ink. The library sings again!",
    reviewTitle: "Quick Review: English / Language",
    review: [
      { tag: "FIGURES", color: "html-tag", text: "Oxymoron = two opposites together ('laboriously idle'). Simile compares with like/as. Apostrophe = speaking to someone absent ('O love, where art thou?'). Irony = saying the opposite of what is meant." },
      { tag: "ANALOGY", color: "css-tag", text: "First name the relationship (synonym, antonym, part-to-whole, degree, characteristic), then find the pair with the SAME relationship." },
      { tag: "PRONOUNS", color: "js-tag", text: "Use 'me' after a preposition: 'between you and me'. Their = belongs to them, there = place, they're = they are. 'Which' adds extra information after a comma." },
      { tag: "PARALLEL", color: "html-tag", text: "Keep list items in the same form: 'driving is harder than driving', not 'than to drive'. The later of two things = 'the latter'." },
      { tag: "TENSE", color: "css-tag", text: "'By the time you finish, you will have realized...' Past hypothetical: 'If I had had the chance, I would have done so.'" }
    ]
  },
  {
    id: "math",
    name: "MATH",
    fullName: "Mathematics",
    icon: "🧮",
    subtitle: "Algebra, geometry, calculus",
    description: "Algebra, functions, word problems, geometry, logarithms, trigonometry and basic calculus.",
    intro: "Numbers never lie. Review the notes, then face the guardian.",
    enemy: "MOSS GUARDIAN",
    enemyColor: "#4c9a65",
    battleSize: 10,
    victoryMessage: "The Moss Guardian crumbles. The meadow blooms with answers!",
    reviewTitle: "Quick Review: Mathematics",
    review: [
      { tag: "WORK RATES", color: "js-tag", text: "Add rates, not times: if A takes 9 days and B takes 8, together they do 1/9 + 1/8 of the job per day." },
      { tag: "SIMILAR", color: "css-tag", text: "Similar solids: volume (and price of the same material) scales with the CUBE of the length ratio. Area scales with the square." },
      { tag: "LOGS", color: "html-tag", text: "ln a - ln b = ln(a/b). Sum of cubes: x³ + 125 = (x + 5)(x² - 5x + 25). Log of a root = (1/n) × log." }
    ]
  },
  {
    id: "science",
    name: "SCIENCE",
    fullName: "Science",
    icon: "🔬",
    subtitle: "Earth, life, chemistry, physics",
    description: "Earth science, biology, chemistry and physics from the mock exam.",
    intro: "Observe, then conclude. Review the notes, then face the guardian.",
    enemy: "STORM GOLEM",
    enemyColor: "#6a7fd0",
    battleSize: 10,
    victoryMessage: "The Storm Golem scatters into rain. The laboratory is safe!",
    reviewTitle: "Quick Review: Science",
    review: [
      { tag: "EARTH", color: "html-tag", text: "Seasons come from Earth's TILT. Divergent boundaries make ridges, convergent ones collide, transform ones slide. Gutenberg discontinuity = mantle/outer core; Moho = crust/mantle." },
      { tag: "CELLS", color: "css-tag", text: "Human 2N = 46. Mitosis keeps 46 per cell (92 in the cell during telophase before it splits). Meiosis II ends with N = 23. Down syndrome = trisomy 21." },
      { tag: "CHEMISTRY", color: "js-tag", text: "Electronegativity increases left to right, decreases top to bottom. Oxidation = losing electrons (rusting). The reducing agent is the one that gets oxidized. 1 mole of ideal gas = 22.4 L at 273 K, 1 atm." },
      { tag: "PHYSICS", color: "html-tag", text: "F = ma and impulse Ft = m(v - u). Circular motion: acceleration points toward the center. A prism bends (refracts) and splits (disperses) white light." },
      { tag: "STUDY TIP", color: "study-tag", text: "Many science questions are one vocabulary word. Make flashcards from the study sheet." }
    ]
  },
  {
    id: "abstract",
    name: "ABSTRACT",
    fullName: "Abstract Reasoning",
    icon: "🧩",
    subtitle: "Patterns, series, odd one out",
    description: "Picture puzzles: series, analogies, odd-one-out, groups, dominoes and grids.",
    intro: "No words, no numbers: only patterns. Review the strategy, then face the guardian.",
    enemy: "SHAPE PHANTOM",
    enemyColor: "#8a6fc0",
    battleSize: 10,
    victoryMessage: "The Shape Phantom folds into a neat little square. Order returns!",
    reviewTitle: "Quick Review: Abstract Reasoning",
    review: [
      { tag: "SERIES", color: "html-tag", text: "Track ONE feature at a time: position, shading, size, rotation, count. Each feature usually follows its own simple rule." },
      { tag: "ANALOGY", color: "css-tag", text: "'A is to B as C is to ?': decide exactly what changed from A to B (flip, rotate, swap shading, add a shape) and apply the same change to C." },
      { tag: "ODD ONE", color: "js-tag", text: "Find what the four matching figures share, then see which one breaks it. Count shapes, check shading and which side things sit on." },
      { tag: "GRIDS", color: "html-tag", text: "In grids and dominoes, check rows, columns and diagonals. Dominoes often count up or down in each half separately." },
      { tag: "STUDY TIP", color: "study-tag", text: "Picture questions keep their A-B-C-D order because the letters are printed in the picture. Study the study sheet pictures slowly." }
    ]
  },
  {
    id: "general",
    name: "GENERAL",
    fullName: "General Information",
    icon: "🌍",
    subtitle: "History, arts, science, trivia",
    description: "ACET general information: history, literature, architecture, science and current knowledge.",
    intro: "Knowledge from everywhere. Review the notes, then face the guardian.",
    enemy: "SCROLL SPHINX",
    enemyColor: "#d9a441",
    battleSize: 10,
    victoryMessage: "The Scroll Sphinx bows. Its riddles are yours!",
    reviewTitle: "Quick Review: General Information",
    review: [
      { tag: "HISTORY", color: "html-tag", text: "World War 2 began in 1939. The ACET sheet counts Osmeña as the third president of the Philippines." },
      { tag: "ARTS", color: "css-tag", text: "I.M. Pei designed the Louvre pyramid. Hagia Sophia is in Istanbul. Cyrano de Bergerac was written by Edmond Rostand, not Shakespeare." },
      { tag: "STUDY TIP", color: "study-tag", text: "Trivia sticks when you attach a story to it. Make up a silly sentence for each fact." }
    ]
  }
];
