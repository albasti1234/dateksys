"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Testimonial } from "@/lib/types";
import { viewport, SILK } from "@/lib/animations";

export default function TestimonialsSection({
  locale,
  dict,
  testimonials,
}: {
  locale: Locale;
  dict: Dictionary["home"]["testimonials"];
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";
  const current = testimonials[active];

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 lg:py-40 bg-surface-warm">
      <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="section-label">{dict.label}</span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className={`mb-16 ${fontHeading}`}>{dict.title}</h2>
        </motion.div>

        {/* Quote */}
        <div className="relative min-h-[200px]">
          {/* Decorative quotes */}
          <div className="text-[80px] text-gold/10 leading-none absolute -top-8 start-0" style={{ fontFamily: "var(--font-heading)" }}>
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: SILK }}
            >
              <blockquote
                className={`text-[clamp(1.25rem,3vw,1.75rem)] font-light leading-relaxed text-text-body mb-10 italic ${fontHeading}`}
              >
                {current.quote[locale]}
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < current.rating ? "text-gold fill-gold" : "text-border"}`}
                  />
                ))}
              </div>

              <p className="text-sm font-medium text-text-heading">
                {current.name[locale]}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {current.role[locale]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
