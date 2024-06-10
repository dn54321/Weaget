import 'reflect-metadata';
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/utils/theme';
import createEmotionCache from '../src/utils/createEmotionCache';
import '@styles/globals.css';
import 'three-dots/dist/three-dots.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const queryClient = new QueryClient({ 
    defaultOptions: {
        queries: { 
            retry: false,
            
        }
    }
});

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    
    return (
        <React.StrictMode>
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Weaget</title>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools buttonPosition="bottom-left"/>
                </QueryClientProvider>
            </ThemeProvider>
        </CacheProvider>
        </React.StrictMode>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};