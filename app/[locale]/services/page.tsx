"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Network,
  Wifi,
  Cable,
  Activity,
  Server,
  Camera,
  Fingerprint,
  Flame,
  ShieldAlert,
  ShieldCheck,
  MonitorSmartphone,
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Megaphone,
  Building2,
  Plug,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// ── Types ──
type TabKey = "infrastructure" | "security" | "software";

// ── Tab accent colors — each tab gets its own color personality ──
const tabAccent: Record<TabKey, { main: string; rgb: string }> = {
  infrastructure: { main: "#38BDF8", rgb: "56,189,248" },
  security: { main: "#A78BFA", rgb: "167,139,250" },
  software: { main: "#34D399", rgb: "52,211,153" },
};

// ── Tab Icons (SVG) ──
const tabIcons: Record<TabKey, React.JSX.Element> = {
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

// ── Hero images per tab ──
const heroImages: Record<TabKey, string> = {
  infrastructure: "/images/projects/fiber.webp",
  security: "/images/services/security.webp",
  software: "/images/services/software.webp",
};

// ── Capability icons per tab ──
const capIcons: Record<TabKey, LucideIcon[]> = {
  infrastructure: [Network, Wifi, Cable, Activity, Server],
  security: [Camera, Fingerprint, Flame, ShieldAlert, ShieldCheck, MonitorSmartphone],
  software: [Globe, ShoppingCart, LayoutDashboard, Megaphone, Building2, Plug],
};

const tabs: TabKey[] = ["infrastructure", "security", "software"];

// ── Animation ──
const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

// ── Tab Content ──
function TabContent({ tabKey }: { tabKey: TabKey }) {
  const t = useTranslations("services");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const capabilities = t.raw(`categories.${tabKey}.capabilities`) as string[];
  const capDescs = t.raw(`categories.${tabKey}.cap_descs`) as string[];
  const stats = t.raw(`categories.${tabKey}.stats`) as { value: string; label: string }[];
  const icons = capIcons[tabKey];
  const accent = tabAccent[tabKey];

  const heroGradient = isRTL
    ? `linear-gradient(to left, rgba(9,9,11,0.82) 0%, rgba(9,9,11,0.45) 55%, rgba(9,9,11,0.15) 100%)`
    : `linear-gradient(to right, rgba(9,9,11,0.82) 0%, rgba(9,9,11,0.45) 55%, rgba(9,9,11,0.15) 100%)`;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-20"
    >
      {/* ═══════════════════════════════════════ */}
      {/* HERO IMAGE — lighter gradient, accent glow */}
      {/* ═══════════════════════════════════════ */}
      <motion.div
        variants={fadeUp}
        className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden group"
      >
        <Image
          src={heroImages[tabKey]}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          priority
        />
        {/* Lighter side gradient — image stays visible */}
        <div className="absolute inset-0" style={{ background: heroGradient }} />
        {/* Subtle bottom vignette only */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(9,9,11,0.5) 0%, transparent 35%)",
          }}
        />
        {/* Accent color tint on the edge */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 40% 80% at ${isRTL ? "90%" : "10%"} 50%, rgba(${accent.rgb},0.3), transparent 70%)`,
          }}
        />

        {/* Content overlay */}
        <div className={`absolute inset-0 flex flex-col justify-end p-8 lg:p-12 ${isRTL ? "items-end text-end" : "items-start text-start"}`}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 backdrop-blur-md"
            style={{
              background: `rgba(${accent.rgb},0.1)`,
              border: `1px solid rgba(${accent.rgb},0.3)`,
            }}
          >
            <span style={{ color: accent.main }}>{tabIcons[tabKey]}</span>
            <span
              className="text-xs font-heading font-bold tracking-widest uppercase"
              style={{ color: accent.main }}
            >
              {t(`categories.${tabKey}.label`)}
            </span>
          </motion.div>

          <h2
            className="font-heading font-bold text-white mb-4 max-w-xl"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.15 }}
          >
            {t(`categories.${tabKey}.title`)}
          </h2>
          <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-lg">
            {t(`categories.${tabKey}.description`)}
          </p>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════ */}
      {/* CAPABILITIES — visual hierarchy with featured cards */}
      {/* ═══════════════════════════════════════ */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const Icon = icons[i];
            const desc = capDescs?.[i];
            if (!Icon) return null;

            // First 2 cards are "featured" — larger, accent border
            const isFeatured = i < 2;

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={isFeatured ? "md:col-span-1 lg:col-span-1" : ""}
              >
                <div
                  className="relative h-full rounded-[20px] overflow-hidden group transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: isFeatured
                      ? `linear-gradient(135deg, rgba(${accent.rgb},0.06) 0%, var(--color-surface) 60%)`
                      : "var(--color-surface)",
                    border: isFeatured
                      ? `1px solid rgba(${accent.rgb},0.2)`
                      : "1px solid var(--color-border)",
                  }}
                >
                  {/* Hover glow on featured */}
                  {isFeatured && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at ${isRTL ? "100% 0%" : "0% 0%"}, rgba(${accent.rgb},0.08), transparent 60%)`,
                      }}
                    />
                  )}

                  <div className={`relative z-10 ${isFeatured ? "p-7 lg:p-8" : "p-6"}`}>
                    <div className="flex items-start gap-4">
                      {/* Icon box */}
                      <div
                        className={`${isFeatured ? "w-14 h-14" : "w-11 h-11"} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        style={{
                          background: `rgba(${accent.rgb},0.1)`,
                          border: `1px solid rgba(${accent.rgb},0.2)`,
                          color: accent.main,
                        }}
                      >
                        <Icon className={isFeatured ? "w-6 h-6" : "w-5 h-5"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-heading font-semibold text-text-primary group-hover:text-white transition-colors duration-300 mb-1 ${isFeatured ? "text-lg" : "text-base"}`}
                        >
                          {cap}
                        </h4>
                        {desc && (
                          <p className="text-text-muted text-sm leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════ */}
      {/* STATS — prominent numbers with glow */}
      {/* ═══════════════════════════════════════ */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
              className="relative rounded-2xl p-7 text-center overflow-hidden group"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Subtle glow behind the number */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, rgba(${accent.rgb},0.1), transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <span
                  className="block font-heading font-black mb-2"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    background: `linear-gradient(135deg, ${accent.main}, #F4F4F5)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 20px rgba(${accent.rgb},0.2))`,
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-text-secondary text-sm font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════ */}
      {/* CTA — gradient background, not flat */}
      {/* ═══════════════════════════════════════ */}
      <motion.div variants={fadeUp}>
        <div className="relative rounded-2xl overflow-hidden">
          {/* Multi-layer background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 80% at 50% 120%, rgba(${accent.rgb},0.12), transparent 60%),
                radial-gradient(ellipse 50% 50% at 80% 20%, rgba(${accent.rgb},0.06), transparent 50%),
                var(--color-surface)
              `,
            }}
          />
          {/* Accent border */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: `1px solid rgba(${accent.rgb},0.15)`,
            }}
          />
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${accent.main} 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 p-10 lg:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h3
                className="font-heading font-bold text-white mb-4"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
              >
                {t("cta_title")}
              </h3>
              <p className="text-text-secondary text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                {t("cta_subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="block">
                  <motion.span
                    className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-semibold text-sm cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, rgba(${accent.rgb},0.2), rgba(${accent.rgb},0.08))`,
                      color: "#F4F4F5",
                      border: `1px solid rgba(${accent.rgb},0.4)`,
                      boxShadow: `0 0 30px rgba(${accent.rgb},0.12)`,
                      backdropFilter: "blur(12px)",
                    }}
                    whileHover={{
                      scale: 1.04,
                      y: -3,
                      boxShadow: `0 0 50px rgba(${accent.rgb},0.25), 0 12px 30px rgba(0,0,0,0.4)`,
                      borderColor: `rgba(${accent.rgb},0.6)`,
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {t("cta_primary")}
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
                <Link href="/projects" className="block">
                  <motion.span
                    className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-medium text-sm cursor-pointer"
                    style={{
                      color: "var(--color-text-secondary)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                    }}
                    whileHover={{
                      scale: 1.04,
                      y: -3,
                      color: "#F4F4F5",
                      borderColor: "rgba(255,255,255,0.2)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {t("cta_secondary")}
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ──
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("infrastructure");
  const t = useTranslations("services");

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute -top-[100px] end-[-200px] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[200px] start-[-300px] w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-[5%] lg:px-[6%] relative z-10">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-14">
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
              transition={{ delay: 0.1, ease }}
              className="text-[clamp(40px,6vw,72px)] font-heading font-black tracking-tight leading-[1.05] text-text-primary mb-6"
            >
              <span className="gradient-text">{t("title")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease }}
              className="text-text-secondary text-lg leading-relaxed max-w-xl font-body mb-12"
            >
              {t("subtitle")}
            </motion.p>

            {/* 3-Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease }}
              className="flex flex-wrap justify-center gap-2 p-2 rounded-2xl"
              style={{
                background: "rgba(17,17,19,0.8)",
                border: "1px solid var(--color-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const ac = tabAccent[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, rgba(${ac.rgb},0.25), rgba(${ac.rgb},0.1))`,
                          border: `1px solid rgba(${ac.rgb},0.35)`,
                          boxShadow: `0 0 24px rgba(${ac.rgb},0.15)`,
                        }}
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
      <section className="max-w-[1200px] mx-auto px-[5%] lg:px-[6%] pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease }}
          >
            <TabContent tabKey={activeTab} />
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
