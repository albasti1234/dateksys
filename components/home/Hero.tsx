"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import ParticleNetwork from "@/components/home/ParticleNetwork";

// ============================================
// Technologies — real vendor stack
// ============================================
const techBrands = ["Cisco", "Ubiquiti", "MikroTik", "Huawei OLT", "Fortinet"];

// ── Shared easing ──
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// ── Staggered word reveal — GPU-optimized ──
function RevealText({
  text,
  className,
  delay = 0,
  style,
  gradient,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  gradient?: boolean;
}) {
  const words = useMemo(() => text.split(" "), [text]);
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.26em] last:mr-0 pb-[0.18em] mb-[-0.18em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${gradient ? "bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent" : ""}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.72,
              delay: delay + i * 0.08,
              ease: EXPO_OUT,
            }}
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
      {/* ── Background — blobs + grid ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ y: bgY }}
      >
        {/* Primary blob */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(56,189,248,0.03) 40%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        {/* Secondary blob */}
        <div
          className="absolute top-[25%] right-[-15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        {/* Accent — indigo tint */}
        <div
          className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(9,9,11,0.65) 100%)",
          }}
        />
      </motion.div>

      {/* ── Main Grid — text left, network right ── */}
      <div className="relative z-10 w-full px-[5%] lg:px-[6%] pt-28 sm:pt-32 pb-20 grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-0 items-center min-h-[100dvh]">
        {/* ── LEFT: Text ── */}
        <motion.div
          style={{ y: textY, opacity }}
          className="flex flex-col items-start will-change-transform"
        >
          {/* Badge */}
          <motion.div
            className="mb-8"
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
              fontSize: "clamp(3.2rem, 6.5vw, 7rem)",
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
            <RevealText
              text={t("title_line2")}
              className="block"
              delay={0.55}
              gradient
            />
          </h1>

          {/* Description */}
          <motion.p
            className="mt-8 font-body max-w-[520px]"
            style={{
              fontSize: "18px",
              lineHeight: "1.85",
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
            className="mt-10 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: EXPO_OUT }}
          >
            {/* Primary CTA */}
            <Link href="/contact" className="block w-full sm:w-auto">
              <motion.span
                className="relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-sm cursor-pointer overflow-hidden"
                style={{
                  background: "rgba(56,189,248,0.1)",
                  color: "#F4F4F5",
                  border: "1px solid rgba(56,189,248,0.35)",
                  boxShadow: "0 0 20px rgba(56,189,248,0.1)",
                }}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  background: "rgba(56,189,248,0.15)",
                  borderColor: "rgba(56,189,248,0.55)",
                  boxShadow:
                    "0 0 36px rgba(56,189,248,0.2), 0 8px 24px rgba(0,0,0,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EXPO_OUT }}
              >
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "-100% 0",
                  }}
                  whileHover={{ backgroundPosition: "250% 0" }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
                {t("cta_primary")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: "rgba(56,189,248,0.9)" }}
                >
                  <path
                    d="M1 7h12M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </Link>

            {/* Secondary CTA */}
            <Link href="/services" className="block w-full sm:w-auto">
              <motion.span
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-lg font-medium text-sm cursor-pointer"
                style={{
                  color: "var(--color-text-secondary)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  color: "#F4F4F5",
                  borderColor: "rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.03)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EXPO_OUT }}
              >
                {t("cta_secondary")}
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Network Visualization ── */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center self-stretch"
          style={{ padding: "2% 0" }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EXPO_OUT }}
        >
          {/* Background glow behind network */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <ParticleNetwork />
        </motion.div>
      </div>

      {/* ── Technologies + Scroll — centered bottom ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3.5 w-max">
        <motion.div
          className="flex flex-col items-center gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: EXPO_OUT }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.12))",
              }}
            />
            <span
              className="font-body tracking-[0.25em] uppercase whitespace-nowrap"
              style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)" }}
            >
              {t("trusted_by")}
            </span>
            <div
              className="w-8 h-px"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.12))",
              }}
            />
          </div>

          {/* Tech brands */}
          <div className="flex items-center gap-0">
            {techBrands.map((brand, i) => (
              <motion.span
                key={brand}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 + i * 0.06, duration: 0.5 }}
              >
                <span
                  className="font-body font-medium tracking-[0.1em] uppercase px-3"
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.32)",
                  }}
                >
                  {brand}
                </span>
                {i < techBrands.length - 1 && (
                  <span
                    style={{
                      color: "rgba(56,189,248,0.2)",
                      fontSize: "9px",
                    }}
                  >
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
          background:
            "linear-gradient(to top, var(--color-base) 0%, rgba(9,9,11,0.85) 40%, rgba(9,9,11,0.3) 75%, transparent 100%)",
        }}
      />
    </section>
  );
}
