"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { JournalArticle } from "@/lib/types";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";

export default function JournalPreview({
  locale,
  dict,
  articles,
}: {
  locale: Locale;
  dict: Dictionary["home"]["journal"];
  articles: JournalArticle[];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="section-label">{dict.label}</span>
          </div>
          <h2 className={fontHeading}>{dict.title}</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={fadeUp}>
              <Link href={`${prefix}/journal/${article.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-warm mb-6">
                  <Image
                    src={article.image || "/demos/realestate/images/journal/neighborhood.webp"}
                    alt={article.title[locale]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3 text-xs text-text-muted">
                  <span className="text-gold font-medium tracking-wider uppercase">
                    {article.category[locale]}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime} {dict.minRead}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-normal mb-3 group-hover:text-gold transition-colors ${fontHeading}`}>
                  {article.title[locale]}
                </h3>

                <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                  {article.excerpt[locale]}
                </p>

                <span className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.2em] uppercase font-medium group-hover:gap-3 transition-all">
                  {dict.readArticle}
                  <Arrow className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
