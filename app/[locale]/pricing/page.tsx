"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface PricingTier {
  name: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TierCard({ tier, index, popularLabel }: { tier: PricingTier; index: number; popularLabel: string }) {
  const isPopular = tier.popular;

  return (
    <motion.div variants={cardVariant} className="relative h-full">
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span
            className="px-4 py-1.5 text-[11px] font-heading font-bold tracking-widest uppercase rounded-full"
            style={{
              background: "rgba(56,189,248,0.15)",
              border: "1px solid rgba(56,189,248,0.3)",
              color: "#38BDF8",
            }}
          >
            {popularLabel}
          </span>
        </div>
      )}

      <div
        className="relative h-full flex flex-col rounded-2xl p-8 lg:p-9 overflow-hidden transition-all duration-500"
        style={{
          background: "var(--color-surface)",
          border: isPopular
            ? "1px solid rgba(56,189,248,0.25)"
            : "1px solid var(--color-border)",
          boxShadow: isPopular
            ? "0 0 40px rgba(56,189,248,0.08), 0 20px 60px -20px rgba(0,0,0,0.5)"
            : "none",
        }}
      >
        {/* Glow for popular */}
        {isPopular && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Tier name */}
        <div className="relative z-10 mb-6">
          <span
            className="text-xs font-heading font-bold tracking-[0.2em] uppercase"
            style={{ color: isPopular ? "#38BDF8" : "var(--color-text-muted)" }}
          >
            0{index + 1}
          </span>
          <h3 className="text-2xl font-heading font-bold text-text-primary mt-2">
            {tier.name}
          </h3>
          <p className="text-sm text-text-muted font-body mt-2 leading-relaxed">
            {tier.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background: isPopular
              ? "linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)"
              : "var(--color-border)",
          }}
        />

        {/* Features */}
        <ul className="relative z-10 space-y-4 mb-8 flex-1">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8l3.5 3.5L13 5"
                  stroke={isPopular ? "#38BDF8" : "rgba(56,189,248,0.5)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-text-secondary font-body leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/contact" className="relative z-10">
          <motion.button
            className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${
              isPopular
                ? "text-[var(--color-base)]"
                : "text-text-primary"
            }`}
            style={{
              background: isPopular
                ? "#38BDF8"
                : "var(--color-surface-2)",
              border: isPopular
                ? "none"
                : "1px solid var(--color-border)",
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: isPopular
                ? "0 0 30px rgba(56,189,248,0.3)"
                : "0 0 20px rgba(56,189,248,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {tier.cta}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tiers = t.raw("tiers") as PricingTier[];

  return (
    <section className="min-h-screen pt-32 pb-24 px-[5%] lg:px-[6%]">
      {/* Background */}
      <div className="fixed top-1/4 left-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-[rgba(129,140,248,0.03)] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="mb-16 lg:mb-20 text-center max-w-2xl mx-auto"
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
        <p className="text-base text-text-secondary font-body leading-relaxed">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {tiers.map((tier, i) => (
          <TierCard key={i} tier={tier} index={i} popularLabel={t("most_popular")} />
        ))}
      </motion.div>

      {/* Bottom note */}
      <motion.p
        className="text-center text-sm text-text-muted font-body mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {t("cta")}
      </motion.p>
    </section>
  );
}