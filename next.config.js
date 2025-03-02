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
};

export default nextConfig;
