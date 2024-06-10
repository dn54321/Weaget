// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === "development",
        },
    },
    experimental: {
        instrumentationHook: true,
    },
}
   
module.exports = nextConfig