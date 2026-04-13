"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const articles = [
  {
    id: "1",
    slug: "heart-health-tips",
    title: {
      ar: "١٠ نصائح للحفاظ على صحة قلبك",
      en: "10 Tips for a Healthier Heart",
    },
    excerpt: {
      ar: "اكتشف أهم النصائح الطبية للحفاظ على صحة قلبك والوقاية من أمراض القلب والأوعية الدموية.",
      en: "Discover the most important medical tips to keep your heart healthy and prevent cardiovascular diseases.",
    },
    category: { ar: "صحة القلب", en: "Heart Health" },
    image: "/demos/hospital/images/about.png",
    date: "2026-04-10",
  },
  {
    id: "2",
    slug: "diabetes-management",
    title: {
      ar: "إدارة السكري: دليلك الشامل",
      en: "Diabetes Management: Your Complete Guide",
    },
    excerpt: {
      ar: "تعرف على أحدث طرق إدارة مرض السكري والتحكم في مستويات السكر في الدم بشكل فعال.",
      en: "Learn about the latest methods to manage diabetes and effectively control blood sugar levels.",
    },
    category: { ar: "السكري", en: "Diabetes" },
    image: "/demos/hospital/images/doctor-patient.png",
    date: "2026-04-05",
  },
  {
    id: "3",
    slug: "child-vaccination-guide",
    title: {
      ar: "دليل تطعيمات الأطفال ٢٠٢٦",
      en: "2026 Child Vaccination Guide",
    },
    excerpt: {
      ar: "جدول التطعيمات المحدّث للأطفال من الولادة حتى سن المدرسة مع التوصيات الطبية الأخيرة.",
      en: "Updated vaccination schedule for children from birth through school age with the latest medical recommendations.",
    },
    category: { ar: "طب الأطفال", en: "Pediatrics" },
    image: "/demos/hospital/images/hero.png",
    date: "2026-03-28",
  },
];

export default function NewsPreview({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span variants={fadeUp} className="section-label">
            {isRTL ? "◆ آخر الأخبار" : "◆ LATEST NEWS"}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className={`text-3xl lg:text-4xl font-bold text-text-primary mb-12 ${
              isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
            }`}
          >
            {isRTL ? "مقالات صحية ونصائح طبية" : "Health Articles & Medical Tips"}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={fadeUp}>
              <Link href={`${prefix}/services`}>
                <div className="card overflow-hidden group h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title[locale]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 start-3 badge badge-info">
                      {article.category[locale]}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-text-muted mb-2">
                      {new Date(article.date).toLocaleDateString(
                        locale === "ar" ? "ar-JO" : "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </div>
                    <h3
                      className={`font-semibold text-text-primary mb-2 line-clamp-2 ${
                        isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
                      }`}
                    >
                      {article.title[locale]}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                      {article.excerpt[locale]}
                    </p>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      {isRTL ? "اقرأ المزيد" : "Read More"}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
