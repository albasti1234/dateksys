"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { GraduationCap, Globe, Award } from "lucide-react";

const departments = ["All", "Administration", "Mathematics & Sciences", "Languages", "Humanities", "Arts & PE", "Early Years"];

const faculty = [
  { name: "Dr. Sarah Haddad", role: "Head of School", dept: "Administration", education: "PhD · Columbia University", years: 15, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Mr. Tariq Mansour", role: "Deputy Head — Academics", dept: "Administration", education: "MEd · University of Cambridge", years: 18, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Ms. Nadia Khouri", role: "Head of Primary", dept: "Early Years", education: "MA · American University of Beirut", years: 12, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Dr. James Wilson", role: "Head of High School", dept: "Mathematics & Sciences", education: "PhD · Oxford University", years: 20, image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80" },
  { name: "Dr. Amira Saleh", role: "Arabic Language Lead", dept: "Languages", education: "PhD · University of Jordan", years: 14, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { name: "Mr. David Chen", role: "Physics & IB Coordinator", dept: "Mathematics & Sciences", education: "MSc · Imperial College London", years: 10, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name: "Ms. Lina Haddad", role: "English Literature", dept: "Languages", education: "MA · Edinburgh University", years: 8, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Mr. Hassan Al-Ali", role: "Robotics & Computer Science", dept: "Mathematics & Sciences", education: "MS · Georgia Tech", years: 7, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { name: "Ms. Maya Johnson", role: "Visual Arts", dept: "Arts & PE", education: "MFA · Rhode Island School of Design", years: 9, image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80" },
  { name: "Dr. Omar Qasim", role: "History & Philosophy", dept: "Humanities", education: "PhD · Sorbonne University", years: 16, image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80" },
  { name: "Ms. Rana Toukan", role: "Early Years Coordinator", dept: "Early Years", education: "MEd · University of Toronto", years: 11, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
  { name: "Mr. Youssef Marouf", role: "Physical Education", dept: "Arts & PE", education: "BS · German Jordanian University", years: 6, image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&q=80" },
];

const stats = [
  { icon: GraduationCap, num: "65+", label: "Faculty Members" },
  { icon: Globe, num: "18", label: "Nationalities" },
  { icon: Award, num: "82%", label: "Hold Advanced Degrees" },
];

export default function FacultyPage() {
  return (
    <>
      <PageHero
        label="Our Educators"
        title="Meet our faculty"
        subtitle="Our teachers are the heart of Al-Nakhla. Passionate, qualified, and dedicated — they bring out the best in every student."
        breadcrumbs={[{ label: "Faculty" }]}
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
      />

      <section className="py-16 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[var(--color-navy)] flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-[var(--color-gold)]" />
                </div>
                <div>
                  <div className="font-serif text-4xl font-bold text-[var(--color-navy)]">{s.num}</div>
                  <div className="text-sm uppercase tracking-wider text-[var(--color-ink-soft)]">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {departments.map((d) => (
              <button key={d} className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white border border-[var(--color-border)] hover:bg-[var(--color-navy)] hover:text-white hover:border-[var(--color-navy)] transition-all">{d}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((f, i) => (
              <motion.div key={f.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: (i % 6) * 0.08 }} className="academic-card overflow-hidden group">
                <div className="h-72 bg-cover bg-center relative" style={{ backgroundImage: `url('${f.image}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
                  <div className="absolute top-4 start-4">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-gold)] text-white">{f.dept}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-1">{f.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-semibold mb-4">{f.role}</p>
                  <div className="pt-4 border-t border-[var(--color-border-soft)] space-y-2 text-xs text-[var(--color-ink-soft)]">
                    <div className="flex items-center gap-2"><GraduationCap className="w-3 h-3 text-[var(--color-gold)]" />{f.education}</div>
                    <div className="flex items-center gap-2"><Award className="w-3 h-3 text-[var(--color-gold)]" />{f.years} years of experience</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
