"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type Transaction = {
  id: string;
  student: { ar: string; en: string };
  grade: { ar: string; en: string };
  type: "tuition" | "transport" | "books" | "uniform" | "activities";
  typeLabel: { ar: string; en: string };
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dateLabel: { ar: string; en: string };
};

const seedTransactions: Transaction[] = [
  {
    id: "INV-2026-0401",
    student: { ar: "ليلى الحوراني", en: "Leila Al-Hourani" },
    grade: { ar: "الصف السادس", en: "Grade 6" },
    type: "tuition",
    typeLabel: { ar: "رسوم دراسية", en: "Tuition" },
    amount: 1200,
    status: "paid",
    date: "2026-04-01",
    dateLabel: { ar: "١ نيسان ٢٠٢٦", en: "Apr 1, 2026" },
  },
  {
    id: "INV-2026-0402",
    student: { ar: "يوسف العموش", en: "Yousef Al-Amoush" },
    grade: { ar: "KG2", en: "KG2" },
    type: "tuition",
    typeLabel: { ar: "رسوم دراسية", en: "Tuition" },
    amount: 950,
    status: "paid",
    date: "2026-04-02",
    dateLabel: { ar: "٢ نيسان ٢٠٢٦", en: "Apr 2, 2026" },
  },
  {
    id: "INV-2026-0403",
    student: { ar: "عمر الطراونة", en: "Omar Al-Tarawneh" },
    grade: { ar: "الصف العاشر", en: "Grade 10" },
    type: "transport",
    typeLabel: { ar: "نقل مدرسي", en: "Transport" },
    amount: 350,
    status: "pending",
    date: "2026-04-03",
    dateLabel: { ar: "٣ نيسان ٢٠٢٦", en: "Apr 3, 2026" },
  },
  {
    id: "INV-2026-0404",
    student: { ar: "زينة القضاة", en: "Zeina Al-Qudah" },
    grade: { ar: "الصف الحادي عشر", en: "Grade 11" },
    type: "books",
    typeLabel: { ar: "كتب مدرسية", en: "Textbooks" },
    amount: 180,
    status: "paid",
    date: "2026-04-04",
    dateLabel: { ar: "٤ نيسان ٢٠٢٦", en: "Apr 4, 2026" },
  },
  {
    id: "INV-2026-0405",
    student: { ar: "محمد السعيدي", en: "Mohammad Al-Saeedi" },
    grade: { ar: "الصف التاسع", en: "Grade 9" },
    type: "tuition",
    typeLabel: { ar: "رسوم دراسية", en: "Tuition" },
    amount: 1200,
    status: "overdue",
    date: "2026-03-15",
    dateLabel: { ar: "١٥ آذار ٢٠٢٦", en: "Mar 15, 2026" },
  },
  {
    id: "INV-2026-0406",
    student: { ar: "نور الحوراني", en: "Nour Al-Hourani" },
    grade: { ar: "الصف الثامن", en: "Grade 8" },
    type: "uniform",
    typeLabel: { ar: "زي مدرسي", en: "Uniform" },
    amount: 120,
    status: "paid",
    date: "2026-04-05",
    dateLabel: { ar: "٥ نيسان ٢٠٢٦", en: "Apr 5, 2026" },
  },
  {
    id: "INV-2026-0407",
    student: { ar: "سامر المومني", en: "Samer Al-Momani" },
    grade: { ar: "الصف الخامس", en: "Grade 5" },
    type: "activities",
    typeLabel: { ar: "أنشطة لامنهجية", en: "Activities" },
    amount: 200,
    status: "pending",
    date: "2026-04-06",
    dateLabel: { ar: "٦ نيسان ٢٠٢٦", en: "Apr 6, 2026" },
  },
  {
    id: "INV-2026-0408",
    student: { ar: "كريم بدر", en: "Karim Badr" },
    grade: { ar: "الصف الحادي عشر", en: "Grade 11" },
    type: "tuition",
    typeLabel: { ar: "رسوم دراسية", en: "Tuition" },
    amount: 1200,
    status: "overdue",
    date: "2026-03-01",
    dateLabel: { ar: "١ آذار ٢٠٢٦", en: "Mar 1, 2026" },
  },
  {
    id: "INV-2026-0409",
    student: { ar: "ميريم شكري", en: "Miriam Shukri" },
    grade: { ar: "الصف السابع", en: "Grade 7" },
    type: "transport",
    typeLabel: { ar: "نقل مدرسي", en: "Transport" },
    amount: 350,
    status: "paid",
    date: "2026-04-07",
    dateLabel: { ar: "٧ نيسان ٢٠٢٦", en: "Apr 7, 2026" },
  },
  {
    id: "INV-2026-0410",
    student: { ar: "سارة الخطيب", en: "Sara Al-Khatib" },
    grade: { ar: "الصف الثاني عشر", en: "Grade 12" },
    type: "tuition",
    typeLabel: { ar: "رسوم دراسية", en: "Tuition" },
    amount: 1200,
    status: "paid",
    date: "2026-04-08",
    dateLabel: { ar: "٨ نيسان ٢٠٢٦", en: "Apr 8, 2026" },
  },
];

