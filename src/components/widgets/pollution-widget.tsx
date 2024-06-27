import { CircularProgress } from '@mui/material';
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
import * as React from 'react';
import { Pollution } from '../../features/apicn-pollution/pollution.types';
import { Widget } from '../containers/widget';

/*
    Pollution Card determines the overall 
    air quality in the searched weather location.
*/

interface CircularProgressWithLabelProps {
    value?: number;
    loaded: boolean;
}
function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
    const width="120px";
    const thickness = 5;
    const circularProgressValue = props.value ?? 0;
    const variant = props.loaded ? "determinate" : "indeterminate"
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
            <CircularProgress
                className="absolute-center" 
                thickness={thickness}
                variant={variant} 
                value={100} 
                size={width} 
                sx={{ color: "#eee" }} 
                role="none"
                aria-valuenow={undefined}
            /> 
            <CircularProgress 
                className="absolute-center" 
                variant={variant} 
                size={width} 
                value={Math.min(circularProgressValue, 300)/300*100} 
                thickness={thickness} 
                aria-busy={props.loaded}
                aria-valuenow={circularProgressValue}
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
                }}/>
        
            <Box fontSize="30px" className="absolute-center">
                {`${circularProgressValue}`}
            </Box>
        </Box>
    );
}


const DotLoader = () => { return (
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

// Not Used Yet..
// const units = {
//     "neph": <s>10<sup>-4</sup> m<sup>-1</sup></s>, 
//     "pm25": <>µg/m<sup>3</sup></>, 
//     "pm10": <>µg/m<sup>3</sup></>, 
//     "o3": "pphm", 
//     "no2": "pphm", 
//     "so2": "pphm",
//     "nh3": "pphm",
//     "CO": "ppm"
// };

function aqiRating(aqi: number) {
    if (aqi <= 50) return 0;
    if (aqi <= 100) return 1;
    if (aqi <= 150) return 2;
    if (aqi <= 200) return 3;
    if (aqi <= 300) return 4;
    return 5;
} 

const dataOrder = ["neph", "pm25", "pm10", "o3", "no2", "so2", "co"]

export interface PollutionCardProps {
    pollution?: Pollution
}

export default function PollutionWidget(props: PollutionCardProps) {
    const [show, setShow] = React.useState(false);
    const loaded = props.pollution ? true : false;
    const aqi = props.pollution ? props.pollution.aqi : 0
    const aqRating = aqiRating(aqi);

    let rows: any = [];
    
    if (props.pollution) {
        const pollution = props.pollution;
        dataOrder.forEach(key => {
            if (pollution.iaqi[key] === undefined) return;
            const rating = <Box sx={{float: "right"}}>({aqiStatus[aqiRating(pollution.iaqi[key].v)]})</Box>;
            rows.push(createData(stringToTag[key], <>{pollution.iaqi[key].v} {rating}</>));
        })
    }

    return (
        <Widget title={"Pollution Level"}>
            <Box p="20px" pb="10px">
            <Stack 
                direction={{xs:"column", sm:"row", md:"column"}} 
                alignItems={{xs:"stretch", sm:"center", md:"stretch"}}
                gap={2} 
            >
                <Stack direction="row" alignItems="center">
                    <CircularProgressWithLabel value={props.pollution?.aqi} loaded={loaded}/>
                    <Box ml="20px" width="max-content">
                        <Box fontSize="16px">Air Quality Index</Box>
                        <Box sx={{color: "text.color"}}>
                            {props.pollution?.aqi ? 
                                aqiStatus[aqRating] : 
                                <Box ml="20px"><DotLoader/></Box>
                            }
                        </Box>
                    </Box>
                </Stack>
                {aqRating ? <Alert severity="warning">{warn[aqRating]}</Alert> : ""}
            </Stack>
            { loaded ? 
                <>
                    <Box mt="20px" color="black">{show && <PollutionTable rows={rows}/>}</Box>
                    <Link mt="10px" component="button" onClick={()=>{setShow(!show)}} color="text.color">
                        {show ? "Hide Advanced Pollution Details" : "Show Advanced Pollution Details"}
                    </Link>
                </>
             : <Box color="#4682B4" mt="20px">Loading Pollution Details...</Box>
             }
             </Box>
        </Widget>
    )
}