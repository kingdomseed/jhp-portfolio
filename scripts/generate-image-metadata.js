#!/usr/bin/env node

/**
 * Image Metadata Generator
 * 
 * This script scans the public/images directory and generates a JSON file
 * containing metadata about each image, including dimensions and aspect ratio.
 * 
 * Run this script during the build process to ensure the gallery has accurate
 * image dimensions for proper layout.
 */

import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

// Configuration
const IMAGE_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_FILE = path.join(process.cwd(), 'public/image-metadata.json');
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Ensure the script can run even if the image directory doesn't exist yet
if (!fs.existsSync(IMAGE_DIR)) {
  console.warn(`Warning: Image directory ${IMAGE_DIR} does not exist. Creating it...`);
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

/**
 * Recursively scan a directory for image files
 */
function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  let images = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      images = images.concat(scanDirectory(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (VALID_EXTENSIONS.includes(ext)) {
        // Convert to web path (relative to public directory)
        const webPath = '/' + path.relative(path.join(process.cwd(), 'public'), filePath).replace(/\\/g, '/');
        images.push({
          path: filePath,
          webPath: webPath
        });
      }
    }
  }

  return images;
}

/**
 * Get image dimensions and calculate aspect ratio
 */
function getImageMetadata(images) {
  const metadata = {};

  for (const image of images) {
    try {
      // Read the image file as a buffer
      const buffer = fs.readFileSync(image.path);
      const dimensions = sizeOf(buffer);
      const aspectRatio = dimensions.width / dimensions.height;
      
      // Determine orientation
      let orientation = 'square';
      if (aspectRatio > 1.1) {
        orientation = 'landscape';
      } else if (aspectRatio < 0.9) {
        orientation = 'portrait';
      }

      metadata[image.webPath] = {
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: aspectRatio,
        orientation: orientation
      };
    } catch (error) {
      console.error(`Error processing image ${image.path}:`, error.message);
    }
  }

  return metadata;
}

// Main execution
try {
  console.log('Scanning for images...');
  const images = scanDirectory(IMAGE_DIR);
  console.log(`Found ${images.length} images.`);

  console.log('Generating metadata...');
  const metadata = getImageMetadata(images);

  // Write metadata to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ images: metadata }, null, 2));
  console.log(`Metadata saved to ${OUTPUT_FILE}`);
} catch (error) {
  console.error('Error generating image metadata:', error);
  process.exit(1);
}
