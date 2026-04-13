"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, CalendarCheck, Building2 } from "lucide-react";
import type { Locale } from "@/i18n/config";

type StatItem = {
  value: string;
  label: string;
};

const statIcons = [Users, UserCheck, CalendarCheck, Building2];

export default function StatsStrip({
  locale,
  stats,
}: {
  locale: Locale;
  stats: StatItem[];
}) {
  const isRTL = locale === "ar";

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = statIcons[i] || Users;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center relative"
              >
                {/* Teal accent line */}
                <div className="w-10 h-0.5 bg-teal mx-auto mb-4 rounded-full" />

                {/* Icon */}
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-teal" />
                </div>

                <AnimatedValue value={stat.value} isRTL={isRTL} />
                <p className="text-sm text-ink-soft mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AnimatedValue({ value, isRTL }: { value: string; isRTL: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");

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

  useEffect(() => {
    if (!visible) return;

    // Extract numeric part and suffix (e.g. "15,000+" -> num=15000, suffix="+", prefix="")
    const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, "");
    const suffix = match[3];
    const target = parseInt(numStr, 10);

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500; // ms
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      const formatted = current.toLocaleString();
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [visible, value]);

  return (
    <div
      ref={ref}
      className={`text-3xl lg:text-4xl font-bold text-teal ${
        isRTL ? "font-arabic-display" : "font-heading"
      }`}
    >
      {visible ? displayValue : "\u00A0"}
    </div>
  );
}
