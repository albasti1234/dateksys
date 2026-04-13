"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Property } from "@/lib/types";
import { stagger, viewport, SILK } from "@/lib/animations";
import PropertyCard from "@/components/listing/PropertyCard";

export default function SimilarProperties({
  locale,
  dict,
  properties,
}: {
  locale: Locale;
  dict: Dictionary["propertyDetail"];
  properties: Property[];
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  if (properties.length === 0) return null;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="section-label">{dict.similarProperties}</span>
          </div>
          <h2 className={fontHeading}>{dict.similarProperties}</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-3 gap-8"
        >
          {properties.slice(0, 3).map((property, i) => (
            <PropertyCard key={property.id} property={property} locale={locale} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
