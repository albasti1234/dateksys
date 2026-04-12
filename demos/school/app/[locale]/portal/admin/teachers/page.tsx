"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  BookOpen,
  Award,
  Mail,
  Phone,
  X,
  Filter,
  Download,
  CheckCircle2,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type Teacher = {
  id: string;
  firstName: { ar: string; en: string };
  lastName: { ar: string; en: string };
  department: string;
  departmentLabel: { ar: string; en: string };
  subjects: { ar: string; en: string }[];
  grades: { ar: string; en: string }[];
  experience: number;
  email: string;
  phone: string;
  status: "active" | "on-leave";
  avatar: string;
};

const seedTeachers: Teacher[] = [
  {
    id: "TCH-001",
    firstName: { ar: "سناء", en: "Sanaa" },
    lastName: { ar: "العبادي", en: "Al-Abadi" },
    department: "arabic",
    departmentLabel: { ar: "اللغة العربية", en: "Arabic Language" },
    subjects: [
      { ar: "اللغة العربية", en: "Arabic Language" },
      { ar: "التربية الإسلامية", en: "Islamic Studies" },
    ],
    grades: [
      { ar: "السادس", en: "6th" },
      { ar: "السابع", en: "7th" },
    ],
    experience: 14,
    email: "sanaa.abadi@alnakhla.edu.jo",
    phone: "+962 79 111 2233",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
  {
    id: "TCH-002",
    firstName: { ar: "خالد", en: "Khaled" },
    lastName: { ar: "المصري", en: "Al-Masri" },
    department: "math",
    departmentLabel: { ar: "الرياضيات", en: "Mathematics" },
    subjects: [
      { ar: "الرياضيات", en: "Mathematics" },
      { ar: "الإحصاء", en: "Statistics" },
    ],
    grades: [
      { ar: "التاسع", en: "9th" },
      { ar: "العاشر", en: "10th" },
      { ar: "الحادي عشر", en: "11th" },
    ],
    experience: 18,
    email: "khaled.masri@alnakhla.edu.jo",
    phone: "+962 77 222 3344",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  },
  {
    id: "TCH-003",
    firstName: { ar: "هالة", en: "Hala" },
    lastName: { ar: "الزعبي", en: "Al-Zoubi" },
    department: "english",
    departmentLabel: { ar: "اللغة الإنجليزية", en: "English Language" },
    subjects: [
      { ar: "اللغة الإنجليزية", en: "English Language" },
      { ar: "الأدب الإنجليزي", en: "English Literature" },
    ],
    grades: [
      { ar: "الثامن", en: "8th" },
      { ar: "التاسع", en: "9th" },
    ],
    experience: 10,
    email: "hala.zoubi@alnakhla.edu.jo",
    phone: "+962 78 333 4455",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: "TCH-004",
    firstName: { ar: "أحمد", en: "Ahmad" },
    lastName: { ar: "الشوابكة", en: "Al-Shawabkeh" },
    department: "science",
    departmentLabel: { ar: "العلوم", en: "Science" },
    subjects: [
      { ar: "الفيزياء", en: "Physics" },
      { ar: "الكيمياء", en: "Chemistry" },
    ],
    grades: [
      { ar: "العاشر", en: "10th" },
      { ar: "الحادي عشر", en: "11th" },
      { ar: "الثاني عشر", en: "12th" },
    ],
    experience: 22,
    email: "ahmad.shawabkeh@alnakhla.edu.jo",
    phone: "+962 79 444 5566",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "TCH-005",
    firstName: { ar: "ريم", en: "Reem" },
    lastName: { ar: "الحمود", en: "Al-Hmoud" },
    department: "science",
    departmentLabel: { ar: "العلوم", en: "Science" },
    subjects: [
      { ar: "الأحياء", en: "Biology" },
      { ar: "علوم الأرض", en: "Earth Science" },
    ],
    grades: [
      { ar: "السابع", en: "7th" },
      { ar: "الثامن", en: "8th" },
    ],
    experience: 8,
    email: "reem.hmoud@alnakhla.edu.jo",
    phone: "+962 77 555 6677",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: "TCH-006",
    firstName: { ar: "عبدالله", en: "Abdullah" },
    lastName: { ar: "القرالة", en: "Al-Qaraleh" },
    department: "arabic",
    departmentLabel: { ar: "اللغة العربية", en: "Arabic Language" },
    subjects: [{ ar: "اللغة العربية", en: "Arabic Language" }],
    grades: [
      { ar: "الأول", en: "1st" },
      { ar: "الثاني", en: "2nd" },
      { ar: "الثالث", en: "3rd" },
    ],
    experience: 6,
    email: "abdullah.qaraleh@alnakhla.edu.jo",
    phone: "+962 78 666 7788",
    status: "on-leave",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
  },
  {
    id: "TCH-007",
    firstName: { ar: "نادية", en: "Nadia" },
    lastName: { ar: "البطاينة", en: "Al-Batayneh" },
    department: "math",
    departmentLabel: { ar: "الرياضيات", en: "Mathematics" },
    subjects: [{ ar: "الرياضيات", en: "Mathematics" }],
    grades: [
      { ar: "الرابع", en: "4th" },
      { ar: "الخامس", en: "5th" },
      { ar: "السادس", en: "6th" },
    ],
    experience: 12,
    email: "nadia.batayneh@alnakhla.edu.jo",
    phone: "+962 79 777 8899",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: "TCH-008",
    firstName: { ar: "ماجد", en: "Majed" },
    lastName: { ar: "الخلايلة", en: "Al-Khalaileh" },
    department: "it",
    departmentLabel: { ar: "تكنولوجيا المعلومات", en: "Information Technology" },
    subjects: [
      { ar: "الحاسوب", en: "Computer Science" },
      { ar: "البرمجة", en: "Programming" },
    ],
    grades: [
      { ar: "التاسع", en: "9th" },
      { ar: "العاشر", en: "10th" },
      { ar: "الحادي عشر", en: "11th" },
    ],
    experience: 9,
    email: "majed.khalaileh@alnakhla.edu.jo",
    phone: "+962 77 888 9900",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  },
  {
    id: "TCH-009",
    firstName: { ar: "لينا", en: "Lina" },
    lastName: { ar: "جرادات", en: "Jaradat" },
    department: "english",
    departmentLabel: { ar: "اللغة الإنجليزية", en: "English Language" },
    subjects: [{ ar: "اللغة الإنجليزية", en: "English Language" }],
    grades: [
      { ar: "الرابع", en: "4th" },
      { ar: "الخامس", en: "5th" },
    ],
    experience: 5,
    email: "lina.jaradat@alnakhla.edu.jo",
    phone: "+962 78 999 0011",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    id: "TCH-010",
    firstName: { ar: "يزن", en: "Yazan" },
    lastName: { ar: "الرواشدة", en: "Al-Rawashdeh" },
    department: "pe",
    departmentLabel: { ar: "التربية الرياضية", en: "Physical Education" },
    subjects: [{ ar: "التربية الرياضية", en: "Physical Education" }],
    grades: [
      { ar: "الأول - الثاني عشر", en: "1st - 12th" },
    ],
    experience: 11,
    email: "yazan.rawashdeh@alnakhla.edu.jo",
    phone: "+962 79 000 1122",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
];

const departmentFilters = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "arabic", ar: "العربية", en: "Arabic" },
  { key: "english", ar: "الإنجليزية", en: "English" },
  { key: "math", ar: "الرياضيات", en: "Math" },
  { key: "science", ar: "العلوم", en: "Science" },
  { key: "it", ar: "تكنولوجيا", en: "IT" },
  { key: "pe", ar: "الرياضة", en: "PE" },
];

