import { Card, CardActionArea, Chip } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/system/styled';
import { DAYS, MONTHS } from '@src/utils/constants';
import { round } from '@src/utils/math';
import Temp from '../TemperateUnit';
import WeatherIcon from '../WeatherIcon';
import { DateTime } from "luxon";

const Day = styled(Box)(({ theme }) => ({
    fontWeight: "bold",
}));

const ShortDate = styled(Box)(({ theme }) => ({
    color: "#ddd",
    fontSize: "0.8em"
}));

const Description = styled(Box)(({ theme }) => ({
    fontSize: "0.5em",
}));

const Temperature = styled(Box)(({ theme }) => ({
    marginTop: "5px"
}));

const High = styled(Box)(({ theme }) => ({
    "--fontSize": "2em",
    display: "inline",
    fontSize: "var(--fontSize)",
}));

const Low = styled(Box)(({ theme }) => ({
    display: "inline",
    color: theme.palette.grey[200],
}));


const IconBox = styled(Box)(({ theme }) => ({
    position: "relative"
}));


function getDateString(date: DateTime) {
    const timezone = date.zoneName;
    const currentTime = DateTime.local({ zone: `${timezone}` }).startOf('day');
    const days = Math.floor(date.diff(currentTime, 'days').toObject().days || 0);
    if (days == 0) return "today";
    if (days == 1) return "tomorrow";
    return date.toFormat("LLL dd");
}

function Container(props) {
    return (
        <Card id="container" sx={{
            backgroundColor: "primary.light",
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

function Rain(props:RainProps) {
    if (!props.label) return null;        
    return (
        <Box width="50px" height="0px" position="absolute" bottom="80%" left="70%" title="Chance of Rain">
            <Chip 
                size="small" 
                label={round(props.label*100,0)+"%"}
                sx={{bgcolor: "primary.main"}}
            />
        </Box>
    )
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
        <Container sx={{color: "white"}}>
            <Day>{date.weekdayLong}</Day>
            <ShortDate>{getDateString(date)}</ShortDate>
            <IconBox fontSize="64px" pt="5px">  
                <WeatherIcon id={props.weatherCode}/>
                <Rain label={props.rainfallPercentage}/>
            </IconBox>
            <Description>{props.weatherDescription}</Description>
            <Temperature>
                <High><Temp value={props.maxTemperature}/></High>
                <Low><Temp value={props.minTemperature}/></Low>
            </Temperature>
        </Container>

    )
}