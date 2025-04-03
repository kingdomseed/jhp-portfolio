"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/ui/masonry-grid"
import { EnhancedLightbox } from "@/components/ui/enhanced-lightbox"
import { GalleryFilters } from "@/components/ui/gallery-filters"

// Define gallery images by category with additional metadata
const galleryImages = {
  portraits: [
    { src: "/images/portraits/portrait-1.jpg", alt: "Professional portrait", category: "portraits", date: "2024-02-15", location: "Frankfurt Studio" },
    { src: "/images/portraits/portrait-2.jpg", alt: "Artistic portrait", category: "portraits", date: "2024-01-20", location: "Outdoor Session" },
    { src: "/images/portraits/portrait-3.jpg", alt: "Moody portrait", category: "portraits", date: "2023-12-05", location: "Urban Setting" },
    { src: "/images/portraits/portrait-4.jpg", alt: "Fashion portrait", category: "portraits", date: "2023-11-18", location: "City Center" },
    { src: "/images/portraits/senior-1.jpeg", alt: "Senior portrait", category: "portraits", date: "2023-10-30", location: "Park" },
    { src: "/images/portraits/senior-2.jpg", alt: "Graduate portrait", category: "portraits", date: "2023-09-22", location: "Campus" },
    { src: "/images/portraits/senior-3.jpeg", alt: "Senior session", category: "portraits", date: "2023-08-14", location: "Urban Setting" },
    { src: "/images/portraits/senior-5.jpeg", alt: "Professional senior portrait", category: "portraits", date: "2023-07-10", location: "Studio" },
    { src: "/images/portraits/senior-8.jpeg", alt: "Creative senior photo", category: "portraits", date: "2023-06-15", location: "Outdoor" },
    { src: "/images/portraits/senior-12.jpeg", alt: "Casual senior portrait", category: "portraits", date: "2023-05-20", location: "Downtown" },
  ],
  weddings: [
    // Using selected event photos that are from a wedding (36-45)
    { src: "/images/events/event-36.jpg", alt: "Wedding ceremony", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-37.jpg", alt: "Bride and groom", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-38.jpg", alt: "Wedding details", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-39.jpg", alt: "Wedding party", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-40.jpg", alt: "Wedding reception", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-41.jpg", alt: "First dance", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-42.jpg", alt: "Wedding guests", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-43.jpg", alt: "Wedding portraits", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-44.jpg", alt: "Wedding cake", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    { src: "/images/events/event-45.jpg", alt: "Cutting the cake", category: "weddings", date: "2024-02-28", location: "Garden Venue" },
    // Including selected couples photos as requested
    { src: "/images/couples/couple-8.jpeg", alt: "Couple's ceremony", category: "weddings", date: "2024-01-15", location: "Rustic Venue" },
    { src: "/images/couples/couple-14.jpg", alt: "Romantic wedding moment", category: "weddings", date: "2024-01-10", location: "Beach Wedding" },
    { src: "/images/couples/couple-20.jpg", alt: "Wedding portrait", category: "weddings", date: "2023-12-18", location: "Church" },
    { src: "/images/couples/couple-29.jpg", alt: "Elegant wedding", category: "weddings", date: "2023-11-05", location: "Historic Venue" },
  ],
  engagements: [
    { src: "/images/couples/couple-1.jpeg", alt: "Engagement session", category: "engagements", date: "2024-03-01", location: "Old Town" },
    { src: "/images/couples/couple-2.jpeg", alt: "Couple portrait", category: "engagements", date: "2024-02-14", location: "Riverside" },
    { src: "/images/couples/couple-3.jpeg", alt: "Romantic couple shoot", category: "engagements", date: "2024-01-28", location: "City Center" },
    { src: "/images/couples/couple-4.jpeg", alt: "Couple outdoor session", category: "engagements", date: "2023-12-18", location: "Winter Garden" },
    { src: "/images/couples/couple-5.jpeg", alt: "Engagement announcement", category: "engagements", date: "2023-11-30", location: "Historic District" },
    { src: "/images/couples/couple-6.jpeg", alt: "Couple lifestyle shoot", category: "engagements", date: "2023-10-15", location: "Urban Setting" },
    { src: "/images/couples/couple-7.jpeg", alt: "Pre-wedding session", category: "engagements", date: "2023-09-22", location: "Sunset Beach" },
    { src: "/images/couples/couple-9.jpg", alt: "Engagement celebration", category: "engagements", date: "2023-08-30", location: "Rooftop Venue" },
    { src: "/images/couples/couple-11.jpeg", alt: "Couple portrait session", category: "engagements", date: "2023-07-15", location: "City Park" },
    { src: "/images/couples/couple-12.jpg", alt: "Engagement lifestyle", category: "engagements", date: "2023-06-20", location: "Cafe Setting" },
  ],
  events: [
    { src: "/images/events/event-1.jpg", alt: "Corporate event", category: "events", date: "2024-02-25", location: "Conference Center" },
    { src: "/images/events/event-2.jpg", alt: "Birthday celebration", category: "events", date: "2024-01-30", location: "Private Venue" },
    { src: "/images/events/event-3.jpg", alt: "Award ceremony", category: "events", date: "2023-12-15", location: "Grand Hotel" },
    { src: "/images/events/event-4.jpg", alt: "Networking event", category: "events", date: "2023-11-28", location: "Business Center" },
    { src: "/images/events/event-5.jpg", alt: "Gala dinner", category: "events", date: "2023-10-20", location: "Luxury Hall" },
    { src: "/images/events/event-6.jpg", alt: "Product launch", category: "events", date: "2023-09-15", location: "Exhibition Center" },
    { src: "/images/events/event-7.jpg", alt: "Charity fundraiser", category: "events", date: "2023-08-22", location: "Community Center" },
    { src: "/images/events/event-8.jpg", alt: "Fashion show", category: "events", date: "2023-07-18", location: "Design Studio" },
    { src: "/images/events/event-9.jpg", alt: "Music concert", category: "events", date: "2023-06-30", location: "Outdoor Stage" },
    { src: "/images/events/event-10.jpg", alt: "Art exhibition", category: "events", date: "2023-05-25", location: "Gallery Space" },
  ],
  family: [
    { src: "/images/family/family1.jpeg", alt: "Family outdoor session", category: "family", date: "2024-02-28", location: "City Park" },
    { src: "/images/family/family2.jpeg", alt: "Family group portrait", category: "family", date: "2024-01-15", location: "Frankfurt Studio" },
    { src: "/images/family/family3.jpeg", alt: "Family candid moment", category: "family", date: "2023-11-12", location: "Client Home" },
    { src: "/images/family/family4.jpeg", alt: "Extended family gathering", category: "family", date: "2023-10-08", location: "Botanical Gardens" },
    { src: "/images/family/family5.jpeg", alt: "Family lifestyle", category: "family", date: "2023-09-20", location: "Home Setting" },
  ],
  headshots: [
    { src: "/images/headshots/headshot1.jpeg", alt: "Professional headshot", category: "headshots", date: "2024-02-15", location: "Frankfurt Studio" },
    { src: "/images/headshots/headshot2.jpeg", alt: "Corporate portrait", category: "headshots", date: "2024-01-20", location: "Client Office" },
    { src: "/images/headshots/headshot3.jpeg", alt: "Creative headshot", category: "headshots", date: "2023-12-05", location: "Frankfurt Studio" },
    { src: "/images/headshots/headshot4.jpeg", alt: "Professional profile", category: "headshots", date: "2023-11-18", location: "Outdoor Session" },
    { src: "/images/headshots/headshot5.jpeg", alt: "Business portrait", category: "headshots", date: "2023-10-30", location: "Frankfurt Studio" },
    { src: "/images/headshots/headshot6.jpeg", alt: "Casual headshot", category: "headshots", date: "2023-09-22", location: "Urban Setting" },
    { src: "/images/headshots/headshot7.jpeg", alt: "Executive headshot", category: "headshots", date: "2023-08-14", location: "Office Setting" },
    { src: "/images/headshots/headshot8.jpeg", alt: "Professional headshot", category: "headshots", date: "2023-07-10", location: "Studio" },
    { src: "/images/headshots/headshot9.jpeg", alt: "Actor headshot", category: "headshots", date: "2023-06-15", location: "Studio" },
    { src: "/images/headshots/headshot10.jpeg", alt: "Corporate headshot", category: "headshots", date: "2023-05-20", location: "Office" },
  ],
};

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
  // Combine all images for the "all" category
  const allImages = useMemo(() => [
    ...galleryImages.portraits,
    ...galleryImages.weddings,
    ...galleryImages.family,
    ...galleryImages.engagements,
    ...galleryImages.events,
    ...galleryImages.headshots,
  ], []);

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
    const filteredImages = currentCategory === "all" 
      ? [...allImages]
      : [...galleryImages[currentCategory as keyof typeof galleryImages]];
    
    // Randomize the "all" category by default
    if (currentCategory === "all" && sortBy !== "newest" && sortBy !== "oldest" && sortBy !== "az" && sortBy !== "za") {
      // Use Fisher-Yates shuffle algorithm for better randomization
      for (let i = filteredImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredImages[i], filteredImages[j]] = [filteredImages[j], filteredImages[i]];
      }
    } else {
      // Apply sorting for specific sort options
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
          // This would ideally be based on actual popularity metrics
          // For now, we'll just use a random order
          filteredImages.sort(() => Math.random() - 0.5);
          break;
      }
    }
    
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
          
          {/* Masonry Grid Component */}
          <MasonryGrid 
            images={displayedImages}
            onImageClick={openLightbox}
            columns={3}
            gap={4}
          />
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
