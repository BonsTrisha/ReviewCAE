// SAT Practice Test #1 · Section 4 · Math (Calculator)
// NOTE: Rebuilt from the official answer explanations (the PDF has no question text).
// Wording and some wrong choices are my own. Figure/table questions were skipped.

registerStage({
  id: "sat-math-calc",
  category: "math",
  order: 2,
  icon: "🌲",
  name: "ARCHIVES",
  fullName: "Enchanted Archives",
  subtitle: "Stage 2 · Math, calculator",
  description: "SAT Practice Test #1 math with a calculator: modeling, percents, quadratics and word problems.",
  intro: "The calculator section leans on word problems and models. Read the notes, then face the guardian.",
  enemy: "ARCHIVE WRAITH",
  enemyColor: "#6a7fd0",
  timePerQuestion: 75,
  battleSize: 10,
  victoryMessage: "The Archive Wraith fades. The shelves fill with answers again!",
  reviewTitle: "Quick Review: Calculator Math",
  review: [
    { tag: "MODELS", color: "html-tag", text: "In a linear model, the number multiplying the variable is the rate of change and the constant is the starting value." },
    { tag: "PERCENT", color: "css-tag", text: "'20% more' means × 1.20. '20% off' means × 0.80. A discount followed by tax multiplies: 0.8 × 1.08, not 0.8 + 0.08." },
    { tag: "SYSTEMS", color: "js-tag", text: "Word problems with two quantities (items and prices) give two equations: one for totals, one for money." },
    { tag: "QUADRATICS", color: "html-tag", text: "Complete the square to find a vertex: y = (x − h)² + k has vertex (h, k). A ball is on the ground when height h = 0." },
    { tag: "CIRCLES", color: "css-tag", text: "(x − h)² + (y − k)² = r². Use the distance formula to find r² from the center to a point on the circle." },
    { tag: "REMAINDER", color: "js-tag", text: "Dividing p(x) by (x − a) leaves remainder p(a)." },
    { tag: "STUDY TIP", color: "study-tag", text: "Check units and rounding. Many wrong choices come from rounding the right answer the wrong way." }
  ],
  questions: [
    ident("y = kx, and y = 24 when x = 6. What is the value of y when x = 5?",
      "20", [],
      "24 = k(6) gives k = 4, so y = 4x. When x = 5, y = 20.",
      "Find k first."),

    mc("If 16 + 4x is 10 more than 14, what is the value of 8x?",
      ["2", "8", "16", "80"], "16",
      "16 + 4x = 10 + 14 = 24, so 4x = 8. Since 8x is twice 4x, 8x = 16.",
      "You don't need x itself. Find 4x, then double it."),

    mc("A medicine container holds 2 decagrams. If each dose is 1 milligram, how many doses can be stored? (1 decagram = 10 grams; 1 gram = 1,000 milligrams)",
      ["0.002", "200", "2,000", "20,000"], "20,000",
      "2 decagrams = 20 grams = 20,000 milligrams, so 20,000 one-milligram doses.",
      "Convert decagrams to grams, then grams to milligrams."),

    mc("For which value of n does |n − 1| + 1 equal 0?",
      ["0", "1", "2", "There is no such value of n"], "There is no such value of n",
      "|n − 1| + 1 = 0 means |n − 1| = −1, but an absolute value can never be negative.",
      "Can an absolute value ever be negative?"),

    mc("The speed of sound a (in feet per second) at air temperature t (°F) is a = 1,052 + 1.08t. Which expression gives t in terms of a?",
      ["(a − 1,052) / 1.08", "(a + 1,052) / 1.08", "1.08(a − 1,052)", "(1,052 − a) / 1.08"], "(a − 1,052) / 1.08",
      "Subtract 1,052 from both sides, then divide by 1.08: t = (a − 1,052)/1.08.",
      "Isolate 1.08t first."),

    mc("Using a = 1,052 + 1.08t, which air temperature (°F) gives a sound speed closest to 1,000 feet per second?",
      ["−52", "−49", "−48", "−47"], "−48",
      "1,000 = 1,052 + 1.08t gives t = −52/1.08 ≈ −48.15, which is closest to −48.",
      "Round −48.15 to the nearest whole number."),

    mc("Which of these values CANNOT be a solution of 3x − 5 ≥ 4x − 3?",
      ["−1", "−2", "−3", "−4"], "−1",
      "Subtract 3x and add 3: −2 ≥ x. So x must be −2 or less. Only −1 is greater than −2.",
      "Solve the inequality for x first."),

    mc("A café sold 209 salads and sodas in total. Salads cost $6.50, sodas cost $2.00, and total sales were $836.50. How many salads were sold?",
      ["79", "93", "99", "116"], "93",
      "x + y = 209 and 6.5x + 2y = 836.5. Doubling the first gives 2x + 2y = 418; subtracting leaves 4.5x = 418.5, so x = 93.",
      "Write one equation for item count and one for money."),

    mc("A computer is discounted 20%, then 8% sales tax is added to the discounted price. Alma pays p dollars in total. Which expression gives the ORIGINAL price?",
      ["p / 0.88", "0.88p", "p / (0.8 × 1.08)", "(0.8 × 1.08)p"], "p / (0.8 × 1.08)",
      "Price after discount = 0.8x. After tax = 1.08(0.8x) = p, so x = p / (0.8 × 1.08). Percent changes multiply; they don't add.",
      "Each percent change is a multiplier."),

    mc("A circle has center (0, 4), and one endpoint of a radius is at (4/3, 5). Which equation describes the circle?",
      ["x² + (y − 4)² = 25/9", "x² + (y + 4)² = 25/9", "x² + (y − 4)² = 5/3", "x² + (y + 4)² = 3/5"], "x² + (y − 4)² = 25/9",
      "r² = (4/3 − 0)² + (5 − 4)² = 16/9 + 1 = 25/9. The equation is x² + (y − 4)² = 25/9 (use r², not r).",
      "Distance formula gives r². Keep the minus signs in (y − k)."),

    mc("A ball's height in meters is h = −4.9t² + 25t, where t is time in seconds after launch. About how many seconds after launch does the ball return to the ground?",
      ["2.5", "3.0", "4.0", "5.0"], "5.0",
      "Set h = 0: t(−4.9t + 25) = 0, so t = 0 (launch) or t = 25/4.9 ≈ 5.1. The closest choice is 5.0.",
      "On the ground means h = 0. Factor out t."),

    mc("Type A trees produce 20 percent more pears than Type B trees. Type A trees produce 144 pears. How many pears do Type B trees produce?",
      ["115", "120", "124", "173"], "120",
      "A = 1.20B, so B = 144 / 1.20 = 120.",
      "The 20% is taken from B, not from A."),

    ident("If p(3) = −2 for a polynomial p(x), what is the remainder when p(x) is divided by x − 3?",
      "-2", ["−2", "negative 2", "negative two"],
      "By the remainder theorem, dividing by (x − 3) leaves p(3) = −2.",
      "Remainder theorem: remainder = p(3)."),

    mc("Which equation shows the coordinates of the vertex of y = x² − 2x − 15 as constants?",
      ["y = (x + 3)(x − 5)", "y = (x + 1)² − 16", "y = x(x − 2) − 15", "y = (x − 1)² − 16"], "y = (x − 1)² − 16",
      "Complete the square: x² − 2x − 15 = (x² − 2x + 1) − 16 = (x − 1)² − 16. The vertex is (1, −16).",
      "Complete the square: half of −2 is −1."),

    ident("A truck and its driver weigh 4,500 pounds. Each box weighs 14 pounds. The combined weight must stay below the bridge limit of 6,000 pounds. What is the greatest number of boxes the truck can carry?",
      "107", [],
      "4,500 + 14x < 6,000 gives x < 1,500/14 ≈ 107.14. Boxes are whole numbers, so the maximum is 107.",
      "Solve the inequality, then round DOWN."),

    ident("A radio station sells 30-minute time slots, 24 hours a day. How many 30-minute slots are available across Tuesday and Wednesday together?",
      "96", [],
      "Two days is 48 hours. Each slot is 1/2 hour, so 48 ÷ (1/2) = 96 slots.",
      "How many slots fit in one hour?"),

    ident("A cylinder-shaped silo has volume 72π cubic yards and height 8 yards. What is the diameter of its base, in yards?",
      "6", [],
      "72π = πr²(8), so r² = 9 and r = 3. The diameter is 2 × 3 = 6.",
      "V = πr²h. The question asks for DIAMETER."),

    ident("h(x) = 1 / ((x − 5)² + 4(x − 5) + 4). For what value of x is h(x) undefined?",
      "3", [],
      "The denominator is a perfect square: ((x − 5) + 2)² = (x − 3)². It equals 0 when x = 3.",
      "Let u = x − 5. The denominator becomes u² + 4u + 4."),

    ident("Jessica deposits $100 at 2% interest compounded annually. Her balance after t years is 100(x)ᵗ. What is the value of x?",
      "1.02", [],
      "Each year the balance is multiplied by 1 + 0.02 = 1.02, so x = 1.02.",
      "Growth of 2% means multiplying by what?"),

    ident("Jessica's $100 earns 2% compounded annually, and Tyshaun's $100 earns 2.5% compounded annually. After 10 years, how many more dollars (to the nearest cent) did Tyshaun's deposit earn? Type the number only.",
      "6.11", ["$6.11"],
      "Jessica: 100(1.02)¹⁰ ≈ 121.90, earning 21.90. Tyshaun: 100(1.025)¹⁰ ≈ 128.01, earning 28.01. Difference ≈ 6.11.",
      "Compute each balance, subtract the $100 deposit, then compare."),

    ident("Wyatt husks at least 12 and at most 18 dozen ears of corn per hour. What is the FEWEST number of hours it could take him to husk 72 dozen ears?",
      "4", [],
      "The fastest rate is 18 dozen per hour: 72 ÷ 18 = 4 hours. (The slowest, 12 per hour, gives 6 hours.)",
      "The fastest worker takes the fewest hours."),

    tf("If an account earns 2% interest compounded annually, the balance is multiplied by 1.02 each year.",
      "True",
      "Compounding means each year's interest is added to the balance, which is then multiplied by 1.02 again.",
      "Compound means 'interest on interest'."),

    tf("When a polynomial p(x) is divided by x − 3, the remainder equals p(3).",
      "True",
      "This is the remainder theorem: p(x) = (x − 3)q(x) + r, and plugging in x = 3 leaves r = p(3).",
      "Plug x = 3 into p(x) = (x − 3)q(x) + r.")
  ]
});
