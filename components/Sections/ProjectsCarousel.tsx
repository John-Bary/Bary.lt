"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/store";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageSrc: string;
  fallbackImageSrc: string;
  imageAlt: string;
  href: string;
  ctaLabel: string;
}

const copyByLanguage = {
  en: {
    titleLead: "Case",
    titleHighlight: "Studies",
    subtitle: "Three recent projects across marketing, web, and growth",
    previousAria: "Previous case study",
    nextAria: "Next case study",
    dotAriaPrefix: "Go to case study",
  },
  lt: {
    titleLead: "Mūsų",
    titleHighlight: "Projektai",
    subtitle: "Trys mūsų darbų pavyzdžiai: rinkodara, svetainės ir augimas",
    previousAria: "Ankstesnė analizė",
    nextAria: "Kita analizė",
    dotAriaPrefix: "Eiti į analizę",
  },
};

const projectsByLanguage: Record<string, Project[]> = {
  en: [
    {
      id: 1,
      title: "Pašilaičiai P.C.",
      subtitle: "www.pasilaiciaipc.lt",
      description:
        "Marketing strategy, website design, and ongoing support for the shopping center.",
      tags: ["Marketing strategy", "Website design", "Ongoing support"],
      imageSrc: "/case-studies/pasilaiciai.jpg",
      fallbackImageSrc: "/case-studies/pasilaiciai.svg",
      imageAlt: "Pašilaičiai P.C. case study preview",
      href: "https://www.pasilaiciaipc.lt",
      ctaLabel: "Visit website",
    },
    {
      id: 2,
      title: "Vitomi (Shopify)",
      subtitle: "thevitomi.com",
      description:
        "Shopify store edits and ongoing marketing consulting to improve conversion and growth.",
      tags: ["Shopify", "Store optimization", "Marketing consulting"],
      imageSrc: "/case-studies/vitomi.jpg",
      fallbackImageSrc: "/case-studies/vitomi.svg",
      imageAlt: "Vitomi Shopify store case study preview",
      href: "https://thevitomi.com",
      ctaLabel: "Visit store",
    },
    {
      id: 3,
      title: "Rey Tenerife",
      subtitle: "Instagram + website consulting",
      description:
        "Instagram presence and marketing strategy creation, plus website consulting.",
      tags: ["Instagram", "Marketing strategy", "Website consulting"],
      imageSrc: "/case-studies/rey-tenerife.jpg",
      fallbackImageSrc: "/case-studies/rey-tenerife.svg",
      imageAlt: "Rey Tenerife case study preview",
      href: "#contact",
      ctaLabel: "Request details",
    },
  ],
  lt: [
    {
      id: 1,
      title: "Pašilaičiai P.C.",
      subtitle: "www.pasilaiciaipc.lt",
      description:
        "Rinkodaros strategijos, svetainės dizainas ir nuolatinė pagalba prekybos centrui.",
      tags: ["Rinkodaros strategija", "Svetainės dizainas", "Priežiūra"],
      imageSrc: "/case-studies/pasilaiciai.jpg",
      fallbackImageSrc: "/case-studies/pasilaiciai.svg",
      imageAlt: "Pašilaičiai P.C. atvejo analizės peržiūra",
      href: "https://www.pasilaiciaipc.lt",
      ctaLabel: "Aplankyti svetainę",
    },
    {
      id: 2,
      title: "Vitomi (Shopify)",
      subtitle: "thevitomi.com",
      description:
        "Shopify parduotuvės patobulinimai ir rinkodaros konsultacijos konversijoms bei augimui.",
      tags: ["Shopify", "Patobulinimai", "Rinkodaros konsultacijos"],
      imageSrc: "/case-studies/vitomi.jpg",
      fallbackImageSrc: "/case-studies/vitomi.svg",
      imageAlt: "Vitomi Shopify parduotuvės atvejo analizės peržiūra",
      href: "https://thevitomi.com",
      ctaLabel: "Aplankyti parduotuvę",
    },
    {
      id: 3,
      title: "Rey Tenerife",
      subtitle: "Instagram + web konsultacijos",
      description:
        "Instagram profilio vystymas, rinkodaros strategijos parengimas ir konsultacijos dėl svetainės.",
      tags: ["Instagram", "Rinkodaros strategija", "Svetainės konsultacijos"],
      imageSrc: "/case-studies/rey-tenerife.jpg",
      fallbackImageSrc: "/case-studies/rey-tenerife.svg",
      imageAlt: "Rey Tenerife atvejo analizės peržiūra",
      href: "https://www.reytenerife.com",
      ctaLabel: "Pažiūrėti projektą",
    },
  ],
};

