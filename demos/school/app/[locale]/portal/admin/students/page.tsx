"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  X,
  Filter,
  Download,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type Student = {
  id: string;
  firstName: { ar: string; en: string };
  lastName: { ar: string; en: string };
  grade: string;
  gradeLabel: { ar: string; en: string };
  gender: "M" | "F";
  nationality: { ar: string; en: string };
  status: "active" | "graduated" | "withdrawn";
  enrolledAt: string;
  guardian: {
    name: { ar: string; en: string };
    relationship: { ar: string; en: string };
    email: string;
    phone: string;
  };
  gpa: string;
  attendance: string;
  avatar: string;
};

const seedStudents: Student[] = [
  {
    id: "STU-2026-0001",
    firstName: { ar: "ليلى", en: "Leila" },
    lastName: { ar: "الحوراني", en: "Al-Hourani" },
    grade: "g6",
    gradeLabel: { ar: "الصف السادس", en: "Grade 6" },
    gender: "F",
    nationality: { ar: "أردنية", en: "Jordanian" },
    status: "active",
    enrolledAt: "2023-09-01",
    guardian: {
      name: { ar: "رانيا الحوراني", en: "Rania Al-Hourani" },
      relationship: { ar: "الأم", en: "Mother" },
      email: "rania.alhourani@example.com",
      phone: "+962 79 555 1234",
    },
    gpa: "92",
    attendance: "98%",
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
  },
  {
    id: "STU-2026-0002",
    firstName: { ar: "يوسف", en: "Yousef" },
    lastName: { ar: "العموش", en: "Al-Amoush" },
    grade: "kg2",
    gradeLabel: { ar: "KG2", en: "KG2" },
    gender: "M",
    nationality: { ar: "أردني", en: "Jordanian" },
    status: "active",
    enrolledAt: "2024-09-01",
    guardian: {
      name: { ar: "فادي العموش", en: "Fadi Al-Amoush" },
      relationship: { ar: "الأب", en: "Father" },
      email: "fadi.alamoush@example.com",
      phone: "+962 77 123 4567",
    },
    gpa: "—",
    attendance: "97%",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  },
  {
    id: "STU-2026-0003",
    firstName: { ar: "ميريم", en: "Miriam" },
    lastName: { ar: "شكري", en: "Shukri" },
    grade: "g7",
    gradeLabel: { ar: "الصف السابع", en: "Grade 7" },
    gender: "F",
    nationality: { ar: "لبنانية", en: "Lebanese" },
    status: "active",
    enrolledAt: "2022-09-01",
    guardian: {
      name: { ar: "نادية شكري", en: "Nadia Shukri" },
      relationship: { ar: "الأم", en: "Mother" },
      email: "nadia.shukri@example.com",
      phone: "+962 78 987 6543",
    },
    gpa: "88",
    attendance: "96%",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    id: "STU-2026-0004",
    firstName: { ar: "عمر", en: "Omar" },
    lastName: { ar: "الطراونة", en: "Al-Tarawneh" },
    grade: "g10",
    gradeLabel: { ar: "الصف العاشر", en: "Grade 10" },
    gender: "M",
    nationality: { ar: "أردني", en: "Jordanian" },
    status: "active",
    enrolledAt: "2020-09-01",
    guardian: {
      name: { ar: "سامر الطراونة", en: "Samer Al-Tarawneh" },
      relationship: { ar: "الأب", en: "Father" },
      email: "samer.tarawneh@example.com",
      phone: "+962 79 234 5678",
    },
    gpa: "85",
    attendance: "94%",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "STU-2026-0005",
    firstName: { ar: "زينة", en: "Zeina" },
    lastName: { ar: "القضاة", en: "Al-Qudah" },
    grade: "g11",
    gradeLabel: { ar: "الصف الحادي عشر", en: "Grade 11" },
    gender: "F",
    nationality: { ar: "أردنية", en: "Jordanian" },
    status: "active",
    enrolledAt: "2019-09-01",
    guardian: {
      name: { ar: "منى القضاة", en: "Mona Al-Qudah" },
      relationship: { ar: "الأم", en: "Mother" },
      email: "mona.qudah@example.com",
      phone: "+962 77 345 6789",
    },
    gpa: "96",
    attendance: "99%",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: "STU-2026-0006",
    firstName: { ar: "محمد", en: "Mohammad" },
    lastName: { ar: "السعيدي", en: "Al-Saeedi" },
    grade: "g9",
    gradeLabel: { ar: "الصف التاسع", en: "Grade 9" },
    gender: "M",
    nationality: { ar: "سوري", en: "Syrian" },
    status: "active",
    enrolledAt: "2021-09-01",
    guardian: {
      name: { ar: "أحمد السعيدي", en: "Ahmad Al-Saeedi" },
      relationship: { ar: "الأب", en: "Father" },
      email: "ahmad.saeedi@example.com",
      phone: "+962 79 456 7890",
    },
    gpa: "87",
    attendance: "93%",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
  },
  {
    id: "STU-2026-0007",
    firstName: { ar: "نور", en: "Nour" },
    lastName: { ar: "الحوراني", en: "Al-Hourani" },
    grade: "g8",
    gradeLabel: { ar: "الصف الثامن", en: "Grade 8" },
    gender: "F",
    nationality: { ar: "أردنية", en: "Jordanian" },
    status: "active",
    enrolledAt: "2022-09-01",
    guardian: {
      name: { ar: "ليلى الحوراني", en: "Leila Al-Hourani" },
      relationship: { ar: "الأم", en: "Mother" },
      email: "leila.hourani@example.com",
      phone: "+962 78 567 8901",
    },
    gpa: "91",
    attendance: "97%",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: "STU-2026-0008",
    firstName: { ar: "سامر", en: "Samer" },
    lastName: { ar: "المومني", en: "Al-Momani" },
    grade: "g5",
    gradeLabel: { ar: "الصف الخامس", en: "Grade 5" },
    gender: "M",
    nationality: { ar: "أردني", en: "Jordanian" },
    status: "active",
    enrolledAt: "2024-09-01",
    guardian: {
      name: { ar: "دانا المومني", en: "Dana Al-Momani" },
      relationship: { ar: "الأم", en: "Mother" },
      email: "dana.momani@example.com",
      phone: "+962 77 678 9012",
    },
    gpa: "89",
    attendance: "96%",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  },
  {
    id: "STU-2025-0045",
    firstName: { ar: "سارة", en: "Sara" },
    lastName: { ar: "الخطيب", en: "Al-Khatib" },
    grade: "g12",
    gradeLabel: { ar: "الصف الثاني عشر", en: "Grade 12" },
    gender: "F",
    nationality: { ar: "أردنية", en: "Jordanian" },
    status: "graduated",
    enrolledAt: "2018-09-01",
    guardian: {
      name: { ar: "أمل الخطيب", en: "Amal Al-Khatib" },
      relationship: { ar: "الأم", en: "Mother" },
      email: "amal.khatib@example.com",
      phone: "+962 79 789 0123",
    },
    gpa: "98",
    attendance: "99%",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: "STU-2025-0089",
    firstName: { ar: "كريم", en: "Karim" },
    lastName: { ar: "بدر", en: "Badr" },
    grade: "g11",
    gradeLabel: { ar: "الصف الحادي عشر", en: "Grade 11" },
    gender: "M",
    nationality: { ar: "فلسطيني", en: "Palestinian" },
    status: "active",
    enrolledAt: "2020-09-01",
    guardian: {
      name: { ar: "هشام بدر", en: "Hisham Badr" },
      relationship: { ar: "الأب", en: "Father" },
      email: "hisham.badr@example.com",
      phone: "+962 78 890 1234",
    },
    gpa: "90",
    attendance: "95%",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  },
];

