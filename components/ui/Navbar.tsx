"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/store";
import LanguageToggle from "@/components/ui/LanguageToggle";

const navItemsByLanguage = {
  en: [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  lt: [
    { name: "Pradžia", href: "#home" },
    { name: "Paslaugos", href: "#services" },
    { name: "Atvejų analizės", href: "#case-studies" },
    { name: "Apie", href: "#about" },
    { name: "Kontaktai", href: "#contact" },
  ],
};

const ctaByLanguage = {
  en: "Free Consultation",
  lt: "Nemokama konsultacija",
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, language } = useThemeStore();
  const navItems = navItemsByLanguage[language];
  const ctaLabel = ctaByLanguage[language];
  const toggleMenuLabel =
    language === "lt"
      ? isMobileMenuOpen
        ? "Uždaryti meniu"
        : "Atidaryti meniu"
      : isMobileMenuOpen
      ? "Close menu"
      : "Open menu";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "bg-[#050208]/90 backdrop-blur-xl border-b border-white/10"
            : "bg-white/90 backdrop-blur-xl border-b border-gray-200"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Changed from www.bary.lt to just Bary */}
          <motion.a
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            data-cursor="pointer"
          >
            Bary
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ y: -2 }}
                data-cursor="pointer"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* CTA + Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              {ctaLabel}
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={toggleMenuLabel}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full transition-all ${
                  isDark ? "bg-white" : "bg-gray-900"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 w-full transition-all ${
                  isDark ? "bg-white" : "bg-gray-900"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full transition-all ${
                  isDark ? "bg-white" : "bg-gray-900"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`md:hidden mt-4 p-4 rounded-2xl ${
                isDark ? "bg-[#0a0612]" : "bg-white"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block py-3 text-lg ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3">
                <LanguageToggle />
              </div>
              <a
                href="#contact"
                className="block mt-4 py-3 px-6 text-center font-semibold rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {ctaLabel}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
