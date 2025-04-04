# Image Optimization & Gallery Implementation Guide

This document explains how to optimize images for the Jason Holt Photography website, addressing common issues and providing best practices.

## Table of Contents

1. [Overview of Image Structure](#overview-of-image-structure)
2. [WebP Conversion Process](#webp-conversion-process)
3. [Common Issues and Solutions](#common-issues-and-solutions)
4. [Gallery Component Architecture](#gallery-component-architecture)
5. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)

## Overview of Image Structure

The website uses a specific folder structure for images:

```
/public/images/                      # Original image directory
  ├── couples/                       # Original couples images
  │   ├── couple-1.jpeg
  │   └── ...
  ├── events/                        # Original events images
  │   ├── event-1.jpg
  │   └── ...
  ├── optimized/                     # WebP optimized images
  │   ├── couples/                   # Optimized couples images
  │   │   ├── couple-1.webp          # Full-size WebP
  │   │   ├── couple-1-thumb.webp    # Thumbnail WebP
  │   │   └── ...
  │   ├── events/                    # Optimized events images
  │   │   ├── event-1.webp
  │   │   ├── event-1-thumb.webp
  │   │   └── ...
  │   └── ...
  └── ...
```

This organization separates original images from their optimized versions while preserving category structure.

## WebP Conversion Process

### How the Optimization Script Works

The `optimize-large-images.js` script performs the following:

1. **Scan** images in `/public/images/` (skipping the `optimized` directory)
2. **Identify** large images exceeding 1MB in size
3. **Create** two WebP versions of each large image:
   - A full-size WebP with 80% quality
   - A thumbnail WebP at 400px width with 60% quality
4. **Preserve** the category structure by saving to `/public/images/optimized/[category]/`

### Running the Optimization Script

```bash
# Navigate to the project directory
cd jhp-next

# Run the optimization script
node scripts/optimize-large-images.js
```

The script provides detailed output about the optimization process, including file sizes and space savings.

### Path Mapping

After optimization, images will have these path correspondences:

| Original Image | Optimized WebP | Thumbnail WebP |
|----------------|----------------|----------------|
| `/images/couples/couple-1.jpeg` | `/images/optimized/couples/couple-1.webp` | `/images/optimized/couples/couple-1-thumb.webp` |
| `/images/events/event-1.jpg` | `/images/optimized/events/event-1.webp` | `/images/optimized/events/event-1-thumb.webp` |

## Common Issues and Solutions

### 404 Errors for Optimized Images

**Problem**: Browser console shows 404 (Not Found) errors for optimized image paths.

**Possible Causes**:
- The optimization script hasn't been run
- The path structure in the code doesn't match the actual filesystem
- Code is looking for files in the wrong location

**Solutions**:
1. **Verify optimized files exist**: Check that the `public/images/optimized/` directory contains the expected files
2. **Run the optimization script**: If files are missing, run the script to generate them
3. **Use correct path mappings**: Ensure your code uses the correct path structure:
   ```typescript
   // Incorrect path (common issue)
   const thumbSrc = `/images/category/optimized/filename-thumb.webp`;

   // Correct path
   const thumbSrc = `/images/optimized/category/filename-thumb.webp`;
   ```
4. **Fallback to original images**: If optimized versions aren't available, use the original:
   ```typescript
   // Safe fallback approach
   let imagePath = originalPath;
   const optimizedPath = originalPath.replace(
     /\/images\/([^/]+)\/([^/]+)\.([^.]+)$/,
     '/images/optimized/$1/$2.webp'
   );
   
   // Check if optimized file exists (client-side)
   const img = new Image();
   img.onload = () => { imagePath = optimizedPath; };
   img.onerror = () => { /* Keep using original */ };
   img.src = optimizedPath;
   ```

### Path Structure Mismatches

**Problem**: Confusion about where optimized images should be stored.

**Solution**: Follow this strict convention:
- Original: `/images/[category]/[filename].[ext]`
- Optimized: `/images/optimized/[category]/[filename].webp`
- Thumbnails: `/images/optimized/[category]/[filename]-thumb.webp`

### Reshuffle Functionality Issues

**Problem**: The "Reshuffle All Images" button doesn't properly update the gallery.

**Solution**: 
1. Use an object state with a timestamp instead of a boolean:
   ```typescript
   // Instead of this:
   const [galleryUpdated, setGalleryUpdated] = useState(false);
   
   // Use this:
   const [galleryUpdated, setGalleryUpdated] = useState({ timestamp: Date.now() });
   
   // And update like this:
   setGalleryUpdated({ timestamp: Date.now(), random: Math.random() });
   ```

2. Ensure the `useMemo` dependency array includes the state object:
   ```typescript
   const allImages = useMemo(() => {
     // Shuffling logic...
   }, [galleryUpdated, getAllImages]);
   ```

## Gallery Component Architecture

The gallery uses several key components:

1. **MasonryGrid**: Primary display component that arranges images in a masonry layout
2. **GalleryFilters**: Category and sorting options 
3. **EnhancedLightbox**: Fullscreen image viewer

### Data Flow

```
┌──────────────────┐     ┌─────────────────┐     ┌────────────────┐
│ Image Metadata   │────▶│ Category Filter │────▶│ Sort Function  │
│ (from filesystem)│     │ (by folder)     │     │ (date/alpha)   │
└──────────────────┘     └─────────────────┘     └────────────────┘
           │                                              │
           │                                              ▼
           │                                    ┌────────────────┐
           │                                    │ Shuffle Logic  │
           │                                    │ (for "all")    │
           │                                    └────────────────┘
           │                                              │
           ▼                                              ▼
  ┌──────────────────┐                          ┌────────────────┐
  │ Image Metadata   │                          │ Displayed      │
  │ Generation       │                          │ Image Array    │
  └──────────────────┘                          └────────────────┘
                                                        │
                                                        ▼
                                               ┌────────────────┐
                                               │ MasonryGrid    │
                                               │ Component      │
                                               └────────────────┘
```

## Step-by-Step Implementation Guide

### 1. Run the Optimization Script

```bash
cd jhp-next
node scripts/optimize-large-images.js
```

### 2. Update Image Path Handling

In `masonry-grid.tsx`, ensure you're using the correct path structure for thumbnails:

```typescript
// Low-resolution thumbnail placeholder
const thumbSrc = image.src.includes('/optimized/') 
  ? image.src.replace(/\.(jpg|jpeg|png|webp)$/i, '-thumb.webp')
  : image.src; // Fallback to original image if not optimized
```

### 3. Fix the Reshuffle Functionality

In `galleries/page.tsx`:

```typescript
// Use object state instead of boolean
const [galleryUpdated, setGalleryUpdated] = useState({ timestamp: Date.now() });

// Update with unique values
const handleReshuffle = useCallback(() => {
  setGalleryUpdated({ timestamp: Date.now(), random: Math.random() });
}, []);

// Ensure allImages depends on galleryUpdated
const allImages = useMemo(() => {
  // Shuffling logic
}, [galleryUpdated, getAllImages]); 
```

### 4. Avoid 404 Errors

To prevent 404 errors, use a defensive approach:

```typescript
// Always prefer original images if optimized aren't available
let imageSrc = originalPath;

// Only use optimized if you're sure they exist
if (confirmedOptimizedImagesExist) {
  imageSrc = optimizedPath;
}
```

### 5. Verify Image Categories

Ensure the image categories match the folder structure:

| Category | Source Folder | Wedding Mapping |
|----------|---------------|-----------------|
| Portraits | `/images/portraits/` | |
| Weddings | Created from couples and events | Events 36-45 + Couples 8,14,20,29 |
| Engagements | `/images/couples/` (except wedding photos) | |
| Events | `/images/events/` (except wedding photos) | |
| Family | `/images/family/` | |
| Headshots | `/images/headshots/` | |

### Best Practices

1. **Run optimization during build**: Add the script to your build process:
   ```json
   "scripts": {
     "build": "npm run optimize-images && next build",
     "optimize-images": "node scripts/optimize-large-images.js"
   }
   ```

2. **Use appropriate Next.js Image component options**:
   ```typescript
   <Image
     src={imageSrc}
     alt={image.alt}
     fill
     priority={index < 6} // Prioritize first 6 images
     loading={index < 12 ? "eager" : "lazy"} // Lazy load after first 12
     quality={index < 20 ? 85 : 75} // Higher quality for visible images
     sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
   />
   ```

3. **Test with reduced quality/size first**: Lower the threshold in the optimization script to test with more images:
   ```javascript
   // Test with smaller threshold (e.g., 100KB instead of 1MB)
   const LARGE_IMAGE_THRESHOLD = 100 * 1024; // 100KB
   ```

By following this guide, you should be able to correctly implement WebP image optimization and fix the common issues with the gallery implementation.
