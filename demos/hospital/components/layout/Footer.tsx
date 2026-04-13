"use client";

import Link from "next/link";
import { Heart, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { departments } from "@/lib/data";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["footer"];
  navDict?: Dictionary["nav"];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const p = (href: string) => `${prefix}${href === "/" ? "" : href}`;

  const quickLinks = [
    { label: isRTL ? "الرئيسية" : "Home", href: p("/") },
    { label: isRTL ? "عن المستشفى" : "About", href: p("/about") },
    { label: isRTL ? "الأطباء" : "Doctors", href: p("/doctors") },
    { label: isRTL ? "الخدمات" : "Services", href: p("/services") },
    { label: isRTL ? "تواصل معنا" : "Contact", href: p("/contact") },
  ];

  const topDepartments = departments.slice(0, 4);

  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Hospital info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-7 h-7 text-teal fill-teal" />
              <span
                className={`text-xl font-bold ${
                  isRTL ? "font-arabic-display" : "font-heading"
                }`}
              >
                {isRTL ? "مستشفى الحياة" : "Al-Hayat Hospital"}
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {dict.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 text-teal-light ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              {dict.quickLinks}
            </h3>
            <ul className="space-y-2.5">
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
              className={`text-sm font-semibold uppercase tracking-wider mb-4 text-teal-light ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              {dict.departments}
            </h3>
            <ul className="space-y-2.5">
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
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 text-teal-light ${
                isRTL ? "font-arabic-display" : "font-heading"
              }`}
            >
              {dict.contactInfo}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-teal-light" />
                <span>{dict.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-teal-light" />
                <a href="tel:065249036" className="hover:text-white transition-colors" dir="ltr">06-524-9036</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MessageCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <a href="https://wa.me/962780104920" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" dir="ltr">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0 text-teal-light" />
                <a
                  href="mailto:info@alhayat-hospital.jo"
                  className="hover:text-white transition-colors"
                >
                  info@alhayat-hospital.jo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
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
