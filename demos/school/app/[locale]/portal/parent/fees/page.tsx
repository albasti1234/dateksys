"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, Download, AlertCircle } from "lucide-react";

const currentBalance = { owed: 2100, total: 8400, paid: 6300 };

const invoices = [
  { id: "INV-2026-0847", term: "Term 3 — 2025/2026", amount: 2100, due: "Apr 15, 2026", status: "due" },
  { id: "INV-2026-0521", term: "Term 2 — 2025/2026", amount: 2100, due: "Jan 15, 2026", status: "paid", paidDate: "Jan 10, 2026" },
  { id: "INV-2026-0213", term: "Term 1 — 2025/2026", amount: 2100, due: "Sep 15, 2025", status: "paid", paidDate: "Sep 8, 2025" },
  { id: "INV-2026-0001", term: "Registration Fee", amount: 500, due: "Aug 1, 2025", status: "paid", paidDate: "Aug 1, 2025" },
  { id: "INV-2025-0412", term: "Term 3 — 2024/2025", amount: 1900, due: "Apr 15, 2025", status: "paid", paidDate: "Apr 12, 2025" },
];

export default function FeesPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">Fees & Payments</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Financial Overview</h1>
      </div>

      {/* Payment alert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 mb-8 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white flex items-center gap-5 flex-wrap">
        <AlertCircle className="w-8 h-8 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-serif text-xl font-bold mb-1">Payment Due: 2,100 JOD</div>
          <p className="text-sm text-white/80">Term 3 tuition is due in 10 days (April 15, 2026). Pay online to avoid late charges.</p>
        </div>
        <button className="px-6 py-3 bg-white text-[var(--color-navy)] font-bold uppercase text-xs tracking-wider hover:bg-[var(--color-cream)] transition-colors">
          Pay Now
        </button>
      </motion.div>

      {/* Balance breakdown */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-[var(--color-navy)] text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 end-0 w-40 h-40 rounded-full blur-3xl opacity-10" style={{ background: "#DC2626" }} />
          <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-3">Outstanding</p>
          <div className="font-serif text-5xl font-bold mb-2">2,100 <span className="text-lg text-white/50">JOD</span></div>
          <p className="text-sm text-white/60">Due April 15, 2026</p>
        </div>
        <div className="bg-white border border-[var(--color-border)] p-8">
          <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-3">Paid This Year</p>
          <div className="font-serif text-5xl font-bold mb-2 text-[var(--color-navy)]">6,300 <span className="text-lg text-[var(--color-ink-soft)]">JOD</span></div>
          <p className="text-sm text-[var(--color-ink-soft)]">Across 3 payments</p>
        </div>
        <div className="bg-white border border-[var(--color-border)] p-8">
          <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-3">Annual Total</p>
          <div className="font-serif text-5xl font-bold mb-2 text-[var(--color-navy)]">8,400 <span className="text-lg text-[var(--color-ink-soft)]">JOD</span></div>
          <div className="mt-3 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-gold)]" style={{ width: `${(currentBalance.paid / currentBalance.total) * 100}%` }} />
          </div>
          <p className="text-xs text-[var(--color-ink-soft)] mt-2">75% paid</p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-white border border-[var(--color-border)] p-8 mb-8">
        <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-6">Quick Payment</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Credit Card", "Debit Card", "Bank Transfer", "eFAWATEERcom"].map((m) => (
            <button key={m} className="p-5 border-2 border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all group">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors" />
              <div className="text-sm font-semibold text-[var(--color-navy)]">{m}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <div className="bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Invoice History</h3>
        </div>
        <table className="w-full">
          <thead className="bg-[var(--color-cream)]">
            <tr>
              <th className="text-start p-5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Invoice</th>
              <th className="text-start p-5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Period</th>
              <th className="text-start p-5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Due Date</th>
              <th className="text-end p-5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Amount</th>
              <th className="text-center p-5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">Status</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50">
                <td className="p-5 font-mono text-xs text-[var(--color-navy)]">{inv.id}</td>
                <td className="p-5 text-sm">{inv.term}</td>
                <td className="p-5 text-sm text-[var(--color-ink-soft)]">{inv.due}</td>
                <td className="p-5 text-end font-serif font-bold text-[var(--color-navy)]">{inv.amount} <span className="text-xs text-[var(--color-ink-soft)]">JOD</span></td>
                <td className="p-5 text-center">
                  {inv.status === "paid" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> Due
                    </span>
                  )}
                </td>
                <td className="p-5 text-end">
                  <button className="text-[var(--color-gold)] hover:text-[var(--color-gold-dark)]" aria-label="Download invoice">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
