import { Card, CircularProgress, Divider } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { circularProgressClasses } from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from '@mui/system/styled';
import * as React from 'react';

/*
    Pollution Card determines the overall 
    air quality in the searched weather location.
*/

const Container = styled(Card)(({ theme }) => ({
    width: "100%",
    color: "black",
    padding: "15px"
}));

const properties = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

function CircularProgressWithLabel(props) {
    const width="120px";
    const thickness = 5;
    const variant = props.load ? "determinate" : "indeterminate"
    return (
        <Box sx={{ position: 'relative'}} width={width} height={width} >
            <svg width={width}>
                <defs>
                    <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                        <stop offset='0%' stopColor='rgba(184, 74, 202, 1)' />
                        <stop offset='100%' stopColor='rgba(142, 66, 235, 1)' />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress variant={variant} value={100} role={null} 
            aria-valuenow={null} size={width} sx={{
                ...properties,
                color: "#eee"
            }} thickness={thickness}/>
            <CircularProgress variant={variant} size={width} 
            value={Math.min(props.value,300)/300*100} thickness={thickness} 
            aria-valuenow={props.value == "???" ? null : props.value}
            aria-valuemax={300}
            aria-valuemin={0}
            aria-label={"Air Quality Index"}
            sx={{
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
                'svg circle': { 
                    stroke: 'url(#my_gradient)'
                },
                ...properties
            }}/>
        
            <Box sx={properties} fontSize="30px">
                {`${props.value}`}
            </Box>
        </Box>
    );
}


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


function createData(chemical, amount) {
    return { chemical, amount };
}


function PollutionTable(props) {
    return (
        <TableContainer component={Box}>
        <Table sx={{
        "*": {
            color: "black !important"
        }
        }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Particle</TableCell>
                <TableCell><abbr title="Air Quality Index">AQI</abbr> Level</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.rows.map((row, ind) => (
                <TableRow
                key={ind}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell>{row.chemical}</TableCell>
                <TableCell>{row.amount}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

const aqiStatus = ["Good", "Moderate", "Unhealthy for sensitive groups", "Unhealthy", "Very Unhealthy", "Hazardous"]
const warn = ["", 
    "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.",
    "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.",
    "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion",
    "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.",
    "Everyone should avoid all outdoor exertion"];

const stringToTag = {
    "neph": <span title="visibility">NEPH</span>, 
    "pm25": <span title="particles with a diameter of 2.5 micrometres or less">PM<sub>2.5</sub></span>, 
    "pm10": <span title="particles with a diameter of 10 micrometres or less">PM<sub>10</sub></span>, 
    "o3": <span title="ozone">O<sub>3</sub></span>, 
    "no2": <span title="nitrogen dioxide">NO<sub>2</sub></span>, 
    "so2": <span title="sulfur dioxide">SO<sub>2</sub></span>,
    "nh3": <span title="ammonia">NH<sub>3</sub></span>,
    "co": <span title="carbon monoxide">CO</span>
};

// Not Used
const units = {
    "neph": <s>10<sup>-4</sup> m<sup>-1</sup></s>, 
    "pm25": <>??g/m<sup>3</sup></>, 
    "pm10": <>??g/m<sup>3</sup></>, 
    "o3": "pphm", 
    "no2": "pphm", 
    "so2": "pphm",
    "nh3": "pphm",
    "CO": "ppm"
};

function aqiRating(aqi) {
    if (aqi <= 50) return 0;
    if (aqi <= 100) return 1;
    if (aqi <= 150) return 2;
    if (aqi <= 200) return 3;
    if (aqi <= 300) return 4;
    return 5;
} 

const dataOrder = ["neph", "pm25", "pm10", "o3", "no2", "so2", "co"]

export default function LocationList(props) {
    const [show, setShow] = React.useState(false);
    const aqi = props.pollution ? props.pollution.aqi : 0
    const aqRating = aqiRating(aqi);
    const loaded = props.pollution.aqi ? 1 : 0;
    let rows = [];
    if (props.pollution)
        dataOrder.forEach(key => {
            if (props.pollution.iaqi[key] === undefined) return;
            const rating = <Box sx={{float: "right"}}>({aqiStatus[aqiRating(props.pollution.iaqi[key].v)]})</Box>;
            rows.push(createData(stringToTag[key] , 
                <>{props.pollution.iaqi[key].v} {rating}</>));
        })

    return (
        <Container component="section">
            <Box component="h1" p="5px">Pollution Level</Box>
            <Divider />
            <Stack direction={{xs:"column", sm:"row", md:"column"}} 
            alignItems={{xs:"stretch", sm:"center", md:"stretch"}}
            gap={2} sx={{mt:"20px"}}>
                <Stack direction="row" alignItems="center">
                    <CircularProgressWithLabel value={props.pollution.aqi || "???"} 
                    load={loaded}/>
                    <Box ml="20px" width="max-content">
                        <Box fontSize="16px">Air Quality Index</Box>
                        <Box sx={{color: (theme) => theme.palette.primary.light}}>
                            {props.pollution.aqi ? aqiStatus[aqRating] : <DotLoader/>}
                        </Box>
                    </Box>
                </Stack>
                {aqRating ? <Alert severity="warning">{warn[aqRating]}</Alert> : ""}
            </Stack>
            { loaded ? 
                <>
                    <Box mt="20px" color="black">{show && <PollutionTable rows={rows}/>}</Box>
                    <Link mt="10px" component="button" onClick={()=>{setShow(!show)}}>
                        {show ? "Hide Advanced Pollution Details" : "Show Advanced Pollution Details"}
                    </Link>
                </>
             : <Box color="#4682B4" mt="20px">Loading...</Box>
             }
        </Container>
    )
}