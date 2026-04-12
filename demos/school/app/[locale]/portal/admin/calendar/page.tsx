"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
  BookOpen,
  PartyPopper,
  GraduationCap,
  AlertCircle,
  Users,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type EventType = "holiday" | "exam" | "activity" | "meeting" | "deadline";

type SchoolEvent = {
  id: string;
  title: { ar: string; en: string };
  date: string; // YYYY-MM-DD
  type: EventType;
  description: { ar: string; en: string };
};

const seedEvents: SchoolEvent[] = [
  // September
  { id: "EVT-001", title: { ar: "بداية العام الدراسي", en: "First Day of School" }, date: "2025-09-01", type: "activity", description: { ar: "الترحيب بالطلبة وأولياء الأمور", en: "Welcome students and parents" } },
  { id: "EVT-002", title: { ar: "اجتماع أولياء الأمور", en: "Parent Meeting" }, date: "2025-09-15", type: "meeting", description: { ar: "اجتماع تعريفي للعام الجديد", en: "Introductory meeting for new year" } },
  // October
  { id: "EVT-003", title: { ar: "عيد الاستقلال", en: "Independence Day" }, date: "2025-10-25", type: "holiday", description: { ar: "عطلة رسمية", en: "Official holiday" } },
  // November
  { id: "EVT-004", title: { ar: "امتحانات الفصل الأول", en: "First Semester Exams" }, date: "2025-11-20", type: "exam", description: { ar: "بداية امتحانات الفصل الدراسي الأول", en: "Start of first semester exams" } },
  // December
  { id: "EVT-005", title: { ar: "عطلة الشتاء", en: "Winter Break" }, date: "2025-12-20", type: "holiday", description: { ar: "بداية عطلة الشتاء", en: "Start of winter break" } },
  { id: "EVT-006", title: { ar: "عيد الميلاد", en: "Christmas Day" }, date: "2025-12-25", type: "holiday", description: { ar: "عطلة رسمية", en: "Official holiday" } },
  // January
  { id: "EVT-007", title: { ar: "بداية الفصل الثاني", en: "Second Semester Begins" }, date: "2026-01-05", type: "activity", description: { ar: "استئناف الدوام المدرسي", en: "School resumes" } },
  // February
  { id: "EVT-008", title: { ar: "يوم المعلم الأردني", en: "Jordanian Teacher's Day" }, date: "2026-02-14", type: "activity", description: { ar: "تكريم الكادر التعليمي", en: "Honoring the teaching staff" } },
  // March
  { id: "EVT-009", title: { ar: "بداية شهر رمضان", en: "Start of Ramadan" }, date: "2026-03-01", type: "holiday", description: { ar: "بداية شهر رمضان المبارك", en: "Beginning of Ramadan" } },
  { id: "EVT-010", title: { ar: "يوم الأم", en: "Mother's Day" }, date: "2026-03-21", type: "activity", description: { ar: "احتفال يوم الأم", en: "Mother's Day celebration" } },
  { id: "EVT-011", title: { ar: "آخر موعد لتسليم المشاريع", en: "Project Submission Deadline" }, date: "2026-03-25", type: "deadline", description: { ar: "آخر موعد لتسليم مشاريع الفصل الثاني", en: "Deadline for second semester projects" } },
  // April
  { id: "EVT-012", title: { ar: "عيد الفطر", en: "Eid Al-Fitr" }, date: "2026-04-01", type: "holiday", description: { ar: "عطلة عيد الفطر المبارك", en: "Eid Al-Fitr holiday" } },
  { id: "EVT-013", title: { ar: "معرض العلوم السنوي", en: "Annual Science Fair" }, date: "2026-04-15", type: "activity", description: { ar: "معرض الطلبة للمشاريع العلمية", en: "Student science project exhibition" } },
  { id: "EVT-014", title: { ar: "امتحانات نهاية الفصل الثاني", en: "End of 2nd Semester Exams" }, date: "2026-04-20", type: "exam", description: { ar: "بداية الامتحانات النهائية", en: "Start of final exams" } },
  // May
  { id: "EVT-015", title: { ar: "يوم الاستقلال", en: "Independence Day" }, date: "2026-05-25", type: "holiday", description: { ar: "عيد استقلال المملكة الأردنية", en: "Jordan Independence Day" } },
  // June
  { id: "EVT-016", title: { ar: "حفل التخريج", en: "Graduation Ceremony" }, date: "2026-06-15", type: "activity", description: { ar: "حفل تخريج طلبة الثاني عشر", en: "Grade 12 graduation ceremony" } },
  { id: "EVT-017", title: { ar: "نهاية العام الدراسي", en: "Last Day of School" }, date: "2026-06-20", type: "activity", description: { ar: "اليوم الأخير من العام الدراسي", en: "Last day of academic year" } },
];

