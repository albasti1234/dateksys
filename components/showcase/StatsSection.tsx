"use client";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { fadeUp, stagger } from "@/lib/showcase-animations";

const stats = [
  { target: 15, suffix: "+", label: "Projects Delivered" },
  { target: 6, suffix: "", label: "Industries Served" },
  { target: 100, suffix: "%", label: "Satisfaction Rate" },
  { target: 24, suffix: "/7", label: "Support Available" },
];

export default function StatsSection() {
  return (
    <section
      className="py-24 px-6 border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center">
            <div
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                background: "linear-gradient(135deg, #8B7BF4, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            </div>
            <p
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: "rgba(240,237,230,0.4)", fontFamily: "var(--font-dm-sans)" }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
