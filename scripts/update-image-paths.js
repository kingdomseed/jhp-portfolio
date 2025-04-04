#!/usr/bin/env node
/**
 * Image Path Updater
 * 
 * This script scans JavaScript/TypeScript files for references to original image paths
 * and updates them to use optimized WebP versions.
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Configuration
const SOURCE_DIR = process.cwd(); // Use current directory rather than nested jhp-next
const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const IGNORE_DIRS = ['node_modules', '.next', 'build', 'dist'];

// Original to optimized path regex pattern
const IMAGE_PATH_PATTERN = /(['"`])\/images\/([^/]+)\/([^/'"`.]+\.(jpg|jpeg|png|gif))(['"`])/g;
// Pattern captures: quote, category, filename with extension, extension, end quote

// Statistics
let filesScanned = 0;
let filesModified = 0;
let pathsReplaced = 0;

/**
 * Check if a file should be processed
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return FILE_EXTENSIONS.includes(ext);
}

/**
 * Check if a directory should be ignored
 */
function shouldIgnoreDir(dirPath) {
  const dirName = path.basename(dirPath);
  return IGNORE_DIRS.includes(dirName);
}

/**
 * Update image paths in a file
 */
async function updateImagePaths(filePath) {
  try {
    // Read file content
    const content = await fs.promises.readFile(filePath, 'utf8');
    
    // Check if file contains image paths
    if (!IMAGE_PATH_PATTERN.test(content)) {
      return 0; // No paths to replace
    }
    
    // Reset regex lastIndex
    IMAGE_PATH_PATTERN.lastIndex = 0;
    
    // Replace image paths
    const updatedContent = content.replace(IMAGE_PATH_PATTERN, (match, quote, category, file, ext, endQuote) => {
      console.log(`Found path: ${match}`);
      const replacement = `${quote}/images/optimized/${category}/${file.replace(/\.[^.]+$/, '')}.webp${endQuote}`;
      console.log(`Replacing with: ${replacement}`);
      pathsReplaced++;
      return replacement;
    });
    
    // Check if content changed
    if (content !== updatedContent) {
      await fs.promises.writeFile(filePath, updatedContent, 'utf8');
      return 1; // File modified
    }
    
    return 0; // No changes made
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return 0;
  }
}

/**
 * Recursively scan directories for files to process
 */
async function scanDirectory(dir) {
  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!shouldIgnoreDir(fullPath)) {
          await scanDirectory(fullPath);
        }
      } else if (entry.isFile() && shouldProcessFile(fullPath)) {
        filesScanned++;
        const modified = await updateImagePaths(fullPath);
        filesModified += modified;
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
}

/**
 * Main function
 */
async function main() {
  console.log(chalk.bold('\n🔄 Image Path Updater 🔄\n'));
  console.log(`Scanning directory: ${SOURCE_DIR}`);
  
  try {
    await scanDirectory(SOURCE_DIR);
    
    console.log('\n' + chalk.bold('📊 Summary'));
    console.log('─'.repeat(50));
    console.log(`Files scanned: ${filesScanned}`);
    console.log(`Files modified: ${filesModified}`);
    console.log(`Paths replaced: ${pathsReplaced}`);
    
    if (pathsReplaced > 0) {
      console.log(chalk.green('\n✅ Image paths updated successfully!'));
      console.log('Image paths now use the optimized WebP versions.');
    } else {
      console.log(chalk.yellow('\n⚠️ No image paths were updated.'));
      console.log('Either all images are already using optimized paths or no image paths were found.');
    }
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();
