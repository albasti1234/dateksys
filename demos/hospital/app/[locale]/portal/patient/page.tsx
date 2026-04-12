"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MessageCircle,
  Pill,
  FileText,
  ArrowRight,
  Clock,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useAppointments, useMessages, usePrescriptions, useMedicalRecords } from "@/lib/hospitalStore";
import { doctors, departments } from "@/lib/data";

export default function PatientDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.dashboard;
  const isRTL = locale === "ar";

  const appointments = useAppointments();
  const messages = useMessages();
  const prescriptions = usePrescriptions();
  const records = useMedicalRecords();

  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const unread = messages.filter((m) => !m.read && m.direction === "received");
  const activeRx = prescriptions.filter((rx) => rx.status === "active");

  // Next upcoming appointment
  const nextAppt = upcoming.sort((a, b) => a.date.localeCompare(b.date))[0];
  const nextDoctor = nextAppt ? doctors.find((d) => d.id === nextAppt.doctorId) : null;
  const nextDept = nextAppt ? departments.find((d) => d.id === nextAppt.departmentId) : null;

  // Recent records (latest 2)
  const recentRecords = [...records].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

  const basePath = `/${locale}/portal/patient`;
  const firstName = locale === "ar" ? "فاطمة" : "Fatima";

  const stats = [
    { label: p.upcomingAppointments, value: upcoming.length, icon: CalendarDays, color: "#0D9488" },
    { label: p.unreadMessages, value: unread.length, icon: MessageCircle, color: "#2563EB" },
    { label: p.activePrescriptions, value: activeRx.length, icon: Pill, color: "#10B981" },
  ];

  const quickActions = [
    { label: dict.common.bookAppointment, href: `/${locale}/appointments`, icon: CalendarDays },
    { label: p.recentRecords, href: `${basePath}/records`, icon: FileText },
    { label: p.unreadMessages, href: `${basePath}/messages`, icon: MessageCircle },
  ];

  const statusMap: Record<string, { label: string; color: string }> = {
    normal: { label: dict.portals.common.status.normal, color: "#10B981" },
    abnormal: { label: dict.portals.common.status.abnormal, color: "#EF4444" },
    pending: { label: dict.portals.common.status.pending, color: "#F59E0B" },
  };

  return (
    <div className="p-5 lg:p-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-ink">
          {p.welcome}، {firstName}
        </h1>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${s.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-ink">{s.value}</div>
                <div className="text-xs text-ink-soft">{s.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Next appointment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200"
        >
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-ink">{p.upcomingAppointments}</h2>
            <Link
              href={`${basePath}/appointments`}
              className="text-xs font-semibold text-teal hover:text-teal-dark flex items-center gap-1"
            >
              {dict.common.viewAll}
              <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
          <div className="p-5">
            {nextAppt && nextDoctor ? (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink mb-1">
                    {nextDoctor.name[locale]}
                  </div>
                  <div className="text-sm text-ink-soft mb-1">
                    {nextDept?.name[locale]}
                  </div>
                  <div className="text-sm text-ink-muted">
                    {nextAppt.date} &middot; {nextAppt.time}
                  </div>
                  {nextAppt.notes && (
                    <div className="text-xs text-ink-muted mt-2 bg-gray-50 rounded-lg p-3">
                      {nextAppt.notes}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-ink-muted">{p.noUpcoming}</p>
            )}
          </div>
        </motion.div>

        {/* Recent records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-ink">{p.recentRecords}</h2>
            <Link
              href={`${basePath}/records`}
              className="text-xs font-semibold text-teal hover:text-teal-dark flex items-center gap-1"
            >
              {dict.common.viewAll}
              <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentRecords.length > 0 ? (
              recentRecords.map((rec) => {
                const doc = doctors.find((d) => d.id === rec.doctorId);
                const st = statusMap[rec.status];
                return (
                  <div key={rec.id} className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-ink">
                        {rec.title[locale]}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: st?.color }}
                      >
                        {st?.label}
                      </span>
                    </div>
                    <div className="text-xs text-ink-muted">
                      {doc?.name[locale]} &middot; {rec.date}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="p-4 text-sm text-ink-muted">
                {dict.portals.patient.records.noRecords}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="mt-8"
      >
        <h2 className="font-bold text-ink mb-4">{p.quickActions}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="p-5 bg-white rounded-xl border border-gray-200 hover:border-teal hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-lg bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <span className="font-semibold text-sm text-ink">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
