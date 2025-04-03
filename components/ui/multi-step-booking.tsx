"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { siteConfig } from "@/lib/theme"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { BookingCalendar } from "@/components/ui/booking-calendar"
import { Timeslot } from "@/lib/tidycal-api"
import { format, parseISO } from "date-fns"

// Define the TidyCal booking type ID
const TIDYCAL_BOOKING_TYPE_ID = 951394; // Use the booking type ID from your TidyCal account

// Define the steps in the booking process (removed package step)
const STEPS = [
  { id: "service", title: "Choose Service" },
  { id: "calendar", title: "Schedule Date" },
  { id: "details", title: "Your Details" },
  { id: "confirm", title: "Confirmation" }
]

// Service type definition
type Service = {
  title: string
  description: string
  image: string
  href: string
}

// Add Headshots service to the list from siteConfig
const services: Service[] = [
  ...siteConfig.services,
  {
    title: "Headshots",
    description: "Professional headshots for business, acting, or personal branding",
    image: "/images/headshot1.jpeg",
    href: "/galleries#headshots",
  }
]

// Service-specific additional information prompts
const additionalInfoPrompts: Record<string, string> = {
  "Portraits": "Tell me about the style of portraits you envision, any specific themes or settings you have in mind, and what you hope to convey through these images. Feel free to share details about yourself that might inform our session.",
  "Weddings": "Share some details about your wedding vision, venue, and what moments are most important for you to capture. Any specific style preferences or unique aspects of your celebration?",
  "Engagements": "Tell me about your love story, how you met, and the vision for your engagement photos. What locations or styles would best represent your relationship?",
  "Events": "Please share details about your event - the nature of the celebration, key moments you'd like captured, and any specific requirements or preferences you have.",
  "Family": "Tell me about your family members, the dynamics you'd like to capture, and any specific themes or locations you have in mind. Are there any particular moments or relationships you want to highlight?",
  "Headshots": "Share details about how you plan to use these headshots (LinkedIn, company website, acting portfolio, etc.). What impression would you like to convey, and do you have specific style preferences?"
}

// Default prompt if service not found
const defaultAdditionalInfoPrompt = "Please share any additional information, questions, or special requests for your photography session. The more details you provide, the better I can prepare to capture your vision."

