/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    TIDYCAL_API_TOKEN: process.env.TIDYCAL_API_TOKEN,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    TIDYCAL_API_TOKEN: process.env.TIDYCAL_API_TOKEN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000/api' 
      : 'https://jasonholtphotography.com/api',
  },
  
  // Redirects configuration
  async redirects() {
    return [
      // Redirect from old standalone Bookings page to Contact page with bookings tab
      {
        source: '/bookings',
        destination: '/contact?tab=book',
        permanent: true, // 308 status code - permanent redirect
      },
      // Redirect from old standalone Journal page to Experience page with journal tab
      {
        source: '/journal',
        destination: '/experience?tab=journal',
        permanent: true, // 308 status code - permanent redirect
      },
      // Preserve old journal post URLs by redirecting to experience with journal tab
      {
        source: '/journal/:slug',
        destination: '/experience?tab=journal',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
