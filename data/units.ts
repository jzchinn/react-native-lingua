import type { LanguageId, Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-u1",
    languageId: "es",
    order: 1,
    title: "Greetings & Basics",
    description: "Say hello and introduce yourself in Spanish.",
    level: "A1",
  },
  {
    id: "es-u2",
    languageId: "es",
    order: 2,
    title: "Everyday Life",
    description: "Talk about your daily routine and home.",
    level: "A1",
  },
  {
    id: "es-u3",
    languageId: "es",
    order: 3,
    title: "At the Café",
    description: "Order food and drinks with confidence.",
    level: "A1",
  },

  // French
  {
    id: "fr-u1",
    languageId: "fr",
    order: 1,
    title: "Bonjour!",
    description: "Greetings and everyday French basics.",
    level: "A1",
  },

  // Japanese
  {
    id: "ja-u1",
    languageId: "ja",
    order: 1,
    title: "Hiragana & Greetings",
    description: "Learn to greet people and introduce yourself in Japanese.",
    level: "A1",
  },
];

export function getUnitsForLanguage(languageId: LanguageId): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
