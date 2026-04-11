import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";

// ============================================
// Footer — Elegant, multi-column, with newsletter
// ============================================

const footerColumns = [
  {
    title: "School",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Campus Tour", href: "/about#campus" },
      { label: "Accreditation", href: "/about#accreditation" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Early Years", href: "/programs#early" },
      { label: "Primary School", href: "/programs#primary" },
      { label: "Middle School", href: "/programs#middle" },
      { label: "High School", href: "/programs#high" },
      { label: "IB Programme", href: "/programs#ib" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Admissions", href: "/admissions" },
      { label: "Tuition & Fees", href: "/admissions#fees" },
      { label: "News & Events", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Portals",
    links: [
      { label: "Parent Portal", href: "/portal/parent" },
      { label: "Teacher Portal", href: "/portal/teacher" },
      { label: "Student Portal", href: "/portal/student" },
      { label: "Admin Dashboard", href: "/portal/admin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-navy-dark)] text-white mt-auto">
      {/* Top decorative gold line */}
      <div
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, transparent, #C19A4B 20%, #D4B26A 50%, #C19A4B 80%, transparent)",
        }}
      />

      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="section-label !text-[var(--color-gold)] mb-2">Stay Informed</p>
            <h3 className="font-serif text-2xl lg:text-3xl">
              Join our community newsletter
            </h3>
            <p className="text-white/60 text-sm mt-2">
              Get news, events, and announcements delivered monthly.
            </p>
          </div>
          <form className="flex gap-2 w-full lg:w-auto lg:min-w-[400px]">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/15 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            />
            <button type="submit" className="btn-gold !border-[var(--color-gold)]">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Logo />
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Al-Nakhla International Academy is a premier K-12 institution in Amman,
            committed to academic excellence, character development, and preparing
            global citizens for tomorrow&apos;s world.
          </p>

          {/* Contact info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 text-white/70">
              <MapPin className="w-4 h-4 mt-0.5 text-[var(--color-gold)] shrink-0" />
              <span>Abu Nseir, Amman 11947, Jordan</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Phone className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
              <span>+962 6 555 1234</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Mail className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
              <span>info@alnakhla-academy.edu.jo</span>
            </div>
          </div>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-serif text-base text-[var(--color-gold)] mb-4 uppercase tracking-wider">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © 2026 Al-Nakhla International Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-white/50 hover:text-[var(--color-gold)] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="text-white/50 hover:text-[var(--color-gold)] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="text-white/50 hover:text-[var(--color-gold)] transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-[var(--color-gold)] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-white/40">
            Built by <span className="text-[var(--color-gold)]">DatekSys</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
