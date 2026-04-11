"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

// ============================================
// Capabilities — Bento Grid 3D
// Premium 3D tilt + parallax + glass morphism
// ============================================

type Theme = {
  accent: string;
  glow: string;
  border: string;
  bgTint: string;
};

const themes: Record<string, Theme> = {
  blue: {
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.35)",
    border: "rgba(56,189,248,0.4)",
    bgTint: "rgba(56,189,248,0.06)",
  },
  cyan: {
    accent: "#22D3EE",
    glow: "rgba(34,211,238,0.35)",
    border: "rgba(34,211,238,0.4)",
    bgTint: "rgba(34,211,238,0.06)",
  },
  purple: {
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.35)",
    border: "rgba(167,139,250,0.4)",
    bgTint: "rgba(167,139,250,0.06)",
  },
  green: {
    accent: "#4ADE80",
    glow: "rgba(74,222,128,0.35)",
    border: "rgba(74,222,128,0.4)",
    bgTint: "rgba(74,222,128,0.06)",
  },
};

// ──────────────────────────────────────────────
// Animated Backgrounds — one per card type
// ──────────────────────────────────────────────

function NetworkGridBg({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-60">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="netgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={color}>
              <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
          </pattern>
          <pattern id="netgrid2" width="40" height="40" patternUnits="userSpaceOnUse" x="20" y="20">
            <circle cx="2" cy="2" r="1.2" fill={color}>
              <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#netgrid)" />
        <rect width="100%" height="100%" fill="url(#netgrid2)" />
      </svg>
    </div>
  );
}

function DataCenterBg({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50">
      <div className="absolute inset-0 flex flex-col justify-around p-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: color, animationDelay: `${i * 0.3}s` }}
            />
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityBg({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${color} 60deg, transparent 120deg, transparent 360deg)`,
          animation: "spin 6s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at center, transparent 30%, rgba(9,9,11,0.5) 60%)`,
        }}
      />
    </div>
  );
}

function SoftwareBg({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50">
      <div className="absolute inset-0 p-6 font-mono text-[10px] leading-relaxed">
        <div style={{ color }}>
          <div className="animate-pulse">{"const build = async () => {"}</div>
          <div style={{ animationDelay: "0.3s" }} className="animate-pulse ps-4">
            {"await deploy();"}
          </div>
          <div style={{ animationDelay: "0.6s" }} className="animate-pulse ps-4">
            {"return success;"}
          </div>
          <div style={{ animationDelay: "0.9s" }} className="animate-pulse">
            {"};"}
          </div>
        </div>
      </div>
    </div>
  );
}

