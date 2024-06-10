import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Rain, GreyCloud } from "./WeatherIcon.styles";

export function RainCloud(props: BoxProps) {
    return (
        <WeatherIconContainer {...props}>
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
            <Rain width="0.3em"  top="75%" left="35%"/>
            <Rain width="0.3em"  top="75%" left="55%"/>
            <Rain width="0.3em"  top="75%" left="75%"/>
        </WeatherIconContainer>
    )
}
