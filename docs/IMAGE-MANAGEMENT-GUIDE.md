# Jason Holt Photography Image Management Guide

This guide provides a comprehensive framework for managing the large collection of photography images in the Jason Holt Photography website. It covers the organization, processing, metadata generation, and integration of images into the Next.js application.

## Table of Contents

1. [Image Organization System](#image-organization-system)
2. [Image Processing Workflow](#image-processing-workflow)
3. [Metadata Generation](#metadata-generation)
4. [Gallery Integration](#gallery-integration)
5. [Performance Optimization](#performance-optimization)
6. [Batch Processing Tools](#batch-processing-tools)
7. [Quality Assurance Checklist](#quality-assurance-checklist)

## Image Organization System

### Directory Structure

Images should be organized following this directory structure:

```
/public/images/
├── portraits/
│   ├── headshots/
│   ├── family/
│   └── creative/
├── events/
│   ├── corporate/
│   ├── social/
│   └── performances/
├── couples/
│   ├── engagement/
│   └── wedding/
├── seniors/
└── featured/
    ├── homepage/
    ├── about/
    └── services/
```

### Naming Convention

Follow this naming pattern for all images:

```
[category]-[subcategory]-[sequence]-[descriptor].[extension]
```

Examples:
- `portrait-headshot-01-businesswoman.jpeg`
- `event-corporate-05-conference.jpeg`
- `couple-engagement-12-parkview.jpeg`

This naming convention:
- Makes images easily identifiable
- Helps with sorting and filtering
- Provides context for SEO and accessibility
- Maintains consistency across the site

## Image Processing Workflow

### 1. Preparation

Before processing new images:

1. Create a backup of all original high-resolution images
2. Sort images into appropriate categories based on content
3. Review and select the best images for website inclusion
4. Document any special handling requirements (e.g., specific cropping, featured placement)

### 2. Optimization Process

For each batch of new images:

1. **Resize Images**
   - Standard display: 1200px on the long edge
   - Thumbnails: 400px on the long edge
   - Hero images: 1920px width
   - Maintain aspect ratios during resizing

2. **Format Optimization**
   - Convert to WebP where possible with JPEG fallbacks
   - Use appropriate compression settings:
     - JPEG: 80-85% quality
     - WebP: 75-80% quality

3. **Metadata Stripping**
   - Remove EXIF data except for:
     - Creation date (for sorting)
     - Copyright information
     - Alt text/descriptions if embedded

### 3. Image Variants

For key images, create multiple variants:

- **Full Size**: For lightbox viewing (max 1800px)
- **Display Size**: For gallery display (max 1200px)
- **Thumbnail**: For previews (max 400px)
- **Placeholder**: Tiny blurred version for lazy loading (20px)

## Metadata Generation

The website uses a custom metadata generation system to extract and store image dimensions for the masonry grid layout.

### Running the Metadata Generator

After adding new images, run the metadata generator:

```bash
cd jhp-next
npm run generate-image-metadata
```

This script:
1. Scans all images in the `/public/images/` directory
2. Calculates dimensions and aspect ratios
3. Generates `/public/image-metadata.json`

### Manual Metadata Additions

For enhanced gallery functionality, add these properties to image metadata manually:

```json
{
  "images": {
    "portrait-headshot-01.jpeg": {
      "width": 800,
      "height": 1200,
      "aspectRatio": 0.67,
      "category": "portrait",
      "subcategory": "headshot",
      "dateTaken": "2023-09-15",
      "location": "Frankfurt Studio",
      "description": "Professional headshot with natural lighting",
      "isFeatured": true,
      "tags": ["corporate", "professional", "indoor"]
    }
  }
}
```

### Batch Metadata Editor

For large image collections, use the batch metadata script:

```bash
# Automatically add category and subcategory based on directory structure
npm run batch-update-metadata
```

## Gallery Integration

### Category Mapping

Ensure all images are mapped to appropriate gallery categories:

| Directory | Gallery Category | Subcategories |
|-----------|------------------|--------------|
| portraits/ | Portraits | Headshots, Family, Creative |
| events/ | Events | Corporate, Social, Performance |
| couples/ | Couples | Engagement, Wedding |
| seniors/ | Seniors | - |

### Featured Image Selection

Select featured images for:

1. **Homepage Carousel**: 5-7 best images representing different services
2. **Category Headers**: 1 showcase image per category
3. **About Page**: 3-5 behind-the-scenes or personal images
4. **Services Page**: 1-2 images per service type

## Performance Optimization

### Image Loading Strategy

The site uses a sophisticated image loading approach:

1. **Priority Images**: Above-the-fold images load immediately
2. **Progressive Loading**: Use blur-up technique for smooth loading experience
3. **Lazy Loading**: Below-fold images only load when needed
4. **Responsive Sizing**: Serve appropriate image sizes based on viewport

### Implementation Details

Use Next.js Image component with these optimizations:

```tsx
import Image from 'next/image';
import { getOptimizedImagePath } from '@/lib/utils';

// For standard gallery images
<Image
  src={getOptimizedImagePath(`/images/portraits/${imageName}`)}
  alt="Portrait description"
  width={originalWidth}
  height={originalHeight}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  onLoad={(e) => {
    const target = e.target as HTMLImageElement;
    target.classList.add('loaded');
    // Fade in the image when loaded
    target.style.opacity = '1';
  }}
  style={{
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  }}
/>

// For priority hero images
<Image
  src={getOptimizedImagePath("/images/featured/homepage/hero.jpeg")}
  alt="Jason Holt Photography - Professional portraits in Frankfurt"
  priority
  quality={90}
  fill
  sizes="100vw"
  style={{ objectFit: 'cover' }}
/>
```

The `getOptimizedImagePath` utility ensures all images use the optimized WebP versions when available:

```typescript
// In lib/utils.ts
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

## Batch Processing Tools

### Image Optimization Script

A custom script is available for batch processing images:

```bash
cd jhp-next/scripts
node optimize-images.js --directory=../public/images/portraits --quality=80
```

Options:
- `--directory`: Target directory
- `--quality`: Compression quality (0-100)
- `--resize`: Max width in pixels
- `--format`: Output format (webp, jpeg)
- `--strip`: Remove metadata

### Automation with npm Scripts

Added to package.json:

```json
"scripts": {
  "optimize-images": "node scripts/optimize-images.js",
  "generate-image-metadata": "node scripts/generate-image-metadata.js",
  "process-new-images": "npm run optimize-images && npm run generate-image-metadata"
}
```

## Quality Assurance Checklist

Before deploying new images, verify:

- [ ] All images are properly resized and optimized
- [ ] Metadata generation completed successfully with correct `isOptimized` flags
- [ ] Images display correctly in the masonry grid
- [ ] Aspect ratios are preserved
- [ ] Alt text is meaningful and descriptive
- [ ] Images load efficiently on mobile devices
- [ ] No deprecated API warnings appear in the console
- [ ] Lightbox functionality works for all new images
- [ ] Categories and filters work correctly
- [ ] Featured images are displayed in the correct locations
- [ ] Image sort order is appropriate (newest first, etc.)
- [ ] The `getOptimizedImagePath` function is used consistently across the codebase

## Troubleshooting Common Issues

### Missing Metadata

If images aren't displaying correctly due to missing metadata:

1. Check `public/image-metadata.json` for the image entry
2. Run the metadata generator again with `--verbose` flag to see issues
3. Verify the `isOptimized` flag is correctly set for all optimized images
4. Add fallback dimensions manually if needed

### Aspect Ratio Problems

If images appear stretched or cropped incorrectly:

1. Verify the aspect ratio in the metadata file
2. Check that the MasonryGrid component is receiving the correct data
3. Ensure responsive breakpoints are handling the layout properly

### Performance Issues

If image loading is slow:

1. Check image file sizes (aim for <200KB for standard images)
2. Verify proper lazy loading implementation
3. Ensure appropriate image sizes are being served
4. Confirm the `getOptimizedImagePath` function is properly routing to WebP versions
5. Consider implementing pagination for very large galleries

## Conclusion

Proper image management is crucial for a photography website. Following this guide ensures that images are organized, optimized, and displayed correctly while maintaining site performance and visual quality. The system is designed to handle large batches of new images efficiently through automation and consistent workflows.
