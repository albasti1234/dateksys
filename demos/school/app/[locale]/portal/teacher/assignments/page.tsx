"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Plus,
  Clock,
  CheckCircle2,
  FileEdit,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type AssignmentStatus = "active" | "graded" | "draft";

interface Assignment {
  id: number;
  title: { ar: string; en: string };
  className: { ar: string; en: string };
  dueDate: string;
  status: AssignmentStatus;
  submitted: number;
  total: number;
  description: { ar: string; en: string };
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: {
      ar: "تمارين الكسور العشرية",
      en: "Decimal Fractions Exercises",
    },
    className: { ar: "الصف السادس أ - رياضيات", en: "Grade 6-A Mathematics" },
    dueDate: "2026-04-14",
    status: "active",
    submitted: 18,
    total: 22,
    description: {
      ar: "حل التمارين من صفحة ٤٥ إلى ٤٨ في كتاب الرياضيات. يرجى إظهار خطوات الحل كاملة.",
      en: "Complete exercises from pages 45 to 48 in the math textbook. Please show all working steps.",
    },
  },
  {
    id: 2,
    title: {
      ar: "مشروع الهندسة الفراغية",
      en: "3D Geometry Project",
    },
    className: { ar: "الصف السادس ب - رياضيات", en: "Grade 6-B Mathematics" },
    dueDate: "2026-04-18",
    status: "active",
    submitted: 12,
    total: 24,
    description: {
      ar: "بناء مجسّم هندسي ثلاثي الأبعاد باستخدام مواد متاحة في المنزل مع شرح خصائصه.",
      en: "Build a 3D geometric model using household materials and explain its properties.",
    },
  },
  {
    id: 3,
    title: {
      ar: "اختبار المعادلات الخطية",
      en: "Linear Equations Quiz",
    },
    className: { ar: "الصف الثامن أ - جبر", en: "Grade 8-A Algebra" },
    dueDate: "2026-04-10",
    status: "graded",
    submitted: 20,
    total: 20,
    description: {
      ar: "اختبار قصير يغطي حل المعادلات الخطية ذات المتغير الواحد والمتغيرين.",
      en: "Short quiz covering solving linear equations in one and two variables.",
    },
  },
  {
    id: 4,
    title: {
      ar: "ورقة عمل الضرب والقسمة",
      en: "Multiplication & Division Worksheet",
    },
    className: { ar: "الصف الخامس ج - حساب", en: "Grade 5-C Numeracy" },
    dueDate: "2026-04-12",
    status: "graded",
    submitted: 19,
    total: 21,
    description: {
      ar: "ورقة عمل تشمل ٢٠ مسألة في الضرب والقسمة مع مسائل كلامية.",
      en: "Worksheet with 20 multiplication and division problems including word problems.",
    },
  },
  {
    id: 5,
    title: {
      ar: "واجب النسب والتناسب",
      en: "Ratios & Proportions Homework",
    },
    className: { ar: "الصف السادس أ - رياضيات", en: "Grade 6-A Mathematics" },
    dueDate: "2026-04-20",
    status: "active",
    submitted: 5,
    total: 22,
    description: {
      ar: "حل مسائل النسب والتناسب في الوحدة الخامسة مع رسم الجداول التوضيحية.",
      en: "Solve ratio and proportion problems from Unit 5 including drawing ratio tables.",
    },
  },
  {
    id: 6,
    title: {
      ar: "تقييم منتصف الفصل - جبر",
      en: "Mid-Term Assessment — Algebra",
    },
    className: { ar: "الصف الثامن أ - جبر", en: "Grade 8-A Algebra" },
    dueDate: "2026-04-25",
    status: "draft",
    submitted: 0,
    total: 20,
    description: {
      ar: "تقييم شامل يغطي الوحدات ١-٤ من منهج الجبر للفصل الثاني.",
      en: "Comprehensive assessment covering Units 1-4 of the second semester algebra curriculum.",
    },
  },
  {
    id: 7,
    title: {
      ar: "نشاط الأنماط العددية",
      en: "Number Patterns Activity",
    },
    className: { ar: "الصف الخامس ج - حساب", en: "Grade 5-C Numeracy" },
    dueDate: "2026-04-22",
    status: "draft",
    submitted: 0,
    total: 21,
    description: {
      ar: "نشاط تفاعلي حول التعرّف على الأنماط العددية وإكمال التسلسلات.",
      en: "Interactive activity on recognizing number patterns and completing sequences.",
    },
  },
];

type Tab = "all" | "active" | "graded" | "draft";

