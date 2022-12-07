/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "http://localhost:4000",
    // NEXT_PUBLIC_PORTFOLIO_URL: "https://dievanodantas.netlify.app"
  }
}

module.exports = nextConfig;
