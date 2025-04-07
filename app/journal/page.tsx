"use client"

import Image from "next/image"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Journal post card component
function JournalPostCard({ 
  title, 
  excerpt, 
  date, 
  image, 
  category,
  slug,
  featured = false
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  image: string;
  category: string;
  slug: string;
  featured?: boolean;
}) {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-all ${featured ? 'border-primary border-2' : ''}`}>
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

// Featured post component
function FeaturedPost({
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
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-full min-h-[300px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          {category && (
            <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary/90">
              {category}
            </Badge>
          )}
        </div>
        <div className="p-8 flex flex-col">
          <div className="mb-2 text-sm text-muted-foreground">{date}</div>
          <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-primary mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground flex-grow">
            {excerpt}
          </p>
          <Button asChild className="mt-6 w-fit rounded-full">
            <Link href={`/journal/${slug}`}>Read Full Story</Link>
          </Button>
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

// Client story/featured highlight component
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

// Journal post data
const journalPosts = [
  {
    title: "Documenting Life's Journey Through Photography",
    excerpt: "Photography isn't just about capturing a single moment—it's about documenting the entire journey of life, from first smiles to milestone celebrations. Here's how I approach photographing life's full story.",
    date: "April 2, 2025",
    image: "/images/optimized/family/family1.webp",
    category: "Life's Journey",
    slug: "documenting-lifes-journey",
    featured: true
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
  },
  {
    title: "Family Reunions: Capturing Generations Together",
    excerpt: "Family reunions offer rare opportunities to photograph multiple generations in one place. Learn how I approach these special events to create meaningful keepsakes for every family member.",
    date: "March 10, 2025",
    image: "/images/optimized/family/family3.webp",
    category: "Families & Babies",
    slug: "family-reunions-generations-together"
  },
  {
    title: "The Art of Authentic Wedding Photojournalism",
    excerpt: "Wedding photography is about more than posed portraits—it's about authentically documenting one of life's most significant celebrations. Discover my approach to wedding storytelling.",
    date: "March 5, 2025",
    image: "/images/optimized/couples/couple-3.webp",
    category: "Weddings & Celebrations",
    slug: "authentic-wedding-photojournalism"
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

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Filter posts by category
  const filteredPosts = activeCategory === "All" 
    ? journalPosts.filter(post => post.title !== journalPosts[0].title) // Exclude featured post
    : journalPosts.filter(post => post.category === activeCategory && post.title !== journalPosts[0].title);

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      // In a real implementation, this would send the email to a backend service
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
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Stories & Insights</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Life&apos;s Journey Journal
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories, insights, and celebrations of life&apos;s beautiful journey through the lens.
          </p>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Featured Story</h2>
          
          <FeaturedPost 
            title={journalPosts[0].title}
            excerpt={journalPosts[0].excerpt}
            date={journalPosts[0].date}
            image={journalPosts[0].image}
            category={journalPosts[0].category}
            slug={journalPosts[0].slug}
          />
        </section>

        {/* Client Stories */}
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

        {/* Categories */}
        <section className="mb-8">
          <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Journal Entries by Category</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <CategoryButton 
                key={category}
                name={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </section>

        {/* Journal Posts Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found in this category. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mb-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="text-center mb-6">
              <h2 className="font-cormorant text-2xl font-semibold text-primary mb-2">Subscribe to Updates</h2>
              <p className="text-muted-foreground">
                Stay connected with new journal entries, photography tips, and special offers.
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

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-3xl rounded-3xl bg-primary/10 p-12 text-center">
            <h2 className="font-cormorant text-3xl font-semibold md:text-4xl">
              Ready to Celebrate Your Moments?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Let&apos;s work together to document the special chapters of your life&apos;s unique journey.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8 text-lg">
                <Link href="/contact">Contact Me →</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-full border-2 px-8 text-lg"
              >
                <Link href="/galleries">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
