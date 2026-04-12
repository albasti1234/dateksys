"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BookOpen,
  DoorOpen,
  Search,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type ClassSection = {
  id: string;
  grade: string;
  gradeLabel: { ar: string; en: string };
  section: string;
  homeroom: { ar: string; en: string };
  studentCount: number;
  capacity: number;
  room: string;
  level: string;
};

const seedClasses: ClassSection[] = [
  { id: "CLS-KG1A", grade: "kg1", gradeLabel: { ar: "KG1", en: "KG1" }, section: "A", homeroom: { ar: "فاطمة العلي", en: "Fatima Al-Ali" }, studentCount: 18, capacity: 20, room: "R-101", level: "kg" },
  { id: "CLS-KG2A", grade: "kg2", gradeLabel: { ar: "KG2", en: "KG2" }, section: "A", homeroom: { ar: "مريم الحسن", en: "Mariam Al-Hasan" }, studentCount: 20, capacity: 20, room: "R-102", level: "kg" },
  { id: "CLS-KG2B", grade: "kg2", gradeLabel: { ar: "KG2", en: "KG2" }, section: "B", homeroom: { ar: "سعاد النمر", en: "Suaad Al-Nimer" }, studentCount: 19, capacity: 20, room: "R-103", level: "kg" },
  { id: "CLS-1A", grade: "g1", gradeLabel: { ar: "الصف الأول", en: "Grade 1" }, section: "A", homeroom: { ar: "عبير الشمالي", en: "Abeer Al-Shamali" }, studentCount: 24, capacity: 25, room: "R-201", level: "primary" },
  { id: "CLS-1B", grade: "g1", gradeLabel: { ar: "الصف الأول", en: "Grade 1" }, section: "B", homeroom: { ar: "رنا حدّاد", en: "Rana Haddad" }, studentCount: 23, capacity: 25, room: "R-202", level: "primary" },
  { id: "CLS-2A", grade: "g2", gradeLabel: { ar: "الصف الثاني", en: "Grade 2" }, section: "A", homeroom: { ar: "ميساء الكيلاني", en: "Maysaa Al-Kilani" }, studentCount: 25, capacity: 25, room: "R-203", level: "primary" },
  { id: "CLS-3A", grade: "g3", gradeLabel: { ar: "الصف الثالث", en: "Grade 3" }, section: "A", homeroom: { ar: "هند القاسم", en: "Hind Al-Qasem" }, studentCount: 22, capacity: 25, room: "R-204", level: "primary" },
  { id: "CLS-4A", grade: "g4", gradeLabel: { ar: "الصف الرابع", en: "Grade 4" }, section: "A", homeroom: { ar: "نادية البطاينة", en: "Nadia Al-Batayneh" }, studentCount: 24, capacity: 25, room: "R-301", level: "primary" },
  { id: "CLS-5A", grade: "g5", gradeLabel: { ar: "الصف الخامس", en: "Grade 5" }, section: "A", homeroom: { ar: "دانا المومني", en: "Dana Al-Momani" }, studentCount: 23, capacity: 25, room: "R-302", level: "primary" },
  { id: "CLS-6A", grade: "g6", gradeLabel: { ar: "الصف السادس", en: "Grade 6" }, section: "A", homeroom: { ar: "سناء العبادي", en: "Sanaa Al-Abadi" }, studentCount: 26, capacity: 28, room: "R-303", level: "middle" },
  { id: "CLS-7A", grade: "g7", gradeLabel: { ar: "الصف السابع", en: "Grade 7" }, section: "A", homeroom: { ar: "ريم الحمود", en: "Reem Al-Hmoud" }, studentCount: 27, capacity: 28, room: "R-304", level: "middle" },
  { id: "CLS-8A", grade: "g8", gradeLabel: { ar: "الصف الثامن", en: "Grade 8" }, section: "A", homeroom: { ar: "هالة الزعبي", en: "Hala Al-Zoubi" }, studentCount: 25, capacity: 28, room: "R-305", level: "middle" },
  { id: "CLS-9A", grade: "g9", gradeLabel: { ar: "الصف التاسع", en: "Grade 9" }, section: "A", homeroom: { ar: "خالد المصري", en: "Khaled Al-Masri" }, studentCount: 24, capacity: 28, room: "R-401", level: "high" },
  { id: "CLS-10A", grade: "g10", gradeLabel: { ar: "الصف العاشر", en: "Grade 10" }, section: "A", homeroom: { ar: "أحمد الشوابكة", en: "Ahmad Al-Shawabkeh" }, studentCount: 22, capacity: 28, room: "R-402", level: "high" },
  { id: "CLS-11A", grade: "g11", gradeLabel: { ar: "الصف الحادي عشر", en: "Grade 11" }, section: "A", homeroom: { ar: "ماجد الخلايلة", en: "Majed Al-Khalaileh" }, studentCount: 20, capacity: 28, room: "R-403", level: "high" },
  { id: "CLS-12A", grade: "g12", gradeLabel: { ar: "الصف الثاني عشر", en: "Grade 12" }, section: "A", homeroom: { ar: "أحمد الشوابكة", en: "Ahmad Al-Shawabkeh" }, studentCount: 18, capacity: 28, room: "R-404", level: "high" },
];

