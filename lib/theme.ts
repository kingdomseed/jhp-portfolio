export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Jason Holt Photography",
  description: "Professional photographer specializing in portraits, events, engagements, and weddings.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Galleries",
      href: "/galleries",
    },
    {
      title: "Bookings",
      href: "/bookings",
    },
    {
      title: "About",
      items: [
        {
          title: "About Jason",
          href: "/about",
        },
        {
          title: "Testimonials",
          href: "/testimonials",
        },
        {
          title: "Blog",
          href: "/blog",
        },
        {
          title: "Contact",
          href: "/contact",
        },
      ],
    },
  ],
  links: {
    instagram: "https://instagram.com/jasonholtphotography",
    facebook: "https://facebook.com/jasonholtphotography",
    threads: "https://threads.net/@jasonholtphotography", // Replaced Pinterest with Threads
  },
  services: [
    {
      title: "Portraits",
      description: "Professional portraits that capture your authentic self",
      image: "/images/optimized/portraits/portrait-1.webp",
      href: "/galleries#portraits",
    },
    {
      title: "Weddings",
      description: "Documenting your special day with care and creativity",
      image: "/images/optimized/couples/couple-3.webp",
      href: "/galleries#weddings",
    },
    {
      title: "Engagements",
      description: "Celebrate your commitment with beautiful engagement photos",
      image: "/images/optimized/couples/couple-1.webp",
      href: "/galleries#engagements",
    },
    {
      title: "Events",
      description: "Professional coverage for your special events and celebrations",
      image: "/images/optimized/events/event-1.webp",
      href: "/galleries#events",
    },
    {
      title: "Family",
      description: "Capture precious moments with your loved ones",
      image: "/images/optimized/family/family-1.webp",
      href: "/galleries#family",
    },
  ],
}
