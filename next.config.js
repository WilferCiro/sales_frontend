/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_DASHBOARD_URL: process.env.API_DASHBOARD_URL,
    API_SALES_URL: process.env.API_SALES_URL,
    API_USERS_URL: process.env.API_USERS_URL,
  }
}

module.exports = nextConfig
