// ============================================
// Security Utils — حماية الـ API routes
// Rate limiting + Sanitization + Security headers
// ============================================

// --- Rate Limiter (Upstash Redis) ---
// يشتغل على Vercel serverless + أي بيئة ثانية
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per minute
    })
  : null;

export async function rateLimit(identifier: string): Promise<{
  success: boolean;
  remaining: number;
}> {
  if (!rateLimiter) {
    // Fallback: allow all if Redis not configured
    return { success: true, remaining: 5 };
  }
  const result = await rateLimiter.limit(identifier);
  return { success: result.success, remaining: result.remaining };
}

// --- Sanitize Input ---
// ✅ Fixed: & encoding أولاً (لازم يكون قبل كل شي)
// ✅ Fixed: إضافة / encoding
export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// --- Get Client IP ---
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown";
}

// --- Request Size Check ---
// بيمنع payloads ضخمة (مثلاً 10KB max للفورمات)
export function checkRequestSize(
  request: Request,
  maxBytes: number = 10_000
): boolean {
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    return false;
  }
  return true;
}

// --- Honeypot Check ---
// بتضيف hidden field بالفورم اسمه "honeypot"
// إذا تعبّى — يعني bot
export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  if (typeof body.honeypot === "string" && body.honeypot.length > 0) {
    return true;
  }
  return false;
}

// --- Security Headers ---
// بتنحط بـ next.config.ts
export const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];