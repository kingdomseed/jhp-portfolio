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
    families: [], // Families & Babies
    graduates: [], // Young Adults & Graduates
    couples: [],   // Couples & Engagements
    weddings: [],  // Weddings & Celebrations
    professional: [] // Professional & Corporate
  });
  
  // Basic UI states
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  
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
          families: [], // Families & Babies
          graduates: [], // Young Adults & Graduates
          couples: [],   // Couples & Engagements
          weddings: [],  // Weddings & Celebrations
          professional: [] // Professional & Corporate
        };
        
        // Process each image path
        Object.keys(data.images).forEach(path => {
          // Determine category from path
          const imagePath = path.startsWith('/') ? path : `/${path}`;
          
          // Extract category from path using simple regex patterns
          let category: keyof typeof categories | null = null;
          
          // Map old categories to new focus areas
          if (imagePath.match(/\/(optimized\/)?family\//i)) {
            category = 'families'; // Families & Babies
          } 
          else if (imagePath.match(/\/(optimized\/)?portraits\/senior/i)) {
            category = 'graduates'; // Young Adults & Graduates
          }
          else if (imagePath.match(/\/(optimized\/)?headshots\//i)) {
            category = 'professional'; // Professional & Corporate
          }
          else if (imagePath.match(/\/(optimized\/)?couples\//i) || 
                  imagePath.match(/\/(optimized\/)?engagements\//i)) {
            category = 'couples'; // Couples & Engagements
          }
          else if (imagePath.match(/\/(optimized\/)?weddings\//i) || 
                  imagePath.match(/\/(optimized\/)?events\//i)) {
            category = 'weddings'; // Weddings & Celebrations (includes events)
          }
          // If it's a portrait but not a senior portrait, put it in the most appropriate category
          else if (imagePath.match(/\/(optimized\/)?portraits\//i)) {
            if (imagePath.includes('family')) {
              category = 'families';
            } else {
              category = 'graduates'; // Default for other portraits
            }
          }
          
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
  
  // The displayed images based on category selection
  const displayedImages = useMemo(() => {
    if (isLoading) return [];
    
    // For "all" category, combine and shuffle all images
    if (activeCategory === "all") {
      const allImages = Object.values(galleryImages).flat();
      return shuffleArray(allImages);
    }
    
    // Otherwise, return the selected category with date sorting
    const categoryImages = galleryImages[activeCategory as keyof typeof galleryImages] || [];
    // Always sort by newest first for category views
    return [...categoryImages].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [galleryImages, activeCategory, isLoading]);
  
  // Handler functions
  const handleCategoryChange = (category: string) => setActiveCategory(category);
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
            Life&apos;s Journey Through My Lens
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From first breaths to graduation caps, engagement rings to wedding bells — 
            browse my portfolio documenting life&apos;s beautiful journey.
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
            <h2 className="font-cormorant text-3xl font-semibold text-center mb-6">Browse By Life Stage</h2>
            
            {/* Category descriptions based on active category */}
            <div className="text-center mb-6">
              {activeCategory === "families" && (
                <p className="text-muted-foreground">Newborn photography, family portraits, childhood milestones, and family gatherings that celebrate your growing journey.</p>
              )}
              {activeCategory === "graduates" && (
                <p className="text-muted-foreground">Senior portraits, graduation sessions, and milestone moments capturing the transition to adulthood.</p>
              )}
              {activeCategory === "couples" && (
                <p className="text-muted-foreground">Proposals, engagements, anniversaries, and intimate couple sessions that document your love story.</p>
              )}
              {activeCategory === "weddings" && (
                <p className="text-muted-foreground">Weddings, vow renewals, celebrations, performances, reunions, and special occasions worth remembering.</p>
              )}
              {activeCategory === "professional" && (
                <p className="text-muted-foreground">Business headshots, corporate teams, workplace branding, and professional profiles that enhance your career story.</p>
              )}
              {activeCategory === "all" && (
                <p className="text-muted-foreground">A journey through all of life&apos;s meaningful moments, from first smiles to forever partnerships.</p>
              )}
            </div>
            
            {/* Gallery Filters Component */}
            <div>
              <GalleryFilters 
                categories={Object.keys(galleryImages)}
                categoryLabels={{
                  families: "Families & Babies",
                  graduates: "Young Adults & Graduates",
                  couples: "Couples & Engagements",
                  weddings: "Weddings & Celebrations",
                  professional: "Professional & Corporate",
                  all: "All Moments"
                }}
                onCategoryChange={handleCategoryChange}
                onRefresh={handleRefresh}
              />
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
        
        {/* CTA Section */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Ready to create your own beautiful memories? Let&apos;s work together to document your special moments.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/bookings">Capture Your Story →</Link>
          </Button>
        </div>
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
