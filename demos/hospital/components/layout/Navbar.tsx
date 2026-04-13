"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import {
  Menu, X, Globe, CalendarPlus, ChevronDown, Shield,
  Heart, Bone, Baby, HeartHandshake, Brain, Siren, ScanLine, Stethoscope,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { departments } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Heart, Bone, Baby, HeartHandshake, Brain, Siren, ScanLine, Stethoscope,
};

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["nav"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const pathname = usePathname();
  const isRTL = locale === "ar";
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const deptRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 5 && latest > 100) {
      setHidden(true);
      setDeptOpen(false);
    } else if (diff < -5) {
      setHidden(false);
    }
    setScrolled(latest > 20);
    lastScrollY.current = latest;
  });

  // Close mega-menu on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const prefix = `/${locale}`;
  const p = useCallback(
    (href: string) => `${prefix}${href === "/" ? "" : href}`,
    [prefix]
  );

  const links = [
    { label: dict.home, href: p("/") },
    { label: dict.about, href: p("/about") },
    { label: dict.departments, href: p("/departments"), hasMega: true },
    { label: dict.doctors, href: p("/doctors") },
    { label: isRTL ? "الأخبار" : "News", href: p("/services") },
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

  // Determine if hero is transparent (only on home page)
  const isHomePage =
    pathname === prefix ||
    pathname === `${prefix}/` ||
    pathname === `${prefix}`;

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={p("/")} className="shrink-0 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold leading-tight ${
                scrolled || !isHomePage ? "text-navy" : "text-white"
              } ${isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"}`}
            >
              {isRTL ? "مستشفى الحياة" : "Al-Hayat"}
            </span>
            <span
              className={`text-[10px] font-medium tracking-widest uppercase ${
                scrolled || !isHomePage ? "text-primary" : "text-primary-light"
              }`}
            >
              {isRTL ? "CENTER" : "Center"}
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1" ref={deptRef}>
          {links.map((link) =>
            link.hasMega ? (
              <div key={link.href} className="relative">
                <button
                  onClick={() => setDeptOpen(!deptOpen)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : scrolled || !isHomePage
                      ? "text-text-body hover:text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      deptOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega-menu */}
                <AnimatePresence>
                  {deptOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute top-full start-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-2xl shadow-xl border border-border p-6"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {departments.map((dept) => {
                          const Icon = iconMap[dept.icon] || Stethoscope;
                          return (
                            <Link
                              key={dept.id}
                              href={`${prefix}/departments`}
                              onClick={() => setDeptOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-subtle transition-colors group"
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                style={{ background: "rgba(13,124,143,0.1)", border: "1px solid rgba(13,124,143,0.2)" }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: "#0D9488" }}
                                />
                              </div>
                              <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                                {dept.name[locale]}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <Link
                          href={`${prefix}/departments`}
                          onClick={() => setDeptOpen(false)}
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          {isRTL ? "عرض جميع الأقسام ←" : "View All Departments →"}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive(link.href)
                    ? "text-primary bg-primary/5"
                    : scrolled || !isHomePage
                    ? "text-text-body hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={switchHref}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors border rounded-lg ${
              scrolled || !isHomePage
                ? "text-text-secondary hover:text-primary border-border hover:border-primary"
                : "text-white/70 hover:text-white border-white/20 hover:border-white/40"
            }`}
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
          className={`lg:hidden p-2 ${
            scrolled || !isHomePage ? "text-navy" : "text-white"
          }`}
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
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 border-b border-border/50 font-medium ${
                    isActive(link.href) ? "text-primary" : "text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href={switchHref}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-border/50 text-text-secondary font-medium flex items-center gap-2"
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
    </motion.header>
  );
}
