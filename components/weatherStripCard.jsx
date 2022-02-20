import styled from '@mui/system/styled';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import {Grid, Card, Divider} from  '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import { mdiWeatherPouring, mdiWaterPercent, mdiWeatherSunnyAlert } from '@mdi/js';
import Icon from '@components/icon';
import Icon2 from '@mdi/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { PinDropSharp } from '@mui/icons-material';
import Temp from '@components/temp';
import Pagination from '@mui/material/Pagination';
import {useState} from 'react';
import WeatherStatsCard from 'components/weatherStatsCard';
import {DAYS} from '@src/constants';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import MeasureUnit from '@components/measureUnit';
import {round} from '@src/math';

const Container = styled(Card)(({ theme }) => ({
    width: "100%",
    color: "black",
    padding: "15px"
}));

const Description = styled(Box)(({ theme }) => ({
    mt:"10px",
    fontSize: "0.5em",
}));

const Day = styled(Box)(({ theme }) => ({
    textTransform: "uppercase",
    fontSize: "0.5em",
}));

const HideBox = styled(Box, {
    shouldForwardProp: (props) => props !== 'hidden',
})(({ theme, hidden }) => ({
    [theme.breakpoints.down(hidden)]: {
        display: "none"
    }
}));

const HideUp = styled(Box, {
    shouldForwardProp: (props) => props !== 'hidden',
})(({ theme, hidden }) => ({
    [theme.breakpoints.up(hidden)]: {
        display: "none"
    }
}));

const Capitalise = styled(Box) ({
    textTransform: "capitalize",
    width: "100px"
})

const DotLoader = (props) => { return (
    <Box className="dot-pulse" sx={{
        left: "-9980px",
        width: "5px",
        height: "5px",
        top: "5px",
        "&:before,&:after": {
            width: "5px",
            height: "5px",
        }
    }}/>
)}

const Accordion = (props) => {
    return (
        <MuiAccordion disableGutters elevation={0} 
            TransitionProps={{ unmountOnExit: true, timeout: 0}}
            expanded={props.expanded} onChange={props.onChange}
            sx={{color: "primary.light"}}>
                {props.children}
        </MuiAccordion>
    )
}

const Rain = (props) => {
    if (!props.label) return null;
    return (
    <Box height={0} width="fit-content" position="absolute" bottom="30%" right="0%"
    fontSize="0.2em" title="Chance of Rain">
        {`${round(props.label*100,0)}%`}
    </Box>
    )
}

function getHour(date) {
    let hours = date.getUTCHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}${ampm}`;
  }

  function getDay(date) {
    return DAYS[date.getUTCDay()];
  }

function CardStrip(props) {
    const date = new Date((props.weather.dt+props.offset)*1000)
    const handleChange = (panel) => {
        props.setExpanded(props.expanded===panel ? false : panel);
    };
    
    return (
        <Box component="li">
            <Accordion expanded={props.expanded === props.weather.dt} 
                       onChange={() => handleChange(props.weather.dt)}>

            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                "& .MuiAccordionSummary-content": {
                    margin: "0px"
                },
                paddingLeft: "0px",
                boxShadow:  "none"
            }}>
            <Stack sx={{width:"100%", alignItems:"center"}} direction="row">
                <Stack alignItems="center" p="10px" fontSize="48px" sx={{
                    position: "relative"
                }}>
                    <Icon id={props.weather.weather[0].id}/>
                    <HideUp hidden={450}><Rain label={props.weather.pop}/></HideUp>
                </Stack>
                <Box ml="5px">
                    <Box component="inline-block" fontSize="1.1em">
                        <b><Temp label={props.weather.temp}/></b>
                    </Box>
                    <Capitalise fontSize="0.6em">{props.weather.weather[0].description}</Capitalise>
                </Box> 
                <Stack direction="row" gap="20px">
                <HideBox hidden={450} title="Chance of Rain">
                    <Icon2 path={mdiWeatherPouring} size="1em"/> 
                    <Box fontSize="0.7em" width="20px">{`${round(props.weather.pop*100,0)}%`}</Box>
                </HideBox>
                <HideBox hidden={390} title="Wind Speed">
                    <AirIcon sx={{fontSize:"16px"}}/>
                    <Box fontSize="0.7em">
                        <MeasureUnit label={props.weather.wind_speed}/>
                    </Box>
                </HideBox>
                </Stack>
                <Stack ml="auto" alignItems="flex-end" mr="5px">
                    <Box>{getHour(date)}</Box>
                    <Day>{getDay(date)}</Day>
                </Stack>
            </Stack>
        </AccordionSummary>
        <AccordionDetails>
            <WeatherStatsCard weather={props.weather} header={0}
            backgroundColor="#eee" strict/>
        </AccordionDetails>
        </Accordion>
        <Divider/>
        </Box>
    )
}


export default function WeatherStrip(props) {
    const [page, setPage] = useState(1);
    const [expanded, setExpanded] = useState(false);

    const WeatherStrips = props.weather ? 
        props.weather.slice((page-1)*12,page*12).map(wtr => 
            <CardStrip weather={wtr} offset={props.weather.offset} key={wtr.dt}
            expanded={expanded} setExpanded={setExpanded}/>
        )
    :
        [...Array(12)].map((x,i) => 
        <Box key={i}>
        <Box height="66px" my="1px" key={i} display="flex" alignItems="center">
            <Skeleton variant="circular" width={40} height={40}/>
            <Box ml="10px">
            <Skeleton variant="text" width="60px" sx={{lineHeight: 1}}/>
            <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
            </Box>
            <HideBox hidden={400} ml="40px">
                <Skeleton width="40px" height="66px"/>
                </HideBox>
            <HideBox ml="10px" hidden={450}>
                <Skeleton width="40px" height="66px"/>
            </HideBox>
            <Stack ml="auto" mr="5px" alignItems="flex-end">
                <Skeleton variant="text" width="80px" sx={{lineHeight: 1}}/>
                <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
            </Stack>
        </Box>
        <Divider/>
        </Box>
        )

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Container component="section" direction="row">
            <Box p="5px" display="flex" justifyContent="space-between">
                <h1>Hourly Weather Details</h1>
            </Box>
            <Divider/>
            <ul>
            {WeatherStrips}
            </ul>
            <Box display="flex" justifyContent="center" mt="10px">
            {props.weather ?
            <Pagination count={4} page={page} onChange={handleChange} color="primary"
            sx={{
                    "& .MuiPaginationItem-root": {
                        color: "black"
                    },
                    "& .Mui-selected": {
                        color: "#fff"
                    }
            }}/>
            :
            <Box my="10px"><Box className="dot-falling"/></Box>
            }
            </Box>
        </Container>
    )
}