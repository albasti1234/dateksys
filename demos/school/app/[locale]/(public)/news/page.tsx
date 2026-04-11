"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { Calendar, ArrowUpRight } from "lucide-react";

const categories = ["All", "Academic", "Sports", "Arts", "Events", "Community"];

const posts = [
  { cat: "Achievement", date: "Mar 28, 2026", title: "Al-Nakhla students sweep top honors at National Robotics Championship", excerpt: "Our Grade 9 robotics team won first place, outperforming 45 schools across Jordan in the annual STEM competition.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", featured: true },
  { cat: "Event", date: "Apr 02, 2026", title: "Annual International Day celebrates diversity and cultures", excerpt: "Students, families, and faculty celebrated the rich cultural tapestry that makes our community unique.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" },
  { cat: "Academics", date: "Apr 05, 2026", title: "IB Diploma students achieve record average score of 38 this year", excerpt: "The graduating class of 2026 has set a new benchmark with an average IB score significantly above the global average.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" },
  { cat: "Sports", date: "Mar 25, 2026", title: "Varsity basketball team claims regional championship", excerpt: "An undefeated season culminated in a dramatic final against long-time rivals from Amman International.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
  { cat: "Arts", date: "Mar 20, 2026", title: "Annual Spring Concert showcases student musicians", excerpt: "Over 120 students performed in the two-night concert featuring classical, jazz, and traditional Arabic music.", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80" },
  { cat: "Community", date: "Mar 18, 2026", title: "Students raise 12,000 JOD for local children's hospital", excerpt: "Our annual charity drive exceeded expectations, with proceeds going directly to support pediatric care.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" },
  { cat: "Event", date: "Mar 15, 2026", title: "Science Fair 2026: 60 student projects on display", excerpt: "From renewable energy solutions to AI-powered health apps, our students showcased remarkable innovation.", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80" },
];

export default function NewsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        label="News & Events"
        title="Stories from our community"
        subtitle="Stay up to date with the latest achievements, events, and moments that define life at Al-Nakhla."
        breadcrumbs={[{ label: "News" }]}
      />

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c, i) => (
              <button key={c} className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${i === 0 ? "bg-[var(--color-navy)] text-white" : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[var(--color-navy)] hover:text-white"}`}>{c}</button>
            ))}
          </div>

          {/* Featured */}
          <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 grid lg:grid-cols-2 gap-8 academic-card overflow-hidden">
            <div className="h-[400px] lg:h-auto bg-cover bg-center" style={{ backgroundImage: `url('${featured.image}')` }} />
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[var(--color-gold)] mb-4">{featured.cat} · Featured</span>
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] mb-4">
                <Calendar className="w-3 h-3" />{featured.date}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4 leading-tight">{featured.title}</h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">{featured.excerpt}</p>
              <button className="btn-outline w-fit group">Read Full Story<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></button>
            </div>
          </motion.article>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <motion.article key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="academic-card overflow-hidden group cursor-pointer">
                <div className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${p.image}')` }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-navy)] text-white">{p.cat}</span>
                    <span className="inline-flex items-center gap-1 text-[var(--color-ink-soft)]"><Calendar className="w-3 h-3" />{p.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-navy)] mb-3 leading-snug group-hover:text-[var(--color-gold-dark)] transition-colors">{p.title}</h3>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-3">{p.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
