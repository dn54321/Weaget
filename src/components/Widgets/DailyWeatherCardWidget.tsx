import WeatherCard, { WeatherCardProps } from '@components/Cards/WeatherCard';
import { Card, Divider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import styled from '@mui/system/styled';
import React, { useEffect, useState } from 'react';
import { OneCallWeatherDetails } from '../../types/models/openWeather/oneCall.model';
import { useWidgetStore } from '../../hooks/stores/useWidgetStore';
import { Widget } from '../Containers/Widget';

const SkeletonCard = styled(Skeleton)(() => ({
    width: "100%",
    minWidth: "120px",
    height: "173px",
    opacity: "20%",
    borderRadius: "10px"
}));

const StyledWeatherCard = styled(WeatherCard)((props: {active: boolean}) => ({
    "& .MuiPaper-root:hover": {
        ...(props.active && {backgroundColor: "secondary.main"})
    },
    "& .MuiCardActionArea-root": {
        "&:hover": {
            boxShadow: 5,
            backdropFilter: "hue-rotate(10deg)",
            ...(props.active && {backgroundColor: "secondary.dark"})
        }
    }
}));

export interface WeatherListProps {
    weatherData?: OneCallWeatherDetails;
    activeCard: number;
    setActiveCard: (number: number) => void;
    setHoverCard: (number: number) => void;
}

function WeatherList(props: WeatherListProps) {
    const weatherDetails = props.weatherData?.daily?.map(dailyWeather => ({
        date: dailyWeather.dt,
        timezone: `${props.weatherData?.timezone}`,
        weatherCode: dailyWeather.weather[0].id,
        weatherDescription: dailyWeather.weather[0].description,
        rainfallPercentage: dailyWeather.pop,
        maxTemperature: dailyWeather.temp.max,
        minTemperature: dailyWeather.temp.min,
    }));

    const weatherList = weatherDetails?.map((dailyWeather, idx) => (
        <Box
            key={dailyWeather.date.getTime()}
            onMouseEnter={() => props.setHoverCard(idx)} 
            onClick={() => props.setActiveCard(props.activeCard === idx ? -1 : idx)} 
            component="li"
            width="100%"
            sx={{
                "& .MuiCard-root": {
                    ...(props.activeCard === idx && {
                        backgroundColor: "secondary.main"
                    })
                },
                "& .MuiChip-root": {
                    ...(props.activeCard === idx && {
                        backgroundColor: "secondary.dark"
                    })
                },
                "& .MuiCardActionArea-root:hover": {
                    boxShadow: 5,
                    backdropFilter: "hue-rotate(10deg)",
                }
            }}
        >
        <StyledWeatherCard 
            {...dailyWeather}
            key={dailyWeather.date.getTime()}
            active={props.activeCard === idx}
        />
        </Box>
    ))

    return (
        <React.Fragment>  
            {
            weatherDetails ? 
                weatherList
                : [...Array(8)].map((_,i) => <SkeletonCard variant="rectangular" key={i}/>)
            }
        </React.Fragment>
    )
}

export interface WeeklyWeatherCardWidgetProps {
    weatherData?: OneCallWeatherDetails,
}

export default function DailyWeatherCardList(props: WeeklyWeatherCardWidgetProps) {
    const [activeCard, setActiveCard] = useState(-1);
    const [hoverCard, setHoverCard] = useState(-1);
    const setFocusedWeather = useWidgetStore((state) => state.setFocusedWeather);

    useEffect(() => {
        if (hoverCard >= 0) {
            setFocusedWeather(props.weatherData?.daily?.[hoverCard]);
        }
        else if (activeCard >= 0) {
            setFocusedWeather(props.weatherData?.daily?.[activeCard]);
        }
        else {
            setFocusedWeather(undefined);
        }
    }, [activeCard, hoverCard, setFocusedWeather, props.weatherData]);

    return (
        <Widget 
            title="Daily Cards"
            subtitle="Click any card below to see more detailed description of the weather card."
        >
            <Box position="relative" height="180px" mt="10px">
                <Stack 
                    component="ol"
                    onMouseLeave={() => setHoverCard(-1)}
                    sx={{ overflowX: "auto"}}
                    className="skinny-scrollbar"
                    position="absolute"
                    left="0"
                    right="0"
                    direction="row" 
                    gap="5px"  
                    py="5px"
                >
                    <WeatherList 
                        weatherData={props.weatherData}
                        activeCard={activeCard} 
                        setActiveCard={setActiveCard}
                        setHoverCard={setHoverCard}
                    />
                </Stack>
            </Box>
        </Widget>
    )
}