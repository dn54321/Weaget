import { QueryClientProvider } from "@tanstack/react-query";
import { Mock, vi } from "vitest";
import { SettingState } from "@src/stores/settings.store";
import { WidgetState } from "@src/stores/widget.store";
import { testOfflineQueryClient, testQueryClient } from "./query-client";
import { render } from "@testing-library/react";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SettingsStoreProvider, SettingsStoreContext } from "@components/provider/settings-provider";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import { WidgetStoreContext } from "@components/provider/widget-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";

export interface RenderOptions {
    settings?: Partial<SettingState>;
    widgetState?: Partial<WidgetState>;
    offline?: boolean;
    probes?: Partial<{ widget: Mock; settings: Mock }>;
}

export function withRender(element: React.ReactElement, options?: RenderOptions) {
    const query = options?.offline ? testOfflineQueryClient : testQueryClient;
    const probes = { widget: vi.fn(), settings: vi.fn(), ...(options?.probes || {}) };
    return render(
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <WidgetStoreProvider widgetState={options?.widgetState}>
                <SettingsStoreProvider settings={options?.settings} temporary>
                    <SystemThemeProvider>
                        <CssBaseline />
                        <QueryClientProvider client={query}>{element}</QueryClientProvider>
                        <WidgetStoreContext.Consumer>
                            {(state) => {
                                state?.subscribe(probes.widget);
                                return "";
                            }}
                        </WidgetStoreContext.Consumer>
                        <SettingsStoreContext.Consumer>
                            {(state) => {
                                state?.subscribe(probes.settings);
                                return "";
                            }}
                        </SettingsStoreContext.Consumer>
                    </SystemThemeProvider>
                </SettingsStoreProvider>
            </WidgetStoreProvider>
        </AppRouterCacheProvider>
    );
}
