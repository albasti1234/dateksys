export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export const localeConfig: Record<Locale, { label: string; dir: "rtl" | "ltr"; lang: string }> = {
  ar: { label: "العربية", dir: "rtl", lang: "ar" },
  en: { label: "English", dir: "ltr", lang: "en" },
};
