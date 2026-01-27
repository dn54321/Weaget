import { GreyCloud, Snow1, Snow2, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function SnowCloud(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.snowCloud.title") })}
            role="img"
        >
            <Snow1 angle="20" fontSize="0.5em" left="50%" top="70%" />
            <Snow1 angle="40" fontSize="0.7em" left="75%" top="80%" />
            <Snow1 angle="55" fontSize="0.3em" left="55%" top="85%" />
            <Snow2 left="25%" top="80%" />
            <GreyCloud height="0.5em" left="40%" top="30%" width="0.5em" />
            <GreyCloud height="0.3em" left="70%" top="40%" width="0.3em" />
            <GreyCloud left="50%" top="50%" width="0.9em" />
        </WeatherIconContainer>
    );
}
