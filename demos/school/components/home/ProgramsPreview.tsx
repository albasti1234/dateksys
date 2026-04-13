"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
  fadeUp,
  fadeUpSubtle,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

// ============================================
// Programs Preview — Academic stages, bilingual
// ============================================

type ProgramsDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: readonly {
    stage: string;
    grades: string;
    description: string;
  }[];
  cta: string;
};

const stageImages = [
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
];

const stageColors = ["#4A90E2", "#2D8659", "#C19A4B", "#0F2C5C"];

export default function ProgramsPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ProgramsDict;
}) {
  const isRTL = locale === "ar";
  const titleClass = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-tight";
  const stageClass = isRTL
    ? "font-arabic-display text-2xl lg:text-3xl font-bold mb-2 leading-[1.4]"
    : "font-serif text-2xl lg:text-3xl font-bold mb-2";

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex items-end justify-between flex-wrap gap-6 mb-16"
        >
          <div className="max-w-xl">
            <motion.p variants={fadeUpSubtle} className="section-label mb-4">
              {dict.eyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className={titleClass}>
              {dict.title}
            </motion.h2>
            <motion.p variants={fadeUpSubtle} className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">
              {dict.subtitle}
            </motion.p>
          </div>
          <motion.div variants={fadeUpSubtle}>
            <Link href={`/${locale}/programs`} className="btn-outline">
              {dict.cta}
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Programs grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {dict.items.map((p, i) => (
            <motion.div
              key={p.stage}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden cursor-pointer bg-white"
            >
              {/* Image */}
              <div
                className="h-[280px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${stageImages[i]}')` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Top badge */}
              <div className="absolute top-5 start-5 flex items-center gap-2">
                <div
                  className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-white"
                  style={{ background: stageColors[i] }}
                >
                  {p.grades}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 start-0 end-0 p-6 text-white">
                <h3 className={stageClass}>{p.stage}</h3>
                <p className="text-sm text-white/85 leading-relaxed max-w-md">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
