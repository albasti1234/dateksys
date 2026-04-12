"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  BookOpen,
  Calendar,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const enrollmentData = [
  { year: { ar: "٢٠٢١", en: "2021" }, label: "2021", count: 320 },
  { year: { ar: "٢٠٢٢", en: "2022" }, label: "2022", count: 358 },
  { year: { ar: "٢٠٢٣", en: "2023" }, label: "2023", count: 392 },
  { year: { ar: "٢٠٢٤", en: "2024" }, label: "2024", count: 415 },
  { year: { ar: "٢٠٢٥", en: "2025" }, label: "2025", count: 438 },
  { year: { ar: "٢٠٢٦", en: "2026" }, label: "2026", count: 462 },
];

const attendanceData = [
  { month: { ar: "أيلول", en: "Sep" }, pct: 97 },
  { month: { ar: "تشرين أول", en: "Oct" }, pct: 96 },
  { month: { ar: "تشرين ثاني", en: "Nov" }, pct: 95 },
  { month: { ar: "كانون أول", en: "Dec" }, pct: 93 },
  { month: { ar: "كانون ثاني", en: "Jan" }, pct: 94 },
  { month: { ar: "شباط", en: "Feb" }, pct: 96 },
  { month: { ar: "آذار", en: "Mar" }, pct: 95 },
  { month: { ar: "نيسان", en: "Apr" }, pct: 97 },
];

const gradePerformance = [
  { grade: { ar: "الروضة", en: "KG" }, avg: 94, color: "#4A90E2" },
  { grade: { ar: "الأول - الثالث", en: "1st-3rd" }, avg: 91, color: "#2D8659" },
  { grade: { ar: "الرابع - السادس", en: "4th-6th" }, avg: 88, color: "#C19A4B" },
  { grade: { ar: "السابع - التاسع", en: "7th-9th" }, avg: 85, color: "#0F2C5C" },
  { grade: { ar: "العاشر - الثاني عشر", en: "10th-12th" }, avg: 87, color: "#8B5CF6" },
];

const genderData = {
  male: { count: 238, pct: 51.5 },
  female: { count: 224, pct: 48.5 },
};

const nationalityData = [
  { label: { ar: "أردني", en: "Jordanian" }, pct: 72, color: "#0F2C5C" },
  { label: { ar: "فلسطيني", en: "Palestinian" }, pct: 12, color: "#2D8659" },
  { label: { ar: "سوري", en: "Syrian" }, pct: 8, color: "#C19A4B" },
  { label: { ar: "لبناني", en: "Lebanese" }, pct: 4, color: "#4A90E2" },
  { label: { ar: "جنسيات أخرى", en: "Other" }, pct: 4, color: "#8B5CF6" },
];

