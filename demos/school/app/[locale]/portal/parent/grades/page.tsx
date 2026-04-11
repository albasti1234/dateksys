"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Download, TrendingUp, Award } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const summaryIcons = [Award, Award, TrendingUp, Award];

export default function GradesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const g = dict.portals.parent.grades;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-3xl font-bold"
    : "font-serif text-3xl font-bold";

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">{g.hero.title}</p>
          <h1 className={h1Class}>{g.hero.subtitle}</h1>
        </div>
        <div className="flex gap-2">
          {g.terms.map((t, i) => (
            <button
              key={t}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wider ${
                i === 1
                  ? "bg-[var(--color-navy)] text-white"
                  : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-navy)] text-white p-8 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {g.summary.map((s, i) => {
          const Icon = summaryIcons[i];
          return (
            <div
              key={s.label}
              className="bg-white/5 p-5 border-s-2 border-[var(--color-gold)]"
            >
              <Icon className="w-5 h-5 text-[var(--color-gold)] mb-3" />
              <div className={`${bigNumClass} text-white mb-1`}>{s.value}</div>
              <div className="text-xs text-white/60 tracking-wider">
                {s.label}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Subjects table */}
      <div className="bg-white border border-[var(--color-border)] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-[var(--color-cream)]">
            <tr>
              <th className="text-start p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {g.columns.subject}
              </th>
              <th className="text-start p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {g.columns.teacher}
              </th>
              <th className="text-center p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {g.columns.tests}
              </th>
              <th className="text-center p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {g.columns.homework}
              </th>
              <th className="text-center p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {g.columns.participation}
              </th>
              <th className="text-center p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {g.columns.final}
              </th>
            </tr>
          </thead>
          <tbody>
            {g.subjects.map((s) => (
              <tr
                key={s.subject}
                className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50"
              >
                <td className="p-5 font-semibold text-[var(--color-navy)]">
                  {s.subject}
                </td>
                <td className="p-5 text-sm text-[var(--color-ink-soft)]">
                  {s.teacher}
                </td>
                <td className="p-5 text-center num">{s.tests}</td>
                <td className="p-5 text-center num">{s.homework}</td>
                <td className="p-5 text-center num">{s.participation}</td>
                <td className="p-5 text-center font-bold text-[var(--color-navy)]">
                  <span className="num">{s.final}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="btn-outline">
          <Download className="w-4 h-4" />
          PDF
        </button>
      </div>
    </div>
  );
}
