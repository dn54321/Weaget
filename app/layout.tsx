"use client"

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { queryClient } from '@src/utils/queryClient';
import theme from '@src/utils/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "reflect-metadata";
import 'three-dots/dist/three-dots.css';
import '../styles/globals.css';

export default function RootLayout(props) {
    return (
        <html lang="en">
            <head>
                <title>Weaget</title>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="theme-color" content={theme.palette.primary.main} />
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