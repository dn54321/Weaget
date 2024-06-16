import { createTheme, responsiveFontSizes, useMediaQuery } from '@mui/material';
import React from "react";
import { getDesignTokens } from "../utils/theme";
import { useSettingStore } from "./stores/useSettingStore";
import { SystemTheme } from '../types/system.types';



export function useTheme() {
    let themeColour = useSettingStore((state) => state.theme);
    const setTheme = useSettingStore((state) => state.setTheme);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    if (themeColour === SystemTheme.SYSTEM) {
        themeColour = prefersDarkMode ? SystemTheme.DARK : SystemTheme.LIGHT;
        setTheme(themeColour);
    }

    const theme = React.useMemo(
        () => {
            return responsiveFontSizes(createTheme((getDesignTokens(themeColour))));
        }
    , [themeColour]);

    return {setTheme, themeColour, theme};
}