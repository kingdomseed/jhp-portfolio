import { Testimonial, TestimonialCollection, CarouselTestimonial } from '../types/testimonials';

// The authentic Google Maps review
const biancaGantt: Testimonial = {
  name: "Bianca Gantt",
  service: "Senior Photo Session",
  quote: "Jason is a true professional! We thoroughly enjoyed working with him for our son&apos;s senior photo shoot. We were able to take those photos and make a beautiful graduation announcement for our son. Patient, kind and talented. Trust me book him for your photo needs!!!!",
  rating: 5,
  image: "/images/optimized/portraits/senior-26.webp",
  source: "Google Maps Review (as Shutterbruhs)"
};

// For the homepage carousel
export const carouselTestimonials: CarouselTestimonial[] = [
  {
    name: biancaGantt.name,
    role: biancaGantt.service, // Note the field name change
    quote: biancaGantt.quote,
    image: biancaGantt.image || "",
    rating: biancaGantt.rating,
    source: biancaGantt.source
  }
];

// For the categorized display on the Experience page
export const categorizedTestimonials: TestimonialCollection = {
  featured: [biancaGantt],
  families: [],
  // Only put the testimonial in its correct category, graduates
  graduates: [biancaGantt],
  couples: [],
  weddings: []
};
