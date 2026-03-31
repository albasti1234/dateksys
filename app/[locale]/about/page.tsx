"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlowCard from "@/components/ui/GlowCard";

// ── Icons ──
const valueIcons = [
  <svg key="shield" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" opacity="0.5" /></svg>,
  <svg key="eye" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  <svg key="link" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
];

const credentialIcons = [
  <svg key="foa" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" opacity="0.5" /></svg>,
  <svg key="cisco" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" /><circle cx="12" cy="3" r="1.5" fill="currentColor" /></svg>,
  <svg key="gpon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  <svg key="ubiquiti" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" /></svg>,
];

interface ValueItem { title: string; desc: string; }
interface CredentialItem { title: string; description: string; }
interface AboutStat { value: string; label: string; suffix: string; }

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const} },
};

export default function AboutPage() {
  const t = useTranslations("about");

  const values = t.raw("values") as ValueItem[];
  const credentials = t.raw("credentials.items") as CredentialItem[];
  const aboutStats = t.raw("stats") as AboutStat[];

  return (
    <div className="bg-[var(--color-base)] min-h-screen">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -top-[100px] end-[-200px] w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-[5%] lg:px-[6%] pb-[100px] pt-[200px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="w-10 h-[2px] bg-accent rounded-full" />
              <span className="section-label">{t("label")}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(44px,6vw,84px)] font-heading font-black tracking-[var(--tracking-tight)] leading-[1.05] text-text-primary whitespace-pre-line mb-10"
            >
              <span className="gradient-text">{t("title")}</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="w-[80px] h-[3px] bg-accent rounded-full mb-10"
            />

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px]"
            >
              <p className="text-accent text-[20px] font-medium leading-[1.7]">
                {t("sub")}
              </p>
              <p className="text-text-secondary text-[18px] leading-[1.85]">
                {t("body")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="section-wrapper">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-[2px] bg-accent rounded-full" />
            <span className="section-label">{t("valuesLabel")}</span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {values.map((val, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GlowCard className="p-10 h-full">
                  <div className="text-accent mb-6">{valueIcons[i]}</div>
                  <h3 className="font-heading font-bold text-xl text-text-primary mb-3">
                    {val.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {val.desc}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-24 lg:py-32 px-[5%] lg:px-[6%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {aboutStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-[clamp(40px,6vw,64px)] font-heading font-black tracking-tight text-text-primary leading-none mb-2">
                  <span>{stat.value}</span>
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <p className="text-xs font-heading font-bold tracking-[0.2em] uppercase text-text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CREDENTIALS ═══ */}
      <section className="section-wrapper">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-[2px] bg-accent rounded-full" />
            <span className="section-label">{t("credentials.label")}</span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {credentials.map((cred, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GlowCard className="p-8 h-full flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-accent"
                    style={{
                      background: "rgba(56,189,248,0.08)",
                      border: "1px solid rgba(56,189,248,0.15)",
                    }}
                  >
                    {credentialIcons[i] || credentialIcons[0]}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                      {cred.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {cred.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}