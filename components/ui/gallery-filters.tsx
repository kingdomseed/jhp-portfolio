"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GalleryFiltersProps {
  categories: string[]
  onCategoryChange: (category: string) => void
  onRefresh: () => void
  className?: string
  categoryLabels?: Record<string, string>
}

export function GalleryFilters({
  categories,
  onCategoryChange,
  onRefresh,
  className,
  categoryLabels
}: GalleryFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleCategoryChange("all")}
          >
            {categoryLabels && categoryLabels["all"] ? categoryLabels["all"] : "All"}
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryChange(category)}
            >
              {categoryLabels && categoryLabels[category] 
                ? categoryLabels[category] 
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        {/* Roll the Dice button */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefresh}
          className="rounded-full px-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Surprise Me!
        </Button>
      </div>
    </div>
  )
}
