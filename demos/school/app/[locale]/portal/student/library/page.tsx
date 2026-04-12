"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library,
  Search,
  BookOpen,
  FileText,
  PlayCircle,
  Download,
  Loader2,
  CheckCircle2,
  X,
  Clock,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

type ResourceType = "textbook" | "exam" | "guide" | "video";

interface Resource {
  id: number;
  title: { ar: string; en: string };
  subject: { ar: string; en: string };
  type: ResourceType;
  size: string;
}

const allResources: Resource[] = [
  {
    id: 1,
    title: { ar: "كتاب الرياضيات — الصف السادس", en: "Mathematics Textbook — Grade 6" },
    subject: { ar: "الرياضيات", en: "Mathematics" },
    type: "textbook",
    size: "24 MB",
  },
  {
    id: 2,
    title: { ar: "اختبار العلوم — الفصل الأول ٢٠٢٥", en: "Science Exam — Term 1 2025" },
    subject: { ar: "العلوم", en: "Science" },
    type: "exam",
    size: "1.2 MB",
  },
  {
    id: 3,
    title: { ar: "دليل مراجعة العربية — النحو", en: "Arabic Review Guide — Grammar" },
    subject: { ar: "اللغة العربية", en: "Arabic" },
    type: "guide",
    size: "3.5 MB",
  },
  {
    id: 4,
    title: { ar: "فيديو: الكسور العشرية", en: "Video: Decimal Fractions" },
    subject: { ar: "الرياضيات", en: "Mathematics" },
    type: "video",
    size: "45 MB",
  },
  {
    id: 5,
    title: { ar: "كتاب العلوم — الصف السادس", en: "Science Textbook — Grade 6" },
    subject: { ar: "العلوم", en: "Science" },
    type: "textbook",
    size: "28 MB",
  },
  {
    id: 6,
    title: { ar: "اختبار الرياضيات — الفصل الثاني ٢٠٢٥", en: "Math Exam — Term 2 2025" },
    subject: { ar: "الرياضيات", en: "Mathematics" },
    type: "exam",
    size: "980 KB",
  },
  {
    id: 7,
    title: { ar: "فيديو: الدورة الدموية", en: "Video: Blood Circulation" },
    subject: { ar: "العلوم", en: "Science" },
    type: "video",
    size: "62 MB",
  },
  {
    id: 8,
    title: { ar: "دليل مراجعة الإنجليزية — القواعد", en: "English Review Guide — Grammar" },
    subject: { ar: "اللغة الإنجليزية", en: "English" },
    type: "guide",
    size: "2.8 MB",
  },
  {
    id: 9,
    title: { ar: "كتاب التاريخ — الصف السادس", en: "History Textbook — Grade 6" },
    subject: { ar: "التاريخ", en: "History" },
    type: "textbook",
    size: "18 MB",
  },
  {
    id: 10,
    title: { ar: "فيديو: Past Tense in English", en: "Video: Past Tense in English" },
    subject: { ar: "اللغة الإنجليزية", en: "English" },
    type: "video",
    size: "38 MB",
  },
];

const recentIds = [1, 4, 3];

const typeConfig: Record<
  ResourceType,
  {
    icon: typeof BookOpen;
    label: { ar: string; en: string };
    color: string;
    bg: string;
  }
