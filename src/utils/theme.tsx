'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { Roboto } from 'next/font/google';


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
const theme = responsiveFontSizes(createTheme({
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
        }
    },
    
    
    palette: {
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
            primary: '#fff'
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
    }
}));

export default theme;