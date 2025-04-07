"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

// Process step component
function ProcessStep({
  number,
  title,
  description
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex">
      <div className="mr-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

// Import shared testimonial types and data
import { TestimonialCollection } from "@/lib/types/testimonials";
import { categorizedTestimonials } from "@/lib/data/testimonials";

// Use the shared testimonial data
const testimonials: TestimonialCollection = categorizedTestimonials;

// FAQ data
const faqData = [
  {
    question: "How far in advance should I book my session?",
    answer: "For portrait sessions (families, graduates, couples), I recommend booking 4-6 weeks in advance, especially during peak seasons (spring and fall). For weddings and major events, I suggest securing your date 6-12 months ahead as my calendar fills quickly. For last-minute sessions, please contact me directly as I occasionally have openings due to rescheduling."
  },
  {
    question: "What happens if it rains on our scheduled outdoor session?",
    answer: "Weather is unpredictable, especially in Frankfurt! If we have inclement weather on your session date, we have several options: reschedule to another available date, switch to an indoor location, or in some cases, embrace the weather with umbrellas for a unique look. I always monitor the forecast closely as your session approaches and will communicate proactively about any potential weather concerns."
  },
  {
    question: "How many photos will I receive?",
    answer: "The number of final images varies by session type. Typically, portrait sessions yield 30-50 edited images, while weddings and events provide 300-600+ photos depending on coverage length. I focus on quality over quantity, ensuring each delivered image meets my professional standards and effectively tells your story."
  },
  {
    question: "How long until I receive my photos?",
    answer: "Portrait sessions (families, graduates, couples) are typically delivered within 2-3 weeks. Weddings and larger events take 4-6 weeks depending on the season. I always provide a selection of preview images within 48 hours of your session so you can share a sneak peek with friends and family right away."
  },
  {
    question: "Do you provide both color and black & white photos?",
    answer: "Yes! Most images are delivered in color, with select photos also provided in black & white when the composition and emotion particularly suit a monochrome treatment. If you have specific preferences for black & white conversions, just let me know and I'm happy to accommodate."
  },
  {
    question: "What should we wear for our session?",
    answer: "I provide all clients with a detailed preparation guide that includes clothing recommendations specific to your session type. Generally, I suggest coordinating (not matching) outfits in complementary colors, avoiding large logos or distracting patterns, and wearing clothes you feel comfortable and confident in. I'm always available to review outfit choices via email before your session if you'd like feedback."
  },
  {
    question: "Do you travel outside of Frankfurt for sessions?",
    answer: "Absolutely! I regularly photograph sessions throughout the greater Frankfurt area with no additional travel fee. For destinations beyond 50km, a small travel fee applies. I'm also available for destination weddings and sessions worldwide – just ask for a custom quote."
  },
  {
    question: "How do we receive our final images?",
    answer: "All images are delivered through a private online gallery where you can download high-resolution files, share with friends and family, and order professional prints and products. Your gallery remains active for one year from delivery, and you receive full-resolution digital downloads with printing rights for personal use."
  }
];

// Journal post card component
function JournalPostCard({ 
  title, 
  excerpt, 
  date, 
  image, 
  category,
  slug
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  image: string;
  category: string;
  slug: string;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {category && (
          <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary/90">
            {category}
          </Badge>
        )}
      </div>
      <div className="p-6">
        <div className="mb-2 text-sm text-muted-foreground">{date}</div>
        <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        <Button asChild variant="link" className="mt-4 p-0 h-auto text-primary">
          <Link href={`/journal/${slug}`}>Read More →</Link>
        </Button>
      </div>
    </Card>
  )
}

// Client story component
function ClientStoryHighlight({
  name,
  milestone,
  quote,
  image
}: {
  name: string;
  milestone: string;
  quote: string;
  image: string;
}) {
  return (
    <Card className="overflow-hidden bg-primary/5 border-primary/20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative md:col-span-2 h-full min-h-[250px]">
          <Image
            src={image}
            alt={`${name}'s ${milestone}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8 md:col-span-3 flex flex-col">
          <Badge className="self-start mb-4 bg-primary hover:bg-primary/90">
            {milestone}
          </Badge>
          <div className="text-3xl text-primary mb-4">&ldquo;</div>
          <p className="text-lg italic mb-6">
            {quote}
          </p>
          <p className="text-primary font-medium">— {name}</p>
        </div>
      </div>
    </Card>
  )
}

// Category button component
function CategoryButton({ 
  name, 
  active, 
  onClick 
}: { 
  name: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm transition-colors ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-muted hover:bg-muted/80 text-foreground'
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

// Journal post data
const journalPosts = [
  {
    title: "Documenting Life's Journey Through Photography",
    excerpt: "Photography isn't just about capturing a single moment—it's about documenting the entire journey of life, from first smiles to milestone celebrations. Here's how I approach photographing life's full story.",
    date: "April 2, 2025",
    image: "/images/optimized/family/family1.webp",
    category: "Life's Journey",
    slug: "documenting-lifes-journey"
  },
  {
    title: "The Magic of Newborn Photography: Capturing New Beginnings",
    excerpt: "Those first precious days with a newborn are fleeting and magical. Learn how I approach these delicate sessions and why they're such an important chapter in your family's visual story.",
    date: "March 25, 2025",
    image: "/images/optimized/family/family4.webp",
    category: "Families & Babies",
    slug: "magic-of-newborn-photography"
  },
  {
    title: "Graduation Photography: Celebrating Academic Milestones",
    excerpt: "Graduation marks a significant transition in a young person's life. Discover how I work with graduates to create portraits that honor their achievements and capture this pivotal moment.",
    date: "March 20, 2025",
    image: "/images/optimized/portraits/senior-26.webp",
    category: "Young Adults & Graduates",
    slug: "graduation-photography-milestones"
  },
  {
    title: "From Proposal to Wedding: Documenting Your Love Story",
    excerpt: "Every love story deserves to be beautifully documented from the moment of proposal through the wedding day. See how I create a visual narrative of couples' journeys together.",
    date: "March 15, 2025",
    image: "/images/optimized/couples/couple-8.webp",
    category: "Couples & Engagements",
    slug: "proposal-to-wedding-love-story"
  }
];

// Client stories data
const clientStories = [
  {
    name: "The Meyer Family",
    milestone: "First Baby",
    quote: "Jason captured our daughter's first days with such tenderness and care. These photos have become more precious with each passing year as she grows so quickly. We're so grateful to have these beautiful memories preserved forever.",
    image: "/images/optimized/family/family4.webp"
  },
  {
    name: "Emma Schneider",
    milestone: "Graduation",
    quote: "My graduation photos are absolutely perfect! Jason made me feel so comfortable and confident during the session. The images perfectly captured this important milestone and the excitement I felt about my future.",
    image: "/images/optimized/portraits/senior-26.webp"
  },
  {
    name: "Michael & Sophia",
    milestone: "Engagement to Wedding",
    quote: "Jason has been with us from our engagement through our wedding day. Having the same photographer document these connected chapters of our story created a beautiful visual narrative that we'll treasure for a lifetime.",
    image: "/images/optimized/couples/couple-3.webp"
  }
];

// Categories aligned with photography focus areas
const categories = [
  "All",
  "Life's Journey",
  "Families & Babies",
  "Young Adults & Graduates",
  "Couples & Engagements",
  "Weddings & Celebrations"
];

export default function ExperiencePage() {
  // State for tabs and journal category
  const [, setActiveTab] = useState("expect");
  const [activeCategory, setActiveCategory] = useState("All");
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Filter posts by category for journal tab
  const filteredPosts = activeCategory === "All" 
    ? journalPosts
    : journalPosts.filter(post => post.category === activeCategory);
    
  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      console.log("Subscribing email:", emailInput);
      setIsSubscribed(true);
      setEmailInput("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <>
      <BackgroundBlobs variant="subtle" />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Your Experience</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            The Client Experience
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            What to expect when we work together to document your life&apos;s journey.
          </p>
        </section>

        {/* Tabbed Content Section */}
        <Tabs defaultValue="expect" className="mb-16" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="expect">What to Expect</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </div>
          
          {/* What to Expect Tab */}
          <TabsContent value="expect">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">My Approach to Photography</h2>
              
              <p className="text-muted-foreground mb-10 text-center">
                From our first conversation to the final image delivery, I&apos;m committed to creating a seamless, 
                enjoyable experience that results in authentic photographs you&apos;ll treasure for generations.
              </p>
              
              <div className="space-y-12 mb-12">
                <ProcessStep 
                  number={1}
                  title="Initial Consultation"
                  description="We begin with a conversation about your vision, whether by phone, video call, or in person. I'll learn about what you're looking for, answer your questions, and help you choose the perfect package for your needs. This is where we start building the relationship that leads to authentic, meaningful photos."
                />
                
                <ProcessStep 
                  number={2}
                  title="Preparation & Planning"
                  description="Once booked, I'll provide detailed guidance to help you prepare for your session. For portrait sessions, this includes location selection, outfit recommendations, and timing considerations. For events and weddings, we'll create a custom timeline and shot list to ensure we capture every important moment."
                />
                
                <ProcessStep 
                  number={3}
                  title="Your Photography Session"
                  description="On the day of your session, I create a relaxed, enjoyable atmosphere where authentic moments can naturally unfold. For portraits, I'll guide you with gentle direction while capturing genuine interactions. For events, I blend into the background, documenting real moments as they happen while ensuring we get any formal shots you've requested."
                />
                
                <ProcessStep 
                  number={4}
                  title="Professional Editing"
                  description="After your session, I carefully select and professionally edit each image, enhancing colors, light, and overall quality while maintaining a natural look. I don't over-process or follow fleeting trends—my goal is timeless images that will look as beautiful in 50 years as they do today."
                />
                
                <ProcessStep 
                  number={5}
                  title="Gallery Delivery & Support"
                  description="Your final images are delivered in a beautiful online gallery where you can download, share, and order professional prints. I remain available to answer questions, help with print selections, and assist with anything else you might need. Many clients return for future sessions as their lives and families grow."
                />
              </div>
              
              <div className="bg-primary/5 p-8 rounded-xl">
                <h3 className="font-cormorant text-2xl font-semibold text-center mb-4">My Promise to You</h3>
                <p className="text-center">
                  I believe photography is about more than just taking pictures—it&apos;s about creating an experience and 
                  preserving memories. When you choose me as your photographer, I promise thoughtful communication, 
                  meticulous attention to detail, and photographs that authentically capture your unique story.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div>
              {/* Featured Testimonial */}
              <section className="mb-12">
                <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Featured Review</h2>
                
                <FeaturedTestimonial 
                  name={testimonials.featured[0].name}
                  service={testimonials.featured[0].service}
                  quote={testimonials.featured[0].quote}
                  image={testimonials.featured[0].image}
                />
              </section>
              
              {/* Testimonials by Category */}
              <section>
                <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Client Experiences</h2>
                
                <Tabs defaultValue="families" className="w-full">
                  <div className="flex justify-center mb-8 overflow-x-auto">
                    <TabsList>
                      <TabsTrigger value="families">Families & Babies</TabsTrigger>
                      <TabsTrigger value="graduates">Young Adults & Graduates</TabsTrigger>
                      <TabsTrigger value="couples">Couples & Engagements</TabsTrigger>
                      <TabsTrigger value="weddings">Weddings & Celebrations</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="families">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.families.length > 0 ? (
                        testimonials.families.map((testimonial, index) => (
                          <TestimonialCard 
                            key={index}
                            name={testimonial.name}
                            service={testimonial.service}
                            quote={testimonial.quote}
                            rating={testimonial.rating}
                          />
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-10">
                          <p className="text-muted-foreground">No reviews available in this category yet.</p>
                          {testimonials.graduates.length > 0 && (
                            <p className="mt-2">
                              Please check the &quot;Young Adults & Graduates&quot; section to see our review.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="graduates">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.graduates.length > 0 ? (
                        testimonials.graduates.map((testimonial, index) => (
                          <TestimonialCard 
                            key={index}
                            name={testimonial.name}
                            service={testimonial.service}
                            quote={testimonial.quote}
                            rating={testimonial.rating}
                          />
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-10">
                          <p className="text-muted-foreground">No reviews available in this category yet.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="couples">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.couples.length > 0 ? (
                        testimonials.couples.map((testimonial, index) => (
                          <TestimonialCard 
                            key={index}
                            name={testimonial.name}
                            service={testimonial.service}
                            quote={testimonial.quote}
                            rating={testimonial.rating}
                          />
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-10">
                          <p className="text-muted-foreground">No reviews available in this category yet.</p>
                          {testimonials.graduates.length > 0 && (
                            <p className="mt-2">
                              Please check the &quot;Young Adults & Graduates&quot; section to see our review.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="weddings">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.weddings.length > 0 ? (
                        testimonials.weddings.map((testimonial, index) => (
                          <TestimonialCard 
                            key={index}
                            name={testimonial.name}
                            service={testimonial.service}
                            quote={testimonial.quote}
                            rating={testimonial.rating}
                          />
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-10">
                          <p className="text-muted-foreground">No reviews available in this category yet.</p>
                          {testimonials.graduates.length > 0 && (
                            <p className="mt-2">
                              Please check the &quot;Young Adults & Graduates&quot; section to see our review.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            </div>
          </TabsContent>
          
          {/* Journal Tab */}
          <TabsContent value="journal">
            <div>
              {/* Client Stories Section */}
              <section className="mb-16">
                <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Client Stories</h2>
                <div className="space-y-8">
                  {clientStories.map((story, index) => (
                    <ClientStoryHighlight 
                      key={index}
                      name={story.name}
                      milestone={story.milestone}
                      quote={story.quote}
                      image={story.image}
                    />
                  ))}
                </div>
              </section>
              
              {/* Journal Entries Section */}
              <section>
                <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Photography Journal</h2>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {categories.map((category) => (
                    <CategoryButton 
                      key={category}
                      name={category}
                      active={activeCategory === category}
                      onClick={() => setActiveCategory(category)}
                    />
                  ))}
                </div>
                
                {/* Journal Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredPosts.map((post, index) => (
                    <JournalPostCard 
                      key={index}
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.date}
                      image={post.image}
                      category={post.category}
                      slug={post.slug}
                    />
                  ))}
                </div>
                
                {/* Newsletter Section */}
                <Card className="p-8 bg-primary/5 border-primary/20 max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="font-cormorant text-2xl font-semibold text-primary mb-2">Subscribe to My Journal</h3>
                    <p className="text-muted-foreground">
                      Stay connected with new stories, photography tips, and special offers.
                    </p>
                  </div>
                  
                  {isSubscribed ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 max-w-md mx-auto">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg 
                            className="h-5 w-5 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Successfully subscribed!</p>
                          <p className="text-sm">Thank you for subscribing to updates.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                        className="flex-grow"
                      />
                      <Button type="submit" className="rounded-full">Subscribe</Button>
                    </form>
                  )}
                </Card>
              </section>
            </div>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
              
              <p className="text-muted-foreground mb-10 text-center">
                Find answers to common questions about working with me. If you don&apos;t see your question here, 
                please don&apos;t hesitate to <Link href="/contact" className="text-primary hover:underline">contact me</Link> directly.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-12 p-8 bg-primary/5 rounded-xl text-center">
                <h3 className="font-cormorant text-2xl font-semibold mb-4">Have Another Question?</h3>
                <p className="text-muted-foreground mb-6">
                  I&apos;m happy to answer any other questions you might have about your photography session.
                </p>
                <Button asChild className="rounded-full">
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-3xl font-semibold mb-4">Ready to Document Your Story?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let&apos;s work together to capture the beautiful moments that make up your life&apos;s journey. 
            From milestone celebrations to everyday magic, I&apos;m here to help you preserve these memories for generations.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/bookings">Book Your Session →</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
