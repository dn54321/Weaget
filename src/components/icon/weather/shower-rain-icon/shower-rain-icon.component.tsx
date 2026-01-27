import { GreyCloud, Rain, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function ShowerRain(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.showerRain.title") })}
            role="img"
        >
            <Sun fontSize="0.3em" left="70%" top="20%" />
            <GreyCloud height="0.5em" left="40%" top="30%" width="0.5em" />
            <GreyCloud height="0.3em" left="70%" top="40%" width="0.3em" />
            <GreyCloud left="50%" top="50%" width="0.9em" />
            <Rain left="25%" top="70%" width="0.15em" />
            <Rain left="45%" top="70%" width="0.15em" />
            <Rain left="65%" top="70%" width="0.15em" />
            <Rain left="85%" top="70%" width="0.15em" />

            <Rain left="15%" top="85%" width="0.15em" />
            <Rain left="35%" top="85%" width="0.15em" />
            <Rain left="55%" top="85%" width="0.15em" />
            <Rain left="75%" top="85%" width="0.15em" />
        </WeatherIconContainer>
    );
}
