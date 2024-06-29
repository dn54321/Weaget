import { PaletteMode, createTheme, responsiveFontSizes, useMediaQuery } from "@mui/material";
import React from "react";
import { getDesignTokens } from "@utils/theme";
import { useSettingStore } from "./stores/use-setting-store";
import { SystemTheme } from "@src/types/system.types";

export function useTheme() {
    const storeThemeColour = useSettingStore(state => state.theme);
    const setThemeColour = useSettingStore(state => state.setTheme);
    const toggleTheme = useSettingStore(state => state.toggleTheme);
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

    return { setThemeColour, toggleTheme, themeColour, theme };
}
