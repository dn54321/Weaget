'use client';
import { PaletteMode } from '@mui/material';
import { red } from '@mui/material/colors';
import { Roboto } from 'next/font/google';
import NextLink from 'next/link';
import { forwardRef } from 'react';


const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
    // @ts-ignore
    return <NextLink ref={ref as any} {...props} />;
});

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Create a theme instance.
export const getDesignTokens = (mode: PaletteMode) => ({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#46B4AF"
                }
            }
        },
        MuiLink: {
            defaultProps: {
                component: LinkBehaviour
            }
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehaviour
            }
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },

    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#4682B4',
                    light: '#46B4AF',
                    dark: '#005684',
                    contrastText: '#fff'
                },
                secondary: {
                    main: '#46b478',
                    light: '#7be7a7',
                    dark: '#00834c',
                    contrastText: '#fff'
                },
                error: {
                    main: red.A400,
                },
                text: {
                    primary: "#000",
                    color: '#005684',
                }, 
                background: {
                    default: "#efefef"
                }
            }
            : {
                primary: {
                    main: '#042023',
                    light: 'rgb(54, 76, 79)',
                    dark: '#04292d',
                    contrastText: '#fff'
                },
                secondary: {
                    main: '#46b478',
                    light: '#7be7a7',
                    dark: '#00834c',
                    contrastText: '#fff'
                },
                text: {
                    color: "#638087",
                },
                error: {
                    main: red.A400,
                },
            }),
    },
});