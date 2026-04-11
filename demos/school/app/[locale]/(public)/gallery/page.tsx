"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const imageUrls = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80",
  "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
];

export default function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const g = dict.pages.gallery;
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { key: "all", label: g.categories.all },
    { key: "campus", label: g.categories.campus },
    { key: "academics", label: g.categories.academics },
    { key: "sports", label: g.categories.sports },
    { key: "arts", label: g.categories.arts },
    { key: "events", label: g.categories.events },
  ];

  const filtered =
    filter === "all"
      ? g.items
      : g.items.filter((i) => i.category === filter);

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={g.hero.label}
        title={g.hero.title}
        subtitle={g.hero.subtitle}
        breadcrumbs={[{ label: g.hero.breadcrumb }]}
      />

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                  filter === c.key
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[var(--color-navy)] hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => {
              const srcIdx = g.items.indexOf(img) % imageUrls.length;
              return (
                <motion.div
                  key={img.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
                  className={`group relative overflow-hidden cursor-pointer ${
                    i % 5 === 0 ? "md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i % 5 === 0 ? 480 : 240 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${imageUrls[srcIdx]}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 start-0 end-0 p-5 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] font-bold tracking-widest text-[var(--color-gold-light)]">
                      {
                        categories.find((c) => c.key === img.category)
                          ?.label
                      }
                    </span>
                    <h3
                      className={`text-lg font-bold mt-1 ${
                        locale === "ar" ? "font-arabic-display" : "font-serif"
                      }`}
                    >
                      {img.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
