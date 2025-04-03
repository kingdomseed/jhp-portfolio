"use client"

import Image from "next/image"
import Link from "next/link"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Blog post card component
function BlogPostCard({ 
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
          <Link href={`/blog/${slug}`}>Read More →</Link>
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
            <Link href={`/blog/${slug}`}>Read Full Post</Link>
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

// Blog post data
const blogPosts = [
  {
    title: "Welcome to My Photography Journal",
    excerpt: "I'm excited to share my photography journey, tips, and behind-the-scenes insights with you. This blog will be a place where I document my creative process, share photography tips, and showcase recent work.",
    date: "March 1, 2025",
    image: "/images/couple1.jpeg",
    category: "Announcements",
    slug: "welcome-to-my-photography-journal",
    featured: true,
    content: `
# Welcome to My Photography Journal

*March 1, 2025*

Hello and welcome to my photography blog! I'm Jason Holt, a professional photographer based in Frankfurt, Germany, specializing in portraits, events, engagements, and weddings.

## Why I Started This Blog

Photography is more than just my profession—it's my passion. Through this blog, I hope to:

- Share the stories behind some of my favorite shoots
- Provide tips and insights for aspiring photographers
- Help clients prepare for their photography sessions
- Document my creative journey and growth

## What to Expect

I'll be posting regularly about various topics including:

- Behind-the-scenes looks at recent photoshoots
- Technical tips and camera gear reviews
- Client stories and testimonials
- Photography trends and inspiration

## Let's Connect

I'd love to hear from you! Whether you have questions about photography, want to book a session, or just want to say hello, feel free to [contact me](/contact) anytime.

Stay tuned for more posts coming soon!

*Jason*
    `
  },
  {
    title: "5 Tips for Preparing for Your Portrait Session",
    excerpt: "Preparing for a portrait session can make a significant difference in the final results. Here are five essential tips to help you get the most out of your upcoming portrait photography session.",
    date: "March 5, 2025",
    image: "/images/headshot1.jpeg",
    category: "Tips & Advice",
    slug: "5-tips-for-preparing-for-your-portrait-session"
  },
  {
    title: "The Art of Natural Light Photography",
    excerpt: "Natural light is one of the most beautiful and versatile tools in photography. Learn how to harness the power of natural light to create stunning, evocative images in any setting.",
    date: "March 10, 2025",
    image: "/images/-1.jpeg",
    category: "Photography Techniques",
    slug: "the-art-of-natural-light-photography"
  },
  {
    title: "Behind the Scenes: A Spring Engagement Session",
    excerpt: "Take a peek behind the curtain at a recent spring engagement session in Frankfurt's botanical gardens. See the challenges, creative decisions, and beautiful moments that made this shoot special.",
    date: "March 15, 2025",
    image: "/images/couple3.jpeg",
    category: "Behind the Scenes",
    slug: "behind-the-scenes-spring-engagement-session"
  },
  {
    title: "Choosing the Perfect Location for Family Photos",
    excerpt: "Location plays a crucial role in family photography. Discover how to select the ideal setting that complements your family's personality and creates the perfect backdrop for your memories.",
    date: "March 20, 2025",
    image: "/images/family-3.jpeg",
    category: "Tips & Advice",
    slug: "choosing-the-perfect-location-for-family-photos"
  },
  {
    title: "The Evolution of Wedding Photography",
    excerpt: "Wedding photography has transformed dramatically over the decades. Explore the journey from formal posed portraits to today's blend of photojournalism, artistic portraits, and candid moments.",
    date: "March 25, 2025",
    image: "/images/couple8.jpeg",
    category: "Photography History",
    slug: "the-evolution-of-wedding-photography"
  }
];

// Categories
const categories = [
  "All",
  "Tips & Advice",
  "Behind the Scenes",
  "Photography Techniques",
  "Announcements",
  "Photography History"
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Filter posts by category
  const filteredPosts = activeCategory === "All" 
    ? blogPosts.filter(post => post.title !== blogPosts[0].title) // Exclude featured post
    : blogPosts.filter(post => post.category === activeCategory && post.title !== blogPosts[0].title);

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
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Photography Journal</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Photography Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, stories, and tips from my journey as a photographer.
          </p>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="font-cormorant text-3xl font-semibold text-center mb-8">Featured Post</h2>
          
          <FeaturedPost 
            title={blogPosts[0].title}
            excerpt={blogPosts[0].excerpt}
            date={blogPosts[0].date}
            image={blogPosts[0].image}
            category={blogPosts[0].category}
            slug={blogPosts[0].slug}
          />
        </section>

        {/* Categories */}
        <section className="mb-8">
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

        {/* Blog Posts Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogPostCard 
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
              <h2 className="font-cormorant text-2xl font-semibold text-primary mb-2">Subscribe to My Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated with my latest blog posts, photography tips, and special offers.
              </p>
            </div>
            
            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  </div>
                  <div>
                    <p className="font-medium">Successfully subscribed!</p>
                    <p className="text-sm">Thank you for subscribing to my newsletter.</p>
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

        {/* Full Welcome Post Content */}
        <section className="mb-16">
          <Card className="p-8">
            <article className="prose prose-lg max-w-none">
              <h1 className="font-cormorant text-3xl font-semibold text-primary mb-4">Welcome to My Photography Journal</h1>
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-primary hover:bg-primary/90">Announcements</Badge>
                <span className="text-sm text-muted-foreground">March 1, 2025</span>
              </div>
              
              <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image 
                  src="/images/couple1.jpeg" 
                  alt="Welcome to My Photography Journal" 
                  fill
                  className="object-cover"
                />
              </div>
              
              <p>
                Hello and welcome to my photography blog! I&apos;m Jason Holt, a professional photographer based in Frankfurt, Germany, 
                specializing in portraits, events, engagements, and weddings.
              </p>
              
              <h2 className="font-cormorant text-2xl font-semibold text-primary mt-8 mb-4">Why I Started This Blog</h2>
              
              <p>
                Photography is more than just my profession—it&apos;s my passion. Through this blog, I hope to:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Share the stories behind some of my favorite shoots</li>
                <li>Provide tips and insights for aspiring photographers</li>
                <li>Help clients prepare for their photography sessions</li>
                <li>Document my creative journey and growth</li>
              </ul>
              
              <h2 className="font-cormorant text-2xl font-semibold text-primary mt-8 mb-4">What to Expect</h2>
              
              <p>
                I&apos;ll be posting regularly about various topics including:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Behind-the-scenes looks at recent photoshoots</li>
                <li>Technical tips and camera gear reviews</li>
                <li>Client stories and testimonials</li>
                <li>Photography trends and inspiration</li>
              </ul>
              
              <h2 className="font-cormorant text-2xl font-semibold text-primary mt-8 mb-4">Let&apos;s Connect</h2>
              
              <p>
                I&apos;d love to hear from you! Whether you have questions about photography, want to book a session, 
                or just want to say hello, feel free to <Link href="/contact" className="text-primary hover:underline">contact me</Link> anytime.
              </p>
              
              <p>
                Stay tuned for more posts coming soon!
              </p>
              
              <p className="italic mt-8">
                Jason
              </p>
            </article>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-3xl rounded-3xl bg-primary/10 p-12 text-center">
            <h2 className="font-cormorant text-3xl font-semibold md:text-4xl">
              Ready to Book Your Photography Session?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Let&apos;s create beautiful memories together that you&apos;ll cherish for years to come.
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
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
