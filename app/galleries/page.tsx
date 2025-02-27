"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Define gallery images by category
const galleryImages = {
  portraits: [
    { src: "/images/headshot1.jpeg", alt: "Professional headshot", category: "portraits" },
    { src: "/images/headshot2.jpeg", alt: "Professional headshot", category: "portraits" },
    { src: "/images/headshot3.jpeg", alt: "Professional headshot", category: "portraits" },
    { src: "/images/headshot4.jpeg", alt: "Professional headshot", category: "portraits" },
    { src: "/images/headshot5.jpeg", alt: "Professional headshot", category: "portraits" },
    { src: "/images/headshot6.jpeg", alt: "Professional headshot", category: "portraits" },
    { src: "/images/portrait1.jpeg", alt: "Portrait photography", category: "portraits" },
  ],
  family: [
    { src: "/images/family1.jpeg", alt: "Family photography", category: "family" },
    { src: "/images/family2.jpeg", alt: "Family photography", category: "family" },
    { src: "/images/family3.jpeg", alt: "Family photography", category: "family" },
    { src: "/images/family4.jpeg", alt: "Family photography", category: "family" },
  ],
  engagements: [
    { src: "/images/engagement1.jpeg", alt: "Engagement photography", category: "engagements" },
    { src: "/images/engagement2.jpeg", alt: "Engagement photography", category: "engagements" },
    { src: "/images/couple1.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple2.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple3.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple4.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple5.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple6.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple7.jpeg", alt: "Couple photography", category: "engagements" },
    { src: "/images/couple8.jpeg", alt: "Couple photography", category: "engagements" },
  ],
  events: [
    { src: "/images/event1.jpeg", alt: "Event photography", category: "events" },
    { src: "/images/event2.jpeg", alt: "Event photography", category: "events" },
    { src: "/images/event3.jpeg", alt: "Event photography", category: "events" },
    { src: "/images/event4.jpeg", alt: "Event photography", category: "events" },
    { src: "/images/event5.jpeg", alt: "Event photography", category: "events" },
    { src: "/images/event6.jpeg", alt: "Event photography", category: "events" },
    { src: "/images/event-07.jpg", alt: "Event photography", category: "events" },
    { src: "/images/event-08.jpg", alt: "Event photography", category: "events" },
    { src: "/images/event-09.jpg", alt: "Event photography", category: "events" },
    { src: "/images/event-10.jpg", alt: "Event photography", category: "events" },
  ],
  creative: [
    { src: "/images/creative1.jpeg", alt: "Creative photography", category: "creative" },
    { src: "/images/creative2.jpeg", alt: "Creative photography", category: "creative" },
  ],
};

// Combine all images for the "all" category
const allImages = [
  ...galleryImages.portraits,
  ...galleryImages.family,
  ...galleryImages.engagements,
  ...galleryImages.events,
  ...galleryImages.creative,
];

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

export default function GalleriesPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
    setLightboxOpen(true);
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

        {/* Gallery Categories */}
        <section className="mb-16">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="portraits">Portraits</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="engagements">Engagements</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <GalleryGrid images={allImages} openLightbox={openLightbox} />
            </TabsContent>
            <TabsContent value="portraits">
              <GalleryGrid images={galleryImages.portraits} openLightbox={openLightbox} />
            </TabsContent>
            <TabsContent value="family">
              <GalleryGrid images={galleryImages.family} openLightbox={openLightbox} />
            </TabsContent>
            <TabsContent value="engagements">
              <GalleryGrid images={galleryImages.engagements} openLightbox={openLightbox} />
            </TabsContent>
            <TabsContent value="events">
              <GalleryGrid images={galleryImages.events} openLightbox={openLightbox} />
            </TabsContent>
            <TabsContent value="creative">
              <GalleryGrid images={galleryImages.creative} openLightbox={openLightbox} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Client Gallery Integration */}
        <section className="mb-16">
          <Card className="p-6">
            <div className="relative w-full" style={{ minHeight: "425px" }}>
              <iframe 
                id="cloudspotIframe"
                src="https://shutterbruhs-photography.client-gallery.com/?nav=false" 
                className="w-full h-full absolute inset-0 border-0"
                style={{ minHeight: "425px" }}
              />
            </div>
          </Card>
        </section>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border">
          <div className="relative w-full h-full p-4">
            {selectedImage && (
              <div className="relative w-full" style={{ height: "calc(100vh - 200px)", maxHeight: "800px" }}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Gallery Grid Component
function GalleryGrid({ 
  images, 
  openLightbox 
}: { 
  images: { src: string; alt: string }[]; 
  openLightbox: (image: { src: string; alt: string }) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div 
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
          onClick={() => openLightbox(image)}
        >
          <AspectRatio ratio={index % 3 === 0 ? 3/4 : index % 3 === 1 ? 1 : 4/3}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}
