import Head from 'next/head'
import { useRouter } from 'next/router'

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

/**
 * SEO Component for consistent metadata across the site
 * 
 * @param title Page title (defaults to main site title)
 * @param description Meta description (defaults to site description)
 * @param image OpenGraph image (defaults to site logo)
 * @param article Whether the page is an article (for Open Graph type)
 */
export default function SEO({
  title = "Jason Holt Photography | Capturing Life's Journey in Frankfurt",
  description = "Capturing your life's timeless journey, one moment at a time. Professional photography for families, graduates, couples, weddings, and corporate clients in Frankfurt.",
  image = "/images/jhpt.svg", // Default to logo
  article = false,
}: SEOProps) {
  const router = useRouter()
  const canonicalUrl = `https://jasonholtphotography.com${router.asPath === '/' ? '' : router.asPath}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon - Add more sizes as needed */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
