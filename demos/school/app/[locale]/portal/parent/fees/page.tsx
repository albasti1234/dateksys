"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, Download, AlertCircle } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function FeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const f = dict.portals.parent.fees;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)]"
    : "font-serif text-xl font-bold text-[var(--color-navy)]";
  const bigNumClass = isRTL
    ? "font-arabic-display text-5xl font-bold mb-2 text-[var(--color-navy)]"
    : "font-serif text-5xl font-bold mb-2 text-[var(--color-navy)]";

  const paidPct = 75;

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{f.hero.title}</p>
        <h1 className={h1Class}>{f.hero.subtitle}</h1>
      </div>

      {/* Payment alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 mb-8 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white flex items-center gap-5 flex-wrap"
      >
        <AlertCircle className="w-8 h-8 shrink-0" />
        <div className="flex-1 min-w-0">
          <div
            className={`text-xl font-bold mb-1 ${
              isRTL ? "font-arabic-display" : "font-serif"
            }`}
          >
            {f.dueNotice.title}: {f.dueNotice.amount}
          </div>
          <p className="text-sm text-white/80">{f.dueNotice.dueDate}</p>
        </div>
        <button className="px-6 py-3 bg-white text-[var(--color-navy)] font-bold text-xs tracking-wider hover:bg-[var(--color-cream)] transition-colors">
          {f.dueNotice.button}
        </button>
      </motion.div>

      {/* Overview */}
      <div className="grid lg:grid-cols-4 gap-5 mb-8">
        {f.overview.map((item, i) => (
          <div
            key={item.label}
            className={`p-8 ${
              i === 0
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)]"
            }`}
          >
            <p
              className={`text-xs tracking-widest mb-3 ${
                i === 0
                  ? "text-[var(--color-gold)]"
                  : "text-[var(--color-gold)]"
              }`}
            >
              {item.label}
            </p>
            <div
              className={
                i === 0
                  ? `${bigNumClass.replace("text-[var(--color-navy)]", "text-white")}`
                  : bigNumClass
              }
            >
              {item.value}
            </div>
            {i === 3 && (
              <div className="mt-3 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-gold)]"
                  style={{ width: `${paidPct}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="bg-white border border-[var(--color-border)] p-8 mb-8">
        <h3 className={`${cardTitleClass} mb-6`}>{f.methods.title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {f.methods.items.map((m) => (
            <button
              key={m}
              className="p-5 border-2 border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all group"
            >
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors" />
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                {m}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <div className="bg-white border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className={cardTitleClass}>{f.history.title}</h3>
        </div>
        <table className="w-full">
          <thead className="bg-[var(--color-cream)]">
            <tr>
              <th className="text-start p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {f.history.headers.invoice}
              </th>
              <th className="text-start p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {f.history.headers.period}
              </th>
              <th className="text-start p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {f.history.headers.date}
              </th>
              <th className="text-end p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {f.history.headers.amount}
              </th>
              <th className="text-center p-5 text-[10px] font-bold tracking-wider text-[var(--color-ink-soft)]">
                {f.history.headers.status}
              </th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody>
            {f.history.rows.map((inv) => (
              <tr
                key={inv.invoice}
                className="border-t border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]/50"
              >
                <td className="p-5 font-mono text-xs text-[var(--color-navy)]">
                  {inv.invoice}
                </td>
                <td className="p-5 text-sm">{inv.period}</td>
                <td className="p-5 text-sm text-[var(--color-ink-soft)]">
                  {inv.date}
                </td>
                <td className="p-5 text-end font-serif font-bold text-[var(--color-navy)]">
                  {inv.amount}
                </td>
                <td className="p-5 text-center">
                  {inv.status === "paid" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />{" "}
                      {f.history.statusLabels.paid}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold tracking-wider">
                      <Clock className="w-3 h-3" /> {f.history.statusLabels.pending}
                    </span>
                  )}
                </td>
                <td className="p-5 text-end">
                  <button
                    className="text-[var(--color-gold)] hover:text-[var(--color-gold-dark)]"
                    aria-label="Download invoice"
                  >
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
