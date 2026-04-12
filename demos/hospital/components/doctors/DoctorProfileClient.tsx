"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

  const getInitials = (name: string) => {
    const words = name.split(" ").filter((w) => w.length > 1);
    if (words.length >= 2) {
      return words[1][0] + words[words.length - 1][0];
    }
    return words[0]?.[0] || "";
  };

  const daysDict = dict.portals.common.days;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link
            href={`${prefix}/doctors`}
            className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-teal transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {dict.common.back}
          </Link>
        </motion.div>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
        >
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-teal flex items-center justify-center text-white text-4xl font-bold shrink-0">
            {getInitials(doctor.name[locale])}
          </div>

          <div className="text-center md:text-start flex-1">
            <h1
              className={`text-3xl font-bold text-ink mb-2 ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              {doctor.name[locale]}
            </h1>
            <p className="text-lg text-ink-soft mb-3">
              {doctor.title[locale]}
            </p>

            {department && (
              <span className="inline-block text-sm px-4 py-1.5 rounded-full bg-teal/10 text-teal font-medium mb-4">
                {department.name[locale]}
              </span>
            )}

            {/* Rating + Experience */}
            <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(doctor.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-sm text-ink-soft ms-1">
                  {doctor.rating}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-ink-soft">
                <Briefcase className="w-4 h-4" />
                {doctor.yearsExperience} {dict.doctors.experience}
              </div>
            </div>

            <Link
              href={`${prefix}/appointments`}
              className="btn-primary"
            >
              <CalendarPlus className="w-4 h-4" />
              {dict.doctors.bookWith} {doctor.name[locale]}
            </Link>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-6"
        >
          <p className="text-ink-soft leading-relaxed">{doctor.bio[locale]}</p>
        </motion.div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Qualifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card p-6"
          >
            <h3
              className={`flex items-center gap-2 text-lg font-semibold text-ink mb-4 ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              <GraduationCap className="w-5 h-5 text-teal" />
              {dict.doctors.qualifications}
            </h3>
            <ul className="space-y-2">
              {doctor.qualifications.map((q, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3
              className={`flex items-center gap-2 text-lg font-semibold text-ink mb-4 ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              <Languages className="w-5 h-5 text-teal" />
              {dict.doctors.languages}
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((lang, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-ink-soft rounded-lg"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Available days */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card p-6 md:col-span-2"
          >
            <h3
              className={`flex items-center gap-2 text-lg font-semibold text-ink mb-4 ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              <CalendarDays className="w-5 h-5 text-teal" />
              {dict.doctors.availableDays}
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {dayKeys.map((day) => {
                const isAvailable = doctor.availableDays.includes(day);
                return (
                  <div
                    key={day}
                    className={`text-center py-3 rounded-xl text-sm font-medium ${
                      isAvailable
                        ? "bg-teal/10 text-teal"
                        : "bg-gray-50 text-ink-muted"
                    }`}
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
  );
}
