import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/ui/LenisProvider";
import MagneticCursor from "@/components/ui/MagneticCursor";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import SetHtmlLang from "./SetHtmlLang";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(process.env.SITE_URL || "https://dateksys.com"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "ar" ? "ar_JO" : "en_US",
      siteName: "DatekSys",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <>
      <SetHtmlLang locale={locale} />
      {/* ✅ Accessibility — Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        {locale === "ar" ? "تخطي إلى المحتوى" : "Skip to content"}
      </a>

      {/* SEO — Structured Data */}
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />

      {/* Analytics */}
      <GoogleAnalytics />

      <NextIntlClientProvider messages={messages}>
        <LenisProvider>
          <MagneticCursor />
          <Navbar />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </NextIntlClientProvider>
    </>
  );
}