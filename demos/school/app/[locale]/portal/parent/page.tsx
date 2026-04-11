"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Calendar,
  BookOpen,
  Bus,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CreditCard,
} from "lucide-react";

// ============================================
// Parent Dashboard — Overview of all children
// ============================================

const child = {
  name: "Leila Al-Masri",
  grade: "Grade 8-B",
  avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
  studentId: "ALN-2024-0847",
};

const overviewStats = [
  { label: "Overall Grade", value: "A-", sub: "92.5%", icon: TrendingUp, color: "#2D8659" },
  { label: "Attendance", value: "96%", sub: "This term", icon: Calendar, color: "#4A90E2" },
  { label: "Homework Done", value: "18/20", sub: "This week", icon: BookOpen, color: "#C19A4B" },
  { label: "On-Time", value: "100%", sub: "Perfect record", icon: Clock, color: "#0F2C5C" },
];

const recentGrades = [
  { subject: "Mathematics", grade: "A", score: "94/100", teacher: "Dr. James Wilson", date: "Mar 28" },
  { subject: "English Literature", grade: "A-", score: "88/100", teacher: "Ms. Lina Haddad", date: "Mar 27" },
  { subject: "Science", grade: "A", score: "91/100", teacher: "Mr. David Chen", date: "Mar 26" },
  { subject: "Arabic", grade: "B+", score: "86/100", teacher: "Dr. Amira Saleh", date: "Mar 25" },
  { subject: "History", grade: "A", score: "93/100", teacher: "Dr. Omar Qasim", date: "Mar 24" },
];

const upcomingEvents = [
  { title: "Parent-Teacher Conference", date: "Apr 15", time: "3:00 PM", type: "Meeting" },
  { title: "Spring Science Fair", date: "Apr 20", time: "10:00 AM", type: "Event" },
  { title: "End of Term 2", date: "Apr 25", time: "All day", type: "Milestone" },
  { title: "Mathematics Test — Algebra", date: "Apr 10", time: "9:00 AM", type: "Test" },
];

export default function ParentDashboard() {
  return (
    <div className="p-6 lg:p-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-gold)] mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Welcome back, Rania</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
          Your daughter&apos;s journey at a glance
        </h1>
      </motion.div>

      {/* Child card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[var(--color-navy)] text-white p-8 mb-8 relative overflow-hidden"
      >
        <div
          className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "#C19A4B" }}
        />
        <div className="absolute top-0 start-0 w-20 h-20 border-t-2 border-s-2 border-[var(--color-gold)] pointer-events-none" />
        <div className="relative flex items-center gap-6 flex-wrap">
          <div
            className="w-24 h-24 rounded-full bg-cover bg-center border-4 shrink-0"
            style={{ backgroundImage: `url('${child.avatar}')`, borderColor: "#C19A4B" }}
          />
          <div className="flex-1 min-w-0">
            <p className="section-label !text-[var(--color-gold)] mb-2">Viewing Profile</p>
            <h2 className="font-serif text-3xl font-bold mb-1">{child.name}</h2>
            <div className="flex items-center gap-3 text-sm text-white/70 flex-wrap">
              <span>{child.grade}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>ID: {child.studentId}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="inline-flex items-center gap-1 text-[var(--color-gold-light)]">
                <CheckCircle2 className="w-3 h-3" /> Good standing
              </span>
            </div>
          </div>
          <button className="btn-gold !bg-[var(--color-gold)] !text-white !border-[var(--color-gold)]">
            View Full Profile <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {overviewStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden group hover:shadow-xl transition-all"
            >
              <div
                className="absolute top-0 end-0 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: stat.color }}
              />
              <div className="relative flex items-start justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: stat.color }}
                />
              </div>
              <div className="relative">
                <div className="font-serif text-4xl font-bold text-[var(--color-navy)] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)] mb-2">{stat.sub}</div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent grades — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Recent Grades</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">Last 5 assessments</p>
            </div>
            <Link href="/portal/parent/grades" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div>
            {recentGrades.map((g, i) => (
              <div key={g.subject} className={`p-5 flex items-center justify-between gap-4 ${i < recentGrades.length - 1 ? "border-b border-[var(--color-border-soft)]" : ""}`}>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className="w-12 h-12 flex items-center justify-center font-serif text-lg font-bold shrink-0"
                    style={{
                      background: g.grade.startsWith("A") ? "#2D8659" : "#C19A4B",
                      color: "white",
                    }}
                  >
                    {g.grade}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[var(--color-navy)] truncate">{g.subject}</div>
                    <div className="text-xs text-[var(--color-ink-soft)] truncate">{g.teacher}</div>
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <div className="font-serif text-lg font-bold text-[var(--color-navy)]">{g.score}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-ink-soft)]">{g.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Upcoming</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">This month</p>
          </div>
          <div className="p-4 space-y-3">
            {upcomingEvents.map((e) => (
              <div key={e.title} className="p-4 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)]">{e.type}</span>
                </div>
                <div className="font-semibold text-sm text-[var(--color-navy)] mb-1">{e.title}</div>
                <div className="text-xs text-[var(--color-ink-soft)] flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {e.date} · {e.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pay Fees", icon: CreditCard, href: "/portal/parent/fees", color: "#C19A4B" },
          { label: "Track Bus", icon: Bus, href: "/portal/parent/bus", color: "#4A90E2" },
          { label: "Messages", icon: MessageSquare, href: "/portal/parent/messages", color: "#2D8659" },
          { label: "AI Helper", icon: Sparkles, href: "/portal/parent/homework", color: "#0F2C5C" },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all flex flex-col items-center text-center group"
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ background: action.color }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-sm text-[var(--color-navy)]">{action.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Notification banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-navy-light)] text-white flex items-center gap-5 flex-wrap"
      >
        <div className="w-12 h-12 bg-[var(--color-gold)] flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-serif text-lg font-bold mb-1">Fees payment due soon</div>
          <p className="text-sm text-white/70">Your Term 3 fees of 2,100 JOD are due on April 15th. Pay online to avoid late charges.</p>
        </div>
        <Link href="/portal/parent/fees" className="btn-gold !border-[var(--color-gold)] !bg-[var(--color-gold)] !text-white">
          Pay Now
        </Link>
      </motion.div>
    </div>
  );
}
