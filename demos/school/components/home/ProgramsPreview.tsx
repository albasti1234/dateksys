"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// ============================================
// Programs Preview — Academic programs
// ============================================

const programs = [
  {
    stage: "Early Years",
    grades: "KG1 – KG2",
    ages: "Ages 4-6",
    desc: "Play-based learning that builds curiosity, confidence, and a love for discovery through hands-on exploration.",
    image:
      "url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80')",
    color: "#4A90E2",
  },
  {
    stage: "Primary School",
    grades: "Grades 1 – 5",
    ages: "Ages 6-11",
    desc: "Foundation years focused on core literacy, numeracy, and character development in a nurturing environment.",
    image:
      "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80')",
    color: "#2D8659",
  },
  {
    stage: "Middle School",
    grades: "Grades 6 – 8",
    ages: "Ages 11-14",
    desc: "Critical thinking takes center stage as students explore diverse subjects and discover their passions.",
    image:
      "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80')",
    color: "#C19A4B",
  },
  {
    stage: "High School",
    grades: "Grades 9 – 12",
    ages: "Ages 14-18",
    desc: "University preparation with IB Diploma Programme, AP courses, and comprehensive college counseling.",
    image:
      "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80')",
    color: "#0F2C5C",
  },
];

export default function ProgramsPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="max-w-xl">
            <p className="section-label mb-4">Academic Programs</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-tight">
              Every stage designed for{" "}
              <span className="italic text-[var(--color-gold)]">growth</span>
            </h2>
          </div>
          <Link href="/programs" className="btn-outline">
            Explore All Programs
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.stage}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer bg-white"
            >
              {/* Image */}
              <div
                className="h-[280px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: p.image }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Top badge */}
              <div className="absolute top-5 start-5 flex items-center gap-2">
                <div
                  className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white"
                  style={{ background: p.color }}
                >
                  {p.grades}
                </div>
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/90 text-[var(--color-navy)]">
                  {p.ages}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 start-0 end-0 p-6 text-white">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
                  {p.stage}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed max-w-md">
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[var(--color-gold-light)] text-sm font-semibold uppercase tracking-wider">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
