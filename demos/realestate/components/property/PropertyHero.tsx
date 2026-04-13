"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Calendar, Car, Waves } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Property } from "@/lib/types";
import { SILK } from "@/lib/animations";
import { formatPrice } from "@/lib/properties";

export default function PropertyHero({
  locale,
  property,
}: {
  locale: Locale;
  property: Property;
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 150]);

  const specs = [
    { icon: Bed, value: property.bedrooms, label: isRTL ? "غرف" : "Beds" },
    { icon: Bath, value: property.bathrooms, label: isRTL ? "حمامات" : "Baths" },
    { icon: Maximize, value: `${property.area}m²`, label: isRTL ? "المساحة" : "Area" },
    ...(property.hasPool ? [{ icon: Waves, value: "✓", label: isRTL ? "مسبح" : "Pool" }] : []),
    ...(property.garage ? [{ icon: Car, value: property.garage, label: isRTL ? "مواقف" : "Garage" }] : []),
    { icon: Calendar, value: property.yearBuilt, label: isRTL ? "البناء" : "Built" },
  ];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 -top-20">
        <div className="absolute inset-0 bg-charcoal" />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-12 max-w-7xl mx-auto">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: SILK }}
          className="mb-8"
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl text-white font-normal mb-3 ${fontHeading}`}>
            {property.title[locale]}
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <MapPin className="w-4 h-4 text-gold" />
            {property.location[locale]}
          </div>
        </motion.div>

        {/* Price */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: SILK }}
          className="text-gold text-2xl md:text-3xl font-light mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {formatPrice(property.price)}
        </motion.p>

        {/* Quick specs bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: SILK }}
          className="flex flex-wrap gap-6 py-6 border-t border-white/10"
        >
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
              <spec.icon className="w-4 h-4 text-gold/60" />
              <span className="font-medium text-white">{spec.value}</span>
              <span>{spec.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
