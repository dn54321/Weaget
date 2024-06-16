import { IconButton, IconButtonProps } from "@mui/material";
import { useSettingStore } from "../hooks/stores/useSettingStore";
import { SystemTheme } from "../types/system.types";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from '@mui/material/Tooltip';

export function ThemeToggleButton(props: IconButtonProps) {
    const theme = useSettingStore((state) => state.theme);
    const toggleTheme = useSettingStore((state) => state.toggleTheme);

    return (
        <Tooltip title="Toggle Colour Theme">
            <IconButton 
                aria-label="Toggle Colour Theme"
                onClick={toggleTheme} 
                color="inherit"
                {...props}
            >
                {theme === SystemTheme.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    );
}