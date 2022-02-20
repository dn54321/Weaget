import CloudIcon from '@mui/icons-material/Cloud';
import {Box, Card, CardContent, Stack} from '@mui/material/';
import { keyframes, styled } from '@mui/system';
import Temp from '@components/temp';
import {MONTHS} from '@src/constants';
import { StoreMallDirectoryOutlined } from '@mui/icons-material';
// Inspired by https://codepen.io/jasesmith/pen/LbJrXx

const CLOUD_COLOR = "white"
const RAIN_CLOUD_COLOR = "#c9c9c9"
const CLOUD_GLOW = "#eee"
const RAIN_CLOUD_GLOW = "rgba(0,0,0,0.2)"

const move = keyframes`
    50% {transform: translateX(-4500%);}
    100% {transform: translateX(4500%);}
`;

const rain = keyframes`
    0% {top: 0px; left: 0px; opacity: 1}
    100% {opacity: 1}
    100% {top: 200px; left: -50px; opacity: 0}
`;

const snow = keyframes`
    0% {top: 0px; opacity: 1; left:0px}
    10% {left:0px}
    25% { opacity: 1; left: -20px;}
    50% {  left: -30px;}
    70% {  left: -25px;}
    100% { top: 200px; opacity: 0; left: -20px}
`;

const Scene = styled(Box)((props) => ({
    animation: `${move} 100s infinite ease-in-out`,
    position: "absolute",
    width: "1px"
}));

const Cloud = (props) => (
    <Scene {...props}>
        <Box sx={{
        "--cloud-color": props.rain ? RAIN_CLOUD_COLOR : CLOUD_COLOR,
        "--cloud-shade": props.rain ? RAIN_CLOUD_GLOW : CLOUD_GLOW,
        filter: "drop-shadow(0px 0px 0.3em var(--cloud-shade))",
        width: "4em",
        height: "2em",
        borderRadius: '.5em',
        opacity: '1',
        zIndex: "2",
        position: 'absolute',
        backgroundColor: "var(--cloud-color)",
        transform: "translate(-50%,-50%)",
        }}/>
    </Scene>
)

const Sunny = styled(Box)((props) => ({
    fontSize: "min(10px, 5vw)",
    background: "linear-gradient(120deg, #FFE5B4, #FFEB3B)",
    filter: "drop-shadow(0px 0px 3em yellow)",
    width: "8em",
    height: "8em",
    borderRadius: '4em',
    position: 'absolute',
    right: "0px",
    transform: "translate(0%, -40%)",
    opacity: '1',
    "&:before,&:after": {
        backgroundColor: "rgba(255, 255, 255, .2)",
        boxShadow: "0 0 .1em 0 rgba(255, 255, 255, .3) inset, -.1em -.1em 0 .2em rgba(255, 255, 255, .1)",
        content: "''",
        display: "inline-block",
        position: "absolute",
    },
    "&:before": {
        left: '1em',
        top: '5em',
        width: "2em",
        height: "2em",
        borderRadius: "1em",
    },
}));

const Rain = (props) => (
    <Scene {...props}>
    <Box sx={{
        position: "absolute",
        transform: "translate(-50%,-50%) rotate(20deg)",
        width: "0.1em",
        height: "0.7em",
        borderRadius: "0.1em",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))",
        animation: `${rain} 900ms infinite linear`,
        animationDelay: props.delay
    }}>
    </Box>
    </Scene>
)

const Snow = (props) => (
    <Scene {...props}>
    <Box sx={{
        position: "absolute",
        transform: "translate(-50%,-50%) rotate(20deg)",
        width: "0.3em",
        height: "0.3em",
        borderRadius: "0.15em",
        backgroundColor: "white",
        opacity: "0.1",
        filter: "drop-shadow(0 0 10px white)",
        animation: `${snow} 3s infinite linear`,
        animationDelay: props.delay
    }}>
    </Box>
    </Scene>
)


function RainCloud(props) {
    return (
        <>
            <Rain left={`calc(${props.left} + ${4/5*1-2}em)`} top={props.top} delay="600ms"/>
            <Rain left={`calc(${props.left} + ${4/5*2-2}em)`} top={props.top} delay="600ms"/>
            <Rain left={`calc(${props.left} + ${4/5*3-2}em)`} top={props.top} delay="600ms"/>
            <Rain left={`calc(${props.left} + ${4/5*4-2}em)`} top={props.top} delay="600ms"/>
            <Rain left={`calc(${props.left} + ${4/5*1-2}em)`} top={props.top} delay="300ms"/>
            <Rain left={`calc(${props.left} + ${4/5*2-2}em)`} top={props.top} delay="300ms"/>
            <Rain left={`calc(${props.left} + ${4/5*3-2}em)`} top={props.top} delay="300ms"/>
            <Rain left={`calc(${props.left} + ${4/5*4-2}em)`} top={props.top} delay="300ms"/>
            <Rain left={`calc(${props.left} + ${4/5*1-2}em)`} top={props.top} delay="0ms"/>
            <Rain left={`calc(${props.left} + ${4/5*2-2}em)`} top={props.top} delay="0ms"/>
            <Rain left={`calc(${props.left} + ${4/5*3-2}em)`} top={props.top} delay="0ms"/>
            <Rain left={`calc(${props.left} + ${4/5*4-2}em)`} top={props.top} delay="0ms"/>
            <Cloud {...props} rain/>
        </>
    )
}

