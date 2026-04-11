"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";

// ============================================
// Latest News & Events Preview
// ============================================

const news = [
  {
    category: "Achievement",
    date: "Mar 28, 2026",
    title:
      "Al-Nakhla students sweep top honors at National Robotics Championship",
    excerpt:
      "Our Grade 9 robotics team won first place, outperforming 45 schools across Jordan in the annual STEM competition.",
    image:
      "url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80')",
  },
  {
    category: "Event",
    date: "Apr 02, 2026",
    title: "Annual International Day celebrates diversity and cultures",
    excerpt:
      "Students, families, and faculty celebrated the rich cultural tapestry that makes our community unique.",
    image:
      "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80')",
  },
  {
    category: "Academics",
    date: "Apr 05, 2026",
    title:
      "IB Diploma students achieve record average score of 38 this year",
    excerpt:
      "The graduating class of 2026 has set a new benchmark with an average IB score significantly above the global average.",
    image:
      "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80')",
  },
];

export default function NewsPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="max-w-xl">
            <p className="section-label mb-4">Latest News</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-tight">
              What&apos;s happening on{" "}
              <span className="italic text-[var(--color-gold)]">campus</span>
            </h2>
          </div>
          <Link href="/news" className="btn-outline">
            All News & Events
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[var(--color-border)] overflow-hidden group hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-xl cursor-pointer"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: item.image }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span
                    className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: "#C19A4B" }}
                  >
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--color-ink-soft)]">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[var(--color-navy)] mb-3 leading-snug group-hover:text-[var(--color-gold-dark)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="mt-5 pt-4 border-t border-[var(--color-border-soft)] flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]">
                  <span>Read More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
