"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

// ============================================
// Language Switcher — تبديل عربي / إنجليزي
// زر مصغّر مع animation عند التبديل
// ============================================
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    // استبدل الـ locale في الـ URL
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <motion.button
      onClick={toggleLocale}
      className="
        relative flex items-center gap-1.5 px-3 py-1.5 rounded-full
        bg-white/[0.05] border border-white/[0.08]
        text-xs font-medium text-white/60 hover:text-white
        hover:bg-white/[0.08] hover:border-white/[0.12]
        transition-all duration-300
      "
      whileTap={{ scale: 0.95 }}
      data-magnetic
    >
      <span className="w-4 h-4 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[10px]">
        {locale === "ar" ? "ع" : "En"}
      </span>
      <span>{locale === "ar" ? "English" : "العربية"}</span>
    </motion.button>
  );
}
