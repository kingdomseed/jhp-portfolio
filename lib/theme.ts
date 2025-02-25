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
      title: "About",
      href: "/about",
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
      title: "Testimonials",
      href: "/testimonials",
    },
    {
      title: "Bookings",
      href: "/bookings",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    instagram: "https://instagram.com/jasonholtphotography",
    facebook: "https://facebook.com/jasonholtphotography",
    pinterest: "https://pinterest.com/jasonholtphoto",
  },
  services: [
    {
      title: "Portraits",
      description: "Professional portraits that capture your authentic self",
      image: "/images/portrait1.jpeg",
      href: "/galleries#portraits",
    },
    {
      title: "Weddings",
      description: "Documenting your special day with care and creativity",
      image: "/images/couple3.jpeg",
      href: "/galleries#weddings",
    },
    {
      title: "Engagements",
      description: "Celebrate your commitment with beautiful engagement photos",
      image: "/images/engagement1.jpeg",
      href: "/galleries#engagements",
    },
    {
      title: "Events",
      description: "Professional coverage for your special events and celebrations",
      image: "/images/event1.jpeg",
      href: "/galleries#events",
    },
  ],
}
