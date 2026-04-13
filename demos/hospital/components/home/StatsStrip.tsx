"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeUp, stagger, viewport } from "@/lib/animations";

export default function StatsStrip({
  locale,
  stats,
}: {
  locale: Locale;
  stats: Dictionary["home"]["stats"];
}) {
  const isRTL = locale === "ar";

  const items = [
    { value: 250, suffix: "+", label: stats.specialists },
    { value: 45, suffix: "", label: stats.departments },
    { value: 30, suffix: "+", label: stats.yearsLabel },
    { value: 98, suffix: "%", label: stats.satisfaction },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center p-6 rounded-2xl bg-base border border-border/50"
            >
              <div
                className={`text-3xl lg:text-4xl font-bold text-primary mb-1 ${
                  isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
                }`}
              >
                <AnimatedCounter
                  target={item.value}
                  suffix={item.suffix}
                  duration={2}
                />
              </div>
              <div className="text-sm text-text-secondary font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
