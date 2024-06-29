import { BoxProps } from "@mui/system";
import { Moon, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";

export function MoonIcon(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { ariaLabel: "Moon" })}
        >
            <Moon fontSize="0.8em" />
        </WeatherIconContainer>
    );
}
