import { Moon, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import type { BoxProps } from "@mui/system";
import type { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function MoonIcon(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.moon.title") })}
            role="img"
        >
            <Moon fontSize="0.8em" />
        </WeatherIconContainer>
    );
}
