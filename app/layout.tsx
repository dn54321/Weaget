"use client"
import "reflect-metadata";
import 'three-dots/dist/three-dots.css';
import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { queryClient } from '@src/utils/queryClient';
import theme from '@src/utils/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout(props) {      
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
                            <ReactQueryDevtools buttonPosition="bottom-left"/>
                        </QueryClientProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}