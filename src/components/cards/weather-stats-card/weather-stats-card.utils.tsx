import { mdiThermometerWater, mdiWaterPercent, mdiWeatherCloudy, mdiWeatherPouring, mdiWeatherSnowy, mdiWeatherSunnyAlert, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from "@mdi/js";
import Icon from "@mdi/react";
import Air from "@mui/icons-material/Air";
import { DateTime } from "luxon";
import React from "react";
import { CurrentWeatherDetails, DailyWeatherDetails, HourlyWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { TempUnit } from "@components/ui/temperature-unit";
import { SpeedUnit } from "@components/ui/speed-unit";
import VolumeUnit from "@components/ui/volume-unit/volume-unit.component";
import { TFunction } from "i18next";

export function getUvLevelTranslationKey(scale: number | undefined) {
    if (scale === undefined) return "";
    else if (scale <= 2) return "weather.uvIndex.low";
    else if (scale <= 5) return "weather.uvIndex.moderate";
    else if (scale <= 7) return "weather.uvIndex.high";
    else if (scale <= 10) return "weather.uvIndex.veryHigh";
    else return "weather.uvIndex.extreme";
}

export function parseWeatherDetailStats(
    weather: Partial<HourlyWeatherDetails | CurrentWeatherDetails | DailyWeatherDetails>,
    timezone: string,
    translator: TFunction<"translation", undefined>,
    locale: string,
) {
    return [
        {
            name: translator("weather.stats.wind"),
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
            name: translator("weather.stats.humidity"),
            statIcon: <Icon path={mdiWaterPercent} size="1em" />,
            value: weather.humidity,
            unit: "%",
        },
        {
            name: translator("weather.stats.dewPoint"),
            statIcon: <Icon path={mdiThermometerWater} size="1em" />,
            value: weather.dewPoint ? <TempUnit value={weather.dewPoint} /> : undefined,
        },
        {
            name: translator("weather.stats.clouds"),
            statIcon: <Icon path={mdiWeatherCloudy} size="1em" />,
            value: weather.clouds ?? 0,
            unit: "%",
        },
        {
            name: translator("weather.stats.uvIndex"),
            statIcon: <Icon path={mdiWeatherSunnyAlert} size="1em" />,
            value: weather.uvi
                ? `${translator(getUvLevelTranslationKey(weather.uvi))} (${weather.uvi})`
                : undefined,
            compactValue: weather.uvi,
        },
        {
            name: translator("weather.stats.sunrise"),
            statIcon: <Icon path={mdiWeatherSunsetUp} size="1em" />,
            value: "sunrise" in weather && typeof weather.sunrise === "object"
                ? DateTime
                    .fromJSDate(weather["sunrise"], { zone: timezone })
                    .setLocale(locale ?? "local")
                    .toLocaleString(DateTime.TIME_SIMPLE)
                : undefined,
        },
        {
            name: translator("weather.stats.sunset"),
            statIcon: <Icon path={mdiWeatherSunsetDown} size="1em" />,
            value: "sunset" in weather && typeof weather.sunset === "object"
                ? DateTime
                    .fromJSDate(weather["sunset"], { zone: timezone })
                    .setLocale(locale ?? "local")
                    .toLocaleString(DateTime.TIME_SIMPLE)
                : undefined,
        },
        {
            name: translator("weather.stats.snowfall"),
            statIcon: <Icon path={mdiWeatherSnowy} size="1em" />,
            value: weather.snow
                ? (
                        <VolumeUnit
                            value={typeof weather.snow === "number" ? weather.snow : weather.snow["1h"]!}
                            decimals={2}
                        />
                    )
                : undefined,
        },
        {
            name: translator("weather.stats.rainfall"),
            statIcon: <Icon path={mdiWeatherPouring} size="1em" />,
            value: weather.rain
                ? (
                        <VolumeUnit
                            value={typeof weather.rain === "number" ? weather.rain : weather.rain["1h"]!}
                            decimals={2}
                        />
                    )
                : undefined,
        },
    ];
}
