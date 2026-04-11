"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import {
  BookOpen,
  Users,
  Globe,
  Sparkles,
  Trophy,
  FlaskConical,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const pillarIcons = [Globe, Sparkles, Trophy, FlaskConical, BookOpen, Users];
const stageImages = [
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
];

export default function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.pages.programs;
  const isRTL = locale === "ar";

  const h2Class = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)] mb-2"
    : "font-serif text-xl font-bold text-[var(--color-navy)] mb-2";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={p.hero.label}
        title={p.hero.title}
        subtitle={p.hero.subtitle}
        breadcrumbs={[{ label: p.hero.breadcrumb }]}
        image="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=80"
      />

      {/* Six pillars */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4 !justify-center">
              {p.approach.label}
            </p>
            <h2 className={h2Class}>{p.approach.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.approach.pillars.map((pill, i) => {
              const Icon = pillarIcons[i];
              return (
                <motion.div
                  key={pill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex gap-5 p-6 academic-card"
                >
                  <div className="shrink-0 w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h3 className={cardTitleClass}>{pill.title}</h3>
                    <p
                      className={`text-sm text-[var(--color-ink-soft)] ${
                        isRTL ? "leading-[2]" : "leading-relaxed"
                      }`}
                    >
                      {pill.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program stages */}
      {p.stages.items.map((stage, i) => (
        <section
          key={stage.name}
          className={
            i % 2 === 0
              ? "py-24 lg:py-32 bg-[var(--color-cream)]"
              : "py-24 lg:py-32 bg-white"
          }
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? (isRTL ? 30 : -30) : isRTL ? -30 : 30,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-white bg-[var(--color-navy)]">
                    {stage.grades}
                  </span>
                  <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest bg-[var(--color-gold)] text-white">
                    {stage.ages}
                  </span>
                </div>
                <h2 className={h2Class}>{stage.name}</h2>
                <p
                  className={`text-[var(--color-ink-soft)] mb-8 text-lg ${
                    isRTL ? "leading-[2]" : "leading-relaxed"
                  }`}
                >
                  {stage.description}
                </p>
                <div className="space-y-2.5">
                  {stage.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-3 text-[var(--color-ink)]"
                    >
                      <div className="w-5 h-5 flex items-center justify-center bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 shrink-0">
                        <div className="w-1.5 h-1.5 bg-[var(--color-gold)]" />
                      </div>
                      <span className="text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] shadow-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${stageImages[i]}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/40 to-transparent" />
                <div className="absolute top-4 end-4 w-16 h-16 border-t-2 border-e-2 border-[var(--color-gold)]" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
