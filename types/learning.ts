// Shared types for the hardcoded learning content system.
// See data/languages.ts, data/units.ts, and data/lessons.ts.

export type LanguageId = "es" | "fr" | "ja" | "ko" | "de" | "zh";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface Language {
  id: LanguageId;
  name: string;
  nativeName: string;
  flagEmoji: string;
  learners: string;
  popular: boolean;
}

export interface Unit {
  id: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
  level: CefrLevel;
}

export type LessonStatus = "completed" | "in_progress" | "locked";

export interface LessonGoal {
  id: string;
  description: string;
}

export interface VocabularyItem {
  id: string;
  term: string;
  translation: string;
  partOfSpeech?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  context?: string;
}

export type ActivityType =
  | "multiple_choice"
  | "translate"
  | "listen"
  | "match"
  | "speak";

export interface Activity {
  id: string;
  type: ActivityType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
}

// Context handed to the Stream Vision Agent AI teacher for a lesson's
// audio-based conversation. The teacher speaks English and teaches the
// target language through English.
export interface AiTeacherPrompt {
  systemPrompt: string;
  greeting: string;
  greetingTranslation: string;
  focusAreas: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: LanguageId;
  order: number;
  title: string;
  status: LessonStatus;
  xpReward: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AiTeacherPrompt;
}
