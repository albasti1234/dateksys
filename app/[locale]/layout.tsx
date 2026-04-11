import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Space_Grotesk, DM_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/ui/LenisProvider";
import MagneticCursor from "@/components/ui/MagneticCursor";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
      images: [
        {
          url: `${process.env.SITE_URL || "https://dateksys.com"}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "DatekSys — Enterprise IT Infrastructure & Software Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${process.env.SITE_URL || "https://dateksys.com"}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${process.env.SITE_URL || "https://dateksys.com"}/${locale}`,
      languages: {
        en: `${process.env.SITE_URL || "https://dateksys.com"}/en`,
        ar: `${process.env.SITE_URL || "https://dateksys.com"}/ar`,
        "x-default": `${process.env.SITE_URL || "https://dateksys.com"}/en`,
      },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
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
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${ibmPlexArabic.variable}`}
      >
        {/* Accessibility — Skip to content */}
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
        <Analytics />

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
      </body>
    </html>
  );
}
