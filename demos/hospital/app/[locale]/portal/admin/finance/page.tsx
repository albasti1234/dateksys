"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useInvoices } from "@/lib/hospitalStore";
import { departments } from "@/lib/data";

const insuranceClaims = [
  { id: "CLM-001", company: { ar: "التأمين الأردنية", en: "Jordan Insurance" }, amount: 12500, status: "approved" as const },
  { id: "CLM-002", company: { ar: "المجموعة العربية", en: "Arab Orient" }, amount: 8700, status: "pending" as const },
  { id: "CLM-003", company: { ar: "الشرق الأوسط", en: "Middle East Insurance" }, amount: 15200, status: "approved" as const },
  { id: "CLM-004", company: { ar: "التضامن", en: "Solidarity" }, amount: 6300, status: "rejected" as const },
  { id: "CLM-005", company: { ar: "مدنت", en: "MedNet" }, amount: 9800, status: "pending" as const },
];

const deptRevenue = [
  { id: "cardiology", revenue: 42000 },
  { id: "orthopedics", revenue: 28000 },
  { id: "internal-medicine", revenue: 18500 },
  { id: "pediatrics", revenue: 15000 },
  { id: "obstetrics", revenue: 22000 },
  { id: "emergency", revenue: 12000 },
  { id: "neurology", revenue: 9500 },
  { id: "radiology", revenue: 24000 },
];

const claimStatusColors: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-rose/10 text-rose",
};

export default function AdminFinance({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.finance;

  const invoices = useInvoices();
  const currency = locale === "ar" ? "د.أ" : "JOD";

  const maxRevenue = Math.max(...deptRevenue.map((d) => d.revenue));

  const revenueCards = [
    {
      label: locale === "ar" ? "إيرادات اليوم" : "Daily Revenue",
      value: `8,500 ${currency}`,
      icon: TrendingUp,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: t.totalRevenue,
      value: `125,000 ${currency}`,
      icon: TrendingUp,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: locale === "ar" ? "إيرادات سنوية" : "Yearly Revenue",
      value: `1,450,000 ${currency}`,
      icon: TrendingUp,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const claimLabels: Record<string, string> = {
    approved: locale === "ar" ? "موافق عليها" : "Approved",
    pending: locale === "ar" ? "معلّقة" : "Pending",
    rejected: locale === "ar" ? "مرفوضة" : "Rejected",
  };

  const invoiceStatusColors: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    overdue: "bg-rose/10 text-rose",
  };

  return (
    <div className="p-5 lg:p-8 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-ink"
      >
        {t.title}
      </motion.h1>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {revenueCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${card.color} rounded-xl border border-gray-200 p-5 flex items-center gap-4`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center">
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-ink-muted">{card.label}</p>
                <p className="text-xl font-bold text-ink mt-0.5">{card.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-ink-muted" />
            {locale === "ar" ? "آخر الفواتير" : "Recent Invoices"}
          </h2>

          {invoices.length === 0 ? (
            <p className="text-sm text-ink-muted py-6 text-center">
              {dict.portals.common.table.noData}
            </p>
          ) : (
            <div className="space-y-2">
              {invoices.slice(0, 6).map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink truncate">
                      {inv.description[locale]}
                    </p>
                    <p className="text-xs text-ink-muted">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-ink">
                      {inv.amount} {currency}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${invoiceStatusColors[inv.status]}`}
                    >
                      {dict.portals.common.status[inv.status as keyof typeof dict.portals.common.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Insurance Claims */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-ink-muted" />
            {t.insuranceClaims}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-start text-xs font-semibold text-ink-muted">
                    {locale === "ar" ? "الشركة" : "Company"}
                  </th>
                  <th className="px-3 py-2 text-start text-xs font-semibold text-ink-muted">
                    {locale === "ar" ? "المبلغ" : "Amount"}
                  </th>
                  <th className="px-3 py-2 text-start text-xs font-semibold text-ink-muted">
                    {dict.portals.common.table.status}
                  </th>
                </tr>
              </thead>
              <tbody>
                {insuranceClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-gray-50">
                    <td className="px-3 py-2.5 text-ink">{claim.company[locale]}</td>
                    <td className="px-3 py-2.5 font-medium text-ink">
                      {claim.amount.toLocaleString()} {currency}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${claimStatusColors[claim.status]}`}
                      >
                        {claimLabels[claim.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Revenue by Department */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-xl border border-gray-200 p-5"
      >
        <h2 className="text-lg font-semibold text-ink mb-4">
          {locale === "ar" ? "الإيرادات حسب القسم" : "Revenue by Department"}
        </h2>
        <div className="space-y-3">
          {deptRevenue.map((dr) => {
            const dept = departments.find((d) => d.id === dr.id);
            return (
              <div key={dr.id} className="flex items-center gap-3">
                <span className="text-sm text-ink-soft w-40 shrink-0 truncate">
                  {dept?.name[locale]}
                </span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-navy rounded-full"
                    style={{ width: `${(dr.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-ink w-24 text-end">
                  {dr.revenue.toLocaleString()} {currency}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
