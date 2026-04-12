"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

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
              transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
            >
              {t("desc")}
            </motion.p>

            {/* Single CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: EXPO_OUT }}
            >
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/demos/school" className="inline-block">
                <motion.span
                  className="relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg font-semibold text-sm cursor-pointer overflow-hidden"
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
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
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
