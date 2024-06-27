// @ts-check
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === "development",
        },
    },
}
   
export default bundleAnalyzer(nextConfig);