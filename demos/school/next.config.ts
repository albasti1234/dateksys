import type { NextConfig } from "next";
import path from "path";

// ============================================
// School Demo — Next.js Config
// Mounted under /demos/school via Vercel rewrites
// ============================================

const nextConfig: NextConfig = {
  // Isolate this project from parent node_modules
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
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
