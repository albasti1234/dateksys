"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { SILK, EXPO, lineExpand, wordRevealContainer, wordReveal } from "@/lib/animations";

export default function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["hero"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image with slow zoom */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-slow-zoom bg-cover bg-center"
          style={{
            backgroundImage: "url('/demos/realestate/images/hero.webp')",
            backgroundColor: "#1a1a1a",
          }}
        />
      </div>

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: isRTL
            ? "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)"
            : "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, var(--color-base) 0%, transparent 30%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 20%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-[6%] pb-20 lg:pb-28">
        {/* Gold line */}
        <motion.div
          variants={lineExpand}
          initial="hidden"
          animate="visible"
          className="w-12 h-px bg-gold mb-6 origin-left"
          style={{ transitionDelay: "0.5s" }}
        />

        {/* Pre-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: SILK }}
          className="section-label text-white/50 mb-6"
        >
          {dict.preHeading}
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={wordRevealContainer}
          initial="hidden"
          animate="visible"
          className="text-white max-w-3xl mb-6"
          style={{ fontFamily: isRTL ? "var(--font-arabic-heading)" : "var(--font-heading)" }}
        >
          <span className="block overflow-hidden">
            <motion.span variants={wordReveal} className="inline-block">
              {dict.titleLine1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={wordReveal} className="inline-block me-3">
              {dict.titleLine2}
            </motion.span>
            <motion.span
              variants={wordReveal}
              className="inline-block italic text-gold-light"
              style={{ fontFamily: isRTL ? "var(--font-arabic-heading)" : "var(--font-heading)" }}
            >
              {dict.titleAccent}.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: SILK }}
          className="text-[15px] text-white/60 max-w-md mb-10 font-light leading-relaxed"
          style={{ fontFamily: isRTL ? "var(--font-arabic-body)" : "var(--font-body)" }}
        >
          {dict.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: SILK }}
          className="flex flex-wrap gap-4"
        >
          <Link href={`${prefix}/properties`} className="btn-primary">
            {dict.ctaPrimary}
          </Link>
          <Link href={`${prefix}/contact`} className="btn-ghost">
            {dict.ctaSecondary}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[9px] tracking-[0.5em] uppercase">
          {dict.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
