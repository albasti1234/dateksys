"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import GlowCard from "@/components/ui/GlowCard";
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

// ── Capability icons & descriptions per tab ──
interface CapMeta {
  icon: LucideIcon;
  desc: string;
}

const capabilityMeta: Record<TabKey, CapMeta[]> = {
  infrastructure: [
    { icon: Network, desc: "Enterprise LAN/WAN design with redundancy and failover" },
    { icon: Wifi, desc: "Full-coverage wireless with UniFi & Cisco" },
    { icon: Cable, desc: "Cat6/Cat6A/Fiber termination and testing" },
    { icon: Activity, desc: "Real-time monitoring with alerts and optimization" },
    { icon: Server, desc: "Rack, power, cooling, and cable management" },
  ],
  security: [
    { icon: Camera, desc: "HD IP & analog cameras with NVR/DVR" },
    { icon: Fingerprint, desc: "Biometric readers, card systems, turnstiles" },
    { icon: Flame, desc: "Smoke detection, heat sensors, alarm panels" },
    { icon: ShieldAlert, desc: "Motion sensors and perimeter protection" },
    { icon: ShieldCheck, desc: "Next-gen firewalls and endpoint protection" },
    { icon: MonitorSmartphone, desc: "Centralized dashboards accessible anywhere" },
  ],
  software: [
    { icon: Globe, desc: "Modern, SEO-optimized corporate websites" },
    { icon: ShoppingCart, desc: "Full-stack stores with payment integration" },
    { icon: LayoutDashboard, desc: "Custom SaaS platforms and dashboards" },
    { icon: Megaphone, desc: "High-converting landing pages" },
    { icon: Building2, desc: "ERP, CRM, and workflow automation" },
    { icon: Plug, desc: "RESTful APIs and third-party integrations" },
  ],
};

// ── Stats per tab ──
interface Stat {
  value: string;
  label: string;
}

const tabStats: Record<TabKey, Stat[]> = {
  infrastructure: [
    { value: "500+", label: "Sites Built" },
    { value: "12+", label: "Years Experience" },
    { value: "99.9%", label: "Uptime" },
    { value: "1hr", label: "Response Time" },
  ],
  security: [
    { value: "1000+", label: "Cameras Installed" },
    { value: "200+", label: "Access Points" },
    { value: "24/7", label: "Monitoring" },
    { value: "100%", label: "Coverage" },
  ],
  software: [
    { value: "50+", label: "Projects Delivered" },
    { value: "5", label: "Frameworks" },
    { value: "99", label: "Lighthouse Score" },
    { value: "< 2s", label: "Load Time" },
  ],
};

const tabs: TabKey[] = ["infrastructure", "security", "software"];

// ── Animation variants ──
const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

// ── Tab Content Component ──
function TabContent({ tabKey }: { tabKey: TabKey }) {
  const t = useTranslations("services");
  const capabilities = t.raw(`categories.${tabKey}.capabilities`) as string[];
  const meta = capabilityMeta[tabKey];
  const stats = tabStats[tabKey];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-16"
    >
      {/* Hero Image */}
      <motion.div variants={fadeUp} className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden">
        <Image
          src={heroImages[tabKey]}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.5) 50%, rgba(9,9,11,0.3) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-accent"
              style={{
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.25)",
              }}
            >
              {tabIcons[tabKey]}
            </div>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-white">
              {t(`categories.${tabKey}.title`)}
            </h2>
          </div>
          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            {t(`categories.${tabKey}.description`)}
          </p>
        </div>
      </motion.div>

      {/* Capabilities Grid */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const capMeta = meta[i];
            if (!capMeta) return null;
            const Icon = capMeta.icon;

            return (
              <motion.div key={i} variants={fadeUp}>
                <GlowCard className="p-6 h-full group">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-accent transition-colors duration-300"
                        style={{
                          background: "rgba(56,189,248,0.08)",
                          border: "1px solid rgba(56,189,248,0.15)",
                        }}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                      </div>
                      <h4 className="font-heading font-semibold text-text-primary text-base group-hover:text-accent transition-colors duration-300">
                        {cap}
                      </h4>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed ps-12">
                      {capMeta.desc}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
              className="rounded-xl p-6 text-center"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="block text-2xl lg:text-3xl font-heading font-bold gradient-text mb-1">
                {stat.value}
              </span>
              <span className="text-text-muted text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div variants={fadeUp}>
        <div
          className="rounded-2xl p-8 lg:p-12 text-center"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-3">
            {t("cta_title")}
          </h3>
          <p className="text-text-secondary text-sm lg:text-base mb-8 max-w-lg mx-auto">
            {t("cta_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:brightness-110 transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(56,189,248,0.25)" }}
            >
              {t("cta_primary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
              }}
            >
              {t("cta_secondary")}
            </Link>
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
              transition={{ delay: 0.1, ease }}
              className="text-[clamp(40px,6vw,72px)] font-heading font-black tracking-tight leading-[1.05] text-text-primary mb-5"
            >
              <span className="gradient-text">{t("title")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease }}
              className="text-text-secondary text-base leading-relaxed max-w-xl font-body mb-10"
            >
              {t("subtitle")}
            </motion.p>

            {/* 3-Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease }}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
          >
            <TabContent tabKey={activeTab} />
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
