"use client";
import { Footer } from "@components/layout/footer";
import { Navbar } from "@components/layout/navbar";
import { SettingsFab } from "@components/ui/settings-fab";
import { DailyWeatherCardWidget } from "@components/widgets/daily-weather-card-widget";
import { HourlyWeatherStripWidget } from "@components/widgets/hourly-weather-strip-widget";
import { LocationListWidget } from "@components/widgets/location-list-widget";
import { PollutionWidget } from "@components/widgets/pollution-widget";
import { RainfallWidget } from "@components/widgets/rainfall-widget";
import { WeatherDisplayWidget } from "@components/widgets/weather-display-widget";
import { WeatherStatWidget } from "@components/widgets/weather-stat-widget";
import { Box, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAlert } from "@src/hooks/use-alert";
import { useGetLocation } from "@src/hooks/use-get-location";
import { useGetNearbyLocation } from "@src/hooks/use-get-nearby-location";
import { useGetPollution } from "@src/hooks/use-get-pollution";
import { useGetWeather } from "@src/hooks/use-get-weather";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { use, useEffect } from "react";

interface PageProps {
    params: Promise<{
        location: string
    }>
}

export default function Page(pageProps: PageProps) {
    const params = use(pageProps.params);
    const location = params.location;
    const { locale, t } = useSystemTranslation();
    const weatherQuery = useGetWeather(location, undefined, locale);
    const pollutionQuery = useGetPollution(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const nearbyLocationQuery = useGetNearbyLocation(weatherQuery.data?.lat, weatherQuery.data?.lon, locale);
    const locationQuery = useGetLocation(location, undefined, locale);
    const locationShortForm = locationQuery.data?.results[0].addressComponents[0].shortName;
    const locationLongForm = locationQuery.data?.results[0].formattedAddress;
    const { addAlert, AlertBox } = useAlert();

    useEffect(() => {
        if (weatherQuery.isError || pollutionQuery.isError || nearbyLocationQuery.isError || locationQuery.isError) {
            addAlert({
                duration: Infinity,
                message: t("weather.error.fetchFailed"),
                type: "error"

            });
        }
    }, [weatherQuery.isError, pollutionQuery.isError, nearbyLocationQuery.isError, locationQuery.isError, addAlert]);

    return (
        <Box>
            <title>{locationShortForm ? `${locationShortForm} - ${t("webapp.name")}` : t("webapp.name") }</title>
            <Box display="grid" gap={1} gridTemplateRows="80px auto max-content" height="100%" width="100%">
                <Box sx={{ gridRow: "1" }}><Navbar /></Box>
                <Box>
                    <Container maxWidth="lg" sx={{ gridRow: "2", height: "fit-content" }}>
                        <Grid container mt="1px" spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Stack spacing={2}>
                                    <WeatherDisplayWidget location={locationLongForm} weatherData={weatherQuery.data} />
                                    <DailyWeatherCardWidget weatherData={weatherQuery.data} />
                                </Stack>
                            </Grid>
                            <Grid size={{ md: 8, xs: 12 }}>
                                <Stack spacing={2}>
                                    <WeatherStatWidget weatherData={weatherQuery.data} />
                                    <HourlyWeatherStripWidget weatherData={weatherQuery.data} />
                                </Stack>
                            </Grid>
                            <Grid size={{ md: 4, xs: 12 }}>
                                <Stack spacing={2}>
                                    <PollutionWidget pollutionData={pollutionQuery.data} />
                                    <RainfallWidget weatherData={weatherQuery.data} />
                                    <LocationListWidget locationData={nearbyLocationQuery.data} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                    <SettingsFab display={{ md: "flex", xs: "none" }} measurement temperature />
                    <AlertBox />
                </Box>
                <Footer containerProps={{ maxWidth: "lg" }} />
            </Box>
        </Box>
    );
}
