"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useCallback } from "react";

const INTERACTIVE_SELECTOR = "a, button, [data-magnetic], input, textarea, select";

export function useMagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isHovering = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 28 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleEnter = () => isHovering.set(1);
    const handleLeave = () => isHovering.set(0);

    function attachListeners(root: Document | Element = document) {
      root.querySelectorAll(INTERACTIVE_SELECTOR).forEach((el) => {
        if (el.getAttribute("data-cursor-bound")) return;
        el.setAttribute("data-cursor-bound", "1");
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    }

    attachListeners();

    // Track dynamically rendered elements (animated menus, modals, cards, etc.)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(INTERACTIVE_SELECTOR) && !node.getAttribute("data-cursor-bound")) {
            node.setAttribute("data-cursor-bound", "1");
            node.addEventListener("mouseenter", handleEnter);
            node.addEventListener("mouseleave", handleLeave);
          }
          attachListeners(node);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      document.querySelectorAll("[data-cursor-bound]").forEach((el) => {
        el.removeAttribute("data-cursor-bound");
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [handleMouseMove, isHovering]);

  return { x: smoothX, y: smoothY, isHovering };
}
