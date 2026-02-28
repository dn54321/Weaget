import { High, Low, PaperContainer } from "./compact-weather-card.styles";
import { Box } from "@mui/material";
import { DateTime } from "luxon";
import type { SxProps } from "@mui/material";
import { TempUnit } from "@components/ui/temperature-unit";
import { WeatherIcon } from "@components/ui/weather-icon";
import { useSystemSettings } from "@src/hooks/use-system-settings";

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

/**
 * Compact weather card is a smaller version of the weather card.
 * It displays the weekday, weather icon, and the max and min temperatures.
 *
 * @param props - The properties of the compact weather card,
 * including date, timezone, weather code, rainfall percentage,
 * max and min temperatures, and optional styling and locale.
 *
 * @returns A React element representing the compact weather card.
 */
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
