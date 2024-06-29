"use client"
import { Box, Container, Grid, Stack } from '@mui/material';
import Head from 'next/head';

import DailyWeatherCardWidget from '@components/widgets/daily-weather-card-widget/daily-weather-card-widget';
import LocationListWidget from '@components/widgets/location-list-widget';
import PollutionWidget from '@components/widgets/pollution-widget';
import WeatherStatWidget from '@components/widgets/weather-stat-widget';
import WeatherDisplayWidget from '@components/widgets/weather-display-widget';
import HourlyWeatherStripWidget from '@components/widgets/hourly-weather-strip-widget';
import RainfallWidget from '@components/widgets/rainfall-widget';

import { useAlert } from '@src/hooks//use-alert';
import { useGetLocation } from '@src/hooks//use-get-location';
import { useGetPollution } from '@src/hooks//use-get-pollution';
import { useGetWeather } from '@src/hooks//use-get-weather';
import { useEffect } from 'react';
import { useGetNearbyLocation } from '@src/hooks//use-get-nearby-location';
import { Navbar } from '@components/layout/navbar';
import { Footer } from '@components/layout/footer';
import { SettingsFab } from '@components/ui/settings-fab';


interface PageProps {
    params: {
        location: string;
    };
}

export default function Page({ params }: PageProps) {
    const location = params.location;
    const weatherQuery = useGetWeather(location);
    const pollutionQuery = useGetPollution(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const nearbyLocationQuery = useGetNearbyLocation(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const locationQuery = useGetLocation(location);
    const locationShortForm = locationQuery.data?.results[0].addressComponents[0].shortName;
    const locationLongForm = locationQuery.data?.results[0].formattedAddress;
    const {AlertBox, addAlert} = useAlert();
    
    useEffect(() => {
        if (weatherQuery.isError || pollutionQuery.isError || nearbyLocationQuery.isError || locationQuery.isError) {
            addAlert({
                type: "error",
                message: "Error fetching weather data. Some elements may be unresponsive.",
                duration: Infinity
            });
        }
    }, [weatherQuery.isError, pollutionQuery.isError, nearbyLocationQuery.isError, locationQuery.isError, addAlert]);

    return (
        <Box>
            <Head>
                <title>{locationShortForm ? `${locationShortForm} - Weaget` : 'Weaget' }</title>
            </Head>
            <Box display="grid" gridTemplateRows="80px auto max-content" gap={1} height="100%" width="100%">
                <Box sx={{gridRow: "1"}}><Navbar /></Box>
                <Box>
                    <Container maxWidth="lg" sx={{height:"fit-content", gridRow: "2"}}> 
                        <Grid container spacing={2} mt="1px">
                            <Grid item xs={12}>
                                <Stack spacing={2}>
                                    <WeatherDisplayWidget weatherData={weatherQuery.data} location={locationLongForm}/>
                                    <DailyWeatherCardWidget weatherData={weatherQuery.data}/>  
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={2}>
                                    <WeatherStatWidget weatherData={weatherQuery.data}/>
                                    <HourlyWeatherStripWidget weatherData={weatherQuery.data}/>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={2}>
                                    <PollutionWidget pollution={pollutionQuery.data}/>
                                    <RainfallWidget weatherData={weatherQuery.data}/>
                                    <LocationListWidget locations={nearbyLocationQuery.data}/>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container> 
                    <SettingsFab measurement temperature display={{xs: 'none', md: 'flex'}}/> 
                    <AlertBox/> 
                </Box>
                <Footer containerProps={{maxWidth: 'lg'}}/>
            </Box>
        </Box>
    )
}