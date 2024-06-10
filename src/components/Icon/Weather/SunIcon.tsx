import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun } from "./WeatherIcon.styles";

export default function SunIcon(props: BoxProps) {
    return (
        <WeatherIconContainer {...props}>
            <Sun fontSize="0.8em"/>
        </WeatherIconContainer>
    )
} 2