"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";

type StatItem = {
  value: string;
  label: string;
};

export default function StatsStrip({
  locale,
  stats,
}: {
  locale: Locale;
  stats: StatItem[];
}) {
  const isRTL = locale === "ar";

  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedValue value={stat.value} isRTL={isRTL} />
              <p className="text-sm text-ink-soft mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedValue({ value, isRTL }: { value: string; isRTL: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-3xl lg:text-4xl font-bold text-teal ${
        isRTL ? "font-arabic-display" : "font-heading"
      }`}
    >
      {visible ? value : "\u00A0"}
    </div>
  );
}
