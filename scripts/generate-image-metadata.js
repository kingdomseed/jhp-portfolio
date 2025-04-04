#!/usr/bin/env node

/**
 * Image Metadata Generator
 * 
 * This script scans the public/images directory and generates a JSON file
 * containing metadata about each image, including dimensions and aspect ratio.
 * 
 * IMPORTANT: This updated version prioritizes optimized images when they exist,
 * and maps both original and optimized paths to ensure proper rendering.
 * 
 * Run this script during the build process to ensure the gallery has accurate
 * image dimensions for proper layout.
 */

import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import chalk from 'chalk';

// Configuration
const IMAGE_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_FILE = path.join(process.cwd(), 'public/image-metadata.json');
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Flag to enable verbose logging
const VERBOSE = true;

// Helper function for logging
const log = (message) => {
  if (VERBOSE) {
    console.log(message);
  }
};

// Ensure the script can run even if the image directory doesn't exist yet
if (!fs.existsSync(IMAGE_DIR)) {
  console.warn(`Warning: Image directory ${IMAGE_DIR} does not exist. Creating it...`);
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

/**
 * Recursively scan a directory for image files
 */
function scanDirectory(dir) {
  log(`Scanning directory: ${dir}`);
  const files = fs.readdirSync(dir);
  let images = [];
  
  // Track optimized images to avoid duplicates
  const processedPaths = new Set();

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      log(`Found directory: ${filePath}`);
      images = images.concat(scanDirectory(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (VALID_EXTENSIONS.includes(ext)) {
        // Convert to web path (relative to public directory)
        const webPath = '/' + path.relative(path.join(process.cwd(), 'public'), filePath).replace(/\\/g, '/');
        
        // Check if this is an optimized image
        const isOptimized = webPath.includes('/optimized/');
        
        // Generate the corresponding original or optimized path
        let originalPath = webPath;
        let optimizedPath = webPath;
        
        if (isOptimized) {
          // It's an optimized image, derive the original path
          // Skip thumbnail versions
          if (webPath.includes('-thumb.webp')) {
            log(`Skipping thumbnail: ${webPath}`);
            continue;
          }
          
          originalPath = webPath.replace(
            /\/images\/optimized\/([^/]+)\/([^/]+)\.webp$/,
            '/images/$1/$2'
          );
          
          // We don't know the original extension, so let's check for common ones
          const originalExts = ['.jpg', '.jpeg', '.png', '.gif'];
          let originalExists = false;
          
          for (const ext of originalExts) {
            const testPath = path.join(process.cwd(), 'public', originalPath + ext);
            if (fs.existsSync(testPath)) {
              originalPath = originalPath + ext;
              originalExists = true;
              break;
            }
          }
          
          if (!originalExists) {
            // If we can't find the original, just use the optimized path as both
            originalPath = webPath;
          }
        } else {
          // It's an original image, derive the optimized path
          const basePath = webPath.replace(/\.[^/.]+$/, '');
          optimizedPath = basePath.replace(
            /\/images\/([^/]+)\/([^/]+)$/,
            '/images/optimized/$1/$2.webp'
          );
          
          // Check if the optimized version exists
          const optimizedFilePath = path.join(process.cwd(), 'public', optimizedPath);
          if (!fs.existsSync(optimizedFilePath)) {
            // If optimized doesn't exist, just use the original path
            optimizedPath = webPath;
          }
        }
        
        // Add the image to our list (prioritize optimized images)
        const imagePath = isOptimized ? webPath : optimizedPath;
        const fsPath = path.join(process.cwd(), 'public', imagePath);
        
        // Check if this path has been processed already to avoid duplicates
        if (!processedPaths.has(webPath) && !processedPaths.has(optimizedPath)) {
          processedPaths.add(webPath);
          processedPaths.add(optimizedPath);
          
          log(`Found image: ${webPath} (${isOptimized ? 'optimized' : 'original'})`);
          log(`  Original path: ${originalPath}`);
          log(`  Optimized path: ${optimizedPath}`);
          
          if (fs.existsSync(fsPath)) {
            images.push({
              path: fsPath,
              webPath: imagePath,
              originalPath: originalPath,
              optimizedPath: optimizedPath,
              isOptimized: isOptimized
            });
          } else {
            log(`  WARNING: Image file does not exist: ${fsPath}`);
          }
        }
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

      // Create the metadata entry for this image's web path
      const entry = {
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: aspectRatio,
        orientation: orientation,
        originalPath: image.originalPath,
        optimizedPath: image.optimizedPath,
        isOptimized: image.isOptimized
      };
      
      // Store the metadata under multiple paths to ensure we can find it
      metadata[image.webPath] = entry;
      
      // Also store under original and optimized paths for easy lookup
      if (image.originalPath !== image.webPath) {
        metadata[image.originalPath] = entry;
      }
      
      if (image.optimizedPath !== image.webPath) {
        metadata[image.optimizedPath] = entry;
      }
      
      log(`Generated metadata for: ${image.webPath}`);
      log(`  Dimensions: ${dimensions.width}x${dimensions.height}`);
      log(`  Aspect ratio: ${aspectRatio}`);
      log(`  Orientation: ${orientation}`);
    } catch (error) {
      console.error(`Error processing image ${image.path}:`, error.message);
    }
  }

  return metadata;
}

// Main execution
try {
  console.log(chalk.bold('\n🖼️  Image Metadata Generator 📸\n'));
  console.log('Scanning for images...');
  const images = scanDirectory(IMAGE_DIR);
  console.log(`Found ${images.length} images.`);

  // Count optimized vs original
  const optimizedCount = images.filter(img => img.isOptimized).length;
  const originalCount = images.length - optimizedCount;
  console.log(`Optimized images: ${optimizedCount}`);
  console.log(`Original images: ${originalCount}`);

  console.log('Generating metadata...');
  const metadata = getImageMetadata(images);
  const metadataEntryCount = Object.keys(metadata).length;
  console.log(`Generated ${metadataEntryCount} metadata entries`);

  // Write metadata to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ images: metadata }, null, 2));
  console.log(`Metadata saved to ${OUTPUT_FILE}`);
  
  // Verify metadata file size
  const stats = fs.statSync(OUTPUT_FILE);
  const fileSizeInMB = stats.size / (1024 * 1024);
  console.log(`Metadata file size: ${fileSizeInMB.toFixed(2)} MB`);
  
  console.log('\nMetadata generation complete!');
} catch (error) {
  console.error('Error generating image metadata:', error);
  process.exit(1);
}
