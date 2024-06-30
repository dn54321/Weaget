import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { Widget } from "@components/containers/widget/widget";
import { withSkeleton } from "@components/with-skeleton";
import WeatherCardSkeleton from "@components/cards/weather-card/weather-card.skeleton";
import { StyledWeatherCard } from "./daily-weather-card-widget.styles";

export interface WeatherListProps {
    weatherData?: OneCallWeatherDetails;
    activeCard: number;
    setActiveCard: (number: number) => void;
    setHoverCard: (number: number) => void;
}

function WeatherList(props: WeatherListProps) {
    const weatherDetails = props.weatherData?.daily?.map(dailyWeather => ({
        key: dailyWeather.dt.getTime(),
        props: {
            date: dailyWeather.dt,
            timezone: `${props.weatherData?.timezone}`,
            weatherCode: dailyWeather.weather[0].id,
            weatherDescription: dailyWeather.weather[0].description,
            rainfallPercentage: dailyWeather.pop,
            maxTemperature: dailyWeather.temp.max,
            minTemperature: dailyWeather.temp.min,
        },
    }));

    const weatherListData = weatherDetails
        || Array(8).fill(null).map((_, i) => ({ key: i, props: undefined }));

    return weatherListData.map((dailyWeather, idx) => {
        const WeatherCard = withSkeleton(StyledWeatherCard, WeatherCardSkeleton, dailyWeather.props);
        return (
            <Box
                key={dailyWeather.key}
                onMouseEnter={() => props.setHoverCard(idx)}
                onClick={() => props.setActiveCard(props.activeCard === idx ? -1 : idx)}
                component="li"
                width="100%"
                sx={{
                    "& .MuiCard-root": {
                        ...(props.activeCard === idx && {
                            backgroundColor: "secondary.main",
                        }),
                    },
                    "& .MuiChip-root": {
                        ...(props.activeCard === idx && {
                            backgroundColor: "secondary.dark",
                        }),
                    },
                    "& .MuiCardActionArea-root:hover": {
                        boxShadow: 5,
                        backdropFilter: "hue-rotate(10deg)",
                    },
                }}
            >
                <WeatherCard active={props.activeCard === idx} />
            </Box>
        );
    });
}

export interface DailyWeatherCardWidgetProps {
    weatherData?: OneCallWeatherDetails;
}

export default function DailyWeatherCardWidget(props: DailyWeatherCardWidgetProps) {
    const [activeCard, setActiveCard] = useState(-1);
    const [hoverCard, setHoverCard] = useState(-1);
    const setFocusedWeather = useWidgetStore(state => state.setFocusedWeather);

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
                    sx={{ overflowX: "auto" }}
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
    );
}
