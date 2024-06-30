import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";

export function OvercastCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { "aria-label": "Overcast cloud" })}
            role="img"
        >
            <Sun fontSize="0.3em" top="40%" left="70%" />
            <Cloud width="0.5em" height="0.5em" top="50%" left="40%" />
            <Cloud width="0.3em" height="0.3em" top="60%" left="70%" />
            <Cloud width="0.9em" top="70%" left="50%" />
        </WeatherIconContainer>
    );
}
