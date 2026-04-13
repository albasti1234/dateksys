"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { properties } from "@/lib/properties";
import { stagger, fadeUp, viewport, SILK } from "@/lib/animations";
import FilterBar from "@/components/listing/FilterBar";
import PropertyCard from "@/components/listing/PropertyCard";

export default function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [activeType, setActiveType] = useState("all");

  const filtered = activeType === "all"
    ? properties
    : properties.filter((p) => p.type === activeType);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SILK }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{dict.properties.heroLabel}</span>
            </div>
            <h1 className={`text-text-on-dark mb-4 ${fontHeading}`}>
              {dict.properties.heroTitle}
            </h1>
            <p className="text-text-on-dark-muted text-lg max-w-2xl font-light">
              {dict.properties.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Listing */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          {/* Filters */}
          <div className="mb-12">
            <FilterBar
              locale={locale}
              dict={dict.properties}
              activeType={activeType}
              onTypeChange={setActiveType}
            />
          </div>

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((property, i) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard
                    property={property}
                    locale={locale}
                    index={i}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="text-text-muted text-lg">{dict.common.noResults}</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
