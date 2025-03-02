"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
import { siteConfig } from "@/lib/theme"

// Map path segments to human-readable names
const getPathName = (path: string): string => {
  // Check if it's a top-level path in mainNav
  const mainNavItem = siteConfig.mainNav.find(item => item.href === `/${path}`)
  if (mainNavItem) return mainNavItem.title

  // Check if it's a nested path in mainNav
  for (const item of siteConfig.mainNav) {
    if (item.items) {
      const subItem = item.items.find(subItem => subItem.href === `/${path}`)
      if (subItem) return subItem.title
    }
  }

  // If not found, capitalize the path segment
  return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on home page
  if (pathname === "/") return null
  
  // Split the pathname into segments and remove empty segments
  const segments = pathname.split("/").filter(Boolean)
  
  // If there are no segments (we're on the home page), don't show breadcrumbs
  if (segments.length === 0) return null
  
  return (
    <div className="container py-2 md:py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          {segments.map((segment, index) => {
            // Build the href for this segment
            const href = `/${segments.slice(0, index + 1).join("/")}`
            
            // If this is the last segment, it's the current page
            const isLastSegment = index === segments.length - 1
            
            return (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {isLastSegment ? (
                    <BreadcrumbPage>{getPathName(segment)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{getPathName(segment)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                
                {!isLastSegment && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
