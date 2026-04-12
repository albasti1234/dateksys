"use client";

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
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Department } from "@/lib/types";

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

export default function DepartmentsPreview({
  locale,
  dict,
  departments,
}: {
  locale: Locale;
  dict: Dictionary["home"]["departments"];
  departments: Department[];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const top4 = departments.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {top4.map((dept, i) => {
            const Icon = iconMap[dept.icon] || Stethoscope;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6 text-center group"
              >
                <div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
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
                <p className="text-sm text-ink-soft mb-3 line-clamp-2">
                  {dept.description[locale]}
                </p>
                <span className="text-xs text-teal font-medium">
                  {dept.doctorCount}{" "}
                  {isRTL ? "أطباء" : "Doctors"}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href={`${prefix}/departments`}
            className="btn-outline"
          >
            {dict.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