export default function AdminAnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [activeTab, setActiveTab] = useState<"enrollment" | "attendance" | "performance">("enrollment");

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "التحليلات والإحصائيات", en: "Analytics & Statistics" },
    subtitle: { ar: "نظرة تحليلية شاملة على أداء الأكاديمية", en: "Comprehensive overview of academy performance" },
    kpis: {
      totalStudents: { ar: "إجمالي الطلبة", en: "Total Students" },
      attendanceRate: { ar: "معدّل الحضور", en: "Attendance Rate" },
      avgGPA: { ar: "متوسط المعدّل", en: "Average GPA" },
      growthRate: { ar: "معدّل النمو", en: "Growth Rate" },
    },
    tabs: {
      enrollment: { ar: "التسجيل", en: "Enrollment" },
      attendance: { ar: "الحضور", en: "Attendance" },
      performance: { ar: "الأداء الأكاديمي", en: "Performance" },
    },
    enrollment: { ar: "نمو التسجيل عبر السنوات", en: "Enrollment Growth Over Years" },
    attendance: { ar: "معدّلات الحضور الشهرية", en: "Monthly Attendance Rates" },
    performance: { ar: "الأداء حسب المرحلة الدراسية", en: "Performance by Grade Level" },
    gender: { ar: "التوزيع حسب الجنس", en: "Gender Distribution" },
    male: { ar: "ذكور", en: "Male" },
    female: { ar: "إناث", en: "Female" },
    nationality: { ar: "التوزيع حسب الجنسية", en: "Nationality Distribution" },
    students: { ar: "طالب/ة", en: "students" },
  };

  const maxEnrollment = Math.max(...enrollmentData.map((d) => d.count));

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label={T.kpis.totalStudents[locale]} value="462" color="#0F2C5C" icon={Users} locale={locale} />
        <StatCard label={T.kpis.attendanceRate[locale]} value="95.4%" color="#2D8659" icon={Calendar} locale={locale} />
        <StatCard label={T.kpis.avgGPA[locale]} value="89.2" color="#C19A4B" icon={BookOpen} locale={locale} />
        <StatCard label={T.kpis.growthRate[locale]} value="+5.5%" color="#4A90E2" icon={TrendingUp} locale={locale} trend />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["enrollment", "attendance", "performance"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
              activeTab === tab
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
            }`}
          >
            {T.tabs[tab][locale]}
          </button>
        ))}
      </div>

      {/* Main chart area */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)] p-6">
          <h3 className={`${cardTitleClass} mb-6`}>
            {activeTab === "enrollment" && T.enrollment[locale]}
            {activeTab === "attendance" && T.attendance[locale]}
            {activeTab === "performance" && T.performance[locale]}
          </h3>

          {activeTab === "enrollment" && (
            <div className="space-y-4">
              {enrollmentData.map((d, i) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{d.year[locale]}</span>
                    <span className={`text-lg font-bold text-[var(--color-navy)] num ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                      {d.count} {T.students[locale]}
                    </span>
                  </div>
                  <div className="h-3 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.count / maxEnrollment) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[#0F2C5C]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="flex items-end gap-3 h-64">
              {attendanceData.map((d, i) => (
                <div key={d.month.en} className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-bold text-[var(--color-navy)] mb-2 num">{d.pct}%</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${((d.pct - 90) / 10) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full bg-[#2D8659] min-h-[4px]"
                  />
                  <span className="text-[10px] text-[var(--color-ink-soft)] mt-2 text-center">{d.month[locale]}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-5">
              {gradePerformance.map((d, i) => (
                <div key={d.grade.en}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{d.grade[locale]}</span>
                    <span className={`text-lg font-bold text-[var(--color-navy)] num ${isRTL ? "font-arabic-display" : "font-serif"}`}>{d.avg}%</span>
                  </div>
                  <div className="h-3 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.avg}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                      style={{ background: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side panels */}
        <div className="space-y-6">
          {/* Gender distribution */}
          <div className="bg-white border border-[var(--color-border)] p-6">
            <h3 className={`${cardTitleClass} mb-6`}>{T.gender[locale]}</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 text-center">
                <div className={`text-3xl font-bold text-[var(--color-navy)] mb-1 num ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                  {genderData.male.count}
                </div>
                <div className="text-xs font-semibold text-[var(--color-ink-soft)]">{T.male[locale]}</div>
              </div>
              <div className="w-px bg-[var(--color-border)]" />
              <div className="flex-1 text-center">
                <div className={`text-3xl font-bold text-[var(--color-navy)] mb-1 num ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                  {genderData.female.count}
                </div>
                <div className="text-xs font-semibold text-[var(--color-ink-soft)]">{T.female[locale]}</div>
              </div>
            </div>
            <div className="h-4 bg-[var(--color-cream)] overflow-hidden flex">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${genderData.male.pct}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-[#0F2C5C]"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${genderData.female.pct}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-[#C19A4B]"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-[var(--color-ink-soft)] num">{genderData.male.pct}%</span>
              <span className="text-[10px] text-[var(--color-ink-soft)] num">{genderData.female.pct}%</span>
            </div>
          </div>

          {/* Nationality distribution */}
          <div className="bg-white border border-[var(--color-border)] p-6">
            <h3 className={`${cardTitleClass} mb-6`}>{T.nationality[locale]}</h3>
            <div className="space-y-4">
              {nationalityData.map((n) => (
                <div key={n.label.en}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--color-navy)]">{n.label[locale]}</span>
                    <span className="text-sm font-bold num" style={{ color: n.color }}>{n.pct}%</span>
                  </div>
                  <div className="h-2 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${n.pct}%` }}
                      transition={{ duration: 1 }}
                      className="h-full"
                      style={{ background: n.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, color, icon: Icon, locale, trend,
}: {
  label: string; value: string; color: string; icon: typeof Users; locale: Locale; trend?: boolean;
}) {
  const isRTL = locale === "ar";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden"
    >
      <div className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: color }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <Icon className="w-5 h-5" style={{ color }} />
          {trend && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
              <TrendingUp className="w-3 h-3" />
            </span>
          )}
        </div>
        <div className={`text-4xl font-bold text-[var(--color-navy)] mb-1 num ${isRTL ? "font-arabic-display" : "font-serif"}`}>{value}</div>
        <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)]">{label}</div>
      </div>
    </motion.div>
  );
}
