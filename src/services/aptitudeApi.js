const CATEGORIES = {
  "Quantitative Aptitude": {
    icon: "🧮",
    color: "#f687b3",
    bg: "#1a0014",
    desc: "Numbers & Calculations",
    questions: [
      { id: 1, question: "A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?", options: ["65 sec", "89 sec", "100 sec", "79 sec"], correct: 1, difficulty: "medium", explanation: "Speed = 240/24 = 10 m/s. Time = (240+650)/10 = 89 sec." },
      { id: 2, question: "If the cost price is 80% of the selling price, what is the profit percent?", options: ["20%", "25%", "16.67%", "15%"], correct: 1, difficulty: "easy", explanation: "Let SP = 100, CP = 80. Profit% = (20/80)×100 = 25%." },
      { id: 3, question: "The average of 5 consecutive odd numbers is 61. What is the largest number?", options: ["63", "65", "67", "69"], correct: 1, difficulty: "easy", explanation: "Numbers: 57, 59, 61, 63, 65. Largest = 65." },
      { id: 4, question: "A can do a piece of work in 10 days and B in 15 days. Together, how many days will they take?", options: ["5 days", "6 days", "7.5 days", "8 days"], correct: 1, difficulty: "medium", explanation: "Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Time = 6 days." },
      { id: 5, question: "If 2ˣ = 32, what is x?", options: ["4", "5", "6", "3"], correct: 1, difficulty: "easy", explanation: "2⁵ = 32, so x = 5." },
      { id: 6, question: "What is the compound interest on ₹10,000 at 10% per annum for 2 years?", options: ["₹2,000", "₹2,100", "₹2,200", "₹1,900"], correct: 1, difficulty: "hard", explanation: "CI = 10000(1.1²) - 10000 = 12100 - 10000 = ₹2,100." },
      { id: 7, question: "The ratio of ages of A and B is 4:3. After 6 years the ratio becomes 26:21. What is A's present age?", options: ["32", "36", "40", "48"], correct: 2, difficulty: "hard", explanation: "Let ages be 4x, 3x. (4x+6)/(3x+6) = 26/21. x=10. A = 40." },
    ],
  },
  "Logical Reasoning": {
    icon: "🧩",
    color: "#b794f4",
    bg: "#0e0018",
    desc: "Patterns & Logic",
    questions: [
      { id: 1, question: "What comes next in the series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "38"], correct: 1, difficulty: "medium", explanation: "Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42." },
      { id: 2, question: "If FRIEND is coded as HUMGPF, how is CANDLE coded?", options: ["ECRFNG", "ECPFHG", "EERPFG", "DCQGOH"], correct: 0, difficulty: "medium", explanation: "Each letter shifts +2. C→E, A→C, N→R... Wait: +2 shift: ECRFNG." },
      { id: 3, question: "All roses are flowers. Some flowers fade quickly. Which statement is true?", options: ["All roses fade quickly", "Some roses may fade quickly", "No roses fade quickly", "All flowers are roses"], correct: 1, difficulty: "easy", explanation: "Since only 'some flowers' fade quickly, some roses may or may not." },
      { id: 4, question: "Find the odd one out: 3, 5, 11, 14, 17, 21", options: ["14", "21", "3", "11"], correct: 0, difficulty: "easy", explanation: "14 is the only even number. All others are odd." },
      { id: 5, question: "A man walks 5 km north, turns right and walks 3 km, turns right again and walks 5 km. How far is he from the start?", options: ["3 km", "5 km", "8 km", "0 km"], correct: 0, difficulty: "medium", explanation: "He ends up 3 km east of the starting point." },
      { id: 6, question: "If P is the brother of Q, Q is the sister of R, R is the father of S, how is P related to S?", options: ["Uncle", "Father", "Grandfather", "Brother"], correct: 0, difficulty: "hard", explanation: "P is brother of Q, Q is sister of R, R is father of S. P is uncle of S." },
      { id: 7, question: "In a row of 40 children, M is 13th from the left. N is 18th from the right. How many children are between them?", options: ["9", "10", "11", "8"], correct: 1, difficulty: "hard", explanation: "N's position from left = 40 - 18 + 1 = 23. Between 13 and 23 = 23 - 13 - 1 = 9... Actually 23-13-1=9. Let me recalculate: positions 14..22 = 9 children." },
    ],
  },
  "Verbal Ability": {
    icon: "📝",
    color: "#63b3ed",
    bg: "#001422",
    desc: "Language & Comprehension",
    questions: [
      { id: 1, question: "Choose the synonym of 'Benevolent':", options: ["Malicious", "Kind", "Hostile", "Indifferent"], correct: 1, difficulty: "easy", explanation: "Benevolent means kind and generous." },
      { id: 2, question: "Choose the antonym of 'Ephemeral':", options: ["Temporary", "Permanent", "Fleeting", "Brief"], correct: 1, difficulty: "easy", explanation: "Ephemeral means short-lived; its antonym is permanent." },
      { id: 3, question: "Fill in the blank: 'He _____ to the store before it closed.'", options: ["go", "went", "gone", "going"], correct: 1, difficulty: "easy", explanation: "Past tense of 'go' is 'went'." },
      { id: 4, question: "Identify the correctly spelled word:", options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], correct: 1, difficulty: "medium", explanation: "Accommodate has double 'c' and double 'm'." },
      { id: 5, question: "What does the idiom 'Break the ice' mean?", options: ["Destroy something", "Start a conversation", "Cool down", "Freeze water"], correct: 1, difficulty: "medium", explanation: "It means to initiate social interaction." },
      { id: 6, question: "'Neither the teacher nor the students _____ present.' Fill the blank:", options: ["was", "were", "is", "has been"], correct: 1, difficulty: "hard", explanation: "With 'neither...nor', verb agrees with the nearest subject (students = plural → were)." },
      { id: 7, question: "Which sentence is grammatically correct?", options: ["Him and I went to the park.", "He and I went to the park.", "Me and him went to the park.", "Him and me went to the park."], correct: 1, difficulty: "medium", explanation: "Subject pronouns (he, I) are used as subjects of the sentence." },
    ],
  },
  "Data Interpretation": {
    icon: "📊",
    color: "#48bb78",
    bg: "#001a0e",
    desc: "Charts & Analysis",
    questions: [
      { id: 1, question: "If a company's revenue was ₹50L in Q1 and ₹65L in Q2, what is the growth rate?", options: ["25%", "30%", "15%", "20%"], correct: 1, difficulty: "medium", explanation: "Growth = (65-50)/50 × 100 = 30%." },
      { id: 2, question: "In a pie chart, if 'Food' takes 90°, what percentage does it represent?", options: ["20%", "25%", "30%", "15%"], correct: 1, difficulty: "easy", explanation: "90/360 × 100 = 25%." },
      { id: 3, question: "If average marks of 30 students is 45 and 20 students is 55, what is the combined average?", options: ["48", "49", "50", "51"], correct: 1, difficulty: "medium", explanation: "Total = 30×45 + 20×55 = 1350+1100 = 2450. Avg = 2450/50 = 49." },
      { id: 4, question: "A bar graph shows sales of 100, 150, 200, 250, 300 units over 5 months. What is the average monthly growth?", options: ["40 units", "50 units", "60 units", "45 units"], correct: 1, difficulty: "easy", explanation: "Growth each month = 50. Average = 50 units." },
      { id: 5, question: "If 40% of total expenditure is on rent and rent is ₹24,000, what is the total expenditure?", options: ["₹48,000", "₹60,000", "₹72,000", "₹96,000"], correct: 1, difficulty: "medium", explanation: "40% of X = 24000, so X = 24000/0.4 = ₹60,000." },
      { id: 6, question: "A company's profit went from ₹2L to ₹2.5L to ₹3.5L. The CAGR over 2 years is closest to:", options: ["25%", "32%", "30%", "28%"], correct: 1, difficulty: "hard", explanation: "CAGR = (3.5/2)^(1/2) - 1 ≈ 32%." },
      { id: 7, question: "If in a table, exports exceed imports by 20% and imports are ₹500Cr, what are the exports?", options: ["₹550Cr", "₹600Cr", "₹650Cr", "₹700Cr"], correct: 1, difficulty: "medium", explanation: "Exports = 500 × 1.2 = ₹600 Cr." },
    ],
  },
  "Abstract Reasoning": {
    icon: "🔮",
    color: "#f6ad55",
    bg: "#1a1000",
    desc: "Spatial & Visual",
    questions: [
      { id: 1, question: "If a clock shows 3:15, what is the angle between the hour and minute hands?", options: ["0°", "7.5°", "15°", "22.5°"], correct: 1, difficulty: "medium", explanation: "At 3:15, minute hand at 90°, hour hand at 90+7.5=97.5°. Angle = 7.5°." },
      { id: 2, question: "How many squares are on a standard 8×8 chessboard?", options: ["64", "200", "204", "256"], correct: 2, difficulty: "hard", explanation: "Sum of squares: 1²+2²+...+8² = 204." },
      { id: 3, question: "Which shape completes the pattern: Circle, Triangle, Square, Circle, Triangle, ?", options: ["Circle", "Triangle", "Square", "Pentagon"], correct: 2, difficulty: "easy", explanation: "The pattern repeats: Circle, Triangle, Square." },
      { id: 4, question: "A cube is painted red on all faces and cut into 27 smaller cubes. How many have exactly 2 faces painted?", options: ["8", "12", "6", "1"], correct: 1, difficulty: "hard", explanation: "Edge cubes (not corners) = 12 edges × 1 each = 12." },
      { id: 5, question: "If you fold a paper in half 3 times and cut a hole, how many holes when unfolded?", options: ["4", "6", "8", "3"], correct: 2, difficulty: "medium", explanation: "Each fold doubles. 3 folds = 2³ = 8 holes." },
      { id: 6, question: "What is the minimum number of colors needed to color a map so no adjacent regions share a color?", options: ["2", "3", "4", "5"], correct: 2, difficulty: "medium", explanation: "The four-color theorem states 4 colors suffice for any planar map." },
      { id: 7, question: "A mirror image of 'AMBULANCE' written forward would appear as:", options: ["ECNALUBMA", "Reversed and mirrored", "AMBULANCE (reversed)", "Cannot determine"], correct: 0, difficulty: "easy", explanation: "Mirror reverses text: AMBULANCE → ECNALUBMA." },
    ],
  },
  "Critical Thinking": {
    icon: "💡",
    color: "#fc8181",
    bg: "#1a0505",
    desc: "Analysis & Decisions",
    questions: [
      { id: 1, question: "Which is a valid conclusion? 'All managers are leaders. Some leaders are visionaries.'", options: ["All managers are visionaries", "Some managers may be visionaries", "No managers are visionaries", "All visionaries are managers"], correct: 1, difficulty: "medium", explanation: "Since only 'some' leaders are visionaries and all managers are leaders, some managers may be visionaries." },
      { id: 2, question: "Identify the assumption: 'We should hire more engineers because the product needs improvement.'", options: ["Engineers can improve the product", "The product is perfect", "We have too many engineers", "Hiring is impossible"], correct: 0, difficulty: "easy", explanation: "The assumption is that hiring engineers will lead to product improvement." },
      { id: 3, question: "A study found that ice cream sales and drowning incidents increase together. What is the most likely explanation?", options: ["Ice cream causes drowning", "Drowning causes ice cream sales", "Both are caused by hot weather", "There is no relationship"], correct: 2, difficulty: "medium", explanation: "Correlation ≠ causation. Hot weather (confounding variable) causes both." },
      { id: 4, question: "If 'no politician is honest' and 'some honest people are kind', which MUST be true?", options: ["Some politicians are kind", "No politician is kind", "Some kind people are not politicians", "All kind people are politicians"], correct: 2, difficulty: "hard", explanation: "Honest people who are kind cannot be politicians, so some kind people are not politicians." },
      { id: 5, question: "What is a 'straw man' fallacy?", options: ["Attacking a weakened version of an argument", "Using personal attacks", "Appealing to authority", "Circular reasoning"], correct: 0, difficulty: "easy", explanation: "A straw man misrepresents someone's argument to make it easier to attack." },
      { id: 6, question: "A company has 80% customer satisfaction. If they survey 50 more and 40 are satisfied, what's the new rate assuming 1000 original surveys?", options: ["80%", "80.95%", "79.05%", "81.5%"], correct: 1, difficulty: "hard", explanation: "Original: 800/1000 satisfied. New: (800+40)/(1000+50) = 840/1050 ≈ 80%." },
      { id: 7, question: "Which is an example of confirmation bias?", options: ["Seeking evidence that supports your belief", "Changing your mind with new data", "Testing a hypothesis objectively", "Randomly selecting data"], correct: 0, difficulty: "easy", explanation: "Confirmation bias is the tendency to search for info that confirms existing beliefs." },
    ],
  },
};


