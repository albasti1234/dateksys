// ============================================
// Security Utils — حماية الـ API routes
// Rate limiting + Sanitization + Security headers
// ============================================

// --- Rate Limiter (In-Memory) ---
// ⚠️ ملاحظة: على Serverless (Vercel) استخدم Upstash Redis بدل هاد
// هاد بيشتغل على Node.js server عادي أو VPS
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // دقيقة وحدة
const RATE_LIMIT_MAX = 5; // 5 طلبات بالدقيقة

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return { success: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: RATE_LIMIT_MAX - record.count };
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