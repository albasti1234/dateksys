"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import Logo from "@/components/ui/Logo";

// ============================================
// Main Navigation
// Sticky, elegant, with mega-menu dropdown
// ============================================

const links = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Campus", href: "/about#campus" },
      { label: "Accreditation", href: "/about#accreditation" },
    ],
  },
  {
    label: "Academics",
    href: "/programs",
    dropdown: [
      { label: "Early Years (KG1-KG2)", href: "/programs#early" },
      { label: "Primary (Grades 1-5)", href: "/programs#primary" },
      { label: "Middle School (6-8)", href: "/programs#middle" },
      { label: "High School (9-12)", href: "/programs#high" },
      { label: "IB Programme", href: "/programs#ib" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Faculty", href: "/faculty" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const portals = [
  { label: "Parent Portal", href: "/portal/parent" },
  { label: "Teacher Portal", href: "/portal/teacher" },
  { label: "Student Portal", href: "/portal/student" },
  { label: "Admin Dashboard", href: "/portal/admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
          : "bg-white"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-navy)] transition-colors inline-flex items-center gap-1"
              >
                {link.label}
                {link.dropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
              </Link>

              <AnimatePresence>
                {link.dropdown && openDropdown === link.href && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full start-0 mt-1 min-w-[240px] bg-white border border-[var(--color-border)] shadow-xl"
                  >
                    <div className="py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-5 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)] hover:text-[var(--color-navy)] transition-colors border-s-2 border-transparent hover:border-[var(--color-gold)]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Portal login */}
        <div className="hidden lg:flex items-center gap-3 relative">
          <div
            onMouseEnter={() => setPortalOpen(true)}
            onMouseLeave={() => setPortalOpen(false)}
            className="relative"
          >
            <button className="btn-primary">
              <LogIn className="w-4 h-4" />
              <span>Portal Login</span>
            </button>

            <AnimatePresence>
              {portalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full end-0 mt-1 min-w-[220px] bg-white border border-[var(--color-border)] shadow-xl"
                >
                  <div className="py-2">
                    {portals.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="block px-5 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)] hover:text-[var(--color-navy)] transition-colors border-s-2 border-transparent hover:border-[var(--color-gold)]"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--color-navy)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-[var(--color-border)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-[var(--color-border-soft)] text-[var(--color-ink)] font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                <Link href="/portal/parent" onClick={() => setMobileOpen(false)}>
                  <button className="btn-primary w-full justify-center">
                    <LogIn className="w-4 h-4" />
                    Portal Login
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
