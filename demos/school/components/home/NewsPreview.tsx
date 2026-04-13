"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
  fadeUp,
  fadeUpSubtle,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

// ============================================
// Latest News & Events Preview — bilingual
// ============================================

type NewsDict = {
  eyebrow: string;
  title: string;
  items: readonly {
    category: string;
    date: string;
    title: string;
    excerpt: string;
  }[];
  cta: string;
};

const newsImages = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
];

export default function NewsPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: NewsDict;
}) {
  const isRTL = locale === "ar";
  const headlineClass = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-tight";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-lg font-bold text-[var(--color-navy)] mb-3 leading-[1.6] group-hover:text-[var(--color-gold-dark)] transition-colors duration-300"
    : "font-serif text-lg font-bold text-[var(--color-navy)] mb-3 leading-snug group-hover:text-[var(--color-gold-dark)] transition-colors duration-300";

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex items-end justify-between flex-wrap gap-6 mb-16"
        >
          <div className="max-w-xl">
            <motion.p variants={fadeUpSubtle} className="section-label mb-4">
              {dict.eyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className={headlineClass}>
              {dict.title}
            </motion.h2>
          </div>
          <motion.div variants={fadeUpSubtle}>
            <Link href={`/${locale}/news`} className="btn-outline">
              {dict.cta}
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`} />
            </Link>
          </motion.div>
        </motion.div>

        {/* News grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {dict.items.map((item, i) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-white border border-[var(--color-border)] overflow-hidden group hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-xl"
            >
              <Link
                href={`/${locale}/news/${i + 1}`}
                className="block cursor-pointer"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${newsImages[i]}')` }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white"
                      style={{ background: "#C19A4B" }}
                    >
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--color-ink-soft)]">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className={cardTitleClass}>{item.title}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
