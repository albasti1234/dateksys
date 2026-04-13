"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Briefcase, ArrowRight, ArrowLeft, Search, GraduationCap } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { doctors, departments } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import { stagger, fadeUp } from "@/lib/animations";

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
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const [activeDept, setActiveDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = doctors.filter((d) => {
    const matchesSearch = d.name[locale].toLowerCase().includes(searchQuery.toLowerCase()) || d.title[locale].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = activeDept === "all" || d.departmentId === activeDept;
    return matchesSearch && matchesDept;
  });

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name[locale] : "";
  };

  return (
    <>
      <PageHero
        locale={locale}
        label={dict.doctors.heroLabel}
        title={dict.doctors.heroTitle}
        subtitle={dict.doctors.heroSubtitle}
        imageUrl="/demos/hospital/images/hospital_about.png"
        breadcrumbs={[
          { label: dict.common.breadcrumbHome, href: `/${locale}` },
          { label: dict.doctors.heroLabel },
        ]}
      />

      <section className="py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Controls Bar */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Filter tabs */}
              <div className="flex gap-2 overflow-x-auto flex-nowrap whitespace-nowrap pb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 max-w-4xl">
                <button
                  onClick={() => setActiveDept("all")}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeDept === "all"
                      ? "bg-navy text-white shadow-md shadow-navy/20"
                      : "bg-white text-ink-soft hover:bg-gray-100 hover:text-navy border border-gray-200"
                  }`}
                >
                  {dict.doctors.filterAll}
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setActiveDept(dept.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeDept === dept.id
                        ? "bg-navy text-white shadow-md shadow-navy/20"
                        : "bg-white text-ink-soft hover:bg-gray-100 hover:text-navy border border-gray-200"
                    }`}
                  >
                    {dept.name[locale]}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72 shrink-0">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft ${isRTL ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  placeholder={dict.common.search + "..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-white border border-gray-200 rounded-full py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all text-ink ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                />
              </div>
            </div>
          </div>

          {/* Doctor grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((doc, i) => {
                const imageSrc = i % 2 === 0 ? "/demos/hospital/images/doctor_male.png" : "/demos/hospital/images/doctor_female.png";
                
                return (
                  <motion.div
                    key={doc.id}
                    layout text-ink
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
                  >
                    {/* Header Image Area */}
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={doc.name[locale]}
                        fill
                        className="object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                      
                      {/* Department Badge Overlay */}
                      <div className="absolute bottom-4 start-4 end-4">
                        <span
                          className="inline-block text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-sm"
                          style={{ background: "rgba(13,124,143,0.1)", color: "#0D7C8F", border: "1px solid rgba(13,124,143,0.2)" }}
                        >
                          {getDeptName(doc.departmentId)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3
                        className={`text-xl font-bold text-navy mb-1 group-hover:text-teal transition-colors ${fontHeading}`}
                      >
                        {doc.name[locale]}
                      </h3>
                      <p className="text-sm font-medium text-ink-muted mb-4">{doc.title[locale]}</p>

                      <div className="space-y-3 flex-1">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, si) => (
                              <Star
                                key={si}
                                className={`w-3.5 h-3.5 ${
                                  si < Math.floor(doc.rating)
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-navy">
                            {doc.rating}
                          </span>
                        </div>

                        {/* Experience */}
                        <div className="flex items-center gap-2 text-sm text-ink-soft">
                          <Briefcase className="w-4 h-4 text-teal" />
                          <span>
                            {doc.yearsExperience} {dict.doctors.experience}
                          </span>
                        </div>

                        {/* Education mockup */}
                        <div className="flex items-center gap-2 text-sm text-ink-soft">
                          <GraduationCap className="w-4 h-4 text-teal shrink-0" />
                          <span className="truncate">Board Certified</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <Link
                          href={`${prefix}/doctors/${doc.id}`}
                          className="px-4 py-2 rounded-xl bg-gray-50 text-navy text-sm font-bold hover:bg-navy hover:text-white transition-colors duration-300"
                        >
                          {dict.doctors.viewProfile}
                        </Link>
                        <span className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                          <Arrow className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className={`text-2xl font-bold text-navy mb-2 ${fontHeading}`}>
                  {dict.common.noResults}
                </h3>
                <p className="text-ink-soft max-w-md mx-auto">
                  {isRTL ? "لم يتم العثور على أطباء يطابقون معايير البحث الخاصة بك. جرب تغيير القسم أو مصطلح البحث." : "No doctors match your current search criteria. Try changing the department or search term."}
                </p>
                <button
                  onClick={() => { setActiveDept("all"); setSearchQuery(""); }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-navy text-white text-sm font-semibold hover:bg-accent hover:text-navy transition-colors"
                >
                  {isRTL ? "مسح التصفية" : "Clear Filters"}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
