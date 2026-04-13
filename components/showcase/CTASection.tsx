"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fadeUp, stagger } from "@/lib/showcase-animations";

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations("showcase");
  const isRTL = locale === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 lg:py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse 50% 50% at center, rgba(139,123,244,0.12), transparent 70%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#F0EDE6" }}
        >
          {t("cta_title_1")}{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #8B7BF4, #A78BFA, #C4B5FD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("cta_title_2")}
          </span>{" "}
          {t("cta_title_3")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(240,237,230,0.5)", fontFamily: "var(--font-dm-sans)" }}
        >
          {t("cta_subtitle")}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm group transition-colors"
            style={{
              background: "#8B7BF4",
              color: "#F0EDE6",
            }}
          >
            {t("cta_start")}
            <Arrow className={`w-4 h-4 transition-transform ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-sm transition-colors"
            style={{
              color: "rgba(240,237,230,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {t("cta_services")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
