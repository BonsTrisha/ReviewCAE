// Abstract Reasoning Test 1 (psychometric-success.com). Each puzzle is a picture cropped from the PDF
// in img/abstract/. Answers come from the answer key on the last page of that PDF.
// Picture questions keep their A, B, C order because the letters are printed inside the picture.

registerStage({
  id: "abstract-test-1",
  category: "abstract",
  questions: [
    imgq("Puzzle 1. Which figure completes the series?", "img/abstract/q01.png", ["A", "B", "C", "D"], "A",
      "The answer is A. Look at each element separately (shading, position, rotation, number of shapes) and follow how it changes from frame to frame.",
      "Follow ONE feature across all four frames."),

    imgq("Puzzle 2. Which figure completes the series?", "img/abstract/q02.png", ["A", "B", "C", "D"], "C",
      "The answer is C. Look at each element separately (shading, position, rotation, number of shapes) and follow how it changes from frame to frame.",
      "Follow ONE feature across all four frames."),

    imgq("Puzzle 3. Which figure completes the series?", "img/abstract/q03.png", ["A", "B", "C", "D"], "C",
      "The answer is C. Look at each element separately (shading, position, rotation, number of shapes) and follow how it changes from frame to frame.",
      "Follow ONE feature across all four frames."),

    imgq("Puzzle 4. Which figure completes the series?", "img/abstract/q04.png", ["A", "B", "C", "D"], "D",
      "The answer is D. Look at each element separately (shading, position, rotation, number of shapes) and follow how it changes from frame to frame.",
      "Follow ONE feature across all four frames."),

    imgq("Puzzle 5. Which figure completes the series?", "img/abstract/q05.png", ["A", "B", "C", "D"], "B",
      "The answer is B. Look at each element separately (shading, position, rotation, number of shapes) and follow how it changes from frame to frame.",
      "Follow ONE feature across all four frames."),

    imgq("Puzzle 6. Which figure completes the statement?", "img/abstract/q06.png", ["A", "B", "C", "D"], "B",
      "The answer is B. Work out exactly what changes from the first figure to the second (position, flip, shading), then apply the same change to the third.",
      "What changed between the top two figures?"),

    imgq("Puzzle 7. Which figure completes the statement?", "img/abstract/q07.png", ["A", "B", "C", "D"], "C",
      "The answer is C. Work out exactly what changes from the first figure to the second (position, flip, shading), then apply the same change to the third.",
      "What changed between the top two figures?"),

    imgq("Puzzle 8. Which figure completes the statement?", "img/abstract/q08.png", ["A", "B", "C", "D"], "D",
      "The answer is D. Work out exactly what changes from the first figure to the second (position, flip, shading), then apply the same change to the third.",
      "What changed between the top two figures?"),

    imgq("Puzzle 9. Which figure completes the statement?", "img/abstract/q09.png", ["A", "B", "C", "D"], "A",
      "The answer is A. Work out exactly what changes from the first figure to the second (position, flip, shading), then apply the same change to the third.",
      "What changed between the top two figures?"),

    imgq("Puzzle 10. Which figure completes the statement?", "img/abstract/q10.png", ["A", "B", "C", "D"], "C",
      "The answer is C. Work out exactly what changes from the first figure to the second (position, flip, shading), then apply the same change to the third.",
      "What changed between the top two figures?"),

    imgq("Puzzle 11. Which figure is the odd one out?", "img/abstract/q11.png", ["A", "B", "C", "D", "E"], "C",
      "The answer is C. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit."),

    imgq("Puzzle 12. Which figure is the odd one out?", "img/abstract/q12.png", ["A", "B", "C", "D", "E"], "D",
      "The answer is D. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit."),

    imgq("Puzzle 13. Which figure is the odd one out?", "img/abstract/q13.png", ["A", "B", "C", "D", "E"], "A",
      "The answer is A. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit."),

    imgq("Puzzle 14. Which figure is the odd one out?", "img/abstract/q14.png", ["A", "B", "C", "D", "E"], "D",
      "The answer is D. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit."),

    imgq("Puzzle 15. Which figure is the odd one out?", "img/abstract/q15.png", ["A", "B", "C", "D", "E"], "E",
      "The answer is E. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit."),

    imgq("Puzzle 16. Which figure completes the series?", "img/abstract/q16.png", ["A", "B", "C", "D"], "D",
      "The answer is D. Read across the rows and down the columns: each row builds on the one before it, adding or moving one element at a time.",
      "Find the rule across a row, then apply it to the last row."),

    imgq("Puzzle 17. Which figure completes the series?", "img/abstract/q17.png", ["A", "B", "C", "D"], "A",
      "The answer is A. Read across the rows and down the columns: each row builds on the one before it, adding or moving one element at a time.",
      "Find the rule across a row, then apply it to the last row."),

    imgq("Puzzle 18. Which figure belongs in neither group?", "img/abstract/q18.png", ["A", "B", "C", "D"], "C",
      "The answer is C. Work out what every Group 1 box shares, and what every Group 2 box shares. The answer fits neither rule.",
      "Look at the count and shading of the shapes in each box."),

    imgq("Puzzle 19. Which figure belongs in neither group?", "img/abstract/q19.png", ["A", "B", "C", "D"], "A",
      "The answer is A. Work out what every Group 1 box shares, and what every Group 2 box shares. The answer fits neither rule.",
      "Look at the count and shading of the shapes in each box."),

    imgq("Puzzle 20. Which figure is next in the series?", "img/abstract/q20.png", ["A", "B", "C", "D"], "B",
      "The answer is B. The top and bottom halves follow separate patterns. Track the dots in each half on their own (counting up, down or rotating).",
      "Handle the top half and the bottom half separately."),

    imgq("Puzzle 21. Which figure is next in the series?", "img/abstract/q21.png", ["A", "B", "C", "D"], "D",
      "The answer is D. The top and bottom halves follow separate patterns. Track the dots in each half on their own (counting up, down or rotating).",
      "Handle the top half and the bottom half separately."),

    imgq("Puzzle 22. Which figure completes the grid?", "img/abstract/q22.png", ["A", "B", "C", "D"], "B",
      "The answer is B. Each row and column uses every pattern once. Find the pattern that is missing from the empty cell.",
      "Which pattern and shading are missing from this row and column?"),

    imgq("Puzzle 23. Which figure completes the grid?", "img/abstract/q23.png", ["A", "B", "C", "D"], "C",
      "The answer is C. Each row and column uses every pattern once. Find the pattern that is missing from the empty cell.",
      "Which pattern and shading are missing from this row and column?"),

    imgq("Puzzle 24. Which figure is the odd one out?", "img/abstract/q24.png", ["A", "B", "C", "D", "E"], "C",
      "The answer is C. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit."),

    imgq("Puzzle 25. Which figure is the odd one out?", "img/abstract/q25.png", ["A", "B", "C", "D", "E"], "D",
      "The answer is D. Four figures follow the same hidden rule (shading, which side things sit on, how many shapes). One breaks it.",
      "Compare how many shapes there are and where they sit.")
  ]
});
