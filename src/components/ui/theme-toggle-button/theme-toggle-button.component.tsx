import { IconButton, IconButtonProps } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { SystemTheme } from "@src/types/system.types";
import Tooltip from "@mui/material/Tooltip";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export default function ThemeToggleButton(props: IconButtonProps) {
    const { themeColour, toggleTheme } = useSystemSettings();
    const { t } = useSystemTranslation();
    const nextThemeTranslationKey = themeColour == SystemTheme.LIGHT
        ? "component.themeToggleButton.toggleDarkTheme"
        : "component.themeToggleButton.toggleLightTheme";

    return (
        <Tooltip title={t(nextThemeTranslationKey)}>
            <IconButton
                aria-label={t(nextThemeTranslationKey)}
                onClick={toggleTheme}
                sx={{
                    ...props.sx,
                    color: "primary.contrastText",
                }}
                {...props}
            >
                {themeColour === SystemTheme.DARK ? <DarkModeIcon /> : <WbSunnyIcon />}
            </IconButton>
        </Tooltip>
    );
}
