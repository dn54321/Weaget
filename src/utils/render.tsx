import { SettingsStoreContext, SettingsStoreProvider } from "@components/provider/settings-provider";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import { WidgetStoreContext } from "@components/provider/widget-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SettingState } from "@src/stores/settings.store";
import { WidgetState } from "@src/stores/widget.store";
import { SystemLocale } from "@src/types/system.types";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { Mock, vi } from "vitest";

import { testOfflineQueryClient, testQueryClient } from "./query-client";

export interface RenderOptions {
    offline?: boolean
    probes?: Partial<{ settings: Mock, widget: Mock }>
    settings?: Partial<SettingState>
    widgetState?: Partial<WidgetState>
}

export function withRender(element: React.ReactElement, options?: RenderOptions) {
    const settings = { locale: SystemLocale.ENGLISH, ...options?.settings };
    const query = options?.offline ? testOfflineQueryClient : testQueryClient;
    const probes = { settings: vi.fn(), widget: vi.fn(), ...(options?.probes || {}) };
    return render(
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <WidgetStoreProvider widgetState={options?.widgetState}>
                <SettingsStoreProvider settings={settings} temporary>
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
