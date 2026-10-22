// Mock Exam (The Scholar's Apprentice) · Mathematics sample
// NOTE: the PDF has no answer key, so answers and explanations were worked out here.
// Skipped: #17 (needs a figure), #21 and #29 (printed choices do not match the problem).
// #19 and #27 were reworded slightly so they have one clear answer.

registerStage({
  id: "mock-math",
  category: "math",
  questions: [
    mc("Karen, Becky and Susan can sew a gown together in 3 days. Karen alone takes 9 days and Becky alone takes 8 days. How long will Susan take working alone?",
      ["10 4/7 days", "10 3/7 days", "10 2/7 days", "10 1/7 days"], "10 2/7 days",
      "Rates add: 1/9 + 1/8 + 1/s = 1/3. 1/9 + 1/8 = 17/72 and 1/3 = 24/72, so 1/s = 7/72 and s = 72/7 = 10 2/7 days.",
      "Add the rates (jobs per day), not the times."),

    mc("What is the distance from the center of a circle with radius 17 cm to a chord whose length is 30 cm?",
      ["6 cm", "8 cm", "17 cm", "18 cm"], "8 cm",
      "The perpendicular from the center bisects the chord, making a right triangle with legs 15 and d and hypotenuse 17. d = √(17² - 15²) = √64 = 8.",
      "Half the chord is 15. Use the Pythagorean theorem."),

    mc("Find the center and radius of the circle x² + y² + 2x + 10y + 18 = 0.",
      ["(1, -5); 2π", "(-1, -5); 2π", "(-1, 5); 2√2", "(-1, -5); 2√2"], "(-1, -5); 2√2",
      "Complete the square: (x + 1)² + (y + 5)² = 1 + 25 - 18 = 8. Center (-1, -5), radius √8 = 2√2.",
      "Complete the square for x and for y."),

    mc("A spherical cheese 5 inches in diameter sells for P125. What would a similar cheese 9 inches in diameter cost?",
      ["225 pesos", "729 pesos", "405 pesos", "812 pesos"], "729 pesos",
      "Price follows volume, which scales with the cube of the diameter ratio: 125 × (9/5)³ = 125 × 729/125 = 729.",
      "Volume scales with the cube of length."),

    mc("A cube's volume equals its surface area. What is the length of one side?",
      ["8", "6", "10", "14"], "6",
      "s³ = 6s². Dividing by s² gives s = 6.",
      "Volume = s³ and surface area = 6s²."),

    mc("In a class of 45 students, 1/3 are male and 1/3 of the male students are irregular. How many irregular male students are there?",
      ["3", "4", "5", "6"], "5",
      "Males: 45 × 1/3 = 15. Irregular males: 15 × 1/3 = 5.",
      "Take one third twice."),

    mc("If 35st + 8 = 42st, what is st?",
      ["7/8", "8/7", "8/87", "87/8"], "8/7",
      "Subtract 35st from both sides: 8 = 7st, so st = 8/7.",
      "Treat st as a single unknown."),

    mc("Ivan delivers newspapers and keeps 8% of all the money collected. One time he kept P160. How much did he forward to the dealer?",
      ["1650", "1840", "2020", "2400"], "1840",
      "8% of the total = 160, so the total = 160 / 0.08 = 2000. He forwarded 2000 - 160 = 1840.",
      "Find the total collected first."),

    mc("The angles of a triangle are in the ratio 2:3:7. Therefore the triangle is",
      ["Acute", "Isosceles", "Obtuse", "Right"], "Obtuse",
      "2 + 3 + 7 = 12 parts = 180°, so one part is 15°. The angles are 30°, 45° and 105°. One angle is more than 90°, so it is obtuse.",
      "Find the size of one part."),

    mc("For how many integers x is -7 < 2x < -5 true?",
      ["None", "One", "Two", "Three"], "One",
      "Divide by 2: -3.5 < x < -2.5. The only integer in that range is -3.",
      "Divide the whole inequality by 2."),

    mc("If x is an odd integer, which of the following is an even integer?",
      ["x²", "x² + 2", "(x + 2)²", "x² + x"], "x² + x",
      "x² + x = x(x + 1), a product of two consecutive integers, so it is always even. The other three are odd when x is odd.",
      "Factor x² + x."),

    mc("Pat can clean the car in 2 hours while Euclid does it in 3/2 hours. How long will it take if they do the job together?",
      ["2/3 hr", "6/7 hr", "3/2 hr", "7/6 hr"], "6/7 hr",
      "Rates: 1/2 + 2/3 = 7/6 of the job per hour. Time = 1 ÷ 7/6 = 6/7 hour.",
      "Add rates, then flip."),

    mc("If a pipe can drain a tank in h hours, how much of the tank does it drain in 3 hours?",
      ["3h", "h/3", "h + 3", "3/h"], "3/h",
      "Its rate is 1/h of the tank per hour. In 3 hours it drains 3 × (1/h) = 3/h of the tank.",
      "Rate × time."),

    mc("Cube A has an edge of 3 cm while Cube B has an edge of 12 cm. Compare their volumes (A : B).",
      ["1:4", "1:6", "1:64", "1:8"], "1:64",
      "The edge ratio is 3:12 = 1:4. Volumes compare as the cube: 1³ : 4³ = 1 : 64.",
      "Volume ratio = (edge ratio)³."),

    mc("A plane traveling at 600 mph is 30 miles away from the Manila airport. What time will it land if the pilot announces that it is currently 5:58 pm?",
      ["6:00 PM", "6:01 PM", "6:02 PM", "6:20 PM"], "6:01 PM",
      "Time = 30 mi ÷ 600 mph = 0.05 hour = 3 minutes. 5:58 + 3 minutes = 6:01 PM.",
      "600 mph is 10 miles per minute."),

    mc("Two rectangles X and Y have the same area. If the length of X is three times the length of Y, the width of X is how many times the width of Y?",
      ["9", "1/9", "3", "1/3"], "1/3",
      "Area = length × width. If the length triples, the width must shrink to one third to keep the area equal.",
      "Same area means the changes cancel."),

    mc("Find the derivative of f(x) = 2x cos(x).",
      ["2(cos x + x sin x)", "-2(cos x + sin x)", "2(cos x - x sin x)", "-2(x cos x + sin x)"], "2(cos x - x sin x)",
      "Product rule: (2x)' cos x + 2x (cos x)' = 2 cos x - 2x sin x = 2(cos x - x sin x).",
      "Product rule, and the derivative of cos is -sin."),

    mc("Which point does not lie on either of the lines 2x - 3y = 8 and x - y = 5?",
      ["(12, 7)", "(10, 4)", "(8, 8)", "(4, 0)"], "(8, 8)",
      "(12, 7) is on x - y = 5. (10, 4) and (4, 0) are on 2x - 3y = 8. For (8, 8): 16 - 24 = -8 and 8 - 8 = 0, so it is on neither line.",
      "Test each point in both equations."),

    mc("Points on the graph of f(x) = 6x + 8 are NOT included in the graph of which inequality?",
      ["y - 6x > 8", "y - 6x ≥ 8", "y - 6x ≤ 8", "y ≤ 6x + 8"], "y - 6x > 8",
      "A strict inequality (>) leaves out the boundary line y = 6x + 8. The other three use ≥ or ≤, which include the line.",
      "Which symbol excludes the boundary?"),

    mc("Which describes the values of x for which 16 - x² ≥ 0?",
      ["x ≤ -4 or x ≥ 4", "-4 ≤ x ≤ 4", "0 ≤ x ≤ 4", "x ≥ 0"], "-4 ≤ x ≤ 4",
      "16 - x² ≥ 0 means x² ≤ 16, so -4 ≤ x ≤ 4.",
      "Move x² to the other side."),

    mc("If 16x + 8y represents the perimeter of a rectangle and 5x - 2y represents its width, its length is represented by",
      ["3x + 2y", "3x + 6y", "11x + 6y", "21x + 6y"], "3x + 6y",
      "Length + width = half the perimeter = 8x + 4y. Length = 8x + 4y - (5x - 2y) = 3x + 6y.",
      "Half the perimeter is length + width."),

    mc("Solve for x: log ∛(x + 1) = 1/3 (common logarithm, base 10).",
      ["-9", "9", "1", "No solution"], "9",
      "log (x + 1)^(1/3) = 1/3 gives (1/3) log(x + 1) = 1/3, so log(x + 1) = 1 and x + 1 = 10. x = 9.",
      "Bring the 1/3 exponent in front of the log."),

    mc("Evaluate ln(x³ + 125) - ln(x + 5) - ln(x² - 5x + 25).",
      ["0", "1", "5", "No value"], "0",
      "x³ + 125 = (x + 5)(x² - 5x + 25), so ln(x³ + 125) = ln(x + 5) + ln(x² - 5x + 25). Subtracting both logs leaves 0.",
      "Factor the sum of cubes."),

    mc("Simplify: [(x - 2) / (x² - 5x + 6)] ÷ [(x² - 4x) / (x² - 16)]",
      ["(x + 2)/x", "(x - 4)/(x(x - 3))", "(x + 4)/(x(x - 3))", "(x + 4)/(x(x + 3))"], "(x + 4)/(x(x - 3))",
      "The first fraction is 1/(x - 3). The second is x(x - 4) / ((x - 4)(x + 4)) = x/(x + 4). Dividing gives (x + 4) / (x(x - 3)).",
      "Factor every numerator and denominator, then flip the second fraction."),

    mc("On the number line, a < b, x is halfway between a and b, and y is halfway between x and b. What is (b - y)/(y - a)?",
      ["1/4", "1/3", "3/4", "3"], "1/3",
      "Try a = 0 and b = 4: x = 2, y = 3. Then (b - y)/(y - a) = 1/3.",
      "Pick easy numbers like a = 0 and b = 4."),

    mc("Find the equation of the circle with center in the first quadrant, radius 2, and tangent to the y-axis at (0, 1).",
      ["(x - 1)² + (y - 2)² = 4", "(x + 1)² + (y - 2)² = 4", "(x - 2)² + (y - 1)² = 4", "(x + 1)² + (y + 2)² = 4"], "(x - 2)² + (y - 1)² = 4",
      "Tangent to the y-axis at (0, 1) means the center is 2 units to the right at the same height: (2, 1).",
      "The radius to the point of tangency is horizontal."),

    mc("Find the value of cos[sin⁻¹(-1/2)].",
      ["-√3/2", "√3/2", "30°", "45°"], "√3/2",
      "sin⁻¹(-1/2) = -30°, and cos(-30°) = √3/2.",
      "Cosine is even, so cos(-30°) = cos 30°.")
  ]
});
