// compress-images.mjs
// شغّله بـ: node compress-images.mjs
// بيضغط كل الصور بمجلد public/images لـ WebP بحجم ~200KB

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = [
  './public/images',
  './public/images/services',
  './public/images/projects',
];

const MAX_WIDTH = 1920;
const QUALITY = 75;

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const fileInfo = await stat(filePath);
  const sizeMB = (fileInfo.size / 1024 / 1024).toFixed(1);

  // Output as WebP with same name
  const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  try {
    await sharp(filePath)
      .resize(MAX_WIDTH, null, { 
        withoutEnlargement: true,
        fit: 'inside' 
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newInfo = await stat(outputPath);
    const newSizeMB = (newInfo.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newInfo.size / fileInfo.size) * 100).toFixed(0);

    console.log(`✅ ${basename(filePath)}: ${sizeMB}MB → ${newSizeMB}MB (${savings}% smaller) → ${basename(outputPath)}`);
  } catch (err) {
    console.error(`❌ ${basename(filePath)}: ${err.message}`);
  }
}

async function processDir(dir) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      const info = await stat(filePath);
      if (info.isFile()) {
        await compressImage(filePath);
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }
}

console.log('🔧 Compressing images...\n');
for (const dir of DIRS) {
  await processDir(dir);
}
console.log('\n✅ Done! Now update your code to use .webp instead of .jpg/.png');
