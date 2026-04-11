"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, BookOpen, Camera, TrendingUp, Clock, Calendar, ArrowRight } from "lucide-react";

const stats = [
  { label: "Total Students", value: "128", icon: Users, color: "#4A90E2", sub: "Across 5 classes" },
  { label: "Classes Today", value: "4", icon: Calendar, color: "#C19A4B", sub: "Next at 10:30 AM" },
  { label: "Avg. Class Grade", value: "87%", icon: TrendingUp, color: "#2D8659", sub: "+2% vs last term" },
  { label: "Pending Reviews", value: "12", icon: BookOpen, color: "#0F2C5C", sub: "Assignments to grade" },
];

const todayClasses = [
  { time: "08:15 - 09:00", grade: "Grade 10-A", subject: "Algebra II", room: "Math Lab 3", status: "completed" },
  { time: "09:15 - 10:00", grade: "Grade 8-B", subject: "Geometry", room: "Room 204", status: "completed" },
  { time: "10:30 - 11:15", grade: "Grade 9-A", subject: "Calculus Prep", room: "Math Lab 1", status: "current" },
  { time: "12:00 - 12:45", grade: "Grade 11 IB", subject: "HL Mathematics", room: "Room 301", status: "upcoming" },
];

const recentActivity = [
  { type: "Assignment", text: "Grade 10-A submitted Algebra Worksheet 12", time: "15 min ago" },
  { type: "Attendance", text: "Smart attendance complete for Grade 8-B", time: "1 h ago" },
  { type: "Grade", text: "Published grades for Chapter 6 test (Grade 9-A)", time: "2 h ago" },
  { type: "Message", text: "New message from Rania Al-Masri (Parent)", time: "3 h ago" },
];

export default function TeacherDashboard() {
  return (
    <div className="p-6 lg:p-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="section-label mb-3">Good morning, Dr. Wilson</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Today&apos;s Overview</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">Tuesday, April 11, 2026 · 4 classes scheduled</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white p-6 border border-[var(--color-border)]">
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: s.color }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              </div>
              <div className="font-serif text-4xl font-bold text-[var(--color-navy)] mb-1">{s.value}</div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-ink)] mb-1">{s.label}</div>
              <div className="text-xs text-[var(--color-ink-soft)]">{s.sub}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's classes */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Today&apos;s Classes</h3>
            <Link href="/portal/teacher/schedule" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] flex items-center gap-1">
              View Schedule <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div>
            {todayClasses.map((c, i) => (
              <div key={c.time} className={`p-5 flex items-center gap-5 ${i < todayClasses.length - 1 ? "border-b border-[var(--color-border-soft)]" : ""} ${c.status === "current" ? "bg-[var(--color-gold)]/5 border-s-4 border-s-[var(--color-gold)]" : ""}`}>
                <div className="text-center shrink-0">
                  <div className="font-serif text-lg font-bold text-[var(--color-navy)]">{c.time.split(" - ")[0]}</div>
                  <div className="text-[10px] text-[var(--color-ink-soft)]">{c.time.split(" - ")[1]}</div>
                </div>
                <div className="w-px h-12 bg-[var(--color-border)]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[var(--color-navy)]">{c.subject}</span>
                    {c.status === "current" && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-gold)] text-white text-[9px] font-bold uppercase tracking-wider"><span className="w-1 h-1 rounded-full bg-white animate-pulse" /> Live</span>}
                    {c.status === "completed" && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold uppercase tracking-wider">Done</span>}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)]">{c.grade} · {c.room}</div>
                </div>
                {c.status === "current" && (
                  <button className="btn-primary !py-2 !px-4 text-[10px]">
                    Open Class
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="p-4 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)] mb-1">{a.type}</div>
                <div className="text-sm text-[var(--color-navy)] mb-1">{a.text}</div>
                <div className="text-[10px] text-[var(--color-ink-soft)]">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Smart Attendance", icon: Camera, href: "/portal/teacher/attendance" },
          { label: "Open Gradebook", icon: BookOpen, href: "/portal/teacher/gradebook" },
          { label: "New Assignment", icon: ClipboardIcon, href: "/portal/teacher/assignments" },
          { label: "View Students", icon: Users, href: "/portal/teacher/classes" },
        ].slice(0, 4).map((a) => {
          const Icon = a.icon === ClipboardIcon ? BookOpen : a.icon;
          return (
            <Link key={a.label} href={a.href} className="p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <span className="font-semibold text-sm text-[var(--color-navy)]">{a.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Placeholder to avoid import issue
const ClipboardIcon = BookOpen;
