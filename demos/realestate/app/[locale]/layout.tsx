import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import LocaleHtmlAttrs from "./LocaleHtmlAttrs";

// ============================================
// Per-locale layout — Dar Al-Maskan
// ============================================

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [...dict.meta.keywords],
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      siteName: "Dar Al-Maskan",
      locale: locale === "ar" ? "ar_JO" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  const locale: Locale = raw === "en" ? "en" : "ar";

  return (
    <>
      <LocaleHtmlAttrs locale={locale} />
      {children}
    </>
  );
}
