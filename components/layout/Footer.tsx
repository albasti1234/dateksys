"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Inline SVGs — social icons that are stable regardless of lucide-react version
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const footerLinks = {
  services: [
    { labelKey: "networking", href: "/services" },
    { labelKey: "servers", href: "/services" },
    { labelKey: "erp", href: "/services" },
    { labelKey: "software", href: "/services" },
  ],
  company: [
    { labelKey: "about", href: "/about" },
    { labelKey: "projects", href: "/projects" },
    { labelKey: "careers", href: "/careers" },
    { labelKey: "contact", href: "/contact" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://linkedin.com" },
  { label: "X / Twitter", Icon: XIcon, href: "https://twitter.com" },
  { label: "GitHub", Icon: GitHubIcon, href: "https://github.com" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
      {/* === CTA Section === */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--accent-primary)]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--accent-secondary)]/5 rounded-full blur-[120px]" />

        <div className="relative z-10 py-24 sm:py-32 lg:py-40 text-center px-[5%] lg:px-[6%]">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-6 font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("cta_label")}
          </motion.p>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-8xl font-display font-bold tracking-tighter text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t("cta_title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/contact">
              <motion.button
                className="mt-10 px-10 py-4 text-lg font-medium rounded-full bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-shadow duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                data-magnetic
              >
                {t("cta_button")}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* === Footer Links === */}
      <motion.div
        className="border-t border-[var(--border-subtle)] px-[5%] lg:px-[6%] py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Col 1 — Brand */}
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
            <span className="text-xl font-display font-bold text-white">
              Net<span className="text-[var(--accent-primary)]">core</span>
            </span>
            <p className="mt-4 text-sm text-[var(--text-tertiary)] leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </motion.div>

          {/* Col 2 — Services */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold text-white mb-4 font-body">
              {t("services_title")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-tertiary)] hover:text-white transition-colors duration-300"
                  >
                    {t(`services.${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Company */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold text-white mb-4 font-body">
              {t("company_title")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-tertiary)] hover:text-white transition-colors duration-300"
                  >
                    {t(`company.${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold text-white mb-4 font-body">
              {t("contact_title")}
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-tertiary)]">
              <li>
                <a href="mailto:info@dateksys.com" className="hover:text-white transition-colors duration-300">
                  info@dateksys.com
                </a>
              </li>
              <li>{t("address")}</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.05] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.08] hover:border-[var(--border-light)] transition-all duration-300"
                  data-magnetic
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* === Bottom Bar === */}
      <div className="border-t border-[var(--border-subtle)] px-[5%] lg:px-[6%] py-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} DatekSys. {t("rights")}</span>
          <span>{t("made_with")}</span>
        </div>
      </div>
    </footer>
  );
}
