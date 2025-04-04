# Image Optimization Quick Reference

This is a quick reference guide for optimizing images and implementing them in the gallery. For detailed information, see `IMAGE-OPTIMIZATION-GUIDE.md`.

> **IMPORTANT UPDATE**: This reference now includes the path normalization utility (`getOptimizedImagePath`) and the fix for the deprecated `onLoadingComplete` API.

## Commands

```bash
# Run image optimization
cd jhp-next
node scripts/optimize-large-images.js

# Add to build process (in package.json)
"scripts": {
  "optimize-images": "node scripts/optimize-large-images.js",
  "build": "npm run optimize-images && next build"
}
```

## Path Structure & Normalization

| Type | Path Pattern |
|------|--------------|
| Original | `/images/[category]/[filename].[ext]` |
| Optimized | `/images/optimized/[category]/[filename].webp` |
| Thumbnail | `/images/optimized/[category]/[filename]-thumb.webp` |

### Path Normalization Utility

```typescript
// In lib/utils.ts - automatically converts regular paths to optimized paths
export function getOptimizedImagePath(path: string): string {
  // If already optimized, return as is
  if (path.includes('/optimized/')) return path;
  
  // Convert to optimized WebP path
  return path.replace(
    /\/images\/([^/]+)\/([^/]+)\.([^.]+)$/,
    '/images/optimized/$1/$2.webp'
  );
}

// Usage:
import { getOptimizedImagePath } from '@/lib/utils';
<Image src={getOptimizedImagePath('/images/portraits/portrait-1.jpg')} />
```

## Common Issues & Fixes

### 404 Errors
- Check if optimized files exist in `/public/images/optimized/`
- Run optimization script if missing
- Use correct path mapping in code
- Always use fallbacks to original images

### Image Component Implementation

```typescript
// Updated Next.js Image component with path normalization
<Image
  src={getOptimizedImagePath(image.src)}
  alt={image.alt}
  fill
  priority={index < 6}
  loading={index < 12 ? "eager" : "lazy"}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover transition-transform duration-500 group-hover:scale-105"
  onLoad={(e) => {
    // New approach using onLoad instead of deprecated onLoadingComplete
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

### Reshuffle Fix
```typescript
// Better state management with timestamp and counter
const [galleryUpdated, setGalleryUpdated] = useState({
  timestamp: Date.now(),
  count: 0
});

// Update with incremented counter
setGalleryUpdated(prev => ({
  timestamp: Date.now(),
  count: prev.count + 1
}));

// Use in useMemo dependency array
const allImages = useMemo(() => {
  // Shuffling logic...
}, [galleryUpdated]); // Will react to any change in the object
```

## Category Path Recognition

```typescript
// Match both regular and optimized paths with these patterns
const portraitsPattern = /\/(optimized\/)?portraits\//i;
const headshotsPattern = /\/(optimized\/)?headshots\//i;
const eventsPattern = /\/(optimized\/)?events\//i;
const couplesPattern = /\/(optimized\/)?couples\//i;
const familyPattern = /\/(optimized\/)?family\//i;

// Usage:
if (portraitsPattern.test(imagePath)) {
  category = 'portraits';
}
```

## Category Mapping

| Category | Source Folder | Special Handling |
|----------|---------------|------------------|
| Portraits | `/images/portraits/` | Use `getOptimizedImagePath` |
| Weddings | Mixed sources | Events 36-45 + Couples 8,14,20,29 |
| Engagements | `/images/couples/` | Exclude wedding-designated couples |
| Events | `/images/events/` | Exclude wedding-designated events |
| Family | `/images/family/` | Use `getOptimizedImagePath` |
| Headshots | `/images/headshots/` | Use `getOptimizedImagePath` |

## Command Cheat Sheet

```bash
# Generate WebP versions of images
node scripts/optimize-large-images.js

# Generate metadata (with isOptimized flag)
node scripts/generate-image-metadata.js

# Combined script (add to package.json)
"scripts": {
  "optimize-images": "node scripts/optimize-large-images.js && node scripts/generate-image-metadata.js",
  "build": "npm run optimize-images && next build"
}
```

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| 404 for images | Missing optimized file | Run optimization script |
| Deprecated API warning | Using `onLoadingComplete` | Replace with `onLoad` |
| Same image appears twice | Both paths being used | Use `getOptimizedImagePath` consistently |
| Gallery not updating | Boolean state | Use object state with timestamp |
| Wrong category | Path pattern mismatch | Use regex patterns for both path types |

## Component Overview

- **MasonryGrid**: Displays images in responsive grid (uses `getOptimizedImagePath`)
- **GalleryFilters**: Category/sorting controls
- **EnhancedLightbox**: Fullscreen image viewer

## Updated Image Component

```tsx
<Image
  src={getOptimizedImagePath(imageSrc)}
  alt={image.alt}
  fill
  priority={index < 6}
  loading={index < 12 ? "eager" : "lazy"}
  quality={85}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
  className="object-cover transition-transform duration-500"
  onLoad={(e) => {
    const target = e.target as HTMLImageElement;
    target.classList.add('loaded');
    target.style.opacity = '1';
  }}
  style={{
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  }}
/>
