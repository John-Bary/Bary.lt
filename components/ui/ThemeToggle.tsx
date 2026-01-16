"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/store";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e, #16213e)"
          : "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        boxShadow: isDark
          ? "0 0 20px rgba(139, 92, 246, 0.3)"
          : "0 0 20px rgba(251, 191, 36, 0.3)",
      }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        className="relative w-6 h-6"
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {/* Moon */}
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#8B5CF6"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
        </motion.svg>

        {/* Sun */}
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
        >
          <circle cx="12" cy="12" r="5" fill="#FBBF24" />
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1="12"
              y1="1"
              x2="12"
              y2="4"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                transformOrigin: "12px 12px",
                transform: `rotate(${i * 45}deg)`,
              }}
              animate={{ opacity: isDark ? 0 : 1 }}
            />
          ))}
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}