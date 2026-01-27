import { createTheme, responsiveFontSizes, useMediaQuery } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import React from "react";
import { SystemTheme } from "@src/types/system.types";
import { getDesignTokens } from "@utils/theme";
import { useSettingStore } from "./stores/use-setting-store";

export function useSystemSettings() {
    const storeThemeColour = useSettingStore(state => state.theme);
    const setThemeColour = useSettingStore(state => state.setTheme);
    const toggleTheme = useSettingStore(state => state.toggleTheme);
    const locale = useSettingStore(state => state.locale);
    const setLocale = useSettingStore(state => state.setLocale);
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    let themeColour = storeThemeColour;

    if (storeThemeColour === SystemTheme.SYSTEM) {
        themeColour = prefersDarkMode ? SystemTheme.DARK : SystemTheme.LIGHT;
    }

    const theme = React.useMemo(
        () => {
            return responsiveFontSizes(createTheme((getDesignTokens(themeColour as PaletteMode))));
        }
        , [themeColour]);

    return { locale, setLocale, setThemeColour, theme, themeColour, toggleTheme };
}
