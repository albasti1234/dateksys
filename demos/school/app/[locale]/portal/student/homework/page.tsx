"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Send,
  X,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

type HWStatus = "pending" | "submitted" | "late" | "graded";

interface HWItem {
  id: number;
  subject: { ar: string; en: string };
  title: { ar: string; en: string };
  teacher: { ar: string; en: string };
  due: { ar: string; en: string };
  status: HWStatus;
  description: { ar: string; en: string };
}

const initialHomework: HWItem[] = [
  {
    id: 1,
    subject: { ar: "الرياضيات", en: "Mathematics" },
    title: { ar: "حل تمارين الكسور — صفحة ٤٥", en: "Fractions Exercises — Page 45" },
    teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
    due: { ar: "١٤ نيسان ٢٠٢٦", en: "14 Apr 2026" },
    status: "pending",
    description: {
      ar: "حلّي التمارين من ١ إلى ١٠ في صفحة ٤٥. ركّزي على تبسيط الكسور وإيجاد المقام المشترك.",
      en: "Solve exercises 1–10 on page 45. Focus on simplifying fractions and finding common denominators.",
    },
  },
  {
    id: 2,
    subject: { ar: "اللغة العربية", en: "Arabic" },
    title: { ar: "تعبير كتابي: يوم مميّز", en: "Essay: A Special Day" },
    teacher: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
    due: { ar: "١٥ نيسان ٢٠٢٦", en: "15 Apr 2026" },
    status: "pending",
    description: {
      ar: "اكتبي موضوع تعبير عن يوم مميّز في حياتك (١٥٠ كلمة على الأقل). استخدمي أدوات الربط والتشبيهات.",
      en: "Write an essay about a special day in your life (150+ words). Use linking words and similes.",
    },
  },
  {
    id: 3,
    subject: { ar: "العلوم", en: "Science" },
    title: { ar: "تقرير تجربة الضوء", en: "Light Experiment Report" },
    teacher: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
    due: { ar: "١٣ نيسان ٢٠٢٦", en: "13 Apr 2026" },
    status: "submitted",
    description: {
      ar: "اكتبي تقرير التجربة عن انكسار الضوء. يجب أن يتضمّن: الهدف، الأدوات، الخطوات، النتائج، الاستنتاج.",
      en: "Write the lab report on light refraction. Include: objective, materials, steps, results, conclusion.",
    },
  },
  {
    id: 4,
    subject: { ar: "اللغة الإنجليزية", en: "English" },
    title: { ar: "قراءة الفصل ٧ + أسئلة", en: "Read Chapter 7 + Questions" },
    teacher: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
    due: { ar: "١٢ نيسان ٢٠٢٦", en: "12 Apr 2026" },
    status: "graded",
    description: {
      ar: "اقرئي الفصل السابع من الرواية وأجيبي على أسئلة الفهم في نهاية الفصل.",
      en: "Read Chapter 7 of the novel and answer the comprehension questions at the end.",
    },
  },
  {
    id: 5,
    subject: { ar: "التربية الوطنية", en: "Civics" },
    title: { ar: "بحث عن حقوق الطفل", en: "Research: Children's Rights" },
    teacher: { ar: "أ. ديمة الحوراني", en: "Ms. Dima Al-Hourani" },
    due: { ar: "١٦ نيسان ٢٠٢٦", en: "16 Apr 2026" },
    status: "pending",
    description: {
      ar: "ابحثي عن ٥ حقوق أساسية للطفل واكتبي فقرة عن كل حق مع أمثلة من الحياة اليومية.",
      en: "Research 5 fundamental children's rights and write a paragraph about each with real-life examples.",
    },
  },
  {
    id: 6,
    subject: { ar: "التاريخ", en: "History" },
    title: { ar: "خط زمني: الحضارة الرومانية", en: "Timeline: Roman Civilization" },
    teacher: { ar: "أ. محمود السعيدي", en: "Mr. Mahmoud Al-Saeedi" },
    due: { ar: "١١ نيسان ٢٠٢٦", en: "11 Apr 2026" },
    status: "late",
    description: {
      ar: "ارسمي خطاً زمنياً يتضمّن ١٠ أحداث رئيسية في تاريخ الحضارة الرومانية.",
      en: "Draw a timeline with 10 key events in Roman civilization history.",
    },
  },
  {
    id: 7,
    subject: { ar: "الرياضيات", en: "Mathematics" },
    title: { ar: "مسائل النسبة والتناسب", en: "Ratio & Proportion Problems" },
    teacher: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
    due: { ar: "١٠ نيسان ٢٠٢٦", en: "10 Apr 2026" },
    status: "graded",
    description: {
      ar: "حلّي المسائل ١–٨ من ورقة العمل الموزّعة في الصف.",
      en: "Solve problems 1–8 from the worksheet distributed in class.",
    },
  },
  {
    id: 8,
    subject: { ar: "الفنون", en: "Arts" },
    title: { ar: "رسم مشهد طبيعي بالألوان المائية", en: "Watercolor Landscape Painting" },
    teacher: { ar: "أ. كريم بدر", en: "Mr. Karim Badr" },
    due: { ar: "١٧ نيسان ٢٠٢٦", en: "17 Apr 2026" },
    status: "pending",
    description: {
      ar: "ارسمي مشهداً طبيعياً باستخدام الألوان المائية. اختاري موضوعاً من بيئتك المحلية.",
      en: "Paint a landscape using watercolors. Choose a subject from your local environment.",
    },
  },
];

