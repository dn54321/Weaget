import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { SystemTheme } from "@src/types/system.types";
import { testOfflineQueryClient, testQueryClient } from "./query-client";
import { getDesignTokens } from "./theme";
export const testWrapper = ({ children }) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={createTheme(getDesignTokens(SystemTheme.LIGHT))}>
                <CssBaseline />
                <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export function withTestWrapper(element: React.ReactElement) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={createTheme(getDesignTokens(SystemTheme.LIGHT))}>
                <CssBaseline />
                <QueryClientProvider client={testQueryClient}>{element}</QueryClientProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}

export function withTestOfflineWrapper(element: React.ReactElement) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={createTheme(getDesignTokens(SystemTheme.LIGHT))}>
                <CssBaseline />
                <QueryClientProvider client={testOfflineQueryClient}>{element}</QueryClientProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