export default function AssignmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-lg font-bold text-[var(--color-navy)]"
    : "font-serif text-lg font-bold text-[var(--color-navy)]";

  const T = {
    label: { ar: "الواجبات", en: "Assignments" },
    subtitle: {
      ar: "إدارة الواجبات والتقييمات لجميع الصفوف",
      en: "Manage assignments and assessments for all classes",
    },
    totalAssignments: { ar: "إجمالي الواجبات", en: "Total Assignments" },
    pendingGrading: { ar: "بانتظار التصحيح", en: "Pending Grading" },
    submittedThisWeek: { ar: "تسليمات هذا الأسبوع", en: "Submitted This Week" },
    tabs: {
      all: { ar: "الكل", en: "All" },
      active: { ar: "نشط", en: "Active" },
      graded: { ar: "مُصحَّح", en: "Graded" },
      draft: { ar: "مسودة", en: "Draft" },
    } as Record<Tab, { ar: string; en: string }>,
    due: { ar: "الموعد:", en: "Due:" },
    submitted: { ar: "تسليم", en: "submitted" },
    newAssignment: { ar: "واجب جديد", en: "New Assignment" },
    newToast: {
      ar: "سيتم إضافة خاصية إنشاء الواجبات قريباً",
      en: "Assignment creation coming soon",
    },
    statusLabels: {
      active: { ar: "نشط", en: "Active" },
      graded: { ar: "مُصحَّح", en: "Graded" },
      draft: { ar: "مسودة", en: "Draft" },
    } as Record<AssignmentStatus, { ar: string; en: string }>,
  };

  const statusColor: Record<AssignmentStatus, string> = {
    active: "bg-emerald-100 text-emerald-800",
    graded: "bg-blue-100 text-blue-800",
    draft: "bg-gray-100 text-gray-600",
  };

  const filtered =
    activeTab === "all"
      ? assignments
      : assignments.filter((a) => a.status === activeTab);

  const totalActive = assignments.filter((a) => a.status === "active").length;
  const pendingGrading = assignments
    .filter((a) => a.status === "active")
    .reduce((sum, a) => sum + a.submitted, 0);
  const submittedWeek = assignments
    .filter((a) => a.status !== "draft")
    .reduce((sum, a) => sum + a.submitted, 0);

  const stats = [
    {
      label: T.totalAssignments[locale],
      value: assignments.length,
      icon: ClipboardList,
      color: "#0F2C5C",
    },
    {
      label: T.pendingGrading[locale],
      value: pendingGrading,
      icon: Clock,
      color: "#C19A4B",
    },
    {
      label: T.submittedThisWeek[locale],
      value: submittedWeek,
      icon: Users,
      color: "#2D8659",
    },
  ];

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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)]"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: s.color }} />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: s.color }}
                />
              </div>
              <div
                className={`${
                  isRTL ? "font-arabic-display" : "font-serif"
                } text-4xl font-bold text-[var(--color-navy)] mb-1`}
              >
                <span className="num">{s.value}</span>
              </div>
              <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink)]">
                {s.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs + New button */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {(["all", "active", "graded", "draft"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold border transition-all ${
                activeTab === tab
                  ? "bg-[var(--color-navy)] text-white border-[var(--color-navy)]"
                  : "bg-white border-[var(--color-border)] hover:border-[var(--color-gold)] text-[var(--color-ink)]"
              }`}
            >
              {T.tabs[tab][locale]}
            </button>
          ))}
        </div>
        <button
          onClick={() => setToast(T.newToast[locale])}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {T.newAssignment[locale]}
        </button>
      </div>

      {/* Assignments list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((a, i) => {
            const isExpanded = expandedId === a.id;
            const pct = a.total > 0 ? Math.round((a.submitted / a.total) * 100) : 0;
            return (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white border border-[var(--color-border)] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : a.id)}
                  className="w-full p-5 flex items-center gap-4 text-start hover:bg-[var(--color-cream)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className={cardTitleClass}>{a.title[locale]}</span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold tracking-wider ${statusColor[a.status]}`}
                      >
                        {T.statusLabels[a.status][locale]}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-ink-soft)] mb-2">
                      {a.className[locale]}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--color-ink-soft)]">
                      <span>
                        {T.due[locale]}{" "}
                        <span className="num font-semibold">{a.dueDate}</span>
                      </span>
                      <span className="num font-semibold">
                        {a.submitted}/{a.total} {T.submitted[locale]}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 bg-[var(--color-cream)] w-full max-w-xs">
                      <div
                        className="h-full bg-[var(--color-gold)] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[var(--color-ink-soft)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--color-ink-soft)] shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-[var(--color-border)]">
                        <p
                          className={`text-sm text-[var(--color-ink)] ${
                            isRTL ? "leading-[2]" : "leading-relaxed"
                          }`}
                        >
                          {a.description[locale]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
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
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
