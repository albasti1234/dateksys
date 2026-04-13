"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Property } from "@/lib/types";
import { fadeUp, imageReveal, stagger, viewport } from "@/lib/animations";

export default function PropertyStory({
  locale,
  dict,
  property,
}: {
  locale: Locale;
  dict: Dictionary["propertyDetail"];
  property: Property;
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Text */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{dict.story}</span>
            </div>
            <h2 className={`mb-8 ${fontHeading}`}>
              {property.tagline[locale]}
            </h2>
            <p className="text-text-body text-lg leading-relaxed font-light">
              {property.story[locale]}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={imageReveal}
            className="relative aspect-[4/5] overflow-hidden bg-surface-warm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-surface-warm to-gold-subtle" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
