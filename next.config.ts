import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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
      // ─── Demos: Static HTML Exports ───
      // Each demo lives self-contained in `demos/<name>/` and is built
      // locally to static HTML. The `out/` folder is copied to
      // `public/demos/<name>/` and served as static files. These
      // rewrites turn directory URLs (/demos/school/about/) into the
      // actual file paths (/demos/school/about/index.html) Next.js can
      // serve. Asset requests for /_next/static/... already hit real
      // files in public/ and bypass the rewrite.
      {
        source: "/demos/school",
        destination: "/demos/school/index.html",
      },
      {
        source: "/demos/school/",
        destination: "/demos/school/index.html",
      },
      {
        source: "/demos/school/:path+/",
        destination: "/demos/school/:path+/index.html",
      },
      {
        source: "/demos/school/:path+",
        destination: "/demos/school/:path+/index.html",
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply security headers to everything EXCEPT /demos/*
        // (each demo is self-contained static HTML with its own styles)
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
