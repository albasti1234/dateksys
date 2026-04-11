"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Calendar, ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const images = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
];

export default function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const n = dict.pages.news;
  const isRTL = locale === "ar";

  const categories = [
    { key: "all", label: n.categories.all },
    { key: "achievements", label: n.categories.achievements },
    { key: "events", label: n.categories.events },
    { key: "academic", label: n.categories.academic },
    { key: "community", label: n.categories.community },
    { key: "sports", label: n.categories.sports },
  ];

  const featuredTitleClass = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4 leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4 leading-tight";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-lg font-bold text-[var(--color-navy)] mb-3 leading-[1.5] group-hover:text-[var(--color-gold-dark)] transition-colors"
    : "font-serif text-lg font-bold text-[var(--color-navy)] mb-3 leading-snug group-hover:text-[var(--color-gold-dark)] transition-colors";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={n.hero.label}
        title={n.hero.title}
        subtitle={n.hero.subtitle}
        breadcrumbs={[{ label: n.hero.breadcrumb }]}
      />

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c, i) => (
              <button
                key={c.key}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                  i === 0
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[var(--color-navy)] hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 grid lg:grid-cols-2 gap-8 academic-card overflow-hidden"
          >
            <div
              className="h-[400px] lg:h-auto bg-cover bg-center"
              style={{ backgroundImage: `url('${images[0]}')` }}
            />
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1.5 text-[10px] font-bold tracking-widest text-white bg-[var(--color-gold)] mb-4">
                {n.featured.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] mb-4">
                <Calendar className="w-3 h-3" />
                {n.featured.date}
              </div>
              <h2 className={featuredTitleClass}>{n.featured.title}</h2>
              <p
                className={`text-[var(--color-ink-soft)] mb-6 ${
                  isRTL ? "leading-[2]" : "leading-relaxed"
                }`}
              >
                {n.featured.excerpt}
              </p>
              <button className="btn-outline w-fit group">
                {n.featured.readMore}
                <ArrowUpRight
                  className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${
                    isRTL ? "-scale-x-100" : ""
                  }`}
                />
              </button>
            </div>
          </motion.article>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {n.items.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="academic-card overflow-hidden group cursor-pointer"
              >
                <div
                  className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${images[(i + 1) % images.length]}')`,
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider bg-[var(--color-navy)] text-white">
                      {p.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--color-ink-soft)]">
                      <Calendar className="w-3 h-3" />
                      {p.date}
                    </span>
                  </div>
                  <h3 className={cardTitleClass}>{p.title}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
