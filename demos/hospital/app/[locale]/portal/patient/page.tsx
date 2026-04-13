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
  ArrowLeft,
  Clock,
  Activity,
  UserCircle,
  FileCheck2,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useAppointments, useMessages, usePrescriptions, useMedicalRecords } from "@/lib/hospitalStore";
import { doctors, departments } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animations";

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
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const appointments = useAppointments();
  const messages = useMessages();
  const prescriptions = usePrescriptions();
  const records = useMedicalRecords();

  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const unread = messages.filter((m) => !m.read && m.direction === "received");
  const activeRx = prescriptions.filter((rx) => rx.status === "active");

  const nextAppt = upcoming.sort((a, b) => a.date.localeCompare(b.date))[0];
  const nextDoctor = nextAppt ? doctors.find((d) => d.id === nextAppt.doctorId) : null;
  const nextDept = nextAppt ? departments.find((d) => d.id === nextAppt.departmentId) : null;

  const recentRecords = [...records].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  const basePath = `/${locale}/portal/patient`;
  const firstName = locale === "ar" ? "فاطمة" : "Fatima";

  const stats = [
    { label: p.upcomingAppointments, value: upcoming.length, icon: CalendarDays, color: "bg-teal-50 text-teal", iconColor: "text-teal" },
    { label: p.unreadMessages, value: unread.length, icon: MessageCircle, color: "bg-blue-50 text-blue-600", iconColor: "text-blue-600" },
    { label: p.activePrescriptions, value: activeRx.length, icon: Pill, color: "bg-emerald-50 text-emerald-600", iconColor: "text-emerald-600" },
  ];

  const quickActions = [
    { label: dict.common.bookAppointment, href: `/${locale}/appointments`, icon: CalendarDays },
    { label: p.recentRecords, href: `${basePath}/records`, icon: FileCheck2 },
    { label: p.unreadMessages, href: `${basePath}/messages`, icon: MessageCircle },
  ];

  const statusMap: Record<string, { label: string; color: string; border: string }> = {
    normal: { label: dict.portals.common.status.normal, color: "bg-emerald-50 text-emerald-700", border: "border-emerald-200" },
    abnormal: { label: dict.portals.common.status.abnormal, color: "bg-rose-50 text-rose-700", border: "border-rose-200" },
    pending: { label: dict.portals.common.status.pending, color: "bg-amber-50 text-amber-700", border: "border-amber-200" },
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-teal to-navy rounded-3xl p-8 lg:p-10 text-white shadow-xl shadow-navy/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none -z-0" />
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm border border-white/10">
             <UserCircle className="w-4 h-4 text-accent" />
             {isRTL ? "بوابة المرضى" : "Patient Portal"}
           </div>
          <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${fontHeading}`}>
            {p.welcome}، {firstName}
          </h1>
          <p className="text-white/80 text-lg">
            {isRTL ? "تم تحديث سجلك الطبي. لديك" : "Your medical record is updated. You have"}{" "}
            <span className="font-bold text-accent">{upcoming.length}</span> {p.upcomingAppointments.toLowerCase()}.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
           <Link href={`/${locale}/appointments`} className="px-6 py-3 bg-white text-navy font-bold rounded-xl hover:bg-accent hover:text-navy transition-all duration-300 shadow-lg flex items-center gap-2">
             <CalendarDays className="w-5 h-5 text-teal" />
             {dict.common.bookAppointment}
           </Link>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gray-50 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="text-3xl font-bold text-navy mb-1">{s.value}</div>
                <div className="text-sm font-medium text-ink-soft">{s.label}</div>
              </div>
              <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center ${s.color}`}>
                <Icon className={`w-7 h-7 ${s.iconColor}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Next appointment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className={`text-xl font-bold text-navy ${fontHeading}`}>{p.upcomingAppointments}</h2>
            <Link
              href={`${basePath}/appointments`}
              className="text-sm font-bold text-teal hover:text-teal-dark flex items-center gap-1.5 transition-colors"
            >
              {dict.common.viewAll} <Arrow className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
            {nextAppt && nextDoctor ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-teal/10 flex flex-col items-center justify-center shrink-0 border border-teal/20 shadow-inner">
                  <span className="text-xl font-bold text-teal">{nextAppt.date.split('-')[2]}</span>
                  <span className="text-xs font-semibold text-teal/70 uppercase tracking-widest">{new Date(nextAppt.date).toLocaleString('en-us', { month: 'short' })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="px-3 py-1 rounded-full bg-accent text-navy text-[10px] font-bold tracking-widest uppercase shadow-sm">
                        {nextDept?.name[locale]}
                     </span>
                     <span className="text-sm font-semibold text-ink-muted flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-teal" /> {nextAppt.time}
                     </span>
                  </div>
                  <div className={`text-2xl font-bold text-navy mb-1 line-clamp-1 ${fontHeading}`}>
                    {nextDoctor.name[locale]}
                  </div>
                  <div className="text-sm text-ink-soft mb-3">
                    {nextDoctor.title[locale]}
                  </div>
                  {nextAppt.notes && (
                    <div className="text-sm text-ink-soft bg-gray-50 border border-gray-100 rounded-xl p-4 italic">
                      "{nextAppt.notes}"
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-ink-muted py-8">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-8 h-8 text-gray-300" />
                </div>
                {p.noUpcoming}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className={`text-xl font-bold text-navy ${fontHeading}`}>{p.recentRecords}</h2>
            <Link
              href={`${basePath}/records`}
              className="text-sm font-bold text-teal hover:text-teal-dark flex items-center gap-1.5 transition-colors"
            >
              {dict.common.viewAll} <Arrow className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-2 flex-1">
            {recentRecords.length > 0 ? (
              <div className="space-y-1">
                {recentRecords.map((rec) => {
                  const doc = doctors.find((d) => d.id === rec.doctorId);
                  const st = statusMap[rec.status];
                  return (
                    <div key={rec.id} className="p-4 hover:bg-gray-50 rounded-2xl transition-colors flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-ink-muted border border-gray-200">
                         <Activity className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center justify-between mb-1">
                           <span className={`font-bold text-base text-navy truncate ${fontHeading}`}>
                             {rec.title[locale]}
                           </span>
                         </div>
                         <div className="text-xs font-semibold text-ink-muted flex items-center justify-between">
                           <span>{doc?.name[locale]}</span>
                           <span>{rec.date}</span>
                         </div>
                      </div>
                      <div className="shrink-0">
                         <span className={`px-2 py-1 text-[10px] font-bold rounded-lg border ${st?.color} ${st?.border}`}>
                           {st?.label}
                         </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-ink-muted">
                {dict.portals.patient.records.noRecords}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className={`text-xl font-bold text-navy mb-6 px-2 ${fontHeading}`}>{p.quickActions}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-full pointer-events-none -z-0 group-hover:scale-125 transition-transform duration-500" />
                <div className="relative z-10 w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
                </div>
                <span className={`relative z-10 font-bold text-lg text-navy group-hover:text-teal transition-colors ${fontHeading}`}>
                  {action.label}
                </span>
                <Arrow className="relative z-10 w-5 h-5 ml-auto text-gray-300 group-hover:text-teal transition-colors rtl:mr-auto rtl:ml-0" />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
