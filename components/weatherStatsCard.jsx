import styled from '@mui/system/styled';
import Box from '@mui/material/Box';
import {Grid, Card, Divider} from  '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import Icon from '@mdi/react';
import { mdiWeatherPouring, mdiWaterPercent, mdiWeatherSunnyAlert, mdiWeatherSunsetUp, mdiWeatherSunsetDown, mdiWeatherCloudy} from '@mdi/js';
import Temp from '@components/temp';
import MeasureUnit from '@components/measureUnit';
import {MONTHS} from '@src/constants';

const Container = styled(Card,{
    shouldForwardProp: (prop) => prop !== "backgroundColor",
})(({ theme, backgroundColor }) => ({
    width: "100%",
    color: "black",
    backgroundColor
}));

const ItemContainer = (props) => {
    return (
        <Box sx={{
            display: "grid",
            justifyContent: "space-around",
            gridTemplateColumns: "repeat(auto-fill, 170px)",
            py: "10px"
        }} component="ol">
            {props.children}
        </Box>
    )
};


const properties = {
    width: "150px",
    m: "10px",
    display: 'inline-grid',
    gridTemplateColumns: "60px auto",
    gridTemplateRows: "1fr 1fr",
    whiteSpace: "nowrap",
    '& svg:nth-of-type(1)': {
        gridColumn: "1",
        gridRow: "1 / 3",
        fontSize: "2em",
        placeSelf: "center",
        color: theme => theme.palette.primary.light
    },
    '& div:nth-of-type(2)': {
        gridColumn: "2",
        color: theme => theme.palette.primary.light,
    },
    '& div:nth-of-type(3)': {
        gridColumn: "2",
        gridRow: "2",
        fontWeight: "bold",
    }
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

const IconCard = (props) => {
    let value;
    let showContent = true;
    if (props.value !== undefined) {
        value = props.f(props.value);
        if (!props.noUnit) value += props.unit;
    }
    else if (props.strict)
        return null

    return (
        <Box sx={properties} component="li">
            {props.icon}
            <Box>{props.label}</Box>
            <Box fontSize="0.9em">
                {props.value !== undefined ? value: <DotLoader/>}
            </Box>
        </Box>
    )
}

IconCard.defaultProps = {
    unit: "",
    f: (v) => v
}

function getTime(dt, offset) {
    if (!dt) return dt;
    const date = new Date((dt+offset)*1000);
    const ampm = date.getUTCHours() < 12 ? "AM" : "PM";
    const hours = date.getUTCHours() % 12;
    const mins = date.getUTCMinutes();
    const pad = (mins<10) ? "0" : ""
    return `${hours}:${pad}${mins}${ampm}`;
}

function getDate(dt, offset) {
    const date = new Date((dt+offset)*1000);
    const month = MONTHS[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${month} ${day}, ${year}`;
}

function UVWarning(scale) {
    if (scale === undefined) return scale;
    if (scale <= 2) return `Low (${scale})`;
    else if (scale <= 5) return `Moderate (${scale})`;
    else if (scale <= 7) return `High (${scale})`;
    else if (scale <= 10) return `Very High (${scale})`;
    else return `Extreme (${scale})`;
}

export default function WeatherStatsCard(props) {
    return (
        <Container component="section" {...props}>
            {props.header ? 
            <>
                <Box p="5px" display="flex" justifyContent="space-between" pt="15px" px="15px">
                    <h1>Weather Details</h1>
                    <Box>{  
                            props.weather ? 
                            getDate(props.weather.dt, props.weather.offset)
                            :null
                    }</Box>
                </Box>
                <Divider />
            </>
            :""}
            <ItemContainer aria-live="polite">
                <IconCard strict={props.strict}
                    icon={<AirIcon sx={{fontSize:"1em"}}/>}
                    label="Wind"
                    value={props.weather.wind_speed}
                    f={(v)=> (
                        <><MeasureUnit label={props.weather.wind_speed}/>{` / ${props.weather.wind_deg}°`}</>
                    )}
                    noUnit
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWeatherPouring} size="1em"/>}
                    label="Rainfall"
                    value={props.weather ? (props.weather.rain || 0) : undefined}
                    f={(v)=> { 
                        if (v["1h"]) return v["1h"];
                        return v;
                    }}
                    unit="mm"
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWaterPercent} size="1em"/>}
                    label="Humidity"
                    value={props.weather.humidity}
                    unit="%"
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWeatherSunnyAlert} size="1em"/>}
                    label="Dew Point"
                    value={props.weather.dew_point}
                    f={(v)=>{return (<Temp label={v}/>)}}
                    noUnit
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWeatherSunsetUp} size="1em"/>}
                    label="Sunrise"
                    value={getTime(props.weather.sunrise, props.weather.offset)}
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWeatherSunsetDown} size="1em"/>}
                    label="Sunset"
                    value={getTime(props.weather.sunset, props.weather.offset)}
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWeatherSunnyAlert} size="1em"/>}
                    label="UV Index"
                    value={UVWarning(props.weather.uvi)}
                />
                <IconCard strict={props.strict}
                    icon={<Icon path={mdiWeatherCloudy} size="1em"/>}
                    label="Clouds"
                    value={props.weather.clouds}
                    unit="%"
                />
            </ItemContainer>
        </Container>
    )
}

WeatherStatsCard.defaultProps = {
    weather: 0,
    header: 1
}