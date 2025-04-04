#!/usr/bin/env node
/**
 * Image Optimization Script
 * 
 * This script optimizes large image files by:
 * 1. Identifying large image files in the public/images directory
 * 2. Creating WebP versions of these images with better compression
 * 3. Providing thumbnail versions for faster initial loading
 */

// Using ES modules syntax to satisfy ESLint
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import chalk from 'chalk';

// Configuration
const LARGE_IMAGE_THRESHOLD = 1; // Process ALL images, not just those over 1MB
const SOURCE_DIR = path.join(process.cwd(), 'public/images');
const TARGET_DIR = path.join(process.cwd(), 'public/images/optimized');
const THUMBNAIL_SIZE = 400; // Width in pixels for thumbnail versions

// Format file size (need this early for initial logging)
const formatSize = (size) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

// Log with timestamp
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const prefix = {
    info: chalk.blue('ℹ️'),
    success: chalk.green('✅'),
    warning: chalk.yellow('⚠️'),
    error: chalk.red('❌'),
  }[type] || chalk.blue('ℹ️');
  
  console.log(`${prefix} [${timestamp}] ${message}`);
};

// Calculate percentage
const calcPercentage = (original, compressed) => {
  return ((1 - compressed / original) * 100).toFixed(2);
};

// Process a single image
async function processImage(filePath, stats) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, fileExt);
  
  // Skip already optimized images
  if (filePath.includes('/optimized/')) {
    log(`SKIPPED: ${filePath} - Already in optimized directory`, 'warning');
    return { skipped: true, reason: 'Already optimized' };
  }
  
  // Skip non-image files
  const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  if (!validExts.includes(fileExt)) {
    log(`SKIPPED: ${filePath} - Not an image file (ext: ${fileExt})`, 'warning');
    return { skipped: true, reason: 'Not an image file' };
  }
  
  // Skip small files - log size for debugging
  const fileSize = stats.size;
  if (fileSize < LARGE_IMAGE_THRESHOLD) {
    log(`SKIPPED: ${filePath} - Size ${formatSize(fileSize)} below threshold of ${formatSize(LARGE_IMAGE_THRESHOLD)}`, 'warning');
    return { skipped: true, reason: 'File too small to optimize' };
  }
  
  log(`PROCESSING: ${chalk.cyan(fileName)} (${formatSize(fileSize)})`, 'info');
  
  // Make sure target directory exists
  const targetSubdir = path.dirname(filePath).replace(SOURCE_DIR, TARGET_DIR);
  await fs.mkdir(targetSubdir, { recursive: true });
  
  // Prepare output paths
  const webpPath = path.join(targetSubdir, `${baseName}.webp`);
  const thumbnailPath = path.join(targetSubdir, `${baseName}-thumb.webp`);
  
  log(`Output paths: 
  - Full: ${webpPath}
  - Thumb: ${thumbnailPath}`, 'info');
  
  // Define optimization strategies
  const sharpInstance = sharp(filePath);
  const metadata = await sharpInstance.metadata();
  
  try {
    // Create optimized WebP version
    await sharpInstance
      .webp({ quality: 80 }) // Good quality, better compression
      .toFile(webpPath);
    
    // Create thumbnail version
    await sharp(filePath)
      .resize(THUMBNAIL_SIZE)
      .webp({ quality: 60 }) // Lower quality is ok for thumbnails
      .toFile(thumbnailPath);
    
    // Get stats
    const optimizedStats = await fs.stat(webpPath);
    const thumbnailStats = await fs.stat(thumbnailPath);
    
    log(`SUCCESS: Created optimized images:
    - Original (${formatSize(fileSize)}): ${filePath}
    - WebP (${formatSize(optimizedStats.size)}): ${webpPath}
    - Thumbnail (${formatSize(thumbnailStats.size)}): ${thumbnailPath}`, 'success');
    
    return {
      success: true,
      original: {
        path: filePath,
        size: fileSize,
        dimensions: `${metadata.width}x${metadata.height}`
      },
      optimized: {
        path: webpPath,
        size: optimizedStats.size,
        savings: calcPercentage(fileSize, optimizedStats.size)
      },
      thumbnail: {
        path: thumbnailPath,
        size: thumbnailStats.size
      }
    };
  } catch (err) {
    log(`Error processing ${fileName}: ${err.message}`, 'error');
    return { 
      success: false, 
      error: err.message 
    };
  }
}

