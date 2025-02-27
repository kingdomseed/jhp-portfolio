import { ImageRotator } from "@/components/ui/image-rotator"
import { Card } from "@/components/ui/card"
import { BackgroundBlobs } from "@/components/ui/background-blobs"

export default function AboutPage() {
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
            Capturing authentic moments and creating timeless memories in Frankfurt and beyond.
          </p>
        </section>

        {/* About Content Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
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
                As an English-speaking photographer based in Frankfurt am Main, I bring a unique perspective to every shoot. 
                My journey in photography began with a passion for capturing genuine moments and has evolved into a professional 
                career focused on creating authentic, emotional images.
              </p>
              <p>
                With years of experience in portrait, wedding, and event photography, I understand that every moment is unique 
                and deserves to be captured with creativity and care. My approach combines technical expertise with an artistic eye, 
                ensuring that each photo tells its own story.
              </p>
              <p>
                Based in Frankfurt, I serve clients throughout Hessen and beyond, bringing a professional yet personal touch to 
                every photography session. Whether it&apos;s a wedding, portrait session, or special event, my goal is to create 
                images that you&apos;ll treasure for years to come.
              </p>
            </div>
          </Card>
        </section>

        {/* Philosophy Section */}
        <Card className="p-8 mb-16 text-center">
          <div className="section-header mb-8">
            <h2 className="font-cormorant text-3xl font-semibold text-primary mb-2">My Approach</h2>
            <p className="text-muted-foreground">The principles that guide my photography</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Authenticity</h3>
              <p className="text-muted-foreground">Capturing genuine moments and real emotions in every frame.</p>
            </Card>
            <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Creativity</h3>
              <p className="text-muted-foreground">Bringing an artistic perspective to tell your unique story.</p>
            </Card>
            <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors duration-300">
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="font-cormorant text-xl font-semibold text-primary mb-2">Excellence</h3>
              <p className="text-muted-foreground">Delivering professional quality and attention to detail.</p>
            </Card>
          </div>
        </Card>
      </div>
    </>
  )
}
