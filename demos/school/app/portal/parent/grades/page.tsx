"use client";

import { motion } from "framer-motion";
import { Download, TrendingUp, Award } from "lucide-react";

const terms = ["Term 1", "Term 2", "Term 3"];

const subjects = [
  { name: "Mathematics", teacher: "Dr. James Wilson", grade: "A", score: 94, trend: "+3", assessments: [{ t: "Quiz 1", s: 92 }, { t: "Mid-Term", s: 95 }, { t: "Project", s: 96 }, { t: "Quiz 2", s: 92 }] },
  { name: "English Literature", teacher: "Ms. Lina Haddad", grade: "A-", score: 88, trend: "+2", assessments: [{ t: "Essay 1", s: 85 }, { t: "Mid-Term", s: 87 }, { t: "Presentation", s: 90 }, { t: "Quiz", s: 88 }] },
  { name: "Science", teacher: "Mr. David Chen", grade: "A", score: 91, trend: "+5", assessments: [{ t: "Lab 1", s: 88 }, { t: "Mid-Term", s: 92 }, { t: "Lab 2", s: 93 }, { t: "Quiz", s: 91 }] },
  { name: "Arabic", teacher: "Dr. Amira Saleh", grade: "B+", score: 86, trend: "+1", assessments: [{ t: "Writing", s: 84 }, { t: "Mid-Term", s: 85 }, { t: "Reading", s: 88 }, { t: "Quiz", s: 87 }] },
  { name: "History", teacher: "Dr. Omar Qasim", grade: "A", score: 93, trend: "+4", assessments: [{ t: "Essay", s: 90 }, { t: "Mid-Term", s: 94 }, { t: "Debate", s: 95 }, { t: "Quiz", s: 93 }] },
  { name: "Physical Education", teacher: "Mr. Youssef Marouf", grade: "A", score: 95, trend: "=", assessments: [{ t: "Skills", s: 95 }, { t: "Fitness", s: 96 }, { t: "Team", s: 94 }, { t: "Final", s: 95 }] },
];

const gpa = ((subjects.reduce((s, x) => s + x.score, 0) / subjects.length)).toFixed(1);

export default function GradesPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">Grades & Reports</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Academic Performance</h1>
        </div>
        <div className="flex gap-2">
          {terms.map((t, i) => (
            <button key={t} className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider ${i === 1 ? "bg-[var(--color-navy)] text-white" : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Overall card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-navy)] text-white p-8 mb-8 grid md:grid-cols-4 gap-6 items-center">
        <div className="md:col-span-1 text-center md:text-start">
          <p className="text-xs uppercase tracking-wider text-[var(--color-gold)] mb-2">Overall GPA</p>
          <div className="font-serif text-6xl font-bold gold-text">{gpa}</div>
          <p className="text-sm text-white/60 mt-1">Out of 100</p>
        </div>
        <div className="md:col-span-3 grid grid-cols-3 gap-6">
          {[
            { label: "Class Rank", value: "3 / 28", icon: Award },
            { label: "Grade Average", value: "87.5", icon: TrendingUp },
            { label: "Subjects Passed", value: "6 / 6", icon: Award },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-white/5 p-5 border-s-2 border-[var(--color-gold)]">
                <Icon className="w-5 h-5 text-[var(--color-gold)] mb-3" />
                <div className="font-serif text-3xl font-bold mb-1">{m.value}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{m.label}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Subjects */}
      <div className="space-y-4">
        {subjects.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-white border border-[var(--color-border)] p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center font-serif text-xl font-bold text-white" style={{ background: s.grade.startsWith("A") ? "#2D8659" : "#C19A4B" }}>{s.grade}</div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">{s.name}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)]">{s.teacher}</p>
                </div>
              </div>
              <div className="text-end">
                <div className="font-serif text-3xl font-bold text-[var(--color-navy)]">{s.score}<span className="text-base text-[var(--color-ink-soft)]">/100</span></div>
                <div className="text-xs text-[var(--color-gold)] font-semibold">{s.trend} vs last term</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-[var(--color-border-soft)]">
              {s.assessments.map((a) => (
                <div key={a.t} className="bg-[var(--color-cream)] p-3 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-ink-soft)] mb-1">{a.t}</div>
                  <div className="font-serif text-xl font-bold text-[var(--color-navy)]">{a.s}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="btn-outline">
          <Download className="w-4 h-4" />
          Download Report Card (PDF)
        </button>
      </div>
    </div>
  );
}
