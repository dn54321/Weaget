import { BoxProps } from "@mui/system";
import { Bolt, GreyCloud, Rain, WeatherIconContainer } from "./weather-icon.styles";

export function Thunderstorm(props: BoxProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Thunderstorm">
            <Rain width="0.3em"  top="75%" left="35%"/>
            <Rain width="0.3em"  top="75%" left="55%"/>
            <Rain width="0.3em"  top="75%" left="75%"/>
            <Bolt fontSize="0.3em" top="70%"/>
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
        </WeatherIconContainer>
    )
}