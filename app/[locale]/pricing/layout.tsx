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
    title: t("pricing_title"),
    description: t("pricing_description"),
    openGraph: {
      title: t("pricing_title"),
      description: t("pricing_description"),
      url: `${BASE_URL}/${locale}/pricing`,
    },
    twitter: {
      title: t("pricing_title"),
      description: t("pricing_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/pricing`,
      languages: {
        en: `${BASE_URL}/en/pricing`,
        ar: `${BASE_URL}/ar/pricing`,
        "x-default": `${BASE_URL}/en/pricing`,
      },
    },
  };
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
