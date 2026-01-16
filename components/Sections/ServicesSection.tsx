"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useThemeStore } from '@/lib/store';

interface Service {
  name: string;
  description: string;
}

interface ServiceCategory {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  services: Service[];
  accentColor: string;
}

const sectionCopyByLanguage = {
  en: {
    titleLead: "Services",
    titleHighlight: "Expertise",
    subtitle: "Everything you need to grow—without hiring a full team",
    requestCta: "Request This Service",
    bottomPrompt: "Not sure which service you need?",
    bottomCta: "Book a Free Consultation",
    expandLabel: "Expand",
    collapseLabel: "Collapse",
  },
  lt: {
    titleLead: "Paslaugų",
    titleHighlight: "ekspertizė",
    subtitle: "Viskas, ko reikia augimui — be visos komandos samdymo.",
    requestCta: "Užsakyti paslaugą",
    bottomPrompt: "Nežinote, nuo ko pradėti?",
    bottomCta: "Rezervuoti nemokamą konsultaciją",
    expandLabel: "Rodyti daugiau",
    collapseLabel: "Rodyti mažiau",
  },
};

const serviceCategoriesByLanguage: Record<string, ServiceCategory[]> = {
  en: [
    {
      id: 1,
      icon: "🎨",
      title: "Marketing & Creative",
      subtitle: "Build your brand",
      description:
        "Compelling content and strategies that connect with your audience and drive growth.",
      services: [
        {
          name: "Marketing Strategy",
          description: "Comprehensive marketing plans tailored to your goals",
        },
        {
          name: "Content Creation",
          description: "Engaging content for all platforms and formats",
        },
        {
          name: "Creative Writing",
          description: "Copywriting, storytelling, and brand narratives",
        },
        {
          name: "Brand Messaging",
          description: "Clear positioning and consistent voice",
        },
      ],
      accentColor: "#F97316",
    },
    {
      id: 2,
      icon: "💼",
      title: "Consulting & Technology",
      subtitle: "Optimize operations",
      description:
        "Strategic guidance and technical solutions to streamline your business processes.",
      services: [
        {
          name: "Business Consulting",
          description: "Strategic planning and operational improvements",
        },
        {
          name: "IT Consulting",
          description: "Technology stack evaluation and recommendations",
        },
        {
          name: "Automation & AI",
          description: "Workflow automation and AI integration",
        },
        {
          name: "Analytics & Reporting",
          description: "Data dashboards and performance tracking",
        },
      ],
      accentColor: "#8B5CF6",
    },
    {
      id: 3,
      icon: "📊",
      title: "Research & Insights",
      subtitle: "Data-driven decisions",
      description: "In-depth research and analysis to inform your strategic decisions.",
      services: [
        {
          name: "Market Research",
          description: "Industry analysis and market opportunity assessment",
        },
        {
          name: "Case Studies",
          description: "Detailed success stories and use case documentation",
        },
        {
          name: "Customer Insights",
          description: "User research and customer journey mapping",
        },
        {
          name: "Growth Experiments",
          description: "A/B testing and growth hypothesis validation",
        },
      ],
      accentColor: "#22C55E",
    },
  ],
  lt: [
    {
      id: 1,
      icon: "🎨",
      title: "Rinkodara ir kūryba",
      subtitle: "Auginkite prekės ženklą",
      description:
        "Turinys ir strategijos, kurios padeda aiškiai kalbėti su auditorija ir auginti rezultatą.",
      services: [
        {
          name: "Rinkodaros strategija",
          description: "Aiškus planas, ką darome ir kodėl — pagal jūsų tikslus",
        },
        {
          name: "Turinio kūrimas",
          description: "Turinys webui, socialiniams tinklams ir naujienlaiškiams",
        },
        {
          name: "Kūrybinis rašymas",
          description: "Tekstai, istorijos, landingai ir pasiūlymai",
        },
        {
          name: "Pozicionavimas ir žinutės",
          description: "Aiškus pozicionavimas ir nuosekli komunikacija",
        },
      ],
      accentColor: "#F97316",
    },
    {
      id: 2,
      icon: "💼",
      title: "Konsultacijos ir technologijos",
      subtitle: "Optimizuokite procesus",
      description:
        "Techniniai sprendimai ir konsultacijos, kurie supaprastina darbą kasdien.",
      services: [
        {
          name: "Verslo konsultacijos",
          description: "Prioritetai, procesai ir aiškūs KPI",
        },
        {
          name: "Techninės konsultacijos",
          description: "Programavimas, integracijos ir sprendimų tobulinimas",
        },
        {
          name: "Automatizacija ir DI",
          description: "Automatizacijos, kurios taupo laiką, ir DI integracijos",
        },
        {
          name: "Analitika ir ataskaitos",
          description: "Suvestinės ir ataskaitos, kad matytumėte, kas veikia",
        },
      ],
      accentColor: "#8B5CF6",
    },
    {
      id: 3,
      icon: "📊",
      title: "Tyrimai ir įžvalgos",
      subtitle: "Sprendimai, paremti duomenimis",
      description:
        "Tyrimai ir analizė, kad sprendimai būtų pagrįsti, o ne spėjimai.",
      services: [
        {
          name: "Rinkos tyrimai",
          description: "Rinka, konkurentai ir realios galimybės",
        },
        {
          name: "Atvejų analizės",
          description: "Aiškios sėkmės istorijos, kurios padeda pardavimams",
        },
        {
          name: "Klientų įžvalgos",
          description: "Interviu, apklausos ir kliento kelionė",
        },
        {
          name: "Augimo eksperimentai",
          description: "Hipotezės, testai ir greitos iteracijos",
        },
      ],
      accentColor: "#22C55E",
    },
  ],
};

