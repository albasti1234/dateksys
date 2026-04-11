"use client";

import { useEffect, useState } from "react";

// ============================================
// Parent portal state — multi-child switcher
// ============================================

const STORAGE_KEY = "alnakhla:parent:activeChild";
const EVENT = "alnakhla:parent-child-changed";

export type Child = {
  id: string;
  firstName: { ar: string; en: string };
  lastName: { ar: string; en: string };
  grade: { ar: string; en: string };
  gradeShort: { ar: string; en: string };
  avatar: string;
  stats: {
    overallAverage: string;
    classRank: string;
    attendance: string;
    subjectsPassing: string;
  };
};

// Mock children — in production this would come from API based on
// logged-in parent's account
export const children: Child[] = [
  {
    id: "leila",
    firstName: { ar: "ليلى", en: "Leila" },
    lastName: { ar: "الحوراني", en: "Al-Hourani" },
    grade: { ar: "الصف السادس · قسم أ", en: "Grade 6 · Section A" },
    gradeShort: { ar: "الصف السادس", en: "Grade 6" },
    avatar:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
    stats: {
      overallAverage: "٩٢٪",
      classRank: "٣ / ٢٢",
      attendance: "٩٨٪",
      subjectsPassing: "٨ / ٨",
    },
  },
  {
    id: "yazan",
    firstName: { ar: "يزن", en: "Yazan" },
    lastName: { ar: "الحوراني", en: "Al-Hourani" },
    grade: { ar: "الصف التاسع · قسم ب", en: "Grade 9 · Section B" },
    gradeShort: { ar: "الصف التاسع", en: "Grade 9" },
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    stats: {
      overallAverage: "٨٨٪",
      classRank: "٧ / ٢٥",
      attendance: "٩٦٪",
      subjectsPassing: "٨ / ٨",
    },
  },
  {
    id: "sara",
    firstName: { ar: "سارة", en: "Sara" },
    lastName: { ar: "الحوراني", en: "Al-Hourani" },
    grade: { ar: "الروضة الثانية · KG2", en: "Kindergarten 2 · KG2" },
    gradeShort: { ar: "الروضة الثانية", en: "KG2" },
    avatar:
      "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=200&q=80",
    stats: {
      overallAverage: "—",
      classRank: "—",
      attendance: "٩٩٪",
      subjectsPassing: "٤ / ٤",
    },
  },
];

const isClient = () => typeof window !== "undefined";

export function getActiveChildId(): string {
  if (!isClient()) return children[0].id;
  try {
    return localStorage.getItem(STORAGE_KEY) || children[0].id;
  } catch {
    return children[0].id;
  }
}

export function setActiveChildId(id: string): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
  } catch (err) {
    console.error("Failed to set active child:", err);
  }
}

export function getChildById(id: string): Child {
  return children.find((c) => c.id === id) || children[0];
}

/** React hook — subscribes to child changes */
export function useActiveChild(): [Child, (id: string) => void] {
  const [id, setId] = useState<string>(children[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setId(getActiveChildId());

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setId(customEvent.detail || getActiveChildId());
    };
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const child = mounted ? getChildById(id) : children[0];
  return [child, setActiveChildId];
}
