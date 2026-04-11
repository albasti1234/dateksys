"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Globe2,
  Trophy,
  Heart,
  Microscope,
  Music,
} from "lucide-react";

// ============================================
// Why Choose Us — Feature highlights
// ============================================

const features = [
  {
    icon: GraduationCap,
    stat: "98%",
    title: "University Acceptance",
    desc: "Our graduates are accepted to top universities worldwide including Oxford, MIT, and AUB.",
  },
  {
    icon: Globe2,
    stat: "15+",
    title: "Nationalities",
    desc: "A diverse, inclusive community bringing together students from across the globe.",
  },
  {
    icon: Trophy,
    stat: "50+",
    title: "Annual Awards",
    desc: "Students consistently win regional and international competitions in academics, arts, and sports.",
  },
  {
    icon: Heart,
    stat: "1:12",
    title: "Teacher Ratio",
    desc: "Small class sizes ensure every student receives personalized attention and care.",
  },
  {
    icon: Microscope,
    stat: "12",
    title: "STEM Labs",
    desc: "State-of-the-art science, robotics, and technology facilities for hands-on learning.",
  },
  {
    icon: Music,
    stat: "40+",
    title: "Clubs & Activities",
    desc: "From debate team to orchestra, athletics to coding club — we nurture every passion.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="section-label mb-4 !justify-center">Why Al-Nakhla</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
            The numbers tell our{" "}
            <span className="italic text-[var(--color-gold)]">story</span>
          </h2>
          <div className="ornamental-divider" />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 border border-[var(--color-border)] bg-[var(--color-cream)] hover:bg-white hover:shadow-xl transition-all duration-500 group"
              >
                {/* Icon + stat row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center"
                    style={{
                      background: "#0F2C5C",
                    }}
                  >
                    <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <div className="font-serif text-5xl font-bold gold-text">
                    {f.stat}
                  </div>
                </div>

                {/* Gold accent line */}
                <div
                  className="w-12 h-px mb-4 transition-all duration-500 group-hover:w-20"
                  style={{ background: "#C19A4B" }}
                />

                {/* Text */}
                <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
