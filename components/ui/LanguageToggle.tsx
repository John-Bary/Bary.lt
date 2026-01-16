"use client";

import { useThemeStore } from "@/lib/store";

export default function LanguageToggle() {
  const { isDark, language, toggleLanguage } = useThemeStore();
  const isLithuanian = language === "lt";
  const activeClass = isDark ? "text-white" : "text-gray-900";
  const inactiveClass = isDark ? "text-gray-500" : "text-gray-400";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={
        isLithuanian ? "Perjungti į anglų kalbą" : "Switch to Lithuanian"
      }
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-colors ${
        isDark
          ? "border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-white/30"
          : "border-gray-200 bg-white/80 text-gray-600 hover:text-gray-900 hover:border-gray-400"
      }`}
    >
      <span className={isLithuanian ? activeClass : inactiveClass}>LT</span>
      <span className={isDark ? "text-gray-600" : "text-gray-400"}>/</span>
      <span className={isLithuanian ? inactiveClass : activeClass}>EN</span>
    </button>
  );
}
