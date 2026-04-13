"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { journalArticles } from "@/lib/properties";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";
import JournalPreview from "@/components/home/JournalPreview";

export default function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <>
      <section className="bg-surface-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: SILK }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{dict.home.journal.label}</span>
            </div>
            <h1 className={`text-text-on-dark ${fontHeading}`}>
              {isRTL ? "المجلة" : "The Journal"}
            </h1>
            <p className="text-text-on-dark-muted text-lg mt-4 font-light max-w-2xl">
              {isRTL ? "مقالات مختارة عن العقارات والاستثمار ونمط الحياة" : "Selected articles on real estate, investment, and lifestyle"}
            </p>
          </motion.div>
        </div>
      </section>

      <JournalPreview locale={locale} dict={dict.home.journal} articles={journalArticles} />
    </>
  );
}
