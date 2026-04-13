"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CINEMATIC, EXPO_OUT } from "@/lib/showcase-animations";

const heroWords1 = ["Projects", "That"];
const heroWords2 = ["Speak", "for", "Themselves"];

const wordVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.3 + i * 0.08, ease: EXPO_OUT },
  }),
};

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* CSS Keyframes */}
      <style>{`
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(100px, -50px) rotate(180deg); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-80px, 80px) rotate(-180deg); } }
        @keyframes float-3 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(60px, 60px) rotate(120deg); } }
        @keyframes scroll-line { 0% { transform: scaleY(0); opacity: 0; } 50% { transform: scaleY(1); opacity: 1; } 100% { transform: scaleY(0); opacity: 0; } }
      `}</style>

      {/* Animated gradient circles */}
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "10%",
          left: "15%",
          background: "rgba(139,123,244,0.15)",
          animation: "float-1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "40%",
          right: "10%",
          background: "rgba(56,189,248,0.1)",
          animation: "float-2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px] pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: "10%",
          left: "40%",
          background: "rgba(45,212,191,0.08)",
          animation: "float-3 22s ease-in-out infinite",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Glass pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: CINEMATIC }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
          style={{
            background: "rgba(139,123,244,0.06)",
            border: "1px solid rgba(139,123,244,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
              style={{ background: "#8B7BF4" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#8B7BF4" }}
            />
          </span>
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(139,123,244,0.9)", fontFamily: "var(--font-dm-sans)" }}
          >
            Our Work &mdash; Live Showcase
          </span>
        </motion.div>

        {/* Heading with word-by-word reveal */}
        <h1
          className="font-bold leading-[0.95] tracking-tight"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          <span className="block">
            {heroWords1.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  style={{ color: "#F0EDE6" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block mt-1">
            {heroWords2.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i + heroWords1.length}
                  style={
                    word === "Speak"
                      ? {
                          fontStyle: "italic",
                          background: "linear-gradient(135deg, #8B7BF4, #A78BFA, #C4B5FD)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : { color: "#F0EDE6" }
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: CINEMATIC }}
          className="mt-8 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(240,237,230,0.5)", fontFamily: "var(--font-dm-sans)" }}
        >
          From concept to production — explore the platforms we build for businesses across industries.
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="text-[10px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: "rgba(240,237,230,0.25)", fontFamily: "var(--font-dm-sans)" }}
        >
          Explore
        </span>
        <div
          className="w-px h-8 origin-top"
          style={{
            background: "rgba(139,123,244,0.4)",
            animation: "scroll-line 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
