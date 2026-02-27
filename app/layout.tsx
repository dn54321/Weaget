import "three-dots/dist/three-dots.css";
import "@styles/globals.css";
import "@src/i18n/i18n";
import { quicksand, roboto } from "@src/styles/fonts";
import ClientProviders from "@components/provider/client-provider/client-provider.component";
import { InitColorSchemeScript } from "@mui/material";
import React from "react";
import { SystemLocale } from "@project/src/types/system.types";
import { cookies } from "next/dist/server/request/cookies";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
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

export default async function RootLayout(props: { children: React.ReactNode }) {
    inject();
    injectSpeedInsights();

    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("NEXT_LOCALE_STORE");
    const settings = localeCookie ? JSON.parse(localeCookie.value).state : null;
    const locale = settings?.locale || SystemLocale.ENGLISH;

    return (
        <html
            suppressHydrationWarning
            lang={locale}
            className={`${quicksand.variable} ${roboto.variable}`}
        >
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body>
                <InitColorSchemeScript attribute="class" />
                <ClientProviders locale={locale}>
                    {props.children}
                </ClientProviders>
            </body>
        </html>
    );
}
