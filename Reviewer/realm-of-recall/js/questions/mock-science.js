// Mock Exam (The Scholar's Apprentice) · Science sample
// NOTE: the PDF has no answer key, so answers and explanations were worked out here.
// Skipped because they were ambiguous or need missing information:
// #15 (taxonomy wording), #23 (missing experiment), #27 (choices do not match the math),
// #30 (no data given), #33 (no choice matches the correct value).

registerStage({
  id: "mock-science",
  category: "science",
  questions: [
    mc("Why do higher latitudes experience four seasons but not the equator?",
      ["Because higher latitudes are more affected by the Earth's orbit around the Sun",
       "Because higher latitudes are more affected by the Earth's tilting",
       "Because higher latitudes are more affected by climate change",
       "Because higher latitudes are more affected by the Earth's wobbling"],
      "Because higher latitudes are more affected by the Earth's tilting",
      "Earth's axis is tilted about 23.5°, so the angle and length of sunlight change over the year, most strongly away from the equator.",
      "Think axial tilt."),

    mc("Ridges are formed at this type of plate boundary.",
      ["Convergent", "Divergent", "Transform", "None of the above"], "Divergent",
      "At divergent boundaries plates move apart and new crust forms, building mid-ocean ridges.",
      "Plates moving apart."),

    mc("The change in velocity of seismic waves between the Earth's lower mantle and outer core is called the",
      ["Mohorovicic Discontinuity (Moho)", "Gutenberg Discontinuity", "Steno Discontinuity", "Hutton Discontinuity"], "Gutenberg Discontinuity",
      "The Gutenberg discontinuity marks the core-mantle boundary. The Moho is the boundary between crust and mantle.",
      "Core-mantle boundary."),

    mc("Which carbon isotope is particularly useful in radiocarbon dating?",
      ["Carbon 12", "Carbon 13", "Carbon 14", "Carbon 16"], "Carbon 14",
      "Carbon-14 is radioactive and decays with a half-life of about 5,730 years, so it can date organic remains.",
      "The radioactive one."),

    mc("Which of the following is NOT TRUE about the Plate Tectonics theory?",
      ["The Earth was once composed of a supercontinent, Pangaea",
       "Due to the rapid spinning of the Earth's core, this triggered major earthquakes that separated Pangaea",
       "The seafloor spreads at a slow rate, giving birth to new oceans and causing the collision of continents",
       "Animal fossils of the same species were found in South America and Africa"],
      "Due to the rapid spinning of the Earth's core, this triggered major earthquakes that separated Pangaea",
      "Pangaea broke apart through slow plate movement driven by mantle processes, not by a rapidly spinning core.",
      "One statement invents a cause."),

    mc("Which hormone is mainly responsible for regulating (lowering) glucose levels in the body?",
      ["Insulin", "Glucagon", "Saccharin", "Pepsinogen"], "Insulin",
      "Insulin lets cells take up glucose and lowers blood sugar. Glucagon raises it; saccharin is a sweetener; pepsinogen is a digestive enzyme precursor.",
      "Think diabetes."),

    mc("Which is also known as the center of protein synthesis in the cell?",
      ["Ribosome", "Rough endoplasmic reticulum", "Smooth endoplasmic reticulum", "Golgi bodies"], "Ribosome",
      "Ribosomes read mRNA and build proteins.",
      "Tiny structures that translate mRNA."),

    mc("Down syndrome is a genetic disorder resulting from the trisomy of which chromosome?",
      ["13", "18", "21", "15"], "21",
      "Down syndrome is trisomy 21 (three copies of chromosome 21). Trisomy 13 is Patau and trisomy 18 is Edwards syndrome.",
      "Twenty-something."),

    mc("A relationship in which one organism benefits at the expense of another is",
      ["Parasitism", "Mutualism", "Commensalism", "Cannibalism"], "Parasitism",
      "In parasitism the parasite benefits and the host is harmed. Mutualism helps both; commensalism helps one and does not affect the other.",
      "One wins, one loses."),

    mc("Which of the following is true about viruses?",
      ["They are protists", "They all have biradial symmetry", "They are non-living", "They are members of the Eubacteria"], "They are non-living",
      "Viruses cannot reproduce or carry out metabolism on their own, so they are generally treated as non-living particles. They are not protists or bacteria.",
      "They need a host cell to reproduce."),

    mc("Gymnosperms are plants that",
      ["Bear cones", "Have needle-like leaves", "Both bear cones and have needle-like leaves", "None of the above"],
      "Both bear cones and have needle-like leaves",
      "Conifers such as pines are gymnosperms: they have naked seeds in cones and typically needle-like leaves.",
      "Think pine trees."),

    mc("During glycolysis, the energy is produced in the form of",
      ["4 ATP and 4 pyruvates", "2 ATP and 2 pyruvates", "2 ATP and 4 pyruvates", "4 ATP and 2 pyruvates"], "2 ATP and 2 pyruvates",
      "One glucose is split into 2 pyruvates. 4 ATP are made but 2 are spent to start the process, for a net gain of 2 ATP.",
      "Count the NET ATP."),

    mc("Consider the human chromosome number of 23 pairs (2N = 46). How many chromosomes are present in the cell during telophase of mitosis?",
      ["23", "46", "48", "92"], "92",
      "After anaphase the sister chromatids have separated into 92 individual chromosomes. Each daughter nucleus gets 46 once the cell divides.",
      "Sister chromatids have just separated."),

    mc("After the second meiotic division, how many chromosomes are present in each of the daughter cells?",
      ["2n, 46", "N, 46", "N, 23", "2n, 23"], "N, 23",
      "Meiosis produces four haploid (N) cells, each with 23 chromosomes.",
      "Meiosis halves the number."),

    mc("According to theory, what was Antonie van Leeuwenhoek observing under the microscope?",
      ["A broth", "A cork", "A decaying meat", "Blood"], "Blood",
      "Leeuwenhoek was the first to describe red blood cells, as well as microbes and sperm. Hooke looked at cork; Redi used decaying meat.",
      "Not cork (that was Hooke)."),

    mc("Dinoflagellates move using a structure called",
      ["Pseudopod", "Flagella", "Cilia", "Feet"], "Flagella",
      "The name says it: dinoflagellates are propelled by two flagella.",
      "Look at the word."),

    mc("Water is considered a(n)",
      ["Element", "Compound", "Mixture", "Solution"], "Compound",
      "Water (H₂O) is two elements chemically bonded in a fixed ratio.",
      "Hydrogen + oxygen, chemically combined."),

    mc("What process takes place when steel gains rust?",
      ["Neutralization", "Reduction", "Saponification", "Oxidation"], "Oxidation",
      "Iron loses electrons to oxygen and forms iron oxide (rust).",
      "Reaction with oxygen."),

    mc("What is the molecular formula of a compound with empirical formula CH and molecular mass 78?",
      ["C6H6", "C3H3", "C4H4", "C5H5"], "C6H6",
      "CH has mass 13. 78 / 13 = 6, so the molecular formula is C₆H₆ (benzene).",
      "Divide 78 by the mass of CH."),

    mc("What is the trend in electronegativity from left to right and from top to bottom of the periodic table?",
      ["Both increasing", "Both decreasing", "Decreasing, increasing", "Increasing, decreasing"], "Increasing, decreasing",
      "Electronegativity rises across a period (left to right) and falls down a group (top to bottom). Fluorine is the most electronegative.",
      "Fluorine is top right."),

    mc("Which of the following is true about ions?",
      ["Anions generally have larger particles", "Cations have generally larger particles", "The sizes of cations and anions are the same", "There are neutral ions"], "Anions generally have larger particles",
      "Gaining electrons increases repulsion, so an anion is larger than its atom. Losing electrons shrinks a cation.",
      "Extra electrons make it puffier."),

    mc("What is the volume of 1 mole of an ideal gas at 273 K and 1 atm pressure?",
      ["273.1 L", "31.32 L", "22.41 L", "17.42 L"], "22.41 L",
      "At standard temperature and pressure, one mole of ideal gas occupies about 22.4 L.",
      "Molar volume at STP."),

    mc("The carbon-14 isotope has",
      ["6 protons, 8 neutrons, and 8 electrons", "6 protons, 8 neutrons, and 6 electrons", "6 protons, 6 neutrons, and 8 electrons", "8 protons, 6 neutrons, and 6 electrons"], "6 protons, 8 neutrons, and 6 electrons",
      "Carbon has atomic number 6 (6 protons, 6 electrons when neutral). Mass number 14 - 6 protons = 8 neutrons.",
      "Neutrons = mass number - protons."),

    mc("Which of the following is the correct name for the compound K₂SO₄?",
      ["Potassium sulfate", "Potassium sulfite", "Dipotassium sulfate", "Dipotassium sulfite"], "Potassium sulfate",
      "SO₄²⁻ is sulfate (SO₃²⁻ is sulfite). Ionic compounds do not use prefixes like di-.",
      "Four oxygens = -ate."),

    mc("Which of the following are products of a fermentation reaction?",
      ["Soap and glycerol", "Alcohol and CO₂", "Ester and water", "Salt and water"], "Alcohol and CO₂",
      "Yeast fermentation turns sugar into ethanol and carbon dioxide.",
      "Think bread and beer."),

    mc("In the reaction Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), which is the reducing agent?",
      ["Zn(s)", "Cu(s)", "Cu²⁺(aq)", "Zn²⁺(aq)"], "Zn(s)",
      "Zinc loses electrons (it is oxidized), so it reduces Cu²⁺. The reducing agent is the substance that is oxidized.",
      "Who loses the electrons?"),

    mc("Which of the following describes the phenomenon observed when white light passes through a prism?",
      ["Diffusion and diffraction", "Reflection and interference", "Refraction and dispersion", "Reflection and diffusion"], "Refraction and dispersion",
      "The light bends (refracts) as it enters the glass, and each colour bends by a different amount, spreading out (dispersion).",
      "Bending, then spreading."),

    mc("An object at rest begins to accelerate at 5 m/s² for 10 seconds. What is its initial velocity?",
      ["50 m/s", "5 m/s", "0 m/s", "10 m/s"], "0 m/s",
      "It starts from rest, so the initial velocity is 0 m/s. (After 10 s it would reach 50 m/s.)",
      "'At rest' tells you the answer."),

    mc("A 0.03 kg bullet is fired from a rifle with a force of 240 N. If the force acts on the bullet for 0.1 s, what is the maximum speed attained?",
      ["72 m/s", "800 m/s", "720 m/s", "400 m/s"], "800 m/s",
      "Impulse = Ft = 240 × 0.1 = 24 N·s = mv, so v = 24 / 0.03 = 800 m/s.",
      "Impulse equals change in momentum."),

    mc("The acceleration of an object moving on a circular path is directed ____ the center.",
      ["Toward", "Perpendicular to", "Away from", "Tangential to"], "Toward",
      "Centripetal acceleration points toward the center of the circle.",
      "Centripetal means 'center-seeking'.")
  ]
});
