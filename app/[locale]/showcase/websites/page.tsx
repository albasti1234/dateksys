"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRight,
  ExternalLink,
  Code2,
  Smartphone,
  Globe,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";

// ============================================
// Websites Showcase Page
// /showcase/websites — Premium portfolio showcase
// ============================================

const EASE = [0.16, 1, 0.3, 1] as const;

const featuredProject = {
  href: "/demos/school",
  preview: "/demos/school",
  stats: [
    { labelKey: "stat_pages", value: "23+" },
    { labelKey: "stat_roles", value: "5" },
    { labelKey: "stat_ai", value: "3" },
  ],
  tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
};

const filters = [
  { labelKey: "filter_all", value: "all" },
  { labelKey: "filter_websites", value: "website" },
  { labelKey: "filter_webapps", value: "webapp" },
  { labelKey: "filter_saas", value: "saas" },
  { labelKey: "filter_ecommerce", value: "ecommerce" },
];

const upcomingProjects = [
  {
    nameKey: "upcoming_mediflow_name",
    type: "saas",
    tagKey: "upcoming_mediflow_tag",
    descKey: "upcoming_mediflow_desc",
    color: "#2D8659",
    statusKey: "upcoming_mediflow_status",
  },
  {
    nameKey: "upcoming_terra_name",
    type: "website",
    tagKey: "upcoming_terra_tag",
    descKey: "upcoming_terra_desc",
    color: "#C19A4B",
    statusKey: "upcoming_terra_status",
  },
  {
    nameKey: "upcoming_nawras_name",
    type: "ecommerce",
    tagKey: "upcoming_nawras_tag",
    descKey: "upcoming_nawras_desc",
    color: "#0EA5E9",
    statusKey: "upcoming_nawras_status",
  },
  {
    nameKey: "upcoming_olive_name",
    type: "webapp",
    tagKey: "upcoming_olive_tag",
    descKey: "upcoming_olive_desc",
    color: "#DC2626",
    statusKey: "upcoming_olive_status",
  },
];

