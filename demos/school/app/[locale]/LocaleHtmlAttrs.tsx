"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/i18n/config";

// ============================================
// Keeps <html lang> and <html dir> in sync with the current locale.
// The root layout also runs an inline script that does the same
// synchronously before React hydrates — this component just makes
// sure client-side navigation between /ar ↔ /en updates it too.
// ============================================

export default function LocaleHtmlAttrs({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute("data-locale", locale);
  }, [locale]);

  return null;
}
