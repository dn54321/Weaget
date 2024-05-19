import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Card, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import styled from '@mui/system/styled';
import { MONTHS } from '@src/constants';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

/*
    Rainfall card tells us how much rain has fallen 
    with 120mins per min, 48hrs per hr and 14 days per day.

*/


// file constants
const chartLabel = ["120 mins", "48 hours", "14 days"];
const dataLabel = ["minutely", "hourly", "daily"];
const chartHeight = "250px";

const Container = styled(Card)(({ theme }) => ({
    width: "100%",
    color: "black",
    padding: "15px"
}));

const StyledButton = (props) => {
    const buttonType = {type: "increment", val: 1}
    if (props.decrement) {
        buttonType.type = "decrement"
        buttonType.val = 2
    }

    return (
        <Button component="span"
        aria-label={`See ${chartLabel[(props.chart.id+buttonType.val)%3]} rainfall`} 
        title={`See ${chartLabel[(props.chart.id+buttonType.val)%3]} rainfall`} 
        onClick={() => props.dispatch({type: buttonType.type})}
        sx={{
            backgroundColor: "primary.main",
            minWidth: "16px",
            padding: "0px",
            "& svg": {
                fontSize: "16px",
                color: "white",
            },
        "&:hover": {
            backgroundColor: "primary.dark",
        }
        }}>
            {(props.decrement) ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
    )
}

// Prints the time {hh}:{mm}{ampm}
function printTime(dt, offset) {
    const date = new Date((dt + offset)*1000);
    let hours = date.getUTCHours();
    let mins = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${hours}:${mins}${ampm}`;
}


// Prints the date {month} {day}
function printDay(dt, offset) {
    const date = new Date((dt + offset)*1000);
    const day = date.getUTCDate();
    const month = MONTHS[date.getUTCMonth()];
    return `${month} ${day}`;
}

// The chart component from recharts.
const Chart = (props) => {
    return (
        <Box position="relative" width="100%" height={chartHeight}>
            <Box position="absolute" left={0} right={0} top={0} bottom={0}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width="100%" height={chartHeight} data={props.data}>
                    <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{fontSize: 10}}/>
                    <Tooltip />
                    <Area 
                        type="monotone" 
                        dataKey="rainfall" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#grad)"
                        unit="mm" />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}

// Each Graph (minutely, hourly, daily) has a score.
// The score determines which graph is presented on page load.
// Score calculated by the percentage of points above 0.
// A consequence of more points being > 0 is a smoother graph
// which we prefer over a graph over a chaotic graph or a graph with nothing.

function getScore(weatherLabel, wtr) {
    let arr;
    switch (weatherLabel) {
        case "minutely": arr = wtr.minutely.map(x=>x.precipitation); break;
        case "hourly": arr = wtr.hourly.map(x=>x.rain?x.rain["1h"]:0); break;
        case "daily": arr = wtr.daily.map(x=>x.rain?x.rain:0); break;
    }
    let score = 0;
    arr.forEach(x => x && ++score);
    return score/arr.length;
}

function getData(weatherLabel, wtr) {
    switch (weatherLabel) {
        case "minutely": return wtr.minutely.map(x=>({
            name: printTime(x.dt, wtr.timezone_offset),
            rainfall: x.precipitation
        }));
        case "hourly": return wtr.hourly.map(x=>({
            name: printTime(x.dt, wtr.timezone_offset),
            rainfall: x.rain?x.rain["1h"]:0
        }));
        case "daily": return wtr.daily.map(x=>({
            name: printDay(x.dt, wtr.timezone_offset),
            rainfall: x.rain?x.rain:0
        }));
    }
}

// Switches between different graphs
function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {id: (state.id+1)%3};
      case 'decrement':
        return {id: (state.id+2)%3};
      case 'set':
        return {id: action.val};
      default:
        throw new Error();
    }
  }

// Get index of graph based on score
function getChartIndex(wtr) {
    let maxIndex = 0;
    let maxScore = 0;
    wtr && dataLabel.forEach((x,i) => {
        const score = getScore(x, wtr);
        if (score < maxScore) return;
        maxScore = score;
        maxIndex = i;
    })
    return maxIndex;
}

export default function Rainfall(props) {
    const [chart, dispatch] = React.useReducer(reducer, {id: 0});
    React.useEffect(() => {
        dispatch({type: "set", val: getChartIndex(props.weather)});
    }, [props.weather])
    return (
        <Container component="section">
            <Box p="5px" display="flex" justifyContent="space-between">
                <h1>Rainfall</h1>
                <Box display="flex" alignItems="center">
                <StyledButton chart={chart} dispatch={dispatch} decrement/>
                <Box width="80px" sx={{display:"grid", placeItems:"center"}}>{chartLabel[chart.id]}</Box> 
                <StyledButton chart={chart} dispatch={dispatch}/>
                </Box>
            </Box>
            <Divider />
            {props.weather ? 
            <Box mt="15px" mb="-15px"><Chart data={getData(dataLabel[chart.id], props.weather)}/></Box> :
            <Skeleton sx={{height:chartHeight, mt:"15px", borderRadius:"20px" }}
                 width="100%" variant="rectangular" />}
        </Container>
    )
}