"use client";

import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { departments } from "@/lib/data";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["footer"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const p = (href: string) => `${prefix}${href === "/" ? "" : href}`;

  const quickLinks = [
    { label: isRTL ? "الرئيسية" : "Home", href: p("/") },
    { label: isRTL ? "عن المركز" : "About", href: p("/about") },
    { label: isRTL ? "الأطباء" : "Doctors", href: p("/doctors") },
    { label: isRTL ? "حجز موعد" : "Book Appointment", href: p("/appointments") },
    { label: isRTL ? "تواصل معنا" : "Contact", href: p("/contact") },
    { label: isRTL ? "الأسئلة الشائعة" : "FAQ", href: p("/faq") },
  ];

  const patientResources = [
    { label: isRTL ? "بوابة المريض" : "Patient Portal", href: `${prefix}/portal/patient` },
    { label: isRTL ? "التأمين الصحي" : "Insurance", href: p("/insurance") },
    { label: isRTL ? "الخدمات" : "Services", href: p("/services") },
    { label: isRTL ? "الوظائف" : "Careers", href: p("/") },
  ];

  const topDepartments = departments.slice(0, 5);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Emergency Banner */}
      <div className="bg-danger/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-center gap-3 text-sm font-semibold">
          <Phone className="w-4 h-4" />
          <span>
            {isRTL ? "طوارئ ٢٤/٧:" : "24/7 Emergency:"}
          </span>
          <a
            href="tel:+96265000000"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            dir="ltr"
          >
            +962 6 500 0000
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Hospital info */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-lg font-bold ${
                  isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
                }`}
              >
                {isRTL ? "مستشفى الحياة" : "Al-Hayat Hospital"}
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {dict.description}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-5 text-primary ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {dict.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-5 text-primary ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {dict.departments}
            </h3>
            <ul className="space-y-3">
              {topDepartments.map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={p("/departments")}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {dept.name[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={p("/departments")}
                  className="text-sm text-primary hover:text-primary-light transition-colors font-medium"
                >
                  {isRTL ? "جميع الأقسام →" : "All Departments →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-5 text-primary ${
                isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]"
              }`}
            >
              {dict.contactInfo}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>{dict.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <a
                  href="tel:+96265000000"
                  className="hover:text-white transition-colors"
                  dir="ltr"
                >
                  +962 6 500 0000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a
                  href="mailto:info@royalmedical.jo"
                  className="hover:text-white transition-colors"
                >
                  info@royalmedical.jo
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Clock className="w-4 h-4 shrink-0 text-primary" />
                <span>{isRTL ? "السبت-الخميس ٨ص-٨م" : "Sat-Thu 8AM-8PM"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>
            &copy; {year}{" "}
            {isRTL ? "مستشفى الحياة" : "Al-Hayat Hospital"}.{" "}
            {dict.rights}.
          </span>
          <div className="flex items-center gap-4">
            <Link href={p("/")} className="hover:text-white transition-colors">
              {dict.privacy}
            </Link>
            <Link href={p("/")} className="hover:text-white transition-colors">
              {dict.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
