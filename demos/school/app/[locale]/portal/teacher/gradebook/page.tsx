"use client";

import { motion } from "framer-motion";
import { Filter, Download, Plus } from "lucide-react";

const classes = ["Grade 10-A (Algebra)", "Grade 8-B (Geometry)", "Grade 9-A (Calc Prep)", "Grade 11 IB (HL Math)"];

const students = [
  { name: "Ahmad Khalil", id: "ALN-0891", quiz1: 92, midterm: 95, project: 96, quiz2: 93, avg: 94 },
  { name: "Leila Al-Masri", id: "ALN-0847", quiz1: 94, midterm: 95, project: 96, quiz2: 92, avg: 94.25 },
  { name: "Omar Nasser", id: "ALN-0723", quiz1: 78, midterm: 82, project: 85, quiz2: 80, avg: 81.25 },
  { name: "Dana Khouri", id: "ALN-0954", quiz1: 88, midterm: 90, project: 92, quiz2: 89, avg: 89.75 },
  { name: "Karim Haddad", id: "ALN-0612", quiz1: 72, midterm: 75, project: 78, quiz2: 76, avg: 75.25 },
  { name: "Nour Mansour", id: "ALN-0845", quiz1: 85, midterm: 88, project: 87, quiz2: 86, avg: 86.5 },
  { name: "Samir Al-Ali", id: "ALN-0501", quiz1: 68, midterm: 72, project: 75, quiz2: 70, avg: 71.25 },
  { name: "Maya Toukan", id: "ALN-0678", quiz1: 90, midterm: 92, project: 94, quiz2: 91, avg: 91.75 },
];

export default function GradebookPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">Gradebook</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Class Grades</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline !py-2.5 text-xs"><Filter className="w-4 h-4" /> Filters</button>
          <button className="btn-outline !py-2.5 text-xs"><Download className="w-4 h-4" /> Export</button>
          <button className="btn-primary !py-2.5 text-xs"><Plus className="w-4 h-4" /> New Grade</button>
        </div>
      </div>

      {/* Class tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {classes.map((c, i) => (
          <button key={c} className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${i === 0 ? "bg-[var(--color-navy)] text-white" : "bg-white border border-[var(--color-border)]"}`}>{c}</button>
        ))}
      </div>

      {/* Gradebook table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[var(--color-border)] overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[var(--color-navy)] text-white">
            <tr>
              <th className="text-start p-4 text-[10px] font-bold uppercase tracking-wider">Student</th>
              <th className="text-center p-4 text-[10px] font-bold uppercase tracking-wider">Quiz 1<br/>(10%)</th>
              <th className="text-center p-4 text-[10px] font-bold uppercase tracking-wider">Mid-Term<br/>(30%)</th>
              <th className="text-center p-4 text-[10px] font-bold uppercase tracking-wider">Project<br/>(30%)</th>
              <th className="text-center p-4 text-[10px] font-bold uppercase tracking-wider">Quiz 2<br/>(10%)</th>
              <th className="text-center p-4 text-[10px] font-bold uppercase tracking-wider">Average</th>
              <th className="text-center p-4 text-[10px] font-bold uppercase tracking-wider">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const grade = s.avg >= 90 ? "A" : s.avg >= 80 ? "B" : s.avg >= 70 ? "C" : "D";
              const color = s.avg >= 90 ? "#2D8659" : s.avg >= 80 ? "#4A90E2" : s.avg >= 70 ? "#C19A4B" : "#DC2626";
              return (
                <tr key={s.id} className={`border-t border-[var(--color-border-soft)] ${i % 2 === 0 ? "" : "bg-[var(--color-cream)]/50"} hover:bg-[var(--color-cream)]`}>
                  <td className="p-4">
                    <div className="font-semibold text-[var(--color-navy)]">{s.name}</div>
                    <div className="text-[10px] text-[var(--color-ink-soft)] font-mono">{s.id}</div>
                  </td>
                  <td className="p-4 text-center font-serif text-base text-[var(--color-navy)]">{s.quiz1}</td>
                  <td className="p-4 text-center font-serif text-base text-[var(--color-navy)]">{s.midterm}</td>
                  <td className="p-4 text-center font-serif text-base text-[var(--color-navy)]">{s.project}</td>
                  <td className="p-4 text-center font-serif text-base text-[var(--color-navy)]">{s.quiz2}</td>
                  <td className="p-4 text-center font-serif text-xl font-bold text-[var(--color-navy)]">{s.avg.toFixed(1)}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 font-serif text-base font-bold text-white" style={{ background: color }}>{grade}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
