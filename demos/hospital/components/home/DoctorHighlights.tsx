"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Department, Doctor } from "@/lib/types";
import { fadeUp, stagger, viewport } from "@/lib/animations";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name[locale] : "";
  };

  const avatarImages = [
    "/demos/hospital/images/doctor-m-1.png",
    "/demos/hospital/images/doctor-f-1.png",
    "/demos/hospital/images/doctor-m-1.png",
    "/demos/hospital/images/doctor-f-1.png",
    "/demos/hospital/images/doctor-m-1.png",
    "/demos/hospital/images/doctor-f-1.png",
  ];

  const featuredDoctors = doctors.slice(0, 6);

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <motion.span variants={fadeUp} className="section-label">
              {dict.label}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className={`text-3xl lg:text-4xl font-bold text-text-primary ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {dict.title}
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-text-secondary transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-text-secondary transition-all"
              aria-label="Next"
            >
              <ChevronRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredDoctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <Link href={`${prefix}/doctors/${doctor.id}`}>
                <div className="card overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  {/* Photo */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={avatarImages[i % avatarImages.length]}
                      alt={doctor.name[locale]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="280px"
                    />
                    {/* Available badge */}
                    {doctor.availableDays.includes("sun") && (
                      <div className="absolute top-3 start-3 badge badge-success">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                        </span>
                        <span>{isRTL ? "متاح اليوم" : "Available Today"}</span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <h3
                      className={`font-semibold text-text-primary mb-1 ${
                        isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
                      }`}
                    >
                      {doctor.name[locale]}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {getDeptName(doctor.departmentId)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                      <div>
                        {doctor.yearsExperience}+ {isRTL ? "سنة" : "yrs"}
                      </div>
                      <div className="truncate">
                        {doctor.languages.slice(0, 2).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Meet the team */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href={`${prefix}/doctors`} className="btn-outline">
            {dict.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