const statusConfig: Record<
  HWStatus,
  { label: { ar: string; en: string }; color: string; bg: string }
> = {
  pending: {
    label: { ar: "قيد الانتظار", en: "Pending" },
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  submitted: {
    label: { ar: "تم التسليم", en: "Submitted" },
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  late: {
    label: { ar: "متأخر", en: "Late" },
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
  },
  graded: {
    label: { ar: "تم التصحيح", en: "Graded" },
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
};

export default function StudentHomeworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [homework, setHomework] = useState<HWItem[]>(initialHomework);
  const [filter, setFilter] = useState<"all" | HWStatus>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (id: number) => {
    setHomework((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "submitted" as HWStatus } : h))
    );
    showToast(locale === "ar" ? "تم تسليم الواجب بنجاح!" : "Homework submitted successfully!");
  };

  const filtered =
    filter === "all" ? homework : homework.filter((h) => h.status === filter);

  const completedCount = homework.filter(
    (h) => h.status === "submitted" || h.status === "graded"
  ).length;

  const tabs: { key: "all" | HWStatus; label: { ar: string; en: string } }[] = [
    { key: "all", label: { ar: "الكل", en: "All" } },
    { key: "pending", label: { ar: "قيد الانتظار", en: "Pending" } },
    { key: "submitted", label: { ar: "تم التسليم", en: "Submitted" } },
    { key: "late", label: { ar: "متأخر", en: "Late" } },
  ];

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
          <BookOpen className="w-3 h-3" />
          <span>{locale === "ar" ? "الواجبات المدرسية" : "HOMEWORK"}</span>
        </div>
        <h1 className={h1Class}>
          {locale === "ar" ? "واجباتي" : "My Homework"}
        </h1>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white border border-[var(--color-border)] p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[var(--color-navy)]">
            {locale === "ar"
              ? "التقدّم هذا الأسبوع"
              : "This week's progress"}
          </span>
          <span className="text-sm font-bold text-[var(--color-gold)]">
            <span className="num">{completedCount}</span>{" "}
            {locale === "ar" ? "من" : "of"}{" "}
            <span className="num">{homework.length}</span>{" "}
            {locale === "ar" ? "مكتمل" : "completed"}
          </span>
        </div>
        <div className="w-full h-3 bg-[var(--color-cream)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-navy)]"
            initial={{ width: 0 }}
            animate={{
              width: `${(completedCount / homework.length) * 100}%`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-xs font-semibold border transition-all whitespace-nowrap ${
              filter === tab.key
                ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                : "bg-white border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]"
            }`}
          >
            {tab.label[locale]}
          </button>
        ))}
      </div>

      {/* Homework list */}
      <div className="space-y-4">
        {filtered.map((hw, i) => {
          const sc = statusConfig[hw.status];
          const isExpanded = expandedId === hw.id;
          return (
            <motion.div
              key={hw.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-[var(--color-border)] overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : hw.id)}
                className="w-full p-5 flex items-center gap-4 text-start"
              >
                <div className="w-1 h-12 bg-[var(--color-gold)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold tracking-wider text-[var(--color-gold)] mb-1">
                    {hw.subject[locale]}
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-navy)]">
                    {hw.title[locale]}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)] mt-1">
                    {hw.teacher[locale]}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-xs text-[var(--color-ink-soft)]">
                    <Clock className="w-3 h-3" />
                    <span className="num">{hw.due[locale]}</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-[10px] font-bold border ${sc.bg} ${sc.color}`}
                  >
                    {sc.label[locale]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-ink-soft)] transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-[var(--color-border-soft)]">
                      <p
                        className={`text-sm text-[var(--color-ink)] mt-4 ${
                          isRTL ? "leading-[2]" : "leading-relaxed"
                        }`}
                      >
                        {hw.description[locale]}
                      </p>
                      {hw.status === "pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubmit(hw.id);
                          }}
                          className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-dark)] transition-colors"
                        >
                          <Send
                            className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`}
                          />
                          {locale === "ar" ? "تسليم الواجب" : "Submit Homework"}
                        </button>
                      )}
                      {hw.status === "late" && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          {locale === "ar"
                            ? "هذا الواجب متأخر. تواصلي مع المعلّم."
                            : "This homework is late. Contact your teacher."}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--color-ink-soft)]">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">
            {locale === "ar"
              ? "لا توجد واجبات في هذا التصنيف"
              : "No homework in this category"}
          </p>
        </div>
      )}
    </div>
  );
}
