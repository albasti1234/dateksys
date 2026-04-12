"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Filter } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { departments, doctors } from "@/lib/data";

type ApptStatus = "scheduled" | "in-progress" | "completed";

type MockAppointment = {
  id: string;
  time: string;
  patient: { ar: string; en: string };
  doctorId: string;
  departmentId: string;
  status: ApptStatus;
};

const mockAppts: MockAppointment[] = [
  { id: "A-001", time: "08:00", patient: { ar: "أحمد الخالدي", en: "Ahmad Al-Khalidi" }, doctorId: "dr-ahmad-mansour", departmentId: "cardiology", status: "completed" },
  { id: "A-002", time: "08:30", patient: { ar: "هند الشمايلة", en: "Hind Al-Shamayleh" }, doctorId: "dr-faisal-tarawneh", departmentId: "internal-medicine", status: "completed" },
  { id: "A-003", time: "09:00", patient: { ar: "سمير العبادي", en: "Samir Al-Abadi" }, doctorId: "dr-mahmoud-za3bi", departmentId: "cardiology", status: "completed" },
  { id: "A-004", time: "09:30", patient: { ar: "رنا الزعبي", en: "Rana Al-Zaabi" }, doctorId: "dr-lina-husseini", departmentId: "pediatrics", status: "completed" },
  { id: "A-005", time: "10:00", patient: { ar: "ليلى الحسن", en: "Layla Al-Hassan" }, doctorId: "dr-rania-qasem", departmentId: "obstetrics", status: "in-progress" },
  { id: "A-006", time: "10:15", patient: { ar: "نادية البكري", en: "Nadia Al-Bakri" }, doctorId: "dr-omar-nabulsi", departmentId: "neurology", status: "in-progress" },
  { id: "A-007", time: "10:30", patient: { ar: "ماجد القضاة", en: "Majed Al-Qudah" }, doctorId: "dr-khaled-abu-zeid", departmentId: "orthopedics", status: "scheduled" },
  { id: "A-008", time: "11:00", patient: { ar: "عمر الصالح", en: "Omar Al-Saleh" }, doctorId: "dr-nour-haddad", departmentId: "radiology", status: "scheduled" },
  { id: "A-009", time: "11:30", patient: { ar: "فاطمة العمري", en: "Fatima Al-Omari" }, doctorId: "dr-hala-masri", departmentId: "pediatrics", status: "scheduled" },
  { id: "A-010", time: "12:00", patient: { ar: "خالد الطراونة", en: "Khaled Al-Tarawneh" }, doctorId: "dr-dina-ajlouni", departmentId: "internal-medicine", status: "scheduled" },
  { id: "A-011", time: "13:00", patient: { ar: "سعاد المعاني", en: "Suad Al-Maani" }, doctorId: "dr-yousef-batayneh", departmentId: "orthopedics", status: "scheduled" },
  { id: "A-012", time: "14:00", patient: { ar: "باسل الحوراني", en: "Basel Al-Hourani" }, doctorId: "dr-sara-khatib", departmentId: "emergency", status: "scheduled" },
];

const statusColors: Record<ApptStatus, string> = {
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
  scheduled: "bg-gray-100 text-gray-600 border-gray-200",
};

const statusBorder: Record<ApptStatus, string> = {
  completed: "border-s-emerald-500",
  "in-progress": "border-s-blue-500",
  scheduled: "border-s-gray-300",
};

export default function AdminAppointments({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.appointments;

  const [activeDept, setActiveDept] = useState<string>("all");

  const filtered =
    activeDept === "all"
      ? mockAppts
      : mockAppts.filter((a) => a.departmentId === activeDept);

  const statusLabels: Record<ApptStatus, string> = {
    completed: locale === "ar" ? "مكتمل" : "Completed",
    "in-progress": locale === "ar" ? "جارٍ" : "In Progress",
    scheduled: locale === "ar" ? "مجدول" : "Scheduled",
  };

  const today = new Date().toLocaleDateString(locale === "ar" ? "ar-JO" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-5 lg:p-8 space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-ink"
        >
          {t.title}
        </motion.h1>
        <p className="text-sm text-ink-muted mt-1">{today}</p>
      </div>

      {/* Department Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-ink-muted shrink-0" />
        <button
          onClick={() => setActiveDept("all")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            activeDept === "all"
              ? "bg-navy text-white"
              : "bg-gray-100 text-ink-soft hover:bg-gray-200"
          }`}
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveDept(dept.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              activeDept === dept.id
                ? "bg-navy text-white"
                : "bg-gray-100 text-ink-soft hover:bg-gray-200"
            }`}
          >
            {dept.name[locale]}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      <div className="space-y-3">
        {filtered.map((apt, i) => {
          const doc = doctors.find((d) => d.id === apt.doctorId);
          const dept = departments.find((d) => d.id === apt.departmentId);
          return (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-xl border border-gray-200 border-s-4 ${statusBorder[apt.status]} p-4 flex flex-col sm:flex-row sm:items-center gap-3`}
            >
              <div className="flex items-center gap-2 text-ink-muted shrink-0 w-20">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">{apt.time}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">{apt.patient[locale]}</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {doc?.name[locale]} &middot; {dept?.name[locale]}
                </p>
              </div>

              <span
                className={`self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full shrink-0 ${statusColors[apt.status]}`}
              >
                {statusLabels[apt.status]}
              </span>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-ink-muted text-sm">
            {dict.common.noResults}
          </div>
        )}
      </div>
    </div>
  );
}
