import { TempUnit } from "@components/ui/temperature-unit";
import { WeatherIcon } from "@components/ui/weather-icon";
import { CardActionArea } from "@mui/material";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { DateTime } from "luxon";

import { CardContainer, Day, High, IconBox, Low, ShortDate, Temperature, WeatherDescription } from "./weather-card.styles";
import { getWeatherCardDateString } from "./weather-card.utils";

export interface RainProps {
    label: number
}

export interface WeatherCardProps {
    date: Date
    locale?: string
    maxTemperature: number
    minTemperature: number
    rainfallPercentage: number
    timezone: string
    weatherCode: number
    weatherDescription: string
}

export default function WeatherCard(props: WeatherCardProps) {
    const { locale } = useSystemSettings();
    const date = DateTime
        .fromJSDate(props.date, { zone: props.timezone })
        .setLocale(props.locale ?? locale);

    return (
        <CardContainer data-testid="weather-card">
            <CardActionArea>
                <Day>{date.weekdayLong}</Day>
                <ShortDate>{getWeatherCardDateString(date)}</ShortDate>
                <IconBox fontSize="4em" pt="5px">
                    <WeatherIcon
                        decoration
                        id={props.weatherCode}
                        rainPercentage={props.rainfallPercentage}
                    />
                </IconBox>
                <WeatherDescription>{props.weatherDescription}</WeatherDescription>
                <Temperature>
                    <High><TempUnit value={props.maxTemperature} /></High>
                    <Low><TempUnit value={props.minTemperature} /></Low>
                </Temperature>
            </CardActionArea>
        </CardContainer>
    );
}
