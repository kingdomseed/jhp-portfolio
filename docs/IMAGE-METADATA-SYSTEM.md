# Jason Holt Photography Image Metadata System

This document provides a comprehensive overview of the image metadata system that powers the responsive masonry grid gallery in the Jason Holt Photography website.

**IMPORTANT UPDATE**: Recent fixes have addressed issues with image path inconsistencies and optimized WebP handling. The metadata system now works in conjunction with the `getOptimizedImagePath` utility to ensure all images use optimized paths consistently.

## Table of Contents

1. [System Overview](#system-overview)
2. [Metadata Generation Process](#metadata-generation-process)
3. [Metadata Structure](#metadata-structure)
4. [Integrating with the MasonryGrid Component](#integrating-with-the-masonrygrid-component)
5. [Custom Metadata Extensions](#custom-metadata-extensions)
6. [Manual Metadata Management](#manual-metadata-management)
7. [Batch Processing](#batch-processing)
8. [Troubleshooting](#troubleshooting)

## System Overview

The image metadata system is a critical component of the gallery experience, responsible for:

1. **Analyzing image dimensions**: Extracts width, height, and aspect ratio information
2. **Categorizing images**: Associates images with the correct display categories
3. **Storing presentation data**: Maintains metadata for optimal display in the masonry grid
4. **Supporting filtering**: Provides category and tag metadata for gallery filtering
5. **Enhancing the UX**: Enables smooth, responsive display of images with proper proportions
6. **Path normalization**: Works with the `getOptimizedImagePath` utility to ensure consistent use of optimized WebP images

This system operates through a build-time process that generates a centralized JSON file containing metadata for all images, which is then consumed by the frontend components.

## Metadata Generation Process

### Automatic Metadata Generation

The core of the system is the metadata generator script located at:
`/jhp-next/scripts/generate-image-metadata.js`

This script:
1. Recursively scans the `/public/images/` directory
2. Analyzes each image using the `image-size` library
3. Extracts dimensions, calculates aspect ratios, and determines orientation
4. Infers categories from directory structure
5. Sets an `isOptimized` flag based on whether the image is in the optimized directory
6. Generates `/public/image-metadata.json` with complete metadata information

**Recent Fix**: The script now correctly identifies and flags WebP images in the `/images/optimized/` directory with `isOptimized: true`. This flag is critical for proper image path handling.

### Running the Generator

The generator can be run through:

```bash
# Run from the project root
cd jhp-next
npm run generate-image-metadata

# With verbose output for debugging
npm run generate-image-metadata -- --verbose

# Targeting a specific directory only
npm run generate-image-metadata -- --directory=public/images/portraits
```

### Build Integration

The metadata generator is automatically integrated into the build process:

```json
// In package.json
"scripts": {
  "build": "npm run generate-image-metadata && next build",
  "generate-image-metadata": "node scripts/generate-image-metadata.js"
}
```

This ensures the metadata file is always up-to-date with the latest images before a build.

## Metadata Structure

The generated `image-metadata.json` file follows this structure:

```json
{
  "images": {
    "path/to/image.jpg": {
      "width": 1200,
      "height": 800,
      "aspectRatio": 1.5,
      "orientation": "landscape",
      "category": "portrait",
      "subcategory": "headshot",
      "dateTaken": "2023-06-15T14:30:00Z",
      "location": "Frankfurt Studio",
      "description": "Professional headshot for corporate website",
      "tags": ["corporate", "professional", "indoor"],
      "isFeatured": false,
      "isOptimized": false
    },
    "/images/optimized/portraits/portrait-1.webp": {
      "width": 1200,
      "height": 800,
      "aspectRatio": 1.5,
      "orientation": "landscape",
      "category": "portrait",
      "isOptimized": true
    },
    "path/to/another-image.jpg": {
      // Metadata for another image
    }
  },
  "categories": {
    "portrait": [
      "path/to/image.jpg",
      // Other portrait images
    ],
    "event": [
      // Event images
    ]
    // Other categories
  },
  "generated": "2025-04-03T12:34:56Z"
}
```

### Key Metadata Properties

| Property | Type | Description | Source |
|----------|------|-------------|--------|
| width | number | Image width in pixels | Analyzed from image file |
| height | number | Image height in pixels | Analyzed from image file |
| aspectRatio | number | Width divided by height | Calculated during analysis |
| orientation | string | "portrait", "landscape", or "square" | Determined from aspect ratio |
| category | string | Primary image category | Inferred from directory or filename |
| subcategory | string | Specific image type | Inferred from directory or filename |
| dateTaken | string | ISO date string | From EXIF data or filename |
| location | string | Where the photo was taken | From filename or manual addition |
| description | string | Brief image description | Manual or from filename |
| tags | string[] | Array of relevant tags | Manual or from filename |
| isFeatured | boolean | Whether image is featured | Manual addition |
| isOptimized | boolean | Whether image is an optimized WebP | Determined from file path |

### Fallback System

If an image's metadata cannot be found:

1. The system first checks for a category-specific default:
   - Portrait images: 0.8 aspect ratio (vertical)
   - Square images: 1.0 aspect ratio
   - Landscape images: 1.5 aspect ratio

2. If category is unknown, a final fallback to 1.5 aspect ratio is used

## Integrating with the MasonryGrid Component

The MasonryGrid component consumes the image metadata:

```tsx
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn, getOptimizedImagePath } from '@/lib/utils';

interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  isOptimized?: boolean;
  // Other metadata properties
}

interface MasonryGridProps {
  images: string[];
  columns?: number;
  gap?: number;
  className?: string;
}

export default function MasonryGrid({
  images,
  columns = 3,
  gap = 8,
  className = '',
}: MasonryGridProps) {
  const [metadata, setMetadata] = useState<Record<string, ImageMetadata>>({});
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  
  // Load metadata on component mount
  useEffect(() => {
    async function loadMetadata() {
      try {
        const response = await fetch('/image-metadata.json');
        const data = await response.json();
        setMetadata(data.images || {});
        
        // Log metadata sample for debugging
        console.log('Loaded metadata for gallery', Object.keys(data.images || {}).length, 'images');
        console.log('Sample metadata entries:');
        Object.keys(data.images || {}).slice(0, 3).forEach(key => {
          console.log(`  ${key}: ${JSON.stringify(data.images[key])}`);
        });
      } catch (error) {
        console.error('Failed to load image metadata:', error);
      }
    }
    
    loadMetadata();
  }, []);
  
  // Calculate column layout whenever images or metadata changes
  useEffect(() => {
    if (Object.keys(metadata).length === 0) return;
    
    // Initialize columns with 0 height
    const heights = Array(columns).fill(0);
    
    // Populate columns
    images.forEach(image => {
      // Find shortest column
      const shortestColumn = heights.indexOf(Math.min(...heights));
      
      // Get image metadata or use fallbacks
      // First try the exact path in metadata
      let imgMeta = metadata[image];
      
      // If not found and image isn't already optimized, try the optimized path
      if (!imgMeta && !image.includes('/optimized/')) {
        const optimizedPath = getOptimizedImagePath(image);
        imgMeta = metadata[optimizedPath];
      }
      
      // If still not found, use category fallback
      if (!imgMeta) {
        imgMeta = getCategoryFallback(image) || { aspectRatio: 1.5 };
      }
      
      // Calculate image height based on width and aspect ratio
      const columnWidth = 100 / columns;
      const imageHeight = columnWidth / imgMeta.aspectRatio;
      
      // Update column height
      heights[shortestColumn] += imageHeight + gap;
    });
    
    setColumnHeights(heights);
  }, [images, metadata, columns, gap]);
  
  // Rendering logic...
}

// Helper function to get category-based fallbacks
function getCategoryFallback(imagePath: string) {
  // Create regex patterns that will match both /category/ and /optimized/category/
  const portraitsPattern = /\/(optimized\/)?portraits\//i;
  const headhotsPattern = /\/(optimized\/)?headshots\//i;
  const familyPattern = /\/(optimized\/)?family\//i;
  
  if (portraitsPattern.test(imagePath)) {
    return { aspectRatio: 0.8 }; // Portrait orientation (taller than wide)
  } else if (headhotsPattern.test(imagePath)) {
    return { aspectRatio: 1.0 }; // Square aspect ratio
  } else if (familyPattern.test(imagePath)) {
    return { aspectRatio: 1.5 }; // Landscape orientation
  }
  
  return null;
}
```

### Path Normalization Utility

The MasonryGrid component works with the path normalization utility to ensure consistent use of optimized WebP versions:

```tsx
// In the image rendering part of the MasonryGrid component:
<Image
  src={getOptimizedImagePath(image.src)}
  alt={image.alt}
  fill
  priority={index < 6}
  loading={index < 12 ? "eager" : "lazy"}
  sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${100 / responsiveColumns}vw`}
  className="object-cover transition-transform duration-500 group-hover:scale-105"
  onLoad={(e) => {
    // Add a loaded class to help with animation
    const target = e.target as HTMLImageElement;
    target.classList.add('loaded');
    target.style.opacity = '1';
  }}
  style={{
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  }}
/>
```

The `getOptimizedImagePath` utility is defined in `lib/utils.ts`:

```typescript
export function getOptimizedImagePath(path: string): string {
  // If it's already an optimized path, return it as is
  if (path.includes('/optimized/')) {
    return path;
  }
  
  // Convert standard path to optimized path
  return path.replace(
    /\/images\/([^/]+)\/([^/]+)\.([^.]+)$/,
    '/images/optimized/$1/$2.webp'
  );
}
```

## Custom Metadata Extensions

The basic metadata system can be extended with custom fields:

### 1. Extending the Generator Script with Optimized Flag

Edit the generator script to include custom metadata:

```javascript
// In generate-image-metadata.js

function processImage(filePath) {
  // ... existing code

  // Extract custom metadata from filename or path
  const customMetadata = extractCustomMetadata(filePath);
  
  // Determine if this is an optimized image
  const isOptimized = filePath.includes('/optimized/');
  
  return {
    width,
    height,
    aspectRatio,
    orientation,
    // Add custom fields
    location: customMetadata.location || null,
    dateTaken: customMetadata.date || null,
    tags: customMetadata.tags || [],
    isOptimized: isOptimized,
    // Other custom fields
  };
}

function extractCustomMetadata(filePath) {
  // Example: Extract location from filename pattern:
  // portrait-frankfurt-01.jpg → location: "Frankfurt"
  const parts = path.basename(filePath, path.extname(filePath)).split('-');
  
  return {
    location: parts[1] ? capitalizeFirstLetter(parts[1]) : null,
    date: extractDateFromFilename(filePath),
    tags: extractTagsFromFilename(filePath),
  };
}
```

### 2. Manual Metadata Augmentation

For more detailed metadata that can't be inferred from filenames, create a separate file with manual additions:

```javascript
// In scripts/manual-metadata.js
module.exports = {
  "portraits/headshot-01.jpg": {
    description: "Corporate headshot for financial professional",
    location: "Frankfurt Studio",
    tags: ["corporate", "finance", "professional"],
    isFeatured: true
  },
  // Other manual metadata entries
};
```

Then merge this with the generated metadata:

```javascript
// In generate-image-metadata.js
const manualMetadata = require('./manual-metadata.js');

// After generating automatic metadata
for (const [path, data] of Object.entries(manualMetadata)) {
  if (metadata.images[path]) {
    metadata.images[path] = {
      ...metadata.images[path],
      ...data
    };
  }
}
```

## Manual Metadata Management

For cases where automatic generation isn't sufficient:

### 1. Directly Editing the Metadata File

You can directly edit `public/image-metadata.json`, but be aware that this will be overwritten on the next metadata generation run.

### 2. Creating a Custom Metadata Override File

Create a separate override file that won't be overwritten:

```json
// In public/image-metadata-overrides.json
{
  "images": {
    "portraits/executive-01.jpg": {
      "description": "CEO portrait for annual report",
      "location": "Client Office",
      "isFeatured": true
    }
  }
}
```

Modify the MasonryGrid component to merge these overrides:

```tsx
useEffect(() => {
  async function loadMetadata() {
    try {
      // Load base metadata
      const metadataRes = await fetch('/image-metadata.json');
      const metadata = await metadataRes.json();
      
      // Load overrides
      try {
        const overridesRes = await fetch('/image-metadata-overrides.json');
        const overrides = await overridesRes.json();
        
        // Merge overrides with base metadata
        if (overrides.images) {
          Object.entries(overrides.images).forEach(([path, data]) => {
            if (metadata.images[path]) {
              metadata.images[path] = {
                ...metadata.images[path],
                ...data
              };
            }
          });
        }
      } catch (e) {
        // No overrides file or invalid JSON, continue with base metadata
      }
      
      setMetadata(metadata.images || {});
    } catch (error) {
      console.error('Failed to load image metadata:', error);
    }
  }
  
  loadMetadata();
}, []);
```

## Batch Processing

For batch operations on metadata:

### 1. Adding Tags to Multiple Images

Create a script for batch tagging:

```javascript
// In scripts/batch-tag-images.js
const fs = require('fs');
const path = require('path');

// Load existing metadata
const metadataPath = path.join(__dirname, '../public/image-metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

// Define batch operation
const addTagsToCategory = (category, tags) => {
  if (!metadata.categories[category]) return;
  
  metadata.categories[category].forEach(imagePath => {
    if (!metadata.images[imagePath]) return;
    
    // Create tags array if it doesn't exist
    if (!metadata.images[imagePath].tags) {
      metadata.images[imagePath].tags = [];
    }
    
    // Add new tags if they don't already exist
    tags.forEach(tag => {
      if (!metadata.images[imagePath].tags.includes(tag)) {
        metadata.images[imagePath].tags.push(tag);
      }
    });
  });
};

// Execute batch operation
addTagsToCategory('event', ['professional', 'documentary']);

// Save updated metadata
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
console.log('Batch tag operation completed successfully');
```

### 2. Setting Featured Images

```javascript
// In scripts/set-featured-images.js
const fs = require('fs');
const path = require('path');

// Load existing metadata
const metadataPath = path.join(__dirname, '../public/image-metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

// Define featured images
const featuredImages = [
  'portraits/executive-01.jpg',
  'events/conference-05.jpg',
  'families/park-session-02.jpg',
  'couples/engagement-sunset-01.jpg'
];

// Reset all featured flags
Object.keys(metadata.images).forEach(imagePath => {
  metadata.images[imagePath].isFeatured = false;
});

// Set featured images
featuredImages.forEach(imagePath => {
  if (metadata.images[imagePath]) {
    metadata.images[imagePath].isFeatured = true;
  }
});

// Save updated metadata
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
console.log('Featured images updated successfully');
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Missing Metadata for New Images

**Symptoms**: New images show incorrect proportions or have fallback dimensions.

**Solutions**:
- Ensure you've run `npm run generate-image-metadata` after adding new images
- Check if the image format is supported (JPEG, PNG, GIF, WebP)
- Verify the images are in the correct directory under `/public/images/`
- Run the generator with verbose logging:
  ```bash
  npm run generate-image-metadata -- --verbose
  ```

#### 2. Incorrect Aspect Ratios

**Symptoms**: Images appear stretched or compressed in the gallery.

**Solutions**:
- Manually verify the metadata for the specific image in `image-metadata.json`
- Check if the image was properly analyzed by re-running the generator
- Add manual overrides for problematic images
- Ensure the MasonryGrid component is receiving the correct metadata

#### 3. Category Filtering Issues

**Symptoms**: Images don't appear under the expected category filters.

**Solutions**:
- Verify the directory structure matches the expected categories
- Check the category metadata for each image
- Update the file naming to better reflect the correct categories
- Add manual category assignments for specific images

#### 4. Performance Issues with Large Galleries

**Symptoms**: Slow loading or rendering of the gallery with many images.

**Solutions**:
- Limit initial loaded images and implement pagination or "Load More"
- Optimize image file sizes
- Implement lazy loading for off-screen images
- Consider breaking very large galleries into separate pages

#### 5. Metadata Not Reflecting Directory Changes

**Symptoms**: Moving images between directories doesn't update their categories.

**Solutions**:
- Completely regenerate the metadata file:
  ```bash
  npm run generate-image-metadata -- --force
  ```
- Delete the existing metadata file before regenerating
- Verify file permissions allow writing to the metadata file

### 6. Issues with Optimized Image Recognition

**Symptoms**: The system is not properly identifying optimized WebP images.

**Solutions**:
- Verify the `isOptimized` flag is being correctly set in the metadata
- Check that the generation script is correctly processing paths in the `/images/optimized/` directory
- Ensure the `getOptimizedImagePath` utility function is working correctly:
  ```bash
  # Use Node REPL to test the function
  node -e "const { getOptimizedImagePath } = require('./lib/utils'); console.log(getOptimizedImagePath('/images/portraits/portrait-1.jpg'));"
  # Should output: /images/optimized/portraits/portrait-1.webp
  ```
- Regenerate metadata with the fixed script by running:
  ```bash
  npm run generate-image-metadata
  ```

## Conclusion

The image metadata system is a crucial component of the Jason Holt Photography website's gallery functionality. By maintaining accurate metadata about image dimensions, categories, and presentation attributes, it enables a responsive and visually appealing masonry grid layout that properly showcases photography work.

The integration of the path normalization utility with the metadata system ensures that optimized WebP images are consistently used throughout the gallery, improving load times and visual quality. The `isOptimized` flag in the metadata helps identify which images have been processed and where optimization opportunities still exist.

For large-scale image management, combine this system with the processes outlined in the Image Management Guide to create a comprehensive workflow for handling new imagery.