const eventTypeColors: Record<EventType, string> = {
  holiday: "bg-red-50 text-red-700 border-red-200",
  exam: "bg-blue-50 text-blue-700 border-blue-200",
  activity: "bg-green-50 text-green-700 border-green-200",
  meeting: "bg-purple-50 text-purple-700 border-purple-200",
  deadline: "bg-amber-50 text-amber-700 border-amber-200",
};

const eventTypeIcons: Record<EventType, typeof Calendar> = {
  holiday: PartyPopper,
  exam: BookOpen,
  activity: GraduationCap,
  meeting: Users,
  deadline: AlertCircle,
};

const monthNames = {
  ar: ["كانون ثاني", "شباط", "آذار", "نيسان", "أيّار", "حزيران", "تمّوز", "آب", "أيلول", "تشرين أول", "تشرين ثاني", "كانون أول"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const dayNames = {
  ar: ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AdminCalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventType, setNewEventType] = useState<EventType>("activity");
  const [localEvents, setLocalEvents] = useState<SchoolEvent[]>(seedEvents);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthStr = String(currentMonth + 1).padStart(2, "0");

  const eventsThisMonth = localEvents.filter((e) => {
    const [y, m] = e.date.split("-");
    return parseInt(y) === currentYear && parseInt(m) === currentMonth + 1;
  });

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${monthStr}-${String(day).padStart(2, "0")}`;
    return localEvents.filter((e) => e.date === dateStr);
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || !newEventDate) return;
    const newEvent: SchoolEvent = {
      id: `EVT-NEW-${Date.now()}`,
      title: { ar: newEventTitle, en: newEventTitle },
      date: newEventDate,
      type: newEventType,
      description: { ar: "", en: "" },
    };
    setLocalEvents((prev) => [...prev, newEvent]);
    setShowAddModal(false);
    setNewEventTitle("");
    setNewEventDate("");
    setToast(locale === "ar" ? "تمت إضافة الحدث بنجاح" : "Event added successfully");
  };

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "التقويم المدرسي", en: "School Calendar" },
    subtitle: { ar: "العام الدراسي ٢٠٢٥ - ٢٠٢٦", en: "Academic Year 2025 - 2026" },
    addEvent: { ar: "إضافة حدث", en: "Add Event" },
    upcoming: { ar: "الأحداث القادمة", en: "Upcoming Events" },
    noEvents: { ar: "لا أحداث في هذا الشهر", en: "No events this month" },
    eventTypes: {
      holiday: { ar: "عطلة", en: "Holiday" },
      exam: { ar: "امتحان", en: "Exam" },
      activity: { ar: "نشاط", en: "Activity" },
      meeting: { ar: "اجتماع", en: "Meeting" },
      deadline: { ar: "موعد نهائي", en: "Deadline" },
    },
    modal: {
      title: { ar: "إضافة حدث جديد", en: "Add New Event" },
      eventName: { ar: "اسم الحدث", en: "Event Name" },
      date: { ar: "التاريخ", en: "Date" },
      type: { ar: "النوع", en: "Type" },
      save: { ar: "حفظ", en: "Save" },
      cancel: { ar: "إلغاء", en: "Cancel" },
    },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">{T.title[locale]}</p>
          <h1 className={h1Class}>{T.subtitle[locale]}</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)] inline-flex"
        >
          <Plus className="w-4 h-4" />
          {T.addEvent[locale]}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)]">
          {/* Month navigation */}
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-cream)] transition-colors">
              <ChevronLeft className={`w-5 h-5 text-[var(--color-navy)] ${isRTL ? "rotate-180" : ""}`} />
            </button>
            <h3 className={cardTitleClass}>
              {monthNames[locale][currentMonth]} {currentYear}
            </h3>
            <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-cream)] transition-colors">
              <ChevronRight className={`w-5 h-5 text-[var(--color-navy)] ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[var(--color-border)]">
            {dayNames[locale].map((d) => (
              <div key={d} className="p-3 text-center text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-3 min-h-[80px] border-b border-e border-[var(--color-border)] bg-gray-50/50" />
            ))}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = currentYear === 2026 && currentMonth === 3 && day === 12;
              return (
                <div
                  key={day}
                  className={`p-2 min-h-[80px] border-b border-e border-[var(--color-border)] ${
                    isToday ? "bg-[var(--color-cream)]" : "hover:bg-[var(--color-cream)]/30"
                  } transition-colors`}
                >
                  <div className={`text-sm mb-1 num ${isToday ? "w-6 h-6 flex items-center justify-center bg-[var(--color-gold)] text-white font-bold" : "text-[var(--color-navy)]"}`}>
                    {day}
                  </div>
                  {dayEvents.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setSelectedEvent(e)}
                      className={`w-full text-start text-[9px] font-semibold px-1.5 py-0.5 mb-0.5 truncate border ${eventTypeColors[e.type]} cursor-pointer hover:opacity-80`}
                    >
                      {e.title[locale]}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-[var(--color-border)] flex flex-wrap gap-3">
            {(Object.keys(T.eventTypes) as EventType[]).map((type) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 border ${eventTypeColors[type]}`} />
                <span className="text-[10px] text-[var(--color-ink-soft)]">{T.eventTypes[type][locale]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events list sidebar */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className={cardTitleClass}>{T.upcoming[locale]}</h3>
          </div>
          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {eventsThisMonth.length === 0 ? (
              <p className="text-sm text-[var(--color-ink-soft)] text-center py-8">{T.noEvents[locale]}</p>
            ) : (
              eventsThisMonth
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((e) => {
                  const Icon = eventTypeIcons[e.type];
                  const dayNum = parseInt(e.date.split("-")[2]);
                  return (
                    <button
                      key={e.id}
                      onClick={() => setSelectedEvent(e)}
                      className={`w-full text-start p-4 border-s-4 ${eventTypeColors[e.type]} hover:opacity-80 transition-opacity`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0 border border-current/10">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm mb-1">{e.title[locale]}</div>
                          <div className="text-[10px] opacity-70 num">
                            {dayNum} {monthNames[locale][currentMonth]}
                          </div>
                          {e.description[locale] && (
                            <div className="text-[10px] opacity-60 mt-1 truncate">{e.description[locale]}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
            )}
          </div>
        </div>
      </div>

      {/* Event detail modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md shadow-2xl"
            >
              <div className="bg-[var(--color-navy)] text-white p-6 relative">
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 end-4 text-white/70 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 text-xs tracking-wider text-[var(--color-gold)] mb-2">
                  <Calendar className="w-3 h-3" />
                  {T.eventTypes[selectedEvent.type][locale]}
                </div>
                <h2 className={`text-2xl font-bold ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                  {selectedEvent.title[locale]}
                </h2>
                <div className="text-sm text-white/70 mt-2 num">{selectedEvent.date}</div>
              </div>
              <div className="p-6">
                {selectedEvent.description[locale] && (
                  <p className="text-sm text-[var(--color-ink-soft)]">{selectedEvent.description[locale]}</p>
                )}
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setSelectedEvent(null)} className="btn-outline text-xs">
                    {locale === "ar" ? "إغلاق" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add event modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md shadow-2xl"
            >
              <div className="bg-[var(--color-navy)] text-white p-6 relative">
                <button onClick={() => setShowAddModal(false)} className="absolute top-4 end-4 text-white/70 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <h2 className={`text-xl font-bold ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                  {T.modal.title[locale]}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-2 block font-bold">
                    {T.modal.eventName[locale]}
                  </label>
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]"
                    placeholder={locale === "ar" ? "مثال: رحلة مدرسية" : "e.g. School Trip"}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-2 block font-bold">
                    {T.modal.date[locale]}
                  </label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-2 block font-bold">
                    {T.modal.type[locale]}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(T.eventTypes) as EventType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewEventType(type)}
                        className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all ${
                          newEventType === type
                            ? "bg-[var(--color-navy)] text-white"
                            : `border ${eventTypeColors[type]}`
                        }`}
                      >
                        {T.eventTypes[type][locale]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
                  <button onClick={() => setShowAddModal(false)} className="btn-outline text-xs">
                    {T.modal.cancel[locale]}
                  </button>
                  <button
                    onClick={handleAddEvent}
                    disabled={!newEventTitle.trim() || !newEventDate}
                    className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)] inline-flex text-xs disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {T.modal.save[locale]}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[60] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="font-semibold">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
