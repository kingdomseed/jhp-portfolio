# Gallery Quick Reference Guide

## Common Tasks

### Adding a New Image
```bash
# 1. Add image to public/images folder
cp your-image.jpeg jhp-next/public/images/

# 2. Regenerate metadata
cd jhp-next && npm run generate-image-metadata

# 3. Add to gallery data in app/galleries/page.tsx
# Find the appropriate category and add your image entry
```

### Changing Spacing Between Images
```typescript
// In app/galleries/page.tsx:
<MasonryGrid 
  images={displayedImages}
  onImageClick={openLightbox}
  columns={3} 
  gap={8}  // Adjust this value (pixels)
/>
```

### Changing Number of Columns
```typescript
// In app/galleries/page.tsx:
<MasonryGrid 
  images={displayedImages}
  onImageClick={openLightbox}
  columns={4}  // Adjust this value
  gap={8}
/>
```

### Available Categories
- `portraits`
- `family`
- `engagements` 
- `events`
- `creative`

### Adding a New Category
1. Add to `galleryImages` in `/app/galleries/page.tsx`
2. Add to `DEFAULT_ASPECT_RATIOS` in `/components/ui/masonry-grid.tsx`

## Component Props Cheat Sheet

| Prop | Type | Purpose | Example |
|------|------|---------|---------|
| `images` | Array | Image data to display | `images={displayedImages}` |
| `columns` | Number | Column count (desktop) | `columns={3}` |
| `gap` | Number | Space between images (px) | `gap={8}` |
| `className` | String | Additional CSS classes | `className="mt-4"` |
| `onImageClick` | Function | Click handler | `onImageClick={openLightbox}` |

## Image Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `src` | String | Yes | Image path (e.g., `/images/photo.jpeg`) |
| `alt` | String | Yes | Descriptive text for accessibility |
| `category` | String | Yes | Must match a gallery category |
| `date` | String | No | Format: "YYYY-MM-DD" (for sorting) |
| `location` | String | No | Where the photo was taken |

## Troubleshooting 

### Missing Aspect Ratio Metadata
```bash
# Regenerate metadata file
npm run generate-image-metadata
```

### View Current Metadata
```bash
# Check if your image has metadata
cat jhp-next/public/image-metadata.json | grep your-image-name
```

### Gallery Components 
- **Masonry Grid**: `/components/ui/masonry-grid.tsx`
- **Gallery Filters**: `/components/ui/gallery-filters.tsx`
- **Enhanced Lightbox**: `/components/ui/enhanced-lightbox.tsx`
- **Gallery Page**: `/app/galleries/page.tsx`