export async function fetchCategories() {
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));
  return Object.entries(CATEGORIES).map(([name, data]) => ({
    name,
    icon: data.icon,
    color: data.color,
    bg: data.bg,
    desc: data.desc,
    questionCount: data.questions.length,
  }));
}


export async function fetchQuestions(categoryName) {
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));
  const cat = CATEGORIES[categoryName];
  if (!cat) throw new Error(`Category "${categoryName}" not found`);

  return cat.questions.map(({ correct, explanation, ...q }) => q);
}


export async function submitAnswers(categoryName, answers) {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));
  const cat = CATEGORIES[categoryName];
  if (!cat) throw new Error(`Category "${categoryName}" not found`);

  const results = cat.questions.map((q, idx) => ({
    questionId: q.id,
    question: q.question,
    options: q.options,
    userAnswer: answers[idx] ?? -1,
    correctAnswer: q.correct,
    isCorrect: answers[idx] === q.correct,
    difficulty: q.difficulty,
    explanation: q.explanation,
  }));

  const score = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const percentage = Math.round((score / total) * 100);

  const difficultyBreakdown = {
    easy: { total: 0, correct: 0 },
    medium: { total: 0, correct: 0 },
    hard: { total: 0, correct: 0 },
  };
  results.forEach((r) => {
    difficultyBreakdown[r.difficulty].total++;
    if (r.isCorrect) difficultyBreakdown[r.difficulty].correct++;
  });

  return {
    score,
    total,
    percentage,
    results,
    difficultyBreakdown,
    timeTaken: null,
    grade:
      percentage >= 85
        ? "Outstanding"
        : percentage >= 70
        ? "Excellent"
        : percentage >= 55
        ? "Good Effort"
        : percentage >= 40
        ? "Keep Practicing"
        : "Needs Improvement",
    gradeIcon:
      percentage >= 85
        ? "🏆"
        : percentage >= 70
        ? "🎉"
        : percentage >= 55
        ? "👍"
        : percentage >= 40
        ? "📚"
        : "💪",
  };
}