function WebDevBg({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      <div className="absolute inset-4 rounded-lg border border-white/5 overflow-hidden">
        <div className="h-4 flex items-center gap-1 px-2 border-b border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-1.5 rounded w-1/2" style={{ background: color, opacity: 0.4 }} />
          <div className="h-1.5 rounded w-3/4" style={{ background: color, opacity: 0.25 }} />
          <div className="h-1.5 rounded w-2/3" style={{ background: color, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// BentoCard — with 3D tilt + parallax layers
// ──────────────────────────────────────────────

type Item = {
  type: string;
  title: string;
  desc: string;
  tech: string;
  color: string;
  metrics: string[];
  image: string;
};

type BgKind = "network" | "datacenter" | "security" | "software" | "webdev";

function BentoCard({
  item,
  bgKind,
  className,
  size,
}: {
  item: Item;
  bgKind: BgKind;
  className?: string;
  size: "lg" | "md" | "sm";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = themes[item.color] || themes.blue;

  // Mouse position (normalized 0-1)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // 3D tilt (spring-smoothed)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });

  // Parallax for inner layers
  const txBg = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });
  const tyBg = useSpring(useTransform(my, [0, 1], [-6, 6]), {
    stiffness: 120,
    damping: 20,
  });
  const txContent = useSpring(useTransform(mx, [0, 1], [-18, 18]), {
    stiffness: 120,
    damping: 20,
  });
  const tyContent = useSpring(useTransform(my, [0, 1], [-12, 12]), {
    stiffness: 120,
    damping: 20,
  });

  // Spotlight position (raw pixels for conic gradient)
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const bgMap: Record<BgKind, React.ReactNode> = {
    network: <NetworkGridBg color={theme.accent} />,
    datacenter: <DataCenterBg color={theme.accent} />,
    security: <SecurityBg color={theme.accent} />,
    software: <SoftwareBg color={theme.accent} />,
    webdev: <WebDevBg color={theme.accent} />,
  };

  const titleSize =
    size === "lg"
      ? "text-2xl lg:text-3xl"
      : size === "md"
      ? "text-lg lg:text-xl"
      : "text-base lg:text-lg";

  const descClass =
    size === "lg"
      ? "text-sm lg:text-base line-clamp-3"
      : "text-xs lg:text-sm line-clamp-2";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`group relative overflow-hidden rounded-2xl cursor-default ${className || ""}`}
    >
      {/* Base background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      />

      {/* Animated background layer — parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ x: txBg, y: tyBg }}
      >
        {bgMap[bgKind]}
      </motion.div>

      {/* Main image — parallax, floats in depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: txBg,
          y: tyBg,
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover opacity-40 mix-blend-luminosity"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.75) 60%, rgba(9,9,11,0.95) 100%)`,
        }}
      />

      {/* Color tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at bottom, ${theme.bgTint}, transparent 70%)`,
        }}
      />

      {/* Spotlight follow-cursor */}
      <motion.div
        className="pointer-events-none absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          left: spotlightX,
          top: spotlightY,
          x: "-50%",
          y: "-50%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 60%)`,
        }}
      />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 0 1px ${theme.border}, 0 0 40px -10px ${theme.glow}`,
        }}
      />

      {/* Glass shine on top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        }}
      />

      {/* ── Content — with stronger parallax ── */}
      <motion.div
        className="relative z-20 h-full flex flex-col justify-end p-6 lg:p-8"
        style={{
          x: txContent,
          y: tyContent,
          transform: "translateZ(30px)",
        }}
      >
        {/* Top row: type badge + metrics */}
        <div className="absolute top-5 start-5 end-5 flex items-start justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-heading font-semibold uppercase tracking-wider backdrop-blur-md"
            style={{
              background: "rgba(9,9,11,0.6)",
              border: `1px solid ${theme.border}`,
              color: theme.accent,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: theme.accent,
                boxShadow: `0 0 8px ${theme.glow}`,
              }}
            />
            {item.type}
          </span>

          {size === "lg" && (
            <div className="flex flex-wrap gap-1.5 justify-end max-w-[60%]">
              {item.metrics.slice(0, 3).map((m, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded text-[9px] font-heading font-semibold tracking-wide backdrop-blur-md"
                  style={{
                    background: "rgba(9,9,11,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Accent line */}
        <div
          className="h-[2px] rounded-full mb-4 transition-all duration-500 group-hover:w-16"
          style={{
            width: 32,
            background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
            boxShadow: `0 0 10px ${theme.glow}`,
          }}
        />

        {/* Title */}
        <h3
          className={`font-heading font-bold text-white mb-3 ${titleSize}`}
          style={{
            letterSpacing: "-0.02em",
            textShadow: `0 2px 20px rgba(0,0,0,0.5)`,
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={`text-text-secondary leading-relaxed font-body font-light mb-4 ${descClass}`}
        >
          {item.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {item.tech.split(" · ").slice(0, size === "lg" ? 4 : 3).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-[10px] font-heading font-medium backdrop-blur-sm"
              style={{
                background: theme.bgTint,
                border: `1px solid ${theme.border}`,
                color: theme.accent,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bottom accent line — animated on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${theme.accent} 50%, transparent 95%)`,
          boxShadow: `0 0 14px ${theme.glow}`,
        }}
      />
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export default function CapabilitiesBento() {
  const t = useTranslations("capabilities");
  const items = t.raw("items") as Item[];

  if (!items || items.length < 5) return null;

  const bgKinds: BgKind[] = ["network", "datacenter", "security", "software", "webdev"];

  return (
    <section className="relative px-[5%] lg:px-[6%] py-24 lg:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(56,189,248,0.08), transparent 60%)",
        }}
      />

      {/* Header */}
      <motion.div
        className="relative mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

      {/* ── Bento Grid ── */}
      <div
        className="relative grid gap-5 lg:gap-6"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateAreas: `
            "network network datacenter"
            "network network security"
            "software webdev webdev"
          `,
        }}
      >
        <div
          className="min-h-[380px] lg:min-h-[520px]"
          style={{ gridArea: "network" }}
        >
          <BentoCard
            item={items[0]}
            bgKind={bgKinds[0]}
            size="lg"
            className="h-full"
          />
        </div>
        <div
          className="min-h-[180px] lg:min-h-[250px]"
          style={{ gridArea: "datacenter" }}
        >
          <BentoCard
            item={items[1]}
            bgKind={bgKinds[1]}
            size="md"
            className="h-full"
          />
        </div>
        <div
          className="min-h-[180px] lg:min-h-[250px]"
          style={{ gridArea: "security" }}
        >
          <BentoCard
            item={items[2]}
            bgKind={bgKinds[2]}
            size="md"
            className="h-full"
          />
        </div>
        <div
          className="min-h-[260px] lg:min-h-[320px]"
          style={{ gridArea: "software" }}
        >
          <BentoCard
            item={items[3]}
            bgKind={bgKinds[3]}
            size="md"
            className="h-full"
          />
        </div>
        <div
          className="min-h-[260px] lg:min-h-[320px]"
          style={{ gridArea: "webdev" }}
        >
          <BentoCard
            item={items[4]}
            bgKind={bgKinds[4]}
            size="md"
            className="h-full"
          />
        </div>
      </div>

      {/* Mobile layout — single column */}
      <style>{`
        @media (max-width: 768px) {
          .grid[style*="gridTemplateAreas"] {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "network"
              "datacenter"
              "security"
              "software"
              "webdev" !important;
          }
        }
      `}</style>
    </section>
  );
}
