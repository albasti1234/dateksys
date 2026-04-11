"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Award } from "lucide-react";

// ============================================
// Home Hero — Cinematic with image grid overlay
// ============================================

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[var(--color-cream)]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0F2C5C 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gold accent shapes */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "#C19A4B" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "#0F2C5C" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-16 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left — content */}
        <div className="lg:col-span-7 relative z-10">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border border-[var(--color-border)] rounded-full shadow-sm"
          >
            <Award className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="text-xs font-semibold text-[var(--color-navy)] tracking-wider uppercase">
              Ranked Top 5 International Schools in Jordan 2025
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-[var(--color-navy)] leading-[1.05] tracking-tight"
          >
            Where
            <br />
            <span className="italic text-[var(--color-gold)]">Excellence</span>
            <br />
            Takes Root.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-8 text-lg text-[var(--color-ink-soft)] max-w-[560px] leading-relaxed"
          >
            A premier K-12 international academy in Amman, offering a
            world-class bilingual education where every child is nurtured,
            challenged, and prepared for a global future.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/admissions">
              <button className="btn-primary group">
                Apply for Admission
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="btn-outline group">
              <Play className="w-4 h-4" />
              Watch Campus Tour
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-[560px]"
          >
            {[
              { num: "850+", label: "Students" },
              { num: "65+", label: "Faculty" },
              { num: "22", label: "Years" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl font-bold text-[var(--color-navy)]">
                  {stat.num}
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — image collage */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[640px]">
          {/* Large main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="absolute top-0 end-0 w-[75%] h-[70%] overflow-hidden shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Navy overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 via-transparent to-transparent" />
            {/* Gold corner accent */}
            <div
              className="absolute top-4 end-4 w-12 h-12 border-t-2 border-e-2 pointer-events-none"
              style={{ borderColor: "#C19A4B" }}
            />
          </motion.div>

          {/* Small offset image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="absolute bottom-0 start-0 w-[60%] h-[45%] overflow-hidden shadow-2xl border-8 border-white"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute bottom-4 start-4 w-12 h-12 border-b-2 border-s-2 pointer-events-none"
              style={{ borderColor: "#C19A4B" }}
            />
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            className="absolute top-[55%] end-0 bg-white shadow-2xl p-5 max-w-[200px] border-t-2"
            style={{ borderColor: "#C19A4B" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    style={{
                      background: `hsl(${200 + i * 20}, 40%, 60%)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="font-serif text-xs text-[var(--color-ink-soft)]">
              <span className="font-bold text-[var(--color-navy)] text-base">
                98%
              </span>
              <br />
              University acceptance rate
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{
        clipPath: "polygon(0 100%, 100% 100%, 100% 40%, 50% 0, 0 40%)"
      }} />
    </section>
  );
}
