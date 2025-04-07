import Head from 'next/head';
import { siteConfig } from '@/lib/theme';

type LocalBusinessSchemaProps = {
  phone?: string; // Optional phone number - can be added later
}

/**
 * Schema.org LocalBusiness structured data component
 * Helps search engines understand business details for rich search results
 * 
 * @param phone Optional business phone number
 */
export default function LocalBusinessSchema({ phone }: LocalBusinessSchemaProps) {
  // Get the current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Prepare schema data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "image": [
      "https://jasonholtphotography.com/images/jhpt.svg"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Frankfurt am Main",
      "addressRegion": "Hessen",
      "addressCountry": "DE"
    },
    "url": "https://jasonholtphotography.com",
    ...(phone && { "telephone": phone }), // Only include phone if provided
    "priceRange": "€€",
    "description": siteConfig.description,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      siteConfig.links.instagram,
      siteConfig.links.facebook,
      siteConfig.links.threads
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Families & Babies Photography",
            "description": "Newborn photography, family portraits, childhood milestones, family gatherings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Young Adults & Graduates Photography",
            "description": "Senior portraits, graduation sessions, teen and college milestones"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Couples & Engagements Photography",
            "description": "Proposals, engagements, anniversaries, couple milestone sessions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Weddings & Celebrations Photography",
            "description": "Weddings, vow renewals, events, performances, reunions, special occasions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional & Corporate Photography",
            "description": "Business headshots, corporate teams, workplace branding, professional profiles"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tailored Photography Experiences",
            "description": "Custom event coverage, multi-generational projects, creative collaborations"
          }
        }
      ]
    },
    "copyrightYear": currentYear,
    "copyrightHolder": {
      "@type": "Person",
      "name": "Jason Holt"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />
    </Head>
  );
}
