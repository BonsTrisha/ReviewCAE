// SAT Practice Test #1 · Section 1 · Reading
// NOTE: The PDF has no passages or question text. These are RECALL questions built from the
// official explanations (vocabulary in context, strategy, and facts the passages discuss).
// For real reading practice, still work through the actual passages.

registerStage({
  id: "sat-reading",
  category: "english",
  order: 4,
  icon: "🏰",
  name: "CITADEL",
  fullName: "Forgotten Citadel",
  subtitle: "Stage 4 · Reading",
  description: "SAT Practice Test #1 reading: vocabulary in context, evidence strategy, and passage ideas.",
  intro: "Reading questions reward careful evidence. Review the notes, then face the final guardian.",
  enemy: "CITADEL KNIGHT",
  enemyColor: "#8a6fc0",
  timePerQuestion: 45,
  battleSize: 10,
  victoryMessage: "The Citadel Knight kneels. The Forgotten Fog lifts from the realm!",
  reviewTitle: "Quick Review: Reading Skills",
  review: [
    { tag: "CONTEXT", color: "html-tag", text: "For words-in-context questions, reread the sentence and test each choice in place of the word. The common meaning is often a trap." },
    { tag: "EVIDENCE", color: "css-tag", text: "'Best evidence' questions: pick the lines that directly prove your previous answer, not lines that merely sound related." },
    { tag: "TONE", color: "js-tag", text: "Track the author's attitude. Respectful, critical, excited and cautious authors use very different word choices." },
    { tag: "PAIRED", color: "html-tag", text: "With two passages, note where the authors agree (both see benefits) and where one adds a concern or a warning." },
    { tag: "DNA", color: "css-tag", text: "DNA backbone = alternating sugar and phosphate. Bases pair adenine–thymine and guanine–cytosine, one purine with one pyrimidine." },
    { tag: "STUDY TIP", color: "study-tag", text: "Wrong choices are often true-sounding but unsupported. Always point to a line in the passage." }
  ],
  questions: [
    match("Match each word, as used in the Test 1 passages, with its meaning in context.",
      [["form (as in 'followed form')", "Tradition or custom"],
       ["convey", "Communicate"],
       ["demands", "Desires"],
       ["hold (as in 'hard lines to hold')", "Maintain"],
       ["ambivalent", "Conflicted"],
       ["survey (as in 'make a survey')", "Examine carefully"]],
      "Akira breaking tradition: 'form' = custom. Expensive gifts 'convey' stronger signals = communicate. 'Earthly demands' = desires. Hard lines to 'hold' = maintain. 'Ambivalent' feelings = conflicted. 'Make a survey' = examine carefully.",
      "Replace each word with the choice and see if the sentence still makes sense.",
      200),

    mc("In a 'best evidence' question, which lines should you choose?",
      ["Lines that directly support your answer to the previous question",
       "Lines that sound the most interesting",
       "Lines from the first paragraph only",
       "Lines with the longest quotation"],
      "Lines that directly support your answer to the previous question",
      "The evidence question exists to check your last answer. The right lines prove that answer; the wrong ones are related but don't prove it.",
      "Think 'proof', not 'topic'."),

    tf("In words-in-context questions, the most common meaning of a word is always correct.",
      "False",
      "SAT choices often include the common meaning as a trap. Use the sentence to decide which meaning fits.",
      "Context beats dictionary order."),

    mc("In the DNA passage, the backbone of the long chain is made of a regular alternation of what?",
      ["Sugar and phosphate groups", "Purines and pyrimidines", "Adenine and thymine", "Hydrogen bonds"],
      "Sugar and phosphate groups",
      "The passage describes the backbone as a regular alternation of sugar and phosphate groups. The nitrogenous bases attach to the sugars.",
      "The bases hang off the backbone; they aren't the backbone."),

    match("Match each DNA base with the base it pairs with.",
      [["Adenine", "Thymine"], ["Guanine", "Cytosine"], ["Thymine", "Adenine"], ["Cytosine", "Guanine"]],
      "The only possible pairs are adenine with thymine and guanine with cytosine.",
      "A–T and G–C."),

    ident("Adenine and guanine belong to which class of nitrogenous bases? (purines or pyrimidines)",
      "purines", ["purine"],
      "The passage states that adenine and guanine are purines. Thymine and cytosine are pyrimidines.",
      "It starts with the letter P, and so does the other one."),

    tf("In a DNA base pair, one member must be a purine and the other a pyrimidine.",
      "True",
      "That combination bridges the two chains. A pair of purines would be too large to fit.",
      "One big base plus one small base."),

    mc("Why does the DNA passage say the pairing of bases suggests how DNA might copy itself?",
      ["One chain is the complement of the other, so the order of bases on one chain fixes the order on the other",
       "The order of bases on a chain is random",
       "Hydrogen bonds are weaker than the sugar-phosphate backbone",
       "Most nucleotide sequences are already known"],
      "One chain is the complement of the other, so the order of bases on one chain fixes the order on the other",
      "Because of specific pairing, knowing the bases on one chain tells you the exact bases on the other. That is what could allow duplication.",
      "Words like 'exact', 'specific' and 'complement'."),

    mc("In the Woolf passage, what does the repeated word 'we' mainly establish?",
      ["Solidarity among educated women", "A need for candor among women", "That people in a group should respect each other", "That men and women are friendly"],
      "Solidarity among educated women",
      "Woolf uses 'we' to include herself and educated women, building a sense of shared purpose and urging them to consider joining the workforce.",
      "Who is included in 'we'?"),

    tf("In the Woolf passage, the 'sixpence' is meant as a literal coin.",
      "False",
      "The 'sixpence' is a metaphor for the opportunity women have gained, which they now need to learn how to 'spend'.",
      "Is Woolf talking about money, or about opportunity?"),

    mc("What do both space-mining passages suggest about resources valued in space?",
      ["They may differ from the resources valued on Earth", "They must be inexpensive to mine", "They are mostly precious metals", "They are disappearing on Earth"],
      "They may differ from the resources valued on Earth",
      "Passage 2 says this directly, and Passage 1 suggests water could be more valuable than metals in an off-planet economy.",
      "Think water versus gold."),

    mc("In the gift-giving passage, what do gift-givers tend to assume about expensive gifts?",
      ["The more expensive the gift, the more the recipient will appreciate it",
       "Recipients dislike expensive gifts",
       "Price has no link to thoughtfulness",
       "Expensive gifts must always be reciprocated"],
      "The more expensive the gift, the more the recipient will appreciate it",
      "Givers equate how much they spend with how much recipients will appreciate the gift. The authors suggest recipients may not see it that way.",
      "Does the giver link price to appreciation?")
  ]
});
