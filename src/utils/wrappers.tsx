import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import { StoryContext } from "@storybook/react";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { testQueryClient } from "./query-client";

export const storybookWrapper = (Story: React.ElementType, context: StoryContext) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <WidgetStoreProvider>
                <SettingsStoreProvider
                    temporary
                    settings={{
                        measurementScale: context.globals.measurementScale,
                        temperatureScale: context.globals.temperatureScale,
                        theme: context.globals.theme,
                    }}
                >
                    <SystemThemeProvider>
                        <CssBaseline />
                        <QueryClientProvider client={testQueryClient}><Story /></QueryClientProvider>
                    </SystemThemeProvider>
                </SettingsStoreProvider>
            </WidgetStoreProvider>
        </AppRouterCacheProvider>
    );
};

export const testWrapper = (props: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <WidgetStoreProvider>
                <SettingsStoreProvider>
                    <SystemThemeProvider>
                        <CssBaseline />
                        <QueryClientProvider client={testQueryClient}>{props.children}</QueryClientProvider>
                    </SystemThemeProvider>
                </SettingsStoreProvider>
            </WidgetStoreProvider>
        </AppRouterCacheProvider>
    );
};
