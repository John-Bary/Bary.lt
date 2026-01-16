"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/store";

const loadingCopy = {
  en: "Loading site...",
  lt: "Krauname puslapį...",
};

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const { isLoaded, setLoaded, language } = useThemeStore();
  const loadingLabel = loadingCopy[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaded(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050208]"
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-purple-500/30"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Orbiting rings */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-32 h-32 rounded-full border border-purple-500/50" />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-40 h-40 rounded-full border border-cyan-400/30" />
            </motion.div>

            {/* Center sphere */}
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center relative z-10"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 60px rgba(139, 92, 246, 0.8)",
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-bold text-2xl">B</span>
            </motion.div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              www.bary.lt
            </h2>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <motion.p
              className="text-gray-500 text-sm mt-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {loadingLabel} {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: [0, (i % 2 === 0 ? 1 : -1) * (100 + Math.random() * 100)],
                y: [0, -100 - Math.random() * 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
