export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Jason Holt Photography",
  description: "Capturing your life's timeless journey, one moment at a time.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Galleries",
      href: "/galleries",
    },
    {
      title: "Experience",
      href: "/experience", // Now includes Journal content as a tab
    },
    {
      title: "Contact",
      href: "/contact", // Now includes Bookings content as a tab
    },
  ],
  links: {
    instagram: "https://instagram.com/jasonholtphotography",
    facebook: "https://facebook.com/jasonholtphotography",
    threads: "https://threads.net/@jasonholtphotography", // Replaced Pinterest with Threads
  },
  services: [
    {
      title: "Families & Babies",
      description: "Documenting precious early moments and family connections",
      image: "/images/optimized/family/family-1.webp",
      href: "/galleries#families",
    },
    {
      title: "Young Adults & Graduates",
      description: "Celebrating milestones and achievements with authentic portraits",
      image: "/images/optimized/portraits/senior-26.webp",
      href: "/galleries#graduates",
    },
    {
      title: "Couples & Engagements",
      description: "Capturing the joy and connection of your relationship",
      image: "/images/optimized/couples/couple-1.webp",
      href: "/galleries#couples",
    },
    {
      title: "Weddings & Celebrations",
      description: "Telling the story of your special days and meaningful events",
      image: "/images/optimized/couples/couple-3.webp",
      href: "/galleries#weddings",
    },
    {
      title: "Professional & Corporate",
      description: "Elevating your professional image with authentic, polished photography",
      image: "/images/optimized/headshots/headshot1.webp",
      href: "/galleries#professional",
    },
    {
      title: "Tailored Photography Experiences",
      description: "Custom photography solutions for your unique vision and needs",
      image: "/images/optimized/events/event-1.webp",
      href: "/galleries#tailored",
    },
  ],
}
