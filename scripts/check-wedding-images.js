#!/usr/bin/env node

/**
 * Diagnostic script to check wedding image paths and metadata
 * 
 * This script helps identify issues with wedding images by:
 * 1. Checking for image files in both the events/ and weddings/ directories
 * 2. Verifying that the metadata reflects the correct paths
 * 3. Suggesting fixes for any issues found
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to check
const REPO_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');
const METADATA_PATH = path.join(PUBLIC_DIR, 'image-metadata.json');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'images', 'optimized');

// Wedding event numbers to check
const WEDDING_EVENT_NUMBERS = Array.from({ length: 10 }, (_, i) => i + 36); // 36-45

// Helper to check if a file exists
const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
};

// Load metadata if it exists
let metadata = { images: {} };
if (fileExists(METADATA_PATH)) {
  try {
    const metadataRaw = fs.readFileSync(METADATA_PATH, 'utf8');
    metadata = JSON.parse(metadataRaw);
    console.log(`✓ Loaded metadata with ${Object.keys(metadata.images).length} images`);
  } catch (error) {
    console.error('❌ Error loading metadata:', error.message);
  }
} else {
  console.error('❌ Metadata file not found at:', METADATA_PATH);
}

// Check for wedding directory
if (!fileExists(path.join(IMAGES_DIR, 'weddings'))) {
  console.error('❌ Wedding directory not found in images folder');
  // Create it if it doesn't exist
  try {
    fs.mkdirSync(path.join(IMAGES_DIR, 'weddings'), { recursive: true });
    console.log('✓ Created missing weddings directory');
  } catch (err) {
    console.error('❌ Failed to create weddings directory:', err.message);
  }
}

// Check for optimized wedding directory
if (!fileExists(path.join(OPTIMIZED_DIR, 'weddings'))) {
  console.error('❌ Optimized wedding directory not found');
  // Create it if it doesn't exist
  try {
    fs.mkdirSync(path.join(OPTIMIZED_DIR, 'weddings'), { recursive: true });
    console.log('✓ Created missing optimized weddings directory');
  } catch (err) {
    console.error('❌ Failed to create optimized weddings directory:', err.message);
  }
}

// Check for wedding events
console.log('\n--- Checking for wedding event images ---');
const missingFiles = [];
const filesToMove = [];

WEDDING_EVENT_NUMBERS.forEach(num => {
  const eventFilename = `event-${num}.jpg`;
  const optimizedEventFilename = `event-${num}.webp`;
  
  // Original event paths (source location)
  const originalEventPath = path.join(IMAGES_DIR, 'events', eventFilename);
  const originalOptimizedPath = path.join(OPTIMIZED_DIR, 'events', optimizedEventFilename);
  
  // Target wedding paths (destination)
  const weddingEventPath = path.join(IMAGES_DIR, 'weddings', eventFilename);
  const weddingOptimizedPath = path.join(OPTIMIZED_DIR, 'weddings', optimizedEventFilename);
  
  // Check if the image exists in events folder
  if (fileExists(originalEventPath)) {
    console.log(`✓ Found ${originalEventPath}`);
    filesToMove.push({
      source: originalEventPath,
      dest: weddingEventPath,
      type: 'original'
    });
  } else if (fileExists(weddingEventPath)) {
    console.log(`✓ Found ${weddingEventPath} (already in weddings folder)`);
  } else {
    console.log(`❌ Missing ${eventFilename} in both events and weddings folders`);
    missingFiles.push(eventFilename);
  }
  
  // Check if the optimized image exists
  if (fileExists(originalOptimizedPath)) {
    console.log(`✓ Found ${originalOptimizedPath}`);
    filesToMove.push({
      source: originalOptimizedPath,
      dest: weddingOptimizedPath,
      type: 'optimized'
    });
  } else if (fileExists(weddingOptimizedPath)) {
    console.log(`✓ Found ${weddingOptimizedPath} (already in optimized weddings folder)`);
  } else {
    console.log(`❌ Missing optimized ${optimizedEventFilename} in both locations`);
    missingFiles.push(optimizedEventFilename);
  }
});

// Check metadata paths
console.log('\n--- Checking metadata paths ---');
const metadataErrors = [];

// Check optimized event paths in metadata
WEDDING_EVENT_NUMBERS.forEach(num => {
  const optimizedEventPath = `/images/optimized/events/event-${num}.webp`;
  const weddingOptimizedPath = `/images/optimized/weddings/event-${num}.webp`;
  
  if (metadata.images[optimizedEventPath]) {
    console.log(`❌ Metadata still references old path: ${optimizedEventPath}`);
    metadataErrors.push({
      oldPath: optimizedEventPath,
      newPath: weddingOptimizedPath
    });
  } else if (metadata.images[weddingOptimizedPath]) {
    console.log(`✓ Metadata correctly references: ${weddingOptimizedPath}`);
  } else {
    console.log(`⚠️ No metadata found for either path for event-${num}.webp`);
  }
});

// Report summary
console.log('\n=== DIAGNOSTIC SUMMARY ===');
console.log(`${filesToMove.length} files need to be moved`);
console.log(`${missingFiles.length} files are missing`);
console.log(`${metadataErrors.length} metadata entries need updating`);

if (filesToMove.length > 0 || metadataErrors.length > 0) {
  console.log('\n=== RECOMMENDED ACTIONS ===');
  
  // Suggest file moves
  if (filesToMove.length > 0) {
    console.log('\n1. Move these files to the weddings directory:');
    filesToMove.forEach(file => {
      console.log(`   - Move ${file.source} to ${file.dest}`);
    });
  }
  
  // Suggest metadata regeneration
  if (metadataErrors.length > 0) {
    console.log('\n2. Regenerate metadata after moving files:');
    console.log('   - Run: npm run generate-image-metadata');
  }
  
  // Option to automate the fixes
  console.log('\nTo automatically fix these issues, run:');
  console.log('node scripts/check-wedding-images.js --fix');
  
  // Implement auto-fixing if --fix flag is provided
  if (process.argv.includes('--fix')) {
    console.log('\n=== APPLYING FIXES ===');
    
    // Move files
    filesToMove.forEach(file => {
      try {
        // Create directory if it doesn't exist
        const destDir = path.dirname(file.dest);
        if (!fileExists(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy the file
        fs.copyFileSync(file.source, file.dest);
        console.log(`✓ Copied ${file.source} to ${file.dest}`);
        
        // We don't delete the original to be safe
        console.log(`  Note: Original file was preserved at ${file.source}`);
      } catch (err) {
        console.error(`❌ Failed to copy ${file.source}: ${err.message}`);
      }
    });
    
    // Suggest running the metadata generator
    console.log('\nFiles have been moved. Please regenerate metadata:');
    console.log('npm run generate-image-metadata');
  }
}
