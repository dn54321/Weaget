import { createTheme, responsiveFontSizes } from '@mui/material';
import React from "react";
import { getDesignTokens } from "../utils/theme";
import { useSettingStore } from "./stores/useSettingStore";



export function useTheme() {
    const themeColour = useSettingStore((state) => state.theme);
    const toggleTheme = useSettingStore((state) => state.toggleTheme);
    
    const theme = React.useMemo(
        () => {
            return responsiveFontSizes(createTheme((getDesignTokens(themeColour))));
        }
    , [themeColour]);

    return {toggleTheme, themeColour, theme};
}