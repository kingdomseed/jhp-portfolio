# Jason Holt Photography Gallery Documentation

This document provides comprehensive instructions for managing and customizing the gallery on your photography website.

## Table of Contents
1. [Adding New Images](#adding-new-images)
2. [Aspect Ratio Handling](#aspect-ratio-handling)
3. [Managing Image Categories](#managing-image-categories)
4. [Adjusting Gallery Layout](#adjusting-gallery-layout)
5. [Customizing the Gallery](#customizing-the-gallery)
6. [Troubleshooting](#troubleshooting)

## Adding New Images

### Step 1: Place Images in the Correct Directory
Images should be added to the `/public/images/` directory. The gallery supports various image formats:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

For optimized images, WebP versions will be stored in the `/public/images/optimized/` directory, mirroring the category structure of the original images.

```bash
# Example of copying images to the public/images folder
cp your-new-images/*.jpeg jhp-next/public/images/
```

### Step 2: Regenerate Image Metadata
After adding new images, you must run the metadata generator script to calculate aspect ratios:

```bash
cd jhp-next
npm run generate-image-metadata
```

This script:
- Scans all images in the `/public/images/` directory (including the `optimized` subdirectory)
- Calculates dimensions and aspect ratios for each image
- Sets the `isOptimized` flag for images in the optimized directory
- Generates `/public/image-metadata.json` with this information
- Automatically runs as part of the build process (`npm run build`)

### Step 3: Optimize Images
For best performance, you should create optimized WebP versions of your images:

```bash
cd jhp-next
node scripts/optimize-large-images.js
```

This creates WebP versions in the `/public/images/optimized/` directory.

### Step 4: Add Images to the Gallery Data
Open `/app/galleries/page.tsx` and locate the `galleryImages` object. Add your new images to the appropriate category:

```typescript
const galleryImages = {
  portraits: [
    // Existing images...
    { 
      src: "/images/portraits/your-new-image.jpeg", 
      alt: "Description of the image", 
      category: "portraits", 
      date: "2024-04-01", 
      location: "Frankfurt Studio" 
    },
  ],
  // Other categories...
};
```

**Note**: The `getOptimizedImagePath` utility will automatically convert these paths to use the optimized WebP versions when they're displayed in the gallery. You don't need to manually reference the optimized paths.

Required properties for each image:
- `src`: Path to the image (relative to /public)
- `alt`: Descriptive text for accessibility
- `category`: The category this image belongs to
- `date`: Date of the photo (used for sorting)
- `location`: Where the photo was taken

## Aspect Ratio Handling

### Automatic Calculation
The aspect ratio calculation happens automatically:

1. **During Build**: When you run `npm run build`, the script `generate-image-metadata.js` calculates dimensions and aspect ratios for all images and stores them in `image-metadata.json`.

2. **During Runtime**: The `MasonryGrid` component loads this JSON file and uses the stored aspect ratios to correctly size each image.

3. **Optimized Image Path Handling**: The system now uses the `getOptimizedImagePath` utility to ensure all images use optimized WebP versions when available.

4. **Fallback System**: If metadata isn't found for an image, the component uses smart fallbacks:
   - First checks metadata for the original path
   - Then checks metadata for the optimized path
   - Then uses category-based defaults (portraits: 0.8, headshots: 1.0, etc.)
   - Final fallback to 1.5 (standard landscape ratio)

### How Aspect Ratios Work
- In the masonry layout, the width is fixed based on columns
- Height is dynamically calculated using: `height = width / aspectRatio`
- This preserves the original proportions of each image
- Portrait images (taller than wide) will have aspect ratios < 1
- Landscape images (wider than tall) will have aspect ratios > 1
- Square images will have aspect ratio = 1

## Managing Image Categories

### Current Categories
The gallery currently supports these categories:
- `portraits`: Professional and artistic portraits
- `family`: Family photo sessions
- `engagements`: Engagement and couple sessions
- `events`: Event photography
- `creative`: Creative and artistic shots

### Adding a New Category

1. **Create the Category**: Add a new key to the `galleryImages` object in `/app/galleries/page.tsx`:

```typescript
const galleryImages = {
  // Existing categories...
  newCategory: [
    { 
      src: "/images/new-category/image1.jpeg", 
      alt: "First new category image", 
      category: "newCategory", 
      date: "2024-04-01", 
      location: "Location" 
    },
    // Add more images...
  ],
};
```

Note that you should place images in a corresponding directory structure under `/public/images/` to match your category naming.

2. **Update DEFAULT_ASPECT_RATIOS**: Add the new category to the default aspect ratios in `/components/ui/masonry-grid.tsx`:

```typescript
const DEFAULT_ASPECT_RATIOS = {
  // Existing entries...
  'newCategory': 1.5, // Use an appropriate default for this type
  'default': 1.5
};
```

## Adjusting Gallery Layout

The gallery layout can be customized by modifying props passed to the `MasonryGrid` component in `/app/galleries/page.tsx`:

```typescript
<MasonryGrid 
  images={displayedImages}
  onImageClick={openLightbox}
  columns={3}       // Number of columns
  gap={8}           // Gap between images in pixels
/>
```

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array | required | Array of image objects to display |
| `columns` | Number | 3 | Number of columns in desktop view |
| `gap` | Number | 16 | Space between images in pixels |
| `className` | String | "" | Additional CSS classes |
| `onImageClick` | Function | required | Handler when an image is clicked |

### Responsive Behavior

The grid automatically adjusts columns based on screen size:
- Mobile (< 640px): 1 column
- Small tablet (< 768px): 2 columns
- Large tablet/desktop (≥ 1024px): Value from `columns` prop

To modify this behavior, edit the `handleResize` function in `/components/ui/masonry-grid.tsx`.

## Customizing the Gallery

### Image Hover Effects
The hover effect on gallery images can be customized in `/components/ui/masonry-grid.tsx`. Look for the `<div className="absolute inset-0 bg-gradient-to-t...">` section.

### Image Loading Animation
The fade-in effect when images load is handled via the `onLoad` event handler:

```tsx
<Image
  // other props...
  style={{
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  }}
  onLoad={(e) => {
    const target = e.target as HTMLImageElement;
    target.classList.add('loaded');
    target.style.opacity = '1';
  }}
/>
```

This replaces the deprecated `onLoadingComplete` prop that was previously used.

### Sorting Options
Sorting options are controlled by the `handleSortChange` function in `/app/galleries/page.tsx`. Current options are:
- `newest`: Sort by date (newest first)
- `oldest`: Sort by date (oldest first)
- `az`: Sort alphabetically by title
- `za`: Sort reverse alphabetically by title
- `popular`: Currently randomized (can be modified to use actual metrics)

To add a new sorting option:
1. Add the option to the `GalleryFilters` component
2. Add a case to the `switch` statement in the `useEffect` hook

### Loading More Images
The gallery loads 12 images initially and adds 8 more each time "Load More" is clicked. To change these values, modify these variables in `/components/ui/masonry-grid.tsx`:
- `const [visibleCount, setVisibleCount] = useState(12)`
- `setVisibleCount(prev => Math.min(prev + 8, images.length))`

## Troubleshooting

### Images Have Incorrect Dimensions

1. **Verify metadata generation**: Check if `/public/image-metadata.json` contains entries for your images
   ```bash
   cat jhp-next/public/image-metadata.json | grep "your-image-name"
   ```

2. **Check optimized paths**: Ensure the metadata includes both original and optimized paths
   ```bash
   cat jhp-next/public/image-metadata.json | grep "optimized" | grep "your-image-name"
   ```

3. **Regenerate metadata**: Run the generator script
   ```bash
   npm run generate-image-metadata
   ```

4. **Check console logs**: Look for "Loaded metadata for gallery" in browser console

### New Category Not Showing

1. Ensure you've added the category to `DEFAULT_ASPECT_RATIOS` in `masonry-grid.tsx`
2. Verify the category name is consistent between `galleryImages` and where you assign it to images
3. Check that the filter tab for the new category appears in the UI

### General Performance Tips

1. **Use optimized WebP images**: Always run the optimization script to create WebP versions
2. **Lazy loading**: The gallery already implements lazy loading with the "Load More" button
3. **Path normalization**: The `getOptimizedImagePath` utility ensures optimized images are used
4. **Image dimensions**: Consider standardizing on common aspect ratios when shooting (helps with layout consistency)
5. **Check for warnings**: Make sure to address any console warnings about deprecated APIs
