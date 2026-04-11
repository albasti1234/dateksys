"use client";

import { use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  GraduationCap,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import {
  useApplications,
  formatApplicationDate,
  type Application,
} from "@/lib/applicationsStorage";

const kpiIcons = [Users, GraduationCap, CreditCard, Activity];
const kpiColors = ["#4A90E2", "#2D8659", "#C19A4B", "#0F2C5C"];
const gradeColors = ["#4A90E2", "#2D8659", "#C19A4B", "#0F2C5C"];

export default function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.portals.admin.dashboard;
  const isRTL = locale === "ar";
  const liveApplications = useApplications();

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-4xl font-bold text-[var(--color-navy)]"
    : "font-serif text-4xl font-bold text-[var(--color-navy)]";

  const totalStudents = a.distribution.grades.reduce(
    (s, g) => s + parseInt(g.value.replace(/[^0-9]/g, ""), 10) || 0,
    0
  );

  return (
    <div className="p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="section-label mb-3">{a.welcome}</p>
        <h1 className={h1Class}>{a.academicYear}</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">{a.subtitle}</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {a.kpis.map((k, i) => {
          const Icon = kpiIcons[i];
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden"
            >
              <div
                className="absolute top-0 end-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: kpiColors[i] }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ background: kpiColors[i] }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
                    <TrendingUp className="w-3 h-3" />
                    {k.trend}
                  </span>
                </div>
                <div className={bigNumClass}>{k.value}</div>
                <div className="text-xs tracking-wider font-semibold text-[var(--color-ink-soft)] mt-2">
                  {k.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Grade distribution chart */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)] p-6">
          <h3 className={`${cardTitleClass} mb-6`}>{a.distribution.title}</h3>
          <div className="space-y-5">
            {a.distribution.grades.map((g, i) => {
              const count = parseInt(g.value.replace(/[^0-9]/g, ""), 10) || 0;
              const pct = totalStudents > 0 ? (count / totalStudents) * 100 : 0;
              return (
                <div key={g.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-navy)]">
                      {g.label}
                    </span>
                    <span
                      className={`text-lg font-bold text-[var(--color-navy)] ${
                        isRTL ? "font-arabic-display" : "font-serif"
                      }`}
                    >
                      {g.value}
                    </span>
                  </div>
                  <div className="h-3 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                      style={{ background: gradeColors[i] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white border border-[var(--color-border)]">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className={cardTitleClass}>{a.alerts.title}</h3>
          </div>
          <div className="p-4 space-y-3">
            {a.alerts.items.map((item, i) => (
              <div
                key={i}
                className="p-4 border-s-4 border-[var(--color-gold)] bg-[var(--color-cream)]"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-gold)]" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-navy)]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[var(--color-ink-soft)] mt-1">
                      {item.sub}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent enrollments — merges live applications with seed rows */}
      <div className="bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between flex-wrap gap-3">
          <h3 className={cardTitleClass}>{a.enrollments.title}</h3>
          <Link
            href={`/${locale}/portal/admin/applications`}
            className="text-xs font-semibold tracking-wider text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] flex items-center gap-1"
          >
            {dict.common.viewAll}
            <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
        <table className="w-full">
          <thead className="bg-[var(--color-cream)]">
            <tr>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {a.enrollments.headers.name}
              </th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {a.enrollments.headers.grade}
              </th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {a.enrollments.headers.date}
              </th>
              <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {a.enrollments.headers.status}
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {liveApplications.slice(0, 5).map((app) => (
                <LiveRow
                  key={app.ref}
                  app={app}
                  locale={locale}
                  dict={dict}
                />
              ))}
            </AnimatePresence>
            {a.enrollments.rows.map((row, i) => (
              <tr key={i} className="border-t border-[var(--color-border-soft)]">
                <td className="p-4 font-semibold text-[var(--color-navy)]">
                  {row.name}
                </td>
                <td className="p-4 text-sm">{row.grade}</td>
                <td className="p-4 text-sm text-[var(--color-ink-soft)]">
                  {row.date}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-wider ${
                      row.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {
                      a.enrollments.statusLabels[
                        row.status as "active" | "pending"
                      ]
                    }
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// Live row — shows user-submitted applications with a gold highlight
// ============================================
function LiveRow({
  app,
  locale,
  dict,
}: {
  app: Application;
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
}) {
  const gradeOption = dict.pages.admissions.apply.steps.student.gradeOptions.find(
    (g) => g.value === app.student.applyingFor
  );
  const statusClass =
    app.status === "accepted"
      ? "bg-green-50 text-green-700"
      : app.status === "rejected"
        ? "bg-red-50 text-red-700"
        : app.status === "reviewing"
          ? "bg-blue-50 text-blue-700"
          : "bg-amber-50 text-amber-700";
  const statusLabel =
    locale === "ar"
      ? {
          pending: "جديد",
          reviewing: "قيد المراجعة",
          accepted: "مقبول",
          rejected: "مرفوض",
        }[app.status]
      : {
          pending: "New",
          reviewing: "Reviewing",
          accepted: "Accepted",
          rejected: "Rejected",
        }[app.status];

  return (
    <motion.tr
      initial={{ backgroundColor: "rgba(193,154,75,0.25)" }}
      animate={{ backgroundColor: "rgba(193,154,75,0)" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
      className="border-t border-[var(--color-border-soft)]"
    >
      <td className="p-4 font-semibold text-[var(--color-navy)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          {app.student.firstName} {app.student.lastName}
        </div>
        <div className="text-[10px] font-mono text-[var(--color-ink-soft)] mt-0.5 font-normal">
          {app.ref}
        </div>
      </td>
      <td className="p-4 text-sm">
        {gradeOption?.label.split("—")[0].trim() || app.student.applyingFor}
      </td>
      <td className="p-4 text-sm text-[var(--color-ink-soft)]">
        {formatApplicationDate(app.createdAt, locale)}
      </td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-wider ${statusClass}`}
        >
          {statusLabel}
        </span>
      </td>
    </motion.tr>
  );
}
