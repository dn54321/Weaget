import { Cloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
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
            <Sun fontSize="0.3em" left="70%" top="40%" />
            <Cloud height="0.5em" left="40%" top="50%" width="0.5em" />
            <Cloud height="0.3em" left="70%" top="60%" width="0.3em" />
            <Cloud left="50%" top="70%" width="0.9em" />
        </WeatherIconContainer>
    );
}
