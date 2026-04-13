"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Property } from "@/lib/types";
import { fadeUp, stagger, viewport } from "@/lib/animations";

export default function PropertySpecs({
  locale,
  dict,
  property,
}: {
  locale: Locale;
  dict: Dictionary["propertyDetail"];
  property: Property;
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const specs = [
    { label: dict.bedrooms, value: property.bedrooms },
    { label: dict.bathrooms, value: property.bathrooms },
    { label: dict.livingArea, value: `${property.area}m²` },
    ...(property.lotSize ? [{ label: dict.lotSize, value: `${property.lotSize}m²` }] : []),
    { label: dict.yearBuilt, value: property.yearBuilt },
    ...(property.floors ? [{ label: dict.floors, value: property.floors }] : []),
    ...(property.garage ? [{ label: dict.garage, value: `${property.garage} ${isRTL ? "سيارات" : "cars"}` }] : []),
    ...(property.hasPool ? [{ label: dict.pool, value: dict.yes }] : []),
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="section-label">{dict.specs}</span>
            </div>
            <h2 className={fontHeading}>{dict.specs}</h2>
          </motion.div>

          {/* Specs grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {specs.map((spec, i) => (
              <div key={i} className="text-center md:text-start">
                <div className="text-gold text-xs mb-2">◆</div>
                <div className="text-2xl font-light mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {spec.value}
                </div>
                <div className="text-sm text-text-secondary uppercase tracking-wider">
                  {spec.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeUp}>
            <h3 className={`text-lg mb-6 ${fontHeading}`}>{dict.features}</h3>
            <div className="flex flex-wrap gap-3">
              {property.features.map((feature, i) => (
                <span
                  key={i}
                  className="text-sm text-text-body px-4 py-2 bg-white border border-border"
                >
                  {feature[locale]}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
