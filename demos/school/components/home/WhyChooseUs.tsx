"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Globe2,
  Building2,
  Heart,
  Award,
  Users,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

// ============================================
// Why Choose Us — Six pillars of Al-Nakhla
// ============================================

type WhyDict = {
  eyebrow: string;
  title: string;
  features: readonly { title: string; description: string }[];
};

const icons = [GraduationCap, Building2, Globe2, Award, Heart, Users];

export default function WhyChooseUs({
  locale,
  dict,
}: {
  locale: Locale;
  dict: WhyDict;
}) {
  const isRTL = locale === "ar";
  const titleClass = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)] mb-3 leading-[1.5]"
    : "font-serif text-xl font-bold text-[var(--color-navy)] mb-3";

  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="section-label mb-4 !justify-center">{dict.eyebrow}</p>
          <h2 className={titleClass}>{dict.title}</h2>
          <div className="ornamental-divider" />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.features.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 border border-[var(--color-border)] bg-[var(--color-cream)] hover:bg-white hover:shadow-xl transition-all duration-500 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ background: "#0F2C5C" }}
                  >
                    <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                </div>

                {/* Gold accent line */}
                <div
                  className="w-12 h-px mb-4 transition-all duration-500 group-hover:w-20"
                  style={{ background: "#C19A4B" }}
                />

                {/* Text */}
                <h3 className={cardTitleClass}>{f.title}</h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
