"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionBackgroundProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "muted" | "accent" | "gradient"
  paddingY?: "sm" | "md" | "lg" | "xl" | "none"
}

export function SectionBackground({
  children,
  className,
  variant = "primary", 
  paddingY = "lg",
  ...props
}: SectionBackgroundProps) {
  return (
    <section
      className={cn(
        // Base styles
        "relative w-full overflow-hidden",
        // Padding variants
        paddingY === "none" && "py-0",
        paddingY === "sm" && "py-4 md:py-6",
        paddingY === "md" && "py-8 md:py-12",
        paddingY === "lg" && "py-12 md:py-16",
        paddingY === "xl" && "py-16 md:py-24",
        // Background variants
        variant === "primary" && "bg-muted/80 dark:bg-primary/60", // Increased opacity for better visibility
        variant === "secondary" && "bg-slate/15 bg-opacity-80 dark:bg-muted/50", // New slate influence for better contrast
        variant === "muted" && "bg-background dark:bg-background",
        variant === "accent" && "bg-accent/20 dark:bg-accent/15", // Slightly increased opacity
        variant === "gradient" && "bg-gradient-to-br from-background via-muted to-background/80 dark:from-background dark:via-primary/40 dark:to-background",
        className
      )}
      {...props}
    >
      {/* Potential overlay elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {variant === "gradient" && (
          <>
            <div 
              className="absolute w-64 h-64 rounded-full bg-secondary/30 dark:bg-accent/15 blur-3xl -top-10 -right-10 z-0"
              style={{ transform: "translate(10%, -10%)" }}
            />
            <div 
              className="absolute w-96 h-96 rounded-full bg-slate/15 dark:bg-secondary/15 blur-3xl -bottom-20 -left-20 z-0"
              style={{ transform: "translate(-20%, 20%)" }}
            />
          </>
        )}
        
        {variant === "secondary" && (
          <div 
            className="absolute w-72 h-72 rounded-full bg-slate/10 dark:bg-slate/5 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-50"
          />
        )}
      </div>
      
      {/* Content with proper z-index */}
      <div className="container relative z-10">
        {children}
      </div>
    </section>
  )
}
