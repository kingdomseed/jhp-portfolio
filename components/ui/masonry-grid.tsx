"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

// Apple Photos-like grid layout
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
  const gridRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  
  // Responsive columns
  const [responsiveColumns, setResponsiveColumns] = useState(columns)

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

  // Calculate optimal layout for images
  const calculateLayout = useCallback(() => {
    if (!gridRef.current) return
    
    const containerWidth = gridRef.current.clientWidth
    const columnWidth = (containerWidth - (gap * (responsiveColumns - 1))) / responsiveColumns
    
    const visibleImages = images.slice(0, visibleCount)
    const rows: GalleryImage[][] = []
    
    // Group images into rows
    for (let i = 0; i < visibleImages.length; i += responsiveColumns) {
      const row = visibleImages.slice(i, i + responsiveColumns)
      rows.push(row)
    }
    
    // Create grid items
    const items: JSX.Element[] = []
    let currentY = 0
    
    rows.forEach((row, rowIndex) => {
      // Calculate row height based on maintaining aspect ratios
      const rowHeight = 250 // Base height
      
      let currentX = 0
      row.forEach((image, colIndex) => {
        // In a real implementation, you would adjust item dimensions based on actual image aspect ratio
        // For now, we're using fixed dimensions for simplicity
        const itemWidth = columnWidth
        const itemHeight = rowHeight
        
        const key = `${image.src}-${rowIndex}-${colIndex}`
        
        items.push(
          <div
            key={key}
            ref={(el) => {
              if (el) itemsRef.current.set(key, el)
            }}
            className="absolute transition-all duration-300"
            style={{
              left: currentX,
              top: currentY,
              width: itemWidth,
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
                    <h3 className="text-white text-lg font-medium">{image.alt}</h3>
                    <div className="flex items-center mt-1 text-white/80 text-sm">
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
        )
        
        currentX += itemWidth + gap
      })
      
      currentY += rowHeight + gap
    })
    
    setGridItems(items)
    setGridHeight(currentY)
    setHasMore(visibleCount < images.length)
  }, [images, visibleCount, responsiveColumns, gap, onImageClick])
  
  // Recalculate layout when dependencies change
  useEffect(() => {
    calculateLayout()
    
    // Add resize observer to recalculate on container size changes
    if (gridRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        calculateLayout()
      })
      
      resizeObserver.observe(gridRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [calculateLayout])
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, images.length))
  }

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
