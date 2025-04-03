"use client"

import Link from "next/link"
import Image from "next/image"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Service package component
function ServicePackage({ 
  title, 
  price, 
  description, 
  features,
  popular = false
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[];
  popular?: boolean;
}) {
  return (
    <Card className={`p-6 hover:shadow-md transition-all ${popular ? 'border-primary border-2' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="text-primary text-4xl mb-4">
        <i className="fas fa-camera"></i>
      </div>
      <h3 className="font-cormorant text-2xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="mt-4 space-y-2">
        <h4 className="font-medium">Includes:</h4>
        <ul className="list-disc pl-5 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <div className="text-2xl font-cormorant font-semibold">{price}</div>
        <p className="text-sm text-muted-foreground">Additional images €25 each</p>
      </div>
      
      <Button asChild className="w-full mt-6 rounded-full">
        <Link href="/bookings">Book This Package</Link>
      </Button>
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
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
        {number}
      </div>
      <div>
        <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

// FAQ item data
const faqItems = [
  {
    question: "How far in advance should I book my session?",
    answer: "I recommend booking at least 2-3 weeks in advance to ensure availability, especially during peak seasons (spring and fall). For weddings and special events, booking 3-6 months ahead is advisable."
  },
  {
    question: "What should I wear to my photo session?",
    answer: "Choose clothing that makes you feel comfortable and confident. Solid colors typically photograph better than busy patterns. For family or group sessions, coordinate colors without matching exactly. I'm happy to provide specific guidance based on your session type."
  },
  {
    question: "How long until I receive my photos?",
    answer: "You'll receive a preview of selected images within 3-5 days after your session. The complete gallery will be delivered within 2 weeks for standard sessions and 4-6 weeks for weddings or large events."
  },
  {
    question: "Do you provide prints or just digital files?",
    answer: "All packages include high-resolution digital files. Professional prints, albums, and other products are available as add-ons. I work with professional print labs to ensure the highest quality for your printed memories."
  },
  {
    question: "What happens if it rains on the day of an outdoor session?",
    answer: "For outdoor sessions, we'll monitor the weather closely. If conditions aren't favorable, we can either find a covered location or reschedule at no additional cost. I'm flexible and want to ensure we get the best possible photos."
  },
  {
    question: "Do you travel for photo sessions?",
    answer: "Yes! I serve clients throughout the Frankfurt area and am available for travel throughout Germany and internationally. Travel fees may apply depending on the location."
  }
]

export default function ServicesPage() {
  return (
    <>
      <BackgroundBlobs />
      
      <div className="container py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Services</span>
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold mt-2">
            Photography Services
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional photography services tailored to capture your special moments with creativity and care.
          </p>
        </section>

        {/* Service Categories */}
        <section className="mb-16">
          <Tabs defaultValue="portraits" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="portraits">Portraits</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="engagements">Engagements</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="portraits">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5] mb-4">
                    <Image 
                      src="/images/headshots/headshot1.jpeg" 
                      alt="Portrait Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5]">
                    <Image 
                      src="/images/headshots/headshot6.jpeg" 
                      alt="Portrait Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className="p-8">
                  <h2 className="font-cormorant text-3xl font-semibold text-primary mb-6">Portrait Photography</h2>
                  <div className="space-y-4 text-card-foreground">
                    <p>
                      My portrait sessions are designed to capture your authentic self in a comfortable, relaxed environment. 
                      Whether you need professional headshots for your career, senior portraits to commemorate a milestone, 
                      or creative portraits that showcase your personality, I&apos;ll work with you to create images you&apos;ll love.
                    </p>
                    <p>
                      Each portrait session includes personalized planning to discuss your vision, wardrobe consultation, 
                      and guidance throughout the shoot to ensure natural, flattering poses. I pay careful attention to lighting, 
                      composition, and the small details that make your portraits stand out.
                    </p>
                    <p>
                      After your session, you&apos;ll receive professionally edited images that highlight your best features while 
                      maintaining a natural look. My goal is to create portraits that not only look professional but also 
                      capture your unique personality and essence.
                    </p>
                    <div className="pt-4">
                      <Button asChild className="rounded-full">
                        <Link href="/bookings">Book a Portrait Session</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="family">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5] mb-4">
                    <Image 
                      src="/images/family/family-1.jpeg" 
                      alt="Family Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5]">
                    <Image 
                      src="/images/family/family-3.jpeg" 
                      alt="Family Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className="p-8">
                  <h2 className="font-cormorant text-3xl font-semibold text-primary mb-6">Family Photography</h2>
                  <div className="space-y-4 text-card-foreground">
                    <p>
                      Family sessions capture the connections and love that make your family unique. I specialize in creating 
                      natural, joyful images that showcase authentic interactions rather than stiff, posed portraits. 
                      These sessions are relaxed and fun, allowing your family&apos;s personality to shine through.
                    </p>
                    <p>
                      I offer both outdoor sessions in beautiful natural settings and in-home lifestyle sessions that capture 
                      your family in your natural environment. For families with young children, I take a patient, playful 
                      approach, capturing genuine smiles and meaningful moments.
                    </p>
                    <p>
                      Family sessions are perfect for annual family portraits, celebrating new additions to the family, 
                      commemorating milestones, or simply documenting this chapter in your family&apos;s story. These images 
                      become more precious with each passing year.
                    </p>
                    <div className="pt-4">
                      <Button asChild className="rounded-full">
                        <Link href="/bookings">Book a Family Session</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5] mb-4">
                    <Image 
                      src="/images/events/event-1.jpg" 
                      alt="Event Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5]">
                    <Image 
                      src="/images/events/event-5.jpg" 
                      alt="Event Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className="p-8">
                  <h2 className="font-cormorant text-3xl font-semibold text-primary mb-6">Event Photography</h2>
                  <div className="space-y-4 text-card-foreground">
                    <p>
                      From corporate gatherings to milestone celebrations, my event photography services ensure that every 
                      significant moment is captured with attention to detail. I work discreetly in the background, 
                      documenting both the key moments and the candid interactions that make your event special.
                    </p>
                    <p>
                      My approach to event photography combines journalistic documentation with an artistic eye, ensuring 
                      comprehensive coverage that tells the complete story of your event. I&apos;m experienced in working in various 
                      lighting conditions and venues to deliver consistent, high-quality images.
                    </p>
                    <p>
                      Event packages can be customized based on the duration, size, and specific needs of your gathering. 
                      All packages include professional editing and a quick turnaround time, with options for same-day previews 
                      for social media sharing.
                    </p>
                    <div className="pt-4">
                      <Button asChild className="rounded-full">
                        <Link href="/bookings">Book Event Coverage</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="engagements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5] mb-4">
                    <Image 
                      src="/images/couples/couple-1.jpeg" 
                      alt="Engagement Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/5]">
                    <Image 
                      src="/images/couples/couple-7.jpeg" 
                      alt="Engagement Photography" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className="p-8">
                  <h2 className="font-cormorant text-3xl font-semibold text-primary mb-6">Engagement Photography</h2>
                  <div className="space-y-4 text-card-foreground">
                    <p>
                      Engagement sessions celebrate this special time in your relationship and provide beautiful images for 
                      save-the-dates, wedding websites, and keepsakes. These sessions are relaxed and fun, focusing on the 
                      connection between you and your partner.
                    </p>
                    <p>
                      I&apos;ll work with you to choose a meaningful location that reflects your relationship, whether that&apos;s where 
                      you first met, a favorite spot you enjoy together, or a beautiful setting that complements your style. 
                      Throughout the session, I&apos;ll provide guidance for natural, authentic poses that showcase your connection.
                    </p>
                    <p>
                      Engagement sessions also serve as a great opportunity for us to work together before your wedding day, 
                      helping you feel comfortable in front of the camera and establishing a rapport that will make your 
                      wedding photography experience even better.
                    </p>
                    <div className="pt-4">
                      <Button asChild className="rounded-full">
                        <Link href="/bookings">Book an Engagement Session</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Pricing Packages */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="text-center mb-10">
              <h2 className="font-cormorant text-3xl font-semibold text-primary mb-2">Pricing Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the package that best fits your needs, or contact me for a custom quote tailored to your specific requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServicePackage 
                title="Essential"
                price="€250"
                description="Perfect for individuals and professionals needing high-quality portraits."
                features={[
                  "60-minute session",
                  "1-2 outfit changes",
                  "10 professionally edited digital images",
                  "Online gallery for easy sharing",
                  "Print release for personal use"
                ]}
              />
              
              <ServicePackage 
                title="Premium"
                price="€450"
                description="Ideal for families, couples, and extended portrait sessions."
                features={[
                  "90-minute session",
                  "2-3 outfit changes",
                  "20 professionally edited digital images",
                  "Online gallery for easy sharing",
                  "Print release for personal use",
                  "Complimentary location consultation"
                ]}
                popular={true}
              />
              
              <ServicePackage 
                title="Luxury"
                price="€650"
                description="Comprehensive coverage for special events and professional needs."
                features={[
                  "2-hour session",
                  "Multiple outfit changes",
                  "30 professionally edited digital images",
                  "Online gallery for easy sharing",
                  "Print release for personal use",
                  "Complimentary location consultation",
                  "Professional hair and makeup consultation"
                ]}
              />
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">
                Need something different? I offer custom packages for weddings, extended events, and commercial photography.
              </p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/contact">Request Custom Quote</Link>
              </Button>
            </div>
          </Card>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="text-center mb-10">
              <h2 className="font-cormorant text-3xl font-semibold text-primary mb-2">My Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From inquiry to delivery, here&apos;s what you can expect when working with me.
              </p>
            </div>
            
            <div className="space-y-8">
              <ProcessStep 
                number={1}
                title="Initial Consultation"
                description="We'll discuss your vision, goals, and preferences for your photography session. This can be done via phone, video call, or in person."
              />
              
              <ProcessStep 
                number={2}
                title="Planning & Preparation"
                description="I'll help you prepare with location selection, outfit recommendations, and scheduling to ensure the best possible outcome for your session."
              />
              
              <ProcessStep 
                number={3}
                title="Photography Session"
                description="On the day of your session, I'll guide you through poses and prompts while capturing both planned shots and spontaneous moments."
              />
              
              <ProcessStep 
                number={4}
                title="Professional Editing"
                description="Each selected image receives careful editing to enhance colors, lighting, and overall quality while maintaining a natural look."
              />
              
              <ProcessStep 
                number={5}
                title="Gallery Delivery"
                description="Your final images will be delivered via a private online gallery where you can download, share, and order prints."
              />
              
              <ProcessStep 
                number={6}
                title="Print & Product Options"
                description="Choose from a variety of high-quality prints, albums, and other products to showcase your images in your home or office."
              />
            </div>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="text-center mb-10">
              <h2 className="font-cormorant text-3xl font-semibold text-primary mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about my photography services.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Have a question that&apos;s not answered here?
              </p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-3xl rounded-3xl bg-primary/10 p-12 text-center">
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
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
