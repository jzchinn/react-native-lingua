import { fonts } from "./fonts";

// Mirrors the h1/h2/.../caption utilities in global.css (size + line-height
// + weight/family + color). Use this for StyleSheet-based text styling;
// otherwise prefer the className utilities directly, e.g. className="h1".
export const typography = {
  h1: { fontSize: 32, lineHeight: 32 * 1.2, fontFamily: fonts.bold },
  h2: { fontSize: 24, lineHeight: 24 * 1.3, fontFamily: fonts.semiBold },
  h3: { fontSize: 20, lineHeight: 20 * 1.3, fontFamily: fonts.semiBold },
  h4: { fontSize: 16, lineHeight: 16 * 1.4, fontFamily: fonts.medium },
  bodyLarge: { fontSize: 16, lineHeight: 16 * 1.6, fontFamily: fonts.regular },
  bodyMedium: { fontSize: 14, lineHeight: 14 * 1.6, fontFamily: fonts.regular },
  bodySmall: { fontSize: 13, lineHeight: 13 * 1.6, fontFamily: fonts.regular },
  caption: { fontSize: 11, lineHeight: 11 * 1.4, fontFamily: fonts.regular },
} as const;
