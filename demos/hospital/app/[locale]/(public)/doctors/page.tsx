"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { doctors, departments } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";

export default function DoctorsPage({
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

  const [activeDept, setActiveDept] = useState("all");

  const filtered =
    activeDept === "all"
      ? doctors
      : doctors.filter((d) => d.departmentId === activeDept);

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name[locale] : "";
  };

  const getInitials = (name: string) => {
    const words = name.split(" ").filter((w) => w.length > 1);
    if (words.length >= 2) {
      return words[1][0] + words[words.length - 1][0];
    }
    return words[0]?.[0] || "";
  };

  const avatarColors = [
    "bg-teal",
    "bg-navy",
    "bg-sky",
    "bg-emerald",
    "bg-rose",
    "bg-amber-500",
  ];

  return (
    <>
      <PageHero
        locale={locale}
        label={dict.doctors.heroLabel}
        title={dict.doctors.heroTitle}
        subtitle={dict.doctors.heroSubtitle}
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.doctors.heroLabel },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Filter tabs */}
          <div className="flex md:flex-wrap md:justify-center gap-2 mb-12 overflow-x-auto flex-nowrap whitespace-nowrap pb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveDept("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeDept === "all"
                  ? "bg-teal text-white"
                  : "bg-gray-100 text-ink-soft hover:bg-gray-200"
              }`}
            >
              {dict.doctors.filterAll}
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeDept === dept.id
                    ? "bg-teal text-white"
                    : "bg-gray-100 text-ink-soft hover:bg-gray-200"
                }`}
              >
                {dept.name[locale]}
              </button>
            ))}
          </div>

          {/* Doctor grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card p-6 text-center"
              >
                {/* Avatar */}
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 ${
                    avatarColors[i % avatarColors.length]
                  }`}
                >
                  {getInitials(doc.name[locale])}
                </div>

                <h3
                  className={`text-lg font-semibold text-ink mb-1 ${
                    isRTL ? "font-arabic-display" : "font-heading"
                  }`}
                >
                  {doc.name[locale]}
                </h3>
                <p className="text-sm text-ink-soft mb-2">{doc.title[locale]}</p>

                {/* Department badge */}
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-teal/10 text-teal font-medium mb-3">
                  {getDeptName(doc.departmentId)}
                </span>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-3.5 h-3.5 ${
                        si < Math.floor(doc.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-ink-muted ms-1">
                    {doc.rating}
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-center gap-1 text-xs text-ink-muted mb-4">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>
                    {doc.yearsExperience} {dict.doctors.experience}
                  </span>
                </div>

                <Link
                  href={`${prefix}/doctors/${doc.id}`}
                  className="text-sm text-teal font-medium flex items-center justify-center gap-1 hover:underline"
                >
                  {dict.doctors.viewProfile}
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
