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

type TabKey = "infrastructure" | "security" | "software";

const tabAccent: Record<TabKey, { main: string; rgb: string; gradient: string }> = {
  infrastructure: {
    main: "#38BDF8",
    rgb: "56,189,248",
    gradient: "linear-gradient(135deg, #38BDF8, #0EA5E9)",
  },
  security: {
    main: "#A78BFA",
    rgb: "167,139,250",
    gradient: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
  },
  software: {
    main: "#34D399",
    rgb: "52,211,153",
    gradient: "linear-gradient(135deg, #34D399, #10B981)",
  },
};

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

const heroImages: Record<TabKey, string> = {
  infrastructure: "/images/projects/fiber1.webp",
  security: "/images/services/security1.webp",
  software: "/images/services/software1.webp",
};

// Secondary images for the "hero card" in bento grid
const secondaryImages: Record<TabKey, string> = {
  infrastructure: "/images/services/network1.webp",
  security: "/images/projects/security1.webp",
  software: "/images/projects/webdev1.webp",
};

const capIcons: Record<TabKey, LucideIcon[]> = {
  infrastructure: [Network, Wifi, Cable, Activity, Server],
  security: [Camera, Fingerprint, Flame, ShieldAlert, ShieldCheck, MonitorSmartphone],
  software: [Globe, ShoppingCart, LayoutDashboard, Megaphone, Building2, Plug],
};

