"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Bone,
  Baby,
  HeartHandshake,
  Brain,
  Siren,
  ScanLine,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { departments } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Bone,
  Baby,
  HeartHandshake,
  Brain,
  Siren,
  ScanLine,
  Stethoscope,
};

export default function DepartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      <PageHero
        locale={locale}
        label={dict.departments.heroLabel}
        title={dict.departments.heroTitle}
        subtitle={dict.departments.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.departments.heroLabel },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => {
              const Icon = iconMap[dept.icon] || Stethoscope;
              return (
                <Link key={dept.id} href={`${prefix}/doctors`} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="card p-6 group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${dept.color}15` }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: dept.color }}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold text-ink mb-2 ${
                        isRTL ? "font-arabic-display" : "font-heading"
                      }`}
                    >
                      {dept.name[locale]}
                    </h3>
                    <p className="text-sm text-ink-soft mb-4 leading-relaxed">
                      {dept.description[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-teal font-medium">
                        {dept.doctorCount} {isRTL ? "أطباء" : "Doctors"}
                      </span>
                      <span className="text-sm text-teal font-medium flex items-center gap-1 group-hover:underline">
                        {dict.common.learnMore}
                        <Arrow className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
