// Mirrors the --color-* tokens in global.css.
// Use this for native APIs that can't take a className (StatusBar, native
// SVGs, etc). For component styling, prefer the NativeWind utilities
// (bg-lingua-purple, text-text-primary, ...) generated from global.css.
export const colors = {
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D8BFF",
  linguaGreen: "#21C16B",

  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;
