"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/store";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory and AI-powered recommendations.",
    tags: ["React", "Node.js", "MongoDB"],
    icon: "🛒",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "AI Dashboard",
    description:
      "Interactive analytics dashboard with machine learning insights and predictive modeling.",
    tags: ["Python", "TensorFlow", "D3.js"],
    icon: "🤖",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Mobile Banking App",
    description:
      "Secure fintech application with biometric authentication and real-time transactions.",
    tags: ["React Native", "Firebase", "Stripe"],
    icon: "💳",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Social Network",
    description:
      "Modern social platform with real-time messaging, stories, and content discovery.",
    tags: ["Vue.js", "GraphQL", "PostgreSQL"],
    icon: "💬",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    title: "3D Game Engine",
    description:
      "WebGL-based game engine with physics simulation and particle systems.",
    tags: ["Three.js", "WebGL", "TypeScript"],
    icon: "🎮",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    title: "Health Tracker",
    description:
      "Comprehensive wellness app with wearable integration and health analytics.",
    tags: ["Flutter", "HealthKit", "Charts"],
    icon: "❤️",
    gradient: "from-teal-300 to-pink-300",
  },
];

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isDark } = useThemeStore();

  const rotate = (direction: number) => {
    setCurrentIndex(
      (prev) => (prev + direction + projects.length) % projects.length
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => rotate(1), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = (diff + projects.length) % projects.length;
    const adjustedDiff =
      normalizedDiff > projects.length / 2
        ? normalizedDiff - projects.length
        : normalizedDiff;

    const angle = adjustedDiff * (360 / projects.length);
    const radian = (angle * Math.PI) / 180;
    const z = Math.cos(radian) * 250;
    const x = Math.sin(radian) * 350;
    const scale = ((z + 250) / 500) * 0.4 + 0.6;
    const opacity = ((z + 250) / 500) * 0.6 + 0.4;

    return {
      x,
      z,
      scale,
      opacity,
      zIndex: Math.round(z + 300),
    };
  };

  return (
    <section id="projects" className="relative z-10 py-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? "text-white" : "text-gray-900"}>
              Featured{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p
            className={`text-lg max-w-xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore our latest work and creative endeavors
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div
          className="relative h-[500px] flex items-center justify-center"
          style={{ perspective: "1500px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {projects.map((project, i) => {
              const style = getCardStyle(i);
              return (
                <motion.div
                  key={i}
                  className={`absolute left-1/2 top-1/2 w-[320px] h-[400px] rounded-3xl overflow-hidden cursor-pointer border ${
                    isDark
                      ? "bg-gradient-to-br from-[#0f0a1a]/95 to-[#1a0a2e]/95 border-purple-500/30 hover:border-cyan-400"
                      : "bg-gradient-to-br from-white/95 to-purple-50/95 border-purple-200 hover:border-purple-400"
                  }`}
                  style={{
                    marginLeft: "-160px",
                    marginTop: "-200px",
                    zIndex: style.zIndex,
                  }}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotateY: style.x * 0.02,
                  }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{
                    boxShadow: isDark
                      ? "0 25px 50px rgba(6, 182, 212, 0.3)"
                      : "0 25px 50px rgba(139, 92, 246, 0.2)",
                  }}
                  onClick={() => setCurrentIndex(i)}
                  data-cursor="pointer"
                >
                  {/* Project Image */}
                  <div
                    className={`h-48 bg-gradient-to-br ${project.gradient} relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-60">
                      {project.icon}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 rounded-full text-xs ${
                            isDark
                              ? "bg-purple-500/20 text-cyan-400"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-3 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>
                    <a
                      href="#"
                      className={`inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-4 ${
                        isDark ? "text-cyan-400" : "text-purple-500"
                      }`}
                    >
                      View Project →
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              isDark
                ? "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500 hover:border-purple-500"
                : "border-purple-200 bg-purple-50 hover:bg-purple-500 hover:border-purple-500 hover:text-white"
            }`}
            onClick={() => rotate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              isDark
                ? "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500 hover:border-purple-500"
                : "border-purple-200 bg-purple-50 hover:bg-purple-500 hover:border-purple-500 hover:text-white"
            }`}
            onClick={() => rotate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? isDark
                    ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-purple-500 shadow-lg shadow-purple-500/50"
                  : isDark
                  ? "bg-purple-500/30 hover:bg-purple-500/50"
                  : "bg-purple-200 hover:bg-purple-300"
              }`}
              onClick={() => setCurrentIndex(i)}
              whileHover={{ scale: 1.3 }}
              animate={{ scale: i === currentIndex ? 1.3 : 1 }}
              data-cursor="pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}