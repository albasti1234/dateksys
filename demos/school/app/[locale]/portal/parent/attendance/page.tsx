"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const summaryIcons = [CheckCircle2, XCircle, Clock, AlertTriangle];
const summaryColors = ["#2D8659", "#DC2626", "#C19A4B", "#4A90E2"];

const statusStyles: Record<string, { bg: string; text: string }> = {
  present: { bg: "#2D8659", text: "white" },
  absent: { bg: "#DC2626", text: "white" },
  late: { bg: "#C19A4B", text: "white" },
  excused: { bg: "#4A90E2", text: "white" },
  weekend: { bg: "#F3EFE6", text: "#6B7280" },
};

const days = Array.from({ length: 30 }, (_, i) => {
  const statuses = [
    "present", "present", "present", "present", "present",
    "weekend", "weekend", "present", "present", "present",
    "late", "present", "present", "absent", "present",
    "weekend", "weekend", "excused", "present", "present",
    "present", "present", "present", "weekend", "weekend",
    "present", "present", "present", "present", "present",
  ];
  return { day: i + 1, status: statuses[i] };
});

export default function AttendancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.portals.parent.attendance;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-7xl font-bold gold-text"
    : "font-serif text-7xl font-bold gold-text";

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{a.hero.title}</p>
        <h1 className={h1Class}>{a.hero.period}</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">{a.hero.subtitle}</p>
      </div>

      {/* Overall percentage */}
      <div className="bg-[var(--color-navy)] text-white p-8 mb-8 relative overflow-hidden">
        <div
          className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{ background: "#C19A4B" }}
        />
        <div className="relative grid md:grid-cols-3 gap-8 items-center">
          <div>
            <p className="text-xs tracking-widest text-[var(--color-gold)] mb-2">
              {a.overall.title}
            </p>
            <div className={bigNumClass}>{a.overall.value}</div>
            <p className="text-sm text-white/60 mt-2">
              {a.overall.label} · {a.overall.note}
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {a.summary.map((s, i) => {
              const Icon = summaryIcons[i];
              return (
                <div
                  key={s.label}
                  className="bg-white/5 p-5 flex items-center gap-4"
                >
                  <Icon
                    className="w-8 h-8 shrink-0"
                    style={{ color: summaryColors[i] }}
                  />
                  <div>
                    <div
                      className={`text-3xl font-bold ${
                        isRTL ? "font-arabic-display" : "font-serif"
                      }`}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs tracking-wider text-white/60">
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Month calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[var(--color-border)] p-8"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className={cardTitleClass}>{a.calendar.month}</h3>
          </div>
          <div className="flex items-center gap-4 text-xs flex-wrap">
            {Object.entries(a.calendar.legend).map(([k, label]) => (
              <div key={k} className="flex items-center gap-2">
                <div
                  className="w-3 h-3"
                  style={{ background: statusStyles[k]?.bg || "#F3EFE6" }}
                />
                <span className="text-[var(--color-ink-soft)]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {a.calendar.weekDays.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)] py-2"
            >
              {d}
            </div>
          ))}
          {days.map((d) => {
            const st = statusStyles[d.status];
            return (
              <div
                key={d.day}
                className="aspect-square flex items-center justify-center text-sm font-semibold num"
                style={{ background: st.bg, color: st.text }}
              >
                {d.day}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Absence details */}
      <div className="mt-8 bg-white border border-[var(--color-border)] p-6">
        <h3 className={`${cardTitleClass} mb-4`}>{a.recent.title}</h3>
        <div className="space-y-3">
          {a.recent.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-[var(--color-cream)] border-s-4"
              style={{ borderColor: statusStyles[item.status].bg }}
            >
              <div>
                <div className="font-semibold text-[var(--color-navy)]">
                  {item.date}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)]">
                  {item.reason}
                </div>
              </div>
              <span
                className="ms-auto px-3 py-1 text-[10px] font-bold tracking-wider text-white"
                style={{ background: statusStyles[item.status].bg }}
              >
                {a.calendar.legend[item.status as keyof typeof a.calendar.legend]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
