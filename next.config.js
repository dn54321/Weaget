// @ts-check
import { fileURLToPath } from "url";
import path from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === "development",
        },
    },
    turbopack: {
        root: __dirname,
    },
    experimental: {
        inlineCss: true,
    },
};

export default nextConfig;
