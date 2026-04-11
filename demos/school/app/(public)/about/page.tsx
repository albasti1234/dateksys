"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Target, Eye, Heart, Award, CheckCircle2 } from "lucide-react";

const values = [
  { icon: Target, title: "Mission", text: "To nurture confident, compassionate global citizens through rigorous academics and character development." },
  { icon: Eye, title: "Vision", text: "To be Jordan's most respected international school, known for excellence in education and community impact." },
  { icon: Heart, title: "Values", text: "Integrity, Excellence, Respect, Innovation, and Community at the heart of everything we do." },
];

const leadership = [
  { name: "Dr. Sarah Haddad", role: "Head of School", bio: "15+ years in international education, PhD in Educational Leadership from Columbia University.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Mr. Tariq Mansour", role: "Deputy Head — Academics", bio: "Former IB examiner, specializes in STEM curriculum design and teacher development.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Ms. Nadia Khouri", role: "Head of Primary", bio: "Passionate early childhood educator with 12 years of experience in bilingual instruction.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Dr. James Wilson", role: "Head of High School", bio: "Former university professor, leads our IB Diploma Programme and college counseling.", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80" },
];

const accreditations = [
  "International Baccalaureate Organization (IBO)",
  "Council of International Schools (CIS)",
  "Jordan Ministry of Education",
  "Middle States Association of Colleges and Schools",
  "Cambridge International Education",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="A legacy of excellence since 2003"
        subtitle="For over two decades, Al-Nakhla International Academy has been shaping the minds of young leaders through a world-class education rooted in character and community."
        breadcrumbs={[{ label: "About" }]}
        image="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
      />

      {/* Mission / Vision / Values */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="academic-card p-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-[var(--color-navy)] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-navy)] mb-4">{v.title}</h3>
                  <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-4" />
                  <p className="text-[var(--color-ink-soft)] leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6 leading-tight">
              Built on a <span className="italic text-[var(--color-gold)]">foundation</span> of purpose
            </h2>
            <div className="space-y-4 text-[var(--color-ink-soft)] leading-relaxed">
              <p>Founded in 2003 by a group of visionary educators and parents, Al-Nakhla International Academy began as a small school with a big dream: to offer Jordanian families a world-class international education without leaving home.</p>
              <p>Today, we welcome over 850 students from 15+ nationalities into our vibrant learning community. Our graduates have gone on to study at Oxford, MIT, Harvard, AUB, and top universities across the globe — and more importantly, they&apos;ve become leaders in their communities.</p>
              <p>What sets us apart isn&apos;t just our curriculum or facilities — it&apos;s our unwavering commitment to every child&apos;s individual journey.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[500px]">
            <div className="absolute top-0 end-0 w-[70%] h-[60%] shadow-2xl bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80')" }} />
            <div className="absolute bottom-0 start-0 w-[55%] h-[50%] shadow-2xl bg-cover bg-center border-8 border-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80')" }} />
            <div className="absolute top-0 start-0 w-20 h-20 border-t-4 border-s-4 border-[var(--color-gold)]" />
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4 !justify-center">Our Leadership</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">Meet the team shaping futures</h2>
            <div className="ornamental-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((l, i) => (
              <motion.div key={l.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="academic-card overflow-hidden group">
                <div className="h-64 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${l.image}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-1">{l.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-semibold mb-3">{l.role}</p>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{l.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section id="accreditation" className="py-24 lg:py-32 bg-[var(--color-navy)] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <Award className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
          <p className="section-label !text-[var(--color-gold)] mb-4 !justify-center">Accreditations</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10">Internationally recognized excellence</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4 text-start">
            {accreditations.map((a) => (
              <div key={a} className="flex items-start gap-3 bg-white/5 border border-[var(--color-gold)]/20 p-5">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span className="text-white/90">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
