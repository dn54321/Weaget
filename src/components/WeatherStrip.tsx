
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Typography, styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DateTime } from 'luxon';
import WeatherStatsCard, { WeatherStats } from './Cards/WeatherStatsCard';
import Temp from './TemperateUnit';
import WeatherIcon from './WeatherIcon';

const Day = styled(Box)(() => ({
    textTransform: "uppercase",
    fontSize: "0.5em",
}));

const Capitalise = styled(Box) ({
    textTransform: "capitalize",
    width: "100px"
})



const Accordion = (props) => {
    return (
        <MuiAccordion disableGutters elevation={0} 
            slotProps={{ transition: {unmountOnExit: true, timeout: 0 }}}
            expanded={props.expanded} onChange={props.onChange}
            sx={{color: "primary.dark"}}
        >
            {props.children}
        </MuiAccordion>
    )
}

export interface WeatherStripProps {
    date: Date,
    timezone: string,
    weatherCode: number,
    weatherDescription: string,
    temperature: number,
    rainPercentage: number,
    stats: Array<WeatherStats>,
    expanded?: boolean,
    setExpanded?: () => void,
}


export default function WeatherStrip(props: WeatherStripProps) {
    const date = DateTime.fromJSDate(props.date, {zone: props.timezone});
    
    return (
        <Box>
            <Accordion 
                 {...(props.expanded !== undefined && {expanded: props.expanded})}
                 {...(props.setExpanded && {onChange: () => props.setExpanded!()})}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                    "& .MuiAccordionSummary-content": { margin: "0px" },
                    paddingLeft: "0px",
                    boxShadow:  "none"
                }}>
                    <Stack sx={{width:"100%", alignItems:"center"}} direction="row">
                        <Stack alignItems="center" p="10px" fontSize="48px" sx={{ position: "relative" }}>
                            <WeatherIcon id={props.weatherCode} rainPercentage={props.rainPercentage}/>
                        </Stack>
                        <Box ml="15px">
                            <Box><b><Temp value={props.temperature}/></b></Box>
                            <Capitalise fontSize="0.6em">{props.weatherDescription}</Capitalise>
                        </Box> 
                        <Box position="relative" width="100%" height="100%" mr="30px">
                            <Stack direction="row" gap="20px" sx={{
                                alignItems: "center",
                                position: "absolute",
                                left: "0px",
                                right: "0px",
                                top: "0px",
                                bottom: "0px",
                            }}>
                                <Stack 
                                    component="ul"
                                    direction="row" 
                                    sx={{
                                        height: "40.8px",
                                        overflow: "hidden",
                                        flexWrap: "wrap",
                                        width: "100%"
                                    }}
                                >
                                    {props.stats
                                        .filter(stats => stats.compactValue || stats.value)
                                        .map((stat) => (
                                            <Stack 
                                                key={stat.name}
                                                component="li"
                                                title={stat.name}  
                                                alignItems="center" 
                                                width="60px"
                                                sx={{display: {xs: "none", sm: "block"}}}
                                            >
                                                <Box sx={{color: "primary.light"}}>{stat.statIcon}</Box>
                                                <Box fontSize="0.7em">{stat.compactValue || stat.value}{stat.unit}</Box>
                                            </Stack>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        </Box>
                        <Stack ml="auto" alignItems="flex-end" mr="5px">
                            <Box>{date.toFormat("ha").toLowerCase()}</Box>
                            <Day>{date.toFormat("cccc")}</Day>
                        </Stack>
                </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{color: "black"}}>
                    <Typography variant="body2" mt="10px"><b>Hourly Weather Stats</b></Typography>
                    <WeatherStatsCard stats={props.stats}/>
                </AccordionDetails>
            </Accordion>
            <Divider/>
        </Box>
    )
}