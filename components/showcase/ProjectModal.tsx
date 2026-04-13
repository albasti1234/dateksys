"use client";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Monitor, Tablet, Smartphone, Check } from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import { projects, type Project } from "@/lib/projects";
import { CINEMATIC } from "@/lib/showcase-animations";

interface ProjectModalProps {
  project: Project | null;
  view: "website" | "dashboard";
  onViewChange: (view: "website" | "dashboard") => void;
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

type DeviceSize = "desktop" | "tablet" | "mobile";

const deviceWidths: Record<DeviceSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export default function ProjectModal({
  project,
  view,
  onViewChange,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const [device, setDevice] = useState<DeviceSize>("desktop");

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && prevProject) onNavigate(prevProject);
      if (e.key === "ArrowRight" && nextProject) onNavigate(nextProject);
    },
    [project, prevProject, nextProject, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const screenshotUrl =
    project
      ? view === "website"
        ? project.website.screenshots[0]
        : project.dashboard.screenshots[0]
      : "";

  const liveUrl =
    project
      ? view === "website"
        ? project.website.url
        : project.dashboard.url
      : undefined;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(6,6,10,0.85)", backdropFilter: "blur(16px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: CINEMATIC }}
            className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col lg:flex-row"
            style={{
              background: "#0C0C12",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <X className="w-4 h-4" style={{ color: "rgba(240,237,230,0.5)" }} />
            </button>

            {/* Left panel — Info */}
            <div
              className="w-full lg:w-[380px] shrink-0 p-6 lg:p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
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
                  {project.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "#F0EDE6", fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.name}
              </h2>

              {/* Meta */}
              <div className="flex gap-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: "rgba(240,237,230,0.3)" }}>
                    Client
                  </span>
                  <span className="text-xs font-medium" style={{ color: "rgba(240,237,230,0.7)" }}>
                    {project.client}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: "rgba(240,237,230,0.3)" }}>
                    Year
                  </span>
                  <span className="text-xs font-medium" style={{ color: "rgba(240,237,230,0.7)" }}>
                    {project.year}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider block mb-0.5" style={{ color: "rgba(240,237,230,0.3)" }}>
                    Status
                  </span>
                  <span
                    className="text-xs font-medium capitalize"
                    style={{ color: project.status === "live" ? "#4ADE80" : "rgba(240,237,230,0.5)" }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(240,237,230,0.5)", fontFamily: "var(--font-dm-sans)" }}
              >
                {project.description}
              </p>

              {/* View toggle */}
              <div className="flex gap-2 mb-6">
                {(["website", "dashboard"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => onViewChange(tab)}
                    className="px-4 py-2 rounded-lg text-xs font-medium capitalize transition-colors"
                    style={{
                      background: view === tab ? "rgba(139,123,244,0.12)" : "rgba(255,255,255,0.03)",
                      border: view === tab ? "1px solid rgba(139,123,244,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      color: view === tab ? "#8B7BF4" : "rgba(240,237,230,0.4)",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "rgba(240,237,230,0.3)" }}>
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-[10px] font-medium"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(240,237,230,0.5)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "rgba(240,237,230,0.3)" }}>
                  Features
                </span>
                <div className="space-y-1.5">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0" style={{ color: "#8B7BF4" }} />
                      <span className="text-xs" style={{ color: "rgba(240,237,230,0.5)" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live site button */}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{
                    background: "rgba(139,123,244,0.15)",
                    border: "1px solid rgba(139,123,244,0.3)",
                    color: "#F0EDE6",
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </a>
              )}
            </div>

            {/* Right panel — Preview */}
            <div className="flex-1 flex flex-col min-h-0 p-4 lg:p-6">
              {/* Device toggle */}
              <div className="flex items-center justify-end gap-1 mb-4">
                {([
                  { value: "desktop" as DeviceSize, icon: Monitor },
                  { value: "tablet" as DeviceSize, icon: Tablet },
                  { value: "mobile" as DeviceSize, icon: Smartphone },
                ] as const).map(({ value, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setDevice(value)}
                    className="p-2 rounded-md transition-colors"
                    style={{
                      background: device === value ? "rgba(139,123,244,0.12)" : "transparent",
                      color: device === value ? "#8B7BF4" : "rgba(240,237,230,0.3)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="flex-1 flex items-start justify-center overflow-auto">
                <div
                  className="transition-all duration-500"
                  style={{ width: deviceWidths[device], maxWidth: "100%" }}
                >
                  <BrowserFrame url={liveUrl ? `dateksys.com${liveUrl}` : "dateksys.com"}>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={screenshotUrl || "/showcase/school-demo.png"}
                        alt={`${project.name} ${view} preview`}
                        fill
                        sizes="800px"
                        className="object-cover object-top"
                      />
                    </div>
                  </BrowserFrame>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            {prevProject && (
              <button
                onClick={() => onNavigate(prevProject)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors z-20 hidden lg:flex"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: "rgba(240,237,230,0.5)" }} />
              </button>
            )}
            {nextProject && (
              <button
                onClick={() => onNavigate(nextProject)}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors z-20 hidden lg:flex"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: "rgba(240,237,230,0.5)" }} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
