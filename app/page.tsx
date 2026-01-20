"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ProjectsCarousel from "@/components/Sections/ProjectsCarousel";
import ServicesSection from "@/components/Sections/ServicesSection";
import { useThemeStore } from "@/lib/store";
import Scene3DWrapper from "@/components/three/Scene3DWrapper";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const clientLogos = [
  { name: "TechCorp", logo: "🏢" },
  { name: "StartupX", logo: "🚀" },
  { name: "AgencyPro", logo: "💼" },
];

const copyByLanguage = {
  en: {
    hero: {
      headlinePrimary: "Strategic partner",
      headlineSecondary: "for your business",
      value:
        "We help companies grow with marketing, automation, research, and consulting without the overhead of a full team.",
      ctaPrimary: "Book a Free Strategy Call",
      ctaSecondary: "See Case Studies",
    },
    approach: {
      titleLead: "How We",
      titleHighlight: "Work",
      subtitle: "A simple, transparent process designed for results",
      steps: [
        {
          step: "01",
          icon: "🧭",
          title: "Discovery & Research",
          desc: "We start with your goals, audience, and market. We conduct research to identify opportunities and create a clear strategy.",
        },
        {
          step: "02",
          icon: "✍️",
          title: "Strategy & Execution",
          desc: "From content creation to automation setup, we handle the work while keeping you informed with regular updates.",
        },
        {
          step: "03",
          icon: "📈",
          title: "Measure & Optimize",
          desc: "We track what matters, analyze results, and continuously improve to maximize your ROI.",
        },
      ],
    },
    about: {
      titleLead: "About",
      titleHighlight: "BARY",
      paragraphs: [
        "The BARY team brings expertise in growth marketing, from positioning and lifecycle campaigns to content systems, alongside technical consulting that ships real code for automation, integrations, and custom tools.",
        "We have served businesses in the UK, Spain, and Lithuania, with 5+ years of experience and 10+ projects in 3 countries. Our approach is to learn your business, design a clear plan, execute with precision, and optimize with data.",
      ],
      stats: [
        { number: "10+", label: "Projects" },
        { number: "5+", label: "Years" },
        { number: "3", label: "Countries" },
      ],
      bullets: [
        "Marketing expertise: positioning, lifecycle campaigns, content systems",
        "Technical consulting: automation, integrations, and custom builds",
        "Served businesses in the UK, Spain, and Lithuania",
        "10+ projects delivered over 5+ years in 3 countries",
      ],
      photoCaption: "Add your photo here",
      locationLabel: "Lithuania",
    },
    contact: {
      titleLead: "Ready to",
      titleHighlight: "Grow Together?",
      body:
        "Book a free 30-minute strategy call. Share your goals and challenges, and we'll provide actionable insights—no strings attached.",
      form: {
        namePlaceholder: "Your name",
        emailPlaceholder: "Your email",
        helpPrompt: "What do you need help with?",
        helpOptions: [
          { value: "marketing", label: "Marketing & Content" },
          { value: "consulting", label: "Business Consulting" },
          { value: "research", label: "Research & Analysis" },
          { value: "other", label: "Not sure yet" },
        ],
        projectPlaceholder: "Tell me about your project (optional)",
        submitLabel: "Book My Free Strategy Call",
      },
      benefits: [
        "✓ Free 30-minute call",
        "✓ No commitment",
        "✓ Reply within 24 hours",
      ],
    },
    footer: {
      links: [
        { name: "LinkedIn", href: "#" },
        { name: "Email", href: "mailto:hello@bary.lt" },
        { name: "Calendly", href: "#" },
      ],
      rights: "© 2025 Bary. All rights reserved.",
      countries: "🇱🇹 Lithuania, 🇪🇸 Spain & 🇬🇧 UK",
    },
  },
  lt: {
    hero: {
      headlinePrimary: "Strateginis partneris",
      headlineSecondary: "jūsų verslui",
      value:
        "Norite augimo, bet nenorite samdyti visos komandos? Padėsime su rinkodara, automatizavimu, tyrimais ir konsultacijomis.",
      ctaPrimary: "Rezervuoti nemokamą skambutį",
      ctaSecondary: "Peržiūrėti atvejų analizes",
    },
    approach: {
      titleLead: "Kaip",
      titleHighlight: "dirbame",
      subtitle: "Aiškiai, greitai ir be nereikalingo triukšmo.",
      steps: [
        {
          step: "01",
          icon: "🧭",
          title: "Susipažinimas ir analizė",
          desc: "Pradedame nuo tikslų, auditorijos ir rinkos. Išsigryniname, kas veikia, kur prarandate potencialą, ir sudėliojame planą.",
        },
        {
          step: "02",
          icon: "✍️",
          title: "Strategija ir įgyvendinimas",
          desc: "Įgyvendiname: turinį, kampanijas, automatizacijas, integracijas. Jūs visada žinote, kas daroma ir kodėl.",
        },
        {
          step: "03",
          icon: "📈",
          title: "Rezultatai ir optimizavimas",
          desc: "Matuojame, testuojame ir tobuliname. Paliekame tai, kas veikia, ir auginame ROI.",
        },
      ],
    },
    about: {
      titleLead: "Apie",
      titleHighlight: "BARY",
      paragraphs: [
        "BARY komanda sujungia augimo rinkodarą ir technines konsultacijas. Padedame nuo pozicionavimo, kampanijų ir turinio sistemų iki automatizacijų, integracijų ir individualių įrankių (kuriame realų kodą).",
        "Dirbome su verslais JK, Ispanijoje ir Lietuvoje. Turime 5+ metų patirtį, 10+ projektų ir patirties 3 šalyse. Pirmiausia įsigiliname, tada sudėliojame planą, įgyvendiname ir optimizuojame pagal duomenis.",
      ],
      stats: [
        { number: "10+", label: "Projektų" },
        { number: "5+", label: "Metų" },
        { number: "3", label: "Šalys" },
      ],
      bullets: [
        "Rinkodara: pozicionavimas, kampanijos, turinio sistemos",
        "Techniniai sprendimai: automatizacija, integracijos, individualūs įrankiai",
        "Patirtis JK, Ispanijoje ir Lietuvoje",
        "10+ projektų per 5+ metus — 3 šalyse",
      ],
      photoCaption: "Čia gali būti jūsų nuotrauka",
      locationLabel: "Lietuva",
    },
    contact: {
      titleLead: "Pasiruošę",
      titleHighlight: "augti kartu?",
      body:
        "Rezervuokite nemokamą 30 min. skambutį. Papasakokite, kur dabar esate ir ko siekiate — mes pasiūlysime aiškius, praktiškus veiksmus. Be įsipareigojimų.",
      form: {
        namePlaceholder: "Jūsų vardas",
        emailPlaceholder: "Jūsų el. paštas",
        helpPrompt: "Su kuo labiausiai reikia pagalbos?",
        helpOptions: [
          { value: "marketing", label: "Rinkodara ir turinys" },
          { value: "consulting", label: "Konsultacijos ir technologijos" },
          { value: "research", label: "Tyrimai ir analizė" },
          { value: "other", label: "Dar nežinau" },
        ],
        projectPlaceholder: "Trumpai apie projektą (nebūtina)",
        submitLabel: "Rezervuoti nemokamą skambutį",
      },
      benefits: [
        "✓ Nemokamas 30 min. skambutis",
        "✓ Jokių įsipareigojimų",
        "✓ Atsakome per 24 val.",
      ],
    },
    footer: {
      links: [
        { name: "LinkedIn", href: "#" },
        { name: "El. paštas", href: "mailto:hello@bary.lt" },
        { name: "Calendly", href: "#" },
      ],
      rights: "© 2025 Bary. Visos teisės saugomos.",
      countries: "🇱🇹 Lietuva, 🇪🇸 Ispanija ir 🇬🇧 JK",
    },
  },
} as const;

