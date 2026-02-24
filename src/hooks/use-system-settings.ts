import { SystemTheme } from "@src/types/system.types";
import { theme as systemTheme } from "@utils/theme";
import { useColorScheme } from "@mui/material";
import { useSettingStore } from "./stores/use-setting-store";

export function useSystemSettings() {
    // const storeThemeColour = useSettingStore(state => state.theme);
    const locale = useSettingStore(state => state.locale);
    const setLocale = useSettingStore(state => state.setLocale);
    const { mode, setMode, systemMode } = useColorScheme();
    // let themeColour = storeThemeColour;

    // if (storeThemeColour === SystemTheme.SYSTEM) {
    //     themeColour = prefersDarkMode ? SystemTheme.DARK : SystemTheme.LIGHT;
    // }

    const theme = systemTheme;

    const toggleTheme = () => {
        if (mode === SystemTheme.LIGHT) {
            setMode("dark");
        }
        else if (mode === SystemTheme.DARK) {
            setMode("light");
        }
        else if (systemMode === SystemTheme.LIGHT) {
            setMode("dark");
        }
        else if (systemMode === SystemTheme.DARK) {
            setMode("light");
        }
    };

    return { locale, setLocale, setThemeColour: setMode, theme, themeColour: mode, toggleTheme };
}
