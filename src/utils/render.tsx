import { SettingsStoreContext, SettingsStoreProvider } from "@components/provider/settings-provider";
import { testOfflineQueryClient, testQueryClient } from "./query-client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import type { Mock } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import type { SettingState } from "@src/stores/settings.store";
import { SystemLocale } from "@project/src/types/system.types";
import { SystemThemeProvider } from "@components/provider/system-theme-provider";
import type { WidgetState } from "@src/stores/widget.store";
import { WidgetStoreContext } from "@components/provider/widget-provider";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import { render } from "@testing-library/react";
import { vi } from "vitest";

export interface RenderOptions {
    settings?: Partial<SettingState>;
    widgetState?: Partial<WidgetState>;
    offline?: boolean;
    probes?: Partial<{ widget: Mock; settings: Mock }>;
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
        </AppRouterCacheProvider>,
    );
}
