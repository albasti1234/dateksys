"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/about", labelKey: "about" },
  { href: "/blog", labelKey: "blog" },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/contact", labelKey: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 50);
    if (latest > 200) {
      setIsVisible(latest < previous);
    } else {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-[5%] lg:px-[6%] pt-4"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`
            w-full flex items-center justify-between
            px-5 sm:px-7 py-3.5 rounded-2xl transition-all duration-500
            ${
              isScrolled
                ? "bg-[#09090B]/80 backdrop-blur-2xl border border-[var(--color-border)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                : "bg-transparent border border-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              data-magnetic
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Dateksys"
                className="h-10 lg:h-12 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm transition-colors duration-300 group ${
                    active ? "text-white" : "text-text-secondary hover:text-text-primary"
                  }`}
                  data-magnetic
                >
                  {t(link.labelKey)}
                  <span
                    className={`absolute bottom-1 left-3.5 right-3.5 h-px bg-accent transition-transform duration-300 origin-left ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-surface-2 text-text-primary border border-border cursor-pointer hover:border-accent hover:shadow-[0_0_20px_var(--color-border-glow)] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-magnetic
              >
                {t("cta")}
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span className="block w-6 h-[1.5px] bg-white"
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-[1.5px] bg-white"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-6 h-[1.5px] bg-white"
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-[#09090B] flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <motion.div key={link.labelKey}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-heading font-bold transition-colors ${
                      active ? "text-accent" : "text-text-primary hover:text-accent"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.div>
              );
            })}

            {/* Extra links — FAQ & Careers */}
            <motion.div
              className="flex gap-6 mt-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                {t("faq")}
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                {t("careers")}
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-4">
              <LanguageSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}