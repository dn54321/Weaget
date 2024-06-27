import { mdiThermometerWater, mdiWaterPercent, mdiWeatherCloudy, mdiWeatherPouring, mdiWeatherSnowy, mdiWeatherSunnyAlert, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React from 'react';
import { CurrentWeatherDetails, DailyWeatherDetails, HourlyWeatherDetails } from '../../features/open-weather-map-one-call/oneCall.type';
import SpeedUnit from '../ui/speed-unit';
import Temp from '../ui/temperature-unit';
import VolumeUnit from '../ui/volume-unit';
import Icon from '@mdi/react';
import { Air } from '@mui/icons-material';

const properties = {
    width: "150px",
    m: "10px",
    display: 'inline-grid',
    gridTemplateColumns: "60px auto",
    gridTemplateRows: "1fr 1fr",
    whiteSpace: "nowrap",
    '& svg:nth-of-type(1)': {
        gridColumn: "1",
        gridRow: "1 / 3",
        fontSize: "2em",
        placeSelf: "center",
        color: theme => theme.palette.primary.light
    },
    '& div:nth-of-type(2)': {
        gridColumn: "2",
        color: theme => theme.palette.text.color,
    },
    '& div:nth-of-type(3)': {
        gridColumn: "2",
        gridRow: "2",
        fontWeight: "bold",
    }
}

export function UVWarning(scale: number) {
    if (scale === undefined) return scale;
    if (scale <= 2) return `Low (${scale})`;
    else if (scale <= 5) return `Moderate (${scale})`;
    else if (scale <= 7) return `High (${scale})`;
    else if (scale <= 10) return `Very High (${scale})`;
    else return `Extreme (${scale})`;
}

export function parseWeatherDetailStats(weather: Partial<HourlyWeatherDetails | CurrentWeatherDetails | DailyWeatherDetails>, timezone: string) {
    return [
        {
            name: "Wind",
            statIcon: <Air sx={{fontSize:"1em"}}/>,
            value: weather.windSpeed ? <><SpeedUnit value={weather.windSpeed}/>{` / ${weather.windDeg}°`}</> : undefined,
            compactValue: weather.windSpeed ? <SpeedUnit value={weather.windSpeed}/> : undefined,
        },
        {
            name: "Humidity",
            statIcon: <Icon path={mdiWaterPercent} size="1em"/>,
            value: weather.humidity,
            unit: "%"
        },
        {
            name: "Dew Point",
            statIcon: <Icon path={mdiThermometerWater} size="1em"/>,
            value: weather.dewPoint ? <Temp value={weather.dewPoint}/> : undefined,
        },
        {
            name: "Clouds",
            statIcon: <Icon path={mdiWeatherCloudy} size="1em"/>,
            value: weather.clouds ?? 0,
            unit: "%",
        },
        {
            name: "UV Index",
            statIcon: <Icon path={mdiWeatherSunnyAlert} size="1em"/>,
            value: weather.uvi ? UVWarning(weather.uvi) : undefined,
            compactValue: weather.uvi,
        },
        {
            name: "Sunrise",
            statIcon: <Icon path={mdiWeatherSunsetUp} size="1em"/>,
            value: weather['sunrise'] ? DateTime.fromJSDate(weather['sunrise'], {zone: timezone}).toLocaleString(DateTime.TIME_SIMPLE) : undefined,
        },
        {
            name: "Sunset",
            statIcon: <Icon path={mdiWeatherSunsetDown} size="1em"/>,
            value: weather['sunset'] ? DateTime.fromJSDate(weather['sunset'], {zone: timezone}).toLocaleString(DateTime.TIME_SIMPLE) : undefined,
        },
        {
            name: "Snowfall",
            statIcon: <Icon path={mdiWeatherSnowy} size="1em"/>,
            value: weather.snow ? <VolumeUnit value={weather.snow?.["1h"] || weather.snow} decimals={2}/> : undefined,
        },
        {
            name: "Rainfall",
            statIcon: <Icon path={mdiWeatherPouring} size="1em"/>,
            value: weather.rain ? <VolumeUnit value={weather.rain?.["1h"] || weather.rain} decimals={2}/> : undefined,
        },
    ]
}


export interface WeatherStats {
    name: string;
    statIcon: JSX.Element | number | string;
    value: any;
    compactValue?: JSX.Element | number | string;
    unit?: string;
}

export interface WeatherStatsCardProp {
    stats: Array<WeatherStats>
}

export interface ItemContainerProps {
    children: React.ReactElement
}


function ItemContainer(props: ItemContainerProps) {
    return (
        <Box sx={{
            display: "grid",
            justifyContent: "space-around",
            gridTemplateColumns: "repeat(auto-fill, 170px)",
            py: "10px"
        }} component="ul">
            {props.children}
        </Box>
    )
}

function IconCard(props: WeatherStats) {
    if (props.value === undefined) {
        return;
    }

    return (
        <Box component="li" sx={properties}>
            {props.statIcon}
            <Box>{props.name}</Box>
            <Box fontSize="0.9em">{props.value}{props.unit}</Box>
        </Box>
    )
}


export default function WeatherStatsCard(props: WeatherStatsCardProp) {
    return (
        <Box>
            <ItemContainer aria-live="polite">
                <React.Fragment>
                    {props.stats.map((stat) => <IconCard key={stat.name} {...stat}/>)}
                </React.Fragment>
            </ItemContainer>
        </Box>
    )
}