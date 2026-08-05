import type { AuthoredTest, TrackContent } from './types';

const courses: TrackContent['courses'] = [
  {
    title: 'The SAT: format and scoring overview',
    order: 0,
    sections: [
      {
        heading: 'Four sections, on paper',
        content:
          "This is the classic (paper-based) SAT format: a Reading Test, a Writing and Language Test, a Math Test without a calculator, and a Math Test with a calculator, taken in that order with short breaks between them. Reading runs 65 minutes for 52 questions across five passages; Writing and Language runs 35 minutes for 44 questions across four passages; Math No-Calculator runs 25 minutes for 20 questions; Math Calculator runs 55 minutes for 38 questions. Total testing time is about 3 hours (plus an optional Essay some schools still require). Our practice tests use two passages per section instead of four or five, and fewer questions per passage, to keep each mock test to a manageable length while preserving the real exam's pacing (minutes per question) and question style.",
      },
      {
        heading: 'Two combined scores, not four',
        content:
          "Unlike a simple average of four sections, the SAT reports exactly two section scores: Evidence-Based Reading and Writing (ERW), which combines your Reading Test and Writing and Language Test performance into a single 200-800 score, and Math, which combines both Math Tests (No-Calculator and Calculator) into a single 200-800 score. These two add up to your composite score, from 400 to 1600. This is why you'll see your Reading and Writing & Language sections reported together as one score in your results, rather than each getting its own 800-point scale.",
      },
      {
        heading: 'No adaptivity — every question is fixed',
        content:
          "Unlike the newer Digital SAT, the classic paper SAT is not adaptive: every student taking a given form answers the same fixed set of questions in the same order, regardless of how earlier questions went. This means pacing is entirely under your control from the start — there's no benefit to being extra cautious early on, since question difficulty doesn't respond to your performance.",
      },
      {
        heading: 'The calculator rule is a real constraint',
        content:
          "The No-Calculator Math section is deliberately designed so that every question is faster to solve by hand or with simple reasoning than by reaching for a calculator — it tests fluency with arithmetic, algebra, and basic function manipulation. Practicing mental math and clean algebraic steps for this section specifically (rather than assuming you'll always have a calculator) is one of the highest-leverage things you can do to prepare.",
      },
    ],
  },
  {
    title: 'Reading section strategy',
    order: 1,
    sections: [
      {
        heading: 'One passage, ten-ish questions',
        content:
          "Each Reading passage (400-750 words, sometimes a pair of shorter related passages) is followed by a batch of questions covering the whole text — unlike quick-hit format questions, you need to hold the passage's overall argument or narrative arc in mind while answering. Passages are drawn from literature (a novel or short story excerpt), history/social studies, and science.",
      },
      {
        heading: 'Read for structure first',
        content:
          "Before diving into the questions, spend 3-4 minutes reading the passage with an eye for structure: what is the author's main claim or the narrative's central tension, and how does each paragraph build on the last? You don't need to remember every detail — you need a mental map you can return to when a question asks about a specific part.",
      },
      {
        heading: 'Command of evidence questions',
        content:
          "A distinctive SAT Reading question type asks you to justify your previous answer by citing the specific lines that support it — these two questions are always paired. If you're unsure of the first answer, look ahead at the four line-citation options for the second question: often, only one citation actually supports one of the answer choices from the first question, which can help you reverse-engineer the correct pair.",
      },
      {
        heading: 'Literary passages need tone awareness',
        content:
          "For the literature passage specifically, pay close attention to tone and characters' unstated motivations — SAT literary questions frequently ask what a character's word choice or action reveals about their state of mind, which is rarely stated outright. Track shifts in mood across the passage; these shifts are a favorite target for questions.",
      },
    ],
  },
  {
    title: 'Writing and Language section strategy',
    order: 2,
    sections: [
      {
        heading: 'Grammar and rhetoric, in context',
        content:
          "Writing and Language passages are shorter (400-450 words) and less about comprehension than about editing: each question points to a specific phrase or sentence and asks you to choose the best revision, or asks whether a sentence should be added, removed, or moved. About half the questions test grammar rules (agreement, punctuation, sentence structure) and half test rhetoric — clarity, concision, and how well a sentence fits its surrounding context.",
      },
      {
        heading: '\"Shortest answer that is correct and clear\" as a default',
        content:
          "When a Writing and Language question offers multiple grammatically correct options, the most concise one that preserves the sentence's meaning is very often the right answer — the SAT consistently penalizes needless wordiness and redundancy. Use this as a tiebreaker whenever two choices both seem grammatically fine.",
      },
      {
        heading: 'Read past the underlined portion',
        content:
          "A common mistake is judging a revision only against the sentence it's in, without checking the sentence before and after. Questions about transitions, sentence placement, or whether a claim is supported almost always require reading at least one sentence beyond the one being tested — the correct choice depends on the surrounding paragraph, not just local grammar.",
      },
    ],
  },
  {
    title: 'Math strategy: No-Calculator and Calculator sections',
    order: 3,
    sections: [
      {
        heading: 'Two sections, one skillset with different constraints',
        content:
          "Both Math sections draw from the same content areas — Heart of Algebra (linear equations and systems), Passport to Advanced Math (quadratics and nonlinear functions), Problem Solving and Data Analysis (ratios, percentages, statistics), and Additional Topics (geometry, trigonometry, complex numbers). The No-Calculator section leans more heavily on Algebra and clean symbolic manipulation; the Calculator section includes more of the data-analysis and multi-step word problems where a calculator genuinely saves time.",
      },
      {
        heading: 'For No-Calculator: simplify before you compute',
        content:
          "Since you can't lean on a calculator, look for ways to simplify an expression algebraically before plugging in numbers — factor, cancel common terms, or substitute a simpler equivalent expression. Many No-Calculator questions look intimidating at first glance specifically because they're designed to be solved by recognizing a shortcut, not by brute-force arithmetic.",
      },
      {
        heading: 'For Calculator: don\'t let it slow you down',
        content:
          "Having a calculator available doesn't mean every question benefits from one — for straightforward algebra, working it out by hand is often faster than typing it in. Reserve the calculator for genuinely calculator-favored moments: awkward arithmetic, checking a graph, or working through a multi-step data table.",
      },
    ],
  },
];

