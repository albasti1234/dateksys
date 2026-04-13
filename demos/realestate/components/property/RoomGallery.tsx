"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, View } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport, SILK } from "@/lib/animations";

interface RoomGalleryData {
  id: string;
  name: { ar: string; en: string };
  images: string[];
  hasPanorama?: boolean;
}

export default function RoomGallery({
  locale,
  rooms,
  onViewPanorama,
}: {
  locale: Locale;
  rooms: RoomGalleryData[];
  onViewPanorama?: (roomId: string) => void;
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">
              {isRTL ? "المعرض" : "GALLERY"}
            </span>
          </div>
          <h2 className={fontHeading}>
            {isRTL ? "غرفة " : "Room by "}
            <em className="italic text-gold">{isRTL ? "بغرفة" : "Room"}</em>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {rooms.map((room) => (
            <RoomRow
              key={room.id}
              room={room}
              locale={locale}
              fontHeading={fontHeading}
              onViewPanorama={onViewPanorama}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomRow({
  room,
  locale,
  fontHeading,
  onViewPanorama,
}: {
  room: RoomGalleryData;
  locale: Locale;
  fontHeading: string;
  onViewPanorama?: (roomId: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === "ar";

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: isRTL ? -amount : amount, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: SILK }}
    >
      {/* Room header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-gold/30" />
          <h3 className={`text-lg ${fontHeading}`}>{room.name[locale]}</h3>
        </div>
        <div className="flex items-center gap-2">
          {room.hasPanorama && (
            <button
              onClick={() => onViewPanorama?.(room.id)}
              className="flex items-center gap-2 text-gold text-[11px] tracking-wider uppercase font-medium hover:text-gold-dark transition-colors"
            >
              <View className="w-4 h-4" />
              {isRTL ? "جولة ٣٦٠°" : "View 360°"}
            </button>
          )}
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {room.images.length > 0 ? (
          room.images.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[350px] aspect-[4/3] overflow-hidden bg-surface-warm group cursor-pointer"
            >
              <Image
                src={img}
                alt={`${room.name[locale]} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="350px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))
        ) : (
          // Placeholder cards when no images
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[350px] aspect-[4/3] bg-surface-warm border border-border"
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
