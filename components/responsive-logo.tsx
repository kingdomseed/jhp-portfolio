"use client"

import Link from "next/link"
import { siteConfig } from "@/lib/theme"

export function ResponsiveLogo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Full logo - only visible at larger screens */}
      <span className="hidden lg:inline font-cormorant text-2xl font-bold tracking-tight">
        {siteConfig.name}
      </span>
      
      {/* Medium screens - only show "Jason Holt" */}
      <span className="hidden nav:inline lg:hidden font-cormorant text-2xl font-bold tracking-tight">
        Jason Holt
      </span>
      
      {/* Small screens - only show "JHP" monogram */}
      <span className="inline nav:hidden font-cormorant text-2xl font-bold tracking-tight">
        JHP
      </span>
    </Link>
  );
}
