"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/lib/theme"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  const isActive = (path: string, items?: { href: string }[]) => {
    // Check if the current path exactly matches the link's href
    if (pathname === path) return true;
    
    // If this is a dropdown menu item, check if any sub-item matches the current path
    if (items) {
      return items.some(item => pathname === item.href);
    }
    
    return false;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          <div className="flex flex-col space-y-3">
            {siteConfig.mainNav.map((item, index) => (
              item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-accent",
                    isActive(item.href) 
                      ? "text-accent" 
                      : "text-foreground/80"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <Accordion
                  key={`accordion-${index}`}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger 
                      className={cn(
                        "text-lg font-medium py-0 hover:text-accent",
                        isActive("", item.items) 
                          ? "text-accent" 
                          : "text-foreground/80"
                      )}
                    >
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-0">
                      <div className="flex flex-col space-y-3 pl-4">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "text-base font-medium transition-colors hover:text-accent",
                              isActive(subItem.href) 
                                ? "text-accent" 
                                : "text-foreground/80"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            ))}
          </div>
          
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link href={siteConfig.links.threads} target="_blank" rel="noopener noreferrer">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.5 12.086c0-3.131.574-5.335 1.706-6.555C4.322 4.345 5.935 3.825 7.97 3.637c.286-.028 1.904-.155 4.4-.155 1.082 0 2.037.024 2.623.048 3.811.167 5.92 1.973 5.996 5.132.023.958-.008 1.707-.094 2.293-.205 1.447-.734 2.508-1.579 3.158-.878.678-2.039.929-3.475.752l-.158-.022c-1.235-.175-1.9-.599-2.248-1.433-.287-.685-.373-1.47-.258-2.344.05-.383-.255-.718-.639-.718-.385 0-.718.335-.718.718 0 .03 0 .06.003.09.106 2.716-1.121 4.062-3.883 4.24-2.755.177-4.469-1.21-4.833-3.916-.189-1.41-.395-4.723 1.978-6.331 1.525-1.03 3.83-1.206 7.376-.558.55.101 1.075-.28 1.167-.834.092-.554-.281-1.075-.835-1.167-4.291-.786-7.177-.463-9.213.985-3.168 2.253-2.895 6.567-2.655 8.34.489 3.654 3.103 5.918 6.953 5.672 3.371-.216 5.406-1.997 5.648-4.942.651 1.12 1.776 1.824 3.364 2.053l.158.023c1.985.25 3.668-.11 4.981-1.073 1.344-1.035 2.158-2.667 2.428-4.861.097-.667.133-1.49.107-2.538-.1-4.204-3.064-7.051-8.11-7.276-.599-.026-1.564-.05-2.655-.05-2.495 0-4.153.127-4.536.165-2.454.227-4.6.899-6.012 1.896C1.493 5.917.738 8.622.738 12.086c0 3.901.969 7.157 2.806 9.455 2.18 2.718 5.387 4.115 9.528 4.141h.008c4.553 0 7.873-1.306 10.044-3.956 1.896-2.319 2.637-5.377 2.208-9.099-.098-.841-.84-1.44-1.682-1.342-.841.099-1.44.842-1.342 1.683.335 2.878-.169 5.198-1.501 6.903-1.692 2.067-4.437 3.092-8.337 3.13z"/>
                  </svg>
                  <span className="sr-only">Threads</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
