"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/i18n/config";

export default function LocaleHtmlAttrs({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const doc = document.documentElement;
    doc.lang = locale;
    doc.dir = locale === "ar" ? "rtl" : "ltr";
    doc.setAttribute("data-locale", locale);
  }, [locale]);

  return null;
}
