"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/ui/masonry-grid"
import { EnhancedLightbox } from "@/components/ui/enhanced-lightbox"
import { GalleryFilters } from "@/components/ui/gallery-filters"

// Define gallery images by category with additional metadata
const galleryImages = {
  portraits: [
    { src: "/images/headshot1.jpeg", alt: "Professional headshot", category: "portraits", date: "2024-02-15", location: "Frankfurt Studio" },
    { src: "/images/headshot2.jpeg", alt: "Corporate portrait", category: "portraits", date: "2024-01-20", location: "Client Office" },
    { src: "/images/headshot3.jpeg", alt: "Creative headshot", category: "portraits", date: "2023-12-05", location: "Frankfurt Studio" },
    { src: "/images/headshot4.jpeg", alt: "Professional profile", category: "portraits", date: "2023-11-18", location: "Outdoor Session" },
    { src: "/images/headshot5.jpeg", alt: "Business portrait", category: "portraits", date: "2023-10-30", location: "Frankfurt Studio" },
    { src: "/images/headshot6.jpeg", alt: "Casual headshot", category: "portraits", date: "2023-09-22", location: "Urban Setting" },
    { src: "/images/portrait1.jpeg", alt: "Artistic portrait", category: "portraits", date: "2023-08-14", location: "Frankfurt Studio" },
  ],
  family: [
    { src: "/images/family1.jpeg", alt: "Family outdoor session", category: "family", date: "2024-02-28", location: "City Park" },
    { src: "/images/family2.jpeg", alt: "Family group portrait", category: "family", date: "2024-01-15", location: "Frankfurt Studio" },
    { src: "/images/family3.jpeg", alt: "Family candid moment", category: "family", date: "2023-11-12", location: "Client Home" },
    { src: "/images/family4.jpeg", alt: "Extended family gathering", category: "family", date: "2023-10-08", location: "Botanical Gardens" },
  ],
  engagements: [
    { src: "/images/engagement1.jpeg", alt: "Engagement session", category: "engagements", date: "2024-03-01", location: "Old Town" },
    { src: "/images/engagement2.jpeg", alt: "Couple portrait", category: "engagements", date: "2024-02-14", location: "Riverside" },
    { src: "/images/couple1.jpeg", alt: "Romantic couple shoot", category: "engagements", date: "2024-01-28", location: "City Center" },
    { src: "/images/couple2.jpeg", alt: "Couple outdoor session", category: "engagements", date: "2023-12-18", location: "Winter Garden" },
    { src: "/images/couple3.jpeg", alt: "Engagement announcement", category: "engagements", date: "2023-11-30", location: "Historic District" },
    { src: "/images/couple4.jpeg", alt: "Couple lifestyle shoot", category: "engagements", date: "2023-10-15", location: "Urban Setting" },
    { src: "/images/couple5.jpeg", alt: "Pre-wedding session", category: "engagements", date: "2023-09-22", location: "Sunset Beach" },
    { src: "/images/couple6.jpeg", alt: "Engagement celebration", category: "engagements", date: "2023-08-30", location: "Rooftop Venue" },
    { src: "/images/couple7.jpeg", alt: "Couple portrait session", category: "engagements", date: "2023-07-15", location: "City Park" },
    { src: "/images/couple8.jpeg", alt: "Engagement lifestyle", category: "engagements", date: "2023-06-20", location: "Cafe Setting" },
  ],
  events: [
    { src: "/images/event1.jpeg", alt: "Corporate event", category: "events", date: "2024-02-25", location: "Conference Center" },
    { src: "/images/event2.jpeg", alt: "Birthday celebration", category: "events", date: "2024-01-30", location: "Private Venue" },
    { src: "/images/event3.jpeg", alt: "Award ceremony", category: "events", date: "2023-12-15", location: "Grand Hotel" },
    { src: "/images/event4.jpeg", alt: "Networking event", category: "events", date: "2023-11-28", location: "Business Center" },
    { src: "/images/event5.jpeg", alt: "Gala dinner", category: "events", date: "2023-10-20", location: "Luxury Hall" },
    { src: "/images/event6.jpeg", alt: "Product launch", category: "events", date: "2023-09-15", location: "Exhibition Center" },
    { src: "/images/event-07.jpg", alt: "Charity fundraiser", category: "events", date: "2023-08-22", location: "Community Center" },
    { src: "/images/event-08.jpg", alt: "Fashion show", category: "events", date: "2023-07-18", location: "Design Studio" },
    { src: "/images/event-09.jpg", alt: "Music concert", category: "events", date: "2023-06-30", location: "Outdoor Stage" },
    { src: "/images/event-10.jpg", alt: "Art exhibition", category: "events", date: "2023-05-25", location: "Gallery Space" },
  ],
  creative: [
    { src: "/images/creative1.jpeg", alt: "Creative portrait concept", category: "creative", date: "2024-02-10", location: "Art Studio" },
    { src: "/images/creative2.jpeg", alt: "Artistic composition", category: "creative", date: "2023-12-05", location: "Frankfurt Studio" },
  ],
};

// Service cards data
const serviceCards = [
  {
    icon: "camera",
    title: "Portraits & Headshots",
    description: "Professional portraits that capture your authentic self. Perfect for individuals and professionals.",
  },
  {
    icon: "users",
    title: "Family Photos",
    description: "Preserving precious family moments with natural beauty. Creating timeless memories together.",
  },
  {
    icon: "star",
    title: "Event Coverage",
    description: "Documenting your special occasions with a journalistic approach. From corporate events to celebrations.",
  },
  {
    icon: "heart",
    title: "Engagement Photos",
    description: "Capturing the joy and romance of your special moment. Beautiful engagement photography.",
  },
];

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
    ...galleryImages.family,
    ...galleryImages.engagements,
    ...galleryImages.events,
    ...galleryImages.creative,
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
    
    // Apply sorting
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
        // For now, we'll just use a random order as a placeholder
        filteredImages.sort(() => Math.random() - 0.5);
        break;
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
        </section>

        {/* Services Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceCards.map((service) => (
              <Card key={service.title} className="p-6 flex flex-col h-full">
                <div className="flex-1 mb-4">
                  <div className="text-primary text-4xl mb-4">
                    <i className={`fas fa-${service.icon}`}></i>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                <Button asChild className="w-full rounded-full">
                  <Link href="/bookings">Book Now</Link>
                </Button>
              </Card>
            ))}
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
            gap={16}
          />
        </section>

        {/* Client Gallery Integration */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="font-cormorant text-3xl font-semibold mb-4">Client Galleries</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access your private gallery with the link provided after your session.
            </p>
          </div>
          
          <Card className="p-6 overflow-hidden">
            <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ minHeight: "425px" }}>
              {/* Custom loading state */}
              <div className="absolute inset-0 flex items-center justify-center bg-background z-10 opacity-100 transition-opacity duration-500" id="gallery-loading">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Loading client gallery...</p>
                </div>
              </div>
              
              <iframe 
                id="cloudspotIframe"
                src="https://shutterbruhs-photography.client-gallery.com/?nav=false" 
                className="w-full h-full absolute inset-0 border-0"
                style={{ minHeight: "425px" }}
                onLoad={() => {
                  const loadingEl = document.getElementById('gallery-loading');
                  if (loadingEl) loadingEl.style.opacity = '0';
                  setTimeout(() => {
                    if (loadingEl) loadingEl.style.display = 'none';
                  }, 500);
                }}
              />
            </div>
          </Card>
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
