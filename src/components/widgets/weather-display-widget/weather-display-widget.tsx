import { TempUnit } from "@components/ui/temperature-unit";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material/";
import { BoxProps, keyframes, styled, SxProps } from "@mui/system";
import { CurrentWeatherDetails, DailyWeatherDetails, OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { DateTime } from "luxon";

const CLOUD_COLOR = "white";
const RAIN_CLOUD_COLOR = "#c9c9c9";
const CLOUD_GLOW = "#eee";
const RAIN_CLOUD_GLOW = "rgba(0,0,0,0.2)";

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

const Cloud = (props: BoxProps & { rain?: boolean }) => {
    const { rain: hasRain, ...boxProps } = props;
    return (
        <Scene {...boxProps}>
            <Box sx={{
                "--cloud-color": hasRain ? RAIN_CLOUD_COLOR : CLOUD_COLOR,
                "--cloud-shade": hasRain ? RAIN_CLOUD_GLOW : CLOUD_GLOW,
                "backgroundColor": "var(--cloud-color)",
                "borderRadius": ".5em",
                "filter": "drop-shadow(0px 0px 0.3em var(--cloud-shade))",
                "height": "2em",
                "opacity": "1",
                "position": "absolute",
                "transform": "translate(-50%,-50%)",
                "width": "4em",
                "zIndex": "2"
            }}
            />
        </Scene>
    );
};

const Sun = styled(Box)(() => ({
    "&:before": {
        borderRadius: "1em",
        height: "2em",
        left: "1em",
        top: "5em",
        width: "2em"
    },
    "&:before,&:after": {
        backgroundColor: "rgba(255, 255, 255, .2)",
        boxShadow: "0 0 .1em 0 rgba(255, 255, 255, .3) inset, -.1em -.1em 0 .2em rgba(255, 255, 255, .1)",
        content: "''",
        display: "inline-block",
        position: "absolute"
    },
    "background": "linear-gradient(120deg, #FFE5B4, #FFEB3B)",
    "borderRadius": "4em",
    "filter": "drop-shadow(0px 0px 3em yellow)",
    "fontSize": "0.4em",
    "height": "8em",
    "opacity": "1",
    "position": "absolute",
    "right": "0px",
    "transform": "translate(-20%, -20%)",
    "width": "8em"
}));

const Rain = (props: BoxProps & { delay: string }) => {
    const { delay, ...boxProps } = props;
    return (
        <Scene {...boxProps}>
            <Box sx={{
                animation: `${rain} 900ms infinite linear`,
                animationDelay: delay,
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))",
                borderRadius: "0.1em",
                height: "0.7em",
                position: "absolute",
                transform: "translate(-50%,-50%) rotate(20deg)",
                width: "0.1em"
            }}
            >
            </Box>
        </Scene>
    );
};

const Snow = (props: BoxProps & { delay: string }) => {
    const { delay } = props;
    return (
        <Scene {...props}>
            <Box sx={{
                animation: `${snow} 3s infinite linear`,
                animationDelay: delay,
                backgroundColor: "white",
                borderRadius: "0.15em",
                filter: "drop-shadow(0 0 10px white)",
                height: "0.3em",
                opacity: "0.1",
                position: "absolute",
                transform: "translate(-50%,-50%) rotate(20deg)",
                width: "0.3em"
            }}
            >
            </Box>
        </Scene>
    );
};

function Cloudy() {
    return (
        <>
            <Cloud left="75%" top="30%" />
            <Cloud left="60%" top="50%" />
        </>
    );
}

function FewClouds() {
    return (
        <>
            <Sun left={{ md: "65%", sm: "62%", xs: "55%" }} top={{ sm: "0%", xs: "20%" }} />
            <Cloud fontSize="0.5em" height="4em" left="65%" top="65%" />
        </>
    );
}

function getBackgroundColor(id: number) {
    const cloudy = "linear-gradient(to right top, #1b9ce2 0%, #e0e2e5 90%)";
    const stormy = "linear-gradient(to right top, #4b9cc2 0%, #9adbd9 90%)";
    const snowy = "linear-gradient(to bottom left, #758595 0%, #e0e2e5 90%)";
    if (200 <= id && id < 600) return stormy;
    else if (600 <= id && id < 700) return snowy;
    return cloudy;
}

