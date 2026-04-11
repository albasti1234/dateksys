// ============================================
// Al-Nakhla Academy — i18n Configuration
// ============================================

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeLabels: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export const localeHtmlLang: Record<Locale, string> = {
  ar: "ar",
  en: "en",
};
