"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GalleryImage {
  src: string
  alt: string
  category?: string
  date?: string
  location?: string
}

interface EnhancedLightboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  images: GalleryImage[]
  currentImage: GalleryImage | null
  onNavigate?: (direction: "prev" | "next") => void
}

export function EnhancedLightbox({
  open,
  onOpenChange,
  images,
  currentImage,
  onNavigate
}: EnhancedLightboxProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(-1)

  // Find current image index
  useEffect(() => {
    if (currentImage && images.length > 0) {
      const index = images.findIndex(img => img.src === currentImage.src)
      setCurrentIndex(index)
    }
  }, [currentImage, images])

  // Handle slideshow
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && images.length > 0) {
      interval = setInterval(() => {
        navigateToImage("next")
      }, 3000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentIndex, images.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      
      switch (e.key) {
        case "ArrowLeft":
          navigateToImage("prev")
          break
        case "ArrowRight":
          navigateToImage("next")
          break
        case "Escape":
          onOpenChange(false)
          break
        case " ": // Space bar
          setIsPlaying(prev => !prev)
          e.preventDefault()
          break
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentIndex, images.length, onOpenChange])

  const navigateToImage = (direction: "prev" | "next") => {
    if (images.length <= 1) return
    
    let newIndex
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    } else {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    }
    
    if (onNavigate) {
      onNavigate(direction)
    } else {
      setCurrentIndex(newIndex)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimeout)
    controlsTimeout = setTimeout(() => {
      if (!isHovering) {
        setShowControls(false)
      }
    }, 2000)
  }

  let controlsTimeout: NodeJS.Timeout
  let isHovering = false

  const handleControlsHover = (hovering: boolean) => {
    isHovering = hovering
    if (hovering) {
      setShowControls(true)
    }
  }

  // Social sharing
  const shareImage = (platform: "facebook" | "twitter" | "pinterest" | "email") => {
    if (!currentImage) return
    
    const url = window.location.href
    const text = `Check out this photo: ${currentImage.alt}`
    
    let shareUrl = ""
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(currentImage.src)}&description=${encodeURIComponent(text)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-7xl p-0 overflow-hidden bg-black/95 border-none"
        onMouseMove={handleMouseMove}
      >
        {currentImage && (
          <div className="relative w-full h-full">
            {/* Main image */}
            <div className="relative w-full" style={{ height: "calc(100vh - 100px)" }}>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            
            {/* Navigation arrows */}
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
              )}
              onMouseEnter={() => handleControlsHover(true)}
              onMouseLeave={() => handleControlsHover(false)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/40 text-white hover:bg-black/60"
                onClick={() => navigateToImage("prev")}
                disabled={images.length <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                <span className="sr-only">Previous</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/40 text-white hover:bg-black/60"
                onClick={() => navigateToImage("next")}
                disabled={images.length <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                <span className="sr-only">Next</span>
              </Button>
            </div>
            
            {/* Bottom controls */}
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
              )}
              onMouseEnter={() => handleControlsHover(true)}
              onMouseLeave={() => handleControlsHover(false)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Image info */}
                <div className="text-white">
                  <h3 className="text-lg font-medium">{currentImage.alt}</h3>
                  <div className="flex items-center text-sm text-white/80">
                    {currentImage.category && (
                      <span className="inline-block bg-accent/90 text-white text-xs px-2 py-1 rounded-full mr-2">
                        {currentImage.category.charAt(0).toUpperCase() + currentImage.category.slice(1)}
                      </span>
                    )}
                    {currentImage.location && (
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        {currentImage.location}
                      </span>
                    )}
                    {currentImage.date && currentImage.location && <span className="mx-2">•</span>}
                    {currentImage.date && (
                      <span>{currentImage.date}</span>
                    )}
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-2">
                  {/* Slideshow toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={images.length <= 1}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    )}
                    <span className="sr-only">{isPlaying ? "Pause" : "Play"} slideshow</span>
                  </Button>
                  
                  {/* Share buttons */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                      onClick={() => shareImage("facebook")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                      onClick={() => shareImage("twitter")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                      onClick={() => shareImage("pinterest")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.43.04-3.47l1.42-6.02s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.51.77 1.51 1.7 0 1.03-.66 2.58-1 4.01-.28 1.18.6 2.14 1.78 2.14 2.14 0 3.78-2.25 3.78-5.5 0-2.87-2.06-4.88-5-4.88-3.4 0-5.39 2.55-5.39 5.18 0 1.03.4 2.13.9 2.73.1.12.11.22.08.34l-.34 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.17 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.46-6.22 7.46-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15.94.29 1.92.45 2.94.45a12 12 0 0 0 12-12A12 12 0 0 0 12 0z"/>
                      </svg>
                      <span className="sr-only">Share on Pinterest</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-white hover:bg-white/20"
                      onClick={() => shareImage("email")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span className="sr-only">Share via Email</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Image counter */}
              {images.length > 1 && (
                <div className="mt-4 flex justify-center">
                  <div className="text-white/80 text-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
