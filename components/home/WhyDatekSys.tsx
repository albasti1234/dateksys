"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlowCard from "@/components/ui/GlowCard";

// ── Icons for each value prop ──
const valueIcons: React.JSX.Element[] = [
  // Field-Tested Expertise — hands/wrench
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // End-to-End — arrows
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Certified — badge
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M12 15l-3.5 2 1-3.9L6 10.3l4-.3L12 6l1.9 4 4 .3-3.5 2.8 1 3.9z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="10" />
  </svg>,
  // Built for Uptime — shield
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

interface ValueItem {
  title: string;
  description: string;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function WhyDatekSys() {
  const t = useTranslations("why_us");
  const items = t.raw("items") as ValueItem[];

  return (
    <section className="section-wrapper overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[rgba(129,140,248,0.03)] rounded-full blur-[120px]" />

      <div className="w-full">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label mb-4">{t("label")}</p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            <span className="gradient-text">{t("title")}</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={cardVariant}>
              <GlowCard className="flex flex-col p-7 lg:p-9 group cursor-default h-full">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-accent transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.15)",
                  }}
                >
                  {valueIcons[i] || valueIcons[0]}
                </div>

                {/* Number tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-heading font-bold tracking-[0.3em] uppercase"
                    style={{ color: "rgba(56,189,248,0.35)" }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(56,189,248,0.08)" }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-heading font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-muted leading-relaxed font-body">
                  {item.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}