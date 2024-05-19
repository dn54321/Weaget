// Modules
import { useRouter } from 'next/router';
import Head from 'next/head'
import {Stack, Grid, Box, Container} from '@mui/material';
import { useState, useEffect } from 'react';

// Components
import {RainfallCard, WeatherDisplayCard, LocationsCard, SettingsFab,
        Navbar, WeatherStatsCard, WeatherCardList, WeatherStripCard,
        PollutionCard, Footer} from '@components/lib';

// SRC
import searchWeather from "@src/weatherSearch";
import searchLocation from '@src/locationSearch';

// Adds the time offset for a location from UTC time to every
// weather component
function addOffset(wtr) {
    if (wtr.current) wtr.current.offset = wtr.timezone_offset;
    if (wtr.hourly) wtr.hourly.offset = wtr.timezone_offset;
    if (wtr.daily) wtr.daily.offset = wtr.timezone_offset;
    if (wtr.minutely) wtr.minutely.offset = wtr.timezone_offset;
}


export default function Weather(props) {
    const router = useRouter();
    const [wtr, setWtr] = useState(false);
    const [pln, setPln] = useState(false);
    const [place, setPlace] = useState(false);
    const [ctr, setCtr] = useState(false);
    const [nearbyLocation, setNearbyLocation] = useState(false);
    const plc = place ? place : location;
    function getPointer() {
        if (ctr === false) return 0;
        if (ctr == -1) return wtr.current;
        else return {...wtr.daily[ctr], offset: wtr.timezone_offset};
    }

    // Fetches Weather/Location/Pollution API and updates state
    useEffect(() => {
        async function getWeather(loc) {
            await searchWeather(loc)
            .then(payload => {
                if (payload.response !== 200)
                    throw payload;
                const data = payload.data;
                addOffset(data.weather);
                setWtr(data.weather);
                setPlace(data.name);
                setPln(data.pollution);
                setCtr(-1);
                return searchLocation(data.name[0], data.lat, data.lng);
            })
            .then(data => {
                setNearbyLocation(data)
            })
            .catch(data => {
                if (data.response === 404)
                    router.push({
                        pathname: "/404",
                        query: {loc: router.query.location},
                    })
                else 
                router.push({
                    pathname: "/404",
                    query: {
                        err: 500
                    },
                    asPath: "/500"
                })
            })
        }
        if(!router.isReady) return;
        getWeather(router.query.location); 
    }, [router]);

    return (
        <Box>
            <Head>
                <title>{plc[0] && plc[0] + " -"} Weaget</title>
            </Head>
            <Box display="grid" gridTemplateRows="80px auto max-content" gap={1} height="100%" width="100%">
                <Box sx={{gridRow: "1"}}><Navbar /></Box>
                <Box>
                    <Container maxWidth="lg" sx={{height:"fit-content", gridRow: "2"}}> 
                        <Grid container spacing={2} mt="1px">
                            <Grid item xs={12}>
                                <Stack spacing={2}>
                                    <WeatherDisplayCard weather={getPointer()} location={plc}/>
                                    <WeatherCardList sx={{mt:"10px"}} weather={wtr && wtr.daily} setPtr={setCtr}/>  
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={2}>
                                    <WeatherStatsCard weather={getPointer()}/>
                                    <WeatherStripCard weather={wtr && wtr.hourly}/>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={2}>
                                    <PollutionCard pollution={pln}/>
                                    <RainfallCard weather={wtr}/>
                                    <LocationsCard locations={nearbyLocation}/>
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