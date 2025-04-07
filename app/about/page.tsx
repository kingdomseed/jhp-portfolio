"use client"

import { useState } from "react"
import { ImageRotator } from "@/components/ui/image-rotator"
import { Card } from "@/components/ui/card"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  // We're tracking the active tab in state, and using it with the onValueChange prop
  const [, setActiveTab] = useState("story")
  return (
    <>
      <BackgroundBlobs />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">About Me</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            The Story Behind the Lens
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Documenting your life&apos;s journey with authenticity, creativity, and heart.
          </p>
        </section>

        {/* Tabbed Content */}
        <Tabs defaultValue="story" className="mb-16" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="story">My Story</TabsTrigger>
              <TabsTrigger value="approach">My Approach</TabsTrigger>
            </TabsList>
          </div>
          
          {/* My Story Tab */}
          <TabsContent value="story">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="relative rounded-xl overflow-hidden shadow-md aspect-[3/4]">
                <ImageRotator 
                  images={[
                    { src: "/images/jholt1.jpeg", alt: "Jason Holt - Professional Photographer" },
                    { src: "/images/jholt2.jpeg", alt: "Jason Holt - Professional Photographer" }
                  ]} 
                />
              </div>
              <Card className="p-8">
                <h2 className="font-cormorant text-3xl font-semibold text-primary mb-6">Hello, I&apos;m Jason</h2>
                <div className="space-y-4 text-card-foreground">
                  <p>
                    I&apos;m not just taking photos—I&apos;m documenting life&apos;s entire journey. From the first breath of a newborn 
                    to proud graduation moments, from joyful engagements to romantic weddings, I capture each authentic, fleeting moment 
                    with passion and care.
                  </p>
                  <p>
                    My experience has deepened my sincere appreciation of life&apos;s special milestones. I&apos;ve spent three years 
                    documenting school life—from preschoolers to graduating seniors. I&apos;ve captured countless weddings, engagements, 
                    and intimate moments for couples. I&apos;ve preserved family connections through portraits, reunions, and group events 
                    filled with love and laughter.
                  </p>
                  <p>
                    Based in Frankfurt, I serve clients throughout Hessen and beyond, bringing a professional yet warm approach to 
                    every session. As an English-speaking photographer, I create a comfortable experience while delivering images 
                    that truly tell your story.
                  </p>
                </div>
              </Card>
            </section>
          </TabsContent>
          
          {/* My Approach Tab */}
          <TabsContent value="approach">
            <Card className="p-8 text-center">
              <div className="section-header mb-8">
                <h2 className="font-cormorant text-3xl font-semibold text-primary mb-2">My Photography Philosophy</h2>
                <p className="text-muted-foreground">These core principles guide every interaction, photograph, and client experience</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
                  <div className="text-primary text-4xl mb-4">
                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">Real emotions and genuine connections are the heart and soul of my photography.</p>
                </Card>
                <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
                  <div className="text-primary text-4xl mb-4">
                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Celebration</h3>
                  <p className="text-muted-foreground">I focus on capturing joy and warmth, making you feel valued and special during every session.</p>
                </Card>
                <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
                  <div className="text-primary text-4xl mb-4">
                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Storytelling</h3>
                  <p className="text-muted-foreground">Every image contributes to a greater story, lifting memories from isolated moments into meaningful lifelong narratives.</p>
                </Card>
                <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
                  <div className="text-primary text-4xl mb-4">
                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Excellence</h3>
                  <p className="text-muted-foreground">Professional-quality images, attention to detail, and consistently delightful experiences are integral to my work.</p>
                </Card>
                <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
                  <div className="text-primary text-4xl mb-4">
                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Relationship</h3>
                  <p className="text-muted-foreground">Clients aren&apos;t just customers—they become lifetime friends whose stories I&apos;m privileged to document through all life&apos;s milestones.</p>
                </Card>
              </div>

              <div className="max-w-3xl mx-auto text-left">
                <h3 className="font-cormorant text-2xl font-semibold text-primary mb-4">How I Work With You</h3>
                <div className="space-y-4 text-card-foreground">
                  <p>
                    My photography process is built around you and your unique story. I take the time to understand 
                    what matters most to you, creating a comfortable, relaxed environment where authentic moments 
                    can naturally unfold.
                  </p>
                  <p>
                    Whether I&apos;m capturing your wedding day, documenting your child&apos;s milestone, or creating portraits 
                    that reflect your true self, I bring the same level of dedication, artistry, and attention to detail. 
                    I believe in creating not just beautiful photographs, but meaningful experiences that you&apos;ll remember 
                    as fondly as the moments captured in the images.
                  </p>
                </div>
              </div>
            </Card>
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
            <Link href="/contact">Let&apos;s Tell Your Story →</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
