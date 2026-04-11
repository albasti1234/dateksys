"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

const infoItems = [
  { icon: MapPin, title: "Address", lines: ["Abu Nseir, Amman 11947", "Jordan"] },
  { icon: Phone, title: "Phone", lines: ["+962 6 555 1234", "+962 79 555 1234"] },
  { icon: Mail, title: "Email", lines: ["info@alnakhla-academy.edu.jo", "admissions@alnakhla-academy.edu.jo"] },
  { icon: Clock, title: "Office Hours", lines: ["Sunday - Thursday", "8:00 AM - 4:00 PM"] },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <PageHero
        label="Get in Touch"
        title="We'd love to hear from you"
        subtitle="Whether you have questions about admissions, want to schedule a tour, or simply want to learn more about Al-Nakhla — we're here to help."
        breadcrumbs={[{ label: "Contact" }]}
      />

      {/* Info cards */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="academic-card p-8">
                  <div className="w-12 h-12 bg-[var(--color-navy)] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-navy)] mb-3">{item.title}</h3>
                  {item.lines.map((l) => <p key={l} className="text-sm text-[var(--color-ink-soft)]">{l}</p>)}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white p-10 lg:p-12 shadow-xl border border-[var(--color-border)]">
            <p className="section-label mb-4">Send a Message</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-8">We&apos;ll get back to you within 24 hours</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">First Name</label>
                  <input required type="text" className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors" placeholder="Your first name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Last Name</label>
                  <input required type="text" className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors" placeholder="Your last name" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Email</label>
                <input required type="email" className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors" placeholder="+962 7X XXX XXXX" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Schedule a Tour</option>
                  <option>Careers</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none" placeholder="Tell us how we can help..." />
              </div>
              <button type="submit" disabled={submitted} className="btn-primary w-full justify-center">
                {submitted ? "Message Sent ✓" : (<><Send className="w-4 h-4" /> Send Message</>)}
              </button>
            </form>
          </motion.div>

          {/* Map placeholder */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative bg-[var(--color-navy)] min-h-[600px] overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-transparent" />
            <div className="relative h-full flex flex-col justify-between p-10 text-white">
              <div>
                <p className="section-label !text-[var(--color-gold)] mb-4">Visit Our Campus</p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">A beautiful place to learn</h3>
                <p className="text-white/70 leading-relaxed max-w-md">Located in the scenic hills of Abu Nseir, our campus spans 25 acres of landscaped grounds, sports facilities, and modern academic buildings.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-[var(--color-gold)]/20 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
                  <div>
                    <div className="text-sm font-semibold">Abu Nseir, Amman</div>
                    <div className="text-xs text-white/60">25 min from downtown</div>
                  </div>
                </div>
                <button className="btn-gold w-full justify-center">Get Directions</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
