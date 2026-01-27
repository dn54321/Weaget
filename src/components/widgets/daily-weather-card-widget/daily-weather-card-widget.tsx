import Box from "@mui/material/Box";
import type { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import React, { useEffect, useState } from "react";
import type { SkeletonProps } from "@components/with-skeleton";
import { Stack } from "@mui/material";
import type { SxProps } from "@mui/material";
import { WeatherCard } from "@components/cards/weather-card";
import type { WeatherCardProps } from "@components/cards/weather-card";
import { Widget } from "@components/containers/widget/widget";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";

export interface WeatherListProps {
    weatherData?: OneCallWeatherDetails;
    activeCard: number;
    setActiveCard: (number: number) => void;
    setHoverCard: (number: number) => void;
}

function WeatherList(props: WeatherListProps) {
    const weatherDetails = props.weatherData?.daily?.map((dailyWeather, idx) => ({
        key: dailyWeather.dt.getTime(),
        props: {
            active: props.activeCard === idx,
            date: dailyWeather.dt,
            maxTemperature: dailyWeather.temp.max,
            minTemperature: dailyWeather.temp.min,
            rainfallPercentage: dailyWeather.pop,
            timezone: `${props.weatherData?.timezone}`,
            weatherCode: dailyWeather.weather[0].id,
            weatherDescription: dailyWeather.weather[0].description,
        } as WeatherCardProps,
    }));

    const weatherListData = weatherDetails
        || Array(8).fill(null).map((_, i) => (
            { key: i, props: { skeleton: true } as SkeletonProps }));

    return weatherListData.map((dailyWeather, idx) => {
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
                    "& .MuiCardActionArea-root:hover": {
                        backdropFilter: "hue-rotate(10deg)",
                        boxShadow: 5,
                    },
                    "& .MuiChip-root": {
                        ...(props.activeCard === idx && {
                            backgroundColor: "secondary.dark",
                        }),
                    },
                }}
            >
                <WeatherCard {...dailyWeather.props} />
            </Box>
        );
    });
}

export interface DailyWeatherCardWidgetProps {
    weatherData?: OneCallWeatherDetails;
    sx?: SxProps;
}

export default function DailyWeatherCardWidget(props: DailyWeatherCardWidgetProps) {
    const [activeCard, setActiveCard] = useState(-1);
    const [hoverCard, setHoverCard] = useState(-1);
    const { t } = useSystemTranslation();
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
            title={t("component.widget.dailyWeatherCard.title")}
            subtitle={t("component.widget.dailyWeatherCard.description")}
            sx={props.sx}
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
