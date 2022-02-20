import styled from '@mui/system/styled';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import {Grid, Card, Divider} from  '@mui/material';
import WeatherCard from '@components/weatherCard';
import {useState} from 'react';
import Skeleton from '@mui/material/Skeleton';

const Container = styled(Card)(({ theme }) => ({
    color: "black",
    padding: "15px 15px 0px 15px",
    overflow: "visible",
}));

const List = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    gap: "5px",
    paddingBottom: "10px"
}))

const WeatherList = (props) => {
    function activate(idx) {
        props.setPtr(idx);
        if (props.activeCard !== idx) props.setActiveCard(idx);
        else props.setActiveCard(-1);
    }

    return (
        <>  {props.weather ? 
            props.weather.map((wtr, ind) => {
                return <WeatherCard weather={wtr} key={wtr.dt} offset={props.weather.offset}
                onMouseEnter={() => props.setPtr(ind)} onClick={() => activate(ind)} 
                active={props.activeCard === ind ? 1 : 0} />
            })
            :
            [...Array(8)].map((x,i) => 
                <Skeleton variant="rectangular" sx={{
                    width: "100%",
                    minWidth: "120px",
                    height: "173px",
                    opacity: "20%",
                    borderRadius: "10px"
                }} key={i}/>
            )
            }
        </>
    )
}

export default function WeatherCardList(props) {
    const [activeCard, setActiveCard] = useState(-1);
    return (
        <Container component="section">
            <Box px="5px"><h1>Daily Cards</h1></Box>
            <Divider />
            <Box p="5px" fontSize="0.7em"><b>Click any card below to see more detailed description of the weather card.</b></Box>
            <Box position="relative" width="100%" height="200px">
            <List component="ol" sx={{
                overflowX: {xs: "scroll",lg: "hidden"},
            }} onMouseLeave={() => props.setPtr(activeCard)}>
            <WeatherList {...props} activeCard={activeCard} setActiveCard={setActiveCard}/>
            </List>
            </Box>
        </Container>
    )
}