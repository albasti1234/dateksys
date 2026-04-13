// ============================================
// Dar Al-Maskan — Animation System
// ============================================
// Cinematic, luxurious animations. No bounce. No elastic.
// Every motion feels like silk.

// ━━ Easing Curves ━━
export const SILK = [0.25, 0.46, 0.45, 0.94] as const;
export const EXPO = [0.16, 1, 0.3, 1] as const;
export const BUTTER = [0.22, 1, 0.36, 1] as const;

// ━━ Preset Animations ━━
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: SILK } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: SILK } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: SILK } },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: SILK } },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: SILK } },
};

export const imageReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.4, ease: BUTTER },
  },
};

export const lineExpand = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: EXPO } },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export const wordRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.8 },
  },
};

export const wordReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: EXPO },
  },
};

export const viewport = { once: true, margin: "-100px" as const };

// ━━ RTL-aware slide direction ━━
export function getSlideDirection(isRTL: boolean) {
  return isRTL ? slideFromRight : slideFromLeft;
}
