import type { AuthoredTest, TrackContent } from './types';

const courses: TrackContent['courses'] = [
  {
    title: 'TOEFL iBT: format and scoring overview',
    order: 0,
    sections: [
      {
        heading: 'What the TOEFL iBT measures',
        content:
          "The TOEFL iBT (Internet-Based Test), from ETS, measures how well you can use and understand English at the university level — reading academic texts, following lectures, and producing clear academic writing and speech. Most English-medium universities worldwide accept it for admission. As of the 2026 test redesign, the exam runs about 90 minutes of testing time, with Reading, Listening, Writing, and Speaking always given in that order and no scheduled break between sections.",
      },
      {
        heading: 'The four sections',
        content:
          "Reading presents academic passages (the kind you'd find in an introductory university textbook) followed by comprehension questions covering main ideas, details, inference, and vocabulary in context. Listening presents conversations and lectures, testing your ability to follow spoken academic English — you'll hear each recording only once, exactly as in a real lecture hall. Writing asks you to read a short source text, then produce an integrated response, plus a shorter academic-discussion style response. Speaking asks you to respond verbally to prompts — our practice tests currently focus on Reading, Listening, and Writing, since Speaking requires audio recording and human evaluation infrastructure we haven't built yet.",
      },
      {
        heading: 'Scoring',
        content:
          "Each section is traditionally scored from 0 to 30, for a total of 0 to 120. Starting in 2026, ETS also reports a CEFR-aligned band from 1 to 6 alongside the numeric score during a transition period. Most competitive university programs ask for a total score somewhere between 80 and 100, though requirements vary widely by institution and program — always check the specific threshold your target school lists.",
      },
      {
        heading: 'How to prepare effectively',
        content:
          "Time management is everything on the TOEFL: in Reading, don't reread an entire passage for every question — skim first for structure, then hunt for the specific detail a question asks about. In Listening, take brief notes while you listen (key names, numbers, and the speaker's overall stance) since you can't replay the audio. In Writing, both tasks reward a clear, well-organized structure more than complex vocabulary — a simple five-paragraph structure with a clear thesis, developed examples, and a short conclusion consistently scores well.",
      },
    ],
  },
  {
    title: 'Reading section strategy',
    order: 1,
    sections: [
      {
        heading: 'Passage structure',
        content:
          "Academic passages are usually organized around a single idea developed across several paragraphs, each adding a new example, contrast, or piece of evidence. Before answering questions, spend 30-60 seconds noting what each paragraph is *for* (not what it says in detail) — this mental map saves far more time than a full careful read.",
      },
      {
        heading: 'Common question types',
        content:
          "Detail questions ask about a specific fact stated in the passage — the answer is usually a close paraphrase, not an exact quote, so watch for options that repeat the passage's wording but subtly change its meaning. Inference questions ask what the passage implies without stating directly — the correct answer is always a small, logical step beyond the text, never a big leap. Vocabulary-in-context questions ask what a word means as used in the passage; even if you know a common meaning of the word, always re-check it against the surrounding sentence, since academic texts often use words in a specific technical sense.",
      },
      {
        heading: 'Eliminate before you commit',
        content:
          "For every question, eliminate the options that are clearly false or not mentioned in the passage before comparing what's left. A frequent wrong-answer pattern is an option that is factually true in general but not actually supported by *this* passage — always ask \"does the text say this,\" not \"is this true.\"",
      },
    ],
  },
  {
    title: 'Listening section strategy',
    order: 2,
    sections: [
      {
        heading: 'Conversations vs. lectures',
        content:
          "Listening includes two types of recordings: short conversations (often a student talking to a professor or a campus staff member about a practical problem) and longer academic lectures (a professor explaining a concept, sometimes with student questions). Conversations usually test whether you understood the speaker's *purpose* — why are they talking to this person? Lectures test whether you followed the logical structure of an explanation — the main claim, the examples used to support it, and how ideas connect.",
      },
      {
        heading: 'Take strategic notes',
        content:
          "You'll only hear each recording once, so light note-taking is essential — but don't try to write down every word. Focus on: the main topic (write it down as soon as it's introduced), any list the speaker gives (numbered examples, categories, steps), and shifts in the speaker's argument (listen for signal words like \"however,\" \"but actually,\" \"the real reason is\"). These signal words very often mark exactly the information a question will ask about.",
      },
      {
        heading: 'Answer from what was said, not what you'
          + ' know',
        content:
          "It's tempting to answer a listening question using outside knowledge about the topic, especially for science lectures. Resist this — the correct answer always reflects specifically what the speaker said in that recording, even if it's incomplete or simplified compared to what you might already know.",
      },
    ],
  },
  {
    title: 'Writing section strategy',
    order: 3,
    sections: [
      {
        heading: 'The Integrated Writing task',
        content:
          "You'll read a short academic passage, then read or hear an opposing or complementary viewpoint, and write a response that explains how the two relate — usually where the second source challenges specific points made in the first. The strongest responses don't just summarize both sources separately; they connect each point from the second source directly back to the specific claim it challenges or supports in the first.",
      },
      {
        heading: 'The Academic Discussion task',
        content:
          "You'll see a short discussion-forum-style prompt (as if posted by a professor) with a question, and you write a response as if contributing to that online discussion. Strong responses take a clear position quickly, support it with one well-developed reason and a concrete example, and stay tightly focused — a shorter, well-organized answer consistently scores better than a longer, unfocused one.",
      },
      {
        heading: 'Self-assessing your writing',
        content:
          "Since automated essay grading isn't reliable enough to trust for practice feedback, our mock tests show you a model answer after you submit so you can compare your structure, argument development, and clarity against a strong response — rather than a numeric score for this section.",
      },
    ],
  },
];

