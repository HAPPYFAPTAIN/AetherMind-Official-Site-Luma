// Deterministic tone variants: original composition and pixels, no generative edits.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const sources = {
  platform: 'official/platform-v4',
  lammps: 'products/journal-v1/simulation',
  'md-exp': 'products/original-restyled-v1/md-exp',
  agent: 'products/journal-v1/intelligence',
  learning: 'products/journal-v1/learning',
  materials: 'products/original-restyled-v1/materials',
  chemistry: 'products/journal-v1/chemistry',
  biology: 'products/journal-v1/biology',
};
const destination = 'public/images/products/light-derived-v1';
const blackPoint = 0.07;
const exponent = 0.70;
const lut = Uint8Array.from({ length: 256 }, (_, value) =>
  Math.round(255 * (blackPoint + (1 - blackPoint) * Math.pow(value / 255, exponent))));

(async () => {
  await fs.mkdir(destination, { recursive: true });
  const manifest = { method: 'Per-channel monotonic tone curve; no synthesis, crop, or content replacement.', blackPoint, exponent, assets: [] };
  for (const [name, source] of Object.entries(sources)) {
    const input = `public/images/${source}-1536.webp`;
    const original = await fs.readFile(input);
    const { data, info } = await sharp(original).removeAlpha().toColourspace('srgb').raw().toBuffer({ resolveWithObject: true });
    for (let index = 0; index < data.length; index++) data[index] = lut[data[index]];
    const toned = sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
    await toned.clone().webp({ quality: 90 }).toFile(path.join(destination, `${name}.webp`));
    await toned.clone().resize({ width: 640 }).webp({ quality: 86 }).toFile(path.join(destination, `${name}-640.webp`));
    manifest.assets.push({ name, source: input, sourceSha256: crypto.createHash('sha256').update(original).digest('hex'), width: info.width, height: info.height });
  }
  await fs.writeFile(path.join(destination, 'provenance.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Derived ${manifest.assets.length} original-preserving light variants.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
