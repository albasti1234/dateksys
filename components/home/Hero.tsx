"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const techBrands = ["Cisco", "Ubiquiti", "MikroTik", "Huawei OLT", "Fortinet"];
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function RevealText({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const words = useMemo(() => text.split(" "), [text]);
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.26em] last:mr-0 pb-[0.18em] mb-[-0.18em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.72, delay: delay + i * 0.08, ease: EXPO_OUT }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex items-center overflow-hidden"
    >
      {/* ── Background Video ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ y: bgY }}
      >
        <video
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(9,9,11,0.3) 0%,
              rgba(9,9,11,0.4) 40%,
              rgba(9,9,11,0.65) 70%,
              var(--color-base) 100%
            )`,
          }}
        />

        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(9,9,11,0.5) 100%)",
          }}
        />
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full px-[5%] lg:px-[6%] pt-24 sm:pt-32 pb-32 sm:pb-20 flex flex-col justify-center min-h-[100dvh]">
        <motion.div
          style={{ y: textY, opacity }}
          className="flex flex-col items-start will-change-transform max-w-6xl"
        >
          {/* Badge */}
          <motion.div
            className="mb-5 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EXPO_OUT }}
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                background: "rgba(56,189,248,0.06)",
                border: "1px solid rgba(56,189,248,0.25)",
                boxShadow: "0 0 20px rgba(56,189,248,0.08)",
              }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span
                className="text-xs font-body tracking-widest whitespace-nowrap"
                style={{ color: "rgba(56,189,248,0.85)" }}
              >
                {t("badge")}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-heading font-extrabold"
            style={{
              fontSize: "clamp(2.4rem, 6.5vw, 7rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <RevealText
              text={t("title_line1")}
              className="block"
              delay={0.3}
              style={{
                color: "#FFFFFF",
                textShadow: "0 0 80px rgba(255,255,255,0.15)",
              }}
            />
            <motion.span
              className="block gradient-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EXPO_OUT }}
            >
              {t("title_line2")}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            className="mt-5 sm:mt-8 font-body max-w-[520px]"
            style={{
              fontSize: "clamp(15px, 2.5vw, 18px)",
              lineHeight: "1.75",
              color: "rgba(180, 200, 220, 0.75)",
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EXPO_OUT }}
          >
            {t("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: EXPO_OUT }}
          >
            <Link href="/contact" className="block w-full sm:w-auto">
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
                  boxShadow: "0 0 36px rgba(56,189,248,0.2), 0 8px 24px rgba(0,0,0,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EXPO_OUT }}
              >
                {t("cta_primary")}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "rgba(56,189,248,0.9)" }}>
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </Link>

            <Link href="/services" className="block w-full sm:w-auto">
              <motion.span
                className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-lg font-medium text-sm cursor-pointer"
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
                {t("cta_secondary")}
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Technologies + Scroll ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-3.5 w-max">
        <motion.div
          className="flex flex-col items-center gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: EXPO_OUT }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
            <span className="font-body tracking-[0.2em] uppercase" style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>
              {t("trusted_by")}
            </span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            {techBrands.map((brand, i) => (
              <motion.span
                key={brand}
                className="font-body tracking-wider uppercase"
                style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + i * 0.08, duration: 0.5 }}
              >
                {brand}
                {i < techBrands.length - 1 && (
                  <span className="ms-4 sm:ms-6" style={{ color: "rgba(255,255,255,0.1)" }}>
                    ·
                  </span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <ScrollIndicator label={t("scroll_hint")} />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-base) 0%, rgba(9,9,11,0.85) 40%, rgba(9,9,11,0.3) 75%, transparent 100%)",
        }}
      />
    </section>
  );
}
