"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/system";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { createSettingsStore } from "@src/stores/settings.store";
import { createContext } from "react";

export interface SettingProviderProps {
    children: React.ReactNode
}

export type SettingStoreApi = ReturnType<typeof createSettingsStore>;
export const SettingsStoreContext = createContext<SettingStoreApi | undefined>(
    undefined
);

export default function SystemThemeProvider(props: SettingProviderProps) {
    const { theme } = useSystemSettings();
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
}
