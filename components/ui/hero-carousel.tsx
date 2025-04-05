"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        {images.map((image, index) => (
          index === currentIndex && (
            <motion.div
              key={image.src}
              className="absolute inset-0 h-full w-full z-10"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: 1,
                scale: 1.05 // Subtle zoom level that looks professional
              }}
              exit={{ 
                opacity: 0,
                transition: { 
                  opacity: { duration: 1 } 
                }
              }}
              transition={{ 
                opacity: { duration: 1 },
                scale: { 
                  duration: interval / 1000, // Match the interval
                  ease: "easeOut" 
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
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
              setCurrentIndex(index)
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
        Capturing Your Life&apos;s Timeless Journey, One Moment at a Time
        </h2>

        <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded shadow-lg hover:bg-primary-light transition-colors">
          Book Your Session
        </button>
      </div>
    </div>
  )
}
