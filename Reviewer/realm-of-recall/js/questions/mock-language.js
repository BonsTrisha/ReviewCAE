// Mock Exam (The Scholar's Apprentice) · Language sample
// NOTE: the PDF has no answer key, so answers and explanations were worked out here.
// Skipped because they were ambiguous: #2, #28, #30, #33, #35.
// The "underline the error" items (16-20) lost their underlines in the PDF, so they are
// rebuilt as "which part is wrong?" questions. #21 and #29 had small typos fixed.

registerStage({
  id: "mock-language",
  category: "english",
  questions: [
    // ---------- Figures of speech ----------
    mc("Determine the figure of speech: 'I have been laboriously idle the entire day.'",
      ["Oxymoron", "Simile", "Paradox", "Irony"], "Oxymoron",
      "'Laboriously idle' puts two contradictory words side by side, which is an oxymoron.",
      "Two opposite words in one phrase."),

    mc("Determine the figure of speech: 'Oh love, my love, where art thou?'",
      ["Personification", "Apostrophe", "Metonymy", "Hyperbole"], "Apostrophe",
      "The speaker addresses an absent person directly. That is apostrophe.",
      "Speaking to someone who is not there."),

    mc("Determine the figure of speech: 'Just as the sunshine in the morning, I find you, my love, the most beautiful thing.'",
      ["Simile", "Metaphor", "Apostrophe", "Hyperbole"], "Simile",
      "A comparison using 'just as' (like or as) is a simile.",
      "Look for 'as' or 'like'."),

    mc("Determine the figure of speech: 'Look how his majesty lavishes the fruit of his people's labors. Plausible, indeed.'",
      ["Irony", "Paradox", "Oxymoron", "Litotes"], "Irony",
      "The speaker says 'plausible' but means the opposite. Saying the opposite of what is meant is irony.",
      "The tone is sarcastic."),

    // ---------- Synonyms and antonyms ----------
    mc("Select the word synonymous with the italicized word: 'The people are skeptical of the government's plans.'",
      ["Doubtful", "Contrary", "Supportive", "Agreeable"], "Doubtful",
      "Skeptical means doubtful or unconvinced.",
      "Sceptics doubt."),

    mc("Select the word synonymous with the italicized word: 'The cabal to eliminate the king'",
      ["Conspiracy", "Decision", "Opportunity", "Misadventure"], "Conspiracy",
      "A cabal is a small secret group plotting together, so a conspiracy.",
      "A secret plot."),

    mc("Select the word synonymous with the italicized word: 'An update is needed because the phone's software is anachronistic.'",
      ["Timely", "Out-of-date", "Classical", "Disturbing"], "Out-of-date",
      "Anachronistic means belonging to a different, earlier time, so out of date.",
      "Ana- + chronos (time) means out of its time."),

    mc("Select the word that OPPOSES the italicized word: 'The Buddha was a renegade of a high-class society.'",
      ["Die-hard", "Deserter", "Outcast", "Refugee"], "Die-hard",
      "A renegade abandons a group or cause. The opposite is a loyal, die-hard supporter.",
      "Renegade = turncoat. Who is the opposite?"),

    mc("Select the word that OPPOSES the italicized word: 'Seafloor creatures are typically sedentary to preserve energy.'",
      ["Chattering", "Wandering", "Noisy", "Resting"], "Wandering",
      "Sedentary means staying in one place and inactive. The opposite is wandering.",
      "Sedentary = settled."),

    // ---------- Analogies ----------
    mc("Select the appropriate analogous pair. Bonfire : hot ::",
      ["Sprinter : fast", "Food : fast", "Turtle : fast", "Speedy : fast"], "Sprinter : fast",
      "A bonfire is characterized by being hot; a sprinter is characterized by being fast. Same thing-to-characteristic relationship.",
      "Thing : its defining quality."),

    mc("Select the appropriate analogous pair. Conceit : vanity ::",
      ["Elevation : depth", "Confidence : quality", "Equanimity : composure", "Deceive : assure"], "Equanimity : composure",
      "Conceit and vanity are synonyms. Equanimity and composure are synonyms too.",
      "Synonym pairs."),

    mc("Select the appropriate analogous pair. Deluge : flood ::",
      ["Typhoon : hurricane", "Conflagration : fire", "Lightning : electricity", "Rally : chaos"], "Typhoon : hurricane",
      "A deluge is a flood, and a typhoon is the Pacific name for a hurricane. Both pairs are near-synonyms for the same kind of event.",
      "Same event, different name."),

    mc("Select the appropriate analogous pair. Drizzle : rain ::",
      ["Gold : metal", "Ghost : horror", "Dignity : respect", "Crawl : pace"], "Crawl : pace",
      "A drizzle is a very light form of rain; a crawl is a very slow form of pace.",
      "A weak or extreme form of the second word."),

    mc("Select the appropriate analogous pair. Anathema : curse ::",
      ["Doctor : medicine", "Poetry : prose", "Rebuke : condemnation", "Soldier : enemy"], "Rebuke : condemnation",
      "An anathema is a strong formal curse, and condemnation is a strong form of criticism. Both pairs link a word to a close, stronger relative.",
      "Both words are about harsh disapproval."),

    // ---------- Find the error ----------
    mc("Which part is incorrect? 'Any Westerner who has been here will agree that driving in Manila is more difficult than to drive in their home countries.'",
      ["has been here", "driving in Manila", "than to drive", "No error"], "than to drive",
      "Comparisons need parallel forms: 'driving in Manila is more difficult than driving in...'. 'To drive' breaks the parallel.",
      "Match 'driving' with the same form."),

    mc("Which part is incorrect? 'Between you and I, the stronger competitor shall be determined by his skills.'",
      ["Between you and I", "the stronger competitor", "shall be determined", "No error"], "Between you and I",
      "After the preposition 'between' use the object form: 'between you and me'.",
      "Which pronoun form follows a preposition?"),

    mc("Which part is incorrect? 'We should know that there is always two sides to an issue.'",
      ["We should know", "there is always", "two sides", "No error"], "there is always",
      "'Sides' is plural, so the verb must be 'are': 'there are always two sides'.",
      "Does the verb agree with 'sides'?"),

    mc("Which part is incorrect? 'We were already to leave for the night out when Art, our driver, felt dizzy.'",
      ["We were", "already to leave", "for the night out", "No error"], "already to leave",
      "'Already' means 'before now'. The sentence needs 'all ready' (fully prepared): 'We were all ready to leave'.",
      "Prepared, or 'before now'?"),

    mc("Which part is incorrect? 'Ed, Edd, and Eddie are all prodigies, but the later shows a more promising painting skill.'",
      ["Ed, Edd, and Eddie", "are all prodigies", "the later shows", "No error"], "the later shows",
      "'Later' refers to time. The second of two (or the last-named) is 'the latter'.",
      "Later vs. latter."),

    // ---------- Verb tense ----------
    mc("Select the appropriate verb tense: 'If I only ___ the chance to correct my mistakes, I would have done so.'",
      ["Had", "Have", "Have had", "Had had"], "Had had",
      "A past unreal condition uses the past perfect: 'had had' (had = auxiliary, had = have).",
      "Past perfect of 'have'."),

    mc("Select the appropriate verb tense: 'Yesterday, I ___ at the mall when the bank nearby ___ robbed.'",
      ["Am, got", "Was, get", "Was, got", "Was, have gotten"], "Was, got",
      "Both events happened yesterday, so both verbs are past tense: 'was' and 'got'.",
      "Both actions are in the past."),

    mc("Select the correct adverb and verb: 'She spoke so ___ that the people ___ all ears.'",
      ["Powerful, was", "Powerfully, was", "Powerful, were", "Powerfully, were"], "Powerfully, were",
      "'Spoke' is modified by an adverb (powerfully). 'The people' is plural, so 'were'.",
      "Adverb for the verb, plural for 'people'."),

    mc("Select the appropriate verb tense: 'By the time you ___ the exam, you ___ realized how easy this was supposed to be.'",
      ["Will have finished, will", "Finish, have", "Finish, will have", "Finished, will have"], "Finish, will have",
      "A future event (finishing) takes the simple present after 'by the time', and the earlier-completed realization takes the future perfect: 'will have realized'.",
      "Future perfect: will have + past participle."),

    mc("Select the appropriate verb tense: 'When I was young, I ___ to play outside with my friends, and those ___ precious moments.'",
      ["Use, were", "Use, are", "Used, were", "Used, are"], "Used, were",
      "'Used to' describes a past habit, and the past-time sentence needs 'were'.",
      "Everything is in the past."),

    // ---------- Prepositions and conjunctions ----------
    mc("Supply the correct pair: 'When the evidence had been recovered, they found out that there were ___ fingerprints ___ blood stains and immediately arrested the suspect.'",
      ["Neither, nor", "Not only, but also", "Not only, and", "Neither, also"], "Not only, but also",
      "They arrested the suspect because both clues were present, so the correlative pair is 'not only... but also'. 'Neither... nor' would mean there was no evidence.",
      "Is the evidence present or absent?"),

    mc("Supply the correct preposition: '___ 1941, the Japanese declared war in Asia.'",
      ["On", "In", "During", "At"], "In",
      "Use 'in' with a year.",
      "In + year."),

    mc("Choose the best transition: 'The evidence speaks for itself; ___, your uneasy gestures prove your guilt.'",
      ["Yet", "Therefore", "Although", "Moreover"], "Moreover",
      "The second clause adds another supporting point, so 'moreover' fits.",
      "Adding more support."),

    // ---------- Pronouns ----------
    mc("Select the correct pronouns: '___ wife has always been faithful to ___.'",
      ["His, her", "His, him", "Her, him", "Her, their"], "His, him",
      "'His wife' shows possession by a man, and 'faithful to him' uses the object form after a preposition.",
      "Possessive first, object second."),

    mc("Select the correct pronoun: 'Sodium nitrate, ___ is a compound in hotdogs, is a known carcinogen.'",
      ["That", "Which", "Who", "When"], "Which",
      "Extra information set off by commas takes 'which' for things. 'That' is used for essential information, 'who' for people.",
      "A thing, with commas around the clause."),

    mc("Select the correct words: '___ goal is to protect nature; that is why ___ protesting the mall's inauguration ___.'",
      ["They're, their, there", "There, they're, their", "Their, there, they're", "Their, they're, there"], "Their, they're, there",
      "'Their goal' (belonging to them), 'they're protesting' (they are), and 'there' (in that place or at that event).",
      "Possessive, contraction, place.")
  ]
});
