import CompactWeatherCardList from '@components/compactWeatherCardList';
import Footer from '@components/footer';
import LocationsGrid from '@components/locationsGrid';
import Logo from '@components/logo';
import SearchBar from '@components/search';
import SettingsFab from '@components/settingsFab';
import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import searchLocation from '@src/locationSearch';
import searchWeather from '@src/weatherSearch';
import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import { SettingContext } from "@src/settings";
const Loader = (props) => (
    <Stack alignItems="center" sx={{
        color: "black",
        height: "100%",
        mt: "50px"
    }}>    
    <div className="lds-ripple"><div></div><div></div></div>
    <Box mt="20px">Fetching Weather...</Box>
    </Stack>

)

const Section = styled(Container)(({theme}) => ({
  display: "flex",
  justifyContent: "center",
  top: "20px",
  position: "relative",
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
    backgroundColor: theme.palette.primary.main || "#1b8ca9",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
}));

const PageDivider = styled(Box)(({theme}) => ({
    height:"50px",
    backgroundColor:"#eee"
}));

const ResponsiveLogo = styled(Logo)(({theme}) => ({ 
    pt: "100px",
    mb: "30px",
    fontSize: "min(13vw, 60px)",
    [theme.breakpoints.up('sm')]: {
        fontSize: "60px"
    }
}));


const PaddedSearchBar = (props) => (
    <Box sx={{px:"10%", width:"100%", display:"grid", 
              placeItems:"center", mt:"40px"}}>
        <SearchBar width="500px"/>
    </Box>   
)

export default function Home() {
    const [data, setData] = useState(false);
    const [places, setPlaces] = useState(false);
    const settings = useContext( SettingContext );

    useEffect(() => {
        let city, lat, lng;
        // Get Weather Details
        if (city = settings.city) 
            searchWeather(city)
            .then(data => setData(data.data));

        // Get Nearby Locations
        if (!settings.lat && !settings.lng) return;
        [lat, lng] = [settings.lat, settings.lng]
        searchLocation(city, lat, lng)
        .then(locations => setPlaces(locations))
    }, [settings])

  return (
    <Box height="100%">
        <Head>
            <title>Weaget</title>
        </Head>
        <Box display="grid" gridTemplateRows="1fr auto" width="100%" height="100%">
            <Stack height="100%">
                <SearchContainer>
                    <ResponsiveLogo/>
                    <PaddedSearchBar/>
                </SearchContainer>
                <PageDivider/>
                <Container maxWidth="lg">
                <Stack direction="column">   
                </Stack>
                </Container>
                <Section maxWidth="md">
                    { data ? 
                    <>
                    <CompactWeatherCardList weather={data.weather} place={data.name}/>
                    <LocationsGrid locations={places}/>
                    </>
                    :
                    <Loader/>
                    }
                </Section>
                <SettingsFab temperature mt="auto"/> 
            </Stack>
            <Box>
                <Footer maxWidth="md"/>
            </Box>
        </Box>
    </Box>
  )
}