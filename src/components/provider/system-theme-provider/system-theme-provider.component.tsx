"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { theme } from "@project/src/utils/theme";

export interface SystemThemeProviderProps {
    children: React.ReactNode;
}

export default function SystemThemeProvider(props: SystemThemeProviderProps) {
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
}
