
"use client"
import { Box, Card, Container, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Head from 'next/head';
import Navbar from '../../src/components/Layout/Section/Navbar';
import Footer from '../../src/components/Layout/Section/Footer';
import WeatherIcon from '../../src/components/WeatherIcon';
import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ListSubheader from '@mui/material/ListSubheader';
import { BrokenCloud } from '../../src/components/Icon/Weather/BrokenCloudIcon';
import { FewCloudIcon } from '../../src/components/Icon/Weather/FewCloudIcon';
import { Mist } from '../../src/components/Icon/Weather/MistIcon';
import { OvercastCloud } from '../../src/components/Icon/Weather/OvercastCloudIcon';
import { RainCloud } from '../../src/components/Icon/Weather/RainCloudIcon';
import { ScatteredCloud } from '../../src/components/Icon/Weather/ScatteredCloudIcon';
import { ShowerRain } from '../../src/components/Icon/Weather/ShowerRainIcon';
import { SnowCloud } from '../../src/components/Icon/Weather/SnowCloudIcon';
import SunIcon from '../../src/components/Icon/Weather/SunIcon';
import { ThunderStorm } from '../../src/components/Icon/Weather/ThunderStormIcon';

function DisplayIcon(props) {
    return (
        <Box bgcolor="lightblue">
            <Stack>
                <WeatherIcon id={props.id} />
                    <Divider/>
                    <Box color="white" fontSize="20px" px="20px" textAlign="center">
                        {props.desc}
                </Box>
            </Stack>
        </Box>
    )
}

const weatherIcons = [
    {
        id: 200,
        icon: <ThunderStorm/>,
        name: "Thunderstorm",
        description: "A lightning bolt accompanied with a cloud."
    },
    {
        id: 300,
        icon: <ShowerRain/>,
        name: "Shower Rain",
            description: "Grey clouds with many light raindrops."
    },
    {
        id: 500,
        icon: <RainCloud/>,
        name: "Rain Cloud",
        description: "Grey clouds with some heavy raindrops."
    },
    {
        id: 600,
        icon: <SnowCloud/>,
        name: "Snow Cloud",
        description: "Light gray clouds with acommpanying snow flakes."
    },
    {
        id: 700,
        icon: <Mist/>,
        name: "Mist",
        description: "A layer of clouds obscuring the sun."
    },
    {
        id: 800,
        icon: <SunIcon/>,
        name: "Sun",
        description: "A bright circle representing the sun."
    },
    {
        id: 801,
        icon: <FewCloudIcon/>,
        name: "Few Clouds",
        description: "A small cloud accompanied with the sun."
    },
    {
        id: 802,
        name: "Scattered Clouds",
        icon: <ScatteredCloud/>,
        description: "A few clouds accompanied with the sun."
    },
    {
        id: 803,
        name: "Broken Clouds",
        icon: <BrokenCloud/>,
        description: "A few clouds obscuring with the sun."
    },
    {
        id: 804,
        name: "Overcast Clouds",
        icon: <OvercastCloud/>,
        description: "Many clouds accompanied with a small sun."
    }
]

export default function Page() {
  const [iconCode, setIconCode] = useState(-1);
  return (
    <Box height="100%">
        <Head>
            <title>Weaget - Icons</title>
        </Head>
        <Box display="grid" gridTemplateRows="80px auto max-content" height="100%" width="100%">
            <Box sx={{gridRow: "1"}}><Navbar /></Box>
            <Box sx={{gridRow: "2"}}>
                <Container maxWidth="lg" sx={{
                    color: "text.primary",
                    mt: "25px"
                }}>
                    <Typography component="h1" variant="h4">Weather Icons</Typography>
                    <Typography variant="body1">This page features all of Weaget&apos;s currently used icons. Icons may be subject to change or updated at any given time.</Typography>
                    <Divider/>
                    <Grid container spacing={1} sx={{mt:"20px"}}>
                        <Grid xs={3} sm={3}>
                            <Card>
                                <List 
                                    component="nav"
                                    aria-labelledby="Weather Icon Menu" 
                                    dense
                                >
                                    <ListSubheader>
                                        Weather Icons
                                    </ListSubheader>
                                    {weatherIcons.map(weatherIcon => (
                                        <ListItemButton
                                            key={weatherIcon.id}
                                            selected={iconCode === weatherIcon.id}
                                            onClick={() => setIconCode(weatherIcon.id)}
                                        >
                                        <ListItemIcon sx={{filter: "initial"}}>
                                            {<WeatherIcon id={weatherIcon.id}/>}
                                        </ListItemIcon>
                                        <ListItemText primary={weatherIcon.name} />
                                    </ListItemButton>
                                    ))}
                                </List>
                            </Card>
                    </Grid>
                        <Grid xs={9} sm={9}>
                            <Card sx={{fontSize:"300px", width:"300px"}}>
                                <WeatherIcon id={iconCode}/>
                            </Card>
                            <Box mt="10px">
                                {iconCode === -1  
                                    ? (
                                        <Typography>Please pick an icon.</Typography>
                                    )
                                    : (
                                        <React.Fragment>
                                            <Typography>Name: {weatherIcons.find(icon => icon.id === iconCode)?.name}</Typography>
                                            <Typography>Description: {weatherIcons.find(icon => icon.id === iconCode)?.description}</Typography>
                                        </React.Fragment>
                                    )
                                }
                                
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer/>
        </Box>
    </Box>
  )
}