// Service card component
function ServiceCard({ 
  service, 
  selected, 
  onSelect 
}: { 
  service: Service; 
  selected: boolean; 
  onSelect: () => void;
}) {
  return (
    <Card 
      className={`relative cursor-pointer transition-all ${selected ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
      onClick={onSelect}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <Image 
          src={service.image} 
          alt={service.title} 
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <RadioGroup className="w-full">
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value={service.title} 
              id={service.title} 
              checked={selected}
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <Label htmlFor={service.title} className="w-full cursor-pointer">
              {selected ? "Selected" : "Select Service"}
            </Label>
          </div>
        </RadioGroup>
      </CardFooter>
    </Card>
  )
}

// Progress indicator component
function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {STEPS.map((step, index) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center"
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${index < currentStep ? 'bg-primary text-white' : 
                  index === currentStep ? 'bg-primary/20 text-primary border-2 border-primary' : 
                  'bg-muted text-muted-foreground'}`}
            >
              {index < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-xs ${index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-muted w-full rounded"></div>
        <div 
          className="absolute top-0 h-1 bg-primary rounded transition-all duration-300" 
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export function MultiStepBooking() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreeToTerms: false
  })
  const [additionalInfoPrompt, setAdditionalInfoPrompt] = useState(defaultAdditionalInfoPrompt)

  // Update the additional info prompt when service changes
  useEffect(() => {
    if (selectedService) {
      setAdditionalInfoPrompt(additionalInfoPrompts[selectedService] || defaultAdditionalInfoPrompt)
    }
  }, [selectedService])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }))
  }

  // Go to next step
  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Go to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 0: // Service selection
        return selectedService !== null
      case 1: // Calendar
        return selectedTimeslot !== null
      case 2: // Details
        return (
          formData.name.trim() !== "" && 
          formData.email.trim() !== "" && 
          formData.agreeToTerms
        )
      default:
        return true
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingResponse, setBookingResponse] = useState<
    { meeting_url?: string; meeting_id?: string } | null
  >(null);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedService || !selectedTimeslot) {
      return;
    }
    
    setIsSubmitting(true);
    setBookingError(null);
    
    try {
      // Prepare the booking data according to TidyCal API format
      // Testing approach: Use a simplified booking_questions format
      const bookingData = {
        starts_at: selectedTimeslot.starts_at,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        name: formData.name,
        email: formData.email,
        // Use a simpler approach with one question - combine service and message
        booking_questions: [
          {
            booking_type_question_id: 1, 
            answer: `Service: ${selectedService}\nAdditional Info: ${formData.message}`
          }
        ],
        // Include service name for email notifications
        serviceName: selectedService
      };
      
      console.log('Testing simplified booking questions format to fix TidyCal integration issue');
      
      console.log('Submitting booking with data:', JSON.stringify(bookingData, null, 2));
      
      // Create the booking
      const response = await fetch(`/api/booking-types/${TIDYCAL_BOOKING_TYPE_ID}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create booking. Please try again later.');
      }
      
      console.log('Booking created successfully:', responseData);
      
      // Store the booking response
      setBookingResponse(responseData.booking);
      
      // Show the confirmation step
      nextStep();
    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingError(error instanceof Error ? error.message : 'There was an error creating your booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Service selection
        return (
          <div>
            <h2 className="text-2xl font-cormorant font-semibold mb-6">Choose a Service</h2>
            <p className="mb-6 text-muted-foreground">
              Select the type of photography service you&apos;re interested in. Each service is tailored to capture specific moments and tell your unique story.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  selected={selectedService === service.title}
                  onSelect={() => setSelectedService(service.title)}
                />
              ))}
            </div>
          </div>
        )
      
      case 1: // Calendar
        return (
          <div>
            <h2 className="text-2xl font-cormorant font-semibold mb-6">Schedule Your Discovery Call</h2>
            <p className="mb-6 text-muted-foreground">
              Select a date and time for us to discuss your {selectedService?.toLowerCase()} session in detail. 
              This call helps me understand your vision and prepare for a successful photoshoot.
            </p>
            <BookingCalendar 
              packageId={TIDYCAL_BOOKING_TYPE_ID.toString()}
              onSelectTimeslot={(timeslot) => setSelectedTimeslot(timeslot)}
            />
          </div>
        )
      
      case 2: // Details
        return (
          <div>
            <h2 className="text-2xl font-cormorant font-semibold mb-6">Your Details</h2>
            <p className="mb-6 text-muted-foreground">
              Please provide your contact information so I can get in touch with you about your {selectedService?.toLowerCase()} session.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Additional Information</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {additionalInfoPrompt}
                </p>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your vision, questions, or special requests..."
                  rows={5}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms-of-service" className="text-primary hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline">
                    privacy policy
                  </Link>
                </Label>
              </div>
            </div>
          </div>
        )
      
      case 3: // Confirmation
        return (
          <div className="text-center">
            <div className="mb-6 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-cormorant font-semibold mb-4">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for scheduling a discovery call with Jason Holt Photography. I&apos;m looking forward to discussing your {selectedService?.toLowerCase()} vision and creating beautiful images together.
              </p>
              
              {/* Spam folder warning */}
              <div className="mb-8 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-sm">
                <p className="font-medium">⚠️ Important:</p>
                <p>Please check your spam/junk folder if you don&apos;t see the confirmation email in your inbox.</p>
              </div>
            
            <Card className="mb-8 text-left">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Service Type</h3>
                  <p>{selectedService}</p>
                </div>
                {selectedTimeslot && (
                  <div>
                    <h3 className="font-medium">Date & Time</h3>
                    <p>
                      {format(parseISO(selectedTimeslot.starts_at), 'EEEE, MMMM d, yyyy')} at{' '}
                      {format(parseISO(selectedTimeslot.starts_at), 'h:mm a')} - {format(parseISO(selectedTimeslot.ends_at), 'h:mm a')}
                    </p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium">Contact Information</h3>
                  <p>{formData.name}</p>
                  <p>{formData.email}</p>
                </div>
                {formData.message && (
                  <div>
                    <h3 className="font-medium">Additional Information</h3>
                    <p>{formData.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <h3 className="font-medium">What&apos;s Next?</h3>
              <ol className="list-decimal list-inside text-left space-y-2 text-muted-foreground">
                <li>You&apos;ll receive an automatic email confirmation with the call details.</li>
                <li>I&apos;ll prepare for our call by reviewing any information you&apos;ve shared.</li>
                <li>During our conversation, we&apos;ll discuss your vision, answer questions, and create a plan for your session.</li>
                <li>A reminder will be sent 48 hours before our scheduled call.</li>
              </ol>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-medium text-primary mb-2">Meeting Details</h3>
                {bookingResponse?.meeting_url ? (
                  <>
                    <p className="mb-3">Your discovery call will be conducted via Zoom:</p>
                    <a 
                      href={bookingResponse.meeting_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 10l5 5-5 5"></path>
                        <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                      </svg>
                      Join Zoom Meeting
                    </a>
                    {bookingResponse.meeting_id && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Meeting ID: {bookingResponse.meeting_id}
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    You&apos;ll receive meeting details in your confirmation email. If no Zoom link was included, I&apos;ll send you one before our scheduled call.
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-8">
              <Button onClick={() => router.push("/")} className="rounded-full">
                Return to Homepage
              </Button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ProgressIndicator currentStep={currentStep} />
      
      <Card className="p-6">
        <CardContent className="pt-6">
          {renderStepContent()}
        </CardContent>
        
        {currentStep < STEPS.length - 1 && (
          <CardFooter className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="rounded-full"
            >
              Back
            </Button>
            
            {bookingError && currentStep === 2 && (
              <div className="text-destructive text-sm">
                {bookingError}
              </div>
            )}
            
            <Button
              onClick={currentStep === 2 ? handleSubmit : nextStep}
              disabled={!canProceed() || isSubmitting}
              className="rounded-full"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                currentStep === 2 ? "Complete Booking" : "Continue"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
