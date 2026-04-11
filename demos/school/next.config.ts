import type { NextConfig } from "next";
import path from "path";

// ============================================
// School Demo — Next.js Config
// Mounted under /demos/school via Vercel rewrites
// ============================================

// On Vercel, Root Directory + --ignore-workspace already isolate this project,
// and setting outputFileTracingRoot confuses Vercel's onBuildComplete hook
// (fails to locate routes-manifest-deterministic.json). So we only apply these
// isolation settings locally, where the pnpm workspace issue actually matters.
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  ...(isVercel
    ? {}
    : {
        // Local-only: prevent Next.js from tracing files in the parent repo
        outputFileTracingRoot: path.join(__dirname),
        turbopack: {
          root: path.join(__dirname),
        },
      }),

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
