"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

// ============================================
// Stats — أرقام حقيقية (وعود وحقائق، مش إحصائيات وهمية)
// ============================================
const stats = [
  { key: "uptime",     target: 99.9, suffix: "%",  isDecimal: true },
  { key: "support",    target: 24,   suffix: "/7",  isDecimal: false },
  { key: "experience", target: 12,   suffix: "+",   isDecimal: false },
  { key: "response",   target: 2,    suffix: "hr",  isDecimal: false },
];

// ── Animated Counter Hook ──
function useAnimatedCounter(target: number, isInView: boolean, isDecimal = false) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(isDecimal ? v.toFixed(1) : Math.round(v).toLocaleString());
    });
    return unsubscribe;
  }, [springValue, isDecimal]);

  return display;
}

// ── Single Stat Item ──
function StatItem({
  statKey,
  target,
  suffix,
  isDecimal = false,
  index,
}: {
  statKey: string;
  target: number;
  suffix: string;
  isDecimal?: boolean;
  index: number;
}) {
  const t = useTranslations("stats");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const display = useAnimatedCounter(target, isInView, isDecimal);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center px-6 py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Number */}
      <span
        className="text-4xl md:text-5xl font-heading font-bold text-text-primary tabular-nums"
        style={{ letterSpacing: "var(--tracking-tight)" }}
      >
        {display}
        <span className="text-accent">{suffix}</span>
      </span>

      {/* Label */}
      <span className="mt-2 text-sm text-text-muted font-body">
        {t(statKey)}
      </span>
    </motion.div>
  );
}

// ── Stats Bar Section ──
export default function StatsBar() {
  return (
    <section className="relative py-8 lg:py-12">
      <div className="w-full px-[5%] lg:px-[6%]">
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-accent/[0.04] rounded-full blur-[80px]" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.key} className="relative">
                <StatItem
                  statKey={stat.key}
                  target={stat.target}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  index={index}
                />
                {/* Divider between items */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}