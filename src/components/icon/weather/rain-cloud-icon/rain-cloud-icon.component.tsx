import { GreyCloud, Rain, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function RainCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.rainCloud.title") })}
            role="img"
        >
            <GreyCloud height="0.5em" left="40%" top="30%" width="0.5em" />
            <GreyCloud height="0.3em" left="70%" top="40%" width="0.3em" />
            <GreyCloud left="50%" top="50%" width="0.9em" />
            <Rain left="35%" top="75%" width="0.3em" />
            <Rain left="55%" top="75%" width="0.3em" />
            <Rain left="75%" top="75%" width="0.3em" />
        </WeatherIconContainer>
    );
}
