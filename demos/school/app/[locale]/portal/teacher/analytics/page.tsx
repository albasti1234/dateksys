"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle2,
  Award,
  Percent,
  BookOpen,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

interface ClassPerf {
  name: { ar: string; en: string };
  avg: number;
  color: string;
}

interface TopStudent {
  name: { ar: string; en: string };
  avatar: string;
  score: number;
  className: { ar: string; en: string };
}

const classPerformance: ClassPerf[] = [
  {
    name: { ar: "الصف السادس أ - رياضيات", en: "Grade 6-A Math" },
    avg: 82,
    color: "#0F2C5C",
  },
  {
    name: { ar: "الصف السادس ب - رياضيات", en: "Grade 6-B Math" },
    avg: 76,
    color: "#1A4A8A",
  },
  {
    name: { ar: "الصف الثامن أ - جبر", en: "Grade 8-A Algebra" },
    avg: 88,
    color: "#C19A4B",
  },
  {
    name: { ar: "الصف الخامس ج - حساب", en: "Grade 5-C Numeracy" },
    avg: 79,
    color: "#2D8659",
  },
];

const gradeDistribution = [
  { grade: "A", count: 18, color: "#2D8659" },
  { grade: "B", count: 27, color: "#4A90E2" },
  { grade: "C", count: 22, color: "#C19A4B" },
  { grade: "D", count: 12, color: "#E07A3A" },
  { grade: "F", count: 5, color: "#C0392B" },
];

const monthlyTrend = [
  { month: { ar: "يناير", en: "Jan" }, avg: 74, delta: 0 },
  { month: { ar: "فبراير", en: "Feb" }, avg: 77, delta: 3 },
  { month: { ar: "مارس", en: "Mar" }, avg: 80, delta: 3 },
  { month: { ar: "أبريل", en: "Apr" }, avg: 82, delta: 2 },
];

const topPerformers: TopStudent[] = [
  {
    name: { ar: "ميريم شكري", en: "Miriam Shukri" },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    score: 97,
    className: { ar: "الصف الثامن أ", en: "Grade 8-A" },
  },
  {
    name: { ar: "يوسف العموش", en: "Yousef Al-Amoush" },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    score: 95,
    className: { ar: "الصف السادس أ", en: "Grade 6-A" },
  },
  {
    name: { ar: "زينة القضاة", en: "Zeina Al-Qudah" },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    score: 94,
    className: { ar: "الصف السادس ب", en: "Grade 6-B" },
  },
];

