import { Box, Container, Grid, Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from '@components/Containers/Footer';
import Navbar from '@components/Containers/Navbar';
import LocationListWidget from '@components/Widgets/LocationListWidget';
import PollutionWidget from '@components/Widgets/PollutionWidget';
import RainfallWidget from '@components/Widgets/RainfallWidget';
import WeatherDisplayWidget from '@components/Widgets/WeatherDisplayWidget';
import HourlyWeatherStripWidget from '../../src/components/Widgets/HourlyWeatherStripWidget';
import WeatherStatWidget from '../../src/components/Widgets/WeatherStatWidget';
import { useGetLocation } from '../../src/hooks/useGetLocation';
import { useGetLocationNearbySearch } from '../../src/hooks/useGetLocationNearbySearch';
import { useGetPollution } from '../../src/hooks/useGetPollution';
import { useGetWeather } from '../../src/hooks/useGetWeather';
import DailyWeatherCardList from '../../src/components/Widgets/DailyWeatherCardWidget';
import SettingsFab from '../../src/components/SettingsFab';


export default function Weather() {
    const router = useRouter();
    const location = router.query.location as string;
    const weatherQuery = useGetWeather(location);
    const pollutionQuery = useGetPollution(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const nearbyLocationQuery = useGetLocationNearbySearch(weatherQuery.data?.lat, weatherQuery.data?.lon);
    const locationQuery = useGetLocation(location);
    const locationShortForm = locationQuery.data?.results[0].addressComponents[0].shortName || location;
    const locationLongForm = locationQuery.data?.results[0].formattedAddress || location;

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
                                    <WeatherDisplayWidget location={locationLongForm} weatherData={weatherQuery.data}/>
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
                </Box>
                <Footer maxWidth="lg"/>
            </Box>
        </Box>
    )
}