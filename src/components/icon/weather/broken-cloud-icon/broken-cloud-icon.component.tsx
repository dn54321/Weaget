import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
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
            <Sun fontSize="0.7em" left="50%" top="50%" />
            <Cloud left="80%" top="35%" width="0.3em" />
            <Cloud left="35%" top="60%" width="0.6em" />
            <Cloud left="60%" top="70%" width="0.7em" />
        </WeatherIconContainer>
    );
}
