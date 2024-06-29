import { CardActionArea } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { DateTime } from "luxon";
import Temp from '@components/ui/temperature-unit/temperature-unit.component';
import WeatherIcon from '@components/ui/weather-icon';
import { Day, ShortDate, Temperature, High, Low, IconBox, CardContainer, WeatherDescription } from './weather-card.styles';
import { getWeatherCardDateString } from './weather-card.utils';

export interface RainProps {
    label: number
}

export interface WeatherCardProps {
    date: Date,
    timezone: string,
    weatherCode: number,
    weatherDescription: string,
    rainfallPercentage: number,
    maxTemperature: number,
    minTemperature: number
}

export default function WeatherCard(props: WeatherCardProps & BoxProps) {
    const date = DateTime.fromJSDate(props.date, {zone: props.timezone});
    return (
        <CardContainer data-testid="weather-card">
            <CardActionArea>
                <Day>{date.weekdayLong}</Day>
                <ShortDate>{getWeatherCardDateString(date)}</ShortDate>
                <IconBox fontSize="4em" pt="5px">  
                    <WeatherIcon id={props.weatherCode} rainPercentage={props.rainfallPercentage}/>
                </IconBox>
                <WeatherDescription>{props.weatherDescription}</WeatherDescription>
                <Temperature>
                    <High><Temp value={props.maxTemperature}/></High>
                    <Low><Temp value={props.minTemperature}/></Low>
                </Temperature>
            </CardActionArea>
        </CardContainer>
    )
}