"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
// Link import not needed anymore since we're using onClick for tab switching
import { useSearchParams } from "next/navigation"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiStepBooking } from "@/components/ui/multi-step-booking"
import { siteConfig } from "@/lib/theme"

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Contact info card component
function ContactInfoCard({ 
  icon, 
  title, 
  content,
  link = "",
}: { 
  icon: string; 
  title: string; 
  content: string;
  link?: string;
}) {
  const ContentElement = link ? 
    <a href={link} className="text-primary hover:underline">{content}</a> : 
    <span>{content}</span>;
  
  return (
    <Card className="p-6 text-center transition-transform duration-300 hover:-translate-y-1">
      <div className="text-primary text-3xl mb-4">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground">{ContentElement}</p>
    </Card>
  )
}

// Social media link component
function SocialLink({ 
  platform, 
  url, 
  icon 
}: { 
  platform: string; 
  url: string; 
  icon: string;
}) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <i className={`fab fa-${icon}`}></i>
      </div>
      <span>{platform}</span>
    </a>
  )
}

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("contact")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Check if there's a tab parameter in the URL and set activeTab accordingly
  useEffect(() => {
    if (searchParams) {
      const tab = searchParams.get("tab")
      if (tab === "book") {
        setActiveTab("book")
      }
    }
  }, [searchParams])
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      form.reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <>
      <BackgroundBlobs variant="subtle" />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Get in Touch</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Let&apos;s Tell Your Story
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to document your life&apos;s journey? I&apos;d love to hear about the moments you want to celebrate and preserve.
          </p>
        </section>
        
        {/* Tabbed Interface */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="contact">Message Me</TabsTrigger>
              <TabsTrigger value="book">Book Discovery Call</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Contact Form Tab */}
          <TabsContent value="contact">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="p-8">
                <h2 className="font-cormorant text-2xl font-semibold text-primary mb-6">Share Your Vision</h2>
                
                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      </div>
                      <div>
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm">Thank you for sharing your story with me. I&apos;ll get back to you within 24-48 hours to discuss how we can capture your special moments.</p>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="min-h-[150px] resize-y"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending...
                        </>
                      ) : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-8">
                  <h2 className="font-cormorant text-2xl font-semibold text-primary mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ContactInfoCard 
                      icon="envelope" 
                      title="Email" 
                      content="hello@jasonholtphotography.com"
                      link="mailto:hello@jasonholtphotography.com"
                    />
                    
                    <ContactInfoCard 
                      icon="map-marker-alt" 
                      title="Location" 
                      content="Frankfurt am Main, Germany"
                    />
                    
                    <ContactInfoCard 
                      icon="clock" 
                      title="Response Time" 
                      content="Within 24-48 hours"
                    />
                  </div>
                </Card>
                
                <Card className="p-8">
                  <h2 className="font-cormorant text-2xl font-semibold text-primary mb-6">Business Hours</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="font-medium">Saturday</span>
                      <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="font-medium">Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-4">
                      Photo sessions are available outside of regular business hours by appointment.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-8">
                  <h2 className="font-cormorant text-2xl font-semibold text-primary mb-6">Connect on Social Media</h2>
                  
                  <div className="space-y-2">
                    <SocialLink 
                      platform="Instagram" 
                      url={siteConfig.links.instagram} 
                      icon="instagram"
                    />
                    
                    <SocialLink 
                      platform="Facebook" 
                      url={siteConfig.links.facebook} 
                      icon="facebook"
                    />
                    
                    <SocialLink 
                      platform="Threads" 
                      url={siteConfig.links.threads} 
                      icon="hashtag"
                    />
                  </div>
                </Card>
              </div>
            </section>
          </TabsContent>
          
          {/* Booking Form Tab */}
          <TabsContent value="book">
            <Card className="p-8 mb-8">
              <h2 className="font-cormorant text-2xl font-semibold text-primary mb-6 text-center">Book Your Photography Session</h2>
              <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Ready to document your life&apos;s journey? Select your service type, choose a date for your discovery call, and share your vision. I&apos;ll personally work with you to plan the perfect photography experience.
              </p>
              
              <MultiStepBooking />
            </Card>
          </TabsContent>
        </Tabs>

        {/* Map Section */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="font-cormorant text-2xl font-semibold text-primary mb-6">Find Me</h2>
            
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81064.35583471266!2d8.631552803710937!3d50.11092565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd096f477096c5%3A0x422435029b0c600!2sFrankfurt%2C%20Germany!5e0!3m2!1sen!2sus!4v1646579542015!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Jason Holt Photography location"
              ></iframe>
            </div>
            
              <p className="text-muted-foreground mt-4">
                Based in Frankfurt am Main, I document life&apos;s journeys throughout Hessen and beyond. Whether you&apos;re celebrating a new baby, graduation, engagement, or wedding, I&apos;m available to travel to your special location.
              </p>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-3xl rounded-3xl bg-primary/10 p-12 text-center">
            <h2 className="font-cormorant text-3xl font-semibold md:text-4xl">
              Ready to Celebrate Your Moments?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              From first smiles to graduation caps, engagement rings to wedding bells — I&apos;m here to document every chapter of your life&apos;s journey.
            </p>
            <div className="mt-8">
              <Button onClick={() => setActiveTab("book")} size="lg" className="rounded-full px-8 text-lg">
                Book Your Session →
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
