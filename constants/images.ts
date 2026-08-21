import earth from "@/assets/images/earth.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";

export const images = {
  mascotLogo,
  mascotWelcome,
  mascotAuth,
  earth,
  palace,
  streakFire,
  treasure,
  // Placeholder headshot (Unsplash) — no local asset exists yet for the AI teacher avatar.
  aiTeacherAvatar: {
    uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
  // Placeholder unit hero illustrations (Picsum, keyed by unit id) — no local
  // artwork exists yet for each unit's lesson-list header.
  unitHero: {
    "es-u1": { uri: "https://picsum.photos/seed/es-u1-lesson/800/600" },
    "es-u2": { uri: "https://picsum.photos/seed/es-u2-lesson/800/600" },
    "es-u3": { uri: "https://picsum.photos/seed/es-u3-lesson/800/600" },
    "fr-u1": { uri: "https://picsum.photos/seed/fr-u1-lesson/800/600" },
    "ja-u1": { uri: "https://picsum.photos/seed/ja-u1-lesson/800/600" },
  } as Record<string, { uri: string }>,
};