function SnowCloud(props) {
    return (
        <>
            <Snow left={`calc(${props.left} + ${4/5*1-2}em)`} top={props.top} delay="1200ms"/>
            <Snow left={`calc(${props.left} + ${4/5*2-2}em)`} top={props.top} delay="1900ms"/>
            <Snow left={`calc(${props.left} + ${4/5*3-2}em)`} top={props.top} delay="800ms"/>
            <Snow left={`calc(${props.left} + ${4/5*4-2}em)`} top={props.top} delay="2300ms"/>
            <Snow left={`calc(${props.left} + ${4/5*1-2}em)`} top={props.top} delay="2600ms"/>
            <Snow left={`calc(${props.left} + ${4/5*2-2}em)`} top={props.top} delay="1500ms"/>
            <Snow left={`calc(${props.left} + ${4/5*3-2}em)`} top={props.top} delay="1800ms"/>
            <Snow left={`calc(${props.left} + ${4/5*4-2}em)`} top={props.top} delay="1300ms"/>
            <Snow left={`calc(${props.left} + ${4/5*1-2}em)`} top={props.top} delay="900ms"/>
            <Snow left={`calc(${props.left} + ${4/5*2-2}em)`} top={props.top} delay="300ms"/>
            <Snow left={`calc(${props.left} + ${4/5*3-2}em)`} top={props.top} delay="50ms"/>
            <Snow left={`calc(${props.left} + ${4/5*4-2}em)`} top={props.top} delay="100ms"/>
            <Cloud {...props}/>
        </>
    )
}

function Rainy(props) {
    return (
        <>
            <RainCloud left="75%" top="30%"/>
            <RainCloud left="60%" top="50%"/>
        </>
    )
}

function Cloudy(props) {
    return (
        <>
            <Cloud left="75%" top="30%"/>
            <Cloud left="60%" top="50%"/>
        </>
    )
}

function Snowy(props) {
    return (
        <>
            <SnowCloud left="75%" top="30%"/>
            <SnowCloud left="60%" top="50%"/>
        </>
    )
}


const getBackgroundColor = id => {
    const cloudy = "linear-gradient(to right top, #1b9ce2 0%, #e0e2e5 90%)";
    const stormy = "linear-gradient(to right top, #4b9cc2 0%, #9adbd9 90%)";
    const snowy = "linear-gradient(to bottom left, #758595 0%, #e0e2e5 90%)";
    if (200 <= id && id < 600) return stormy;
    else if (600 <= id && id < 700) return snowy;
    return cloudy;
}

const getBackgroundIcon = id => {
    switch (id) {
        case 200: return (<Rainy/>)
        case 300: return (<Rainy/>)
        case 500: return (<Rainy/>)
        case 600: return (<Snowy/>)
        case 700: return (<Cloudy/>)
        case 800: return (<Sunny/>)
        case 801: return (<Cloudy/>)
        case 802: return (<Cloudy/>)
        case 803: return (<Cloudy/>)
        case 804: return (<Cloudy/>)
        default: 
            const mod = id % 100;
            if (mod) return getBackgroundIcon(id-mod);
            return (<Cloudy/>)
    }
}

const Container = styled(Card)((props) => ({
    position: "relative",
    height: "20rem",
    boxShadow: "0 0 .3em -.03em #fff",
    background: getBackgroundColor(props.weather ? 
        props.weather.weather[0].id : 0)
}));


const Location = (props) => {
    return (
        <Box component="h1" width="100%" position="relative" height="3em">
            <Box sx={{
                fontSize: "2.5em", 
                textOverflow: "ellipsis", 
                overflow: "hidden", 
                whiteSpace: "nowrap",
                position: "absolute",
                left: "0",
                right: "0",
                textTransform: "capitalize"
            }}>
                {props.children}
            </Box>
        </Box>
    )
}

const High = styled(Box)(({ theme }) => ({
    display: "inline",
    fontSize: "1em",
}));

const Low = styled(Box)(({ theme }) => ({
    fontSize: "0.5em",
    display: "inline",
    color: theme.palette.grey[200],
}));

function printDate(wtr) {
    const date = new Date((wtr.dt + wtr.offset)*1000);
    const month = MONTHS[date.getUTCMonth()]
    const day = date.getUTCDate();
    let hours = date.getUTCHours();
    let mins = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${month} ${day}, ${hours}:${mins}${ampm}`;
}

export default function WeatherDisplayCard(props) {
    return (
        <Container icon='cloudy' component="section" {...props}>
            <CardContent sx={{height: "100%"}}>
                <Box>
                    <Location>{props.location[0]}{props.location[1] ? ", " + props.location[1] : ""}</Location>
                    {(props.weather) ?
                        <Stack direction="row" height="100%">
                            <Box mt="0.1em">
                                <Box opacity="0.6" fontSize="0.8em">{`${printDate(props.weather)}`}</Box>
                                <Box>
                                    { props.weather.temp.max ?    
                                    <Box fontSize="4em" mt="0.2em">
                                        <High><Temp label={props.weather.temp.max}/></High>
                                        <Low><Temp label={props.weather.temp.min}/></Low>
                                    </Box>:
                                    <Box fontSize="4em" mt="0.2em"><Temp label={props.weather.temp} symbol/></Box>
                                    }
                                    <Box mt="-1.0em"></Box>
                                    {!(props.weather.feels_like.day) && 
                                    <Box fontSize="1em"><b>Feels like <Temp label={props.weather.feels_like}/></b></Box>}
                                    <Box fontSize="1em" sx={{textTransform:"capitalize"}}><b>{props.weather.weather[0].description}</b></Box>
                                </Box>
                            </Box>
                            <Box position="relative" width="100%" fontSize="3vw">
                                {getBackgroundIcon(props.weather.weather[0].id)}
                            </Box>
                        </Stack>
                    :null}
                </Box>
                {props.children}
            </CardContent>
        </Container>
    )
}