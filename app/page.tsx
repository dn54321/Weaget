"use client"
import Footer from '@components/layout/footer';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import Head from 'next/head';
import { useEffect } from 'react';
import LogoIcon from '../src/components/icon/core/logo-icon';
import SearchBar from '../src/components/ui/search-bar';
import SettingsFab from '../src/components/ui/settings-fab';
import { ThemeToggleButton } from '../src/components/ui/theme-toggle-button';
import DailyCompactWeatherWidget from '../src/components/widgets/daily-compact-weather-widget';
import LocationGrid from '../src/components/widgets/location-grid-widget';
import { useWidgetStore } from '../src/hooks/stores/use-widget-store';
import { useAlert } from '../src/hooks/use-alert';
import { useGetCurrentLocation } from '../src/hooks/use-get-current-location';
import { useGetNearbyLocation } from '../src/hooks/use-get-nearby-location';
import { useGetWeather } from '../src/hooks/use-get-weather';

const Loader = () => (
    <Stack 
        data-testid="loader" 
        alignItems="center" 
        sx={{
            color: "primary.text",
            height: "100%",
            mt: "50px"
        }}
    >    
        <div className="dot-falling"></div>
        <Box mt="20px">Fetching Weather...</Box>
    </Stack>
)

const Section = styled(Container)(({theme}) => ({
  display: "flex",
  justifyContent: "center",
  top: "20px",
  position: "relative",
  gap: "10px",
  [theme.breakpoints.down('md')]: {
      flexDirection: "column",
      gap: "50px",
      "& ul,ol": {
          justifyContent: "center"
      }
  }
}));

const SearchContainer = styled('main')(({ theme }) => ({
    height: "400px",
    backgroundColor: theme.palette.primary.main,
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
}));

const PageDivider = styled(Box)(({theme}) => ({
    height:"50px",
    backgroundColor: theme.palette.divider
}));

const ResponsiveLogo = styled(LogoIcon)(({theme}) => ({ 
    pt: "100px",
    mb: "30px",
    zIndex: "0",
    fontSize: "min(13vw, 60px)",
    [theme.breakpoints.up('sm')]: {
        fontSize: "60px"
    }
}));


const PaddedSearchBar = () => (
    <Box sx={{
        px:"10%", 
        width:"100%", 
        display:"grid", 
        placeItems:"center", 
        mt:"40px",
        zIndex: "2"
    }}>
        <SearchBar width="500px"/>
    </Box>   
)

export default function Home() {

    const currentLocationQuery = useGetCurrentLocation();
    const weatherQuery = useGetWeather(currentLocationQuery.data?.city);
    const locationQuery = useGetNearbyLocation(currentLocationQuery.data?.lat, currentLocationQuery.data?.lng);
    const location = `${currentLocationQuery.data?.city}, ${currentLocationQuery.data?.region}, ${currentLocationQuery.data?.country}`;
    const resetWeather = useWidgetStore((state) => state.resetState);
    const {AlertBox, addAlert} = useAlert();
    
    useEffect(() => {
        if (weatherQuery.isError) {
            addAlert({
                type: "error",
                message: "Error fetching weather data. Please try again later.",
                duration: Infinity
            });
        }
        if (locationQuery.isError || currentLocationQuery.isError) {
            addAlert({
                type: "error",
                message: "Error fetching location data. Please try again later.",
                duration: Infinity
            });
        }
    }, [weatherQuery.isError, locationQuery.isError, currentLocationQuery.isError, addAlert]);



    useEffect(() => {
        if (currentLocationQuery.isFetching) {
            resetWeather();
        }
    }, [currentLocationQuery, resetWeather])

    return (
        <Box height="100%">
            <Head>
                <title>Weaget</title>
            </Head>
            <Box display="grid" gridTemplateRows="1fr auto" width="100%" height="100%" position="relative">
                <Box position="absolute" top={10} right={10}>
                    <ThemeToggleButton/>
                </Box>
                <Stack height="100%">
                    <SearchContainer>
                        <ResponsiveLogo/>
                        <PaddedSearchBar/>
                    </SearchContainer>
                    <PageDivider/>
                    <Section maxWidth="md">
                        { weatherQuery.data && locationQuery.data && currentLocationQuery.data ? 
                        <>
                            <DailyCompactWeatherWidget 
                                title="Local Weather"
                                subtitle={location}
                                weatherData={weatherQuery.data} 
                                location={location}
                            />
                            <LocationGrid 
                                locationData={locationQuery.data}
                            />
                        </>
                        :
                        <Loader/>
                        }
                    </Section>
                    <SettingsFab temperature mt="auto"/> 
                    <AlertBox/>
                </Stack>
                <Box>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    )
}