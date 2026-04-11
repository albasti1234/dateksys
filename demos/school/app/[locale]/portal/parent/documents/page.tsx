"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  FileSignature,
  FileBadge,
  Receipt,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { useActiveChild } from "@/lib/parentStore";

type DocCategory =
  | "reports"
  | "receipts"
  | "forms"
  | "certificates"
  | "circulars";

type Document = {
  id: string;
  category: DocCategory;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  issuedAt: string;
  sizeKB: number;
};

const allDocs: Document[] = [
  {
    id: "doc-001",
    category: "reports",
    title: {
      ar: "تقرير الفصل الثاني ٢٠٢٥-٢٠٢٦",
      en: "Term 2 Report Card 2025-2026",
    },
    description: {
      ar: "تقرير أداء أكاديمي كامل مع ملاحظات المعلّمين",
      en: "Complete academic report with teacher comments",
    },
    issuedAt: "٢٠ كانون الثاني ٢٠٢٦",
    sizeKB: 842,
  },
  {
    id: "doc-002",
    category: "reports",
    title: {
      ar: "تقرير الفصل الأول ٢٠٢٥-٢٠٢٦",
      en: "Term 1 Report Card 2025-2026",
    },
    description: {
      ar: "تقرير أداء أكاديمي للفصل الأول",
      en: "Academic report for the first term",
    },
    issuedAt: "١٥ كانون الأول ٢٠٢٥",
    sizeKB: 796,
  },
  {
    id: "doc-003",
    category: "receipts",
    title: {
      ar: "إيصال رسوم الفصل الأول",
      en: "Term 1 Tuition Receipt",
    },
    description: {
      ar: "إيصال دفعة ٢٬١٠٠ د.أ مؤرّخ في ١٥ أيلول",
      en: "Receipt for 2,100 JOD payment dated Sep 15",
    },
    issuedAt: "١٥ أيلول ٢٠٢٥",
    sizeKB: 124,
  },
  {
    id: "doc-004",
    category: "receipts",
    title: {
      ar: "إيصال رسوم الفصل الثاني",
      en: "Term 2 Tuition Receipt",
    },
    description: {
      ar: "إيصال دفعة ٢٬١٠٠ د.أ مؤرّخ في ١٠ كانون الثاني",
      en: "Receipt for 2,100 JOD payment dated Jan 10",
    },
    issuedAt: "١٠ كانون الثاني ٢٠٢٦",
    sizeKB: 128,
  },
  {
    id: "doc-005",
    category: "forms",
    title: {
      ar: "نموذج طلب إجازة طالب",
      en: "Student Leave Request Form",
    },
    description: {
      ar: "لتعبئته عند الحاجة لإجازة طويلة",
      en: "To fill out when requesting extended leave",
    },
    issuedAt: "١ أيلول ٢٠٢٥",
    sizeKB: 56,
  },
  {
    id: "doc-006",
    category: "forms",
    title: {
      ar: "نموذج تحديث البيانات الطبية",
      en: "Medical Information Update Form",
    },
    description: {
      ar: "تحديث سنوي إلزامي قبل بدء العام الدراسي",
      en: "Annual mandatory update before the new school year",
    },
    issuedAt: "١ أيلول ٢٠٢٥",
    sizeKB: 74,
  },
  {
    id: "doc-007",
    category: "certificates",
    title: {
      ar: "شهادة تسجيل رسمية",
      en: "Official Enrollment Certificate",
    },
    description: {
      ar: "للاستخدام الرسمي مع الجهات الحكومية والسفارات",
      en: "For official use with government and embassies",
    },
    issuedAt: "٢٠ أيلول ٢٠٢٥",
    sizeKB: 180,
  },
  {
    id: "doc-008",
    category: "circulars",
    title: {
      ar: "نشرة الأسبوع — ١٠ نيسان ٢٠٢٦",
      en: "Weekly Newsletter — April 10, 2026",
    },
    description: {
      ar: "آخر أخبار الأكاديمية وفعاليات الأسبوع القادم",
      en: "Latest academy news and upcoming week events",
    },
    issuedAt: "١٠ نيسان ٢٠٢٦",
    sizeKB: 420,
  },
  {
    id: "doc-009",
    category: "circulars",
    title: {
      ar: "تعميم — اجتماع أولياء الأمور",
      en: "Circular — Parent-Teacher Meeting",
    },
    description: {
      ar: "الخميس ١٧ نيسان، من ٤ إلى ٦ مساءً",
      en: "Thursday April 17, 4 PM to 6 PM",
    },
    issuedAt: "٥ نيسان ٢٠٢٦",
    sizeKB: 92,
  },
];

