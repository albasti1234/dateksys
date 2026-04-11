"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Filter, Download, Plus } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function GradebookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const g = dict.portals.teacher.gradebook;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">{g.hero.title}</p>
          <h1 className={h1Class}>{g.hero.subtitle}</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline !py-2.5 text-xs">
            <Filter className="w-4 h-4" /> {g.filters}
          </button>
          <button className="btn-outline !py-2.5 text-xs">
            <Download className="w-4 h-4" /> {g.export}
          </button>
          <button className="btn-primary !py-2.5 text-xs">
            <Plus className="w-4 h-4" /> {g.newGrade}
          </button>
        </div>
      </div>

      {/* Class tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {g.classTabs.map((c, i) => (
          <button
            key={c.label}
            className={`px-5 py-3 text-xs font-semibold tracking-wider whitespace-nowrap ${
              i === 0
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[var(--color-border)] overflow-x-auto"
      >
        <table className="w-full min-w-[800px]">
          <thead className="bg-[var(--color-navy)] text-white">
            <tr>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider">
                {g.headers.student}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider">
                {g.headers.test1}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider">
                {g.headers.test2}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider">
                {g.headers.homework}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider">
                {g.headers.project}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider">
                {g.headers.final}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider">
                {g.headers.grade}
              </th>
            </tr>
          </thead>
          <tbody>
            {g.rows.map((row, i) => (
              <tr
                key={row.student}
                className={`border-t border-[var(--color-border-soft)] ${
                  i % 2 === 0 ? "" : "bg-[var(--color-cream)]/50"
                } hover:bg-[var(--color-cream)]`}
              >
                <td className="p-4">
                  <div className="font-semibold text-[var(--color-navy)]">
                    {row.student}
                  </div>
                </td>
                <td className="p-4 text-center font-serif text-base text-[var(--color-navy)] num">
                  {row.test1}
                </td>
                <td className="p-4 text-center font-serif text-base text-[var(--color-navy)] num">
                  {row.test2}
                </td>
                <td className="p-4 text-center font-serif text-base text-[var(--color-navy)] num">
                  {row.homework}
                </td>
                <td className="p-4 text-center font-serif text-base text-[var(--color-navy)] num">
                  {row.project}
                </td>
                <td className="p-4 text-center font-serif text-xl font-bold text-[var(--color-navy)] num">
                  {row.final}
                </td>
                <td className="p-4 text-center">
                  <span
                    className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold text-white"
                    style={{ background: "#2D8659" }}
                  >
                    {row.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
