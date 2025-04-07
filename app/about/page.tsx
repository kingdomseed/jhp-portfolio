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
                    { src: "/images/optimized/jholt1.webp", alt: "Jason Holt - Professional Photographer" },
                    { src: "/images/optimized/jholt2.webp", alt: "Jason Holt - Professional Photographer" }
                  ]} 
                />
              </div>
              <Card className="p-8">
                <h2 className="font-cormorant text-3xl font-semibold text-primary mb-6">Hello, I&apos;m Jason</h2>
                <div className="space-y-4 text-card-foreground">
                  <p>
                    I&apos;m here to celebrate your life&apos;s journey—one meaningful moment at a time.
                  </p>
                  <p>
                    My journey as a photographer started in 2015, when as a high school digital technology teacher I discovered the powerful art of photography alongside my students. While traveling the world, camera in hand, I fell in love with capturing genuine moments and the stories they tell.
                  </p>
                  <p>
                    In 2021, I transitioned fully into teaching photography and became my school&apos;s official photographer, documenting hundreds of events each year. From joyful early school days to proud graduation ceremonies, I spent three years honing my ability to capture fleeting moments in every imaginable scenario: senior portraits, sports contests, proms, plays, cultural performances—even capturing the excitement and spectacle of major events like the laser and dance show at the Texas State Fair.
                  </p>
                  <p>
                    Outside the classroom, I expanded my skills with headshots, branding sessions, street photography, engagements, and couples milestones, steadily building a diverse portfolio. Alongside this, I founded and led the Atlas Shutterbugs photography club for three inspiring years, guiding young photographers in their passion and creativity.
                  </p>
                  <p>
                    In 2023, my own life&apos;s journey took an exciting new direction—I met the love of my life, and we married in 2024. Moving to Germany opened a fresh chapter in my life and career, allowing me to pursue professional photography full-time from our new home in Frankfurt am Main.
                  </p>
                  <p>
                    Today, I specialize in photographing life&apos;s most important milestones—from newborn portraits and family gatherings, to senior photos, engagements, couples milestones, and wedding celebrations. I approach each opportunity with careful preparation, creativity, and sincere enthusiasm.
                  </p>
                  <p>
                    As an English-speaking photographer based in Frankfurt, my goal is simple: to make you feel comfortable, celebrated, and truly seen. I&apos;m committed to capturing authentic, heartfelt images you and your loved ones will cherish for a lifetime.
                  </p>
                  <p>
                    I&apos;d be honored to celebrate your life&apos;s journey with you—telling your unique story through joyful, timeless photography.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                {/* Authenticity Card */}
                <Card className="relative overflow-hidden h-80 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/optimized/couples/couple-8.webp')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/70 to-primary/50 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:translate-y-full">
                    <div className="text-white text-4xl mb-4">
                      <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl font-semibold text-white mb-2">Authenticity</h3>
                    <p className="text-white/90">Real emotions and genuine connections are the heart and soul of my photography.</p>
                  </div>
                </Card>
                
                {/* Celebration Card */}
                <Card className="relative overflow-hidden h-80 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/optimized/events/event-90.webp')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/70 to-primary/50 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:translate-y-full">
                    <div className="text-white text-4xl mb-4">
                      <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl font-semibold text-white mb-2">Celebration</h3>
                    <p className="text-white/90">I focus on capturing joy and warmth, making you feel valued and special during every session.</p>
                  </div>
                </Card>
                
                {/* Storytelling Card */}
                <Card className="relative overflow-hidden h-80 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/optimized/events/event-2.webp')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/70 to-primary/50 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:translate-y-full">
                    <div className="text-white text-4xl mb-4">
                      <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl font-semibold text-white mb-2">Storytelling</h3>
                    <p className="text-white/90">Every image contributes to a greater story, lifting memories from isolated moments into meaningful lifelong narratives.</p>
                  </div>
                </Card>
                
                {/* Excellence Card */}
                <Card className="relative overflow-hidden h-80 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/optimized/portraits/senior-26.webp')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/70 to-primary/50 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:translate-y-full">
                    <div className="text-white text-4xl mb-4">
                      <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl font-semibold text-white mb-2">Excellence</h3>
                    <p className="text-white/90">Professional-quality images, attention to detail, and consistently delightful experiences are integral to my work.</p>
                  </div>
                </Card>
                
                {/* Relationship Card */}
                <Card className="relative overflow-hidden h-80 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/optimized/family/family-4.webp')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/70 to-primary/50 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:translate-y-full">
                    <div className="text-white text-4xl mb-4">
                      <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl font-semibold text-white mb-2">Relationship</h3>
                    <p className="text-white/90">Clients aren&apos;t just customers—they become lifetime friends whose stories I&apos;m privileged to document through all life&apos;s milestones.</p>
                  </div>
                </Card>
                
                {/* CTA Card */}
                <Card className="relative overflow-hidden h-80 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/images/optimized/portraits/portrait-2.webp')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/70 to-accent/50 transition-opacity duration-500 group-hover:opacity-80"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-white">
                    <div className="text-white text-4xl mb-4">
                      <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-white mb-4">Experience My Approach</h3>
                    <p className="text-white/90 mb-6">Ready to create beautiful images that tell your unique story?</p>
                    <Button asChild size="lg" className="rounded-full px-8 bg-white text-accent hover:bg-white/90">
                      <Link href="/contact">Book a Session</Link>
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="mt-2 pt-4 border-t border-muted/30">
                <div className="max-w-5xl mx-auto">
                  <h3 className="font-cormorant text-2xl font-semibold text-primary mb-8 text-center">How I Work With You</h3>
                  
                  {/* Timeline Process */}
                  <div className="relative">
                    {/* Connected line through timeline */}
                    <div className="absolute left-0 right-0 top-24 h-1 bg-gradient-to-r from-bone via-primary to-bone"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                      {/* Consultation Step */}
                      <div className="relative flex flex-col items-center">
                        <div className="relative mb-6 bg-primary text-white rounded-full p-6 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h4 className="font-cormorant text-xl font-semibold text-primary mb-2 text-center">Consultation</h4>
                        <p className="text-sm text-center">We discuss your vision, location ideas, and plan your perfect session.</p>
                      </div>
                      
                      {/* Photography Session Step */}
                      <div className="relative flex flex-col items-center">
                        <div className="relative mb-6 bg-primary text-white rounded-full p-6 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h4 className="font-cormorant text-xl font-semibold text-primary mb-2 text-center">Photography Session</h4>
                        <p className="text-sm text-center">Relaxed, authentic photography focused on capturing genuine moments.</p>
                      </div>
                      
                      {/* Editing Step */}
                      <div className="relative flex flex-col items-center">
                        <div className="relative mb-6 bg-primary text-white rounded-full p-6 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
                        <h4 className="font-cormorant text-xl font-semibold text-primary mb-2 text-center">Editing & Selection</h4>
                        <p className="text-sm text-center">I carefully edit and enhance your images to bring out their full potential.</p>
                      </div>
                      
                      {/* Delivery Step */}
                      <div className="relative flex flex-col items-center">
                        <div className="relative mb-6 bg-primary text-white rounded-full p-6 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <h4 className="font-cormorant text-xl font-semibold text-primary mb-2 text-center">Delivery</h4>
                        <p className="text-sm text-center">Receive your beautiful digital gallery with high-resolution images.</p>
                      </div>
                      
                      {/* Follow-up Step */}
                      <div className="relative flex flex-col items-center">
                        <div className="relative mb-6 bg-primary text-white rounded-full p-6 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h4 className="font-cormorant text-xl font-semibold text-primary mb-2 text-center">Follow-up</h4>
                        <p className="text-sm text-center">Assistance with prints, albums, and planning for your next life milestone.</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center mt-12 text-muted-foreground max-w-3xl mx-auto">
                    My process is built around your unique story, creating a comfortable environment where authentic moments
                    can naturally unfold. I bring the same level of dedication and artistry to every session, whether I&apos;m
                    capturing your wedding day, family milestone, or professional portrait.
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
