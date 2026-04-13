"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
  fadeUp,
  fadeUpSubtle,
  staggerContainer,
  staggerItem,
  scaleIn,
  viewportOnce,
} from "@/lib/animations";

// ============================================
// Family Testimonials — bilingual, formal voice
// ============================================

type TestimonialsDict = {
  eyebrow: string;
  title: string;
  items: readonly {
    quote: string;
    author: string;
    role: string;
  }[];
};

const portraits = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
];

export default function Testimonials({
  locale,
  dict,
}: {
  locale: Locale;
  dict: TestimonialsDict;
}) {
  const isRTL = locale === "ar";
  const titleClass = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold mb-6 leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight";
  const quoteClass = isRTL
    ? "font-arabic text-lg text-white/90 leading-[2] mb-8 relative"
    : "font-serif text-lg text-white/90 leading-relaxed mb-8 relative";

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-navy)] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #C19A4B 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeUpSubtle} className="section-label !text-[var(--color-gold)] mb-4 !justify-center">
            {dict.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className={titleClass}>
            {dict.title}
          </motion.h2>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {dict.items.map((t, i) => (
            <motion.div
              key={t.author}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative p-8 backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(193,154,75,0.2)",
              }}
            >
              <Quote
                className={`absolute top-5 end-5 w-10 h-10 opacity-20 ${
                  isRTL ? "-scale-x-100" : ""
                }`}
                style={{ color: "#C19A4B" }}
              />

              <p className={quoteClass}>&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center border-2 shrink-0"
                  style={{
                    backgroundImage: `url('${portraits[i % portraits.length]}')`,
                    borderColor: "#C19A4B",
                  }}
                />
                <div>
                  <div className="font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-[var(--color-gold-light)] mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
