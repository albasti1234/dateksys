"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Eye, Heart } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Property } from "@/lib/types";
import { fadeUp } from "@/lib/animations";
import { formatPrice } from "@/lib/properties";

export default function PropertyCard({
  property,
  locale,
  index,
}: {
  property: Property;
  locale: Locale;
  index: number;
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const typeLabels: Record<string, { ar: string; en: string }> = {
    villa: { ar: "فيلا", en: "Villa" },
    apartment: { ar: "شقة", en: "Apartment" },
    penthouse: { ar: "بنتهاوس", en: "Penthouse" },
    land: { ar: "أرض", en: "Land" },
  };

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`${prefix}/properties/${property.slug}`}
        className="group block"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-warm mb-5">
          <Image
            src={`/demos/realestate/images/properties/${property.slug}.webp`}
            alt={property.title[locale]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-4 start-4 z-10 flex gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium bg-gold text-white px-3 py-1.5">
              {isRTL ? "للبيع" : "For Sale"}
            </span>
            {property.panoramas.length > 0 && (
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium bg-white/90 text-charcoal px-3 py-1.5">
                360°
              </span>
            )}
          </div>

          {/* Favorite */}
          <button
            className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-4 h-4 text-charcoal" />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
            <span className="flex items-center gap-2 text-white text-[11px] tracking-[0.3em] uppercase">
              <Eye className="w-4 h-4" />
              {isRTL ? "عرض" : "View"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          {/* Type + Location */}
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase mb-1.5">
            {typeLabels[property.type]?.[locale] || property.type}
          </p>

          <h3 className={`text-lg font-normal mb-1 group-hover:text-gold transition-colors ${fontHeading}`}>
            {property.title[locale]}
          </h3>

          <p className="text-sm text-text-secondary mb-4">
            {property.location[locale]}
          </p>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-gold/60" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-gold/60" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-gold/60" />
              {property.area}m²
            </span>
          </div>

          {/* Price */}
          <p className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>
            {formatPrice(property.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
