import NewsArticleClient from "./NewsArticleClient";
import { locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  const ids = ["1", "2", "3", "4", "5", "6", "7"];
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  const locale: Locale = raw === "en" ? "en" : "ar";
  const articleIndex = parseInt(id, 10) - 1;

  return <NewsArticleClient locale={locale} articleIndex={articleIndex} />;
}
