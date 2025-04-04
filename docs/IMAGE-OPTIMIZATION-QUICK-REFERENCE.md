# Image Optimization Quick Reference

This is a quick reference guide for optimizing images and implementing them in the gallery. For detailed information, see `IMAGE-OPTIMIZATION-GUIDE.md`.

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

## Path Structure

| Type | Path Pattern |
|------|--------------|
| Original | `/images/[category]/[filename].[ext]` |
| Optimized | `/images/optimized/[category]/[filename].webp` |
| Thumbnail | `/images/optimized/[category]/[filename]-thumb.webp` |

## Common Issues & Fixes

### 404 Errors
- Check if optimized files exist in `/public/images/optimized/`
- Run optimization script if missing
- Use correct path mapping in code
- Always use fallbacks to original images

### Path Mapping Code
```typescript
// Safe path mapping with fallback
const originalPath = `/images/${category}/${filename}.${extension}`;
let imagePath = originalPath; // Default to original

// Try optimized path if needed
if (useOptimized) {
  const optimizedPath = `/images/optimized/${category}/${filename}.webp`;
  // Use optimized only if it exists or provide fallback
  imagePath = optimizedPath;
}
```

### Reshuffle Fix
```typescript
// Use object state instead of boolean
const [galleryUpdated, setGalleryUpdated] = useState({ timestamp: Date.now() });

// Update with unique values
setGalleryUpdated({ timestamp: Date.now(), random: Math.random() });
```

## Category Mapping

| Category | Source Folder | Special Handling |
|----------|---------------|------------------|
| Portraits | `/images/portraits/` | - |
| Weddings | Mixed sources | Events 36-45 + Couples 8,14,20,29 |
| Engagements | `/images/couples/` | Exclude wedding-designated couples |
| Events | `/images/events/` | Exclude wedding-designated events |
| Family | `/images/family/` | - |
| Headshots | `/images/headshots/` | - |

## Component Overview

- **MasonryGrid**: Displays images in responsive grid
- **GalleryFilters**: Category/sorting controls
- **EnhancedLightbox**: Fullscreen image viewer

## Image Component Best Practices

```tsx
<Image
  src={imageSrc}
  alt={image.alt}
  fill
  priority={index < 6}
  loading={index < 12 ? "eager" : "lazy"}
  quality={85}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
  className="object-cover transition-transform duration-500"
/>
