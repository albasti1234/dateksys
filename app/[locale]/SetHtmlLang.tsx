"use client";

import { useEffect } from "react";

export default function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  }, [locale]);

  return null;
}
