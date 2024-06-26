import { Sun, GreyCloud, Rain, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { BoxProps } from "@mui/system";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";

export function ShowerRain(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { "aria-label": "Shower rain" })}
            role="img"
        >
            <Sun fontSize="0.3em" top="20%" left="70%" />
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%" />
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%" />
            <GreyCloud width="0.9em" top="50%" left="50%" />
            <Rain width="0.15em" top="70%" left="25%" />
            <Rain width="0.15em" top="70%" left="45%" />
            <Rain width="0.15em" top="70%" left="65%" />
            <Rain width="0.15em" top="70%" left="85%" />

            <Rain width="0.15em" top="85%" left="15%" />
            <Rain width="0.15em" top="85%" left="35%" />
            <Rain width="0.15em" top="85%" left="55%" />
            <Rain width="0.15em" top="85%" left="75%" />
        </WeatherIconContainer>
    );
}
