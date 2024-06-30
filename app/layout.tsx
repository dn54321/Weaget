"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "three-dots/dist/three-dots.css";
import "@styles/globals.css";
import { queryClient } from "@utils/query-client";
import { ThemeProvider } from "@mui/system";
import { useSystemTheme } from "@src/hooks/use-system-theme";

// We can't add this metadata until nextjs supports emotion on the server side.
// https://nextjs.org/docs/app/building-your-application/styling/css-in-js

// export const metadata: Metadata = {
//     title: 'Weaget',
//     description: `
//         Get accurate minutely, hourly, and daily weather forecasts
//         for any location with our advanced weather website.
//         Stay informed about current conditions, temperature, precipitation, wind, and more.
//         Plan your day with confidence!
//     `,
// }
//
// export const viewport: Viewport = {
//     initialScale: 1,
//     width: "device-width",
// }

export default function RootLayout(props: { children: React.ReactNode }) {
    const { theme } = useSystemTheme();

    return (
        <html lang="en">
            <head>
                <title>Weaget</title>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="theme-color" content={theme.palette.primary.main} />
                <meta
                    name="description"
                    content="Get accurate minutely, hourly, and daily weather forecasts
                             for any location with our advanced weather website.
                             Stay informed about current conditions, temperature, precipitation, wind, and more.
                             Plan your day with confidence!"
                />
            </head>
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <QueryClientProvider client={queryClient}>
                            {props.children}
                            <ReactQueryDevtools buttonPosition="bottom-left" />
                            <Analytics />
                            <SpeedInsights />
                        </QueryClientProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
