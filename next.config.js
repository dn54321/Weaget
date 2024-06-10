import 'reflect-metadata';

// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === "development",
        },
    },
}
   
module.exports = nextConfig