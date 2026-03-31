"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import NetworkVisualization from "@/components/home/NetworkVisualization";

// ============================================
// Technologies — حقيقية (اللي فعلاً بتشتغل فيها)
// ============================================
const techBrands = ["Cisco", "Ubiquiti", "MikroTik", "Huawei OLT", "Fortinet"];

// ── Word-by-word cinematic reveal ──
function RevealText({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: Record<string, string | number | undefined>;
}) {
  return (
    <span className={className} style={style}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.26em] last:mr-0 pb-[0.18em] mb-[-0.18em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.82,
              delay: delay + i * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
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
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* ── Background — blobs + grid ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Primary blob */}
        <div
          className="absolute top-[-20%] left-[-15%] w-[90vw] h-[90vw] max-w-[1100px] max-h-[1100px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.11) 0%, rgba(56,189,248,0.04) 40%, transparent 68%)",
            filter: "blur(160px)",
          }}
        />

        {/* Secondary blob */}
        <div
          className="absolute top-[20%] right-[-20%] w-[75vw] h-[75vw] max-w-[900px] max-h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)",
            filter: "blur(140px)",
          }}
        />

        {/* Accent blob — indigo */}
        <div
          className="absolute bottom-[-15%] left-[15%] w-[70vw] h-[70vw] max-w-[850px] max-h-[850px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 65%)",
            filter: "blur(150px)",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.045]"
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
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(9,9,11,0.6) 100%)",
          }}
        />
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="relative z-10 w-full px-[5%] lg:px-[6%] pt-32 sm:pt-36 pb-24 grid grid-cols-1 lg:grid-cols-[44%_56%] gap-12 lg:gap-0 items-center min-h-screen">
        {/* ── LEFT: Text ── */}
        <motion.div
          style={{ y: textY, opacity }}
          className="flex flex-col items-start"
        >
          {/* Badge */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(56,189,248,0.3)",
                boxShadow:
                  "0 0 20px rgba(56,189,248,0.1), 0 0 40px rgba(56,189,248,0.05), inset 0 0 12px rgba(56,189,248,0.04)",
              }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span
                className="text-xs font-body tracking-widest whitespace-nowrap"
                style={{ color: "rgba(56,189,248,0.9)" }}
              >
                {t("badge")}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-heading font-bold"
            style={{
              fontSize: "clamp(3rem, 6vw, 6.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <RevealText
              text={t("title_line1")}
              className="block"
              delay={0.35}
              style={{
                color: "#FFFFFF",
                textShadow: "0 0 80px rgba(255,255,255,0.18)",
              }}
            />
            <RevealText
              text={t("title_line2")}
              className="block"
              delay={0.65}
              style={{
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #7DD3FC 40%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
          </h1>

          {/* ✅ Description — مترجم بالكامل */}
          <motion.p
            className="mt-9 font-body max-w-[490px]"
            style={{
              fontSize: "17px",
              lineHeight: "1.82",
              color: "rgba(180, 200, 220, 0.82)",
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            {t("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            {/* Primary CTA */}
            <Link href="/contact" className="block w-full sm:w-auto">
              <motion.span
                className="relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-sm cursor-pointer overflow-hidden"
                style={{
                  background: "rgba(56,189,248,0.1)",
                  color: "#F4F4F5",
                  border: "1px solid rgba(56,189,248,0.35)",
                  boxShadow: "0 0 24px rgba(56,189,248,0.12)",
                }}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  background: "rgba(56,189,248,0.16)",
                  borderColor: "rgba(56,189,248,0.6)",
                  boxShadow:
                    "0 0 40px rgba(56,189,248,0.25), 0 8px 30px rgba(0,0,0,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
              >
                {/* Shine sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "-100% 0",
                  }}
                  whileHover={{ backgroundPosition: "250% 0" }}
                  transition={{ duration: 0.6, ease: "linear" as const }}
                />
                {t("cta_primary")}
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: "rgba(56,189,248,0.9)" }}
                  whileHover={{ x: 3 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                >
                  <path
                    d="M1 7h12M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.span>
            </Link>

            {/* Secondary CTA */}
            <Link href="/services" className="block w-full sm:w-auto">
              <motion.span
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-lg font-medium text-sm cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0)",
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
                transition={{
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
              >
                {t("cta_secondary")}
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Network Visualization ── */}
        <motion.div
          className="relative hidden lg:flex flex-col items-center justify-center self-stretch gap-3"
          style={{ y: visualY, padding: "5% 0" }}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.6,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
        >
          {/* Glow halo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0.03) 50%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <NetworkVisualization />

          {/* ✅ Label — مترجم */}
          <motion.div
            className="flex items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div
              className="w-4 h-px"
              style={{ background: "rgba(56,189,248,0.3)" }}
            />
            <span
              className="font-body tracking-[0.14em] uppercase"
              style={{ fontSize: "10px", color: "rgba(56,189,248,0.4)" }}
            >
              {t("network_label")}
            </span>
            <div
              className="w-4 h-px"
              style={{ background: "rgba(56,189,248,0.3)" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile visualization */}
      <motion.div
        className="lg:hidden absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <NetworkVisualization />
      </motion.div>

      {/* ── Technologies + Scroll — centered bottom ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 w-max">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 1.75,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
        >
          {/* ✅ Label — مترجم */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.15))",
              }}
            />
            <span
              className="font-body tracking-[0.25em] uppercase whitespace-nowrap"
              style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.25em",
              }}
            >
              {t("trusted_by")}
            </span>
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.15))",
              }}
            />
          </div>

          {/* ✅ Tech brands — حقيقية */}
          <div className="flex items-center gap-0">
            {techBrands.map((brand, i) => (
              <motion.span
                key={brand}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 + i * 0.07, duration: 0.6 }}
              >
                <span
                  className="font-body font-medium tracking-[0.12em] uppercase px-3.5"
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {brand}
                </span>
                {i < techBrands.length - 1 && (
                  <span
                    style={{
                      color: "rgba(56,189,248,0.25)",
                      fontSize: "10px",
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
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-base) 0%, rgba(9,9,11,0.85) 40%, rgba(9,9,11,0.3) 75%, transparent 100%)",
        }}
      />
    </section>
  );
}