"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Coffee, UtensilsCrossed } from "lucide-react";
import type { Locale } from "@/i18n/config";

interface Period {
  time: string;
  subject: { ar: string; en: string };
  teacher: { ar: string; en: string };
  room: { ar: string; en: string };
  type: "class" | "break" | "lunch";
}

const weekSchedule: Record<string, Period[]> = {
  sun: [
    {
      time: "8:00",
      subject: { ar: "الرياضيات", en: "Mathematics" },
      teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
      room: { ar: "غرفة ٢٠١", en: "Room 201" },
      type: "class",
    },
    {
      time: "9:00",
      subject: { ar: "اللغة العربية", en: "Arabic" },
      teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
      room: { ar: "غرفة ١٠٥", en: "Room 105" },
      type: "class",
    },
    {
      time: "10:00",
      subject: { ar: "استراحة", en: "Break" },
      teacher: { ar: "", en: "" },
      room: { ar: "الساحة", en: "Courtyard" },
      type: "break",
    },
    {
      time: "10:30",
      subject: { ar: "العلوم", en: "Science" },
      teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
      room: { ar: "مختبر العلوم", en: "Science Lab" },
      type: "class",
    },
    {
      time: "11:30",
      subject: { ar: "اللغة الإنجليزية", en: "English" },
      teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
      room: { ar: "غرفة ٣٠٢", en: "Room 302" },
      type: "class",
    },
    {
      time: "12:30",
      subject: { ar: "غداء", en: "Lunch" },
      teacher: { ar: "", en: "" },
      room: { ar: "المقصف", en: "Cafeteria" },
      type: "lunch",
    },
    {
      time: "1:30",
      subject: { ar: "الفنون", en: "Arts" },
      teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
      room: { ar: "غرفة الفنون", en: "Art Room" },
      type: "class",
    },
  ],
  mon: [
    {
      time: "8:00",
      subject: { ar: "العلوم", en: "Science" },
      teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
      room: { ar: "مختبر العلوم", en: "Science Lab" },
      type: "class",
    },
    {
      time: "9:00",
      subject: { ar: "الرياضيات", en: "Mathematics" },
      teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
      room: { ar: "غرفة ٢٠١", en: "Room 201" },
      type: "class",
    },
    {
      time: "10:00",
      subject: { ar: "استراحة", en: "Break" },
      teacher: { ar: "", en: "" },
      room: { ar: "الساحة", en: "Courtyard" },
      type: "break",
    },
    {
      time: "10:30",
      subject: { ar: "التاريخ", en: "History" },
      teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
      room: { ar: "غرفة ١٠٣", en: "Room 103" },
      type: "class",
    },
    {
      time: "11:30",
      subject: { ar: "اللغة العربية", en: "Arabic" },
      teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
      room: { ar: "غرفة ١٠٥", en: "Room 105" },
      type: "class",
    },
    {
      time: "12:30",
      subject: { ar: "غداء", en: "Lunch" },
      teacher: { ar: "", en: "" },
      room: { ar: "المقصف", en: "Cafeteria" },
      type: "lunch",
    },
    {
      time: "1:30",
      subject: { ar: "التربية الوطنية", en: "Civics" },
      teacher: { ar: "أ. ديمة الحوراني", en: "Ms. Dima Al-Hourani" },
      room: { ar: "غرفة ٢٠٤", en: "Room 204" },
      type: "class",
    },
  ],
  tue: [
    {
      time: "8:00",
      subject: { ar: "اللغة الإنجليزية", en: "English" },
      teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
      room: { ar: "غرفة ٣٠٢", en: "Room 302" },
      type: "class",
    },
    {
      time: "9:00",
      subject: { ar: "الرياضيات", en: "Mathematics" },
      teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
      room: { ar: "غرفة ٢٠١", en: "Room 201" },
      type: "class",
    },
    {
      time: "10:00",
      subject: { ar: "استراحة", en: "Break" },
      teacher: { ar: "", en: "" },
      room: { ar: "الساحة", en: "Courtyard" },
      type: "break",
    },
    {
      time: "10:30",
      subject: { ar: "العلوم", en: "Science" },
      teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
      room: { ar: "مختبر العلوم", en: "Science Lab" },
      type: "class",
    },
    {
      time: "11:30",
      subject: { ar: "الفنون", en: "Arts" },
      teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
      room: { ar: "غرفة الفنون", en: "Art Room" },
      type: "class",
    },
    {
      time: "12:30",
      subject: { ar: "غداء", en: "Lunch" },
      teacher: { ar: "", en: "" },
      room: { ar: "المقصف", en: "Cafeteria" },
      type: "lunch",
    },
    {
      time: "1:30",
      subject: { ar: "اللغة العربية", en: "Arabic" },
      teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
      room: { ar: "غرفة ١٠٥", en: "Room 105" },
      type: "class",
    },
  ],
  wed: [
    {
      time: "8:00",
      subject: { ar: "التاريخ", en: "History" },
      teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
      room: { ar: "غرفة ١٠٣", en: "Room 103" },
      type: "class",
    },
    {
      time: "9:00",
      subject: { ar: "الرياضيات", en: "Mathematics" },
      teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
      room: { ar: "غرفة ٢٠١", en: "Room 201" },
      type: "class",
    },
    {
      time: "10:00",
      subject: { ar: "استراحة", en: "Break" },
      teacher: { ar: "", en: "" },
      room: { ar: "الساحة", en: "Courtyard" },
      type: "break",
    },
    {
      time: "10:30",
      subject: { ar: "اللغة الإنجليزية", en: "English" },
      teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
      room: { ar: "غرفة ٣٠٢", en: "Room 302" },
      type: "class",
    },
    {
      time: "11:30",
      subject: { ar: "التربية الوطنية", en: "Civics" },
      teacher: { ar: "أ. ديمة الحوراني", en: "Ms. Dima Al-Hourani" },
      room: { ar: "غرفة ٢٠٤", en: "Room 204" },
      type: "class",
    },
    {
      time: "12:30",
      subject: { ar: "غداء", en: "Lunch" },
      teacher: { ar: "", en: "" },
      room: { ar: "المقصف", en: "Cafeteria" },
      type: "lunch",
    },
    {
      time: "1:30",
      subject: { ar: "العلوم", en: "Science" },
      teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
      room: { ar: "مختبر العلوم", en: "Science Lab" },
      type: "class",
    },
  ],
  thu: [
    {
      time: "8:00",
      subject: { ar: "اللغة العربية", en: "Arabic" },
      teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
      room: { ar: "غرفة ١٠٥", en: "Room 105" },
      type: "class",
    },
    {
      time: "9:00",
      subject: { ar: "العلوم", en: "Science" },
      teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
      room: { ar: "مختبر العلوم", en: "Science Lab" },
      type: "class",
    },
    {
      time: "10:00",
      subject: { ar: "استراحة", en: "Break" },
      teacher: { ar: "", en: "" },
      room: { ar: "الساحة", en: "Courtyard" },
      type: "break",
    },
    {
      time: "10:30",
      subject: { ar: "الرياضيات", en: "Mathematics" },
      teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
      room: { ar: "غرفة ٢٠١", en: "Room 201" },
      type: "class",
    },
    {
      time: "11:30",
      subject: { ar: "التاريخ", en: "History" },
      teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
      room: { ar: "غرفة ١٠٣", en: "Room 103" },
      type: "class",
    },
    {
      time: "12:30",
      subject: { ar: "غداء", en: "Lunch" },
      teacher: { ar: "", en: "" },
      room: { ar: "المقصف", en: "Cafeteria" },
      type: "lunch",
    },
    {
      time: "1:30",
      subject: { ar: "الفنون", en: "Arts" },
      teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
      room: { ar: "غرفة الفنون", en: "Art Room" },
      type: "class",
    },
  ],
};

