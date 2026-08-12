import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type { LanguageId } from "@/types/learning";

interface LanguageState {
  selectedLanguageId: LanguageId | null;
  hasHydrated: boolean;
  setSelectedLanguage: (languageId: LanguageId) => void;
  clearSelectedLanguage: () => void;
}

// The web build of AsyncStorage reads `window.localStorage` synchronously,
// which throws during Expo Router's server-side render pass (no `window`
// in that Node environment). Fall back to a no-op storage there; the
// client re-hydrates from the real storage once it mounts in the browser.
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setSelectedLanguage: (languageId) => set({ selectedLanguageId: languageId }),
      clearSelectedLanguage: () => set({ selectedLanguageId: null }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : AsyncStorage,
      ),
      partialize: (state) => ({ selectedLanguageId: state.selectedLanguageId }),
      onRehydrateStorage: () => () => {
        useLanguageStore.setState({ hasHydrated: true });
      },
    },
  ),
);
