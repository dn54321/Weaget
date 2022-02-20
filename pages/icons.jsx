import Head from 'next/head';
import SearchBar from '@components/search';
import Logo from '@components/logo';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import Footer from '@components/footer';
import TBD from '@components/TBD';
import Navbar from '@components/navbar';
import Icon from '@components/icon';
import {Box, Divider, Container} from '@mui/material';

function DisplayIcon(props) {
  return (
    <Box backgroundColor="lightblue">
      <Stack>
        <Icon id={props.id} />
        <Divider/>
        <Box color="white" fontSize="20px" px="20px" textAlign="center">
          {props.desc}
        </Box>
      </Stack>
    </Box>
  )
}

export default function Home() {
  return (
    <Box height="100%">
        <Head>
            <title>Weaget</title>
        </Head>
        <Box display="grid" gridTemplateRows="80px auto max-content" height="100%" width="100%">
            <Box sx={{gridRow: "1"}}><Navbar /></Box>
            <Box sx={{gridRow: "2"}} color="black">
              <Container maxWidth="lg">
                <h4>Weather Icons</h4>
                This page features all of Weaget&apos;s currently used icons. Icons may be subject to change or updated at any given time.
                <Divider/>
                <Box display="flex" columnGap="10px" rowGap="10px" fontSize="200px" 
                m="20px" flexWrap="wrap">
                    <DisplayIcon id={800} desc="Sunny"/>
                    <DisplayIcon id={801} desc="Few Clouds"/>
                    <DisplayIcon id={802} desc="Scattered Clouds"/>
                    <DisplayIcon id={803} desc="Broken Clouds"/>
                    <DisplayIcon id={804} desc="Overcast Clouds"/>
                    <DisplayIcon id={500} desc="Rain"/>
                    <DisplayIcon id={300} desc="Shower Rain"/>
                    <DisplayIcon id={200} desc="Thunderstorm"/>
                    <DisplayIcon id={600} desc="Snow"/>
                    <DisplayIcon id={700} desc="Mist"/>
                    <DisplayIcon id={-1} desc="N/A"/>
                </Box>
              </Container>
            </Box>
            <Footer/>
        </Box>
    </Box>
  )
}