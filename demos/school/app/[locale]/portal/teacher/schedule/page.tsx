"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Coffee,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type DayKey = "sun" | "mon" | "tue" | "wed" | "thu";

interface TimeSlot {
  time: string;
  subject: { ar: string; en: string };
  className: { ar: string; en: string };
  room: string;
  isBreak?: boolean;
  isCurrent?: boolean;
  students?: number;
}

const schedule: Record<DayKey, TimeSlot[]> = {
  sun: [
    {
      time: "8:00 – 8:45",
      subject: { ar: "رياضيات", en: "Mathematics" },
      className: { ar: "الصف السادس أ", en: "Grade 6-A" },
      room: "203",
      students: 22,
    },
    {
      time: "9:00 – 9:45",
      subject: { ar: "رياضيات", en: "Mathematics" },
      className: { ar: "الصف السادس ب", en: "Grade 6-B" },
      room: "203",
      students: 24,
    },
    {
      time: "9:45 – 10:15",
      subject: { ar: "استراحة", en: "Break" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "10:15 – 11:00",
      subject: { ar: "حصة فراغ", en: "Free Period" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "1:30 – 2:15",
      subject: { ar: "حساب", en: "Numeracy" },
      className: { ar: "الصف الخامس ج", en: "Grade 5-C" },
      room: "105",
      students: 21,
    },
  ],
  mon: [
    {
      time: "8:00 – 8:45",
      subject: { ar: "حصة فراغ", en: "Free Period" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "9:00 – 9:45",
      subject: { ar: "حصة فراغ", en: "Free Period" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "9:45 – 10:15",
      subject: { ar: "استراحة", en: "Break" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "11:15 – 12:00",
      subject: { ar: "جبر", en: "Algebra" },
      className: { ar: "الصف الثامن أ", en: "Grade 8-A" },
      room: "301",
      isCurrent: true,
      students: 20,
    },
  ],
  tue: [
    {
      time: "8:00 – 8:45",
      subject: { ar: "رياضيات", en: "Mathematics" },
      className: { ar: "الصف السادس أ", en: "Grade 6-A" },
      room: "203",
      students: 22,
    },
    {
      time: "9:00 – 9:45",
      subject: { ar: "رياضيات", en: "Mathematics" },
      className: { ar: "الصف السادس ب", en: "Grade 6-B" },
      room: "203",
      students: 24,
    },
    {
      time: "9:45 – 10:15",
      subject: { ar: "استراحة", en: "Break" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "10:15 – 11:00",
      subject: { ar: "اجتماع قسم", en: "Dept. Meeting" },
      className: { ar: "غرفة الاجتماعات", en: "Meeting Room" },
      room: "102",
      isBreak: true,
    },
  ],
  wed: [
    {
      time: "8:00 – 8:45",
      subject: { ar: "حصة فراغ", en: "Free Period" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "9:45 – 10:15",
      subject: { ar: "استراحة", en: "Break" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "11:15 – 12:00",
      subject: { ar: "جبر", en: "Algebra" },
      className: { ar: "الصف الثامن أ", en: "Grade 8-A" },
      room: "301",
      students: 20,
    },
    {
      time: "1:30 – 2:15",
      subject: { ar: "تحضير", en: "Prep" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
  ],
  thu: [
    {
      time: "8:00 – 8:45",
      subject: { ar: "حصة فراغ", en: "Free Period" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "9:45 – 10:15",
      subject: { ar: "استراحة", en: "Break" },
      className: { ar: "", en: "" },
      room: "",
      isBreak: true,
    },
    {
      time: "1:30 – 2:15",
      subject: { ar: "حساب", en: "Numeracy" },
      className: { ar: "الصف الخامس ج", en: "Grade 5-C" },
      room: "105",
      students: 21,
    },
  ],
};

const dayKeys: DayKey[] = ["sun", "mon", "tue", "wed", "thu"];

export default function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  const [activeDay, setActiveDay] = useState<DayKey>("sun");

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    label: { ar: "الجدول الأسبوعي", en: "Weekly Schedule" },
    subtitle: {
      ar: "عرض الحصص والأنشطة لكل يوم",
      en: "View classes and activities for each day",
    },
    days: {
      sun: { ar: "الأحد", en: "Sun" },
      mon: { ar: "الاثنين", en: "Mon" },
      tue: { ar: "الثلاثاء", en: "Tue" },
      wed: { ar: "الأربعاء", en: "Wed" },
      thu: { ar: "الخميس", en: "Thu" },
    } as Record<DayKey, { ar: string; en: string }>,
    room: { ar: "قاعة", en: "Room" },
    students: { ar: "طالب", en: "students" },
    quickStats: { ar: "ملخّص اليوم", en: "Today's Summary" },
    classesToday: { ar: "حصص اليوم", en: "Classes Today" },
    freePeriods: { ar: "حصص فراغ", en: "Free Periods" },
    totalStudents: { ar: "إجمالي الطلاب", en: "Total Students" },
    currentClass: { ar: "الحصة الحالية", en: "Current Class" },
  };

  const daySlots = schedule[activeDay];
  const classesToday = daySlots.filter((s) => !s.isBreak).length;
  const freePeriods = daySlots.filter(
    (s) => s.isBreak && s.subject[locale].includes(locale === "ar" ? "فراغ" : "Free")
  ).length;
  const totalStudents = daySlots
    .filter((s) => !s.isBreak)
    .reduce((sum, s) => sum + (s.students || 0), 0);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="section-label mb-3">{T.label[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </motion.div>

      {/* Day tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {dayKeys.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-5 py-3 text-sm font-semibold border transition-all whitespace-nowrap ${
              activeDay === day
                ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                : "bg-white border-[var(--color-border)] hover:border-[var(--color-gold)] text-[var(--color-ink)]"
            }`}
          >
            {T.days[day][locale]}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schedule column */}
        <div className="lg:col-span-2 space-y-3">
          {daySlots.map((slot, i) => (
            <motion.div
              key={`${activeDay}-${i}`}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`p-5 flex items-center gap-5 border transition-all ${
                slot.isCurrent
                  ? "bg-white border-[var(--color-gold)] border-2 shadow-lg"
                  : slot.isBreak
                  ? "bg-[var(--color-cream)] border-[var(--color-border)] opacity-70"
                  : "bg-white border-[var(--color-border)]"
              }`}
            >
              {/* Time */}
              <div className="shrink-0 w-24 text-center">
                <div className="num text-sm font-bold text-[var(--color-navy)]">
                  {slot.time.split(" – ")[0]}
                </div>
                <div className="num text-[10px] text-[var(--color-ink-soft)]">
                  {slot.time.split(" – ")[1]}
                </div>
              </div>

              <div className="w-px h-12 bg-[var(--color-border)]" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {slot.isBreak ? (
                    <Coffee className="w-4 h-4 text-[var(--color-ink-soft)]" />
                  ) : (
                    <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                  )}
                  <span
                    className={`font-semibold ${
                      slot.isBreak
                        ? "text-[var(--color-ink-soft)]"
                        : "text-[var(--color-navy)]"
                    }`}
                  >
                    {slot.subject[locale]}
                  </span>
                  {slot.isCurrent && (
                    <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider bg-[var(--color-gold)] text-white">
                      {T.currentClass[locale]}
                    </span>
                  )}
                </div>
                {!slot.isBreak && (
                  <div className="flex items-center gap-3 text-xs text-[var(--color-ink-soft)]">
                    <span>{slot.className[locale]}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {T.room[locale]} <span className="num">{slot.room}</span>
                    </span>
                    {slot.students && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="num">{slot.students}</span>{" "}
                        {T.students[locale]}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick stats sidebar */}
        <div>
          <div className="bg-white border border-[var(--color-border)] p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
              </div>
              <h3 className={cardTitleClass}>{T.quickStats[locale]}</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: T.classesToday[locale],
                  value: classesToday,
                  color: "#0F2C5C",
                },
                {
                  label: T.freePeriods[locale],
                  value: freePeriods,
                  color: "#C19A4B",
                },
                {
                  label: T.totalStudents[locale],
                  value: totalStudents,
                  color: "#2D8659",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-[var(--color-cream)] flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {stat.label}
                  </span>
                  <span
                    className={`${
                      isRTL ? "font-arabic-display" : "font-serif"
                    } text-2xl font-bold num`}
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
