import { mdiThermometerWater, mdiWaterPercent, mdiWeatherCloudy, mdiWeatherPouring, mdiWeatherSnowy, mdiWeatherSunnyAlert, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from "@mdi/js";
import Icon from "@mdi/react";
import { Air } from "@mui/icons-material";
import { DateTime } from "luxon";
import React from "react";
import { CurrentWeatherDetails, DailyWeatherDetails, HourlyWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { TempUnit } from "@components/ui/temperature-unit";
import { SpeedUnit } from "@components/ui/speed-unit";
import VolumeUnit from "@components/ui/volume-unit/volume-unit.component";

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
            statIcon: <Air sx={{ fontSize: "1em" }} />,
            value: weather.windSpeed
                ? (
                        <>
                            <SpeedUnit value={weather.windSpeed} />
                            {` / ${weather.windDeg}°`}
                        </>
                    )
                : undefined,
            compactValue: weather.windSpeed ? <SpeedUnit value={weather.windSpeed} /> : undefined,
        },
        {
            name: "Humidity",
            statIcon: <Icon path={mdiWaterPercent} size="1em" />,
            value: weather.humidity,
            unit: "%",
        },
        {
            name: "Dew Point",
            statIcon: <Icon path={mdiThermometerWater} size="1em" />,
            value: weather.dewPoint ? <TempUnit value={weather.dewPoint} /> : undefined,
        },
        {
            name: "Clouds",
            statIcon: <Icon path={mdiWeatherCloudy} size="1em" />,
            value: weather.clouds ?? 0,
            unit: "%",
        },
        {
            name: "UV Index",
            statIcon: <Icon path={mdiWeatherSunnyAlert} size="1em" />,
            value: weather.uvi ? UVWarning(weather.uvi) : undefined,
            compactValue: weather.uvi,
        },
        {
            name: "Sunrise",
            statIcon: <Icon path={mdiWeatherSunsetUp} size="1em" />,
            value: weather["sunrise"] ? DateTime.fromJSDate(weather["sunrise"], { zone: timezone }).toLocaleString(DateTime.TIME_SIMPLE) : undefined,
        },
        {
            name: "Sunset",
            statIcon: <Icon path={mdiWeatherSunsetDown} size="1em" />,
            value: weather["sunset"] ? DateTime.fromJSDate(weather["sunset"], { zone: timezone }).toLocaleString(DateTime.TIME_SIMPLE) : undefined,
        },
        {
            name: "Snowfall",
            statIcon: <Icon path={mdiWeatherSnowy} size="1em" />,
            value: weather.snow ? <VolumeUnit value={weather.snow?.["1h"] || weather.snow} decimals={2} /> : undefined,
        },
        {
            name: "Rainfall",
            statIcon: <Icon path={mdiWeatherPouring} size="1em" />,
            value: weather.rain ? <VolumeUnit value={weather.rain?.["1h"] || weather.rain} decimals={2} /> : undefined,
        },
    ];
}
