import { IconButton, IconButtonProps } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { SystemTheme } from "@src/types/system.types";
import { useSystemTheme } from "@src/hooks/use-system-theme";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggleButton(props: IconButtonProps) {
    let { themeColour, toggleTheme } = useSystemTheme();
    const nextTheme = themeColour === SystemTheme.LIGHT ? SystemTheme.DARK : SystemTheme.LIGHT;
    return (
        <Tooltip title={`Toggle to ${nextTheme} theme`}>
            <IconButton
                aria-label={`Toggle to ${nextTheme} theme`}
                onClick={toggleTheme}
                sx={{
                    color: "primary.contrastText",
                    ...props.sx,
                }}
                {...props}
            >
                {themeColour === SystemTheme.DARK ? <DarkModeIcon /> : <WbSunnyIcon />}
            </IconButton>
        </Tooltip>
    );
}
