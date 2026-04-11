// ============================================
// Build + copy the school demo into public/
// ============================================
// The school demo lives in demos/school/ as a self-contained
// Next.js project. This script:
//   1. Installs its deps (isolated from the main dateksys deps)
//   2. Builds it to static HTML via `output: 'export'`
//   3. Copies the resulting out/ folder to public/demos/school/
//
// After running this, commit + push → Vercel redeploys the main
// dateksys site with the updated demo included.

import { execSync } from "node:child_process";
import { existsSync, rmSync, cpSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const demoDir = join(repoRoot, "demos", "school");
const outDir = join(demoDir, "out");
const destDir = join(repoRoot, "public", "demos", "school");

function run(cmd, cwd) {
  console.log(`\n$ ${cmd}  (in ${cwd})`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

console.log("▸ Building school demo (static export)…");
run("pnpm install --ignore-workspace", demoDir);
run("pnpm run build", demoDir);

if (!existsSync(outDir)) {
  console.error(`✗ Expected output directory not found: ${outDir}`);
  process.exit(1);
}

console.log(`\n▸ Replacing ${destDir}`);
rmSync(destDir, { recursive: true, force: true });
mkdirSync(destDir, { recursive: true });
cpSync(outDir, destDir, { recursive: true });

console.log("\n✓ School demo built and copied to public/demos/school/");
console.log("  Commit + push to deploy.");
