"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "23+", labelKey: "stat_pages" },
  { value: "5", labelKey: "stat_roles" },
  { value: "3", labelKey: "stat_ai" },
] as const;

export default function ShowcaseSpotlight() {
  const t = useTranslations("showcase_spotlight");

  return (
    <section className="relative w-full py-24 lg:py-32 px-[5%] lg:px-[6%] overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(56,189,248,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EXPO_OUT }}
          >
            {/* Section label */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EXPO_OUT }}
            >
              <span
                className="inline-block font-body text-[11px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(56,189,248,0.7)" }}
              >
                {t("label")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-heading font-bold gradient-text"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EXPO_OUT }}
            >
              {t("title")}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="mt-3 font-body font-medium"
              style={{
                fontSize: "clamp(14px, 2vw, 17px)",
                color: "rgba(56,189,248,0.85)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
            >
              {t("tagline")}
            </motion.p>

            {/* Description */}
            <motion.p
              className="mt-5 font-body max-w-[480px]"
              style={{
                fontSize: "clamp(14px, 2vw, 16px)",
                lineHeight: 1.75,
                color: "rgba(180,200,220,0.7)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: EXPO_OUT }}
            >
              {t("desc")}
            </motion.p>

            {/* Stat badges */}
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EXPO_OUT }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.labelKey}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.2)",
                  }}
                >
                  <span
                    className="font-heading font-bold text-sm"
                    style={{ color: "#38BDF8" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-body text-xs"
                    style={{ color: "rgba(56,189,248,0.7)" }}
                  >
                    {t(stat.labelKey)}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: EXPO_OUT }}
            >
              {/* Primary CTA — static path, use <a> */}
              <a href="/demos/school" className="block w-full sm:w-auto">
                <motion.span
                  className="relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-sm cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: "rgba(56,189,248,0.1)",
                    color: "#F4F4F5",
                    border: "1px solid rgba(56,189,248,0.35)",
                    boxShadow: "0 0 20px rgba(56,189,248,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    backgroundColor: "rgba(56,189,248,0.15)",
                    borderColor: "rgba(56,189,248,0.55)",
                    boxShadow:
                      "0 0 36px rgba(56,189,248,0.2), 0 8px 24px rgba(0,0,0,0.35)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: EXPO_OUT }}
                >
                  {t("cta_demo")}
                  <ExternalLink size={14} style={{ color: "rgba(56,189,248,0.9)" }} />
                </motion.span>
              </a>

              {/* Secondary CTA */}
              <Link href="/showcase/websites" className="block w-full sm:w-auto">
                <motion.span
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-lg font-medium text-sm cursor-pointer"
                  style={{
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    color: "#F4F4F5",
                    borderColor: "rgba(255,255,255,0.2)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: EXPO_OUT }}
                >
                  {t("cta_details")}
                  <ArrowRight size={14} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: Laptop Mockup ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EXPO_OUT }}
          >
            <div className="relative">
              {/* Laptop body */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 25px 50px rgba(0,0,0,0.5), 0 0 80px rgba(56,189,248,0.06)",
                }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    background: "rgba(17,17,19,0.95)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>

                  {/* URL bar */}
                  <div
                    className="flex-1 flex items-center justify-center px-4 py-1.5 rounded-md"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="font-body text-[11px] tracking-wide"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      dateksys.com/demos/school
                    </span>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-[16/10] bg-[#09090B]">
                  <Image
                    src="/showcase/school-demo.png"
                    alt="Al-Nakhla Academy Demo"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Laptop base */}
              <div
                className="mx-auto h-3 rounded-b-xl"
                style={{
                  width: "70%",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  borderLeft: "1px solid rgba(255,255,255,0.04)",
                  borderRight: "1px solid rgba(255,255,255,0.04)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              />

              {/* Live badge */}
              <motion.div
                className="absolute top-6 right-4 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: EXPO_OUT }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(34,197,94,0.3)",
                  }}
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span
                    className="font-body text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: "rgba(34,197,94,0.9)" }}
                  >
                    Live
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
