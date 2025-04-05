"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  interval?: number
  className?: string
}

export function HeroCarousel({
  images,
  interval = 5000,
  className,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsTransitioning(false)
      }, 1000) // Match this with the CSS transition duration
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            index === currentIndex 
              ? "opacity-100 z-10" 
              : "opacity-0 z-0"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              "object-cover object-top transition-transform duration-&lsqb;300ms&rsqb;",
              !isTransitioning && "scale-[1.02] animate-subtle-zoom"
            )}
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ))}
      
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* CTA Overlay */}
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-center text-white px-4">
        {/* Mobile version */}
        <h2 className="block md:hidden text-2xl font-serif font-semibold drop-shadow-md">
          All your life&apos;s moments, celebrated.
        </h2>

        {/* Desktop version */}
        <h2 className="hidden md:block text-3xl font-serif font-semibold drop-shadow-md">
          Capturing Your Life&apos;s Timeless Moments Through Authentic Storytelling
        </h2>

        <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded shadow-lg hover:bg-primary-light transition-colors">
          Book Your Session
        </button>
      </div>
    </div>
  )
}
