"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import GlowCard from "@/components/ui/GlowCard";

// ── Tab Icons ──
const tabIcons: Record<string, React.JSX.Element> = {
  infrastructure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <circle cx="12" cy="21" r="1.5" fill="currentColor" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 3l8 4v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V7l8-4z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  software: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M8 9l3 3-3 3M13 15h3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  ),
};

type TabKey = "infrastructure" | "security" | "software";

const tabs: TabKey[] = ["infrastructure", "security", "software"];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ServiceContent({ tabKey }: { tabKey: TabKey }) {
  const t = useTranslations("services.categories");
  const capabilities = t.raw(`${tabKey}.capabilities`) as string[];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8"
    >
      {/* Description */}
      <motion.p
        variants={fadeUp}
        className="text-text-secondary text-lg leading-relaxed max-w-3xl font-body"
      >
        {t(`${tabKey}.description`)}
      </motion.p>

      {/* Capabilities Grid */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {capabilities.map((cap, i) => (
          <motion.div key={i} variants={fadeUp}>
            <GlowCard className="p-6 h-full group">
              <div className="flex items-start gap-4">
                {/* Number */}
                <span
                  className="text-[11px] font-heading font-bold tracking-widest shrink-0 mt-1"
                  style={{ color: "rgba(56,189,248,0.4)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h4 className="font-heading font-semibold text-text-primary text-base mb-1 group-hover:text-accent transition-colors duration-300">
                    {cap}
                  </h4>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("infrastructure");
  const t = useTranslations("services");

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute -top-[100px] end-[-200px] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-[5%] lg:px-[6%] relative z-10">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-accent rounded-full" />
              <span className="section-label">{t("label")}</span>
              <div className="w-8 h-[2px] bg-accent rounded-full" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-[clamp(40px,6vw,72px)] font-heading font-black tracking-tight leading-[1.05] text-text-primary mb-5"
            >
              <span className="gradient-text">{t("title")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-text-secondary text-base leading-relaxed max-w-xl font-body mb-10"
            >
              {t("subtitle")}
            </motion.p>

            {/* 3-Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="flex flex-wrap justify-center gap-2 p-1.5 bg-surface border border-border rounded-2xl"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-accent"
                        style={{ boxShadow: "0 0 20px rgba(56,189,248,0.25)" }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tabIcons[tab]}</span>
                    <span className="relative z-10">
                      {t(`categories.${tab}.label`)}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Active Tab Content */}
      <section className="max-w-[1200px] mx-auto px-[5%] lg:px-[6%] pb-24">
        {/* Tab Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-accent"
                  style={{
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.15)",
                  }}
                >
                  {tabIcons[activeTab]}
                </div>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  {t(`categories.${activeTab}.title`)}
                </h2>
              </div>
            </div>

            <ServiceContent tabKey={activeTab} />
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}