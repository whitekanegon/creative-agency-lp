import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('src/assets/images');
const pngFiles = fs.readdirSync(imagesDir).filter((name) => name.endsWith('.png'));

const meta = {};

for (const file of pngFiles) {
  const input = path.join(imagesDir, file);
  const output = path.join(imagesDir, file.replace(/\.png$/i, '.webp'));
  const info = await sharp(input).webp({ quality: 85 }).toFile(output);
  meta[file.replace(/\.png$/i, '.webp')] = { width: info.width, height: info.height };
  fs.unlinkSync(input);
  console.log(`Converted ${file} -> ${path.basename(output)} (${info.width}x${info.height})`);
}

console.log(JSON.stringify(meta, null, 2));