const test1: AuthoredTest = {
  title: 'TOEFL Practice Test 1',
  order: 0,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Read each passage, then answer the questions that follow it.',
      questions: [
        {
          id: 'tf1-r-1', type: 'mcq',
          passage:
            "Coral reefs, often called the \"rainforests of the sea,\" occupy less than one percent of the ocean floor yet support roughly a quarter of all known marine species. This disproportionate richness arises from the physical structure reefs provide: the calcium carbonate skeletons built by coral polyps create an intricate, three-dimensional habitat with countless crevices, ledges, and open spaces, each suited to different organisms. Unlike a flat sandy seabed, a reef offers vertical relief comparable to a small mountain range, and this structural complexity alone accounts for much of the biodiversity found there. Remove the structure — through bleaching or physical destruction — and most of the associated species disappear long before the water itself becomes uninhabitable, since it is the architecture, not merely the chemistry, of the reef that sustains them.",
          prompt: 'According to the passage, what mainly explains the high biodiversity of coral reefs?',
          options: ['The chemical composition of seawater near reefs', 'The three-dimensional structure the coral creates', 'The warm temperature of tropical oceans', 'The absence of predators on reefs'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-2', type: 'mcq',
          passage:
            "Coral reefs, often called the \"rainforests of the sea,\" occupy less than one percent of the ocean floor yet support roughly a quarter of all known marine species. This disproportionate richness arises from the physical structure reefs provide: the calcium carbonate skeletons built by coral polyps create an intricate, three-dimensional habitat with countless crevices, ledges, and open spaces, each suited to different organisms. Unlike a flat sandy seabed, a reef offers vertical relief comparable to a small mountain range, and this structural complexity alone accounts for much of the biodiversity found there. Remove the structure — through bleaching or physical destruction — and most of the associated species disappear long before the water itself becomes uninhabitable, since it is the architecture, not merely the chemistry, of the reef that sustains them.",
          prompt: 'The word "disproportionate" in the passage is closest in meaning to',
          options: ['expected', 'out of proportion to size', 'temporary', 'measurable'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-3', type: 'mcq',
          passage:
            "Coral reefs, often called the \"rainforests of the sea,\" occupy less than one percent of the ocean floor yet support roughly a quarter of all known marine species. This disproportionate richness arises from the physical structure reefs provide: the calcium carbonate skeletons built by coral polyps create an intricate, three-dimensional habitat with countless crevices, ledges, and open spaces, each suited to different organisms. Unlike a flat sandy seabed, a reef offers vertical relief comparable to a small mountain range, and this structural complexity alone accounts for much of the biodiversity found there. Remove the structure — through bleaching or physical destruction — and most of the associated species disappear long before the water itself becomes uninhabitable, since it is the architecture, not merely the chemistry, of the reef that sustains them.",
          prompt: 'It can be inferred from the passage that after a reef loses its physical structure,',
          options: ['the water immediately becomes toxic', 'most associated species vanish even though the water is still livable', 'biodiversity typically increases', 'the reef structure regrows within weeks'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-4', type: 'mcq',
          passage:
            "Coral reefs, often called the \"rainforests of the sea,\" occupy less than one percent of the ocean floor yet support roughly a quarter of all known marine species. This disproportionate richness arises from the physical structure reefs provide: the calcium carbonate skeletons built by coral polyps create an intricate, three-dimensional habitat with countless crevices, ledges, and open spaces, each suited to different organisms. Unlike a flat sandy seabed, a reef offers vertical relief comparable to a small mountain range, and this structural complexity alone accounts for much of the biodiversity found there. Remove the structure — through bleaching or physical destruction — and most of the associated species disappear long before the water itself becomes uninhabitable, since it is the architecture, not merely the chemistry, of the reef that sustains them.",
          prompt: 'What percentage of the ocean floor do coral reefs occupy, according to the passage?',
          options: ['About a quarter', 'Less than one percent', 'About ten percent', 'The passage does not say'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-5', type: 'mcq',
          passage:
            "Coral reefs, often called the \"rainforests of the sea,\" occupy less than one percent of the ocean floor yet support roughly a quarter of all known marine species. This disproportionate richness arises from the physical structure reefs provide: the calcium carbonate skeletons built by coral polyps create an intricate, three-dimensional habitat with countless crevices, ledges, and open spaces, each suited to different organisms. Unlike a flat sandy seabed, a reef offers vertical relief comparable to a small mountain range, and this structural complexity alone accounts for much of the biodiversity found there. Remove the structure — through bleaching or physical destruction — and most of the associated species disappear long before the water itself becomes uninhabitable, since it is the architecture, not merely the chemistry, of the reef that sustains them.",
          prompt: 'The comparison to "a small mountain range" is used to illustrate',
          options: ['the height reefs can reach above the water', 'the vertical relief a reef offers compared to a flat seabed', 'the age of coral reef formations', 'the danger reefs pose to ships'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-6', type: 'mcq',
          passage:
            "The invention of the printing press in the fifteenth century is often credited with democratizing access to knowledge, but its immediate effect was more limited than this popular narrative suggests. In its first decades, printed books remained expensive relative to average income, and literacy itself was confined to a small fraction of the population, largely clergy, merchants, and nobility. What the press changed first was not who could read, but how quickly and cheaply a text, once written, could be reproduced without the errors that crept in through generations of hand-copying. The broader democratization of literacy — and with it, of knowledge — took several more centuries and depended on separate developments, including cheaper paper production and, eventually, compulsory public education.",
          prompt: 'According to the passage, what was the printing press\'s first major effect?',
          options: ['It immediately made most of the population literate', 'It made accurate, cheap reproduction of texts possible', 'It eliminated the need for paper', 'It ended the influence of the clergy'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-7', type: 'mcq',
          passage:
            "The invention of the printing press in the fifteenth century is often credited with democratizing access to knowledge, but its immediate effect was more limited than this popular narrative suggests. In its first decades, printed books remained expensive relative to average income, and literacy itself was confined to a small fraction of the population, largely clergy, merchants, and nobility. What the press changed first was not who could read, but how quickly and cheaply a text, once written, could be reproduced without the errors that crept in through generations of hand-copying. The broader democratization of literacy — and with it, of knowledge — took several more centuries and depended on separate developments, including cheaper paper production and, eventually, compulsory public education.",
          prompt: 'The author mentions "compulsory public education" as an example of',
          options: ['a cause of the printing press\'s invention', 'a later development needed for literacy to spread widely', 'a policy that failed', 'an idea rejected by the nobility'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-8', type: 'mcq',
          passage:
            "The invention of the printing press in the fifteenth century is often credited with democratizing access to knowledge, but its immediate effect was more limited than this popular narrative suggests. In its first decades, printed books remained expensive relative to average income, and literacy itself was confined to a small fraction of the population, largely clergy, merchants, and nobility. What the press changed first was not who could read, but how quickly and cheaply a text, once written, could be reproduced without the errors that crept in through generations of hand-copying. The broader democratization of literacy — and with it, of knowledge — took several more centuries and depended on separate developments, including cheaper paper production and, eventually, compulsory public education.",
          prompt: 'The word "confined" in the passage is closest in meaning to',
          options: ['expanded', 'limited', 'celebrated', 'organized'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-9', type: 'mcq',
          passage:
            "The invention of the printing press in the fifteenth century is often credited with democratizing access to knowledge, but its immediate effect was more limited than this popular narrative suggests. In its first decades, printed books remained expensive relative to average income, and literacy itself was confined to a small fraction of the population, largely clergy, merchants, and nobility. What the press changed first was not who could read, but how quickly and cheaply a text, once written, could be reproduced without the errors that crept in through generations of hand-copying. The broader democratization of literacy — and with it, of knowledge — took several more centuries and depended on separate developments, including cheaper paper production and, eventually, compulsory public education.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To argue the printing press had no historical importance', 'To correct a common misconception about the press\'s immediate impact', 'To describe how books are printed today', 'To criticize the medieval clergy'],
          correctIndex: 1,
        },
        {
          id: 'tf1-r-10', type: 'mcq',
          passage:
            "The invention of the printing press in the fifteenth century is often credited with democratizing access to knowledge, but its immediate effect was more limited than this popular narrative suggests. In its first decades, printed books remained expensive relative to average income, and literacy itself was confined to a small fraction of the population, largely clergy, merchants, and nobility. What the press changed first was not who could read, but how quickly and cheaply a text, once written, could be reproduced without the errors that crept in through generations of hand-copying. The broader democratization of literacy — and with it, of knowledge — took several more centuries and depended on separate developments, including cheaper paper production and, eventually, compulsory public education.",
          prompt: 'Which group is NOT mentioned as part of the small literate fraction of the population?',
          options: ['Clergy', 'Merchants', 'Nobility', 'Farmers'],
          correctIndex: 3,
        },
      ],
    },
    {
      key: 'listening',
      title: 'Listening',
      type: 'listening',
      graded: true,
      durationSeconds: 18 * 60,
      audioNote: true,
      instructions: 'Listen to each recording once, then answer the questions. The transcript is shown after you listen so you can review it once you\'ve answered.',
      questions: [
        {
          id: 'tf1-l-1', type: 'mcq',
          passage:
            "Student: Excuse me, Professor Diaz, do you have a minute? I wanted to ask about the extension for the research proposal. Professor: Of course, come in. What's going on? Student: I've actually finished the literature review, but I'm stuck on the methodology section — I switched topics last week and I'm not sure the survey approach still fits. Professor: Ah, I see. Well, the deadline is firm for the whole class, but I can give you feedback on a rough draft of the methodology by email if you send it to me tonight — that way you're not working blind until the deadline. Student: That would really help, thank you. I'll send it as soon as I get home.",
          prompt: 'Why does the student go to see the professor?',
          options: ['To ask for a longer deadline', 'To get feedback on the methodology section before the deadline', 'To change her research topic', 'To drop the course'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-2', type: 'mcq',
          passage:
            "Student: Excuse me, Professor Diaz, do you have a minute? I wanted to ask about the extension for the research proposal. Professor: Of course, come in. What's going on? Student: I've actually finished the literature review, but I'm stuck on the methodology section — I switched topics last week and I'm not sure the survey approach still fits. Professor: Ah, I see. Well, the deadline is firm for the whole class, but I can give you feedback on a rough draft of the methodology by email if you send it to me tonight — that way you're not working blind until the deadline. Student: That would really help, thank you. I'll send it as soon as I get home.",
          prompt: 'What does the professor decide to do?',
          options: ['Extend the deadline for everyone', 'Review a draft of the methodology by email tonight', 'Assign a different topic to the student', 'Refuse to help until the deadline'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-3', type: 'mcq',
          passage:
            "Student: Excuse me, Professor Diaz, do you have a minute? I wanted to ask about the extension for the research proposal. Professor: Of course, come in. What's going on? Student: I've actually finished the literature review, but I'm stuck on the methodology section — I switched topics last week and I'm not sure the survey approach still fits. Professor: Ah, I see. Well, the deadline is firm for the whole class, but I can give you feedback on a rough draft of the methodology by email if you send it to me tonight — that way you're not working blind until the deadline. Student: That would really help, thank you. I'll send it as soon as I get home.",
          prompt: 'What has the student already completed?',
          options: ['The methodology section', 'The literature review', 'The entire proposal', 'Nothing yet'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-4', type: 'mcq',
          passage:
            "Student: Excuse me, Professor Diaz, do you have a minute? I wanted to ask about the extension for the research proposal. Professor: Of course, come in. What's going on? Student: I've actually finished the literature review, but I'm stuck on the methodology section — I switched topics last week and I'm not sure the survey approach still fits. Professor: Ah, I see. Well, the deadline is firm for the whole class, but I can give you feedback on a rough draft of the methodology by email if you send it to me tonight — that way you're not working blind until the deadline. Student: That would really help, thank you. I'll send it as soon as I get home.",
          prompt: 'Is the overall deadline for the assignment extended for the student?',
          options: ['Yes, by one week', 'Yes, by one month', 'No, it stays firm', 'The conversation does not say'],
          correctIndex: 2,
        },
        {
          id: 'tf1-l-5', type: 'mcq',
          passage:
            "Professor: Today I want to talk about a phenomenon called the bystander effect — the surprising finding that a person in trouble is often less likely to get help when more people are around, not more likely. It seems counterintuitive, right? You'd think more witnesses means more chances someone steps in. But researchers found the opposite: as the number of bystanders increases, each individual feels less personal responsibility to act, assuming someone else will. This is sometimes called diffusion of responsibility. In one classic study, participants were far quicker to report an emergency when they believed they were the only witness than when they believed several other people were also aware of the situation.",
          prompt: 'What is the main topic of this lecture?',
          options: ['How to become a better public speaker', 'The bystander effect and diffusion of responsibility', 'The history of psychology as a discipline', 'How large crowds are controlled by police'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-6', type: 'mcq',
          passage:
            "Professor: Today I want to talk about a phenomenon called the bystander effect — the surprising finding that a person in trouble is often less likely to get help when more people are around, not more likely. It seems counterintuitive, right? You'd think more witnesses means more chances someone steps in. But researchers found the opposite: as the number of bystanders increases, each individual feels less personal responsibility to act, assuming someone else will. This is sometimes called diffusion of responsibility. In one classic study, participants were far quicker to report an emergency when they believed they were the only witness than when they believed several other people were also aware of the situation.",
          prompt: 'According to the lecture, what happens as the number of bystanders increases?',
          options: ['Each person feels more responsible to act', 'Each person feels less personal responsibility to act', 'People become more panicked', 'Nothing changes'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-7', type: 'mcq',
          passage:
            "Professor: Today I want to talk about a phenomenon called the bystander effect — the surprising finding that a person in trouble is often less likely to get help when more people are around, not more likely. It seems counterintuitive, right? You'd think more witnesses means more chances someone steps in. But researchers found the opposite: as the number of bystanders increases, each individual feels less personal responsibility to act, assuming someone else will. This is sometimes called diffusion of responsibility. In one classic study, participants were far quicker to report an emergency when they believed they were the only witness than when they believed several other people were also aware of the situation.",
          prompt: 'In the classic study mentioned, when did participants report an emergency fastest?',
          options: ['When they believed they were the only witness', 'When they believed many others also witnessed it', 'When a police officer was present', 'When they were rewarded for reporting'],
          correctIndex: 0,
        },
        {
          id: 'tf1-l-8', type: 'mcq',
          passage:
            "Professor: Today I want to talk about a phenomenon called the bystander effect — the surprising finding that a person in trouble is often less likely to get help when more people are around, not more likely. It seems counterintuitive, right? You'd think more witnesses means more chances someone steps in. But researchers found the opposite: as the number of bystanders increases, each individual feels less personal responsibility to act, assuming someone else will. This is sometimes called diffusion of responsibility. In one classic study, participants were far quicker to report an emergency when they believed they were the only witness than when they believed several other people were also aware of the situation.",
          prompt: 'What term does the professor use for the idea that each person assumes someone else will act?',
          options: ['Social loafing', 'Diffusion of responsibility', 'Groupthink', 'Peer pressure'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-9', type: 'mcq',
          passage:
            "Professor: Today I want to talk about a phenomenon called the bystander effect — the surprising finding that a person in trouble is often less likely to get help when more people are around, not more likely. It seems counterintuitive, right? You'd think more witnesses means more chances someone steps in. But researchers found the opposite: as the number of bystanders increases, each individual feels less personal responsibility to act, assuming someone else will. This is sometimes called diffusion of responsibility. In one classic study, participants were far quicker to report an emergency when they believed they were the only witness than when they believed several other people were also aware of the situation.",
          prompt: 'Why does the professor describe the finding as "counterintuitive"?',
          options: ['Because it matches common expectations exactly', 'Because more witnesses would be expected to increase, not decrease, the chance of help', 'Because it was later proven false', 'Because it only applies to children'],
          correctIndex: 1,
        },
        {
          id: 'tf1-l-10', type: 'mcq',
          passage:
            "Professor: Today I want to talk about a phenomenon called the bystander effect — the surprising finding that a person in trouble is often less likely to get help when more people are around, not more likely. It seems counterintuitive, right? You'd think more witnesses means more chances someone steps in. But researchers found the opposite: as the number of bystanders increases, each individual feels less personal responsibility to act, assuming someone else will. This is sometimes called diffusion of responsibility. In one classic study, participants were far quicker to report an emergency when they believed they were the only witness than when they believed several other people were also aware of the situation.",
          prompt: 'What is the professor\'s attitude toward the finding, based on tone?',
          options: ['Dismissive, as if it is obviously wrong', 'Engaged, presenting it as a genuinely surprising result worth explaining', 'Angry about how it was studied', 'Bored and repeating old material'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing',
      title: 'Writing',
      type: 'writing',
      graded: false,
      durationSeconds: 28 * 60,
      instructions: 'Two tasks. Write your response in the box for each; there is no automatic score, but you can compare your answer to a model response after submitting.',
      questions: [
        {
          id: 'tf1-w-1', type: 'essay', minWords: 150,
          sourceText:
            "Reading passage: Urban planners increasingly argue that car-free city centers improve quality of life by reducing pollution, noise, and traffic accidents, while encouraging walking, cycling, and local businesses. Lecture (transcript): \"Now, the reading makes car-free zones sound like an easy win, but in practice several cities that tried full pedestrianization saw a very different picture. Local shop owners in a few of these zones reported a real drop in customers, especially older residents and people delivering goods, who found the new restrictions inconvenient rather than liberating. And where public transit wasn't expanded at the same time as the car ban, commuters simply avoided the area altogether, which hurt exactly the local businesses planners hoped to protect.\"",
          prompt: 'Summarize the points made in the lecture, explaining how they challenge specific points made in the reading passage.',
          modelAnswer:
            "The lecture challenges the reading's optimistic view of car-free city centers by pointing to real-world complications the reading does not address. While the reading claims that pedestrianization straightforwardly improves quality of life and supports local business, the lecturer notes that several cities saw the opposite effect on business: shop owners, particularly those serving older residents or relying on deliveries, reported fewer customers once cars were banned, because the change felt inconvenient rather than beneficial to these groups. Second, the lecture directly undercuts the reading's assumption that removing cars automatically benefits an area — the lecturer explains that when public transit was not expanded alongside the car ban, commuters avoided the area entirely, which hurt local businesses instead of helping them, exactly opposite to what the reading predicts. Overall, the lecture suggests that the reading's claims depend on conditions — such as adequate public transit and consideration for residents who rely on vehicles — that are not guaranteed simply by banning cars.",
        },
        {
          id: 'tf1-w-2', type: 'essay', minWords: 100,
          prompt:
            "Your professor is teaching a class on education. Write a post responding to the following discussion question: \"Some people believe students learn best by working through problems on their own, while others believe students learn best with significant guidance from a teacher throughout the process. Which approach do you think is more effective, and why?\" Respond with your own view, giving specific reasons and examples.",
          modelAnswer:
            "I believe a mix of guided instruction followed by independent practice works better than either extreme on its own, but if I had to choose one, I would lean toward significant early guidance. When I first learned computer programming, I struggled for weeks trying to work through problems entirely on my own, mostly because I didn't yet know which questions to even ask. Once a teacher walked me through the underlying logic of a few examples, I was able to apply that structure independently to new, more difficult problems far more quickly than before. Struggling alone can build resilience, but without any guidance it often just builds frustration and reinforces bad habits early on, before a student has enough foundation to self-correct. Guidance, at least at the start, gives students the framework they need to make their later independent struggle actually productive.",
        },
      ],
    },
  ],
};

const test2: AuthoredTest = {
  title: 'TOEFL Practice Test 2',
  order: 1,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Read each passage, then answer the questions that follow it.',
      questions: [
        {
          id: 'tf2-r-1', type: 'mcq',
          passage:
            "Light pollution — the excess artificial light that spills into the night sky from streetlights, buildings, and vehicles — has increased so steadily over the past several decades that a majority of people in industrialized countries can no longer see the Milky Way from where they live. Astronomers have long complained about the loss of dark skies for observation, but recent research has widened the concern considerably: migratory birds, which rely on starlight and moonlight for navigation, are increasingly disoriented by urban glow, sometimes fatally colliding with brightly lit buildings during nighttime migration. Sea turtle hatchlings, which instinctively crawl toward the brightest horizon after emerging from their nests — normally the reflection of moonlight on the ocean — are frequently drawn inland toward artificial lighting instead, with fatal consequences. In response, a small but growing number of coastal towns have adopted shielded, downward-facing streetlights during hatching season, a low-cost intervention that early studies suggest meaningfully reduces hatchling mortality.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To argue that streetlights should be banned entirely', 'To describe how light pollution affects both astronomy and wildlife, and one response to it', 'To explain how sea turtles navigate using magnetic fields', 'To compare light pollution levels in different countries'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-2', type: 'mcq',
          passage:
            "Light pollution — the excess artificial light that spills into the night sky from streetlights, buildings, and vehicles — has increased so steadily over the past several decades that a majority of people in industrialized countries can no longer see the Milky Way from where they live. Astronomers have long complained about the loss of dark skies for observation, but recent research has widened the concern considerably: migratory birds, which rely on starlight and moonlight for navigation, are increasingly disoriented by urban glow, sometimes fatally colliding with brightly lit buildings during nighttime migration. Sea turtle hatchlings, which instinctively crawl toward the brightest horizon after emerging from their nests — normally the reflection of moonlight on the ocean — are frequently drawn inland toward artificial lighting instead, with fatal consequences. In response, a small but growing number of coastal towns have adopted shielded, downward-facing streetlights during hatching season, a low-cost intervention that early studies suggest meaningfully reduces hatchling mortality.",
          prompt: 'According to the passage, why do sea turtle hatchlings normally crawl toward the brightest horizon?',
          options: ['They are attracted to streetlights', 'It normally reflects moonlight on the ocean, guiding them to water', 'They are following their mother', 'It indicates the location of food'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-3', type: 'mcq',
          passage:
            "Light pollution — the excess artificial light that spills into the night sky from streetlights, buildings, and vehicles — has increased so steadily over the past several decades that a majority of people in industrialized countries can no longer see the Milky Way from where they live. Astronomers have long complained about the loss of dark skies for observation, but recent research has widened the concern considerably: migratory birds, which rely on starlight and moonlight for navigation, are increasingly disoriented by urban glow, sometimes fatally colliding with brightly lit buildings during nighttime migration. Sea turtle hatchlings, which instinctively crawl toward the brightest horizon after emerging from their nests — normally the reflection of moonlight on the ocean — are frequently drawn inland toward artificial lighting instead, with fatal consequences. In response, a small but growing number of coastal towns have adopted shielded, downward-facing streetlights during hatching season, a low-cost intervention that early studies suggest meaningfully reduces hatchling mortality.",
          prompt: 'As used in the passage, "disoriented" most nearly means',
          options: ['excited', 'confused about direction', 'injured', 'attracted'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-4', type: 'mcq',
          passage:
            "Light pollution — the excess artificial light that spills into the night sky from streetlights, buildings, and vehicles — has increased so steadily over the past several decades that a majority of people in industrialized countries can no longer see the Milky Way from where they live. Astronomers have long complained about the loss of dark skies for observation, but recent research has widened the concern considerably: migratory birds, which rely on starlight and moonlight for navigation, are increasingly disoriented by urban glow, sometimes fatally colliding with brightly lit buildings during nighttime migration. Sea turtle hatchlings, which instinctively crawl toward the brightest horizon after emerging from their nests — normally the reflection of moonlight on the ocean — are frequently drawn inland toward artificial lighting instead, with fatal consequences. In response, a small but growing number of coastal towns have adopted shielded, downward-facing streetlights during hatching season, a low-cost intervention that early studies suggest meaningfully reduces hatchling mortality.",
          prompt: 'What solution have some coastal towns adopted?',
          options: ['Banning all nighttime lighting', 'Shielded, downward-facing streetlights during hatching season', 'Relocating hatcheries inland', 'Turning off power during migration'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-5', type: 'mcq',
          passage:
            "Light pollution — the excess artificial light that spills into the night sky from streetlights, buildings, and vehicles — has increased so steadily over the past several decades that a majority of people in industrialized countries can no longer see the Milky Way from where they live. Astronomers have long complained about the loss of dark skies for observation, but recent research has widened the concern considerably: migratory birds, which rely on starlight and moonlight for navigation, are increasingly disoriented by urban glow, sometimes fatally colliding with brightly lit buildings during nighttime migration. Sea turtle hatchlings, which instinctively crawl toward the brightest horizon after emerging from their nests — normally the reflection of moonlight on the ocean — are frequently drawn inland toward artificial lighting instead, with fatal consequences. In response, a small but growing number of coastal towns have adopted shielded, downward-facing streetlights during hatching season, a low-cost intervention that early studies suggest meaningfully reduces hatchling mortality.",
          prompt: 'It can be inferred from the passage that migratory birds primarily rely on which of the following for nighttime navigation?',
          options: ['Magnetic fields only', 'Starlight and moonlight', 'Sound cues from other birds', 'Wind direction'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-6', type: 'mcq',
          passage:
            "For centuries, the network of trade routes now commonly called the Silk Road was assumed by historians to have been a single, well-defined path connecting China to the Mediterranean, traveled start to finish by intrepid merchant caravans. Archaeological and textual evidence gathered over the past few decades has substantially revised this picture. Rather than one continuous route, the Silk Road was in fact a shifting web of interconnected paths, with most goods changing hands multiple times as they moved between regional traders, each covering only a portion of the total distance. Silk woven in China, for instance, might pass through the hands of Central Asian, Persian, and Arab intermediaries before ever reaching a Mediterranean port — and few if any individual merchants traveled the entire span themselves. This revised understanding also helps explain how ideas, religious practices, and technologies spread as effectively as goods did along these routes: at each point of exchange, more than merchandise passed between traders.",
          prompt: 'How has the historical understanding of the Silk Road changed, according to the passage?',
          options: ['It is now believed to be a single continuous path', 'It is now understood as a shifting web of interconnected regional routes', 'It is now believed not to have existed', 'It is now dated to a much earlier period'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-7', type: 'mcq',
          passage:
            "For centuries, the network of trade routes now commonly called the Silk Road was assumed by historians to have been a single, well-defined path connecting China to the Mediterranean, traveled start to finish by intrepid merchant caravans. Archaeological and textual evidence gathered over the past few decades has substantially revised this picture. Rather than one continuous route, the Silk Road was in fact a shifting web of interconnected paths, with most goods changing hands multiple times as they moved between regional traders, each covering only a portion of the total distance. Silk woven in China, for instance, might pass through the hands of Central Asian, Persian, and Arab intermediaries before ever reaching a Mediterranean port — and few if any individual merchants traveled the entire span themselves. This revised understanding also helps explain how ideas, religious practices, and technologies spread as effectively as goods did along these routes: at each point of exchange, more than merchandise passed between traders.",
          prompt: 'According to the passage, how did Chinese silk typically reach the Mediterranean?',
          options: ['Carried by a single merchant the entire way', 'Passed through multiple regional intermediaries', 'Shipped directly by sea', 'It rarely reached the Mediterranean at all'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-8', type: 'mcq',
          passage:
            "For centuries, the network of trade routes now commonly called the Silk Road was assumed by historians to have been a single, well-defined path connecting China to the Mediterranean, traveled start to finish by intrepid merchant caravans. Archaeological and textual evidence gathered over the past few decades has substantially revised this picture. Rather than one continuous route, the Silk Road was in fact a shifting web of interconnected paths, with most goods changing hands multiple times as they moved between regional traders, each covering only a portion of the total distance. Silk woven in China, for instance, might pass through the hands of Central Asian, Persian, and Arab intermediaries before ever reaching a Mediterranean port — and few if any individual merchants traveled the entire span themselves. This revised understanding also helps explain how ideas, religious practices, and technologies spread as effectively as goods did along these routes: at each point of exchange, more than merchandise passed between traders.",
          prompt: 'As used in the passage, "intrepid" most nearly means',
          options: ['wealthy', 'fearless/adventurous', 'foreign', 'organized'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-9', type: 'mcq',
          passage:
            "For centuries, the network of trade routes now commonly called the Silk Road was assumed by historians to have been a single, well-defined path connecting China to the Mediterranean, traveled start to finish by intrepid merchant caravans. Archaeological and textual evidence gathered over the past few decades has substantially revised this picture. Rather than one continuous route, the Silk Road was in fact a shifting web of interconnected paths, with most goods changing hands multiple times as they moved between regional traders, each covering only a portion of the total distance. Silk woven in China, for instance, might pass through the hands of Central Asian, Persian, and Arab intermediaries before ever reaching a Mediterranean port — and few if any individual merchants traveled the entire span themselves. This revised understanding also helps explain how ideas, religious practices, and technologies spread as effectively as goods did along these routes: at each point of exchange, more than merchandise passed between traders.",
          prompt: 'What does the revised understanding of the Silk Road help explain, according to the passage?',
          options: ['Why silk was so expensive', 'How ideas and technologies spread alongside goods', 'Why the routes were abandoned', 'How maps were first drawn'],
          correctIndex: 1,
        },
        {
          id: 'tf2-r-10', type: 'mcq',
          passage:
            "For centuries, the network of trade routes now commonly called the Silk Road was assumed by historians to have been a single, well-defined path connecting China to the Mediterranean, traveled start to finish by intrepid merchant caravans. Archaeological and textual evidence gathered over the past few decades has substantially revised this picture. Rather than one continuous route, the Silk Road was in fact a shifting web of interconnected paths, with most goods changing hands multiple times as they moved between regional traders, each covering only a portion of the total distance. Silk woven in China, for instance, might pass through the hands of Central Asian, Persian, and Arab intermediaries before ever reaching a Mediterranean port — and few if any individual merchants traveled the entire span themselves. This revised understanding also helps explain how ideas, religious practices, and technologies spread as effectively as goods did along these routes: at each point of exchange, more than merchandise passed between traders.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To argue the Silk Road never existed', 'To correct a popular misconception about how the Silk Road actually functioned', 'To describe modern trade routes', 'To list the goods traded along the Silk Road'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'listening',
      title: 'Listening',
      type: 'listening',
      graded: true,
      durationSeconds: 18 * 60,
      audioNote: true,
      instructions: 'Listen to each recording once, then answer the questions. The transcript is shown after you listen so you can review it once you\'ve answered.',
      questions: [
        {
          id: 'tf2-l-1', type: 'mcq',
          passage:
            "Student: Hi, I'm registered for your seminar next semester, but I just realized it meets at the exact same time as a lab I need for my major. Is there any flexibility? Advisor: Let me check... unfortunately this seminar only runs once a year, so I can't move the time for one student. But here's an option: I also teach a smaller version of this same material as an independent study in the spring. It's more reading-intensive since there's no group discussion, but it would satisfy the same requirement. Student: That could actually work better for me anyway, since my schedule is packed this semester. Advisor: Great, I'll send you the paperwork today.",
          prompt: 'What problem does the student bring to the advisor?',
          options: ['She failed the seminar', 'The seminar conflicts with a required lab', 'She wants to change her major', 'She missed the registration deadline'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-2', type: 'mcq',
          passage:
            "Student: Hi, I'm registered for your seminar next semester, but I just realized it meets at the exact same time as a lab I need for my major. Is there any flexibility? Advisor: Let me check... unfortunately this seminar only runs once a year, so I can't move the time for one student. But here's an option: I also teach a smaller version of this same material as an independent study in the spring. It's more reading-intensive since there's no group discussion, but it would satisfy the same requirement. Student: That could actually work better for me anyway, since my schedule is packed this semester. Advisor: Great, I'll send you the paperwork today.",
          prompt: 'What alternative does the advisor offer?',
          options: ['Canceling the lab instead', 'An independent study version of the same material', 'Delaying graduation by a year', 'Taking the seminar online'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-3', type: 'mcq',
          passage:
            "Student: Hi, I'm registered for your seminar next semester, but I just realized it meets at the exact same time as a lab I need for my major. Is there any flexibility? Advisor: Let me check... unfortunately this seminar only runs once a year, so I can't move the time for one student. But here's an option: I also teach a smaller version of this same material as an independent study in the spring. It's more reading-intensive since there's no group discussion, but it would satisfy the same requirement. Student: That could actually work better for me anyway, since my schedule is packed this semester. Advisor: Great, I'll send you the paperwork today.",
          prompt: 'How does the independent study differ from the seminar, according to the advisor?',
          options: ['It covers different material', 'It is more reading-intensive with no group discussion', 'It is longer', 'It does not satisfy the requirement'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-4', type: 'mcq',
          passage:
            "Student: Hi, I'm registered for your seminar next semester, but I just realized it meets at the exact same time as a lab I need for my major. Is there any flexibility? Advisor: Let me check... unfortunately this seminar only runs once a year, so I can't move the time for one student. But here's an option: I also teach a smaller version of this same material as an independent study in the spring. It's more reading-intensive since there's no group discussion, but it would satisfy the same requirement. Student: That could actually work better for me anyway, since my schedule is packed this semester. Advisor: Great, I'll send you the paperwork today.",
          prompt: 'What is the student\'s attitude toward the proposed alternative?',
          options: ['Reluctant and unconvinced', 'Receptive — she thinks it may suit her better', 'Angry about the scheduling conflict', 'Indifferent'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-5', type: 'mcq',
          passage:
            "Professor: Let's talk about the placebo effect today — the well-documented finding that patients can experience real symptom improvement from a treatment with no active ingredient, simply because they believe they're being treated. What's particularly interesting is recent research on what's called \"open-label\" placebos, where patients are told explicitly, upfront, that the pill contains no medication — and yet, in several studies, they still report meaningful symptom relief compared to patients given no pill at all. This challenges the older assumption that placebo effects require deception to work. Researchers now think that the ritual of treatment itself — taking a pill, visiting a doctor, following a routine — may activate expectation and stress-reduction pathways in the brain, independent of whether the patient is misled about what's in the pill.",
          prompt: 'What is the main topic of this lecture?',
          options: ['The history of modern medicine', 'The placebo effect, including findings on "open-label" placebos', 'How to design a clinical trial', 'The dangers of prescription medication'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-6', type: 'mcq',
          passage:
            "Professor: Let's talk about the placebo effect today — the well-documented finding that patients can experience real symptom improvement from a treatment with no active ingredient, simply because they believe they're being treated. What's particularly interesting is recent research on what's called \"open-label\" placebos, where patients are told explicitly, upfront, that the pill contains no medication — and yet, in several studies, they still report meaningful symptom relief compared to patients given no pill at all. This challenges the older assumption that placebo effects require deception to work. Researchers now think that the ritual of treatment itself — taking a pill, visiting a doctor, following a routine — may activate expectation and stress-reduction pathways in the brain, independent of whether the patient is misled about what's in the pill.",
          prompt: 'What is unusual about "open-label" placebos, according to the professor?',
          options: ['Patients are not told anything about the pill', 'Patients are told upfront the pill has no medication, yet still improve', 'They only work on children', 'They require a higher dose than normal medication'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-7', type: 'mcq',
          passage:
            "Professor: Let's talk about the placebo effect today — the well-documented finding that patients can experience real symptom improvement from a treatment with no active ingredient, simply because they believe they're being treated. What's particularly interesting is recent research on what's called \"open-label\" placebos, where patients are told explicitly, upfront, that the pill contains no medication — and yet, in several studies, they still report meaningful symptom relief compared to patients given no pill at all. This challenges the older assumption that placebo effects require deception to work. Researchers now think that the ritual of treatment itself — taking a pill, visiting a doctor, following a routine — may activate expectation and stress-reduction pathways in the brain, independent of whether the patient is misled about what's in the pill.",
          prompt: 'What older assumption does open-label placebo research challenge?',
          options: ['That placebos never work', 'That placebo effects require deception to work', 'That medication is always more effective than placebo', 'That doctors should never prescribe placebos'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-8', type: 'mcq',
          passage:
            "Professor: Let's talk about the placebo effect today — the well-documented finding that patients can experience real symptom improvement from a treatment with no active ingredient, simply because they believe they're being treated. What's particularly interesting is recent research on what's called \"open-label\" placebos, where patients are told explicitly, upfront, that the pill contains no medication — and yet, in several studies, they still report meaningful symptom relief compared to patients given no pill at all. This challenges the older assumption that placebo effects require deception to work. Researchers now think that the ritual of treatment itself — taking a pill, visiting a doctor, following a routine — may activate expectation and stress-reduction pathways in the brain, independent of whether the patient is misled about what's in the pill.",
          prompt: 'What do researchers now think may explain the effect, according to the lecture?',
          options: ['The specific chemical composition of the pill', 'The ritual of treatment itself activating expectation and stress-reduction pathways', 'Random chance alone', 'A change in diet'],
          correctIndex: 1,
        },
        {
          id: 'tf2-l-9', type: 'mcq',
          passage:
            "Professor: Let's talk about the placebo effect today — the well-documented finding that patients can experience real symptom improvement from a treatment with no active ingredient, simply because they believe they're being treated. What's particularly interesting is recent research on what's called \"open-label\" placebos, where patients are told explicitly, upfront, that the pill contains no medication — and yet, in several studies, they still report meaningful symptom relief compared to patients given no pill at all. This challenges the older assumption that placebo effects require deception to work. Researchers now think that the ritual of treatment itself — taking a pill, visiting a doctor, following a routine — may activate expectation and stress-reduction pathways in the brain, independent of whether the patient is misled about what's in the pill.",
          prompt: 'How were open-label placebo patients\' outcomes described relative to patients given no pill?',
          options: ['Identical', 'Worse', 'They reported meaningful symptom relief compared to no pill', 'The lecture does not compare them'],
          correctIndex: 2,
        },
        {
          id: 'tf2-l-10', type: 'mcq',
          passage:
            "Professor: Let's talk about the placebo effect today — the well-documented finding that patients can experience real symptom improvement from a treatment with no active ingredient, simply because they believe they're being treated. What's particularly interesting is recent research on what's called \"open-label\" placebos, where patients are told explicitly, upfront, that the pill contains no medication — and yet, in several studies, they still report meaningful symptom relief compared to patients given no pill at all. This challenges the older assumption that placebo effects require deception to work. Researchers now think that the ritual of treatment itself — taking a pill, visiting a doctor, following a routine — may activate expectation and stress-reduction pathways in the brain, independent of whether the patient is misled about what's in the pill.",
          prompt: 'What is the professor\'s tone in presenting this research?',
          options: ['Dismissive of the findings', 'Genuinely interested, presenting it as a notable challenge to prior assumptions', 'Angry at researchers', 'Bored and repeating textbook material'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing',
      title: 'Writing',
      type: 'writing',
      graded: false,
      durationSeconds: 28 * 60,
      instructions: 'Two tasks. Write your response in the box for each; there is no automatic score, but you can compare your answer to a model response after submitting.',
      questions: [
        {
          id: 'tf2-w-1', type: 'essay', minWords: 150,
          sourceText:
            "Reading passage: Rapid expansion of solar and wind power is often presented as a straightforward path to reducing a country's reliance on fossil fuels, since the technology is now cheaper than ever and produces no direct emissions during operation. Lecture (transcript): \"The reading paints a fairly clean picture of renewable expansion, but there's a piece it leaves out entirely: intermittency. Solar panels don't generate power at night, and wind turbines are useless on a calm day — so simply building more of them doesn't guarantee reliable electricity unless you also invest heavily in storage or backup capacity, which the reading doesn't mention at all. Second, the claim that renewables are now 'cheaper than ever' usually refers to the cost of generation alone, not the cost of upgrading the electrical grid to handle power that flows unpredictably from thousands of small sources instead of a few large plants — and that grid upgrade cost is often bigger than people expect.\"",
          prompt: 'Summarize the points made in the lecture, explaining how they challenge specific points made in the reading passage.',
          modelAnswer:
            "The lecture complicates the reading's optimistic framing of renewable energy expansion by raising two issues the reading omits. First, while the reading suggests that renewable expansion straightforwardly reduces fossil fuel reliance, the lecturer points out that solar and wind are intermittent — solar doesn't work at night and wind doesn't work without wind — so simply building more capacity does not guarantee reliable power without additional investment in storage or backup, a cost the reading never mentions. Second, the lecture directly challenges the reading's claim that renewables are cheaper than ever by noting that this cost figure usually reflects generation alone, not the substantial cost of upgrading electrical grids to handle power from many small, unpredictable sources rather than a few large plants. Together, these points suggest that the reading's optimistic cost and reliability claims leave out real infrastructure costs that complicate the simple narrative of an easy transition.",
        },
        {
          id: 'tf2-w-2', type: 'essay', minWords: 100,
          prompt:
            "Your professor is teaching a class on work and technology. Write a post responding to the following discussion question: \"Some people believe remote work makes employees more productive, while others believe it reduces collaboration and creativity. Which view do you find more convincing, and why?\" Respond with your own view, giving specific reasons and examples.",
          modelAnswer:
            "I find the productivity argument more convincing for individual, focused tasks, but I think the collaboration concern is real for work that depends on spontaneous idea exchange. When I worked on a solo research project remotely, I finished it faster than I would have in a noisy office, since I controlled my schedule and had fewer interruptions. However, when I later joined a small team project that required brainstorming, our fully remote meetings felt noticeably more rigid — people spoke one at a time on video calls in a way that discouraged the quick, overlapping back-and-forth that often sparks new ideas in person. My conclusion is that remote work suits deep, independent tasks well but works less well for the kind of loosely structured collaboration that benefits from being in the same room.",
        },
      ],
    },
  ],
};

const test3: AuthoredTest = {
  title: 'TOEFL Practice Test 3',
  order: 2,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Read each passage, then answer the questions that follow it.',
      questions: [
        {
          id: 'tf3-r-1', type: 'mcq',
          passage:
            "Octopuses present a puzzle for researchers studying the evolution of intelligence: they are capable of remarkably sophisticated behavior — solving multi-step puzzles, recognizing individual human faces, and in some documented cases, appearing to engage in what looks like play — despite having a nervous system that evolved entirely independently from that of vertebrates, following a completely separate evolutionary path for over 500 million years. Unlike mammalian intelligence, which is centralized in a single brain, roughly two-thirds of an octopus's neurons are distributed throughout its eight arms, each of which can process sensory information and initiate movement with a degree of independence from the central brain. Some researchers have gone so far as to describe the octopus as possessing a kind of distributed cognition, raising provocative questions about whether intelligence, as commonly understood, actually requires the kind of centralized brain structure found in vertebrates at all.",
          prompt: 'What makes octopus intelligence puzzling to researchers, according to the passage?',
          options: ['Octopuses are not actually intelligent', 'It evolved independently from vertebrate intelligence via a totally separate path', 'Octopuses have no nervous system', 'It only appears in captivity'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-2', type: 'mcq',
          passage:
            "Octopuses present a puzzle for researchers studying the evolution of intelligence: they are capable of remarkably sophisticated behavior — solving multi-step puzzles, recognizing individual human faces, and in some documented cases, appearing to engage in what looks like play — despite having a nervous system that evolved entirely independently from that of vertebrates, following a completely separate evolutionary path for over 500 million years. Unlike mammalian intelligence, which is centralized in a single brain, roughly two-thirds of an octopus's neurons are distributed throughout its eight arms, each of which can process sensory information and initiate movement with a degree of independence from the central brain. Some researchers have gone so far as to describe the octopus as possessing a kind of distributed cognition, raising provocative questions about whether intelligence, as commonly understood, actually requires the kind of centralized brain structure found in vertebrates at all.",
          prompt: 'According to the passage, where are most of an octopus\'s neurons located?',
          options: ['In a single centralized brain', 'Distributed throughout its eight arms', 'In its eyes', 'Evenly split between two brains'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-3', type: 'mcq',
          passage:
            "Octopuses present a puzzle for researchers studying the evolution of intelligence: they are capable of remarkably sophisticated behavior — solving multi-step puzzles, recognizing individual human faces, and in some documented cases, appearing to engage in what looks like play — despite having a nervous system that evolved entirely independently from that of vertebrates, following a completely separate evolutionary path for over 500 million years. Unlike mammalian intelligence, which is centralized in a single brain, roughly two-thirds of an octopus's neurons are distributed throughout its eight arms, each of which can process sensory information and initiate movement with a degree of independence from the central brain. Some researchers have gone so far as to describe the octopus as possessing a kind of distributed cognition, raising provocative questions about whether intelligence, as commonly understood, actually requires the kind of centralized brain structure found in vertebrates at all.",
          prompt: 'As used in the passage, "provocative" most nearly means',
          options: ['boring', 'thought-provoking/challenging', 'offensive', 'well-established'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-4', type: 'mcq',
          passage:
            "Octopuses present a puzzle for researchers studying the evolution of intelligence: they are capable of remarkably sophisticated behavior — solving multi-step puzzles, recognizing individual human faces, and in some documented cases, appearing to engage in what looks like play — despite having a nervous system that evolved entirely independently from that of vertebrates, following a completely separate evolutionary path for over 500 million years. Unlike mammalian intelligence, which is centralized in a single brain, roughly two-thirds of an octopus's neurons are distributed throughout its eight arms, each of which can process sensory information and initiate movement with a degree of independence from the central brain. Some researchers have gone so far as to describe the octopus as possessing a kind of distributed cognition, raising provocative questions about whether intelligence, as commonly understood, actually requires the kind of centralized brain structure found in vertebrates at all.",
          prompt: 'What example of sophisticated octopus behavior is NOT mentioned in the passage?',
          options: ['Solving multi-step puzzles', 'Recognizing individual human faces', 'Using tools underwater', 'Appearing to engage in play'],
          correctIndex: 2,
        },
        {
          id: 'tf3-r-5', type: 'mcq',
          passage:
            "Octopuses present a puzzle for researchers studying the evolution of intelligence: they are capable of remarkably sophisticated behavior — solving multi-step puzzles, recognizing individual human faces, and in some documented cases, appearing to engage in what looks like play — despite having a nervous system that evolved entirely independently from that of vertebrates, following a completely separate evolutionary path for over 500 million years. Unlike mammalian intelligence, which is centralized in a single brain, roughly two-thirds of an octopus's neurons are distributed throughout its eight arms, each of which can process sensory information and initiate movement with a degree of independence from the central brain. Some researchers have gone so far as to describe the octopus as possessing a kind of distributed cognition, raising provocative questions about whether intelligence, as commonly understood, actually requires the kind of centralized brain structure found in vertebrates at all.",
          prompt: 'What question does octopus cognition raise, according to the passage?',
          options: ['Whether octopuses can survive on land', 'Whether intelligence requires a centralized brain structure like vertebrates have', 'Whether octopuses are edible', 'Whether octopuses can be trained like dogs'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-6', type: 'mcq',
          passage:
            "Anchoring is a well-documented bias in behavioral economics: when estimating an unknown value, people rely heavily on the first piece of information offered — the \"anchor\" — even when that number is arbitrary or irrelevant. In one frequently cited experiment, participants spun a wheel rigged to land on either a low or high number, then were asked to estimate the percentage of African countries in the United Nations, a figure they had no real basis for knowing. Despite the wheel's result having no logical connection to the actual answer, participants who saw the high number gave substantially higher estimates than those who saw the low number. Retailers exploit this bias routinely: listing a high \"original\" price next to a discounted \"sale\" price anchors shoppers to the higher figure, making the discounted price feel like a better deal than it might otherwise seem, even if the discounted price alone would have seemed reasonable without the comparison.",
          prompt: 'What is anchoring, according to the passage?',
          options: ['A memory technique used by economists', 'The tendency to rely heavily on the first piece of information when estimating an unknown value', 'A pricing law in some countries', 'A method for calculating economic growth'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-7', type: 'mcq',
          passage:
            "Anchoring is a well-documented bias in behavioral economics: when estimating an unknown value, people rely heavily on the first piece of information offered — the \"anchor\" — even when that number is arbitrary or irrelevant. In one frequently cited experiment, participants spun a wheel rigged to land on either a low or high number, then were asked to estimate the percentage of African countries in the United Nations, a figure they had no real basis for knowing. Despite the wheel's result having no logical connection to the actual answer, participants who saw the high number gave substantially higher estimates than those who saw the low number. Retailers exploit this bias routinely: listing a high \"original\" price next to a discounted \"sale\" price anchors shoppers to the higher figure, making the discounted price feel like a better deal than it might otherwise seem, even if the discounted price alone would have seemed reasonable without the comparison.",
          prompt: 'In the wheel experiment described, what determined participants\' estimates, according to the passage?',
          options: ['Their actual knowledge of African countries in the UN', 'The number the rigged wheel landed on', 'Their level of education', 'Random chance unrelated to the wheel'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-8', type: 'mcq',
          passage:
            "Anchoring is a well-documented bias in behavioral economics: when estimating an unknown value, people rely heavily on the first piece of information offered — the \"anchor\" — even when that number is arbitrary or irrelevant. In one frequently cited experiment, participants spun a wheel rigged to land on either a low or high number, then were asked to estimate the percentage of African countries in the United Nations, a figure they had no real basis for knowing. Despite the wheel's result having no logical connection to the actual answer, participants who saw the high number gave substantially higher estimates than those who saw the low number. Retailers exploit this bias routinely: listing a high \"original\" price next to a discounted \"sale\" price anchors shoppers to the higher figure, making the discounted price feel like a better deal than it might otherwise seem, even if the discounted price alone would have seemed reasonable without the comparison.",
          prompt: 'How do retailers exploit anchoring, according to the passage?',
          options: ['By hiding the original price entirely', 'By listing a high original price next to a discounted price', 'By offering no discounts at all', 'By randomizing prices'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-9', type: 'mcq',
          passage:
            "Anchoring is a well-documented bias in behavioral economics: when estimating an unknown value, people rely heavily on the first piece of information offered — the \"anchor\" — even when that number is arbitrary or irrelevant. In one frequently cited experiment, participants spun a wheel rigged to land on either a low or high number, then were asked to estimate the percentage of African countries in the United Nations, a figure they had no real basis for knowing. Despite the wheel's result having no logical connection to the actual answer, participants who saw the high number gave substantially higher estimates than those who saw the low number. Retailers exploit this bias routinely: listing a high \"original\" price next to a discounted \"sale\" price anchors shoppers to the higher figure, making the discounted price feel like a better deal than it might otherwise seem, even if the discounted price alone would have seemed reasonable without the comparison.",
          prompt: 'As used in the passage, "arbitrary" most nearly means',
          options: ['carefully calculated', 'random/without reasoned basis', 'expensive', 'well known'],
          correctIndex: 1,
        },
        {
          id: 'tf3-r-10', type: 'mcq',
          passage:
            "Anchoring is a well-documented bias in behavioral economics: when estimating an unknown value, people rely heavily on the first piece of information offered — the \"anchor\" — even when that number is arbitrary or irrelevant. In one frequently cited experiment, participants spun a wheel rigged to land on either a low or high number, then were asked to estimate the percentage of African countries in the United Nations, a figure they had no real basis for knowing. Despite the wheel's result having no logical connection to the actual answer, participants who saw the high number gave substantially higher estimates than those who saw the low number. Retailers exploit this bias routinely: listing a high \"original\" price next to a discounted \"sale\" price anchors shoppers to the higher figure, making the discounted price feel like a better deal than it might otherwise seem, even if the discounted price alone would have seemed reasonable without the comparison.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To criticize the United Nations', 'To explain the anchoring bias and give real-world examples of it', 'To teach readers how to negotiate prices', 'To argue that retail discounts are illegal'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'listening',
      title: 'Listening',
      type: 'listening',
      graded: true,
      durationSeconds: 18 * 60,
      audioNote: true,
      instructions: 'Listen to each recording once, then answer the questions. The transcript is shown after you listen so you can review it once you\'ve answered.',
      questions: [
        {
          id: 'tf3-l-1', type: 'mcq',
          passage:
            "Student: Hi, I'm trying to find a book for my thesis, but the catalog says it's checked out until next semester, and I really need it this week. Librarian: Let me look... okay, I see it's actually a popular title, so we don't allow early recalls on it, but I can check if another campus library in the consortium has a copy — that usually takes two to three days to arrive. Student: That would work, actually, my deadline isn't until next Friday. Librarian: Perfect, I'll submit the request now, and I'll email you as soon as it arrives.",
          prompt: 'What problem does the student have?',
          options: ['She lost a library book', 'A book she needs is checked out and unavailable until next semester', 'She cannot find the library', 'Her library card expired'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-2', type: 'mcq',
          passage:
            "Student: Hi, I'm trying to find a book for my thesis, but the catalog says it's checked out until next semester, and I really need it this week. Librarian: Let me look... okay, I see it's actually a popular title, so we don't allow early recalls on it, but I can check if another campus library in the consortium has a copy — that usually takes two to three days to arrive. Student: That would work, actually, my deadline isn't until next Friday. Librarian: Perfect, I'll submit the request now, and I'll email you as soon as it arrives.",
          prompt: 'What solution does the librarian offer?',
          options: ['Recalling the book early', 'Requesting a copy from another library in the consortium', 'Buying a new copy', 'Extending the student\'s deadline'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-3', type: 'mcq',
          passage:
            "Student: Hi, I'm trying to find a book for my thesis, but the catalog says it's checked out until next semester, and I really need it this week. Librarian: Let me look... okay, I see it's actually a popular title, so we don't allow early recalls on it, but I can check if another campus library in the consortium has a copy — that usually takes two to three days to arrive. Student: That would work, actually, my deadline isn't until next Friday. Librarian: Perfect, I'll submit the request now, and I'll email you as soon as it arrives.",
          prompt: 'Why can\'t the librarian simply recall the book early?',
          options: ['The book is lost', 'It is a popular title that does not allow early recalls', 'The student does not have permission', 'The book has been damaged'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-4', type: 'mcq',
          passage:
            "Student: Hi, I'm trying to find a book for my thesis, but the catalog says it's checked out until next semester, and I really need it this week. Librarian: Let me look... okay, I see it's actually a popular title, so we don't allow early recalls on it, but I can check if another campus library in the consortium has a copy — that usually takes two to three days to arrive. Student: That would work, actually, my deadline isn't until next Friday. Librarian: Perfect, I'll submit the request now, and I'll email you as soon as it arrives.",
          prompt: 'Is the proposed timeline compatible with the student\'s deadline?',
          options: ['No, it will arrive too late', 'Yes, her deadline is next Friday and the book should arrive in two to three days', 'The conversation does not mention her deadline', 'She has no deadline'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-5', type: 'mcq',
          passage:
            "Professor: Today we're looking at a debate among archaeologists about how Polynesian navigators first reached and settled the remote islands of the Pacific, some of them thousands of kilometers from the nearest landmass, without any instruments we'd recognize today. For a long time, some scholars argued this must have been largely accidental — canoes blown off course by storms that happened to wash up on new islands. But experimental voyages using reconstructed traditional canoes and traditional navigation techniques — reading wave patterns, star positions, and bird flight paths — have shown that deliberate, planned long-distance voyaging was entirely feasible with the technology available at the time. This doesn't rule out accidental discovery in some cases, but it does suggest the older assumption of purely accidental settlement badly underestimated the sophistication of Polynesian navigational knowledge.",
          prompt: 'What is the main topic of this lecture?',
          options: ['The geography of the Pacific Ocean', 'A debate over how Polynesian navigators settled remote Pacific islands', 'Modern GPS technology', 'The construction of traditional canoes only'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-6', type: 'mcq',
          passage:
            "Professor: Today we're looking at a debate among archaeologists about how Polynesian navigators first reached and settled the remote islands of the Pacific, some of them thousands of kilometers from the nearest landmass, without any instruments we'd recognize today. For a long time, some scholars argued this must have been largely accidental — canoes blown off course by storms that happened to wash up on new islands. But experimental voyages using reconstructed traditional canoes and traditional navigation techniques — reading wave patterns, star positions, and bird flight paths — have shown that deliberate, planned long-distance voyaging was entirely feasible with the technology available at the time. This doesn't rule out accidental discovery in some cases, but it does suggest the older assumption of purely accidental settlement badly underestimated the sophistication of Polynesian navigational knowledge.",
          prompt: 'What was the older scholarly assumption mentioned in the lecture?',
          options: ['That settlement was entirely deliberate and planned', 'That settlement happened largely by accident, via storm-blown canoes', 'That the islands were never actually settled', 'That navigators used written maps'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-7', type: 'mcq',
          passage:
            "Professor: Today we're looking at a debate among archaeologists about how Polynesian navigators first reached and settled the remote islands of the Pacific, some of them thousands of kilometers from the nearest landmass, without any instruments we'd recognize today. For a long time, some scholars argued this must have been largely accidental — canoes blown off course by storms that happened to wash up on new islands. But experimental voyages using reconstructed traditional canoes and traditional navigation techniques — reading wave patterns, star positions, and bird flight paths — have shown that deliberate, planned long-distance voyaging was entirely feasible with the technology available at the time. This doesn't rule out accidental discovery in some cases, but it does suggest the older assumption of purely accidental settlement badly underestimated the sophistication of Polynesian navigational knowledge.",
          prompt: 'What evidence challenges the older assumption, according to the professor?',
          options: ['Ancient written records', 'Experimental voyages showing deliberate navigation was feasible using traditional techniques', 'Satellite imagery', 'Interviews with modern sailors only'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-8', type: 'mcq',
          passage:
            "Professor: Today we're looking at a debate among archaeologists about how Polynesian navigators first reached and settled the remote islands of the Pacific, some of them thousands of kilometers from the nearest landmass, without any instruments we'd recognize today. For a long time, some scholars argued this must have been largely accidental — canoes blown off course by storms that happened to wash up on new islands. But experimental voyages using reconstructed traditional canoes and traditional navigation techniques — reading wave patterns, star positions, and bird flight paths — have shown that deliberate, planned long-distance voyaging was entirely feasible with the technology available at the time. This doesn't rule out accidental discovery in some cases, but it does suggest the older assumption of purely accidental settlement badly underestimated the sophistication of Polynesian navigational knowledge.",
          prompt: 'Which navigational techniques are mentioned in the lecture?',
          options: ['Compasses and sextants', 'Reading wave patterns, star positions, and bird flight paths', 'Radio signals', 'Written star charts'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-9', type: 'mcq',
          passage:
            "Professor: Today we're looking at a debate among archaeologists about how Polynesian navigators first reached and settled the remote islands of the Pacific, some of them thousands of kilometers from the nearest landmass, without any instruments we'd recognize today. For a long time, some scholars argued this must have been largely accidental — canoes blown off course by storms that happened to wash up on new islands. But experimental voyages using reconstructed traditional canoes and traditional navigation techniques — reading wave patterns, star positions, and bird flight paths — have shown that deliberate, planned long-distance voyaging was entirely feasible with the technology available at the time. This doesn't rule out accidental discovery in some cases, but it does suggest the older assumption of purely accidental settlement badly underestimated the sophistication of Polynesian navigational knowledge.",
          prompt: 'Does the professor completely rule out accidental discovery of some islands?',
          options: ['Yes, entirely', 'No — accidental discovery in some cases is not ruled out', 'The lecture does not address this', 'Yes, but only for large islands'],
          correctIndex: 1,
        },
        {
          id: 'tf3-l-10', type: 'mcq',
          passage:
            "Professor: Today we're looking at a debate among archaeologists about how Polynesian navigators first reached and settled the remote islands of the Pacific, some of them thousands of kilometers from the nearest landmass, without any instruments we'd recognize today. For a long time, some scholars argued this must have been largely accidental — canoes blown off course by storms that happened to wash up on new islands. But experimental voyages using reconstructed traditional canoes and traditional navigation techniques — reading wave patterns, star positions, and bird flight paths — have shown that deliberate, planned long-distance voyaging was entirely feasible with the technology available at the time. This doesn't rule out accidental discovery in some cases, but it does suggest the older assumption of purely accidental settlement badly underestimated the sophistication of Polynesian navigational knowledge.",
          prompt: 'What does the professor conclude about the older assumption?',
          options: ['It was completely accurate', 'It badly underestimated the sophistication of Polynesian navigational knowledge', 'It has never been tested', 'It applies only to the 20th century'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing',
      title: 'Writing',
      type: 'writing',
      graded: false,
      durationSeconds: 28 * 60,
      instructions: 'Two tasks. Write your response in the box for each; there is no automatic score, but you can compare your answer to a model response after submitting.',
      questions: [
        {
          id: 'tf3-w-1', type: 'essay', minWords: 150,
          sourceText:
            "Reading passage: Urban farming — growing food within city limits, on rooftops, in vacant lots, or in vertical indoor facilities — is often promoted as a way to reduce a city's carbon footprint by cutting the distance food travels from farm to plate. Lecture (transcript): \"The reading focuses entirely on transportation distance, but transportation is actually a small share of food's total carbon footprint compared to how the food is grown. Indoor vertical farms, in particular, often rely on artificial lighting running around the clock, and the electricity for that lighting can produce far more emissions than the truck trips it supposedly saves, especially in regions where electricity comes mostly from fossil fuels. Rooftop farms using natural sunlight avoid this specific problem, but they typically produce far less food per square meter than conventional farms, which raises a different question about whether urban land is actually being used efficiently.\"",
          prompt: 'Summarize the points made in the lecture, explaining how they challenge specific points made in the reading passage.',
          modelAnswer:
            "The lecture complicates the reading's claim that urban farming reduces a city's carbon footprint by shifting focus away from transportation, which the reading treats as the main factor. First, the lecturer points out that transportation is actually a small part of food's total carbon footprint compared to growing methods, directly undercutting the reading's implicit assumption that shorter distance automatically means lower emissions. Second, the lecture specifically challenges the case of indoor vertical farms, explaining that their round-the-clock artificial lighting can produce more emissions than the truck trips saved, particularly where electricity relies on fossil fuels — a cost the reading does not address at all. The lecturer does note that rooftop farms using sunlight avoid this particular lighting problem, but raises a separate concern about their lower yield per square meter compared to conventional farms. Overall, the lecture suggests the reading's environmental benefit claim depends heavily on which type of urban farming is used, a nuance the reading omits.",
        },
        {
          id: 'tf3-w-2', type: 'essay', minWords: 100,
          prompt:
            "Your professor is teaching a class on education technology. Write a post responding to the following discussion question: \"Some people believe technology in classrooms (tablets, educational apps, smart boards) improves learning, while others believe it distracts students and should be limited. Which view do you find more convincing, and why?\" Respond with your own view, giving specific reasons and examples.",
          modelAnswer:
            "I find the distraction concern more convincing for younger students specifically, though I think the answer depends heavily on age and how the technology is used rather than being a simple yes-or-no question. In a coding class I once observed, a tablet-based app let students immediately test and debug their own programs, which made abstract concepts concrete in a way a textbook alone could not — that felt like a clear improvement. But in a younger classroom I also observed, students given open tablet access during independent work time frequently drifted into unrelated games within minutes, and the teacher spent more time managing distraction than she would have with paper worksheets. My conclusion is that technology helps most when it's tightly tied to a specific task with limited ability to wander, and helps least when students are given open, unsupervised access to a general-purpose device.",
        },
      ],
    },
  ],
};

const test4: AuthoredTest = {
  title: 'TOEFL Practice Test 4',
  order: 3,
  sections: [
    {
      key: 'reading',
      title: 'Reading',
      type: 'reading',
      graded: true,
      durationSeconds: 16 * 60,
      instructions: 'Read each passage, then answer the questions that follow it.',
      questions: [
        {
          id: 'tf4-r-1', type: 'mcq',
          passage:
            "Invasive species — organisms introduced, deliberately or accidentally, into an ecosystem where they did not evolve — often succeed precisely because they arrive without the natural predators, parasites, or competitors that kept their populations in check in their native range. This absence of natural checks can allow an invasive species to reproduce unchecked, frequently outcompeting native species for food and habitat. Some of the most damaging invasions were, ironically, deliberate introductions intended to solve a different problem: certain toads were introduced to several regions specifically to control agricultural pests, only for the toads themselves to become a far larger ecological problem than the pests they were meant to eliminate, since local predators that might have controlled the toad population had no evolved resistance to the toads' toxic skin secretions.",
          prompt: 'According to the passage, why do invasive species often succeed?',
          options: ['They are always larger than native species', 'They arrive without natural predators, parasites, or competitors', 'They are introduced by scientists specifically to succeed', 'Native species always welcome them'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-2', type: 'mcq',
          passage:
            "Invasive species — organisms introduced, deliberately or accidentally, into an ecosystem where they did not evolve — often succeed precisely because they arrive without the natural predators, parasites, or competitors that kept their populations in check in their native range. This absence of natural checks can allow an invasive species to reproduce unchecked, frequently outcompeting native species for food and habitat. Some of the most damaging invasions were, ironically, deliberate introductions intended to solve a different problem: certain toads were introduced to several regions specifically to control agricultural pests, only for the toads themselves to become a far larger ecological problem than the pests they were meant to eliminate, since local predators that might have controlled the toad population had no evolved resistance to the toads' toxic skin secretions.",
          prompt: 'Why did local predators fail to control the introduced toads, according to the passage?',
          options: ['The toads reproduced too slowly', 'Local predators had no evolved resistance to the toads\' toxic skin secretions', 'There were no predators in the region at all', 'The toads were too large to be eaten'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-3', type: 'mcq',
          passage:
            "Invasive species — organisms introduced, deliberately or accidentally, into an ecosystem where they did not evolve — often succeed precisely because they arrive without the natural predators, parasites, or competitors that kept their populations in check in their native range. This absence of natural checks can allow an invasive species to reproduce unchecked, frequently outcompeting native species for food and habitat. Some of the most damaging invasions were, ironically, deliberate introductions intended to solve a different problem: certain toads were introduced to several regions specifically to control agricultural pests, only for the toads themselves to become a far larger ecological problem than the pests they were meant to eliminate, since local predators that might have controlled the toad population had no evolved resistance to the toads' toxic skin secretions.",
          prompt: 'Why were the toads originally introduced, according to the passage?',
          options: ['As pets', 'To control agricultural pests', 'For scientific research only', 'By accident during shipping'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-4', type: 'mcq',
          passage:
            "Invasive species — organisms introduced, deliberately or accidentally, into an ecosystem where they did not evolve — often succeed precisely because they arrive without the natural predators, parasites, or competitors that kept their populations in check in their native range. This absence of natural checks can allow an invasive species to reproduce unchecked, frequently outcompeting native species for food and habitat. Some of the most damaging invasions were, ironically, deliberate introductions intended to solve a different problem: certain toads were introduced to several regions specifically to control agricultural pests, only for the toads themselves to become a far larger ecological problem than the pests they were meant to eliminate, since local predators that might have controlled the toad population had no evolved resistance to the toads' toxic skin secretions.",
          prompt: 'As used in the passage, "ironically" signals that the outcome was',
          options: ['exactly as planned', 'the opposite of what was intended', 'completely predictable from the start', 'unrelated to the original goal'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-5', type: 'mcq',
          passage:
            "Invasive species — organisms introduced, deliberately or accidentally, into an ecosystem where they did not evolve — often succeed precisely because they arrive without the natural predators, parasites, or competitors that kept their populations in check in their native range. This absence of natural checks can allow an invasive species to reproduce unchecked, frequently outcompeting native species for food and habitat. Some of the most damaging invasions were, ironically, deliberate introductions intended to solve a different problem: certain toads were introduced to several regions specifically to control agricultural pests, only for the toads themselves to become a far larger ecological problem than the pests they were meant to eliminate, since local predators that might have controlled the toad population had no evolved resistance to the toads' toxic skin secretions.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To argue all species introductions should be banned', 'To explain why invasive species often succeed and give a cautionary example', 'To describe toad biology in detail', 'To promote agricultural pest control'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-6', type: 'mcq',
          passage:
            "The gig economy — work characterized by short-term, task-based contracts rather than traditional long-term employment — is frequently discussed in terms of flexibility for workers, who can choose their own hours and take on multiple income sources at once. Less discussed, but increasingly documented by labor researchers, is the effect on income predictability: unlike a salaried position, gig income can vary sharply week to week based on factors entirely outside a worker's control, from seasonal demand shifts to changes in a platform's algorithm for assigning tasks. Some researchers argue this unpredictability, more than the total amount earned, is what most affects gig workers' financial stress, since budgeting and saving become substantially harder when income cannot be reliably forecast even one month in advance.",
          prompt: 'What is the gig economy, as defined in the passage?',
          options: ['Traditional long-term salaried employment', 'Work characterized by short-term, task-based contracts', 'Government employment programs', 'Unpaid volunteer work'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-7', type: 'mcq',
          passage:
            "The gig economy — work characterized by short-term, task-based contracts rather than traditional long-term employment — is frequently discussed in terms of flexibility for workers, who can choose their own hours and take on multiple income sources at once. Less discussed, but increasingly documented by labor researchers, is the effect on income predictability: unlike a salaried position, gig income can vary sharply week to week based on factors entirely outside a worker's control, from seasonal demand shifts to changes in a platform's algorithm for assigning tasks. Some researchers argue this unpredictability, more than the total amount earned, is what most affects gig workers' financial stress, since budgeting and saving become substantially harder when income cannot be reliably forecast even one month in advance.",
          prompt: 'According to some researchers, what most affects gig workers\' financial stress?',
          options: ['The total amount they earn', 'The unpredictability of their income week to week', 'The number of hours they work', 'Their choice of platform'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-8', type: 'mcq',
          passage:
            "The gig economy — work characterized by short-term, task-based contracts rather than traditional long-term employment — is frequently discussed in terms of flexibility for workers, who can choose their own hours and take on multiple income sources at once. Less discussed, but increasingly documented by labor researchers, is the effect on income predictability: unlike a salaried position, gig income can vary sharply week to week based on factors entirely outside a worker's control, from seasonal demand shifts to changes in a platform's algorithm for assigning tasks. Some researchers argue this unpredictability, more than the total amount earned, is what most affects gig workers' financial stress, since budgeting and saving become substantially harder when income cannot be reliably forecast even one month in advance.",
          prompt: 'What factors can cause gig income to vary, according to the passage?',
          options: ['Only the worker\'s effort level', 'Seasonal demand shifts and changes in a platform\'s algorithm', 'Government tax policy alone', 'The worker\'s age'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-9', type: 'mcq',
          passage:
            "The gig economy — work characterized by short-term, task-based contracts rather than traditional long-term employment — is frequently discussed in terms of flexibility for workers, who can choose their own hours and take on multiple income sources at once. Less discussed, but increasingly documented by labor researchers, is the effect on income predictability: unlike a salaried position, gig income can vary sharply week to week based on factors entirely outside a worker's control, from seasonal demand shifts to changes in a platform's algorithm for assigning tasks. Some researchers argue this unpredictability, more than the total amount earned, is what most affects gig workers' financial stress, since budgeting and saving become substantially harder when income cannot be reliably forecast even one month in advance.",
          prompt: 'What aspect of gig work is "frequently discussed," according to the first sentence?',
          options: ['Income predictability', 'Flexibility for workers', 'Retirement benefits', 'Union representation'],
          correctIndex: 1,
        },
        {
          id: 'tf4-r-10', type: 'mcq',
          passage:
            "The gig economy — work characterized by short-term, task-based contracts rather than traditional long-term employment — is frequently discussed in terms of flexibility for workers, who can choose their own hours and take on multiple income sources at once. Less discussed, but increasingly documented by labor researchers, is the effect on income predictability: unlike a salaried position, gig income can vary sharply week to week based on factors entirely outside a worker's control, from seasonal demand shifts to changes in a platform's algorithm for assigning tasks. Some researchers argue this unpredictability, more than the total amount earned, is what most affects gig workers' financial stress, since budgeting and saving become substantially harder when income cannot be reliably forecast even one month in advance.",
          prompt: 'What is the main purpose of this passage?',
          options: ['To promote gig work as ideal for everyone', 'To highlight an underdiscussed downside of gig work: income unpredictability', 'To compare different gig platforms', 'To argue gig work should be banned'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'listening',
      title: 'Listening',
      type: 'listening',
      graded: true,
      durationSeconds: 18 * 60,
      audioNote: true,
      instructions: 'Listen to each recording once, then answer the questions. The transcript is shown after you listen so you can review it once you\'ve answered.',
      questions: [
        {
          id: 'tf4-l-1', type: 'mcq',
          passage:
            "Student: Professor Kim, I wanted to ask about the group project — one of my group members hasn't responded to any messages in almost two weeks, and we're supposed to submit our outline this Friday. Professor: That's frustrating. Have you tried reaching them through a different channel, in case they're not checking email? Student: I've tried email and the course messaging system. Professor: Okay — go ahead and submit the outline Friday with the three of you, and note in a comment that one member was unreachable. I'll follow up with that student directly, and we'll sort out their grade separately based on what I find out.",
          prompt: 'What problem does the student describe?',
          options: ['She lost her project materials', 'A group member has been unreachable for nearly two weeks', 'The deadline was moved up', 'She wants to switch groups'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-2', type: 'mcq',
          passage:
            "Student: Professor Kim, I wanted to ask about the group project — one of my group members hasn't responded to any messages in almost two weeks, and we're supposed to submit our outline this Friday. Professor: That's frustrating. Have you tried reaching them through a different channel, in case they're not checking email? Student: I've tried email and the course messaging system. Professor: Okay — go ahead and submit the outline Friday with the three of you, and note in a comment that one member was unreachable. I'll follow up with that student directly, and we'll sort out their grade separately based on what I find out.",
          prompt: 'What does the professor instruct the student to do?',
          options: ['Wait until the missing member responds', 'Submit the outline Friday with a note about the unreachable member', 'Cancel the project', 'Fail the missing group member immediately'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-3', type: 'mcq',
          passage:
            "Student: Professor Kim, I wanted to ask about the group project — one of my group members hasn't responded to any messages in almost two weeks, and we're supposed to submit our outline this Friday. Professor: That's frustrating. Have you tried reaching them through a different channel, in case they're not checking email? Student: I've tried email and the course messaging system. Professor: Okay — go ahead and submit the outline Friday with the three of you, and note in a comment that one member was unreachable. I'll follow up with that student directly, and we'll sort out their grade separately based on what I find out.",
          prompt: 'What channels has the student already tried to reach the missing member?',
          options: ['Phone call only', 'Email and the course messaging system', 'In-person visit', 'Social media'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-4', type: 'mcq',
          passage:
            "Student: Professor Kim, I wanted to ask about the group project — one of my group members hasn't responded to any messages in almost two weeks, and we're supposed to submit our outline this Friday. Professor: That's frustrating. Have you tried reaching them through a different channel, in case they're not checking email? Student: I've tried email and the course messaging system. Professor: Okay — go ahead and submit the outline Friday with the three of you, and note in a comment that one member was unreachable. I'll follow up with that student directly, and we'll sort out their grade separately based on what I find out.",
          prompt: 'Who will follow up with the missing group member?',
          options: ['The student who raised the issue', 'The professor', 'No one', 'The other two group members'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-5', type: 'mcq',
          passage:
            "Professor: Let's turn to a topic in sociology today: the so-called \"weak ties\" theory, first proposed in the 1970s, which found that people are more likely to hear about job opportunities from casual acquaintances than from close friends or family. This seems counterintuitive at first — wouldn't your closest friends be more motivated to help you? But the explanation is about information, not motivation: your close friends tend to know the same people and hear about the same opportunities you already know about, since your social circles overlap heavily. Casual acquaintances, by contrast, typically move in different social circles entirely, and so they're more likely to have access to information you don't already have. This is sometimes summarized as 'the strength of weak ties.'",
          prompt: 'What is the main topic of this lecture?',
          options: ['How to make new friends', 'The "weak ties" theory about job information and social networks', 'The history of sociology as a field', 'How to interview for a job'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-6', type: 'mcq',
          passage:
            "Professor: Let's turn to a topic in sociology today: the so-called \"weak ties\" theory, first proposed in the 1970s, which found that people are more likely to hear about job opportunities from casual acquaintances than from close friends or family. This seems counterintuitive at first — wouldn't your closest friends be more motivated to help you? But the explanation is about information, not motivation: your close friends tend to know the same people and hear about the same opportunities you already know about, since your social circles overlap heavily. Casual acquaintances, by contrast, typically move in different social circles entirely, and so they're more likely to have access to information you don't already have. This is sometimes summarized as 'the strength of weak ties.'",
          prompt: 'According to the theory, why are close friends less useful for finding job information?',
          options: ['They are less motivated to help', 'Their social circles overlap heavily with yours, so they know the same information you do', 'They dislike sharing job leads', 'They rarely have jobs themselves'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-7', type: 'mcq',
          passage:
            "Professor: Let's turn to a topic in sociology today: the so-called \"weak ties\" theory, first proposed in the 1970s, which found that people are more likely to hear about job opportunities from casual acquaintances than from close friends or family. This seems counterintuitive at first — wouldn't your closest friends be more motivated to help you? But the explanation is about information, not motivation: your close friends tend to know the same people and hear about the same opportunities you already know about, since your social circles overlap heavily. Casual acquaintances, by contrast, typically move in different social circles entirely, and so they're more likely to have access to information you don't already have. This is sometimes summarized as 'the strength of weak ties.'",
          prompt: 'Why does the professor say the finding "seems counterintuitive at first"?',
          options: ['Because it matches common expectations exactly', 'Because we might expect close friends, being more motivated, to be more helpful', 'Because it was proven false later', 'Because sociology is a new field'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-8', type: 'mcq',
          passage:
            "Professor: Let's turn to a topic in sociology today: the so-called \"weak ties\" theory, first proposed in the 1970s, which found that people are more likely to hear about job opportunities from casual acquaintances than from close friends or family. This seems counterintuitive at first — wouldn't your closest friends be more motivated to help you? But the explanation is about information, not motivation: your close friends tend to know the same people and hear about the same opportunities you already know about, since your social circles overlap heavily. Casual acquaintances, by contrast, typically move in different social circles entirely, and so they're more likely to have access to information you don't already have. This is sometimes summarized as 'the strength of weak ties.'",
          prompt: 'When was the weak ties theory first proposed, according to the lecture?',
          options: ['The 1950s', 'The 1970s', 'The 1990s', 'The 2010s'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-9', type: 'mcq',
          passage:
            "Professor: Let's turn to a topic in sociology today: the so-called \"weak ties\" theory, first proposed in the 1970s, which found that people are more likely to hear about job opportunities from casual acquaintances than from close friends or family. This seems counterintuitive at first — wouldn't your closest friends be more motivated to help you? But the explanation is about information, not motivation: your close friends tend to know the same people and hear about the same opportunities you already know about, since your social circles overlap heavily. Casual acquaintances, by contrast, typically move in different social circles entirely, and so they're more likely to have access to information you don't already have. This is sometimes summarized as 'the strength of weak ties.'",
          prompt: 'How is the theory\'s core idea summarized at the end of the lecture?',
          options: ['"The weakness of close ties"', '"The strength of weak ties"', '"The end of social networks"', '"The motivation gap"'],
          correctIndex: 1,
        },
        {
          id: 'tf4-l-10', type: 'mcq',
          passage:
            "Professor: Let's turn to a topic in sociology today: the so-called \"weak ties\" theory, first proposed in the 1970s, which found that people are more likely to hear about job opportunities from casual acquaintances than from close friends or family. This seems counterintuitive at first — wouldn't your closest friends be more motivated to help you? But the explanation is about information, not motivation: your close friends tend to know the same people and hear about the same opportunities you already know about, since your social circles overlap heavily. Casual acquaintances, by contrast, typically move in different social circles entirely, and so they're more likely to have access to information you don't already have. This is sometimes summarized as 'the strength of weak ties.'",
          prompt: 'What explains why casual acquaintances provide better job information, per the lecture?',
          options: ['They are more motivated to help', 'They typically move in different social circles with different information', 'They have more free time', 'They are usually employers themselves'],
          correctIndex: 1,
        },
      ],
    },
    {
      key: 'writing',
      title: 'Writing',
      type: 'writing',
      graded: false,
      durationSeconds: 28 * 60,
      instructions: 'Two tasks. Write your response in the box for each; there is no automatic score, but you can compare your answer to a model response after submitting.',
      questions: [
        {
          id: 'tf4-w-1', type: 'essay', minWords: 150,
          sourceText:
            "Reading passage: Public funding for space exploration is often justified by supporters as a driver of valuable technological spinoffs — inventions originally developed for space missions that later find everyday uses, from water filtration systems to memory foam. Lecture (transcript): \"The reading's spinoff argument sounds appealing, but it has a real weakness: it doesn't compare space spending to the alternative. If we spent that same money directly on filtration research or materials science instead of space missions, we'd very likely get more filtration and materials breakthroughs, not fewer, since the research would be targeted at the problem directly rather than arriving as an accidental byproduct of a mission built for a completely different purpose. Pointing to spinoffs makes space spending sound efficient, but it doesn't actually show that space spending is a more efficient way to produce those specific inventions than funding the research directly would have been.\"",
          prompt: 'Summarize the points made in the lecture, explaining how they challenge specific points made in the reading passage.',
          modelAnswer:
            "The lecture challenges the reading's spinoff argument by questioning its underlying logic rather than disputing that spinoffs occur. While the reading presents technological spinoffs as a justification for space funding, the lecturer points out that this argument never compares space spending to the alternative of funding that research directly. Specifically, the lecturer argues that if the same money were spent directly on filtration or materials science research, it would likely produce more breakthroughs in those specific areas, since the research would be targeted rather than an accidental byproduct of a mission built for an unrelated purpose. This directly undercuts the reading's implicit suggestion that space spending is an efficient way to generate these inventions — the lecture reframes spinoffs as, at best, a lucky side effect rather than evidence of efficiency. Overall, the lecture suggests the reading's argument conflates the existence of spinoffs with proof that space spending is the best way to produce them.",
        },
        {
          id: 'tf4-w-2', type: 'essay', minWords: 100,
          prompt:
            "Your professor is teaching a class on media and society. Write a post responding to the following discussion question: \"Some people believe social media has a mostly negative effect on teenagers' well-being, while others believe its effect depends entirely on how it's used. Which view do you find more convincing, and why?\" Respond with your own view, giving specific reasons and examples.",
          modelAnswer:
            "I find the \"it depends on use\" view more convincing, though I think it likely depends on use in ways teenagers themselves have limited control over, given how these platforms are designed. My younger cousin uses social media mainly to stay in a group chat with a small group of close friends from a summer program in another city, and it seems to genuinely strengthen those friendships across distance. But I've also seen classmates fall into hours of passive scrolling through unfamiliar accounts, which seemed to leave them more anxious and less satisfied afterward, by their own account. The difference did not seem to be the platform itself but whether it was used for direct connection with people they already knew or for open-ended browsing driven by an algorithm optimized to maximize time spent rather than well-being. That distinction, more than a blanket verdict on social media as good or bad, seems to determine the actual effect.",
        },
      ],
    },
  ],
};

export const toefl: TrackContent = { courses, tests: [test1, test2, test3, test4] };
