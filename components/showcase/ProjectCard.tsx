"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import { type Project } from "@/lib/projects";
import { fadeUp } from "@/lib/showcase-animations";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project, view: "website" | "dashboard") => void;
}

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [activeTab, setActiveTab] = useState<"website" | "dashboard">("website");

  const screenshotUrl =
    activeTab === "website"
      ? project.website.screenshots[0]
      : project.dashboard.screenshots[0];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
      onClick={() => onSelect(project, activeTab)}
    >
      {/* Browser mockup */}
      <BrowserFrame url={project.url ? `dateksys.com${project.url}` : "dateksys.com"}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={screenshotUrl || "/showcase/school-demo.png"}
            alt={`${project.name} preview`}
            fill
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
              View Project
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </BrowserFrame>

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
            {project.categoryLabel}
          </span>
          {project.status === "live" && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "#4ADE80" }}
            >
              Live
            </span>
          )}
          {project.status === "in-progress" && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "rgba(240,237,230,0.3)" }}
            >
              Coming Soon
            </span>
          )}
        </div>

        {/* Title + description */}
        <h3
          className="text-lg font-bold mb-2 transition-colors"
          style={{ color: "#F0EDE6", fontFamily: "var(--font-space-grotesk)" }}
        >
          {project.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "rgba(240,237,230,0.45)", fontFamily: "var(--font-dm-sans)" }}
        >
          {project.description}
        </p>

        {/* Website / Dashboard toggle */}
        <div className="flex gap-2 mb-4">
          {(["website", "dashboard"] as const).map((tab) => (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(tab);
              }}
              className="px-3 py-1.5 rounded-md text-[11px] font-medium capitalize transition-colors"
              style={{
                background:
                  activeTab === tab
                    ? "rgba(139,123,244,0.12)"
                    : "rgba(255,255,255,0.03)",
                border:
                  activeTab === tab
                    ? "1px solid rgba(139,123,244,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                color:
                  activeTab === tab
                    ? "#8B7BF4"
                    : "rgba(240,237,230,0.4)",
              }}
            >
              {tab}
            </button>
          ))}
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
