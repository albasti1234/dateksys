"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// ── Constants ──
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const CINEMATIC_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: CINEMATIC_EASE } },
};

// ── SVG Icons للخدمات ──
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  fiber: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2v6m0 8v6M2 12h6m8 0h6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5a7 7 0 017 7m-7-7a7 7 0 00-7 7m14 0a7 7 0 01-7 7m7-7a7 7 0 00-7 7" opacity="0.3" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="1" y="1" width="9" height="9" rx="2" />
      <rect x="14" y="1" width="9" height="9" rx="2" />
      <rect x="7" y="14" width="9" height="9" rx="2" />
      <path d="M5.5 10v2a2 2 0 002 2h1.5M18.5 10v2a2 2 0 01-2 2h-1.5" strokeLinecap="round" />
    </svg>
  ),
  datacenter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="3" y="2" width="18" height="6" rx="2" />
      <rect x="3" y="9" width="18" height="6" rx="2" />
      <rect x="3" y="16" width="18" height="6" rx="2" />
      <circle cx="7" cy="5" r="1" fill="currentColor" />
      <circle cx="7" cy="12" r="1" fill="currentColor" />
      <circle cx="7" cy="19" r="1" fill="currentColor" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M12 18h.01" strokeLinecap="round" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ============================================
// AnimatedCounter — أرقام متحركة
// ============================================
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

