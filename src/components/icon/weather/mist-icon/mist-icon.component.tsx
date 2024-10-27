import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun, GreyCloud } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

export function Mist(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;
    const { t } = useSystemTranslation();

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { title: t("weather.icon.mist.title") })}
        >
            <Sun fontSize="0.7em" top="50%" />
            <GreyCloud width="0.8em" top="75%" left="50%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
            <GreyCloud width="0.6em" top="50%" left="65%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
            <GreyCloud width="0.6em" top="55%" left="35%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
            <GreyCloud width="0.7em" top="65%" left="60%" sx={{ opacity: "0.8", backgroundColor: "#fff" }} />
        </WeatherIconContainer>
    );
}
