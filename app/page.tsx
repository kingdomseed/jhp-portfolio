import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/ui/hero-carousel"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full overflow-hidden">
        {/* Hero Image Carousel */}
        <HeroCarousel 
          images={[
            { src: "/images/couples/couple-1.jpeg", alt: "Couple photography" },
            { src: "/images/events/event-1.jpg", alt: "Event photography" },
            { src: "/images/portraits/portrait-1.jpg", alt: "Portrait photography" },
            { src: "/images/couples/couple-2.jpeg", alt: "Engagement photography" }
          ]}
          interval={6000}
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        
        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1 backdrop-blur-sm">
            <span className="text-sm font-medium text-white">Frankfurt&apos;s Premier Portrait & Event Photographer</span>
          </div>
          <h1 className="font-cormorant text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Capturing Life&apos;s Beautiful Moments
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            Authentic, timeless photography that tells your unique story
          </p>
          
          {/* Special Offer Badge */}
          <div className="mt-6 animate-pulse">
            <div className="inline-block rounded-lg bg-accent px-4 py-2 shadow-glow">
              <span className="font-medium text-black">Spring Special: 15% Off Portrait Sessions</span>
            </div>
          </div>
          
          {/* CTA Section with Brief Booking Info */}
          <div className="mt-6 max-w-2xl">
            <p className="text-white/90">
              Book your session in just 3 simple steps: Choose your package, select a date, and confirm your booking.
            </p>
          </div>
          
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {/* Primary CTA with attention-grabbing animation */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-accent/50 blur-sm animate-pulse"></div>
              <Button 
                asChild 
                size="lg" 
                className="relative rounded-full px-8 text-lg shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <Link href="/bookings">Book Your Session</Link>
              </Button>
            </div>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full border-2 bg-white/10 px-8 text-lg text-white backdrop-blur-sm hover:bg-white/20 transition-transform duration-300 hover:scale-105"
            >
              <Link href="/galleries">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="font-cormorant text-4xl font-semibold md:text-5xl">
              Photography Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Specializing in capturing authentic moments with a natural, timeless style
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Service Card 1 - Portraits */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/portraits/portrait-1.jpg" 
                  alt="Portrait Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Base content - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
                <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs px-3 py-1 rounded-full">
                  From €250
                </div>
                <h3 className="text-2xl font-semibold text-white">Portraits</h3>
                <p className="mt-2 text-white/80">Professional portraits that capture your authentic self</p>
                
                {/* Additional details - revealed on hover */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                  <ul className="text-white/80 text-sm space-y-1 mb-4">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Natural, flattering poses
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Professional retouching
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Quick turnaround
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/galleries#portraits" 
                    className="inline-flex items-center text-white hover:text-accent"
                  >
                    View Gallery
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-2 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/bookings" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent hover:text-accent/80"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Service Card 2 - Weddings */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/couples/couple-3.jpeg" 
                  alt="Wedding Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Base content - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
                <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs px-3 py-1 rounded-full">
                  Custom Pricing
                </div>
                <h3 className="text-2xl font-semibold text-white">Weddings</h3>
                <p className="mt-2 text-white/80">Documenting your special day with care and creativity</p>
                
                {/* Additional details - revealed on hover */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                  <ul className="text-white/80 text-sm space-y-1 mb-4">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Full day coverage
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Second photographer
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Custom wedding album
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/galleries#weddings" 
                    className="inline-flex items-center text-white hover:text-accent"
                  >
                    View Gallery
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-2 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/bookings" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent hover:text-accent/80"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Service Card 3 - Engagements */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/couples/couple-2.jpeg" 
                  alt="Engagement Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Base content - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
                <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs px-3 py-1 rounded-full">
                  From €450
                </div>
                <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-2xl font-semibold text-white">Engagements</h3>
                <p className="mt-2 text-white/80">Celebrate your commitment with beautiful engagement photos</p>
                
                {/* Additional details - revealed on hover */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                  <ul className="text-white/80 text-sm space-y-1 mb-4">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      90-minute session
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Multiple locations
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      20 edited images
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/galleries#engagements" 
                    className="inline-flex items-center text-white hover:text-accent"
                  >
                    View Gallery
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-2 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/bookings" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent hover:text-accent/80"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Service Card 4 - Events */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/events/event-1.jpg" 
                  alt="Event Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Base content - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
                <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs px-3 py-1 rounded-full">
                  From €650
                </div>
                <h3 className="text-2xl font-semibold text-white">Events</h3>
                <p className="mt-2 text-white/80">Professional coverage for your special events and celebrations</p>
                
                {/* Additional details - revealed on hover */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                  <ul className="text-white/80 text-sm space-y-1 mb-4">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      2+ hours coverage
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Candid & posed shots
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Same-day previews
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/galleries#events" 
                    className="inline-flex items-center text-white hover:text-accent"
                  >
                    View Gallery
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-2 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/bookings" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent hover:text-accent/80"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full px-8 text-lg">
              <Link href="/bookings">Book a Session</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-muted py-20">
        <div className="container">
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
                200+
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Happy Clients
              </p>
            </div>
            <div className="rounded-xl bg-background p-6 text-center shadow-soft">
              <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
                4.9
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Average Rating
              </p>
            </div>
            <div className="rounded-xl bg-background p-6 text-center shadow-soft">
              <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
                10+
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Years Experience
              </p>
            </div>
            <div className="rounded-xl bg-background p-6 text-center shadow-soft">
              <div className="font-cormorant text-3xl font-semibold text-primary md:text-4xl">
                50+
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Events Per Year
              </p>
            </div>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="relative px-4 md:px-12">
            <TestimonialCarousel 
              testimonials={[
                {
                  quote: "Jason made our wedding day so special with his incredible photography. He captured every moment perfectly and made us feel completely at ease. The photos are absolutely stunning!",
                  name: "Sarah & Michael",
                  role: "Wedding Photography",
                  image: "/images/couples/couple-2.jpeg",
                  rating: 5
                },
                {
                  quote: "I was nervous about my portrait session, but Jason made me feel so comfortable. The results were beyond my expectations - he truly captured my personality in every shot.",
                  name: "Emily Johnson",
                  role: "Portrait Session",
                  image: "/images/headshots/headshot3.jpeg",
                  rating: 5
                },
                {
                  quote: "Jason photographed our corporate event and delivered exceptional results. He was professional, unobtrusive, and captured all the key moments. We'll definitely be booking him again!",
                  name: "David Williams",
                  role: "Corporate Event",
                  image: "/images/headshots/headshot7.jpeg",
                  rating: 5
                },
                {
                  quote: "Our family photos turned out amazing! Jason was great with our kids and somehow managed to get everyone looking at the camera at the same time. A true miracle worker!",
                  name: "The Andersons",
                  role: "Family Session",
                  image: "/images/family/family-2.jpeg",
                  rating: 5
                },
                {
                  quote: "The engagement photos Jason took for us are absolutely perfect. He found the most beautiful locations and made us feel so natural in front of the camera.",
                  name: "Jessica & Tom",
                  role: "Engagement Session",
                  image: "/images/couples/couple-4.jpeg",
                  rating: 5
                }
              ]}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl bg-teal/10 p-12 text-center">
            <h2 className="font-cormorant text-3xl font-semibold md:text-4xl">
              Ready to Book Your Photography Session?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Let&apos;s create beautiful memories together. Contact me today to discuss your photography needs.
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
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
