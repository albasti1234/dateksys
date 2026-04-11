"use client";

import { useEffect, useState } from "react";

// ============================================
// Shared school demo state — gradebook, attendance,
// payments, students roster.
// Uses localStorage for the demo; identical interface
// could wrap a real API for production.
// ============================================

const GRADEBOOK_KEY = "alnakhla:gradebook";
const ATTENDANCE_KEY = "alnakhla:attendance";
const PAYMENTS_KEY = "alnakhla:payments";

const EVENT = "alnakhla:school-store-changed";

const isClient = () => typeof window !== "undefined";

function broadcast() {
  if (isClient()) {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

// ─────────────────── Gradebook ───────────────────

export type GradebookCellKey = `${string}:${string}:${string}`; // classIndex:studentIndex:column

export function getGradebookOverrides(): Record<string, string> {
  if (!isClient()) return {};
  try {
    const raw = localStorage.getItem(GRADEBOOK_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setGradebookCell(key: string, value: string): void {
  if (!isClient()) return;
  try {
    const current = getGradebookOverrides();
    current[key] = value;
    localStorage.setItem(GRADEBOOK_KEY, JSON.stringify(current));
    broadcast();
  } catch (err) {
    console.error("Failed to save gradebook cell:", err);
  }
}

export function useGradebookOverrides(): Record<string, string> {
  const [data, setData] = useState<Record<string, string>>({});
  useEffect(() => {
    setData(getGradebookOverrides());
    const handler = () => setData(getGradebookOverrides());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return data;
}

// ─────────────────── Attendance ───────────────────

export type AttendanceRecord = {
  classId: string;
  date: string; // ISO
  present: string[]; // student names
  absent: string[];
  savedAt: string; // ISO
};

export function getAttendanceRecords(): AttendanceRecord[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(ATTENDANCE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAttendanceRecord(record: AttendanceRecord): void {
  if (!isClient()) return;
  try {
    const existing = getAttendanceRecords();
    localStorage.setItem(
      ATTENDANCE_KEY,
      JSON.stringify([record, ...existing])
    );
    broadcast();
  } catch (err) {
    console.error("Failed to save attendance:", err);
  }
}

export function useAttendanceRecords(): AttendanceRecord[] {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  useEffect(() => {
    setRecords(getAttendanceRecords());
    const handler = () => setRecords(getAttendanceRecords());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return records;
}

// ─────────────────── Payments ───────────────────

export type PaymentRecord = {
  id: string;
  invoiceId: string;
  amount: string;
  method: string;
  cardLast4?: string;
  paidAt: string; // ISO
};

export function getPayments(): PaymentRecord[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePayment(
  payment: Omit<PaymentRecord, "id" | "paidAt">
): PaymentRecord {
  const record: PaymentRecord = {
    ...payment,
    id: `PAY-${Date.now()}`,
    paidAt: new Date().toISOString(),
  };
  if (!isClient()) return record;
  try {
    const existing = getPayments();
    localStorage.setItem(
      PAYMENTS_KEY,
      JSON.stringify([record, ...existing])
    );
    broadcast();
  } catch (err) {
    console.error("Failed to save payment:", err);
  }
  return record;
}

export function usePayments(): PaymentRecord[] {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  useEffect(() => {
    setPayments(getPayments());
    const handler = () => setPayments(getPayments());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return payments;
}

export function hasPaidInvoice(invoiceId: string): boolean {
  return getPayments().some((p) => p.invoiceId === invoiceId);
}
