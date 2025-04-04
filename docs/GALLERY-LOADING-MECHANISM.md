# Gallery Loading and Shuffling Mechanism

This document explains the detailed process of how images are loaded and shuffled in the gallery system, specifically addressing the "ALL" tab functionality.

## Overview

The gallery system loads images from multiple categories and combines them into a complete collection for display. The ALL tab shows a balanced mix of images from each category in a randomized order.

## Loading Process

1. **Initial Loading State**
   - All category arrays start empty
   - A loading indicator is displayed to users
   - `isLoading` state prevents premature display of incomplete data

2. **Metadata Loading**
   - Metadata is fetched from `/image-metadata.json` 
   - Each image path is processed and categorized
   - Images are sorted into category arrays (portraits, headshots, family, events, engagements)

3. **Wedding Images Assignment**
   - Wedding images are assigned **after** other categories are processed
   - This ensures all categories are available simultaneously for shuffling

4. **Loading Complete**
   - The `isLoading` state is set to false
   - The gallery update timestamp is changed to trigger a re-render

## Shuffling Algorithm

The gallery uses a custom category-balanced shuffling algorithm that ensures a fair representation of all categories, especially in the initial visible images:

1. **Separate Category Shuffling**
   - Each category's images are independently shuffled first

2. **Round-Robin Selection**
   - The final array is built by selecting one image at a time from each category
   - This ensures even distribution from all categories

3. **Batch Randomization**
   - Small batches of images are shuffled to add additional randomness
   - This prevents too-perfect distribution patterns

4. **Block Randomization**
   - The entire array is divided into blocks
   - Each block is shuffled independently
   - This preserves some category balance while adding true randomness

## Display Process

1. **Visibility Control**
   - Initially, 50 images are visible in the masonry grid
   - More images load as the user scrolls (infinite scrolling)

2. **Category Filtering**
   - When a specific category is selected, only images from that category are shown
   - When "ALL" is selected, the complete shuffled collection is shown

3. **Sorting Options**
   - "newest", "oldest", "az", "za" - Apply specific sorting criteria
   - "popular" - Maintains the shuffled order for the ALL tab

## Refresh Mechanism

The "Refresh Gallery" button triggers a re-shuffle of all images by:

1. Generating a new timestamp
2. Incrementing the gallery update counter
3. This causes the `useMemo` hook for `allImages` to re-execute
4. A completely new shuffle is performed

## Debug Information

Console logs provide detailed information about:

- Number of images in each category
- Pre-shuffle category distribution
- Post-shuffle category distribution
- Shuffle effectiveness (percentage of positions changed)
- First and last 5 images before and after shuffle

## Troubleshooting

If the ALL tab is not showing images from all categories:

1. **Check Browser Console**
   - Look for category counts in "CATEGORY CONTRIBUTIONS TO SHUFFLE" section
   - Verify the pre and post-shuffle distributions 

2. **Verify Loading State**
   - Make sure the loading state is correctly changing to false after all categories are loaded

3. **Test With Refresh Button**
   - Click the "Refresh Gallery" button to trigger a new shuffle
   - This can sometimes resolve temporary issues with category distribution

4. **Check Block Size**
   - The `blockSize` parameter (currently 15) affects the randomness vs. category balance
   - Smaller values preserve more category balance, larger values increase randomness
