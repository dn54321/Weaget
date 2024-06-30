import { Box } from "@mui/material";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { Widget } from "@components/containers/widget/widget";
import Grid from "@mui/material/Unstable_Grid2";
import { StyledButton } from "./daily-compact-weather-widget.styles";
import { CompactWeatherCard } from "@components/cards/compact-weather-card";

// List of Weather Card
export interface WeeklyCompactWeatherWidgetProps {
    title?: string;
    subtitle?: string;
    weatherData?: OneCallWeatherDetails;
    location: string;
}

export default function DailyCompactWeatherWidget(props: WeeklyCompactWeatherWidgetProps) {
    if (!props.weatherData) return null;

    const weatherDetails = props.weatherData?.daily?.map(dailyWeather => ({
        date: dailyWeather.dt,
        timezone: `${props.weatherData?.timezone}`,
        weatherCode: dailyWeather.weather[0].id,
        weatherDescription: dailyWeather.weather[0].description,
        rainfallPercentage: dailyWeather.pop,
        maxTemperature: dailyWeather.temp.max,
        minTemperature: dailyWeather.temp.min,
    }));

    const cards = weatherDetails?.map(dailyWeather => (
        <Grid
            component="li"
            key={dailyWeather.date.getTime()}
            xs={4}
            sm={3}
        >
            <CompactWeatherCard {...dailyWeather} />
        </Grid>
    ));

    return (
        <Widget
            title={props.title ?? "Compact Weather Widget"}
            subtitle={props.subtitle ?? "Currently Weekly Weather"}
            variant="transparent"
            disableChildrenPadding
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
                    Get More Weather Details
                </StyledButton>
            </Box>
        </Widget>
    );
}
