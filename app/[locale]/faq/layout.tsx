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
    title: t("faq_title"),
    description: t("faq_description"),
    openGraph: {
      title: t("faq_title"),
      description: t("faq_description"),
      url: `${BASE_URL}/${locale}/faq`,
    },
    twitter: {
      title: t("faq_title"),
      description: t("faq_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: {
        en: `${BASE_URL}/en/faq`,
        ar: `${BASE_URL}/ar/faq`,
        "x-default": `${BASE_URL}/en/faq`,
      },
    },
  };
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
