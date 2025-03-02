"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface GalleryFiltersProps {
  categories: string[]
  onCategoryChange: (category: string) => void
  onSortChange: (sortBy: string) => void
  className?: string
}

export function GalleryFilters({
  categories,
  onCategoryChange,
  onSortChange,
  className
}: GalleryFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeSort, setActiveSort] = useState<string>("newest")

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  const handleSortChange = (sortBy: string) => {
    setActiveSort(sortBy)
    onSortChange(sortBy)
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
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        {/* Sort options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            value={activeSort}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
