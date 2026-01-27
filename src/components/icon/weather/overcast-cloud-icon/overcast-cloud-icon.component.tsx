import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import type { BoxProps } from "@mui/system";
import type { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function OvercastCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.overcastCloud.title") })}
            role="img"
        >
            <Sun fontSize="0.3em" top="40%" left="70%" />
            <Cloud width="0.5em" height="0.5em" top="50%" left="40%" />
            <Cloud width="0.3em" height="0.3em" top="60%" left="70%" />
            <Cloud width="0.9em" top="70%" left="50%" />
        </WeatherIconContainer>
    );
}
