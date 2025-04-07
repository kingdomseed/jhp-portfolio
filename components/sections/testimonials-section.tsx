"use client"

import { SectionBackground } from "@/components/ui/section-background"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"

interface TestimonialsSectionProps {
  // Flag to enable/disable the testimonial carousel
  showTestimonials?: boolean
}

export function TestimonialsSection({
  showTestimonials = false,
}: TestimonialsSectionProps) {
  // Sample testimonials (placeholders)
  const testimonials = [
    {
      quote: "Jason made our wedding day so special with his incredible photography. He captured every moment perfectly and made us feel completely at ease. The photos are absolutely stunning!",
      name: "Sarah & Michael",
      role: "Wedding Photography",
      image: "/images/optimized/couples/couple-2.webp",
      rating: 5
    },
    {
      quote: "I was nervous about my portrait session, but Jason made me feel so comfortable. The results were beyond my expectations - he truly captured my personality in every shot.",
      name: "Emily Johnson",
      role: "Portrait Session",
      image: "/images/optimized/headshots/headshot3.webp",
      rating: 5
    },
    {
      quote: "Jason photographed our corporate event and delivered exceptional results. He was professional, unobtrusive, and captured all the key moments. We'll definitely be booking him again!",
      name: "David Williams",
      role: "Corporate Event",
      image: "/images/optimized/headshots/headshot7.webp",
      rating: 5
    },
    {
      quote: "Our family photos turned out amazing! Jason was great with our kids and somehow managed to get everyone looking at the camera at the same time. A true miracle worker!",
      name: "The Andersons",
      role: "Family Session",
      image: "/images/optimized/family/family-2.webp",
      rating: 5
    },
    {
      quote: "The engagement photos Jason took for us are absolutely perfect. He found the most beautiful locations and made us feel so natural in front of the camera.",
      name: "Jessica & Tom",
      role: "Engagement Session",
      image: "/images/optimized/couples/couple-4.webp",
      rating: 5
    }
  ]

  return (
    <SectionBackground variant="secondary" paddingY="xl">
      <div className="mb-16 text-center">
        <h2 className="font-cormorant text-4xl font-semibold md:text-5xl">
          Client Testimonials
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          What my clients are saying about their experience
        </p>
      </div>
      
      {/* Social Proof Metrics */}
      <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-background p-6 text-center shadow-soft">
          <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
            20+
          </div>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Happy Clients
          </p>
        </div>
        <div className="rounded-xl bg-background p-6 text-center shadow-soft">
          <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
            4+
          </div>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Photo Categories
          </p>
        </div>
        <div className="rounded-xl bg-background p-6 text-center shadow-soft">
          <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
            4+
          </div>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Years Experience
          </p>
        </div>
        <div className="rounded-xl bg-background p-6 text-center shadow-soft">
          <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
            25+
          </div>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Events Per Year
          </p>
        </div>
      </div>
      
      {/* Testimonial Carousel - conditionally rendered */}
      {showTestimonials && (
        <div className="relative px-4 md:px-12">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      )}
    </SectionBackground>
  )
}
