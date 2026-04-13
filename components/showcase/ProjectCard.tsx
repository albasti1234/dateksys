"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Globe, GraduationCap, BookOpen, Users, LayoutDashboard, Heart, ShoppingBag, Store, ChevronRight, ChevronLeft, type LucideProps } from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import { type Project } from "@/lib/projects";
import { fadeUp } from "@/lib/showcase-animations";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Globe,
  GraduationCap,
  BookOpen,
  Users,
  LayoutDashboard,
  Heart,
  ShoppingBag,
  Store,
};

interface ProjectCardProps {
  project: Project;
  index: number;
  locale: string;
  onSelect: (project: Project, portalId: string) => void;
}

export default function ProjectCard({ project, index, locale, onSelect }: ProjectCardProps) {
  const t = useTranslations("showcase");
  const lang = locale as "ar" | "en";
  const isRTL = locale === "ar";
  const coverUrl = project.portals[0]?.screenshots[0] || project.coverImage;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Browser mockup — click opens first portal */}
      <div className="cursor-pointer" onClick={() => onSelect(project, project.portals[0]?.id || "")}>
        <BrowserFrame url={project.portals[0]?.url ? `dateksys.com${project.portals[0].url}` : "dateksys.com"}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={coverUrl || "/showcase/school-demo.png"}
              alt={`${project.name[lang]} preview`}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(6,6,10,0.6)", backdropFilter: "blur(4px)" }}
            >
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(139,123,244,0.15)",
                  border: "1px solid rgba(139,123,244,0.3)",
                  color: "#F0EDE6",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {t("view_project")}
              </span>
            </div>
          </div>
        </BrowserFrame>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: `${project.categoryColor}14`,
              color: project.categoryColor,
              border: `1px solid ${project.categoryColor}30`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.categoryColor }}
            />
            {project.categoryLabel[lang]}
          </span>
          {project.status === "live" && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "#4ADE80" }}
            >
              {t("status_live")}
            </span>
          )}
          {project.status === "in-progress" && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "rgba(240,237,230,0.3)" }}
            >
              {t("status_coming_soon")}
            </span>
          )}
        </div>

        {/* Title + description */}
        <h3
          className="text-lg font-bold mb-2 transition-colors"
          style={{ color: "#F0EDE6", fontFamily: "var(--font-space-grotesk)" }}
        >
          {project.name[lang]}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "rgba(240,237,230,0.45)", fontFamily: "var(--font-dm-sans)" }}
        >
          {project.description[lang]}
        </p>

        {/* Portal list */}
        <div className="mb-4">
          <div
            className="flex items-center gap-2 mb-2"
            style={{ color: "rgba(240,237,230,0.25)" }}
          >
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[9px] font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {t("system_portals")}
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div className="space-y-1">
            {project.portals.map((portal) => {
              const Icon = iconMap[portal.icon] || Globe;
              return (
                <button
                  key={portal.id}
                  onClick={() => onSelect(project, portal.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-start transition-all duration-200 group/portal ${isRTL ? "hover:-translate-x-1" : "hover:translate-x-1"}`}
                  style={{
                    background: "transparent",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(139,123,244,0.06)";
                    e.currentTarget.style.borderColor = "rgba(139,123,244,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <Icon size={15} className="shrink-0" style={{ color: "rgba(240,237,230,0.4)" }} />
                  <span
                    className="flex-1 text-xs font-medium"
                    style={{ color: "rgba(240,237,230,0.6)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {portal.name[lang]}
                  </span>
                  <Chevron
                    size={13}
                    className="shrink-0 opacity-0 group-hover/portal:opacity-100 transition-opacity duration-200"
                    style={{ color: "rgba(139,123,244,0.6)" }}
                  />
                </button>
              );
            })}
          </div>
          <div className="h-px mt-2" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-[10px] font-medium"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(240,237,230,0.35)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="px-2 py-1 rounded text-[10px] font-medium"
              style={{ color: "rgba(240,237,230,0.25)" }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
