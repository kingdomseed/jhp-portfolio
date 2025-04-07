"use client"

import Link from "next/link"
import { ResponsiveLogo } from "@/components/responsive-logo"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { siteConfig } from "@/lib/theme"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Instagram, Facebook, Hash } from "lucide-react"

// Define the type for navigation items with optional items for dropdowns
type NavItem = {
  title: string;
  href?: string;
  items?: { title: string; href: string }[];
};

export function SiteHeader() {
  const pathname = usePathname()
  
  // Cast the navigation items to the proper type
  const navItems = siteConfig.mainNav as NavItem[];
  
  const isActive = (path: string, items?: { href: string; title: string }[]) => {
    // Check if the current path exactly matches the link's href
    if (pathname === path) return true;
    
    // If this is a dropdown menu item, check if any sub-item matches the current path
    if (items) {
      return items.some(item => pathname === item.href);
    }
    
    return false;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md dark:bg-muted/90 bg-muted/90 supports-[backdrop-filter]:bg-muted/80 dark:supports-[backdrop-filter]:bg-muted/80">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <ResponsiveLogo />
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden nav:flex nav:items-center nav:space-x-10">
          {navItems.map((item, index) => (
            item.href ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-accent relative",
                  isActive(item.href) 
                    ? "text-accent font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-accent" 
                    : "text-foreground/80"
                )}
              >
                {item.title}
              </Link>
            ) : (
              <div key={`menu-${index}`} className="relative group">
                <button
                  className={cn(
                    "text-base font-medium transition-colors hover:text-accent relative",
                    isActive("", item.items) 
                      ? "text-accent font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-accent" 
                      : "text-foreground/80"
                  )}
                >
                  {item.title}
                </button>
                {/* This is a transparent bridge to maintain hover state */}
                <div className="absolute left-0 h-2 w-full"></div>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border hidden group-hover:block z-50">
                  <div className="py-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors hover:text-accent hover:bg-accent/10 relative",
                          isActive(subItem.href) 
                            ? "text-accent font-semibold bg-accent/5 border-l-2 border-accent pl-[calc(1rem-2px)]" 
                            : "text-foreground/80"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </nav>
        
          {/* Social & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden nav:flex nav:items-center nav:space-x-2">
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="size-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook className="size-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href={siteConfig.links.threads} target="_blank" rel="noopener noreferrer">
                <Hash className="size-5" />
                <span className="sr-only">Threads</span>
              </Link>
            </Button>
          </div>
          
          <ModeToggle />
          
          {/* Mobile Menu - Only visible below nav breakpoint */}
          <div className="nav:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
