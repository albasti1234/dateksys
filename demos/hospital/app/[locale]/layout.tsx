import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import LocaleHtmlAttrs from "./LocaleHtmlAttrs";

// ============================================
// Per-locale layout — NO <html>/<body> here
// (Those live in the root app/layout.tsx)
// This layout updates <html lang> and <html dir> via a tiny client
// component so Arabic pages render RTL and English pages render LTR.
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
      siteName: "Al-Hayat Hospital",
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
