import { TempUnit } from "@components/ui/temperature-unit";
import { WeatherIcon } from "@components/ui/weather-icon";
import { Box, SxProps } from "@mui/material";
import { useSystemSettings } from "@src/hooks/use-system-settings";
import { DateTime } from "luxon";

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
    date: Date
    locale?: string
    maxTemperature: number
    minTemperature: number
    rainfallPercentage: number
    sx?: SxProps
    timezone: string
    weatherCode: number
}

// Compact weather card
export default function CompactWeatherCard(props: CompactWeatherCardProps) {
    const { locale } = useSystemSettings();
    const date = DateTime
        .fromJSDate(props.date, { zone: props.timezone })
        .setLocale(props.locale ?? locale);

    return (
        <PaperContainer data-testid="compact-weather-card" sx={{ overflow: "hidden", ...props.sx }}>
            <Box color="text.secondary">{date.weekdayShort}</Box>
            <Box sx={{ fontSize: { md: "3em", sm: "4em", xs: "3em" } }}>
                <WeatherIcon id={props.weatherCode} rainPercentage={props.rainfallPercentage} />
            </Box>
            <Box>
                <High><TempUnit value={props.maxTemperature} /></High>
                <Low><TempUnit value={props.minTemperature} /></Low>
            </Box>
        </PaperContainer>
    );
}
