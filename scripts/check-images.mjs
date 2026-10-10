#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const imagesJsPath = path.resolve(rootDir, "src/data/images.js");

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

async function checkRegistry() {
  console.log("=== Cablejointsa Image Pipeline: Integrity Audit ===\n");
  let hasErrors = false;

  // 1. Scan src/ and index.html for raw remote image URLs or CSS remote url()
  console.log("1. Checking for unauthorized remote image URLs in source code...");
  const scannedDirs = ["src", "index.html"];
  const unsplashRegex = /images\.unsplash\.com/i;
  // Match src="..." or url(...) pointing to remote image domains
  const remoteImgSrcRegex = /(?:src|srcSet|url)\s*=\s*["'`]https?:\/\/[^"'`]+\.(?:jpg|jpeg|png|webp|avif|gif)/i;
  const cssUrlRegex = /url\(\s*["']?https?:\/\/[^"')]+/i;

  function scanDir(dir) {
    const fullPath = path.resolve(rootDir, dir);
    if (!fs.existsSync(fullPath)) return;
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (unsplashRegex.test(content) || remoteImgSrcRegex.test(content) || cssUrlRegex.test(content)) {
        console.error(`  ✗ Remote image reference found in: ${dir}`);
        hasErrors = true;
      }
      return;
    }
    for (const file of fs.readdirSync(fullPath)) {
      if (file === "node_modules" || file === "dist" || file === ".git" || file === "scripts") continue;
      scanDir(path.join(dir, file));
    }
  }

  for (const d of scannedDirs) scanDir(d);

  // 2. Load registry and check images
  console.log("2. Auditing central image registry (src/data/images.js)...");
  if (!fs.existsSync(imagesJsPath)) {
    console.error("  ✗ images.js not found at", imagesJsPath);
    process.exit(1);
  }

  let imagesModule;
  try {
    const fileUrl = new URL(`file://${imagesJsPath}`).href;
    imagesModule = await import(fileUrl);
  } catch (err) {
    console.error("  ✗ Failed to import images.js:", err.message);
    process.exit(1);
  }

  const registry = imagesModule.images;
  if (!registry) {
    console.error("  ✗ No `images` export found in images.js");
    process.exit(1);
  }

  const slotHashes = new Map();
  const slots = Object.entries(registry);
  console.log(`Auditing ${slots.length} registered image slots...`);

  for (const [key, slot] of slots) {
    // Check alt or decorative
    if (!slot.decorative && (!slot.alt || slot.alt.trim() === "")) {
      console.error(`  ✗ [${key}] Missing alt text on non-decorative image.`);
      hasErrors = true;
    }

    // Check src file
    const cleanSrc = (slot.src || "").replace(/^\/?/, "");
    const localFilePath = path.resolve(rootDir, "public", cleanSrc);
    const altLocalPath = path.resolve(rootDir, cleanSrc);
    const finalPath = fs.existsSync(localFilePath) ? localFilePath : altLocalPath;

    if (!fs.existsSync(finalPath)) {
      console.error(`  ✗ [${key}] File does not exist: ${slot.src} (checked ${localFilePath})`);
      hasErrors = true;
      continue;
    }

    // Verify hash uniqueness across distinct keys (except socialShare which can derive from panel)
    const hash = getFileHash(finalPath);
    if (key !== "socialShare" && slotHashes.has(hash)) {
      console.error(`  ✗ [${key}] Duplicate image hash detected! Shares identical file with slot: ${slotHashes.get(hash)}`);
      hasErrors = true;
    } else {
      slotHashes.set(hash, key);
    }

    // Decode with sharp
    try {
      const buffer = fs.readFileSync(finalPath);
      const meta = await sharp(buffer).metadata();
      const fileSizeKb = buffer.length / 1024;

      // Budget check
      const maxBudgetKb = (key.includes("hero") || key.includes("cta") || key.includes("social")) ? 250 : 150;
      if (fileSizeKb > maxBudgetKb) {
        console.warn(`  ! [${key}] File size (${fileSizeKb.toFixed(1)} KB) exceeds budget (${maxBudgetKb} KB)`);
      }

      console.log(`  ✓ [${key}] Validated: ${meta.width}x${meta.height} ${meta.format} (${fileSizeKb.toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ [${key}] Failed to decode file:`, err.message);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("\n❌ Image audit FAILED. Address the errors listed above.");
    process.exit(1);
  } else {
    console.log("\n✅ Image audit PASSED. All assets are verified, unique, and local.");
  }
}

checkRegistry();
