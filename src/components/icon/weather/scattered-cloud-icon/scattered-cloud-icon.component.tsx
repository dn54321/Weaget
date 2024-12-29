import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { BoxProps } from "@mui/system";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function ScatteredCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.scatteredCloud.title") })}
            role="img"
        >
            <Sun fontSize="0.7em" top="50%" />
            <Cloud width="0.4em" top="80%" left="30%" />
            <Cloud width="0.6em" top="55%" left="65%" />
        </WeatherIconContainer>
    );
}