export default function WebsitesShowcasePage() {
  const t = useTranslations("showcase");
  const locale = useLocale();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? upcomingProjects
      : upcomingProjects.filter((p) => p.type === activeFilter);

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      {/* ──────────────────────────────────────── */}
      {/* HERO — Cinematic Opening */}
      {/* ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden pt-32 pb-20"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient glows */}
        <div
          className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "#38BDF8" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 pointer-events-none"
          style={{ background: "#0EA5E9" }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-[1400px] mx-auto px-[5%] lg:px-[6%] w-full"
        >
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full backdrop-blur-sm"
            style={{
              background: "rgba(56,189,248,0.06)",
              border: "1px solid rgba(56,189,248,0.25)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span
              className="text-xs font-body tracking-widest uppercase"
              style={{ color: "rgba(56,189,248,0.85)" }}
            >
              {t("badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-heading font-extrabold text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            {t("hero_line1")}
            <br />
            <span className="gradient-text">{t("hero_line2")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-10 text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed font-body font-light"
          >
            {t("hero_subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#featured"
              className="relative flex items-center gap-2.5 px-8 py-4 rounded-lg font-semibold text-sm overflow-hidden group"
              style={{
                backgroundColor: "rgba(56,189,248,0.1)",
                color: "#F4F4F5",
                border: "1px solid rgba(56,189,248,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              {t("cta_featured")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 px-8 py-4 rounded-lg font-medium text-sm"
              style={{
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              {t("cta_start")}
            </Link>
          </motion.div>

          {/* Bottom feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl"
          >
            {[
              { icon: Code2, label: t("pill_modern"), sub: t("pill_modern_sub") },
              { icon: Smartphone, label: t("pill_responsive"), sub: t("pill_responsive_sub") },
              { icon: Zap, label: t("pill_fast"), sub: t("pill_fast_sub") },
              { icon: TrendingUp, label: t("pill_seo"), sub: t("pill_seo_sub") },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-md" style={{ background: "rgba(56,189,248,0.1)" }}>
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                      {f.label}
                    </div>
                    <div className="text-[10px] text-text-secondary mt-0.5 truncate">{f.sub}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* FEATURED PROJECT — The Big One */}
      {/* ──────────────────────────────────────── */}
      <section
        id="featured"
        className="relative py-24 lg:py-32 px-[5%] lg:px-[6%]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex items-end justify-between flex-wrap gap-4"
          >
            <div>
              <p className="section-label mb-3">{t("featured_label")}</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
                <span className="gradient-text">{t("featured_title")}</span>
              </h2>
            </div>
            <div className="text-text-secondary text-sm">
              <span className="font-mono">01 / {upcomingProjects.length + 1}</span>
            </div>
          </motion.div>

          {/* Featured card — laptop mockup style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="grid lg:grid-cols-12 gap-0">
              {/* Left — content */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      background: "rgba(56,189,248,0.1)",
                      color: "#7DD3FC",
                      border: "1px solid rgba(56,189,248,0.3)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {t("live_demo")}
                  </span>
                  <span className="text-xs text-text-muted uppercase tracking-wider">
                    {t("featured_category")}
                  </span>
                </div>

                <h3 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary mb-3 leading-tight">
                  {t("project_name")}
                </h3>
                <p className="text-base text-accent font-medium mb-6">
                  {t("project_tagline")}
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  {t("project_desc")}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-[var(--color-border)]">
                  {featuredProject.stats.map((s) => (
                    <div key={s.labelKey}>
                      <div className="font-heading text-2xl sm:text-3xl font-bold gradient-text">
                        {s.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-text-muted mt-1">
                        {t(s.labelKey)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="px-3 py-1.5 text-[10px] font-medium rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={featuredProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm group"
                    style={{
                      backgroundColor: "rgba(56,189,248,0.1)",
                      color: "#F4F4F5",
                      border: "1px solid rgba(56,189,248,0.35)",
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t("visit_demo")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Right — laptop mockup */}
              <div className="lg:col-span-7 relative order-1 lg:order-2 min-h-[280px] lg:min-h-[600px] flex items-center justify-center p-6 lg:p-12 overflow-hidden">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(56,189,248,0.08), transparent 70%)",
                  }}
                />

                {/* Laptop */}
                <div className="relative w-full max-w-2xl">
                  {/* Screen */}
                  <div
                    className="relative aspect-[16/10] rounded-t-xl overflow-hidden"
                    style={{
                      background: "#09090B",
                      border: "8px solid #1f1f24",
                      borderBottom: "none",
                      boxShadow: "0 30px 60px -12px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Browser chrome */}
                    <div className="h-7 bg-[#1a1a1f] flex items-center px-3 gap-2 border-b border-[#2a2a30]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 mx-4 px-3 py-0.5 rounded bg-[#0a0a0e] text-[9px] text-zinc-400 truncate">
                        dateksys.com/demos/school
                      </div>
                    </div>

                    {/* Real screenshot of the live school demo */}
                    <div className="relative w-full h-[calc(100%-28px)] bg-[#0F2C5C]">
                      <Image
                        src="/showcase/school-demo.png"
                        alt="Al-Nakhla International Academy — live demo preview"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Laptop base */}
                  <div
                    className="h-3 mx-[-3%] rounded-b-xl"
                    style={{
                      background: "linear-gradient(180deg, #2a2a30 0%, #1a1a1f 100%)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 end-12 px-4 py-2 rounded-lg backdrop-blur-md hidden lg:flex items-center gap-2"
                  style={{
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.3)",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold text-accent">{t("production_ready")}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* GALLERY — Other Projects */}
      {/* ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-[5%] lg:px-[6%]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="section-label mb-3">{t("more_label")}</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight max-w-3xl">
              <span className="gradient-text">{t("more_title")}</span>
              <span className="text-text-primary">{t("more_subtitle")}</span>
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-md ${
                  activeFilter === f.value
                    ? "bg-accent text-black"
                    : "bg-transparent border border-[var(--color-border)] text-text-secondary hover:border-accent hover:text-accent"
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.nameKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  minHeight: 280,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at top, ${p.color}15, transparent 60%)`,
                  }}
                />

                <div className="relative p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded"
                      style={{
                        background: `${p.color}20`,
                        color: p.color,
                        border: `1px solid ${p.color}40`,
                      }}
                    >
                      {t(p.tagKey)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted">
                      {t(p.statusKey)}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {t(p.nameKey)}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                    {t(p.descKey)}
                  </p>

                  <div
                    className="h-px transition-all duration-500 group-hover:w-24"
                    style={{
                      width: 32,
                      background: `linear-gradient(90deg, ${p.color}, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* FINAL CTA */}
      {/* ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-[5%] lg:px-[6%] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at center, rgba(56,189,248,0.15), transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-6 justify-center">{t("final_label")}</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
              <span className="text-text-primary">{t("final_title1")}</span>
              <br />
              <span className="gradient-text">{t("final_title2")}</span>
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
              {t("final_subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm group"
                style={{
                  backgroundColor: "rgba(56,189,248,0.1)",
                  color: "#F4F4F5",
                  border: "1px solid rgba(56,189,248,0.35)",
                }}
              >
                {t("final_cta_primary")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-sm"
                style={{
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {t("final_cta_secondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
