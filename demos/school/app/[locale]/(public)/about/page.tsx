"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Target, Eye, Heart, Award, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const icons = [Target, Eye, Heart];

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const about = dict.pages.about;
  const isRTL = locale === "ar";

  const headingClass = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight";

  const cardTitleClass = isRTL
    ? "font-arabic-display text-2xl font-bold text-[var(--color-navy)] mb-4"
    : "font-serif text-2xl font-bold text-[var(--color-navy)] mb-4";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={about.hero.label}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        breadcrumbs={[{ label: about.hero.breadcrumb }]}
        image="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
      />

      {/* Mission / Vision / Values */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {about.pillars.map((v, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="academic-card p-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-[var(--color-navy)] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[var(--color-gold)]" />
                  </div>
                  <h3 className={cardTitleClass}>{v.title}</h3>
                  <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-4" />
                  <p
                    className={`text-[var(--color-ink-soft)] ${
                      isRTL ? "leading-[2]" : "leading-relaxed"
                    }`}
                  >
                    {v.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">{about.story.label}</p>
            <h2 className={headingClass}>{about.story.title}</h2>
            <div
              className={`space-y-4 text-[var(--color-ink-soft)] ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {about.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            <div
              className="absolute top-0 end-0 w-[70%] h-[60%] shadow-2xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80')",
              }}
            />
            <div
              className="absolute bottom-0 start-0 w-[55%] h-[50%] shadow-2xl bg-cover bg-center border-8 border-white"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80')",
              }}
            />
            <div className="absolute top-0 start-0 w-20 h-20 border-t-4 border-s-4 border-[var(--color-gold)]" />
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4 !justify-center">
              {about.leadership.label}
            </p>
            <h2 className={headingClass}>{about.leadership.title}</h2>
            <div className="ornamental-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.leadership.team.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="academic-card overflow-hidden group"
              >
                <div
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  style={{
                    backgroundImage: [
                      "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80')",
                      "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80')",
                      "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80')",
                      "url('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80')",
                    ][i],
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold text-[var(--color-navy)] mb-1 ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    {l.name}
                  </h3>
                  <p className="text-xs tracking-wider text-[var(--color-gold)] font-semibold mb-3">
                    {l.role}
                  </p>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                    {l.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section id="accreditation" className="py-24 lg:py-32 bg-[var(--color-navy)] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <Award className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
          <p className="section-label !text-[var(--color-gold)] mb-4 !justify-center">
            {about.accreditations.label}
          </p>
          <h2
            className={`${
              isRTL ? "font-arabic-display leading-[1.4]" : "font-serif"
            } text-4xl md:text-5xl font-bold mb-10`}
          >
            {about.accreditations.title}
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4 text-start">
            {about.accreditations.items.map((a) => (
              <div
                key={a}
                className="flex items-start gap-3 bg-white/5 border border-[var(--color-gold)]/20 p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span className="text-white/90">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
