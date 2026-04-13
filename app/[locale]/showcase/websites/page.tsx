"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import HeroSection from "@/components/showcase/HeroSection";
import FilterBar from "@/components/showcase/FilterBar";
import ProjectGrid from "@/components/showcase/ProjectGrid";
import ProjectModal from "@/components/showcase/ProjectModal";
import StatsSection from "@/components/showcase/StatsSection";
import CTASection from "@/components/showcase/CTASection";
import { type ProjectCategory, type Project } from "@/lib/projects";

export default function ShowcasePage() {
  const locale = useLocale();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPortalId, setSelectedPortalId] = useState<string>("");

  const handleSelectProject = (project: Project, portalId: string) => {
    setSelectedProject(project);
    setSelectedPortalId(portalId);
  };

  return (
    <div
      style={{ background: "#06060A", color: "#F0EDE6" }}
      className="min-h-screen"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <HeroSection locale={locale} />
      <FilterBar active={filter} locale={locale} onChange={setFilter} />
      <ProjectGrid
        filter={filter}
        locale={locale}
        onSelectProject={handleSelectProject}
      />
      <StatsSection locale={locale} />
      <CTASection locale={locale} />

      <ProjectModal
        project={selectedProject}
        initialPortalId={selectedPortalId}
        locale={locale}
        onClose={() => setSelectedProject(null)}
        onNavigate={(project) => {
          setSelectedProject(project);
          setSelectedPortalId(project.portals[0].id);
        }}
      />
    </div>
  );
}
