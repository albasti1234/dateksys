"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function CTABanner() {
  const t = useTranslations("cta_banner");

  return (
    <section className="px-[5%] lg:px-[6%] pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[24px] px-[5%] py-[72px] text-center"
      >
        {/* Top radial glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 60%)",
          }}
        />

        {/* ✅ Label — مترجم */}
        <div className="flex items-center justify-center gap-3 mb-5 relative z-10">
          <div className="w-7 h-[2px] bg-[var(--color-accent)] rounded-full" />
          <span className="section-label">{t("label")}</span>
          <div className="w-7 h-[2px] bg-[var(--color-accent)] rounded-full" />
        </div>

        {/* Headline */}
        <h2 className="relative z-10 text-[clamp(32px,5vw,56px)] font-heading font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-text-primary)] mb-5 whitespace-pre-line">
          {t("title")}
        </h2>

        {/* Sub */}
        <p className="relative z-10 text-[var(--color-text-secondary)] text-[16px] md:text-[18px] leading-[1.65] max-w-[460px] mx-auto mb-10">
          {t("description")}
        </p>

        {/* ✅ CTAs — مترجمين بالكامل */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            {t("cta_primary")}
          </Link>
          <Link href="/services" className="btn-ghost">
            {t("cta_secondary")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}