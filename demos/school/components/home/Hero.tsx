"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import type { Locale } from "@/i18n/config";

// ============================================
// Home Hero — cinematic video background
// ============================================

const EASE = [0.16, 1, 0.3, 1] as const;

type HeroDict = {
  badge: string;
  headlineTop: string;
  headlineMid: string;
  headlineAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: readonly { num: string; label: string }[];
  floatingBadge: { value: string; label: string };
};

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HeroDict;
}) {
  const isRTL = locale === "ar";

  const headlineClass = isRTL
    ? "font-arabic-display text-5xl md:text-6xl lg:text-[5rem] font-bold text-white leading-[1.25] tracking-tight"
    : "font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight";

  // RTL-aware gradient — heavier on the text side
  const overlayGradient = isRTL
    ? "linear-gradient(to left, rgba(15,30,55,0.88) 0%, rgba(15,30,55,0.65) 40%, rgba(15,30,55,0.35) 70%, rgba(15,30,55,0.15) 100%)"
    : "linear-gradient(to right, rgba(15,30,55,0.88) 0%, rgba(15,30,55,0.65) 40%, rgba(15,30,55,0.35) 70%, rgba(15,30,55,0.15) 100%)";

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/demos/school/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay gradient — heavier on text side */}
        <div className="absolute inset-0" style={{ background: overlayGradient }} />

        {/* Extra top-to-bottom vignette for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(15,30,55,0.3) 0%, transparent 30%, transparent 70%, rgba(15,30,55,0.5) 100%)",
          }}
        />

        {/* Bottom fade to page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, var(--color-cream, #FAF8F4) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Scan line animation ── */}
      <style>{`
        @keyframes scan {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div
          className="absolute left-0 right-0 h-[1px] animate-scan"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(193,154,75,0.12) 30%, rgba(193,154,75,0.25) 50%, rgba(193,154,75,0.12) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full backdrop-blur-md"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Award className="w-4 h-4 text-[#C9A84C]" />
            <span
              className={`text-xs font-semibold text-white/90 tracking-wider ${
                isRTL ? "" : "uppercase"
              }`}
            >
              {dict.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className={headlineClass}
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            {dict.headlineTop}
            <br />
            <span className="italic text-[#C9A84C]" style={{ textShadow: "0 0 40px rgba(193,154,75,0.3)" }}>
              {dict.headlineMid}
            </span>
            <br />
            {dict.headlineAccent}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-8 text-lg text-white/75 max-w-[580px] leading-relaxed"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
          >
            {dict.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href={`/${locale}/admissions`}>
              <button
                className="group flex items-center gap-2 px-8 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#C9A84C",
                  color: "#0F1E37",
                  boxShadow: "0 4px 20px rgba(193,154,75,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4B86A";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(193,154,75,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#C9A84C";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(193,154,75,0.25)";
                }}
              >
                {dict.ctaPrimary}
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
                />
              </button>
            </Link>
            <Link
              href={`/${locale}/about`}
              className="flex items-center gap-2 px-8 py-4 font-medium text-sm tracking-wider uppercase text-white transition-all duration-300 hover:bg-white/5 group"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              {dict.ctaSecondary}
              <ArrowRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
              />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-[500px]"
          >
            {dict.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className={`${
                    isRTL ? "font-arabic-display" : "font-serif"
                  } text-4xl font-bold text-white`}
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                >
                  {stat.num}
                </div>
                <div className="text-xs tracking-wider text-white/50 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating stats card — desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="absolute bottom-32 end-[6%] z-10 hidden lg:block"
        >
          <div
            className="p-5 max-w-[220px] backdrop-blur-md rounded-xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`flex ${isRTL ? "-space-x-reverse -space-x-2" : "-space-x-2"}`}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ background: "#C9A84C" }}
                  />
                ))}
                <div
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ background: "rgba(193,154,75,0.3)" }}
                />
              </div>
            </div>
            <span
              className={`font-bold text-white ${isRTL ? "text-xl font-arabic-display" : "text-2xl font-serif"}`}
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
            >
              {dict.floatingBadge.value}
            </span>
            <p className="text-xs text-white/60 mt-1">{dict.floatingBadge.label}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
