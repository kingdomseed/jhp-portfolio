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
          variant === "subtle" && "opacity-30",
          variant === "intense" && "opacity-70"
        )}
        style={{
          top: "20%",
          left: "10%",
        }}
      />
      <div
        className={cn(
          "blob blob-2",
          variant === "subtle" && "opacity-30",
          variant === "intense" && "opacity-70"
        )}
        style={{
          top: "60%",
          right: "15%",
        }}
      />
      <div
        className={cn(
          "blob blob-3",
          variant === "subtle" && "opacity-30",
          variant === "intense" && "opacity-70"
        )}
        style={{
          top: "40%",
          left: "50%",
        }}
      />
    </div>
  )
}
