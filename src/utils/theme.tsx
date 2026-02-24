"use client";
import type {} from "@mui/material/themeCssVarsAugmentation";
import NextLink from "next/link";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { red } from "@mui/material/colors";

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
    // @ts-expect-error - https://github.com/mui/material-ui/issues/27593
    return <NextLink ref={ref} {...props} />;
});

const roboto = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

// Create a theme instance.
export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "class",
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: "#efefef",
                },
                error: {
                    main: red.A400,
                },
                primary: {
                    contrastText: "#fff",
                    dark: "#005684",
                    light: "#46B4AF",
                    main: "#4682B4",
                },
                secondary: {
                    contrastText: "#fff",
                    dark: "#00834c",
                    light: "#7be7a7",
                    main: "#46b478",
                },
                text: {
                    primary: "#000",
                    secondary: "#005684",
                },
            },
        },
        dark: {
            palette: {
                error: {
                    main: red.A400,
                },
                primary: {
                    contrastText: "#fff",
                    dark: "#04292d",
                    light: "rgb(54, 76, 79)",
                    main: "#042023",
                },
                secondary: {
                    contrastText: "#fff",
                    dark: "#00834c",
                    light: "#7be7a7",
                    main: "#46b478",
                },
                text: {
                    primary: "#fff",
                    secondary: "rgba(255,255,255,0.7)",
                },
            },
        },
    },
    breakpoints: {
        values: {
            lg: 1200,
            md: 900,
            sm: 600,
            xl: 1536,
            xs: 0,
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehaviour,
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#46B4AF",
                },
            },
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});
