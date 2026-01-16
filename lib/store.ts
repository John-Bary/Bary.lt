import { create } from "zustand";

export type Language = "lt" | "en";

interface ThemeState {
  isDark: boolean;
  isLoaded: boolean;
  scrollProgress: number;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  setLoaded: (loaded: boolean) => void;
  setScrollProgress: (progress: number) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  isLoaded: false,
  scrollProgress: 0,
  language: "lt",
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "lt" ? "en" : "lt" })),
  setLanguage: (language) => set({ language }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
