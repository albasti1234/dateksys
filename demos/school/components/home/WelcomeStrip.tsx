"use client";

import { motion } from "framer-motion";
import { Compass, Users, BookOpen, Globe } from "lucide-react";

// ============================================
// Welcome / Values Strip
// ============================================

const values = [
  {
    icon: Compass,
    title: "Character First",
    desc: "Integrity, respect, and responsibility at the core of every lesson.",
  },
  {
    icon: BookOpen,
    title: "Academic Rigor",
    desc: "Globally benchmarked curriculum with personalized learning paths.",
  },
  {
    icon: Globe,
    title: "Global Mindset",
    desc: "Bilingual education preparing students for an interconnected world.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "A warm, inclusive environment where every child belongs.",
  },
];

export default function WelcomeStrip() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <p className="section-label mb-4 !justify-center">Welcome</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
            Shaping Tomorrow&apos;s Leaders,{" "}
            <span className="italic text-[var(--color-gold)]">Today</span>
          </h2>
          <div className="ornamental-divider mb-6" />
          <p className="text-[var(--color-ink-soft)] leading-relaxed text-lg">
            For over two decades, Al-Nakhla International Academy has been
            guiding students toward their highest potential — academically,
            personally, and socially. Our graduates don&apos;t just succeed; they
            lead with purpose.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="academic-card p-8 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #F8F6F1, #F3EFE6)",
                    border: "1px solid #E8E4D8",
                  }}
                >
                  <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-3">
                  {val.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
