import { BoxProps } from "@mui/system";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { WeatherIconContainer, Sun, Cloud } from "@components/icon/weather/weather-icon.styles";

export function ScatteredCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest} = props;
    
    return ( 
        <WeatherIconContainer 
            {...rest}
            {...(!decoration && {ariaLabel: "Scattered cloud"})}
        >
            <Sun fontSize="0.7em" top="50%"/>
            <Cloud width="0.4em" top="80%" left="30%"/>
            <Cloud width="0.6em" top="55%" left="65%"/>
        </WeatherIconContainer>
    )
}