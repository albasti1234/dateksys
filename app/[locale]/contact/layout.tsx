import { getTranslations } from "next-intl/server";

const BASE_URL = process.env.SITE_URL || "https://dateksys.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contact_title"),
    description: t("contact_description"),
    openGraph: {
      title: t("contact_title"),
      description: t("contact_description"),
      url: `${BASE_URL}/${locale}/contact`,
    },
    twitter: {
      title: t("contact_title"),
      description: t("contact_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        ar: `${BASE_URL}/ar/contact`,
        "x-default": `${BASE_URL}/en/contact`,
      },
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
