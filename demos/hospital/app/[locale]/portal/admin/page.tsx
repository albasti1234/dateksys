"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  DollarSign,
  BedDouble,
  Clock,
  Stethoscope,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { departments, doctors } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
};

const weeklyData = [
  { day: "Mon", dayAr: "اثن", value: 28 },
  { day: "Tue", dayAr: "ثلا", value: 35 },
  { day: "Wed", dayAr: "أرب", value: 42 },
  { day: "Thu", dayAr: "خمي", value: 31 },
  { day: "Fri", dayAr: "جمع", value: 12 },
];

const todayAppointments = [
  { time: "08:30", patient: { ar: "أحمد الخالدي", en: "Ahmad Al-Khalidi" }, doctorId: "dr-ahmad-mansour", dept: "cardiology", status: "completed" },
  { time: "09:00", patient: { ar: "سمير العبادي", en: "Samir Al-Abadi" }, doctorId: "dr-faisal-tarawneh", dept: "internal-medicine", status: "completed" },
  { time: "10:15", patient: { ar: "ليلى الحسن", en: "Layla Al-Hassan" }, doctorId: "dr-rania-qasem", dept: "obstetrics", status: "in-progress" },
  { time: "11:00", patient: { ar: "عمر الصالح", en: "Omar Al-Saleh" }, doctorId: "dr-khaled-abu-zeid", dept: "orthopedics", status: "scheduled" },
  { time: "11:30", patient: { ar: "نادية البكري", en: "Nadia Al-Bakri" }, doctorId: "dr-lina-husseini", dept: "pediatrics", status: "scheduled" },
];

const deptPerformance = [
  { id: "cardiology", patients: 145 },
  { id: "orthopedics", patients: 120 },
  { id: "internal-medicine", patients: 165 },
  { id: "pediatrics", patients: 110 },
  { id: "obstetrics", patients: 95 },
  { id: "emergency", patients: 200 },
  { id: "neurology", patients: 75 },
  { id: "radiology", patients: 180 },
];

export default function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.dashboard;

  const maxPatients = Math.max(...deptPerformance.map((d) => d.patients));
  const maxWeekly = Math.max(...weeklyData.map((d) => d.value));

  const kpis = [
    {
      label: t.totalPatients,
      value: "47",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      label: t.todayAppointments,
      value: "32",
      icon: CalendarDays,
      color: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      label: t.monthlyRevenue,
      value: locale === "ar" ? "125,000 د.أ" : "125,000 JOD",
      icon: DollarSign,
      color: "bg-amber-50 text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      label: t.occupancyRate,
      value: "78%",
      icon: BedDouble,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
  ];

  const statusColors: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-700",
    "in-progress": "bg-blue-100 text-blue-700",
    scheduled: "bg-gray-100 text-gray-600",
  };

  const statusLabels: Record<string, Record<string, string>> = {
    completed: { ar: "مكتمل", en: "Completed" },
    "in-progress": { ar: "جارٍ", en: "In Progress" },
    scheduled: { ar: "مجدول", en: "Scheduled" },
  };

  return (
    <div className="p-5 lg:p-8 space-y-6">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-ink"
      >
        {t.title}
      </motion.h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.iconBg}`}>
                <Icon className={`w-6 h-6 ${kpi.color.split(" ")[1]}`} />
              </div>
              <div>
                <p className="text-sm text-ink-muted">{kpi.label}</p>
                <p className="text-xl font-bold text-ink mt-0.5">{kpi.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Appointments Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4">
            {locale === "ar" ? "مواعيد الأسبوع" : "Weekly Appointments"}
          </h2>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-ink-muted">
                  {d.value}
                </span>
                <div
                  className="w-full bg-navy/80 rounded-t-md transition-all"
                  style={{ height: `${(d.value / maxWeekly) * 100}%` }}
                />
                <span className="text-xs text-ink-muted">
                  {locale === "ar" ? d.dayAr : d.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4">
            {t.todayAppointments}
          </h2>
          <div className="space-y-3">
            {todayAppointments.map((apt, i) => {
              const doc = doctors.find((d) => d.id === apt.doctorId);
              const dept = departments.find((d) => d.id === apt.dept);
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-ink-muted shrink-0 w-16">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{apt.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">
                      {apt.patient[locale]}
                    </p>
                    <p className="text-xs text-ink-muted truncate">
                      {doc?.name[locale]} &middot; {dept?.name[locale]}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full shrink-0 ${statusColors[apt.status]}`}
                  >
                    {statusLabels[apt.status][locale]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Department Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border border-gray-200 p-5"
      >
        <h2 className="text-lg font-semibold text-ink mb-4">
          {locale === "ar" ? "أداء الأقسام — عدد المرضى" : "Department Performance — Patient Count"}
        </h2>
        <div className="space-y-3">
          {deptPerformance.map((dp) => {
            const dept = departments.find((d) => d.id === dp.id);
            return (
              <div key={dp.id} className="flex items-center gap-3">
                <span className="text-sm text-ink-soft w-40 shrink-0 truncate">
                  {dept?.name[locale]}
                </span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-navy rounded-full transition-all"
                    style={{ width: `${(dp.patients / maxPatients) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-ink w-10 text-end">
                  {dp.patients}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
