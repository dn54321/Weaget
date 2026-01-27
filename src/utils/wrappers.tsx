import "@src/i18n/i18n";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SystemLocale } from "@src/types/system.types";
import { StoryContext } from "@storybook/react";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { testQueryClient } from "./query-client";
export const storybookWrapper = (Story: React.ElementType, context: StoryContext) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <WidgetStoreProvider>
                <SettingsStoreProvider
                    settings={{
                        locale: SystemLocale.ENGLISH,
                        measurementScale: context.globals.measurementScale,
                        temperatureScale: context.globals.temperatureScale,
                        theme: context.globals.theme
                    }}
                    temporary
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
