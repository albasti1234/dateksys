"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

// ── Step Icons (inline SVG) ──
const stepIcons: Record<string, React.JSX.Element> = {
  "01": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "05": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "٠١": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  "٠٢": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "٠٣": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "٠٤": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "٠٥": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

interface Step {
  number: string;
  title: string;
  description: string;
}

function StepCard({ step, index, total }: { step: Step; index: number; total: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 lg:gap-8"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Timeline Line ── */}
      <div className="flex flex-col items-center shrink-0">
        {/* Node */}
        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-accent"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
          {stepIcons[step.number] || (
            <span className="text-sm font-heading font-bold">{step.number}</span>
          )}

          {/* Pulse on first step */}
          {index === 0 && (
            <div
              className="absolute inset-0 rounded-xl animate-ping"
              style={{
                background: "rgba(56,189,248,0.1)",
                animationDuration: "3s",
              }}
            />
          )}
        </div>

        {/* Connector line */}
        {index < total - 1 && (
          <motion.div
            className="w-px flex-1 min-h-[40px]"
            style={{ background: "rgba(56,189,248,0.12)" }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
          />
        )}
      </div>

      {/* ── Content ── */}
      <div className="pb-12 lg:pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-heading font-bold tracking-widest"
            style={{ color: "rgba(56,189,248,0.5)" }}
          >
            {step.number}
          </span>
        </div>
        <h3 className="text-lg lg:text-xl font-heading font-semibold text-text-primary mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed font-body max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="section-wrapper overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />

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
          <p className="mt-5 text-base text-text-secondary max-w-xl leading-relaxed font-body font-light">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-2xl mx-auto lg:mx-0 lg:ms-[8%]">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              total={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}