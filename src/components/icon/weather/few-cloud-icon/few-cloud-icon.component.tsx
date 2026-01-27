import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function FewCloudIcon(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.fewCloud.title") })}
            role="img"
        >
            <Sun fontSize="0.7em" top="50%" />
            <Cloud left="30%" top="70%" width="0.35em" />
        </WeatherIconContainer>
    );
}
