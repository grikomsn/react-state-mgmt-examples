import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserPreferences, UIState } from "../../types";

export type { UserPreferences };

interface PreferencesState {
  user: UserPreferences;
  ui: UIState;
  updateUser: (updates: Partial<UserPreferences>) => void;
  updateUI: (updates: Partial<UIState>) => void;
  toggleSidebar: () => void;
  resetToDefaults: () => void;
}

const defaultUser: UserPreferences = {
  name: "Guest User",
  email: "",
  notifications: true,
  theme: "dark",
  fontSize: "medium",
  autoSave: true,
};

const defaultUI: UIState = {
  sidebarOpen: true,
  layoutMode: "comfortable",
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      user: defaultUser,
      ui: defaultUI,
      updateUser: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),
      updateUI: (updates) =>
        set((state) => ({
          ui: { ...state.ui, ...updates },
        })),
      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
        })),
      resetToDefaults: () =>
        set({
          user: defaultUser,
          ui: defaultUI,
        }),
    }),
    {
      name: "preferences-storage",
    }
  )
);
