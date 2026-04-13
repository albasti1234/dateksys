"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Briefcase,
  Languages,
  GraduationCap,
  CalendarDays,
  ArrowRight,
  ArrowLeft,
  CalendarPlus,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Doctor, Department } from "@/lib/types";
import { fadeUp, stagger } from "@/lib/animations";

const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export default function DoctorProfileClient({
  locale,
  dict,
  doctor,
  department,
}: {
  locale: Locale;
  dict: Dictionary;
  doctor: Doctor;
  department: Department | undefined;
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";
  
  const daysDict = dict.portals.common.days;
  const imageSrc = "/demos/hospital/images/doctor_male.png";

  return (
    <div className="py-24 bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-full h-[400px] bg-gradient-to-b from-teal/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <Link
            href={`${prefix}/doctors`}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-ink-soft hover:text-teal transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {dict.common.back}
          </Link>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-navy/5 border border-gray-100 flex flex-col md:flex-row gap-12 lg:gap-16 mb-12 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-bl-full pointer-events-none" />

          {/* Avatar Section */}
          <motion.div variants={fadeUp} className="shrink-0 flex flex-col items-center">
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-8 border-gray-50 bg-gray-100 shadow-md mb-6 relative">
              <Image
                src={imageSrc}
                alt={doctor.name[locale]}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
            {department && (
              <span
                className="inline-block px-5 py-2 rounded-full font-bold tracking-wide text-sm shadow-sm"
                style={{ background: "rgba(13,124,143,0.1)", color: "#0D7C8F", border: "1px solid rgba(13,124,143,0.2)" }}
              >
                {department.name[locale]}
              </span>
            )}
          </motion.div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.h1
              variants={fadeUp}
              className={`text-4xl md:text-5xl font-bold text-navy mb-4 ${fontHeading}`}
            >
              {doctor.name[locale]}
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-ink-soft font-medium mb-8">
              {doctor.title[locale]}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8 mb-10">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(doctor.rating)
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-navy mt-1">
                  {doctor.rating}
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-3 text-lg font-medium text-ink-soft">
                <Briefcase className="w-6 h-6 text-teal" />
                {doctor.yearsExperience} {dict.doctors.experience}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href={`${prefix}/appointments`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-navy text-white font-bold tracking-wide shadow-xl shadow-navy/20 hover:bg-accent hover:text-navy transition-all duration-300 transform hover:-translate-y-1"
              >
                <CalendarPlus className="w-5 h-5" />
                {dict.doctors.bookWith} {doctor.name[locale]}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Extras Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm"
            >
              <h3 className={`text-2xl font-bold text-navy mb-6 ${fontHeading}`}>
                {isRTL ? "نبذة عن الطبيب" : "About Doctor"}
              </h3>
              <p className="text-lg text-ink-soft leading-relaxed font-light">{doctor.bio[locale]}</p>
            </motion.div>

            {/* Qualifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm"
            >
              <h3 className={`flex items-center gap-3 text-2xl font-bold text-navy mb-8 ${fontHeading}`}>
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-teal" />
                </div>
                {dict.doctors.qualifications}
              </h3>
              <ul className="space-y-4">
                {doctor.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-4 text-ink-soft lg:text-lg">
                    <div className="w-2 h-2 rounded-full bg-teal shrink-0 mt-2.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-8">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-navy text-white rounded-3xl p-8 border border-navy shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />
              <h3 className={`flex items-center gap-3 text-xl font-bold mb-6 ${fontHeading}`}>
                <Languages className="w-5 h-5 text-accent" />
                {dict.doctors.languages}
              </h3>
              <div className="flex flex-wrap gap-3">
                {doctor.languages.map((lang, i) => (
                  <span key={i} className="px-4 py-2 text-sm font-semibold bg-white/10 text-white rounded-xl backdrop-blur-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Available days */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
            >
              <h3 className={`flex items-center gap-3 text-xl font-bold text-navy mb-8 ${fontHeading}`}>
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-teal" />
                </div>
                {dict.doctors.availableDays}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {dayKeys.map((day) => {
                  const isAvailable = doctor.availableDays.includes(day);
                  if(!isAvailable) return null;
                  return (
                    <div
                      key={day}
                      className="text-center py-3 px-4 rounded-xl text-sm font-bold bg-teal/10 text-teal border border-teal/20 shadow-sm"
                    >
                      {daysDict[day]}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
