import { GreyCloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { BoxProps } from "@mui/system";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function Mist(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.mist.title") })}
            role="img"
        >
            <Sun fontSize="0.7em" top="50%" />
            <GreyCloud left="50%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} top="75%" width="0.8em" />
            <GreyCloud left="65%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} top="50%" width="0.6em" />
            <GreyCloud left="35%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} top="55%" width="0.6em" />
            <GreyCloud left="60%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} top="65%" width="0.7em" />
        </WeatherIconContainer>
    );
}