// Walk directory and find image files
async function findLargeImages(directory) {
  const results = [];
  let allImageCount = 0;
  let skippedSmallCount = 0;
  
  async function walk(dir) {
    log(`Scanning directory: ${dir}`, 'info');
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isDirectory()) {
        // Skip the optimized directory
        if (file !== 'optimized') {
          await walk(filePath);
        } else {
          log(`Skipping optimized directory: ${filePath}`, 'info');
        }
      } else {
        // Check if it's an image file
        const ext = path.extname(file).toLowerCase();
        const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        
        if (validExts.includes(ext)) {
          allImageCount++;
          
          if (stats.size > LARGE_IMAGE_THRESHOLD) {
            log(`Found large image: ${filePath} (${formatSize(stats.size)})`, 'info');
            results.push({ filePath, stats });
          } else {
            skippedSmallCount++;
            log(`Skipping small image: ${filePath} (${formatSize(stats.size)})`, 'warning');
          }
        }
      }
    }
  }
  
  await walk(directory);
  log(`Total images found: ${allImageCount}`, 'info');
  log(`Small images skipped due to threshold: ${skippedSmallCount}`, 'warning');
  
  return results;
}

// Main function
async function main() {
  try {
    console.log(chalk.bold('\n🖼️  Large Image Optimizer 📸\n'));
    log(`Image threshold set to: ${formatSize(LARGE_IMAGE_THRESHOLD)} - Now processing ALL images`, 'info');
    log('Starting image optimization process...', 'info');
    
    // Create target directory if it doesn't exist
    if (!existsSync(TARGET_DIR)) {
      await fs.mkdir(TARGET_DIR, { recursive: true });
      log(`Created output directory: ${TARGET_DIR}`, 'success');
    }
    
    // Find large images
    log('Scanning for large images...', 'info');
    const largeImages = await findLargeImages(SOURCE_DIR);
    log(`Found ${largeImages.length} large image(s) to process`, 'info');
    
    // Process each large image
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < largeImages.length; i++) {
      const { filePath, stats } = largeImages[i];
      log(`[${i + 1}/${largeImages.length}] Processing: ${path.basename(filePath)}`, 'info');
      
      const result = await processImage(filePath, stats);
      
      if (result.skipped) {
        skippedCount++;
        log(`Skipped: ${result.reason}`, 'warning');
      } else if (result.success) {
        successCount++;
        totalOriginalSize += result.original.size;
        totalOptimizedSize += result.optimized.size;
        
        log(`Optimized: ${formatSize(result.original.size)} → ${formatSize(result.optimized.size)} (${result.optimized.savings}% reduction)`, 'success');
        log(`Thumbnail created: ${formatSize(result.thumbnail.size)}`, 'success');
      } else {
        errorCount++;
        log(`Failed: ${result.error}`, 'error');
      }
    }
    
    // Print summary
    console.log('\n' + chalk.bold('📊 Optimization Summary'));
    console.log('─'.repeat(50));
    console.log(`Total original size: ${formatSize(totalOriginalSize)}`);
    console.log(`Total optimized size: ${formatSize(totalOptimizedSize)}`);
    
    if (totalOriginalSize > 0) {
      const savings = calcPercentage(totalOriginalSize, totalOptimizedSize);
      console.log(`Total space saved: ${formatSize(totalOriginalSize - totalOptimizedSize)} (${savings}%)`);
    }
    
    console.log('─'.repeat(50));
    console.log(`${chalk.green(successCount)} optimized, ${chalk.yellow(skippedCount)} skipped, ${chalk.red(errorCount)} failed`);
    
    // Instructions for updating code
    if (successCount > 0) {
      console.log('\n' + chalk.bold('🔍 Next Steps'));
      console.log('Update image references in your code to use the optimized versions:');
      console.log('  • Original:  /images/folder/image.jpg');
      console.log('  • Optimized: /images/optimized/folder/image.webp');
      console.log('  • Thumbnail: /images/optimized/folder/image-thumb.webp');
    }
    
    log('Image optimization complete!', 'success');
  } catch (error) {
    log(`Error during optimization: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run the script
main();
