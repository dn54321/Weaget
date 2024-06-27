import { Card, CardActionArea } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/system/styled';
import Temp from '../ui/temperature-unit';
import WeatherIcon from '../ui/weather-icon';
import { DateTime } from "luxon";

const Day = styled(Box)(() => ({
    fontWeight: "bold",
}));

const ShortDate = styled(Box)(() => ({
    color: "#ddd",
    fontSize: "0.8em"
}));

const Description = styled(Box)(() => ({
    fontSize: "0.5em",
}));

const Temperature = styled(Box)(() => ({
    marginTop: "5px"
}));

const High = styled(Box)(() => ({
    "--fontSize": "2em",
    display: "inline",
    fontSize: "var(--fontSize)",
}));

const Low = styled(Box)(({ theme }) => ({
    display: "inline",
    color: theme.palette.grey?.[200],
}));


const IconBox = styled(Box)(() => ({
    position: "relative"
}));


function getDateString(date: DateTime) {
    const timezone = date.zoneName;
    const currentTime = DateTime.local({ zone: `${timezone}` }).startOf('day');
    const days = Math.floor(date.diff(currentTime, 'days').toObject().days || 0);
    if (days == 0) return "today";
    if (days == 1) return "tomorrow";
    const dateString = date.toFormat("LLL dd");
    return dateString;
}

function Container(props) {
    return (
        <Card data-testid="weather-card" sx={{
            backgroundColor: "primary.light",
            color: "primary.contrastText",
            boxShadow: 3,
            minWidth:"120px",
            width: "100%",
            borderRadius: "10px",
            "& .MuiCardActionArea-root": {
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                px: "5px",
                py: "10px",
                fontSize: "16px",
            }
        }}>
            <CardActionArea>
                {props.children}
            </CardActionArea>
        </Card>
    )
}

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
        <Container>
            <Day>{date.weekdayLong}</Day>
            <ShortDate>{getDateString(date)}</ShortDate>
            <IconBox fontSize="4em" pt="5px">  
                <WeatherIcon id={props.weatherCode} rainPercentage={props.rainfallPercentage}/>
            </IconBox>
            <Description>{props.weatherDescription}</Description>
            <Temperature>
                <High><Temp value={props.maxTemperature}/></High>
                <Low><Temp value={props.minTemperature}/></Low>
            </Temperature>
        </Container>

    )
}