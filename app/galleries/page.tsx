"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/ui/masonry-grid"
import { EnhancedLightbox } from "@/components/ui/enhanced-lightbox"
import { GalleryFilters } from "@/components/ui/gallery-filters"
import { getOptimizedImagePath } from "@/lib/utils"

// Import the GalleryImage type from MasonryGrid to ensure type compatibility
interface GalleryImage {
  src: string
  alt: string
  category?: string
  date?: string
  location?: string
}

// Simple function to create a date string from a file number
const createDateFromIndex = (index: number, baseYear: number = 2023): string => {
  const month = ((index % 12) + 1).toString().padStart(2, '0');
  const day = ((index % 28) + 1).toString().padStart(2, '0');
  const yearOffset = Math.floor(index / 24); 
  return `${baseYear - yearOffset}-${month}-${day}`;
};

// Fisher-Yates shuffle algorithm - simple and effective
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GalleriesPage() {
  // One state object for all gallery images, organized by category
  const [galleryImages, setGalleryImages] = useState<Record<string, GalleryImage[]>>({
    portraits: [],
    headshots: [],
    family: [],
    events: [],
    engagements: [],
    weddings: []
  });
  
  // Basic UI states
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("random");
  
  // Load all images at once with a single function
  useEffect(() => {
    async function loadAllImages() {
      console.log('Gallery: Loading images...');
      setIsLoading(true);
      
      try {
        // Fetch image metadata
        const response = await fetch('/image-metadata.json');
        if (!response.ok) throw new Error('Failed to load image metadata');
        const data = await response.json();
        
        // Process metadata into categories
        const categories: Record<string, GalleryImage[]> = {
          portraits: [],
          headshots: [],
          family: [],
          events: [],
          engagements: [],
          weddings: []
        };
        
        // Process each image path
        Object.keys(data.images).forEach(path => {
          // Determine category from path
          const imagePath = path.startsWith('/') ? path : `/${path}`;
          
          // Extract category from path using simple regex patterns
          let category: keyof typeof categories | null = null;
          
          if (imagePath.match(/\/(optimized\/)?portraits\//i)) category = 'portraits';
          else if (imagePath.match(/\/(optimized\/)?headshots\//i)) category = 'headshots';
          else if (imagePath.match(/\/(optimized\/)?family\//i)) category = 'family';
          else if (imagePath.match(/\/(optimized\/)?events\//i)) category = 'events';
          else if (imagePath.match(/\/(optimized\/)?couples\//i)) category = 'engagements';
          else if (imagePath.match(/\/(optimized\/)?weddings\//i)) category = 'weddings';
          
          if (category) {
            // Extract a numeric part for date generation
            const numMatch = imagePath.match(/\d+/);
            const num = numMatch ? parseInt(numMatch[0], 10) : 0;
            
            // Create the image object with consistent metadata
            const optimizedPath = getOptimizedImagePath(imagePath);
            categories[category].push({
              src: optimizedPath,
              alt: `${category.charAt(0).toUpperCase() + category.slice(1)} photography`,
              category,
              date: createDateFromIndex(num),
              location: imagePath.includes('event') ? 'Event Venue' : 
                        category === 'portraits' ? 'Portrait Studio' :
                        category === 'family' ? 'Outdoor Session' : 
                        'Photography Session'
            });
          }
        });
        
        // Sort each category by date (newest first)
        Object.keys(categories).forEach(key => {
          const category = key as keyof typeof categories;
          categories[category].sort((a, b) => 
            (b.date || '').localeCompare(a.date || '')
          );
        });
        
        // Update state with processed images
        setGalleryImages(categories);
        console.log('Gallery: Images loaded successfully');
        
        // Log category counts
        Object.keys(categories).forEach(category => {
          console.log(`${category}: ${categories[category as keyof typeof categories].length} images`);
        });
      } catch (error) {
        console.error('Gallery: Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadAllImages();
  }, [refreshKey]); // Only re-run if refreshKey changes
  
  // The displayed images based on category and sort selection
  const displayedImages = useMemo(() => {
    if (isLoading) return [];
    
    // For "all" category, combine and shuffle all images
    if (activeCategory === "all") {
      const allImages = Object.values(galleryImages).flat();
      return sortBy === "random" ? shuffleArray(allImages) : sortImages(allImages, sortBy);
    }
    
    // Otherwise, return the selected category with appropriate sorting
    const categoryImages = galleryImages[activeCategory as keyof typeof galleryImages] || [];
    return sortImages(categoryImages, sortBy);
  }, [galleryImages, activeCategory, sortBy, isLoading]);
  
  // Sorting function for images
  function sortImages(images: GalleryImage[], sortType: string): GalleryImage[] {
    const sorted = [...images]; // Create a copy to avoid mutating the original
    
    switch (sortType) {
      case "newest":
        return sorted.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      case "oldest":
        return sorted.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
      case "az":
        return sorted.sort((a, b) => a.alt.localeCompare(b.alt));
      case "za":
        return sorted.sort((a, b) => b.alt.localeCompare(a.alt));
      case "random":
        return shuffleArray(sorted);
      default:
        return sorted;
    }
  }
  
  // Handler functions
  const handleCategoryChange = (category: string) => setActiveCategory(category);
  const handleSortChange = (sortOption: string) => setSortBy(sortOption);
  const handleRefresh = () => setRefreshKey(Date.now());
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };
  
  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    
    const currentIndex = displayedImages.findIndex(img => img.src === selectedImage.src);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : displayedImages.length - 1;
    } else {
      newIndex = currentIndex < displayedImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(displayedImages[newIndex]);
  };
  
  return (
    <>
      <BackgroundBlobs />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Portfolio</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Photo Gallery
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of captured moments and artistic vision.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="https://shutterbruhs-photography.client-gallery.com" target="_blank" rel="noopener noreferrer">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Access Client Galleries
                </span>
              </Link>
            </Button>
          </div>
        </section>

        {/* Gallery with Filters */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="font-cormorant text-3xl font-semibold text-center mb-6">Browse My Work</h2>
            
            {/* Gallery Filters Component */}
            <div>
              <GalleryFilters 
                categories={Object.keys(galleryImages)}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
              />
              
              {/* Refresh button */}
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefresh}
                  className="text-xs rounded-full px-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Gallery
                </Button>
              </div>
            </div>
          </div>
          
          {/* Loading state or gallery */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
              </div>
              <p className="text-muted-foreground text-sm">Loading gallery images...</p>
            </div>
          ) : (
            <MasonryGrid 
              images={displayedImages}
              onImageClick={openLightbox}
              columns={3}
              gap={4}
            />
          )}
        </section>
      </div>

      {/* Lightbox Component */}
      <EnhancedLightbox 
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        images={displayedImages}
        currentImage={selectedImage}
        onNavigate={navigateLightbox}
      />
    </>
  );
}
