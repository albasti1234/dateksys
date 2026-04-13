"use client";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type ProjectCategory, type Project } from "@/lib/projects";
import { stagger } from "@/lib/showcase-animations";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  filter: ProjectCategory | "all";
  locale: string;
  onSelectProject: (project: Project, portalId: string) => void;
}

export default function ProjectGrid({ filter, locale, onSelectProject }: ProjectGridProps) {
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-16 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProjectCard
                project={project}
                index={i}
                locale={locale}
                onSelect={onSelectProject}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
