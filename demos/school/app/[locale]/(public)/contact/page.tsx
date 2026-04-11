"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const infoIcons = [MapPin, Phone, Mail, Clock];

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const c = dict.pages.contact;
  const isRTL = locale === "ar";
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const infoItems = [
    { ...c.info.address, icon: MapPin },
    { ...c.info.phone, icon: Phone },
    { ...c.info.email, icon: Mail },
    { ...c.info.hours, icon: Clock },
  ];

  const formHeading = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-8 leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-8";
  const mapHeading = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold mb-4 leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold mb-4";

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.common.breadcrumbHome}
        label={c.hero.label}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        breadcrumbs={[{ label: c.hero.breadcrumb }]}
      />

      {/* Info cards */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoItems.map((item, i) => {
              const Icon = infoIcons[i];
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="academic-card p-8"
                >
                  <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <h3
                    className={`text-lg font-bold text-[var(--color-navy)] mb-3 ${
                      isRTL ? "font-arabic-display" : "font-serif"
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    {item.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-10 lg:p-12 shadow-xl border border-[var(--color-border)]"
          >
            <p className="section-label mb-4">{c.form.label}</p>
            <h2 className={formHeading}>{c.form.subtitle}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                    {c.form.fields.firstName}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    placeholder={c.form.placeholders.firstName}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                    {c.form.fields.lastName}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    placeholder={c.form.placeholders.lastName}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                  {c.form.fields.email}
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder={c.form.placeholders.email}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                  {c.form.fields.phone}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                  placeholder={c.form.placeholders.phone}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                  {c.form.fields.subject}
                </label>
                <select className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors">
                  {c.form.subjects.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[var(--color-ink-soft)] mb-2">
                  {c.form.fields.message}
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
                  placeholder={c.form.placeholders.message}
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="btn-primary w-full justify-center"
              >
                {submitted ? (
                  "✓"
                ) : (
                  <>
                    <Send className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`} />{" "}
                    {c.form.submit}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-[var(--color-navy)] min-h-[600px] overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-transparent" />
            <div className="relative h-full flex flex-col justify-between p-10 text-white">
              <div>
                <p className="section-label !text-[var(--color-gold)] mb-4">
                  {c.map.title}
                </p>
                <h3 className={mapHeading}>{c.map.subtitle}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-[var(--color-gold)]/20 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                  <div>
                    <div className="text-sm font-semibold">
                      {c.info.address.value}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