const dayKeys = ["sun", "mon", "tue", "wed", "thu"];
const dayLabels: Record<string, { ar: string; en: string }> = {
  sun: { ar: "الأحد", en: "Sunday" },
  mon: { ar: "الاثنين", en: "Monday" },
  tue: { ar: "الثلاثاء", en: "Tuesday" },
  wed: { ar: "الأربعاء", en: "Wednesday" },
  thu: { ar: "الخميس", en: "Thursday" },
};

// Simulate "current period" as the 10:30 slot on Sunday
const CURRENT_DAY = "sun";
const CURRENT_TIME = "10:30";

export default function StudentSchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [activeDay, setActiveDay] = useState(CURRENT_DAY);

  const periods = weekSchedule[activeDay] || [];

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <Calendar className="w-3 h-3" />
          <span>
            {locale === "ar" ? "الجدول الأسبوعي" : "WEEKLY SCHEDULE"}
          </span>
        </div>
        <h1 className={h1Class}>
          {locale === "ar" ? "جدولي الدراسي" : "My Schedule"}
        </h1>
      </motion.div>

      {/* Day tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {dayKeys.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-5 py-2.5 text-xs font-semibold border transition-all whitespace-nowrap ${
              activeDay === day
                ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                : "bg-white border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]"
            }`}
          >
            {dayLabels[day][locale]}
          </button>
        ))}
      </div>

      {/* Schedule cards */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {periods.map((period, i) => {
              const isCurrent =
                activeDay === CURRENT_DAY && period.time === CURRENT_TIME;
              const isBreakOrLunch =
                period.type === "break" || period.type === "lunch";

              return (
                <motion.div
                  key={period.time}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-5 p-5 border transition-all ${
                    isCurrent
                      ? "bg-white border-2 border-[var(--color-gold)] shadow-md"
                      : isBreakOrLunch
                      ? "bg-[var(--color-cream)] border-[var(--color-border-soft)]"
                      : "bg-white border-[var(--color-border)]"
                  }`}
                >
                  {/* Time */}
                  <div className="w-16 text-center shrink-0">
                    <div
                      className={`text-lg font-bold num ${
                        isCurrent
                          ? "text-[var(--color-gold)]"
                          : "text-[var(--color-navy)]"
                      } ${isRTL ? "font-arabic-display" : "font-serif"}`}
                    >
                      {period.time}
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`w-0.5 h-12 shrink-0 ${
                      isCurrent
                        ? "bg-[var(--color-gold)]"
                        : isBreakOrLunch
                        ? "bg-[var(--color-border)]"
                        : "bg-[var(--color-navy)]"
                    }`}
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {isBreakOrLunch &&
                        (period.type === "break" ? (
                          <Coffee className="w-4 h-4 text-[var(--color-ink-soft)]" />
                        ) : (
                          <UtensilsCrossed className="w-4 h-4 text-[var(--color-ink-soft)]" />
                        ))}
                      <span
                        className={`font-semibold ${
                          isBreakOrLunch
                            ? "text-[var(--color-ink-soft)] text-sm"
                            : "text-[var(--color-navy)]"
                        }`}
                      >
                        {period.subject[locale]}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--color-gold)] text-white">
                          {locale === "ar" ? "الآن" : "NOW"}
                        </span>
                      )}
                    </div>
                    {!isBreakOrLunch && (
                      <div className="flex items-center gap-4 mt-1 text-xs text-[var(--color-ink-soft)]">
                        <span>{period.teacher[locale]}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {period.room[locale]}
                        </span>
                      </div>
                    )}
                    {isBreakOrLunch && (
                      <div className="text-xs text-[var(--color-ink-soft)] mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {period.room[locale]}
                      </div>
                    )}
                  </div>

                  {/* Clock icon */}
                  <Clock
                    className={`w-4 h-4 shrink-0 ${
                      isCurrent
                        ? "text-[var(--color-gold)]"
                        : "text-[var(--color-border)]"
                    }`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
