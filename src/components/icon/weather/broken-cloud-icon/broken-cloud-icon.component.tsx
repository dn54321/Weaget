import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { BoxProps } from "@mui/system";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function BrokenCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.brokenCloud.title") })}
            role="img"
        >
            <Sun fontSize="0.7em" top="50%" left="50%" />
            <Cloud width="0.3em" top="35%" left="80%" />
            <Cloud width="0.6em" top="60%" left="35%" />
            <Cloud width="0.7em" top="70%" left="60%" />
        </WeatherIconContainer>
    );
}
