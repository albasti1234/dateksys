"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { insuranceCompanies, departments } from "@/lib/data";
import {
  Shield,
  CheckCircle2,
  BadgeCheck,
  Search,
} from "lucide-react";

export default function InsurancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const ins = dict.insurance;

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedInsurer, setSelectedInsurer] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setShowResult(true);
    setTimeout(() => setShowResult(false), 4000);
  }

  return (
    <>
      <PageHero
        locale={locale}
        label={ins.heroLabel}
        title={ins.heroTitle}
        subtitle={ins.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: ins.heroLabel },
        ]}
      />

      {/* Insurance Companies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {insuranceCompanies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-navy" />
                </div>
                <h3
                  className={`text-sm font-bold text-ink mb-3 ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {company.name[locale]}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald/10 text-emerald px-3 py-1 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {ins.directBilling}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Note */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 text-center max-w-2xl mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-teal mx-auto mb-4" />
            <p className="text-ink-soft leading-relaxed">
              {ins.coverageNote}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Check Coverage Form */}
      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-teal" />
              </div>
              <h2
                className={`text-xl font-bold text-ink ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {ins.checkCoverage}
              </h2>
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-emerald/10 text-emerald border border-emerald/20 rounded-xl p-4 mb-6"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">
                  {isRTL
                    ? "تم تأكيد التغطية التأمينية"
                    : "Coverage confirmed"}
                </span>
              </motion.div>
            )}

            <form onSubmit={handleCheck} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">
                  {dict.appointments.form.department}
                </label>
                <select
                  required
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                >
                  <option value="">
                    {dict.appointments.form.selectDepartment}
                  </option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name[locale]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">
                  {dict.appointments.form.insurance}
                </label>
                <select
                  required
                  value={selectedInsurer}
                  onChange={(e) => setSelectedInsurer(e.target.value)}
                  className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                >
                  <option value="">
                    {isRTL ? "اختر شركة التأمين" : "Select Insurance Company"}
                  </option>
                  {insuranceCompanies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name[locale]}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-primary w-full">
                {ins.checkCoverage}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
