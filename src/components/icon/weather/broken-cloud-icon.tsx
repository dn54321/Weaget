import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "./weather-icon.styles";

export function BrokenCloud(props: BoxProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Broken clouds">
            <Sun fontSize="0.7em" top="50%" left="50%"/>
            <Cloud width="0.3em" top="35%" left="80%"/>
            <Cloud width="0.6em" top="60%" left="35%"/>
            <Cloud width="0.7em" top="70%" left="60%"/>
        </WeatherIconContainer>
    )
}