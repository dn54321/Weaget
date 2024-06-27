import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "./weather-icon.styles";

export function ScatteredCloud(props: BoxProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Scattered cloud">
            <Sun fontSize="0.7em" top="50%"/>
            <Cloud width="0.4em" top="80%" left="30%"/>
            <Cloud width="0.6em" top="55%" left="65%"/>
        </WeatherIconContainer>
    )
}