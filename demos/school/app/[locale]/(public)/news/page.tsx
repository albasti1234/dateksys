"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: n.categories.all },
    { key: "achievements", label: n.categories.achievements },
    { key: "events", label: n.categories.events },
    { key: "academic", label: n.categories.academic },
    { key: "community", label: n.categories.community },
    { key: "sports", label: n.categories.sports },
  ];

  // Map Arabic/English category labels to keys for filtering
  const categoryKeyMap: Record<string, string> = {
    [n.categories.achievements.toLowerCase()]: "achievements",
    [n.categories.events.toLowerCase()]: "events",
    [n.categories.academic.toLowerCase()]: "academic",
    [n.categories.community.toLowerCase()]: "community",
    [n.categories.sports.toLowerCase()]: "sports",
  };

  const filteredNews =
    activeCategory === "all"
      ? n.items
      : n.items.filter(
          (item) =>
            categoryKeyMap[item.category.toLowerCase()] === activeCategory
        );

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
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                  activeCategory === c.key
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
              <Link
                href={`/${locale}/news/1`}
                className="btn-outline w-fit group inline-flex"
              >
                {n.featured.readMore}
                <ArrowUpRight
                  className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${
                    isRTL ? "-scale-x-100" : ""
                  }`}
                />
              </Link>
            </div>
          </motion.article>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNews.length === 0 ? (
                <p className="col-span-full text-center py-16 text-[var(--color-ink-soft)]">
                  {locale === "ar"
                    ? "لا توجد أخبار في هذا التصنيف حالياً"
                    : "No news in this category right now"}
                </p>
              ) : (
                filteredNews.map((p, i) => {
                  const newsIndex = n.items.indexOf(p);
                  return (
                    <motion.article
                      key={p.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="academic-card overflow-hidden group"
                    >
                      <Link
                        href={`/${locale}/news/${newsIndex + 2}`}
                        className="block cursor-pointer"
                      >
                        <div
                          className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${images[(newsIndex + 1) % images.length]}')`,
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
                      </Link>
                    </motion.article>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
