"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FileText, Bell } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <section className="min-h-screen pt-32 pb-24 px-[5%] lg:px-[6%]">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
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

      {/* Coming Soon */}
      <motion.div
        className="max-w-2xl mx-auto text-center py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        <div
          className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-2xl"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        >
          <FileText className="w-8 h-8 text-accent" />
        </div>

        <p className="text-lg text-text-secondary font-body leading-relaxed mb-10 max-w-md mx-auto">
          {t("coming_soon")}
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg font-semibold text-sm group"
          style={{
            backgroundColor: "rgba(56,189,248,0.1)",
            color: "#F4F4F5",
            border: "1px solid rgba(56,189,248,0.35)",
          }}
        >
          <Bell className="w-4 h-4 text-accent" />
          {t("notify_cta")}
        </Link>
      </motion.div>
    </section>
  );
}
