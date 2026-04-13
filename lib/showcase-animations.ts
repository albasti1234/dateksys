export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
export const CINEMATIC = [0.25, 0.46, 0.45, 0.94] as const;
export const SPRING = { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.8 };

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: CINEMATIC },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: CINEMATIC },
  },
};