const levelFilters = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "kg", ar: "الروضة", en: "KG" },
  { key: "primary", ar: "الابتدائية", en: "Primary" },
  { key: "middle", ar: "الإعدادية", en: "Middle" },
  { key: "high", ar: "الثانوية", en: "High" },
];

export default function AdminClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const searchLower = search.toLowerCase().trim();
  const filtered = seedClasses.filter((c) => {
    if (filter !== "all" && c.level !== filter) return false;
    if (searchLower) {
      const hay = (
        c.gradeLabel.ar + " " + c.gradeLabel.en + " " +
        c.homeroom.ar + " " + c.homeroom.en + " " +
        c.room + " " + c.section
      ).toLowerCase();
      if (!hay.includes(searchLower)) return false;
    }
    return true;
  });

  const totalStudents = seedClasses.reduce((s, c) => s + c.studentCount, 0);
  const totalCapacity = seedClasses.reduce((s, c) => s + c.capacity, 0);
  const fullClasses = seedClasses.filter((c) => c.studentCount >= c.capacity).length;

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "إدارة الشُّعَب", en: "Class Management" },
    subtitle: {
      ar: `${seedClasses.length} شعبة دراسية في الأكاديمية`,
      en: `${seedClasses.length} class sections at the academy`,
    },
    search: { ar: "ابحث بالصف أو المعلم أو الغرفة...", en: "Search by grade, teacher, or room..." },
    stats: {
      sections: { ar: "الشُّعَب", en: "Sections" },
      students: { ar: "إجمالي الطلبة", en: "Total Students" },
      capacity: { ar: "نسبة الإشغال", en: "Occupancy" },
      full: { ar: "مكتملة السعة", en: "At Capacity" },
    },
    headers: {
      class: { ar: "الشعبة", en: "Class" },
      homeroom: { ar: "مربّي/ة الصف", en: "Homeroom" },
      room: { ar: "الغرفة", en: "Room" },
      students: { ar: "الطلبة", en: "Students" },
      capacity: { ar: "السعة", en: "Capacity" },
    },
    empty: { ar: "لا يوجد شُعَب مطابقة", en: "No matching classes" },
    capacityLabel: { ar: "مكتمل", en: "Full" },
    viewRoster: { ar: "تم نسخ رابط الشعبة", en: "Class link copied" },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label={T.stats.sections[locale]} value={`${seedClasses.length}`} color="#0F2C5C" icon={BookOpen} locale={locale} />
        <StatCard label={T.stats.students[locale]} value={`${totalStudents}`} color="#2D8659" icon={Users} locale={locale} />
        <StatCard label={T.stats.capacity[locale]} value={`${Math.round((totalStudents / totalCapacity) * 100)}%`} color="#C19A4B" icon={DoorOpen} locale={locale} />
        <StatCard label={T.stats.full[locale]} value={`${fullClasses}`} color="#4A90E2" icon={AlertTriangle} locale={locale} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[260px] flex items-center gap-2 bg-white border border-[var(--color-border)] px-4 py-3">
          <Search className="w-4 h-4 text-[var(--color-ink-soft)] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={T.search[locale]}
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Level tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {levelFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
              filter === f.key
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
            }`}
          >
            {f[locale]}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full p-16 text-center text-[var(--color-ink-soft)] bg-white border border-[var(--color-border)]">
            {T.empty[locale]}
          </div>
        ) : (
          filtered.map((c, i) => {
            const pct = Math.round((c.studentCount / c.capacity) * 100);
            const isFull = c.studentCount >= c.capacity;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setToast(T.viewRoster[locale])}
                className="bg-white border border-[var(--color-border)] p-6 hover:border-[var(--color-gold)] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold text-[var(--color-navy)] ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                      {c.gradeLabel[locale]} - {c.section}
                    </h3>
                    <div className="text-xs text-[var(--color-ink-soft)] mt-1">{c.id}</div>
                  </div>
                  {isFull && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold tracking-wider bg-red-50 text-red-700">
                      <AlertTriangle className="w-3 h-3" />
                      {T.capacityLabel[locale]}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[var(--color-gold)]" />
                    <span className="text-[var(--color-ink-soft)]">{T.headers.homeroom[locale]}:</span>
                    <span className="font-semibold text-[var(--color-navy)]">{c.homeroom[locale]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DoorOpen className="w-4 h-4 text-[var(--color-gold)]" />
                    <span className="text-[var(--color-ink-soft)]">{T.headers.room[locale]}:</span>
                    <span className="font-semibold text-[var(--color-navy)]">{c.room}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[var(--color-ink-soft)]">
                      {c.studentCount} / {c.capacity} {T.headers.students[locale]}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-navy)] num">{pct}%</span>
                  </div>
                  <div className="h-2 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full ${isFull ? "bg-red-500" : pct > 85 ? "bg-amber-500" : "bg-[#2D8659]"}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

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

function StatCard({
  label, value, color, icon: Icon, locale,
}: {
  label: string; value: string; color: string; icon: typeof Users; locale: Locale;
}) {
  const isRTL = locale === "ar";
  return (
    <div className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: color }} />
      <div className="relative">
        <Icon className="w-5 h-5 mb-3" style={{ color }} />
        <div className={`text-4xl font-bold text-[var(--color-navy)] mb-1 ${isRTL ? "font-arabic-display" : "font-serif"}`}>{value}</div>
        <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)]">{label}</div>
      </div>
    </div>
  );
}
