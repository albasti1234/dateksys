"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Phone } from "lucide-react";

// ============================================
// Final CTA — Schedule visit
// ============================================

export default function CallToAction() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background imagery */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--color-navy)] text-white p-12 lg:p-20 relative overflow-hidden"
        >
          {/* Gold corner accents */}
          <div
            className="absolute top-0 start-0 w-24 h-24 border-t-4 border-s-4 pointer-events-none"
            style={{ borderColor: "#C19A4B" }}
          />
          <div
            className="absolute bottom-0 end-0 w-24 h-24 border-b-4 border-e-4 pointer-events-none"
            style={{ borderColor: "#C19A4B" }}
          />

          {/* Background gold glow */}
          <div
            className="absolute top-0 end-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "#C19A4B" }}
          />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="section-label !text-[var(--color-gold-light)] mb-6">
                Discover Al-Nakhla
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ready to begin your child&apos;s{" "}
                <span className="italic text-[var(--color-gold-light)]">
                  journey
                </span>
                ?
              </h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                Schedule a personalized campus visit, meet our faculty, and
                experience the Al-Nakhla difference firsthand. Applications for
                2026-2027 are now open.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <Link href="/admissions">
                <button className="w-full btn-gold !bg-[var(--color-gold)] !text-white !border-[var(--color-gold)] group">
                  Apply Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="w-full btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-[var(--color-navy)] group">
                <Calendar className="w-4 h-4" />
                Schedule Visit
              </button>
              <a
                href="tel:+96265551234"
                className="mt-2 flex items-center justify-center gap-2 text-sm text-white/60 hover:text-[var(--color-gold-light)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>or call +962 6 555 1234</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
