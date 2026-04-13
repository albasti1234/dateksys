"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";

export default function ExperienceSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["experience"];
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <section className="py-32 lg:py-40 bg-surface-dark relative overflow-hidden">
      {/* Large decorative text */}
      <div
        className="absolute top-1/2 -translate-y-1/2 start-0 text-[120px] lg:text-[200px] font-normal text-white/[0.02] pointer-events-none select-none leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          writingMode: "vertical-lr",
        }}
      >
        EXPERIENCE
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
          className="max-w-2xl mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="section-label">{dict.label}</span>
          </div>
          <h2 className={`text-text-on-dark ${fontHeading}`}>
            {dict.title}{" "}
            <em className="italic text-gold-light">{dict.titleAccent}.</em>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-3 gap-6"
        >
          {dict.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="card-glass p-8 lg:p-10 group"
            >
              <div className="w-8 h-px bg-gold/30 mb-6 group-hover:w-12 transition-all duration-500" />
              <h3 className={`text-lg text-text-on-dark mb-4 ${fontHeading}`}>
                {card.title}
              </h3>
              <p className="text-sm text-text-on-dark-muted leading-relaxed font-light">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