export default function Home(): React.JSX.Element {
  const { isDark, isLoaded, language } = useThemeStore();
  const copy = copyByLanguage[language];

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    helpType: "",
    projectDetails: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitting = status === "submitting";
  const isFormValid =
    formState.name.trim().length > 0 &&
    formState.email.trim().length > 0 &&
    formState.helpType.trim().length > 0;
  const successMessage =
    language === "lt"
      ? "Ačiū! Atsakysime per 24 valandas."
      : "Thanks! We'll reply within 24 hours.";

  const handleFieldChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Form submission started");
    setStatus("submitting");
    setErrorMessage(null);

    try {
      console.log("Sending request to API...");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          helpType: formState.helpType,
          projectDetails: formState.projectDetails.trim(),
          language,
        }),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        console.error("API error:", data);
        setStatus("error");
        setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      console.log("Form submitted successfully!");
      setStatus("success");
      setFormState({
        name: "",
        email: "",
        helpType: "",
        projectDetails: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Unable to submit right now. Please try again.");
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${
        isDark ? "bg-[#030108]" : "bg-[#f8fafc]"
      }`}
    >
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Navigation */}
      <Navbar />

      {/* 3D Space Background */}
      <Scene3DWrapper />

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center py-20 px-6 pt-32"
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 z-0 ${
            isDark
              ? "bg-gradient-to-r from-[#030108]/80 via-[#030108]/50 to-transparent"
              : "bg-gradient-to-r from-[#f8fafc]/90 via-[#f8fafc]/70 to-transparent"
          }`}
        />

        {/* Bottom fade */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-32 z-0 ${
            isDark
              ? "bg-gradient-to-t from-[#050208] to-transparent"
              : "bg-gradient-to-t from-[#f8fafc] to-transparent"
          }`}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center md:text-left md:mr-auto md:ml-[10%]"
          variants={staggerContainer}
          initial="initial"
          animate={isLoaded ? "animate" : "initial"}
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {copy.hero.headlinePrimary}
            </span>
            {" "}
            <span
              className={`${isDark ? "text-white" : "text-gray-900"} md:block`}
            >
              {copy.hero.headlineSecondary}
            </span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p
            className={`text-xl md:text-2xl max-w-xl mb-8 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {copy.hero.value}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-10"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{copy.hero.ctaPrimary}</span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
            <motion.a
              href="#case-studies"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full border transition-colors ${
                isDark
                  ? "border-gray-600 text-white hover:border-cyan-400 hover:text-cyan-400 bg-[#030108]/50"
                  : "border-gray-300 text-gray-900 hover:border-purple-500 hover:text-purple-500 bg-white/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{copy.hero.ctaSecondary}</span>
              <svg
                className="w-4 h-4"
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
            </motion.a>
          </motion.div>

        </motion.div>
      </section>

      {/* Services */}
      <div className={`relative z-20 ${isDark ? "bg-[#0a0612]" : "bg-white"}`}>
        <ServicesSection />
      </div>

      {/* Case Studies */}
      <div
        id="case-studies"
        className={`relative z-20 ${isDark ? "bg-[#050208]" : "bg-[#f8fafc]"}`}
      >
        <ProjectsCarousel />
      </div>

      {/* How I Work Section */}
      <section
        id="approach"
        className={`relative z-20 py-20 px-6 transition-colors duration-700 ${
          isDark ? "bg-[#050208]" : "bg-[#f8fafc]"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {copy.approach.titleLead}{" "}
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {copy.approach.titleHighlight}
              </span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {copy.approach.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.approach.steps.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`relative p-8 rounded-2xl border cursor-pointer transition-colors ${
                  isDark
                    ? "bg-[#0f0a1a] border-gray-800 hover:border-purple-500/50"
                    : "bg-white border-gray-200 hover:border-purple-400"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <span
                  className={`absolute top-4 right-4 text-5xl font-bold ${
                    isDark ? "text-white/5" : "text-gray-100"
                  }`}
                >
                  {feature.step}
                </span>

                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`relative z-20 py-20 px-6 ${
          isDark ? "bg-[#0a0612]" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  {copy.about.titleLead}{" "}
                </span>
                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  {copy.about.titleHighlight}
                </span>
              </h2>
              <p
                className={`text-lg mb-6 leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {copy.about.paragraphs[0]}
              </p>
              <p
                className={`text-lg mb-8 leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {copy.about.paragraphs[1]}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {copy.about.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div
                      className={`text-sm ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-4">
                {copy.about.bullets.map((item, index) => (
                  <motion.li
                    key={item}
                    className={`flex items-center gap-3 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isDark ? "bg-cyan-400" : "bg-purple-500"
                      }`}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className={`aspect-square rounded-2xl flex items-center justify-center overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-purple-500/20 to-cyan-400/20 border border-purple-500/30"
                    : "bg-gradient-to-br from-purple-100 to-cyan-100 border border-purple-200"
                }`}
              >
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">👨‍💼</div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {copy.about.photoCaption}
                  </p>
                </div>
              </div>

              <div
                className={`absolute -bottom-4 -right-4 px-4 py-2 rounded-xl ${
                  isDark
                    ? "bg-[#0a0612] border border-purple-500/30"
                    : "bg-white border border-purple-200 shadow-lg"
                }`}
              >
                <span className="text-lg mr-2">🇱🇹</span>
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  {copy.about.locationLabel}
                </span>
              </div>

              <div
                className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl ${
                  isDark ? "bg-purple-500/20" : "bg-purple-300/40"
                }`}
              />
              <div
                className={`absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-xl ${
                  isDark ? "bg-cyan-400/20" : "bg-cyan-300/40"
                }`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`relative z-20 py-20 px-6 transition-colors duration-700 ${
          isDark ? "bg-[#050208]" : "bg-[#f8fafc]"
        }`}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className={`p-12 md:p-16 rounded-3xl border ${
              isDark
                ? "bg-gradient-to-br from-[#0f0a1a] to-[#1a0a2e] border-purple-500/20"
                : "bg-gradient-to-br from-white to-purple-50 border-purple-200"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {copy.contact.titleLead}{" "}
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {copy.contact.titleHighlight}
              </span>
            </h2>
            <p
              className={`text-lg mb-8 max-w-xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {copy.contact.body}
            </p>

            {/* Contact Form */}
            <form
              className="max-w-md mx-auto space-y-4 mb-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleFieldChange}
                  placeholder={copy.contact.form.namePlaceholder}
                  maxLength={120}
                  autoComplete="name"
                  required
                  className={`w-full px-6 py-4 rounded-xl border focus:outline-none transition-colors ${
                    isDark
                      ? "bg-[#050208] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleFieldChange}
                  placeholder={copy.contact.form.emailPlaceholder}
                  maxLength={150}
                  autoComplete="email"
                  required
                  className={`w-full px-6 py-4 rounded-xl border focus:outline-none transition-colors ${
                    isDark
                      ? "bg-[#050208] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  }`}
                />
              </div>
              <select
                name="helpType"
                value={formState.helpType}
                onChange={handleFieldChange}
                required
                className={`w-full px-6 py-4 rounded-xl border focus:outline-none transition-colors ${
                  isDark
                    ? "bg-[#050208] border-gray-700 text-white focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                }`}
              >
                <option value="">{copy.contact.form.helpPrompt}</option>
                {copy.contact.form.helpOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <textarea
                name="projectDetails"
                value={formState.projectDetails}
                onChange={handleFieldChange}
                placeholder={copy.contact.form.projectPlaceholder}
                rows={3}
                maxLength={2000}
                autoComplete="off"
                className={`w-full px-6 py-4 rounded-xl border focus:outline-none transition-colors resize-none ${
                  isDark
                    ? "bg-[#050208] border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                }`}
              />
              <motion.button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white ${
                  !isFormValid || isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                whileHover={{
                  scale: !isFormValid || isSubmitting ? 1 : 1.02,
                  boxShadow:
                    !isFormValid || isSubmitting
                      ? "0 0 0 rgba(139, 92, 246, 0)"
                      : "0 0 40px rgba(139, 92, 246, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : copy.contact.form.submitLabel}
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.button>
              <div
                className="min-h-[28px] text-base font-medium text-center"
                aria-live="polite"
                role="status"
              >
                {status === "success" ? (
                  <span className={`${isDark ? "text-green-400" : "text-green-700"} bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg inline-block`}>
                    ✓ {successMessage}
                  </span>
                ) : status === "error" && errorMessage ? (
                  <span className={`${isDark ? "text-rose-300" : "text-rose-600"} bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-lg inline-block`}>
                    ⚠ {errorMessage}
                  </span>
                ) : null}
              </div>
            </form>

            <p className={isDark ? "text-gray-500" : "text-gray-400"}>
              {copy.contact.benefits.map((benefit, index) => (
                <span key={benefit}>
                  {benefit}
                  {index < copy.contact.benefits.length - 1 ? "\u00A0\u00A0" : ""}
                </span>
              ))}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-20 py-12 px-6 border-t transition-colors duration-700 ${
          isDark ? "border-gray-800 bg-[#050208]" : "border-gray-200 bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.a
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Bary
            </motion.a>

            <div className="flex gap-6">
              {copy.footer.links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className={isDark ? "text-gray-500" : "text-gray-400"}>
                {copy.footer.rights}
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {copy.footer.countries}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
