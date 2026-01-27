"use client";
import { Box, Container, Stack } from "@mui/material";
import { use, useEffect } from "react";

import { DailyWeatherCardWidget } from "@components/widgets/daily-weather-card-widget";

import { Footer } from "@components/layout/footer";

import Grid from "@mui/material/Grid";
import { HourlyWeatherStripWidget } from "@components/widgets/hourly-weather-strip-widget";
import { LocationListWidget } from "@components/widgets/location-list-widget";
import { Navbar } from "@components/layout/navbar";
import { PollutionWidget } from "@components/widgets/pollution-widget";
import { RainfallWidget } from "@components/widgets/rainfall-widget";
import { SettingsFab } from "@components/ui/settings-fab";
import { WeatherDisplayWidget } from "@components/widgets/weather-display-widget";
import { WeatherStatWidget } from "@components/widgets/weather-stat-widget";
import { useAlert } from "@src/hooks/use-alert";
import { useGetLocation } from "@src/hooks/use-get-location";
import { useGetNearbyLocation } from "@src/hooks/use-get-nearby-location";
import { useGetPollution } from "@src/hooks/use-get-pollution";
import { useGetWeather } from "@src/hooks/use-get-weather";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

interface PageProps {
    params: Promise<{
        location: string;
    }>;
}

export default function Page(pageProps: PageProps) {
    const params = use(pageProps.params);
    const location = params.location;
    const { t, locale } = useSystemTranslation();
    const weatherQuery = useGetWeather(location, undefined, locale);
    const pollutionQuery = useGetPollution(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const nearbyLocationQuery = useGetNearbyLocation(weatherQuery.data?.lat, weatherQuery.data?.lon, locale);
    const locationQuery = useGetLocation(location, undefined, locale);
    const locationShortForm = locationQuery.data?.results[0].addressComponents[0].shortName;
    const locationLongForm = locationQuery.data?.results[0].formattedAddress;
    const { AlertBox, addAlert } = useAlert();

    useEffect(() => {
        if (weatherQuery.isError || pollutionQuery.isError || nearbyLocationQuery.isError || locationQuery.isError) {
            addAlert({
                duration: Infinity,
                message: t("weather.error.fetchFailed"),
                type: "error",

            });
        }
    }, [weatherQuery.isError, pollutionQuery.isError, nearbyLocationQuery.isError, locationQuery.isError, addAlert]);

    return (
        <Box>
            <title>{locationShortForm ? `${locationShortForm} - ${t("webapp.name")}` : t("webapp.name") }</title>
            <Box display="grid" gridTemplateRows="80px auto max-content" gap={1} height="100%" width="100%">
                <Box sx={{ gridRow: "1" }}><Navbar /></Box>
                <Box>
                    <Container maxWidth="lg" sx={{ gridRow: "2", height: "fit-content" }}>
                        <Grid container spacing={2} mt="1px">
                            <Grid size={{ xs: 12 }}>
                                <Stack spacing={2}>
                                    <WeatherDisplayWidget weatherData={weatherQuery.data} location={locationLongForm} />
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
                    <SettingsFab measurement temperature display={{ md: "flex", xs: "none" }} />
                    <AlertBox />
                </Box>
                <Footer containerProps={{ maxWidth: "lg" }} />
            </Box>
        </Box>
    );
}
