"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, CalendarPlus, Heart } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["nav"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isRTL = locale === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = `/${locale}`;
  const p = (href: string) => `${prefix}${href === "/" ? "" : href}`;

  const links = [
    { label: dict.home, href: p("/") },
    { label: dict.about, href: p("/about") },
    { label: dict.departments, href: p("/departments") },
    { label: dict.doctors, href: p("/doctors") },
    { label: dict.services, href: p("/services") },
    { label: dict.contact, href: p("/contact") },
  ];

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname
    ? pathname.replace(/^\/(ar|en)/, `/${otherLocale}`)
    : `/${otherLocale}`;

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === prefix || href === `${prefix}/`) {
      return pathname === prefix || pathname === `${prefix}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={p("/")} className="shrink-0 flex items-center gap-2">
          <Heart className="w-8 h-8 text-teal fill-teal" />
          <span
            className={`text-xl font-bold text-navy ${
              isRTL ? "font-arabic-display" : "font-heading"
            }`}
          >
            {isRTL ? "مستشفى الحياة" : "Al-Hayat"}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                isActive(link.href)
                  ? "text-teal bg-teal/5"
                  : "text-ink hover:text-teal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={switchHref}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-soft hover:text-teal transition-colors border border-gray-200 rounded-lg hover:border-teal"
            lang={otherLocale}
            aria-label="Switch language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{dict.langSwitch}</span>
          </Link>

          <Link href={p("/appointments")} className="btn-primary text-sm">
            <CalendarPlus className="w-4 h-4" />
            <span>{dict.appointments}</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-navy"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 border-b border-gray-100 font-medium ${
                    isActive(link.href) ? "text-teal" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href={switchHref}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-gray-100 text-ink-soft font-medium flex items-center gap-2"
                lang={otherLocale}
              >
                <Globe className="w-4 h-4" />
                <span>{dict.langSwitch}</span>
              </Link>

              <div className="mt-4">
                <Link
                  href={p("/appointments")}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="btn-primary w-full justify-center">
                    <CalendarPlus className="w-4 h-4" />
                    {dict.appointments}
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
