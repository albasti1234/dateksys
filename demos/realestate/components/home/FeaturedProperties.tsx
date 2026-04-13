"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Bed, Maximize, Eye } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Property } from "@/lib/types";
import { fadeUp, imageReveal, stagger, viewport, SILK } from "@/lib/animations";
import { formatPrice } from "@/lib/properties";

export default function FeaturedProperties({
  locale,
  dict,
  properties,
}: {
  locale: Locale;
  dict: Dictionary["home"]["featured"];
  properties: Property[];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";
  const featured = properties.slice(0, 3);

  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="section-label">{dict.label}</span>
          </div>
          <h2 className={`${fontHeading}`}>
            {dict.title}{" "}
            <em className="italic text-gold">{dict.titleAccent}</em>
          </h2>
        </motion.div>

        {/* Properties — alternating layout */}
        <div className="space-y-32 lg:space-y-40">
          {featured.map((property, i) => {
            const isReversed = i % 2 !== 0;

            if (i === 2) {
              // Third property — full-width cinematic strip
              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.8, ease: SILK }}
                >
                  <Link href={`${prefix}/properties/${property.slug}`} className="block group relative">
                    <div className="relative aspect-[21/9] overflow-hidden bg-charcoal">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                      <Image
                        src={`/demos/realestate/images/properties/${property.slug}.webp`}
                        alt={property.title[locale]}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-16">
                        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-2">
                          {dict.forSale}
                        </p>
                        <h3 className={`text-2xl lg:text-4xl text-white font-normal mb-2 ${fontHeading}`}>
                          {property.title[locale]}
                        </h3>
                        <p className="text-white/50 text-sm mb-4">{property.location[locale]}</p>
                        <p className="text-gold text-xl lg:text-2xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
                          {formatPrice(property.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={property.id}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className={`grid lg:grid-cols-5 gap-8 lg:gap-16 items-center ${
                  isReversed ? "direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={imageReveal}
                  className={`lg:col-span-3 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <Link href={`${prefix}/properties/${property.slug}`} className="block group relative">
                    <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-light">
                      <Image
                        src={`/demos/realestate/images/properties/${property.slug}.webp`}
                        alt={property.title[locale]}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                        <span className="flex items-center gap-2 text-white text-[11px] tracking-[0.3em] uppercase">
                          <Eye className="w-4 h-4" />
                          {dict.viewProperty}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Text */}
                <motion.div
                  variants={fadeUp}
                  className={`lg:col-span-2 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">
                    {dict.forSale}
                  </p>
                  <div className="w-8 h-px bg-gold/30 mb-6" />
                  <h3 className={`text-2xl lg:text-3xl font-normal mb-2 ${fontHeading}`}>
                    {property.title[locale]}
                  </h3>
                  <p className="text-text-secondary text-sm mb-6">{property.location[locale]}</p>
                  <p className="text-text-body text-sm leading-relaxed mb-8 font-light">
                    {property.description[locale]}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-6 mb-8 text-sm text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-gold" />
                      {property.bedrooms} {dict.beds}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-gold" />
                      {property.area} {dict.sqm}
                    </span>
                    {property.hasPool && (
                      <span className="text-gold text-xs">◆ Pool</span>
                    )}
                  </div>

                  {/* Price */}
                  <p className="text-xl mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                    {formatPrice(property.price)}
                  </p>

                  {/* Link */}
                  <Link
                    href={`${prefix}/properties/${property.slug}`}
                    className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.25em] uppercase font-medium hover:gap-3 transition-all"
                  >
                    {dict.viewProperty}
                    <Arrow className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
