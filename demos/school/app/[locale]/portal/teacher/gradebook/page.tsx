"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Download, Plus, Edit2, CheckCircle2, X } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import {
  useGradebookOverrides,
  setGradebookCell,
} from "@/lib/schoolStore";

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

  const overrides = useGradebookOverrides();
  const [editing, setEditing] = useState<{
    row: number;
    col: "test1" | "test2" | "homework" | "project";
    student: string;
    current: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (editing) setEditValue(editing.current);
  }, [editing]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const getCellValue = (
    row: number,
    col: "test1" | "test2" | "homework" | "project",
    original: string
  ) => {
    return overrides[`0:${row}:${col}`] ?? original;
  };

  const handleSaveGrade = () => {
    if (!editing) return;
    const key = `0:${editing.row}:${editing.col}`;
    setGradebookCell(key, editValue);
    setToast(
      locale === "ar"
        ? `تمّ تحديث علامة ${editing.student}`
        : `Updated ${editing.student}'s grade`
    );
    setEditing(null);
  };

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
            {g.rows.map((row, i) => {
              const t1 = getCellValue(i, "test1", row.test1);
              const t2 = getCellValue(i, "test2", row.test2);
              const hw = getCellValue(i, "homework", row.homework);
              const pr = getCellValue(i, "project", row.project);

              // Recompute final if any override exists
              const nums = [t1, t2, hw, pr]
                .map((v) => parseFloat(v))
                .filter((v) => !isNaN(v));
              const finalAvg =
                nums.length > 0
                  ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1)
                  : row.final;

              const editable = (
                col: "test1" | "test2" | "homework" | "project",
                value: string
              ) => (
                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      setEditing({
                        row: i,
                        col,
                        student: row.student,
                        current: value,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-serif text-base text-[var(--color-navy)] num hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold-dark)] transition-colors group"
                  >
                    {value}
                    <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </td>
              );

              return (
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
                  {editable("test1", t1)}
                  {editable("test2", t2)}
                  {editable("homework", hw)}
                  {editable("project", pr)}
                  <td className="p-4 text-center font-serif text-xl font-bold text-[var(--color-navy)] num">
                    {finalAvg}
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
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Edit modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditing(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md shadow-2xl"
            >
              <div className="bg-[var(--color-navy)] text-white p-6 relative">
                <button
                  onClick={() => setEditing(null)}
                  className="absolute top-4 end-4 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <p className="section-label !text-[var(--color-gold)] mb-2">
                  {locale === "ar" ? "تعديل علامة" : "Edit Grade"}
                </p>
                <h3
                  className={`text-2xl font-bold ${
                    isRTL ? "font-arabic-display" : "font-serif"
                  }`}
                >
                  {editing.student}
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  {g.headers[editing.col]}
                </p>
              </div>
              <div className="p-6">
                <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                  {locale === "ar" ? "العلامة (من ١٠٠)" : "Grade (out of 100)"}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 bg-[var(--color-cream)] border-2 border-[var(--color-gold)] focus:outline-none text-3xl text-center font-bold text-[var(--color-navy)] num"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveGrade();
                    if (e.key === "Escape") setEditing(null);
                  }}
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setEditing(null)}
                    className="btn-outline flex-1 justify-center"
                  >
                    {locale === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    onClick={handleSaveGrade}
                    className="btn-primary flex-1 justify-center !bg-[var(--color-gold)] !border-[var(--color-gold)]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {locale === "ar" ? "حفظ" : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[60] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
