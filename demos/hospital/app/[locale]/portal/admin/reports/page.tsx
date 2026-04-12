"use client";

import { use } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { departments } from "@/lib/data";

const deptPatients = [
  { id: "cardiology", patients: 1250 },
  { id: "orthopedics", patients: 980 },
  { id: "internal-medicine", patients: 1480 },
  { id: "pediatrics", patients: 1120 },
  { id: "obstetrics", patients: 870 },
  { id: "emergency", patients: 2100 },
  { id: "neurology", patients: 620 },
  { id: "radiology", patients: 1800 },
];

const monthlyTrend = [
  { month: { ar: "كانون٢", en: "Jan" }, value: 820 },
  { month: { ar: "شباط", en: "Feb" }, value: 750 },
  { month: { ar: "آذار", en: "Mar" }, value: 910 },
  { month: { ar: "نيسان", en: "Apr" }, value: 880 },
  { month: { ar: "أيار", en: "May" }, value: 960 },
  { month: { ar: "حزيران", en: "Jun" }, value: 1020 },
  { month: { ar: "تموز", en: "Jul" }, value: 1100 },
  { month: { ar: "آب", en: "Aug" }, value: 1050 },
  { month: { ar: "أيلول", en: "Sep" }, value: 930 },
  { month: { ar: "تشرين١", en: "Oct" }, value: 870 },
  { month: { ar: "تشرين٢", en: "Nov" }, value: 810 },
  { month: { ar: "كانون١", en: "Dec" }, value: 780 },
];

const bedOccupancy = [
  { id: "cardiology", pct: 82 },
  { id: "orthopedics", pct: 75 },
  { id: "internal-medicine", pct: 90 },
  { id: "pediatrics", pct: 65 },
  { id: "obstetrics", pct: 70 },
  { id: "emergency", pct: 95 },
  { id: "neurology", pct: 55 },
  { id: "radiology", pct: 40 },
];

export default function AdminReports({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.reports;

  const maxPatients = Math.max(...deptPatients.map((d) => d.patients));
  const maxMonthly = Math.max(...monthlyTrend.map((m) => m.value));

  const occupancyColor = (pct: number) => {
    if (pct >= 85) return "bg-rose";
    if (pct >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="p-5 lg:p-8 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-ink"
      >
        {t.title}
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Patient Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4">
            {t.patientStats}
          </h2>
          <div className="space-y-3">
            {deptPatients.map((dp) => {
              const dept = departments.find((d) => d.id === dp.id);
              return (
                <div key={dp.id} className="flex items-center gap-3">
                  <span className="text-xs text-ink-soft w-28 shrink-0 truncate">
                    {dept?.name[locale]}
                  </span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-navy/80 rounded-full"
                      style={{ width: `${(dp.patients / maxPatients) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-ink w-12 text-end">
                    {dp.patients.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Monthly Patient Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4">
            {locale === "ar" ? "اتجاه المرضى الشهري" : "Monthly Patient Trend"}
          </h2>
          <div className="flex items-end gap-1.5 h-40">
            {monthlyTrend.map((m) => (
              <div key={m.month.en} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-semibold text-ink-muted">
                  {m.value}
                </span>
                <div
                  className="w-full bg-teal/70 rounded-t-sm"
                  style={{ height: `${(m.value / maxMonthly) * 100}%` }}
                />
                <span className="text-[9px] text-ink-muted leading-tight">
                  {m.month[locale]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bed Occupancy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4">
            {locale === "ar" ? "نسبة إشغال الأسرّة" : "Bed Occupancy by Department"}
          </h2>
          <div className="space-y-3">
            {bedOccupancy.map((bo) => {
              const dept = departments.find((d) => d.id === bo.id);
              return (
                <div key={bo.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-ink-soft">
                      {dept?.name[locale]}
                    </span>
                    <span className="text-xs font-semibold text-ink">{bo.pct}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${occupancyColor(bo.pct)}`}
                      style={{ width: `${bo.pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Gender Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4">
            {locale === "ar" ? "توزيع الجنس" : "Gender Distribution"}
          </h2>
          <div className="flex flex-col items-center gap-4 py-4">
            {/* Split bar */}
            <div className="w-full h-10 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 flex items-center justify-center" style={{ width: "52%" }}>
                <span className="text-white text-xs font-bold">52%</span>
              </div>
              <div className="h-full bg-pink-400 flex items-center justify-center" style={{ width: "48%" }}>
                <span className="text-white text-xs font-bold">48%</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-ink-soft">
                  {locale === "ar" ? "ذكور" : "Male"} (52%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-400" />
                <span className="text-sm text-ink-soft">
                  {locale === "ar" ? "إناث" : "Female"} (48%)
                </span>
              </div>
            </div>

            {/* Additional stats */}
            <div className="grid grid-cols-2 gap-4 w-full mt-2 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-ink">10,220</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {locale === "ar" ? "إجمالي المرضى (سنوي)" : "Total Patients (Annual)"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-ink">42</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {locale === "ar" ? "متوسط العمر" : "Average Age"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
