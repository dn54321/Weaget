import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "./weather-icon.styles";

export function OvercastCloud(props: BoxProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Overcast cloud">
            <Sun fontSize="0.3em" top="40%" left="70%"/>
            <Cloud width="0.5em" height="0.5em" top="50%" left="40%"/>
            <Cloud width="0.3em" height="0.3em" top="60%" left="70%"/>
            <Cloud width="0.9em" top="70%" left="50%"/>
        </WeatherIconContainer>
    )
}