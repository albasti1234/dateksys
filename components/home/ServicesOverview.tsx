"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import GlowCard from "@/components/ui/GlowCard";
import React from "react";

const ServiceIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.JSX.Element> = {
    network: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1.5" fill="currentColor" />
        <circle cx="12" cy="21" r="1.5" fill="currentColor" />
        <circle cx="3" cy="12" r="1.5" fill="currentColor" />
        <circle cx="21" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    server: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="17" r="1" fill="currentColor" />
        <path d="M15 7h2M15 17h2" strokeLinecap="round" />
      </svg>
    ),
    erp: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" strokeLinecap="round" />
      </svg>
    ),
    software: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M8 9l3 3-3 3M13 15h3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
      </svg>
    ),
    security: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 3l8 4v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V7l8-4z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M6.5 19a4.5 4.5 0 01-.42-8.98A7 7 0 0119.5 11a4.5 4.5 0 01-.5 8.97" strokeLinecap="round" />
        <path d="M12 13v6M9 16l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[type] || icons.network;
};

const services = [
  { key: "network",  icon: "network",  image: "/images/services/network.webp",  span: "md:col-span-2 lg:col-span-2", featured: true  },
  { key: "server",   icon: "server",   image: "/images/services/server.webp",   span: "md:col-span-1 lg:col-span-1", featured: false },
  { key: "security", icon: "security", image: "/images/services/security.webp", span: "md:col-span-1 lg:col-span-1", featured: false },
  { key: "erp",      icon: "erp",      image: "/images/services/erp.webp",      span: "md:col-span-1 lg:col-span-1", featured: false },
  { key: "software", icon: "software", image: "/images/services/software.webp", span: "md:col-span-1 lg:col-span-1", featured: false },
  { key: "cloud",    icon: "cloud",    image: "/images/services/cloud.webp",    span: "md:col-span-2 lg:col-span-2", featured: false },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ServicesOverview() {
  const t = useTranslations("services");

  return (
    <section className="section-wrapper overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[150px]" />

      <div className="w-full">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label mb-4">{t("label")}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-5 text-base text-text-secondary max-w-xl leading-relaxed font-body font-light">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {services.map((service) => (
            <motion.div key={service.key} className={service.span} variants={cardVariant}>
              <GlowCard className="flex flex-col group cursor-pointer overflow-hidden">

                {/* ── Image ── */}
                <div
                  className={`relative w-full overflow-hidden shrink-0 ${service.featured ? "h-64" : "h-44"}`}
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(9,9,11,0.05) 0%, rgba(9,9,11,0.45) 65%, rgba(17,17,20,1) 100%)" }}
                  />
                  <div className="absolute bottom-3 left-4 w-9 h-9 rounded-xl bg-[rgba(9,9,11,0.75)] border border-[rgba(56,189,248,0.2)] backdrop-blur-sm flex items-center justify-center text-accent">
                    <ServiceIcon type={service.icon} />
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="flex flex-col justify-between p-5">
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary text-base mb-1.5">
                      {t(`items.${service.key}.title`)}
                    </h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed font-body line-clamp-2">
                      {t(`items.${service.key}.description`)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted group-hover:text-accent transition-colors duration-fast font-body">
                    <span>{t("learn_more")}</span>
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-base">→</span>
                  </div>
                </div>

              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/services">
            <motion.button className="btn-ghost rounded-lg" whileHover={{ scale: 1.03 }} data-magnetic>
              {t("view_all")}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}