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
    title: t("about_title"),
    description: t("about_description"),
    openGraph: {
      title: t("about_title"),
      description: t("about_description"),
      url: `${BASE_URL}/${locale}/about`,
    },
    twitter: {
      title: t("about_title"),
      description: t("about_description"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        ar: `${BASE_URL}/ar/about`,
        "x-default": `${BASE_URL}/en/about`,
      },
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
