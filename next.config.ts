import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Demo deployment URLs (set in Vercel env vars)
// Each demo is deployed as a separate Vercel project
// and rewritten under /demos/<name> on dateksys.com
const SCHOOL_DEMO_URL =
  process.env.SCHOOL_DEMO_URL || "https://dateksys-school-demo.vercel.app";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  async rewrites() {
    return [
      // ─── Demo: School Management System ───
      // dateksys.com/demos/school → school demo Vercel project
      {
        source: "/demos/school",
        destination: `${SCHOOL_DEMO_URL}/demos/school`,
      },
      {
        source: "/demos/school/:path*",
        destination: `${SCHOOL_DEMO_URL}/demos/school/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply security headers to everything EXCEPT /demos/*
        // (demos are external apps and need different CSP)
        source: "/((?!demos).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com; frame-ancestors 'none';" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
