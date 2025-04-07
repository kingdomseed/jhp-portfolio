import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BackgroundBlobs } from "@/components/ui/background-blobs"
import LocalBusinessSchema from "@/components/core/schema-local-business"
import Analytics from "@/components/core/analytics"
import { siteConfig } from "@/lib/theme"

export const metadata: Metadata = {
  title: {
    template: "%s | Jason Holt Photography",
    default: "Jason Holt Photography | Capturing Life's Journey in Frankfurt",
  },
  description: siteConfig.description,
  keywords: "photography, portraits, events, weddings, families, babies, graduates, couples, engagements, corporate, headshots, Frankfurt",
  metadataBase: new URL("https://jasonholtphotography.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jasonholtphotography.com",
    title: "Jason Holt Photography | Capturing Life's Journey",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/jhpt.svg",
        width: 1200,
        height: 630,
        alt: "Jason Holt Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Holt Photography",
    description: siteConfig.description,
    images: ["/images/jhpt.svg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundBlobs variant="subtle" />
          <SiteHeader />
          <Breadcrumbs />
          <main className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
