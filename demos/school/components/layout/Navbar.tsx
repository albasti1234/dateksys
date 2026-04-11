"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogIn, Globe } from "lucide-react";
import Logo from "@/components/ui/Logo";
import type { Locale } from "@/i18n/config";

// ============================================
// Main Navigation — locale-aware, RTL-aware
// ============================================

type NavDict = {
  home: string;
  about: { label: string; items: readonly { label: string; href: string }[] };
  academics: {
    label: string;
    items: readonly { label: string; href: string }[];
  };
  admissions: string;
  faculty: string;
  news: string;
  contact: string;
  portalLogin: string;
  portals: readonly { label: string; href: string }[];
  toggleMenu: string;
  switchLanguage: string;
};

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: NavDict;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build locale-prefixed hrefs (Next.js trailingSlash: true adds a trailing /)
  const prefix = `/${locale}`;
  const p = (href: string) => `${prefix}${href === "/" ? "" : href}`;

  const links = [
    { label: dict.home, href: p("/") },
    {
      label: dict.about.label,
      href: p("/about"),
      dropdown: dict.about.items.map((it) => ({ ...it, href: p(it.href) })),
    },
    {
      label: dict.academics.label,
      href: p("/programs"),
      dropdown: dict.academics.items.map((it) => ({ ...it, href: p(it.href) })),
    },
    { label: dict.admissions, href: p("/admissions") },
    { label: dict.faculty, href: p("/faculty") },
    { label: dict.news, href: p("/news") },
    { label: dict.contact, href: p("/contact") },
  ];

  const portals = dict.portals.map((pt) => ({ ...pt, href: p(pt.href) }));

  // Language switcher target: usePathname() returns the path WITHOUT
  // the basePath (/demos/school), so we swap the first segment.
  // Next.js Link auto-prepends basePath when rendering the href.
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname
    ? pathname.replace(/^\/(ar|en)/, `/${otherLocale}`)
    : `/${otherLocale}`;

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
        <Link href={p("/")} className="shrink-0">
          <Logo locale={locale} />
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
                    className="absolute top-full start-0 mt-1 min-w-[260px] bg-white border border-[var(--color-border)] shadow-xl"
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

        {/* Portal login + Language */}
        <div className="hidden lg:flex items-center gap-3 relative">
          <Link
            href={switchHref}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-navy)] transition-colors border border-[var(--color-border)] hover:border-[var(--color-gold)]"
            lang={otherLocale}
            aria-label="Switch language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className={otherLocale === "ar" ? "font-arabic" : ""}>
              {dict.switchLanguage}
            </span>
          </Link>

          <div
            onMouseEnter={() => setPortalOpen(true)}
            onMouseLeave={() => setPortalOpen(false)}
            className="relative"
          >
            <button className="btn-primary">
              <LogIn className="w-4 h-4" />
              <span>{dict.portalLogin}</span>
            </button>

            <AnimatePresence>
              {portalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full end-0 mt-1 min-w-[240px] bg-white border border-[var(--color-border)] shadow-xl"
                >
                  <div className="py-2">
                    {portals.map((pt) => (
                      <Link
                        key={pt.href}
                        href={pt.href}
                        className="block px-5 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)] hover:text-[var(--color-navy)] transition-colors border-s-2 border-transparent hover:border-[var(--color-gold)]"
                      >
                        {pt.label}
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
          aria-label={dict.toggleMenu}
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

              <Link
                href={switchHref}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-[var(--color-border-soft)] text-[var(--color-ink-soft)] font-medium flex items-center gap-2"
                lang={otherLocale}
              >
                <Globe className="w-4 h-4" />
                <span className={otherLocale === "ar" ? "font-arabic" : ""}>
                  {dict.switchLanguage}
                </span>
              </Link>

              <div className="mt-4">
                <Link href={p("/portal/parent")} onClick={() => setMobileOpen(false)}>
                  <button className="btn-primary w-full justify-center">
                    <LogIn className="w-4 h-4" />
                    {dict.portalLogin}
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
