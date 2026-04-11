"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, HelpCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const f = dict.pages.faq;
  const isRTL = locale === "ar";

  const [activeCat, setActiveCat] = useState<string>(f.categories[0].key);
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    const next = new Set(openItems);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setOpenItems(next);
  };

  // If searching, show all items that match across categories.
  // Otherwise, show only active category items.
  const searchLower = search.trim().toLowerCase();
  const isSearching = searchLower.length > 0;

  const visibleItems = isSearching
    ? f.categories.flatMap((c) =>
        c.items
          .filter(
            (item) =>
              item.q.toLowerCase().includes(searchLower) ||
              item.a.toLowerCase().includes(searchLower)
          )
          .map((item) => ({ ...item, catKey: c.key, catLabel: c.label }))
      )
    : (() => {
        const cat = f.categories.find((c) => c.key === activeCat);
        if (!cat) return [];
        return cat.items.map((item) => ({
          ...item,
          catKey: cat.key,
          catLabel: cat.label,
        }));
      })();

  const h2Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-tight";
  const qClass = isRTL
    ? "font-arabic-display text-base md:text-lg font-bold text-[var(--color-navy)] leading-[1.6]"
    : "font-serif text-base md:text-lg font-bold text-[var(--color-navy)] leading-snug";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={f.hero.label}
        title={f.hero.title}
        subtitle={f.hero.subtitle}
        breadcrumbs={[{ label: f.hero.breadcrumb }]}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Search */}
          <div className="mb-10">
            <div className="flex items-center gap-3 bg-[var(--color-cream)] border border-[var(--color-border)] px-5 py-4">
              <Search className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={f.searchPlaceholder}
                className="flex-1 bg-transparent focus:outline-none text-sm text-[var(--color-ink)]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Category tabs (hidden when searching) */}
          {!isSearching && (
            <div className="flex flex-wrap gap-2 mb-10">
              {f.categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setActiveCat(c.key);
                    setOpenItems(new Set());
                  }}
                  className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                    activeCat === c.key
                      ? "bg-[var(--color-navy)] text-white"
                      : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[var(--color-navy)] hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {/* Accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSearching ? `search-${searchLower}` : activeCat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {visibleItems.length === 0 ? (
                <div className="text-center py-20">
                  <HelpCircle className="w-12 h-12 text-[var(--color-ink-soft)] mx-auto mb-4 opacity-40" />
                  <p className="text-[var(--color-ink-soft)]">{f.noResults}</p>
                </div>
              ) : (
                visibleItems.map((item, i) => {
                  const itemKey = `${item.catKey}-${i}`;
                  const isOpen = openItems.has(itemKey);
                  return (
                    <div
                      key={itemKey}
                      className="border border-[var(--color-border)] bg-white overflow-hidden hover:border-[var(--color-gold)] transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="w-full flex items-center gap-4 p-5 md:p-6 text-start"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className={qClass}>{item.q}</h3>
                          {isSearching && (
                            <p className="text-[10px] tracking-wider text-[var(--color-gold)] mt-1">
                              {item.catLabel}
                            </p>
                          )}
                        </div>
                        <div
                          className={`shrink-0 w-9 h-9 flex items-center justify-center transition-colors ${
                            isOpen
                              ? "bg-[var(--color-gold)] text-white"
                              : "bg-[var(--color-cream)] text-[var(--color-ink-soft)]"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 md:px-6 pb-6 pt-1">
                              <div className="h-px bg-[var(--color-border)] mb-4" />
                              <p
                                className={`text-[var(--color-ink-soft)] ${
                                  isRTL
                                    ? "leading-[2]"
                                    : "leading-relaxed"
                                }`}
                              >
                                {item.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {/* Contact CTA */}
          <div className="mt-20 p-8 md:p-12 bg-[var(--color-navy)] text-white text-center relative overflow-hidden">
            <div
              className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: "#C19A4B" }}
            />
            <div className="relative">
              <h2 className={`${h2Class} !text-white mb-3`}>
                {f.contactCta.title}
              </h2>
              <p
                className={`text-white/70 max-w-xl mx-auto mb-8 ${
                  isRTL ? "leading-[2]" : "leading-relaxed"
                }`}
              >
                {f.contactCta.description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="btn-gold !bg-[var(--color-gold)] !text-white !border-[var(--color-gold)] inline-flex"
              >
                {f.contactCta.button}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
