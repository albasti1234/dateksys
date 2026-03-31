/**
 * copy_assets.js — copies source images into public/images/
 *
 * Usage:
 *   SOURCE_DIR=/path/to/your/images node copy_assets.js
 *
 * Or set individual env vars:
 *   HERO_SRC, SERVER_SRC, NETWORK_SRC
 */

const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const sourceDir = process.env.SOURCE_DIR || '';

const sources = [
  {
    src: process.env.HERO_SRC || path.join(sourceDir, 'hero.png'),
    dest: path.join(publicImagesDir, 'hero.png'),
  },
  {
    src: process.env.SERVER_SRC || path.join(sourceDir, 'server.png'),
    dest: path.join(publicImagesDir, 'server.png'),
  },
  {
    src: process.env.NETWORK_SRC || path.join(sourceDir, 'network.png'),
    dest: path.join(publicImagesDir, 'network.png'),
  },
];

let copied = 0;
for (const { src, dest } of sources) {
  if (!src) {
    console.warn(`Skipping ${path.basename(dest)} — no source path provided.`);
    continue;
  }
  try {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${path.basename(src)} → ${dest}`);
    copied++;
  } catch (err) {
    console.error(`✗ Failed to copy ${src}:`, err.message);
  }
}

console.log(`\nDone — ${copied}/${sources.length} files copied.`);
