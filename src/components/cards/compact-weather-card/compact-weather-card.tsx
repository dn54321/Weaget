import { DateTime } from "luxon";
import { TempUnit } from "@components/ui/temperature-unit";
import { Box, SxProps } from "@mui/material";
import { High, Low, PaperContainer } from "./compact-weather-card.styles";
import { WeatherIcon } from "@components/ui/weather-icon";
import { useSystemSettings } from "@src/hooks/use-system-settings";
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
    sx?: SxProps;
    locale?: string;
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
            <Box sx={{ fontSize: { xs: "3em", sm: "4em", md: "3em" } }}>
                <WeatherIcon id={props.weatherCode} rainPercentage={props.rainfallPercentage} />
            </Box>
            <Box>
                <High><TempUnit value={props.maxTemperature} /></High>
                <Low><TempUnit value={props.minTemperature} /></Low>
            </Box>
        </PaperContainer>
    );
}
