import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, IconButtonProps } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { SystemTheme } from '@src/types/system.types';
import { useTheme } from '@src/hooks/use-theme';


export function ThemeToggleButton(props: IconButtonProps) {
    let { themeColour, toggleTheme } = useTheme();

    return (
        <Tooltip title="Toggle Colour Theme">
            <IconButton 
                aria-label="Toggle Colour Theme"
                onClick={toggleTheme} 
                color="inherit"
                {...props}
            >
                {themeColour === SystemTheme.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    );
}