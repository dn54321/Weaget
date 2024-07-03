import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { testOfflineQueryClient, testQueryClient } from "./query-client";
import React from "react";
import { StoryContext } from "@storybook/react";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import { SettingState } from "@src/stores/settings.store";
import { render } from "@testing-library/react";

export const storybookWrapper = (Story: React.ElementType, context: StoryContext) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <SettingsStoreProvider
                temporary
                settings={{
                    theme: context.globals.theme,
                    measurementScale: context.globals.measurementScale,
                    temperatureScale: context.globals.temperatureScale,
                }}
            >
                <SystemThemeProvider>
                    <CssBaseline />
                    <QueryClientProvider client={testQueryClient}><Story /></QueryClientProvider>
                </SystemThemeProvider>
            </SettingsStoreProvider>
        </AppRouterCacheProvider>
    );
};

export const testWrapper = (props: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <SettingsStoreProvider>
                <SystemThemeProvider>
                    <CssBaseline />
                    <QueryClientProvider client={testQueryClient}>{props.children}</QueryClientProvider>
                </SystemThemeProvider>
            </SettingsStoreProvider>
        </AppRouterCacheProvider>
    );
};

export interface ContextState {
    settings?: Partial<SettingState>;
    offline?: boolean;
}

export function withRender(element: React.ReactElement, state?: ContextState) {
    const query = state?.offline ? testOfflineQueryClient : testQueryClient;
    return render(
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <SettingsStoreProvider settings={state?.settings} temporary>
                <SystemThemeProvider>
                    <CssBaseline />
                    <QueryClientProvider client={query}>{element}</QueryClientProvider>
                </SystemThemeProvider>
            </SettingsStoreProvider>
        </AppRouterCacheProvider>
    );
}
