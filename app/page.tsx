import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/ui/hero-carousel"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { SectionBackground } from "@/components/ui/section-background"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full overflow-hidden">
        {/* Hero Image Carousel */}
        <HeroCarousel 
          images={[
            { src: "/images/optimized/couples/couple-8.webp", alt: "Couple photography" },
            { src: "/images/optimized/portraits/senior-7.webp", alt: "Portrait photography" },
            { src: "/images/optimized/family/family-1.webp", alt: "Engagement photography" },
            { src: "/images/optimized/couples/couple-14.webp", alt: "Senior photography" },
            { src: "/images/optimized/portraits/senior-22.webp", alt: "Engagement photography" },
            { src: "/images/optimized/events/event-91.webp", alt: "Event photography" },
            { src: "/images/optimized/events/event-2.webp", alt: "Event photography" },
            { src: "/images/optimized/headshots/headshot2.webp", alt: "Headshot photography" }
          ]}
          interval={6000}
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        
        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1 backdrop-blur-sm">
            <span className="text-sm font-medium text-white">Frankfurt&apos;s Storyteller for Life&apos;s Journey</span>
          </div>
          <h1 className="font-cormorant text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="hidden md:inline">Capturing Your Life&apos;s Timeless Journey, One Moment at a Time</span>
            <span className="inline md:hidden">All Your Life&apos;s Moments, Celebrated</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            From first breaths to graduation caps, engagement rings to wedding bells—I document your authentic story at every milestone
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
                <Link href="/bookings">Start Celebrating Your Moments</Link>
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
      <SectionBackground variant="primary" paddingY="xl">
        <div className="mb-16 text-center">
          <h2 className="font-cormorant text-4xl font-semibold md:text-5xl">
            Celebrating Every Chapter of Your Story
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            I document life&apos;s entire journey with warmth, authenticity, and a commitment to preserving your most precious moments
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* First Row */}
          {/* Service Card 1 - Families & Babies */}
          <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
            <div className="aspect-[4/5] w-full">
              <Image 
                src="/images/optimized/family/family-1.webp" 
                alt="Family & Baby Photography" 
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
              <h3 className="text-2xl font-semibold text-white">Families & Babies</h3>
              <p className="mt-2 text-white/80">Celebrating the wonder of new life and family connections</p>
              
              {/* Additional details - revealed on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <ul className="text-white/80 text-sm space-y-1 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Newborn sessions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Family portraits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Childhood milestones
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/bookings" 
                  className="inline-flex items-center text-white hover:text-accent transition-colors"
                >
                  Create Lasting Memories
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
              </div>
            </div>
          </div>
          
          {/* Service Card 2 - Young Adults & Graduates */}
          <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
            <div className="aspect-[4/5] w-full">
              <Image 
                src="/images/optimized/portraits/senior-26.webp" 
                alt="Graduation Photography" 
                width={400} 
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Base content - always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
              <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs px-3 py-1 rounded-full">
                From €300
              </div>
              <h3 className="text-2xl font-semibold text-white">Young Adults & Graduates</h3>
              <p className="mt-2 text-white/80">Marking academic achievements and youth milestones</p>
              
              {/* Additional details - revealed on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <ul className="text-white/80 text-sm space-y-1 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Senior portraits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Graduation sessions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Teen milestones
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/galleries#graduates" 
                  className="inline-flex items-center text-white hover:text-accent transition-colors"
                >
                  Celebrate Your Milestone
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
              </div>
            </div>
          </div>
          
          {/* Service Card 3 - Couples & Engagements */}
          <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
            <div className="aspect-[4/5] w-full">
              <Image 
                src="/images/optimized/couples/couple-2.webp" 
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
              <h3 className="text-2xl font-semibold text-white">Couples & Engagements</h3>
              <p className="mt-2 text-white/80">Capturing the magic of your love story and commitment</p>
              
              {/* Additional details - revealed on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <ul className="text-white/80 text-sm space-y-1 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Proposals & engagements
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Anniversary sessions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Couples Milestones
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/bookings" 
                  className="inline-flex items-center text-white hover:text-accent transition-colors"
                >
                  Capture Your Story
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
              </div>
            </div>
          </div>
          
          {/* Second Row */}
          {/* Service Card 4 - Weddings & Celebrations */}
          <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
            <div className="aspect-[4/5] w-full">
              <Image 
                src="/images/optimized/events/event-2.webp" 
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
              <h3 className="text-2xl font-semibold text-white">Weddings & Celebrations</h3>
              <p className="mt-2 text-white/80">Documenting your most momentous occasions with artistry</p>
              
              {/* Additional details - revealed on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <ul className="text-white/80 text-sm space-y-1 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Weddings & vow renewals
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Special events & performances
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Reunions & celebrations
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/galleries#weddings" 
                  className="inline-flex items-center text-white hover:text-accent transition-colors"
                >
                  Celebrate Your Day
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
              </div>
            </div>
          </div>
          
          {/* Service Card 5 - Professional & Corporate */}
          <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
            <div className="aspect-[4/5] w-full">
              <Image 
                src="/images/optimized/headshots/headshot5.webp" 
                alt="Professional & Corporate Photography" 
                width={400} 
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Base content - always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
              <div className="absolute top-4 right-4 bg-accent/90 text-white text-xs px-3 py-1 rounded-full">
                From €350
              </div>
              <h3 className="text-2xl font-semibold text-white">Professional & Corporate</h3>
              <p className="mt-2 text-white/80">Elevating your professional image with authentic portraits</p>
              
              {/* Additional details - revealed on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <ul className="text-white/80 text-sm space-y-1 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Business headshots
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Corporate team photos
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Professional branding
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/bookings" 
                  className="inline-flex items-center text-white hover:text-accent transition-colors"
                >
                  Elevate Your Image
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
              </div>
            </div>
          </div>

          {/* Service Card 6 - Tailored Photography Experiences */}
          <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
            <div className="aspect-[4/5] w-full">
              <Image 
                src="/images/optimized/events/event-91.webp" 
                alt="Tailored Photography Experiences" 
                width={400} 
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Base content - always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90">
              <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                Let&apos;s Talk
              </div>
              <h3 className="text-2xl font-semibold text-white">Tailored Photography Experiences</h3>
              <p className="mt-2 text-white/80">Have a vision that doesn&apos;t fit neatly into a category? Let&apos;s create something special together</p>
              
              {/* Additional details - revealed on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4">
                <ul className="text-white/80 text-sm space-y-1 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Custom event coverage
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Multi-generational projects
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Creative collaborations
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center text-white hover:text-accent transition-colors"
                >
                  Start the Conversation
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
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="rounded-full px-8 text-lg">
            <Link href="/bookings">Book a Call</Link>
          </Button>
        </div>
      </SectionBackground>
      
      {/* Testimonials Section */}
      <TestimonialsSection showTestimonials={true} />
      
      {/* CTA Section */}
      <SectionBackground variant="primary" paddingY="lg">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-cormorant text-3xl font-semibold md:text-4xl">
            Ready to Book Your Discovery Call?
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
      </SectionBackground>
    </>
  )
}
