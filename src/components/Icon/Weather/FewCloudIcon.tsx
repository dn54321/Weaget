import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "./WeatherIcon.styles";

export function FewCloudIcon(props: BoxProps) {
    return (
        <WeatherIconContainer {...props}>
            <Sun fontSize="0.7em" top="50%"/>
            <Cloud width="0.35em" top="70%" left="30%"/>
        </WeatherIconContainer>
    )
}