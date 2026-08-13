import type { LanguageId, Lesson } from "@/types/learning";

import { getUnitById } from "@/data/units";

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------
  // Spanish · Unit 1 · Greetings & Basics
  // ---------------------------------------------------------------------
  {
    id: "es-u1-l1",
    unitId: "es-u1",
    languageId: "es",
    order: 1,
    title: "Say Hello",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "es-u1-l1-g1", description: "Greet someone in Spanish" },
      { id: "es-u1-l1-g2", description: "Say goodbye politely" },
    ],
    vocabulary: [
      { id: "es-u1-l1-v1", term: "hola", translation: "hello" },
      { id: "es-u1-l1-v2", term: "buenos días", translation: "good morning" },
      { id: "es-u1-l1-v3", term: "adiós", translation: "goodbye" },
      { id: "es-u1-l1-v4", term: "por favor", translation: "please" },
    ],
    phrases: [
      {
        id: "es-u1-l1-p1",
        phrase: "¡Hola! ¿Cómo estás?",
        translation: "Hi! How are you?",
        context: "Casual greeting between friends",
      },
      {
        id: "es-u1-l1-p2",
        phrase: "Buenos días",
        translation: "Good morning",
        context: "Formal greeting used before noon",
      },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "multiple_choice",
        prompt: "How do you say 'hello' in Spanish?",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correctAnswer: "Hola",
      },
      {
        id: "es-u1-l1-a2",
        type: "translate",
        prompt: "Translate: Good morning",
        correctAnswer: "Buenos días",
      },
      {
        id: "es-u1-l1-a3",
        type: "listen",
        prompt: "Listen and choose what you hear",
        options: ["Hola", "Adiós"],
        correctAnswer: "Hola",
        hint: "Listen for the soft 'h', it's silent in Spanish.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly, encouraging AI Spanish teacher speaking with a complete beginner. Speak primarily in English and introduce Spanish words naturally, always giving the English translation. This lesson focuses on greetings: hola, buenos días, adiós, and por favor. Keep sentences short, praise attempts, and gently correct pronunciation.",
      greeting: "¡Hola! Soy tu profesor de español.",
      greetingTranslation: "Hi! I'm your Spanish teacher.",
      focusAreas: ["greetings", "pronunciation", "basic vocabulary"],
    },
  },
  {
    id: "es-u1-l2",
    unitId: "es-u1",
    languageId: "es",
    order: 2,
    title: "Introduce Yourself",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "es-u1-l2-g1", description: "Say your name" },
      { id: "es-u1-l2-g2", description: "Ask someone's name" },
    ],
    vocabulary: [
      { id: "es-u1-l2-v1", term: "me llamo", translation: "my name is" },
      {
        id: "es-u1-l2-v2",
        term: "¿cómo te llamas?",
        translation: "what is your name?",
      },
      { id: "es-u1-l2-v3", term: "mucho gusto", translation: "nice to meet you" },
      { id: "es-u1-l2-v4", term: "soy de", translation: "I am from" },
    ],
    phrases: [
      {
        id: "es-u1-l2-p1",
        phrase: "Me llamo Ana. ¿Y tú?",
        translation: "My name is Ana. And you?",
        context: "Introducing yourself and asking their name back",
      },
      {
        id: "es-u1-l2-p2",
        phrase: "Mucho gusto.",
        translation: "Nice to meet you.",
        context: "Said right after learning someone's name",
      },
    ],
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "multiple_choice",
        prompt: "How do you ask 'What is your name?' in Spanish?",
        options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿De dónde eres?", "Mucho gusto"],
        correctAnswer: "¿Cómo te llamas?",
      },
      {
        id: "es-u1-l2-a2",
        type: "translate",
        prompt: "Translate: My name is Ana.",
        correctAnswer: "Me llamo Ana.",
      },
      {
        id: "es-u1-l2-a3",
        type: "speak",
        prompt: "Say out loud: Mucho gusto.",
        correctAnswer: "Mucho gusto",
        hint: "Stress the second syllable of 'mucho'.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly AI Spanish teacher helping a beginner practice introductions. Speak primarily in English, teach 'me llamo', '¿cómo te llamas?', and 'mucho gusto' through English explanations, and prompt the student to introduce themselves in Spanish.",
      greeting: "¿Cómo te llamas?",
      greetingTranslation: "What is your name?",
      focusAreas: ["introductions", "pronunciation", "conversation starters"],
    },
  },

  // ---------------------------------------------------------------------
  // Spanish · Unit 2 · Everyday Life
  // ---------------------------------------------------------------------
  {
    id: "es-u2-l1",
    unitId: "es-u2",
    languageId: "es",
    order: 1,
    title: "Morning Routine",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "es-u2-l1-g1", description: "Describe a simple morning routine" },
      { id: "es-u2-l1-g2", description: "Tell time using 'a las'" },
    ],
    vocabulary: [
      { id: "es-u2-l1-v1", term: "despertarse", translation: "to wake up" },
      { id: "es-u2-l1-v2", term: "desayunar", translation: "to have breakfast" },
      { id: "es-u2-l1-v3", term: "temprano", translation: "early" },
      { id: "es-u2-l1-v4", term: "todos los días", translation: "every day" },
    ],
    phrases: [
      {
        id: "es-u2-l1-p1",
        phrase: "Me despierto a las siete.",
        translation: "I wake up at seven.",
        context: "Describing your morning routine",
      },
      {
        id: "es-u2-l1-p2",
        phrase: "Desayuno todos los días.",
        translation: "I have breakfast every day.",
        context: "Talking about daily habits",
      },
    ],
    activities: [
      {
        id: "es-u2-l1-a1",
        type: "multiple_choice",
        prompt: "What does 'desayunar' mean?",
        options: ["to sleep", "to have breakfast", "to wake up", "to work"],
        correctAnswer: "to have breakfast",
      },
      {
        id: "es-u2-l1-a2",
        type: "translate",
        prompt: "Translate: I wake up early.",
        correctAnswer: "Me despierto temprano.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher helping a beginner talk about daily routines. Speak primarily in English, and walk the student through describing their morning using 'me despierto', 'desayuno', and 'temprano', explaining each phrase in English before asking them to repeat it in Spanish.",
      greeting: "¿A qué hora te despiertas?",
      greetingTranslation: "What time do you wake up?",
      focusAreas: ["daily routines", "time expressions", "reflexive verbs"],
    },
  },
  {
    id: "es-u2-l2",
    unitId: "es-u2",
    languageId: "es",
    order: 2,
    title: "Family & Home",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "es-u2-l2-g1", description: "Name close family members" },
      { id: "es-u2-l2-g2", description: "Describe where you live" },
    ],
    vocabulary: [
      { id: "es-u2-l2-v1", term: "la familia", translation: "the family" },
      { id: "es-u2-l2-v2", term: "la madre", translation: "the mother" },
      { id: "es-u2-l2-v3", term: "el padre", translation: "the father" },
      { id: "es-u2-l2-v4", term: "la casa", translation: "the house" },
    ],
    phrases: [
      {
        id: "es-u2-l2-p1",
        phrase: "Vivo con mi familia.",
        translation: "I live with my family.",
        context: "Describing your living situation",
      },
      {
        id: "es-u2-l2-p2",
        phrase: "Mi casa es pequeña.",
        translation: "My house is small.",
        context: "Describing your home",
      },
    ],
    activities: [
      {
        id: "es-u2-l2-a1",
        type: "match",
        prompt: "Match the Spanish word to its meaning: madre",
        correctAnswer: "mother",
      },
      {
        id: "es-u2-l2-a2",
        type: "translate",
        prompt: "Translate: I live with my family.",
        correctAnswer: "Vivo con mi familia.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher helping a beginner describe their family and home. Speak primarily in English, introduce 'la familia', 'la madre', 'el padre', and 'la casa', and encourage the student to describe their own family in simple Spanish sentences.",
      greeting: "Cuéntame de tu familia.",
      greetingTranslation: "Tell me about your family.",
      focusAreas: ["family vocabulary", "describing home", "simple sentences"],
    },
  },

  // ---------------------------------------------------------------------
  // Spanish · Unit 3 · At the Café
  // ---------------------------------------------------------------------
  {
    id: "es-u3-l1",
    unitId: "es-u3",
    languageId: "es",
    order: 1,
    title: "Greetings & Introductions",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "es-u3-l1-g1", description: "Review common greetings" },
      { id: "es-u3-l1-g2", description: "Introduce yourself confidently" },
    ],
    vocabulary: [
      { id: "es-u3-l1-v1", term: "buenas tardes", translation: "good afternoon" },
      { id: "es-u3-l1-v2", term: "encantado/a", translation: "delighted (to meet you)" },
      { id: "es-u3-l1-v3", term: "¿qué tal?", translation: "how's it going?" },
    ],
    phrases: [
      {
        id: "es-u3-l1-p1",
        phrase: "Buenas tardes, ¿qué tal?",
        translation: "Good afternoon, how's it going?",
        context: "Friendly afternoon greeting",
      },
      {
        id: "es-u3-l1-p2",
        phrase: "Encantado de conocerte.",
        translation: "Delighted to meet you.",
        context: "Polite way to meet someone new",
      },
    ],
    activities: [
      {
        id: "es-u3-l1-a1",
        type: "multiple_choice",
        prompt: "Which greeting is used in the afternoon?",
        options: ["Buenos días", "Buenas tardes", "Buenas noches", "Adiós"],
        correctAnswer: "Buenas tardes",
      },
      {
        id: "es-u3-l1-a2",
        type: "translate",
        prompt: "Translate: How's it going?",
        correctAnswer: "¿Qué tal?",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher reviewing greetings and introductions with a beginner before moving into café conversations. Speak primarily in English and reinforce 'buenas tardes', '¿qué tal?', and 'encantado/a' with short back-and-forth practice.",
      greeting: "¡Buenas tardes! ¿Qué tal?",
      greetingTranslation: "Good afternoon! How's it going?",
      focusAreas: ["greetings review", "confidence building", "pronunciation"],
    },
  },
  {
    id: "es-u3-l2",
    unitId: "es-u3",
    languageId: "es",
    order: 2,
    title: "Daily Life",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "es-u3-l2-g1", description: "Talk about daily activities" },
      { id: "es-u3-l2-g2", description: "Use present-tense verbs" },
    ],
    vocabulary: [
      { id: "es-u3-l2-v1", term: "trabajar", translation: "to work" },
      { id: "es-u3-l2-v2", term: "estudiar", translation: "to study" },
      { id: "es-u3-l2-v3", term: "descansar", translation: "to rest" },
    ],
    phrases: [
      {
        id: "es-u3-l2-p1",
        phrase: "Trabajo por la mañana.",
        translation: "I work in the morning.",
        context: "Describing your daily schedule",
      },
      {
        id: "es-u3-l2-p2",
        phrase: "Después, descanso un poco.",
        translation: "Afterward, I rest a little.",
        context: "Sequencing daily activities",
      },
    ],
    activities: [
      {
        id: "es-u3-l2-a1",
        type: "translate",
        prompt: "Translate: I study in the afternoon.",
        correctAnswer: "Estudio por la tarde.",
      },
      {
        id: "es-u3-l2-a2",
        type: "multiple_choice",
        prompt: "What does 'descansar' mean?",
        options: ["to work", "to rest", "to study", "to eat"],
        correctAnswer: "to rest",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher helping a beginner describe their day using present-tense verbs like trabajar, estudiar, and descansar. Speak primarily in English and guide the student through building simple daily-life sentences in Spanish.",
      greeting: "¿Qué haces todos los días?",
      greetingTranslation: "What do you do every day?",
      focusAreas: ["present tense verbs", "daily life vocabulary", "sentence building"],
    },
  },
  {
    id: "es-u3-l3",
    unitId: "es-u3",
    languageId: "es",
    order: 3,
    title: "At the Café",
    status: "in_progress",
    xpReward: 15,
    goals: [
      { id: "es-u3-l3-g1", description: "Order food and drinks" },
      { id: "es-u3-l3-g2", description: "Ask for the bill" },
    ],
    vocabulary: [
      { id: "es-u3-l3-v1", term: "el café", translation: "the coffee" },
      { id: "es-u3-l3-v2", term: "la cuenta", translation: "the bill" },
      { id: "es-u3-l3-v3", term: "quisiera", translation: "I would like" },
      { id: "es-u3-l3-v4", term: "el menú", translation: "the menu" },
    ],
    phrases: [
      {
        id: "es-u3-l3-p1",
        phrase: "Quisiera un café, por favor.",
        translation: "I would like a coffee, please.",
        context: "Ordering at a café",
      },
      {
        id: "es-u3-l3-p2",
        phrase: "La cuenta, por favor.",
        translation: "The bill, please.",
        context: "Asking for the check",
      },
    ],
    activities: [
      {
        id: "es-u3-l3-a1",
        type: "multiple_choice",
        prompt: "How do you politely order something?",
        options: ["Quisiera...", "Adiós...", "Descanso...", "Encantado..."],
        correctAnswer: "Quisiera...",
      },
      {
        id: "es-u3-l3-a2",
        type: "translate",
        prompt: "Translate: The bill, please.",
        correctAnswer: "La cuenta, por favor.",
      },
      {
        id: "es-u3-l3-a3",
        type: "speak",
        prompt: "Say out loud: Quisiera un café, por favor.",
        correctAnswer: "Quisiera un café, por favor",
        hint: "Roll the 'r' softly in 'quisiera'.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher role-playing as a café waiter to help a beginner practice ordering food and drinks. Speak primarily in English, teach 'quisiera', 'el menú', and 'la cuenta', and let the student practice a short ordering conversation in Spanish with your guidance.",
      greeting: "¡Bienvenido! ¿Qué le gustaría pedir?",
      greetingTranslation: "Welcome! What would you like to order?",
      focusAreas: ["ordering food", "polite requests", "role-play conversation"],
    },
  },
  {
    id: "es-u3-l4",
    unitId: "es-u3",
    languageId: "es",
    order: 4,
    title: "Travel & Directions",
    status: "locked",
    xpReward: 15,
    goals: [
      { id: "es-u3-l4-g1", description: "Ask for directions" },
      { id: "es-u3-l4-g2", description: "Understand basic directions" },
    ],
    vocabulary: [
      { id: "es-u3-l4-v1", term: "la calle", translation: "the street" },
      { id: "es-u3-l4-v2", term: "a la derecha", translation: "to the right" },
      { id: "es-u3-l4-v3", term: "a la izquierda", translation: "to the left" },
    ],
    phrases: [
      {
        id: "es-u3-l4-p1",
        phrase: "¿Dónde está la estación?",
        translation: "Where is the station?",
        context: "Asking for directions",
      },
    ],
    activities: [
      {
        id: "es-u3-l4-a1",
        type: "translate",
        prompt: "Translate: Where is the station?",
        correctAnswer: "¿Dónde está la estación?",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher helping a beginner ask for and follow simple directions. Speak primarily in English and teach 'a la derecha', 'a la izquierda', and '¿Dónde está...?' through short guided examples.",
      greeting: "¿Dónde está la estación?",
      greetingTranslation: "Where is the station?",
      focusAreas: ["directions", "prepositions", "asking questions"],
    },
  },
  {
    id: "es-u3-l5",
    unitId: "es-u3",
    languageId: "es",
    order: 5,
    title: "Shopping",
    status: "locked",
    xpReward: 15,
    goals: [
      { id: "es-u3-l5-g1", description: "Ask about prices" },
      { id: "es-u3-l5-g2", description: "Buy an item in a store" },
    ],
    vocabulary: [
      { id: "es-u3-l5-v1", term: "¿cuánto cuesta?", translation: "how much does it cost?" },
      { id: "es-u3-l5-v2", term: "barato", translation: "cheap" },
      { id: "es-u3-l5-v3", term: "caro", translation: "expensive" },
    ],
    phrases: [
      {
        id: "es-u3-l5-p1",
        phrase: "¿Cuánto cuesta esto?",
        translation: "How much does this cost?",
        context: "Asking about a price in a shop",
      },
    ],
    activities: [
      {
        id: "es-u3-l5-a1",
        type: "translate",
        prompt: "Translate: How much does this cost?",
        correctAnswer: "¿Cuánto cuesta esto?",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher role-playing as a shopkeeper to help a beginner practice shopping vocabulary. Speak primarily in English and teach '¿cuánto cuesta?', 'barato', and 'caro' through a short shopping role-play.",
      greeting: "¿En qué puedo ayudarte?",
      greetingTranslation: "How can I help you?",
      focusAreas: ["shopping vocabulary", "numbers and prices", "role-play conversation"],
    },
  },
  {
    id: "es-u3-l6",
    unitId: "es-u3",
    languageId: "es",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goals: [
      { id: "es-u3-l6-g1", description: "Talk about friends" },
      { id: "es-u3-l6-g2", description: "Describe relationships" },
    ],
    vocabulary: [
      { id: "es-u3-l6-v1", term: "el amigo / la amiga", translation: "friend" },
      { id: "es-u3-l6-v2", term: "cercano/a", translation: "close (relationship)" },
    ],
    phrases: [
      {
        id: "es-u3-l6-p1",
        phrase: "Es mi mejor amigo.",
        translation: "He is my best friend.",
        context: "Describing a close friendship",
      },
    ],
    activities: [
      {
        id: "es-u3-l6-a1",
        type: "translate",
        prompt: "Translate: He is my best friend.",
        correctAnswer: "Es mi mejor amigo.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Spanish teacher helping a beginner talk about friends and relationships. Speak primarily in English and teach 'el amigo/la amiga' and 'cercano/a' through simple guided sentences.",
      greeting: "Háblame de tus amigos.",
      greetingTranslation: "Tell me about your friends.",
      focusAreas: ["relationships vocabulary", "descriptive adjectives", "sentence building"],
    },
  },

  // ---------------------------------------------------------------------
  // French · Unit 1 · Bonjour!
  // ---------------------------------------------------------------------
  {
    id: "fr-u1-l1",
    unitId: "fr-u1",
    languageId: "fr",
    order: 1,
    title: "Say Hello",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "fr-u1-l1-g1", description: "Greet someone in French" },
      { id: "fr-u1-l1-g2", description: "Say goodbye politely" },
    ],
    vocabulary: [
      { id: "fr-u1-l1-v1", term: "bonjour", translation: "hello / good day" },
      { id: "fr-u1-l1-v2", term: "salut", translation: "hi (informal)" },
      { id: "fr-u1-l1-v3", term: "au revoir", translation: "goodbye" },
      { id: "fr-u1-l1-v4", term: "merci", translation: "thank you" },
    ],
    phrases: [
      {
        id: "fr-u1-l1-p1",
        phrase: "Bonjour! Comment ça va?",
        translation: "Hello! How are you?",
        context: "Common everyday greeting",
      },
      {
        id: "fr-u1-l1-p2",
        phrase: "Au revoir, à bientôt!",
        translation: "Goodbye, see you soon!",
        context: "Casual farewell",
      },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "multiple_choice",
        prompt: "How do you say 'hello' in French?",
        options: ["Bonjour", "Au revoir", "Merci", "Salut"],
        correctAnswer: "Bonjour",
      },
      {
        id: "fr-u1-l1-a2",
        type: "translate",
        prompt: "Translate: Thank you",
        correctAnswer: "Merci",
      },
      {
        id: "fr-u1-l1-a3",
        type: "listen",
        prompt: "Listen and choose what you hear",
        options: ["Bonjour", "Au revoir"],
        correctAnswer: "Bonjour",
        hint: "The 'j' in bonjour sounds soft, like the 's' in 'measure'.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly AI French teacher speaking with a complete beginner. Speak primarily in English and introduce 'bonjour', 'salut', 'au revoir', and 'merci' with clear English explanations, then encourage the student to repeat each word.",
      greeting: "Bonjour! Je suis ton professeur de français.",
      greetingTranslation: "Hello! I'm your French teacher.",
      focusAreas: ["greetings", "pronunciation", "basic vocabulary"],
    },
  },
  {
    id: "fr-u1-l2",
    unitId: "fr-u1",
    languageId: "fr",
    order: 2,
    title: "Numbers & Colors",
    status: "in_progress",
    xpReward: 10,
    goals: [
      { id: "fr-u1-l2-g1", description: "Count from one to ten" },
      { id: "fr-u1-l2-g2", description: "Name basic colors" },
    ],
    vocabulary: [
      { id: "fr-u1-l2-v1", term: "un, deux, trois", translation: "one, two, three" },
      { id: "fr-u1-l2-v2", term: "rouge", translation: "red" },
      { id: "fr-u1-l2-v3", term: "bleu", translation: "blue" },
    ],
    phrases: [
      {
        id: "fr-u1-l2-p1",
        phrase: "J'ai deux pommes rouges.",
        translation: "I have two red apples.",
        context: "Combining numbers and colors",
      },
    ],
    activities: [
      {
        id: "fr-u1-l2-a1",
        type: "multiple_choice",
        prompt: "What color is 'bleu'?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: "Blue",
      },
      {
        id: "fr-u1-l2-a2",
        type: "translate",
        prompt: "Translate: I have two red apples.",
        correctAnswer: "J'ai deux pommes rouges.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI French teacher helping a beginner learn numbers one through ten and basic colors. Speak primarily in English and use simple, playful examples like counting colored objects.",
      greeting: "Comptons ensemble, un, deux, trois!",
      greetingTranslation: "Let's count together, one, two, three!",
      focusAreas: ["numbers", "colors", "simple sentences"],
    },
  },
  {
    id: "fr-u1-l3",
    unitId: "fr-u1",
    languageId: "fr",
    order: 3,
    title: "Ordering Food",
    status: "locked",
    xpReward: 15,
    goals: [
      { id: "fr-u1-l3-g1", description: "Order food at a restaurant" },
      { id: "fr-u1-l3-g2", description: "Ask for the bill" },
    ],
    vocabulary: [
      { id: "fr-u1-l3-v1", term: "je voudrais", translation: "I would like" },
      { id: "fr-u1-l3-v2", term: "l'addition", translation: "the bill" },
    ],
    phrases: [
      {
        id: "fr-u1-l3-p1",
        phrase: "Je voudrais un croissant, s'il vous plaît.",
        translation: "I would like a croissant, please.",
        context: "Ordering at a bakery or café",
      },
    ],
    activities: [
      {
        id: "fr-u1-l3-a1",
        type: "translate",
        prompt: "Translate: I would like a croissant, please.",
        correctAnswer: "Je voudrais un croissant, s'il vous plaît.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI French teacher role-playing as a waiter to help a beginner order food politely. Speak primarily in English and teach 'je voudrais' and 'l'addition' through a short ordering role-play.",
      greeting: "Bonjour! Qu'est-ce que vous voulez commander?",
      greetingTranslation: "Hello! What would you like to order?",
      focusAreas: ["ordering food", "polite requests", "role-play conversation"],
    },
  },

  // ---------------------------------------------------------------------
  // Japanese · Unit 1 · Hiragana & Greetings
  // ---------------------------------------------------------------------
  {
    id: "ja-u1-l1",
    unitId: "ja-u1",
    languageId: "ja",
    order: 1,
    title: "Basic Greetings",
    status: "completed",
    xpReward: 10,
    goals: [
      { id: "ja-u1-l1-g1", description: "Greet someone in Japanese" },
      { id: "ja-u1-l1-g2", description: "Say thank you politely" },
    ],
    vocabulary: [
      { id: "ja-u1-l1-v1", term: "こんにちは (konnichiwa)", translation: "hello" },
      { id: "ja-u1-l1-v2", term: "ありがとう (arigatou)", translation: "thank you" },
      { id: "ja-u1-l1-v3", term: "さようなら (sayounara)", translation: "goodbye" },
    ],
    phrases: [
      {
        id: "ja-u1-l1-p1",
        phrase: "こんにちは、元気ですか？",
        translation: "Hello, how are you?",
        context: "Common daytime greeting",
      },
      {
        id: "ja-u1-l1-p2",
        phrase: "ありがとうございます。",
        translation: "Thank you very much.",
        context: "Polite way to say thank you",
      },
    ],
    activities: [
      {
        id: "ja-u1-l1-a1",
        type: "multiple_choice",
        prompt: "How do you say 'hello' in Japanese?",
        options: ["こんにちは", "ありがとう", "さようなら", "すみません"],
        correctAnswer: "こんにちは",
      },
      {
        id: "ja-u1-l1-a2",
        type: "translate",
        prompt: "Translate: Thank you",
        correctAnswer: "ありがとう",
      },
      {
        id: "ja-u1-l1-a3",
        type: "listen",
        prompt: "Listen and choose what you hear",
        options: ["こんにちは", "さようなら"],
        correctAnswer: "こんにちは",
        hint: "Listen for the four even syllables: ko-n-ni-chi-wa.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly AI Japanese teacher speaking with a complete beginner. Speak primarily in English and introduce 'konnichiwa', 'arigatou', and 'sayounara' phonetically, explaining pronunciation clearly before asking the student to repeat.",
      greeting: "こんにちは！日本語の先生です。",
      greetingTranslation: "Hello! I'm your Japanese teacher.",
      focusAreas: ["greetings", "pronunciation", "basic vocabulary"],
    },
  },
  {
    id: "ja-u1-l2",
    unitId: "ja-u1",
    languageId: "ja",
    order: 2,
    title: "Introducing Yourself",
    status: "in_progress",
    xpReward: 10,
    goals: [
      { id: "ja-u1-l2-g1", description: "Say your name" },
      { id: "ja-u1-l2-g2", description: "Say where you are from" },
    ],
    vocabulary: [
      { id: "ja-u1-l2-v1", term: "わたしは...です (watashi wa ... desu)", translation: "I am ..." },
      { id: "ja-u1-l2-v2", term: "よろしくお願いします (yoroshiku onegaishimasu)", translation: "nice to meet you" },
    ],
    phrases: [
      {
        id: "ja-u1-l2-p1",
        phrase: "わたしはアナです。よろしくお願いします。",
        translation: "I am Ana. Nice to meet you.",
        context: "Formal self-introduction",
      },
    ],
    activities: [
      {
        id: "ja-u1-l2-a1",
        type: "translate",
        prompt: "Translate: I am Ana.",
        correctAnswer: "わたしはアナです。",
      },
      {
        id: "ja-u1-l2-a2",
        type: "speak",
        prompt: "Say out loud: よろしくお願いします",
        correctAnswer: "yoroshiku onegaishimasu",
        hint: "Break it into parts: yo-ro-shi-ku o-ne-gai-shi-mas.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Japanese teacher helping a beginner introduce themselves politely. Speak primarily in English and teach 'watashi wa ... desu' and 'yoroshiku onegaishimasu' step by step, romanizing every phrase.",
      greeting: "お名前は何ですか？",
      greetingTranslation: "What is your name?",
      focusAreas: ["introductions", "pronunciation", "formal speech"],
    },
  },
  {
    id: "ja-u1-l3",
    unitId: "ja-u1",
    languageId: "ja",
    order: 3,
    title: "Numbers 1-10",
    status: "locked",
    xpReward: 10,
    goals: [
      { id: "ja-u1-l3-g1", description: "Count from one to ten in Japanese" },
    ],
    vocabulary: [
      { id: "ja-u1-l3-v1", term: "いち、に、さん (ichi, ni, san)", translation: "one, two, three" },
      { id: "ja-u1-l3-v2", term: "じゅう (juu)", translation: "ten" },
    ],
    phrases: [
      {
        id: "ja-u1-l3-p1",
        phrase: "いちから、じゅうまで数えられます。",
        translation: "I can count from one to ten.",
        context: "Practicing numbers",
      },
    ],
    activities: [
      {
        id: "ja-u1-l3-a1",
        type: "translate",
        prompt: "Translate: ten",
        correctAnswer: "じゅう",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an AI Japanese teacher helping a beginner count from one to ten. Speak primarily in English and romanize each number, drilling them in short repeated sequences.",
      greeting: "いち、に、さん、始めましょう！",
      greetingTranslation: "One, two, three, let's begin!",
      focusAreas: ["numbers", "pronunciation", "repetition drills"],
    },
  },
];

export function getLessonsForUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsForLanguage(languageId: LanguageId): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageId === languageId)
    .sort((a, b) => {
      const unitOrderDiff =
        (getUnitById(a.unitId)?.order ?? 0) - (getUnitById(b.unitId)?.order ?? 0);
      return unitOrderDiff !== 0 ? unitOrderDiff : a.order - b.order;
    });
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

// The lesson to resume: the one already in progress, or the next locked
// lesson if today's work hasn't started yet, falling back to the last
// lesson once everything is complete.
export function getCurrentLessonForLanguage(languageId: LanguageId): Lesson | undefined {
  const languageLessons = getLessonsForLanguage(languageId);
  return (
    languageLessons.find((lesson) => lesson.status === "in_progress") ??
    languageLessons.find((lesson) => lesson.status === "locked") ??
    languageLessons[languageLessons.length - 1]
  );
}
