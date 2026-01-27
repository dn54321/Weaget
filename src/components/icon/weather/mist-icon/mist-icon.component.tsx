import { GreyCloud, Sun, WeatherIconContainer } from "@components/icon/weather/weather-icon.styles";
import type { BoxProps } from "@mui/system";
import type { WeatherIconProps } from "@components/icon/weather/weather-icon.types";
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
            <GreyCloud width="0.8em" top="75%" left="50%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} />
            <GreyCloud width="0.6em" top="50%" left="65%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} />
            <GreyCloud width="0.6em" top="55%" left="35%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} />
            <GreyCloud width="0.7em" top="65%" left="60%" sx={{ backgroundColor: "#fff", opacity: "0.8" }} />
        </WeatherIconContainer>
    );
}
