"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Trophy, Flame, Clock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Current GPA", value: "3.8", sub: "/ 4.0", icon: Trophy, color: "#C19A4B" },
  { label: "Streak", value: "12", sub: "days", icon: Flame, color: "#DC2626" },
  { label: "Homework", value: "4", sub: "due", icon: BookOpen, color: "#4A90E2" },
  { label: "Rank", value: "3rd", sub: "/ 28", icon: Trophy, color: "#2D8659" },
];

const homework = [
  { subject: "Mathematics", task: "Complete Algebra exercises 5.1-5.4", due: "Tomorrow", priority: "high" },
  { subject: "English", task: "Read chapters 8-10 and answer questions", due: "Apr 14", priority: "medium" },
  { subject: "Science", task: "Lab report on photosynthesis experiment", due: "Apr 15", priority: "high" },
  { subject: "Arabic", task: "Write 500-word essay on cultural heritage", due: "Apr 17", priority: "low" },
];

const todaySchedule = [
  { time: "08:15", subject: "Mathematics", room: "Room 204", teacher: "Dr. Wilson", done: true },
  { time: "09:15", subject: "English", room: "Room 301", teacher: "Ms. Haddad", done: true },
  { time: "10:30", subject: "Science", room: "Lab 2", teacher: "Mr. Chen", done: false, current: true },
  { time: "12:00", subject: "Arabic", room: "Room 105", teacher: "Dr. Saleh", done: false },
  { time: "13:00", subject: "History", room: "Room 208", teacher: "Dr. Qasim", done: false },
];

const badges = [
  { name: "Math Whiz", desc: "Scored 95+ in 5 tests", icon: "🏆", unlocked: true },
  { name: "Early Bird", desc: "Perfect attendance", icon: "🌅", unlocked: true },
  { name: "Bookworm", desc: "Read 10 library books", icon: "📚", unlocked: true },
  { name: "Scientist", desc: "Win science fair", icon: "🔬", unlocked: false },
];

export default function StudentDashboard() {
  return (
    <div className="p-6 lg:p-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-gold)] mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Hi Leila 👋</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Let&apos;s make today count</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">Tuesday, April 11, 2026 · You have 4 homework assignments due soon</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden">
              <div className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: s.color }} />
              <div className="relative">
                <Icon className="w-5 h-5 mb-3" style={{ color: s.color }} />
                <div className="font-serif text-4xl font-bold text-[var(--color-navy)]">{s.value}<span className="text-base text-[var(--color-ink-soft)]"> {s.sub}</span></div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-ink-soft)] mt-1">{s.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today schedule */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Today&apos;s Schedule</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">5 classes today · Next up: Science</p>
          </div>
          <div>
            {todaySchedule.map((c, i) => (
              <div key={c.time} className={`p-5 flex items-center gap-5 ${i < todaySchedule.length - 1 ? "border-b border-[var(--color-border-soft)]" : ""} ${c.current ? "bg-[var(--color-gold)]/5 border-s-4 border-s-[var(--color-gold)]" : ""}`}>
                <div className="w-14 h-14 flex flex-col items-center justify-center shrink-0 bg-[var(--color-cream)]">
                  <div className="font-serif text-sm font-bold text-[var(--color-navy)]">{c.time}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[var(--color-navy)]">{c.subject}</span>
                    {c.current && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-gold)] text-white text-[9px] font-bold uppercase tracking-wider">Now</span>}
                    {c.done && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)]">{c.room} · {c.teacher}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Achievements</h3>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">3 of 12 unlocked</p>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div key={b.name} className={`p-4 text-center border border-[var(--color-border)] ${b.unlocked ? "bg-[var(--color-cream)]" : "opacity-40"}`}>
                <div className="text-4xl mb-2">{b.icon}</div>
                <div className="text-xs font-bold text-[var(--color-navy)]">{b.name}</div>
                <div className="text-[10px] text-[var(--color-ink-soft)] mt-1">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homework */}
      <div className="mt-8 bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Homework Due</h3>
          <Link href="/portal/student/homework" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div>
          {homework.map((h, i) => (
            <div key={i} className={`p-5 flex items-center gap-5 ${i < homework.length - 1 ? "border-b border-[var(--color-border-soft)]" : ""}`}>
              <div className={`w-1 h-12 ${h.priority === "high" ? "bg-red-500" : h.priority === "medium" ? "bg-[var(--color-gold)]" : "bg-[var(--color-border)]"}`} />
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] mb-1">{h.subject}</div>
                <div className="text-sm font-semibold text-[var(--color-navy)]">{h.task}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] shrink-0">
                <Clock className="w-3 h-3" />
                Due {h.due}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
