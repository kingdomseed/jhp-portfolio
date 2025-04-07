"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/theme"
import { Instagram, Facebook, Hash, Mail } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-cormorant text-2xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional photographer specializing in portraits, events, engagements, and weddings.
              Capturing life&apos;s beautiful moments with a natural, timeless style.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/bookings"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <Link 
                  href="/testimonials"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium">Services</h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:hello@jasonholtphotography.com" className="hover:text-accent">
                  hello@jasonholtphotography.com
                </a>
              </li>
              
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-medium">Follow Me</h4>
              <div className="mt-2 flex space-x-2">
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
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-accent">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
