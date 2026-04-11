"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
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
  name: "Al-Nakhla International Academy",
  tagline: "Complete School Management Platform",
  description:
    "A full-stack educational platform with public website, parent portal, teacher dashboard, student portal, admin panel, AI homework helper, and live bus tracking.",
  href: "/demos/school",
  preview: "/demos/school",
  stats: [
    { label: "Pages Built", value: "23+" },
    { label: "User Roles", value: "5" },
    { label: "AI Features", value: "3" },
  ],
  tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
};

const filters = [
  { label: "All", value: "all" },
  { label: "Websites", value: "website" },
  { label: "Web Apps", value: "webapp" },
  { label: "SaaS", value: "saas" },
  { label: "E-commerce", value: "ecommerce" },
];

const upcomingProjects = [
  {
    name: "MediFlow Clinic",
    type: "saas",
    tag: "SaaS Dashboard",
    desc: "Clinic management system with patient portal and doctor scheduling.",
    color: "#2D8659",
    status: "In Development",
  },
  {
    name: "Terra Real Estate",
    type: "website",
    tag: "Corporate Website",
    desc: "Premium real estate platform with property search and CRM integration.",
    color: "#C19A4B",
    status: "Coming Soon",
  },
  {
    name: "Nawras Store",
    type: "ecommerce",
    tag: "E-commerce",
    desc: "Full-stack e-commerce platform with payment integration and admin panel.",
    color: "#0EA5E9",
    status: "Coming Soon",
  },
  {
    name: "Olive & Stone",
    type: "webapp",
    tag: "Restaurant System",
    desc: "Online ordering, table reservations, and loyalty program for restaurants.",
    color: "#DC2626",
    status: "Coming Soon",
  },
];

export default function WebsitesShowcasePage() {
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
              Websites & Web Apps Showcase
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
            Crafted.
            <br />
            <span className="gradient-text">Not Assembled.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-10 text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed font-body font-light"
          >
            We build digital products that businesses actually need — full-stack
            websites, web applications, and SaaS platforms engineered with
            modern frameworks for speed, scale, and impact.
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
              View Featured Project
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
              Start Your Project
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
              { icon: Code2, label: "Modern Stack", sub: "Next.js · React · TypeScript" },
              { icon: Smartphone, label: "Responsive", sub: "Mobile-first design" },
              { icon: Zap, label: "Fast", sub: "Optimized for speed" },
              { icon: TrendingUp, label: "SEO Ready", sub: "Built for visibility" },
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
              <p className="section-label mb-3">Featured Case Study</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
                <span className="gradient-text">Latest Project</span>
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
                    Live Demo
                  </span>
                  <span className="text-xs text-text-muted uppercase tracking-wider">
                    Education · K-12
                  </span>
                </div>

                <h3 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary mb-3 leading-tight">
                  {featuredProject.name}
                </h3>
                <p className="text-base text-accent font-medium mb-6">
                  {featuredProject.tagline}
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  {featuredProject.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-[var(--color-border)]">
                  {featuredProject.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-heading text-3xl font-bold gradient-text">
                        {s.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-text-muted mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-[10px] font-medium rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {t}
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
                    Visit Live Demo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Right — laptop mockup */}
              <div className="lg:col-span-7 relative order-1 lg:order-2 min-h-[400px] lg:min-h-[600px] flex items-center justify-center p-6 lg:p-12 overflow-hidden">
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
                  <span className="text-xs font-semibold text-accent">Production Ready</span>
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
            <p className="section-label mb-3">More Projects</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight max-w-3xl">
              <span className="gradient-text">Coming soon</span>
              <span className="text-text-primary"> — additional case studies in production</span>
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
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
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
                      {p.tag}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                    {p.desc}
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
            <p className="section-label mb-6 justify-center">Let&apos;s Build</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
              <span className="text-text-primary">Ready to build </span>
              <br />
              <span className="gradient-text">something great?</span>
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us about your project. Free consultation, transparent pricing,
              and a team that actually listens.
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
                Get Free Consultation
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
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
