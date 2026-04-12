"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import {
  Eye,
  Target,
  Building,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const about = dict.about;

  return (
    <>
      <PageHero
        locale={locale}
        label={about.heroLabel}
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: about.heroLabel },
        ]}
      />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              className={`text-3xl font-bold text-ink mb-6 ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              {about.story.title}
            </h2>
            <p className="text-ink-soft leading-relaxed text-lg">
              {about.story.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-teal" />
              </div>
              <h3
                className={`text-2xl font-bold text-ink mb-4 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {about.vision.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">
                {about.vision.content}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-navy" />
              </div>
              <h3
                className={`text-2xl font-bold text-ink mb-4 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {about.mission.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">
                {about.mission.content}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6 text-teal" />
            </div>
            <h2
              className={`text-3xl font-bold text-ink ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              {about.facilities.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {about.facilities.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50"
              >
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                <span className="text-sm text-ink-soft">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3
                className={`text-2xl font-bold text-ink mb-4 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {about.accreditations.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">
                {about.accreditations.content}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-navy" />
              </div>
              <h3
                className={`text-2xl font-bold text-ink mb-4 ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {about.leadership.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">
                {about.leadership.content}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
