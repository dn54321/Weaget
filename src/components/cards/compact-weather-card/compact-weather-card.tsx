import { DateTime } from "luxon";
import WeatherIcon from "@components/ui/weather-icon";
import Temp from "@components/ui/temperature-unit/temperature-unit.component";
import { Box } from "@mui/material";
import { High, Low, PaperContainer } from "./compact-weather-card.styles";
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

export interface CompactWeatherCardProps {
    date: Date;
    timezone: string;
    weatherCode: number;
    rainfallPercentage: number;
    maxTemperature: number;
    minTemperature: number;
}

// Compact weather card
export default function CompactWeatherCard(props: CompactWeatherCardProps) {
    const date = DateTime.fromJSDate(props.date, { zone: props.timezone });
    return (
        <PaperContainer data-testid="compact-weather-card" sx={{ overflow: "hidden" }}>
            <Box color="text.secondary">{date.weekdayShort}</Box>
            <Box fontSize="3em">
                <WeatherIcon id={props.weatherCode} rainPercentage={props.rainfallPercentage} />
            </Box>
            <Box>
                <High><Temp value={props.maxTemperature} /></High>
                <Low><Temp value={props.minTemperature} /></Low>
            </Box>
        </PaperContainer>
    );
}
