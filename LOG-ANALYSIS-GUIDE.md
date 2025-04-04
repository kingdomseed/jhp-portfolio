Logging summary for image gallery debugging

# Image Gallery Debug Logging Guide

This guide explains how to use the enhanced logging we've added to diagnose and fix image gallery issues.

## Overview of Changes

We've added detailed logging to:

1. **Gallery Page Component** (`galleries/page.tsx`)
   - Image metadata loading and processing
   - Category determination
   - Shuffle algorithm execution
   - Filter and sort operations

2. **Masonry Grid Component** (`components/ui/masonry-grid.tsx`) 
   - Image metadata loading
   - Path lookup and fallback mechanisms
   - Image loading events

3. **Image Optimization Script** (`scripts/optimize-large-images.js`)
   - Process visibility for all images
   - Path transformations
   - Size threshold analysis

4. **Metadata Generation Script** (`scripts/generate-image-metadata.js`)
   - Path mapping between original and optimized images
   - More robust directory scanning
   - Improved metadata storage for both original and optimized paths

## Running the Scripts

To run the enhanced scripts and collect logs:

1. First optimize all images (regardless of size):
   ```bash
   # Edit the threshold in the script to process all images
   # Find line: const LARGE_IMAGE_THRESHOLD = 1 * 1024 * 1024; // 1MB
   # Change to: const LARGE_IMAGE_THRESHOLD = 1; // 1 byte (process all images)
   
   cd jhp-next
   node scripts/optimize-large-images.js
   ```

2. Generate updated metadata:
   ```bash
   cd jhp-next
   node scripts/generate-image-metadata.js
   ```

3. Run the development server with console logging visible:
   ```bash
   cd jhp-next
   npm run dev
   ```

4. Open the browser and navigate to the gallery page while watching the console.

## What to Look For

### 1. Image Optimization Process

Look for:
- How many images are processed vs. skipped
- Whether the optimized versions are being created correctly
- The path structure of the optimized files

### 2. Metadata Generation

Look for:
- Path mappings between original and optimized versions
- Whether metadata is being generated for all images
- Any errors during metadata generation

### 3. Gallery Shuffle Algorithm

Look for:
- The galleryUpdated state changes
- Category contributions to the shuffle
- Pre-shuffle and post-shuffle distribution of categories
- Shuffle effectiveness percentage

### 4. Image Path Resolution

Look for:
- Which image paths the masonry grid is using
- Any failed image loads
- Whether aspect ratios are found in metadata or falling back

## Fixing Common Issues

1. **Optimized Images Not Found**:
   - Ensure all images are optimized by setting threshold to 1 byte
   - Check that path transformations are correct

2. **Shuffling Not Working**:
   - Review the 'galleryUpdated' state handling
   - Check if all categories contribute to the shuffle
   - Verify that the shuffle produces position changes

3. **Incorrect Paths**:
   - Ensure consistency in path formats
   - Check that paths follow the structure: /images/optimized/[category]/[filename].webp

## Next Steps After Analysis

After reviewing the logs:

1. Make targeted fixes based on specific issues identified
2. Update the optimization threshold to process all images
3. Ensure metadata is generated for both original and optimized paths
4. Update the gallery component to consistently use optimized paths

