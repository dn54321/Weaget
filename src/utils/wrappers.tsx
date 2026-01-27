import "@src/i18n/i18n";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import type { StoryContext } from "@storybook/react";
import { SystemLocale } from "@project/src/types/system.types";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import createCache from "@emotion/cache";
import { testQueryClient } from "./query-client";

const cache = createCache({
    key: "test",
    prepend: true,
});

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
                        locale: SystemLocale.ENGLISH,
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
        <CacheProvider value={cache}>
            <WidgetStoreProvider>
                <SettingsStoreProvider>
                    <SystemThemeProvider>
                        <CssBaseline />
                        <QueryClientProvider client={testQueryClient}>{props.children}</QueryClientProvider>
                    </SystemThemeProvider>
                </SettingsStoreProvider>
            </WidgetStoreProvider>
        </CacheProvider>
    );
};
