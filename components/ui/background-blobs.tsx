"use client"

import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface BackgroundBlobsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "intense"
  className?: string
}

export function BackgroundBlobs({
  variant = "default",
  className,
  ...props
}: BackgroundBlobsProps) {
  return (
    <div
      className={cn("fixed inset-0 -z-10 overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn(
          "blob blob-1",
          variant === "subtle" && "opacity-50 dark:opacity-40",
          variant === "intense" && "opacity-80 dark:opacity-70"
        )}
        style={{
          top: "15%",
          left: "8%",
        }}
      />
      <div
        className={cn(
          "blob blob-2",
          variant === "subtle" && "opacity-60 dark:opacity-40",
          variant === "intense" && "opacity-80 dark:opacity-70"
        )}
        style={{
          top: "65%",
          right: "10%",
        }}
      />
      <div
        className={cn(
          "blob blob-3",
          variant === "subtle" && "opacity-50 dark:opacity-40",
          variant === "intense" && "opacity-80 dark:opacity-70"
        )}
        style={{
          top: "45%",
          left: "45%",
        }}
      />
    </div>
  )
}
