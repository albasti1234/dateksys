import type { NextConfig } from "next";
import path from "path";

// ============================================
// School Demo — Next.js Config
// Mounted under /demos/school via Vercel rewrites
// ============================================

// turbopack.root MUST always be set (even on Vercel) — otherwise Turbopack
// walks up and tries to compile files from the parent dateksys repo
// (proxy.ts, i18n/routing.ts), which depend on next-intl that this demo
// doesn't install.
//
// outputFileTracingRoot is only needed locally for the pnpm-workspace
// isolation. On Vercel, it seems to confuse the onBuildComplete hook into
// looking for routes-manifest-deterministic.json at the wrong path, so we
// skip it in that environment.
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },

  ...(isVercel
    ? {}
    : {
        outputFileTracingRoot: path.join(__dirname),
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
