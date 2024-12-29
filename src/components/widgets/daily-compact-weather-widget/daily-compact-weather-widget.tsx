import { Box, SxProps } from "@mui/material";
import { CompactWeatherCard } from "@components/cards/compact-weather-card";
import Grid from "@mui/material/Grid2";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { StyledButton } from "./daily-compact-weather-widget.styles";
import { Widget } from "@components/containers/widget/widget";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

// List of Weather Card
export interface DailyCompactWeatherWidgetProps {
    title?: string;
    subtitle?: string;
    weatherData?: OneCallWeatherDetails;
    location: string;
    sx?: SxProps;
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
        weatherDescription: dailyWeather.weather[0].description,
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
            title={props.title ?? t("component.widget.dailyCompactWeather.title")}
            subtitle={props.subtitle ?? t("component.widget.dailyCompactWeather.description")}
            variant="transparent"
            disableChildrenPadding
            sx={props.sx}
        >
            <Box display="grid" sx={{ width: "100%" }}>
                <Grid
                    container
                    spacing={0.5}
                    component="ol"
                    width="min(600px, 100%)"
                    justifyContent="flex-start !important"
                    sx={{ placeSelf: "center" }}
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
