import { Bolt, GreyCloud, Rain, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import type { BoxProps } from "@mui/system";
import type { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function Thunderstorm(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.thunderstorm.title") })}
            role="img"
        >
            <Rain width="0.3em" top="75%" left="35%" />
            <Rain width="0.3em" top="75%" left="55%" />
            <Rain width="0.3em" top="75%" left="75%" />
            <Bolt fontSize="0.3em" top="70%" />
            <GreyCloud width="0.5em" height="0.5em" top="30%" left="40%" />
            <GreyCloud width="0.3em" height="0.3em" top="40%" left="70%" />
            <GreyCloud width="0.9em" top="50%" left="50%" />
        </WeatherIconContainer>
    );
}
