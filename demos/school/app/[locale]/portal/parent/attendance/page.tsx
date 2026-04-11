"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";

const summary = [
  { label: "Present", value: 142, icon: CheckCircle2, color: "#2D8659" },
  { label: "Absent", value: 3, icon: XCircle, color: "#DC2626" },
  { label: "Late", value: 2, icon: Clock, color: "#C19A4B" },
  { label: "Excused", value: 1, icon: AlertTriangle, color: "#4A90E2" },
];

// Generate calendar for current month
const days = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["present", "present", "present", "present", "present", "present", "present", "absent", "late", "present", "present", "weekend", "weekend"];
  return { day: i + 1, status: statuses[i % statuses.length] };
});

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  present: { bg: "#2D8659", text: "white", label: "P" },
  absent: { bg: "#DC2626", text: "white", label: "A" },
  late: { bg: "#C19A4B", text: "white", label: "L" },
  excused: { bg: "#4A90E2", text: "white", label: "E" },
  weekend: { bg: "#F3EFE6", text: "#6B7280", label: "—" },
};

export default function AttendancePage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">Attendance Record</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">This Academic Year</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">Track your child&apos;s daily attendance and absences</p>
      </div>

      {/* Overall percentage */}
      <div className="bg-[var(--color-navy)] text-white p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10" style={{ background: "#C19A4B" }} />
        <div className="relative grid md:grid-cols-3 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-2">Overall Attendance</p>
            <div className="font-serif text-7xl font-bold gold-text">96%</div>
            <p className="text-sm text-white/60 mt-2">Excellent standing · Top 10% of class</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {summary.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/5 p-5 flex items-center gap-4">
                  <Icon className="w-8 h-8" style={{ color: s.color }} />
                  <div>
                    <div className="font-serif text-3xl font-bold">{s.value}</div>
                    <div className="text-xs uppercase tracking-wider text-white/60">{s.label} days</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Month calendar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[var(--color-border)] p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">April 2026</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {Object.entries(statusStyles).filter(([k]) => k !== "weekend").map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ background: v.bg }} />
                <span className="capitalize text-[var(--color-ink-soft)]">{k}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)] py-2">{d}</div>
          ))}
          {days.map((d) => {
            const st = statusStyles[d.status];
            return (
              <div key={d.day} className="aspect-square flex flex-col items-center justify-center text-sm font-semibold" style={{ background: st.bg, color: st.text }}>
                <div className="text-base">{d.day}</div>
                <div className="text-[9px] opacity-75">{st.label}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Absence details */}
      <div className="mt-8 bg-white border border-[var(--color-border)] p-6">
        <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-4">Recent Absences & Notes</h3>
        <div className="space-y-3">
          {[
            { date: "Apr 3, 2026", status: "Absent", reason: "Sick leave — medical certificate provided", type: "absent" },
            { date: "Mar 28, 2026", status: "Late", reason: "Arrived at 8:25 AM (traffic)", type: "late" },
            { date: "Mar 18, 2026", status: "Excused", reason: "Family event — pre-approved", type: "excused" },
          ].map((a) => (
            <div key={a.date} className="flex items-center gap-4 p-4 bg-[var(--color-cream)] border-s-4" style={{ borderColor: statusStyles[a.type].bg }}>
              <div>
                <div className="font-semibold text-[var(--color-navy)]">{a.date}</div>
                <div className="text-xs text-[var(--color-ink-soft)]">{a.reason}</div>
              </div>
              <span className="ms-auto px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: statusStyles[a.type].bg }}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