> = {
  textbook: {
    icon: BookOpen,
    label: { ar: "كتاب", en: "Textbook" },
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  exam: {
    icon: FileText,
    label: { ar: "اختبار سابق", en: "Past Exam" },
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  guide: {
    icon: FileText,
    label: { ar: "دليل مراجعة", en: "Study Guide" },
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  video: {
    icon: PlayCircle,
    label: { ar: "فيديو", en: "Video" },
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
  },
};

const filterTabs: { key: "all" | ResourceType; label: { ar: string; en: string } }[] = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "textbook", label: { ar: "الكتب", en: "Textbooks" } },
  { key: "exam", label: { ar: "اختبارات سابقة", en: "Past Exams" } },
  { key: "guide", label: { ar: "أدلة المراجعة", en: "Study Guides" } },
  { key: "video", label: { ar: "فيديوهات", en: "Videos" } },
];

export default function StudentLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | ResourceType>("all");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (resource: Resource) => {
    setLoadingId(resource.id);
    setTimeout(() => {
      setLoadingId(null);
      const action =
        resource.type === "video"
          ? locale === "ar"
            ? "جاري تشغيل الفيديو..."
            : "Playing video..."
          : locale === "ar"
          ? "تم تنزيل الملف بنجاح!"
          : "File downloaded successfully!";
      showToast(action);
    }, 1500);
  };

  const filtered = allResources.filter((r) => {
    const matchFilter = activeFilter === "all" || r.type === activeFilter;
    const matchSearch =
      !search ||
      r.title[locale].toLowerCase().includes(search.toLowerCase()) ||
      r.subject[locale].toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const recentResources = allResources.filter((r) => recentIds.includes(r.id));

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 inset-x-0 z-50 flex justify-center"
          >
            <div className="bg-green-600 text-white px-6 py-3 shadow-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-semibold">{toast}</span>
              <button onClick={() => setToast(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs tracking-widest text-[var(--color-gold)] mb-2">
          <Library className="w-3 h-3" />
          <span>{locale === "ar" ? "المكتبة الرقمية" : "DIGITAL LIBRARY"}</span>
        </div>
        <h1 className={h1Class}>
          {locale === "ar" ? "مكتبتي" : "My Library"}
        </h1>
      </motion.div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white border border-[var(--color-border)] px-4 py-3 mb-6">
        <Search className="w-4 h-4 text-[var(--color-ink-soft)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            locale === "ar" ? "ابحثي عن كتاب أو مادة..." : "Search for a book or subject..."
          }
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>

      {/* Recently accessed */}
      {!search && activeFilter === "all" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <h2
            className={`text-sm font-semibold text-[var(--color-navy)] mb-3 flex items-center gap-2 ${
              isRTL ? "font-arabic-display" : "font-serif"
            }`}
          >
            <Clock className="w-4 h-4 text-[var(--color-gold)]" />
            {locale === "ar" ? "آخر ما تصفّحتِه" : "Recently Accessed"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {recentResources.map((r) => {
              const tc = typeConfig[r.type];
              const Icon = tc.icon;
              return (
                <div
                  key={r.id}
                  className="bg-[var(--color-cream)] border border-[var(--color-border-soft)] p-4 flex items-center gap-3"
                >
                  <Icon className={`w-5 h-5 shrink-0 ${tc.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[var(--color-navy)] truncate">
                      {r.title[locale]}
                    </div>
                    <div className="text-[10px] text-[var(--color-ink-soft)]">
                      {r.subject[locale]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 text-xs font-semibold border transition-all whitespace-nowrap ${
              activeFilter === tab.key
                ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                : "bg-white border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]"
            }`}
          >
            {tab.label[locale]}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((r, i) => {
          const tc = typeConfig[r.type];
          const Icon = tc.icon;
          const isLoading = loadingId === r.id;
          const isVideo = r.type === "video";

          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white border border-[var(--color-border)] p-5"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 shrink-0 flex items-center justify-center ${tc.bg} border`}
                >
                  <Icon className={`w-6 h-6 ${tc.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[var(--color-navy)]">
                    {r.title[locale]}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                    {r.subject[locale]}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold border ${tc.bg} ${tc.color}`}
                    >
                      {tc.label[locale]}
                    </span>
                    <span className="text-[10px] text-[var(--color-ink-soft)] num">
                      {r.size}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleAction(r)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-navy)] text-white text-xs font-semibold hover:bg-[var(--color-navy-dark)] transition-colors disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isVideo ? (
                    <PlayCircle className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isLoading
                    ? locale === "ar"
                      ? "جارٍ التحميل..."
                      : "Loading..."
                    : isVideo
                    ? locale === "ar"
                      ? "مشاهدة"
                      : "Watch"
                    : locale === "ar"
                    ? "تنزيل"
                    : "Download"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--color-ink-soft)]">
          <Library className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">
            {locale === "ar"
              ? "لم يتم العثور على نتائج"
              : "No results found"}
          </p>
        </div>
      )}
    </div>
  );
}
