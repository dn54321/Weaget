import { BoxProps } from "@mui/system";
import { GreyCloud, Snow1, Snow2, WeatherIconContainer } from "./WeatherIcon.styles";


export function SnowCloud(props: BoxProps) {
    return (
        <WeatherIconContainer {...props}>
            <Snow1 top="70%" left="50%" fontSize="0.5em" angle="20"/>
            <Snow1 top="80%" left="75%" fontSize="0.7em" angle="40"/>
            <Snow1 top="85%" left="55%" fontSize="0.3em" angle="55"/>
            <Snow2 top="80%" left="25%" />
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%"/>
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%"/>
            <GreyCloud width="0.9em" top="50%" left="50%"/>
        </WeatherIconContainer>
    )
}
