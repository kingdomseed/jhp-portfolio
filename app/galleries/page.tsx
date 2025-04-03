"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/ui/masonry-grid"
import { EnhancedLightbox } from "@/components/ui/enhanced-lightbox"
import { GalleryFilters } from "@/components/ui/gallery-filters"

// Image metadata - dynamically loaded from Next.js public directory structure
interface GalleryImage {
  src: string
  alt: string
  category?: string
  date?: string
  location?: string
}

// Function to create a date string from a file number or index
const createDateFromIndex = (index: number, baseYear: number = 2023): string => {
  // Deterministic but distributed dates based on the index
  const month = ((index % 12) + 1).toString().padStart(2, '0');
  const day = ((index % 28) + 1).toString().padStart(2, '0');
  const yearOffset = Math.floor(index / 24); // Every 24 images moves back a year
  return `${baseYear - yearOffset}-${month}-${day}`;
};

// Image metadata initialized with empty arrays - will be filled at runtime
const galleryImages: Record<string, GalleryImage[]> = {
  portraits: [],
  weddings: [],
  engagements: [],
  events: [],
  family: [],
  headshots: []
};

// Wedding event numbers to exclude from events category
const weddingEventNumbers = Array.from({ length: 10 }, (_, i) => i + 36); // 36-45
// Couples photos to exclude from engagements category (used in weddings)
const weddingCoupleNumbers = [8, 14, 20, 29];

// Wedding images come from both couples and events directories
const weddingImages = [
  // From events directory - specifically events 36-45
  ...Array.from({ length: 10 }, (_, i) => {
    const eventNum = i + 36;
    return {
      src: `/images/events/event-${eventNum}.jpg`,
      alt: `Wedding event ${i + 1}`,
      category: 'weddings',
      date: '2024-02-28',
      location: 'Garden Venue'
    };
  }),
  // From couples directory - specific wedding-appropriate couples
  {
    src: '/images/couples/couple-8.jpeg',
    alt: "Couple's ceremony",
    category: 'weddings',
    date: '2024-01-15',
    location: 'Rustic Venue'
  },
  {
    src: '/images/couples/couple-14.jpg',
    alt: 'Romantic wedding moment',
    category: 'weddings',
    date: '2024-01-10',
    location: 'Beach Wedding'
  },
  {
    src: '/images/couples/couple-20.jpg',
    alt: 'Wedding portrait',
    category: 'weddings',
    date: '2023-12-18',
    location: 'Church'
  },
  {
    src: '/images/couples/couple-29.jpg',
    alt: 'Elegant wedding',
    category: 'weddings',
    date: '2023-11-05',
    location: 'Historic Venue'
  },
];

// Set weddings category directly
galleryImages.weddings = weddingImages;


// No service cards needed anymore

// Define the GalleryImage type
interface GalleryImage {
  src: string
  alt: string
  category?: string
  date?: string
  location?: string
}

