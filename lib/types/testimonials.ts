// Define shared testimonial interfaces

// Base testimonial interface
export interface Testimonial {
  name: string;
  service: string; // or "role" depending on context
  quote: string;
  rating: number;
  image?: string;
  source?: string;
}

// For homepage carousel
export interface CarouselTestimonial {
  quote: string;
  name: string;
  role: string; // aliased as "service" in the Experience page
  image: string;
  rating: number;
  source?: string;
}

// For categorized testimonials on Experience page
export interface TestimonialCollection {
  featured: Testimonial[];
  families: Testimonial[];
  graduates: Testimonial[];
  couples: Testimonial[];
  weddings: Testimonial[];
  professional: Testimonial[];
}
