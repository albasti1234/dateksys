"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { fadeUp, viewport, SILK } from "@/lib/animations";
import { formatPrice } from "@/lib/properties";

export default function MortgageCalculator({
  locale,
  dict,
  propertyPrice,
}: {
  locale: Locale;
  dict: Dictionary["propertyDetail"];
  propertyPrice: number;
}) {
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const loanAmount = propertyPrice * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="section-label">{dict.calculator}</span>
          </div>
          <h2 className={`mb-12 ${fontHeading}`}>{dict.calculator}</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Sliders */}
            <div className="space-y-8">
              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-text-secondary">{dict.downPayment}</label>
                  <span className="text-sm font-medium">{downPaymentPct}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-gold"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-text-secondary">{dict.interestRate}</label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={12}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-gold"
                />
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-text-secondary">{dict.loanTerm}</label>
                  <span className="text-sm font-medium">{loanTerm} {dict.years}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-gold"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-surface-warm p-8 flex flex-col justify-center">
              <p className="text-sm text-text-secondary uppercase tracking-wider mb-2">
                {dict.monthlyPayment}
              </p>
              <p className="text-4xl lg:text-5xl text-gold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                {formatPrice(Math.round(monthlyPayment))}
                <span className="text-lg text-text-muted">/{isRTL ? "شهر" : "mo"}</span>
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">{isRTL ? "سعر العقار" : "Property Price"}</span>
                  <span className="font-medium">{formatPrice(propertyPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">{dict.downPayment}</span>
                  <span className="font-medium">{formatPrice(propertyPrice * downPaymentPct / 100)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-text-secondary">{isRTL ? "مبلغ القرض" : "Loan Amount"}</span>
                  <span className="font-medium">{formatPrice(Math.round(loanAmount))}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
