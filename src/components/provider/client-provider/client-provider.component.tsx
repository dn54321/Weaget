"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import LanguageHydrator from "@components/context/language-hydrator/language-hydrator";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SettingsStoreProvider } from "@components/provider/settings-provider";
import type { SystemLocale } from "@project/src/types/system.types";
import { ThemeProvider } from "@mui/material";
import WidgetStoreProvider from "@components/provider/widget-provider/widget-store-provider.component";
import i18n from "@project/src/i18n/i18n";
import { queryClient } from "@utils/query-client";
import { theme } from "@project/src/utils/theme";

export default function ClientProviders(
    { children, locale }: { children: React.ReactNode; locale: SystemLocale },
) {
    if (i18n.isInitialized && i18n.language !== locale) {
        i18n.changeLanguage(locale);
    }

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <SettingsStoreProvider settings={{ locale }}>
                <WidgetStoreProvider>
                    <ThemeProvider theme={theme}>
                        <QueryClientProvider client={queryClient}>
                            <LanguageHydrator />
                            {children}
                            <ReactQueryDevtools buttonPosition="bottom-left" />
                        </QueryClientProvider>
                    </ThemeProvider>
                </WidgetStoreProvider>
            </SettingsStoreProvider>
        </AppRouterCacheProvider>
    );
}
