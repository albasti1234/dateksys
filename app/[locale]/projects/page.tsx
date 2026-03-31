"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <div className="bg-[var(--color-base)] min-h-screen">
      <section className="px-[5%] lg:px-[6%] pt-36 pb-20">
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-[2px] bg-accent rounded-full" />
            <span className="section-label">{t("label")}</span>
          </div>
          <h1 className="text-[clamp(2.6rem,5.5vw,5rem)] font-heading font-black tracking-tight leading-[1.05] text-[var(--color-text-primary)] mb-5">
            {t("title")}
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl">
            {t("sub")}
          </p>
        </motion.div>

        <ProjectsGrid />
      </section>
    </div>
  );
}