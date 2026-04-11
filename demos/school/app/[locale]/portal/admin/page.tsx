"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, CreditCard, TrendingUp, AlertCircle, BookOpen, Activity } from "lucide-react";

const kpis = [
  { label: "Total Students", value: "854", change: "+23", trend: "up", icon: Users, color: "#4A90E2" },
  { label: "Active Faculty", value: "67", change: "+2", trend: "up", icon: GraduationCap, color: "#2D8659" },
  { label: "Revenue (YTD)", value: "5.4M", unit: "JOD", change: "+12%", trend: "up", icon: CreditCard, color: "#C19A4B" },
  { label: "Avg. Attendance", value: "94.2%", change: "+0.8%", trend: "up", icon: Activity, color: "#0F2C5C" },
];

const gradeDistribution = [
  { grade: "KG1-KG2", count: 85, color: "#4A90E2" },
  { grade: "Grades 1-5", count: 280, color: "#2D8659" },
  { grade: "Grades 6-8", count: 195, color: "#C19A4B" },
  { grade: "Grades 9-12", count: 294, color: "#0F2C5C" },
];

const alerts = [
  { severity: "high", title: "15 overdue fee payments", sub: "Total: 31,500 JOD · Requires follow-up", time: "Today" },
  { severity: "medium", title: "Grade 9-A attendance dropping", sub: "Below 90% this week · Investigation needed", time: "2h ago" },
  { severity: "low", title: "Teacher contract renewal", sub: "3 contracts expire next month", time: "1d ago" },
];

const recentEnrollments = [
  { name: "Rania Zahra", grade: "Grade 4", date: "Apr 08", status: "active" },
  { name: "Fadi Al-Rashid", grade: "Grade 7", date: "Apr 07", status: "active" },
  { name: "Layla Mansour", grade: "KG2", date: "Apr 05", status: "pending" },
  { name: "Yazan Haddad", grade: "Grade 10", date: "Apr 03", status: "active" },
  { name: "Sara Nasser", grade: "Grade 1", date: "Apr 02", status: "active" },
];

export default function AdminDashboard() {
  const totalStudents = gradeDistribution.reduce((s, g) => s + g.count, 0);

  return (
    <div className="p-6 lg:p-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="section-label mb-3">School Administration</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Academic Year 2025-2026</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">Real-time overview of school operations</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden">
              <div className="absolute top-0 end-0 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ background: k.color }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: k.color }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
                    <TrendingUp className="w-3 h-3" />
                    {k.change}
                  </span>
                </div>
                <div className="font-serif text-4xl font-bold text-[var(--color-navy)]">
                  {k.value}
                  {k.unit && <span className="text-base text-[var(--color-ink-soft)] ms-1">{k.unit}</span>}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink-soft)] mt-2">{k.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Grade distribution chart */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)] p-6">
          <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-6">Student Distribution</h3>
          <div className="space-y-5">
            {gradeDistribution.map((g) => {
              const pct = (g.count / totalStudents) * 100;
              return (
                <div key={g.grade}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{g.grade}</span>
                    <span className="font-serif text-lg font-bold text-[var(--color-navy)]">{g.count} <span className="text-xs text-[var(--color-ink-soft)]">({pct.toFixed(1)}%)</span></span>
                  </div>
                  <div className="h-3 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                      style={{ background: g.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Alerts</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">{alerts.length} items need attention</p>
          </div>
          <div className="p-4 space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className={`p-4 border-s-4 ${a.severity === "high" ? "border-red-500 bg-red-50" : a.severity === "medium" ? "border-[var(--color-gold)] bg-[var(--color-cream)]" : "border-blue-400 bg-blue-50"}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${a.severity === "high" ? "text-red-600" : a.severity === "medium" ? "text-[var(--color-gold)]" : "text-blue-600"}`} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-navy)]">{a.title}</div>
                    <div className="text-xs text-[var(--color-ink-soft)] mt-1">{a.sub}</div>
                    <div className="text-[10px] text-[var(--color-ink-soft)] mt-1 uppercase tracking-wider">{a.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent enrollments */}
      <div className="bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Recent Enrollments</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">New students this month</p>
          </div>
          <button className="btn-outline !py-2 text-xs">View All</button>
        </div>
        <table className="w-full">
          <thead className="bg-[var(--color-cream)]">
            <tr>
              <th className="text-start p-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Student</th>
              <th className="text-start p-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Grade</th>
              <th className="text-start p-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Date</th>
              <th className="text-start p-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentEnrollments.map((e, i) => (
              <tr key={i} className="border-t border-[var(--color-border-soft)]">
                <td className="p-4 font-semibold text-[var(--color-navy)]">{e.name}</td>
                <td className="p-4 text-sm">{e.grade}</td>
                <td className="p-4 text-sm text-[var(--color-ink-soft)]">{e.date}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${e.status === "active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
