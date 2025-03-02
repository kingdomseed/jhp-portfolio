"use client"

import { useEffect } from "react"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

// TidyCal component (client component)
function TidyCalEmbed() {
  useEffect(() => {
    // Load TidyCal script
    const script = document.createElement("script")
    script.src = "https://asset-tidycal.b-cdn.net/js/embed.js"
    script.async = true
    document.body.appendChild(script)

    // Don't remove the script on cleanup as it might break the embed
    return () => {
      // Script cleanup handled by browser
    }
  }, [])
  
  return (
    <div 
      className="tidycal-embed w-full min-h-[400px] my-8" 
      data-path="jasonholtphotography"
    ></div>
  )
}

// Contact card component
function ContactCard({ 
  icon, 
  title, 
  content 
}: { 
  icon: string; 
  title: string; 
  content: string 
}) {
  return (
    <div className="bg-muted rounded-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1 border border-border/10">
      <div className="text-primary text-3xl mb-4">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground">{content}</p>
    </div>
  )
}

// Booking info item component
function BookingInfoItem({ 
  icon, 
  content 
}: { 
  icon: string; 
  content: string 
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg border border-border/10">
      <div className="text-primary text-lg">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <span className="text-muted-foreground">{content}</span>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <>
      <BackgroundBlobs variant="subtle" />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Schedule</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Book a Session
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule your photography session or inquire about my services.
          </p>
        </section>

        {/* TidyCal Section */}
        <Card className="mb-12">
          <CardHeader>
            <h2 className="font-cormorant text-2xl font-semibold">Schedule Your Session</h2>
            <p className="text-muted-foreground">Choose a time that works best for you.</p>
          </CardHeader>
          <CardContent>
            <TidyCalEmbed />
          </CardContent>
        </Card>

        {/* Contact Info Section */}
        <Card className="mb-12">
          <CardHeader>
            <h2 className="font-cormorant text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">Have questions? I&apos;m here to help.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ContactCard 
                key="email"
                icon="envelope" 
                title="Email" 
                content="info@jasonholtphotography.com" 
              />
              <ContactCard 
                key="location"
                icon="map-marker-alt" 
                title="Location" 
                content="Frankfurt am Main, Germany" 
              />
              <ContactCard 
                key="response"
                icon="clock" 
                title="Response Time" 
                content="Within 24-48 hours" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Booking Info Section */}
        <Card>
          <CardHeader>
            <h2 className="font-cormorant text-2xl font-semibold text-center">Booking Information</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BookingInfoItem 
                key="schedule"
                icon="calendar-alt" 
                content="Sessions are typically scheduled 2-3 weeks in advance" 
              />
              <BookingInfoItem 
                key="deposit"
                icon="percentage" 
                content="A 50% deposit is required to secure your booking" 
              />
              <BookingInfoItem 
                key="reschedule"
                icon="history" 
                content="Rescheduling is available up to 48 hours before your session" 
              />
              <BookingInfoItem 
                key="packages"
                icon="box" 
                content="Custom packages available upon request" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
