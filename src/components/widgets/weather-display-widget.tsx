import {Box, Card, CardContent, Stack, Typography} from '@mui/material/';
import { BoxProps, keyframes, styled } from '@mui/system';
import Temp from '../ui/temperature-unit';
import { DateTime } from 'luxon';
import { CurrentWeatherDetails, DailyWeatherDetails, OneCallWeatherDetails } from '../../features/open-weather-map-one-call/oneCall.type';
import { useWidgetStore } from '../../hooks/stores/use-widget-store';

const CLOUD_COLOR = "white"
const RAIN_CLOUD_COLOR = "#c9c9c9"
const CLOUD_GLOW = "#eee"
const RAIN_CLOUD_GLOW = "rgba(0,0,0,0.2)"

const move = keyframes`
    33% {transform: translateX(-2000%);}
    66% {transform: translateX(2000%);}
    99% {transform: translateX(0%);
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

const Scene = styled(Box)(() => ({
    animation: `${move} 100s infinite ease-in-out`,
    position: "absolute",
    width: "1px"
}));

const Cloud = (props: BoxProps & {rain?: boolean}) => {
    const { rain: hasRain, ...boxProps } = props;
    return (
        <Scene {...boxProps}>
            <Box sx={{
                "--cloud-color": hasRain ? RAIN_CLOUD_COLOR : CLOUD_COLOR,
                "--cloud-shade": hasRain ? RAIN_CLOUD_GLOW : CLOUD_GLOW,
                filter: "drop-shadow(0px 0px 0.3em var(--cloud-shade))",
                width: "4em",
                borderRadius: '.5em',
                opacity: '1',
                zIndex: "2",
                position: 'absolute',
                backgroundColor: "var(--cloud-color)",
                transform: "translate(-50%,-50%)",
                height: "2em",
            }}/>
        </Scene>
    )
}

const Sun = styled(Box)(() => ({
    fontSize: "0.4em",
    background: "linear-gradient(120deg, #FFE5B4, #FFEB3B)",
    filter: "drop-shadow(0px 0px 3em yellow)",
    width: "8em",
    height: "8em",
    borderRadius: '4em',
    position: 'absolute',
    right: "0px",
    transform: "translate(-20%, -20%)",
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

const Rain = (props: BoxProps & {delay: string}) => {
    const {delay, ...boxProps} = props;
    return (
        <Scene {...boxProps}>
            <Box sx={{
                position: "absolute",
                transform: "translate(-50%,-50%) rotate(20deg)",
                width: "0.1em",
                height: "0.7em",
                borderRadius: "0.1em",
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))",
                animation: `${rain} 900ms infinite linear`,
                animationDelay: delay
            }}>
            </Box>
        </Scene>
    )
}

const Snow = (props: BoxProps & {delay: string}) => {
    const {delay, ...boxProps} = props;
    return (
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
    );
}

function RainCloud(props: BoxProps) {
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

function SnowCloud(props: BoxProps) {
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

function Rainy(props: BoxProps) {
    return (
        <>
            <RainCloud left="75%" top="30%"/>
            <RainCloud left="60%" top="50%"/>
        </>
    )
}

function Cloudy(props: BoxProps) {
    return (
        <>
            <Cloud left="75%" top="30%"/>
            <Cloud left="60%" top="50%"/>
        </>
    )
}

function Sunny() {
    return (
        <>
            <Sun left={{xs: "55%", sm:"62%", md:"65%"}} top={{xs:"20%", sm:"0%"}}/>
        </>
    )
}

function ScatteredClouds() {
    return (
        <>
            <Sun left={{xs: "55%", sm:"62%", md:"65%"}} top={{xs:"20%", sm:"0%"}}/>
            <Cloud left="77%" top="40%" fontSize="0.7em"/>
            <Cloud left="67%" top="60%" fontSize="0.7em"/>
        </>
    )
}

function FewClouds() {
    return (
        <>
            <Sun left={{xs: "55%", sm:"62%", md:"65%"}} top={{xs:"20%", sm:"0%"}}/>
            <Cloud left="65%" top="65%" fontSize="0.5em" height="4em"/>
        </>
    )
}


function Snowy(props: BoxProps) {
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
        case 801: return (<FewClouds/>)
        case 802: return (<ScatteredClouds/>)
        case 803: return (<Cloudy/>)
        case 804: return (<Cloudy/>)
        default: (id % 100) ? getBackgroundIcon(id-(id % 100)) : <Cloudy/>
    }
}

const Container = styled(Card)((props) => ({
    position: "relative",
    height: "320px",
    boxShadow: "0 0 .3em -.03em #fff",
    color: "white"
}));

const High = styled(Box)(({ theme }) => ({
    display: "inline",
    fontSize: "1em",
}));

const Low = styled(Box)(({ theme }) => ({
    fontSize: "0.5em",
    display: "inline",
    color: theme.palette.grey[200],
}));

export interface WeatherDisplayWidgetProps {
    weatherData?: OneCallWeatherDetails;
    location?: string;
}

export interface WeatherTemperatureDisplayProps {
    weather: DailyWeatherDetails | CurrentWeatherDetails | undefined;
}

export function WeatherTemperatureDisplay(props: WeatherTemperatureDisplayProps) {
    if (props.weather === undefined) {
        return;
    }

    if (typeof(props.weather.temp) === "number") {
        return (<Box fontSize="4em" mt="0.2em"><Temp value={props.weather.temp} symbol/></Box>)
    }

    if (props.weather.temp.max && props.weather.temp.min) {
        return (
            <Box fontSize="4em" mt="0.2em">
                <High><Temp value={props.weather.temp.max}/></High>
                <Low><Temp value={props.weather.temp.min}/></Low>
            </Box>
        )
    }
}

export default function WeatherDisplayWidget(props: WeatherDisplayWidgetProps) {
    const focusedWeather = useWidgetStore(state => state.focusedWeather) ?? props.weatherData?.current;
    const timezone = props.weatherData?.timezone;

    const weatherUpdated = focusedWeather 
        ? DateTime.fromJSDate(focusedWeather?.dt, { zone: timezone}).toFormat('LLL d, t')
        : "Fetching Details..."

    const weatherCode = focusedWeather?.weather[0]?.id;
    const weatherDescription = focusedWeather?.weather[0]?.description;
    const weatherFeelsLike = focusedWeather?.feelsLike

    return (
        <Container sx={{ background: getBackgroundColor(focusedWeather?.weather[0].id) }}>
            <CardContent sx={{height: "100%"}}>
                <Typography component="h1" variant="h3"><b>{props.location ?? "Fetching Location Details..."}</b></Typography>
                <Typography variant="body2">Updated At: {weatherUpdated}</Typography>
                <Stack direction="row" height="80%">
                    <Box width="150px">
                        <WeatherTemperatureDisplay weather={focusedWeather}/>
                        {typeof(weatherFeelsLike) === 'number' && <Box fontSize="1em"><b>Feels like <Temp value={weatherFeelsLike}/></b></Box>}
                        <Box fontSize="1em" sx={{textTransform:"capitalize"}}><b>{weatherDescription}</b></Box>
                    </Box>
                    <Box position="relative" width="100%" height="100%" sx={{
                        fontSize: {xs: "2em", sm: "3em", md:"4em"}
                    }}>
                        {getBackgroundIcon(weatherCode)}
                    </Box>
                </Stack>
            </CardContent>
        </Container>
    )
}