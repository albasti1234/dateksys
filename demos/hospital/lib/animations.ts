// ============================================
// Al-Hayat Hospital — Animation System
// ============================================
// Cinematic, smooth animations. No bounce. No elastic.
// Every easing curve is deliberate.

import type { Variants, Transition } from "framer-motion";

// ━━ Easing Curves ━━
export const CINEMATIC: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SLOW: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ━━ Viewport Config ━━
export const viewport = { once: true, margin: "-100px" } as const;
export const viewportEager = { once: true, margin: "-50px" } as const;

// ━━ Fade Up ━━
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: CINEMATIC },
  },
};

// ━━ Fade In ━━
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: CINEMATIC },
  },
};

// ━━ Scale In ━━
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: CINEMATIC },
  },
};

// ━━ Stagger Container ━━
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// ━━ Image Reveal (Curtain Wipe) ━━
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.2, ease: SLOW },
  },
};

// ━━ Slide From Left/Right (RTL-aware) ━━
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: CINEMATIC },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: CINEMATIC },
  },
};

// ━━ Word-by-word reveal ━━
export const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: CINEMATIC },
  },
};

// ━━ Cinematic transition preset ━━
export const cinematicTransition: Transition = {
  duration: 0.7,
  ease: CINEMATIC,
};

// ━━ Float animation (for decorative elements) ━━
export const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// ━━ RTL-aware slide ━━
export function getSlideDirection(isRTL: boolean): Variants {
  return {
    hidden: { opacity: 0, x: isRTL ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: CINEMATIC },
    },
  };
}

// ━━ Page transition ━━
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: CINEMATIC },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: CINEMATIC },
  },
};

// ━━ Counter animation config ━━
export const counterConfig = {
  duration: 2,
  ease: EXPO_OUT,
} as const;