const categoryConfig: Record<
  DocCategory,
  { icon: typeof FileText; ar: string; en: string; color: string }
> = {
  reports: {
    icon: GraduationCap,
    ar: "التقارير",
    en: "Reports",
    color: "#2D8659",
  },
  receipts: {
    icon: Receipt,
    ar: "الإيصالات",
    en: "Receipts",
    color: "#C19A4B",
  },
  forms: {
    icon: ClipboardList,
    ar: "النماذج",
    en: "Forms",
    color: "#4A90E2",
  },
  certificates: {
    icon: FileBadge,
    ar: "الشهادات",
    en: "Certificates",
    color: "#0F2C5C",
  },
  circulars: {
    icon: FileSignature,
    ar: "التعاميم",
    en: "Circulars",
    color: "#6B7280",
  },
};

export default function ParentDocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const [activeChild] = useActiveChild();

  const [filter, setFilter] = useState<DocCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const searchLower = search.toLowerCase().trim();
  const filtered = allDocs.filter((d) => {
    if (filter !== "all" && d.category !== filter) return false;
    if (searchLower) {
      const hay = (
        d.title.ar +
        " " +
        d.title.en +
        " " +
        d.description.ar +
        " " +
        d.description.en
      ).toLowerCase();
      if (!hay.includes(searchLower)) return false;
    }
    return true;
  });

  const handleDownload = (doc: Document) => {
    setDownloading(doc.id);
    setTimeout(() => {
      setDownloading(null);
      setToast(
        locale === "ar"
          ? `تمّ تحميل: ${doc.title.ar}`
          : `Downloaded: ${doc.title.en}`
      );
      setTimeout(() => setToast(null), 2500);
    }, 1200);
  };

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "الوثائق", en: "Documents" },
    subtitle: {
      ar: `جميع الوثائق الخاصة بـ ${activeChild.firstName.ar} ${activeChild.lastName.ar}`,
      en: `All documents for ${activeChild.firstName.en} ${activeChild.lastName.en}`,
    },
    all: { ar: "الكل", en: "All" },
    searchPlaceholder: {
      ar: "ابحث عن وثيقة...",
      en: "Search documents...",
    },
    download: { ar: "تحميل", en: "Download" },
    downloading: { ar: "جارٍ التحميل...", en: "Downloading..." },
    empty: {
      ar: "لا توجد وثائق مطابقة",
      en: "No documents match",
    },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* Search + filters */}
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
        </div>
        <button className="btn-outline !py-2.5 text-xs">
          <Filter className="w-4 h-4" />
          {locale === "ar" ? "فلترة" : "Filter"}
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
            filter === "all"
              ? "bg-[var(--color-navy)] text-white"
              : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
          }`}
        >
          {T.all[locale]} ({allDocs.length})
        </button>
        {(Object.keys(categoryConfig) as DocCategory[]).map((cat) => {
          const conf = categoryConfig[cat];
          const count = allDocs.filter((d) => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                filter === cat
                  ? "bg-[var(--color-navy)] text-white"
                  : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
              }`}
            >
              {conf[locale]} ({count})
            </button>
          );
        })}
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-[var(--color-ink-soft)]">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p>{T.empty[locale]}</p>
            </div>
          ) : (
            filtered.map((doc) => {
              const conf = categoryConfig[doc.category];
              const Icon = conf.icon;
              const isDownloading = downloading === doc.id;
              return (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-[var(--color-border)] p-5 hover:border-[var(--color-gold)] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-12 h-12 flex items-center justify-center"
                      style={{ background: conf.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] tracking-wider font-semibold mb-1" style={{ color: conf.color }}>
                        {conf[locale]}
                      </div>
                      <h3
                        className={`font-semibold text-[var(--color-navy)] mb-2 leading-snug ${
                          isRTL ? "font-arabic-display" : "font-serif"
                        }`}
                      >
                        {doc.title[locale]}
                      </h3>
                      <p className="text-xs text-[var(--color-ink-soft)] mb-4 leading-relaxed">
                        {doc.description[locale]}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[10px] text-[var(--color-ink-soft)]">
                          {doc.issuedAt} ·{" "}
                          <span className="num">{doc.sizeKB} KB</span>
                        </div>
                        <button
                          onClick={() => handleDownload(doc)}
                          disabled={isDownloading}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-cream)] hover:bg-[var(--color-navy)] hover:text-white text-xs font-semibold transition-colors disabled:opacity-50"
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              {T.downloading[locale]}
                            </>
                          ) : (
                            <>
                              <Download className="w-3 h-3" />
                              {T.download[locale]}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[60] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3 max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
