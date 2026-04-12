"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const c = dict.contact;

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <>
      <PageHero
        locale={locale}
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: c.heroLabel },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-2xl font-bold text-ink mb-6 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {c.form.send}
              </h2>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-emerald/10 text-emerald border border-emerald/20 rounded-xl p-4 mb-6"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{c.form.success}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">
                    {c.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      {c.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      {c.form.phone}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">
                    {c.form.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary gap-2">
                  <Send className="w-4 h-4" />
                  {c.form.send}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2
                className={`text-2xl font-bold text-ink mb-6 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {c.info.title}
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {isRTL ? "العنوان" : "Address"}
                    </p>
                    <p className="text-sm text-ink-soft">{c.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {isRTL ? "الهاتف" : "Phone"}
                    </p>
                    <p className="text-sm text-ink-soft" dir="ltr">
                      {c.info.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {isRTL ? "واتساب" : "WhatsApp"}
                    </p>
                    <p className="text-sm text-ink-soft" dir="ltr">
                      {c.info.whatsapp}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {isRTL ? "البريد الإلكتروني" : "Email"}
                    </p>
                    <p className="text-sm text-ink-soft" dir="ltr">
                      {c.info.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {isRTL ? "ساعات العمل" : "Working Hours"}
                    </p>
                    <p className="text-sm text-ink-soft">
                      {c.info.workingHours}
                    </p>
                    <p className="text-sm text-rose font-medium">
                      {c.info.emergencyHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-2xl bg-gradient-to-br from-teal/10 to-navy/10 border border-border h-56 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-teal mx-auto mb-2" />
                  <p className="text-ink font-medium">
                    {isRTL ? "عمّان، الأردن" : "Amman, Jordan"}
                  </p>
                  <p className="text-xs text-ink-muted mt-1">
                    {c.info.address}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
