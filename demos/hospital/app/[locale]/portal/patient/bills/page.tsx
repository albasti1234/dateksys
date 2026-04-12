"use client";

import { use, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useInvoices } from "@/lib/hospitalStore";

export default function BillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.bills;
  const cs = dict.portals.common.status;

  const invoices = useInvoices();
  const [toast, setToast] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    paid: "#10B981",
    pending: "#F59E0B",
    overdue: "#EF4444",
  };

  const statusLabels: Record<string, string> = {
    paid: cs.paid,
    pending: cs.pending,
    overdue: cs.overdue,
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter((i) => i.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0);

  const handlePay = useCallback(
    (invId: string) => {
      if (typeof window === "undefined") return;
      try {
        const key = "alhayat:invoices";
        const raw = localStorage.getItem(key);
        if (!raw) return;
        const items = JSON.parse(raw);
        const updated = items.map((item: { id: string; status: string }) =>
          item.id === invId ? { ...item, status: "paid" } : item
        );
        localStorage.setItem(key, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("alhayat:store-changed"));
        setToast(locale === "ar" ? "تم الدفع بنجاح" : "Payment successful");
        setTimeout(() => setToast(null), 3000);
      } catch {
        /* noop */
      }
    },
    [locale]
  );

  const currency = p.currency;

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

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: p.total, value: totalAmount, color: "#0D9488" },
          { label: p.paid, value: paidAmount, color: "#10B981" },
          { label: p.pending, value: pendingAmount, color: "#F59E0B" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="text-xs text-ink-muted mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-ink">
              {s.value.toFixed(2)} <span className="text-sm font-normal text-ink-soft">{currency}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Invoice list */}
      {invoices.length === 0 ? (
        <div className="text-center py-16 text-ink-muted">{p.noBills}</div>
      ) : (
        <div className="space-y-3">
          {invoices
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink mb-1">
                      {inv.description[locale]}
                    </div>
                    <div className="text-xs text-ink-muted">
                      {inv.id} &middot; {inv.date}
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shrink-0"
                    style={{ background: statusColors[inv.status] }}
                  >
                    {statusLabels[inv.status]}
                  </span>
                </div>

                <div className="flex items-end justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-ink">
                      {inv.amount.toFixed(2)} <span className="text-sm font-normal text-ink-soft">{currency}</span>
                    </div>
                    {inv.insuranceCoverage != null && (
                      <div className="text-xs text-ink-muted">
                        {p.insuranceCoverage}: {inv.insuranceCoverage}% &middot;{" "}
                        {p.patientShare}: {(inv.amount * (1 - inv.insuranceCoverage / 100)).toFixed(2)} {currency}
                      </div>
                    )}
                    <div className="text-xs text-ink-muted">
                      {locale === "ar" ? "تاريخ الاستحقاق" : "Due"}: {inv.dueDate}
                    </div>
                  </div>

                  {(inv.status === "pending" || inv.status === "overdue") && (
                    <button
                      onClick={() => handlePay(inv.id)}
                      className="btn-primary text-sm !py-2 !px-4"
                    >
                      <CreditCard className="w-4 h-4" />
                      {p.payNow}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
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
