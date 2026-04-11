"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FileText, Calendar, Users, CheckCircle2, ArrowRight, Download } from "lucide-react";

const steps = [
  { num: "01", icon: FileText, title: "Submit Application", desc: "Complete the online application form with your child's information and academic records." },
  { num: "02", icon: Calendar, title: "Schedule Visit", desc: "Book a campus tour and meet with our admissions team to see Al-Nakhla in action." },
  { num: "03", icon: Users, title: "Assessment", desc: "Age-appropriate assessment to understand your child's learning style and academic level." },
  { num: "04", icon: CheckCircle2, title: "Decision", desc: "Receive admission decision within 2 weeks along with enrollment details and next steps." },
];

const fees = [
  { level: "Early Years (KG1-KG2)", annual: "4,800", registration: "500" },
  { level: "Primary (Grades 1-5)", annual: "6,200", registration: "500" },
  { level: "Middle School (6-8)", annual: "7,400", registration: "500" },
  { level: "High School (9-10)", annual: "8,600", registration: "500" },
  { level: "High School IB (11-12)", annual: "10,200", registration: "750" },
];

const docs = [
  "Completed application form",
  "Birth certificate copy",
  "Last 2 years' school reports",
  "Passport/ID copies (student & parents)",
  "4 recent photographs",
  "Medical records & vaccinations",
  "Transfer certificate (if applicable)",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        label="Admissions"
        title="Begin your Al-Nakhla journey"
        subtitle="We warmly welcome applications from families who share our values of excellence, integrity, and lifelong learning."
        breadcrumbs={[{ label: "Admissions" }]}
        image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80"
      />

      {/* Process */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4 !justify-center">The Process</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
              Four simple <span className="italic text-[var(--color-gold)]">steps</span> to enrollment
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="relative p-8 bg-[var(--color-cream)] border border-[var(--color-border)] group hover:bg-white hover:shadow-xl transition-all">
                  <div className="absolute top-4 end-4 font-serif text-5xl font-bold text-[var(--color-gold)]/20">{s.num}</div>
                  <div className="w-14 h-14 bg-[var(--color-navy)] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-3">{s.title}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-16">
            <button className="btn-primary group">Start Application<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="section-label mb-4">Tuition & Fees</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">Transparent pricing for families</h2>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">All fees are in Jordanian Dinars (JOD) per academic year. Sibling discounts and merit scholarships available.</p>
          </div>

          <div className="bg-white border border-[var(--color-border)] shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--color-navy)] text-white">
                <tr>
                  <th className="text-start p-5 font-serif text-sm uppercase tracking-wider">Grade Level</th>
                  <th className="text-end p-5 font-serif text-sm uppercase tracking-wider">Annual Tuition</th>
                  <th className="text-end p-5 font-serif text-sm uppercase tracking-wider">Registration</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f, i) => (
                  <tr key={f.level} className={i % 2 === 0 ? "bg-[var(--color-cream)]" : "bg-white"}>
                    <td className="p-5 font-medium text-[var(--color-navy)]">{f.level}</td>
                    <td className="p-5 text-end font-serif text-xl font-bold text-[var(--color-navy)]">{f.annual} <span className="text-xs text-[var(--color-ink-soft)]">JOD</span></td>
                    <td className="p-5 text-end text-[var(--color-ink-soft)]">{f.registration} <span className="text-xs">JOD</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm text-[var(--color-ink-soft)] text-center max-w-3xl mx-auto">Fees include textbooks, stationery, standard school supplies, and most field trips. Additional costs may apply for uniforms, transportation, and optional activities.</p>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-4">Required Documents</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight">What you&apos;ll need to apply</h2>
            <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">Please prepare the following documents before starting your application. Digital copies are acceptable for the initial submission.</p>
            <button className="btn-outline group">
              <Download className="w-4 h-4" />
              Download Full Guide (PDF)
            </button>
          </div>
          <div className="space-y-3">
            {docs.map((d, i) => (
              <motion.div key={d} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="flex items-center gap-4 p-5 bg-[var(--color-cream)] border-s-4 border-[var(--color-gold)]">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                <span className="text-[var(--color-ink)]">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
