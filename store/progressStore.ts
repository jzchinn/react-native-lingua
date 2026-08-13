import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

interface ProgressState {
  xp: number;
  dailyGoalXp: number;
  streak: number;
  completedPlanItemIds: string[];
  hasHydrated: boolean;
  togglePlanItem: (id: string) => void;
}

// See store/languageStore.ts for why web SSR needs a no-op storage fallback.
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      xp: 15,
      dailyGoalXp: 20,
      streak: 12,
      // Matches the current Spanish demo lesson (es-u3-l3) so the design's
      // default state — "Lesson" already checked off today — holds on first launch.
      completedPlanItemIds: ["es-u3-l3-lesson"],
      hasHydrated: false,
      togglePlanItem: (id) =>
        set((state) => ({
          completedPlanItemIds: state.completedPlanItemIds.includes(id)
            ? state.completedPlanItemIds.filter((itemId) => itemId !== id)
            : [...state.completedPlanItemIds, id],
        })),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : AsyncStorage,
      ),
      partialize: (state) => ({
        xp: state.xp,
        dailyGoalXp: state.dailyGoalXp,
        streak: state.streak,
        completedPlanItemIds: state.completedPlanItemIds,
      }),
      onRehydrateStorage: () => () => {
        useProgressStore.setState({ hasHydrated: true });
      },
    },
  ),
);
