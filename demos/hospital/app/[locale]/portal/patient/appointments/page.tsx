"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useAppointments } from "@/lib/hospitalStore";
import { doctors, departments } from "@/lib/data";

type Tab = "upcoming" | "past" | "cancelled";

export default function AppointmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.appointments;
  const cs = dict.portals.common.status;

  const appointments = useAppointments();
  const [tab, setTab] = useState<Tab>("upcoming");

  const tabs: { key: Tab; label: string }[] = [
    { key: "upcoming", label: p.upcoming },
    { key: "past", label: p.past },
    { key: "cancelled", label: p.cancelled },
  ];

  const tabMap: Record<Tab, string> = {
    upcoming: "upcoming",
    past: "completed",
    cancelled: "cancelled",
  };

  const filtered = appointments.filter((a) => a.status === tabMap[tab]);

  const statusColors: Record<string, string> = {
    upcoming: "#0D9488",
    completed: "#6B7280",
    cancelled: "#EF4444",
  };

  const statusLabels: Record<string, string> = {
    upcoming: cs.upcoming,
    completed: cs.completed,
    cancelled: cs.cancelled,
  };

  return (
    <div className="p-5 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6 flex-wrap gap-4"
      >
        <h1 className="text-2xl font-bold text-ink">{p.title}</h1>
        <Link
          href={`/${locale}/appointments`}
          className="btn-primary text-sm"
        >
          <CalendarPlus className="w-4 h-4" />
          {p.bookNew}
        </Link>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === t.key
                ? "bg-white text-teal shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Appointments list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          {filtered.length > 0 ? (
            filtered.map((appt) => {
              const doc = doctors.find((d) => d.id === appt.doctorId);
              const dept = departments.find((d) => d.id === appt.departmentId);
              return (
                <div
                  key={appt.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ background: statusColors[appt.status] }}
                  >
                    {appt.date.split("-")[2]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                      <span className="font-semibold text-ink">
                        {doc?.name[locale] ?? appt.doctorId}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
                        style={{ background: statusColors[appt.status] }}
                      >
                        {statusLabels[appt.status]}
                      </span>
                    </div>
                    <div className="text-sm text-ink-soft mb-1">
                      {dept?.name[locale]}
                    </div>
                    <div className="text-sm text-ink-muted">
                      {appt.date} &middot; {appt.time}
                    </div>
                    {appt.notes && (
                      <div className="text-xs text-ink-muted mt-2 bg-gray-50 rounded-lg p-2.5">
                        {appt.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-ink-muted">
              {p.noAppointments}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
