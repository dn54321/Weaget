"use client";

import { createContext } from "react";
import { createSettingsStore } from "@src/stores/settings.store";
import { ThemeProvider as MuiThemeProvider } from "@mui/system";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { SystemTheme } from "@src/types/system.types";

export interface SettingProviderProps {
    theme?: SystemTheme;
    children: React.ReactNode;
}

export type SettingStoreApi = ReturnType<typeof createSettingsStore>;
export const SettingsStoreContext = createContext<SettingStoreApi | undefined>(
    undefined,
);

export default function SystemThemeProvider(props: SettingProviderProps) {
    const { theme, setThemeColour } = useSystemSettings();
    if (props.theme) {
        setThemeColour(props.theme);
    }
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
}
