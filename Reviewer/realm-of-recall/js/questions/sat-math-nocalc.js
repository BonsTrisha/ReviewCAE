// SAT Practice Test #1 · Section 3 · Math (No Calculator)
// NOTE: The College Board PDF only contains answer explanations, so these questions
// are rebuilt from those explanations. Wording and some wrong choices are my own.
// Questions that depend on a figure/table were skipped.

registerStage({
  id: "sat-math-nocalc",
  category: "math",
  order: 1,
  icon: "🌿",
  name: "MEADOW",
  fullName: "Meadow of Numbers",
  subtitle: "Stage 1 · Math, no calculator",
  description: "SAT Practice Test #1 math without a calculator: algebra, functions, systems and number sense.",
  intro: "Warm up with the no-calculator math section. Read the notes, then face the guardian.",
  enemy: "MOSS GUARDIAN",
  enemyColor: "#4c9a65",
  timePerQuestion: 75,
  battleSize: 10,
  victoryMessage: "The Moss Guardian has been defeated. The meadow blooms again!",
  reviewTitle: "Quick Review: No-Calculator Math",
  review: [
    { tag: "ALGEBRA", color: "html-tag", text: "Undo operations in reverse order to isolate a variable. Substitute known values first, then simplify." },
    { tag: "SYSTEMS", color: "css-tag", text: "Two equations, two unknowns: use substitution (solve one for a variable) or elimination (add/subtract the equations)." },
    { tag: "FUNCTIONS", color: "js-tag", text: "Even function: g(−x) = g(x). Linear model y = mx + b: m is the rate of change, b is the starting value (x = 0)." },
    { tag: "EXPONENTS", color: "html-tag", text: "Rewrite with a common base (8 = 2³). Then aᵐ ÷ aⁿ = aᵐ⁻ⁿ and (aᵐ)ⁿ = aᵐⁿ." },
    { tag: "TRIG", color: "css-tag", text: "Complementary angles: sin(x°) = cos(90° − x°)." },
    { tag: "COMPLEX", color: "js-tag", text: "Add real parts to real parts and imaginary parts to imaginary parts. i = √−1." },
    { tag: "STUDY TIP", color: "study-tag", text: "If a wrong choice looks tempting, ask what mistake would lead to it. That is how SAT distractors are built." }
  ],
  questions: [
    mc("If (x − 1) / 3 = k and k = 3, what is the value of x?",
      ["3", "4", "9", "10"], "10",
      "Replace k with 3: (x − 1)/3 = 3. Multiply both sides by 3 to get x − 1 = 9, then add 1 to get x = 10.",
      "Substitute k = 3, then undo the division and the subtraction."),

    mc("What is the sum (7 + 3i) + (−8 + 9i)? (i = √−1)",
      ["−1 + 12i", "−1 − 6i", "15 + 12i", "15 − 6i"], "−1 + 12i",
      "Real parts: 7 + (−8) = −1. Imaginary parts: 3i + 9i = 12i. The sum is −1 + 12i.",
      "Add the real parts together and the imaginary parts together."),

    mc("Armand sends m texts per hour for 5 hours. Tyrone sends p texts per hour for 4 hours. Which expression gives the total number of texts they sent?",
      ["9mp", "20mp", "5m + 4p", "4m + 5p"], "5m + 4p",
      "Armand sent m × 5 = 5m texts and Tyrone sent p × 4 = 4p texts. The total is the SUM, 5m + 4p.",
      "Rate × time for each person, then add."),

    mc("Kathy's repair count is P = 108 − 23d, where P is the number of phones left to fix after d days of work in a week. What does 108 represent?",
      ["The number of days Kathy needs to finish", "The number of phones Kathy has to fix at the start of the week", "The number of phones Kathy fixes each hour", "The number of phones Kathy fixes each day"],
      "The number of phones Kathy has to fix at the start of the week",
      "When d = 0 no days have been worked, so P = 108: the starting number of phones. The 23 is the number fixed per day.",
      "Plug in d = 0."),

    mc("What is (x²y − 3y² + 5xy²) − (−x²y + 3xy² − 3y²)?",
      ["2x²y + 2xy²", "2x²y + 8xy² − 6y²", "8xy² − 6y²", "−2x²y + 2xy²"], "2x²y + 2xy²",
      "Distribute the minus sign, then combine like terms: x²y + x²y = 2x²y, −3y² + 3y² = 0, 5xy² − 3xy² = 2xy².",
      "Only terms with the same variables AND exponents can be combined."),

    ident("The equation h = 3a + 28.6 models a boy's height h (in inches) at age a (in years). According to the model, by how many inches does his height increase each year?",
      "3", ["3 inches", "3in"],
      "Increasing a by 1 changes h by 3. The coefficient of a is the rate of change: 3 inches per year.",
      "Look at the number multiplying a."),

    mc("If a / b = 2, what is the value of 4b / a?",
      ["0", "1", "2", "4"], "2",
      "If a/b = 2 then b/a = 1/2. So 4b/a = 4 × (1/2) = 2.",
      "Flip the fraction first."),

    mc("Which ordered pair (x, y) is the solution to the system 2y − x = −19 and 3x + 4y = −23?",
      ["(3, −8)", "(−3, 8)", "(3, 8)", "(−3, −8)"], "(3, −8)",
      "From the first equation x = 2y + 19. Substitute: 3(2y + 19) + 4y = −23 → 10y + 57 = −23 → y = −8. Then x = 2(−8) + 19 = 3.",
      "Solve the first equation for x, then substitute into the second."),

    mc("The function g is an even function, and g(4) = 8. What is g(−4)?",
      ["8", "4", "−8", "0"], "8",
      "Even functions satisfy g(−x) = g(x), so g(−4) = g(4) = 8. A function has only one output for each input.",
      "What does 'even function' say about x and −x?"),

    mc("Beef costs b = 2.35 + 0.25x dollars per pound and chicken costs c = 1.75 + 0.40x dollars per pound, where x is the number of weeks after July 1. What was the price of beef per pound when the two prices were equal?",
      ["$2.60", "$2.85", "$2.95", "$3.35"], "$3.35",
      "Set b = c: 2.35 + 0.25x = 1.75 + 0.40x → 0.60 = 0.15x → x = 4. Then b = 2.35 + 0.25(4) = 3.35.",
      "Find x when the prices match, then plug x into the beef formula."),

    mc("A line passes through the origin and has slope 1/7. Which point lies on the line?",
      ["(0, 7)", "(1, 7)", "(7, 49)", "(14, 2)"], "(14, 2)",
      "The line is y = (1/7)x. A point is on it when y is 1/7 of x. For (14, 2): 2 = 14/7. ✔",
      "Test each point in y = x/7."),

    mc("If 3x − y = 12, what is the value of 8ˣ / 2ʸ?",
      ["2⁴", "2⁹", "2¹²", "It cannot be determined"], "2¹²",
      "Write 8 as 2³: 8ˣ = 2³ˣ. Then 2³ˣ / 2ʸ = 2³ˣ⁻ʸ = 2¹².",
      "Rewrite 8 as a power of 2."),

    mc("(ax + 2)(bx + 7) = 15x² + cx + 14 for all x, and a + b = 8. What are the two possible values of c?",
      ["3 and 5", "6 and 35", "10 and 21", "31 and 41"], "31 and 41",
      "Matching x² terms gives ab = 15. With a + b = 8, a and b are 3 and 5. Then c = 7a + 2b, which is 31 (a = 3, b = 5) or 41 (a = 5, b = 3).",
      "Expand and compare coefficients. The x-term is 7a + 2b."),

    ident("If t² − 4 = 0 and t > 0, what is the value of t?",
      "2", [],
      "Factor: (t − 2)(t + 2) = 0, so t = 2 or t = −2. Because t > 0, t = 2.",
      "Don't forget the condition t > 0."),

    ident("If x + y = −9 and x + 2y = −25, what is the value of x?",
      "7", [],
      "Subtract the first equation from the second to get y = −16. Then x = −9 − (−16) = 7.",
      "Elimination: subtract the equations."),

    ident("If sin(x°) = 4/5, what is the value of cos(90° − x°)?",
      "4/5", ["0.8", ".8"],
      "Sine and cosine of complementary angles are equal: cos(90° − x°) = sin(x°) = 4/5.",
      "Complementary angles add to 90°."),

    ident("If a = 5√2 and 2a = √(2x), what is the value of x?",
      "100", [],
      "2a = 10√2 = √(2x). Square both sides: 200 = 2x, so x = 100.",
      "Substitute a, then square both sides."),

    tf("A function g is called even if g(−x) = g(x) for every x in its domain.",
      "True",
      "That is the definition. Even functions are symmetric about the y-axis.",
      "Think of symmetry across the y-axis."),

    tf("For any angle x, sin(x°) = cos(90° − x°).",
      "True",
      "Sine and cosine of complementary angles are equal. This is why sin(30°) = cos(60°).",
      "Complementary means the angles add to 90°."),

    match("Match each part of y = mx + b with its meaning.",
      [["m", "Slope"], ["b", "y-intercept"], ["x", "Input value"]],
      "m is the slope (rate of change), b is the y-intercept (value when x = 0), and x is the input.",
      "b is the value of y when x = 0.")
  ]
});
