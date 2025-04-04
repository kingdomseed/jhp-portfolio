# Gallery Debugging Guide

This guide documents solutions to common issues with the image gallery system. It covers the recent fixes implemented to address problems with images not loading and the "All" tab not displaying all images.

## Recent Fixes

### 1. Optimized Path Recognition

**Problem**: The gallery wasn't correctly recognizing optimized WebP image paths in the `/images/optimized/` directory.

**Solution**: Updated the category recognition patterns to handle both original and optimized paths:

```typescript
// Old approach - failed to match optimized paths
if (imagePath.includes('/portraits/')) {
  category = 'portraits';
}

// New approach - matches both original and optimized paths
const portraitsPattern = /\/(optimized\/)?portraits\//i;
if (portraitsPattern.test(imagePath)) {
  category = 'portraits';
}
```

This ensures images are properly categorized regardless of whether they're in the original path or the optimized path.

### 2. Robust State Management

**Problem**: The boolean toggle for `galleryUpdated` state wasn't reliably triggering React's dependency tracking.

**Solution**: Replaced the boolean state with an object containing a timestamp and counter:

```typescript
// Old approach
const [galleryUpdated, setGalleryUpdated] = useState(false);
setGalleryUpdated(prevState => !prevState);

// New approach
const [galleryUpdated, setGalleryUpdated] = useState({
  timestamp: Date.now(),
  count: 0
});
setGalleryUpdated(prev => ({
  timestamp: Date.now(),
  count: prev.count + 1
}));
```

This ensures that each update creates a completely new object reference that React's dependency system can detect.

### 3. Manual Refresh Option

**Problem**: Users had no way to force a refresh if images weren't loading properly.

**Solution**: Added a manual "Refresh Gallery" button that triggers the gallery update state:

```tsx
<Button 
  variant="outline" 
  size="sm"
  onClick={() => {
    const newTimestamp = Date.now();
    setGalleryUpdated(prev => ({
      timestamp: newTimestamp,
      count: prev.count + 1
    }));
  }}
>
  Refresh Gallery
</Button>
```

## Debugging Steps

If you encounter issues with the gallery in the future, follow these steps:

### 1. Check Console Logs

The gallery has extensive logging that provides insights into what's happening:

- **Image Metadata Loading**: Confirms metadata was loaded
- **Image Path Processing**: Shows which paths were found and their categories
- **Category Counts**: Displays how many images were found per category
- **Shuffle Algorithm**: Logs the distribution of images before and after shuffling
- **Filter & Sort**: Shows which images are displayed after filtering and sorting

### 2. Verify Image Paths

If images aren't loading:

1. Check the browser console for 404 errors
2. Ensure WebP optimized versions exist in the `/public/images/optimized/[category]/` directories
3. Verify the paths being used in the gallery match the actual file structure

### 3. Reset the Gallery

If the gallery seems stuck:

1. Click the "Refresh Gallery" button to force a state update
2. Try switching between categories to trigger the filter effect
3. Check that the `galleryUpdated` state is changing (logged in console)

### 4. Update Image Metadata

If the gallery is missing images that exist in the filesystem:

1. Run the metadata generator: `node scripts/generate-image-metadata.js`
2. Refresh the browser to reload the metadata
3. Check the console logs to ensure metadata was loaded correctly

## Common Issues

### Missing Images in "All" Tab

If the "All" tab shows fewer images than expected:

1. Check the category contributions in the console logs:
   ```
   CATEGORY CONTRIBUTIONS TO SHUFFLE:
   portraits: X images
   weddings: Y images
   ...
   ```

2. Verify that each category has the expected number of images

3. Check for any skipped images during path processing (`Skipping` messages in console)

### Double-Loading of Thumbnails and Regular Images

If both thumbnail and regular versions of the same image appear:

1. Review the path generation in `MasonryGrid.tsx` to ensure it's using the correct paths
2. Check for duplicate entries in the image metadata
3. Verify that the WebP conversion script is generating correct output paths

### Browser Freezing or Poor Performance

If the gallery is slow or causes the browser to hang:

1. Consider reducing the number of visible images by adjusting the `visibleCount` initial value
2. Add pagination if the total number of images is very large
3. Optimize image size further - ensure thumbnails are properly sized
