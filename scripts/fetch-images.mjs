#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.resolve(__dirname, "image-manifest.json");

async function run() {
  console.log("=== Cablejointsa Image Pipeline: Fetch & Convert ===");
  if (!fs.existsSync(manifestPath)) {
    console.error("Error: Manifest file not found at", manifestPath);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  console.log(`Processing ${manifest.length} manifest slots...`);

  let successCount = 0;

  for (const item of manifest) {
    console.log(`\n[${item.key}] Fetching source: ${item.downloadUrl}`);
    try {
      const res = await fetch(item.downloadUrl, {
        headers: {
          "User-Agent": "CablejointsaAssetPipeline/1.0 (dailyhrik@gmail.com)",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.startsWith("image/")) {
        throw new Error(`Invalid content-type: ${contentType}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      const metadata = await sharp(buffer).metadata();
      console.log(`  Source decoded: ${metadata.width}x${metadata.height} ${metadata.format} (${(buffer.length / 1024).toFixed(1)} KB)`);

      for (const output of item.outputs) {
        const destPath = path.resolve(rootDir, output.path);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        const transform = sharp(buffer)
          .resize({
            width: output.width,
            height: output.height,
            fit: output.fit || "cover",
            position: output.position || "center",
          })
          .webp({ quality: 80, effort: 4 });

        await transform.toFile(destPath);
        const stats = fs.statSync(destPath);
        console.log(`  ✓ Generated: ${output.path} (${output.width}x${output.height}) - ${(stats.size / 1024).toFixed(1)} KB`);
      }

      successCount++;
    } catch (err) {
      console.error(`  ✗ Failed slot ${item.key}:`, err.message);
      process.exitCode = 1;
    }
  }

  console.log(`\nCompleted: ${successCount}/${manifest.length} slots successfully processed.`);
}

run();
