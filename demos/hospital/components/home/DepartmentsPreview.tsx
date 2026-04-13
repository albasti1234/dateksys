"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Bone, Baby, HeartHandshake, Brain, Siren, ScanLine, Stethoscope, ArrowRight,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Department } from "@/lib/types";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  Heart, Bone, Baby, HeartHandshake, Brain, Siren, ScanLine, Stethoscope,
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
  const top8 = departments.slice(0, 8);

  return (
    <section className="py-24 lg:py-32 bg-surface-dark" id="departments">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="section-label-on-dark">{dict.label}</span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-text-on-dark mb-4 ${
              isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
            }`}
          >
            {dict.title}
          </h2>
          <p className="text-text-on-dark-secondary max-w-2xl mx-auto">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {top8.map((dept) => {
            const Icon = iconMap[dept.icon] || Stethoscope;
            return (
              <motion.div key={dept.id} variants={fadeUp}>
                <Link href={`${prefix}/departments`}>
                  <div className="card-glass p-6 group cursor-pointer h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                      style={{ background: "rgba(13,124,143,0.1)", border: "1px solid rgba(13,124,143,0.2)" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: "#0D9488" }} />
                    </div>
                    <h3
                      className={`text-base font-semibold text-text-on-dark mb-2 ${
                        isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
                      }`}
                    >
                      {dept.name[locale]}
                    </h3>
                    <p className="text-sm text-text-on-dark-secondary mb-3 line-clamp-2 leading-relaxed">
                      {dept.description[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary font-medium">
                        {dept.doctorCount}{" "}
                        {isRTL ? "أطباء" : "Doctors"}
                      </span>
                      <ArrowRight className={`w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 ${isRTL ? "rtl:rotate-180" : ""}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href={`${prefix}/departments`}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            {dict.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
