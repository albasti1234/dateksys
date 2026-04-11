"use client";

import { useEffect, useState } from "react";

// ============================================
// Al-Nakhla Applications — localStorage store
// ============================================
// Each visitor gets their own sandbox. Applications submitted via
// /admissions/apply are saved here and show up in the admin dashboard
// on the same browser session.
//
// In production, swap this module for a real backend (same interface,
// different implementation).

const STORAGE_KEY = "alnakhla:applications";
const EVENT = "alnakhla:applications-updated";

export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "accepted"
  | "rejected";

export type StudentData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  currentSchool: string;
  applyingFor: string;
};

export type ParentData = {
  parentFirstName: string;
  parentLastName: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: string;
};

export type Application = {
  ref: string;
  createdAt: string; // ISO string
  status: ApplicationStatus;
  student: StudentData;
  parent: ParentData;
};

const isClient = () => typeof window !== "undefined";

function broadcast() {
  if (isClient()) {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

export function getApplications(): Application[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveApplication(
  student: StudentData,
  parent: ParentData
): Application {
  const existing = getApplications();
  const year = new Date().getFullYear();
  // Deterministic-ish counter: base 1000 + count + small random
  const counter = 1000 + existing.length + Math.floor(Math.random() * 20);
  const ref = `ALN-${year}-${counter}`;

  const application: Application = {
    ref,
    createdAt: new Date().toISOString(),
    status: "pending",
    student,
    parent,
  };

  if (isClient()) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([application, ...existing])
      );
      broadcast();
    } catch (err) {
      console.error("Failed to save application:", err);
    }
  }

  return application;
}

export function updateApplicationStatus(
  ref: string,
  status: ApplicationStatus
): void {
  if (!isClient()) return;
  const apps = getApplications();
  const updated = apps.map((a) => (a.ref === ref ? { ...a, status } : a));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    broadcast();
  } catch (err) {
    console.error("Failed to update application:", err);
  }
}

export function getApplicationByRef(ref: string): Application | null {
  return getApplications().find((a) => a.ref === ref) ?? null;
}

export function clearAllApplications(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    broadcast();
  } catch (err) {
    console.error("Failed to clear applications:", err);
  }
}

/**
 * React hook — subscribes to application changes and returns the live list.
 * Re-renders on any save / update / clear in the same tab (via CustomEvent)
 * and across tabs (via the native "storage" event).
 */
export function useApplications(): Application[] {
  const [apps, setApps] = useState<Application[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setApps(getApplications());

    const handler = () => setApps(getApplications());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  // Return empty array before mount to keep SSR output stable
  return mounted ? apps : [];
}

/**
 * Convenience: count applications in "pending" status.
 * Used for the notification badge in the admin sidebar.
 */
export function usePendingCount(): number {
  const apps = useApplications();
  return apps.filter((a) => a.status === "pending").length;
}

/**
 * Format a Date/ISO string into a short localized date.
 */
export function formatApplicationDate(
  iso: string,
  locale: "ar" | "en"
): string {
  try {
    const d = new Date(iso);
    if (locale === "ar") {
      return d.toLocaleDateString("ar-JO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
