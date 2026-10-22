// SAT Practice Test #1 · Section 2 · Writing and Language
// NOTE: The PDF has no passages or question text, so these are ORIGINAL practice questions
// that test the grammar rules the official explanations teach (commas in a series,
// who/whom, dangling modifiers, comma splices, transitions, concision, and more).

registerStage({
  id: "sat-writing",
  category: "english",
  order: 3,
  icon: "🌋",
  name: "EMBER DUNGEON",
  fullName: "Ember Dungeon",
  subtitle: "Stage 3 · Writing & Language",
  description: "SAT Practice Test #1 writing rules: punctuation, grammar, transitions and concision.",
  intro: "Grammar rules show up again and again on the SAT. Master these and the dungeon gets easier.",
  enemy: "EMBER DRAKE",
  enemyColor: "#d9663f",
  timePerQuestion: 40,
  battleSize: 10,
  victoryMessage: "The Ember Drake is defeated. The dungeon cools down!",
  reviewTitle: "Quick Review: Writing & Language Rules",
  review: [
    { tag: "SERIES", color: "html-tag", text: "Separate three or more items with commas: 'A, B, and C'. No semicolon or colon inside a simple series." },
    { tag: "JOINING", color: "css-tag", text: "A comma alone cannot join two complete sentences (comma splice). Use a semicolon, or a comma + and/but/so." },
    { tag: "COLON", color: "js-tag", text: "A colon must follow a complete sentence. It introduces a list or an explanation." },
    { tag: "EXTRA INFO", color: "html-tag", text: "Nonessential phrases get a comma on BOTH sides: 'Jason Box, a professor, studies ice.'" },
    { tag: "AGREEMENT", color: "css-tag", text: "Plural subject, plural verb (students score). 'Who' is a subject; 'whom' is an object." },
    { tag: "MODIFIERS", color: "js-tag", text: "An opening phrase must describe the subject that comes right after the comma." },
    { tag: "TRANSITIONS", color: "html-tag", text: "However = contrast. Moreover / Also = addition. Therefore / Thus = result." },
    { tag: "CONCISE", color: "study-tag", text: "Cut redundancy ('may possibly', 'repeat again'). When two choices are both correct, the shorter one usually wins." }
  ],
  questions: [
    mc("Which sentence punctuates the series correctly?",
      ["Manufacturers, scientists; and officials are working together.",
       "Manufacturers, scientists, and officials are working together.",
       "Manufacturers, scientists, and, officials are working together.",
       "Manufacturers; scientists: and officials are working together."],
      "Manufacturers, scientists, and officials are working together.",
      "Items in a series are separated by commas, with 'and' before the last item. A comma after 'and' or a stray semicolon or colon breaks the pattern.",
      "Use plain commas."),

    mc("Choose the correct word and verb: 'The people ___ use coworking spaces often value the community.'",
      ["whom use", "who uses", "who use", "whom uses"], "who use",
      "'Who' is the subject of the clause, and 'people' is plural, so the verb is 'use'.",
      "Is the pronoun doing the action? And is 'people' singular or plural?"),

    mc("Which choice completes the sentence without a dangling modifier? 'Having become frustrated with working alone, ___'",
      ["no colleagues were available to share ideas.",
       "I looked for a place where I could meet other professionals.",
       "the ideas never seemed to improve.",
       "the office felt too quiet."],
      "I looked for a place where I could meet other professionals.",
      "'Having become frustrated' must describe a person. Only 'I' can be frustrated; ideas, colleagues and offices cannot.",
      "Who was frustrated?"),

    mc("Which sentence is punctuated correctly?",
      ["The ice began to melt early, soot darkened the snow.",
       "The ice began to melt early; soot darkened the snow.",
       "The ice began to melt early soot darkened the snow.",
       "The ice began to melt early; and soot darkened the snow."],
      "The ice began to melt early; soot darkened the snow.",
      "Two complete sentences can be joined by a semicolon. A comma alone makes a comma splice, no punctuation makes a run-on, and a semicolon shouldn't be paired with 'and'.",
      "Both halves are complete sentences."),

    mc("Choose the correct verb: 'Students who major in philosophy often ___ higher on verbal reasoning tests.'",
      ["scores", "has scored", "score", "scoring"], "score",
      "The subject 'students' is plural, so the verb must be plural: 'score'.",
      "Match the verb to 'students'."),

    mc("Which version punctuates the extra information correctly?",
      ["Jason Box an associate professor of geology studies the ice sheet.",
       "Jason Box, an associate professor of geology studies the ice sheet.",
       "Jason Box, an associate professor of geology, studies the ice sheet.",
       "Jason Box an associate professor of geology, studies the ice sheet."],
      "Jason Box, an associate professor of geology, studies the ice sheet.",
      "A nonessential phrase needs commas on both sides, like parentheses.",
      "Can you remove the phrase and keep the sentence whole?"),

    mc("Which choice is the most concise and free of redundancy?",
      ["The ice sheet may possibly melt faster.",
       "The ice sheet may melt faster.",
       "The ice sheet might possibly be melting faster, perhaps.",
       "The ice sheet could maybe melt faster."],
      "The ice sheet may melt faster.",
      "'May' and 'possibly' say the same thing. Keep only one.",
      "Look for two words doing the same job."),

    mc("Choose the correct pronoun: 'Snow and ice reflect sunlight, but soot reduces ___ ability to do so.'",
      ["its", "it's", "their", "there"], "their",
      "'Snow and ice' is plural, so the possessive pronoun is 'their'. ('It's' means 'it is'; 'there' is a place.)",
      "Is 'snow and ice' one thing or two?"),

    mc("Choose the correct form: 'Acid whey can pollute ___ if it is dumped.'",
      ["waterway's", "waterways", "waterways'", "waterway"], "waterways",
      "No ownership is shown, and the sentence means more than one body of water, so use the plural 'waterways', not a possessive.",
      "Does anything belong to the waterway here?"),

    mc("Choose the correct preposition: 'I read an article ___ coworking spaces.'",
      ["into", "upon", "about", "for"], "about",
      "You read an article 'about' a topic. The other prepositions don't fit standard usage here.",
      "What do articles do with topics?"),

    mc("Choose the correct word: 'Greek yogurt serves ___ a digestive aid.'",
      ["to be", "as", "like being", "for"], "as",
      "'Serves as' is the standard idiom. 'Serves to be' and the other choices are not standard English.",
      "Think of the phrase 'serves as a ...'."),

    tf("A semicolon can join two complete sentences.",
      "True",
      "A semicolon connects two independent clauses that are closely related.",
      "Independent clause = could stand alone as a sentence."),

    tf("A colon can follow a complete sentence to introduce a list.",
      "True",
      "The part before the colon must be a complete sentence. 'I packed: a hat' is wrong, but 'I packed three things: a hat, a map, and a snack' is right.",
      "What must come BEFORE a colon?"),

    tf("Writing 'repeat again' is concise and correct.",
      "False",
      "'Repeat' already means 'do again', so adding 'again' is redundant.",
      "Does 'repeat' already include the idea of again?"),

    ident("Which transition word, meaning 'in addition', best fits? 'Colleges cut philosophy courses. ____, they closed whole departments.'",
      "Moreover", ["furthermore", "additionally", "in addition", "also"],
      "Both sentences give evidence for the same point, so an addition transition like 'Moreover' fits. 'However' would signal contrast; 'Therefore' would signal result.",
      "Starts with M and means 'in addition'."),

    match("Match each transition with the relationship it shows.",
      [["However", "Contrast"], ["Moreover", "Addition"], ["Therefore", "Result"]],
      "However signals contrast, Moreover adds another point, and Therefore shows a result or conclusion.",
      "Which one points to a result?")
  ]
});
