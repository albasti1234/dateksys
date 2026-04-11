"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Calendar, Phone, Globe } from "lucide-react";
import type { Locale } from "@/i18n/config";

// ============================================
// Top Announcement Bar
// Rotating messages + contact + language switch
// ============================================

type DictShape = {
  phoneLabel: string;
  hoursLabel: string;
  rotating: readonly string[];
  closeLabel: string;
};

export default function AnnouncementBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: DictShape;
}) {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % dict.rotating.length),
      5000
    );
    return () => clearInterval(t);
  }, [dict.rotating.length]);

  if (!visible) return null;

  // Swap /ar/... ↔ /en/... while preserving the rest of the path
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname
    ? pathname.replace(/^\/demos\/school\/(ar|en)/, `/demos/school/${otherLocale}`)
    : `/demos/school/${otherLocale}`;
  const switchLabel = locale === "ar" ? "English" : "العربية";

  return (
    <div className="relative bg-[var(--color-navy-dark)] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between text-xs">
        {/* Start — contact */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+96265551234"
            className="flex items-center gap-1.5 text-white/70 hover:text-[var(--color-gold)] transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span className="num">+962 6 555 1234</span>
          </a>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/70">
            <Calendar className="w-3 h-3" />
            <span>{dict.hoursLabel}</span>
          </div>
        </div>

        {/* Center — rotating announcement */}
        <div className="flex-1 text-center px-4">
          <span
            key={idx}
            className="inline-block text-[var(--color-gold-light)] font-medium animate-[fadeIn_0.5s_ease]"
          >
            {dict.rotating[idx]}
          </span>
        </div>

        {/* End — language + close */}
        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-[var(--color-gold)] transition-colors"
            lang={otherLocale}
          >
            <Globe className="w-3 h-3" />
            <span className={otherLocale === "ar" ? "font-arabic" : ""}>
              {switchLabel}
            </span>
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label={dict.closeLabel}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
