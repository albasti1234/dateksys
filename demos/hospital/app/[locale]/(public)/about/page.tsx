"use client";

import { use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import PageHero from "@/components/ui/PageHero";
import { fadeUp, stagger, imageReveal } from "@/lib/animations";
import {
  Eye,
  Target,
  Building2,
  Ribbon,
  BriefcaseMedical,
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
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  return (
    <>
      <PageHero
        locale={locale}
        label={about.heroLabel}
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        imageUrl="/demos/hospital/images/hospital_about.png"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: about.heroLabel },
        ]}
      />

      {/* Story Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <Image
                src="/demos/hospital/images/doctor-patient.webp"
                alt={about.story.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Decorative Accent */}
              <div className="absolute inset-0 border border-white/20 rounded-2xl md:m-4 m-2" />
            </motion.div>

            {/* Content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-accent font-bold tracking-widest uppercase text-sm">
                  {about.story.title}
                </span>
              </motion.div>
              
              <motion.h2
                variants={fadeUp}
                className={`text-4xl md:text-5xl font-bold text-navy mb-8 leading-tight ${fontHeading}`}
              >
                {about.heroSubtitle}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-lg text-ink-soft leading-relaxed"
              >
                {about.story.content}
              </motion.p>
              
              {/* Stats Mini */}
              <motion.div variants={stagger} className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
                <motion.div variants={fadeUp}>
                  <div className={`text-4xl font-bold text-teal mb-2 ${fontHeading}`}>30+</div>
                  <div className="text-sm font-medium text-ink-muted uppercase tracking-wider">{dict.home.stats.yearsLabel}</div>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <div className={`text-4xl font-bold text-teal mb-2 ${fontHeading}`}>100k+</div>
                  <div className="text-sm font-medium text-ink-muted uppercase tracking-wider">{dict.home.stats.satisfaction}</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 lg:p-14 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-teal transition-all duration-500">
                <Eye className="w-8 h-8 text-teal group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className={`text-3xl font-bold text-navy mb-6 ${fontHeading}`}>
                {about.vision.title}
              </h3>
              <p className="text-lg text-ink-soft leading-relaxed">
                {about.vision.content}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-navy p-10 lg:p-14 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" />
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className={`relative z-10 text-3xl font-bold text-white mb-6 ${fontHeading}`}>
                {about.mission.title}
              </h3>
              <p className="relative z-10 text-lg text-white/80 leading-relaxed font-light">
                {about.mission.content}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities & Accreditations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-12">
            
            {/* Facilities List */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-teal" />
                </div>
                <h2 className={`text-4xl font-bold text-navy ${fontHeading}`}>
                  {about.facilities.title}
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {about.facilities.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-teal/30 hover:bg-white transition-all duration-300"
                  >
                    <CheckCircle2 className="w-6 h-6 text-teal shrink-0 mt-0.5" />
                    <span className="text-base font-medium text-navy">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-accent/10 rounded-3xl p-8 border border-accent/20"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6">
                  <Ribbon className="w-6 h-6 text-navy" />
                </div>
                <h3 className={`text-2xl font-bold text-navy mb-4 ${fontHeading}`}>
                  {about.accreditations.title}
                </h3>
                <p className="text-navy/80 leading-relaxed font-medium">
                  {about.accreditations.content}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-navy rounded-3xl p-8 shadow-xl text-white"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <BriefcaseMedical className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-2xl font-bold text-white mb-4 ${fontHeading}`}>
                  {about.leadership.title}
                </h3>
                <p className="text-white/80 leading-relaxed font-light">
                  {about.leadership.content}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