const gradeFilters = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "kg", ar: "الروضة", en: "Kindergarten" },
  { key: "primary", ar: "الابتدائية", en: "Primary" },
  { key: "middle", ar: "الإعدادية", en: "Middle" },
  { key: "high", ar: "الثانوية", en: "High" },
];

function gradeCategory(grade: string): string {
  if (grade.startsWith("kg")) return "kg";
  const num = parseInt(grade.replace("g", ""), 10);
  if (num >= 1 && num <= 5) return "primary";
  if (num >= 6 && num <= 8) return "middle";
  return "high";
}

export default function AdminStudentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Student | null>(null);

  const searchLower = search.toLowerCase().trim();

  const filtered = seedStudents.filter((s) => {
    if (filter !== "all" && gradeCategory(s.grade) !== filter) return false;
    if (searchLower) {
      const hay = (
        s.firstName.ar +
        " " +
        s.lastName.ar +
        " " +
        s.firstName.en +
        " " +
        s.lastName.en +
        " " +
        s.id +
        " " +
        s.guardian.name.ar +
        " " +
        s.guardian.name.en
      ).toLowerCase();
      if (!hay.includes(searchLower)) return false;
    }
    return true;
  });

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "قائمة الطلبة", en: "Students" },
    subtitle: {
      ar: `إجمالي ${seedStudents.length} طالب وطالبة في الأكاديمية`,
      en: `${seedStudents.length} students enrolled at the academy`,
    },
    searchPlaceholder: {
      ar: "ابحث بالاسم أو الرقم أو ولي الأمر...",
      en: "Search by name, ID, or guardian...",
    },
    filters: { ar: "الفلاتر", en: "Filters" },
    export: { ar: "تصدير CSV", en: "Export CSV" },
    headers: {
      name: { ar: "الطالب/ة", en: "Student" },
      grade: { ar: "المرحلة", en: "Grade" },
      nationality: { ar: "الجنسية", en: "Nationality" },
      gpa: { ar: "المعدّل", en: "GPA" },
      attendance: { ar: "الحضور", en: "Attendance" },
      status: { ar: "الحالة", en: "Status" },
    },
    status: {
      active: { ar: "مُفعّل", en: "Active" },
      graduated: { ar: "خرّيج", en: "Graduated" },
      withdrawn: { ar: "منسحب", en: "Withdrawn" },
    },
    empty: {
      ar: "لا يوجد طلبة مطابقون للبحث",
      en: "No students match your search",
    },
    details: {
      title: { ar: "ملف الطالب/ة", en: "Student Profile" },
      basicInfo: { ar: "المعلومات الأساسية", en: "Basic Information" },
      academic: { ar: "الأداء الأكاديمي", en: "Academic Performance" },
      guardian: { ar: "ولي الأمر", en: "Guardian" },
      id: { ar: "الرقم", en: "ID" },
      enrolled: { ar: "تاريخ التسجيل", en: "Enrolled" },
      gender: { ar: "الجنس", en: "Gender" },
      male: { ar: "ذكر", en: "Male" },
      female: { ar: "أنثى", en: "Female" },
    },
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label={locale === "ar" ? "إجمالي الطلبة" : "Total Students"}
          value={seedStudents.filter((s) => s.status === "active").length}
          color="#0F2C5C"
          icon={Users}
          locale={locale}
        />
        <StatCard
          label={locale === "ar" ? "الابتدائية" : "Primary"}
          value={
            seedStudents.filter(
              (s) => gradeCategory(s.grade) === "primary" && s.status === "active"
            ).length
          }
          color="#2D8659"
          icon={GraduationCap}
          locale={locale}
        />
        <StatCard
          label={locale === "ar" ? "الإعدادية" : "Middle"}
          value={
            seedStudents.filter(
              (s) => gradeCategory(s.grade) === "middle" && s.status === "active"
            ).length
          }
          color="#C19A4B"
          icon={GraduationCap}
          locale={locale}
        />
        <StatCard
          label={locale === "ar" ? "الثانوية" : "High"}
          value={
            seedStudents.filter(
              (s) => gradeCategory(s.grade) === "high" && s.status === "active"
            ).length
          }
          color="#4A90E2"
          icon={GraduationCap}
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
            <button
              onClick={() => setSearch("")}
              className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button className="btn-outline !py-2.5 text-xs">
          <Filter className="w-4 h-4" />
          {T.filters[locale]}
        </button>
        <button className="btn-outline !py-2.5 text-xs">
          <Download className="w-4 h-4" />
          {T.export[locale]}
        </button>
      </div>

      {/* Grade category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {gradeFilters.map((f) => (
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
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {T.headers.name[locale]}
              </th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {T.headers.grade[locale]}
              </th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {T.headers.nationality[locale]}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {T.headers.gpa[locale]}
              </th>
              <th className="text-center p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {T.headers.attendance[locale]}
              </th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {T.headers.status[locale]}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-16 text-center text-[var(--color-ink-soft)]"
                >
                  {T.empty[locale]}
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50 cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--color-border)] shrink-0"
                        style={{ backgroundImage: `url('${s.avatar}')` }}
                      />
                      <div>
                        <div className="font-semibold text-[var(--color-navy)]">
                          {s.firstName[locale]} {s.lastName[locale]}
                        </div>
                        <div className="text-[10px] font-mono text-[var(--color-ink-soft)]">
                          {s.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{s.gradeLabel[locale]}</td>
                  <td className="p-4 text-sm text-[var(--color-ink-soft)]">
                    {s.nationality[locale]}
                  </td>
                  <td className="p-4 text-center font-serif font-bold text-[var(--color-navy)] num">
                    {s.gpa}
                  </td>
                  <td className="p-4 text-center text-sm num">
                    {s.attendance}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-wider ${
                        s.status === "active"
                          ? "bg-green-50 text-green-700"
                          : s.status === "graduated"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {T.status[s.status][locale]}
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
              {/* Header */}
              <div className="bg-[var(--color-navy)] text-white p-8 relative overflow-hidden">
                <div
                  className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ background: "#C19A4B" }}
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 end-4 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative flex items-center gap-6">
                  <div
                    className="w-24 h-24 rounded-full bg-cover bg-center border-4 border-[var(--color-gold)] shrink-0"
                    style={{ backgroundImage: `url('${selected.avatar}')` }}
                  />
                  <div>
                    <p className="section-label !text-[var(--color-gold)] mb-2">
                      {T.details.title[locale]}
                    </p>
                    <h2
                      className={`text-3xl font-bold mb-1 ${
                        isRTL ? "font-arabic-display" : "font-serif"
                      }`}
                    >
                      {selected.firstName[locale]} {selected.lastName[locale]}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-white/70 flex-wrap">
                      <span className="font-mono">{selected.id}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{selected.gradeLabel[locale]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                {/* Basic */}
                <div>
                  <h3
                    className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                      isRTL ? "font-arabic" : "uppercase"
                    }`}
                  >
                    {T.details.basicInfo[locale]}
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoRow
                      label={T.details.gender[locale]}
                      value={
                        selected.gender === "M"
                          ? T.details.male[locale]
                          : T.details.female[locale]
                      }
                    />
                    <InfoRow
                      label={T.headers.nationality[locale]}
                      value={selected.nationality[locale]}
                    />
                    <InfoRow
                      label={T.details.enrolled[locale]}
                      value={selected.enrolledAt}
                    />
                    <InfoRow
                      label={T.headers.status[locale]}
                      value={T.status[selected.status][locale]}
                    />
                  </dl>
                </div>

                {/* Academic */}
                <div className="pt-6 border-t border-[var(--color-border)]">
                  <h3
                    className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                      isRTL ? "font-arabic" : "uppercase"
                    }`}
                  >
                    {T.details.academic[locale]}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[var(--color-cream)] p-5">
                      <div className="text-[10px] text-[var(--color-ink-soft)] mb-1">
                        {T.headers.gpa[locale]}
                      </div>
                      <div
                        className={`text-4xl font-bold text-[var(--color-navy)] num ${
                          isRTL ? "font-arabic-display" : "font-serif"
                        }`}
                      >
                        {selected.gpa}
                      </div>
                    </div>
                    <div className="bg-[var(--color-cream)] p-5">
                      <div className="text-[10px] text-[var(--color-ink-soft)] mb-1">
                        {T.headers.attendance[locale]}
                      </div>
                      <div
                        className={`text-4xl font-bold text-[var(--color-navy)] num ${
                          isRTL ? "font-arabic-display" : "font-serif"
                        }`}
                      >
                        {selected.attendance}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guardian */}
                <div className="pt-6 border-t border-[var(--color-border)]">
                  <h3
                    className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                      isRTL ? "font-arabic" : "uppercase"
                    }`}
                  >
                    {T.details.guardian[locale]}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-navy)]">
                        {selected.guardian.name[locale]}
                      </div>
                      <div className="text-xs text-[var(--color-ink-soft)]">
                        {selected.guardian.relationship[locale]}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href={`mailto:${selected.guardian.email}`}
                      className="flex items-center gap-3 p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                      <span className="text-sm text-[var(--color-navy)] truncate">
                        {selected.guardian.email}
                      </span>
                    </a>
                    <a
                      href={`tel:${selected.guardian.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 p-4 bg-[var(--color-cream)] hover:bg-[var(--color-cream-warm)] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                      <span className="text-sm text-[var(--color-navy)] num">
                        {selected.guardian.phone}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon: Icon,
  locale,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Users;
  locale: Locale;
}) {
  const isRTL = locale === "ar";
  return (
    <div className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden">
      <div
        className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10"
        style={{ background: color }}
      />
      <div className="relative">
        <Icon className="w-5 h-5 mb-3" style={{ color }} />
        <div
          className={`text-4xl font-bold text-[var(--color-navy)] mb-1 ${
            isRTL ? "font-arabic-display" : "font-serif"
          }`}
        >
          {value}
        </div>
        <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)]">
          {label}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-1">
        {label}
      </dt>
      <dd className="font-semibold text-[var(--color-navy)]">{value}</dd>
    </div>
  );
}