// ============================================
// TextReveal — عنوان يظهر كلمة كلمة
// ============================================
function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = useMemo(() => text.split(" "), [text]);
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden me-[0.25em] last:me-0">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: CINEMATIC_EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ============================================
// SpotlightCard — كارد مع cursor glow
// ============================================
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute w-[250px] h-[250px] rounded-full bg-[#38BDF8]/[0.06] blur-[80px] transition-opacity"
          style={{ left: position.x - 125, top: position.y - 125 }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ============================================
// SectionLabel — ليبل صغير فوق كل قسم
// ============================================
function SectionLabel({ label }: { label: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-6"
      variants={staggerItem}
    >
      <div className="w-8 h-px bg-accent/40" />
      <span className="text-xs font-body tracking-[0.25em] uppercase" style={{ color: "rgba(56,189,248,0.6)" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ============================================
// ① HERO SECTION
// ============================================
function HeroSection() {
  const t = useTranslations("about");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* ── خلفية gradient ── */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#38BDF8]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#0EA5E9]/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* ── المحتوى ── */}
      <motion.div
        className="relative z-10 w-full px-[5%] lg:px-[6%] pt-32 pb-20"
        style={{ opacity, y }}
      >
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Tag */}
          <motion.div variants={staggerItem} className="mb-8">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm"
              style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.2)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-body tracking-widest" style={{ color: "rgba(56,189,248,0.8)" }}>
                {t("hero_tag")}
              </span>
            </div>
          </motion.div>

          {/* العنوان */}
          <motion.h1
            variants={staggerItem}
            className="font-heading font-bold"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            <span className="block text-white">{t("hero_title_1")}</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #7DD3FC 40%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("hero_title_2")}
            </span>
            <span className="block text-white/20">{t("hero_title_3")}</span>
          </motion.h1>

          {/* الوصف */}
          <motion.p
            variants={staggerItem}
            className="mt-8 font-body max-w-xl"
            style={{ fontSize: "17px", lineHeight: 1.8, color: "rgba(180, 200, 220, 0.7)" }}
          >
            {t("hero_description")}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ── خط فاصل سفلي ── */}
      <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

// ============================================
// ② STORY SECTION — قصتنا
// ============================================
function StorySection() {
  const t = useTranslations("about");
  const blocks = t.raw("story_blocks") as Array<{ title: string; text: string }>;

  return (
    <section className="relative py-32 px-[5%] lg:px-[6%] overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <SectionLabel label={t("story_label")} />
        <motion.h2
          variants={staggerItem}
          className="font-heading font-bold text-white mb-16"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          {t("story_title")}
        </motion.h2>

        {/* ── Grid — 2x2 ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative rounded-2xl p-8 lg:p-10 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#38BDF8]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* الرقم */}
              <div className="relative z-10 flex items-center gap-4 mb-5">
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: "rgba(56,189,248,0.4)" }}
                >
                  0{i + 1}
                </span>
                <div className="w-8 h-px bg-white/[0.08]" />
              </div>

              <h3 className="relative z-10 font-heading font-semibold text-white text-lg mb-3">
                {block.title}
              </h3>
              <p className="relative z-10 font-body text-sm leading-relaxed" style={{ color: "rgba(180,200,220,0.6)" }}>
                {block.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// ③ STATS SECTION — أرقام متحركة
// ============================================
function StatsSection() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as Array<{ value: string; suffix: string; label: string }>;

  return (
    <section className="relative py-24 px-[5%] lg:px-[6%]">
      {/* ── خطوط فاصلة ── */}
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={staggerItem} className="text-center">
            <div
              className="font-heading font-bold text-white mb-2"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
            >
              <AnimatedCounter target={parseInt(stat.value)} suffix={stat.suffix} />
            </div>
            <p className="font-body text-sm" style={{ color: "rgba(180,200,220,0.4)" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================
// ④ TABS SECTION — الرؤية، الرسالة، القيم
// ============================================
function TabsSection() {
  const t = useTranslations("about");
  const [activeTab, setActiveTab] = useState<"vision" | "mission" | "values">("vision");
  const values = t.raw("values") as Array<{ title: string; text: string }>;

  const tabs = [
    { id: "vision" as const, label: t("tab_vision") },
    { id: "mission" as const, label: t("tab_mission") },
    { id: "values" as const, label: t("tab_values") },
  ];

  return (
    <section className="relative py-32 px-[5%] lg:px-[6%] overflow-hidden">
      {/* ── Ambient glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#38BDF8]/[0.03] rounded-full blur-[150px]" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center mb-16">
          <SectionLabel label={t("tabs_label")} />
          <motion.h2
            variants={staggerItem}
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            {t("tabs_title")}
          </motion.h2>
        </div>

        {/* ── Tab buttons ── */}
        <motion.div
          variants={staggerItem}
          className="flex justify-center gap-2 mb-12"
        >
          <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-3 rounded-lg text-sm font-body font-medium transition-colors duration-300"
                style={{ color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(56,189,248,0.1)",
                      border: "1px solid rgba(56,189,248,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tab content ── */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: CINEMATIC_EASE }}
                className="text-center"
              >
                <div className="max-w-2xl mx-auto p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-[#38BDF8]/[0.08] border border-[#38BDF8]/[0.15] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <p className="font-body text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.7)" }}>
                    {t("vision_text")}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "mission" && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: CINEMATIC_EASE }}
                className="text-center"
              >
                <div className="max-w-2xl mx-auto p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-[#38BDF8]/[0.08] border border-[#38BDF8]/[0.15] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-body text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.7)" }}>
                    {t("mission_text")}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "values" && (
              <motion.div
                key="values"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: CINEMATIC_EASE }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {values.map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: CINEMATIC_EASE }}
                      className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#38BDF8]/[0.15] transition-colors duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/[0.08] flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" className="w-4 h-4">
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h4 className="font-heading font-semibold text-white text-sm mb-2">{val.title}</h4>
                      <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(180,200,220,0.5)" }}>
                        {val.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// ⑤ SERVICES SECTION — خدماتنا
// ============================================
function ServicesSection() {
  const t = useTranslations("about");
  const services = t.raw("services") as Array<{ icon: string; title: string; text: string }>;

  return (
    <section className="relative py-32 px-[5%] lg:px-[6%] overflow-hidden">
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <SectionLabel label={t("services_label")} />
        <motion.h2
          variants={staggerItem}
          className="font-heading font-bold text-white mb-16"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          {t("services_title")}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div key={i} variants={staggerItem}>
              <SpotlightCard className="p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 text-[#38BDF8]">
                  {SERVICE_ICONS[service.icon] || (
                    <span className="text-lg">✦</span>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-white text-base mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(180,200,220,0.5)" }}>
                  {service.text}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// ⑥ PARTNERS — شريط الشركاء
// ============================================
function PartnersSection() {
  const t = useTranslations("about");
  const partners = t.raw("partners") as string[];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs font-body tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          {t("partners_label")}
        </span>
      </motion.div>

      {/* ── Marquee ── */}
      <div className="overflow-hidden">
        <motion.div
          className="inline-flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-0">
              {partners.map((partner, i) => (
                <div key={`${rep}-${i}`} className="flex items-center">
                  <span
                    className="font-heading font-bold tracking-wider uppercase px-8 lg:px-12"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", color: "rgba(255,255,255,0.08)" }}
                  >
                    {partner}
                  </span>
                  <span style={{ color: "rgba(56,189,248,0.15)", fontSize: "10px" }}>◆</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// ⑦ CTA SECTION — تواصل معنا
// ============================================
function CTASection() {
  const t = useTranslations("about");

  return (
    <section className="relative py-32 px-[5%] lg:px-[6%] overflow-hidden">
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── Ambient glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#38BDF8]/[0.04] rounded-full blur-[120px]" />

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={staggerItem}
          className="font-heading font-bold text-white mb-6"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          {t("cta_title")}
        </motion.h2>

        <motion.p
          variants={staggerItem}
          className="font-body mb-10"
          style={{ fontSize: "17px", color: "rgba(180,200,220,0.6)", lineHeight: 1.7 }}
        >
          {t("cta_description")}
        </motion.p>

        <motion.div variants={staggerItem}>
          <Link href="/contact">
            <motion.span
              className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-semibold text-sm cursor-pointer"
              style={{
                background: "rgba(56,189,248,0.1)",
                color: "#F4F4F5",
                border: "1px solid rgba(56,189,248,0.3)",
                boxShadow: "0 0 30px rgba(56,189,248,0.08)",
                backdropFilter: "blur(8px)",
              }}
              whileHover={{
                scale: 1.04,
                y: -2,
                background: "rgba(56,189,248,0.15)",
                borderColor: "rgba(56,189,248,0.5)",
                boxShadow: "0 0 40px rgba(56,189,248,0.15), 0 8px 24px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EXPO_OUT }}
            >
              {t("cta_button")}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "rgba(56,189,248,0.8)" }}>
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================
// الصفحة الرئيسية — About Page
// ============================================
export default function AboutPage() {
  return (
    <main className="relative bg-[var(--color-base)] min-h-screen">
      {/* ── Noise overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <HeroSection />
      <StorySection />
      <StatsSection />
      <TabsSection />
      <ServicesSection />
      <PartnersSection />
      <CTASection />
    </main>
  );
}