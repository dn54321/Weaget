import { BoxProps } from "@mui/system";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { GreyCloud, Rain, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";

export function RainCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { "aria-label": "Rain cloud" })}
            role="img"
        >
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%" />
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%" />
            <GreyCloud width="0.9em" top="50%" left="50%" />
            <Rain width="0.3em" top="75%" left="35%" />
            <Rain width="0.3em" top="75%" left="55%" />
            <Rain width="0.3em" top="75%" left="75%" />
        </WeatherIconContainer>
    );
}
