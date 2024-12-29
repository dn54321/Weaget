import { CardContainer, Day, High, IconBox, Low, ShortDate, Temperature, WeatherDescription } from "./weather-card.styles";
import { CardActionArea } from "@mui/material";
import { DateTime } from "luxon";
import { TempUnit } from "@components/ui/temperature-unit";
import { WeatherIcon } from "@components/ui/weather-icon";
import { getWeatherCardDateString } from "./weather-card.utils";
import { useSystemSettings } from "@src/hooks/use-system-settings";

export interface RainProps {
    label: number;
}

export interface WeatherCardProps {
    date: Date;
    timezone: string;
    weatherCode: number;
    weatherDescription: string;
    rainfallPercentage: number;
    maxTemperature: number;
    minTemperature: number;
    locale?: string;
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
                        id={props.weatherCode}
                        rainPercentage={props.rainfallPercentage}
                        decoration
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
