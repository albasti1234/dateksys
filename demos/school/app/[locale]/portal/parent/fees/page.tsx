"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  X,
  Lock,
  Loader2,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { savePayment, usePayments } from "@/lib/schoolStore";

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
  const payments = usePayments();

  // Checkout state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "processing" | "success">("form");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const openCheckout = () => {
    setCheckoutStep("form");
    setFormError(null);
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCheckoutOpen(true);
  };

  const processPayment = () => {
    setFormError(null);
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (!cardName.trim()) {
      setFormError(locale === "ar" ? "اسم حامل البطاقة مطلوب" : "Cardholder name is required");
      return;
    }
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      setFormError(locale === "ar" ? "رقم البطاقة غير صحيح" : "Invalid card number");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      setFormError(locale === "ar" ? "تاريخ انتهاء غير صحيح (MM/YY)" : "Invalid expiry (MM/YY)");
      return;
    }
    if (cardCvc.length < 3 || cardCvc.length > 4) {
      setFormError(locale === "ar" ? "CVC غير صحيح" : "Invalid CVC");
      return;
    }

    setCheckoutStep("processing");

    setTimeout(() => {
      savePayment({
        invoiceId: f.history.rows[0].invoice,
        amount: f.dueNotice.amount,
        method: "Visa",
        cardLast4: cleanNumber.slice(-4),
      });
      setCheckoutStep("success");
      setTimeout(() => {
        setCheckoutOpen(false);
        setToast(
          locale === "ar"
            ? "تمّ الدفع بنجاح · سيصلك إيصال عبر البريد"
            : "Payment successful · Receipt sent to your email"
        );
      }, 2200);
    }, 2200);
  };

  // Check if main invoice is paid
  const mainInvoicePaid = payments.some(
    (p) => p.invoiceId === f.history.rows[0].invoice
  );

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
      {!mainInvoicePaid ? (
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
          <button
            onClick={openCheckout}
            className="px-6 py-3 bg-white text-[var(--color-navy)] font-bold text-xs tracking-wider hover:bg-[var(--color-cream)] transition-colors"
          >
            {f.dueNotice.button}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center gap-5 flex-wrap"
        >
          <CheckCircle2 className="w-8 h-8 shrink-0" />
          <div className="flex-1 min-w-0">
            <div
              className={`text-xl font-bold mb-1 ${
                isRTL ? "font-arabic-display" : "font-serif"
              }`}
            >
              {locale === "ar" ? "تمّ الدفع بنجاح" : "Payment Completed"}
            </div>
            <p className="text-sm text-white/80">
              {locale === "ar"
                ? "شكراً لك — تمّ استلام دفعة الرسوم وتسجيلها"
                : "Thank you — payment received and recorded"}
            </p>
          </div>
        </motion.div>
      )}

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
              onClick={openCheckout}
              disabled={mainInvoicePaid}
              className="p-5 border-2 border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors" />
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                {m}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => checkoutStep === "form" && setCheckoutOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[var(--color-navy)] text-white p-6 relative">
                {checkoutStep === "form" && (
                  <button
                    onClick={() => setCheckoutOpen(false)}
                    className="absolute top-4 end-4 text-white/70 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <div className="flex items-center gap-2 text-xs tracking-wider text-[var(--color-gold)] mb-2">
                  <Lock className="w-3 h-3" />
                  {locale === "ar" ? "دفع آمن" : "Secure Checkout"}
                </div>
                <h3
                  className={`text-2xl font-bold ${
                    isRTL ? "font-arabic-display" : "font-serif"
                  }`}
                >
                  {f.dueNotice.amount}
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  {f.history.rows[0].period} · {f.history.rows[0].invoice}
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                {checkoutStep === "form" && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                          {locale === "ar" ? "اسم حامل البطاقة" : "Cardholder Name"}
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder={
                            locale === "ar"
                              ? "الاسم كما هو على البطاقة"
                              : "Name on card"
                          }
                          className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                          {locale === "ar" ? "رقم البطاقة" : "Card Number"}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          dir="ltr"
                          value={cardNumber}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "").slice(0, 19);
                            const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                            setCardNumber(formatted);
                          }}
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                            {locale === "ar" ? "انتهاء (MM/YY)" : "Expiry (MM/YY)"}
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            dir="ltr"
                            value={cardExpiry}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                              setCardExpiry(v);
                            }}
                            placeholder="12/28"
                            className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            dir="ltr"
                            value={cardCvc}
                            onChange={(e) =>
                              setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                            }
                            placeholder="123"
                            className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {formError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                        {formError}
                      </div>
                    )}

                    <button
                      onClick={processPayment}
                      className="btn-primary !bg-[var(--color-gold)] !border-[var(--color-gold)] w-full justify-center mt-6"
                    >
                      <Lock className="w-4 h-4" />
                      {locale === "ar"
                        ? `ادفع ${f.dueNotice.amount}`
                        : `Pay ${f.dueNotice.amount}`}
                    </button>

                    <p className="text-[10px] text-center text-[var(--color-ink-soft)] mt-4">
                      {locale === "ar"
                        ? "🔒 معاملتك محمية بتشفير SSL · هذه بيئة اختبار — لا تُستعمل بطاقة حقيقية"
                        : "🔒 Your payment is SSL-encrypted · Test mode — do not use a real card"}
                    </p>
                  </>
                )}

                {checkoutStep === "processing" && (
                  <div className="py-12 text-center">
                    <Loader2 className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-4 animate-spin" />
                    <p className="text-[var(--color-ink)] font-semibold">
                      {locale === "ar" ? "جاري معالجة الدفعة..." : "Processing payment..."}
                    </p>
                    <p className="text-xs text-[var(--color-ink-soft)] mt-2">
                      {locale === "ar"
                        ? "الرجاء عدم إغلاق النافذة"
                        : "Please do not close this window"}
                    </p>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <p
                      className={`text-xl font-bold text-[var(--color-navy)] ${
                        isRTL ? "font-arabic-display" : "font-serif"
                      }`}
                    >
                      {locale === "ar" ? "تمّ الدفع بنجاح" : "Payment Successful"}
                    </p>
                    <p className="text-sm text-[var(--color-ink-soft)] mt-2">
                      {f.dueNotice.amount}
                    </p>
                  </motion.div>
                )}
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
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[70] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3 max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