export default function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-4xl font-bold text-[var(--color-navy)] mb-1"
    : "font-serif text-4xl font-bold text-[var(--color-navy)] mb-1";

  const T = {
    label: { ar: "التحليلات", en: "Analytics" },
    subtitle: {
      ar: "نظرة شاملة على أداء الصفوف والطلاب",
      en: "Overview of class and student performance",
    },
    avgGPA: { ar: "متوسط المعدل", en: "Average GPA" },
    attendance: { ar: "نسبة الحضور", en: "Attendance Rate" },
    assignmentCompletion: { ar: "إكمال الواجبات", en: "Assignment Completion" },
    improvement: { ar: "نسبة التحسّن", en: "Improvement Rate" },
    classPerformance: { ar: "أداء الصفوف", en: "Class Performance" },
    gradeDistribution: { ar: "توزيع العلامات", en: "Grade Distribution" },
    monthlyTrend: { ar: "التطوّر الشهري", en: "Monthly Trend" },
    topPerformers: { ar: "المتفوقون", en: "Top Performers" },
    average: { ar: "المعدل", en: "Avg" },
    students: { ar: "طالب", en: "students" },
    rank: { ar: "الترتيب", en: "Rank" },
  };

  const kpis = [
    {
      label: T.avgGPA[locale],
      value: "82%",
      icon: BarChart3,
      color: "#0F2C5C",
    },
    {
      label: T.attendance[locale],
      value: "94%",
      icon: Users,
      color: "#2D8659",
    },
    {
      label: T.assignmentCompletion[locale],
      value: "87%",
      icon: CheckCircle2,
      color: "#C19A4B",
    },
    {
      label: T.improvement[locale],
      value: "+8%",
      icon: TrendingUp,
      color: "#4A90E2",
    },
  ];

  const maxGrade = Math.max(...gradeDistribution.map((g) => g.count));

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="section-label mb-3">{T.label[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)]"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: kpi.color }}
                />
              </div>
              <div className={bigNumClass}>
                <span className="num">{kpi.value}</span>
              </div>
              <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink)]">
                {kpi.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Class Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <h3 className={`${cardTitleClass} mb-6`}>
            {T.classPerformance[locale]}
          </h3>
          <div className="space-y-4">
            {classPerformance.map((cls) => (
              <div key={cls.name.en}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {cls.name[locale]}
                  </span>
                  <span className="num text-sm font-bold" style={{ color: cls.color }}>
                    {cls.avg}%
                  </span>
                </div>
                <div className="h-3 bg-[var(--color-cream)] w-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cls.avg}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full"
                    style={{ background: cls.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <h3 className={`${cardTitleClass} mb-6`}>
            {T.gradeDistribution[locale]}
          </h3>
          <div className="flex items-end gap-4 h-48 justify-center">
            {gradeDistribution.map((g) => {
              const heightPct = (g.count / maxGrade) * 100;
              return (
                <div
                  key={g.grade}
                  className="flex flex-col items-center gap-2 flex-1 max-w-16"
                >
                  <span className="num text-xs font-bold text-[var(--color-ink)]">
                    {g.count}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full min-h-[8px]"
                    style={{ background: g.color }}
                  />
                  <span className="text-sm font-bold text-[var(--color-navy)] num">
                    {g.grade}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center text-xs text-[var(--color-ink-soft)]">
            <span className="num">{gradeDistribution.reduce((s, g) => s + g.count, 0)}</span>{" "}
            {T.students[locale]}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <h3 className={`${cardTitleClass} mb-6`}>
            {T.monthlyTrend[locale]}
          </h3>
          <div className="space-y-3">
            {monthlyTrend.map((m, i) => (
              <div
                key={m.month.en}
                className="flex items-center justify-between p-4 bg-[var(--color-cream)]"
              >
                <span className="text-sm font-medium text-[var(--color-ink)]">
                  {m.month[locale]}
                </span>
                <div className="flex items-center gap-3">
                  <span className="num text-lg font-bold text-[var(--color-navy)]">
                    {m.avg}%
                  </span>
                  {i > 0 && (
                    <span
                      className={`flex items-center gap-1 text-xs font-bold num ${
                        m.delta > 0
                          ? "text-emerald-600"
                          : m.delta < 0
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {m.delta > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : m.delta < 0 ? (
                        <TrendingDown className="w-3.5 h-3.5" />
                      ) : null}
                      {m.delta > 0 ? "+" : ""}
                      {m.delta}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className={cardTitleClass}>{T.topPerformers[locale]}</h3>
          </div>
          <div className="space-y-4">
            {topPerformers.map((s, i) => (
              <div
                key={s.name.en}
                className="flex items-center gap-4 p-4 bg-[var(--color-cream)]"
              >
                <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-[var(--color-navy)] text-white font-bold text-sm num">
                  {i + 1}
                </div>
                <div
                  className="w-11 h-11 rounded-full bg-cover bg-center border-2 border-[var(--color-gold)] shrink-0"
                  style={{ backgroundImage: `url('${s.avatar}')` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[var(--color-navy)]">
                    {s.name[locale]}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)]">
                    {s.className[locale]}
                  </div>
                </div>
                <div className="num text-xl font-bold text-[var(--color-gold)]">
                  {s.score}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
