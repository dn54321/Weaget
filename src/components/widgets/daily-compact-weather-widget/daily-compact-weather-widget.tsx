import { CompactWeatherCard } from "@components/cards/compact-weather-card";
import { Widget } from "@components/containers/widget/widget";
import { Box, SxProps } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

import { StyledButton } from "./daily-compact-weather-widget.styles";

// List of Weather Card
export interface DailyCompactWeatherWidgetProps {
    location: string
    subtitle?: string
    sx?: SxProps
    title?: string
    weatherData?: OneCallWeatherDetails
}

export default function DailyCompactWeatherWidget(props: DailyCompactWeatherWidgetProps) {
    const { t } = useSystemTranslation();
    if (!props.weatherData) return null;

    const weatherDetails = props.weatherData?.daily?.map(dailyWeather => ({
        date: dailyWeather.dt,
        maxTemperature: dailyWeather.temp.max,
        minTemperature: dailyWeather.temp.min,
        rainfallPercentage: dailyWeather.pop,
        timezone: `${props.weatherData?.timezone}`,
        weatherCode: dailyWeather.weather[0].id,
        weatherDescription: dailyWeather.weather[0].description
    }));

    const cards = weatherDetails?.map(dailyWeather => (
        <Grid
            component="li"
            key={dailyWeather.date.getTime()}
            size={{ sm: 3, xs: 4 }}
        >
            <CompactWeatherCard {...dailyWeather} />
        </Grid>
    ));

    return (
        <Widget
            disableChildrenPadding
            subtitle={props.subtitle ?? t("component.widget.dailyCompactWeather.description")}
            sx={props.sx}
            title={props.title ?? t("component.widget.dailyCompactWeather.title")}
            variant="transparent"
        >
            <Box display="grid" sx={{ width: "100%" }}>
                <Grid
                    component="ol"
                    container
                    justifyContent="flex-start !important"
                    spacing={0.5}
                    sx={{ placeSelf: "center" }}
                    width="min(600px, 100%)"
                >
                    {cards}
                </Grid>
                <StyledButton href={`/weather/${props.location}`}>
                    {t("component.widget.dailyCompactWeather.button")}
                </StyledButton>
            </Box>
        </Widget>
    );
}
