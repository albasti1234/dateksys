import type { NextConfig } from "next";
import path from "path";

// ============================================
// School Demo — Next.js Config
// Mounted under /demos/school via Vercel rewrites
// ============================================

// Both outputFileTracingRoot AND turbopack.root MUST always be set to the
// same value, otherwise:
// - On Vercel, outputFileTracingRoot gets auto-detected to the repo root
//   (/vercel/path0), which then overrides turbopack.root, causing Turbopack
//   to walk up and try to compile files from the parent dateksys repo
//   (proxy.ts, i18n/routing.ts), failing with "next-intl/middleware not found".
// - Locally, pnpm-workspace tries to hoist deps and breaks resolution.
//
// Pinning both to __dirname isolates this demo completely.
const projectRoot = path.join(__dirname);

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },

  // Mount under /demos/school path so it works
  // when rewritten from dateksys.com/demos/school
  basePath: "/demos/school",
  assetPrefix: "/demos/school",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
