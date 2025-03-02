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
              "object-cover scale-[1.02] transition-transform duration-[10000ms]",
              !isTransitioning && "animate-subtle-zoom"
            )}
            priority={index === 0}
            sizes="100vw"
          />
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
    </div>
  )
}
