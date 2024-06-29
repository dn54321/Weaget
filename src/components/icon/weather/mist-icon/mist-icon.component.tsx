import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, GreyCloud } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";

export function Mist(props: BoxProps & WeatherIconProps) {
    return (
        <WeatherIconContainer {...props} aria-label="Mist">
            <Sun fontSize="0.7em" top="50%" />
            <GreyCloud width="0.8em" top="75%" left="50%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
            <GreyCloud width="0.6em" top="50%" left="65%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
            <GreyCloud width="0.6em" top="55%" left="35%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
            <GreyCloud width="0.7em" top="65%" left="60%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
        </WeatherIconContainer>
    );
}
