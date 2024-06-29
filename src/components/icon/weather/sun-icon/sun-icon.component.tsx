import { BoxProps } from "@mui/system";
import { WeatherIconContainer, Sun } from "@components/icon/weather/weather-icon.styles";
import { WeatherIconProps } from "@components/icon/weather/weather-icon.types";

export default function SunIcon(props: BoxProps & WeatherIconProps) {
    const { decoration, ...rest } = props;

    return (
        <WeatherIconContainer
            {...rest}
            {...(!decoration && { ariaLabel: "Sun" })}
        >
            <Sun fontSize="0.8em" />
        </WeatherIconContainer>
    );
};
