import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full overflow-hidden">
        {/* Hero Image */}
        <Image
          src="/images/couple1.jpeg"
          alt="Hero image"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-cormorant text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Capturing Life&apos;s Beautiful Moments
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            Professional photography services for portraits, events, engagements, and weddings
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-lg">
              <Link href="/galleries">View Gallery</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full border-2 bg-white/10 px-8 text-lg text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/bookings">Book Now</Link>
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
            {/* Service Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/portrait1.jpeg" 
                  alt="Portrait Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-semibold text-white">Portraits</h3>
                <p className="mt-2 text-white/80">Professional portraits that capture your authentic self</p>
                <Link 
                  href="/galleries#portraits" 
                  className="mt-4 inline-flex items-center text-white hover:text-accent"
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
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/couple3.jpeg" 
                  alt="Wedding Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-semibold text-white">Weddings</h3>
                <p className="mt-2 text-white/80">Documenting your special day with care and creativity</p>
                <Link 
                  href="/galleries#weddings" 
                  className="mt-4 inline-flex items-center text-white hover:text-accent"
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
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/engagement1.jpeg" 
                  alt="Engagement Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-semibold text-white">Engagements</h3>
                <p className="mt-2 text-white/80">Celebrate your commitment with beautiful engagement photos</p>
                <Link 
                  href="/galleries#engagements" 
                  className="mt-4 inline-flex items-center text-white hover:text-accent"
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
              </div>
            </div>
            
            {/* Service Card 4 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-hover">
              <div className="aspect-[4/5] w-full">
                <Image 
                  src="/images/event1.jpeg" 
                  alt="Event Photography" 
                  width={400} 
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-semibold text-white">Events</h3>
                <p className="mt-2 text-white/80">Professional coverage for your special events and celebrations</p>
                <Link 
                  href="/galleries#events" 
                  className="mt-4 inline-flex items-center text-white hover:text-accent"
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
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-2xl bg-background p-8 shadow-soft">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-yellow-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-foreground/80">
                &ldquo;Jason made our wedding day so special with his incredible photography. He captured every moment perfectly and made us feel completely at ease. The photos are absolutely stunning!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  {/* Client photo could go here */}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Sarah & Michael</h4>
                  <p className="text-sm text-muted-foreground">Wedding Photography</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="rounded-2xl bg-background p-8 shadow-soft">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-yellow-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-foreground/80">
                &ldquo;I was nervous about my portrait session, but Jason made me feel so comfortable. The results were beyond my expectations - he truly captured my personality in every shot.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  {/* Client photo could go here */}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Emily Johnson</h4>
                  <p className="text-sm text-muted-foreground">Portrait Session</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="rounded-2xl bg-background p-8 shadow-soft">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-yellow-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-foreground/80">
                &ldquo;Jason photographed our corporate event and delivered exceptional results. He was professional, unobtrusive, and captured all the key moments. We&apos;ll definitely be booking him again!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  {/* Client photo could go here */}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">David Williams</h4>
                  <p className="text-sm text-muted-foreground">Corporate Event</p>
                </div>
              </div>
            </div>
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
