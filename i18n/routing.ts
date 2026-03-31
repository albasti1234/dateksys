import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// ============================================
// i18n Routing — إعدادات اللغات
// عربي = افتراضي، إنجليزي = ثانوي
// ============================================
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
});

// Navigation helpers — بتستخدمهم بدل next/link و next/navigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