const statusFilters = [
  { key: "all" as const, ar: "الكل", en: "All" },
  { key: "paid" as const, ar: "مدفوع", en: "Paid" },
  { key: "pending" as const, ar: "معلّق", en: "Pending" },
  { key: "overdue" as const, ar: "متأخّر", en: "Overdue" },
];

export default function AdminFinancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = filter === "all"
    ? seedTransactions
    : seedTransactions.filter((t) => t.status === filter);

  const totalCollected = seedTransactions
    .filter((t) => t.status === "paid")
    .reduce((s, t) => s + t.amount, 0);
  const totalPending = seedTransactions
    .filter((t) => t.status === "pending")
    .reduce((s, t) => s + t.amount, 0);
  const totalOverdue = seedTransactions
    .filter((t) => t.status === "overdue")
    .reduce((s, t) => s + t.amount, 0);
  const totalRevenue = seedTransactions.reduce((s, t) => s + t.amount, 0);

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "الشؤون المالية", en: "Finance" },
    subtitle: { ar: "نظرة شاملة على الإيرادات والمدفوعات", en: "Revenue & payments overview" },
    stats: {
      collected: { ar: "المحصّل", en: "Collected" },
      pending: { ar: "معلّق", en: "Pending" },
      overdue: { ar: "متأخّر", en: "Overdue" },
      total: { ar: "إجمالي الإيرادات", en: "Total Revenue" },
    },
    currency: { ar: "د.أ", en: "JOD" },
    transactions: { ar: "المعاملات الأخيرة", en: "Recent Transactions" },
    headers: {
      ref: { ar: "المرجع", en: "Reference" },
      student: { ar: "الطالب/ة", en: "Student" },
      type: { ar: "النوع", en: "Type" },
      amount: { ar: "المبلغ", en: "Amount" },
      date: { ar: "التاريخ", en: "Date" },
      status: { ar: "الحالة", en: "Status" },
    },
    statusLabel: {
      paid: { ar: "مدفوع", en: "Paid" },
      pending: { ar: "معلّق", en: "Pending" },
      overdue: { ar: "متأخّر", en: "Overdue" },
    },
    breakdown: { ar: "توزيع الإيرادات", en: "Revenue Breakdown" },
    export: { ar: "تصدير التقرير", en: "Export Report" },
    exported: { ar: "جارٍ تصدير التقرير المالي...", en: "Exporting financial report..." },
    sendReminder: { ar: "إرسال تذكير", en: "Send Reminder" },
    reminderSent: { ar: "تم إرسال التذكير بنجاح", en: "Reminder sent successfully" },
  };

  const typeBreakdown = [
    { label: { ar: "رسوم دراسية", en: "Tuition" }, amount: seedTransactions.filter((t) => t.type === "tuition").reduce((s, t) => s + t.amount, 0), color: "#0F2C5C" },
    { label: { ar: "نقل مدرسي", en: "Transport" }, amount: seedTransactions.filter((t) => t.type === "transport").reduce((s, t) => s + t.amount, 0), color: "#2D8659" },
    { label: { ar: "كتب مدرسية", en: "Textbooks" }, amount: seedTransactions.filter((t) => t.type === "books").reduce((s, t) => s + t.amount, 0), color: "#C19A4B" },
    { label: { ar: "زي مدرسي", en: "Uniform" }, amount: seedTransactions.filter((t) => t.type === "uniform").reduce((s, t) => s + t.amount, 0), color: "#4A90E2" },
    { label: { ar: "أنشطة", en: "Activities" }, amount: seedTransactions.filter((t) => t.type === "activities").reduce((s, t) => s + t.amount, 0), color: "#8B5CF6" },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">{T.title[locale]}</p>
          <h1 className={h1Class}>{T.subtitle[locale]}</h1>
        </div>
        <button
          onClick={() => setToast(T.exported[locale])}
          className="btn-outline !py-2.5 text-xs"
        >
          <Download className="w-4 h-4" />
          {T.export[locale]}
        </button>
      </div>

      {/* Revenue KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KPICard
          label={T.stats.collected[locale]}
          value={`${totalCollected.toLocaleString()} ${T.currency[locale]}`}
          color="#2D8659"
          icon={CheckCircle2}
          trend={<><ArrowUpRight className="w-3 h-3" /> +12%</>}
          locale={locale}
        />
        <KPICard
          label={T.stats.pending[locale]}
          value={`${totalPending.toLocaleString()} ${T.currency[locale]}`}
          color="#C19A4B"
          icon={Clock}
          locale={locale}
        />
        <KPICard
          label={T.stats.overdue[locale]}
          value={`${totalOverdue.toLocaleString()} ${T.currency[locale]}`}
          color="#DC2626"
          icon={AlertCircle}
          trend={<><ArrowDownRight className="w-3 h-3" /> -5%</>}
          locale={locale}
        />
        <KPICard
          label={T.stats.total[locale]}
          value={`${totalRevenue.toLocaleString()} ${T.currency[locale]}`}
          color="#0F2C5C"
          icon={CreditCard}
          locale={locale}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue breakdown */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)] p-6">
          <h3 className={`${cardTitleClass} mb-6`}>{T.breakdown[locale]}</h3>
          <div className="space-y-5">
            {typeBreakdown.map((item) => {
              const pct = totalRevenue > 0 ? (item.amount / totalRevenue) * 100 : 0;
              return (
                <div key={item.label.en}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-navy)]">{item.label[locale]}</span>
                    <span className={`text-lg font-bold text-[var(--color-navy)] ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                      {item.amount.toLocaleString()} {T.currency[locale]}
                    </span>
                  </div>
                  <div className="h-3 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment health */}
        <div className="bg-white border border-[var(--color-border)] p-6">
          <h3 className={`${cardTitleClass} mb-6`}>
            {locale === "ar" ? "صحة التحصيل" : "Collection Health"}
          </h3>
          <div className="space-y-6">
            {[
              { label: T.statusLabel.paid[locale], count: seedTransactions.filter((t) => t.status === "paid").length, total: seedTransactions.length, color: "#2D8659" },
              { label: T.statusLabel.pending[locale], count: seedTransactions.filter((t) => t.status === "pending").length, total: seedTransactions.length, color: "#C19A4B" },
              { label: T.statusLabel.overdue[locale], count: seedTransactions.filter((t) => t.status === "overdue").length, total: seedTransactions.length, color: "#DC2626" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[var(--color-navy)]">{s.label}</span>
                  <span className="text-sm font-bold num" style={{ color: s.color }}>{s.count}/{s.total}</span>
                </div>
                <div className="h-2 bg-[var(--color-cream)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.count / s.total) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="h-full"
                    style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className={cardTitleClass}>{T.transactions[locale]}</h3>
        </div>

        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-2 border-b border-[var(--color-border)]">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all ${
                filter === f.key
                  ? "bg-[var(--color-navy)] text-white"
                  : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-warm)]"
              }`}
            >
              {f[locale]}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[var(--color-cream)]">
              <tr>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.ref[locale]}</th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.student[locale]}</th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.type[locale]}</th>
                <th className="text-end p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.amount[locale]}</th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.date[locale]}</th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">{T.headers.status[locale]}</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50">
                  <td className="p-4 font-mono text-xs font-semibold text-[var(--color-navy)]">{t.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-[var(--color-navy)]">{t.student[locale]}</div>
                    <div className="text-xs text-[var(--color-ink-soft)]">{t.grade[locale]}</div>
                  </td>
                  <td className="p-4 text-sm">{t.typeLabel[locale]}</td>
                  <td className="p-4 text-end font-bold text-[var(--color-navy)] num">
                    {t.amount.toLocaleString()} {T.currency[locale]}
                  </td>
                  <td className="p-4 text-sm text-[var(--color-ink-soft)]">{t.dateLabel[locale]}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-wider ${
                        t.status === "paid"
                          ? "bg-green-50 text-green-700"
                          : t.status === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {T.statusLabel[t.status][locale]}
                    </span>
                  </td>
                  <td className="p-4">
                    {(t.status === "pending" || t.status === "overdue") && (
                      <button
                        onClick={() => setToast(T.reminderSent[locale])}
                        className="text-xs font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-dark)]"
                      >
                        {T.sendReminder[locale]}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

function KPICard({
  label, value, color, icon: Icon, trend, locale,
}: {
  label: string; value: string; color: string; icon: typeof CreditCard; trend?: React.ReactNode; locale: Locale;
}) {
  const isRTL = locale === "ar";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden"
    >
      <div className="absolute top-0 end-0 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ background: color }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 flex items-center justify-center" style={{ background: color }}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && (
            <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color }}>{trend}</span>
          )}
        </div>
        <div className={`text-2xl font-bold text-[var(--color-navy)] ${isRTL ? "font-arabic-display" : "font-serif"}`}>{value}</div>
        <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)] mt-2">{label}</div>
      </div>
    </motion.div>
  );
}
