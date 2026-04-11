import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import type { Locale } from "@/i18n/config";

// ============================================
// Footer — Elegant, multi-column, bilingual
// ============================================

type FooterDict = {
  schoolName: string;
  tagline: string;
  about: string;
  columns: {
    academy: { title: string; links: readonly { label: string; href: string }[] };
    academics: {
      title: string;
      links: readonly { label: string; href: string }[];
    };
    parents: { title: string; links: readonly { label: string; href: string }[] };
    connect: {
      title: string;
      items: readonly { label: string; value: string }[];
    };
  };
  bottomBar: {
    copyright: string;
    privacy: string;
    terms: string;
    sitemap: string;
  };
};

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: FooterDict;
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const p = (href: string) => `${prefix}${href}`;

  const columns = [
    dict.columns.academy,
    dict.columns.academics,
    dict.columns.parents,
  ];

  return (
    <footer className="relative bg-[var(--color-navy-dark)] text-white mt-auto">
      {/* Top decorative gold line */}
      <div
        className="h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C19A4B 20%, #D4B26A 50%, #C19A4B 80%, transparent)",
        }}
      />

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Logo locale={locale} />
          </div>
          <p
            className={`text-white/60 text-sm mb-6 ${
              isRTL ? "leading-[2]" : "leading-relaxed"
            }`}
          >
            {dict.about}
          </p>

          {/* Contact info */}
          <div className="space-y-3 text-sm">
            {dict.columns.connect.items.map((item) => {
              const Icon =
                item.label.includes("ريد") ||
                item.label.toLowerCase().includes("mail")
                  ? Mail
                  : item.label.includes("اتف") ||
                      item.label.toLowerCase().includes("phone")
                    ? Phone
                    : MapPin;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-3 text-white/70"
                >
                  <Icon className="w-4 h-4 mt-0.5 text-[var(--color-gold)] shrink-0" />
                  <span
                    className={
                      Icon === Phone || Icon === Mail ? "num" : undefined
                    }
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h4
              className={`text-base text-[var(--color-gold)] mb-4 tracking-wider ${
                isRTL ? "font-arabic-display font-bold" : "font-serif uppercase"
              }`}
            >
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={p(link.href)}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Connect column */}
        <div>
          <h4
            className={`text-base text-[var(--color-gold)] mb-4 tracking-wider ${
              isRTL ? "font-arabic-display font-bold" : "font-serif uppercase"
            }`}
          >
            {dict.columns.connect.title}
          </h4>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://facebook.com/alnakhla.edu.jo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/50 hover:text-[var(--color-gold)] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/alnakhla.edu.jo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/50 hover:text-[var(--color-gold)] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@alnakhla"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-white/50 hover:text-[var(--color-gold)] transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/school/alnakhla-academy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/50 hover:text-[var(--color-gold)] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">{dict.bottomBar.copyright}</p>
          <div className="flex items-center gap-5 text-xs text-white/50">
            <Link
              href={p("/legal/privacy")}
              className="hover:text-[var(--color-gold)]"
            >
              {dict.bottomBar.privacy}
            </Link>
            <Link
              href={p("/legal/terms")}
              className="hover:text-[var(--color-gold)]"
            >
              {dict.bottomBar.terms}
            </Link>
            <Link
              href={p("/contact")}
              className="hover:text-[var(--color-gold)]"
            >
              {dict.bottomBar.sitemap}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
