import { Box, Paper, styled } from '@mui/material';
import { DateTime } from "luxon";
import WeatherIcon from '../WeatherIcon';
import Temp from '../TemperateUnit';
/*
    Compact weather card list is a grid containing simplified weather cards.
    Each weather card is a square box that contains:
        Name
        Icon
        Rain Information (If Applicable)
        Temp High, Temp Low
    
    This component is to provide basic weather information and a button that
    leads to more weather details on the user's request.
*/

// Styles 
const High = styled(Box)(() => ({
    fontSize: "1em",
    display: "inline"
}));

const Low = styled(Box)(({ theme }) => ({
    fontSize: "0.8em",
    display: "inline",
    color: theme.palette.grey[600],
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
    color: theme.palette.grey[800], 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    position: "relative",
    aspectRatio: "1", 
    justifyContent:"center",
}));

export interface CompactWeatherCardProps {
    date: Date,
    timezone: string,
    weatherCode: number,
    rainfallPercentage: number,
    maxTemperature: number,
    minTemperature: number
}

// Compact weather card 
export default function CompactWeatherCard(props: CompactWeatherCardProps) {
    const date = DateTime.fromJSDate(props.date, {zone: props.timezone});
    return (
        <PaperContainer>
            <Box>{date.weekdayShort}</Box>
            <Box fontSize="3em">
                <WeatherIcon id={props.weatherCode} rainPercentage={props.rainfallPercentage}/>
            </Box>
            <Box>
                <High><Temp value={props.maxTemperature}/></High>
                <Low><Temp value={props.minTemperature}/></Low>
            </Box>
        </PaperContainer>
    )
}