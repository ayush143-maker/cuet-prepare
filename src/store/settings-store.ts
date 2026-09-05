import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AppSettings } from "@/types/settings";
import { DEFAULT_SETTINGS, STORAGE_KEYS } from "@/lib/storage";

interface SettingsState extends AppSettings {
  setTheme: (theme: AppSettings["theme"]) => void;
  toggleSound: () => void;
  toggleAutoSubmit: () => void;
  toggleShowExplanationInstantly: () => void;
  setDefaultTimeLimitSeconds: (seconds: number) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setTheme: (theme) => {
        set({ theme });
      },

      toggleSound: () => {
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        }));
      },

      toggleAutoSubmit: () => {
        set((state) => ({
          autoSubmit: !state.autoSubmit,
        }));
      },

      toggleShowExplanationInstantly: () => {
        set((state) => ({
          showExplanationInstantly: !state.showExplanationInstantly,
        }));
      },

      setDefaultTimeLimitSeconds: (seconds) => {
        set({
          defaultTimeLimitSeconds: seconds,
        });
      },

      resetSettings: () => {
        set(DEFAULT_SETTINGS);
      },
    }),
    {
      name: STORAGE_KEYS.settings,
    }
  )
);
