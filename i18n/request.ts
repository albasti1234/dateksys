import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// ============================================
// i18n Request — جلب الترجمات على السيرفر
// ============================================
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // تأكد إن الـ locale صالح
  if (!locale || !routing.locales.includes(locale as "ar" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
