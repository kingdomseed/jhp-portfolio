"use client"

import { SectionBackground } from "@/components/ui/section-background"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
import { carouselTestimonials } from "@/lib/data/testimonials"

interface TestimonialsSectionProps {
  // Flag to enable/disable the testimonial carousel
  showTestimonials?: boolean
}

export function TestimonialsSection({
  showTestimonials = false,
}: TestimonialsSectionProps) {
  // Use shared data instead of defining it locally
  const testimonials = carouselTestimonials;

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
