import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, Cloud } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";

export function FewCloudIcon(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { "aria-label": "Few clouds" })}
            role="img"
        >
            <Sun fontSize="0.7em" top="50%" />
            <Cloud width="0.35em" top="70%" left="30%" />
        </WeatherIconContainer>
    );
}
