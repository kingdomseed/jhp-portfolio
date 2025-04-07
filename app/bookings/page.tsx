"use client"

import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { MultiStepBooking } from "@/components/ui/multi-step-booking"

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

export default function BookingsPage() {
  return (
    <>
      <BackgroundBlobs variant="subtle" />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Celebrate Your Story</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Book Your Photography Session
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From first smiles to milestone celebrations, let&apos;s document the beautiful chapters of your life&apos;s journey together.
          </p>
        </section>

        {/* Multi-step Booking Form */}
        <section className="mb-16">
          <MultiStepBooking />
        </section>

        {/* Contact Info Section */}
        <Card className="mb-12">
          <CardHeader>
            <h2 className="font-cormorant text-2xl font-semibold">Questions About Your Session?</h2>
            <p className="text-muted-foreground">Every life stage deserves to be beautifully documented. I&apos;m here to help you plan the perfect photography experience.</p>
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
                key="journey"
                icon="camera" 
                title="Life's Journey" 
                content="Families & Babies, Young Adults & Graduates, Couples & Engagements, Weddings & Celebrations, Professional & Corporate" 
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
      </div>
    </>
  )
}
