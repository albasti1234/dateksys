"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { BookOpen, Users, Globe, Sparkles, Trophy, FlaskConical } from "lucide-react";

const programs = [
  {
    id: "early",
    grade: "KG1 — KG2",
    age: "Ages 4-6",
    name: "Early Years",
    desc: "A play-based, inquiry-driven approach where young learners develop foundational skills through exploration, creativity, and social interaction.",
    highlights: ["Bilingual storytelling", "Sensory exploration", "Early literacy", "Music & Art", "Outdoor play"],
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
  },
  {
    id: "primary",
    grade: "Grades 1-5",
    age: "Ages 6-11",
    name: "Primary School",
    desc: "A strong academic foundation combined with character development, creative expression, and social-emotional learning.",
    highlights: ["IB PYP Framework", "Mother-tongue Arabic", "STEM foundations", "Arts integration", "Specialist teachers"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
  },
  {
    id: "middle",
    grade: "Grades 6-8",
    age: "Ages 11-14",
    name: "Middle School",
    desc: "Students develop independent thinking, digital literacy, and subject expertise while exploring their passions through electives and clubs.",
    highlights: ["IB MYP Programme", "Coding & robotics", "Debate & public speaking", "Global perspectives", "Service learning"],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
  },
  {
    id: "high",
    grade: "Grades 9-12",
    age: "Ages 14-18",
    name: "High School",
    desc: "Rigorous college preparation through the IB Diploma Programme, AP courses, and comprehensive university counseling.",
    highlights: ["IB Diploma Programme", "AP courses available", "University counseling", "Research capstone", "International exchange"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
  },
];

const pillars = [
  { icon: BookOpen, title: "Academic Excellence", desc: "Globally benchmarked curriculum with proven results." },
  { icon: Users, title: "Small Class Sizes", desc: "1:12 teacher-student ratio ensures personal attention." },
  { icon: Globe, title: "Bilingual Education", desc: "Full immersion in both English and Arabic." },
  { icon: FlaskConical, title: "STEM Focus", desc: "Dedicated labs for science, robotics, and technology." },
  { icon: Sparkles, title: "Arts & Creativity", desc: "Visual arts, music, theatre, and design throughout." },
  { icon: Trophy, title: "Character Building", desc: "Values-based education at every grade level." },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        label="Academics"
        title="Programs designed for every stage"
        subtitle="From early childhood through graduation, our carefully crafted curriculum nurtures every dimension of a child's development."
        breadcrumbs={[{ label: "Academics" }]}
        image="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=80"
      />

      {/* Six pillars */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4 !justify-center">Our Approach</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
              Six pillars of our <span className="italic text-[var(--color-gold)]">education</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="flex gap-5 p-6 academic-card">
                  <div className="shrink-0 w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-2">{p.title}</h3>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program stages */}
      {programs.map((p, i) => (
        <section key={p.id} id={p.id} className={i % 2 === 0 ? "py-24 lg:py-32 bg-[var(--color-cream)]" : "py-24 lg:py-32 bg-white"}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[var(--color-navy)]">{p.grade}</span>
                  <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-[var(--color-gold)] text-white">{p.age}</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">{p.name}</h2>
                <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8 text-lg">{p.desc}</p>
                <div className="space-y-2.5">
                  {p.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 text-[var(--color-ink)]">
                      <div className="w-5 h-5 flex items-center justify-center bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
                        <div className="w-1.5 h-1.5 bg-[var(--color-gold)]" />
                      </div>
                      <span className="text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[500px] shadow-2xl bg-cover bg-center" style={{ backgroundImage: `url('${p.image}')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/40 to-transparent" />
                <div className="absolute top-4 end-4 w-16 h-16 border-t-2 border-e-2 border-[var(--color-gold)]" />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
