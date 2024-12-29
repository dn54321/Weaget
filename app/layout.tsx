"use client";

import "three-dots/dist/three-dots.css";
import "@styles/globals.css";
import "@src/i18n/i18n";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { queryClient } from "@utils/query-client";
// We can't add this metadata until nextjs supports emotion on the server side.
// https://nextjs.org/docs/app/building-your-application/styling/css-in-js

// export const metadata: Metadata = {
//     title: "Weaget",
//     description: `
//         Get accurate minutely, hourly, and daily weather forecasts
//         for any location with our advanced weather website.
//         Stay informed about current conditions, temperature, precipitation, wind, and more.
//         Plan your day with confidence!
//     `,
// };

// export const viewport: Viewport = {
//     initialScale: 1,
//     width: "device-width",
// };

export default function RootLayout(props: { children: React.ReactNode }) {
    inject();
    injectSpeedInsights();

    return (
        <html>
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <SettingsStoreProvider>
                        <WidgetStoreProvider>
                            <SystemThemeProvider>
                                <CssBaseline />
                                <QueryClientProvider client={queryClient}>
                                    {props.children}
                                    <ReactQueryDevtools buttonPosition="bottom-left" />
                                </QueryClientProvider>
                            </SystemThemeProvider>
                        </WidgetStoreProvider>
                    </SettingsStoreProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
