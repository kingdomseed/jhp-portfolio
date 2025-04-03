"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Import the image metadata
let imageMetadata: { 
  images: Record<string, { 
    width: number;
    height: number;
    aspectRatio: number;
    orientation: string;
  }> 
} | null = null;

// Dynamically import the metadata on client side
const loadImageMetadata = async () => {
  try {
    // Only fetch once
    if (!imageMetadata) {
      const response = await fetch('/image-metadata.json');
      if (!response.ok) throw new Error('Failed to load image metadata');
      imageMetadata = await response.json();
      console.log('Loaded image metadata for gallery');
    }
    return imageMetadata;
  } catch (error) {
    console.error('Error loading image metadata:', error);
    return { images: {} };
  }
};

// Default aspect ratio fallbacks based on category
const DEFAULT_ASPECT_RATIOS = {
  'portraits': 0.8, // Portrait orientation (taller than wide)
  'headshots': 1.0, // Square aspect ratio
  'family': 1.5,   // Landscape orientation (wider than tall)
  'engagements': 1.5,
  'events': 1.5,
  'weddings': 1.5, // Wedding photos are often landscape
  'default': 1.5    // Default fallback
};

interface GalleryImage {
  src: string
  alt: string
  category?: string
  date?: string
  location?: string
}

interface MasonryGridProps {
  images: GalleryImage[]
  columns?: number
  gap?: number
  className?: string
  onImageClick: (image: GalleryImage) => void
}

export function MasonryGrid({
  images,
  columns = 3,
  gap = 16,
  className,
  onImageClick
}: MasonryGridProps) {
  const [visibleCount, setVisibleCount] = useState(12)
  const [hasMore, setHasMore] = useState(true)
  const [gridItems, setGridItems] = useState<JSX.Element[]>([])
  const [gridHeight, setGridHeight] = useState(0)
  const [metadata, setMetadata] = useState<typeof imageMetadata>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  // Responsive columns
  const [responsiveColumns, setResponsiveColumns] = useState(columns)

  // Load metadata
  useEffect(() => {
    loadImageMetadata().then(data => {
      setMetadata(data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setResponsiveColumns(1)
      } else if (window.innerWidth < 768) {
        setResponsiveColumns(2)
      } else if (window.innerWidth < 1024) {
        setResponsiveColumns(2)
      } else {
        setResponsiveColumns(columns)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [columns])

  // Helper function to get image aspect ratio
  const getImageAspectRatio = useCallback((image: GalleryImage) => {
    // First try to get aspect ratio from metadata
    if (metadata?.images && metadata.images[image.src]) {
      return metadata.images[image.src].aspectRatio;
    }
    
    // If not found, use category-based fallback
    if (image.category && DEFAULT_ASPECT_RATIOS[image.category as keyof typeof DEFAULT_ASPECT_RATIOS]) {
      return DEFAULT_ASPECT_RATIOS[image.category as keyof typeof DEFAULT_ASPECT_RATIOS];
    }
    
    // Final fallback to default
    return DEFAULT_ASPECT_RATIOS.default;
  }, [metadata]);

  // Calculate optimal layout for images
  const calculateLayout = useCallback(() => {
    if (!gridRef.current) return;
    
    const containerWidth = gridRef.current.clientWidth;
    const columnWidth = (containerWidth - (gap * (responsiveColumns - 1))) / responsiveColumns;
    const visibleImages = images.slice(0, visibleCount);
    
    // Initialize columns
    const columns: { height: number; items: JSX.Element[] }[] = Array.from(
      { length: responsiveColumns },
      () => ({ height: 0, items: [] })
    );
    
    // Distribute images into columns (true masonry layout)
    visibleImages.forEach((image, index) => {
      // Find the shortest column
      const shortestCol = columns.reduce(
        (shortest, col, i) => (col.height < columns[shortest].height ? i : shortest),
        0
      );
      
      // Get aspect ratio for this image
      const aspectRatio = getImageAspectRatio(image);
      
      // Calculate item height based on aspect ratio
      // Width is fixed by column, height is determined by aspect ratio
      const itemWidth = columnWidth;
      const itemHeight = itemWidth / aspectRatio;
      
      // Calculate position
      const colX = shortestCol * (columnWidth + gap);
      const colY = columns[shortestCol].height;
      
      const key = `${image.src}-${index}`;
      
      columns[shortestCol].items.push(
        <div
          key={key}
          className="absolute transition-all duration-300"
          style={{
            left: colX,
            top: colY,
            width: columnWidth,
            height: itemHeight,
            padding: gap / 2,
          }}
        >
          <div 
            className="group relative h-full w-full overflow-hidden rounded-lg cursor-pointer"
            onClick={() => onImageClick(image)}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${100 / responsiveColumns}vw`}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Hover overlay with category info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.category && (
                    <span className="inline-block bg-accent/90 text-white text-xs px-2 py-1 rounded-full mb-2">
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </span>
                  )}
                  <h3 className="text-white text-lg font-medium truncate">{image.alt}</h3>
                  <div className="flex items-center mt-1 text-white/80 text-sm flex-wrap">
                    {image.location && (
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        {image.location}
                      </span>
                    )}
                    {image.date && image.location && <span className="mx-2">•</span>}
                    {image.date && (
                      <span>{image.date}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      // Update column height
      columns[shortestCol].height += itemHeight + gap;
    });
    
    // Combine all items
    const allItems = columns.flatMap(col => col.items);
    
    // Find the tallest column for grid height
    const gridHeight = Math.max(...columns.map(col => col.height));
    
    setGridItems(allItems);
    setGridHeight(gridHeight);
    setHasMore(visibleCount < images.length);
  }, [images, visibleCount, responsiveColumns, gap, onImageClick, getImageAspectRatio]);
  
  // Recalculate layout when dependencies change
  useEffect(() => {
    calculateLayout();
    
    // Add resize observer to recalculate on container size changes
    if (gridRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        calculateLayout();
      });
      
      resizeObserver.observe(gridRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [calculateLayout, metadata]); // Re-run when metadata loads
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, images.length));
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        ref={gridRef} 
        className="relative w-full"
        style={{ 
          height: `${gridHeight}px`,
          marginBottom: "40px" // Add extra margin to prevent overlap with elements below
        }}
      >
        {gridItems}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