export default function AdminTeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const searchLower = search.toLowerCase().trim();
  const filtered = seedTeachers.filter((t) => {
    if (filter !== "all" && t.department !== filter) return false;
    if (searchLower) {
      const hay = (
        t.firstName.ar + " " + t.lastName.ar + " " +
        t.firstName.en + " " + t.lastName.en + " " +
        t.subjects.map((s) => s.ar + " " + s.en).join(" ") + " " + t.id
      ).toLowerCase();
      if (!hay.includes(searchLower)) return false;
    }
    return true;
  });

  const uniqueDepts = new Set(seedTeachers.map((t) => t.department));
  const avgExp = Math.round(
    seedTeachers.reduce((s, t) => s + t.experience, 0) / seedTeachers.length
  );

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "الكادر التعليمي", en: "Teaching Staff" },
    subtitle: {
      ar: `${seedTeachers.length} معلّم ومعلّمة في أكاديمية النخلة`,
      en: `${seedTeachers.length} teachers at Al-Nakhla Academy`,
    },
    searchPlaceholder: {
      ar: "ابحث بالاسم أو المادة...",
      en: "Search by name or subject...",
    },
    export: { ar: "تصدير", en: "Export" },
    stats: {
      total: { ar: "إجمالي المعلمين", en: "Total Teachers" },
      departments: { ar: "الأقسام", en: "Departments" },
      avgExp: { ar: "متوسط الخبرة (سنة)", en: "Avg. Experience (yrs)" },
      onLeave: { ar: "في إجازة", en: "On Leave" },
    },
    headers: {
      name: { ar: "المعلم/ة", en: "Teacher" },
      department: { ar: "القسم", en: "Department" },
      subjects: { ar: "المواد", en: "Subjects" },
      grades: { ar: "المراحل", en: "Grades" },
      experience: { ar: "الخبرة", en: "Experience" },
      status: { ar: "الحالة", en: "Status" },
    },
    status: {
      active: { ar: "نشط", en: "Active" },
      "on-leave": { ar: "في إجازة", en: "On Leave" },
    },
    empty: { ar: "لا يوجد نتائج مطابقة", en: "No matching teachers" },
    years: { ar: "سنة", en: "yrs" },
    details: {
      title: { ar: "ملف المعلم/ة", en: "Teacher Profile" },
      contact: { ar: "معلومات الاتصال", en: "Contact Information" },
      teaching: { ar: "معلومات التدريس", en: "Teaching Information" },
      sendEmail: { ar: "إرسال بريد إلكتروني", en: "Send Email" },
      emailSent: { ar: "تم فتح البريد الإلكتروني", en: "Email client opened" },
    },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label={T.stats.total[locale]}
          value={seedTeachers.length}
          color="#0F2C5C"
          icon={Users}
          locale={locale}
        />
        <StatCard
          label={T.stats.departments[locale]}
          value={uniqueDepts.size}
          color="#2D8659"
          icon={BookOpen}
          locale={locale}
        />
        <StatCard
          label={T.stats.avgExp[locale]}
          value={avgExp}
          color="#C19A4B"
          icon={Award}
          locale={locale}
        />
        <StatCard
          label={T.stats.onLeave[locale]}
          value={seedTeachers.filter((t) => t.status === "on-leave").length}
          color="#4A90E2"
          icon={Users}
          locale={locale}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[260px] flex items-center gap-2 bg-white border border-[var(--color-border)] px-4 py-3">
          <Search className="w-4 h-4 text-[var(--color-ink-soft)] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={T.searchPlaceholder[locale]}
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setToast(locale === "ar" ? "جارٍ تصدير البيانات..." : "Exporting data...")}
          className="btn-outline !py-2.5 text-xs"
        >
          <Download className="w-4 h-4" />
          {T.export[locale]}
        </button>
      </div>

      {/* Department tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {departmentFilters.map((f) => (
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

      {/* Table */}
      <div className="bg-white border border-[var(--color-border)] overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[var(--color-cream)]">
            <tr>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.name[locale]}</th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.department[locale]}</th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.subjects[locale]}</th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.grades[locale]}</th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.experience[locale]}</th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.status[locale]}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-16 text-center text-[var(--color-ink-soft)]">{T.empty[locale]}</td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50 cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--color-border)] shrink-0"
                        style={{ backgroundImage: `url('${t.avatar}')` }}
                      />
                      <div>
                        <div className="font-semibold text-[var(--color-navy)]">
                          {t.firstName[locale]} {t.lastName[locale]}
                        </div>
                        <div className="text-[10px] font-mono text-[var(--color-ink-soft)]">{t.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{t.departmentLabel[locale]}</td>
                  <td className="p-4 text-sm text-[var(--color-ink-soft)]">
                    {t.subjects.map((s) => s[locale]).join("، ")}
                  </td>
                  <td className="p-4 text-sm text-[var(--color-ink-soft)]">
                    {t.grades.map((g) => g[locale]).join("، ")}
                  </td>
                  <td className="p-4 text-center font-serif font-bold text-[var(--color-navy)] num">
                    {t.experience}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-wider ${
                        t.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {T.status[t.status][locale]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="bg-[var(--color-navy)] text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#C19A4B" }} />
                <button onClick={() => setSelected(null)} className="absolute top-4 end-4 text-white/70 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <div className="relative flex items-center gap-6">
                  <div
                    className="w-24 h-24 rounded-full bg-cover bg-center border-4 border-[var(--color-gold)] shrink-0"
                    style={{ backgroundImage: `url('${selected.avatar}')` }}
                  />
                  <div>
                    <p className="section-label !text-[var(--color-gold)] mb-2">{T.details.title[locale]}</p>
                    <h2 className={`text-3xl font-bold mb-1 ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                      {selected.firstName[locale]} {selected.lastName[locale]}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-white/70 flex-wrap">
                      <span className="font-mono">{selected.id}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{selected.departmentLabel[locale]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Teaching info */}
                <div>
                  <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                    {T.details.teaching[locale]}
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoRow label={T.headers.department[locale]} value={selected.departmentLabel[locale]} />
                    <InfoRow label={T.headers.experience[locale]} value={`${selected.experience} ${T.years[locale]}`} />
                    <InfoRow label={T.headers.subjects[locale]} value={selected.subjects.map((s) => s[locale]).join("، ")} />
                    <InfoRow label={T.headers.grades[locale]} value={selected.grades.map((g) => g[locale]).join("، ")} />
                    <InfoRow label={T.headers.status[locale]} value={T.status[selected.status][locale]} />
                  </dl>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-[var(--color-border)]">
                  <h3 className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${isRTL ? "font-arabic" : "uppercase"}`}>
                    {T.details.contact[locale]}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-3 p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                      <span className="text-sm text-[var(--color-navy)] truncate">{selected.email}</span>
                    </a>
                    <a
                      href={`tel:${selected.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                      <span className="text-sm text-[var(--color-navy)] num">{selected.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
                  <button
                    onClick={() => {
                      window.open(`mailto:${selected.email}`, "_blank");
                      setToast(T.details.emailSent[locale]);
                    }}
                    className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)] inline-flex"
                  >
                    <Mail className="w-4 h-4" />
                    {T.details.sendEmail[locale]}
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

function StatCard({
  label, value, color, icon: Icon, locale,
}: {
  label: string; value: number; color: string; icon: typeof Users; locale: Locale;
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-1">{label}</dt>
      <dd className="font-semibold text-[var(--color-navy)]">{value}</dd>
    </div>
  );
}