const ServicesSection = () => {
  const [areCardsExpanded, setAreCardsExpanded] = useState(false);
  const { isDark, language } = useThemeStore();
  const sectionCopy = sectionCopyByLanguage[language];
  const serviceCategories = serviceCategoriesByLanguage[language];

  const toggleCards = () => {
    setAreCardsExpanded((prev) => !prev);
  };

  return (
    <section 
      id="services" 
      className={`relative z-10 py-24 px-6 transition-colors duration-700 ${
        isDark ? 'bg-[#0a0612]/95' : 'bg-white/80'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {sectionCopy.titleLead}{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {sectionCopy.titleHighlight}
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {sectionCopy.subtitle}
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              className={`relative rounded-2xl p-7 border overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
                isDark 
                  ? 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.12] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
                  : 'bg-white/50 border-gray-200 hover:border-purple-300 hover:shadow-lg'
              }`}
            >
              {/* Card Header */}
              <div 
                className="flex items-center gap-4 cursor-pointer mb-4"
                onClick={toggleCards}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-purple-500/20 to-purple-500/5' 
                    : 'bg-gradient-to-br from-purple-100 to-purple-50'
                }`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: category.accentColor }}>
                    {category.subtitle}
                  </p>
                </div>
                <button 
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                      : 'bg-gray-100 border border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  }`}
                  aria-label={
                    areCardsExpanded
                      ? sectionCopy.collapseLabel
                      : sectionCopy.expandLabel
                  }
                >
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${areCardsExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {category.description}
              </p>

              {/* Expandable Services List */}
              <div className={`grid gap-3 overflow-hidden transition-all duration-300 ${
                areCardsExpanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
              }`}>
                {category.services.map((service, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/[0.02] border-white/[0.05]'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center bg-green-500/15 text-green-500 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {service.name}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {service.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a 
                href="#contact" 
                className="block w-full py-3 px-5 text-center text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ backgroundColor: category.accentColor }}
              >
                {sectionCopy.requestCta}
              </a>

              {/* Accent Line */}
              <div 
                className="absolute bottom-0 left-0 w-full h-0.5 opacity-80"
                style={{ backgroundColor: category.accentColor }}
              />
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className={`text-center p-10 rounded-2xl border ${
            isDark 
              ? 'bg-purple-500/5 border-purple-500/15'
              : 'bg-purple-50 border-purple-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className={`text-lg mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {sectionCopy.bottomPrompt}
          </p>
          <motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl transition-all"
            whileHover={{ 
              y: -2, 
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' 
            }}
          >
            {sectionCopy.bottomCta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
