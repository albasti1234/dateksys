"use client";
import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, ExternalLink, Check, Monitor, Tablet, Smartphone,
  Globe, GraduationCap, BookOpen, Users, LayoutDashboard, Heart, ShoppingBag, Store,
  type LucideProps,
} from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import ScreenshotCarousel from "./ScreenshotCarousel";
import { projects, type Project } from "@/lib/projects";
import { CINEMATIC } from "@/lib/showcase-animations";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Globe, GraduationCap, BookOpen, Users, LayoutDashboard, Heart, ShoppingBag, Store,
};

interface ProjectModalProps {
  project: Project | null;
  initialPortalId: string;
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
  initialPortalId,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const [activePortalId, setActivePortalId] = useState(initialPortalId);
  const [device, setDevice] = useState<DeviceSize>("desktop");

  // Sync when initialPortalId changes
  useEffect(() => {
    if (initialPortalId) setActivePortalId(initialPortalId);
  }, [initialPortalId]);

  const activePortal = project?.portals.find((p) => p.id === activePortalId) || project?.portals[0];

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

  const liveUrl = activePortal?.url;

  return (
    <AnimatePresence>
      {project && activePortal && (
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

            {/* Left panel -- Info */}
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

              {/* Portal selector */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "rgba(240,237,230,0.3)" }}>
                  Portals
                </span>
                <div className="space-y-1">
                  {project.portals.map((portal) => {
                    const Icon = iconMap[portal.icon] || Globe;
                    const isActive = portal.id === activePortalId;
                    return (
                      <button
                        key={portal.id}
                        onClick={() => setActivePortalId(portal.id)}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200"
                        style={{
                          background: isActive ? "rgba(139,123,244,0.08)" : "transparent",
                          border: isActive ? "1px solid rgba(139,123,244,0.2)" : "1px solid transparent",
                        }}
                      >
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "#8B7BF4" }}
                          />
                        )}
                        <Icon
                          size={15}
                          className="shrink-0"
                          style={{ color: isActive ? "#8B7BF4" : "rgba(240,237,230,0.4)" }}
                        />
                        <span
                          className="flex-1 text-xs font-medium"
                          style={{
                            color: isActive ? "#8B7BF4" : "rgba(240,237,230,0.6)",
                            fontFamily: "var(--font-dm-sans)",
                          }}
                        >
                          {portal.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
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

            {/* Right panel -- Preview */}
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
                <motion.div
                  animate={{ width: deviceWidths[device] }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  style={{ maxWidth: "100%" }}
                >
                  <BrowserFrame url={liveUrl ? `dateksys.com${liveUrl}` : `dateksys.com — ${activePortal.nameEn}`}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePortal.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ScreenshotCarousel
                          screenshots={activePortal.screenshots}
                          alt={`${project.name} ${activePortal.nameEn}`}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </BrowserFrame>
                </motion.div>
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
