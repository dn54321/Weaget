"use client"
import { Box, Container, Grid, Stack } from '@mui/material';
import Head from 'next/head';

import Footer from '@components/System/Footer';
import Navbar from '@components/System/Navbar';
import SettingsFab from '@components/SettingsFab';
import DailyWeatherCardList from '@components/Widgets/DailyWeatherCardWidget';
import HourlyWeatherStripWidget from '@components/Widgets/HourlyWeatherStripWidget';
import LocationListWidget from '@components/Widgets/LocationListWidget';
import PollutionWidget from '@components/Widgets/PollutionWidget';
import RainfallWidget from '@components/Widgets/RainfallWidget';
import WeatherDisplayWidget from '@components/Widgets/WeatherDisplayWidget';
import WeatherStatWidget from '@components/Widgets/WeatherStatWidget';

import { useAlert } from '../../../src/hooks/useAlert';
import { useGetLocation } from '../../../src/hooks/useGetLocation';
import { useGetLocationNearbySearch } from '../../../src/hooks/useGetLocationNearbySearch';
import { useGetPollution } from '../../../src/hooks/useGetPollution';
import { useGetWeather } from '../../../src/hooks/useGetWeather';
import { useEffect } from 'react';

interface PageProps {
    params: {
        location: string;
    };
}

export default function Page({ params }: PageProps) {
    const location = params.location;
    const weatherQuery = useGetWeather(location);
    const pollutionQuery = useGetPollution(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const nearbyLocationQuery = useGetLocationNearbySearch(weatherQuery.data?.lat, weatherQuery.data?.lon);
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
    }, [weatherQuery.isError, pollutionQuery.isError, nearbyLocationQuery.isError, locationQuery.isError]);

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
                                    <DailyWeatherCardList weatherData={weatherQuery.data}/>  
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
                <Footer maxWidth="lg"/>
            </Box>
        </Box>
    )
}