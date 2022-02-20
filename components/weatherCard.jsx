import Icon from '@components/icon';
import Temp from '@components/temp';
import { Card, CardActionArea, Chip } from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import { DAYS, MONTHS } from '@src/constants';
import { round } from '@src/math';
;

const Container = (props) => {
    return (
    <Card id="container" sx={{
        backgroundColor: props.active ? 
            "secondary.main":
            "primary.light",
        boxShadow: 3,
        minWidth:"120px",
        width: "100%",
        borderRadius: "10px",
        "& .MuiCardActionArea-root": {
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            px: "5px",
            py: "10px",
            fontSize: "16px",
            "&:hover": {
                boxShadow: 5,
                backdropFilter: "hue-rotate(10deg)"
            }
        }
    }} component="li">
        <CardActionArea {...props}>
            {props.children}
        </CardActionArea>
    </Card>
    )
}

const Day = styled(Box)(({ theme }) => ({
    fontWeight: "bold",
}));

const ShortDate = styled(Box)(({ theme }) => ({
    color: "#ddd",
    fontSize: "0.8em"
}));

const Rain = (props) => {
    if (!props.label) return null;
    const color = props.active ? 
        "secondary.dark" :
        "primary.main";
    return (
        <Box width={0} height={0} position="absolute" bottom="80%" right="30%"
        title="Chance of Rain">
            <Chip sx={{
                backgroundColor: color,
            }} size="small" label={round(props.label*100,0)+"%"}
        />
        </Box>
    )
}

const Description = styled(Box)(({ theme }) => ({
    fontSize: "0.5em",
}));

const Temperature = styled(Box)(({ theme }) => ({
    marginTop: "5px"
}));

const High = styled(Box)(({ theme }) => ({
    "--fontSize": "2em",
    display: "inline",
    fontSize: "var(--fontSize)",
}));

const Low = styled(Box)(({ theme }) => ({
    display: "inline",
    color: theme.palette.grey[200],
}));


const IconBox = styled(Box)(({ theme }) => ({
    position: "relative"
}));


function dateDiffInDays(a, b) {
    const millsInDay = 1000 * 60 * 60 * 24;
    const millsDiff = a-b;
    return Math.floor(millsDiff /  millsInDay);
}

function getDate(date, offset) {
    const month = MONTHS[date.getUTCMonth()];
    const day = date.getUTCDate();
    const today = new Date(Date.now() + offset*1000);
    const diffDays = dateDiffInDays(date,today);
    if (diffDays == 0) return "today";
    if (diffDays == 1) return "tomorrow";
    return `${month} ${day}`;
}

export default function WeatherCard(props) {
    const date = new Date((props.weather.dt + props.offset)*1000);
    return (
        <Container sx={{color: "white"}} {...props}>
            <Day>{DAYS[date.getUTCDay()]}</Day>
            <ShortDate>{getDate(date, props.offset)}</ShortDate>
            <IconBox fontSize="64px" pt="5px">  
                <Icon id={props.weather.weather[0].id}/>
                <Rain label={props.weather.pop} active={props.active}/>
            </IconBox>
            <Description>{props.weather.weather[0].description}</Description>
            <Temperature>
                <High><Temp label={props.weather.temp.max}/></High>
                <Low><Temp label={props.weather.temp.min}/></Low>
            </Temperature>
        </Container>

    )
}