function getBackgroundIcon(id: number): JSX.Element {
    switch (id) {
        case 200: return (<Rainy />);
        case 300: return (<Rainy />);
        case 500: return (<Rainy />);
        case 600: return (<Snowy />);
        case 700: return (<Cloudy />);
        case 800: return (<Sunny />);
        case 801: return (<FewClouds />);
        case 802: return (<ScatteredClouds />);
        case 803: return (<Cloudy />);
        case 804: return (<Cloudy />);
        default: return (id % 100) ? getBackgroundIcon(id - (id % 100)) : <Cloudy />;
    }
}

function RainCloud(props: BoxProps) {
    return (
        <>
            <Rain delay="600ms" left={`calc(${props.left} + ${4 / 5 * 1 - 2}em)`} top={props.top} />
            <Rain delay="600ms" left={`calc(${props.left} + ${4 / 5 * 2 - 2}em)`} top={props.top} />
            <Rain delay="600ms" left={`calc(${props.left} + ${4 / 5 * 3 - 2}em)`} top={props.top} />
            <Rain delay="600ms" left={`calc(${props.left} + ${4 / 5 * 4 - 2}em)`} top={props.top} />
            <Rain delay="300ms" left={`calc(${props.left} + ${4 / 5 * 1 - 2}em)`} top={props.top} />
            <Rain delay="300ms" left={`calc(${props.left} + ${4 / 5 * 2 - 2}em)`} top={props.top} />
            <Rain delay="300ms" left={`calc(${props.left} + ${4 / 5 * 3 - 2}em)`} top={props.top} />
            <Rain delay="300ms" left={`calc(${props.left} + ${4 / 5 * 4 - 2}em)`} top={props.top} />
            <Rain delay="0ms" left={`calc(${props.left} + ${4 / 5 * 1 - 2}em)`} top={props.top} />
            <Rain delay="0ms" left={`calc(${props.left} + ${4 / 5 * 2 - 2}em)`} top={props.top} />
            <Rain delay="0ms" left={`calc(${props.left} + ${4 / 5 * 3 - 2}em)`} top={props.top} />
            <Rain delay="0ms" left={`calc(${props.left} + ${4 / 5 * 4 - 2}em)`} top={props.top} />
            <Cloud {...props} rain />
        </>
    );
}

function Rainy() {
    return (
        <>
            <RainCloud left="75%" top="30%" />
            <RainCloud left="60%" top="50%" />
        </>
    );
}

function ScatteredClouds() {
    return (
        <>
            <Sun left={{ md: "65%", sm: "62%", xs: "55%" }} top={{ sm: "0%", xs: "20%" }} />
            <Cloud fontSize="0.7em" left="77%" top="40%" />
            <Cloud fontSize="0.7em" left="67%" top="60%" />
        </>
    );
}

function SnowCloud(props: BoxProps) {
    return (
        <>
            <Snow delay="1200ms" left={`calc(${props.left} + ${4 / 5 * 1 - 2}em)`} top={props.top} />
            <Snow delay="1900ms" left={`calc(${props.left} + ${4 / 5 * 2 - 2}em)`} top={props.top} />
            <Snow delay="800ms" left={`calc(${props.left} + ${4 / 5 * 3 - 2}em)`} top={props.top} />
            <Snow delay="2300ms" left={`calc(${props.left} + ${4 / 5 * 4 - 2}em)`} top={props.top} />
            <Snow delay="2600ms" left={`calc(${props.left} + ${4 / 5 * 1 - 2}em)`} top={props.top} />
            <Snow delay="1500ms" left={`calc(${props.left} + ${4 / 5 * 2 - 2}em)`} top={props.top} />
            <Snow delay="1800ms" left={`calc(${props.left} + ${4 / 5 * 3 - 2}em)`} top={props.top} />
            <Snow delay="1300ms" left={`calc(${props.left} + ${4 / 5 * 4 - 2}em)`} top={props.top} />
            <Snow delay="900ms" left={`calc(${props.left} + ${4 / 5 * 1 - 2}em)`} top={props.top} />
            <Snow delay="300ms" left={`calc(${props.left} + ${4 / 5 * 2 - 2}em)`} top={props.top} />
            <Snow delay="50ms" left={`calc(${props.left} + ${4 / 5 * 3 - 2}em)`} top={props.top} />
            <Snow delay="100ms" left={`calc(${props.left} + ${4 / 5 * 4 - 2}em)`} top={props.top} />
            <Cloud {...props} />
        </>
    );
}

