"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/ui/masonry-grid"
import { EnhancedLightbox } from "@/components/ui/enhanced-lightbox"
import { GalleryFilters } from "@/components/ui/gallery-filters"
import { getOptimizedImagePath } from "@/lib/utils"

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
      src: `/images/optimized/events/event-${eventNum}.webp`,
      alt: `Wedding event ${i + 1}`,
      category: 'weddings',
      date: '2024-02-28',
      location: 'Garden Venue'
    };
  }),
  // From couples directory - specific wedding-appropriate couples
  {
    src: '/images/optimized/couples/couple-8.webp',
    alt: "Couple's ceremony",
    category: 'weddings',
    date: '2024-01-15',
    location: 'Rustic Venue'
  },
  {
    src: '/images/optimized/couples/couple-14.webp',
    alt: 'Romantic wedding moment',
    category: 'weddings',
    date: '2024-01-10',
    location: 'Beach Wedding'
  },
  {
    src: '/images/optimized/couples/couple-20.webp',
    alt: 'Wedding portrait',
    category: 'weddings',
    date: '2023-12-18',
    location: 'Church'
  },
  {
    src: '/images/optimized/couples/couple-29.webp',
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
  // Using an object with a timestamp ensures the reference changes every time
  const [galleryUpdated, setGalleryUpdated] = useState({
    timestamp: Date.now(),
    count: 0
  });
  
  // Load and process image metadata from the public directory
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;
    
    const loadMetadata = async () => {
      try {
        console.log('=== IMAGE METADATA LOADING ===');
        const response = await fetch('/image-metadata.json');
        if (!response.ok) throw new Error('Failed to load image metadata');
        
        const data = await response.json();
        const metadata = data.images;
        
        console.log(`Loaded metadata for ${Object.keys(metadata).length} images`);
        console.log('Sample paths from metadata:');
        Object.keys(metadata).slice(0, 5).forEach(path => {
          console.log(`  ${path} (Optimized: ${path.includes('/optimized/')})`);
        });
        
        // Temporary containers for each category
        const portraits: GalleryImage[] = [];
        const headshots: GalleryImage[] = [];
        const family: GalleryImage[] = [];
        const events: GalleryImage[] = [];
        const engagements: GalleryImage[] = [];
        
        // Process each image path from the metadata
        console.log('\n=== PROCESSING IMAGE PATHS ===');
        Object.keys(metadata).forEach(path => {
          // Clean up the path for processing
          const imagePath = path.startsWith('/') ? path : `/${path}`;
          
          // Skip non-image files
          if (!imagePath.match(/\.(jpg|jpeg|png|webp)$/i)) {
            console.log(`Skipping non-image file: ${imagePath}`);
            return;
          }
          
          // Extract key information from path
          let category: string | null = null;
          let alt = "Photography";
          
          console.log(`Processing: ${imagePath}`);
          
  // Match against both optimized and regular paths
  // Create regex patterns that will match both /category/ and /optimized/category/
  const portraitsPattern = /\/(optimized\/)?portraits\//i;
  const headshotsPattern = /\/(optimized\/)?headshots\//i;
  const familyPattern = /\/(optimized\/)?family\//i;
  const eventsPattern = /\/(optimized\/)?events\//i;
  const couplesPattern = /\/(optimized\/)?couples\//i;
  
  // Log whether this is an optimized path
  const isOptimized = imagePath.includes('/optimized/');
  console.log(`  Optimized: ${isOptimized}`);

  // Determine category from path
  if (portraitsPattern.test(imagePath)) {
    category = 'portraits';
    alt = "Portrait photography";
    console.log(`  Category: portraits`);
  } else if (headshotsPattern.test(imagePath)) {
    category = 'headshots';
    alt = "Professional headshot";
    console.log(`  Category: headshots`);
  } else if (familyPattern.test(imagePath)) {
    category = 'family';
    alt = "Family photography";
    console.log(`  Category: family`);
  } else if (eventsPattern.test(imagePath)) {
    // Skip events 36-45 as they're already in weddings
    // Extract event number regardless of optimized path
    const eventMatch = imagePath.match(/\/(?:optimized\/)?events\/event-(\d+)/i);
    if (eventMatch) {
      const eventNum = parseInt(eventMatch[1], 10);
      if (weddingEventNumbers.includes(eventNum)) {
        console.log(`  Skipping: event-${eventNum} (already in weddings)`);
        return;
      }
    }
    
    category = 'events';
    alt = "Event photography";
    console.log(`  Category: events`);
  } else if (couplesPattern.test(imagePath)) {
    // Skip specific couples images already in weddings
    // Extract couple number regardless of optimized path
    const coupleMatch = imagePath.match(/\/(?:optimized\/)?couples\/couple-(\d+)/i);
    if (coupleMatch) {
      const coupleNum = parseInt(coupleMatch[1], 10);
      if (weddingCoupleNumbers.includes(coupleNum)) {
        console.log(`  Skipping: couple-${coupleNum} (already in weddings)`);
        return;
      }
    }
    
    category = 'engagements';
    alt = "Engagement photography";
    console.log(`  Category: engagements`);
  } else {
    console.log(`  No category match found`);
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
            
            // Ensure we're using the optimized path
            const optimizedPath = getOptimizedImagePath(imagePath);
            
            // Create the image object
            const imageObj: GalleryImage = {
              src: optimizedPath,
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
        
        // Log final category counts
        console.log('\n=== CATEGORY COUNTS AFTER PROCESSING ===');
        console.log(`portraits: ${portraits.length}`);
        console.log(`headshots: ${headshots.length}`);
        console.log(`family: ${family.length}`);
        console.log(`events: ${events.length}`);
        console.log(`engagements: ${engagements.length}`);
        console.log(`weddings: ${galleryImages.weddings.length} (pre-defined)`);
        
        // Force re-render with new images
        console.log('\n=== TRIGGERING GALLERY UPDATE ===');
        const oldTimestamp = galleryUpdated.timestamp;
        const newTimestamp = Date.now();
        setGalleryUpdated(prev => ({
          timestamp: newTimestamp,
          count: prev.count + 1
        }));
        console.log(`Gallery update timestamp changed: ${oldTimestamp} → ${newTimestamp} (count: ${galleryUpdated.count + 1})`);
      } catch (error) {
        console.error('Error loading image metadata:', error);
      }
    };
    
    loadMetadata();
  }, []);
  
  // Combine all images for the "all" category and shuffle them
  const allImages = useMemo(() => {
    console.log('\n=== SHUFFLE ALGORITHM EXECUTION ===');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Trigger: galleryUpdated = ${JSON.stringify(galleryUpdated)}`);
    
    // Log each category's contribution to the combined array
    console.log('\nCATEGORY CONTRIBUTIONS TO SHUFFLE:');
    console.log(`portraits: ${galleryImages.portraits.length} images`);
    console.log(`weddings: ${galleryImages.weddings.length} images`);
    console.log(`engagements: ${galleryImages.engagements.length} images`);
    console.log(`events: ${galleryImages.events.length} images`);
    console.log(`family: ${galleryImages.family.length} images`);
    console.log(`headshots: ${galleryImages.headshots.length} images`);
    
    // Create and log the combined array before shuffling with source category tags
    const portraitsWithTag = galleryImages.portraits.map(img => ({...img, _sourceCategory: 'portraits'}));
    const weddingsWithTag = galleryImages.weddings.map(img => ({...img, _sourceCategory: 'weddings'}));
    const engagementsWithTag = galleryImages.engagements.map(img => ({...img, _sourceCategory: 'engagements'}));
    const eventsWithTag = galleryImages.events.map(img => ({...img, _sourceCategory: 'events'}));
    const familyWithTag = galleryImages.family.map(img => ({...img, _sourceCategory: 'family'}));
    const headshotsWithTag = galleryImages.headshots.map(img => ({...img, _sourceCategory: 'headshots'}));
    
    const combined = [
      ...portraitsWithTag,
      ...weddingsWithTag,
      ...engagementsWithTag,
      ...eventsWithTag,
      ...familyWithTag,
      ...headshotsWithTag,
    ];
    
    console.log(`\nPRE-SHUFFLE ARRAY: ${combined.length} total images`);
    
    // Log category distribution before shuffle
    const preCategoryCounts: Record<string, number> = {};
    combined.forEach(img => {
      const category = img._sourceCategory as string;
      preCategoryCounts[category] = (preCategoryCounts[category] || 0) + 1;
    });
    console.log('Pre-shuffle category distribution:', preCategoryCounts);
    
    // Log first and last 5 items of pre-shuffled array
    console.log('\nPRE-SHUFFLE FIRST 5 ITEMS:');
    combined.slice(0, 5).forEach((img, i) => {
      console.log(`  ${i}: ${img.src} (${img._sourceCategory})`);
    });
    console.log('\nPRE-SHUFFLE LAST 5 ITEMS:');
    combined.slice(-5).forEach((img, i) => {
      console.log(`  ${combined.length - 5 + i}: ${img.src} (${img._sourceCategory})`);
    });
    
    // Log the shuffling process
    console.log('\nSHUFFLING PROCESS STARTED');
    const shuffled = [...combined];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Log every 50th swap to avoid console flood
      if (i % 50 === 0) {
        console.log(`  Swap ${i}: index ${i} (${shuffled[i]._sourceCategory}) with index ${j} (${shuffled[j]._sourceCategory})`);
      }
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Log category distribution after shuffle
    const postCategoryCounts: Record<string, number> = {};
    shuffled.forEach(img => {
      const category = img._sourceCategory as string;
      postCategoryCounts[category] = (postCategoryCounts[category] || 0) + 1;
    });
    console.log('\nPost-shuffle category distribution:', postCategoryCounts);
    
    // Log first and last 5 items of shuffled array
    console.log('\nPOST-SHUFFLE FIRST 5 ITEMS:');
    shuffled.slice(0, 5).forEach((img, i) => {
      console.log(`  ${i}: ${img.src} (${img._sourceCategory})`);
    });
    console.log('\nPOST-SHUFFLE LAST 5 ITEMS:');
    shuffled.slice(-5).forEach((img, i) => {
      console.log(`  ${shuffled.length - 5 + i}: ${img.src} (${img._sourceCategory})`);
    });
    
    // Analyze if shuffle was effective
    let positionChanges = 0;
    for (let i = 0; i < combined.length; i++) {
      if (combined[i].src !== shuffled[i].src) {
        positionChanges++;
      }
    }
    const changePercentage = (positionChanges / combined.length) * 100;
    console.log(`\nShuffle effectiveness: ${positionChanges}/${combined.length} positions changed (${changePercentage.toFixed(2)}%)`);
    
    // Remove our temporary _sourceCategory tag before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return shuffled.map(({_sourceCategory, ...rest}) => rest);
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
    console.log('\n=== FILTER & SORT EFFECT TRIGGERED ===');
    console.log(`Current category: ${currentCategory}`);
    console.log(`Current sort: ${sortBy}`);
    console.log(`allImages length: ${allImages.length}`);
    
    // Skip processing if no images available
    if (!allImages.length) {
      console.log('No images available, skipping processing');
      return;
    }
    
    let filteredImages: GalleryImage[];
    
    // Select images based on category
    if (currentCategory === "all") {
      console.log('Using pre-shuffled allImages array');
      filteredImages = [...allImages];
      console.log(`Selected ${filteredImages.length} images from "all" category`);
    } else {
      console.log(`Filtering for category: ${currentCategory}`);
      filteredImages = [...galleryImages[currentCategory as keyof typeof galleryImages]];
      console.log(`Selected ${filteredImages.length} images from "${currentCategory}" category`);
    }
    
    // Apply specific sorting if requested (otherwise keep randomized for "all")
    if (currentCategory !== "all" || ["newest", "oldest", "az", "za"].includes(sortBy)) {
      console.log(`Applying sort: ${sortBy}`);
      
      switch (sortBy) {
        case "newest":
          console.log('Sorting by date (newest first)');
          filteredImages.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
          break;
        case "oldest":
          console.log('Sorting by date (oldest first)');
          filteredImages.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
          break;
        case "az":
          console.log('Sorting alphabetically A-Z');
          filteredImages.sort((a, b) => a.alt.localeCompare(b.alt));
          break;
        case "za":
          console.log('Sorting alphabetically Z-A');
          filteredImages.sort((a, b) => b.alt.localeCompare(a.alt));
          break;
        case "popular":
          console.log('Applying random shuffle for "popular" sort');
          // Shuffle again if popular is explicitly selected
          for (let i = filteredImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredImages[i], filteredImages[j]] = [filteredImages[j], filteredImages[i]];
          }
          break;
      }
    } else {
      console.log(`Keeping pre-shuffled order (${sortBy})`);
    }
    
    // Log sample of filtered images
    console.log('\nSample of filtered/sorted images:');
    filteredImages.slice(0, 3).forEach((img, i) => {
      console.log(`  ${i}: ${img.src} (${img.category})`);
    });
    
    // Update displayed images
    console.log(`Updating displayed images: ${filteredImages.length} total`);
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
            <div>
              <GalleryFilters 
                categories={Object.keys(galleryImages)}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
              />
              
              {/* Add a manual refresh button to help force re-rendering */}
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    console.log('\n=== MANUAL GALLERY REFRESH TRIGGERED ===');
                    const newTimestamp = Date.now();
                    setGalleryUpdated(prev => ({
                      timestamp: newTimestamp,
                      count: prev.count + 1
                    }));
                    console.log(`Manual gallery update: timestamp ${newTimestamp} (count: ${galleryUpdated.count + 1})`);
                  }}
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
