"use client";

import "three-dots/dist/three-dots.css";
import "@styles/globals.css";
import "@src/i18n/i18n";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@utils/query-client";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import React from "react";
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
                <link href="/favicon.svg" rel="icon" type="image/svg+xml"></link>
                <meta content="initial-scale=1, width=device-width" name="viewport" />
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
