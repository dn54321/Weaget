import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "./weather-icon.styles";

export function FewCloudIcon(props: BoxProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Few clouds">
            <Sun fontSize="0.7em" top="50%"/>
            <Cloud width="0.35em" top="70%" left="30%"/>
        </WeatherIconContainer>
    )
}