export default function GalleriesPage() {
  // State to force re-render when gallery is updated
  const [galleryUpdated, setGalleryUpdated] = useState(false);
  
  // Load and process image metadata from the public directory
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;
    
    const loadMetadata = async () => {
      try {
        const response = await fetch('/image-metadata.json');
        if (!response.ok) throw new Error('Failed to load image metadata');
        
        const data = await response.json();
        const metadata = data.images;
        
        // Temporary containers for each category
        const portraits: GalleryImage[] = [];
        const headshots: GalleryImage[] = [];
        const family: GalleryImage[] = [];
        const events: GalleryImage[] = [];
        const engagements: GalleryImage[] = [];
        
        // Process each image path from the metadata
        Object.keys(metadata).forEach(path => {
          // Clean up the path for processing
          const imagePath = path.startsWith('/') ? path : `/${path}`;
          
          // Skip non-image files
          if (!imagePath.match(/\.(jpg|jpeg|png|webp)$/i)) return;
          
          // Extract key information from path
          let category: string | null = null;
          let alt = "Photography";
          
          // Determine category from path
          if (imagePath.includes('/portraits/')) {
            category = 'portraits';
            alt = "Portrait photography";
          } else if (imagePath.includes('/headshots/')) {
            category = 'headshots';
            alt = "Professional headshot";
          } else if (imagePath.includes('/family/')) {
            category = 'family';
            alt = "Family photography";
          } else if (imagePath.includes('/events/')) {
            // Skip events 36-45 as they're already in weddings
            const eventMatch = imagePath.match(/\/events\/event-(\d+)/i);
            if (eventMatch) {
              const eventNum = parseInt(eventMatch[1], 10);
              if (weddingEventNumbers.includes(eventNum)) return;
            }
            
            category = 'events';
            alt = "Event photography";
          } else if (imagePath.includes('/couples/')) {
            // Skip specific couples images already in weddings
            const coupleMatch = imagePath.match(/\/couples\/couple-(\d+)/i);
            if (coupleMatch) {
              const coupleNum = parseInt(coupleMatch[1], 10);
              if (weddingCoupleNumbers.includes(coupleNum)) return;
            }
            
            category = 'engagements';
            alt = "Engagement photography";
          }
          
          // If we identified a category, create the image object
          if (category) {
            // Generate a date based on the filename
            const numMatch = imagePath.match(/\d+/);
            const dateNum = numMatch ? parseInt(numMatch[0], 10) : 0;
            const date = createDateFromIndex(dateNum);
            
            // Generate location based on category
            const location = 
              category === 'portraits' ? 'Photography Studio' :
              category === 'headshots' ? 'Professional Studio' :
              category === 'family' ? 'Outdoor Session' :
              category === 'events' ? 'Event Venue' :
              category === 'engagements' ? 'Engagement Session' : '';
            
            // Create the image object
            const imageObj: GalleryImage = {
              src: imagePath,
              alt,
              category,
              date,
              location
            };
            
            // Add to the appropriate category array
            switch(category) {
              case 'portraits': portraits.push(imageObj); break;
              case 'headshots': headshots.push(imageObj); break;
              case 'family': family.push(imageObj); break;
              case 'events': events.push(imageObj); break;
              case 'engagements': engagements.push(imageObj); break;
            }
          }
        });
        
        // Sort each category by date (newest first)
        const sortByDate = (a: GalleryImage, b: GalleryImage) => 
          (b.date || '').localeCompare(a.date || '');
          
        portraits.sort(sortByDate);
        headshots.sort(sortByDate);
        family.sort(sortByDate);
        events.sort(sortByDate);
        engagements.sort(sortByDate);
        
        // Update the gallery images object
        galleryImages.portraits = portraits;
        galleryImages.headshots = headshots;
        galleryImages.family = family;
        galleryImages.events = events;
        galleryImages.engagements = engagements;
        
        // Force re-render with new images
        setGalleryUpdated(prevState => !prevState);
      } catch (error) {
        console.error('Error loading image metadata:', error);
      }
    };
    
    loadMetadata();
  }, []);
  
  // Combine all images for the "all" category and shuffle them
  const allImages = useMemo(() => {
    // Gather all images from all categories
    const combined = [
      ...galleryImages.portraits,
      ...galleryImages.weddings,
      ...galleryImages.family,
      ...galleryImages.engagements,
      ...galleryImages.events,
      ...galleryImages.headshots,
    ];
    
    // Thoroughly shuffle the combined array using Fisher-Yates algorithm
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    
    return combined;
  }, [galleryUpdated]); // React to gallery updates

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(allImages);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  // Handle sort change
  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  // Filter and sort images when category or sort option changes
  useEffect(() => {
    // Skip processing if no images available
    if (!allImages.length) return;
    
    let filteredImages: GalleryImage[];
    
    // Select images based on category
    if (currentCategory === "all") {
      // For "all" category, use the pre-shuffled allImages array
      filteredImages = [...allImages];
    } else {
      // For specific categories, use the images from that category
      filteredImages = [...galleryImages[currentCategory as keyof typeof galleryImages]];
    }
    
    // Apply specific sorting if requested (otherwise keep randomized for "all")
    if (currentCategory !== "all" || ["newest", "oldest", "az", "za"].includes(sortBy)) {
      switch (sortBy) {
        case "newest":
          filteredImages.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
          break;
        case "oldest":
          filteredImages.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
          break;
        case "az":
          filteredImages.sort((a, b) => a.alt.localeCompare(b.alt));
          break;
        case "za":
          filteredImages.sort((a, b) => b.alt.localeCompare(a.alt));
          break;
        case "popular":
          // Shuffle again if popular is explicitly selected
          for (let i = filteredImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredImages[i], filteredImages[j]] = [filteredImages[j], filteredImages[i]];
          }
          break;
      }
    }
    
    // Update displayed images
    setDisplayedImages(filteredImages);
  }, [currentCategory, sortBy, allImages]);

  // Open lightbox with selected image
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  // Navigate between images in lightbox
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
            <GalleryFilters 
              categories={Object.keys(galleryImages)}
              onCategoryChange={handleCategoryChange}
              onSortChange={handleSortChange}
            />
          </div>
          
          {/* Masonry Grid Component with loading optimization */}
          <MasonryGrid 
            images={displayedImages}
            onImageClick={openLightbox}
            columns={3}
            gap={4}
          />
          
          {/* Image Preload Optimization */}
          <div className="hidden">
            {/* Preload the first few images that aren't immediately visible */}
            {displayedImages.slice(12, 20).map((img, index) => (
              <link 
                key={`preload-${index}`} 
                rel="preload" 
                as="image" 
                href={img.src} 
              />
            ))}
          </div>
        </section>
      </div>

      {/* Enhanced Lightbox Component */}
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
