"use client";

import { use } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import {
  FileText,
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const stepIcons = [FileText, Calendar, Users, CheckCircle2];

export default function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.pages.admissions;
  const isRTL = locale === "ar";

  const h2Class = isRTL
    ? "font-arabic-display text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-[1.4]"
    : "font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)] mb-3"
    : "font-serif text-xl font-bold text-[var(--color-navy)] mb-3";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={a.hero.label}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        breadcrumbs={[{ label: a.hero.breadcrumb }]}
        image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80"
      />

      {/* Process */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4 !justify-center">
              {a.process.label}
            </p>
            <h2 className={h2Class}>{a.process.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.process.steps.map((s, i) => {
              const Icon = stepIcons[i];
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative p-8 bg-[var(--color-cream)] border border-[var(--color-border)] group hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="absolute top-4 end-4 font-serif text-5xl font-bold text-[var(--color-gold)]/20">
                    {num}
                  </div>
                  <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <h3 className={cardTitleClass}>{s.title}</h3>
                  <p
                    className={`text-sm text-[var(--color-ink-soft)] ${
                      isRTL ? "leading-[2]" : "leading-relaxed"
                    }`}
                  >
                    {s.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-16">
            <button className="btn-primary group">
              {a.cta.primary}
              <ArrowRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isRTL ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="section-label mb-4">{a.fees.label}</p>
            <h2 className={h2Class}>{a.fees.title}</h2>
            <p
              className={`text-[var(--color-ink-soft)] ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {a.fees.subtitle}
            </p>
          </div>

          <div className="bg-white border border-[var(--color-border)] shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--color-navy)] text-white">
                <tr>
                  <th
                    className={`text-start p-5 text-sm tracking-wider ${
                      isRTL ? "font-arabic-display" : "font-serif uppercase"
                    }`}
                  >
                    {a.fees.columns.stage}
                  </th>
                  <th
                    className={`text-end p-5 text-sm tracking-wider ${
                      isRTL ? "font-arabic-display" : "font-serif uppercase"
                    }`}
                  >
                    {a.fees.columns.tuition}
                  </th>
                  <th
                    className={`text-end p-5 text-sm tracking-wider ${
                      isRTL ? "font-arabic-display" : "font-serif uppercase"
                    }`}
                  >
                    {a.fees.columns.registration}
                  </th>
                </tr>
              </thead>
              <tbody>
                {a.fees.rows.map((f, i) => (
                  <tr
                    key={f.stage}
                    className={
                      i % 2 === 0 ? "bg-[var(--color-cream)]" : "bg-white"
                    }
                  >
                    <td className="p-5 font-medium text-[var(--color-navy)]">
                      {f.stage}
                    </td>
                    <td className="p-5 text-end font-serif text-xl font-bold text-[var(--color-navy)]">
                      <span className="num">{f.tuition}</span>{" "}
                      <span className="text-xs text-[var(--color-ink-soft)]">
                        {a.fees.currency}
                      </span>
                    </td>
                    <td className="p-5 text-end text-[var(--color-ink-soft)]">
                      <span className="num">{f.registration}</span>{" "}
                      <span className="text-xs">{a.fees.currency}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm text-[var(--color-ink-soft)] text-center max-w-3xl mx-auto">
            {a.fees.footnote}
          </p>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-4">{a.documents.label}</p>
            <h2 className={h2Class}>{a.documents.title}</h2>
            <p
              className={`text-[var(--color-ink-soft)] mb-8 ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {a.cta.description}
            </p>
            <button className="btn-outline group">
              <Download className="w-4 h-4" />
              {a.cta.secondary}
            </button>
          </div>
          <div className="space-y-3">
            {a.documents.items.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                <span className="text-[var(--color-ink)]">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
