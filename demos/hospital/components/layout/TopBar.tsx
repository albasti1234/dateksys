"use client";

import { useState } from "react";
import { X, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";

const DISMISS_KEY = "rmc:announcement-dismissed";

export default function TopBar({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem(DISMISS_KEY);
  });

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "true");
  };

  if (!visible) return null;

  return (
    <div className="bg-danger text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex items-center justify-center gap-3 text-xs tracking-wider">
        <Phone className="w-3.5 h-3.5" />
        <span className="font-medium">
          {locale === "ar"
            ? "◆ الطوارئ: متاحة ٢٤/٧ — اتصل"
            : "◆ Emergency: 24/7 ER available — Call"}
        </span>
        <a
          href="tel:+96265000000"
          className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
          dir="ltr"
        >
          +962 6 500 0000
        </a>
        <button
          onClick={dismiss}
          className="absolute end-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
