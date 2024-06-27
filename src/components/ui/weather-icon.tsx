import { Box, BoxProps } from "@mui/system"
import { BrokenCloud } from "../icon/weather/broken-cloud-icon"
import { Mist } from "../icon/weather/mist-icon"
import { OvercastCloud } from "../icon/weather/overcast-cloud-icon"
import { RainCloud } from "../icon/weather/rain-cloud-icon"
import { ShowerRain } from "../icon/weather/shower-rain-icon"
import { SnowCloud } from "../icon/weather/snow-cloud-icon"
import SunIcon from "../icon/weather/sun-icon"
import { Thunderstorm } from "../icon/weather/thunderstorm-icon"
import { FewCloudIcon } from "../icon/weather/few-cloud-icon"
import { ScatteredCloud } from "../icon/weather/scattered-cloud-icon"
import { MoonIcon } from "../icon/weather/moon-icon"
import { Chip } from "@mui/material"
import { round } from "../../utils/math"

function getWeatherIcon(iconId: number) {
    switch (iconId) {
        case 200: return (<Thunderstorm/>)
        case 300: return (<ShowerRain/>)
        case 500: return (<RainCloud/>)
        case 600: return (<SnowCloud/>)
        case 700: return (<Mist/>)
        case 800: return (<SunIcon/>)
        case 801: return (<FewCloudIcon/>)
        case 802: return (<ScatteredCloud/>)
        case 803: return (<BrokenCloud/>)
        case 804: return (<OvercastCloud/>)
        default:  return (iconId % 100) 
            ? (<WeatherIcon id={iconId-(iconId % 100)} />) 
            : (<MoonIcon/>);
    }
}

export type WeatherIconProps = Omit<BoxProps, 'id'> & {
    id: number,
    rainPercentage?: number,
} 

function RainIndicator(props: {rainPercentage: number}) {
    return (
        <Box 
            position="absolute" 
            bottom="-30%" 
            right="-25%"
            title="Probability of Precipitation"
            aria-label="Probability of Precipitation"
        >
            <Chip 
                label={round(props.rainPercentage*100,0)+"%"}
                sx={{
                    backgroundColor: "primary.dark",
                    color: "primary.contrastText",
                    fontSize: "0.25em",
                    height: "auto",
                    "& .MuiChip-label": {
                        py: "3px",
                        px: "4px"
                    },
                }}
            />
        </Box>
    )
}


export default function WeatherIcon(props: WeatherIconProps) {
    const WeatherIcon = getWeatherIcon(props.id)
    return (
        <Box position="relative">
            {WeatherIcon}
            {props.rainPercentage ? <RainIndicator rainPercentage={props.rainPercentage}/> : ""}
        </Box>
    )
}