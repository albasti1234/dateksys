"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Doctor, Department } from "@/lib/types";

export default function DoctorHighlights({
  locale,
  dict,
  doctors,
  departments,
}: {
  locale: Locale;
  dict: Dictionary["home"]["doctors"];
  doctors: Doctor[];
  departments: Department[];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const top3 = doctors.slice(0, 3);

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name[locale] : "";
  };

  const getInitials = (name: string) => {
    const words = name.split(" ").filter((w) => w.length > 1);
    if (isRTL) {
      return words.length >= 2
        ? words[1][0] + words[words.length - 1][0]
        : words[0]?.[0] || "";
    }
    return words.length >= 2
      ? words[1][0] + words[words.length - 1][0]
      : words[0]?.[0] || "";
  };

  const avatarColors = ["bg-teal", "bg-navy", "bg-sky"];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">{dict.label}</span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-ink mb-4 ${
              isRTL ? "font-arabic-display" : "font-heading"
            }`}
          >
            {dict.title}
          </h2>
          <p className="text-ink-soft max-w-2xl mx-auto">{dict.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top3.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 text-center"
            >
              {/* Avatar circle */}
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 ${avatarColors[i % avatarColors.length]}`}
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
              <p className="text-sm text-ink-soft mb-2">
                {doc.title[locale]}
              </p>
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-teal/10 text-teal font-medium mb-3">
                {getDeptName(doc.departmentId)}
              </span>

              {/* Rating stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${
                      si < Math.floor(doc.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-xs text-ink-soft ms-1">
                  {doc.rating}
                </span>
              </div>

              <Link
                href={`${prefix}/doctors/${doc.id}`}
                className="text-sm text-teal font-medium hover:underline"
              >
                {isRTL ? "عرض الملف الشخصي" : "View Profile"}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href={`${prefix}/doctors`} className="btn-outline">
            {isRTL ? "عرض جميع الأطباء" : "View All Doctors"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