const test1: AuthoredTest = {
  title: 'SAT Practice Test 1',
  order: 0,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 25 * 60,
      instructions: 'Each passage is followed by several questions. Read the whole passage before answering.',
      questions: [
        {
          id: 'sat1-r-1', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Marguerite had been waiting on the platform for nearly an hour when she finally allowed herself to admit that she no longer cared whether the train came at all. It was not resignation exactly — more a strange, unfamiliar lightness, as though some ballast she hadn't known she was carrying had quietly slipped free. She had boarded trains her entire adult life the way other people breathed: without thought, without question, simply because the schedule said to. Tonight, for the first time she could remember, she found herself wondering what would happen if she simply walked home instead, through streets she hadn't seen on foot in a decade. The thought startled her with its ordinariness. It was not a grand rebellion, not a decision that would reshape her life. It was only a small, private refusal, and yet it felt, standing there in the gathering dark, like the first genuinely free choice she had made in longer than she cared to admit. When the train finally pulled in, doors sighing open under the platform lights, she let it wait a full thirty seconds before stepping aboard — not from indecision, but because she wanted, just once, to feel the choice as a choice, rather than a reflex.",
          prompt: 'The main effect of the passage is to convey',
          options: ['A woman\'s anger at a delayed train', 'A quiet realization about the difference between routine and genuine choice', 'A detailed description of a train station', 'An argument for walking instead of taking trains'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-2', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Marguerite had been waiting on the platform for nearly an hour when she finally allowed herself to admit that she no longer cared whether the train came at all. It was not resignation exactly — more a strange, unfamiliar lightness, as though some ballast she hadn't known she was carrying had quietly slipped free. She had boarded trains her entire adult life the way other people breathed: without thought, without question, simply because the schedule said to. Tonight, for the first time she could remember, she found herself wondering what would happen if she simply walked home instead, through streets she hadn't seen on foot in a decade. The thought startled her with its ordinariness. It was not a grand rebellion, not a decision that would reshape her life. It was only a small, private refusal, and yet it felt, standing there in the gathering dark, like the first genuinely free choice she had made in longer than she cared to admit. When the train finally pulled in, doors sighing open under the platform lights, she let it wait a full thirty seconds before stepping aboard — not from indecision, but because she wanted, just once, to feel the choice as a choice, rather than a reflex.",
          prompt: 'As used in the passage, "ballast" most nearly refers to',
          options: ['A physical object she was carrying', 'An unrecognized emotional weight', 'A type of train equipment', 'A financial burden'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-3', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Marguerite had been waiting on the platform for nearly an hour when she finally allowed herself to admit that she no longer cared whether the train came at all. It was not resignation exactly — more a strange, unfamiliar lightness, as though some ballast she hadn't known she was carrying had quietly slipped free. She had boarded trains her entire adult life the way other people breathed: without thought, without question, simply because the schedule said to. Tonight, for the first time she could remember, she found herself wondering what would happen if she simply walked home instead, through streets she hadn't seen on foot in a decade. The thought startled her with its ordinariness. It was not a grand rebellion, not a decision that would reshape her life. It was only a small, private refusal, and yet it felt, standing there in the gathering dark, like the first genuinely free choice she had made in longer than she cared to admit. When the train finally pulled in, doors sighing open under the platform lights, she let it wait a full thirty seconds before stepping aboard — not from indecision, but because she wanted, just once, to feel the choice as a choice, rather than a reflex.",
          prompt: 'Why does Marguerite let the train wait thirty seconds before boarding?',
          options: ['She is unsure which train to take', 'She wants to experience boarding as a deliberate choice rather than a habit', 'She is waiting for a friend', 'The doors have not fully opened yet'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-4', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Marguerite had been waiting on the platform for nearly an hour when she finally allowed herself to admit that she no longer cared whether the train came at all. It was not resignation exactly — more a strange, unfamiliar lightness, as though some ballast she hadn't known she was carrying had quietly slipped free. She had boarded trains her entire adult life the way other people breathed: without thought, without question, simply because the schedule said to. Tonight, for the first time she could remember, she found herself wondering what would happen if she simply walked home instead, through streets she hadn't seen on foot in a decade. The thought startled her with its ordinariness. It was not a grand rebellion, not a decision that would reshape her life. It was only a small, private refusal, and yet it felt, standing there in the gathering dark, like the first genuinely free choice she had made in longer than she cared to admit. When the train finally pulled in, doors sighing open under the platform lights, she let it wait a full thirty seconds before stepping aboard — not from indecision, but because she wanted, just once, to feel the choice as a choice, rather than a reflex.",
          prompt: 'The comparison "the way other people breathed" is used to emphasize that Marguerite\'s train-taking was',
          options: ['Difficult and effortful', 'Automatic and unthinking', 'Recently learned', 'A source of great joy'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-5', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Marguerite had been waiting on the platform for nearly an hour when she finally allowed herself to admit that she no longer cared whether the train came at all. It was not resignation exactly — more a strange, unfamiliar lightness, as though some ballast she hadn't known she was carrying had quietly slipped free. She had boarded trains her entire adult life the way other people breathed: without thought, without question, simply because the schedule said to. Tonight, for the first time she could remember, she found herself wondering what would happen if she simply walked home instead, through streets she hadn't seen on foot in a decade. The thought startled her with its ordinariness. It was not a grand rebellion, not a decision that would reshape her life. It was only a small, private refusal, and yet it felt, standing there in the gathering dark, like the first genuinely free choice she had made in longer than she cared to admit. When the train finally pulled in, doors sighing open under the platform lights, she let it wait a full thirty seconds before stepping aboard — not from indecision, but because she wanted, just once, to feel the choice as a choice, rather than a reflex.",
          prompt: 'It can reasonably be inferred that before this evening, Marguerite',
          options: ['Had never ridden a train before', 'Rarely questioned the routines that structured her life', 'Disliked her job', 'Lived far from the train station'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-6', type: 'mcq',
          passage:
            "Urban heat islands — the tendency of cities to run several degrees warmer than surrounding rural areas — arise largely from a simple substitution: vegetation and soil, which absorb solar energy and release it slowly through evaporation, are replaced by asphalt and concrete, which absorb the same energy and radiate it back as heat far more quickly. The effect compounds after dark. Rural areas cool rapidly once the sun sets, as the ground releases its stored heat into a clear night sky, but dense urban cores, walled in by buildings that block that radiative cooling and warmed further by waste heat from vehicles and air conditioning, can remain five to ten degrees warmer than nearby countryside well into the night. Municipal planners have begun experimenting with countermeasures: reflective \"cool roof\" coatings that bounce sunlight back into the atmosphere rather than absorbing it, and expanded tree canopy, which restores some of the evaporative cooling lost when vegetation was paved over. Early results from pilot programs in several cities suggest that widespread cool-roof adoption alone can lower peak summer temperatures in treated neighborhoods by one to two degrees — a modest-sounding number that nonetheless meaningfully reduces heat-related illness during extreme heat events.",
          prompt: 'According to the passage, what mainly causes the urban heat island effect?',
          options: ['Increased vehicle traffic alone', 'The replacement of vegetation and soil with heat-absorbing surfaces like asphalt', 'Higher rainfall in cities', 'Taller buildings blocking wind'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-7', type: 'mcq',
          passage:
            "Urban heat islands — the tendency of cities to run several degrees warmer than surrounding rural areas — arise largely from a simple substitution: vegetation and soil, which absorb solar energy and release it slowly through evaporation, are replaced by asphalt and concrete, which absorb the same energy and radiate it back as heat far more quickly. The effect compounds after dark. Rural areas cool rapidly once the sun sets, as the ground releases its stored heat into a clear night sky, but dense urban cores, walled in by buildings that block that radiative cooling and warmed further by waste heat from vehicles and air conditioning, can remain five to ten degrees warmer than nearby countryside well into the night. Municipal planners have begun experimenting with countermeasures: reflective \"cool roof\" coatings that bounce sunlight back into the atmosphere rather than absorbing it, and expanded tree canopy, which restores some of the evaporative cooling lost when vegetation was paved over. Early results from pilot programs in several cities suggest that widespread cool-roof adoption alone can lower peak summer temperatures in treated neighborhoods by one to two degrees — a modest-sounding number that nonetheless meaningfully reduces heat-related illness during extreme heat events.",
          prompt: 'Why do cities stay warmer than rural areas specifically after dark, according to the passage?',
          options: ['Cities receive more sunlight at night', 'Buildings block radiative cooling and add waste heat from vehicles and air conditioning', 'Rural areas have more asphalt', 'Cities have less vegetation during the day only'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-8', type: 'mcq',
          passage:
            "Urban heat islands — the tendency of cities to run several degrees warmer than surrounding rural areas — arise largely from a simple substitution: vegetation and soil, which absorb solar energy and release it slowly through evaporation, are replaced by asphalt and concrete, which absorb the same energy and radiate it back as heat far more quickly. The effect compounds after dark. Rural areas cool rapidly once the sun sets, as the ground releases its stored heat into a clear night sky, but dense urban cores, walled in by buildings that block that radiative cooling and warmed further by waste heat from vehicles and air conditioning, can remain five to ten degrees warmer than nearby countryside well into the night. Municipal planners have begun experimenting with countermeasures: reflective \"cool roof\" coatings that bounce sunlight back into the atmosphere rather than absorbing it, and expanded tree canopy, which restores some of the evaporative cooling lost when vegetation was paved over. Early results from pilot programs in several cities suggest that widespread cool-roof adoption alone can lower peak summer temperatures in treated neighborhoods by one to two degrees — a modest-sounding number that nonetheless meaningfully reduces heat-related illness during extreme heat events.",
          prompt: 'As used in the passage, "compounds" most nearly means',
          options: ['Mixes chemically', 'Intensifies further', 'Is measured', 'Disappears'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-9', type: 'mcq',
          passage:
            "Urban heat islands — the tendency of cities to run several degrees warmer than surrounding rural areas — arise largely from a simple substitution: vegetation and soil, which absorb solar energy and release it slowly through evaporation, are replaced by asphalt and concrete, which absorb the same energy and radiate it back as heat far more quickly. The effect compounds after dark. Rural areas cool rapidly once the sun sets, as the ground releases its stored heat into a clear night sky, but dense urban cores, walled in by buildings that block that radiative cooling and warmed further by waste heat from vehicles and air conditioning, can remain five to ten degrees warmer than nearby countryside well into the night. Municipal planners have begun experimenting with countermeasures: reflective \"cool roof\" coatings that bounce sunlight back into the atmosphere rather than absorbing it, and expanded tree canopy, which restores some of the evaporative cooling lost when vegetation was paved over. Early results from pilot programs in several cities suggest that widespread cool-roof adoption alone can lower peak summer temperatures in treated neighborhoods by one to two degrees — a modest-sounding number that nonetheless meaningfully reduces heat-related illness during extreme heat events.",
          prompt: 'What does the passage suggest about the significance of a one-to-two-degree reduction from cool roofs?',
          options: ['It is too small to matter at all', 'It is modest in size but still meaningfully reduces heat-related illness', 'It completely eliminates the urban heat island effect', 'It only works in rural areas'],
          correctIndex: 1,
        },
        {
          id: 'sat1-r-10', type: 'mcq',
          passage:
            "Urban heat islands — the tendency of cities to run several degrees warmer than surrounding rural areas — arise largely from a simple substitution: vegetation and soil, which absorb solar energy and release it slowly through evaporation, are replaced by asphalt and concrete, which absorb the same energy and radiate it back as heat far more quickly. The effect compounds after dark. Rural areas cool rapidly once the sun sets, as the ground releases its stored heat into a clear night sky, but dense urban cores, walled in by buildings that block that radiative cooling and warmed further by waste heat from vehicles and air conditioning, can remain five to ten degrees warmer than nearby countryside well into the night. Municipal planners have begun experimenting with countermeasures: reflective \"cool roof\" coatings that bounce sunlight back into the atmosphere rather than absorbing it, and expanded tree canopy, which restores some of the evaporative cooling lost when vegetation was paved over. Early results from pilot programs in several cities suggest that widespread cool-roof adoption alone can lower peak summer temperatures in treated neighborhoods by one to two degrees — a modest-sounding number that nonetheless meaningfully reduces heat-related illness during extreme heat events.",
          prompt: 'What role does expanded tree canopy play, according to the passage?',
          options: ['It blocks radiative cooling further', 'It restores evaporative cooling lost when vegetation was paved over', 'It has no measurable effect', 'It replaces the need for cool roofs entirely'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing-language',
      title: 'Writing and Language',
      type: 'writing',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Each passage is followed by questions about specific phrases or sentences within it. Choose the most effective revision.',
      questions: [
        {
          id: 'sat1-wl-1', type: 'mcq',
          passage:
            "Community gardens have become a fixture in many mid-sized cities over the past decade. Originally conceived as a way to make use of vacant lots, they have grown into something more, they now serve as informal gathering spaces where neighbors who might otherwise never interact share tools, produce, and advice. A 2021 survey of garden participants found that nearly seventy percent reported knowing more of their neighbors by name since joining a garden plot. City officials, initially skeptical of the gardens' long-term value, have in recent years begun actively supporting them, offering reduced water rates and matching grants for tool sheds and fencing.",
          prompt: 'Which choice best corrects the underlined portion, "into something more, they now serve"?',
          options: ['into something more, they now serve', 'into something more: they now serve', 'into something more they now serve', 'into something more, now serving'],
          correctIndex: 1,
        },
        {
          id: 'sat1-wl-2', type: 'mcq',
          passage:
            "Community gardens have become a fixture in many mid-sized cities over the past decade. Originally conceived as a way to make use of vacant lots, they have grown into something more, they now serve as informal gathering spaces where neighbors who might otherwise never interact share tools, produce, and advice. A 2021 survey of garden participants found that nearly seventy percent reported knowing more of their neighbors by name since joining a garden plot. City officials, initially skeptical of the gardens' long-term value, have in recent years begun actively supporting them, offering reduced water rates and matching grants for tool sheds and fencing.",
          prompt: 'The writer wants to add a sentence emphasizing the gardens\' original, narrower purpose before it broadened. The best place for such a sentence is',
          options: ['Before the first sentence', 'Immediately after the first sentence', 'Immediately after the survey statistic', 'At the very end of the passage'],
          correctIndex: 1,
        },
        {
          id: 'sat1-wl-3', type: 'mcq',
          passage:
            "Community gardens have become a fixture in many mid-sized cities over the past decade. Originally conceived as a way to make use of vacant lots, they have grown into something more, they now serve as informal gathering spaces where neighbors who might otherwise never interact share tools, produce, and advice. A 2021 survey of garden participants found that nearly seventy percent reported knowing more of their neighbors by name since joining a garden plot. City officials, initially skeptical of the gardens' long-term value, have in recent years begun actively supporting them, offering reduced water rates and matching grants for tool sheds and fencing.",
          prompt: 'Which choice most effectively combines the sentence about the survey with the surrounding context, given the passage\'s focus?',
          options: [
            'The sentence should stay exactly as is.',
            'The survey statistic should be deleted, since it is irrelevant to the passage.',
            'The survey statistic should be moved to the very beginning of the passage.',
            'The word "nearly" should be removed for precision.',
          ],
          correctIndex: 0,
        },
        {
          id: 'sat1-wl-4', type: 'mcq',
          passage:
            "Community gardens have become a fixture in many mid-sized cities over the past decade. Originally conceived as a way to make use of vacant lots, they have grown into something more, they now serve as informal gathering spaces where neighbors who might otherwise never interact share tools, produce, and advice. A 2021 survey of garden participants found that nearly seventy percent reported knowing more of their neighbors by name since joining a garden plot. City officials, initially skeptical of the gardens' long-term value, have in recent years begun actively supporting them, offering reduced water rates and matching grants for tool sheds and fencing.",
          prompt: 'Which choice best replaces "initially skeptical of the gardens\' long-term value" while preserving the sentence\'s meaning most concisely?',
          options: ['initially skeptical of the gardens\' long-term value', 'who did not, at first, believe that the gardens would have much value over a long period of time', 'initially doubtful', 'skeptical, at least in the beginning, regarding the long-term value of the gardens'],
          correctIndex: 0,
        },
        {
          id: 'sat1-wl-5', type: 'mcq',
          passage:
            "Community gardens have become a fixture in many mid-sized cities over the past decade. Originally conceived as a way to make use of vacant lots, they have grown into something more, they now serve as informal gathering spaces where neighbors who might otherwise never interact share tools, produce, and advice. A 2021 survey of garden participants found that nearly seventy percent reported knowing more of their neighbors by name since joining a garden plot. City officials, initially skeptical of the gardens' long-term value, have in recent years begun actively supporting them, offering reduced water rates and matching grants for tool sheds and fencing.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To criticize city officials for being slow to act', 'To describe how community gardens evolved and gained institutional support', 'To argue that vacant lots should always become gardens', 'To compare gardens in different cities'],
          correctIndex: 1,
        },
        {
          id: 'sat1-wl-6', type: 'mcq',
          passage:
            "Freelance illustration work has changed considerably with the rise of online marketplaces. A decade ago, most freelance illustrators relied heavily on local networking, word-of-mouth referrals, and print portfolios mailed directly to art directors, today, a significant share of new client relationships begin instead through online platforms that connect illustrators directly with businesses worldwide. This shift has lowered barriers to entry for illustrators outside major art hubs, but it has also intensified competition, since a client in any city can now just as easily hire an illustrator on another continent. Rates on these platforms vary enormously, and experienced illustrators generally advise newcomers to research typical pricing carefully before accepting their first few contracts, several illustrators interviewed for this piece noted that undercutting established rates, even briefly, can be difficult to recover from once a client base expects lower prices.",
          prompt: 'Which choice best corrects the underlined portion, "print portfolios mailed directly to art directors, today"?',
          options: ['print portfolios mailed directly to art directors, today', 'print portfolios mailed directly to art directors; today', 'print portfolios mailed directly to art directors today', 'print portfolios, mailed directly to art directors, today'],
          correctIndex: 1,
        },
        {
          id: 'sat1-wl-7', type: 'mcq',
          passage:
            "Freelance illustration work has changed considerably with the rise of online marketplaces. A decade ago, most freelance illustrators relied heavily on local networking, word-of-mouth referrals, and print portfolios mailed directly to art directors, today, a significant share of new client relationships begin instead through online platforms that connect illustrators directly with businesses worldwide. This shift has lowered barriers to entry for illustrators outside major art hubs, but it has also intensified competition, since a client in any city can now just as easily hire an illustrator on another continent. Rates on these platforms vary enormously, and experienced illustrators generally advise newcomers to research typical pricing carefully before accepting their first few contracts, several illustrators interviewed for this piece noted that undercutting established rates, even briefly, can be difficult to recover from once a client base expects lower prices.",
          prompt: 'Which choice best corrects the underlined portion, "accepting their first few contracts, several illustrators"?',
          options: ['accepting their first few contracts, several illustrators', 'accepting their first few contracts. Several illustrators', 'accepting their first few contracts several illustrators', 'accepting, their first few contracts, several illustrators'],
          correctIndex: 1,
        },
        {
          id: 'sat1-wl-8', type: 'mcq',
          passage:
            "Freelance illustration work has changed considerably with the rise of online marketplaces. A decade ago, most freelance illustrators relied heavily on local networking, word-of-mouth referrals, and print portfolios mailed directly to art directors, today, a significant share of new client relationships begin instead through online platforms that connect illustrators directly with businesses worldwide. This shift has lowered barriers to entry for illustrators outside major art hubs, but it has also intensified competition, since a client in any city can now just as easily hire an illustrator on another continent. Rates on these platforms vary enormously, and experienced illustrators generally advise newcomers to research typical pricing carefully before accepting their first few contracts, several illustrators interviewed for this piece noted that undercutting established rates, even briefly, can be difficult to recover from once a client base expects lower prices.",
          prompt: 'According to the passage, what is one downside of the shift to online marketplaces?',
          options: ['Illustrators can no longer work from home', 'Competition has intensified since clients can hire illustrators anywhere', 'Print portfolios are now required', 'Online platforms have completely disappeared'],
          correctIndex: 1,
        },
        {
          id: 'sat1-wl-9', type: 'mcq',
          passage:
            "Freelance illustration work has changed considerably with the rise of online marketplaces. A decade ago, most freelance illustrators relied heavily on local networking, word-of-mouth referrals, and print portfolios mailed directly to art directors, today, a significant share of new client relationships begin instead through online platforms that connect illustrators directly with businesses worldwide. This shift has lowered barriers to entry for illustrators outside major art hubs, but it has also intensified competition, since a client in any city can now just as easily hire an illustrator on another continent. Rates on these platforms vary enormously, and experienced illustrators generally advise newcomers to research typical pricing carefully before accepting their first few contracts, several illustrators interviewed for this piece noted that undercutting established rates, even briefly, can be difficult to recover from once a client base expects lower prices.",
          prompt: 'Which choice best replaces "research typical pricing carefully" with the most concise, equally clear alternative?',
          options: ['research typical pricing carefully', 'carefully do research into what pricing is typical', 'research pricing', 'engage in careful research regarding typical pricing structures'],
          correctIndex: 0,
        },
        {
          id: 'sat1-wl-10', type: 'mcq',
          passage:
            "Freelance illustration work has changed considerably with the rise of online marketplaces. A decade ago, most freelance illustrators relied heavily on local networking, word-of-mouth referrals, and print portfolios mailed directly to art directors, today, a significant share of new client relationships begin instead through online platforms that connect illustrators directly with businesses worldwide. This shift has lowered barriers to entry for illustrators outside major art hubs, but it has also intensified competition, since a client in any city can now just as easily hire an illustrator on another continent. Rates on these platforms vary enormously, and experienced illustrators generally advise newcomers to research typical pricing carefully before accepting their first few contracts, several illustrators interviewed for this piece noted that undercutting established rates, even briefly, can be difficult to recover from once a client base expects lower prices.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To discourage people from becoming illustrators', 'To explain how online marketplaces have changed freelance illustration work, for better and worse', 'To compare illustration to other freelance professions', 'To list specific online platforms by name'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'math-no-calc',
      title: 'Math — No Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 13 * 60,
      instructions: 'No calculator allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat1-mnc-1', type: 'mcq', prompt: 'If 4x − 3 = 13, what is the value of x?', options: ['2', '4', '5', '16'], correctIndex: 1 },
        { id: 'sat1-mnc-2', type: 'mcq', prompt: 'Simplify: (3x + 2)(x − 4)', options: ['3x² − 10x − 8', '3x² − 14x − 8', '3x² + 2x − 8', '3x² − 10x + 8'], correctIndex: 0 },
        { id: 'sat1-mnc-3', type: 'mcq', prompt: 'If x² = 49 and x < 0, what is the value of x?', options: ['7', '−7', '0', '49'], correctIndex: 1 },
        { id: 'sat1-mnc-4', type: 'mcq', prompt: 'What is the slope of the line 4x + 2y = 10?', options: ['−2', '2', '4', '5'], correctIndex: 0 },
        { id: 'sat1-mnc-5', type: 'mcq', prompt: 'If f(x) = x² + 1 and g(x) = 2x, what is f(g(2))?', options: ['5', '9', '17', '4'], correctIndex: 2 },
        { id: 'sat1-mnc-6', type: 'mcq', prompt: 'Solve for x: 2(x + 3) = 3(x − 1)', options: ['9', '−9', '3', '−3'], correctIndex: 0 },
        { id: 'sat1-mnc-7', type: 'mcq', prompt: 'What is the value of (2³)(2²)?', options: ['16', '32', '64', '8'], correctIndex: 1 },
        { id: 'sat1-mnc-8', type: 'mcq', prompt: 'If 1/x = 3/9, what is the value of x?', options: ['1', '3', '9', '1/3'], correctIndex: 1 },
        { id: 'sat1-mnc-9', type: 'mcq', prompt: 'A line has a slope of 3 and passes through (0, −2). What is its equation?', options: ['y = 3x − 2', 'y = −2x + 3', 'y = 3x + 2', 'y = −3x − 2'], correctIndex: 0 },
        { id: 'sat1-mnc-10', type: 'mcq', prompt: 'Factor completely: x² − 9', options: ['(x − 3)(x − 3)', '(x + 3)(x − 3)', '(x + 9)(x − 1)', 'Cannot be factored'], correctIndex: 1 },
      ],
    },
    {
      key: 'math-calc',
      title: 'Math — Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'A calculator is allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat1-mc-1', type: 'mcq', prompt: 'A car travels 240 miles using 8 gallons of gas. At this rate, how many miles can it travel on 12 gallons?', options: ['300', '320', '360', '400'], correctIndex: 2 },
        { id: 'sat1-mc-2', type: 'mcq', prompt: 'A survey of 400 people found that 25% prefer tea over coffee. How many people prefer tea?', options: ['25', '75', '100', '125'], correctIndex: 2 },
        { id: 'sat1-mc-3', type: 'mcq', prompt: 'The population of a town grows according to P(t) = 2000(1.03)^t, where t is in years. What is the population after 2 years, rounded to the nearest whole number?', options: ['2060', '2122', '2181', '2000'], correctIndex: 1 },
        { id: 'sat1-mc-4', type: 'mcq', prompt: 'A rectangle has a perimeter of 36 and a length twice its width. What is the width?', options: ['4', '6', '8', '12'], correctIndex: 1 },
        { id: 'sat1-mc-5', type: 'mcq', prompt: 'If the mean of five numbers is 12, and four of the numbers are 8, 10, 14, and 16, what is the fifth number?', options: ['8', '10', '12', '14'], correctIndex: 2 },
        { id: 'sat1-mc-6', type: 'mcq', prompt: 'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?', options: ['13', '14', '15', '21'], correctIndex: 2 },
        { id: 'sat1-mc-7', type: 'mcq', prompt: 'A store marks up an item\'s wholesale price of $60 by 40% to set the retail price. What is the retail price?', options: ['$64', '$76', '$84', '$100'], correctIndex: 2 },
        { id: 'sat1-mc-8', type: 'mcq', prompt: 'In a bag of 50 marbles, the ratio of red to blue marbles is 3:2. How many red marbles are there?', options: ['15', '20', '25', '30'], correctIndex: 3 },
        { id: 'sat1-mc-9', type: 'mcq', prompt: 'A circle has an area of 49π. What is its circumference?', options: ['7π', '14π', '49π', '98π'], correctIndex: 1 },
        { id: 'sat1-mc-10', type: 'mcq', prompt: 'The table below shows test scores for 20 students: 5 scored 70, 8 scored 80, 7 scored 90. What is the mean score, rounded to the nearest whole number?', options: ['79', '80', '81', '83'], correctIndex: 2 },
        { id: 'sat1-mc-11', type: 'mcq', prompt: 'If 3x + 2y = 12 and x = 2, what is the value of y?', options: ['2', '3', '4', '6'], correctIndex: 1 },
        { id: 'sat1-mc-12', type: 'mcq', prompt: 'A car depreciates in value by 15% per year. If it is worth $20,000 today, what will it be worth after 1 year, to the nearest dollar?', options: ['$17,000', '$17,500', '$18,000', '$19,000'], correctIndex: 0 },
        { id: 'sat1-mc-13', type: 'mcq', prompt: 'What is 15% of 240?', options: ['24', '32', '36', '40'], correctIndex: 2 },
        { id: 'sat1-mc-14', type: 'mcq', prompt: 'A cylinder has a radius of 3 and a height of 10. What is its volume, in terms of π?', options: ['30π', '60π', '90π', '300π'], correctIndex: 2 },
        { id: 'sat1-mc-15', type: 'mcq', prompt: 'If a jacket originally priced at $80 is on sale for $60, what percent discount was applied?', options: ['20%', '25%', '30%', '75%'], correctIndex: 1 },
      ],
    },
  ],
};

const test2: AuthoredTest = {
  title: 'SAT Practice Test 2',
  order: 1,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 25 * 60,
      instructions: 'Each passage is followed by several questions. Read the whole passage before answering.',
      questions: [
        {
          id: 'sat2-r-1', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Theo had swept the same shop floor every evening for the six years since his father's retirement, and until that spring he had never once questioned whether he would still be sweeping it in another six. The realization, when it came, arrived without drama: he was straightening a shelf of paint cans, and he simply thought, with the mild surprise of noticing weather, that he did not want to be here tomorrow. He tested the thought carefully, the way one tests a loose tooth with a tongue, expecting guilt to rush in and fill the space where duty had always sat. It did not come. What came instead was a kind of quiet curiosity about what he might have wanted all along, underneath the wanting he had inherited. He locked the register, pulled the metal grate down over the front window as he had ten thousand times before, and stood a moment longer than usual on the sidewalk, looking at the shop's dark interior through the grate's diamond gaps, trying to memorize the specific shape of a life he had just, almost silently, decided to leave.",
          prompt: 'The main effect of the passage is to convey',
          options: ["His anger at his father", 'A quiet realization that he no longer wants the life he assumed he would keep', 'A detailed description of a hardware store', 'An argument that shops should close earlier'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-2', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Theo had swept the same shop floor every evening for the six years since his father's retirement, and until that spring he had never once questioned whether he would still be sweeping it in another six. The realization, when it came, arrived without drama: he was straightening a shelf of paint cans, and he simply thought, with the mild surprise of noticing weather, that he did not want to be here tomorrow. He tested the thought carefully, the way one tests a loose tooth with a tongue, expecting guilt to rush in and fill the space where duty had always sat. It did not come. What came instead was a kind of quiet curiosity about what he might have wanted all along, underneath the wanting he had inherited. He locked the register, pulled the metal grate down over the front window as he had ten thousand times before, and stood a moment longer than usual on the sidewalk, looking at the shop's dark interior through the grate's diamond gaps, trying to memorize the specific shape of a life he had just, almost silently, decided to leave.",
          prompt: 'As used in the passage, "tested" ("He tested the thought carefully") most nearly means',
          options: ['Administers an exam', 'Examines cautiously', 'Argues against', 'Ignores completely'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-3', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Theo had swept the same shop floor every evening for the six years since his father's retirement, and until that spring he had never once questioned whether he would still be sweeping it in another six. The realization, when it came, arrived without drama: he was straightening a shelf of paint cans, and he simply thought, with the mild surprise of noticing weather, that he did not want to be here tomorrow. He tested the thought carefully, the way one tests a loose tooth with a tongue, expecting guilt to rush in and fill the space where duty had always sat. It did not come. What came instead was a kind of quiet curiosity about what he might have wanted all along, underneath the wanting he had inherited. He locked the register, pulled the metal grate down over the front window as he had ten thousand times before, and stood a moment longer than usual on the sidewalk, looking at the shop's dark interior through the grate's diamond gaps, trying to memorize the specific shape of a life he had just, almost silently, decided to leave.",
          prompt: 'Why does Theo stand on the sidewalk longer than usual?',
          options: ['He is waiting for a customer', 'He wants to fix the grate', 'He wants to remember the life he has just decided to leave', 'He forgot his keys'],
          correctIndex: 2,
        },
        {
          id: 'sat2-r-4', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Theo had swept the same shop floor every evening for the six years since his father's retirement, and until that spring he had never once questioned whether he would still be sweeping it in another six. The realization, when it came, arrived without drama: he was straightening a shelf of paint cans, and he simply thought, with the mild surprise of noticing weather, that he did not want to be here tomorrow. He tested the thought carefully, the way one tests a loose tooth with a tongue, expecting guilt to rush in and fill the space where duty had always sat. It did not come. What came instead was a kind of quiet curiosity about what he might have wanted all along, underneath the wanting he had inherited. He locked the register, pulled the metal grate down over the front window as he had ten thousand times before, and stood a moment longer than usual on the sidewalk, looking at the shop's dark interior through the grate's diamond gaps, trying to memorize the specific shape of a life he had just, almost silently, decided to leave.",
          prompt: 'The comparison "tests a loose tooth with a tongue" emphasizes that Theo\'s examination of the thought was',
          options: ['Reckless and hasty', 'Careful and tentative', 'Painful and pointless', 'Playful and lighthearted'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-5', type: 'mcq',
          passage:
            "The following passage is adapted from a novel. Theo had swept the same shop floor every evening for the six years since his father's retirement, and until that spring he had never once questioned whether he would still be sweeping it in another six. The realization, when it came, arrived without drama: he was straightening a shelf of paint cans, and he simply thought, with the mild surprise of noticing weather, that he did not want to be here tomorrow. He tested the thought carefully, the way one tests a loose tooth with a tongue, expecting guilt to rush in and fill the space where duty had always sat. It did not come. What came instead was a kind of quiet curiosity about what he might have wanted all along, underneath the wanting he had inherited. He locked the register, pulled the metal grate down over the front window as he had ten thousand times before, and stood a moment longer than usual on the sidewalk, looking at the shop's dark interior through the grate's diamond gaps, trying to memorize the specific shape of a life he had just, almost silently, decided to leave.",
          prompt: 'It can reasonably be inferred that before this evening, Theo',
          options: ['Had never worked in the shop before', "Had rarely questioned continuing his father's business", 'Disliked his father', 'Was planning to sell the shop'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-6', type: 'mcq',
          passage:
            "Many migratory bird species travel thousands of kilometers between breeding and wintering grounds with a precision that long puzzled biologists, given that young birds often make their first migration entirely alone, with no experienced adult to follow. Research over the past several decades has converged on an explanation: birds appear to sense Earth's magnetic field directly, using a mechanism believed to involve light-sensitive proteins in the eye called cryptochromes, which may allow birds to perceive magnetic field lines as a visual overlay rather than a separate sense entirely. This magnetic sense works alongside other cues — the position of the sun, star patterns, and even olfactory landmarks — and different cues appear to dominate at different stages of the journey; magnetic orientation seems most important for maintaining a general heading over long open stretches, while visual and olfactory cues become more useful for fine-tuning the approach to a specific nesting site. Conservation biologists have taken particular interest in this research because artificial light and electromagnetic interference from human infrastructure may disrupt these senses in ways that are still poorly understood, raising the possibility that some unexplained migration failures are linked not to habitat loss alone but to sensory disruption along the route.",
          prompt: 'What does the passage mainly explain?',
          options: ['That birds always migrate in large flocks', "How birds may sense Earth's magnetic field to navigate long migrations", 'That young birds never survive their first migration', 'That magnetic fields have no effect on animals'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-7', type: 'mcq',
          passage:
            "Many migratory bird species travel thousands of kilometers between breeding and wintering grounds with a precision that long puzzled biologists, given that young birds often make their first migration entirely alone, with no experienced adult to follow. Research over the past several decades has converged on an explanation: birds appear to sense Earth's magnetic field directly, using a mechanism believed to involve light-sensitive proteins in the eye called cryptochromes, which may allow birds to perceive magnetic field lines as a visual overlay rather than a separate sense entirely. This magnetic sense works alongside other cues — the position of the sun, star patterns, and even olfactory landmarks — and different cues appear to dominate at different stages of the journey; magnetic orientation seems most important for maintaining a general heading over long open stretches, while visual and olfactory cues become more useful for fine-tuning the approach to a specific nesting site. Conservation biologists have taken particular interest in this research because artificial light and electromagnetic interference from human infrastructure may disrupt these senses in ways that are still poorly understood, raising the possibility that some unexplained migration failures are linked not to habitat loss alone but to sensory disruption along the route.",
          prompt: 'According to the passage, what puzzled biologists about bird migration?',
          options: ['Birds fly at night', 'Young birds often migrate alone without an experienced guide', 'Birds never return to the same nesting site', 'Migration distances are too short to study'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-8', type: 'mcq',
          passage:
            "Many migratory bird species travel thousands of kilometers between breeding and wintering grounds with a precision that long puzzled biologists, given that young birds often make their first migration entirely alone, with no experienced adult to follow. Research over the past several decades has converged on an explanation: birds appear to sense Earth's magnetic field directly, using a mechanism believed to involve light-sensitive proteins in the eye called cryptochromes, which may allow birds to perceive magnetic field lines as a visual overlay rather than a separate sense entirely. This magnetic sense works alongside other cues — the position of the sun, star patterns, and even olfactory landmarks — and different cues appear to dominate at different stages of the journey; magnetic orientation seems most important for maintaining a general heading over long open stretches, while visual and olfactory cues become more useful for fine-tuning the approach to a specific nesting site. Conservation biologists have taken particular interest in this research because artificial light and electromagnetic interference from human infrastructure may disrupt these senses in ways that are still poorly understood, raising the possibility that some unexplained migration failures are linked not to habitat loss alone but to sensory disruption along the route.",
          prompt: 'As used in the passage, "converged" most nearly means',
          options: ['Diverged widely', 'Arrived together at', 'Disproved', 'Ignored'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-9', type: 'mcq',
          passage:
            "Many migratory bird species travel thousands of kilometers between breeding and wintering grounds with a precision that long puzzled biologists, given that young birds often make their first migration entirely alone, with no experienced adult to follow. Research over the past several decades has converged on an explanation: birds appear to sense Earth's magnetic field directly, using a mechanism believed to involve light-sensitive proteins in the eye called cryptochromes, which may allow birds to perceive magnetic field lines as a visual overlay rather than a separate sense entirely. This magnetic sense works alongside other cues — the position of the sun, star patterns, and even olfactory landmarks — and different cues appear to dominate at different stages of the journey; magnetic orientation seems most important for maintaining a general heading over long open stretches, while visual and olfactory cues become more useful for fine-tuning the approach to a specific nesting site. Conservation biologists have taken particular interest in this research because artificial light and electromagnetic interference from human infrastructure may disrupt these senses in ways that are still poorly understood, raising the possibility that some unexplained migration failures are linked not to habitat loss alone but to sensory disruption along the route.",
          prompt: 'According to the passage, when does magnetic orientation seem most important?',
          options: ['Only during takeoff', 'For maintaining a general heading over long open stretches', 'Only near the nesting site', 'It is never actually used'],
          correctIndex: 1,
        },
        {
          id: 'sat2-r-10', type: 'mcq',
          passage:
            "Many migratory bird species travel thousands of kilometers between breeding and wintering grounds with a precision that long puzzled biologists, given that young birds often make their first migration entirely alone, with no experienced adult to follow. Research over the past several decades has converged on an explanation: birds appear to sense Earth's magnetic field directly, using a mechanism believed to involve light-sensitive proteins in the eye called cryptochromes, which may allow birds to perceive magnetic field lines as a visual overlay rather than a separate sense entirely. This magnetic sense works alongside other cues — the position of the sun, star patterns, and even olfactory landmarks — and different cues appear to dominate at different stages of the journey; magnetic orientation seems most important for maintaining a general heading over long open stretches, while visual and olfactory cues become more useful for fine-tuning the approach to a specific nesting site. Conservation biologists have taken particular interest in this research because artificial light and electromagnetic interference from human infrastructure may disrupt these senses in ways that are still poorly understood, raising the possibility that some unexplained migration failures are linked not to habitat loss alone but to sensory disruption along the route.",
          prompt: 'What concern do conservation biologists have, according to the passage?',
          options: ['That birds are overpopulating cities', "That artificial light and electromagnetic interference may disrupt birds' senses", 'That birds no longer need magnetic sense', 'That cryptochromes have been fully explained'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing-language',
      title: 'Writing and Language',
      type: 'writing',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Each passage is followed by questions about specific phrases or sentences within it. Choose the most effective revision.',
      questions: [
        {
          id: 'sat2-wl-1', type: 'mcq',
          passage:
            "Bike-share programs have expanded rapidly in mid-sized cities over the past several years. Originally pitched as a convenient alternative for short trips, they have become, for many residents a genuine substitute for car ownership altogether. A recent transportation survey found that riders in cities with well-established bike-share networks report shorter average commute times than riders relying solely on cars during peak hours. Transit agencies, once uncertain about how bike-share would affect existing bus ridership, now increasingly design routes to complement rather than compete with these programs, adding bike docks near major transit stops.",
          prompt: 'Which choice best corrects the underlined portion, "become, for many residents a genuine substitute"?',
          options: ['become, for many residents a genuine substitute', 'become, for many residents, a genuine substitute', 'become for many residents, a genuine substitute', 'become for, many residents a genuine substitute'],
          correctIndex: 1,
        },
        {
          id: 'sat2-wl-2', type: 'mcq',
          passage:
            "Bike-share programs have expanded rapidly in mid-sized cities over the past several years. Originally pitched as a convenient alternative for short trips, they have become, for many residents a genuine substitute for car ownership altogether. A recent transportation survey found that riders in cities with well-established bike-share networks report shorter average commute times than riders relying solely on cars during peak hours. Transit agencies, once uncertain about how bike-share would affect existing bus ridership, now increasingly design routes to complement rather than compete with these programs, adding bike docks near major transit stops.",
          prompt: 'The writer wants to add a sentence describing bike-share\'s original, narrower purpose before addressing its broader impact. The best place for such a sentence is',
          options: ['Before the first sentence', 'Immediately after the first sentence', 'Immediately after the survey statistic', 'At the very end of the passage'],
          correctIndex: 1,
        },
        {
          id: 'sat2-wl-3', type: 'mcq',
          passage:
            "Bike-share programs have expanded rapidly in mid-sized cities over the past several years. Originally pitched as a convenient alternative for short trips, they have become, for many residents a genuine substitute for car ownership altogether. A recent transportation survey found that riders in cities with well-established bike-share networks report shorter average commute times than riders relying solely on cars during peak hours. Transit agencies, once uncertain about how bike-share would affect existing bus ridership, now increasingly design routes to complement rather than compete with these programs, adding bike docks near major transit stops.",
          prompt: 'Which choice most effectively maintains the passage\'s focus, given the survey sentence?',
          options: ['The sentence should stay exactly as is.', 'The survey statistic should be deleted, since it is irrelevant.', 'The survey statistic should be moved to the very beginning of the passage.', 'The word "recent" should be removed for precision.'],
          correctIndex: 0,
        },
        {
          id: 'sat2-wl-4', type: 'mcq',
          passage:
            "Bike-share programs have expanded rapidly in mid-sized cities over the past several years. Originally pitched as a convenient alternative for short trips, they have become, for many residents a genuine substitute for car ownership altogether. A recent transportation survey found that riders in cities with well-established bike-share networks report shorter average commute times than riders relying solely on cars during peak hours. Transit agencies, once uncertain about how bike-share would affect existing bus ridership, now increasingly design routes to complement rather than compete with these programs, adding bike docks near major transit stops.",
          prompt: 'Which choice best replaces "once uncertain about how bike-share would affect existing bus ridership" while preserving the sentence\'s meaning most concisely?',
          options: ['once uncertain about how bike-share would affect existing bus ridership', 'who did not know, at first, in what way bike-share would end up affecting the ridership of existing buses', 'once uncertain', 'uncertain, at least initially, regarding the effect of bike-share on existing bus ridership'],
          correctIndex: 0,
        },
        {
          id: 'sat2-wl-5', type: 'mcq',
          passage:
            "Bike-share programs have expanded rapidly in mid-sized cities over the past several years. Originally pitched as a convenient alternative for short trips, they have become, for many residents a genuine substitute for car ownership altogether. A recent transportation survey found that riders in cities with well-established bike-share networks report shorter average commute times than riders relying solely on cars during peak hours. Transit agencies, once uncertain about how bike-share would affect existing bus ridership, now increasingly design routes to complement rather than compete with these programs, adding bike docks near major transit stops.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To criticize transit agencies for resisting change', 'To describe how bike-share programs grew and gained institutional support', 'To argue that all cities need bike-share', 'To compare bike-share systems in different countries'],
          correctIndex: 1,
        },
        {
          id: 'sat2-wl-6', type: 'mcq',
          passage:
            "Neighborhood bakeries have increasingly returned to traditional sourdough methods after decades of relying on commercial yeast. A generation ago, most small bakeries used fast-acting commercial yeast almost exclusively, valuing its speed and predictability, more recently, a growing number of bakers have returned to slow natural fermentation using wild-yeast starters. This shift has produced bread with more complex flavor and easier digestibility for some customers, but it has also lengthened production time considerably, since a client expecting same-day fresh bread can no longer always be accommodated on short notice. Costs vary considerably between bakeries, and experienced bakers generally advise newcomers to budget carefully for the extra time before committing fully to sourdough, several bakers interviewed for this piece noted that abandoning natural fermentation once customers expect it can disappoint a loyal customer base.",
          prompt: 'Which choice best corrects the underlined portion, "predictability, more recently"?',
          options: ['predictability, more recently', 'predictability; more recently', 'predictability more recently', 'predictability, and more recently'],
          correctIndex: 1,
        },
        {
          id: 'sat2-wl-7', type: 'mcq',
          passage:
            "Neighborhood bakeries have increasingly returned to traditional sourdough methods after decades of relying on commercial yeast. A generation ago, most small bakeries used fast-acting commercial yeast almost exclusively, valuing its speed and predictability, more recently, a growing number of bakers have returned to slow natural fermentation using wild-yeast starters. This shift has produced bread with more complex flavor and easier digestibility for some customers, but it has also lengthened production time considerably, since a client expecting same-day fresh bread can no longer always be accommodated on short notice. Costs vary considerably between bakeries, and experienced bakers generally advise newcomers to budget carefully for the extra time before committing fully to sourdough, several bakers interviewed for this piece noted that abandoning natural fermentation once customers expect it can disappoint a loyal customer base.",
          prompt: 'Which choice best corrects the underlined portion, "committing fully to sourdough, several bakers"?',
          options: ['committing fully to sourdough, several bakers', 'committing fully to sourdough. Several bakers', 'committing fully to sourdough several bakers', 'committing, fully to sourdough, several bakers'],
          correctIndex: 1,
        },
        {
          id: 'sat2-wl-8', type: 'mcq',
          passage:
            "Neighborhood bakeries have increasingly returned to traditional sourdough methods after decades of relying on commercial yeast. A generation ago, most small bakeries used fast-acting commercial yeast almost exclusively, valuing its speed and predictability, more recently, a growing number of bakers have returned to slow natural fermentation using wild-yeast starters. This shift has produced bread with more complex flavor and easier digestibility for some customers, but it has also lengthened production time considerably, since a client expecting same-day fresh bread can no longer always be accommodated on short notice. Costs vary considerably between bakeries, and experienced bakers generally advise newcomers to budget carefully for the extra time before committing fully to sourdough, several bakers interviewed for this piece noted that abandoning natural fermentation once customers expect it can disappoint a loyal customer base.",
          prompt: 'According to the passage, what is one downside of the shift to sourdough?',
          options: ['Bread becomes less flavorful', 'Production time has lengthened, making same-day requests harder to accommodate', 'Commercial yeast is now banned', 'Customers no longer buy bread'],
          correctIndex: 1,
        },
        {
          id: 'sat2-wl-9', type: 'mcq',
          passage:
            "Neighborhood bakeries have increasingly returned to traditional sourdough methods after decades of relying on commercial yeast. A generation ago, most small bakeries used fast-acting commercial yeast almost exclusively, valuing its speed and predictability, more recently, a growing number of bakers have returned to slow natural fermentation using wild-yeast starters. This shift has produced bread with more complex flavor and easier digestibility for some customers, but it has also lengthened production time considerably, since a client expecting same-day fresh bread can no longer always be accommodated on short notice. Costs vary considerably between bakeries, and experienced bakers generally advise newcomers to budget carefully for the extra time before committing fully to sourdough, several bakers interviewed for this piece noted that abandoning natural fermentation once customers expect it can disappoint a loyal customer base.",
          prompt: 'Which choice best replaces "budget carefully for the extra time" with the most concise, equally clear alternative?',
          options: ['budget carefully for the extra time', 'carefully budget in a manner that accounts for the extra time involved', 'budget time', 'engage in careful budgeting regarding the extra time required'],
          correctIndex: 0,
        },
        {
          id: 'sat2-wl-10', type: 'mcq',
          passage:
            "Neighborhood bakeries have increasingly returned to traditional sourdough methods after decades of relying on commercial yeast. A generation ago, most small bakeries used fast-acting commercial yeast almost exclusively, valuing its speed and predictability, more recently, a growing number of bakers have returned to slow natural fermentation using wild-yeast starters. This shift has produced bread with more complex flavor and easier digestibility for some customers, but it has also lengthened production time considerably, since a client expecting same-day fresh bread can no longer always be accommodated on short notice. Costs vary considerably between bakeries, and experienced bakers generally advise newcomers to budget carefully for the extra time before committing fully to sourdough, several bakers interviewed for this piece noted that abandoning natural fermentation once customers expect it can disappoint a loyal customer base.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To discourage people from opening bakeries', 'To explain how the shift to sourdough has changed bakeries, for better and worse', 'To compare bread to other baked goods', 'To list specific bakeries by name'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'math-no-calc',
      title: 'Math — No Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 13 * 60,
      instructions: 'No calculator allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat2-mnc-1', type: 'mcq', prompt: 'If 5x − 4 = 21, what is the value of x?', options: ['3', '4', '5', '21'], correctIndex: 2 },
        { id: 'sat2-mnc-2', type: 'mcq', prompt: 'Simplify: (2x + 5)(x − 3)', options: ['2x² − x − 15', '2x² + x − 15', '2x² − 11x − 15', '2x² − x + 15'], correctIndex: 0 },
        { id: 'sat2-mnc-3', type: 'mcq', prompt: 'If x² = 81 and x < 0, what is the value of x?', options: ['9', '−9', '0', '81'], correctIndex: 1 },
        { id: 'sat2-mnc-4', type: 'mcq', prompt: 'What is the slope of the line 3x + 6y = 12?', options: ['−1/2', '1/2', '3', '−3'], correctIndex: 0 },
        { id: 'sat2-mnc-5', type: 'mcq', prompt: 'If f(x) = x² − 2 and g(x) = 3x, what is f(g(1))?', options: ['1', '7', '9', '25'], correctIndex: 1 },
        { id: 'sat2-mnc-6', type: 'mcq', prompt: 'Solve for x: 3(x − 2) = 2(x + 4)', options: ['14', '−14', '2', '−2'], correctIndex: 0 },
        { id: 'sat2-mnc-7', type: 'mcq', prompt: 'What is the value of (3²)(3³)?', options: ['81', '243', '729', '9'], correctIndex: 1 },
        { id: 'sat2-mnc-8', type: 'mcq', prompt: 'If 2/x = 4/10, what is the value of x?', options: ['2', '4', '5', '10'], correctIndex: 2 },
        { id: 'sat2-mnc-9', type: 'mcq', prompt: 'A line has a slope of −2 and passes through (0, 3). What is its equation?', options: ['y = −2x + 3', 'y = 3x − 2', 'y = −2x − 3', 'y = 2x + 3'], correctIndex: 0 },
        { id: 'sat2-mnc-10', type: 'mcq', prompt: 'Factor completely: x² − 16', options: ['(x − 4)(x − 4)', '(x + 4)(x − 4)', '(x + 16)(x − 1)', 'Cannot be factored'], correctIndex: 1 },
      ],
    },
    {
      key: 'math-calc',
      title: 'Math — Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'A calculator is allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat2-mc-1', type: 'mcq', prompt: 'A car travels 180 miles using 6 gallons of gas. At this rate, how many miles can it travel on 10 gallons?', options: ['250', '280', '300', '320'], correctIndex: 2 },
        { id: 'sat2-mc-2', type: 'mcq', prompt: 'A survey of 500 people found that 30% prefer window seats. How many people prefer window seats?', options: ['100', '120', '150', '180'], correctIndex: 2 },
        { id: 'sat2-mc-3', type: 'mcq', prompt: 'The population of a town grows according to P(t) = 1500(1.04)^t, where t is in years. What is the population after 2 years, rounded to the nearest whole number?', options: ['1560', '1622', '1680', '1500'], correctIndex: 1 },
        { id: 'sat2-mc-4', type: 'mcq', prompt: 'A rectangle has a perimeter of 40 and a length three times its width. What is the width?', options: ['4', '5', '6', '10'], correctIndex: 1 },
        { id: 'sat2-mc-5', type: 'mcq', prompt: 'If the mean of six numbers is 15, and five of the numbers are 10, 12, 14, 18, and 20, what is the sixth number?', options: ['14', '15', '16', '18'], correctIndex: 2 },
        { id: 'sat2-mc-6', type: 'mcq', prompt: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?', options: ['10', '12', '14', '16'], correctIndex: 0 },
        { id: 'sat2-mc-7', type: 'mcq', prompt: "A store marks up an item's wholesale price of $50 by 20% to set the retail price. What is the retail price?", options: ['$55', '$60', '$65', '$70'], correctIndex: 1 },
        { id: 'sat2-mc-8', type: 'mcq', prompt: 'In a bag of 40 marbles, the ratio of green to yellow marbles is 3:5. How many green marbles are there?', options: ['10', '15', '20', '25'], correctIndex: 1 },
        { id: 'sat2-mc-9', type: 'mcq', prompt: 'A circle has an area of 36π. What is its circumference?', options: ['6π', '12π', '36π', '72π'], correctIndex: 1 },
        { id: 'sat2-mc-10', type: 'mcq', prompt: 'The table below shows test scores for 25 students: 6 scored 60, 9 scored 75, 10 scored 90. What is the mean score, rounded to the nearest whole number?', options: ['75', '76', '77', '79'], correctIndex: 2 },
        { id: 'sat2-mc-11', type: 'mcq', prompt: 'If 2x + 3y = 16 and x = 2, what is the value of y?', options: ['2', '3', '4', '6'], correctIndex: 2 },
        { id: 'sat2-mc-12', type: 'mcq', prompt: 'A car depreciates in value by 20% per year. If it is worth $15,000 today, what will it be worth after 1 year?', options: ['$10,000', '$12,000', '$13,000', '$14,000'], correctIndex: 1 },
        { id: 'sat2-mc-13', type: 'mcq', prompt: 'What is 25% of 180?', options: ['30', '40', '45', '50'], correctIndex: 2 },
        { id: 'sat2-mc-14', type: 'mcq', prompt: 'A cylinder has a radius of 4 and a height of 5. What is its volume, in terms of π?', options: ['40π', '60π', '80π', '100π'], correctIndex: 2 },
        { id: 'sat2-mc-15', type: 'mcq', prompt: 'If a shirt originally priced at $50 is on sale for $35, what percent discount was applied?', options: ['15%', '20%', '30%', '35%'], correctIndex: 2 },
      ],
    },
  ],
};

const test3: AuthoredTest = {
  title: 'SAT Practice Test 3',
  order: 2,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 25 * 60,
      instructions: 'Each passage is followed by several questions. Read the whole passage before answering.',
      questions: [
        {
          id: 'sat3-r-1', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Adaeze had opened the restaurant's back door every morning at five for eleven years, and she had always told herself the ritual was about the bread — dough needed to rise before the city woke, and someone had to be there to shape it. It was only this particular morning, standing in the cold with her key still in the lock, that she let herself notice how little the bread actually required her presence anymore; her staff could shape loaves as well as she could, perhaps better, and had been doing so for months whenever she arrived late. What she was protecting, she realized, was not the bread but a version of herself that needed to be first through the door, needed the restaurant to still require her completely. The thought did not arrive as failure. It arrived, oddly, as relief, an unclenching she had not known she was braced against. She let the door swing shut again, unopened, and stood in the alley a moment longer, testing what it felt like to simply not be needed yet, before finally turning her key.",
          prompt: 'The main effect of the passage is to convey',
          options: ['Her frustration with her staff', 'A quiet realization that the restaurant no longer needs her the way she assumed', 'A detailed description of bread-making', 'An argument that restaurants should open later'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-2', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Adaeze had opened the restaurant's back door every morning at five for eleven years, and she had always told herself the ritual was about the bread — dough needed to rise before the city woke, and someone had to be there to shape it. It was only this particular morning, standing in the cold with her key still in the lock, that she let herself notice how little the bread actually required her presence anymore; her staff could shape loaves as well as she could, perhaps better, and had been doing so for months whenever she arrived late. What she was protecting, she realized, was not the bread but a version of herself that needed to be first through the door, needed the restaurant to still require her completely. The thought did not arrive as failure. It arrived, oddly, as relief, an unclenching she had not known she was braced against. She let the door swing shut again, unopened, and stood in the alley a moment longer, testing what it felt like to simply not be needed yet, before finally turning her key.",
          prompt: 'As used in the passage, "unclenching" most nearly means',
          options: ['A sudden injury', 'A release of tension', 'A type of dough', 'A financial loss'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-3', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Adaeze had opened the restaurant's back door every morning at five for eleven years, and she had always told herself the ritual was about the bread — dough needed to rise before the city woke, and someone had to be there to shape it. It was only this particular morning, standing in the cold with her key still in the lock, that she let herself notice how little the bread actually required her presence anymore; her staff could shape loaves as well as she could, perhaps better, and had been doing so for months whenever she arrived late. What she was protecting, she realized, was not the bread but a version of herself that needed to be first through the door, needed the restaurant to still require her completely. The thought did not arrive as failure. It arrived, oddly, as relief, an unclenching she had not known she was braced against. She let the door swing shut again, unopened, and stood in the alley a moment longer, testing what it felt like to simply not be needed yet, before finally turning her key.",
          prompt: 'Why does Adaeze let the door swing shut again, unopened?',
          options: ['She forgot her key', 'She wants to experience not being needed, at least briefly', 'She is locked out', 'She is waiting for a delivery'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-4', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Adaeze had opened the restaurant's back door every morning at five for eleven years, and she had always told herself the ritual was about the bread — dough needed to rise before the city woke, and someone had to be there to shape it. It was only this particular morning, standing in the cold with her key still in the lock, that she let herself notice how little the bread actually required her presence anymore; her staff could shape loaves as well as she could, perhaps better, and had been doing so for months whenever she arrived late. What she was protecting, she realized, was not the bread but a version of herself that needed to be first through the door, needed the restaurant to still require her completely. The thought did not arrive as failure. It arrived, oddly, as relief, an unclenching she had not known she was braced against. She let the door swing shut again, unopened, and stood in the alley a moment longer, testing what it felt like to simply not be needed yet, before finally turning her key.",
          prompt: 'The phrase "needed to be first through the door" emphasizes that Adaeze\'s motivation was really about',
          options: ['The quality of the bread', 'Her own need to feel essential', "The restaurant's profits", "Her staff's training"],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-5', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Adaeze had opened the restaurant's back door every morning at five for eleven years, and she had always told herself the ritual was about the bread — dough needed to rise before the city woke, and someone had to be there to shape it. It was only this particular morning, standing in the cold with her key still in the lock, that she let herself notice how little the bread actually required her presence anymore; her staff could shape loaves as well as she could, perhaps better, and had been doing so for months whenever she arrived late. What she was protecting, she realized, was not the bread but a version of herself that needed to be first through the door, needed the restaurant to still require her completely. The thought did not arrive as failure. It arrived, oddly, as relief, an unclenching she had not known she was braced against. She let the door swing shut again, unopened, and stood in the alley a moment longer, testing what it felt like to simply not be needed yet, before finally turning her key.",
          prompt: 'It can reasonably be inferred that before this morning, Adaeze',
          options: ['Had never baked bread herself', 'Had not noticed how capable her staff had become', 'Disliked her staff', 'Planned to close the restaurant permanently'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-6', type: 'mcq',
          passage:
            "Coral reefs derive their vivid color, and much of their food supply, from microscopic algae called zooxanthellae that live symbiotically within coral tissue, converting sunlight into nutrients the coral cannot produce on its own. When ocean temperatures rise even briefly above a coral species' normal tolerance, the coral expels these algae in a stress response, leaving behind the pale calcium-carbonate skeleton beneath — a phenomenon known as bleaching. Bleaching itself is not always fatal: if temperatures return to normal quickly enough, corals can recruit new algae and recover their color and function within weeks. Prolonged or repeated heat stress, however, leaves coral without its primary energy source for too long, and widespread coral death follows across the reef. Because reef ecosystems support a disproportionate share of marine biodiversity relative to the ocean floor they cover, marine biologists treat bleaching events as an early warning signal, tracking sea-surface temperature anomalies in real time to predict which reefs are most at risk in a given season and to prioritize them for monitoring and, where possible, protective intervention such as shading structures or selective breeding of heat-tolerant coral strains.",
          prompt: 'What does the passage mainly explain?',
          options: ['Coral reefs are unaffected by temperature', 'How rising ocean temperatures cause coral bleaching and why it matters', 'That bleaching is always immediately fatal', 'That zooxanthellae harm coral'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-7', type: 'mcq',
          passage:
            "Coral reefs derive their vivid color, and much of their food supply, from microscopic algae called zooxanthellae that live symbiotically within coral tissue, converting sunlight into nutrients the coral cannot produce on its own. When ocean temperatures rise even briefly above a coral species' normal tolerance, the coral expels these algae in a stress response, leaving behind the pale calcium-carbonate skeleton beneath — a phenomenon known as bleaching. Bleaching itself is not always fatal: if temperatures return to normal quickly enough, corals can recruit new algae and recover their color and function within weeks. Prolonged or repeated heat stress, however, leaves coral without its primary energy source for too long, and widespread coral death follows across the reef. Because reef ecosystems support a disproportionate share of marine biodiversity relative to the ocean floor they cover, marine biologists treat bleaching events as an early warning signal, tracking sea-surface temperature anomalies in real time to predict which reefs are most at risk in a given season and to prioritize them for monitoring and, where possible, protective intervention such as shading structures or selective breeding of heat-tolerant coral strains.",
          prompt: 'According to the passage, what do zooxanthellae provide to coral?',
          options: ['Protection from predators', 'Nutrients converted from sunlight', 'A hard skeleton', 'Reproductive cells'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-8', type: 'mcq',
          passage:
            "Coral reefs derive their vivid color, and much of their food supply, from microscopic algae called zooxanthellae that live symbiotically within coral tissue, converting sunlight into nutrients the coral cannot produce on its own. When ocean temperatures rise even briefly above a coral species' normal tolerance, the coral expels these algae in a stress response, leaving behind the pale calcium-carbonate skeleton beneath — a phenomenon known as bleaching. Bleaching itself is not always fatal: if temperatures return to normal quickly enough, corals can recruit new algae and recover their color and function within weeks. Prolonged or repeated heat stress, however, leaves coral without its primary energy source for too long, and widespread coral death follows across the reef. Because reef ecosystems support a disproportionate share of marine biodiversity relative to the ocean floor they cover, marine biologists treat bleaching events as an early warning signal, tracking sea-surface temperature anomalies in real time to predict which reefs are most at risk in a given season and to prioritize them for monitoring and, where possible, protective intervention such as shading structures or selective breeding of heat-tolerant coral strains.",
          prompt: 'As used in the passage, "recruit" ("corals can recruit new algae") most nearly means',
          options: ['Forcibly remove', 'Attract and take in', 'Sell', 'Destroy'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-9', type: 'mcq',
          passage:
            "Coral reefs derive their vivid color, and much of their food supply, from microscopic algae called zooxanthellae that live symbiotically within coral tissue, converting sunlight into nutrients the coral cannot produce on its own. When ocean temperatures rise even briefly above a coral species' normal tolerance, the coral expels these algae in a stress response, leaving behind the pale calcium-carbonate skeleton beneath — a phenomenon known as bleaching. Bleaching itself is not always fatal: if temperatures return to normal quickly enough, corals can recruit new algae and recover their color and function within weeks. Prolonged or repeated heat stress, however, leaves coral without its primary energy source for too long, and widespread coral death follows across the reef. Because reef ecosystems support a disproportionate share of marine biodiversity relative to the ocean floor they cover, marine biologists treat bleaching events as an early warning signal, tracking sea-surface temperature anomalies in real time to predict which reefs are most at risk in a given season and to prioritize them for monitoring and, where possible, protective intervention such as shading structures or selective breeding of heat-tolerant coral strains.",
          prompt: 'According to the passage, when does bleaching become fatal to coral?',
          options: ['As soon as any algae is expelled', 'When heat stress is prolonged or repeated, leaving coral without energy too long', 'Only during winter months', 'Bleaching is never fatal'],
          correctIndex: 1,
        },
        {
          id: 'sat3-r-10', type: 'mcq',
          passage:
            "Coral reefs derive their vivid color, and much of their food supply, from microscopic algae called zooxanthellae that live symbiotically within coral tissue, converting sunlight into nutrients the coral cannot produce on its own. When ocean temperatures rise even briefly above a coral species' normal tolerance, the coral expels these algae in a stress response, leaving behind the pale calcium-carbonate skeleton beneath — a phenomenon known as bleaching. Bleaching itself is not always fatal: if temperatures return to normal quickly enough, corals can recruit new algae and recover their color and function within weeks. Prolonged or repeated heat stress, however, leaves coral without its primary energy source for too long, and widespread coral death follows across the reef. Because reef ecosystems support a disproportionate share of marine biodiversity relative to the ocean floor they cover, marine biologists treat bleaching events as an early warning signal, tracking sea-surface temperature anomalies in real time to predict which reefs are most at risk in a given season and to prioritize them for monitoring and, where possible, protective intervention such as shading structures or selective breeding of heat-tolerant coral strains.",
          prompt: 'Why do marine biologists track bleaching events, according to the passage?',
          options: ['To sell coral commercially', 'To predict at-risk reefs and prioritize monitoring and protection', 'To prove reefs are not biodiverse', 'To relocate all coral permanently'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing-language',
      title: 'Writing and Language',
      type: 'writing',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Each passage is followed by questions about specific phrases or sentences within it. Choose the most effective revision.',
      questions: [
        {
          id: 'sat3-wl-1', type: 'mcq',
          passage:
            "Tool libraries, where residents borrow equipment instead of buying it outright, have spread to dozens of cities in recent years. Originally created to reduce the cost of home repairs, they have expanded, into spaces that host repair workshops and skill-sharing classes for members. A membership survey conducted last year found that most members reported completing at least one home project they would otherwise have postponed indefinitely. City governments, initially hesitant to fund what seemed like a niche service, have gradually begun offering small grants to help tool libraries expand their inventories and open additional locations.",
          prompt: 'Which choice best corrects the underlined portion, "expanded, into spaces that host"?',
          options: ['expanded, into spaces that host', 'expanded into spaces that host', 'expanded into, spaces that host', 'expanded; into spaces that host'],
          correctIndex: 1,
        },
        {
          id: 'sat3-wl-2', type: 'mcq',
          passage:
            "Tool libraries, where residents borrow equipment instead of buying it outright, have spread to dozens of cities in recent years. Originally created to reduce the cost of home repairs, they have expanded, into spaces that host repair workshops and skill-sharing classes for members. A membership survey conducted last year found that most members reported completing at least one home project they would otherwise have postponed indefinitely. City governments, initially hesitant to fund what seemed like a niche service, have gradually begun offering small grants to help tool libraries expand their inventories and open additional locations.",
          prompt: 'The writer wants to add a sentence describing the tool library\'s original, narrower purpose before its expansion. The best place for such a sentence is',
          options: ['Before the first sentence', 'Immediately after the first sentence', 'Immediately after the survey statistic', 'At the very end of the passage'],
          correctIndex: 1,
        },
        {
          id: 'sat3-wl-3', type: 'mcq',
          passage:
            "Tool libraries, where residents borrow equipment instead of buying it outright, have spread to dozens of cities in recent years. Originally created to reduce the cost of home repairs, they have expanded, into spaces that host repair workshops and skill-sharing classes for members. A membership survey conducted last year found that most members reported completing at least one home project they would otherwise have postponed indefinitely. City governments, initially hesitant to fund what seemed like a niche service, have gradually begun offering small grants to help tool libraries expand their inventories and open additional locations.",
          prompt: 'Which choice most effectively maintains the passage\'s focus, given the survey sentence?',
          options: ['The sentence should stay exactly as is.', 'The survey statistic should be deleted, since it is irrelevant.', 'The survey statistic should be moved to the very beginning of the passage.', 'The word "last" should be removed for precision.'],
          correctIndex: 0,
        },
        {
          id: 'sat3-wl-4', type: 'mcq',
          passage:
            "Tool libraries, where residents borrow equipment instead of buying it outright, have spread to dozens of cities in recent years. Originally created to reduce the cost of home repairs, they have expanded, into spaces that host repair workshops and skill-sharing classes for members. A membership survey conducted last year found that most members reported completing at least one home project they would otherwise have postponed indefinitely. City governments, initially hesitant to fund what seemed like a niche service, have gradually begun offering small grants to help tool libraries expand their inventories and open additional locations.",
          prompt: 'Which choice best replaces "initially hesitant to fund what seemed like a niche service" while preserving the sentence\'s meaning most concisely?',
          options: ['initially hesitant to fund what seemed like a niche service', 'who did not, at first, want to give funding to what they saw as a service that was fairly niche', 'initially hesitant', 'hesitant, at least in the beginning, about funding what was a niche service'],
          correctIndex: 0,
        },
        {
          id: 'sat3-wl-5', type: 'mcq',
          passage:
            "Tool libraries, where residents borrow equipment instead of buying it outright, have spread to dozens of cities in recent years. Originally created to reduce the cost of home repairs, they have expanded, into spaces that host repair workshops and skill-sharing classes for members. A membership survey conducted last year found that most members reported completing at least one home project they would otherwise have postponed indefinitely. City governments, initially hesitant to fund what seemed like a niche service, have gradually begun offering small grants to help tool libraries expand their inventories and open additional locations.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To criticize city governments for underfunding libraries', 'To describe how tool libraries evolved and gained institutional support', 'To argue that all cities need tool libraries', 'To compare tool libraries in different countries'],
          correctIndex: 1,
        },
        {
          id: 'sat3-wl-6', type: 'mcq',
          passage:
            "Real-time translation apps have changed how small businesses serve non-native-speaking customers. A decade ago, most shopkeepers relied on printed phrase cards, hand gestures, and the occasional bilingual employee, today, many businesses instead hand customers a phone running a translation app that converts spoken conversation nearly instantly. This shift has made everyday transactions smoother for both parties, but it has also introduced new failure points, since a mistranslated phrase in a medical or legal context can cause serious confusion. Accuracy varies enormously between apps, and experienced translators generally advise business owners to verify critical phrases in advance rather than trusting live translation entirely, several translators interviewed for this piece noted that over-relying on an app during a sensitive conversation can create problems that are hard to undo.",
          prompt: 'Which choice best corrects the underlined portion, "bilingual employee, today"?',
          options: ['bilingual employee, today', 'bilingual employee; today', 'bilingual employee today', 'bilingual employee, and today'],
          correctIndex: 1,
        },
        {
          id: 'sat3-wl-7', type: 'mcq',
          passage:
            "Real-time translation apps have changed how small businesses serve non-native-speaking customers. A decade ago, most shopkeepers relied on printed phrase cards, hand gestures, and the occasional bilingual employee, today, many businesses instead hand customers a phone running a translation app that converts spoken conversation nearly instantly. This shift has made everyday transactions smoother for both parties, but it has also introduced new failure points, since a mistranslated phrase in a medical or legal context can cause serious confusion. Accuracy varies enormously between apps, and experienced translators generally advise business owners to verify critical phrases in advance rather than trusting live translation entirely, several translators interviewed for this piece noted that over-relying on an app during a sensitive conversation can create problems that are hard to undo.",
          prompt: 'Which choice best corrects the underlined portion, "trusting live translation entirely, several translators"?',
          options: ['trusting live translation entirely, several translators', 'trusting live translation entirely. Several translators', 'trusting live translation entirely several translators', 'trusting, live translation entirely, several translators'],
          correctIndex: 1,
        },
        {
          id: 'sat3-wl-8', type: 'mcq',
          passage:
            "Real-time translation apps have changed how small businesses serve non-native-speaking customers. A decade ago, most shopkeepers relied on printed phrase cards, hand gestures, and the occasional bilingual employee, today, many businesses instead hand customers a phone running a translation app that converts spoken conversation nearly instantly. This shift has made everyday transactions smoother for both parties, but it has also introduced new failure points, since a mistranslated phrase in a medical or legal context can cause serious confusion. Accuracy varies enormously between apps, and experienced translators generally advise business owners to verify critical phrases in advance rather than trusting live translation entirely, several translators interviewed for this piece noted that over-relying on an app during a sensitive conversation can create problems that are hard to undo.",
          prompt: 'According to the passage, what is one downside of relying on translation apps?',
          options: ['Businesses can no longer serve customers', 'Mistranslated phrases can cause serious confusion in sensitive contexts', 'Phrase cards are now required by law', 'Apps have completely replaced all employees'],
          correctIndex: 1,
        },
        {
          id: 'sat3-wl-9', type: 'mcq',
          passage:
            "Real-time translation apps have changed how small businesses serve non-native-speaking customers. A decade ago, most shopkeepers relied on printed phrase cards, hand gestures, and the occasional bilingual employee, today, many businesses instead hand customers a phone running a translation app that converts spoken conversation nearly instantly. This shift has made everyday transactions smoother for both parties, but it has also introduced new failure points, since a mistranslated phrase in a medical or legal context can cause serious confusion. Accuracy varies enormously between apps, and experienced translators generally advise business owners to verify critical phrases in advance rather than trusting live translation entirely, several translators interviewed for this piece noted that over-relying on an app during a sensitive conversation can create problems that are hard to undo.",
          prompt: 'Which choice best replaces "verify critical phrases in advance" with the most concise, equally clear alternative?',
          options: ['verify critical phrases in advance', 'engage in the advance verification of phrases that are critical', 'verify phrases', 'carefully check, ahead of time, phrases that matter most'],
          correctIndex: 0,
        },
        {
          id: 'sat3-wl-10', type: 'mcq',
          passage:
            "Real-time translation apps have changed how small businesses serve non-native-speaking customers. A decade ago, most shopkeepers relied on printed phrase cards, hand gestures, and the occasional bilingual employee, today, many businesses instead hand customers a phone running a translation app that converts spoken conversation nearly instantly. This shift has made everyday transactions smoother for both parties, but it has also introduced new failure points, since a mistranslated phrase in a medical or legal context can cause serious confusion. Accuracy varies enormously between apps, and experienced translators generally advise business owners to verify critical phrases in advance rather than trusting live translation entirely, several translators interviewed for this piece noted that over-relying on an app during a sensitive conversation can create problems that are hard to undo.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To discourage businesses from serving non-native speakers', 'To explain how translation apps have changed small businesses, for better and worse', 'To compare translation apps to human translators exclusively', 'To list specific apps by name'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'math-no-calc',
      title: 'Math — No Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 13 * 60,
      instructions: 'No calculator allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat3-mnc-1', type: 'mcq', prompt: 'If 6x − 5 = 19, what is the value of x?', options: ['3', '4', '5', '24'], correctIndex: 1 },
        { id: 'sat3-mnc-2', type: 'mcq', prompt: 'Simplify: (4x − 1)(x + 2)', options: ['4x² + 7x − 2', '4x² − 7x − 2', '4x² + 9x − 2', '4x² + 7x + 2'], correctIndex: 0 },
        { id: 'sat3-mnc-3', type: 'mcq', prompt: 'If x² = 64 and x < 0, what is the value of x?', options: ['8', '−8', '0', '64'], correctIndex: 1 },
        { id: 'sat3-mnc-4', type: 'mcq', prompt: 'What is the slope of the line 2x + 4y = 8?', options: ['−1/2', '1/2', '2', '−2'], correctIndex: 0 },
        { id: 'sat3-mnc-5', type: 'mcq', prompt: 'If f(x) = x² + 3 and g(x) = 2x − 1, what is f(g(2))?', options: ['7', '9', '12', '15'], correctIndex: 2 },
        { id: 'sat3-mnc-6', type: 'mcq', prompt: 'Solve for x: 4(x − 1) = 2(x + 5)', options: ['7', '−7', '5', '−5'], correctIndex: 0 },
        { id: 'sat3-mnc-7', type: 'mcq', prompt: 'What is the value of (2⁴)(2¹)?', options: ['16', '32', '64', '8'], correctIndex: 1 },
        { id: 'sat3-mnc-8', type: 'mcq', prompt: 'If 3/x = 6/8, what is the value of x?', options: ['2', '3', '4', '6'], correctIndex: 2 },
        { id: 'sat3-mnc-9', type: 'mcq', prompt: 'A line has a slope of 4 and passes through (0, −1). What is its equation?', options: ['y = 4x − 1', 'y = −1x + 4', 'y = 4x + 1', 'y = −4x − 1'], correctIndex: 0 },
        { id: 'sat3-mnc-10', type: 'mcq', prompt: 'Factor completely: x² − 25', options: ['(x − 5)(x − 5)', '(x + 5)(x − 5)', '(x + 25)(x − 1)', 'Cannot be factored'], correctIndex: 1 },
      ],
    },
    {
      key: 'math-calc',
      title: 'Math — Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'A calculator is allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat3-mc-1', type: 'mcq', prompt: 'A car travels 210 miles using 7 gallons of gas. At this rate, how many miles can it travel on 9 gallons?', options: ['240', '260', '270', '290'], correctIndex: 2 },
        { id: 'sat3-mc-2', type: 'mcq', prompt: 'A survey of 600 people found that 35% prefer aisle seats. How many people prefer aisle seats?', options: ['180', '200', '210', '220'], correctIndex: 2 },
        { id: 'sat3-mc-3', type: 'mcq', prompt: 'The population of a town grows according to P(t) = 1200(1.05)^t, where t is in years. What is the population after 2 years, rounded to the nearest whole number?', options: ['1260', '1300', '1323', '1200'], correctIndex: 2 },
        { id: 'sat3-mc-4', type: 'mcq', prompt: 'A rectangle has a perimeter of 50 and a length four times its width. What is the width?', options: ['4', '5', '6', '10'], correctIndex: 1 },
        { id: 'sat3-mc-5', type: 'mcq', prompt: 'If the mean of five numbers is 20, and four of the numbers are 15, 18, 22, and 25, what is the fifth number?', options: ['18', '19', '20', '22'], correctIndex: 2 },
        { id: 'sat3-mc-6', type: 'mcq', prompt: 'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?', options: ['12', '13', '14', '15'], correctIndex: 1 },
        { id: 'sat3-mc-7', type: 'mcq', prompt: "A store marks up an item's wholesale price of $80 by 25% to set the retail price. What is the retail price?", options: ['$90', '$95', '$100', '$105'], correctIndex: 2 },
        { id: 'sat3-mc-8', type: 'mcq', prompt: 'In a bag of 60 marbles, the ratio of blue to green marbles is 2:3. How many blue marbles are there?', options: ['20', '24', '30', '36'], correctIndex: 1 },
        { id: 'sat3-mc-9', type: 'mcq', prompt: 'A circle has an area of 64π. What is its circumference?', options: ['8π', '16π', '32π', '64π'], correctIndex: 1 },
        { id: 'sat3-mc-10', type: 'mcq', prompt: 'The table below shows test scores for 30 students: 8 scored 65, 12 scored 80, 10 scored 95. What is the mean score, rounded to the nearest whole number?', options: ['79', '80', '81', '83'], correctIndex: 2 },
        { id: 'sat3-mc-11', type: 'mcq', prompt: 'If 4x + y = 18 and x = 3, what is the value of y?', options: ['4', '5', '6', '8'], correctIndex: 2 },
        { id: 'sat3-mc-12', type: 'mcq', prompt: 'An investment grows in value by 10% per year. If it is worth $5,000 today, what will it be worth after 1 year?', options: ['$5,200', '$5,500', '$5,800', '$6,000'], correctIndex: 1 },
        { id: 'sat3-mc-13', type: 'mcq', prompt: 'What is 40% of 150?', options: ['50', '55', '60', '65'], correctIndex: 2 },
        { id: 'sat3-mc-14', type: 'mcq', prompt: 'A cylinder has a radius of 2 and a height of 9. What is its volume, in terms of π?', options: ['18π', '27π', '36π', '45π'], correctIndex: 2 },
        { id: 'sat3-mc-15', type: 'mcq', prompt: 'If an item originally priced at $120 is on sale for $90, what percent discount was applied?', options: ['20%', '25%', '30%', '35%'], correctIndex: 1 },
      ],
    },
  ],
};

const test4: AuthoredTest = {
  title: 'SAT Practice Test 4',
  order: 3,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 25 * 60,
      instructions: 'Each passage is followed by several questions. Read the whole passage before answering.',
      questions: [
        {
          id: 'sat4-r-1', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Imane had played the same seat in the orchestra's second violin section for twenty-two years, and she had assumed, without ever quite deciding it, that she would keep playing it until her hands simply could not anymore. It was the conductor's ordinary request — one more run-through of a passage they had rehearsed a hundred times — that unsettled something. She lifted her bow and found, for the first time she could name, that she did not want to play the passage again; not because she disliked the music, but because she no longer needed to prove, to herself or to the empty seats beyond the stage lights, that she belonged there. The wanting to belong had quietly finished sometime in the last year without announcing itself, the way a candle burns down past the point anyone is still watching it. She played the passage anyway, cleanly, professionally, the way she had played ten thousand passages before it, and understood, somewhere under the music, that this competence without hunger was itself a kind of answer. At the interval, she found the orchestra's administrator and asked, quietly, about retirement paperwork.",
          prompt: 'The main effect of the passage is to convey',
          options: ['Her anger at the conductor', 'A quiet realization that she no longer needs to prove she belongs', 'A detailed description of an orchestra hall', 'An argument that orchestras rehearse too much'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-2', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Imane had played the same seat in the orchestra's second violin section for twenty-two years, and she had assumed, without ever quite deciding it, that she would keep playing it until her hands simply could not anymore. It was the conductor's ordinary request — one more run-through of a passage they had rehearsed a hundred times — that unsettled something. She lifted her bow and found, for the first time she could name, that she did not want to play the passage again; not because she disliked the music, but because she no longer needed to prove, to herself or to the empty seats beyond the stage lights, that she belonged there. The wanting to belong had quietly finished sometime in the last year without announcing itself, the way a candle burns down past the point anyone is still watching it. She played the passage anyway, cleanly, professionally, the way she had played ten thousand passages before it, and understood, somewhere under the music, that this competence without hunger was itself a kind of answer. At the interval, she found the orchestra's administrator and asked, quietly, about retirement paperwork.",
          prompt: 'As used in the passage, "unsettled" most nearly means',
          options: ['Calmed completely', 'Disturbed or disrupted', 'Financially compensated', 'Physically moved a seat'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-3', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Imane had played the same seat in the orchestra's second violin section for twenty-two years, and she had assumed, without ever quite deciding it, that she would keep playing it until her hands simply could not anymore. It was the conductor's ordinary request — one more run-through of a passage they had rehearsed a hundred times — that unsettled something. She lifted her bow and found, for the first time she could name, that she did not want to play the passage again; not because she disliked the music, but because she no longer needed to prove, to herself or to the empty seats beyond the stage lights, that she belonged there. The wanting to belong had quietly finished sometime in the last year without announcing itself, the way a candle burns down past the point anyone is still watching it. She played the passage anyway, cleanly, professionally, the way she had played ten thousand passages before it, and understood, somewhere under the music, that this competence without hunger was itself a kind of answer. At the interval, she found the orchestra's administrator and asked, quietly, about retirement paperwork.",
          prompt: 'Why does Imane ask about retirement paperwork at the interval?',
          options: ['She is unhappy with her pay', 'She has realized she no longer needs to prove she belongs and is ready to stop', 'She wants a different seat', 'She missed her entrance'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-4', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Imane had played the same seat in the orchestra's second violin section for twenty-two years, and she had assumed, without ever quite deciding it, that she would keep playing it until her hands simply could not anymore. It was the conductor's ordinary request — one more run-through of a passage they had rehearsed a hundred times — that unsettled something. She lifted her bow and found, for the first time she could name, that she did not want to play the passage again; not because she disliked the music, but because she no longer needed to prove, to herself or to the empty seats beyond the stage lights, that she belonged there. The wanting to belong had quietly finished sometime in the last year without announcing itself, the way a candle burns down past the point anyone is still watching it. She played the passage anyway, cleanly, professionally, the way she had played ten thousand passages before it, and understood, somewhere under the music, that this competence without hunger was itself a kind of answer. At the interval, she found the orchestra's administrator and asked, quietly, about retirement paperwork.",
          prompt: 'The comparison "the way a candle burns down past the point anyone is still watching it" emphasizes that Imane\'s desire to belong',
          options: ['Ended suddenly and dramatically', 'Faded gradually and unnoticed, even by her', 'Was reignited that evening', 'Never actually existed'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-5', type: 'mcq',
          passage:
            "The following passage is adapted from a short story. Imane had played the same seat in the orchestra's second violin section for twenty-two years, and she had assumed, without ever quite deciding it, that she would keep playing it until her hands simply could not anymore. It was the conductor's ordinary request — one more run-through of a passage they had rehearsed a hundred times — that unsettled something. She lifted her bow and found, for the first time she could name, that she did not want to play the passage again; not because she disliked the music, but because she no longer needed to prove, to herself or to the empty seats beyond the stage lights, that she belonged there. The wanting to belong had quietly finished sometime in the last year without announcing itself, the way a candle burns down past the point anyone is still watching it. She played the passage anyway, cleanly, professionally, the way she had played ten thousand passages before it, and understood, somewhere under the music, that this competence without hunger was itself a kind of answer. At the interval, she found the orchestra's administrator and asked, quietly, about retirement paperwork.",
          prompt: 'It can reasonably be inferred that before this rehearsal, Imane',
          options: ['Had never performed the passage before', 'Had not consciously noticed her motivation had changed', 'Disliked her fellow musicians', 'Planned to quit the orchestra suddenly'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-6', type: 'mcq',
          passage:
            "Each autumn, deciduous trees across temperate regions undergo a coordinated color change that is less a single event than the unmasking of pigments that were present all along. Chlorophyll, the pigment responsible for a leaf's green color during the growing season, is produced continuously through spring and summer but breaks down quickly once daylight hours shorten and temperatures drop, since maintaining it costs the tree more energy than the shortened days can supply through photosynthesis. As chlorophyll degrades, it stops masking other pigments — carotenoids, which produce yellow and orange, and in some species anthocyanins, which produce red and purple — that had been present in the leaf throughout the season but were simply overwhelmed by the far more abundant green chlorophyll. Unlike carotenoids, anthocyanins are actively produced in autumn rather than merely unmasked, and their production appears to increase in years with bright, cool autumn days, which is part of why fall colors vary noticeably from one year to the next. Once both pigment types eventually break down as well, only brown tannins remain, and the tree, having reabsorbed what nutrients it can from the dying leaf, releases it to fall.",
          prompt: 'What does the passage mainly explain?',
          options: ['Trees produce no pigments except chlorophyll', 'How the breakdown of chlorophyll reveals and triggers other leaf pigments each autumn', 'That leaf color has no relationship to weather', 'That anthocyanins are present year-round in large amounts'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-7', type: 'mcq',
          passage:
            "Each autumn, deciduous trees across temperate regions undergo a coordinated color change that is less a single event than the unmasking of pigments that were present all along. Chlorophyll, the pigment responsible for a leaf's green color during the growing season, is produced continuously through spring and summer but breaks down quickly once daylight hours shorten and temperatures drop, since maintaining it costs the tree more energy than the shortened days can supply through photosynthesis. As chlorophyll degrades, it stops masking other pigments — carotenoids, which produce yellow and orange, and in some species anthocyanins, which produce red and purple — that had been present in the leaf throughout the season but were simply overwhelmed by the far more abundant green chlorophyll. Unlike carotenoids, anthocyanins are actively produced in autumn rather than merely unmasked, and their production appears to increase in years with bright, cool autumn days, which is part of why fall colors vary noticeably from one year to the next. Once both pigment types eventually break down as well, only brown tannins remain, and the tree, having reabsorbed what nutrients it can from the dying leaf, releases it to fall.",
          prompt: 'According to the passage, why does chlorophyll break down in autumn?',
          options: ['Trees intentionally poison it', 'Maintaining it costs more energy than shortened days can supply', 'Insects consume it', 'It is replaced immediately by anthocyanins'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-8', type: 'mcq',
          passage:
            "Each autumn, deciduous trees across temperate regions undergo a coordinated color change that is less a single event than the unmasking of pigments that were present all along. Chlorophyll, the pigment responsible for a leaf's green color during the growing season, is produced continuously through spring and summer but breaks down quickly once daylight hours shorten and temperatures drop, since maintaining it costs the tree more energy than the shortened days can supply through photosynthesis. As chlorophyll degrades, it stops masking other pigments — carotenoids, which produce yellow and orange, and in some species anthocyanins, which produce red and purple — that had been present in the leaf throughout the season but were simply overwhelmed by the far more abundant green chlorophyll. Unlike carotenoids, anthocyanins are actively produced in autumn rather than merely unmasked, and their production appears to increase in years with bright, cool autumn days, which is part of why fall colors vary noticeably from one year to the next. Once both pigment types eventually break down as well, only brown tannins remain, and the tree, having reabsorbed what nutrients it can from the dying leaf, releases it to fall.",
          prompt: 'As used in the passage, "unmasking" most nearly means',
          options: ['Concealing', 'Revealing something that was already present', 'Destroying permanently', 'Creating from nothing'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-9', type: 'mcq',
          passage:
            "Each autumn, deciduous trees across temperate regions undergo a coordinated color change that is less a single event than the unmasking of pigments that were present all along. Chlorophyll, the pigment responsible for a leaf's green color during the growing season, is produced continuously through spring and summer but breaks down quickly once daylight hours shorten and temperatures drop, since maintaining it costs the tree more energy than the shortened days can supply through photosynthesis. As chlorophyll degrades, it stops masking other pigments — carotenoids, which produce yellow and orange, and in some species anthocyanins, which produce red and purple — that had been present in the leaf throughout the season but were simply overwhelmed by the far more abundant green chlorophyll. Unlike carotenoids, anthocyanins are actively produced in autumn rather than merely unmasked, and their production appears to increase in years with bright, cool autumn days, which is part of why fall colors vary noticeably from one year to the next. Once both pigment types eventually break down as well, only brown tannins remain, and the tree, having reabsorbed what nutrients it can from the dying leaf, releases it to fall.",
          prompt: 'According to the passage, what distinguishes anthocyanins from carotenoids?',
          options: ['Anthocyanins are unmasked, not produced, in autumn', 'Anthocyanins are actively produced in autumn rather than merely unmasked', 'Carotenoids only appear in spring', 'Carotenoids are never present in leaves'],
          correctIndex: 1,
        },
        {
          id: 'sat4-r-10', type: 'mcq',
          passage:
            "Each autumn, deciduous trees across temperate regions undergo a coordinated color change that is less a single event than the unmasking of pigments that were present all along. Chlorophyll, the pigment responsible for a leaf's green color during the growing season, is produced continuously through spring and summer but breaks down quickly once daylight hours shorten and temperatures drop, since maintaining it costs the tree more energy than the shortened days can supply through photosynthesis. As chlorophyll degrades, it stops masking other pigments — carotenoids, which produce yellow and orange, and in some species anthocyanins, which produce red and purple — that had been present in the leaf throughout the season but were simply overwhelmed by the far more abundant green chlorophyll. Unlike carotenoids, anthocyanins are actively produced in autumn rather than merely unmasked, and their production appears to increase in years with bright, cool autumn days, which is part of why fall colors vary noticeably from one year to the next. Once both pigment types eventually break down as well, only brown tannins remain, and the tree, having reabsorbed what nutrients it can from the dying leaf, releases it to fall.",
          prompt: "What does the passage suggest determines the vividness of a given year's fall colors?",
          options: ["The tree's exact age", 'Weather conditions such as bright, cool autumn days affecting anthocyanin production', 'The amount of rainfall in summer only', 'It is entirely random and unpredictable'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing-language',
      title: 'Writing and Language',
      type: 'writing',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Each passage is followed by questions about specific phrases or sentences within it. Choose the most effective revision.',
      questions: [
        {
          id: 'sat4-wl-1', type: 'mcq',
          passage:
            "Repair cafés, informal events where volunteers help neighbors fix broken household items instead of discarding them, have spread across many communities in recent years. Originally organized to keep small appliances out of landfills, they have grown, into recurring social gatherings that bring together people who might never otherwise meet. A survey of attendees at several repair cafés found that most participants returned at least once after their first visit, citing the social atmosphere as much as the practical help. Municipal waste departments, initially unsure whether the events would meaningfully reduce landfill volume, have in recent years begun promoting repair cafés directly, listing upcoming events on official city calendars.",
          prompt: 'Which choice best corrects the underlined portion, "grown, into recurring social gatherings"?',
          options: ['grown, into recurring social gatherings', 'grown into recurring social gatherings', 'grown into, recurring social gatherings', 'grown; into recurring social gatherings'],
          correctIndex: 1,
        },
        {
          id: 'sat4-wl-2', type: 'mcq',
          passage:
            "Repair cafés, informal events where volunteers help neighbors fix broken household items instead of discarding them, have spread across many communities in recent years. Originally organized to keep small appliances out of landfills, they have grown, into recurring social gatherings that bring together people who might never otherwise meet. A survey of attendees at several repair cafés found that most participants returned at least once after their first visit, citing the social atmosphere as much as the practical help. Municipal waste departments, initially unsure whether the events would meaningfully reduce landfill volume, have in recent years begun promoting repair cafés directly, listing upcoming events on official city calendars.",
          prompt: 'The writer wants to add a sentence describing the repair café\'s original, narrower purpose before its broader impact. The best place for such a sentence is',
          options: ['Before the first sentence', 'Immediately after the first sentence', 'Immediately after the survey statistic', 'At the very end of the passage'],
          correctIndex: 1,
        },
        {
          id: 'sat4-wl-3', type: 'mcq',
          passage:
            "Repair cafés, informal events where volunteers help neighbors fix broken household items instead of discarding them, have spread across many communities in recent years. Originally organized to keep small appliances out of landfills, they have grown, into recurring social gatherings that bring together people who might never otherwise meet. A survey of attendees at several repair cafés found that most participants returned at least once after their first visit, citing the social atmosphere as much as the practical help. Municipal waste departments, initially unsure whether the events would meaningfully reduce landfill volume, have in recent years begun promoting repair cafés directly, listing upcoming events on official city calendars.",
          prompt: 'Which choice most effectively maintains the passage\'s focus, given the survey sentence?',
          options: ['The sentence should stay exactly as is.', 'The survey statistic should be deleted, since it is irrelevant.', 'The survey statistic should be moved to the very beginning of the passage.', 'The word "several" should be removed for precision.'],
          correctIndex: 0,
        },
        {
          id: 'sat4-wl-4', type: 'mcq',
          passage:
            "Repair cafés, informal events where volunteers help neighbors fix broken household items instead of discarding them, have spread across many communities in recent years. Originally organized to keep small appliances out of landfills, they have grown, into recurring social gatherings that bring together people who might never otherwise meet. A survey of attendees at several repair cafés found that most participants returned at least once after their first visit, citing the social atmosphere as much as the practical help. Municipal waste departments, initially unsure whether the events would meaningfully reduce landfill volume, have in recent years begun promoting repair cafés directly, listing upcoming events on official city calendars.",
          prompt: 'Which choice best replaces "initially unsure whether the events would meaningfully reduce landfill volume" while preserving the sentence\'s meaning most concisely?',
          options: ['initially unsure whether the events would meaningfully reduce landfill volume', 'who did not know, at first, whether or not the events were going to end up meaningfully reducing the volume of landfills', 'initially unsure', 'unsure, at least in the beginning, about whether landfill volume would be meaningfully reduced'],
          correctIndex: 0,
        },
        {
          id: 'sat4-wl-5', type: 'mcq',
          passage:
            "Repair cafés, informal events where volunteers help neighbors fix broken household items instead of discarding them, have spread across many communities in recent years. Originally organized to keep small appliances out of landfills, they have grown, into recurring social gatherings that bring together people who might never otherwise meet. A survey of attendees at several repair cafés found that most participants returned at least once after their first visit, citing the social atmosphere as much as the practical help. Municipal waste departments, initially unsure whether the events would meaningfully reduce landfill volume, have in recent years begun promoting repair cafés directly, listing upcoming events on official city calendars.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To criticize municipal waste departments for being slow', 'To describe how repair cafés evolved and gained institutional support', 'To argue that all cities need repair cafés', 'To compare repair cafés in different countries'],
          correctIndex: 1,
        },
        {
          id: 'sat4-wl-6', type: 'mcq',
          passage:
            "Rural co-working spaces have grown steadily as remote work has become more common outside major cities. A decade ago, most people working remotely from small towns worked from home offices or local coffee shops, today, a growing number instead choose a dedicated co-working space with reliable high-speed internet and a professional setting. This shift has kept more remote workers' spending within their local economies, but it has also raised new questions about long-term demand, since a co-working space in a small town can rarely rely on the sheer volume of members that a city location would attract. Membership prices vary enormously between spaces, and experienced operators generally advise newcomers to plan for slower growth than urban competitors, several operators interviewed for this piece noted that overestimating early membership numbers can strain a space's finances quickly.",
          prompt: 'Which choice best corrects the underlined portion, "coffee shops, today"?',
          options: ['coffee shops, today', 'coffee shops; today', 'coffee shops today', 'coffee shops, and today'],
          correctIndex: 1,
        },
        {
          id: 'sat4-wl-7', type: 'mcq',
          passage:
            "Rural co-working spaces have grown steadily as remote work has become more common outside major cities. A decade ago, most people working remotely from small towns worked from home offices or local coffee shops, today, a growing number instead choose a dedicated co-working space with reliable high-speed internet and a professional setting. This shift has kept more remote workers' spending within their local economies, but it has also raised new questions about long-term demand, since a co-working space in a small town can rarely rely on the sheer volume of members that a city location would attract. Membership prices vary enormously between spaces, and experienced operators generally advise newcomers to plan for slower growth than urban competitors, several operators interviewed for this piece noted that overestimating early membership numbers can strain a space's finances quickly.",
          prompt: 'Which choice best corrects the underlined portion, "plan for slower growth than urban competitors, several operators"?',
          options: ['plan for slower growth than urban competitors, several operators', 'plan for slower growth than urban competitors. Several operators', 'plan for slower growth than urban competitors several operators', 'plan, for slower growth than urban competitors, several operators'],
          correctIndex: 1,
        },
        {
          id: 'sat4-wl-8', type: 'mcq',
          passage:
            "Rural co-working spaces have grown steadily as remote work has become more common outside major cities. A decade ago, most people working remotely from small towns worked from home offices or local coffee shops, today, a growing number instead choose a dedicated co-working space with reliable high-speed internet and a professional setting. This shift has kept more remote workers' spending within their local economies, but it has also raised new questions about long-term demand, since a co-working space in a small town can rarely rely on the sheer volume of members that a city location would attract. Membership prices vary enormously between spaces, and experienced operators generally advise newcomers to plan for slower growth than urban competitors, several operators interviewed for this piece noted that overestimating early membership numbers can strain a space's finances quickly.",
          prompt: 'According to the passage, what is one challenge facing rural co-working spaces?',
          options: ['They cannot get internet access', 'They can rarely rely on the member volume that a city location would attract', 'Remote work has become illegal', 'They are always more expensive than urban spaces'],
          correctIndex: 1,
        },
        {
          id: 'sat4-wl-9', type: 'mcq',
          passage:
            "Rural co-working spaces have grown steadily as remote work has become more common outside major cities. A decade ago, most people working remotely from small towns worked from home offices or local coffee shops, today, a growing number instead choose a dedicated co-working space with reliable high-speed internet and a professional setting. This shift has kept more remote workers' spending within their local economies, but it has also raised new questions about long-term demand, since a co-working space in a small town can rarely rely on the sheer volume of members that a city location would attract. Membership prices vary enormously between spaces, and experienced operators generally advise newcomers to plan for slower growth than urban competitors, several operators interviewed for this piece noted that overestimating early membership numbers can strain a space's finances quickly.",
          prompt: 'Which choice best replaces "plan for slower growth than urban competitors" with the most concise, equally clear alternative?',
          options: ['plan for slower growth than urban competitors', 'engage in planning that takes into account growth that is slower than that of urban competitors', 'plan for growth', 'carefully plan, in advance, for growth that will be slower than in urban areas'],
          correctIndex: 0,
        },
        {
          id: 'sat4-wl-10', type: 'mcq',
          passage:
            "Rural co-working spaces have grown steadily as remote work has become more common outside major cities. A decade ago, most people working remotely from small towns worked from home offices or local coffee shops, today, a growing number instead choose a dedicated co-working space with reliable high-speed internet and a professional setting. This shift has kept more remote workers' spending within their local economies, but it has also raised new questions about long-term demand, since a co-working space in a small town can rarely rely on the sheer volume of members that a city location would attract. Membership prices vary enormously between spaces, and experienced operators generally advise newcomers to plan for slower growth than urban competitors, several operators interviewed for this piece noted that overestimating early membership numbers can strain a space's finances quickly.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To discourage remote workers from moving to small towns', 'To explain how rural co-working spaces have grown and the challenges they face', 'To compare co-working to working from home exclusively', 'To list specific co-working spaces by name'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'math-no-calc',
      title: 'Math — No Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 13 * 60,
      instructions: 'No calculator allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat4-mnc-1', type: 'mcq', prompt: 'If 7x − 2 = 26, what is the value of x?', options: ['2', '3', '4', '28'], correctIndex: 2 },
        { id: 'sat4-mnc-2', type: 'mcq', prompt: 'Simplify: (5x − 2)(x + 3)', options: ['5x² + 13x − 6', '5x² − 13x − 6', '5x² + 17x − 6', '5x² + 13x + 6'], correctIndex: 0 },
        { id: 'sat4-mnc-3', type: 'mcq', prompt: 'If x² = 100 and x < 0, what is the value of x?', options: ['10', '−10', '0', '100'], correctIndex: 1 },
        { id: 'sat4-mnc-4', type: 'mcq', prompt: 'What is the slope of the line 6x + 3y = 9?', options: ['−2', '2', '3', '−3'], correctIndex: 0 },
        { id: 'sat4-mnc-5', type: 'mcq', prompt: 'If f(x) = x² − 1 and g(x) = x + 2, what is f(g(1))?', options: ['3', '7', '8', '9'], correctIndex: 2 },
        { id: 'sat4-mnc-6', type: 'mcq', prompt: 'Solve for x: 5(x − 1) = 3(x + 3)', options: ['7', '−7', '2', '−2'], correctIndex: 0 },
        { id: 'sat4-mnc-7', type: 'mcq', prompt: 'What is the value of (3³)(3¹)?', options: ['27', '81', '243', '9'], correctIndex: 1 },
        { id: 'sat4-mnc-8', type: 'mcq', prompt: 'If 4/x = 8/6, what is the value of x?', options: ['2', '3', '4', '6'], correctIndex: 1 },
        { id: 'sat4-mnc-9', type: 'mcq', prompt: 'A line has a slope of −3 and passes through (0, 4). What is its equation?', options: ['y = −3x + 4', 'y = 4x − 3', 'y = −3x − 4', 'y = 3x + 4'], correctIndex: 0 },
        { id: 'sat4-mnc-10', type: 'mcq', prompt: 'Factor completely: x² − 36', options: ['(x − 6)(x − 6)', '(x + 6)(x − 6)', '(x + 36)(x − 1)', 'Cannot be factored'], correctIndex: 1 },
      ],
    },
    {
      key: 'math-calc',
      title: 'Math — Calculator',
      type: 'math',
      graded: true,
      durationSeconds: 22 * 60,
      instructions: 'A calculator is allowed for this section. Choose the best answer.',
      questions: [
        { id: 'sat4-mc-1', type: 'mcq', prompt: 'A car travels 270 miles using 9 gallons of gas. At this rate, how many miles can it travel on 5 gallons?', options: ['120', '140', '150', '160'], correctIndex: 2 },
        { id: 'sat4-mc-2', type: 'mcq', prompt: 'A survey of 800 people found that 15% prefer the morning shift. How many people prefer the morning shift?', options: ['100', '110', '120', '130'], correctIndex: 2 },
        { id: 'sat4-mc-3', type: 'mcq', prompt: 'The population of a town grows according to P(t) = 1800(1.02)^t, where t is in years. What is the population after 2 years, rounded to the nearest whole number?', options: ['1836', '1873', '1900', '1800'], correctIndex: 1 },
        { id: 'sat4-mc-4', type: 'mcq', prompt: 'A rectangle has a perimeter of 60 and a length five times its width. What is the width?', options: ['4', '5', '6', '10'], correctIndex: 1 },
        { id: 'sat4-mc-5', type: 'mcq', prompt: 'If the mean of five numbers is 18, and four of the numbers are 12, 16, 20, and 24, what is the fifth number?', options: ['16', '17', '18', '20'], correctIndex: 2 },
        { id: 'sat4-mc-6', type: 'mcq', prompt: 'A right triangle has legs of length 8 and 15. What is the length of the hypotenuse?', options: ['16', '17', '18', '19'], correctIndex: 1 },
        { id: 'sat4-mc-7', type: 'mcq', prompt: "A store marks up an item's wholesale price of $40 by 50% to set the retail price. What is the retail price?", options: ['$50', '$55', '$60', '$65'], correctIndex: 2 },
        { id: 'sat4-mc-8', type: 'mcq', prompt: 'In a bag of 45 marbles, the ratio of orange to purple marbles is 4:5. How many orange marbles are there?', options: ['15', '20', '25', '30'], correctIndex: 1 },
        { id: 'sat4-mc-9', type: 'mcq', prompt: 'A circle has an area of 100π. What is its circumference?', options: ['10π', '20π', '40π', '100π'], correctIndex: 1 },
        { id: 'sat4-mc-10', type: 'mcq', prompt: 'The table below shows test scores for 40 students: 10 scored 60, 15 scored 75, 15 scored 90. What is the mean score, rounded to the nearest whole number?', options: ['75', '76', '77', '79'], correctIndex: 2 },
        { id: 'sat4-mc-11', type: 'mcq', prompt: 'If 5x + 2y = 24 and x = 4, what is the value of y?', options: ['1', '2', '3', '4'], correctIndex: 1 },
        { id: 'sat4-mc-12', type: 'mcq', prompt: 'A savings account grows in value by 8% per year. If it is worth $2,500 today, what will it be worth after 1 year?', options: ['$2,600', '$2,700', '$2,800', '$2,900'], correctIndex: 1 },
        { id: 'sat4-mc-13', type: 'mcq', prompt: 'What is 60% of 90?', options: ['48', '50', '54', '56'], correctIndex: 2 },
        { id: 'sat4-mc-14', type: 'mcq', prompt: 'A cylinder has a radius of 5 and a height of 4. What is its volume, in terms of π?', options: ['50π', '75π', '100π', '125π'], correctIndex: 2 },
        { id: 'sat4-mc-15', type: 'mcq', prompt: 'If an item originally priced at $200 is on sale for $150, what percent discount was applied?', options: ['15%', '20%', '25%', '30%'], correctIndex: 2 },
      ],
    },
  ],
};

export const sat: TrackContent = { courses, tests: [test1, test2, test3, test4] };
