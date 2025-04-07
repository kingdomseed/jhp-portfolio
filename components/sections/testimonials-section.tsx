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
        {/* 2 Continents Captured */}
        <div className="rounded-xl bg-background p-6 text-center shadow-soft transition-all duration-300 hover:bg-background/90 hover:shadow-hover">
          <div className="flex flex-col items-center">
            <div className="mb-3 text-primary">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-all duration-300 ease-in-out hover:rotate-[5deg] hover:scale-110"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
              3
            </div>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Continents Captured
            </p>
          </div>
        </div>
        
        {/* 8+ Years Behind the Lens */}
        <div className="rounded-xl bg-background p-6 text-center shadow-soft transition-all duration-300 hover:bg-background/90 hover:shadow-hover">
          <div className="flex flex-col items-center">
            <div className="mb-3 text-primary">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-all duration-300 ease-in-out hover:rotate-[5deg] hover:scale-110"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
              8+
            </div>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Years Behind the Lens
            </p>
          </div>
        </div>
        
        {/* 60+ Events Documented */}
        <div className="rounded-xl bg-background p-6 text-center shadow-soft transition-all duration-300 hover:bg-background/90 hover:shadow-hover">
          <div className="flex flex-col items-center">
            <div className="mb-3 text-primary">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-all duration-300 ease-in-out hover:rotate-[5deg] hover:scale-110"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
            </div>
            <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
              60+
            </div>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Events Documented
            </p>
          </div>
        </div>
        
        {/* 15,000+ Moments Documented */}
        <div className="rounded-xl bg-background p-6 text-center shadow-soft transition-all duration-300 hover:bg-background/90 hover:shadow-hover">
          <div className="flex flex-col items-center">
            <div className="mb-3 text-primary">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-all duration-300 ease-in-out hover:rotate-[5deg] hover:scale-110"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
              15,000+
            </div>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Moments Documented
            </p>
          </div>
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
