"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface ProjectItem {
  type: string;
  title: string;
  desc: string;
  tech: string;
  metrics: string[];
  color: string;
  image?: string;
}

const colorMap: Record<
  string,
  { accent: string; glow: string; bg: string; border: string }
> = {
  blue: {
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.12)",
    bg: "rgba(56,189,248,0.05)",
    border: "rgba(56,189,248,0.2)",
  },
  cyan: {
    accent: "#22D3EE",
    glow: "rgba(34,211,238,0.12)",
    bg: "rgba(34,211,238,0.05)",
    border: "rgba(34,211,238,0.2)",
  },
  purple: {
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.12)",
    bg: "rgba(167,139,250,0.05)",
    border: "rgba(167,139,250,0.2)",
  },
  green: {
    accent: "#4ADE80",
    glow: "rgba(74,222,128,0.12)",
    bg: "rgba(74,222,128,0.05)",
    border: "rgba(74,222,128,0.2)",
  },
};

const defaultImages: Record<string, string> = {
  "Network Infrastructure": "/images/projects/network.webp",
  "Data Center": "/images/projects/datacenter.webp",
  "Security Systems": "/images/projects/security.webp",
  Software: "/images/projects/software.webp",
  "Web Development": "/images/projects/webdev.webp",
  "البنية التحتية للشبكات": "/images/projects/network.webp",
  "مراكز البيانات": "/images/projects/datacenter.webp",
  "أنظمة الحماية": "/images/projects/security.webp",
  البرمجيات: "/images/projects/software.webp",
  "تطوير المواقع": "/images/projects/webdev.webp",
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

function ProjectCard({
  project,
  index,
  isFeatured = false,
}: {
  project: ProjectItem;
  index: number;
  isFeatured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const colors = colorMap[project.color] || colorMap.blue;
  const imageSrc =
    project.image ||
    defaultImages[project.type] ||
    "/images/projects/network.webp";

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{ y: -4, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className={`group relative overflow-hidden rounded-2xl cursor-default ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        border: `1px solid var(--color-border)`,
        background: "var(--color-surface)",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Mouse-follow spotlight ── */}
      <div
        className="pointer-events-none absolute z-20 transition-opacity duration-500"
        style={{
          left: mouse.x - 250,
          top: mouse.y - 250,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Mouse-follow border glow ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-20"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, ${colors.bg}, transparent 40%)`,
        }}
      />

      {/* ── Hover border accent ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-30"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${colors.border}, 0 0 30px -5px ${colors.glow}`,
        }}
      />

      {/* ── Image area ── */}
      <div
        className={`relative w-full overflow-hidden ${
          isFeatured ? "h-[300px] lg:h-[400px]" : "h-[200px] lg:h-[240px]"
        }`}
      >
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          priority={isFeatured}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(9,9,11,0) 0%,
              rgba(9,9,11,0.15) 30%,
              rgba(9,9,11,0.6) 60%,
              var(--color-surface) 100%
            )`,
          }}
        />

        {/* Colored glow at bottom on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Type badge */}
        <div className="absolute top-4 start-4 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold tracking-[0.15em] uppercase"
            style={{
              background: "rgba(9,9,11,0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${colors.border}`,
              color: colors.accent,
              boxShadow: `0 0 12px ${colors.glow}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: colors.accent, boxShadow: `0 0 6px ${colors.accent}` }}
            />
            {project.type}
          </span>
        </div>

        {/* Metrics badges */}
        <div className="absolute top-4 end-4 z-10 flex flex-wrap gap-1.5 justify-end max-w-[220px]">
          {project.metrics
            .slice(0, isFeatured ? 4 : 2)
            .map((metric, i) => (
              <motion.span
                key={i}
                className="px-2.5 py-1 rounded-md text-[10px] font-heading font-semibold tracking-wide"
                style={{
                  background: "rgba(9,9,11,0.6)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.65)",
                }}
                initial={{ opacity: 0, y: -6 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 + i * 0.06 }}
              >
                {metric}
              </motion.span>
            ))}
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="relative z-10 p-6 lg:p-7">
        {/* Accent line */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-[2px] rounded-full transition-all duration-500 group-hover:w-14"
            style={{
              width: 28,
              background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
              boxShadow: hovered ? `0 0 8px ${colors.glow}` : "none",
            }}
          />
          <div
            className="h-px flex-1 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, ${colors.border}, transparent)`,
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>

        {/* Title */}
        <h3
          className={`font-heading font-bold text-text-primary mb-3 transition-colors duration-300 ${
            isFeatured ? "text-xl lg:text-2xl" : "text-base lg:text-lg"
          }`}
          style={{
            color: hovered ? colors.accent : undefined,
            textShadow: hovered ? `0 0 30px ${colors.glow}` : "none",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={`text-text-secondary leading-relaxed font-body font-light mb-5 ${
            isFeatured
              ? "text-sm lg:text-base line-clamp-3"
              : "text-xs lg:text-sm line-clamp-2"
          }`}
        >
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.tech.split(" · ").map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg text-[11px] font-body font-medium transition-all duration-300"
              style={{
                background: colors.bg,
                color: colors.accent,
                border: `1px solid ${colors.border}`,
                boxShadow: hovered
                  ? `0 0 10px ${colors.glow}, inset 0 0 8px ${colors.bg}`
                  : "none",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom glow line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-30 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent 5%, ${colors.accent} 50%, transparent 95%)`,
          boxShadow: `0 0 12px ${colors.glow}`,
        }}
      />
    </motion.div>
  );
}

export default function ProjectsGrid({
  preview = false,
}: {
  preview?: boolean;
}) {
  const t = useTranslations("projects");
  const projects = t.raw("items") as ProjectItem[];
  const displayed = preview ? projects.slice(0, 5) : projects;

  return (
    <div>
      {preview && (
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <p className="section-label mb-4">{t("label")}</p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-5 text-base text-text-secondary max-w-xl leading-relaxed font-body font-light">
            {t("sub")}
          </p>
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        {displayed.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i}
            isFeatured={i === 0}
          />
        ))}
      </motion.div>

      {preview && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/projects">
            <motion.button
              className="btn-ghost rounded-lg"
              whileHover={{ scale: 1.03 }}
              data-magnetic
            >
              {t("label")}
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
