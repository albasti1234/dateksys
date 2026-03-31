"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function CareersPage() {
  const t = useTranslations("careers");

  return (
    <section className="min-h-screen pt-32 pb-24 px-[5%] lg:px-[6%]">
      {/* Background */}
      <div className="fixed top-1/3 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-label mb-4">{t("label")}</p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          <span className="gradient-text">{t("title")}</span>
        </h1>
        <p className="text-base text-text-secondary font-body leading-relaxed max-w-xl">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* No openings card */}
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="rounded-2xl p-8 lg:p-12 text-center"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.15)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-7 h-7 text-accent"
            >
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="7" r="4" />
              <path
                d="M19 8v6M22 11h-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-text-secondary font-body mb-2 text-lg">
            {t("no_openings")}
          </p>
        </div>
      </motion.div>

      {/* Spontaneous application */}
      <motion.div
        className="max-w-3xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <div
          className="rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          style={{
            background: "var(--color-surface)",
            border: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
              {t("spontaneous")}
            </h3>
            <p className="text-sm text-text-muted font-body leading-relaxed mb-6 max-w-lg">
              {t("spontaneous_desc")}
            </p>
            <Link href="/contact">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("cta")} →
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Why join us */}
      <motion.div
        className="max-w-3xl mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
          {t("why_join")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
            <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>,
            <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a4 4 0 0 0-8 0v2" strokeLinecap="round" />
            </svg>,
          ].map((icon, i) => {
            const items = t.raw("why_items") as { title: string; desc: string }[];
            const item = items[i];
            return (
              <motion.div
                key={i}
                className="rounded-xl p-6"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-accent"
                  style={{
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.15)",
                  }}
                >
                  {icon}
                </div>
                <h4 className="font-heading font-semibold text-text-primary text-sm mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-text-muted font-body leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}