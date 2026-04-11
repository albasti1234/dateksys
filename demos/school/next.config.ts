import type { NextConfig } from "next";
import path from "path";

// ============================================
// School Demo — Next.js Config (Static Export)
// ============================================
// This demo is built to static HTML via `output: 'export'`, and the
// resulting `out/` folder is copied into the main dateksys repo at
// `public/demos/school/`. It's then served by the main dateksys Vercel
// deployment as pure static files — no separate Vercel project needed.
//
// Both outputFileTracingRoot AND turbopack.root must always be set to
// the same __dirname value so Turbopack stays isolated from the parent
// dateksys repo (otherwise it walks up and fails on next-intl imports).

const projectRoot = path.join(__dirname);

const nextConfig: NextConfig = {
  // Generate static HTML that can be hosted anywhere
  output: "export",

  // Produces /about/index.html instead of /about.html so URL routing
  // works naturally from public/ folder when served by main dateksys
  trailingSlash: true,

  // Isolation settings (see comment above)
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },

  // Mount under /demos/school — URLs and asset paths get this prefix
  basePath: "/demos/school",
  assetPrefix: "/demos/school",

  images: {
    // Required for static export: disables the Image Optimization API
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
