import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
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
            <Cloud left="30%" top="80%" width="0.4em" />
            <Cloud left="65%" top="55%" width="0.6em" />
        </WeatherIconContainer>
    );
}
