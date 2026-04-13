"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Activity,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { departments } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import { stagger, fadeUp } from "@/lib/animations";

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
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartments = departments.filter((dept) =>
    dept.name[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description[locale].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHero
        locale={locale}
        label={dict.departments.heroLabel}
        title={dict.departments.heroTitle}
        subtitle={dict.departments.heroSubtitle}
        imageUrl="/demos/hospital/images/hospital_hero.png"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.departments.heroLabel },
        ]}
      />

      <section className="py-20 min-h-[60vh]" style={{ background: "var(--color-navy, #0C4A6E)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className={`text-2xl font-bold text-white ${fontHeading}`}>
                {isRTL ? "جميع الأقسام" : "All Departments"}
              </h2>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} className="relative w-full md:w-96">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                placeholder={dict.common.search + "..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all text-white placeholder:text-white/40 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredDepartments.map((dept, i) => {
                const Icon = iconMap[dept.icon] || Stethoscope;
                return (
                  <motion.div
                    key={dept.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`${prefix}/doctors`} className="block h-full group">
                      <div
                        className="rounded-3xl p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
                        style={{
                          background: "var(--color-navy-dark, #083344)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(13,124,143,0.3)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                      >
                        <div
                          className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
                          style={{
                            background: "rgba(13,124,143,0.1)",
                            border: "1px solid rgba(13,124,143,0.2)",
                          }}
                        >
                          <Icon className="w-8 h-8" style={{ color: "#0D9488" }} />
                        </div>

                        <h3 className={`relative z-10 text-xl font-semibold text-white mb-3 group-hover:text-[#0D9488] transition-colors ${fontHeading}`}>
                          {dept.name[locale]}
                        </h3>

                        <p className="relative z-10 text-sm mb-6 leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {dept.description[locale]}
                        </p>

                        <div className="relative z-10 flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <span className="text-xs font-medium flex items-center gap-1.5" style={{ color: "#0D9488" }}>
                            <Activity className="w-3.5 h-3.5" />
                            {dept.doctorCount} {isRTL ? "أطباء" : "Doctors"}
                          </span>
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                            style={{ background: "rgba(13,124,143,0.1)", color: "#0D9488" }}
                          >
                            <Arrow className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredDepartments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <Search className="w-8 h-8 text-white/30" />
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 ${fontHeading}`}>
                  {dict.common.noResults}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)" }}>
                  {isRTL ? "لم يتم العثور على أقسام تطابق بحثك" : "No departments match your current search."}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