function Snowy() {
    return (
        <>
            <SnowCloud left="75%" top="30%" />
            <SnowCloud left="60%" top="50%" />
        </>
    );
};

function Sunny() {
    return (
        <>
            <Sun left={{ md: "65%", sm: "62%", xs: "55%" }} top={{ sm: "0%", xs: "20%" }} />
        </>
    );
};

const Container = styled(Card)(() => ({
    boxShadow: "0 0 .3em -.03em #fff",
    color: "white",
    height: "320px",
    position: "relative"
}));

const High = styled(Box)(() => ({
    display: "inline",
    fontSize: "1em"
}));

const Low = styled(Box)(({ theme }) => ({
    color: theme.palette.grey[200],
    display: "inline",
    fontSize: "0.5em"
}));

export interface WeatherDisplayWidgetProps {
    location?: string
    sx?: SxProps
    weatherData?: OneCallWeatherDetails
}

export interface WeatherTemperatureDisplayProps {
    weather: CurrentWeatherDetails | DailyWeatherDetails | undefined
}

export default function WeatherDisplayWidget(props: WeatherDisplayWidgetProps) {
    const focusedWeather = useWidgetStore(state => state.focusedWeather) ?? props.weatherData?.current;
    const timezone = props.weatherData?.timezone;
    const { locale, t } = useSystemTranslation();
    const weatherUpdated = focusedWeather
        ? DateTime
            .fromJSDate(focusedWeather?.dt, { zone: timezone })
            .setLocale(locale)
            .toLocaleString(DateTime.DATETIME_MED)
        : t("component.widget.weatherDisplay.fetchingDetails");

    const weatherCode = focusedWeather?.weather[0]?.id ?? 0;
    const weatherDescription = focusedWeather?.weather[0]?.description;
    const weatherFeelsLike = focusedWeather?.feelsLike;

    return (
        <Container sx={{ background: getBackgroundColor(weatherCode), ...props.sx }}>
            <CardContent sx={{ height: "100%" }}>
                <Typography component="h1" variant="h3">
                    <b>{props.location ?? t("component.widget.weatherDisplay.fetchingLocationDetails")}</b>
                </Typography>
                <Typography variant="body2">
                    {`${t("component.widget.weatherDisplay.updatedAt")}: ${weatherUpdated}`}
                </Typography>
                <Stack direction="row" height="80%">
                    <Box width="150px">
                        <WeatherTemperatureDisplay weather={focusedWeather} />
                        {typeof (weatherFeelsLike) === "number" && (
                            <Box fontSize="1em">
                                <b>
                                    {t("component.widget.weatherDisplay.feelsLike") + " "}
                                    <TempUnit value={weatherFeelsLike} />
                                </b>
                            </Box>
                        )}
                        <Box fontSize="1em" sx={{ textTransform: "capitalize" }}><b>{weatherDescription}</b></Box>
                    </Box>
                    <Box
                        height="100%"
                        position="relative"
                        sx={{
                            fontSize: { md: "4em", sm: "3em", xs: "2em" }
                        }}
                        width="100%"
                    >
                        {getBackgroundIcon(weatherCode)}
                    </Box>
                </Stack>
            </CardContent>
        </Container>
    );
}

export function WeatherTemperatureDisplay(props: WeatherTemperatureDisplayProps) {
    if (props.weather === undefined) {
        return;
    }

    if (typeof (props.weather.temp) === "number") {
        return (<Box fontSize="4em" mt="0.2em"><TempUnit symbol value={props.weather.temp} /></Box>);
    }

    if (props.weather.temp.max && props.weather.temp.min) {
        return (
            <Box fontSize="4em" mt="0.2em">
                <High><TempUnit value={props.weather.temp.max} /></High>
                <Low><TempUnit value={props.weather.temp.min} /></Low>
            </Box>
        );
    }
}
