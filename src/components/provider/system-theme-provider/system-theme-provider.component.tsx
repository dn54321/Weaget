"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext } from "react";
import type { createSettingsStore } from "@src/stores/settings.store";
import { theme } from "@project/src/utils/theme";

export interface SettingProviderProps {
    children: React.ReactNode;
}

export type SettingStoreApi = ReturnType<typeof createSettingsStore>;
export const SettingsStoreContext = createContext<SettingStoreApi | undefined>(
    undefined,
);

export default function SystemThemeProvider(props: SettingProviderProps) {
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
}
