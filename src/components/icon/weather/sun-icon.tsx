import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun } from "./weather-icon.styles";

export default function SunIcon(props: BoxProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Sun">
            <Sun fontSize="0.8em"/>
        </WeatherIconContainer>
    )
} 2