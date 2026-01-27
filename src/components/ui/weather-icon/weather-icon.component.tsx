import { BrokenCloud } from "@components/icon/weather/broken-cloud-icon";
import { FewCloudIcon } from "@components/icon/weather/few-cloud-icon/few-cloud-icon.component";
import { Mist } from "@components/icon/weather/mist-icon";
import { MoonIcon } from "@components/icon/weather/moon-icon/moon-icon.component";
import { OvercastCloud } from "@components/icon/weather/overcast-cloud-icon/overcast-cloud-icon.component";
import { RainCloud } from "@components/icon/weather/rain-cloud-icon";
import { ScatteredCloud } from "@components/icon/weather/scattered-cloud-icon";
import { ShowerRain } from "@components/icon/weather/shower-rain-icon/shower-rain-icon.component";
import { SnowCloud } from "@components/icon/weather/snow-cloud-icon/snow-cloud-icon.component";
import SunIcon from "@components/icon/weather/sun-icon/sun-icon.component";
import { Thunderstorm } from "@components/icon/weather/thunderstorm-icon/thunderstorm-icon.component";
import { Chip } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { round } from "@utils/math";

export type WeatherIconProps = Omit<BoxProps, "id"> & {
    decoration?: boolean
    id: number
    rainPercentage?: number
};

export default function WeatherIcon(props: WeatherIconProps) {
    const WeatherIcon = getWeatherIcon(props.id, Boolean(props.decoration));
    return (
        <Box position="relative">
            {WeatherIcon}
            {props.rainPercentage ? <RainIndicator rainPercentage={props.rainPercentage} /> : ""}
        </Box>
    );
}

function getWeatherIcon(iconId: number, isDecoration = false) {
    switch (iconId) {
        case 200: return (<Thunderstorm decoration={isDecoration} />);
        case 300: return (<ShowerRain decoration={isDecoration} />);
        case 500: return (<RainCloud decoration={isDecoration} />);
        case 600: return (<SnowCloud decoration={isDecoration} />);
        case 700: return (<Mist decoration={isDecoration} />);
        case 800: return (<SunIcon decoration={isDecoration} />);
        case 801: return (<FewCloudIcon decoration={isDecoration} />);
        case 802: return (<ScatteredCloud decoration={isDecoration} />);
        case 803: return (<BrokenCloud decoration={isDecoration} />);
        case 804: return (<OvercastCloud decoration={isDecoration} />);
        default: return (iconId % 100)
            ? (<WeatherIcon id={iconId - (iconId % 100)} />)
            : (<MoonIcon />);
    }
}

function RainIndicator(props: { rainPercentage: number }) {
    return (
        <Box
            aria-label="Probability of Precipitation"
            bottom="-30%"
            position="absolute"
            right="-25%"
            title="Probability of Precipitation"
        >
            <Chip
                label={round(props.rainPercentage * 100, 0) + "%"}
                sx={{
                    "& .MuiChip-label": {
                        px: "4px",
                        py: "3px"
                    },
                    "backgroundColor": "primary.dark",
                    "color": "primary.contrastText",
                    "fontSize": "0.25em",
                    "height": "auto"
                }}
            />
        </Box>
    );
}