// Individual Project Card Component
function ProjectCard({
  project,
  isDark,
  isCenter,
}: {
  project: Project;
  isDark: boolean;
  isCenter: boolean;
}) {
  const isExternal = project.href.startsWith("http");
  return (
    <div
      className={`
        flex flex-col
        w-full
        rounded-2xl
        overflow-hidden
        border
        transition-all duration-300
        ${isDark ? "bg-[#12101f] border-gray-800" : "bg-white border-gray-200"}
        ${isCenter ? "shadow-2xl shadow-purple-500/20" : "shadow-lg"}
      `}
    >
      {/* Media Section - Fixed Height */}
      <div
        className={`
          relative w-full flex-shrink-0 overflow-hidden
        `}
      >
        <div className="relative w-full aspect-[16/9]">
          <img
            src={project.imageSrc}
            alt={project.imageAlt}
            loading="lazy"
            onError={(event) => {
              const target = event.currentTarget;
              if (target.src.endsWith(project.fallbackImageSrc)) return;
              target.src = project.fallbackImageSrc;
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 md:p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`
                px-3 py-1
                text-xs font-medium
                rounded-full
                whitespace-nowrap
                ${
                  isDark
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-purple-100 text-purple-700"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={`
            text-lg md:text-xl font-bold mb-2
            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >
          {project.title}
        </h3>
        <p className={`text-xs mb-3 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          className={`
            text-sm leading-relaxed mb-4 flex-grow
            ${isDark ? "text-gray-400" : "text-gray-600"}
          `}
        >
          {project.description}
        </p>

        {/* CTA Link */}
        <a
          href={project.href}
          className={`
            inline-flex items-center gap-2
            text-sm font-medium
            text-cyan-400 hover:text-cyan-300
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
            ${isDark ? "focus:ring-offset-[#12101f]" : "focus:ring-offset-white"}
            rounded
            w-fit
          `}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          <span>{project.ctaLabel}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function ProjectsCarousel(): React.JSX.Element {
  const { isDark, language } = useThemeStore();
  const copy = copyByLanguage[language];
  const projects = projectsByLanguage[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Get indices for visible cards (previous, current, next)
  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + projects.length) % projects.length;
    const next = (currentIndex + 1) % projects.length;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleIndices();

  if (!isClient) {
    // SSR placeholder to prevent hydration mismatch
    return (
      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {copy.titleLead}{" "}
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {copy.titleHighlight}
              </span>
            </h2>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              {copy.subtitle}
            </p>
          </div>
          <div className="h-[450px]" />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative z-10 py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? "text-white" : "text-gray-900"}>
              {copy.titleLead}{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {copy.titleHighlight}
            </span>
          </h2>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            {copy.subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards Container - Using CSS Grid for stable layout */}
          <div className="flex items-center justify-center gap-4 md:gap-6 px-12 md:px-20">
            {visibleIndices.map((projectIndex, i) => {
              const project = projects[projectIndex];
              const isCenter = i === 1;

              return (
                <motion.div
                  key={project.id}
                  className={`
                    w-[280px] md:w-[320px] lg:w-[350px]
                    flex-shrink-0
                    ${!isCenter ? "hidden md:block" : ""}
                  `}
                  initial={false}
                  animate={{
                    scale: isCenter ? 1 : 0.9,
                    opacity: isCenter ? 1 : 0.5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    filter: isCenter ? "none" : "blur(1px)",
                  }}
                >
                  <ProjectCard
                    project={project}
                    isDark={isDark}
                    isCenter={isCenter}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`
              absolute left-0 top-1/2 -translate-y-1/2
              z-20 w-10 h-10 md:w-12 md:h-12
              rounded-full
              flex items-center justify-center
              transition-all
              focus:outline-none focus:ring-2 focus:ring-purple-500
              ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-black/10 hover:bg-black/20 text-gray-900"
              }
            `}
            aria-label={copy.previousAria}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2
              z-20 w-10 h-10 md:w-12 md:h-12
              rounded-full
              flex items-center justify-center
              transition-all
              focus:outline-none focus:ring-2 focus:ring-purple-500
              ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-black/10 hover:bg-black/20 text-gray-900"
              }
            `}
            aria-label={copy.nextAria}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-10">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                h-2.5 rounded-full transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                ${isDark ? "focus:ring-offset-[#0a0a0f]" : "focus:ring-offset-white"}
                ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-purple-500 to-cyan-400 w-8"
                    : isDark
                    ? "bg-gray-600 hover:bg-gray-500 w-2.5"
                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                }
              `}
              aria-label={`${copy.dotAriaPrefix} ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
