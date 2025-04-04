"use client"

import Image from "next/image"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Testimonial card component
function TestimonialCard({ 
  name, 
  service, 
  quote, 
  rating = 5,
  image = "",
  featured = false
}: { 
  name: string; 
  service: string; 
  quote: string;
  rating?: number;
  image?: string;
  featured?: boolean;
}) {
  return (
    <Card className={`p-8 hover:shadow-md transition-all ${featured ? 'border-primary border-2' : ''}`}>
      {/* Star Rating */}
      <div className="mb-4 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <div className="relative mb-6">
        <div className="absolute -left-2 -top-2 text-4xl text-primary opacity-20">&ldquo;</div>
        <p className="relative z-10 text-foreground/80">
          {quote}
        </p>
        <div className="absolute -bottom-2 -right-2 text-4xl text-primary opacity-20">&rdquo;</div>
      </div>
      
      {/* Client Info */}
      <div className="flex items-center">
        {image ? (
          <div className="h-12 w-12 overflow-hidden rounded-full bg-muted mr-4">
            <Image 
              src={image} 
              alt={name} 
              width={48} 
              height={48} 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <i className="fas fa-user"></i>
          </div>
        )}
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{service}</p>
        </div>
      </div>
    </Card>
  )
}

// Rating stat component
function RatingStat({ 
  label, 
  value, 
  percentage 
}: { 
  label: string; 
  value: string; 
  percentage: number;
}) {
  return (
    <div className="text-center">
      <div className="text-4xl font-cormorant font-semibold text-primary mb-2">{value}</div>
      <div className="w-full bg-muted rounded-full h-2 mb-2">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

// Featured testimonial component
function FeaturedTestimonial({
  name,
  service,
  quote,
  image = ""
}: {
  name: string;
  service: string;
  quote: string;
  image?: string;
}) {
  return (
    <Card className="p-8 md:p-10 bg-primary/5 border-primary/20">
      <div className="flex flex-col md:flex-row gap-8">
        {image && (
          <div className="md:w-1/3">
            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div className={image ? "md:w-2/3" : "w-full"}>
          <div className="text-3xl text-primary mb-6">&ldquo;</div>
          <p className="text-xl md:text-2xl font-cormorant italic mb-6">
            {quote}
          </p>
          <div className="flex items-center">
            <div className="mr-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 inline text-yellow-500"
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div>
              <h4 className="font-medium">{name}</h4>
              <p className="text-sm text-muted-foreground">{service}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Testimonial data
const testimonials = {
  featured: [
    {
      name: "Sarah & Michael",
      service: "Wedding Photography",
      quote: "Jason made our wedding day so special with his incredible photography. He captured every moment perfectly and made us feel completely at ease throughout the day. The photos are absolutely stunning and we couldn't be happier with the results!",
      image: "/images/optimized/couples/couple-3.webp"
    }
  ],
  portraits: [
    {
      name: "Emily Johnson",
      service: "Professional Headshots",
      quote: "I was nervous about my portrait session, but Jason made me feel so comfortable. The results were beyond my expectations - he truly captured my personality in every shot.",
      rating: 5
    },
    {
      name: "Thomas Weber",
      service: "Corporate Portraits",
      quote: "The headshots Jason took for our executive team were exceptional. Professional, modern, and exactly what we needed for our website and marketing materials.",
      rating: 5
    },
    {
      name: "Sophia Chen",
      service: "Creative Portraits",
      quote: "Jason has an incredible eye for creative portraiture. He suggested poses and locations I wouldn't have thought of, and the results were stunning.",
      rating: 5
    }
  ],
  family: [
    {
      name: "The Martinez Family",
      service: "Family Session",
      quote: "Jason was amazing with our kids and captured beautiful, natural moments of our family. The photos perfectly reflect our family's personality and connection.",
      rating: 5
    },
    {
      name: "Jennifer & Family",
      service: "Extended Family Session",
      quote: "Coordinating a session with three generations wasn't easy, but Jason handled it with patience and professionalism. The photos are treasures we'll keep forever.",
      rating: 4
    },
    {
      name: "The Schmidt Family",
      service: "Family Portraits",
      quote: "We've had family photos taken before, but none compare to what Jason created. He captured genuine interactions and emotions rather than stiff poses.",
      rating: 5
    }
  ],
  events: [
    {
      name: "David Williams",
      service: "Corporate Event",
      quote: "Jason photographed our corporate event and delivered exceptional results. He was professional, unobtrusive, and captured all the key moments. We'll definitely be booking him again!",
      rating: 5
    },
    {
      name: "Maria Gonzalez",
      service: "Birthday Celebration",
      quote: "Jason documented my 40th birthday party, and I'm so glad we hired him. He captured moments I missed during the event, and the photos tell the complete story of the night.",
      rating: 5
    },
    {
      name: "Frankfurt Business Association",
      service: "Annual Conference",
      quote: "We've used several photographers for our annual conference, but Jason's work stands out. His attention to detail and ability to capture the energy of the event is unmatched.",
      rating: 4
    }
  ],
  engagements: [
    {
      name: "Alex & Jordan",
      service: "Engagement Session",
      quote: "Our engagement photos are absolutely perfect! Jason found the most beautiful locations and made us feel so comfortable. We're thrilled with how they turned out.",
      rating: 5
    },
    {
      name: "Emma & Noah",
      service: "Couple's Session",
      quote: "Jason has a talent for capturing the connection between couples. Our photos feel authentic and romantic without being cheesy or overly posed.",
      rating: 5
    },
    {
      name: "Olivia & William",
      service: "Pre-Wedding Photos",
      quote: "We used our engagement photos for save-the-dates, and everyone commented on how beautiful they were. Jason truly captured our relationship in these images.",
      rating: 5
    }
  ]
};

export default function TestimonialsPage() {
  return (
    <>
      <BackgroundBlobs variant="subtle" />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Reviews</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Client Testimonials
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Read what my clients have to say about their photography experience.
          </p>
        </section>

        {/* Featured Testimonial */}
        <section className="mb-16">
          <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Featured Review</h2>
          
          <FeaturedTestimonial 
            name={testimonials.featured[0].name}
            service={testimonials.featured[0].service}
            quote={testimonials.featured[0].quote}
            image={testimonials.featured[0].image}
          />
        </section>

        {/* Ratings Overview */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="font-cormorant text-2xl font-semibold text-primary text-center mb-8">Client Satisfaction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <RatingStat 
                label="Overall Rating" 
                value="4.9/5" 
                percentage={98}
              />
              
              <RatingStat 
                label="Would Recommend" 
                value="100%" 
                percentage={100}
              />
              
              <RatingStat 
                label="Repeat Clients" 
                value="80%" 
                percentage={80}
              />
              
              <RatingStat 
                label="On-Time Delivery" 
                value="99%" 
                percentage={99}
              />
            </div>
          </Card>
        </section>

        {/* Testimonials by Category */}
        <section className="mb-16">
          <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Client Reviews by Service</h2>
          
          <Tabs defaultValue="portraits" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="portraits">Portraits</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="engagements">Engagements</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="portraits">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.portraits.map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    name={testimonial.name}
                    service={testimonial.service}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="family">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.family.map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    name={testimonial.name}
                    service={testimonial.service}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.events.map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    name={testimonial.name}
                    service={testimonial.service}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="engagements">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.engagements.map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    name={testimonial.name}
                    service={testimonial.service}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Client Gallery */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="font-cormorant text-2xl font-semibold text-primary text-center mb-8">Happy Clients</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image 
                  src="/images/optimized/couples/couple-1.webp" 
                  alt="Happy client" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image 
                  src="/images/optimized/family/family1.webp" 
                  alt="Happy client" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image 
                  src="/images/optimized/headshots/headshot1.webp" 
                  alt="Happy client" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image 
                  src="/images/optimized/events/event-1.webp" 
                  alt="Happy client" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              All client photos shared with permission. View more in my <Link href="/galleries" className="text-primary hover:underline">galleries</Link>.
            </p>
          </Card>
        </section>

        {/* Leave a Review Section */}
        <section className="mb-16">
          <Card className="p-8 text-center">
            <h2 className="font-cormorant text-2xl font-semibold text-primary mb-4">Had a Session with Me?</h2>
            <p className="text-muted-foreground mb-6">
              I would love to hear about your experience. Your feedback helps me improve and helps others find my services.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/contact">Leave a Review</Link>
            </Button>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-3xl rounded-3xl bg-primary/10 p-12 text-center">
            <h2 className="font-cormorant text-3xl font-semibold md:text-4xl">
              Ready to Create Your Own Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join my happy clients and book your photography session today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8 text-lg">
                <Link href="/bookings">Book Now</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-full border-2 px-8 text-lg"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
