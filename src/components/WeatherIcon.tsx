import { Box, BoxProps } from "@mui/system"
import { BrokenCloud } from "./Icon/Weather/BrokenCloudIcon"
import { Mist } from "./Icon/Weather/MistIcon"
import { OvercastCloud } from "./Icon/Weather/OvercastCloudIcon"
import { RainCloud } from "./Icon/Weather/RainCloudIcon"
import { ShowerRain } from "./Icon/Weather/ShowerRainIcon"
import { SnowCloud } from "./Icon/Weather/SnowCloudIcon"
import SunIcon from "./Icon/Weather/SunIcon"
import { ThunderStorm } from "./Icon/Weather/ThunderStormIcon"
import { FewCloudIcon } from "./Icon/Weather/FewCloudIcon"
import { ScatteredCloud } from "./Icon/Weather/ScatteredCloudIcon"
import { MoonIcon } from "./Icon/Weather/MoonIcon"
import { Chip } from "@mui/material"
import { round } from "../utils/math"

function getWeatherIcon(iconId: number) {
    switch (iconId) {
        case 200: return (<ThunderStorm/>)
        case 300: return (<ShowerRain/>)
        case 500: return (<RainCloud/>)
        case 600: return (<SnowCloud/>)
        case 700: return (<Mist/>)
        case 800: return (<SunIcon/>)
        case 801: return (<FewCloudIcon/>)
        case 802: return (<ScatteredCloud/>)
        case 803: return (<BrokenCloud/>)
        case 804: return (<OvercastCloud/>)
        default: 
            const mod = iconId % 100;
            if (mod) return (<WeatherIcon id={iconId-mod} />)
            return (<MoonIcon/>)
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
        >
            <Chip 
                label={round(props.rainPercentage*100,0)+"%"}
                sx={{
                    backgroundColor: "primary.dark",
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