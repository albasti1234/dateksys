"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Inbox,
  Eye,
  Check,
  X,
  Trash2,
  Sparkles,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import {
  useApplications,
  updateApplicationStatus,
  clearAllApplications,
  formatApplicationDate,
  type Application,
  type ApplicationStatus,
} from "@/lib/applicationsStorage";

const statusColors: Record<ApplicationStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  reviewing: "bg-blue-50 text-blue-700 border-blue-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const statusIcons: Record<ApplicationStatus, typeof Clock> = {
  pending: AlertCircle,
  reviewing: Clock,
  accepted: CheckCircle2,
  rejected: XCircle,
};

export default function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.portals.admin.applications;
  const isRTL = locale === "ar";

  const applications = useApplications();
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  const statusCounts = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
  };

  const handleStatusChange = (
    ref: string,
    newStatus: ApplicationStatus
  ) => {
    updateApplicationStatus(ref, newStatus);
    if (newStatus === "accepted") setToast(a.toast.accepted);
    else if (newStatus === "rejected") setToast(a.toast.rejected);
    else if (newStatus === "reviewing") setToast(a.toast.reviewing);
    // Update selected in place
    setSelected((prev) =>
      prev && prev.ref === ref ? { ...prev, status: newStatus } : prev
    );
  };

  const handleClearAll = () => {
    if (confirm(a.clearDemo.confirm)) {
      clearAllApplications();
      setSelected(null);
    }
  };

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="section-label mb-3">{a.hero.title}</p>
          <h1 className={h1Class}>{a.hero.subtitle}</h1>
        </div>
        {applications.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold flex items-center gap-2 text-[var(--color-ink-soft)] hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {a.clearDemo.button}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label={a.stats.total}
          value={statusCounts.total}
          color="#0F2C5C"
          icon={FileText}
          locale={locale}
        />
        <StatCard
          label={a.stats.pending}
          value={statusCounts.pending}
          color="#C19A4B"
          icon={AlertCircle}
          locale={locale}
        />
        <StatCard
          label={a.stats.reviewing}
          value={statusCounts.reviewing}
          color="#4A90E2"
          icon={Clock}
          locale={locale}
        />
        <StatCard
          label={a.stats.accepted}
          value={statusCounts.accepted}
          color="#2D8659"
          icon={CheckCircle2}
          locale={locale}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { key: "all", label: a.filters.all },
            { key: "pending", label: a.filters.pending },
            { key: "reviewing", label: a.filters.reviewing },
            { key: "accepted", label: a.filters.accepted },
            { key: "rejected", label: a.filters.rejected },
          ] as const
        ).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as ApplicationStatus | "all")}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
              filter === f.key
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {applications.length === 0 && (
        <div className="bg-white border border-[var(--color-border)] p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-[var(--color-cream)] flex items-center justify-center">
            <Inbox className="w-10 h-10 text-[var(--color-ink-soft)] opacity-60" />
          </div>
          <h3
            className={`text-xl font-bold text-[var(--color-navy)] mb-2 ${
              isRTL ? "font-arabic-display" : "font-serif"
            }`}
          >
            {a.empty.title}
          </h3>
          <p className="text-sm text-[var(--color-ink-soft)] max-w-md mx-auto mb-6">
            {a.empty.description}
          </p>
          <Link
            href={`/${locale}/admissions/apply`}
            className="btn-outline inline-flex"
          >
            {a.empty.cta}
          </Link>
        </div>
      )}

      {/* Table */}
      {applications.length > 0 && (
        <div className="bg-white border border-[var(--color-border)] overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[var(--color-cream)]">
              <tr>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                  {a.headers.ref}
                </th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                  {a.headers.student}
                </th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                  {a.headers.grade}
                </th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                  {a.headers.submittedOn}
                </th>
                <th className="text-start p-4 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                  {a.headers.status}
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((app) => {
                  const StatusIcon = statusIcons[app.status];
                  const gradeOption =
                    dict.pages.admissions.apply.steps.student.gradeOptions.find(
                      (g) => g.value === app.student.applyingFor
                    );
                  return (
                    <motion.tr
                      key={app.ref}
                      initial={{
                        opacity: 0,
                        backgroundColor: "rgba(193,154,75,0.2)",
                      }}
                      animate={{
                        opacity: 1,
                        backgroundColor: "rgba(193,154,75,0)",
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 2 }}
                      className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50 cursor-pointer"
                      onClick={() => setSelected(app)}
                    >
                      <td className="p-4">
                        <span className="font-mono text-xs text-[var(--color-navy)] font-semibold">
                          {app.ref}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-[var(--color-navy)]">
                          {app.student.firstName} {app.student.lastName}
                        </div>
                        <div className="text-xs text-[var(--color-ink-soft)]">
                          {app.parent.parentFirstName}{" "}
                          {app.parent.parentLastName}
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        {gradeOption?.label.split("—")[0].trim() ||
                          app.student.applyingFor}
                      </td>
                      <td className="p-4 text-sm text-[var(--color-ink-soft)]">
                        {formatApplicationDate(app.createdAt, locale)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-wider border ${statusColors[app.status]}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {a.filters[app.status]}
                        </span>
                      </td>
                      <td className="p-4 text-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(app);
                          }}
                          className="text-[var(--color-gold)] hover:text-[var(--color-gold-dark)]"
                          aria-label={a.actions.view}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Details modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal header */}
              <div className="bg-[var(--color-navy)] text-white p-6 md:p-8 relative overflow-hidden">
                <div
                  className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ background: "#C19A4B" }}
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 end-4 text-white/70 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs tracking-wider text-[var(--color-gold)] mb-2">
                    <Sparkles className="w-3 h-3" />
                    {a.details.ref}
                  </div>
                  <div className="font-mono text-2xl font-bold mb-3">
                    {selected.ref}
                  </div>
                  <h2
                    className={`text-2xl md:text-3xl font-bold mb-1 ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    {selected.student.firstName} {selected.student.lastName}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-white/70 flex-wrap">
                    <span>
                      {formatApplicationDate(selected.createdAt, locale)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-wider border ${statusColors[selected.status]}`}
                    >
                      {a.filters[selected.status]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Student section */}
                <div>
                  <h3
                    className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                      isRTL ? "font-arabic" : "uppercase"
                    }`}
                  >
                    {a.details.studentSection}
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.student.fields
                          .firstName
                      }
                      value={`${selected.student.firstName} ${selected.student.lastName}`}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.student.fields
                          .dateOfBirth
                      }
                      value={selected.student.dateOfBirth}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.student.fields
                          .nationality
                      }
                      value={selected.student.nationality}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.student.fields
                          .applyingFor
                      }
                      value={
                        dict.pages.admissions.apply.steps.student.gradeOptions.find(
                          (g) => g.value === selected.student.applyingFor
                        )?.label || "—"
                      }
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.student.fields
                          .currentSchool
                      }
                      value={selected.student.currentSchool || "—"}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.student.fields.gender
                      }
                      value={
                        dict.pages.admissions.apply.steps.student.genderOptions.find(
                          (g) => g.value === selected.student.gender
                        )?.label || "—"
                      }
                    />
                  </dl>
                </div>

                {/* Parent section */}
                <div className="pt-6 border-t border-[var(--color-border)]">
                  <h3
                    className={`text-sm tracking-wider text-[var(--color-gold)] mb-4 font-bold ${
                      isRTL ? "font-arabic" : "uppercase"
                    }`}
                  >
                    {a.details.parentSection}
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.parent.fields
                          .parentFirstName
                      }
                      value={`${selected.parent.parentFirstName} ${selected.parent.parentLastName}`}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.parent.fields
                          .relationship
                      }
                      value={
                        dict.pages.admissions.apply.steps.parent.relationshipOptions.find(
                          (r) => r.value === selected.parent.relationship
                        )?.label || "—"
                      }
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.parent.fields.email
                      }
                      value={selected.parent.email}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.parent.fields.phone
                      }
                      value={selected.parent.phone}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.parent.fields.address
                      }
                      value={selected.parent.address || "—"}
                    />
                    <DetailRow
                      label={
                        dict.pages.admissions.apply.steps.parent.fields
                          .preferredContact
                      }
                      value={
                        dict.pages.admissions.apply.steps.parent.contactOptions.find(
                          (c) => c.value === selected.parent.preferredContact
                        )?.label || "—"
                      }
                    />
                  </dl>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-3 justify-end">
                  {selected.status !== "rejected" && (
                    <button
                      onClick={() =>
                        handleStatusChange(selected.ref, "rejected")
                      }
                      className="btn-outline !border-red-200 !text-red-700 hover:!bg-red-50 inline-flex"
                    >
                      <X className="w-4 h-4" />
                      {a.actions.reject}
                    </button>
                  )}
                  {selected.status === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusChange(selected.ref, "reviewing")
                      }
                      className="btn-outline !border-blue-200 !text-blue-700 hover:!bg-blue-50 inline-flex"
                    >
                      <Clock className="w-4 h-4" />
                      {a.actions.markReviewing}
                    </button>
                  )}
                  {selected.status !== "accepted" && (
                    <button
                      onClick={() =>
                        handleStatusChange(selected.ref, "accepted")
                      }
                      className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)] inline-flex"
                    >
                      <Check className="w-4 h-4" />
                      {a.actions.accept}
                    </button>
                  )}
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

// ============================================
// Helper components
// ============================================

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
  icon: typeof Clock;
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mb-1">
        {label}
      </dt>
      <dd className="font-semibold text-[var(--color-navy)] break-words">
        {value || "—"}
      </dd>
    </div>
  );
}