const tabs: TabKey[] = ["infrastructure", "security", "software"];
const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// ══════════════════════════════════════════════
// BENTO CARD — the core visual building block
// ══════════════════════════════════════════════
function BentoCard({
  icon: Icon,
  title,
  desc,
  accent,
  variant,
  image,
  isRTL,
}: {
  icon: LucideIcon;
  title: string;
  desc?: string;
  accent: { main: string; rgb: string; gradient: string };
  variant: "hero" | "featured" | "standard";
  image?: string;
  isRTL: boolean;
}) {
  if (variant === "hero") {
    // ── HERO CARD — large, with background image, spans 2 cols + 2 rows ──
    return (
      <motion.div
        variants={fadeUp}
        className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group min-h-[280px] lg:min-h-[340px]"
      >
        {/* Background image */}
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(${isRTL ? "to left" : "to right"}, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.6) 50%, rgba(9,9,11,0.3) 100%),
              linear-gradient(to top, rgba(9,9,11,0.7) 0%, transparent 50%)
            `,
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 50% 70% at ${isRTL ? "85%" : "15%"} 80%, rgba(${accent.rgb},0.3), transparent 70%)`,
          }}
        />
        {/* Content */}
        <div className={`absolute inset-0 flex flex-col justify-end p-8 lg:p-10 ${isRTL ? "items-end text-end" : ""}`}>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background: accent.gradient,
              boxShadow: `0 0 40px rgba(${accent.rgb},0.3)`,
            }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-heading font-bold text-white text-xl lg:text-2xl mb-2">
            {title}
          </h3>
          {desc && (
            <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-md">
              {desc}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  if (variant === "featured") {
    // ── FEATURED CARD — accent gradient bg, prominent icon ──
    return (
      <motion.div variants={fadeUp} className="group">
        <div
          className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
          style={{
            background: `linear-gradient(160deg, rgba(${accent.rgb},0.12) 0%, rgba(${accent.rgb},0.03) 40%, var(--color-surface) 100%)`,
            border: `1px solid rgba(${accent.rgb},0.25)`,
          }}
        >
          {/* Corner accent glow */}
          <div
            className="absolute -top-20 -end-20 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
            style={{ background: accent.main }}
          />
          {/* Hover border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 30px rgba(${accent.rgb},0.05), 0 0 20px rgba(${accent.rgb},0.08)` }}
          />

          <div className="relative z-10 p-7 lg:p-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `rgba(${accent.rgb},0.15)`,
                border: `1px solid rgba(${accent.rgb},0.3)`,
                color: accent.main,
              }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-white transition-colors duration-300">
              {title}
            </h4>
            {desc && (
              <p className="text-text-muted text-sm leading-relaxed">
                {desc}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // ── STANDARD CARD — clean, lighter surface ──
  return (
    <motion.div variants={fadeUp} className="group">
      <div
        className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
        style={{
          background: "rgba(17,17,19,0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Hover accent line on top */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: accent.gradient }}
        />

        <div className="relative z-10 p-6">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `rgba(${accent.rgb},0.08)`,
                border: `1px solid rgba(${accent.rgb},0.15)`,
                color: accent.main,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-semibold text-text-primary text-[15px] group-hover:text-white transition-colors duration-300 mb-1">
                {title}
              </h4>
              {desc && (
                <p className="text-text-muted text-[13px] leading-relaxed">
                  {desc}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════
// TAB CONTENT
// ══════════════════════════════════════════════
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
    ? "linear-gradient(to left, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.35) 55%, rgba(9,9,11,0.1) 100%)"
    : "linear-gradient(to right, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.35) 55%, rgba(9,9,11,0.1) 100%)";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-16 lg:space-y-20"
    >
      {/* ═══ HERO IMAGE — full width but controlled height ═══ */}
      <motion.div
        variants={fadeUp}
        className="relative w-[100vw] -ms-[calc((100vw-100%)/2)] h-[260px] sm:h-[300px] lg:h-[340px] overflow-hidden group"
      >
        <Image
          src={heroImages[tabKey]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0" style={{ background: heroGradient }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(9,9,11,0.5) 0%, transparent 30%)" }}
        />
        {/* Accent glow */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 40% 60% at ${isRTL ? "90%" : "10%"} 70%, rgba(${accent.rgb},0.35), transparent 70%)`,
          }}
        />
        {/* Accent line at bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-[3px]"
          style={{ background: accent.gradient }}
        />

        <div className={`absolute inset-0 flex flex-col justify-center px-[5%] lg:px-[8%] ${isRTL ? "items-end text-end" : ""}`}>
          <h2
            className="font-heading font-extrabold text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
          >
            {t(`categories.${tabKey}.title`)}
          </h2>
          <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-xl font-body">
            {t(`categories.${tabKey}.description`)}
          </p>
        </div>
      </motion.div>

      {/* ═══ BENTO CAPABILITIES GRID ═══ */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto">
          {capabilities.map((cap, i) => {
            const Icon = icons[i];
            if (!Icon) return null;

            // First card = hero (2×2), next 2 = featured, rest = standard
            let variant: "hero" | "featured" | "standard" = "standard";
            if (i === 0) variant = "hero";
            else if (i <= 2) variant = "featured";

            return (
              <BentoCard
                key={i}
                icon={Icon}
                title={cap}
                desc={capDescs?.[i]}
                accent={accent}
                variant={variant}
                image={i === 0 ? secondaryImages[tabKey] : undefined}
                isRTL={isRTL}
              />
            );
          })}
        </div>
      </motion.div>

      {/* ═══ STATS ═══ */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: "rgba(17,17,19,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: accent.gradient }}
              />
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, rgba(${accent.rgb},0.08), transparent 70%)`,
                }}
              />
              <div className="relative z-10 p-7 lg:p-8 text-center">
                <span
                  className="block font-heading font-black mb-2"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    background: accent.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 24px rgba(${accent.rgb},0.25))`,
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

      {/* ═══ CTA — full width ═══ */}
      <motion.div variants={fadeUp} className="w-[100vw] -ms-[calc((100vw-100%)/2)]">
        <div className="relative overflow-hidden">
          {/* Multi-layer bg */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 70% at 50% 110%, rgba(${accent.rgb},0.15), transparent 60%),
                radial-gradient(ellipse 40% 40% at 80% 10%, rgba(${accent.rgb},0.08), transparent 50%),
                rgba(17,17,19,0.9)
              `,
            }}
          />
          {/* Top border line */}
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, rgba(${accent.rgb},0.3), transparent)` }}
          />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${accent.main} 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 p-12 lg:p-20 text-center">
            <h3
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              {t("cta_title")}
            </h3>
            <p className="text-text-secondary text-base lg:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              {t("cta_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="block">
                <motion.span
                  className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-semibold text-sm cursor-pointer text-white"
                  style={{
                    background: accent.gradient,
                    boxShadow: `0 0 40px rgba(${accent.rgb},0.2), 0 4px 20px rgba(0,0,0,0.3)`,
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -3,
                    boxShadow: `0 0 60px rgba(${accent.rgb},0.35), 0 12px 30px rgba(0,0,0,0.4)`,
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
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-medium text-sm cursor-pointer"
                  style={{
                    color: "var(--color-text-secondary)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -3,
                    color: "#F4F4F5",
                    borderColor: `rgba(${accent.rgb},0.3)`,
                    backgroundColor: `rgba(${accent.rgb},0.05)`,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {t("cta_secondary")}
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("infrastructure");
  const t = useTranslations("services");

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute -top-[100px] end-[-200px] w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-[200px] start-[-300px] w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-[5%] lg:px-[6%] relative z-10">
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
              className="font-heading font-black tracking-tight leading-[1.05] text-text-primary mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
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

            {/* Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease }}
              className="flex flex-wrap justify-center gap-2 p-2 rounded-2xl"
              style={{
                background: "rgba(17,17,19,0.8)",
                border: "1px solid var(--color-border)",
                backdropFilter: "blur(16px)",
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
                      isActive ? "text-white" : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, rgba(${ac.rgb},0.25), rgba(${ac.rgb},0.08))`,
                          border: `1px solid rgba(${ac.rgb},0.4)`,
                          boxShadow: `0 0 28px rgba(${ac.rgb},0.18)`,
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tabIcons[tab]}</span>
                    <span className="relative z-10">{t(`categories.${tab}.label`)}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-[1400px] mx-auto px-[5%] lg:px-[6%] pb-32">
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
