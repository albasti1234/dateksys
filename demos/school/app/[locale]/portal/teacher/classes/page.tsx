"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  GraduationCap,
  X,
  ChevronDown,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type Student = {
  name: { ar: string; en: string };
  avatar: string;
  gpa: string;
  attendance: string;
  email: string;
};

type ClassData = {
  name: { ar: string; en: string };
  subject: { ar: string; en: string };
  room: string;
  schedule: { ar: string; en: string };
  students: Student[];
};

const classes: ClassData[] = [
  {
    name: { ar: "الصف السادس — قسم أ", en: "Grade 6 — Section A" },
    subject: { ar: "الرياضيات", en: "Mathematics" },
    room: "203",
    schedule: {
      ar: "الأحد والثلاثاء · ٨:٠٠ – ٨:٤٥",
      en: "Sun & Tue · 8:00 – 8:45",
    },
    students: [
      { name: { ar: "ليلى الحوراني", en: "Leila Al-Hourani" }, avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80", gpa: "95", attendance: "98%", email: "leila@student.alnakhla.edu.jo" },
      { name: { ar: "يوسف العموش", en: "Yousef Al-Amoush" }, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", gpa: "89", attendance: "96%", email: "yousef@student.alnakhla.edu.jo" },
      { name: { ar: "ميريم شكري", en: "Miriam Shukri" }, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", gpa: "92", attendance: "97%", email: "miriam@student.alnakhla.edu.jo" },
      { name: { ar: "عمر الطراونة", en: "Omar Al-Tarawneh" }, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", gpa: "81", attendance: "94%", email: "omar@student.alnakhla.edu.jo" },
      { name: { ar: "زينة القضاة", en: "Zeina Al-Qudah" }, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", gpa: "92", attendance: "99%", email: "zeina@student.alnakhla.edu.jo" },
    ],
  },
  {
    name: { ar: "الصف السادس — قسم ب", en: "Grade 6 — Section B" },
    subject: { ar: "الرياضيات", en: "Mathematics" },
    room: "203",
    schedule: {
      ar: "الأحد والثلاثاء · ٩:٠٠ – ٩:٤٥",
      en: "Sun & Tue · 9:00 – 9:45",
    },
    students: [
      { name: { ar: "محمد السعيدي", en: "Mohammad Al-Saeedi" }, avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80", gpa: "87", attendance: "93%", email: "mohammad@student.alnakhla.edu.jo" },
      { name: { ar: "نور الحوراني", en: "Nour Al-Hourani" }, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", gpa: "94", attendance: "97%", email: "nour@student.alnakhla.edu.jo" },
      { name: { ar: "سامر المومني", en: "Samer Al-Momani" }, avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80", gpa: "83", attendance: "95%", email: "samer@student.alnakhla.edu.jo" },
    ],
  },
  {
    name: { ar: "الصف الثامن — قسم أ", en: "Grade 8 — Section A" },
    subject: { ar: "الجبر", en: "Algebra" },
    room: "301",
    schedule: {
      ar: "الاثنين والأربعاء · ١١:١٥ – ١٢:٠٠",
      en: "Mon & Wed · 11:15 – 12:00",
    },
    students: [
      { name: { ar: "كريم بدر", en: "Karim Badr" }, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", gpa: "90", attendance: "95%", email: "karim@student.alnakhla.edu.jo" },
      { name: { ar: "رانيا عبيدات", en: "Rania Ubaidat" }, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", gpa: "88", attendance: "97%", email: "rania@student.alnakhla.edu.jo" },
      { name: { ar: "فارس الحوراني", en: "Fares Al-Hourani" }, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", gpa: "85", attendance: "93%", email: "fares@student.alnakhla.edu.jo" },
      { name: { ar: "دانا المومني", en: "Dana Al-Momani" }, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", gpa: "91", attendance: "98%", email: "dana@student.alnakhla.edu.jo" },
    ],
  },
  {
    name: { ar: "الصف الخامس — قسم ج", en: "Grade 5 — Section C" },
    subject: { ar: "المهارات الحسابية", en: "Numeracy" },
    room: "105",
    schedule: {
      ar: "الأحد والخميس · ١:٣٠ – ٢:١٥",
      en: "Sun & Thu · 1:30 – 2:15",
    },
    students: [
      { name: { ar: "لمى الزعبي", en: "Lama Al-Zoubi" }, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", gpa: "93", attendance: "99%", email: "lama@student.alnakhla.edu.jo" },
      { name: { ar: "أحمد حدّاد", en: "Ahmad Haddad" }, avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80", gpa: "86", attendance: "96%", email: "ahmad@student.alnakhla.edu.jo" },
      { name: { ar: "سارة النابلسي", en: "Sara Al-Nabulsi" }, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", gpa: "91", attendance: "98%", email: "sara@student.alnakhla.edu.jo" },
    ],
  },
];

export default function TeacherClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [expandedClass, setExpandedClass] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "صفوفي", en: "My Classes" },
    subtitle: {
      ar: `${classes.length} صفوف · ${classes.reduce((s, c) => s + c.students.length, 0)} طالب وطالبة`,
      en: `${classes.length} classes · ${classes.reduce((s, c) => s + c.students.length, 0)} students`,
    },
    room: { ar: "قاعة", en: "Room" },
    schedule: { ar: "الجدول", en: "Schedule" },
    students: { ar: "الطلبة", en: "Students" },
    gpa: { ar: "المعدّل", en: "GPA" },
    attendance: { ar: "الحضور", en: "Attendance" },
    contact: { ar: "تواصل", en: "Contact" },
    profile: { ar: "ملف الطالب", en: "Student Profile" },
  };

  const totalStudents = classes.reduce((s, c) => s + c.students.length, 0);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: locale === "ar" ? "إجمالي الصفوف" : "Total Classes", value: classes.length, color: "#0F2C5C" },
          { label: locale === "ar" ? "إجمالي الطلبة" : "Total Students", value: totalStudents, color: "#C19A4B" },
          { label: locale === "ar" ? "متوسط الحجم" : "Avg. Class Size", value: Math.round(totalStudents / classes.length), color: "#4A90E2" },
          { label: locale === "ar" ? "نسبة الحضور" : "Avg. Attendance", value: "96%", color: "#2D8659" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden">
            <div className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: s.color }} />
            <div className={`text-4xl font-bold text-[var(--color-navy)] mb-1 ${isRTL ? "font-arabic-display" : "font-serif"}`}>
              {s.value}
            </div>
            <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Class cards */}
      <div className="space-y-4">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-white border border-[var(--color-border)] overflow-hidden">
            {/* Header — always visible */}
            <button
              onClick={() => setExpandedClass(expandedClass === idx ? -1 : idx)}
              className="w-full flex items-center gap-5 p-6 text-start hover:bg-[var(--color-cream)]/50 transition-colors"
            >
              <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={cardTitleClass}>{cls.name[locale]}</h3>
                <div className="flex items-center gap-3 text-xs text-[var(--color-ink-soft)] mt-1 flex-wrap">
                  <span className="font-semibold text-[var(--color-gold)]">{cls.subject[locale]}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                  <span>{T.room[locale]} {cls.room}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                  <span>{cls.schedule[locale]}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-cream)] text-xs font-semibold text-[var(--color-navy)]">
                  <Users className="w-3.5 h-3.5" />
                  {cls.students.length}
                </div>
                <ChevronDown className={`w-5 h-5 text-[var(--color-ink-soft)] transition-transform ${expandedClass === idx ? "rotate-180" : ""}`} />
              </div>
            </button>

            {/* Student list — expandable */}
            <AnimatePresence>
              {expandedClass === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--color-border)]">
                    <div className="p-4 bg-[var(--color-cream)] text-xs font-bold tracking-wider text-[var(--color-ink-soft)] flex items-center gap-4">
                      <span className="flex-1">{T.students[locale]}</span>
                      <span className="w-16 text-center">{T.gpa[locale]}</span>
                      <span className="w-20 text-center">{T.attendance[locale]}</span>
                      <span className="w-20 text-center">{T.contact[locale]}</span>
                    </div>
                    {cls.students.map((s, si) => (
                      <div
                        key={si}
                        className="flex items-center gap-4 px-4 py-3.5 border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className="w-9 h-9 rounded-full bg-cover bg-center border-2 border-[var(--color-border)] shrink-0"
                            style={{ backgroundImage: `url('${s.avatar}')` }}
                          />
                          <span className="font-semibold text-sm text-[var(--color-navy)] truncate">
                            {s.name[locale]}
                          </span>
                        </div>
                        <span className="w-16 text-center font-serif font-bold text-[var(--color-navy)] num">
                          {s.gpa}
                        </span>
                        <span className="w-20 text-center text-sm num">
                          {s.attendance}
                        </span>
                        <div className="w-20 flex items-center justify-center gap-2">
                          <a
                            href={`mailto:${s.email}`}
                            className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors"
                            aria-label="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors"
                            aria-label={T.profile[locale]}
                          >
                            <Users className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Student profile modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md shadow-2xl"
            >
              <div className="bg-[var(--color-navy)] text-white p-8 relative overflow-hidden text-center">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="absolute top-4 end-4 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div
                  className="w-20 h-20 rounded-full bg-cover bg-center border-4 border-[var(--color-gold)] mx-auto mb-4"
                  style={{ backgroundImage: `url('${selectedStudent.avatar}')` }}
                />
                <h3 className={`text-2xl font-bold ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                  {selectedStudent.name[locale]}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[var(--color-cream)] p-4 text-center">
                    <div className="text-[10px] text-[var(--color-ink-soft)] mb-1">{T.gpa[locale]}</div>
                    <div className={`text-3xl font-bold text-[var(--color-navy)] num ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                      {selectedStudent.gpa}
                    </div>
                  </div>
                  <div className="bg-[var(--color-cream)] p-4 text-center">
                    <div className="text-[10px] text-[var(--color-ink-soft)] mb-1">{T.attendance[locale]}</div>
                    <div className={`text-3xl font-bold text-[var(--color-navy)] num ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                      {selectedStudent.attendance}
                    </div>
                  </div>
                </div>
                <a
                  href={`mailto:${selectedStudent.email}`}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-[var(--color-cream)] hover:bg-[var(--color-navy)] hover:text-white transition-colors text-sm font-semibold text-[var(--color-navy)]"
                >
                  <Mail className="w-4 h-4" />
                  {selectedStudent.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
