"use client";

import { use, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { usePrescriptions } from "@/lib/hospitalStore";
import { doctors } from "@/lib/data";

export default function PrescriptionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.prescriptions;
  const cs = dict.portals.common.status;

  const prescriptions = usePrescriptions();
  const [toast, setToast] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    active: "#10B981",
    completed: "#6B7280",
    "renewal-requested": "#F59E0B",
  };

  const statusLabels: Record<string, string> = {
    active: cs.active,
    completed: cs.completed,
    "renewal-requested": cs.renewalRequested,
  };

  const handleRenewal = useCallback(
    (rxId: string) => {
      if (typeof window === "undefined") return;
      try {
        const key = "alhayat:prescriptions";
        const raw = localStorage.getItem(key);
        if (!raw) return;
        const items = JSON.parse(raw);
        const updated = items.map((item: { id: string; status: string }) =>
          item.id === rxId ? { ...item, status: "renewal-requested" } : item
        );
        localStorage.setItem(key, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("alhayat:store-changed"));
        setToast(locale === "ar" ? "تم طلب التجديد بنجاح" : "Renewal requested successfully");
        setTimeout(() => setToast(null), 3000);
      } catch {
        /* noop */
      }
    },
    [locale]
  );

  const active = prescriptions.filter((rx) => rx.status === "active" || rx.status === "renewal-requested");
  const completed = prescriptions.filter((rx) => rx.status === "completed");

  return (
    <div className="p-5 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-ink">{p.title}</h1>
      </motion.div>

      {prescriptions.length === 0 ? (
        <div className="text-center py-16 text-ink-muted">{p.noPrescriptions}</div>
      ) : (
        <>
          {/* Active */}
          {active.length > 0 && (
            <div className="mb-8">
              <h2 className="font-bold text-ink mb-3">{p.active}</h2>
              <div className="space-y-3">
                {active.map((rx, i) => {
                  const doc = doctors.find((d) => d.id === rx.doctorId);
                  return (
                    <motion.div
                      key={rx.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="bg-white rounded-xl border border-gray-200 p-5"
                    >
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <div>
                          <div className="font-semibold text-ink mb-1">{rx.medication}</div>
                          <div className="text-sm text-ink-soft">{doc?.name[locale]}</div>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shrink-0"
                          style={{ background: statusColors[rx.status] }}
                        >
                          {statusLabels[rx.status]}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <div className="text-xs text-ink-muted mb-0.5">{p.dosage}</div>
                          <div className="text-ink font-medium">{rx.dosage}</div>
                        </div>
                        <div>
                          <div className="text-xs text-ink-muted mb-0.5">{p.frequency}</div>
                          <div className="text-ink font-medium">{rx.frequency}</div>
                        </div>
                        <div>
                          <div className="text-xs text-ink-muted mb-0.5">{p.startDate}</div>
                          <div className="text-ink font-medium">{rx.startDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-ink-muted mb-0.5">{p.endDate}</div>
                          <div className="text-ink font-medium">{rx.endDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-ink-muted">
                          {p.refillsRemaining}: {rx.refillsRemaining}
                        </span>
                        {rx.status === "active" && (
                          <button
                            onClick={() => handleRenewal(rx.id)}
                            className="text-xs font-semibold text-teal hover:text-teal-dark flex items-center gap-1 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            {p.requestRefill}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <h2 className="font-bold text-ink mb-3">{p.completed}</h2>
              <div className="space-y-3">
                {completed.map((rx) => {
                  const doc = doctors.find((d) => d.id === rx.doctorId);
                  return (
                    <div
                      key={rx.id}
                      className="bg-white rounded-xl border border-gray-200 p-5 opacity-70"
                    >
                      <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                        <div>
                          <div className="font-semibold text-ink mb-1">{rx.medication}</div>
                          <div className="text-sm text-ink-soft">{doc?.name[locale]}</div>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shrink-0"
                          style={{ background: statusColors[rx.status] }}
                        >
                          {statusLabels[rx.status]}
                        </span>
                      </div>
                      <div className="text-sm text-ink-muted">
                        {rx.startDate} &mdash; {rx.endDate}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 bg-teal text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
