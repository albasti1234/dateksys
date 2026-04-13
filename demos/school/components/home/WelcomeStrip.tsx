"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import {
  fadeUp,
  fadeUpSubtle,
  staggerContainer,
  lineExpand,
  viewportOnce,
} from "@/lib/animations";

// ============================================
// Welcome / Leadership Message
// Single, authentic message from the Head of School
// ============================================

type WelcomeDict = {
  eyebrow: string;
  title: string;
  body: string;
  signature: string;
};

export default function WelcomeStrip({
  locale,
  dict,
}: {
  locale: Locale;
  dict: WelcomeDict;
}) {
  const isRTL = locale === "ar";
  const titleClass = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight";
  const bodyClass = isRTL
    ? "text-[var(--color-ink-soft)] leading-[2.05] text-lg md:text-[1.125rem]"
    : "text-[var(--color-ink-soft)] leading-relaxed text-lg";

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Decorative corner ornament */}
      <div
        className="absolute top-12 start-12 w-24 h-24 opacity-[0.08] hidden lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C19A4B 1.5px, transparent 2px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        className="absolute bottom-12 end-12 w-32 h-32 opacity-[0.08] hidden lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0F2C5C 1.5px, transparent 2px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative max-w-[860px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUpSubtle} className="section-label mb-6 !justify-center">
            {dict.eyebrow}
          </motion.p>

          <motion.h2 variants={fadeUp} className={titleClass}>
            {dict.title}
          </motion.h2>

          <motion.div variants={lineExpand} className="ornamental-divider mb-10" />

          <motion.p variants={fadeUp} className={bodyClass}>
            {dict.body}
          </motion.p>

          {/* Signature */}
          <motion.div variants={fadeUpSubtle} className="mt-12 flex flex-col items-center gap-3">
            <div className="w-16 h-px bg-[var(--color-gold)]" />
            <p
              className={`text-sm tracking-wider ${
                isRTL ? "font-arabic" : "uppercase"
              } text-[var(--color-navy)] font-semibold`}
            >
              {dict.signature}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
