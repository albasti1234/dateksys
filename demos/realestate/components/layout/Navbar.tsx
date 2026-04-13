"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const prefix = `/${locale}`;
  const p = useCallback(
    (href: string) => `${prefix}${href === "/" ? "" : href}`,
    [prefix]
  );

  const links = [
    { label: dict.properties, href: p("/properties") },
    { label: dict.about, href: p("/about") },
    { label: dict.journal, href: p("/journal") },
    { label: dict.contact, href: p("/contact") },
  ];

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname
    ? pathname.replace(/^\/(ar|en)/, `/${otherLocale}`)
    : `/${otherLocale}`;

  const isHomePage =
    pathname === prefix ||
    pathname === `${prefix}/`;

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === prefix || href === `${prefix}/`) {
      return pathname === prefix || pathname === `${prefix}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1 }}
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        isHomePage && !scrolled ? "-mb-20" : ""
      } ${
        scrolled || !isHomePage
          ? "bg-white/90 backdrop-blur-xl border-b border-border"
          : "bg-surface-dark/20 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={p("/")} className="shrink-0">
          <div className="flex flex-col">
            <span
              className={`text-xl font-medium tracking-tight leading-none ${
                scrolled || !isHomePage ? "text-text-heading" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              DAR
            </span>
            <span
              className={`text-[9px] font-light tracking-[0.4em] uppercase ${
                scrolled || !isHomePage ? "text-text-secondary" : "text-white/50"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              AL-MASKAN
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-light tracking-[0.15em] transition-colors ${
                isActive(link.href)
                  ? "text-gold"
                  : scrolled || !isHomePage
                  ? "text-text-body hover:text-gold"
                  : "text-white/70 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={switchHref}
            className={`flex items-center gap-1.5 text-[12px] font-light tracking-wider transition-colors ${
              scrolled || !isHomePage
                ? "text-text-secondary hover:text-gold"
                : "text-white/40 hover:text-white/70"
            }`}
            lang={otherLocale}
          >
            <Globe className="w-3.5 h-3.5" />
            {dict.langSwitch}
          </Link>

          <Link
            href={p("/contact")}
            className={`text-[11px] font-light tracking-[0.25em] uppercase px-6 py-2.5 border transition-colors ${
              scrolled || !isHomePage
                ? "text-gold border-border-gold hover:bg-gold hover:text-white"
                : "text-white/70 border-white/15 hover:border-white/30 hover:text-white"
            }`}
          >
            {dict.inquire}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${
            scrolled || !isHomePage ? "text-text-heading" : "text-white"
          }`}
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
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 text-sm font-light tracking-wider ${
                    isActive(link.href) ? "text-gold" : "text-text-heading"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={switchHref}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary text-sm flex items-center gap-2"
                  lang={otherLocale}
                >
                  <Globe className="w-4 h-4" />
                  {dict.langSwitch}
                </Link>
                <Link
                  href={p("/contact")}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-[10px]"
                >
                  {dict.inquire}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
